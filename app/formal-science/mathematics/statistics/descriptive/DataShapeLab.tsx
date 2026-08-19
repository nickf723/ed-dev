"use client";

import { useMemo, useState } from "react";
import { BarChart3, RotateCcw } from "lucide-react";

type PresetId = "symmetric" | "skewed" | "outlier" | "bimodal";

const PRESETS: Record<PresetId, { label: string; values: number[]; note: string }> = {
  symmetric: {
    label: "Roughly symmetric",
    values: [3, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11],
    note: "Mean and median sit close together because the distribution is balanced around its center.",
  },
  skewed: {
    label: "Right-skewed",
    values: [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 7, 9, 13, 19],
    note: "A long upper tail pulls the mean farther right than the median.",
  },
  outlier: {
    label: "One high outlier",
    values: [4, 5, 5, 6, 6, 6, 7, 7, 7, 8, 8, 9, 9, 10, 35],
    note: "One extreme observation changes the mean, range, and standard deviation much more than the median or IQR.",
  },
  bimodal: {
    label: "Two clusters",
    values: [2, 3, 3, 4, 4, 5, 5, 11, 12, 12, 13, 13, 14, 14, 15, 15],
    note: "A single center can hide structure. Shape and clustering matter before any summary statistic is interpreted.",
  },
};

function sorted(values: readonly number[]) {
  return [...values].sort((a, b) => a - b);
}

function quantile(values: readonly number[], proportion: number) {
  const data = sorted(values);
  if (data.length === 0) return 0;
  const position = (data.length - 1) * proportion;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  const weight = position - lower;
  return data[lower] * (1 - weight) + data[upper] * weight;
}

function summarize(values: readonly number[]) {
  const n = values.length;
  const mean = values.reduce((sum, value) => sum + value, 0) / n;
  const variance = values.reduce((sum, value) => sum + (value - mean) ** 2, 0) / (n - 1);
  const q1 = quantile(values, 0.25);
  const median = quantile(values, 0.5);
  const q3 = quantile(values, 0.75);
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { n, mean, sd: Math.sqrt(variance), q1, median, q3, iqr: q3 - q1, min, max, range: max - min };
}

function histogram(values: readonly number[], binCount = 12) {
  const min = Math.floor(Math.min(...values));
  const max = Math.ceil(Math.max(...values));
  const span = Math.max(1, max - min);
  const bins = Array.from({ length: binCount }, () => 0);
  for (const value of values) {
    const normalized = Math.min(0.999999, Math.max(0, (value - min) / span));
    bins[Math.floor(normalized * binCount)] += 1;
  }
  return { bins, min, max };
}

export default function DataShapeLab() {
  const [presetId, setPresetId] = useState<PresetId>("symmetric");
  const [values, setValues] = useState<number[]>(PRESETS.symmetric.values);
  const summary = useMemo(() => summarize(values), [values]);
  const chart = useMemo(() => histogram(values), [values]);

  const loadPreset = (id: PresetId) => {
    setPresetId(id);
    setValues([...PRESETS[id].values]);
  };

  const nudgeMaximum = () => {
    const data = [...values];
    const maxIndex = data.reduce((best, value, index) => (value > data[best] ? index : best), 0);
    data[maxIndex] += 5;
    setValues(data);
  };

  return (
    <section className="overflow-hidden rounded-[30px] border border-teal-200/[0.10] bg-[#051416]/72 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-teal-200/66"><BarChart3 size={13} /> Distribution-shape lab</div>
          <p className="mt-1 text-[10px] text-slate-600">Change the shape of the data and watch which summaries move with it.</p>
        </div>
        <button type="button" onClick={() => loadPreset(presetId)} className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"><RotateCcw size={11} /> reset preset</button>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(PRESETS) as PresetId[]).map((id) => {
              const active = id === presetId;
              return <button key={id} type="button" onClick={() => loadPreset(id)} className="rounded-full border px-3 py-1.5 font-mono text-[8px] transition" style={{ color: active ? "rgb(153 246 228)" : "rgb(100 116 139)", borderColor: active ? "rgba(45,212,191,0.28)" : "rgba(255,255,255,0.07)", background: active ? "rgba(45,212,191,0.07)" : "rgba(255,255,255,0.012)" }}>{PRESETS[id].label}</button>;
            })}
          </div>

          <div className="mt-4 rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
            <div className="flex h-52 items-end gap-[3px] border-b border-l border-white/[0.08] px-2 pb-1">
              {chart.bins.map((count, index) => {
                const maxBin = Math.max(1, ...chart.bins);
                return <div key={index} className="min-w-0 flex-1 rounded-t-sm bg-teal-300/60 transition-[height] duration-300" style={{ height: `${Math.max(2, (count / maxBin) * 100)}%` }} />;
              })}
            </div>
            <div className="mt-2 flex justify-between font-mono text-[7px] text-slate-700"><span>{chart.min}</span><span>observed value</span><span>{chart.max}</span></div>
            <p className="mt-3 text-[10px] leading-5 text-slate-600">{PRESETS[presetId].note}</p>
          </div>

          <button type="button" onClick={nudgeMaximum} className="mt-3 rounded-[14px] border border-amber-200/[0.11] bg-amber-200/[0.025] px-3 py-2 font-mono text-[8px] uppercase tracking-[0.09em] text-amber-100/58 transition hover:bg-amber-200/[0.05]">push the largest observation +5</button>
        </div>

        <aside className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">Summary dashboard</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Metric label="Mean" value={summary.mean.toFixed(2)} tone="sensitive" />
            <Metric label="Median" value={summary.median.toFixed(2)} tone="resistant" />
            <Metric label="Std. dev." value={summary.sd.toFixed(2)} tone="sensitive" />
            <Metric label="IQR" value={summary.iqr.toFixed(2)} tone="resistant" />
            <Metric label="Range" value={summary.range.toFixed(2)} tone="sensitive" />
            <Metric label="n" value={String(summary.n)} tone="neutral" />
          </div>
          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">Five-number landmarks</div>
            <div className="mt-3 grid grid-cols-5 gap-1 text-center font-mono text-[8px] text-slate-500"><span>{summary.min.toFixed(1)}</span><span>{summary.q1.toFixed(1)}</span><span>{summary.median.toFixed(1)}</span><span>{summary.q3.toFixed(1)}</span><span>{summary.max.toFixed(1)}</span></div>
            <div className="mt-1 grid grid-cols-5 gap-1 text-center font-mono text-[6px] uppercase text-slate-800"><span>min</span><span>q1</span><span>med</span><span>q3</span><span>max</span></div>
          </div>
          <p className="mt-5 border-t border-white/[0.06] pt-4 text-[9px] leading-4 text-slate-700">There is no universally best summary. The distribution’s shape and the question being asked determine which descriptions preserve the information you care about.</p>
        </aside>
      </div>
    </section>
  );
}

function Metric({ label, value, tone }: { label: string; value: string; tone: "sensitive" | "resistant" | "neutral" }) {
  const rgb = tone === "sensitive" ? "251, 146, 60" : tone === "resistant" ? "45, 212, 191" : "148, 163, 184";
  return <div className="rounded-[14px] border px-3 py-3" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.022)` }}><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[15px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</strong><span className="mt-1 block font-mono text-[6px] uppercase tracking-[0.07em] text-slate-800">{tone}</span></div>;
}
