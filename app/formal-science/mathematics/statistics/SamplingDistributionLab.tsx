"use client";

import { useMemo, useState } from "react";
import { RefreshCw, Sigma } from "lucide-react";

const SAMPLE_SIZES = [1, 2, 5, 10, 30] as const;
const BIN_COUNT = 18;
const MAX_X = 4.5;

function makeRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return (state + 1) / 4294967297;
  };
}

function exponential(random: () => number) {
  return -Math.log(Math.max(1e-9, random()));
}

function histogram(values: readonly number[]) {
  const bins = new Array<number>(BIN_COUNT).fill(0);
  for (const value of values) {
    const normalized = Math.max(0, Math.min(0.999999, value / MAX_X));
    bins[Math.floor(normalized * BIN_COUNT)] += 1;
  }
  return bins;
}

export default function SamplingDistributionLab() {
  const [sampleSize, setSampleSize] = useState<(typeof SAMPLE_SIZES)[number]>(5);
  const [seed, setSeed] = useState(9137);

  const data = useMemo(() => {
    const populationRandom = makeRandom(seed);
    const population = Array.from({ length: 700 }, () => exponential(populationRandom));

    const sampleRandom = makeRandom(seed + 173);
    const means = Array.from({ length: 600 }, () => {
      let sum = 0;
      for (let index = 0; index < sampleSize; index += 1) sum += exponential(sampleRandom);
      return sum / sampleSize;
    });

    const mean = means.reduce((total, value) => total + value, 0) / means.length;
    const variance = means.reduce((total, value) => total + (value - mean) ** 2, 0) / (means.length - 1);

    return {
      population: histogram(population),
      means: histogram(means),
      mean,
      standardError: Math.sqrt(variance),
    };
  }, [sampleSize, seed]);

  return (
    <section className="overflow-hidden rounded-[28px] border border-indigo-200/[0.10] bg-[#070a1a]/72 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-indigo-200/66"><Sigma size={13} /> Sampling-distribution lab</div>
          <p className="mt-1 text-[10px] text-slate-600">Repeatedly sample from a strongly right-skewed population and watch the distribution of sample means change.</p>
        </div>
        <button type="button" onClick={() => setSeed((value) => value + 7919)} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"><RefreshCw size={11} /> new simulation</button>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_260px]">
        <div>
          <div className="grid gap-4 lg:grid-cols-2">
            <Histogram title="Source population" subtitle="individual observations · right-skewed" bins={data.population} rgb="45, 212, 191" />
            <Histogram title="Sample means" subtitle={`600 means · sample size n = ${sampleSize}`} bins={data.means} rgb="129, 140, 248" />
          </div>

          <div className="mt-5">
            <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">Observations per sample</span><strong className="font-mono text-[11px] text-indigo-100/76">n = {sampleSize}</strong></div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {SAMPLE_SIZES.map((value) => (
                <button key={value} type="button" onClick={() => setSampleSize(value)} className="min-w-10 rounded-full border px-3 py-1.5 font-mono text-[9px] transition" style={{ color: value === sampleSize ? "rgb(199 210 254)" : "rgb(100 116 139)", borderColor: value === sampleSize ? "rgba(129,140,248,0.30)" : "rgba(255,255,255,0.07)", background: value === sampleSize ? "rgba(129,140,248,0.08)" : "rgba(255,255,255,0.012)" }}>{value}</button>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">What changes?</div>
          <Metric label="Mean of sample means" value={data.mean.toFixed(3)} note="stays near the population mean 1" />
          <Metric label="Observed standard error" value={data.standardError.toFixed(3)} note={`theory ≈ 1 / √${sampleSize} = ${(1 / Math.sqrt(sampleSize)).toFixed(3)}`} />
          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <strong className="text-[11px] text-indigo-100/72">Central Limit Theorem</strong>
            <p className="mt-2 text-[10px] leading-5 text-slate-600">Under suitable conditions, sums or averages of many independent or weakly dependent observations with finite variance approach a normal distribution after standardization. The required sample size depends on the source distribution.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Histogram({ title, subtitle, bins, rgb }: { title: string; subtitle: string; bins: readonly number[]; rgb: string }) {
  const max = Math.max(1, ...bins);
  return (
    <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
      <div><strong className="text-[11px] text-white/80">{title}</strong><span className="mt-0.5 block font-mono text-[8px] uppercase tracking-[0.08em] text-slate-700">{subtitle}</span></div>
      <div className="mt-4 flex h-36 items-end gap-[2px] border-b border-l border-white/[0.08] px-1 pb-0.5">
        {bins.map((count, index) => <div key={index} className="min-w-0 flex-1 rounded-t-[2px] transition-[height] duration-300" style={{ height: `${Math.max(2, (count / max) * 100)}%`, background: `rgba(${rgb},0.62)` }} />)}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[7px] text-slate-700"><span>0</span><span>value / mean</span><span>{MAX_X}</span></div>
    </div>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="mt-4 border-b border-white/[0.055] pb-3 last:border-b-0"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[17px] text-indigo-100/80">{value}</strong><span className="mt-1 block text-[9px] leading-4 text-slate-600">{note}</span></div>
  );
}
