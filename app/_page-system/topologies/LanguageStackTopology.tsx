"use client";

import { useState, type ComponentType } from "react";
import { ArrowDown, ArrowRight, Layers3, Volume2 } from "lucide-react";

export type LanguageLayer = {
  id: string;
  label: string;
  unit: string;
  question: string;
  summary: string;
  rgb: string;
  href?: string;
  status?: "active" | "planned";
  icon?: ComponentType<{ size?: number; className?: string }>;
};

export default function LanguageStackTopology({ layers }: { layers: LanguageLayer[] }) {
  const [selectedId, setSelectedId] = useState(layers[0]?.id ?? "");
  const selected = layers.find((layer) => layer.id === selectedId) ?? layers[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.08] bg-black/[0.13] shadow-[0_30px_100px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_400px] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lime-200/70"><Layers3 size={12} /> Compositional stack</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Language builds larger patterns from smaller contrasts.</h2>
        </div>
        <p className="text-[10px] leading-5 text-slate-500">The layers interact rather than forming a one-way pipeline, but each introduces a different unit of analysis. Moving upward changes what counts as a meaningful pattern.</p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_350px] sm:p-6">
        <div className="space-y-2">
          {layers.map((layer, index) => {
            const Icon = layer.icon ?? Volume2;
            const active = selected.id === layer.id;
            const width = 54 + ((index + 1) / layers.length) * 46;
            return (
              <div key={layer.id} className="relative flex justify-center pb-1">
                <button
                  type="button"
                  onClick={() => setSelectedId(layer.id)}
                  className="group relative min-h-[88px] rounded-[18px] border px-4 py-3 text-left transition hover:-translate-y-0.5"
                  style={{
                    width: `${width}%`,
                    borderColor: `rgba(${layer.rgb},${active ? 0.32 : 0.12})`,
                    background: `linear-gradient(90deg,rgba(${layer.rgb},${active ? 0.09 : 0.025}),rgba(0,0,0,0.22))`,
                    boxShadow: active ? `0 0 40px rgba(${layer.rgb},0.09)` : undefined,
                  }}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border" style={{ color: `rgb(${layer.rgb})`, borderColor: `rgba(${layer.rgb},0.2)` }}><Icon size={14} /></span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3"><span className="font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: `rgba(${layer.rgb},0.62)` }}>{layer.unit}</span><span className="font-mono text-[6px] uppercase text-slate-800">{layer.status === "planned" ? "planned" : "open"}</span></div>
                      <strong className="mt-1 block text-[11px] text-white">{layer.label}</strong>
                      <span className="mt-1 block text-[8px] text-slate-700">{layer.question}</span>
                    </div>
                  </div>
                </button>
                {index < layers.length - 1 ? <ArrowDown size={11} className="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 text-white/[0.12]" /> : null}
              </div>
            );
          })}
        </div>

        <aside className="rounded-[22px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.rgb},0.68)` }}>{selected.unit}</div>
          <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">{selected.label}</h3>
          <p className="mt-2 text-[11px] font-medium leading-5 text-slate-300">{selected.question}</p>
          <p className="mt-4 text-[10px] leading-5 text-slate-500">{selected.summary}</p>
          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.16] p-4 text-[8px] leading-4 text-slate-700">Higher layers depend on patterns from lower layers but are not reducible to a simple list of them. A sentence has words, yet syntax adds hierarchical relationships; an utterance has sentence meaning, yet pragmatics adds context and inference.</div>
          {selected.href && selected.status !== "planned" ? <a href={selected.href} className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold" style={{ color: `rgb(${selected.rgb})`, borderColor: `rgba(${selected.rgb},0.22)` }}>Open layer <ArrowRight size={12} /></a> : <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">planned layer</span>}
        </aside>
      </div>
    </div>
  );
}
