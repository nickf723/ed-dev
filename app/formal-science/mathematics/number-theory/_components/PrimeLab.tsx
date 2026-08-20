"use client";

import { useMemo, useState } from "react";
import { Asterisk, CheckCircle2, RotateCcw } from "lucide-react";

type FactorGroup = { prime: number; exponent: number };

const PRESETS = [60, 97, 2026, 65536] as const;

function primeFactors(value: number): number[] {
  const factors: number[] = [];
  let remainder = value;

  for (let divisor = 2; divisor * divisor <= remainder; divisor += 1) {
    while (remainder % divisor === 0) {
      factors.push(divisor);
      remainder /= divisor;
    }
  }

  if (remainder > 1) factors.push(remainder);
  return factors;
}

function groupFactors(factors: readonly number[]): FactorGroup[] {
  return factors.reduce<FactorGroup[]>((groups, prime) => {
    const last = groups.at(-1);
    if (last?.prime === prime) last.exponent += 1;
    else groups.push({ prime, exponent: 1 });
    return groups;
  }, []);
}

export default function PrimeLab() {
  const [inputValue, setInputValue] = useState("2026");
  const parsed = Number(inputValue);
  const valid = Number.isInteger(parsed) && parsed >= 2 && parsed <= 999_999;
  const groups = useMemo(() => valid ? groupFactors(primeFactors(parsed)) : [], [parsed, valid]);
  const prime = valid && groups.length === 1 && groups[0]?.prime === parsed && groups[0]?.exponent === 1;
  const divisorCount = valid ? groups.reduce((count, group) => count * (group.exponent + 1), 1) : 0;

  return (
    <div className="overflow-hidden rounded-[30px] border border-emerald-200/[0.12] bg-black/[0.17] shadow-[0_28px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl">
      <div className="grid gap-5 border-b border-white/[0.07] p-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end sm:p-6">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-200/62"><Asterisk size={14} /> Prime factorization workbench</div>
          <label htmlFor="factor-target" className="mt-3 block text-[13px] font-semibold text-zinc-200">Integer from 2 through 999,999</label>
          <input
            id="factor-target"
            type="number"
            inputMode="numeric"
            min={2}
            max={999999}
            step={1}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="mt-2 w-full max-w-xl rounded-[16px] border border-white/[0.11] bg-black/35 px-4 py-3 font-mono text-[clamp(1.8rem,4vw,3.1rem)] tracking-[-0.05em] text-white outline-none transition focus:border-emerald-300/45 focus:ring-2 focus:ring-emerald-300/10"
            aria-describedby="factor-help"
          />
          <p id="factor-help" className="mt-2 text-[11px] leading-5 text-zinc-600">Whole numbers only. The factorization is calculated locally in your browser.</p>
        </div>
        <div className="flex flex-wrap gap-2" aria-label="Curated integers">
          {PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setInputValue(String(preset))}
              className={`rounded-full border px-3 py-2 font-mono text-[12px] transition ${parsed === preset ? "border-emerald-300/38 bg-emerald-300/[0.09] text-emerald-100" : "border-white/[0.09] bg-white/[0.025] text-zinc-500 hover:border-white/[0.18] hover:text-zinc-300"}`}
            >
              {preset.toLocaleString()}
            </button>
          ))}
          <button type="button" onClick={() => setInputValue("2026")} className="flex items-center gap-2 rounded-full border border-white/[0.09] px-3 py-2 text-[12px] text-zinc-600 transition hover:text-zinc-300" aria-label="Reset to 2026"><RotateCcw size={13} /> reset</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_310px]">
        <div className="min-h-[310px] border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r sm:p-7" aria-live="polite">
          {!valid ? (
            <div className="flex min-h-[245px] items-center justify-center rounded-[22px] border border-dashed border-rose-300/20 bg-rose-300/[0.025] px-6 text-center text-[13px] leading-6 text-rose-100/62">
              Enter one whole number from 2 through 999,999.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <span className="font-mono text-[clamp(2.2rem,5vw,4.4rem)] font-semibold tracking-[-0.065em] text-white">{parsed.toLocaleString()}</span>
                <span className="text-[30px] text-zinc-700">=</span>
                <div className="flex flex-wrap items-center gap-3" aria-label={`${parsed} factors into ${groups.map((group) => `${group.prime} to the power ${group.exponent}`).join(" times ")}`}>
                  {groups.map((group, index) => (
                    <span key={group.prime} className="flex items-center gap-3">
                      <span className="rounded-[15px] border border-violet-300/22 bg-violet-300/[0.055] px-4 py-3 font-mono text-[25px] text-violet-100">
                        {group.prime}{group.exponent > 1 ? <sup className="ml-0.5 text-[13px] text-violet-200/68">{group.exponent}</sup> : null}
                      </span>
                      {index < groups.length - 1 ? <span className="text-[21px] text-zinc-700">×</span> : null}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 flex items-start gap-3 rounded-[18px] border border-emerald-300/14 bg-emerald-300/[0.035] p-4">
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
                <div>
                  <strong className="text-[14px] text-emerald-100">{prime ? "This integer is prime." : "This integer is composite."}</strong>
                  <p className="mt-1 text-[12px] leading-6 text-zinc-500">
                    {prime
                      ? `${parsed.toLocaleString()} has exactly two positive divisors: 1 and itself.`
                      : `Its prime powers determine all ${divisorCount.toLocaleString()} positive divisors.`}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>

        <aside className="p-5 sm:p-6">
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-200/54">What the decomposition reveals</div>
          <div className="mt-4 divide-y divide-white/[0.065] border-y border-white/[0.065]">
            <Readout label="Distinct prime bases" value={valid ? groups.length.toLocaleString() : "—"} />
            <Readout label="Prime factors with repetition" value={valid ? groups.reduce((sum, group) => sum + group.exponent, 0).toLocaleString() : "—"} />
            <Readout label="Positive divisor count" value={valid ? divisorCount.toLocaleString() : "—"} />
          </div>
          <p className="mt-5 text-[12px] leading-6 text-zinc-500">
            Reordering factors changes the written multiplication, not the prime-power signature. That invariance is what makes factorization useful throughout number theory.
          </p>
        </aside>
      </div>
    </div>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="flex items-center justify-between gap-4 py-4"><span className="text-[12px] text-zinc-500">{label}</span><strong className="font-mono text-[16px] text-zinc-200">{value}</strong></div>;
}
