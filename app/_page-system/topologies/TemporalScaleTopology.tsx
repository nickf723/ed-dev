"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Clock3, ZoomIn } from "lucide-react";

export type TemporalBand = {
  id: string;
  label: string;
  start: number;
  end: number;
  span: string;
  summary: string;
  accentRgb: string;
  href?: string;
};

export type TemporalWindow = {
  id: string;
  label: string;
  start: number;
  end: number;
  note: string;
};

export default function TemporalScaleTopology({
  bands,
  windows,
  initialWindowId,
}: {
  bands: TemporalBand[];
  windows: TemporalWindow[];
  initialWindowId?: string;
}) {
  const [windowId, setWindowId] = useState(initialWindowId ?? windows[0]?.id ?? "");
  const [selectedId, setSelectedId] = useState(bands[0]?.id ?? "");
  const window = windows.find((item) => item.id === windowId) ?? windows[0];
  const selected = bands.find((item) => item.id === selectedId) ?? bands[0];

  const visible = useMemo(() => {
    if (!window) return [];
    const width = Math.max(1, window.end - window.start);
    return bands
      .map((band) => {
        const start = Math.max(window.start, band.start);
        const end = Math.min(window.end, band.end);
        if (end <= start) return null;
        return {
          ...band,
          clippedStart: start,
          clippedEnd: end,
          left: ((start - window.start) / width) * 100,
          width: ((end - start) / width) * 100,
        };
      })
      .filter(Boolean) as Array<TemporalBand & { clippedStart: number; clippedEnd: number; left: number; width: number }>;
  }, [bands, window]);

  if (!window) return null;

  return (
    <div className="overflow-hidden rounded-[30px] border border-white/[0.09] bg-black/[0.13] shadow-[0_34px_110px_rgba(0,0,0,0.26)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-7">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-amber-200/70">
            <ZoomIn size={12} /> Temporal scale
          </div>
          <h2 className="mt-2 text-[clamp(1.7rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">
            The shape of history changes when you change the window.
          </h2>
          <p className="mt-3 max-w-3xl text-[11px] leading-5 text-slate-400">
            A linear timeline makes one fact impossible to miss: most of the human story happened before written archives. Zooming does not change the past—it changes which relationships become visible.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {windows.map((item) => {
            const active = item.id === window.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setWindowId(item.id)}
                className={`rounded-full border px-3 py-2 font-mono text-[8px] uppercase tracking-[0.1em] transition ${
                  active
                    ? "border-amber-200/25 bg-amber-300/[0.08] text-amber-100"
                    : "border-white/[0.07] bg-white/[0.02] text-slate-600 hover:text-slate-300"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">
          <span>{formatYear(window.start)}</span>
          <span className="text-center text-amber-100/45">{window.note}</span>
          <span>{formatYear(window.end)}</span>
        </div>

        <div className="relative mt-5 h-[220px] overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#0b0805]/80">
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(rgba(251,191,36,0.065) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,0.065) 1px,transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {visible.map((band, index) => {
            const active = band.id === selected?.id;
            const top = index % 2 === 0 ? 28 : 118;
            return (
              <button
                type="button"
                key={band.id}
                onClick={() => setSelectedId(band.id)}
                className="absolute min-w-[5px] overflow-hidden rounded-[14px] border text-left transition-all duration-300"
                style={{
                  left: `${band.left}%`,
                  width: `${Math.max(1.25, band.width)}%`,
                  top,
                  height: 72,
                  color: `rgb(${band.accentRgb})`,
                  borderColor: `rgba(${band.accentRgb},${active ? 0.42 : 0.18})`,
                  background: `linear-gradient(135deg,rgba(${band.accentRgb},${active ? 0.14 : 0.055}),rgba(6,5,4,0.78))`,
                  boxShadow: active ? `0 0 42px rgba(${band.accentRgb},0.12)` : undefined,
                  zIndex: active ? 4 : 2,
                }}
                title={`${band.label} · ${band.span}`}
              >
                <div className="h-full min-w-[150px] p-3">
                  <div className="font-mono text-[7px] uppercase tracking-[0.1em] opacity-70">{band.span}</div>
                  <strong className="mt-1 block truncate text-[10px] text-white">{band.label}</strong>
                </div>
              </button>
            );
          })}
        </div>

        {selected ? (
          <div className="mt-4 grid gap-4 rounded-[20px] border border-white/[0.07] bg-white/[0.018] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div>
              <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.12em]" style={{ color: `rgba(${selected.accentRgb},0.72)` }}>
                <Clock3 size={11} /> {selected.span}
              </div>
              <h3 className="mt-1 text-[17px] font-semibold text-white">{selected.label}</h3>
              <p className="mt-2 max-w-3xl text-[10px] leading-5 text-slate-500">{selected.summary}</p>
            </div>
            {selected.href ? (
              <a
                href={selected.href}
                className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold transition hover:bg-white/[0.035]"
                style={{ color: `rgb(${selected.accentRgb})`, borderColor: `rgba(${selected.accentRgb},0.2)` }}
              >
                Enter period <ArrowRight size={12} />
              </a>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function formatYear(year: number) {
  if (year < 0) return `${Math.abs(year).toLocaleString()} BCE`;
  if (year === 0) return "1 BCE / 1 CE";
  return `${year.toLocaleString()} CE`;
}
