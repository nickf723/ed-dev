"use client";

import { useState, type ComponentType } from "react";
import { ArrowRight, Hammer, Sparkles } from "lucide-react";

export type PracticeStudioNode = {
  id: string;
  label: string;
  question: string;
  summary: string;
  material: string;
  rgb: string;
  href?: string;
  status?: "active" | "planned";
  icon?: ComponentType<{ size?: number; className?: string }>;
  position: { x: number; y: number; w: number; h: number };
};

export default function PracticeStudioTopology({ nodes }: { nodes: PracticeStudioNode[] }) {
  const [selectedId, setSelectedId] = useState(nodes[0]?.id ?? "");
  const selected = nodes.find((node) => node.id === selectedId) ?? nodes[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.12] shadow-[0_34px_110px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-orange-200/70"><Hammer size={12} /> Practice studio</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Different media create different kinds of visual problems.</h2>
        </div>
        <p className="text-[10px] leading-5 text-stone-500">The branches are siblings, but they are not interchangeable. Each medium changes what can be manipulated directly: mark, mass, light, reproducibility, time, or historical evidence.</p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_340px] sm:p-6">
        <div className="relative hidden min-h-[590px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#0b0807]/72 lg:block">
          <div className="absolute inset-0 opacity-35" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.035) 1px,transparent 1px)", backgroundSize: "58px 58px" }} />
          <div className="absolute bottom-8 left-[8%] right-[8%] h-2 rounded-full bg-gradient-to-r from-rose-400/15 via-amber-300/12 to-cyan-300/15 blur-[1px]" />

          {nodes.map((node) => {
            const active = selected.id === node.id;
            const Icon = node.icon ?? Sparkles;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setSelectedId(node.id)}
                className="group absolute overflow-hidden rounded-[20px] border p-4 text-left transition duration-300 hover:-translate-y-1"
                style={{
                  left: `${node.position.x}%`,
                  top: `${node.position.y}%`,
                  width: `${node.position.w}%`,
                  height: `${node.position.h}%`,
                  borderColor: `rgba(${node.rgb},${active ? 0.34 : 0.11})`,
                  background: `linear-gradient(145deg,rgba(${node.rgb},${active ? 0.09 : 0.025}),rgba(7,5,5,0.72))`,
                  boxShadow: active ? `0 0 45px rgba(${node.rgb},0.11)` : "0 18px 50px rgba(0,0,0,0.18)",
                }}
              >
                <div className="flex items-start justify-between gap-3"><Icon size={15} style={{ color: `rgb(${node.rgb})` }} /><span className="font-mono text-[6px] uppercase tracking-[0.08em] text-stone-800">{node.status === "planned" ? "planned" : "open"}</span></div>
                <div className="absolute inset-x-4 bottom-4">
                  <div className="font-mono text-[7px] uppercase tracking-[0.1em]" style={{ color: `rgba(${node.rgb},0.62)` }}>{node.material}</div>
                  <strong className="mt-1 block text-[11px] text-white">{node.label}</strong>
                  <span className="mt-1 line-clamp-2 block text-[7px] leading-3.5 text-stone-700">{node.question}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-2 lg:hidden">
          {nodes.map((node) => {
            const Icon = node.icon ?? Sparkles;
            const active = selected.id === node.id;
            return <button key={node.id} type="button" onClick={() => setSelectedId(node.id)} className="flex w-full items-center gap-3 rounded-[16px] border p-3 text-left" style={{ borderColor: `rgba(${node.rgb},${active ? 0.26 : 0.09})`, background: active ? `rgba(${node.rgb},0.045)` : "rgba(255,255,255,0.012)" }}><Icon size={14} style={{ color: `rgb(${node.rgb})` }} /><div className="min-w-0 flex-1"><span className="font-mono text-[7px] uppercase tracking-[0.09em]" style={{ color: `rgba(${node.rgb},0.60)` }}>{node.material}</span><strong className="mt-1 block text-[10px] text-white">{node.label}</strong></div></button>;
          })}
        </div>

        <aside className="rounded-[24px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.rgb},0.68)` }}>{selected.material}</div>
          <h3 className="mt-2 text-[24px] font-semibold tracking-[-0.04em] text-white">{selected.label}</h3>
          <p className="mt-2 text-[11px] font-medium leading-5 text-stone-300">{selected.question}</p>
          <p className="mt-4 text-[10px] leading-5 text-stone-500">{selected.summary}</p>
          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.16] p-4 text-[8px] leading-4 text-stone-700">Medium is not merely a container for an idea. Physical constraints, tools, reproducibility, scale, duration, and viewing conditions can become part of what the work means.</div>
          {selected.href && selected.status !== "planned" ? <a href={selected.href} className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold" style={{ color: `rgb(${selected.rgb})`, borderColor: `rgba(${selected.rgb},0.22)` }}>Open studio <ArrowRight size={12} /></a> : <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-stone-700">planned studio</span>}
        </aside>
      </div>
    </div>
  );
}
