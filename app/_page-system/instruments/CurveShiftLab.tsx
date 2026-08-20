"use client";

import { useMemo, useState } from "react";
import { ChartLine, Minus, Plus, RotateCcw, SlidersHorizontal } from "lucide-react";

type Shift = -2 | -1 | 0 | 1 | 2;

export default function CurveShiftLab() {
  const [demandShift, setDemandShift] = useState<Shift>(0);
  const [supplyShift, setSupplyShift] = useState<Shift>(0);

  const equilibrium = useMemo(() => {
    const demandIntercept = 90 + demandShift * 10;
    const supplyIntercept = 10 - supplyShift * 10;
    const quantity = (demandIntercept - supplyIntercept) / 2;
    const price = supplyIntercept + quantity;
    return { quantity, price, demandIntercept, supplyIntercept };
  }, [demandShift, supplyShift]);

  const baseline = { quantity: 40, price: 50 };
  const priceDelta = equilibrium.price - baseline.price;
  const quantityDelta = equilibrium.quantity - baseline.quantity;

  return (
    <div className="overflow-hidden rounded-[24px] border border-white/[0.08] bg-black/[0.14] backdrop-blur-xl">
      <div className="grid gap-3 border-b border-white/[0.07] p-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end sm:p-5">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.09em] text-emerald-200/72">
            <ChartLine size={13} /> Market equilibrium preview
          </div>
          <h2 className="mt-2 text-[23px] font-semibold tracking-[-0.035em] text-white">Shift a curve. Watch price and quantity respond together.</h2>
          <p className="mt-2 max-w-2xl text-[13px] leading-6 text-slate-400">
            A shift changes the whole supply or demand relationship. A movement along a curve is a response to price while that relationship stays fixed.
          </p>
        </div>
        <button
          type="button"
          onClick={() => { setDemandShift(0); setSupplyShift(0); }}
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-2 font-mono text-[9px] uppercase tracking-[0.07em] text-slate-400 hover:text-white"
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1fr)_320px] sm:p-5">
        <div className="rounded-[18px] border border-white/[0.07] bg-[#030806]/76 p-3 sm:p-4">
          <svg viewBox="0 0 640 420" className="h-auto w-full overflow-visible" role="img" aria-label="Supply and demand graph">
            <defs>
              <linearGradient id="market-grid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.035)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.008)" />
              </linearGradient>
            </defs>
            <rect x="70" y="30" width="520" height="320" rx="18" fill="url(#market-grid)" stroke="rgba(255,255,255,0.07)" />
            {Array.from({ length: 6 }, (_, index) => (
              <g key={index}>
                <line x1={70 + index * 104} y1="30" x2={70 + index * 104} y2="350" stroke="rgba(255,255,255,0.045)" />
                <line x1="70" y1={30 + index * 64} x2="590" y2={30 + index * 64} stroke="rgba(255,255,255,0.045)" />
              </g>
            ))}
            <line x1="70" y1="350" x2="606" y2="350" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" />
            <line x1="70" y1="366" x2="70" y2="18" stroke="rgba(255,255,255,0.25)" strokeWidth="1.4" />
            <text x="590" y="385" textAnchor="end" fill="rgba(255,255,255,0.52)" fontSize="13">quantity</text>
            <text x="32" y="38" fill="rgba(255,255,255,0.52)" fontSize="13">price</text>

            <line x1={xForQ(0)} y1={yForP(equilibrium.demandIntercept)} x2={xForQ(80)} y2={yForP(equilibrium.demandIntercept - 80)} stroke="rgba(34,197,94,0.92)" strokeWidth="4" strokeLinecap="round" />
            <line x1={xForQ(0)} y1={yForP(equilibrium.supplyIntercept)} x2={xForQ(80)} y2={yForP(equilibrium.supplyIntercept + 80)} stroke="rgba(59,130,246,0.92)" strokeWidth="4" strokeLinecap="round" />

            <line x1={xForQ(equilibrium.quantity)} y1={yForP(equilibrium.price)} x2={xForQ(equilibrium.quantity)} y2="350" stroke="rgba(250,204,21,0.30)" strokeDasharray="5 7" />
            <line x1="70" y1={yForP(equilibrium.price)} x2={xForQ(equilibrium.quantity)} y2={yForP(equilibrium.price)} stroke="rgba(250,204,21,0.30)" strokeDasharray="5 7" />
            <circle cx={xForQ(equilibrium.quantity)} cy={yForP(equilibrium.price)} r="8" fill="rgba(250,204,21,0.95)" stroke="rgba(255,255,255,0.55)" strokeWidth="2" />
            <circle cx={xForQ(equilibrium.quantity)} cy={yForP(equilibrium.price)} r="18" fill="none" stroke="rgba(250,204,21,0.16)" strokeWidth="5" />

            <text x={xForQ(68)} y={yForP(equilibrium.demandIntercept - 68) - 10} fill="rgba(110,231,183,0.90)" fontSize="14" fontWeight="700">Demand</text>
            <text x={xForQ(67)} y={yForP(equilibrium.supplyIntercept + 67) + 20} fill="rgba(147,197,253,0.90)" fontSize="14" fontWeight="700">Supply</text>
          </svg>
        </div>

        <aside className="space-y-3 xl:sticky xl:top-[172px] xl:self-start">
          <ShiftControl label="Demand" rgb="34, 197, 94" value={demandShift} onChange={setDemandShift} low="less demand" high="more demand" />
          <ShiftControl label="Supply" rgb="59, 130, 246" value={supplyShift} onChange={setSupplyShift} low="less supply" high="more supply" />

          <div className="grid grid-cols-2 gap-2">
            <ResultCard label="Price" value={equilibrium.price} delta={priceDelta} rgb="250, 204, 21" />
            <ResultCard label="Quantity" value={equilibrium.quantity} delta={quantityDelta} rgb="167, 139, 250" />
          </div>

          <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.016] p-3.5">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.07em] text-slate-500"><SlidersHorizontal size={12} /> Read the change</div>
            <p className="mt-2 text-[12px] leading-5 text-slate-400">{interpret(demandShift, supplyShift, priceDelta, quantityDelta)}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function ShiftControl({ label, rgb, value, onChange, low, high }: { label: string; rgb: string; value: Shift; onChange: (value: Shift) => void; low: string; high: string }) {
  return (
    <div className="rounded-[16px] border border-white/[0.07] bg-white/[0.016] p-3.5">
      <div className="flex items-center justify-between">
        <strong className="text-[13px] text-white">{label}</strong>
        <span className="font-mono text-[11px]" style={{ color: `rgb(${rgb})` }}>{value > 0 ? `+${value}` : value}</span>
      </div>
      <div className="mt-3 grid grid-cols-[36px_1fr_36px] items-center gap-2">
        <button type="button" onClick={() => onChange(Math.max(-2, value - 1) as Shift)} className="flex h-9 items-center justify-center rounded-[9px] border border-white/[0.07] text-slate-500 hover:text-white" aria-label={`Decrease ${label.toLowerCase()}`}><Minus size={13} /></button>
        <div className="grid grid-cols-5 gap-1.5">
          {([-2, -1, 0, 1, 2] as Shift[]).map((step) => (
            <button key={step} type="button" onClick={() => onChange(step)} className="h-2.5 rounded-full transition" style={{ background: step === value ? `rgb(${rgb})` : "rgba(255,255,255,0.08)" }} aria-label={`${label} shift ${step}`} />
          ))}
        </div>
        <button type="button" onClick={() => onChange(Math.min(2, value + 1) as Shift)} className="flex h-9 items-center justify-center rounded-[9px] border border-white/[0.07] text-slate-500 hover:text-white" aria-label={`Increase ${label.toLowerCase()}`}><Plus size={13} /></button>
      </div>
      <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.06em] text-slate-600"><span>{low}</span><span>{high}</span></div>
    </div>
  );
}

function ResultCard({ label, value, delta, rgb }: { label: string; value: number; delta: number; rgb: string }) {
  return (
    <div className="rounded-[14px] border border-white/[0.07] bg-black/[0.20] p-3">
      <div className="font-mono text-[8px] uppercase tracking-[0.07em] text-slate-600">Equilibrium {label}</div>
      <div className="mt-1 text-[24px] font-semibold" style={{ color: `rgb(${rgb})` }}>{Math.round(value)}</div>
      <div className="font-mono text-[9px] leading-4 text-slate-500">{delta === 0 ? "baseline" : `${delta > 0 ? "+" : ""}${Math.round(delta)} from baseline`}</div>
    </div>
  );
}

function xForQ(quantity: number) {
  return 70 + (Math.max(0, Math.min(100, quantity)) / 100) * 520;
}

function yForP(price: number) {
  return 350 - (Math.max(0, Math.min(100, price)) / 100) * 320;
}

function interpret(demand: Shift, supply: Shift, priceDelta: number, quantityDelta: number) {
  if (demand === 0 && supply === 0) return "The baseline equilibrium is where the current supply and demand relationships are simultaneously satisfied.";
  const price = priceDelta > 0 ? "higher" : priceDelta < 0 ? "lower" : "unchanged";
  const quantity = quantityDelta > 0 ? "higher" : quantityDelta < 0 ? "lower" : "unchanged";
  if (demand !== 0 && supply !== 0 && Math.sign(demand) !== Math.sign(supply)) return `Both curves moved in ways that reinforce the price effect: equilibrium price is ${price}. Their effects on quantity partially offset, leaving quantity ${quantity}.`;
  if (demand !== 0 && supply !== 0) return `Demand and supply both shifted. Quantity moves ${quantity}, while the effects on price partly offset, leaving price ${price}.`;
  if (demand !== 0) return `Only demand shifted. With supply held fixed, equilibrium moves to a ${price} price and ${quantity} quantity.`;
  return `Only supply shifted. With demand held fixed, equilibrium moves to a ${price} price and ${quantity} quantity.`;
}
