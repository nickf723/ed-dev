import { NextRequest, NextResponse } from "next/server";
import { createCollectionSearchPayload } from "@/lib/collections/result.mjs";
import {
  buildMetObjectUrl,
  buildMetSearchUrl,
  MET_COLLECTION_SOURCE,
  normalizeMetObject,
  type MetObject,
} from "@/lib/collections/providers/met.mjs";
import type { ProviderCollectionSearchPayload } from "@/lib/collections/schema";

export const runtime = "nodejs";

const PAGE_SIZE = 16;
const CANDIDATE_COUNT = 24;
const CACHE_SECONDS = 3_600;
const STALE_SECONDS = 86_400;
type MetSearch = {
  total?: number;
  objectIDs?: number[] | null;
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
        sources: [MET_COLLECTION_SOURCE],
        total: 0,
        error: "Provide a q parameter.",
      }) satisfies ProviderCollectionSearchPayload,
      { status: 400 }
    );
  }

  try {
    const searchResponse = await fetch(buildMetSearchUrl(query), {
      next: { revalidate: 3600 },
    });
    if (!searchResponse.ok) throw new MetProviderError(searchResponse.status);
    const searchPayload = (await searchResponse.json()) as MetSearch;
    const ids = (searchPayload.objectIDs ?? []).slice(0, CANDIDATE_COUNT);

    const objects = await Promise.all(ids.map(fetchObject));
    const records = objects
      .filter((object): object is MetObject =>
        Boolean(object?.primaryImageSmall || object?.primaryImage)
      )
      .map(normalizeMetObject)
      .slice(0, PAGE_SIZE);
    const total = Math.max(
      searchPayload.total ?? records.length,
      records.length
    );
    const expected = Math.min(PAGE_SIZE, total);
    const isPartial = records.length < expected;
    const retrievedAt = new Date();

    return NextResponse.json(
      createCollectionSearchPayload({
        query,
        records,
        source: "The Metropolitan Museum of Art",
        state: isPartial ? "partial" : "cached",
        sources: [MET_COLLECTION_SOURCE],
        total,
        pageSize: PAGE_SIZE,
        retrievedAt: retrievedAt.toISOString(),
        staleAfter: new Date(
          retrievedAt.getTime() + STALE_SECONDS * 1_000
        ).toISOString(),
        note: isPartial
          ? `The provider reported ${total} matches; ${records.length} image-bearing records were available for this sample.`
          : `The provider reported ${total} matches. This route serves a cached sample of up to ${PAGE_SIZE} image-bearing records.`,
      }) satisfies ProviderCollectionSearchPayload,
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${STALE_SECONDS}`,
        },
      }
    );
  } catch (error) {
    const rateLimited =
      error instanceof MetProviderError && error.status === 429;
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
        sources: [MET_COLLECTION_SOURCE],
        total: 0,
        error: message,
      }) satisfies ProviderCollectionSearchPayload,
      { status: rateLimited ? 429 : 502 }
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
    const response = await fetch(buildMetObjectUrl(id), {
      next: { revalidate: 86_400 },
    });
    if (!response.ok) return null;
    return (await response.json()) as MetObject;
  } catch {
    return null;
  }
}
