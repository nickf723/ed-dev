"use client";

import { useMemo, useState } from "react";
import { Activity, CheckCircle2, Ruler, Search } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

const POWERS = [1, 2, 3, 4, 5] as const;
const SAMPLE_X = [0.75, 1, 1.5] as const;
const X_MIN = -0.1;
const X_MAX = 2.1;

export default function PowerRuleLab() {
  const [power, setPower] = useState(3);
  const [x0, setX0] = useState(1.15);
  const [halfWidth, setHalfWidth] = useState(0.45);
  const [coefficientGuess, setCoefficientGuess] = useState(1);
  const [exponentGuess, setExponentGuess] = useState(1);

  const f = (x: number) => Math.pow(x, power);
  const leftX = x0 - halfWidth;
  const rightX = x0 + halfWidth;
  const leftY = f(leftX);
  const rightY = f(rightX);
  const secantSlope = (rightY - leftY) / (rightX - leftX);
  const samples = useMemo(() => SAMPLE_X.map((x) => ({
    x,
    measured: centralSlope(power, x, 0.0005),
    candidate: coefficientGuess * Math.pow(x, exponentGuess),
  })), [coefficientGuess, exponentGuess, power]);
  const candidateMatches = samples.every((sample) => Math.abs(sample.measured - sample.candidate) <= 0.025 * Math.max(1, Math.abs(sample.measured)));

  const width = 760;
  const height = 330;
  const padX = 54;
  const padY = 42;
  const yMin = -1;
  const yMax = Math.max(3, f(X_MAX) * 1.06);
  const sx = (x: number) => padX + ((x - X_MIN) / (X_MAX - X_MIN)) * (width - padX * 2);
  const sy = (y: number) => height - padY - ((y - yMin) / (yMax - yMin)) * (height - padY * 2);
  const curve = Array.from({ length: 100 }, (_, index) => {
    const x = X_MIN + (index / 99) * (X_MAX - X_MIN);
    return `${sx(x).toFixed(1)},${sy(f(x)).toFixed(1)}`;
  }).join(" ");

  function choosePower(nextPower: number) {
    setPower(nextPower);
    setCoefficientGuess(1);
    setExponentGuess(0);
    setHalfWidth(0.45);
  }

  return (
    <Surface variant="glass" className="overflow-hidden rounded-[30px] border-orange-100/[0.11]" style={{ background: "rgba(15,7,2,0.28)" }}>
      <div className="grid border-b border-white/[0.07] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[12px] font-semibold uppercase tracking-[0.09em] text-orange-200/64"><Search size={14} /> Slope-pattern laboratory</div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.9rem)] font-semibold tracking-[-0.045em] text-white">Measure first. Guess the derivative form second.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/74">Choose a power function, squeeze a symmetric secant around one point, and watch its slope settle. Then test whether one candidate expression <span className="font-mono text-orange-100/86">a·xᵇ</span> reproduces the near-tangent slopes at several x-values.</p>
        </div>
        <div className="border-t border-white/[0.07] bg-black/[0.055] p-5 lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">Current evidence</span>
          <strong className="mt-2 block text-[20px] text-orange-200">secant slope ≈ {secantSlope.toFixed(3)}</strong>
          <p className="mt-2 text-[12px] leading-5 text-slate-400/72">at x = {x0.toFixed(2)} using points {halfWidth.toFixed(2)} units to either side. Shrink the width to make the local measurement more tangent-like.</p>
        </div>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[225px_minmax(0,1fr)_330px] xl:items-start">
        <div>
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">Original function</div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {POWERS.map((n) => <button key={n} type="button" onClick={() => choosePower(n)} className={`rounded-[11px] border px-2 py-2.5 font-mono text-[12px] font-semibold transition ${power === n ? "border-orange-200/[0.28] bg-orange-300/[0.05] text-orange-100" : "border-white/[0.055] bg-black/[0.05] text-slate-500"}`}>x<sup>{n}</sup></button>)}
          </div>

          <Control label="Measure near x" value={x0} min={0.55} max={1.55} step={0.05} display={x0.toFixed(2)} onChange={setX0} />
          <Control label="Secant half-width h" value={halfWidth} min={0.02} max={0.7} step={0.01} display={halfWidth.toFixed(2)} onChange={setHalfWidth} />

          <div className="mt-4 rounded-[15px] border border-white/[0.06] bg-black/[0.06] p-3">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-amber-200/50"><Ruler size={11} /> Investigation cue</div>
            <p className="mt-2 text-[11px] leading-5 text-slate-500">Try x = 1 first for several powers. Then move away from 1. Which part of your candidate seems to come from the old exponent, and which part seems to control how slope changes with x?</p>
          </div>
        </div>

        <div>
          <div className="overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#100702]/72 p-3 sm:p-4">
            <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={`Graph of x to the power ${power} with a symmetric secant line`}>
              <line x1={padX} x2={width - padX} y1={sy(0)} y2={sy(0)} stroke="rgba(148,163,184,0.16)" />
              <line x1={sx(0)} x2={sx(0)} y1={padY} y2={height - padY} stroke="rgba(148,163,184,0.12)" />
              <polyline points={curve} fill="none" stroke="rgba(251,146,60,0.82)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              <line x1={sx(leftX)} y1={sy(leftY)} x2={sx(rightX)} y2={sy(rightY)} stroke="rgba(250,204,21,0.72)" strokeWidth="2.5" />
              <circle cx={sx(leftX)} cy={sy(leftY)} r="6" fill="rgb(250,204,21)" />
              <circle cx={sx(rightX)} cy={sy(rightY)} r="6" fill="rgb(250,204,21)" />
              <circle cx={sx(x0)} cy={sy(f(x0))} r="6" fill="rgb(244,114,182)" />
              <line x1={sx(x0)} x2={sx(x0)} y1={sy(f(x0))} y2={sy(0)} stroke="rgba(244,114,182,0.15)" strokeDasharray="4 6" />
              <text x={sx(x0) + 9} y={sy(f(x0)) - 10} fill="rgba(251,207,232,0.72)" fontSize="13">x = {x0.toFixed(2)}</text>
              <text x={padX} y="26" fill="rgba(253,186,116,0.62)" fontSize="13">f(x) = x^{power}</text>
            </svg>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            <Readout label="Left point" value={`(${leftX.toFixed(2)}, ${leftY.toFixed(2)})`} note="x − h" rgb="250,204,21" />
            <Readout label="Measured slope" value={secantSlope.toFixed(3)} note="symmetric secant" rgb="251,146,60" />
            <Readout label="Right point" value={`(${rightX.toFixed(2)}, ${rightY.toFixed(2)})`} note="x + h" rgb="250,204,21" />
          </div>
        </div>

        <aside className="xl:sticky xl:top-[172px] xl:self-start">
          <div className="rounded-[20px] border border-white/[0.07] bg-black/[0.07] p-4">
            <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-pink-200/52"><Activity size={13} /> Test a candidate</div>
            <div className="mt-3 rounded-[14px] border border-white/[0.06] bg-black/[0.08] p-3 text-center font-mono text-[20px] text-white">{coefficientGuess}x<sup>{exponentGuess}</sup></div>
            <Control label="Coefficient a" value={coefficientGuess} min={0} max={6} step={1} display={String(coefficientGuess)} onChange={setCoefficientGuess} compact />
            <Control label="Exponent b" value={exponentGuess} min={0} max={5} step={1} display={String(exponentGuess)} onChange={setExponentGuess} compact />

            <div className="mt-4 divide-y divide-white/[0.055] border-y border-white/[0.06]">
              {samples.map((sample) => {
                const close = Math.abs(sample.measured - sample.candidate) <= 0.025 * Math.max(1, Math.abs(sample.measured));
                return <div key={sample.x} className="grid grid-cols-[48px_1fr_1fr_24px] items-center gap-2 py-2.5 text-[10px]"><span className="font-mono text-slate-500">x={sample.x}</span><span className="text-slate-400">slope {sample.measured.toFixed(3)}</span><span className="text-slate-400">guess {sample.candidate.toFixed(3)}</span><span className={close ? "text-emerald-300" : "text-slate-700"}>{close ? "✓" : "·"}</span></div>;
              })}
            </div>

            <div className={`mt-4 rounded-[14px] border p-3 ${candidateMatches ? "border-emerald-300/[0.16] bg-emerald-300/[0.025]" : "border-orange-300/[0.10] bg-orange-300/[0.018]"}`}>
              <div className="flex items-center gap-2"><CheckCircle2 size={13} className={candidateMatches ? "text-emerald-300" : "text-slate-600"} /><strong className={`text-[11px] ${candidateMatches ? "text-emerald-200" : "text-slate-400"}`}>{candidateMatches ? "Candidate matches all three sampled slopes" : "Keep adjusting a and b"}</strong></div>
              <p className="mt-2 text-[11px] leading-5 text-slate-500">The measurements come from very small symmetric secants, not from the power-rule formula. The formal rule appears below the lab whether or not you finish this puzzle.</p>
            </div>
          </div>
        </aside>
      </div>
    </Surface>
  );
}

function centralSlope(power: number, x: number, h: number) {
  return (Math.pow(x + h, power) - Math.pow(x - h, power)) / (2 * h);
}

function Control({ label, value, min, max, step, display, onChange, compact = false }: { label: string; value: number; min: number; max: number; step: number; display: string; onChange: (value: number) => void; compact?: boolean }) {
  return <label className={`${compact ? "mt-3" : "mt-4"} block rounded-[14px] border border-white/[0.055] bg-black/[0.055] p-3`}><span className="flex items-center justify-between gap-3"><span className="text-[11px] font-semibold text-white/76">{label}</span><strong className="font-mono text-[12px] text-orange-200">{display}</strong></span><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-orange-400" /></label>;
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return <div className="rounded-[15px] border border-white/[0.06] bg-black/[0.08] p-3"><div className="font-mono text-[10px] uppercase tracking-[0.06em] text-slate-500">{label}</div><div className="mt-1 font-mono text-[13px] font-semibold" style={{ color: `rgb(${rgb})` }}>{value}</div><p className="mt-1 text-[11px] leading-4 text-slate-500">{note}</p></div>;
}
