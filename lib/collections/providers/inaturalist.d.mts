import type { CollectionSource } from "../schema";
import type {
  AnimalRecord,
  AnimalSeed,
} from "../../../app/natural-science/biology/zoology/zoology-types";

export type INaturalistTaxon = {
  id: number;
  name?: string | null;
  preferred_common_name?: string | null;
  rank?: string | null;
  iconic_taxon_name?: string | null;
  wikipedia_url?: string | null;
  wikipedia_summary?: string | null;
  observations_count?: number | null;
  default_photo?: {
    medium_url?: string | null;
    small_url?: string | null;
    square_url?: string | null;
    attribution?: string | null;
    license_code?: string | null;
  } | null;
  conservation_status?: {
    status?: string | null;
    status_name?: string | null;
    authority?: string | null;
  } | null;
  ancestors?: { rank?: string | null; name?: string | null }[] | null;
};

export const INATURALIST_SOURCE: Readonly<CollectionSource>;
export const ZOOLOGY_CURATED_SOURCE: Readonly<CollectionSource>;
export function buildINaturalistTaxaUrl(query: string, perPage?: number): URL;
export function normalizeINaturalistTaxon(
  taxon: INaturalistTaxon,
  seed?: AnimalSeed,
  collectionIds?: string[]
): AnimalRecord;
