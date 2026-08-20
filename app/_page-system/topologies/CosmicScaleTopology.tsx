"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Maximize2, Ruler, Search, ZoomIn } from "lucide-react";

export type ScaleNode = {
  id: string;
  label: string;
  exponent: number;
  scaleLabel: string;
  summary: string;
  accentRgb: string;
  href?: string;
  status?: "active" | "planned";
};

export default function CosmicScaleTopology({ nodes }: { nodes: ScaleNode[] }) {
  const sorted = useMemo(() => [...nodes].sort((a, b) => a.exponent - b.exponent), [nodes]);
  const min = sorted[0]?.exponent ?? 6;
  const max = sorted[sorted.length - 1]?.exponent ?? 26;
  const [zoom, setZoom] = useState(sorted[0]?.exponent ?? min);
  const nearest = useMemo(
    () => sorted.reduce((best, node) => (Math.abs(node.exponent - zoom) < Math.abs(best.exponent - zoom) ? node : best), sorted[0]),
    [sorted, zoom],
  );

  if (!sorted.length || !nearest) return null;

  return (
    <div className="overflow-hidden rounded-[32px] border border-white/[0.09] bg-black/[0.14] shadow-[0_34px_115px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-7">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-violet-200/70">
            <Maximize2 size={12} /> Logarithmic scale navigator
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.05em] text-white">
            Astronomy changes object before it changes subject.
          </h2>
          <p className="mt-3 max-w-3xl text-[11px] leading-5 text-slate-400">
            Moving outward by powers of ten takes you from worlds to stellar systems, galaxies, galaxy populations, and eventually the universe as a whole. The organizing question is often simply: what scale are we trying to explain?
          </p>
        </div>
        <div className="rounded-[16px] border border-violet-200/[0.11] bg-violet-300/[0.035] px-4 py-3 text-right">
          <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-violet-200/55">Current window</div>
          <div className="mt-1 font-mono text-[18px] font-semibold text-violet-100">10^{Math.round(zoom)} m</div>
        </div>
      </div>

      <div className="p-5 sm:p-7">
        <div className="relative h-[360px] overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#03040d]/78">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.09),transparent_58%)]" />
          <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-cyan-300/20 via-violet-300/40 to-fuchsia-300/24" />
          <div className="absolute left-[8%] right-[8%] top-[calc(50%+28px)] flex justify-between font-mono text-[7px] uppercase tracking-[0.1em] text-slate-800">
            <span>planetary</span><span>stellar</span><span>galactic</span><span>cosmic</span>
          </div>

          {Array.from({ length: max - min + 1 }, (_, index) => min + index).map((power) => {
            const left = 8 + ((power - min) / Math.max(1, max - min)) * 84;
            return (
              <div key={power} className="absolute top-[calc(50%-6px)] h-3 w-px bg-white/[0.08]" style={{ left: `${left}%` }}>
                {power % 2 === 0 ? <span className="absolute left-1/2 top-5 -translate-x-1/2 font-mono text-[6px] text-slate-800">10^{power}</span> : null}
              </div>
            );
          })}

          {sorted.map((node, index) => {
            const left = 8 + ((node.exponent - min) / Math.max(1, max - min)) * 84;
            const active = node.id === nearest.id;
            const above = index % 2 === 0;
            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setZoom(node.exponent)}
                className="absolute w-[170px] -translate-x-1/2 text-center"
                style={{ left: `${left}%`, top: above ? "17%" : "58%", zIndex: active ? 6 : 3 }}
              >
                <span
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300"
                  style={{
                    color: `rgb(${node.accentRgb})`,
                    borderColor: `rgba(${node.accentRgb},${active ? 0.45 : 0.18})`,
                    background: `radial-gradient(circle,rgba(${node.accentRgb},${active ? 0.18 : 0.06}),rgba(2,3,10,0.9))`,
                    boxShadow: active ? `0 0 48px rgba(${node.accentRgb},0.18)` : undefined,
                    transform: active ? "scale(1.12)" : undefined,
                  }}
                >
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: `rgb(${node.accentRgb})`, boxShadow: `0 0 20px rgba(${node.accentRgb},0.65)` }} />
                </span>
                <span className={`mt-3 block text-[10px] font-semibold ${active ? "text-white" : "text-slate-400"}`}>{node.label}</span>
                <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.08em]" style={{ color: `rgba(${node.accentRgb},0.6)` }}>{node.scaleLabel}</span>
              </button>
            );
          })}

          <input
            aria-label="Cosmic scale"
            type="range"
            min={min}
            max={max}
            step={0.05}
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
            className="absolute inset-x-[8%] bottom-5 w-[84%] accent-violet-300"
          />
        </div>

        <div className="mt-4 grid gap-4 rounded-[22px] border border-white/[0.07] bg-white/[0.016] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div>
            <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.11em]" style={{ color: `rgba(${nearest.accentRgb},0.72)` }}>
              <Ruler size={11} /> around {nearest.scaleLabel}
            </div>
            <h3 className="mt-1 text-[20px] font-semibold text-white">{nearest.label}</h3>
            <p className="mt-2 max-w-3xl text-[10px] leading-5 text-slate-500">{nearest.summary}</p>
          </div>
          {nearest.href && nearest.status !== "planned" ? (
            <a href={nearest.href} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[9px] font-semibold" style={{ color: `rgb(${nearest.accentRgb})`, borderColor: `rgba(${nearest.accentRgb},0.22)` }}>
              Enter scale <ArrowRight size={12} />
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700"><Search size={11} /> planned branch</span>
          )}
        </div>
      </div>
    </div>
  );
}
