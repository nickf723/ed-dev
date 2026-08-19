"use client";

import { useState } from "react";
import { Circle, MoveHorizontal, MoveVertical } from "lucide-react";

const SPECIAL_ANGLES = [0, 30, 45, 60, 90, 180, 270] as const;

export default function UnitCircleLab() {
  const [angle, setAngle] = useState(45);
  const rad = (angle * Math.PI) / 180;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.abs(cos) < 0.000001 ? null : Math.tan(rad);

  const size = 300;
  const center = 150;
  const radius = 104;
  const px = center + cos * radius;
  const py = center - sin * radius;
  const radiansOverPi = angle / 180;

  return (
    <section className="overflow-hidden rounded-[26px] border border-violet-200/[0.10] bg-[#080816]/70 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/68">
          <Circle size={13} /> Unit-circle coordinates
        </div>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-600">radius = 1</span>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 lg:grid-cols-[minmax(260px,0.92fr)_minmax(270px,1.08fr)] lg:items-center">
        <div className="mx-auto w-full max-w-[360px]">
          <svg viewBox={`0 0 ${size} ${size}`} className="h-auto w-full" role="img" aria-label={`Unit circle at ${angle} degrees`}>
            <defs>
              <radialGradient id="trig-circle-glow" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="rgba(139,92,246,0.10)" />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>
            </defs>
            <rect width={size} height={size} rx="24" fill="url(#trig-circle-glow)" />
            <line x1={center} y1="24" x2={center} y2={size - 24} stroke="rgba(148,163,184,0.14)" />
            <line x1="24" y1={center} x2={size - 24} y2={center} stroke="rgba(148,163,184,0.14)" />
            <circle cx={center} cy={center} r={radius} stroke="rgba(255,255,255,0.20)" strokeWidth="2" fill="none" />

            <path d={`M ${center} ${center} L ${px} ${py} L ${px} ${center} Z`} fill="rgba(192,132,252,0.08)" />
            <line x1={center} y1={center} x2={px} y2={py} stroke="rgba(255,255,255,0.80)" strokeWidth="2" />
            <line x1={center} y1={center} x2={px} y2={center} stroke="rgba(34,211,238,0.90)" strokeWidth="3" />
            <line x1={px} y1={center} x2={px} y2={py} stroke="rgba(192,132,252,0.92)" strokeWidth="3" />
            <circle cx={px} cy={py} r="6" fill="white" stroke="#111827" strokeWidth="2" />

            <text x={(center + px) / 2} y={center + 18} fill="rgba(34,211,238,0.76)" fontSize="10" textAnchor="middle">cos θ</text>
            <text x={px + 10} y={(center + py) / 2} fill="rgba(192,132,252,0.78)" fontSize="10">sin θ</text>
            <text x={center + 8} y={center - 8} fill="rgba(250,204,21,0.76)" fontSize="10">θ</text>
          </svg>
        </div>

        <div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.14em] text-slate-600">Angle</div>
              <div className="mt-1 text-[30px] font-semibold tracking-[-0.045em] text-white">{angle}°</div>
            </div>
            <div className="text-right font-mono text-[10px] text-violet-200/64">{radiansOverPi.toFixed(2)}π rad</div>
          </div>

          <input
            aria-label="Unit circle angle"
            type="range"
            min="0"
            max="360"
            step="1"
            value={angle}
            onChange={(event) => setAngle(Number(event.target.value))}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-violet-400"
          />

          <div className="mt-3 flex flex-wrap gap-1.5">
            {SPECIAL_ANGLES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setAngle(value)}
                className="rounded-full border border-white/[0.07] bg-white/[0.018] px-2.5 py-1 font-mono text-[8px] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300"
              >
                {value}°
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Readout icon={MoveHorizontal} label="cos θ · x" value={cos.toFixed(3)} rgb="34, 211, 238" />
            <Readout icon={MoveVertical} label="sin θ · y" value={sin.toFixed(3)} rgb="192, 132, 252" />
          </div>

          <div className="mt-2 flex items-center justify-between rounded-[14px] border border-amber-200/[0.10] bg-amber-200/[0.025] px-3 py-2.5">
            <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-amber-200/58">tan θ = sin θ / cos θ</span>
            <strong className="font-mono text-[12px] text-amber-100/78">{tan === null ? "undefined" : tan.toFixed(3)}</strong>
          </div>

          <p className="mt-4 text-[10px] leading-5 text-slate-600">
            The rotating point has coordinates <span className="text-cyan-200/70">(cos θ, sin θ)</span>. Triangle ratios become coordinates on a circle, which makes the same functions work for every rotation instead of only acute right triangles.
          </p>
        </div>
      </div>
    </section>
  );
}

function Readout({ icon: Icon, label, value, rgb }: { icon: typeof MoveHorizontal; label: string; value: string; rgb: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-[14px] border px-3 py-2.5" style={{ borderColor: `rgba(${rgb},0.13)`, background: `rgba(${rgb},0.025)` }}>
      <span className="flex items-center gap-2"><Icon size={13} style={{ color: `rgb(${rgb})` }} /><span className="font-mono text-[8px] font-semibold uppercase tracking-[0.1em]" style={{ color: `rgba(${rgb},0.62)` }}>{label}</span></span>
      <strong className="font-mono text-[12px] text-white/82">{value}</strong>
    </div>
  );
}
