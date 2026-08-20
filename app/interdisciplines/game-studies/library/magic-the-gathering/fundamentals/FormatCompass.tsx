"use client";

import { useState } from "react";
import { Compass, Layers3 } from "lucide-react";

type FormatId = "standard" | "modern" | "commander" | "limited";

const FORMATS: readonly {
  id: FormatId;
  name: string;
  pool: "narrower" | "broader" | "event pool";
  construction: "constructed" | "limited";
  players: string;
  distinction: string;
  x: number;
  y: number;
  rgb: string;
}[] = [
  {
    id: "standard",
    name: "Standard",
    pool: "narrower",
    construction: "constructed",
    players: "typically two-player",
    distinction: "A rotating constructed environment built from a comparatively recent legal card pool. Exact set legality and rotation policy can change over time.",
    x: 24,
    y: 24,
    rgb: "96,165,250",
  },
  {
    id: "modern",
    name: "Modern",
    pool: "broader",
    construction: "constructed",
    players: "typically two-player",
    distinction: "A non-rotating constructed environment with a much broader legal pool than Standard. Banned-card policy and new releases can still reshape the environment.",
    x: 76,
    y: 24,
    rgb: "248,113,113",
  },
  {
    id: "commander",
    name: "Commander",
    pool: "broader",
    construction: "constructed",
    players: "commonly multiplayer",
    distinction: "A singleton constructed format organized around a commander and color identity. Multiplayer incentives and social expectations can matter alongside card efficiency.",
    x: 76,
    y: 66,
    rgb: "74,222,128",
  },
  {
    id: "limited",
    name: "Draft / Sealed",
    pool: "event pool",
    construction: "limited",
    players: "matches usually two-player",
    distinction: "Decks are built from a constrained pool opened or drafted for the event rather than from a pre-owned constructed collection.",
    x: 24,
    y: 78,
    rgb: "250,204,21",
  },
] as const;

export default function FormatCompass() {
  const [activeId, setActiveId] = useState<FormatId>("limited");
  const active = FORMATS.find((format) => format.id === activeId) ?? FORMATS[3];

  return (
    <section className="overflow-hidden rounded-[22px] border border-blue-100/[0.10] bg-[#070b12]/70 backdrop-blur-xl">
      <div className="border-b border-white/[0.07] p-4">
        <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-blue-200/68"><Compass size={13} /> Format comparison</div>
        <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">A format changes the legal pool and how the deck is assembled.</h3>
      </div>

      <div className="grid gap-5 p-4 lg:grid-cols-[320px_minmax(0,1fr)] sm:p-5 lg:items-start">
        <div className="relative aspect-square rounded-[20px] border border-white/[0.07] bg-black/[0.20] p-8">
          <div className="absolute inset-x-8 top-1/2 h-px bg-white/[0.08]" />
          <div className="absolute inset-y-8 left-1/2 w-px bg-white/[0.08]" />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 -rotate-90 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500">constructed deck</span>
          <span className="absolute right-1 top-1/2 -translate-y-1/2 rotate-90 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500">built from event pool</span>
          <span className="absolute bottom-2 left-8 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500">narrower pool</span>
          <span className="absolute bottom-2 right-8 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500">broader pool</span>

          {FORMATS.map((format) => {
            const selected = active.id === format.id;
            return (
              <button key={format.id} type="button" onClick={() => setActiveId(format.id)} onMouseEnter={() => setActiveId(format.id)} className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border transition" style={{ left: `${format.x}%`, top: `${format.y}%`, width: selected ? 24 : 14, height: selected ? 24 : 14, borderColor: `rgba(${format.rgb},${selected ? 0.88 : 0.32})`, background: `rgba(${format.rgb},${selected ? 0.42 : 0.15})`, boxShadow: selected ? `0 0 20px rgba(${format.rgb},0.26)` : undefined }} aria-label={`Inspect ${format.name}`} />
            );
          })}
        </div>

        <div>
          <div className="flex items-start gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-[13px] border" style={{ color: `rgb(${active.rgb})`, borderColor: `rgba(${active.rgb},0.26)`, background: `rgba(${active.rgb},0.04)` }}><Layers3 size={16} /></span><div><div className="font-mono text-[10px] uppercase tracking-[0.06em]" style={{ color: `rgba(${active.rgb},0.68)` }}>{active.construction} · {active.pool}</div><h4 className="mt-1 text-[23px] font-semibold text-white">{active.name}</h4></div></div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/76">{active.distinction}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Readout label="Deck source" value={active.construction === "limited" ? "event pool" : "constructed collection"} />
            <Readout label="Typical match" value={active.players} />
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {FORMATS.map((format) => <button key={format.id} type="button" onClick={() => setActiveId(format.id)} className="rounded-full border px-3 py-1.5 text-[10px] font-semibold transition" style={{ borderColor: format.id === active.id ? `rgba(${format.rgb},0.28)` : "rgba(255,255,255,0.06)", color: format.id === active.id ? `rgb(${format.rgb})` : "rgb(148,163,184)", background: format.id === active.id ? `rgba(${format.rgb},0.04)` : "transparent" }}>{format.name}</button>)}
          </div>
          <p className="mt-4 border-l-2 border-blue-300/28 pl-3 text-[11px] leading-5 text-slate-500">This is a conceptual comparison, not a live legality chart. Magic formats, ban lists, rotation policies, and supplemental products can change; current deck construction should always use current official format rules.</p>
        </div>
      </div>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500">{label}</div><strong className="mt-1 block text-[11px] text-white/78">{value}</strong></div>;
}
