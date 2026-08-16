"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Compass, Map, Maximize2, Move3D, Network } from "lucide-react";

export type SpatialRegion = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  href?: string;
  status?: "active" | "planned";
  point: { x: number; y: number };
};

type Scale = "global" | "regional" | "local";

const SCALE_COPY: Record<Scale, { label: string; text: string }> = {
  global: {
    label: "Global systems",
    text: "Follow oceans, climate zones, migrations, trade, empires, disease, technologies, and ideas across many regions at once.",
  },
  regional: {
    label: "Regions",
    text: "Compare neighboring societies and shared environments without pretending regional boundaries are timeless or absolute.",
  },
  local: {
    label: "Local places",
    text: "Zoom into cities, landscapes, institutions, communities, households, and specific sites where broad processes were actually experienced.",
  },
};

export default function SpatialRegionTopology({ regions }: { regions: SpatialRegion[] }) {
  const [selectedId, setSelectedId] = useState(regions[0]?.id ?? "");
  const [scale, setScale] = useState<Scale>("regional");
  const selected = regions.find((region) => region.id === selectedId) ?? regions[0];
  const connections = useMemo(() => {
    if (regions.length < 2) return [];
    return regions.map((region, index) => [region, regions[(index + 2) % regions.length]] as const);
  }, [regions]);
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.13] shadow-[0_34px_110px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-200/70"><Compass size={12} /> Spatial frame</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A place changes meaning when the scale changes.</h2>
          <p className="mt-3 max-w-3xl text-[10px] leading-5 text-slate-500">A region can be the center of one explanation and only one node in a larger system. Use scale deliberately, and treat borders as historical evidence rather than permanent containers.</p>
        </div>
        <div className="flex gap-1 rounded-full border border-white/[0.07] bg-black/20 p-1">
          {(["global", "regional", "local"] as Scale[]).map((item) => <button key={item} type="button" onClick={() => setScale(item)} className={`rounded-full px-3 py-2 font-mono text-[7px] uppercase tracking-[0.09em] ${scale === item ? "bg-white/[0.07] text-white" : "text-slate-600 hover:text-slate-300"}`}>{item}</button>)}
        </div>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_350px] sm:p-6">
        <div className="relative min-h-[580px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#030807]/72">
          <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <g opacity="0.42" fill="rgba(255,255,255,0.025)" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2">
              <path d="M85 155 L180 105 L265 135 L300 205 L255 250 L190 238 L155 300 L105 270 L125 220 Z" />
              <path d="M230 310 L300 315 L345 375 L330 455 L290 515 L250 460 L242 390 Z" />
              <path d="M410 122 L490 104 L535 145 L515 205 L455 214 L420 180 Z" />
              <path d="M455 220 L545 205 L590 260 L570 375 L515 455 L460 405 L430 310 Z" />
              <path d="M535 125 L690 90 L830 135 L900 210 L865 290 L735 300 L655 255 L590 268 L525 205 Z" />
              <path d="M760 380 L850 350 L915 395 L900 455 L825 480 L775 440 Z" />
            </g>
            {connections.map(([from, to], index) => (
              <path key={index} d={`M${from.point.x * 10} ${from.point.y * 5.6} Q${((from.point.x + to.point.x) / 2) * 10} ${((from.point.y + to.point.y) / 2) * 5.6 - 55} ${to.point.x * 10} ${to.point.y * 5.6}`} fill="none" stroke={`rgba(${index % 2 ? "59,130,246" : "16,185,129"},0.08)`} strokeWidth="1.4" strokeDasharray="4 9" />
            ))}
          </svg>

          <div className={`absolute inset-0 transition-transform duration-500 ${scale === "global" ? "scale-[0.90]" : scale === "local" ? "scale-[1.14]" : "scale-100"}`}>
            {regions.map((region) => {
              const active = selected.id === region.id;
              return (
                <button key={region.id} type="button" onClick={() => setSelectedId(region.id)} className="group absolute w-[150px] -translate-x-1/2 -translate-y-1/2 text-left" style={{ left: `${region.point.x}%`, top: `${region.point.y}%`, zIndex: active ? 6 : 3 }}>
                  <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border bg-black/55 backdrop-blur-md transition group-hover:scale-110" style={{ color: `rgb(${region.rgb})`, borderColor: `rgba(${region.rgb},${active ? 0.42 : 0.18})`, boxShadow: active ? `0 0 38px rgba(${region.rgb},0.14)` : undefined }}><span className="h-2 w-2 rounded-full" style={{ background: `rgb(${region.rgb})` }} /></span>
                  <div className={`mt-2 rounded-[12px] border bg-black/[0.42] px-2.5 py-2 text-center backdrop-blur-md ${active ? "opacity-100" : "opacity-65 group-hover:opacity-100"}`} style={{ borderColor: `rgba(${region.rgb},${active ? 0.22 : 0.08})` }}><strong className="block text-[9px] text-white">{region.label}</strong><span className="mt-1 block font-mono text-[6px] uppercase tracking-[0.08em] text-slate-700">{region.status === "planned" ? "planned" : "open region"}</span></div>
                </button>
              );
            })}
          </div>

          <div className="absolute inset-x-4 bottom-4 rounded-[16px] border border-white/[0.06] bg-black/[0.38] px-4 py-3 backdrop-blur-lg">
            <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.1em] text-emerald-200/55"><ScaleIcon scale={scale} /> {SCALE_COPY[scale].label}</div>
            <p className="mt-1.5 text-[8px] leading-4 text-slate-600">{SCALE_COPY[scale].text}</p>
          </div>
        </div>

        <aside className="rounded-[24px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.rgb},0.68)` }}>Selected frame</div>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">{selected.label}</h3>
          <p className="mt-2 text-[11px] font-medium leading-5 text-slate-300">{selected.question}</p>
          <p className="mt-4 text-[10px] leading-5 text-slate-500">{selected.summary}</p>
          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.16] p-4 text-[8px] leading-4 text-slate-700">A geographic frame should help answer a question. If a migration, trade route, empire, ecological zone, language community, or religious network crosses the selected border, the explanation should cross it too.</div>
          {selected.href && selected.status !== "planned" ? <a href={selected.href} className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold" style={{ color: `rgb(${selected.rgb})`, borderColor: `rgba(${selected.rgb},0.22)` }}>Enter region <ArrowRight size={12} /></a> : <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">planned region</span>}
        </aside>
      </div>
    </div>
  );
}

function ScaleIcon({ scale }: { scale: Scale }) {
  if (scale === "global") return <Maximize2 size={11} />;
  if (scale === "local") return <Move3D size={11} />;
  return <Map size={11} />;
}
