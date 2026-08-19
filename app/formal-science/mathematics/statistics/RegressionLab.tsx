"use client";

import { useMemo, useState } from "react";
import { RefreshCw, ScatterChart } from "lucide-react";

type Point = { x: number; y: number };

function fitLine(points: readonly Point[]) {
  if (points.length < 2) return { slope: 0, intercept: 0, rSquared: 0, valid: false };

  const n = points.length;
  const sumX = points.reduce((sum, point) => sum + point.x, 0);
  const sumY = points.reduce((sum, point) => sum + point.y, 0);
  const sumXX = points.reduce((sum, point) => sum + point.x * point.x, 0);
  const sumYY = points.reduce((sum, point) => sum + point.y * point.y, 0);
  const sumXY = points.reduce((sum, point) => sum + point.x * point.y, 0);
  const denominatorX = n * sumXX - sumX * sumX;
  const denominatorY = n * sumYY - sumY * sumY;

  if (Math.abs(denominatorX) < 1e-9) return { slope: 0, intercept: sumY / n, rSquared: 0, valid: false };

  const slope = (n * sumXY - sumX * sumY) / denominatorX;
  const intercept = (sumY - slope * sumX) / n;
  const correlationDenominator = Math.sqrt(Math.max(0, denominatorX * denominatorY));
  const correlation = correlationDenominator < 1e-9 ? 0 : (n * sumXY - sumX * sumY) / correlationDenominator;

  return { slope, intercept, rSquared: correlation * correlation, valid: true };
}

export default function RegressionLab() {
  const [points, setPoints] = useState<Point[]>([
    { x: 16, y: 28 },
    { x: 28, y: 34 },
    { x: 43, y: 50 },
    { x: 58, y: 57 },
    { x: 72, y: 73 },
    { x: 86, y: 78 },
  ]);
  const fit = useMemo(() => fitLine(points), [points]);

  const addPoint = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = 100 - ((event.clientY - rect.top) / rect.height) * 100;
    setPoints((current) => [...current.slice(-39), { x, y }]);
  };

  const lineStartY = fit.intercept;
  const lineEndY = fit.slope * 100 + fit.intercept;

  return (
    <section className="overflow-hidden rounded-[26px] border border-violet-200/[0.10] bg-[#0a0718]/72 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-violet-200/66"><ScatterChart size={13} /> Least-squares regression</div>
        <button type="button" onClick={() => setPoints([])} aria-label="Clear regression points" className="rounded-full border border-white/[0.08] bg-white/[0.018] p-2 text-slate-600 transition hover:bg-white/[0.04] hover:text-slate-300"><RefreshCw size={12} /></button>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_210px]">
        <div>
          <div onPointerDown={addPoint} className="relative aspect-[4/3] min-h-[260px] cursor-crosshair overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#050814] touch-none">
            <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(129,140,248,0.13)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.13)_1px,transparent_1px)] [background-size:10%_10%]" />
            {points.length === 0 ? <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-mono text-[9px] uppercase tracking-[0.12em] text-slate-700">click to add observations</div> : null}
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {points.map((point, index) => <circle key={index} cx={point.x} cy={100 - point.y} r="1.45" fill="rgba(45,212,191,0.88)" vectorEffect="non-scaling-stroke" />)}
              {fit.valid ? <line x1="0" y1={100 - lineStartY} x2="100" y2={100 - lineEndY} stroke="rgba(129,140,248,0.86)" strokeWidth="1.2" strokeDasharray="3 2" vectorEffect="non-scaling-stroke" /> : null}
            </svg>
          </div>
          <div className="mt-2 flex justify-between font-mono text-[7px] uppercase tracking-[0.08em] text-slate-700"><span>x predictor</span><span>click anywhere to add a point</span><span>y response</span></div>
        </div>

        <aside className="rounded-[18px] border border-white/[0.07] bg-black/[0.13] p-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-slate-600">Fitted line</div>
          {fit.valid ? (
            <>
              <div className="mt-3 font-mono text-[13px] text-violet-100/78">ŷ = {fit.slope.toFixed(2)}x {fit.intercept >= 0 ? "+" : "−"} {Math.abs(fit.intercept).toFixed(1)}</div>
              <Metric label="Slope" value={fit.slope.toFixed(3)} note="predicted y change per +1 x" />
              <Metric label="R²" value={fit.rSquared.toFixed(3)} note="fraction of y variance explained by this linear fit in-sample" />
            </>
          ) : (
            <div className="mt-3 rounded-[14px] border border-amber-200/[0.10] bg-amber-200/[0.025] p-3 text-[10px] leading-5 text-amber-100/60">Add at least two points with different x-values to fit a line.</div>
          )}
          <p className="mt-4 border-t border-white/[0.055] pt-3 text-[9px] leading-4 text-slate-700">A fitted line summarizes association. It does not, by itself, establish causation or guarantee predictions will generalize beyond the observed data.</p>
        </aside>
      </div>
    </section>
  );
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="mt-4 border-b border-white/[0.05] pb-3 last:border-b-0"><div className="font-mono text-[7px] uppercase tracking-[0.1em] text-slate-700">{label}</div><strong className="mt-1 block font-mono text-[16px] text-violet-100/78">{value}</strong><span className="mt-1 block text-[8px] leading-4 text-slate-600">{note}</span></div>;
}
