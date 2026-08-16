"use client";

import { useState, type ComponentType } from "react";
import { ArrowRight, SlidersVertical } from "lucide-react";

export type MixChannel = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  href?: string;
  status?: "active" | "planned";
  icon?: ComponentType<{ size?: number; className?: string }>;
};

export default function MixingConsoleTopology({ channels }: { channels: MixChannel[] }) {
  const [selectedId, setSelectedId] = useState(channels[0]?.id ?? "");
  const selected = channels.find((item) => item.id === selectedId) ?? channels[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.14] shadow-[0_34px_110px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.15em] text-rose-200/70"><SlidersVertical size={12} /> Mix the dimensions</div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">Music is several structures happening at the same time.</h2>
          <p className="mt-3 max-w-3xl text-[10px] leading-5 text-slate-500">Sound, pitch organization, rhythm, performance, recording, and cultural meaning overlap in every piece. The channels separate them just long enough to study one dimension clearly.</p>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">{channels.length} study channels</span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="overflow-x-auto border-b border-white/[0.07] p-4 lg:border-b-0 lg:border-r sm:p-5">
          <div className="flex min-w-[680px] items-stretch gap-2">
            {channels.map((channel, index) => {
              const active = channel.id === selected.id;
              const Icon = channel.icon;
              const level = 42 + ((index * 17) % 44);
              return (
                <button
                  key={channel.id}
                  type="button"
                  onClick={() => setSelectedId(channel.id)}
                  className={`group flex min-h-[430px] min-w-[118px] flex-1 flex-col rounded-[18px] border p-3 transition ${active ? "bg-white/[0.04]" : "bg-black/[0.16] hover:bg-white/[0.02]"}`}
                  style={{ borderColor: `rgba(${channel.rgb},${active ? 0.26 : 0.08})` }}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[7px] uppercase tracking-[0.08em]" style={{ color: `rgba(${channel.rgb},0.58)` }}>CH {String(index + 1).padStart(2, "0")}</span>
                    {Icon ? <Icon size={13} className="text-slate-600" /> : null}
                  </div>
                  <div className="relative mx-auto mt-8 h-[250px] w-9 rounded-full border border-white/[0.06] bg-black/25">
                    <div className="absolute bottom-4 left-1/2 h-[190px] w-px -translate-x-1/2 bg-white/[0.07]" />
                    {Array.from({ length: 9 }, (_, tick) => <span key={tick} className="absolute left-[7px] right-[7px] h-px bg-white/[0.055]" style={{ top: `${14 + tick * 9}%` }} />)}
                    <span
                      className="absolute left-1/2 h-9 w-7 -translate-x-1/2 rounded-[8px] border shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-500"
                      style={{
                        bottom: `${level}%`,
                        color: `rgb(${channel.rgb})`,
                        borderColor: `rgba(${channel.rgb},${active ? 0.45 : 0.2})`,
                        background: `linear-gradient(180deg,rgba(${channel.rgb},0.2),rgba(5,5,8,0.92))`,
                        boxShadow: active ? `0 0 30px rgba(${channel.rgb},0.14)` : undefined,
                      }}
                    />
                  </div>
                  <strong className={`mt-6 block text-[10px] leading-4 ${active ? "text-white" : "text-slate-500"}`}>{channel.label}</strong>
                  <span className="mt-1 line-clamp-2 text-[8px] leading-4 text-slate-700">{channel.question}</span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className="font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.rgb},0.65)` }}>{selected.question}</div>
          <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-white">{selected.label}</h3>
          <p className="mt-3 text-[11px] leading-6 text-slate-400">{selected.summary}</p>
          <div className="mt-6 rounded-[16px] border border-white/[0.06] bg-white/[0.014] p-4 text-[9px] leading-5 text-slate-600">
            Isolating this channel does not mean it exists alone. It is a temporary analytical move before the dimensions are mixed back together.
          </div>
          {selected.href && selected.status !== "planned" ? (
            <a href={selected.href} className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold" style={{ color: `rgb(${selected.rgb})`, borderColor: `rgba(${selected.rgb},0.22)` }}>
              Open channel <ArrowRight size={12} />
            </a>
          ) : (
            <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700">planned branch</span>
          )}
        </aside>
      </div>
    </div>
  );
}
