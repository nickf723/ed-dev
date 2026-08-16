import { NextRequest, NextResponse } from "next/server";
import {
  ANIMAL_SEED_BY_ID,
  ZOOLOGY_COLLECTION_BY_ID,
  collectionsForSpecies,
  type AnimalRecord,
  type AnimalSeed,
} from "@/app/natural-science/biology/zoology/zoology-data";

export const runtime = "nodejs";

const INAT_TAXA_ENDPOINT = "https://api.inaturalist.org/v1/taxa";

type INaturalistPhoto = {
  medium_url?: string | null;
  small_url?: string | null;
  square_url?: string | null;
  attribution?: string | null;
  license_code?: string | null;
};

type INaturalistConservation = {
  status?: string | null;
  status_name?: string | null;
  authority?: string | null;
};

type INaturalistAncestor = {
  rank?: string | null;
  name?: string | null;
  preferred_common_name?: string | null;
};

type INaturalistTaxon = {
  id: number;
  name?: string | null;
  preferred_common_name?: string | null;
  rank?: string | null;
  iconic_taxon_name?: string | null;
  wikipedia_url?: string | null;
  wikipedia_summary?: string | null;
  observations_count?: number | null;
  default_photo?: INaturalistPhoto | null;
  conservation_status?: INaturalistConservation | null;
  ancestors?: INaturalistAncestor[] | null;
};

type INaturalistResponse = {
  results?: INaturalistTaxon[];
};

function taxonUrl(query: string, perPage: number) {
  const url = new URL(INAT_TAXA_ENDPOINT);
  url.searchParams.set("q", query);
  url.searchParams.set("taxon_id", "1");
  url.searchParams.set("rank", "species");
  url.searchParams.set("is_active", "true");
  url.searchParams.set("locale", "en");
  url.searchParams.set("per_page", String(perPage));
  return url;
}

async function requestTaxa(query: string, perPage: number) {
  const response = await fetch(taxonUrl(query, perPage), {
    headers: { Accept: "application/json" },
    next: { revalidate: 86_400 },
  } as RequestInit & { next: { revalidate: number } });
  if (!response.ok) {
    throw new Error(`iNaturalist returned ${response.status}`);
  }
  const payload = (await response.json()) as INaturalistResponse;
  return payload.results ?? [];
}

function normalized(value: string | null | undefined) {
  return (value ?? "").trim().toLocaleLowerCase();
}

function selectBestTaxon(results: INaturalistTaxon[], seed: AnimalSeed) {
  const exactScientific = results.find(
    (item) => normalized(item.name) === normalized(seed.scientificName),
  );
  if (exactScientific) return exactScientific;

  const exactCommon = results.find(
    (item) =>
      normalized(item.preferred_common_name) === normalized(seed.commonName),
  );
  return exactCommon ?? results[0];
}

function ancestorAtRank(
  taxon: INaturalistTaxon,
  rank: "phylum" | "class" | "order" | "family",
) {
  return taxon.ancestors?.find((ancestor) => ancestor.rank === rank)?.name ?? undefined;
}

function photoUrl(photo: INaturalistPhoto | null | undefined) {
  return photo?.medium_url ?? photo?.small_url ?? photo?.square_url ?? undefined;
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

function normalizeTaxon(
  taxon: INaturalistTaxon,
  seed?: AnimalSeed,
): AnimalRecord {
  const commonName =
    taxon.preferred_common_name ?? seed?.commonName ?? taxon.name ?? "Unknown animal";
  const scientificName = taxon.name ?? seed?.scientificName ?? commonName;
  const conservation = taxon.conservation_status;

  return {
    id: taxon.id,
    seedId: seed?.id,
    commonName,
    scientificName,
    rank: taxon.rank ?? "species",
    iconicTaxonName: taxon.iconic_taxon_name ?? seed?.className,
    taxonomy: {
      kingdom: "Animalia",
      phylum: seed?.phylum ?? ancestorAtRank(taxon, "phylum"),
      className: seed?.className ?? ancestorAtRank(taxon, "class") ?? taxon.iconic_taxon_name ?? undefined,
      order: seed?.order ?? ancestorAtRank(taxon, "order"),
      family: seed?.family ?? ancestorAtRank(taxon, "family"),
    },
    summary: taxon.wikipedia_summary ?? seed?.summary ?? `A species in the animal kingdom: ${scientificName}.`,
    imageUrl: photoUrl(taxon.default_photo),
    imageAttribution: taxon.default_photo?.attribution ?? undefined,
    imageLicense: taxon.default_photo?.license_code ?? undefined,
    observationsCount: taxon.observations_count ?? undefined,
    conservationStatus:
      conservation?.status_name ?? conservation?.status?.toUpperCase() ?? undefined,
    conservationAuthority: conservation?.authority ?? undefined,
    wikipediaUrl: taxon.wikipedia_url ?? undefined,
    iNaturalistUrl: `https://www.inaturalist.org/taxa/${taxon.id}`,
    habitats: seed?.habitats ?? [],
    regions: seed?.regions ?? [],
    diet: seed?.diet,
    ecologicalRoles: seed?.ecologicalRoles ?? [],
    activity: seed?.activity,
    traits: seed?.traits ?? [],
    collectionIds: seed
      ? collectionsForSpecies(seed.id).map((item) => item.id)
      : [],
    source: "iNaturalist",
  };
}

async function fetchSeed(seed: AnimalSeed) {
  try {
    const results = await requestTaxa(seed.scientificName, 5);
    const best = selectBestTaxon(results, seed);
    return best ? normalizeTaxon(best, seed) : fallbackRecord(seed);
  } catch {
    return fallbackRecord(seed);
  }
}

async function collectionResponse(collectionId: string) {
  const collection = ZOOLOGY_COLLECTION_BY_ID.get(collectionId);
  if (!collection) {
    return NextResponse.json(
      { error: `Unknown zoology collection: ${collectionId}` },
      { status: 404 },
    );
  }

  const seeds = collection.speciesIds
    .map((id) => ANIMAL_SEED_BY_ID.get(id))
    .filter((item): item is AnimalSeed => Boolean(item));
  const animals = await Promise.all(seeds.map(fetchSeed));

  return NextResponse.json(
    { mode: "collection", collectionId, animals },
    {
      headers: {
        "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
      },
    },
  );
}

async function searchResponse(query: string) {
  try {
    const results = await requestTaxa(query, 18);
    const seen = new Set<number>();
    const animals = results
      .filter((taxon) => {
        if (seen.has(taxon.id)) return false;
        seen.add(taxon.id);
        return Boolean(taxon.name);
      })
      .map((taxon) => normalizeTaxon(taxon));

    return NextResponse.json(
      { mode: "search", query, animals },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to search animal taxa",
      },
      { status: 502 },
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
    { status: 400 },
  );
}
