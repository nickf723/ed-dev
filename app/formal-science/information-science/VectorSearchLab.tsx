"use client";

import { useMemo, useState } from "react";
import { Crosshair, Database, Search, Sparkles } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";
import {
  RETRIEVAL_QUERIES,
  RETRIEVAL_RECORDS,
  rankRetrievalRecords,
  type RetrievalQueryKey,
} from "./informationScienceModel";

export default function VectorSearchLab() {
  const [queryKey, setQueryKey] = useState<RetrievalQueryKey>("archives");
  const query = RETRIEVAL_QUERIES[queryKey];
  const ranked = useMemo(() => rankRetrievalRecords(query), [query]);
  const nearestIds = new Set(ranked.slice(0, 3).map((item) => item.id));

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[30px] border-violet-100/[0.12]"
      style={{ background: "rgba(8,13,28,0.24)" }}
    >
      <div className="grid border-b border-violet-100/[0.08] lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-violet-200/60"><Search size={14} /> Vector retrieval map · synthetic 2D projection</div>
          <h3 className="mt-2 text-[clamp(1.7rem,2.8vw,2.7rem)] font-semibold tracking-[-0.045em] text-white">Nearest is a geometric claim after representation choices have already been made.</h3>
          <p className="mt-3 max-w-3xl text-[13px] leading-6 text-slate-400/72">Choose one pre-embedded query and inspect its nearest records. The coordinates are deliberately invented for teaching. Real embedding systems usually use many more dimensions, learned representations, and task-specific similarity functions.</p>
        </div>
        <div className="border-t border-violet-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[12px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">What this demonstrates</span>
          <p className="mt-2 text-[12px] leading-5 text-slate-500">Retrieval can rank by distance in a representation space. It does <strong className="text-slate-400">not</strong> demonstrate that distance equals truth, usefulness, fairness, or human relevance.</p>
        </div>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[230px_minmax(0,1fr)_290px] sm:p-5">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">Query presets</div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
            {(Object.keys(RETRIEVAL_QUERIES) as RetrievalQueryKey[]).map((key) => {
              const item = RETRIEVAL_QUERIES[key];
              const selected = key === queryKey;
              return (
                <button key={key} type="button" onClick={() => setQueryKey(key)} className="flex items-center gap-3 border px-3 py-3 text-left transition" style={{ borderColor: selected ? `rgba(${item.rgb},0.34)` : "rgba(255,255,255,0.07)", background: selected ? `rgba(${item.rgb},0.065)` : "rgba(0,0,0,0.055)" }}>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border" style={{ color: `rgb(${item.rgb})`, borderColor: `rgba(${item.rgb},0.25)` }}><Crosshair size={13} /></span>
                  <span><strong className="block text-[12px] text-white/82">{item.label}</strong><span className="mt-1 block font-mono text-[11px] text-slate-600">({item.x}, {item.y})</span></span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative min-h-[330px] overflow-hidden border border-white/[0.07] bg-black/[0.075]">
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(148,163,184,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.10)_1px,transparent_1px)] [background-size:10%_10%]" />
          <div className="absolute left-3 top-3 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-600"><Database size={12} /> toy representation space</div>

          {RETRIEVAL_RECORDS.map((record) => {
            const near = nearestIds.has(record.id);
            return (
              <div key={record.id} className="absolute -translate-x-1/2 -translate-y-1/2 transition-opacity" style={{ left: `${record.x}%`, top: `${record.y}%`, opacity: near ? 1 : 0.34 }}>
                <span className="relative block h-2.5 w-2.5 rounded-full border" style={{ borderColor: `rgba(${record.rgb},0.72)`, background: `rgba(${record.rgb},0.44)`, boxShadow: near ? `0 0 18px rgba(${record.rgb},0.18)` : "none" }} />
                <span className="absolute left-3 top-[-3px] w-[118px] text-[10px] leading-4 text-slate-400">{record.label}</span>
              </div>
            );
          })}

          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${query.x}%`, top: `${query.y}%` }}>
            <span className="absolute -inset-4 rounded-full border" style={{ borderColor: `rgba(${query.rgb},0.22)` }} />
            <span className="block h-3 w-3 rotate-45 border bg-black/70" style={{ borderColor: `rgba(${query.rgb},0.90)`, boxShadow: `0 0 22px rgba(${query.rgb},0.25)` }} />
            <span className="absolute left-5 top-[-4px] whitespace-nowrap font-mono text-[11px] font-semibold" style={{ color: `rgba(${query.rgb},0.82)` }}>QUERY · {query.label}</span>
          </div>

          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {ranked.slice(0, 3).map((record, index) => <line key={record.id} x1={query.x} y1={query.y} x2={record.x} y2={record.y} stroke={`rgba(${query.rgb},${0.18 - index * 0.04})`} strokeWidth="0.3" vectorEffect="non-scaling-stroke" />)}
          </svg>
        </div>

        <div className="border border-white/[0.07] bg-black/[0.055] p-4 backdrop-blur-[10px]">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/52"><Sparkles size={13} /> Ranked neighbors</div>
          <div className="mt-3 space-y-2">
            {ranked.slice(0, 5).map((record, index) => (
              <div key={record.id} className="grid grid-cols-[28px_minmax(0,1fr)_52px] gap-2 border-b border-white/[0.055] pb-2 last:border-b-0">
                <span className="font-mono text-[11px] text-violet-200/44">0{index + 1}</span>
                <span className="text-[11px] leading-4 text-slate-400">{record.label}</span>
                <span className="text-right font-mono text-[11px] text-slate-600">d {record.distance.toFixed(1)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 border-l-2 border-violet-300/20 pl-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-600">Retrieval question</span>
            <p className="mt-1 text-[12px] leading-5 text-slate-500">Would these neighbors still be useful if the representation emphasized chronology, authority, source type, or user intent instead of the hidden factors encoded by this toy plane?</p>
          </div>
        </div>
      </div>
    </Surface>
  );
}
