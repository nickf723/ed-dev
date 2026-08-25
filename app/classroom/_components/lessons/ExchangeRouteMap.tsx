"use client";

import { useEffect } from "react";
import { CircleMarker, GeoJSON, MapContainer, Polyline, Tooltip, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { WORLD_LAND } from "@/lib/maps/historical-map-adapter";

export type ExchangeRouteId = "tokugawa" | "qing" | "atlantic";

const ROUTES = {
  tokugawa: {
    name: "Tokugawa licensed channel",
    color: "#60a5fa",
    center: [29, 129] as [number, number],
    zoom: 4,
    paths: [
      [[52.37, 4.9], [34.69, 135.5], [32.75, 129.88]],
      [[31.23, 121.47], [32.75, 129.88]],
    ] as [number, number][][],
    ports: [[52.37, 4.9, "Amsterdam"], [31.23, 121.47, "Shanghai region"], [32.75, 129.88, "Nagasaki"]] as const,
  },
  qing: {
    name: "Canton-system channel",
    color: "#fbbf24",
    center: [24, 111] as [number, number],
    zoom: 4,
    paths: [
      [[51.5, -0.12], [-34.36, 18.47], [1.29, 103.85], [23.13, 113.26]],
    ] as [number, number][][],
    ports: [[51.5, -0.12, "London"], [-34.36, 18.47, "Cape route"], [1.29, 103.85, "Singapore strait"], [23.13, 113.26, "Guangzhou"]] as const,
  },
  atlantic: {
    name: "Atlantic imperial circuits",
    color: "#67e8f9",
    center: [10, -35] as [number, number],
    zoom: 2,
    paths: [
      [[51.5, -0.12], [6.32, -10.8], [13.1, -59.62], [38.72, -9.14]],
      [[38.72, -9.14], [-12.97, -38.5], [18.47, -69.9], [51.5, -0.12]],
    ] as [number, number][][],
    ports: [[51.5, -0.12, "London"], [38.72, -9.14, "Lisbon"], [6.32, -10.8, "West African coast"], [-12.97, -38.5, "Salvador"], [18.47, -69.9, "Santo Domingo"], [13.1, -59.62, "Bridgetown"]] as const,
  },
} as const;

export default function ExchangeRouteMap({ routeId }: { routeId: ExchangeRouteId }) {
  const route = ROUTES[routeId];
  return (
    <div className="overflow-hidden rounded-[20px] border border-blue-200/[0.15] bg-[#071b2e]">
      <div className="relative h-[330px] sm:h-[410px]">
        <MapContainer center={route.center} zoom={route.zoom} minZoom={1} maxZoom={6} scrollWheelZoom={false} zoomControl={false} className="exchange-route-map h-full w-full bg-[#061525]" aria-label={`Interactive geographic map of ${route.name}`}>
          <ZoomControl position="bottomright" />
          <GeoJSON data={WORLD_LAND} interactive={false} style={{ color: "rgba(147,197,253,.22)", weight: .7, fillColor: "#13283a", fillOpacity: .86 }} />
          {route.paths.map((positions, index) => <Polyline key={`${routeId}-${index}`} positions={positions} pathOptions={{ color: route.color, weight: 2.6, opacity: .86, dashArray: routeId === "atlantic" ? "8 6" : undefined }} />)}
          {route.ports.map(([lat, lng, label]) => <CircleMarker key={label} center={[lat, lng]} radius={5} pathOptions={{ color: route.color, fillColor: route.color, fillOpacity: 1, weight: 2 }}><Tooltip direction="top">{label}</Tooltip></CircleMarker>)}
          <RouteController routeId={routeId} />
        </MapContainer>
        <div className="pointer-events-none absolute left-3 top-3 z-[500] rounded-[12px] border border-blue-100/[0.14] bg-[#06111f]/90 px-3 py-2 backdrop-blur-xl">
          <div className="text-[12px] font-semibold text-blue-50">{route.name}</div>
          <div className="mt-0.5 text-[11px] text-blue-100/60">Geographic orientation · selected corridors</div>
        </div>
      </div>
      <div className="grid gap-2 border-t border-blue-100/[0.08] bg-black/[0.16] p-3 text-[12px] leading-5 text-stone-400 sm:grid-cols-3">
        <Legend kind="land" text="Natural Earth coastline" />
        <Legend kind="route" text="Selected recorded corridor" color={route.color} />
        <Legend kind="port" text="Named port or route waypoint" color={route.color} />
      </div>
      <p className="border-t border-blue-100/[0.08] px-3 py-2 text-[11px] leading-5 text-blue-100/55">Routes are simplified geographic connections for comparison, not measures of traffic volume, territorial control, freedom, or consent.</p>
      <style>{`.exchange-route-map .leaflet-control-zoom a{border-color:rgba(147,197,253,.16);background:rgba(6,17,31,.92);color:#dbeafe}.exchange-route-map .leaflet-tooltip{border:1px solid rgba(147,197,253,.18);border-radius:9px;background:rgba(6,17,31,.95);color:#eff6ff;font-size:12px}`}</style>
    </div>
  );
}

function RouteController({ routeId }: { routeId: ExchangeRouteId }) {
  const map = useMap();
  useEffect(() => {
    const points = ROUTES[routeId].paths.flat();
    map.fitBounds(points, { padding: [32, 32], maxZoom: 3, animate: false });
  }, [map, routeId]);
  return null;
}
function Legend({ kind, text, color }: { kind: "land" | "route" | "port"; text: string; color?: string }) { return <div className="flex items-center gap-2"><span className={kind === "land" ? "h-3.5 w-5 rounded-[3px] border border-blue-100/20 bg-[#13283a]" : kind === "route" ? "h-0 w-5 border-t-2" : "h-3.5 w-3.5 rounded-full border-2"} style={kind === "route" ? { borderColor: color } : kind === "port" ? { borderColor: color, backgroundColor: color } : undefined} aria-hidden="true"/><span>{text}</span></div>; }
