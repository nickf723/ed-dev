"use client";

import { useState, type ComponentType, type ReactNode } from "react";
import { ArrowRight, Boxes, Network, RefreshCw } from "lucide-react";

export type StructureStage = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  specimen?: ReactNode;
};

const FALLBACK_ICONS = [Boxes, Network, RefreshCw];

export default function PartsStructureProcessTopology({ stages }: { stages: StructureStage[] }) {
  const [selectedId, setSelectedId] = useState(stages[0]?.id ?? "");
  const selected = stages.find((stage) => stage.id === selectedId) ?? stages[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] shadow-[0_30px_105px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_380px] lg:items-end sm:p-6">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-emerald-200/70">Parts → structure → process</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Understanding a system means changing the unit you are looking at.</h2>
        </div>
        <p className="text-[10px] leading-5 text-slate-500">Identify the pieces, ask how their arrangement creates new properties, then follow how the structure changes over time. The same grammar works far beyond chemistry.</p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_340px] sm:p-6">
        <div className="relative grid gap-3 md:grid-cols-3">
          <div className="pointer-events-none absolute left-[15%] right-[15%] top-[70px] hidden h-px bg-gradient-to-r from-emerald-300/25 via-cyan-300/25 to-amber-300/25 md:block" />
          {stages.map((stage, index) => {
            const Icon = stage.icon ?? FALLBACK_ICONS[index] ?? Boxes;
            const active = selected.id === stage.id;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedId(stage.id)}
                className="group relative z-10 min-h-[250px] rounded-[22px] border p-4 text-left transition hover:-translate-y-1"
                style={{
                  borderColor: `rgba(${stage.rgb},${active ? 0.3 : 0.11})`,
                  background: `linear-gradient(145deg,rgba(${stage.rgb},${active ? 0.08 : 0.025}),rgba(0,0,0,0.18))`,
                  boxShadow: active ? `0 0 42px rgba(${stage.rgb},0.09)` : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] border" style={{ color: `rgb(${stage.rgb})`, borderColor: `rgba(${stage.rgb},0.22)` }}><Icon size={17} /></span>
                  <span className="font-mono text-[8px] text-slate-800">0{index + 1}</span>
                </div>
                <div className="mt-6 font-mono text-[8px] uppercase tracking-[0.11em]" style={{ color: `rgba(${stage.rgb},0.66)` }}>{stage.question}</div>
                <h3 className="mt-2 text-[19px] font-semibold text-white">{stage.label}</h3>
                <p className="mt-2 text-[9px] leading-5 text-slate-600">{stage.summary}</p>
                {index < stages.length - 1 ? <ArrowRight size={14} className="absolute -right-[21px] top-[64px] hidden text-white/[0.13] md:block" /> : null}
              </button>
            );
          })}
        </div>

        <aside className="rounded-[22px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.rgb},0.65)` }}>Selected level</div>
          <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">{selected.label}</h3>
          <p className="mt-2 text-[11px] leading-5 text-slate-400">{selected.question}</p>
          <div className="mt-5 flex min-h-[190px] items-center justify-center overflow-hidden rounded-[18px] border border-white/[0.06] bg-black/[0.18] p-4">
            {selected.specimen ?? <DefaultSpecimen rgb={selected.rgb} id={selected.id} />}
          </div>
          <p className="mt-4 text-[9px] leading-5 text-slate-600">{selected.summary}</p>
        </aside>
      </div>
    </div>
  );
}

function DefaultSpecimen({ rgb, id }: { rgb: string; id: string }) {
  if (id.includes("part") || id.includes("element")) {
    return <div className="grid grid-cols-4 gap-3">{Array.from({ length: 12 }, (_, index) => <span key={index} className="flex h-10 w-10 items-center justify-center rounded-full border font-mono text-[8px]" style={{ color: `rgba(${rgb},${0.45 + (index % 4) * 0.1})`, borderColor: `rgba(${rgb},0.18)` }}>{index + 1}</span>)}</div>;
  }
  if (id.includes("structure") || id.includes("molecule")) {
    return (
      <svg viewBox="0 0 220 150" className="h-[150px] w-[220px]">
        {[[42,75,96,38],[42,75,102,112],[96,38,164,64],[102,112,164,64]].map(([x1,y1,x2,y2], index) => <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={`rgba(${rgb},0.34)`} strokeWidth="3" />)}
        {[[42,75],[96,38],[102,112],[164,64]].map(([cx,cy], index) => <circle key={index} cx={cx} cy={cy} r={12 + index % 2 * 3} fill={`rgba(${rgb},0.15)`} stroke={`rgba(${rgb},0.48)`} />)}
      </svg>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <span className="h-14 w-14 rounded-full border" style={{ borderColor: `rgba(${rgb},0.28)`, background: `rgba(${rgb},0.06)` }} />
      <ArrowRight size={18} style={{ color: `rgba(${rgb},0.42)` }} />
      <span className="h-12 w-12 rounded-[14px] border" style={{ borderColor: `rgba(${rgb},0.28)`, background: `rgba(${rgb},0.08)` }} />
      <span className="text-slate-800">+</span>
      <span className="h-9 w-9 rounded-full border" style={{ borderColor: `rgba(${rgb},0.28)`, background: `rgba(${rgb},0.04)` }} />
    </div>
  );
}
