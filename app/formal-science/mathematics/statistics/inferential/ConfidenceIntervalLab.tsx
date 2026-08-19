"use client";

import { useMemo, useState } from "react";
import { RefreshCw, ScanLine } from "lucide-react";

type Level = 90 | 95 | 99;
const SAMPLE_SIZES = [10, 30, 100] as const;
const LEVELS: readonly Level[] = [90, 95, 99];
const Z: Record<Level, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };
const MU = 50;
const SIGMA = 10;
const INTERVAL_COUNT = 24;

function makeRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return (state + 1) / 4294967297;
  };
}

function normal(random: () => number) {
  const u1 = Math.max(1e-9, random());
  const u2 = random();
  return Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
}

export default function ConfidenceIntervalLab() {
  const [sampleSize, setSampleSize] = useState<(typeof SAMPLE_SIZES)[number]>(30);
  const [level, setLevel] = useState<Level>(95);
  const [seed, setSeed] = useState(1729);

  const simulation = useMemo(() => {
    const random = makeRandom(seed);
    const standardError = SIGMA / Math.sqrt(sampleSize);
    const margin = Z[level] * standardError;
    const intervals = Array.from({ length: INTERVAL_COUNT }, () => {
      const mean = MU + standardError * normal(random);
      const low = mean - margin;
      const high = mean + margin;
      return { mean, low, high, covers: low <= MU && MU <= high };
    });
    const covered = intervals.filter((interval) => interval.covers).length;
    return { intervals, standardError, margin, covered };
  }, [level, sampleSize, seed]);

  const xMin = 35;
  const xMax = 65;
  const toX = (value: number) => 36 + ((value - xMin) / (xMax - xMin)) * 228;

  return (
    <section className="overflow-hidden rounded-[30px] border border-blue-200/[0.10] bg-[#06101d]/74 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-200/66"><ScanLine size={13} /> Repeated confidence-interval lab</div>
          <p className="mt-1 text-[10px] text-slate-600">Toy model: independent normal observations, population σ = 10 known, true mean μ = 50.</p>
        </div>
        <button type="button" onClick={() => setSeed((value) => value + 3571)} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"><RefreshCw size={11} /> resample</button>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ChoiceRow label="Sample size" options={SAMPLE_SIZES} selected={sampleSize} onSelect={(value) => setSampleSize(value)} format={(value) => `n=${value}`} rgb="96, 165, 250" />
            <ChoiceRow label="Confidence level" options={LEVELS} selected={level} onSelect={(value) => setLevel(value)} format={(value) => `${value}%`} rgb="192, 132, 252" />
          </div>

          <div className="mt-4 overflow-hidden rounded-[20px] border border-white/[0.07] bg-black/[0.14] p-3">
            <svg viewBox="0 0 300 348" className="h-auto w-full" role="img" aria-label={`${level}% confidence intervals from repeated samples`}>
              <line x1={toX(MU)} y1="18" x2={toX(MU)} y2="330" stroke="rgba(250,204,21,0.45)" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x={toX(MU) + 5} y="13" fill="rgba(250,204,21,0.68)" fontSize="8">true μ = 50</text>
              {simulation.intervals.map((interval, index) => {
                const y = 28 + index * 12.5;
                const low = Math.max(xMin, interval.low);
                const high = Math.min(xMax, interval.high);
                const stroke = interval.covers ? "rgba(96,165,250,0.72)" : "rgba(248,113,113,0.78)";
                return (
                  <g key={index}>
                    <line x1={toX(low)} y1={y} x2={toX(high)} y2={y} stroke={stroke} strokeWidth="2" />
                    <circle cx={toX(Math.max(xMin, Math.min(xMax, interval.mean)))} cy={y} r="2.3" fill={stroke} />
                  </g>
                );
              })}
              <line x1="36" y1="334" x2="264" y2="334" stroke="rgba(255,255,255,0.08)" />
              {[35, 40, 45, 50, 55, 60, 65].map((value) => <text key={value} x={toX(value)} y="345" textAnchor="middle" fill="rgba(100,116,139,0.75)" fontSize="7">{value}</text>)}
            </svg>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.05] px-2 pt-2 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700"><span className="text-blue-300/60">blue = covers μ</span><span className="text-red-300/60">red = misses μ</span><span>each row = new sample</span></div>
          </div>
        </div>

        <aside className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">Current procedure</div>
          <Metric label="Standard error" value={simulation.standardError.toFixed(3)} note="σ / √n" />
          <Metric label="Margin of error" value={simulation.margin.toFixed(3)} note={`${Z[level]} × standard error`} />
          <Metric label="This batch covered μ" value={`${simulation.covered}/${INTERVAL_COUNT}`} note={`${((simulation.covered / INTERVAL_COUNT) * 100).toFixed(1)}% in this simulation`} />
          <div className="mt-5 border-t border-white/[0.06] pt-4"><strong className="text-[11px] text-blue-100/74">Frequentist interpretation</strong><p className="mt-2 text-[10px] leading-5 text-slate-600">Before sampling, this procedure has the stated long-run coverage under its assumptions. After one interval is computed, the fixed μ is either inside that interval or it is not; the 95% describes the procedure’s repeated-sampling performance.</p></div>
        </aside>
      </div>
    </section>
  );
}

function ChoiceRow<T extends number>({ label, options, selected, onSelect, format, rgb }: { label: string; options: readonly T[]; selected: T; onSelect: (value: T) => void; format: (value: T) => string; rgb: string }) {
  return <div className="rounded-[16px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><div className="mt-2 flex gap-1.5">{options.map((value) => { const active = value === selected; return <button key={value} type="button" onClick={() => onSelect(value)} className="flex-1 rounded-full border px-2 py-1.5 font-mono text-[8px] transition" style={{ color: active ? `rgba(${rgb},0.88)` : "rgb(100 116 139)", borderColor: active ? `rgba(${rgb},0.28)` : "rgba(255,255,255,0.07)", background: active ? `rgba(${rgb},0.07)` : "rgba(255,255,255,0.012)" }}>{format(value)}</button>; })}</div></div>;
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="mt-4 border-b border-white/[0.055] pb-3 last:border-b-0"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[17px] text-blue-100/80">{value}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-600">{note}</span></div>;
}
