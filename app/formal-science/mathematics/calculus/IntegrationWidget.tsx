"use client";

import { useMemo, useState } from "react";
import { AreaChart } from "lucide-react";

const WIDTH = 420;
const HEIGHT = 210;
const LEFT = 24;
const RIGHT = WIDTH - 18;
const TOP = 18;
const BOTTOM = HEIGHT - 24;
const A = 0;
const B = 4;

function f(x: number) {
  return 5 - (x - 2) ** 2;
}

const EXACT_AREA = 44 / 3;

function graphX(x: number) {
  return LEFT + ((x - A) / (B - A)) * (RIGHT - LEFT);
}

function graphY(y: number) {
  return BOTTOM - (y / 5.5) * (BOTTOM - TOP);
}

export default function IntegrationWidget() {
  const [rectangles, setRectangles] = useState(6);
  const dx = (B - A) / rectangles;
  const approximation = useMemo(
    () => Array.from({ length: rectangles }, (_, index) => f(A + index * dx) * dx).reduce((sum, area) => sum + area, 0),
    [rectangles, dx],
  );
  const error = approximation - EXACT_AREA;

  const curve = Array.from({ length: 161 }, (_, index) => {
    const x = A + (index / 160) * (B - A);
    return `${index === 0 ? "M" : "L"} ${graphX(x)} ${graphY(f(x))}`;
  }).join(" ");

  return (
    <section className="overflow-hidden rounded-[24px] border border-rose-200/[0.11] bg-black/[0.17] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-rose-200/54"><AreaChart size={13} /> Accumulation explorer</div>
        <div className="font-mono text-[9px] text-rose-100/44">∫₀⁴ [5 − (x−2)²] dx</div>
      </div>

      <div className="mt-4 overflow-hidden rounded-[15px] border border-white/[0.07] bg-black/[0.18]">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-[210px] w-full">
          <line x1={LEFT} y1={BOTTOM} x2={RIGHT} y2={BOTTOM} stroke="rgba(255,255,255,0.10)" />
          {Array.from({ length: rectangles }, (_, index) => {
            const x = A + index * dx;
            const height = f(x);
            return <rect key={index} x={graphX(x)} y={graphY(height)} width={Math.max(1, graphX(x + dx) - graphX(x) - 1)} height={BOTTOM - graphY(height)} fill="rgba(248,113,113,0.15)" stroke="rgba(248,113,113,0.42)" />;
          })}
          <path d={curve} fill="none" stroke="rgba(255,255,255,0.72)" strokeWidth="2" />
        </svg>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="font-mono text-[8px] uppercase text-slate-700">rectangles</span>
        <input aria-label="Number of Riemann rectangles" type="range" min="2" max="60" step="1" value={rectangles} onChange={(event) => setRectangles(Number(event.target.value))} className="min-w-0 flex-1 accent-rose-400" />
        <span className="w-8 text-right font-mono text-[10px] text-rose-100/66">{rectangles}</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Readout label="left sum" value={approximation.toFixed(4)} />
        <Readout label="exact" value={EXACT_AREA.toFixed(4)} />
        <Readout label="error" value={`${error >= 0 ? "+" : ""}${error.toFixed(4)}`} />
      </div>
      <p className="mt-4 text-[9px] leading-4 text-slate-600">The rectangles use left endpoints on [0, 4]. Refining the partition reduces the width of each rectangle and drives this Riemann sum toward the definite integral.</p>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[12px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[13px] text-white/82">{value}</div></div>;
}
