"use client";

import { useMemo, useState } from "react";
import { GitFork, RotateCcw } from "lucide-react";

const STEPS = 48;
const DELTA = 0.000001;

const PRESETS = [
  { label: "Fixed point", r: 2.9 },
  { label: "Period doubling", r: 3.45 },
  { label: "Chaotic regime", r: 3.9 },
] as const;

export default function LogisticMapLab() {
  const [r, setR] = useState(3.9);
  const [x0, setX0] = useState(0.23);

  const { a, b } = useMemo(() => {
    return {
      a: iterate(r, x0),
      b: iterate(r, Math.min(0.999999, x0 + DELTA)),
    };
  }, [r, x0]);

  const finalDifference = Math.abs(a.at(-1)! - b.at(-1)!);
  const firstVisibleDivergence = a.findIndex((value, index) => Math.abs(value - b[index]) > 0.02);
  const regime = r < 3 ? "fixed-point behavior" : r < 3.57 ? "periodic / period-doubling behavior" : "chaotic behavior can occur";

  return (
    <section className="overflow-hidden rounded-[24px] border border-violet-100/[0.10] bg-[#0c0815]/70 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-violet-200/68"><GitFork size={13} /> Sensitivity laboratory</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">Same rule. Starting values differ by one millionth.</h3>
        </div>
        <button type="button" onClick={() => { setR(3.9); setX0(0.23); }} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 hover:text-white"><RotateCcw size={11} /> reset</button>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[230px_minmax(0,1fr)_290px] sm:p-5">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.07em] text-slate-500">Parameter regime</div>
          <div className="mt-3 space-y-2">
            {PRESETS.map((preset) => {
              const active = Math.abs(preset.r - r) < 0.005;
              return <button key={preset.label} type="button" onClick={() => setR(preset.r)} className="w-full rounded-[14px] border p-3 text-left transition" style={{ borderColor: active ? "rgba(167,139,250,0.30)" : "rgba(255,255,255,0.06)", background: active ? "rgba(167,139,250,0.055)" : "rgba(0,0,0,0.04)" }}><strong className="text-[12px] text-white/86">{preset.label}</strong><span className="mt-1 block font-mono text-[10px] text-violet-200/58">r = {preset.r.toFixed(2)}</span></button>;
            })}
          </div>

          <Control label="r" value={r} min={2.6} max={4} step={0.01} onChange={setR} />
          <Control label="initial x₀" value={x0} min={0.05} max={0.95} step={0.01} onChange={setX0} />
        </div>

        <div className="rounded-[18px] border border-white/[0.07] bg-black/[0.20] p-3">
          <svg viewBox="0 0 720 340" className="h-auto w-full" role="img" aria-label="Two logistic-map trajectories starting one millionth apart">
            <rect x="48" y="22" width="638" height="274" rx="14" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.07)" />
            {[0, 0.25, 0.5, 0.75, 1].map((value) => {
              const y = yFor(value);
              return <g key={value}><line x1="48" x2="686" y1={y} y2={y} stroke="rgba(255,255,255,0.05)" /><text x="38" y={y + 4} textAnchor="end" fill="rgba(148,163,184,0.55)" fontSize="10">{value}</text></g>;
            })}
            <polyline points={seriesPoints(a)} fill="none" stroke="rgba(96,165,250,0.90)" strokeWidth="2.2" strokeLinejoin="round" />
            <polyline points={seriesPoints(b)} fill="none" stroke="rgba(248,113,113,0.84)" strokeWidth="1.8" strokeLinejoin="round" />
            <text x="52" y="322" fill="rgba(148,163,184,0.55)" fontSize="10">iteration n</text>
          </svg>
          <div className="mt-2 flex flex-wrap items-center gap-4 px-2 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500"><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-blue-400" /> x₀ = {x0.toFixed(6)}</span><span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-red-400" /> x₀ + 0.000001</span></div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[17px] border border-white/[0.07] bg-black/[0.12] p-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Current regime</div>
            <strong className="mt-2 block text-[16px] text-violet-100/86">{regime}</strong>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <Readout label="final Δ" value={finalDifference.toExponential(2)} rgb="248,113,113" />
            <Readout label="first Δ > 0.02" value={firstVisibleDivergence < 0 ? "not reached" : `n = ${firstVisibleDivergence}`} rgb="250,204,21" />
          </div>
          <div className="mt-4 border-l-2 border-violet-300/30 pl-3">
            <strong className="text-[11px] text-violet-100/80">The rule is still deterministic</strong>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">Every next value is fixed by xₙ₊₁ = r xₙ(1 − xₙ). In a chaotic regime, small uncertainty in the starting state can grow until long-range trajectory prediction becomes practically useless.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function iterate(r: number, start: number) {
  const values = [start];
  let x = start;
  for (let i = 1; i < STEPS; i++) {
    x = r * x * (1 - x);
    values.push(x);
  }
  return values;
}

function seriesPoints(values: number[]) {
  return values.map((value, index) => `${48 + (index / (STEPS - 1)) * 638},${yFor(value)}`).join(" ");
}

function yFor(value: number) {
  return 296 - value * 274;
}

function Control({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void }) {
  return <label className="mt-4 block rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="flex items-center justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.05em] text-slate-500"><span>{label}</span><span className="text-violet-100/72">{value.toFixed(2)}</span></div><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400" aria-label={label} /></label>;
}

function Readout({ label, value, rgb }: { label: string; value: string; rgb: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[8px] uppercase tracking-[0.05em] text-slate-500">{label}</div><strong className="mt-1 block text-[12px]" style={{ color: `rgba(${rgb},0.84)` }}>{value}</strong></div>;
}
