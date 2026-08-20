"use client";

import { useMemo, useState } from "react";
import { Radio, RotateCcw } from "lucide-react";

type FactorKey = "r" | "fp" | "ne" | "fl" | "fi" | "fc" | "l";

type Factor = {
  key: FactorKey;
  symbol: string;
  label: string;
  evidence: "better constrained" | "model dependent" | "poorly known";
  values: readonly number[];
  format: (value: number) => string;
};

const FACTORS: readonly Factor[] = [
  { key: "r", symbol: "R*", label: "star formation rate", evidence: "better constrained", values: [1, 2, 4], format: (v) => `${v}/yr` },
  { key: "fp", symbol: "fₚ", label: "fraction of stars with planets", evidence: "better constrained", values: [0.5, 0.8, 1], format: (v) => v.toFixed(1) },
  { key: "ne", symbol: "nₑ", label: "potentially suitable worlds per planetary system", evidence: "model dependent", values: [0.05, 0.2, 0.8], format: (v) => v.toFixed(2) },
  { key: "fl", symbol: "fₗ", label: "fraction where life arises", evidence: "poorly known", values: [0.001, 0.1, 1], format: formatFraction },
  { key: "fi", symbol: "fᵢ", label: "fraction producing technological intelligence", evidence: "poorly known", values: [0.001, 0.05, 0.5], format: formatFraction },
  { key: "fc", symbol: "f𝚌", label: "fraction producing detectable signals", evidence: "poorly known", values: [0.01, 0.1, 1], format: formatFraction },
  { key: "l", symbol: "L", label: "duration of detectability", evidence: "poorly known", values: [100, 10000, 1000000], format: (v) => `${v.toLocaleString()} yr` },
] as const;

const DEFAULTS: Record<FactorKey, number> = { r: 1, fp: 1, ne: 1, fl: 1, fi: 1, fc: 1, l: 1 };

export default function DrakeWidget() {
  const [levels, setLevels] = useState<Record<FactorKey, number>>(DEFAULTS);

  const product = useMemo(() => FACTORS.reduce((value, factor) => value * factor.values[levels[factor.key]], 1), [levels]);
  const unknownContribution = FACTORS.filter((factor) => factor.evidence === "poorly known").map((factor) => factor.values[levels[factor.key]]).reduce((a, b) => a * b, 1);

  function setLevel(key: FactorKey, value: number) {
    setLevels((current) => ({ ...current, [key]: value }));
  }

  return (
    <section className="overflow-hidden rounded-[24px] border border-lime-100/[0.10] bg-[#07110b]/68 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-lime-200/68"><Radio size={13} /> Drake equation sensitivity lab</div>
          <h3 className="mt-2 text-[21px] font-semibold tracking-[-0.035em] text-white">The equation organizes ignorance; it does not erase it.</h3>
        </div>
        <button type="button" onClick={() => setLevels(DEFAULTS)} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 hover:text-white"><RotateCcw size={11} /> reset</button>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[minmax(0,1fr)_300px] sm:p-5">
        <div className="space-y-2">
          {FACTORS.map((factor) => <FactorControl key={factor.key} factor={factor} level={levels[factor.key]} onChange={(level) => setLevel(factor.key, level)} />)}
        </div>

        <aside className="rounded-[20px] border border-white/[0.07] bg-black/[0.16] p-4 xl:sticky xl:top-[172px] xl:self-start">
          <div className="font-mono text-[9px] uppercase tracking-[0.07em] text-slate-500">Implied N under these assumptions</div>
          <div className="mt-2 break-words text-[40px] font-semibold leading-none text-lime-200">{formatProduct(product)}</div>
          <p className="mt-3 text-[12px] leading-5 text-slate-400">This is the product of the selected assumptions, not an estimate with a confidence interval. Several factors remain poorly constrained by observation.</p>

          <div className="mt-5 border-t border-white/[0.06] pt-4">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Unknown-factor multiplier</div>
            <strong className="mt-1 block text-[18px] text-amber-200/82">{formatProduct(unknownContribution)}</strong>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">The life, intelligence, detectability, and longevity assumptions alone can move the output by many orders of magnitude. That sensitivity is the lesson.</p>
          </div>

          <div className="mt-4 border-l-2 border-lime-300/30 pl-3">
            <strong className="text-[11px] text-lime-100/78">Read the equation as a decomposition</strong>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">It asks which stages must occur between star formation and a detectable technological population. Each factor becomes its own empirical question.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function FactorControl({ factor, level, onChange }: { factor: Factor; level: number; onChange: (level: number) => void }) {
  const value = factor.values[level];
  const evidenceClass = factor.evidence === "better constrained" ? "text-cyan-300" : factor.evidence === "model dependent" ? "text-amber-300" : "text-rose-300";
  return (
    <div className="grid gap-3 rounded-[16px] border border-white/[0.06] bg-black/[0.10] p-3 sm:grid-cols-[58px_minmax(0,1fr)_180px] sm:items-center">
      <div><strong className="font-mono text-[15px] text-lime-100/80">{factor.symbol}</strong></div>
      <div><div className="text-[12px] font-semibold text-white/82">{factor.label}</div><span className={`mt-1 block font-mono text-[9px] uppercase tracking-[0.05em] ${evidenceClass}`}>{factor.evidence}</span></div>
      <div>
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] text-slate-500"><span>low</span><strong className="text-lime-100/74">{factor.format(value)}</strong><span>high</span></div>
        <input type="range" min={0} max={2} step={1} value={level} onChange={(event) => onChange(Number(event.target.value))} className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-lime-400" aria-label={`${factor.label} assumption`} />
      </div>
    </div>
  );
}

function formatFraction(value: number) {
  if (value >= 0.1) return value.toFixed(1);
  return value.toFixed(3);
}

function formatProduct(value: number) {
  if (value === 0) return "0";
  if (value >= 1000 || value < 0.01) return value.toExponential(2);
  if (value >= 10) return value.toFixed(1);
  return value.toFixed(3);
}
