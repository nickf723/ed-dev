"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";

const WIDTH = 420;
const HEIGHT = 220;
const LEFT = 24;
const RIGHT = WIDTH - 18;
const TOP = 18;
const BOTTOM = HEIGHT - 24;
const X_MAX = 2 * Math.PI;

function graphX(x: number) {
  return LEFT + (x / X_MAX) * (RIGHT - LEFT);
}

function graphY(y: number) {
  return TOP + ((1.25 - y) / 2.5) * (BOTTOM - TOP);
}

export default function TangentSurfer() {
  const [x, setX] = useState(Math.PI / 3);
  const y = Math.sin(x);
  const slope = Math.cos(x);

  const tangentHalfWidth = 0.75;
  const tx1 = Math.max(0, x - tangentHalfWidth);
  const tx2 = Math.min(X_MAX, x + tangentHalfWidth);
  const ty1 = y + slope * (tx1 - x);
  const ty2 = y + slope * (tx2 - x);

  const curve = Array.from({ length: 181 }, (_, index) => {
    const value = (index / 180) * X_MAX;
    return `${index === 0 ? "M" : "L"} ${graphX(value)} ${graphY(Math.sin(value))}`;
  }).join(" ");

  function handlePointer(event: React.PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    setX(ratio * X_MAX);
  }

  return (
    <section className="overflow-hidden rounded-[24px] border border-cyan-200/[0.11] bg-black/[0.17] p-5 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-cyan-200/56"><TrendingUp size={13} /> Tangent explorer</div>
        <div className="font-mono text-[9px] text-cyan-100/48">f(x) = sin x</div>
      </div>

      <div className="mt-4 cursor-crosshair overflow-hidden rounded-[15px] border border-white/[0.07] bg-black/[0.18]" onPointerMove={handlePointer} onPointerDown={handlePointer}>
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-[220px] w-full">
          <line x1={LEFT} y1={graphY(0)} x2={RIGHT} y2={graphY(0)} stroke="rgba(255,255,255,0.10)" />
          <path d={curve} fill="none" stroke="rgba(34,211,238,0.80)" strokeWidth="2.2" />
          <line x1={graphX(tx1)} y1={graphY(ty1)} x2={graphX(tx2)} y2={graphY(ty2)} stroke="rgba(244,114,182,0.82)" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx={graphX(x)} cy={graphY(y)} r="4.5" fill="white" stroke="rgba(244,114,182,0.9)" strokeWidth="2" />
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <Readout label="x" value={x.toFixed(3)} />
        <Readout label="f(x)" value={y.toFixed(3)} />
        <Readout label="f′(x)" value={slope.toFixed(3)} />
      </div>
      <p className="mt-4 text-[9px] leading-4 text-slate-600">For f(x) = sin x, the derivative is f′(x) = cos x. The dashed tangent line has that actual mathematical slope at the selected point.</p>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[12px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[14px] text-white/82">{value}</div></div>;
}
