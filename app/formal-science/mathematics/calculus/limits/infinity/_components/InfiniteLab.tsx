"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight, Infinity as InfinityIcon } from "lucide-react";

type Side = "left" | "right";

const WIDTH = 560;
const HEIGHT = 280;
const X_MIN = -2;
const X_MAX = 2;
const Y_VISUAL = 6;

function sx(x: number) {
  return ((x - X_MIN) / (X_MAX - X_MIN)) * WIDTH;
}

function sy(y: number) {
  const clipped = Math.max(-Y_VISUAL, Math.min(Y_VISUAL, y));
  return HEIGHT / 2 - (clipped / (2 * Y_VISUAL)) * HEIGHT;
}

function valueAt(x: number, power: 1 | 2) {
  return 1 / x ** power;
}

function graphPath(power: 1 | 2, start: number, end: number) {
  const points = 130;
  return Array.from({ length: points }, (_, index) => {
    const ratio = index / (points - 1);
    const x = start + ratio * (end - start);
    return `${index === 0 ? "M" : "L"} ${sx(x)} ${sy(valueAt(x, power))}`;
  }).join(" ");
}

export default function InfiniteLab() {
  const [power, setPower] = useState<1 | 2>(1);
  const [side, setSide] = useState<Side>("right");
  const [closeness, setCloseness] = useState(1);

  const distance = 10 ** -closeness;
  const x = side === "left" ? -distance : distance;
  const y = valueAt(x, power);
  const direction = y > 0 ? "+∞" : "−∞";

  const leftPath = useMemo(() => graphPath(power, -2, -0.025), [power]);
  const rightPath = useMemo(() => graphPath(power, 0.025, 2), [power]);

  return (
    <section className="overflow-hidden rounded-[26px] border border-violet-200/[0.11] bg-black/[0.16] backdrop-blur-xl">
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.13em] text-violet-200/54"><InfinityIcon size={13} /> One-sided asymptote lab</div>
          <h2 className="mt-2 text-[clamp(1.6rem,2.9vw,2.5rem)] font-semibold tracking-[-0.043em] text-white">Approach zero from one side without ever setting x = 0.</h2>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Compare f(x)=1/x with f(x)=1/x². The first changes sign across zero; the second grows positive on both sides. Infinite-limit notation describes this unbounded trend, not a function value equal to infinity.</p>
        </div>
        <div className="border-t border-white/[0.07] p-4 lg:border-l lg:border-t-0">
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setPower(1)} className={`rounded-[12px] border px-3 py-2.5 font-mono text-[9px] ${power === 1 ? "border-violet-200/[0.24] bg-violet-200/[0.045] text-violet-100/76" : "border-white/[0.06] text-slate-600"}`}>1 / x</button>
            <button type="button" onClick={() => setPower(2)} className={`rounded-[12px] border px-3 py-2.5 font-mono text-[9px] ${power === 2 ? "border-violet-200/[0.24] bg-violet-200/[0.045] text-violet-100/76" : "border-white/[0.06] text-slate-600"}`}>1 / x²</button>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setSide("left")} className={`rounded-[12px] border px-3 py-2.5 font-mono text-[8px] ${side === "left" ? "border-cyan-200/[0.20] bg-cyan-200/[0.035] text-cyan-100/70" : "border-white/[0.06] text-slate-600"}`}>x → 0⁻</button>
            <button type="button" onClick={() => setSide("right")} className={`rounded-[12px] border px-3 py-2.5 font-mono text-[8px] ${side === "right" ? "border-cyan-200/[0.20] bg-cyan-200/[0.035] text-cyan-100/70" : "border-white/[0.06] text-slate-600"}`}>x → 0⁺</button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="border-b border-white/[0.07] p-5 lg:border-b-0 lg:border-r">
          <div className="overflow-hidden rounded-[15px] border border-white/[0.06] bg-black/[0.12]">
            <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="h-[280px] w-full">
              <line x1={0} y1={HEIGHT / 2} x2={WIDTH} y2={HEIGHT / 2} stroke="rgba(255,255,255,0.08)" />
              <line x1={sx(0)} y1={0} x2={sx(0)} y2={HEIGHT} stroke="rgba(192,132,252,0.22)" strokeDasharray="5 5" />
              <path d={leftPath} fill="none" stroke="rgba(192,132,252,0.76)" strokeWidth="2.3" />
              <path d={rightPath} fill="none" stroke="rgba(192,132,252,0.76)" strokeWidth="2.3" />
              <circle cx={sx(x)} cy={sy(y)} r="5" fill="white" stroke="rgba(34,211,238,0.9)" strokeWidth="2" />
            </svg>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-mono text-[8px] uppercase text-slate-700">distance to 0</span>
            <input aria-label="Closeness to zero" type="range" min="0" max="3" step="0.05" value={closeness} onChange={(event) => setCloseness(Number(event.target.value))} className="min-w-0 flex-1 accent-violet-400" />
            <span className="w-16 text-right font-mono text-[9px] text-violet-100/60">{distance.toExponential(1)}</span>
          </div>
        </div>

        <aside className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.10em] text-slate-700"><ArrowLeftRight size={11} /> Selected approach</div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Readout label="x" value={x.toExponential(3)} />
            <Readout label="f(x)" value={y.toExponential(3)} />
          </div>
          <div className="mt-5 font-mono text-[8px] uppercase tracking-[0.10em] text-slate-700">Observed direction</div>
          <div className="mt-1 text-[34px] font-semibold tracking-[-0.05em] text-violet-100/80">{direction}</div>
          <p className="mt-2 text-[9px] leading-4 text-slate-600">As the distance to zero shrinks, |f(x)| grows beyond any fixed bound. The symbol {direction} summarizes that trend; it is not the value of f(0), which is undefined here.</p>

          <div className="mt-5 rounded-[15px] border border-white/[0.06] bg-black/[0.10] p-4">
            <div className="font-mono text-[8px] uppercase tracking-[0.09em] text-violet-200/42">Compare the sides</div>
            <p className="mt-2 text-[9px] leading-4 text-slate-600">For 1/x, the left side tends to −∞ and the right side to +∞. For 1/x², both one-sided limits tend to +∞. In both cases x = 0 is a vertical asymptote.</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return <div className="rounded-[12px] border border-white/[0.06] bg-black/[0.10] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">{label}</div><div className="mt-1 font-mono text-[11px] text-white/82">{value}</div></div>;
}
