import type { CollectionSource } from "../schema";
import type { ExoplanetRecord } from "../../../app/natural-science/astronomy/planetary-astronomy/exoplanet-types";

export type NASAExoplanetRow = {
  pl_name?: string | null;
  hostname?: string | null;
  discoverymethod?: string | null;
  disc_year?: number | null;
  disc_facility?: string | null;
  pl_orbper?: number | null;
  pl_rade?: number | null;
  pl_bmasse?: number | null;
  pl_eqt?: number | null;
  sy_dist?: number | null;
  sy_pnum?: number | null;
  st_spectype?: string | null;
};

export const NASA_EXOPLANET_ARCHIVE_SOURCE: Readonly<CollectionSource>;
export function buildExoplanetTapUrl(options?: {
  search?: string;
  limit?: number;
  count?: boolean;
}): URL;
export function normalizeNASAExoplanet(row: NASAExoplanetRow): ExoplanetRecord;
export function classifyPlanetRadius(radiusEarth?: number): string;
