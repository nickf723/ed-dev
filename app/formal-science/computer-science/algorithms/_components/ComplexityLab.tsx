"use client";

import { useMemo, useState } from "react";
import { BarChart3, Gauge, ScanLine } from "lucide-react";
import {
  GROWTH_OPTIONS,
  formatCount,
  growthOption,
  type GrowthKind,
} from "./algorithm-model";

const MAX_N = 64;
const MAX_OPERATIONS = MAX_N * MAX_N;

export default function ComplexityLab() {
  const [n, setN] = useState(32);
  const [selected, setSelected] = useState<GrowthKind>("quadratic");
  const selectedOption = growthOption(selected);
  const counts = useMemo(
    () => GROWTH_OPTIONS.map((option) => ({ ...option, operations: option.count(n) })),
    [n],
  );
  const nlogn = growthOption("nlogn").count(n);
  const quadratic = growthOption("quadratic").count(n);
  const separation = quadratic / Math.max(1, nlogn);

  return (
    <section className="overflow-hidden rounded-[34px] border border-violet-100/[0.14] bg-[#0a0712]/82 shadow-[0_30px_110px_rgba(0,0,0,0.27)] backdrop-blur-xl">
      <div className="grid border-b border-violet-100/[0.10] lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-violet-200/72">
            <BarChart3 size={14} /> Widget 03 · complexity observatory
          </div>
          <h2 className="mt-2 text-[clamp(1.8rem,3vw,3rem)] font-semibold tracking-[-0.045em] text-white">
            A linear axis lets absolute growth separate honestly.
          </h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/68">
            The vertical axis below is a direct toy operation count, not a logarithmic transformation. Smaller families will hug the baseline when quadratic growth dominates, which is precisely the relationship the chart is meant to reveal.
          </p>
        </div>
        <div className="border-t border-violet-100/[0.09] bg-violet-300/[0.025] p-5 lg:border-l lg:border-t-0">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-amber-200/66">
            <ScanLine size={13} /> Separation at n = {n}
          </div>
          <div className="mt-3 font-mono text-[clamp(1.8rem,3vw,2.7rem)] font-semibold text-white">
            {separation.toFixed(1)}×
          </div>
          <p className="mt-2 text-[13px] leading-5 text-slate-300/68">
            O(n²) performs about {separation.toFixed(1)} times as many toy operations as O(n log n) at this input size.
          </p>
        </div>
      </div>

      <div className="grid xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="border-b border-violet-100/[0.09] p-4 xl:border-b-0 xl:border-r sm:p-5">
          <div className="relative min-h-[330px] overflow-hidden rounded-[22px] border border-violet-100/[0.08] bg-[#05040a]/86 p-3">
            <LinearGrowthChart n={n} selected={selected} />
          </div>
          <div className="mt-3 rounded-[15px] border border-white/[0.08] bg-black/[0.16] px-4 py-3 text-[12px] leading-5 text-slate-400/72">
            <strong className="text-violet-100">Reading the baseline:</strong> O(1), O(log n), and O(n) remain small relative to 4,096. Exact values stay visible in the comparison ledger rather than being visually exaggerated by a transformed axis.
          </div>
        </div>

        <div className="bg-[#0d0917]/70 p-4 sm:p-5">
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-cyan-200/68">
            <Gauge size={14} /> Input and family
          </div>
          <label className="mt-4 block rounded-[15px] border border-white/[0.08] bg-black/[0.18] p-3">
            <span className="flex items-center justify-between gap-3 text-[12px] text-slate-300">
              <span>Input size</span>
              <strong className="font-mono text-cyan-100">n = {n}</strong>
            </span>
            <input
              type="range"
              min="2"
              max={MAX_N}
              value={n}
              onChange={(event) => setN(Number(event.target.value))}
              className="mt-3 w-full accent-cyan-400"
            />
          </label>

          <div className="mt-3 space-y-2">
            {counts.map((item) => {
              const active = selected === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelected(item.id)}
                  className="grid min-h-[48px] w-full grid-cols-[minmax(0,1fr)_72px_92px] items-center gap-3 rounded-[13px] border px-3 text-left transition"
                  style={{
                    borderColor: active
                      ? `rgba(${item.rgb},0.34)`
                      : "rgba(255,255,255,0.07)",
                    background: active
                      ? `rgba(${item.rgb},0.065)`
                      : "rgba(0,0,0,0.15)",
                  }}
                >
                  <span className="text-[12px] font-medium text-slate-300">
                    {item.label}
                  </span>
                  <strong
                    className="font-mono text-[12px]"
                    style={{ color: `rgb(${item.rgb})` }}
                  >
                    {item.notation}
                  </strong>
                  <span className="text-right font-mono text-[12px] text-slate-400">
                    {formatCount(item.operations)}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-[15px] border border-violet-200/[0.11] bg-violet-300/[0.035] p-3">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/66">
              Selected family
            </div>
            <div className="mt-2 flex items-end justify-between gap-3">
              <strong
                className="font-mono text-[22px]"
                style={{ color: `rgb(${selectedOption.rgb})` }}
              >
                {selectedOption.notation}
              </strong>
              <span className="font-mono text-[13px] text-white">
                {formatCount(selectedOption.count(n))} operations
              </span>
            </div>
            <p className="mt-2 text-[12px] leading-5 text-slate-300/66">
              Big O describes a family of growth under a stated input and operation model. It is not an exact stopwatch prediction.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function LinearGrowthChart({
  n,
  selected,
}: {
  n: number;
  selected: GrowthKind;
}) {
  const width = 720;
  const height = 330;
  const padding = { left: 66, right: 26, top: 24, bottom: 44 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const x = (value: number) =>
    padding.left + ((value - 2) / (MAX_N - 2)) * plotWidth;
  const y = (value: number) =>
    padding.top + plotHeight - (value / MAX_OPERATIONS) * plotHeight;
  const yTicks = [0, 1024, 2048, 3072, 4096];
  const xTicks = [2, 16, 32, 48, 64];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="absolute inset-0 h-full w-full"
      role="img"
      aria-label="Linear-scale comparison of algorithm growth rates"
    >
      {yTicks.map((tick) => (
        <g key={tick}>
          <line
            x1={padding.left}
            y1={y(tick)}
            x2={width - padding.right}
            y2={y(tick)}
            stroke="rgba(148,163,184,0.10)"
          />
          <text
            x={padding.left - 10}
            y={y(tick) + 4}
            textAnchor="end"
            fill="#64748b"
            fontSize="11"
          >
            {tick.toLocaleString()}
          </text>
        </g>
      ))}
      {xTicks.map((tick) => (
        <g key={tick}>
          <line
            x1={x(tick)}
            y1={padding.top}
            x2={x(tick)}
            y2={height - padding.bottom}
            stroke="rgba(148,163,184,0.06)"
          />
          <text
            x={x(tick)}
            y={height - 20}
            textAnchor="middle"
            fill="#64748b"
            fontSize="11"
          >
            {tick}
          </text>
        </g>
      ))}
      <line
        x1={padding.left}
        y1={height - padding.bottom}
        x2={width - padding.right}
        y2={height - padding.bottom}
        stroke="rgba(148,163,184,0.34)"
      />
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={height - padding.bottom}
        stroke="rgba(148,163,184,0.34)"
      />

      {GROWTH_OPTIONS.map((option) => {
        const points = Array.from({ length: 63 }, (_, index) => {
          const input = index + 2;
          return `${x(input)},${y(option.count(input))}`;
        }).join(" ");
        const active = option.id === selected;
        return (
          <polyline
            key={option.id}
            points={points}
            fill="none"
            stroke={`rgb(${option.rgb})`}
            strokeWidth={active ? 4 : 2}
            opacity={active ? 0.98 : 0.46}
          />
        );
      })}

      <line
        x1={x(n)}
        y1={padding.top}
        x2={x(n)}
        y2={height - padding.bottom}
        stroke="rgba(250,204,21,0.46)"
        strokeDasharray="5 6"
      />
      {GROWTH_OPTIONS.map((option) => (
        <circle
          key={option.id}
          cx={x(n)}
          cy={y(option.count(n))}
          r={option.id === selected ? 6 : 3.5}
          fill={`rgb(${option.rgb})`}
          opacity={option.id === selected ? 1 : 0.62}
        />
      ))}

      <text
        x={width - padding.right}
        y={height - 6}
        textAnchor="end"
        fill="#94a3b8"
        fontSize="11"
      >
        input size n
      </text>
      <text
        x={padding.left}
        y={14}
        fill="#94a3b8"
        fontSize="11"
      >
        toy operations · linear scale
      </text>
    </svg>
  );
}
