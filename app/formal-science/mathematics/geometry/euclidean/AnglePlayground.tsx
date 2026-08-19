"use client";

import { useMemo, useRef, useState } from "react";
import { Move } from "lucide-react";

type Point = { x: number; y: number };

const INITIAL_POINTS: Point[] = [
  { x: 50, y: 18 },
  { x: 18, y: 82 },
  { x: 82, y: 82 },
];

function distance(left: Point, right: Point) {
  return Math.hypot(left.x - right.x, left.y - right.y);
}

function safeAcos(value: number) {
  return Math.acos(Math.max(-1, Math.min(1, value)));
}

function calculateAngles(points: readonly Point[]): number[] | null {
  const a = distance(points[1], points[2]);
  const b = distance(points[0], points[2]);
  const c = distance(points[0], points[1]);
  if (Math.min(a, b, c) < 0.75) return null;

  const areaTwice = Math.abs(
    points[0].x * (points[1].y - points[2].y) +
      points[1].x * (points[2].y - points[0].y) +
      points[2].x * (points[0].y - points[1].y),
  );
  if (areaTwice < 1) return null;

  const angleA = safeAcos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
  const angleB = safeAcos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
  const angleC = 180 - angleA - angleB;
  return [angleA, angleB, angleC];
}

export default function AnglePlayground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>(INITIAL_POINTS);
  const [dragging, setDragging] = useState<number | null>(null);
  const angles = useMemo(() => calculateAngles(points), [points]);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragging === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const next = {
      x: Math.max(5, Math.min(95, ((event.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(5, Math.min(95, ((event.clientY - rect.top) / rect.height) * 100)),
    };
    setPoints((current) => current.map((point, index) => (index === dragging ? next : point)));
  };

  const reset = () => {
    setPoints(INITIAL_POINTS);
    setDragging(null);
  };

  return (
    <section className="overflow-hidden rounded-[26px] border border-sky-200/[0.12] bg-[#07152d]/72 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-3.5 sm:px-5">
        <div>
          <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-sky-200/66">Triangle angle inspector</div>
          <div className="mt-1 text-[10px] text-slate-500">Drag any vertex. Nondegenerate Euclidean triangles keep the same total angle sum.</div>
        </div>
        <button type="button" onClick={reset} className="rounded-full border border-white/[0.08] bg-white/[0.018] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-slate-500 transition hover:bg-white/[0.04] hover:text-slate-300">reset triangle</button>
      </div>

      <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-stretch">
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={() => setDragging(null)}
          onPointerCancel={() => setDragging(null)}
          onPointerLeave={() => setDragging(null)}
          className="relative min-h-[330px] overflow-hidden rounded-[20px] border border-white/[0.07] bg-[#061126] touch-none"
        >
          <div className="pointer-events-none absolute inset-0 opacity-[0.22] [background-image:linear-gradient(rgba(125,211,252,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.12)_1px,transparent_1px)] [background-size:24px_24px]" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points={points.map((point) => `${point.x},${point.y}`).join(" ")} fill="rgba(56,189,248,0.08)" stroke="rgba(125,211,252,0.80)" strokeWidth="0.65" vectorEffect="non-scaling-stroke" />
          </svg>

          {points.map((point, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Move vertex ${String.fromCharCode(65 + index)}`}
              onPointerDown={(event) => {
                event.currentTarget.setPointerCapture(event.pointerId);
                setDragging(index);
              }}
              className="absolute z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 cursor-move items-center justify-center rounded-full border border-sky-200/50 bg-sky-500 text-[10px] font-bold text-white shadow-[0_0_24px_rgba(56,189,248,0.22)] transition hover:scale-110"
              style={{ left: `${point.x}%`, top: `${point.y}%` }}
            >
              {String.fromCharCode(65 + index)}
            </button>
          ))}

          {angles?.map((angle, index) => {
            const point = points[index];
            return (
              <span key={index} className="pointer-events-none absolute z-10 rounded-md bg-black/55 px-1.5 py-0.5 font-mono text-[9px] text-sky-100/80" style={{ left: `${Math.min(90, Math.max(7, point.x + (index === 1 ? -8 : 3)))}%`, top: `${Math.min(90, Math.max(7, point.y + (index === 0 ? -8 : 5)))}%` }}>
                {angle.toFixed(1)}°
              </span>
            );
          })}
        </div>

        <aside className="flex flex-col rounded-[20px] border border-white/[0.07] bg-black/[0.13] p-4">
          <div className="font-mono text-[8px] font-semibold uppercase tracking-[0.13em] text-slate-600">Angle readout</div>
          {angles ? (
            <>
              <div className="mt-4 space-y-2">
                {angles.map((angle, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-white/[0.05] pb-2"><span className="font-mono text-[9px] text-slate-500">∠{String.fromCharCode(65 + index)}</span><strong className="font-mono text-[12px] text-sky-100/82">{angle.toFixed(1)}°</strong></div>
                ))}
              </div>
              <div className="mt-4 rounded-[14px] border border-sky-200/[0.13] bg-sky-200/[0.025] p-3"><div className="font-mono text-[8px] uppercase tracking-[0.1em] text-sky-200/52">sum</div><strong className="mt-1 block text-[22px] font-semibold tracking-[-0.04em] text-white">180°</strong></div>
              <p className="mt-4 text-[10px] leading-5 text-slate-600">The individual angles change as you drag, but the sum remains 180° for every nondegenerate triangle in Euclidean space.</p>
            </>
          ) : (
            <div className="mt-4 rounded-[14px] border border-amber-200/[0.12] bg-amber-200/[0.025] p-3 text-[10px] leading-5 text-amber-100/60">The triangle is too close to degenerate for a stable angle readout. Separate the vertices.</div>
          )}
          <div className="mt-auto flex items-center gap-2 border-t border-white/[0.05] pt-3 font-mono text-[8px] uppercase tracking-[0.09em] text-slate-700"><Move size={11} /> continuous drag</div>
        </aside>
      </div>
    </section>
  );
}
