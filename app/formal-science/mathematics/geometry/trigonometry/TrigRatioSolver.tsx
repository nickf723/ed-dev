"use client";

import { useState } from "react";
import { Triangle } from "lucide-react";

export default function TrigRatioSolver() {
  const [angle, setAngle] = useState(38);
  const [hypotenuse, setHypotenuse] = useState(12);

  const rad = (angle * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.tan(rad);
  const opposite = hypotenuse * sin;
  const adjacent = hypotenuse * cos;

  const originX = 34;
  const baselineY = 220;
  const visualHypotenuse = 180;
  const endpointX = originX + cos * visualHypotenuse;
  const endpointY = baselineY - sin * visualHypotenuse;

  return (
    <section className="overflow-hidden rounded-[26px] border border-cyan-200/[0.10] bg-[#07121a]/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-cyan-200/66">
          <Triangle size={13} /> Right-triangle solver
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">ratios scale with the triangle</span>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(250px,0.92fr)_minmax(270px,1.08fr)] lg:items-center">
        <div className="mx-auto w-full max-w-[360px]">
          <svg viewBox="0 0 300 260" className="h-auto w-full" role="img" aria-label={`Right triangle with ${angle} degree angle and ${hypotenuse} unit hypotenuse`}>
            <defs>
              <linearGradient id="trig-triangle-fill" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(34,211,238,0.06)" />
                <stop offset="100%" stopColor="rgba(192,132,252,0.12)" />
              </linearGradient>
            </defs>
            <path d={`M ${originX} ${baselineY} L ${endpointX} ${baselineY} L ${endpointX} ${endpointY} Z`} fill="url(#trig-triangle-fill)" stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" />
            <line x1={originX} y1={baselineY} x2={endpointX} y2={baselineY} stroke="rgba(34,211,238,0.88)" strokeWidth="3" />
            <line x1={endpointX} y1={baselineY} x2={endpointX} y2={endpointY} stroke="rgba(192,132,252,0.90)" strokeWidth="3" />
            <line x1={originX} y1={baselineY} x2={endpointX} y2={endpointY} stroke="rgba(255,255,255,0.78)" strokeWidth="2.5" />
            <path d={`M ${endpointX - 15} ${baselineY} L ${endpointX - 15} ${baselineY - 15} L ${endpointX} ${baselineY - 15}`} fill="none" stroke="rgba(255,255,255,0.34)" />
            <path d={`M ${originX + 28} ${baselineY} A 28 28 0 0 0 ${originX + Math.cos(rad) * 28} ${baselineY - Math.sin(rad) * 28}`} fill="none" stroke="rgba(250,204,21,0.72)" strokeWidth="1.5" />
            <text x={originX + 36} y={baselineY - 10} fill="rgba(250,204,21,0.78)" fontSize="10">{angle}°</text>
            <text x={(originX + endpointX) / 2} y={baselineY + 20} fill="rgba(34,211,238,0.76)" fontSize="10" textAnchor="middle">adjacent {adjacent.toFixed(2)}</text>
            <text x={endpointX + 8} y={(baselineY + endpointY) / 2} fill="rgba(192,132,252,0.78)" fontSize="10">opp {opposite.toFixed(2)}</text>
            <text x={(originX + endpointX) / 2 - 4} y={(baselineY + endpointY) / 2 - 8} fill="rgba(255,255,255,0.70)" fontSize="10" textAnchor="middle">hyp {hypotenuse.toFixed(1)}</text>
          </svg>
        </div>

        <div>
          <Control label="Angle θ" value={`${angle}°`} min={5} max={85} step={1} current={angle} onChange={setAngle} accent="violet" />
          <div className="mt-5"><Control label="Hypotenuse" value={`${hypotenuse.toFixed(1)} units`} min={2} max={20} step={0.5} current={hypotenuse} onChange={setHypotenuse} accent="cyan" /></div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            <Ratio label="sin θ" value={sin} relation="opp / hyp" rgb="192, 132, 252" />
            <Ratio label="cos θ" value={cos} relation="adj / hyp" rgb="34, 211, 238" />
            <Ratio label="tan θ" value={tan} relation="opp / adj" rgb="250, 204, 21" />
          </div>

          <div className="mt-4 rounded-[16px] border border-white/[0.06] bg-black/[0.13] p-3 text-[10px] leading-5 text-slate-500">
            Changing the hypotenuse scales every side but leaves the three ratios unchanged. Changing the angle changes the ratios. That separation is the core reason trigonometric functions can describe shape independent of size.
          </div>
        </div>
      </div>
    </section>
  );
}

function Control({ label, value, min, max, step, current, onChange, accent }: { label: string; value: string; min: number; max: number; step: number; current: number; onChange: (value: number) => void; accent: "violet" | "cyan" }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">{label}</span><strong className="font-mono text-[11px] text-white/78">{value}</strong></div>
      <input
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={current}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 ${accent === "violet" ? "accent-violet-400" : "accent-cyan-400"}`}
      />
    </div>
  );
}

function Ratio({ label, value, relation, rgb }: { label: string; value: number; relation: string; rgb: string }) {
  return (
    <div className="rounded-[14px] border px-2.5 py-3 text-center" style={{ borderColor: `rgba(${rgb},0.13)`, background: `rgba(${rgb},0.025)` }}>
      <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.08em]" style={{ color: `rgba(${rgb},0.65)` }}>{label}</div>
      <strong className="mt-1 block font-mono text-[13px] text-white/82">{value.toFixed(3)}</strong>
      <span className="mt-1 block text-[8px] text-slate-700">{relation}</span>
    </div>
  );
}
