"use client";

import { useState, type ComponentType } from "react";
import { ArrowRight, Grid3X3, HelpCircle } from "lucide-react";

export type QuestionMatrixNode = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  x: number;
  y: number;
  href?: string;
  status?: "active" | "planned";
  icon?: ComponentType<{ size?: number; className?: string }>;
};

export default function QuestionMatrixTopology({
  nodes,
  xLabels,
  yLabels,
}: {
  nodes: QuestionMatrixNode[];
  xLabels: [string, string, string];
  yLabels: [string, string, string];
}) {
  const [selectedId, setSelectedId] = useState(nodes[0]?.id ?? "");
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.14] shadow-[0_34px_110px_rgba(0,0,0,0.26)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-amber-200/70"><Grid3X3 size={12} /> Question space</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Philosophical fields overlap because the questions overlap.</h2>
        </div>
        <p className="text-[10px] leading-5 text-slate-500">The matrix is not a rigid taxonomy. It locates each branch by the kind of subject and question it emphasizes, while keeping neighboring problems visibly close.</p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_340px] sm:p-6">
        <div className="relative min-h-[560px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#08070d]/78">
          <div className="absolute inset-[64px] grid grid-cols-3 grid-rows-3">
            {Array.from({ length: 9 }, (_, index) => <div key={index} className="border-b border-r border-white/[0.055] last:border-r-0" />)}
          </div>
          <div className="absolute left-[64px] right-[64px] top-5 grid grid-cols-3 text-center font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">
            {xLabels.map((label) => <span key={label}>{label}</span>)}
          </div>
          <div className="absolute bottom-[64px] left-4 top-[64px] grid grid-rows-3 items-center font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">
            {yLabels.map((label) => <span key={label} className="-rotate-90 whitespace-nowrap">{label}</span>)}
          </div>

          {nodes.map((node) => {
            const active = node.id === selected.id;
            const Icon = node.icon ?? HelpCircle;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedId(node.id)}
                className="group absolute w-[176px] -translate-x-1/2 -translate-y-1/2 text-left"
                style={{ left: `${node.x}%`, top: `${node.y}%`, zIndex: active ? 7 : 4 }}
              >
                <div className="rounded-[18px] border p-3 backdrop-blur-xl transition duration-300 group-hover:-translate-y-1" style={{ borderColor: `rgba(${node.rgb},${active ? 0.34 : 0.14})`, background: `linear-gradient(145deg,rgba(${node.rgb},${active ? 0.10 : 0.035}),rgba(5,5,9,0.78))`, boxShadow: active ? `0 0 42px rgba(${node.rgb},0.12)` : undefined }}>
                  <div className="flex items-start justify-between gap-3"><Icon size={14} style={{ color: `rgb(${node.rgb})` }} /><span className="font-mono text-[6px] uppercase tracking-[0.08em] text-slate-800">{node.status === "planned" ? "planned" : "open"}</span></div>
                  <strong className="mt-3 block text-[10px] text-white">{node.label}</strong>
                  <span className="mt-1 block text-[7px] leading-3.5 text-slate-600">{node.question}</span>
                </div>
              </button>
            );
          })}
        </div>

        <aside className="rounded-[24px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.rgb},0.68)` }}>Selected question</div>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">{selected.label}</h3>
          <p className="mt-2 text-[12px] font-medium leading-5 text-slate-300">{selected.question}</p>
          <p className="mt-4 text-[10px] leading-5 text-slate-500">{selected.summary}</p>
          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.18] p-4 text-[8px] leading-4 text-slate-700">Nearby branches often share premises, methods, or consequences. The point of the matrix is to make those overlaps easier to notice without collapsing distinct questions together.</div>
          {selected.href && selected.status !== "planned" ? <a href={selected.href} className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold" style={{ color: `rgb(${selected.rgb})`, borderColor: `rgba(${selected.rgb},0.22)` }}>Open field <ArrowRight size={12} /></a> : <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">planned field</span>}
        </aside>
      </div>
    </div>
  );
}
