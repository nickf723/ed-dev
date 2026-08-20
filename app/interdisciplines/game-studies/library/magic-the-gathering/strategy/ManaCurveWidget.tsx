"use client";

import { useMemo, useState } from "react";
import { BarChart3, Minus, Plus, RotateCcw } from "lucide-react";

const BUCKETS = [1, 2, 3, 4, 5, 6, 7] as const;
const DEFAULT_CURVE = [4, 8, 9, 6, 3, 2, 1];

export default function ManaCurveWidget() {
  const [curve, setCurve] = useState(DEFAULT_CURVE);

  const total = curve.reduce((sum, count) => sum + count, 0);
  const displayedMean = useMemo(() => total ? curve.reduce((sum, count, index) => sum + count * BUCKETS[index], 0) / total : 0, [curve, total]);
  const peakIndex = curve.reduce((best, count, index) => count > curve[best] ? index : best, 0);

  function adjust(index: number, delta: number) {
    setCurve((current) => current.map((count, i) => i === index ? Math.max(0, count + delta) : count));
  }

  return (
    <section className="overflow-hidden rounded-[22px] border border-cyan-100/[0.10] bg-[#071015]/72 backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-cyan-200/68"><BarChart3 size={13} /> Mana-value distribution</div>
          <h3 className="mt-2 text-[20px] font-semibold tracking-[-0.035em] text-white">A curve describes where the nonland costs are concentrated.</h3>
        </div>
        <button type="button" onClick={() => setCurve(DEFAULT_CURVE)} className="inline-flex items-center gap-2 rounded-full border border-white/[0.07] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.06em] text-slate-400 hover:text-white"><RotateCcw size={11} /> reset</button>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[minmax(0,1fr)_290px] sm:p-5">
        <div>
          <div className="flex h-[230px] items-end gap-2 rounded-[18px] border border-white/[0.07] bg-black/[0.16] p-4">
            {curve.map((count, index) => {
              const max = Math.max(1, ...curve);
              const height = (count / max) * 150;
              return (
                <div key={index} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                  <span className="font-mono text-[10px] text-cyan-100/72">{count}</span>
                  <div className="w-full rounded-t-[7px] border-x border-t border-cyan-300/30 bg-cyan-400/18 transition-[height] duration-200" style={{ height }} />
                  <span className="font-mono text-[10px] text-slate-500">{index === BUCKETS.length - 1 ? "7+" : BUCKETS[index]}</span>
                  <div className="grid w-full grid-cols-2 gap-1">
                    <button type="button" onClick={() => adjust(index, -1)} disabled={count === 0} className="flex h-7 items-center justify-center rounded-[7px] border border-white/[0.06] text-slate-500 disabled:opacity-25"><Minus size={11} /></button>
                    <button type="button" onClick={() => adjust(index, 1)} className="flex h-7 items-center justify-center rounded-[7px] border border-white/[0.06] text-slate-500"><Plus size={11} /></button>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-slate-500">Buckets represent mana value 1 through 6, with the last bucket grouping 7 and above. Lands and cards with special casting patterns are not represented by this simple histogram.</p>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="grid grid-cols-2 gap-2">
            <Readout label="nonland cards shown" value={String(total)} />
            <Readout label="largest bucket" value={peakIndex === BUCKETS.length - 1 ? "7+" : String(BUCKETS[peakIndex])} />
          </div>
          <div className="mt-2 rounded-[15px] border border-white/[0.07] bg-black/[0.12] p-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.06em] text-slate-500">Displayed-bucket mean</div>
            <strong className="mt-1 block text-[20px] text-cyan-100/82">{displayedMean.toFixed(2)}</strong>
            <p className="mt-2 text-[10px] leading-5 text-slate-500">The 7+ bucket is treated as 7 for this readout, so this is a teaching summary of the displayed histogram, not the exact average mana value of a deck.</p>
          </div>
          <div className="mt-4 border-l-2 border-cyan-300/28 pl-3">
            <strong className="text-[11px] text-cyan-100/80">A curve is not a deck verdict</strong>
            <p className="mt-1 text-[11px] leading-5 text-slate-500">Desired curve shape depends on game plan, format, lands, ramp, alternate costs, card selection, interaction, and how quickly the deck needs particular effects. A lower curve is not universally better.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[14px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[8px] uppercase tracking-[0.05em] text-slate-500">{label}</div><strong className="mt-1 block text-[13px] text-white/78">{value}</strong></div>;
}
