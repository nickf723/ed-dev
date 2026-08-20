import { NextRequest, NextResponse } from "next/server";
import { createCollectionSearchPayload } from "@/lib/collections/result.mjs";
import {
  buildMusicBrainzSearchQuery,
  COVER_ART_ARCHIVE_SOURCE,
  MUSICBRAINZ_SOURCE,
  normalizeMusicBrainzReleaseGroup,
  type MusicBrainzReleaseGroup,
} from "@/lib/collections/providers/musicbrainz.mjs";
import type { ProviderCollectionSearchPayload } from "@/lib/collections/schema";

export const runtime = "nodejs";

const MUSICBRAINZ = "https://musicbrainz.org/ws/2/release-group/";
const PAGE_SIZE = 18;
const CACHE_SECONDS = 3_600;
const STALE_SECONDS = 86_400;

type MusicBrainzResponse = {
  count?: number;
  offset?: number;
  "release-groups"?: MusicBrainzReleaseGroup[];
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json(
      createCollectionSearchPayload({
        query: "",
        records: [],
        source: "MusicBrainz",
        state: "failed",
        sources: [MUSICBRAINZ_SOURCE, COVER_ART_ARCHIVE_SOURCE],
        total: 0,
        error: "Provide a q parameter.",
      }) satisfies ProviderCollectionSearchPayload,
      { status: 400 },
    );
  }

  try {
    const url = new URL(MUSICBRAINZ);
    url.searchParams.set("query", buildMusicBrainzSearchQuery(query));
    url.searchParams.set("fmt", "json");
    url.searchParams.set("limit", String(PAGE_SIZE));

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": "EducationStation64/0.1 (https://educationstation64.com)",
      },
      next: { revalidate: CACHE_SECONDS },
      signal: request.signal,
    } as RequestInit & { next: { revalidate: number } });

    if (!response.ok) throw new MusicBrainzProviderError(response.status);
    const payload = (await response.json()) as MusicBrainzResponse;
    const records = (payload["release-groups"] ?? []).map(normalizeMusicBrainzReleaseGroup);
    const total = Math.max(payload.count ?? records.length, records.length);
    const expected = Math.min(PAGE_SIZE, total);
    const retrievedAt = new Date();
    const isPartial = records.length < expected;

    return NextResponse.json(
      createCollectionSearchPayload({
        query,
        records,
        source: "MusicBrainz",
        state: isPartial ? "partial" : "cached",
        sources: [MUSICBRAINZ_SOURCE, COVER_ART_ARCHIVE_SOURCE],
        total,
        pageSize: PAGE_SIZE,
        retrievedAt: retrievedAt.toISOString(),
        staleAfter: new Date(retrievedAt.getTime() + STALE_SECONDS * 1_000).toISOString(),
        note: isPartial
          ? `MusicBrainz reported ${total} matches; ${records.length} release groups were available in this sample.`
          : `MusicBrainz reported ${total} matches. This route serves a cached sample of up to ${PAGE_SIZE} release groups.`,
      }) satisfies ProviderCollectionSearchPayload,
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`,
        },
      },
    );
  } catch (error) {
    const rateLimited = error instanceof MusicBrainzProviderError && error.status === 503;
    const message = rateLimited
      ? "MusicBrainz is rate-limiting requests. Try again shortly."
      : error instanceof Error
        ? error.message
        : "Unable to search albums.";
    return NextResponse.json(
      createCollectionSearchPayload({
        query,
        records: [],
        source: "MusicBrainz",
        state: rateLimited ? "rate-limited" : "failed",
        sources: [MUSICBRAINZ_SOURCE, COVER_ART_ARCHIVE_SOURCE],
        total: 0,
        error: message,
      }) satisfies ProviderCollectionSearchPayload,
      { status: rateLimited ? 429 : 502 },
    );
  }
}

class MusicBrainzProviderError extends Error {
  constructor(readonly status: number) {
    super(`MusicBrainz search returned ${status}`);
  }
}
