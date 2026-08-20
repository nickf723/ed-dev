import type { CollectionSource } from "@/lib/collections/schema";

export type ExoplanetRecord = {
  id: string;
  name: string;
  hostName: string;
  discoveryMethod: string;
  discoveryYear?: number;
  discoveryFacility?: string;
  orbitalPeriodDays?: number;
  radiusEarth?: number;
  massEarth?: number;
  equilibriumTemperatureK?: number;
  distanceParsecs?: number;
  planetsInSystem?: number;
  stellarSpectralType?: string;
  sizeClass: string;
  sourceUrl: string;
  source: "NASA Exoplanet Archive" | "curated";
  sources: CollectionSource[];
};
