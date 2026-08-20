import { NextRequest, NextResponse } from "next/server";
import {
  ANIMAL_SEEDS,
  ANIMAL_SEED_BY_ID,
  ZOOLOGY_COLLECTION_BY_ID,
  collectionsForSpecies,
  type AnimalRecord,
  type AnimalSeed,
} from "@/app/natural-science/biology/zoology/zoology-data";
import { createCollectionSearchPayload } from "@/lib/collections/result.mjs";
import {
  buildINaturalistTaxaUrl,
  INATURALIST_SOURCE,
  normalizeINaturalistTaxon,
  ZOOLOGY_CURATED_SOURCE,
  type INaturalistTaxon,
} from "@/lib/collections/providers/inaturalist.mjs";

export const runtime = "nodejs";
const DAY = 86_400;
type INaturalistResponse = {
  total_results?: number;
  results?: INaturalistTaxon[];
};

class ProviderError extends Error {
  constructor(
    message: string,
    readonly status: number
  ) {
    super(message);
  }
}

async function requestTaxa(query: string, perPage: number, revalidate: number) {
  const response = await fetch(buildINaturalistTaxaUrl(query, perPage), {
    headers: {
      Accept: "application/json",
      "User-Agent": "EducationStation64-ZoologyAtlas/1.0",
    },
    next: { revalidate },
  } as RequestInit & { next: { revalidate: number } });
  if (!response.ok)
    throw new ProviderError(
      `iNaturalist returned ${response.status}`,
      response.status
    );
  return (await response.json()) as INaturalistResponse;
}

const normalized = (value: string | null | undefined) =>
  (value ?? "").trim().toLocaleLowerCase();

function selectBestTaxon(results: INaturalistTaxon[], seed: AnimalSeed) {
  return (
    results.find(
      (item) => normalized(item.name) === normalized(seed.scientificName)
    ) ??
    results.find(
      (item) =>
        normalized(item.preferred_common_name) === normalized(seed.commonName)
    ) ??
    results[0]
  );
}

function fallbackRecord(seed: AnimalSeed): AnimalRecord {
  return {
    id: seed.id,
    seedId: seed.id,
    commonName: seed.commonName,
    scientificName: seed.scientificName,
    rank: "species",
    iconicTaxonName: seed.className,
    taxonomy: {
      kingdom: "Animalia",
      phylum: seed.phylum,
      className: seed.className,
      order: seed.order,
      family: seed.family,
    },
    summary: seed.summary,
    habitats: seed.habitats,
    regions: seed.regions,
    diet: seed.diet,
    ecologicalRoles: seed.ecologicalRoles,
    activity: seed.activity,
    traits: seed.traits,
    collectionIds: collectionsForSpecies(seed.id).map((item) => item.id),
    source: "curated",
  };
}

async function fetchSeed(seed: AnimalSeed) {
  try {
    const payload = await requestTaxa(seed.scientificName, 5, DAY);
    const best = selectBestTaxon(payload.results ?? [], seed);
    return best
      ? normalizeINaturalistTaxon(
          best,
          seed,
          collectionsForSpecies(seed.id).map((item) => item.id)
        )
      : fallbackRecord(seed);
  } catch {
    return fallbackRecord(seed);
  }
}

function envelope(
  records: AnimalRecord[],
  options: {
    query: string;
    state: "cached" | "partial" | "fallback" | "rate-limited" | "failed";
    total?: number;
    pageSize?: number;
    note: string;
    error?: string;
  }
) {
  return createCollectionSearchPayload({
    query: options.query,
    records,
    source: "iNaturalist + curated zoology atlas",
    state: options.state,
    sources: [INATURALIST_SOURCE, ZOOLOGY_CURATED_SOURCE],
    total: Math.max(options.total ?? records.length, records.length),
    pageSize: options.pageSize,
    retrievedAt: new Date().toISOString(),
    staleAfter: new Date(Date.now() + DAY * 1_000).toISOString(),
    note: options.note,
    error: options.error,
  });
}

async function collectionResponse(collectionId: string) {
  const collection = ZOOLOGY_COLLECTION_BY_ID.get(collectionId);
  if (!collection)
    return NextResponse.json(
      { error: `Unknown zoology collection: ${collectionId}` },
      { status: 404 }
    );
  const seeds = collection.speciesIds
    .map((id) => ANIMAL_SEED_BY_ID.get(id))
    .filter((item): item is AnimalSeed => Boolean(item));
  const records = await Promise.all(seeds.map(fetchSeed));
  const fallbackCount = records.filter(
    (record) => record.source === "curated"
  ).length;
  return NextResponse.json(
    envelope(records, {
      query: collection.label,
      state: fallbackCount ? "partial" : "cached",
      note: fallbackCount
        ? `${fallbackCount} of ${records.length} records use the reviewed atlas baseline because live enrichment was unavailable.`
        : "Reviewed atlas records enriched from iNaturalist and cached for one day.",
    }),
    {
      headers: {
        "Cache-Control":
          "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}

function curatedSearch(query: string) {
  const needle = normalized(query);
  return ANIMAL_SEEDS.filter((seed) =>
    [
      seed.commonName,
      seed.scientificName,
      seed.phylum,
      seed.className,
      seed.order,
      seed.family,
      ...seed.habitats,
      ...seed.regions,
      ...seed.traits,
    ]
      .join(" ")
      .toLocaleLowerCase()
      .includes(needle)
  )
    .slice(0, 18)
    .map(fallbackRecord);
}

async function searchResponse(query: string) {
  try {
    const payload = await requestTaxa(query, 18, 3_600);
    const seen = new Set<number>();
    const records = (payload.results ?? [])
      .filter((taxon) => {
        if (seen.has(taxon.id) || !taxon.name) return false;
        seen.add(taxon.id);
        return true;
      })
      .map((taxon) => normalizeINaturalistTaxon(taxon));
    return NextResponse.json(
      envelope(records, {
        query,
        state: "cached",
        total: payload.total_results,
        pageSize: 18,
        note: "Provider-wide result count with the first cached page of active animal species.",
      }),
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (error) {
    const records = curatedSearch(query);
    const rateLimited = error instanceof ProviderError && error.status === 429;
    return NextResponse.json(
      envelope(records, {
        query,
        state: rateLimited
          ? "rate-limited"
          : records.length
            ? "fallback"
            : "failed",
        note: records.length
          ? "Live search is unavailable; showing matching records from the reviewed zoology atlas."
          : "Neither live search nor the reviewed atlas returned a match.",
        error:
          error instanceof Error
            ? error.message
            : "Unable to search animal taxa",
      }),
      {
        status: records.length ? 200 : 502,
        headers: { "Cache-Control": "no-store" },
      }
    );
  }
}

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get("collection")?.trim();
  const query = request.nextUrl.searchParams.get("q")?.trim();
  if (query) return searchResponse(query);
  if (collection) return collectionResponse(collection);
  return NextResponse.json(
    { error: "Provide either a collection or q parameter." },
    { status: 400 }
  );
}
