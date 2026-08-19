"use client";

import { useMemo, useState } from "react";
import { Brackets, CheckCircle2, Grid3X3, XOctagon } from "lucide-react";

function extendedGcd(a: number, b: number): { gcd: number; x: number; y: number } {
  if (b === 0) return { gcd: Math.abs(a), x: a >= 0 ? 1 : -1, y: 0 };
  const next = extendedGcd(b, a % b);
  return { gcd: next.gcd, x: next.y, y: next.x - Math.trunc(a / b) * next.y };
}

export default function DiophantineLab() {
  const [a, setA] = useState(6);
  const [b, setB] = useState(9);
  const [c, setC] = useState(30);

  const result = useMemo(() => {
    const safeA = Math.max(1, Math.abs(Math.trunc(a)));
    const safeB = Math.max(1, Math.abs(Math.trunc(b)));
    const bezout = extendedGcd(safeA, safeB);
    const hasSolution = c % bezout.gcd === 0;
    if (!hasSolution) return { safeA, safeB, gcd: bezout.gcd, hasSolution, x0: null, y0: null, stepX: null, stepY: null, points: [] as { t: number; x: number; y: number }[] };

    const multiplier = c / bezout.gcd;
    const x0 = bezout.x * multiplier;
    const y0 = bezout.y * multiplier;
    const stepX = safeB / bezout.gcd;
    const stepY = -safeA / bezout.gcd;
    const points = Array.from({ length: 9 }, (_, index) => {
      const t = index - 4;
      return { t, x: x0 + stepX * t, y: y0 + stepY * t };
    });
    return { safeA, safeB, gcd: bezout.gcd, hasSolution, x0, y0, stepX, stepY, points };
  }, [a, b, c]);

  return (
    <section className="overflow-hidden rounded-[30px] border border-rose-200/[0.10] bg-[#13080c]/74 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
        <div><div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-rose-200/66"><Brackets size={13} /> Linear Diophantine family</div><p className="mt-1 text-[10px] text-slate-600">Solve ax + by = c over integer pairs, not over all real coordinates.</p></div>
        <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">x,y ∈ ℤ</span>
      </div>

      <div className="grid gap-5 p-4 sm:p-5 xl:grid-cols-[330px_minmax(0,1fr)]">
        <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
          <Coefficient label="Coefficient a" value={a} min={1} max={24} onChange={setA} rgb="251, 113, 133" />
          <div className="mt-5"><Coefficient label="Coefficient b" value={b} min={1} max={24} onChange={setB} rgb="56, 189, 248" /></div>
          <div className="mt-5"><Coefficient label="Target c" value={c} min={-80} max={80} onChange={setC} rgb="250, 204, 21" /></div>

          <div className="mt-5 rounded-[18px] border border-white/[0.07] bg-black/[0.14] p-4 text-center">
            <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">Current equation</div>
            <div className="mt-2 font-serif text-[24px] text-white/84"><span className="text-rose-300">{result.safeA}</span>x + <span className="text-sky-300">{result.safeB}</span>y = <span className="text-amber-300">{c}</span></div>
          </div>

          <div className="mt-4 rounded-[16px] border p-3" style={{ borderColor: result.hasSolution ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)", background: result.hasSolution ? "rgba(52,211,153,0.03)" : "rgba(248,113,113,0.03)" }}>
            <div className="flex items-start gap-2">{result.hasSolution ? <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-300/70" /> : <XOctagon size={15} className="mt-0.5 shrink-0 text-red-300/70" />}<div><strong className="block text-[10px] text-white/80">{result.hasSolution ? "Integer solutions exist" : "No integer solution"}</strong><p className="mt-1 text-[9px] leading-4 text-slate-600">gcd({result.safeA},{result.safeB}) = {result.gcd}. {result.hasSolution ? `${result.gcd} divides ${c}.` : `${result.gcd} does not divide ${c}.`}</p></div></div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(300px,1fr)_300px]">
          <LatticePlot points={result.points} hasSolution={result.hasSolution} />
          <aside className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-4">
            <div className="flex items-center gap-2 font-mono text-[8px] font-semibold uppercase tracking-[0.11em] text-slate-600"><Grid3X3 size={11} /> Solution parameterization</div>
            {result.hasSolution && result.x0 !== null && result.y0 !== null && result.stepX !== null && result.stepY !== null ? (
              <>
                <div className="mt-4 rounded-[16px] border border-rose-200/[0.10] bg-rose-200/[0.025] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-rose-200/48">one particular solution</div><strong className="mt-1 block font-mono text-[13px] text-white/80">(x₀,y₀) = ({result.x0},{result.y0})</strong></div>
                <div className="mt-3 rounded-[16px] border border-sky-200/[0.10] bg-sky-200/[0.025] p-3"><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-sky-200/48">all integer solutions · t ∈ ℤ</div><div className="mt-2 space-y-1 font-mono text-[10px] text-slate-400"><div>x = {result.x0} + {result.stepX}t</div><div>y = {result.y0} {result.stepY >= 0 ? "+" : "−"} {Math.abs(result.stepY)}t</div></div></div>
                <div className="mt-4 border-t border-white/[0.055] pt-3"><div className="font-mono text-[7px] uppercase tracking-[0.09em] text-slate-700">why the step works</div><p className="mt-2 text-[9px] leading-4 text-slate-700">Moving by (b/g, −a/g) changes ax + by by a(b/g) + b(−a/g) = 0, so every step remains on the same equation. These are exactly all integer solutions.</p></div>
              </>
            ) : (
              <div className="mt-4 rounded-[16px] border border-red-200/[0.10] bg-red-200/[0.025] p-3 text-[9px] leading-4 text-red-100/50">The real line still exists, but it misses every integer lattice point because the gcd divisibility condition fails.</div>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}

function Coefficient({ label, value, min, max, onChange, rgb }: { label: string; value: number; min: number; max: number; onChange: (value: number) => void; rgb: string }) {
  return <div><div className="flex items-center justify-between gap-3"><span className="font-mono text-[8px] uppercase tracking-[0.1em] text-slate-700">{label}</span><strong className="font-mono text-[11px]" style={{ color: `rgba(${rgb},0.78)` }}>{value}</strong></div><input aria-label={label} type="range" min={min} max={max} step="1" value={value} onChange={(event) => onChange(Number(event.target.value))} className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-800 accent-rose-400" /></div>;
}

function LatticePlot({ points, hasSolution }: { points: readonly { t: number; x: number; y: number }[]; hasSolution: boolean }) {
  const extent = Math.max(10, ...points.flatMap((point) => [Math.abs(point.x), Math.abs(point.y)]), 10) + 3;
  const toX = (x: number) => 160 + (x / extent) * 132;
  const toY = (y: number) => 160 - (y / extent) * 132;
  return <div className="rounded-[22px] border border-white/[0.07] bg-black/[0.13] p-3"><svg viewBox="0 0 320 320" className="h-auto w-full" role="img" aria-label="Integer lattice solutions"><defs><pattern id="dio-grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="rgba(251,113,133,0.055)" strokeWidth="1" /></pattern></defs><rect x="12" y="12" width="296" height="296" rx="18" fill="url(#dio-grid)" /><line x1="160" y1="18" x2="160" y2="302" stroke="rgba(148,163,184,0.14)" /><line x1="18" y1="160" x2="302" y2="160" stroke="rgba(148,163,184,0.14)" />{hasSolution && points.length > 1 ? <line x1={toX(points[0].x)} y1={toY(points[0].y)} x2={toX(points.at(-1)!.x)} y2={toY(points.at(-1)!.y)} stroke="rgba(251,113,133,0.30)" strokeWidth="2" /> : null}{points.map((point) => <g key={point.t}><circle cx={toX(point.x)} cy={toY(point.y)} r={point.t === 0 ? 5 : 3.5} fill={point.t === 0 ? "rgba(250,204,21,0.88)" : "rgba(251,113,133,0.76)"} /><text x={toX(point.x) + 6} y={toY(point.y) - 6} fill="rgba(148,163,184,0.58)" fontSize="7" fontFamily="monospace">t={point.t}</text></g>)}</svg><div className="border-t border-white/[0.05] px-2 pt-2 font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700">integer lattice · displayed t = −4…4</div></div>;
}
