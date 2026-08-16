"use client";

import { useState } from "react";
import { Clock3, RadioTower, Sparkles } from "lucide-react";

export type LightTravelExample = {
  id: string;
  label: string;
  travelTime: string;
  distance: string;
  note: string;
  accentRgb: string;
};

export default function LightTravelTime({ examples }: { examples: LightTravelExample[] }) {
  const [selectedId, setSelectedId] = useState(examples[0]?.id ?? "");
  const selected = examples.find((item) => item.id === selectedId) ?? examples[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/[0.08] bg-black/[0.13] backdrop-blur-xl">
      <div className="border-b border-white/[0.07] p-5 sm:p-6">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/65"><Clock3 size={12} /> Distance is also lookback time</div>
        <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.035em] text-white">Astronomy never sees the universe “right now.”</h2>
        <p className="mt-2 max-w-3xl text-[10px] leading-5 text-slate-500">Light takes time to travel. The farther away an object is, the older the information reaching the telescope.</p>
      </div>

      <div className="grid lg:grid-cols-[270px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.07] p-3 lg:border-b-0 lg:border-r">
          {examples.map((item) => {
            const active = item.id === selected.id;
            return (
              <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className={`mb-1 flex w-full items-center justify-between rounded-[13px] border px-3 py-3 text-left transition last:mb-0 ${active ? "bg-white/[0.045]" : "border-transparent hover:bg-white/[0.02]"}`} style={{ borderColor: active ? `rgba(${item.accentRgb},0.18)` : undefined }}>
                <span><strong className="block text-[10px] text-slate-300">{item.label}</strong><span className="mt-1 block font-mono text-[7px] text-slate-700">{item.distance}</span></span>
                <span className="font-mono text-[8px]" style={{ color: `rgba(${item.accentRgb},0.7)` }}>{item.travelTime}</span>
              </button>
            );
          })}
        </div>

        <div className="relative min-h-[280px] overflow-hidden p-5 sm:p-6">
          <div className="absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 18% 50%,rgba(${selected.accentRgb},0.14),transparent 22%),linear-gradient(90deg,rgba(${selected.accentRgb},0.02),transparent 65%)` }} />
          <div className="relative z-10 grid min-h-[230px] items-center gap-6 md:grid-cols-[180px_minmax(0,1fr)_180px]">
            <div className="text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border" style={{ color: `rgb(${selected.accentRgb})`, borderColor: `rgba(${selected.accentRgb},0.25)`, boxShadow: `0 0 52px rgba(${selected.accentRgb},0.13)` }}><Sparkles size={24} /></span>
              <div className="mt-3 text-[10px] font-semibold text-white">{selected.label}</div>
            </div>
            <div className="relative h-16">
              <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-white/10 via-cyan-200/50 to-white/10" />
              <div className="absolute left-0 top-1/2 h-3 w-3 -translate-y-1/2 animate-[light-travel_4s_linear_infinite] rounded-full bg-cyan-100 shadow-[0_0_20px_rgba(165,243,252,0.8)]" />
              <div className="absolute inset-x-0 top-[calc(50%+14px)] text-center font-mono text-[8px] uppercase tracking-[0.1em] text-cyan-100/60">{selected.travelTime} in transit</div>
            </div>
            <div className="text-center">
              <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-cyan-200/[0.16] bg-cyan-300/[0.035] text-cyan-100"><RadioTower size={24} /></span>
              <div className="mt-3 text-[10px] font-semibold text-white">Observer</div>
            </div>
          </div>
          <p className="relative z-10 mx-auto mt-1 max-w-2xl text-center text-[10px] leading-5 text-slate-500">{selected.note}</p>
        </div>
      </div>
      <style jsx>{`
        @keyframes light-travel { from { left: 0%; } to { left: calc(100% - 12px); } }
        @media (prefers-reduced-motion: reduce) { .animate-[light-travel_4s_linear_infinite] { animation: none !important; left: 50%; } }
      `}</style>
    </div>
  );
}
