"use client";

import { useState, type ComponentType } from "react";
import { ArrowRight, MessageCircle, Radio, Repeat2 } from "lucide-react";

export type CommunicationStage = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  href?: string;
  status?: "active" | "planned";
  icon?: ComponentType<{ size?: number; className?: string }>;
  position: { x: number; y: number };
};

export default function CommunicationLoopTopology({ stages }: { stages: CommunicationStage[] }) {
  const [selectedId, setSelectedId] = useState(stages[0]?.id ?? "");
  const selected = stages.find((stage) => stage.id === selectedId) ?? stages[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.13] shadow-[0_34px_110px_rgba(0,0,0,0.25)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_410px] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-lime-200/70"><Repeat2 size={12} /> Communication loop</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Language lives in a loop between structure, minds, communities, and time.</h2>
        </div>
        <p className="text-[10px] leading-5 text-slate-500">A linguistic system is not only grammar inside one speaker. People learn it, process it, vary it in social interaction, and change it across repeated generations of use.</p>
      </div>

      <div className="grid gap-4 p-5 xl:grid-cols-[minmax(0,1fr)_340px] sm:p-6">
        <div className="relative min-h-[560px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#040a08]/72">
          <svg viewBox="0 0 820 560" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <ellipse cx="410" cy="275" rx="265" ry="175" fill="none" stroke="rgba(132,204,22,0.10)" strokeWidth="2" strokeDasharray="5 11" />
            <ellipse cx="410" cy="275" rx="205" ry="130" fill="none" stroke="rgba(34,211,238,0.06)" strokeWidth="1.2" />
            <path d="M188 189 C300 66 540 70 644 196" fill="none" stroke="rgba(132,204,22,0.12)" strokeWidth="2" />
            <path d="M644 196 C730 295 650 430 530 462" fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth="2" />
            <path d="M530 462 C370 530 190 445 164 324" fill="none" stroke="rgba(167,139,250,0.10)" strokeWidth="2" />
            <path d="M164 324 C123 265 137 220 188 189" fill="none" stroke="rgba(244,114,182,0.10)" strokeWidth="2" />
          </svg>

          <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-lime-200/[0.12] bg-black/[0.38] text-center shadow-[0_0_70px_rgba(132,204,22,0.08)] backdrop-blur-lg">
            <MessageCircle size={24} className="text-lime-200/65" />
            <strong className="mt-2 text-[11px] text-white">Language use</strong>
            <span className="mt-1 max-w-[100px] text-[7px] leading-3 text-slate-700">producing and interpreting signals with other people</span>
          </div>

          {stages.map((stage) => {
            const Icon = stage.icon ?? Radio;
            const active = stage.id === selected.id;
            return (
              <button key={stage.id} type="button" onClick={() => setSelectedId(stage.id)} className="group absolute w-[180px] -translate-x-1/2 -translate-y-1/2 text-left" style={{ left: `${stage.position.x}%`, top: `${stage.position.y}%`, zIndex: active ? 6 : 3 }}>
                <div className="rounded-[18px] border p-3 transition duration-300 group-hover:-translate-y-1" style={{ borderColor: `rgba(${stage.rgb},${active ? 0.3 : 0.12})`, background: `linear-gradient(145deg,rgba(${stage.rgb},${active ? 0.08 : 0.025}),rgba(0,0,0,0.30))`, boxShadow: active ? `0 0 38px rgba(${stage.rgb},0.10)` : undefined }}>
                  <Icon size={14} style={{ color: `rgb(${stage.rgb})` }} />
                  <div className="mt-3 font-mono text-[7px] uppercase tracking-[0.09em]" style={{ color: `rgba(${stage.rgb},0.62)` }}>{stage.status === "planned" ? "planned" : "open"}</div>
                  <strong className="mt-1 block text-[10px] text-white">{stage.label}</strong>
                  <span className="mt-1 block text-[7px] leading-3.5 text-slate-700">{stage.question}</span>
                </div>
              </button>
            );
          })}
        </div>

        <aside className="rounded-[24px] border border-white/[0.07] bg-white/[0.014] p-5">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.rgb},0.68)` }}>Selected dimension</div>
          <h3 className="mt-2 text-[23px] font-semibold tracking-[-0.04em] text-white">{selected.label}</h3>
          <p className="mt-2 text-[11px] font-medium leading-5 text-slate-300">{selected.question}</p>
          <p className="mt-4 text-[10px] leading-5 text-slate-500">{selected.summary}</p>
          <div className="mt-5 rounded-[16px] border border-white/[0.06] bg-black/[0.16] p-4 text-[8px] leading-4 text-slate-700">The loop matters because each dimension feeds back into the others: social variation becomes input to learning; learning reproduces or changes structure; processing pressures can favor some patterns over others.</div>
          {selected.href && selected.status !== "planned" ? <a href={selected.href} className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold" style={{ color: `rgb(${selected.rgb})`, borderColor: `rgba(${selected.rgb},0.22)` }}>Open branch <ArrowRight size={12} /></a> : <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">planned branch</span>}
        </aside>
      </div>
    </div>
  );
}
