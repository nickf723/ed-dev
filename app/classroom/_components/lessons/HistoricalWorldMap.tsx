"use client";

import { useEffect, useMemo, useRef } from "react";
import type { Feature, Geometry } from "geojson";
import type { PathOptions } from "leaflet";
import {
  GeoJSON as LeafletGeoJSON,
  MapContainer,
  useMap,
  ZoomControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {
  getState,
  STATES,
  type StateId,
} from "@/app/classroom/_components/lessons/world-in-1750-model";
import {
  getHistoricalEmpireFeature,
  WORLD_1750_NEAR_PERIOD,
  WORLD_LAND,
  type HistoricalEmpireProperties,
} from "@/lib/maps/historical-map-adapter";

export default function HistoricalWorldMap({
  selectedId,
  onSelect,
}: {
  selectedId: StateId;
  onSelect: (id: StateId) => void;
}) {
  const selected = getState(selectedId);
  const style = useMemo(
    () =>
      (
        feature?: Feature<Geometry, HistoricalEmpireProperties>
      ): PathOptions => {
        const record = feature ? getState(feature.properties.id) : selected;
        const isSelected = record.id === selectedId;

        return {
          color: record.mapColor,
          weight: isSelected ? 2.8 : 1.25,
          opacity: isSelected ? 1 : 0.5,
          fillColor: record.mapColor,
          fillOpacity: isSelected ? 0.36 : 0.12,
          dashArray: isSelected ? "8 5" : "5 7",
        };
      },
    [selected, selectedId]
  );

  return (
    <div className="mt-4 overflow-hidden rounded-[18px] border border-blue-200/[0.13] bg-[#05101c]">
      <div className="relative h-[390px] sm:h-[460px]">
        <MapContainer
          center={[27, 45]}
          zoom={2}
          minZoom={1}
          maxZoom={6}
          maxBounds={[
            [-70, -180],
            [82, 180],
          ]}
          scrollWheelZoom={false}
          zoomControl={false}
          className="historical-world-map h-full w-full bg-[#061525]"
          aria-label="Interactive world map with reconstructed near-period footprints for six states and empires around 1750"
        >
          <ZoomControl position="bottomright" />
          <LeafletGeoJSON
            data={WORLD_LAND}
            interactive={false}
            style={{
              color: "rgba(147, 197, 253, 0.22)",
              weight: 0.7,
              fillColor: "#13283a",
              fillOpacity: 0.82,
            }}
          />
          <LeafletGeoJSON
            key={selectedId}
            data={WORLD_1750_NEAR_PERIOD}
            style={style}
            onEachFeature={(feature, layer) => {
              const properties =
                feature.properties as HistoricalEmpireProperties;
              layer.bindTooltip(
                `${properties.name} · source snapshot ${properties.sourceYear}`,
                { sticky: true, direction: "top" }
              );
              layer.on({
                click: () => onSelect(properties.id),
              });
            }}
          />
          <SelectionController selectedId={selectedId} />
        </MapContainer>

        <div className="bg-[#06111f]/88 pointer-events-none absolute left-3 top-3 z-[500] rounded-[12px] border border-blue-100/[0.14] px-3 py-2 backdrop-blur-xl">
          <div className="text-[12px] font-semibold text-blue-50">
            World orientation · circa 1750
          </div>
          <div className="mt-0.5 text-[11px] text-blue-100/60">
            Select a footprint or use the list below
          </div>
        </div>
      </div>

      <div className="border-t border-blue-100/[0.08] bg-black/[0.16] p-3 sm:p-4">
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STATES.map((state) => (
            <button
              key={state.id}
              type="button"
              onClick={() => onSelect(state.id)}
              aria-pressed={selectedId === state.id}
              className={`flex min-h-12 items-center gap-3 rounded-[12px] border px-3 py-2 text-left text-[13px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300/70 ${
                selectedId === state.id
                  ? "border-blue-100/25 bg-blue-300/[0.09] text-blue-50"
                  : "border-white/[0.07] bg-white/[0.018] text-stone-400 hover:text-stone-200"
              }`}
            >
              <span
                className="h-3.5 w-3.5 shrink-0 rounded-[4px] border-2 border-dashed"
                style={{
                  borderColor: state.mapColor,
                  backgroundColor: `${state.mapColor}33`,
                }}
                aria-hidden="true"
              />
              <span className="min-w-0">
                <span className="block">{state.shortName}</span>
                <span className="mt-0.5 block text-[11px] font-normal text-stone-500">
                  Snapshot {state.sourceYear}
                </span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-3 grid gap-2 text-[12px] leading-5 text-stone-400 md:grid-cols-3">
          <LegendItem swatch="land" text="Pale land = physical coastline" />
          <LegendItem
            swatch="footprint"
            text="Color = reconstructed footprint"
          />
          <LegendItem
            swatch="uncertain"
            text="Broken edge = approximate, near-period boundary"
          />
        </div>
      </div>

      <style>{`
        .historical-world-map .leaflet-control-zoom a {
          border-color: rgba(147, 197, 253, 0.16);
          background: rgba(6, 17, 31, 0.9);
          color: rgba(219, 234, 254, 0.9);
        }
        .historical-world-map .leaflet-control-zoom a:hover,
        .historical-world-map .leaflet-control-zoom a:focus {
          background: rgba(30, 64, 175, 0.72);
          color: white;
        }
        .historical-world-map .leaflet-tooltip {
          border: 1px solid rgba(147, 197, 253, 0.18);
          border-radius: 10px;
          background: rgba(6, 17, 31, 0.94);
          color: rgba(239, 246, 255, 0.94);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
          font-size: 12px;
        }
        .historical-world-map .leaflet-tooltip-top::before {
          border-top-color: rgba(6, 17, 31, 0.94);
        }
      `}</style>
    </div>
  );
}

function SelectionController({ selectedId }: { selectedId: StateId }) {
  const map = useMap();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const selectedFeature = getHistoricalEmpireFeature(selectedId);
    if (!selectedFeature) return;

    const bounds = featureBounds(selectedFeature.geometry);
    if (!bounds) return;

    map.flyToBounds(bounds, {
      padding: [30, 30],
      maxZoom: selectedId === "ashanti" ? 5 : 4,
      duration: 0.7,
    });
  }, [map, selectedId]);

  return null;
}

function featureBounds(geometry: Geometry) {
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

function LegendItem({
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
