"use client";

type LineSpec = {
  m: number;
  b: number;
  rgb: string;
  label?: string;
};

type PointSpec = {
  x: number;
  y: number;
  label?: string;
  rgb?: string;
};

type SystemMiniGraphProps = {
  lineA: LineSpec;
  lineB: LineSpec;
  point?: PointSpec | null;
  candidates?: readonly PointSpec[];
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

export default function SystemMiniGraph({
  lineA,
  lineB,
  point,
  candidates = [],
  ariaLabel,
}: SystemMiniGraphProps) {
  const lines = [lineA, lineB] as const;

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#030813]/88 p-3">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="aspect-square w-full" role="img" aria-label={ariaLabel}>
        {Array.from({ length: 13 }, (_, index) => {
          const value = MIN + index;
          const x = xFor(value);
          const y = yFor(value);
          return (
            <g key={value}>
              <line x1={x} y1="0" x2={x} y2={SIZE} stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
              <line x1="0" y1={y} x2={SIZE} y2={y} stroke="rgba(148,163,184,0.10)" strokeWidth="1" />
            </g>
          );
        })}

        <line x1="0" y1={yFor(0)} x2={SIZE} y2={yFor(0)} stroke="rgba(226,232,240,0.34)" strokeWidth="1.4" />
        <line x1={xFor(0)} y1="0" x2={xFor(0)} y2={SIZE} stroke="rgba(226,232,240,0.34)" strokeWidth="1.4" />

        {lines.map((line, index) => {
          const y1 = line.m * MIN + line.b;
          const y2 = line.m * MAX + line.b;
          return (
            <line
              key={`${line.m}-${line.b}-${index}`}
              x1={xFor(MIN)}
              y1={yFor(y1)}
              x2={xFor(MAX)}
              y2={yFor(y2)}
              stroke={`rgb(${line.rgb})`}
              strokeWidth={lineA.m === lineB.m && lineA.b === lineB.b ? 5 : 3}
              opacity={index === 0 ? 0.92 : 0.78}
              strokeLinecap="round"
            />
          );
        })}

        {candidates.map((candidate, index) => (
          <g key={`${candidate.x}-${candidate.y}-${index}`}>
            <circle
              cx={xFor(candidate.x)}
              cy={yFor(candidate.y)}
              r="5"
              fill="#020617"
              stroke={`rgb(${candidate.rgb ?? "251, 191, 36"})`}
              strokeWidth="2"
              opacity="0.8"
            />
          </g>
        ))}

        {point ? (
          <g>
            <circle cx={xFor(point.x)} cy={yFor(point.y)} r="8" fill={`rgba(${point.rgb ?? "52, 211, 153"},0.16)`} />
            <circle cx={xFor(point.x)} cy={yFor(point.y)} r="4.5" fill={`rgb(${point.rgb ?? "52, 211, 153"})`} />
          </g>
        ) : null}
      </svg>

      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1.5 rounded-xl border border-white/[0.06] bg-black/55 px-3 py-2 backdrop-blur-md">
        <span className="text-[9px] font-semibold" style={{ color: `rgb(${lineA.rgb})` }}>
          A: y = {formatLine(lineA.m, lineA.b)}
        </span>
        <span className="text-[9px] font-semibold" style={{ color: `rgb(${lineB.rgb})` }}>
          B: y = {formatLine(lineB.m, lineB.b)}
        </span>
      </div>

      {point?.label ? (
        <div className="pointer-events-none absolute bottom-4 right-4 rounded-lg border border-emerald-300/[0.12] bg-black/60 px-2.5 py-1.5 font-mono text-[10px] text-emerald-200 backdrop-blur-md">
          {point.label}
        </div>
      ) : null}
    </div>
  );
}

function formatLine(m: number, b: number) {
  const slope = m === 1 ? "x" : m === -1 ? "−x" : `${formatNumber(m)}x`;
  if (b === 0) return slope;
  return `${slope} ${b > 0 ? "+" : "−"} ${formatNumber(Math.abs(b))}`;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}
