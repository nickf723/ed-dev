import type { FeatureCollection, Geometry } from "geojson";
import landData from "@/app/classroom/_data/maps/world-land-110m.json";
import empireData from "@/app/classroom/_data/maps/world-1750-near-period.json";

export type HistoricalStateId =
  | "ottoman"
  | "mughal"
  | "qing"
  | "tokugawa"
  | "bourbon"
  | "ashanti";

export type HistoricalEmpireProperties = {
  id: HistoricalStateId;
  name: string;
  sourceName: string;
  sourceYear: 1715 | 1783;
  sourceBorderPrecision: number | null;
  reconstruction: "near-period";
};

export type HistoricalMapProvenance = {
  lessonYear: number;
  method: string;
  source: string;
  sourceUrl: string;
  license: string;
  sourceSnapshots: number[];
  reviewedOn: string;
};

type HistoricalFeatureCollection = FeatureCollection<
  Geometry,
  HistoricalEmpireProperties
> & {
  metadata: HistoricalMapProvenance;
};

export const WORLD_LAND = landData as unknown as FeatureCollection;
export const WORLD_1750_NEAR_PERIOD =
  empireData as unknown as HistoricalFeatureCollection;
export const WORLD_1750_PROVENANCE = WORLD_1750_NEAR_PERIOD.metadata;

export function getHistoricalEmpireFeature(id: HistoricalStateId) {
  return WORLD_1750_NEAR_PERIOD.features.find(
    (feature) => feature.properties.id === id
  );
}

export function getGeometryBounds(geometry: Geometry) {
  const points: [number, number][] = [];

  function visit(value: unknown) {
    if (!Array.isArray(value)) return;
    if (
      value.length >= 2 &&
      typeof value[0] === "number" &&
      typeof value[1] === "number"
    ) {
      points.push([value[1], value[0]]);
      return;
    }
    value.forEach(visit);
  }

  if ("coordinates" in geometry) visit(geometry.coordinates);
  if (!points.length) return null;

  const lats = points.map(([lat]) => lat);
  const lngs = points.map(([, lng]) => lng);
  return [
    [Math.min(...lats), Math.min(...lngs)],
    [Math.max(...lats), Math.max(...lngs)],
  ] as [[number, number], [number, number]];
}
