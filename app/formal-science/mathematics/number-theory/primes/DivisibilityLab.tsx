"use client";

import { useMemo, useState } from "react";
import { Asterisk, Divide, Grid3X3 } from "lucide-react";

function sieve(limit: number) {
  const prime = new Array<boolean>(limit + 1).fill(true);
  prime[0] = false;
  prime[1] = false;
  for (let value = 2; value * value <= limit; value += 1) {
    if (!prime[value]) continue;
    for (let multiple = value * value; multiple <= limit; multiple += value) prime[multiple] = false;
  }
  return prime;
}

function euclideanSteps(a: number, b: number) {
  const steps: { dividend: number; divisor: number; quotient: number; remainder: number }[] = [];
  let dividend = Math.abs(Math.trunc(a));
  let divisor = Math.abs(Math.trunc(b));
  if (divisor > dividend) [dividend, divisor] = [divisor, dividend];
  while (divisor !== 0) {
    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    steps.push({ dividend, divisor, quotient, remainder });
    dividend = divisor;
    divisor = remainder;
  }
  return { gcd: dividend, steps };
}

export default function DivisibilityLab() {
  const [limit, setLimit] = useState(120);
  const [selectedPrime, setSelectedPrime] = useState(5);
  const [left, setLeft] = useState(252);
  const [right, setRight] = useState(198);

  const primeMask = useMemo(() => sieve(limit), [limit]);
  const primes = useMemo(() => primeMask.flatMap((isPrime, value) => (isPrime ? [value] : [])), [primeMask]);
  const euclid = useMemo(() => euclideanSteps(left, right), [left, right]);
  const largestPrime = primes.at(-1) ?? 2;

  return (
    <section className="grid gap-5 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]">
      <div className="overflow-hidden rounded-[28px] border border-emerald-200/[0.10] bg-[#07130f]/74 backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
          <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-200/66"><Grid3X3 size={13} /> Sieve of Eratosthenes</div><p className="mt-1 text-[10px] text-slate-600">Prime numbers survive repeated elimination by smaller prime divisors.</p></div>
          <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">π({limit}) = {primes.length}</span>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">Upper bound</span><strong className="font-mono text-[11px] text-emerald-100/74">{limit}</strong></div>
          <input aria-label="Sieve upper bound" type="range" min="30" max="200" step="10" value={limit} onChange={(event) => setLimit(Number(event.target.value))} className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-emerald-400" />

          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(34px,1fr))] gap-1.5">
            {Array.from({ length: limit - 1 }, (_, index) => index + 2).map((value) => {
              const isPrime = primeMask[value];
              const multipleOfSelected = value !== selectedPrime && value % selectedPrime === 0;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => isPrime && setSelectedPrime(value)}
                  disabled={!isPrime}
                  className="relative aspect-square min-h-[32px] rounded-[9px] border font-mono text-[8px] transition"
                  style={{
                    color: isPrime ? (value === selectedPrime ? "rgb(236 253 245)" : "rgba(110,231,183,0.72)") : multipleOfSelected ? "rgba(251,146,60,0.62)" : "rgba(100,116,139,0.28)",
                    borderColor: value === selectedPrime ? "rgba(52,211,153,0.42)" : multipleOfSelected ? "rgba(251,146,60,0.14)" : isPrime ? "rgba(52,211,153,0.12)" : "rgba(255,255,255,0.035)",
                    background: value === selectedPrime ? "rgba(52,211,153,0.14)" : multipleOfSelected ? "rgba(251,146,60,0.035)" : isPrime ? "rgba(52,211,153,0.025)" : "rgba(255,255,255,0.008)",
                  }}
                >
                  {value}
                </button>
              );
            })}
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Metric label="selected prime" value={String(selectedPrime)} note="click any prime" rgb="52, 211, 153" />
            <Metric label="largest ≤ N" value={String(largestPrime)} note="largest surviving integer" rgb="167, 139, 250" />
            <Metric label="prime density" value={`${((primes.length / (limit - 1)) * 100).toFixed(1)}%`} note="among 2 through N" rgb="250, 204, 21" />
          </div>
          <p className="mt-4 text-[9px] leading-4 text-slate-700">Orange cells are multiples of the selected prime. The sieve only needs prime divisors up to √N to determine primality through N, because any composite N has a factor no larger than √N.</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-[28px] border border-violet-200/[0.10] bg-[#0d0817]/74 backdrop-blur-xl">
        <div className="border-b border-white/[0.07] px-4 py-4 sm:px-5"><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/66"><Divide size={13} /> Euclidean algorithm</div><p className="mt-1 text-[10px] text-slate-600">Repeated remainders expose the greatest common divisor without factoring either number first.</p></div>
        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-2 gap-2">
            <NumberInput label="a" value={left} onChange={setLeft} />
            <NumberInput label="b" value={right} onChange={setRight} />
          </div>

          <div className="mt-4 rounded-[18px] border border-white/[0.07] bg-black/[0.13] p-4">
            <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">gcd(a,b)</span><strong className="font-mono text-[22px] text-violet-100/80">{euclid.gcd}</strong></div>
            <div className="mt-4 space-y-2">
              {euclid.steps.map((step, index) => <div key={`${step.dividend}-${step.divisor}`} className="grid grid-cols-[22px_minmax(0,1fr)] gap-2 border-b border-white/[0.045] pb-2 last:border-b-0"><span className="font-mono text-[7px] text-slate-800">0{index + 1}</span><span className="font-mono text-[10px] text-slate-500">{step.dividend} = {step.quotient} × {step.divisor} + <strong className="text-violet-100/70">{step.remainder}</strong></span></div>)}
            </div>
          </div>

          <div className="mt-4 rounded-[15px] border border-amber-200/[0.10] bg-amber-200/[0.025] p-3"><div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-amber-200/54"><Asterisk size={11} /> Bézout connection</div><p className="mt-2 text-[9px] leading-4 text-slate-600">The gcd is the smallest positive integer expressible as ax + by for some integers x and y. Therefore ax + by = c is solvable in integers exactly when gcd(a,b) divides c.</p></div>
        </div>
      </div>
    </section>
  );
}

function NumberInput({ label, value, onChange }: { label: string; value: number; onChange: (value: number) => void }) {
  return <label className="rounded-[14px] border border-white/[0.07] bg-black/[0.12] p-3"><span className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</span><input type="number" min="1" max="999999" step="1" value={value} onChange={(event) => onChange(Math.max(1, Math.min(999999, Number(event.target.value) || 1)))} className="mt-1 w-full bg-transparent font-mono text-[16px] text-white/80 outline-none" /></label>;
}

function Metric({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[14px] border px-3 py-3" style={{ borderColor: `rgba(${rgb},0.12)`, background: `rgba(${rgb},0.022)` }}><div className="font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[14px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</strong><span className="mt-1 block text-[7px] leading-3 text-slate-800">{note}</span></div>;
}
