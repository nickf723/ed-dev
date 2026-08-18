"use client";

import { useMemo, useState } from "react";
import { Crosshair, RefreshCw, ScatterChart, StepForward } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type Point = {
  id: number;
  x: number;
  y: number;
  cluster: number | null;
};

type Centroid = {
  x: number;
  y: number;
};

const COLORS = ["34,211,238", "167,139,250", "251,191,36", "244,114,182"] as const;
const INITIAL_CENTROIDS: readonly Centroid[] = [
  { x: 18, y: 24 },
  { x: 79, y: 24 },
  { x: 46, y: 78 },
  { x: 81, y: 72 },
] as const;

const BASE_POINTS: readonly Point[] = Array.from({ length: 72 }, (_, index) => {
  const source = index % 3;
  const center = source === 0 ? { x: 26, y: 30 } : source === 1 ? { x: 67, y: 31 } : { x: 50, y: 70 };
  const dx = ((((index * 37) % 29) - 14) / 14) * (source === 2 ? 12 : 14);
  const dy = ((((index * 53 + 7) % 31) - 15) / 15) * (source === 1 ? 12 : 14);
  return {
    id: index,
    x: clamp(center.x + dx, 6, 94),
    y: clamp(center.y + dy, 6, 94),
    cluster: null,
  };
});

export default function KMeansLab() {
  const [k, setK] = useState(3);
  const [points, setPoints] = useState<Point[]>(() => BASE_POINTS.map((point) => ({ ...point })));
  const [centroids, setCentroids] = useState<Centroid[]>(() => INITIAL_CENTROIDS.slice(0, 3).map((centroid) => ({ ...centroid })));
  const [iterations, setIterations] = useState(0);
  const assigned = points.some((point) => point.cluster !== null);

  const objective = useMemo(() => {
    if (!assigned) return null;
    return points.reduce((sum, point) => {
      if (point.cluster === null) return sum;
      const centroid = centroids[point.cluster];
      if (!centroid) return sum;
      return sum + squaredDistance(point, centroid);
    }, 0);
  }, [assigned, centroids, points]);

  function reset(nextK = k) {
    setPoints(BASE_POINTS.map((point) => ({ ...point, cluster: null })));
    setCentroids(INITIAL_CENTROIDS.slice(0, nextK).map((centroid) => ({ ...centroid })));
    setIterations(0);
  }

  function assign() {
    setPoints((current) => assignPoints(current, centroids));
  }

  function recenter() {
    if (!assigned) {
      setPoints((current) => assignPoints(current, centroids));
      return;
    }
    const nextCentroids = updateCentroids(points, centroids);
    setCentroids(nextCentroids);
    setPoints((current) => assignPoints(current, nextCentroids));
    setIterations((value) => value + 1);
  }

  function fullIteration() {
    const assignedPoints = assignPoints(points, centroids);
    const nextCentroids = updateCentroids(assignedPoints, centroids);
    setCentroids(nextCentroids);
    setPoints(assignPoints(assignedPoints, nextCentroids));
    setIterations((value) => value + 1);
  }

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[32px] border-cyan-100/[0.12]"
      style={{ background: "rgba(3,10,16,0.34)" }}
    >
      <div className="grid border-b border-white/[0.08] lg:grid-cols-[minmax(0,1fr)_370px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-cyan-200/66">
            <ScatterChart size={14} /> K-means laboratory · unsupervised partitioning
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3.3vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.048em] text-white">
            How does alternating assignment and recentering create a partition from unlabeled coordinates?
          </h2>
          <p className="mt-3 max-w-4xl text-[14px] leading-6 text-slate-300/70">
            Choose <em>k</em>, assign each point to its nearest centroid, then move every centroid to the mean of its assigned points. Repeating those two steps reduces the within-cluster squared-distance objective until the assignments stabilize at a local solution.
          </p>
        </div>
        <div className="border-t border-white/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/58">Model boundary</div>
          <p className="mt-3 text-[13px] leading-6 text-slate-300/64">
            K-means does not discover a uniquely true set of categories. Results depend on <em>k</em>, initialization, feature scaling, outliers, and the geometry of the data. It works best when squared Euclidean distance and roughly compact clusters are meaningful for the problem.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_350px]">
        <div className="border-b border-white/[0.08] p-4 sm:p-5 xl:border-b-0 xl:border-r">
          <div className="relative min-h-[360px] overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#020b11]/68 shadow-[inset_0_0_90px_rgba(0,0,0,0.26)] backdrop-blur-[8px]">
            <div className="absolute inset-[8%] border-b border-l border-slate-200/[0.12]">
              {points.map((point) => {
                const rgb = point.cluster === null ? "148,163,184" : COLORS[point.cluster];
                return (
                  <span
                    key={point.id}
                    className="absolute h-2.5 w-2.5 -translate-x-1/2 translate-y-1/2 rounded-full border transition-[left,bottom,background-color,border-color,opacity] duration-500"
                    style={{
                      left: `${point.x}%`,
                      bottom: `${point.y}%`,
                      background: `rgba(${rgb},${point.cluster === null ? 0.22 : 0.52})`,
                      borderColor: `rgba(${rgb},${point.cluster === null ? 0.34 : 0.74})`,
                      boxShadow: point.cluster === null ? undefined : `0 0 10px rgba(${rgb},0.12)`,
                    }}
                  />
                );
              })}
              {centroids.map((centroid, index) => {
                const rgb = COLORS[index];
                return (
                  <span
                    key={index}
                    className="absolute h-8 w-8 -translate-x-1/2 translate-y-1/2 transition-[left,bottom] duration-700"
                    style={{ left: `${centroid.x}%`, bottom: `${centroid.y}%` }}
                  >
                    <span className="absolute inset-0 rounded-full border" style={{ borderColor: `rgba(${rgb},0.70)`, boxShadow: `0 0 22px rgba(${rgb},0.18)` }} />
                    <span className="absolute left-1/2 top-1/2 h-px w-5 -translate-x-1/2 -translate-y-1/2" style={{ background: `rgba(${rgb},0.90)` }} />
                    <span className="absolute left-1/2 top-1/2 h-5 w-px -translate-x-1/2 -translate-y-1/2" style={{ background: `rgba(${rgb},0.90)` }} />
                  </span>
                );
              })}
            </div>
            <div className="absolute bottom-2 right-4 font-mono text-[11px] uppercase tracking-[0.07em] text-slate-600">x₁ → · x₂ ↑</div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Readout label="Clusters requested" value={`k = ${k}`} note="chosen before fitting" rgb="34,211,238" />
            <Readout label="Completed iterations" value={String(iterations)} note="assign + recenter cycles" rgb="167,139,250" />
            <Readout label="Within-cluster SSE" value={objective === null ? "unassigned" : Math.round(objective).toLocaleString()} note="lower for this fixed k is the fitting objective" rgb="251,191,36" />
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">Choose k</div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[2, 3, 4].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => {
                  setK(value);
                  reset(value);
                }}
                className="rounded-[14px] border px-3 py-3 font-mono text-[13px] font-semibold transition"
                style={{
                  color: value === k ? "rgb(165,243,252)" : "rgba(148,163,184,0.62)",
                  borderColor: value === k ? "rgba(34,211,238,0.34)" : "rgba(255,255,255,0.07)",
                  background: value === k ? "rgba(34,211,238,0.065)" : "rgba(0,0,0,0.08)",
                }}
              >
                k = {value}
              </button>
            ))}
          </div>

          <div className="mt-4 grid gap-2">
            <button type="button" onClick={assign} className="flex items-center justify-between rounded-[15px] border border-cyan-200/[0.18] bg-cyan-200/[0.045] px-4 py-3 text-left text-[13px] font-semibold text-cyan-100/84 transition hover:bg-cyan-200/[0.075]">
              <span className="flex items-center gap-2"><Crosshair size={15} /> Assign nearest centroid</span><span className="font-mono text-[11px] text-cyan-200/44">A</span>
            </button>
            <button type="button" onClick={recenter} className="flex items-center justify-between rounded-[15px] border border-violet-200/[0.18] bg-violet-200/[0.045] px-4 py-3 text-left text-[13px] font-semibold text-violet-100/84 transition hover:bg-violet-200/[0.075]">
              <span className="flex items-center gap-2"><RefreshCw size={15} /> Recenter means</span><span className="font-mono text-[11px] text-violet-200/44">B</span>
            </button>
            <button type="button" onClick={fullIteration} className="flex items-center justify-between rounded-[15px] border border-amber-200/[0.18] bg-amber-200/[0.045] px-4 py-3 text-left text-[13px] font-semibold text-amber-100/84 transition hover:bg-amber-200/[0.075]">
              <span className="flex items-center gap-2"><StepForward size={15} /> Run one full iteration</span><span className="font-mono text-[11px] text-amber-200/44">A + B</span>
            </button>
          </div>

          <button type="button" onClick={() => reset()} className="mt-3 w-full border-t border-white/[0.08] pt-3 text-left font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500 transition hover:text-slate-300">Reset deterministic sample</button>

          <div className="mt-5 border-l border-cyan-200/20 pl-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-cyan-200/48">What to watch</div>
            <p className="mt-2 text-[12px] leading-5 text-slate-400/68">
              With <em>k = 3</em>, the toy sample contains three compact spatial clouds, so the chosen geometry is favorable to K-means. Try <em>k = 2</em> or <em>k = 4</em> to see that the algorithm will still produce a partition even when that partition does not match the sample's generating structure.
            </p>
          </div>
        </div>
      </div>
    </Surface>
  );
}

function assignPoints(points: readonly Point[], centroids: readonly Centroid[]): Point[] {
  return points.map((point) => {
    let best = 0;
    let bestDistance = Number.POSITIVE_INFINITY;
    centroids.forEach((centroid, index) => {
      const distance = squaredDistance(point, centroid);
      if (distance < bestDistance) {
        best = index;
        bestDistance = distance;
      }
    });
    return { ...point, cluster: best };
  });
}

function updateCentroids(points: readonly Point[], previous: readonly Centroid[]): Centroid[] {
  return previous.map((centroid, index) => {
    const assigned = points.filter((point) => point.cluster === index);
    if (assigned.length === 0) return { ...centroid };
    return {
      x: assigned.reduce((sum, point) => sum + point.x, 0) / assigned.length,
      y: assigned.reduce((sum, point) => sum + point.y, 0) / assigned.length,
    };
  });
}

function squaredDistance(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return dx * dx + dy * dy;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function Readout({ label, value, note, rgb }: { label: string; value: string; note: string; rgb: string }) {
  return (
    <div className="border-l px-3 py-2" style={{ borderColor: `rgba(${rgb},0.30)` }}>
      <div className="font-mono text-[11px] uppercase tracking-[0.07em] text-slate-500">{label}</div>
      <strong className="mt-1 block text-[18px] text-white">{value}</strong>
      <span className="mt-1 block text-[11px] leading-4 text-slate-600">{note}</span>
    </div>
  );
}
