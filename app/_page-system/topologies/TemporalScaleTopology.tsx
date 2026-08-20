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

export default function TemporalScaleTopology({ bands, windows, initialWindowId }: { bands: TemporalBand[]; windows: TemporalWindow[]; initialWindowId?: string }) {
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
    <div className="overflow-hidden rounded-[26px] border border-white/[0.09] bg-black/[0.13] backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-amber-200/72"><ZoomIn size={13} /> Temporal scale</div>
          <h2 className="mt-1.5 text-[clamp(1.55rem,2.7vw,2.45rem)] font-semibold tracking-[-0.04em] text-white">The shape of history changes when you change the window.</h2>
          <p className="mt-2 max-w-3xl text-[13px] leading-6 text-slate-400">Zooming does not change the past. It changes which durations, boundaries, and relationships become visible.</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {windows.map((item) => {
            const active = item.id === window.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setWindowId(item.id)}
                className={`rounded-full border px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] transition ${active ? "border-amber-200/25 bg-amber-300/[0.08] text-amber-100" : "border-white/[0.07] bg-white/[0.02] text-slate-500 hover:text-slate-300"}`}
                aria-pressed={active}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-0 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 border-b border-white/[0.07] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="flex items-center justify-between gap-4 font-mono text-[9px] uppercase tracking-[0.07em] text-slate-500">
            <span>{formatYear(window.start)}</span>
            <span className="max-w-[60%] text-center text-amber-100/50">{window.note}</span>
            <span>{formatYear(window.end)}</span>
          </div>

          <div className="relative mt-4 h-[205px] overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0b0805]/80">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-200/35 to-transparent" />
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(251,191,36,0.065) 1px,transparent 1px),linear-gradient(90deg,rgba(251,191,36,0.065) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

            {visible.map((band, index) => {
              const active = band.id === selected?.id;
              const top = index % 2 === 0 ? 24 : 110;
              return (
                <button
                  type="button"
                  key={band.id}
                  onClick={() => setSelectedId(band.id)}
                  className="absolute min-w-[5px] overflow-hidden rounded-[12px] border text-left transition-all duration-300"
                  style={{
                    left: `${band.left}%`,
                    width: `${Math.max(1.25, band.width)}%`,
                    top,
                    height: 68,
                    color: `rgb(${band.accentRgb})`,
                    borderColor: `rgba(${band.accentRgb},${active ? 0.42 : 0.18})`,
                    background: `linear-gradient(135deg,rgba(${band.accentRgb},${active ? 0.14 : 0.055}),rgba(6,5,4,0.78))`,
                    boxShadow: active ? `0 0 34px rgba(${band.accentRgb},0.12)` : undefined,
                    zIndex: active ? 4 : 2,
                  }}
                  title={`${band.label} · ${band.span}`}
                  aria-pressed={active}
                >
                  <div className="h-full min-w-[140px] p-2.5">
                    <div className="font-mono text-[8px] uppercase tracking-[0.06em] opacity-75">{band.span}</div>
                    <strong className="mt-1 block truncate text-[11px] text-white">{band.label}</strong>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {selected ? (
          <aside className="p-4 sm:p-5 xl:sticky xl:top-[172px] xl:self-start">
            <div className="font-mono text-[8px] uppercase tracking-[0.07em] text-slate-600">Reading era</div>
            <div className="mt-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.06em]" style={{ color: `rgba(${selected.accentRgb},0.76)` }}><Clock3 size={12} /> {selected.span}</div>
            <h3 className="mt-2 text-[20px] font-semibold text-white">{selected.label}</h3>
            <p className="mt-3 text-[13px] leading-6 text-slate-400">{selected.summary}</p>
            <div className="mt-4 border-t border-white/[0.07] pt-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600">Chronology reminder</div>
              <p className="mt-1.5 text-[11px] leading-5 text-slate-500">Era boundaries are analytical choices. The events and structures on either side may change gradually, unevenly, or on different schedules across regions.</p>
            </div>
            {selected.href ? (
              <a href={selected.href} className="mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold transition hover:bg-white/[0.035]" style={{ color: `rgb(${selected.accentRgb})`, borderColor: `rgba(${selected.accentRgb},0.2)` }}>
                Enter period <ArrowRight size={13} />
              </a>
            ) : null}
          </aside>
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
