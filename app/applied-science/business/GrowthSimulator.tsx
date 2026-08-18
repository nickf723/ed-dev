"use client";

import { useMemo, useState } from "react";
import { PieChart, RefreshCw, TrendingUp } from "lucide-react";

const PRESETS = {
  balanced: { label: "Balanced", market: 25, product: 25, operations: 30 },
  launch: { label: "Launch", market: 40, product: 25, operations: 25 },
  capability: { label: "Build capability", market: 15, product: 45, operations: 25 },
  resilience: { label: "Build resilience", market: 15, product: 20, operations: 30 },
} as const;

type Allocation = { market: number; product: number; operations: number };
type AllocationKey = keyof Allocation;

export default function GrowthSimulator() {
  const [allocation, setAllocation] = useState<Allocation>({ market: 25, product: 25, operations: 30 });
  const used = allocation.market + allocation.product + allocation.operations;
  const reserve = 100 - used;

  const metrics = useMemo(() => {
    const demand = clamp(15 + allocation.market * 1.35 + allocation.product * 0.22);
    const capability = clamp(18 + allocation.product * 1.28 + allocation.operations * 0.22);
    const delivery = clamp(22 + allocation.operations * 1.2 + reserve * 0.52);
    const adaptability = clamp(12 + allocation.product * 0.72 + reserve * 1.05);
    const bottleneck = Math.min(demand, capability, delivery, adaptability);
    return [
      { label: "Demand reach", value: demand, rgb: "244,114,182" },
      { label: "Offering capability", value: capability, rgb: "125,211,252" },
      { label: "Delivery reliability", value: delivery, rgb: "94,234,212" },
      { label: "Adaptability", value: adaptability, rgb: "192,132,252" },
      { label: "System bottleneck", value: bottleneck, rgb: "251,191,36" },
    ] as const;
  }, [allocation, reserve]);

  function change(key: AllocationKey, delta: number) {
    setAllocation((current) => {
      const currentUsed = current.market + current.product + current.operations;
      const available = 100 - currentUsed;
      const nextValue = delta > 0 ? Math.min(current[key] + delta, current[key] + available) : Math.max(0, current[key] + delta);
      return { ...current, [key]: nextValue };
    });
  }

  function applyPreset(key: keyof typeof PRESETS) {
    const preset = PRESETS[key];
    setAllocation({ market: preset.market, product: preset.product, operations: preset.operations });
  }

  return (
    <div className="overflow-hidden rounded-[28px] border border-emerald-200/[0.10] bg-[#07100c]/72 backdrop-blur-xl">
      <div className="grid border-b border-white/[0.06] lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-emerald-100/54"><PieChart size={13} /> Resource allocation lab</div>
          <h3 className="mt-2 text-[clamp(1.5rem,2.6vw,2.3rem)] font-semibold tracking-[-0.04em] text-white">A strategy is a set of tradeoffs under a finite resource constraint.</h3>
          <p className="mt-2 max-w-2xl text-[11px] leading-5 text-slate-500">Allocate 100 normalized units across market learning/demand, product capability, operations, and automatic reserve. The scores below are invented teaching formulas, not forecasts or empirical business laws.</p>
        </div>
        <div className="border-t border-white/[0.06] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.07em] text-slate-600">Unallocated reserve</span>
          <div className="mt-1 text-3xl font-semibold text-amber-200/80">{reserve}</div>
          <p className="mt-1 text-[10px] leading-4 text-slate-600">Reserve improves the toy model's adaptability and cushions delivery reliability, but reduces resources available elsewhere.</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 xl:grid-cols-[330px_minmax(0,1fr)] sm:p-5">
        <div>
          <div className="flex flex-wrap gap-1.5">
            {(Object.keys(PRESETS) as Array<keyof typeof PRESETS>).map((key) => <button key={key} type="button" onClick={() => applyPreset(key)} className="border border-white/[0.07] bg-black/[0.04] px-2.5 py-1.5 text-[10px] text-slate-400 transition hover:border-emerald-200/20 hover:text-slate-200">{PRESETS[key].label}</button>)}
            <button type="button" onClick={() => setAllocation({ market: 25, product: 25, operations: 30 })} className="ml-auto flex items-center gap-1 border border-white/[0.07] px-2 py-1.5 text-[10px] text-slate-600 hover:text-slate-400"><RefreshCw size={10} /> reset</button>
          </div>

          <div className="mt-4 space-y-3">
            <AllocationControl label="Market learning & demand" value={allocation.market} rgb="244,114,182" canIncrease={reserve >= 5} onDecrease={() => change("market", -5)} onIncrease={() => change("market", 5)} />
            <AllocationControl label="Product / capability" value={allocation.product} rgb="125,211,252" canIncrease={reserve >= 5} onDecrease={() => change("product", -5)} onIncrease={() => change("product", 5)} />
            <AllocationControl label="Operations / fulfillment" value={allocation.operations} rgb="94,234,212" canIncrease={reserve >= 5} onDecrease={() => change("operations", -5)} onIncrease={() => change("operations", 5)} />
            <div className="grid grid-cols-[minmax(0,1fr)_76px] items-center gap-3 border-t border-white/[0.06] pt-3"><span><strong className="block text-[11px] text-amber-100/70">Reserve / optionality</strong><span className="mt-0.5 block text-[9px] text-slate-600">automatic remainder</span></span><span className="text-right font-mono text-[15px] text-amber-200/74">{reserve}</span></div>
          </div>
        </div>

        <div className="border border-white/[0.06] bg-black/[0.04] p-4">
          <div className="flex items-end justify-between gap-3"><div><div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.07em] text-emerald-100/46"><TrendingUp size={11} /> Toy capability profile</div><p className="mt-1 text-[10px] text-slate-600">The lowest capability is highlighted as a system bottleneck.</p></div><span className="font-mono text-[9px] uppercase text-slate-700">0–100 normalized</span></div>
          <div className="mt-6 space-y-5">
            {metrics.map((metric) => <div key={metric.label}><div className="flex items-center justify-between"><span className="text-[11px] text-white/72">{metric.label}</span><span className="font-mono text-[10px]" style={{ color: `rgba(${metric.rgb},0.62)` }}>{metric.value}</span></div><div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/[0.04]"><div className="h-full rounded-full transition-[width] duration-300" style={{ width: `${metric.value}%`, background: `rgba(${metric.rgb},0.52)` }} /></div></div>)}
          </div>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Note title="Constraint" text="Every extra unit assigned to one area is unavailable to the others unless reserve exists." />
            <Note title="No universal optimum" text="Different markets, organizations, time horizons, technologies, risks, and goals change which tradeoffs matter." />
          </div>
        </div>
      </div>
    </div>
  );
}

function AllocationControl({ label, value, rgb, canIncrease, onDecrease, onIncrease }: { label: string; value: number; rgb: string; canIncrease: boolean; onDecrease: () => void; onIncrease: () => void }) {
  return <div className="grid grid-cols-[minmax(0,1fr)_96px] items-center gap-3"><div><div className="flex items-center justify-between"><strong className="text-[11px] text-white/76">{label}</strong><span className="font-mono text-[10px]" style={{ color: `rgba(${rgb},0.62)` }}>{value}</span></div><div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.04]"><div className="h-full rounded-full" style={{ width: `${value}%`, background: `rgba(${rgb},0.44)` }} /></div></div><div className="grid grid-cols-2 gap-1"><button type="button" onClick={onDecrease} disabled={value === 0} className="border border-white/[0.07] py-1.5 text-[12px] text-slate-500 disabled:opacity-25">−5</button><button type="button" onClick={onIncrease} disabled={!canIncrease} className="border border-white/[0.07] py-1.5 text-[12px] text-slate-500 disabled:opacity-25">+5</button></div></div>;
}

function Note({ title, text }: { title: string; text: string }) {
  return <div className="border-l border-emerald-200/14 bg-emerald-200/[0.018] px-3 py-2"><strong className="text-[10px] uppercase tracking-[0.04em] text-emerald-100/54">{title}</strong><p className="mt-1 text-[10px] leading-4 text-slate-600">{text}</p></div>;
}

function clamp(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}
