"use client";

import { useMemo, useState } from "react";
import { Asterisk, Fingerprint } from "lucide-react";

function primeFactors(value: number) {
  const factors: number[] = [];
  let remaining = value;
  let divisor = 2;
  while (divisor * divisor <= remaining) {
    while (remaining % divisor === 0) {
      factors.push(divisor);
      remaining /= divisor;
    }
    divisor = divisor === 2 ? 3 : divisor + 2;
  }
  if (remaining > 1) factors.push(remaining);
  return factors;
}

function groupFactors(factors: readonly number[]) {
  const counts = new Map<number, number>();
  for (const factor of factors) counts.set(factor, (counts.get(factor) ?? 0) + 1);
  return [...counts.entries()];
}

function divisorCount(groups: readonly [number, number][]) {
  return groups.reduce((product, [, exponent]) => product * (exponent + 1), 1);
}

function eulerPhi(value: number, groups: readonly [number, number][]) {
  let result = value;
  for (const [prime] of groups) result = (result / prime) * (prime - 1);
  return result;
}

export default function PrimeLab() {
  const [inputValue, setInputValue] = useState("2026");
  const numberValue = Number(inputValue);
  const valid = Number.isInteger(numberValue) && numberValue >= 2 && numberValue <= 999999;

  const analysis = useMemo(() => {
    if (!valid) return null;
    const factors = primeFactors(numberValue);
    const groups = groupFactors(factors);
    return {
      factors,
      groups,
      prime: factors.length === 1 && factors[0] === numberValue,
      divisorCount: divisorCount(groups),
      phi: eulerPhi(numberValue, groups),
    };
  }, [numberValue, valid]);

  return (
    <section className="overflow-hidden rounded-[28px] border border-violet-200/[0.10] bg-[#090713]/76 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/66"><Fingerprint size={13} /> Integer factorization lab</div>
          <p className="mt-1 text-[10px] text-slate-600">Factor a positive integer into primes and derive a few arithmetic quantities from the factorization.</p>
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">2 ≤ n ≤ 999,999</span>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
          <label className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600" htmlFor="factor-target">Target integer n</label>
          <input
            id="factor-target"
            type="number"
            min="2"
            max="999999"
            step="1"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            className="mt-2 w-full rounded-[14px] border border-white/[0.08] bg-black/[0.24] px-3 py-3 font-mono text-[24px] text-white outline-none transition focus:border-violet-300/30"
          />
          <div className="mt-4 rounded-[14px] border border-white/[0.055] bg-white/[0.012] p-3 text-[9px] leading-4 text-slate-700">
            The Fundamental Theorem of Arithmetic says every integer greater than 1 has a prime factorization that is unique up to the order of the prime factors.
          </div>
        </div>

        <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4 sm:p-5">
          {!analysis ? (
            <div className="flex min-h-[190px] items-center justify-center text-center font-mono text-[9px] uppercase tracking-[0.1em] text-slate-700">Enter an integer from 2 through 999,999</div>
          ) : (
            <>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div><div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">Prime decomposition</div><div className="mt-2 font-mono text-[12px] text-slate-500">{numberValue} =</div></div>
                <span className="rounded-full border px-3 py-1 font-mono text-[8px] uppercase tracking-[0.1em]" style={{ color: analysis.prime ? "rgba(110,231,183,0.80)" : "rgba(196,181,253,0.74)", borderColor: analysis.prime ? "rgba(52,211,153,0.18)" : "rgba(167,139,250,0.18)", background: analysis.prime ? "rgba(52,211,153,0.04)" : "rgba(167,139,250,0.04)" }}>{analysis.prime ? "prime" : "composite"}</span>
              </div>

              <div className="mt-4 flex min-h-[64px] flex-wrap items-center gap-2">
                {analysis.groups.map(([prime, exponent], index) => (
                  <div key={prime} className="flex items-center gap-2">
                    <span className="flex min-w-[52px] items-center justify-center rounded-[13px] border border-violet-300/[0.18] bg-violet-300/[0.045] px-3 py-2 font-mono text-[17px] text-violet-100/80">{prime}{exponent > 1 ? <sup className="ml-0.5 text-[9px]">{exponent}</sup> : null}</span>
                    {index < analysis.groups.length - 1 ? <span className="font-mono text-[12px] text-slate-700">×</span> : null}
                  </div>
                ))}
              </div>

              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <Metric label="prime factors counted" value={String(analysis.factors.length)} note="with multiplicity" rgb="167, 139, 250" />
                <Metric label="positive divisors" value={String(analysis.divisorCount)} note="τ(n)" rgb="45, 212, 191" />
                <Metric label="coprime residues" value={String(analysis.phi)} note="Euler φ(n)" rgb="250, 204, 21" />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[14px] border px-3 py-3" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.022)` }}><div className="font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[15px]" style={{ color: `rgba(${rgb},0.80)` }}>{value}</strong><span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.08em] text-slate-800">{note}</span></div>;
}
