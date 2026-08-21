"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Disc3,
  Mic2,
  Music2,
  SlidersVertical,
  Waves,
  type LucideIcon,
} from "lucide-react";

const MIX_ICONS = {
  book: BookOpen,
  disc: Disc3,
  mic: Mic2,
  music: Music2,
  waves: Waves,
} satisfies Record<string, LucideIcon>;

export type MixChannelIcon = keyof typeof MIX_ICONS;

export type MixChannel = {
  id: string;
  label: string;
  question: string;
  summary: string;
  rgb: string;
  href?: string;
  status?: "active" | "planned";
  icon?: MixChannelIcon;
};

export default function MixingConsoleTopology({
  channels,
}: {
  channels: readonly MixChannel[];
}) {
  const [selectedId, setSelectedId] = useState(channels[0]?.id ?? "");
  const selected =
    channels.find((item) => item.id === selectedId) ?? channels[0];
  if (!selected) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.08] bg-black/[0.14] shadow-[0_34px_110px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-200/70">
            <SlidersVertical size={14} /> Mix the dimensions
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            Music is several structures happening at the same time.
          </h2>
          <p className="text-slate-400/72 mt-3 max-w-3xl text-[14px] leading-6">
            Sound, pitch organization, rhythm, performance, recording, and
            cultural meaning overlap in every piece. The channels separate them
            just long enough to study one dimension clearly.
          </p>
        </div>
        <span className="text-slate-500/68 font-mono text-[11px] uppercase tracking-[0.09em]">
          {channels.length} study channels
        </span>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="overflow-x-auto border-b border-white/[0.07] p-4 sm:p-5 lg:border-b-0 lg:border-r">
          <div className="flex min-w-[680px] items-stretch gap-2">
            {channels.map((channel, index) => {
              const active = channel.id === selected.id;
              const Icon = channel.icon ? MIX_ICONS[channel.icon] : undefined;
              const level = 42 + ((index * 17) % 44);
              return (
                <div
                  key={channel.id}
                  className={`group flex min-h-[430px] min-w-[118px] flex-1 flex-col rounded-[18px] border p-3 transition ${
                    active
                      ? "bg-white/[0.04]"
                      : "bg-black/[0.16] hover:bg-white/[0.02]"
                  }`}
                  style={{
                    borderColor: `rgba(${channel.rgb},${active ? 0.26 : 0.08})`,
                  }}
                >
                  <button
                    type="button"
                    aria-pressed={active}
                    aria-label={`Inspect ${channel.label}`}
                    onClick={() => setSelectedId(channel.id)}
                    className="flex flex-1 flex-col rounded-[13px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className="font-mono text-[11px] uppercase tracking-[0.07em]"
                        style={{ color: `rgba(${channel.rgb},0.58)` }}
                      >
                        CH {String(index + 1).padStart(2, "0")}
                      </span>
                      {Icon ? (
                        <Icon
                          size={14}
                          className="text-slate-500"
                          aria-hidden="true"
                        />
                      ) : null}
                    </div>
                    <div className="relative mx-auto mt-8 h-[250px] w-9 rounded-full border border-white/[0.06] bg-black/25">
                      <div className="absolute bottom-4 left-1/2 h-[190px] w-px -translate-x-1/2 bg-white/[0.07]" />
                      {Array.from({ length: 9 }, (_, tick) => (
                        <span
                          key={tick}
                          className="absolute left-[7px] right-[7px] h-px bg-white/[0.055]"
                          style={{ top: `${14 + tick * 9}%` }}
                        />
                      ))}
                      <span
                        className="absolute left-1/2 h-9 w-7 -translate-x-1/2 rounded-[8px] border shadow-[0_8px_20px_rgba(0,0,0,0.4)] transition-all duration-500"
                        style={{
                          bottom: `${level}%`,
                          color: `rgb(${channel.rgb})`,
                          borderColor: `rgba(${channel.rgb},${active ? 0.45 : 0.2})`,
                          background: `linear-gradient(180deg,rgba(${channel.rgb},0.2),rgba(5,5,8,0.92))`,
                          boxShadow: active
                            ? `0 0 30px rgba(${channel.rgb},0.14)`
                            : undefined,
                        }}
                      />
                    </div>
                    <strong
                      className={`mt-6 block text-[13px] leading-4 ${
                        active ? "text-white" : "text-slate-400"
                      }`}
                    >
                      {channel.label}
                    </strong>
                    <span className="text-slate-500/78 mt-1.5 line-clamp-3 text-[11px] leading-4">
                      {channel.question}
                    </span>
                  </button>
                  {channel.href && channel.status !== "planned" ? (
                    <Link
                      href={channel.href}
                      className="mt-3 inline-flex items-center justify-between rounded-[11px] border border-white/[0.07] px-2.5 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-slate-500 transition hover:border-white/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60"
                    >
                      Enter <ArrowRight size={12} aria-hidden="true" />
                    </Link>
                  ) : (
                    <span className="mt-3 rounded-[11px] border border-white/[0.05] px-2.5 py-2 text-center font-mono text-[11px] uppercase tracking-[0.06em] text-slate-700">
                      Planned
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em]"
            style={{ color: `rgba(${selected.rgb},0.65)` }}
          >
            {selected.question}
          </div>
          <h3 className="mt-2 text-[26px] font-semibold tracking-[-0.04em] text-white">
            {selected.label}
          </h3>
          <p className="text-slate-400/74 mt-3 text-[14px] leading-6">
            {selected.summary}
          </p>
          <div className="mt-6 rounded-[16px] border border-white/[0.06] bg-white/[0.014] p-4 text-[13px] leading-6 text-slate-400/70">
            Isolating this channel does not mean it exists alone. It is a
            temporary analytical move before the dimensions are mixed back
            together.
          </div>
          {selected.href && selected.status !== "planned" ? (
            <Link
              href={selected.href}
              className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200/60"
              style={{
                color: `rgb(${selected.rgb})`,
                borderColor: `rgba(${selected.rgb},0.22)`,
              }}
            >
              Open channel <ArrowRight size={14} aria-hidden="true" />
            </Link>
          ) : (
            <span className="mt-5 inline-block rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.09em] text-slate-500/70">
              planned branch
            </span>
          )}
        </aside>
      </div>
    </div>
  );
}
