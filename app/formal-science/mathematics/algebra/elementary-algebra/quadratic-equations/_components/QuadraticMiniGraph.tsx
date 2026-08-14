"use client";

import { useId } from "react";

type GraphPoint = {
  x: number;
  y: number;
  label?: string;
  rgb?: string;
};

type Props = {
  a: number;
  h: number;
  k: number;
  roots?: readonly number[];
  points?: readonly GraphPoint[];
  showAxis?: boolean;
  showVertex?: boolean;
  accentRgb: string;
  secondaryRgb?: string;
  ariaLabel: string;
};

const MIN = -6;
const MAX = 6;
const SIZE = 360;
const SCALE = SIZE / (MAX - MIN);

function xFor(x: number) {
  return (x - MIN) * SCALE;
}

function yFor(y: number) {
  return (MAX - y) * SCALE;
}

export default function QuadraticMiniGraph({
  a,
  h,
  k,
  roots = [],
  points = [],
  showAxis = true,
  showVertex = true,
  accentRgb,
  secondaryRgb = "244, 114, 182",
  ariaLabel,
}: Props) {
  const clipId = `quadratic-graph-${useId().replace(/:/g, "")}`;
  const curve = Array.from({ length: 145 }, (_, index) => {
    const x = MIN + (index / 144) * (MAX - MIN);
    const y = a * (x - h) ** 2 + k;
    return `${index === 0 ? "M" : "L"} ${xFor(x).toFixed(2)} ${yFor(y).toFixed(2)}`;
  }).join(" ");

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#030813]/88 p-3">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="aspect-square w-full" role="img" aria-label={ariaLabel}>
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width={SIZE} height={SIZE} rx="16" />
          </clipPath>
        </defs>

        {Array.from({ length: 13 }, (_, index) => {
          const value = MIN + index;
          return (
            <g key={value}>
              <line x1={xFor(value)} y1="0" x2={xFor(value)} y2={SIZE} stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
              <line x1="0" y1={yFor(value)} x2={SIZE} y2={yFor(value)} stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
            </g>
          );
        })}

        <line x1="0" y1={yFor(0)} x2={SIZE} y2={yFor(0)} stroke="rgba(226,232,240,0.34)" strokeWidth="1.4" />
        <line x1={xFor(0)} y1="0" x2={xFor(0)} y2={SIZE} stroke="rgba(226,232,240,0.34)" strokeWidth="1.4" />

        {showAxis ? (
          <line
            x1={xFor(h)}
            y1="0"
            x2={xFor(h)}
            y2={SIZE}
            stroke={`rgba(${secondaryRgb},0.46)`}
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        ) : null}

        <path
          d={curve}
          fill="none"
          stroke={`rgb(${accentRgb})`}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          clipPath={`url(#${clipId})`}
        />

        {roots.map((root, index) => (
          <g key={`${root}-${index}`}>
            <circle cx={xFor(root)} cy={yFor(0)} r="8" fill={`rgba(${secondaryRgb},0.16)`} />
            <circle cx={xFor(root)} cy={yFor(0)} r="4.5" fill={`rgb(${secondaryRgb})`} />
          </g>
        ))}

        {showVertex ? (
          <g>
            <circle cx={xFor(h)} cy={yFor(k)} r="9" fill={`rgba(${secondaryRgb},0.17)`} />
            <circle cx={xFor(h)} cy={yFor(k)} r="4.7" fill={`rgb(${secondaryRgb})`} />
          </g>
        ) : null}

        {points.map((point, index) => (
          <g key={`${point.x}-${point.y}-${index}`}>
            <circle cx={xFor(point.x)} cy={yFor(point.y)} r="4.5" fill={`rgb(${point.rgb ?? accentRgb})`} />
          </g>
        ))}
      </svg>

      <div className="pointer-events-none absolute left-4 top-4 rounded-xl border border-white/[0.06] bg-black/55 px-3 py-2 font-mono text-[9px] text-slate-400 backdrop-blur-md">
        vertex ({formatNumber(h)}, {formatNumber(k)})
      </div>
      {showAxis ? (
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-lg border border-white/[0.06] bg-black/55 px-2.5 py-1.5 font-mono text-[9px] text-slate-500 backdrop-blur-md">
          axis x = {formatNumber(h)}
        </div>
      ) : null}
    </div>
  );
}

export function formatNumber(value: number) {
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(2)));
}
