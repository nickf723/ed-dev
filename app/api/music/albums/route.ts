import { NextRequest, NextResponse } from "next/server";
import type { CollectionMediaRecord, CollectionSearchPayload } from "@/lib/collections/schema";

export const runtime = "nodejs";

const MUSICBRAINZ = "https://musicbrainz.org/ws/2/release-group/";

type ArtistCredit = {
  name?: string;
  artist?: { id?: string; name?: string };
};

type ReleaseGroup = {
  id: string;
  title: string;
  "first-release-date"?: string;
  "primary-type"?: string;
  "secondary-types"?: string[];
  "artist-credit"?: ArtistCredit[];
};

type MusicBrainzResponse = {
  "release-groups"?: ReleaseGroup[];
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json(
      { query: "", records: [], source: "MusicBrainz", error: "Provide a q parameter." } satisfies CollectionSearchPayload,
      { status: 400 },
    );
  }

  try {
    const url = new URL(MUSICBRAINZ);
    url.searchParams.set("query", query);
    url.searchParams.set("fmt", "json");
    url.searchParams.set("limit", "18");

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EducationStation64/0.1 (https://educationstation64.com)",
      },
      next: { revalidate: 3600 },
    } as RequestInit & { next: { revalidate: number } });

    if (!response.ok) throw new Error(`MusicBrainz returned ${response.status}`);
    const payload = (await response.json()) as MusicBrainzResponse;
    const records = (payload["release-groups"] ?? []).map(normalizeReleaseGroup);

    return NextResponse.json(
      { query, records, source: "MusicBrainz" } satisfies CollectionSearchPayload,
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      },
    );
  } catch (error) {
    return NextResponse.json(
      {
        query,
        records: [],
        source: "MusicBrainz",
        error: error instanceof Error ? error.message : "Unable to search albums.",
      } satisfies CollectionSearchPayload,
      { status: 502 },
    );
  }
}

function normalizeReleaseGroup(group: ReleaseGroup): CollectionMediaRecord {
  const artist = group["artist-credit"]?.map((credit) => credit.name ?? credit.artist?.name).filter(Boolean).join(", ") || "Unknown artist";
  const primaryType = group["primary-type"] ?? "Release group";
  const secondary = group["secondary-types"] ?? [];
  const date = group["first-release-date"] ?? undefined;

  return {
    id: group.id,
    title: group.title,
    subtitle: primaryType,
    description: `${group.title} is a ${primaryType.toLowerCase()} release group credited to ${artist}. MusicBrainz groups different editions and releases of the same underlying musical work into one record.`,
    imageUrl: `https://coverartarchive.org/release-group/${group.id}/front-250`,
    year: date?.slice(0, 4),
    primaryCreator: artist,
    tags: [primaryType, ...secondary].filter(Boolean),
    facts: {
      firstRelease: date,
      primaryType,
      secondaryTypes: secondary.length ? secondary.join(", ") : undefined,
      artist,
      musicBrainzId: group.id,
    },
    sources: [
      {
        label: "MusicBrainz",
        url: `https://musicbrainz.org/release-group/${group.id}`,
      },
      {
        label: "Cover Art Archive",
        url: `https://coverartarchive.org/release-group/${group.id}`,
      },
    ],
  };
}
