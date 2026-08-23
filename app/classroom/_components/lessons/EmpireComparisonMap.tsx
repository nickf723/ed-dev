"use client";

import { useEffect, useMemo } from "react";
import type { FeatureCollection, Geometry } from "geojson";
import type { PathOptions } from "leaflet";
import {
  GeoJSON as LeafletGeoJSON,
  MapContainer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  COMPARISON_EMPIRES,
  type EmpireId,
} from "@/app/classroom/_components/lessons/ottoman-mughal-model";
import {
  getGeometryBounds,
  getHistoricalEmpireFeature,
  WORLD_1750_NEAR_PERIOD,
  WORLD_LAND,
  type HistoricalEmpireProperties,
} from "@/lib/maps/historical-map-adapter";

export type EmpireMapFocus = "both" | EmpireId;

const COMPARISON_LAYER = {
  type: "FeatureCollection",
  features: WORLD_1750_NEAR_PERIOD.features.filter(
    (feature) =>
      feature.properties.id === "ottoman" || feature.properties.id === "mughal"
  ),
} as FeatureCollection<Geometry, HistoricalEmpireProperties>;

export default function EmpireComparisonMap({
  focus,
  onFocus,
}: {
  focus: EmpireMapFocus;
  onFocus: (focus: EmpireMapFocus) => void;
}) {
  const style = useMemo(
    () =>
      (feature?: { properties: HistoricalEmpireProperties }): PathOptions => {
        const id = feature?.properties.id as EmpireId;
        const empire = COMPARISON_EMPIRES[id];
        const emphasized = focus === "both" || focus === id;

        return {
          color: empire?.mapColor ?? "#93c5fd",
          weight: emphasized ? 2.6 : 1.1,
          opacity: emphasized ? 0.95 : 0.3,
          fillColor: empire?.mapColor ?? "#93c5fd",
          fillOpacity: emphasized ? 0.29 : 0.07,
          dashArray: "8 5",
        };
      },
    [focus]
  );

  return (
    <div className="mt-4 overflow-hidden rounded-[18px] border border-blue-200/[0.13] bg-[#05101c]">
      <div className="relative h-[360px] sm:h-[430px]">
        <MapContainer
          center={[31, 55]}
          zoom={3}
          minZoom={2}
          maxZoom={6}
          maxBounds={[
            [-15, -10],
            [70, 120],
          ]}
          scrollWheelZoom={false}
          zoomControl={false}
          className="empire-comparison-map h-full w-full bg-[#061525]"
          aria-label="Interactive comparison map showing reconstructed near-period footprints for the Ottoman and Mughal Empires"
        >
          <ZoomControl position="bottomright" />
          <LeafletGeoJSON
            data={WORLD_LAND}
            interactive={false}
            style={{
              color: "rgba(147, 197, 253, 0.20)",
              weight: 0.7,
              fillColor: "#13283a",
              fillOpacity: 0.82,
            }}
          />
          <LeafletGeoJSON
            key={focus}
            data={COMPARISON_LAYER}
            style={style}
            onEachFeature={(feature, layer) => {
              const properties =
                feature.properties as HistoricalEmpireProperties;
              layer.bindTooltip(
                `${properties.name} · reconstructed from ${properties.sourceYear}`,
                { sticky: true, direction: "top" }
              );
              layer.on({ click: () => onFocus(properties.id as EmpireId) });
            }}
          />
          <MapFocusController focus={focus} />
        </MapContainer>

        <div className="pointer-events-none absolute left-3 top-3 z-[500] max-w-[250px] rounded-[12px] border border-blue-100/[0.14] bg-[#06111f]/90 px-3 py-2 backdrop-blur-xl">
          <div className="text-[12px] font-semibold text-blue-50">
            Two connected regions
          </div>
          <div className="mt-0.5 text-[11px] leading-4 text-blue-100/60">
            Footprint shows location—not equal control in every place
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100/[0.08] bg-black/[0.16] p-3 sm:p-4">
        <div className="grid gap-2 sm:grid-cols-3">
          <FocusButton
            active={focus === "both"}
            label="Compare both"
            color="#93c5fd"
            onClick={() => onFocus("both")}
          />
          {(Object.keys(COMPARISON_EMPIRES) as EmpireId[]).map((id) => (
            <FocusButton
              key={id}
              active={focus === id}
              label={COMPARISON_EMPIRES[id].name}
              color={COMPARISON_EMPIRES[id].mapColor}
              onClick={() => onFocus(id)}
            />
          ))}
        </div>
        <div className="mt-3 grid gap-2 text-[12px] leading-5 text-stone-400 sm:grid-cols-3">
          <Legend swatch="land" text="Pale land = coastline" />
          <Legend swatch="footprint" text="Color = near-period footprint" />
          <Legend swatch="uncertain" text="Broken edge = approximate" />
        </div>
      </div>

      <style>{`
        .empire-comparison-map .leaflet-control-zoom a {
          border-color: rgba(147, 197, 253, 0.16);
          background: rgba(6, 17, 31, 0.9);
          color: rgba(219, 234, 254, 0.9);
        }
        .empire-comparison-map .leaflet-control-zoom a:hover,
        .empire-comparison-map .leaflet-control-zoom a:focus {
          background: rgba(30, 64, 175, 0.72);
          color: white;
        }
        .empire-comparison-map .leaflet-tooltip {
          border: 1px solid rgba(147, 197, 253, 0.18);
          border-radius: 10px;
          background: rgba(6, 17, 31, 0.94);
          color: rgba(239, 246, 255, 0.94);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
          font-size: 12px;
        }
        .empire-comparison-map .leaflet-tooltip-top::before {
          border-top-color: rgba(6, 17, 31, 0.94);
        }
      `}</style>
    </div>
  );
}

function MapFocusController({ focus }: { focus: EmpireMapFocus }) {
  const map = useMap();

  useEffect(() => {
    const ids: EmpireId[] = focus === "both" ? ["ottoman", "mughal"] : [focus];
    const bounds: [number, number][] = ids.flatMap((id) => {
      const feature = getHistoricalEmpireFeature(id);
      const featureBounds = feature
        ? getGeometryBounds(feature.geometry)
        : null;
      return featureBounds ? [...featureBounds] : [];
    });

    if (!bounds.length) return;
    const lats = bounds.map(([lat]) => lat);
    const lngs = bounds.map(([, lng]) => lng);
    map.fitBounds(
      [
        [Math.min(...lats), Math.min(...lngs)],
        [Math.max(...lats), Math.max(...lngs)],
      ],
      { padding: [30, 30], maxZoom: focus === "both" ? 3 : 4, animate: false }
    );
  }, [focus, map]);

  return null;
}

function FocusButton({
  active,
  label,
  color,
  onClick,
}: {
  active: boolean;
  label: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`flex min-h-11 items-center gap-2 rounded-[12px] border px-3 py-2 text-left text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 ${
        active
          ? "border-blue-100/25 bg-blue-300/[0.09] text-blue-50"
          : "border-white/[0.07] bg-white/[0.018] text-stone-400"
      }`}
    >
      <span
        className="h-3.5 w-3.5 shrink-0 rounded-[4px] border-2 border-dashed"
        style={{ borderColor: color, backgroundColor: `${color}33` }}
        aria-hidden="true"
      />
      {label}
    </button>
  );
}

function Legend({
  swatch,
  text,
}: {
  swatch: "land" | "footprint" | "uncertain";
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3.5 w-5 shrink-0 rounded-[4px] ${
          swatch === "land"
            ? "border border-blue-100/20 bg-[#13283a]"
            : swatch === "footprint"
              ? "border border-blue-300/70 bg-blue-300/25"
              : "border-2 border-dashed border-blue-200/60 bg-transparent"
        }`}
        aria-hidden="true"
      />
      <span>{text}</span>
    </div>
  );
}
