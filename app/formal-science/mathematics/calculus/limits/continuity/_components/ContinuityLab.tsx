"use client";

import { useState } from "react";
import { CheckCircle2, CircleDot, XCircle } from "lucide-react";

const WIDTH = 560;
const HEIGHT = 280;
const X_MIN = -1;
const X_MAX = 5;
const Y_MIN = 0;
const Y_MAX = 8;
const C = 2;
const LIMIT = 3;

function f(x: number) {
  return (x - C) ** 2 + LIMIT;
}

function sx(x: number) {
  return ((x - X_MIN) / (X_MAX - X_MIN)) * WIDTH;
}

function sy(y: number) {
  return HEIGHT - ((y - Y_MIN) / (Y_MAX - Y_MIN)) * HEIGHT;
}

export default function ContinuityLab() {
  const [pointValue, setPointValue] = useState(1.5);
  const continuous = Math.abs(pointValue - LIMIT) < 0.051;

  const curve = Array.from({ length: 181 }, (_, index) => {
    const x = X_MIN + (index / 180) * (X_MAX - X_MIN);
    return `${index === 0 ? "M" : "L"} ${sx(x)} ${sy(f(x))}`;
  }).join(" ");

  return (
    <section className="overflow-hidden rounded-[26px] border border-emerald-200/[0.11] bg-black/[0.16] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-emerald-200/54"><CircleDot size={13} /> Removable discontinuity lab</div>
          <h2 className="mt-2 text-[clamp(1.6rem,2.9vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Keep the nearby curve fixed. Change only f(2).</h2>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">For x ≠ 2, use f(x) = (x−2)² + 3. Nearby values approach 3 from both sides, so the two-sided limit is fixed at 3. Continuity depends on whether the actual point value agrees with that limit.</p>
        </div>
        <div className="border-t border-white/[0.07] p-5 lg:border-l lg:border-t-0">
          <div className={`inline-flex rounded-full border px-3 py-1 font-mono text-[8px] uppercase tracking-[0.10em] ${continuous ? "border-emerald-200/[0.18] bg-emerald-200/[0.035] text-emerald-200/64" : "border-rose-200/[0.16] bg-rose-200/[0.025] text-rose-200/60"}`}>{continuous ? "continuous at x = 2" : "removable discontinuity"}</div>
          <div className="mt-4 font-mono text-[8px] uppercase tracking-[0.10em] text-slate-700">Set f(2)</div>
          <input aria-label="Set the value of f(2)" type="range" min="0" max="6" step="0.05" value={pointValue} onChange={(event) => setPointValue(Number(event.target.value))} className="mt-3 w-full accent-emerald-400" />
          <div className="mt-2 font-mono text-[18px] text-white/82">f(2) = {pointValue.toFixed(2)}</div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r">
          <div className="overflow-hidden rounded-[15px] border border-white/[0.06] bg-black/[0.12]">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-[280px] w-full">
              <line x1={0} y1={sy(0)} x2={WIDTH} y2={sy(0)} stroke="rgba(255,255,255,0.08)" />
              <line x1={sx(0)} y1={0} x2={sx(0)} y2={HEIGHT} stroke="rgba(255,255,255,0.08)" />
              <line x1={sx(C)} y1={0} x2={sx(C)} y2={HEIGHT} stroke="rgba(52,211,153,0.12)" strokeDasharray="5 5" />
              <path d={curve} fill="none" stroke="rgba(96,165,250,0.80)" strokeWidth="2.5" />
              <circle cx={sx(C)} cy={sy(LIMIT)} r="6" fill="#070b10" stroke="rgba(96,165,250,0.9)" strokeWidth="2.5" />
              <circle cx={sx(C)} cy={sy(pointValue)} r="6" fill={continuous ? "rgb(52,211,153)" : "rgb(248,113,113)"} />
            </svg>
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className="font-mono text-[8px] uppercase tracking-[0.10em] text-slate-700">Continuity at c = 2</div>
          <div className="mt-4 space-y-3">
            <Check label="f(2) is defined" pass />
            <Check label="lim x→2 f(x) exists and equals 3" pass />
            <Check label="f(2) equals the limit" pass={continuous} />
          </div>
          <div className="mt-5 rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.09em] text-emerald-200/42">Key distinction</div>
            <p className="mt-2 text-[9px] leading-4 text-slate-600">Moving the filled point changes f(2), but it does not change the limit because the nearby curve remains unchanged. Only when the point is placed at y = 3 do value and limit agree.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Check({ label, pass }: { label: string; pass: boolean }) {
  return <div className="flex items-start gap-3"><span className={`mt-0.5 ${pass ? "text-emerald-300/70" : "text-rose-300/70"}`}>{pass ? <CheckCircle2 size={14} /> : <XCircle size={14} />}</span><span className="text-[10px] leading-5 text-slate-500">{label}</span></div>;
}
