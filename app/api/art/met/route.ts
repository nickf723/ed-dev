import { NextRequest, NextResponse } from "next/server";
import { createCollectionSearchPayload } from "@/lib/collections/result.mjs";
import type { CollectionMediaRecord, ProviderCollectionSearchPayload } from "@/lib/collections/schema";

export const runtime = "nodejs";

const MET_BASE = "https://collectionapi.metmuseum.org/public/collection/v1";
const PAGE_SIZE = 16;
const CANDIDATE_COUNT = 24;
const CACHE_SECONDS = 3_600;
const STALE_SECONDS = 86_400;
const MET_SOURCE = {
  label: "The Metropolitan Museum of Art Collection API",
  url: "https://metmuseum.github.io/",
  kind: "provider" as const,
  scope: "Search totals, object metadata, and Open Access images",
};

type MetSearch = {
  total?: number;
  objectIDs?: number[] | null;
};

type MetTag = { term?: string };

type MetObject = {
  objectID: number;
  isPublicDomain?: boolean;
  primaryImage?: string;
  primaryImageSmall?: string;
  objectName?: string;
  title?: string;
  culture?: string;
  period?: string;
  dynasty?: string;
  reign?: string;
  portfolio?: string;
  artistRole?: string;
  artistPrefix?: string;
  artistDisplayName?: string;
  artistDisplayBio?: string;
  objectDate?: string;
  objectBeginDate?: number;
  objectEndDate?: number;
  medium?: string;
  dimensions?: string;
  creditLine?: string;
  geographyType?: string;
  city?: string;
  state?: string;
  county?: string;
  country?: string;
  region?: string;
  subregion?: string;
  locale?: string;
  locus?: string;
  excavation?: string;
  river?: string;
  classification?: string;
  rightsAndReproduction?: string;
  linkResource?: string;
  metadataDate?: string;
  repository?: string;
  objectURL?: string;
  tags?: MetTag[] | null;
  GalleryNumber?: string;
  department?: string;
};

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (!query) {
    return NextResponse.json(
      createCollectionSearchPayload({
        query: "",
        records: [],
        source: "The Metropolitan Museum of Art",
        state: "failed",
        sources: [MET_SOURCE],
        total: 0,
        error: "Provide a q parameter.",
      }) satisfies ProviderCollectionSearchPayload,
      { status: 400 },
    );
  }

  try {
    const searchUrl = new URL(`${MET_BASE}/search`);
    searchUrl.searchParams.set("q", query);
    searchUrl.searchParams.set("hasImages", "true");
    const searchResponse = await fetch(searchUrl, { next: { revalidate: 3600 } });
    if (!searchResponse.ok) throw new MetProviderError(searchResponse.status);
    const searchPayload = (await searchResponse.json()) as MetSearch;
    const ids = (searchPayload.objectIDs ?? []).slice(0, CANDIDATE_COUNT);

    const objects = await Promise.all(ids.map(fetchObject));
    const records = objects
      .filter((object): object is MetObject => Boolean(object?.primaryImageSmall || object?.primaryImage))
      .map(normalizeObject)
      .slice(0, PAGE_SIZE);
    const total = Math.max(searchPayload.total ?? records.length, records.length);
    const expected = Math.min(PAGE_SIZE, total);
    const isPartial = records.length < expected;
    const retrievedAt = new Date();

    return NextResponse.json(
      createCollectionSearchPayload({
        query,
        records,
        source: "The Metropolitan Museum of Art",
        state: isPartial ? "partial" : "cached",
        sources: [MET_SOURCE],
        total,
        pageSize: PAGE_SIZE,
        retrievedAt: retrievedAt.toISOString(),
        staleAfter: new Date(retrievedAt.getTime() + STALE_SECONDS * 1_000).toISOString(),
        note: isPartial
          ? `The provider reported ${total} matches; ${records.length} image-bearing records were available for this sample.`
          : `The provider reported ${total} matches. This route serves a cached sample of up to ${PAGE_SIZE} image-bearing records.`,
      }) satisfies ProviderCollectionSearchPayload,
      { headers: { "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}` } },
    );
  } catch (error) {
    const rateLimited = error instanceof MetProviderError && error.status === 429;
    const message = rateLimited
      ? "The Met collection is rate-limiting requests. Try again shortly."
      : error instanceof Error
        ? error.message
        : "Unable to search the museum collection.";
    return NextResponse.json(
      createCollectionSearchPayload({
        query,
        records: [],
        source: "The Metropolitan Museum of Art",
        state: rateLimited ? "rate-limited" : "failed",
        sources: [MET_SOURCE],
        total: 0,
        error: message,
      }) satisfies ProviderCollectionSearchPayload,
      { status: rateLimited ? 429 : 502 },
    );
  }
}

class MetProviderError extends Error {
  constructor(readonly status: number) {
    super(`The Met search returned ${status}`);
  }
}

async function fetchObject(id: number): Promise<MetObject | null> {
  try {
    const response = await fetch(`${MET_BASE}/objects/${id}`, { next: { revalidate: 86_400 } });
    if (!response.ok) return null;
    return (await response.json()) as MetObject;
  } catch {
    return null;
  }
}

function normalizeObject(object: MetObject): CollectionMediaRecord {
  const creator = clean(object.artistDisplayName) || clean(object.culture) || "Unknown maker";
  const title = clean(object.title) || clean(object.objectName) || `Object ${object.objectID}`;
  const place = [object.city, object.region, object.country].map(clean).filter(Boolean).join(", ");
  const tags = [
    clean(object.classification),
    clean(object.objectName),
    ...(object.tags ?? []).map((tag) => clean(tag.term)),
  ].filter((value): value is string => Boolean(value)).slice(0, 8);

  return {
    id: String(object.objectID),
    title,
    subtitle: clean(object.objectName) || clean(object.classification),
    primaryCreator: creator,
    year: clean(object.objectDate) || yearRange(object.objectBeginDate, object.objectEndDate),
    description: objectDescription(object, creator, place),
    imageUrl: object.primaryImageSmall || object.primaryImage || undefined,
    tags,
    facts: {
      objectName: clean(object.objectName),
      department: clean(object.department),
      culture: clean(object.culture),
      period: clean(object.period),
      dynasty: clean(object.dynasty),
      reign: clean(object.reign),
      artist: creator !== "Unknown maker" ? creator : undefined,
      artistRole: clean(object.artistRole),
      artistBio: clean(object.artistDisplayBio),
      date: clean(object.objectDate),
      medium: clean(object.medium),
      dimensions: clean(object.dimensions),
      classification: clean(object.classification),
      place: place || undefined,
      creditLine: clean(object.creditLine),
      gallery: clean(object.GalleryNumber),
      publicDomain: object.isPublicDomain ? "Yes" : "Not marked public domain",
      metadataUpdated: clean(object.metadataDate),
    },
    sources: [
      {
        label: "The Met object record",
        url: object.objectURL || `https://www.metmuseum.org/art/collection/search/${object.objectID}`,
        kind: "provider",
        scope: "Object metadata and image attribution",
      },
    ],
  };
}

function objectDescription(object: MetObject, creator: string, place: string) {
  const pieces = [
    clean(object.objectName),
    creator !== "Unknown maker" ? `by ${creator}` : undefined,
    clean(object.objectDate),
    clean(object.culture),
    place ? `associated with ${place}` : undefined,
    clean(object.medium) ? `made with ${clean(object.medium)}` : undefined,
  ].filter(Boolean);
  return pieces.length ? `${pieces.join(" · ")}.` : "Museum collection object.";
}

function clean(value: string | null | undefined) {
  const result = value?.trim();
  return result || undefined;
}

function yearRange(begin?: number, end?: number) {
  if (!begin && !end) return undefined;
  if (begin === end || !end) return String(begin);
  if (!begin) return String(end);
  return `${begin}–${end}`;
}
