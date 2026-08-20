"use client";

import { useState } from "react";
import { Atom, CalendarClock } from "lucide-react";
import { M } from "@/app/_components/Math";

const HALF_LIFE_YEARS = 5730;

export default function CarbonDater() {
  const [years, setYears] = useState(HALF_LIFE_YEARS);
  const remainingFraction = Math.pow(0.5, years / HALF_LIFE_YEARS);
  const remainingPercent = remainingFraction * 100;
  const elapsedHalfLives = years / HALF_LIFE_YEARS;

  return (
    <section className="relative overflow-hidden rounded-[22px] border border-amber-200/20 bg-[#17120e]/88 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-amber-400/[0.06] blur-3xl" />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.17em] text-amber-300/75">
            <Atom size={15} /> Radiocarbon model
          </div>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-stone-100">How much carbon-14 remains?</h3>
          <p className="mt-2 max-w-xl text-[13px] leading-5 text-stone-400">
            After a once-living organism stops exchanging carbon with its environment, radioactive carbon-14 decays. This toy model isolates that decay law; real archaeological dating also depends on sample selection, measurement uncertainty, contamination checks, and calibration.
          </p>
        </div>
        <CalendarClock size={20} className="mt-1 shrink-0 text-amber-300/45" />
      </div>

      <div className="relative mt-5 rounded-2xl border border-stone-100/[0.07] bg-black/25 p-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">Elapsed time</div>
            <div className="mt-1 font-mono text-2xl font-bold text-amber-300">{years.toLocaleString()} yr</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-500">C-14 remaining</div>
            <div className="mt-1 font-mono text-2xl font-bold text-stone-100">{remainingPercent.toFixed(1)}%</div>
          </div>
        </div>

        <div className="mt-4 h-4 overflow-hidden rounded-full border border-white/[0.06] bg-stone-900">
          <div
            className="h-full bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-300 transition-[width] duration-300"
            style={{ width: `${remainingPercent}%` }}
          />
        </div>

        <div className="mt-5">
          <label htmlFor="radiocarbon-age" className="flex items-center justify-between gap-4 text-[11px] font-medium text-stone-400">
            <span>Move the sample through modeled time</span>
            <span className="font-mono text-amber-300/75">{elapsedHalfLives.toFixed(2)} half-lives</span>
          </label>
          <input
            id="radiocarbon-age"
            type="range"
            min="0"
            max="50000"
            step="100"
            value={years}
            onChange={(event) => setYears(Number(event.target.value))}
            className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-stone-800 accent-amber-500"
          />
          <div className="mt-2 flex justify-between font-mono text-[10px] text-stone-600">
            <span>present</span>
            <span>5,730 yr</span>
            <span>50,000 yr</span>
          </div>
        </div>
      </div>

      <div className="relative mt-4 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
        <div className="rounded-xl border border-white/[0.055] bg-white/[0.018] px-3 py-2.5 text-[11px] leading-5 text-stone-500">
          The graph shows the fraction of the original carbon-14 population still present. It does <strong className="font-semibold text-stone-300">not</strong> treat the complementary fraction as a measured nitrogen-14 clock.
        </div>
        <div className="rounded-xl border border-amber-200/[0.11] bg-amber-300/[0.035] px-4 py-2.5 text-center text-[12px] text-stone-300">
          <M>{"N(t)=N_0\\left(\\frac12\\right)^{t/5730}"}</M>
        </div>
      </div>
    </section>
  );
}
