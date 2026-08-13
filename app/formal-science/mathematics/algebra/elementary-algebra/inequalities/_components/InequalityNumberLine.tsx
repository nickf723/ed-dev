"use client";

type Relation = "<" | "≤" | ">" | "≥";

type Region = {
  boundary: number;
  relation: Relation;
  rgb: string;
};

type Marker = {
  value: number;
  valid: boolean;
  label?: string;
};

type Props = {
  regions: readonly Region[];
  marker?: Marker;
  mode?: "single" | "intersection" | "union";
  min?: number;
  max?: number;
};

export default function InequalityNumberLine({
  regions,
  marker,
  mode = "single",
  min = -10,
  max = 10,
}: Props) {
  const width = 760;
  const height = 180;
  const left = 38;
  const right = width - 38;
  const y = 92;
  const span = max - min;
  const xFor = (value: number) => left + ((value - min) / span) * (right - left);

  const intervalSegments = buildSegments(regions, mode, min, max);

  return (
    <div className="overflow-hidden rounded-[22px] border border-white/[0.07] bg-black/[0.14] p-3">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full" role="img" aria-label="Number-line inequality region">
        <line x1={left} y1={y} x2={right} y2={y} stroke="rgba(226,232,240,0.34)" strokeWidth="2" />

        {Array.from({ length: span + 1 }, (_, index) => min + index).map((value) => {
          const x = xFor(value);
          const major = value % 2 === 0;
          return (
            <g key={value}>
              <line x1={x} y1={y - (major ? 10 : 6)} x2={x} y2={y + (major ? 10 : 6)} stroke="rgba(148,163,184,0.34)" strokeWidth="1" />
              {major ? (
                <text x={x} y={y + 28} textAnchor="middle" fill="rgba(148,163,184,0.58)" fontSize="10">
                  {value}
                </text>
              ) : null}
            </g>
          );
        })}

        {intervalSegments.map((segment, index) => {
          const startX = xFor(segment.start);
          const endX = xFor(segment.end);
          return (
            <g key={`${segment.start}-${segment.end}-${index}`}>
              <line
                x1={startX}
                y1={y}
                x2={endX}
                y2={y}
                stroke={`rgb(${segment.rgb})`}
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.76"
              />
            </g>
          );
        })}

        {regions.map((region, index) => {
          const x = xFor(region.boundary);
          const inclusive = region.relation === "≤" || region.relation === "≥";
          return (
            <g key={`${region.boundary}-${region.relation}-${index}`}>
              <circle cx={x} cy={y} r="9" fill={inclusive ? `rgb(${region.rgb})` : "#07101e"} stroke={`rgb(${region.rgb})`} strokeWidth="3" />
            </g>
          );
        })}

        {marker ? (
          <g>
            <line x1={xFor(marker.value)} y1={42} x2={xFor(marker.value)} y2={y - 14} stroke={marker.valid ? "rgb(52,211,153)" : "rgb(251,113,133)"} strokeWidth="2" strokeDasharray="4 4" />
            <circle cx={xFor(marker.value)} cy={42} r="7" fill={marker.valid ? "rgb(52,211,153)" : "rgb(251,113,133)"} />
            <text x={xFor(marker.value)} y={26} textAnchor="middle" fill={marker.valid ? "rgb(167,243,208)" : "rgb(254,202,202)"} fontSize="11" fontFamily="monospace">
              {marker.label ?? marker.value}
            </text>
          </g>
        ) : null}
      </svg>
    </div>
  );
}

function buildSegments(regions: readonly Region[], mode: "single" | "intersection" | "union", min: number, max: number) {
  const samples = Array.from({ length: 400 }, (_, index) => min + ((max - min) * index) / 399);
  const valid = samples.map((value) => ({
    value,
    ok:
      mode === "union"
        ? regions.some((region) => compare(value, region.boundary, region.relation))
        : regions.every((region) => compare(value, region.boundary, region.relation)),
  }));

  const segments: { start: number; end: number; rgb: string }[] = [];
  let currentStart: number | null = null;
  valid.forEach((sample, index) => {
    if (sample.ok && currentStart === null) currentStart = sample.value;
    const ends = currentStart !== null && (!sample.ok || index === valid.length - 1);
    if (ends) {
      const endValue = sample.ok ? sample.value : valid[Math.max(0, index - 1)].value;
      segments.push({ start: currentStart as number, end: endValue, rgb: regions[0]?.rgb ?? "56, 189, 248" });
      currentStart = null;
    }
  });
  return segments;
}

export function compare(value: number, boundary: number, relation: Relation) {
  if (relation === "<") return value < boundary;
  if (relation === "≤") return value <= boundary;
  if (relation === ">") return value > boundary;
  return value >= boundary;
}

export type { Relation };
