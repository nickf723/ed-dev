"use client";

export type PlaneRelation = "<" | "≤" | ">" | "≥";

export type PlaneConstraint = {
  m: number;
  b: number;
  relation: PlaneRelation;
  rgb: string;
  label: string;
};

type Point = { x: number; y: number };

type Props = {
  constraints: readonly PlaneConstraint[];
  showOverlap?: boolean;
  marker?: Point & { valid: boolean; label?: string };
  ariaLabel: string;
};

const MIN = -6;
const MAX = 6;
const SIZE = 360;
const SCALE = SIZE / (MAX - MIN);

const xFor = (x: number) => (x - MIN) * SCALE;
const yFor = (y: number) => (MAX - y) * SCALE;

export default function InequalityPlane({ constraints, showOverlap = false, marker, ariaLabel }: Props) {
  const overlap = constraints.reduce<Point[]>((polygon, constraint) => clipPolygon(polygon, constraint), graphRectangle());
  const shouldShade = showOverlap || constraints.length > 1 || marker !== undefined;

  return (
    <div className="relative overflow-hidden rounded-[22px] border border-white/[0.07] bg-[#050817]/88 p-3">
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

        {shouldShade
          ? constraints.map((constraint, index) => {
              const region = clipPolygon(graphRectangle(), constraint);
              return region.length >= 3 ? (
                <polygon
                  key={`shade-${index}`}
                  points={region.map((point) => `${xFor(point.x)},${yFor(point.y)}`).join(" ")}
                  fill={`rgba(${constraint.rgb},${showOverlap ? 0.08 : 0.14})`}
                />
              ) : null;
            })
          : null}

        {showOverlap && overlap.length >= 3 ? (
          <polygon
            points={overlap.map((point) => `${xFor(point.x)},${yFor(point.y)}`).join(" ")}
            fill="rgba(167,139,250,0.24)"
            stroke="rgba(196,181,253,0.42)"
            strokeWidth="1.2"
          />
        ) : null}

        {constraints.map((constraint, index) => {
          const y1 = constraint.m * MIN + constraint.b;
          const y2 = constraint.m * MAX + constraint.b;
          const inclusive = constraint.relation === "≤" || constraint.relation === "≥";
          return (
            <line
              key={`line-${index}`}
              x1={xFor(MIN)}
              y1={yFor(y1)}
              x2={xFor(MAX)}
              y2={yFor(y2)}
              stroke={`rgb(${constraint.rgb})`}
              strokeWidth="3"
              strokeDasharray={inclusive ? undefined : "7 6"}
              strokeLinecap="round"
            />
          );
        })}

        {marker ? (
          <g>
            <circle cx={xFor(marker.x)} cy={yFor(marker.y)} r="8" fill={marker.valid ? "rgba(52,211,153,0.18)" : "rgba(251,113,133,0.18)"} />
            <circle cx={xFor(marker.x)} cy={yFor(marker.y)} r="4.5" fill={marker.valid ? "rgb(52,211,153)" : "rgb(251,113,133)"} />
          </g>
        ) : null}
      </svg>

      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1.5 rounded-xl border border-white/[0.06] bg-black/55 px-3 py-2 backdrop-blur-md">
        {constraints.map((constraint) => (
          <span key={constraint.label} className="text-[9px] font-semibold" style={{ color: `rgb(${constraint.rgb})` }}>
            {constraint.label}: y {constraint.relation} {formatLine(constraint.m, constraint.b)}
          </span>
        ))}
      </div>

      {marker?.label ? (
        <div className={`pointer-events-none absolute bottom-4 right-4 rounded-lg border px-2.5 py-1.5 font-mono text-[10px] backdrop-blur-md ${marker.valid ? "border-emerald-300/[0.12] bg-black/60 text-emerald-200" : "border-rose-300/[0.12] bg-black/60 text-rose-200"}`}>
          {marker.label}
        </div>
      ) : null}
    </div>
  );
}

export function satisfiesPlane(point: Point, constraint: PlaneConstraint) {
  const boundary = constraint.m * point.x + constraint.b;
  if (constraint.relation === "<") return point.y < boundary;
  if (constraint.relation === "≤") return point.y <= boundary;
  if (constraint.relation === ">") return point.y > boundary;
  return point.y >= boundary;
}

function graphRectangle(): Point[] {
  return [
    { x: MIN, y: MIN },
    { x: MAX, y: MIN },
    { x: MAX, y: MAX },
    { x: MIN, y: MAX },
  ];
}

function signedDistance(point: Point, constraint: PlaneConstraint) {
  return point.y - (constraint.m * point.x + constraint.b);
}

function inside(point: Point, constraint: PlaneConstraint) {
  const distance = signedDistance(point, constraint);
  return constraint.relation === ">" || constraint.relation === "≥" ? distance >= 0 : distance <= 0;
}

function clipPolygon(polygon: Point[], constraint: PlaneConstraint): Point[] {
  if (polygon.length === 0) return [];
  const result: Point[] = [];

  for (let index = 0; index < polygon.length; index += 1) {
    const current = polygon[index];
    const next = polygon[(index + 1) % polygon.length];
    const currentInside = inside(current, constraint);
    const nextInside = inside(next, constraint);

    if (currentInside) result.push(current);

    if (currentInside !== nextInside) {
      const currentDistance = signedDistance(current, constraint);
      const nextDistance = signedDistance(next, constraint);
      const denominator = currentDistance - nextDistance;
      if (Math.abs(denominator) > 1e-9) {
        const t = currentDistance / denominator;
        result.push({
          x: current.x + (next.x - current.x) * t,
          y: current.y + (next.y - current.y) * t,
        });
      }
    }
  }

  return result;
}

function formatLine(m: number, b: number) {
  const slope = m === 0 ? "" : m === 1 ? "x" : m === -1 ? "−x" : `${formatNumber(m)}x`;
  if (m === 0) return formatNumber(b);
  if (b === 0) return slope;
  return `${slope} ${b > 0 ? "+" : "−"} ${formatNumber(Math.abs(b))}`;
}

function formatNumber(value: number) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}
