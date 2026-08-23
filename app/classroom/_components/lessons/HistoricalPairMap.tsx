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
  getGeometryBounds,
  getHistoricalEmpireFeature,
  WORLD_1750_NEAR_PERIOD,
  WORLD_LAND,
  type HistoricalEmpireProperties,
  type HistoricalStateId,
} from "@/lib/maps/historical-map-adapter";

export type HistoricalPairFocus = "both" | HistoricalStateId;

export type HistoricalPairState = {
  id: HistoricalStateId;
  name: string;
  color: string;
};

type HistoricalPairMapProps = {
  states: readonly [HistoricalPairState, HistoricalPairState];
  focus: HistoricalPairFocus;
  onFocus: (focus: HistoricalPairFocus) => void;
  ariaLabel: string;
  calloutTitle: string;
  calloutNote: string;
};

export default function HistoricalPairMap({
  states,
  focus,
  onFocus,
  ariaLabel,
  calloutTitle,
  calloutNote,
}: HistoricalPairMapProps) {
  const stateIds = useMemo(() => states.map(({ id }) => id), [states]);
  const comparisonLayer = useMemo(
    () =>
      ({
        type: "FeatureCollection",
        features: WORLD_1750_NEAR_PERIOD.features.filter((feature) =>
          stateIds.includes(feature.properties.id)
        ),
      }) as FeatureCollection<Geometry, HistoricalEmpireProperties>,
    // The two IDs are stable lesson configuration rather than interaction state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [states[0].id, states[1].id]
  );
  const stateById = useMemo(
    () => new Map(states.map((state) => [state.id, state])),
    [states]
  );
  const style = useMemo(
    () =>
      (feature?: { properties: HistoricalEmpireProperties }): PathOptions => {
        const id = feature?.properties.id;
        const state = id ? stateById.get(id) : undefined;
        const emphasized = focus === "both" || focus === id;

        return {
          color: state?.color ?? "#93c5fd",
          weight: emphasized ? 2.6 : 1.1,
          opacity: emphasized ? 0.95 : 0.3,
          fillColor: state?.color ?? "#93c5fd",
          fillOpacity: emphasized ? 0.29 : 0.07,
          dashArray: "8 5",
        };
      },
    [focus, stateById]
  );

  return (
    <div className="mt-4 overflow-hidden rounded-[18px] border border-blue-200/[0.13] bg-[#05101c]">
      <div className="relative h-[360px] sm:h-[430px]">
        <MapContainer
          center={[35, 55]}
          zoom={2}
          minZoom={1}
          maxZoom={6}
          maxBounds={[
            [-85, -180],
            [85, 180],
          ]}
          scrollWheelZoom={false}
          zoomControl={false}
          className="historical-pair-map h-full w-full bg-[#061525]"
          aria-label={ariaLabel}
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
            data={comparisonLayer}
            style={style}
            onEachFeature={(feature, layer) => {
              const properties =
                feature.properties as HistoricalEmpireProperties;
              layer.bindTooltip(
                `${properties.name} · reconstructed from ${properties.sourceYear}`,
                { sticky: true, direction: "top" }
              );
              layer.on({ click: () => onFocus(properties.id) });
            }}
          />
          <MapFocusController focus={focus} ids={stateIds} />
        </MapContainer>

        <div className="pointer-events-none absolute left-3 top-3 z-[500] max-w-[270px] rounded-[12px] border border-blue-100/[0.14] bg-[#06111f]/90 px-3 py-2 backdrop-blur-xl">
          <div className="text-[12px] font-semibold text-blue-50">
            {calloutTitle}
          </div>
          <div className="mt-0.5 text-[12px] leading-4 text-blue-100/60">
            {calloutNote}
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
          {states.map((state) => (
            <FocusButton
              key={state.id}
              active={focus === state.id}
              label={state.name}
              color={state.color}
              onClick={() => onFocus(state.id)}
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
        .historical-pair-map .leaflet-control-zoom a {
          border-color: rgba(147, 197, 253, 0.16);
          background: rgba(6, 17, 31, 0.9);
          color: rgba(219, 234, 254, 0.9);
        }
        .historical-pair-map .leaflet-control-zoom a:hover,
        .historical-pair-map .leaflet-control-zoom a:focus {
          background: rgba(30, 64, 175, 0.72);
          color: white;
        }
        .historical-pair-map .leaflet-tooltip {
          border: 1px solid rgba(147, 197, 253, 0.18);
          border-radius: 10px;
          background: rgba(6, 17, 31, 0.94);
          color: rgba(239, 246, 255, 0.94);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.28);
          font-size: 12px;
        }
        .historical-pair-map .leaflet-tooltip-top::before {
          border-top-color: rgba(6, 17, 31, 0.94);
        }
      `}</style>
    </div>
  );
}

function MapFocusController({
  focus,
  ids,
}: {
  focus: HistoricalPairFocus;
  ids: readonly HistoricalStateId[];
}) {
  const map = useMap();

  useEffect(() => {
    const focusIds = focus === "both" ? ids : [focus];
    const bounds: [number, number][] = focusIds.flatMap((id) => {
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
      { padding: [30, 30], maxZoom: focus === "both" ? 3 : 5, animate: false }
    );
  }, [focus, ids, map]);

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
