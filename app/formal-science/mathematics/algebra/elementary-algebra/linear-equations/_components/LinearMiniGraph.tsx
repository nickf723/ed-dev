"use client";

type Point = { x: number; y: number; label?: string };

type LinearMiniGraphProps = {
  slope?: number;
  intercept?: number;
  verticalX?: number;
  points?: readonly Point[];
  showRiseRun?: boolean;
  showLine?: boolean;
  accentRgb?: string;
  secondaryRgb?: string;
  ariaLabel?: string;
};

const MIN = -6;
const MAX = 6;
const SIZE = 360;
const CENTER = SIZE / 2;
const SCALE = SIZE / (MAX - MIN);

function xFor(x: number) {
  return CENTER + x * SCALE;
}

function yFor(y: number) {
  return CENTER - y * SCALE;
}

export default function LinearMiniGraph({
  slope = 1,
  intercept = 0,
  verticalX,
  points = [],
  showRiseRun = false,
  showLine = true,
  accentRgb = "45, 212, 191",
  secondaryRgb = "244, 114, 182",
  ariaLabel = "Coordinate graph of a linear relationship",
}: LinearMiniGraphProps) {
  const first = points[0];
  const second = points[1];
  const vertical = typeof verticalX === "number";
  const lineStart = vertical
    ? { x: xFor(verticalX), y: 0 }
    : { x: xFor(MIN), y: yFor(slope * MIN + intercept) };
  const lineEnd = vertical
    ? { x: xFor(verticalX), y: SIZE }
    : { x: xFor(MAX), y: yFor(slope * MAX + intercept) };

  return (
    <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[24px] border border-white/[0.07] bg-[#031018]/82 p-4">
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="h-full max-h-[430px] w-full max-w-[430px]" aria-label={ariaLabel} role="img">
        {Array.from({ length: 13 }, (_, index) => {
          const coord = MIN + index;
          const x = xFor(coord);
          const y = yFor(coord);
          return (
            <g key={coord}>
              <line x1={x} y1="0" x2={x} y2={SIZE} stroke={`rgb(${accentRgb})`} strokeWidth="0.7" opacity="0.10" />
              <line x1="0" y1={y} x2={SIZE} y2={y} stroke={`rgb(${accentRgb})`} strokeWidth="0.7" opacity="0.10" />
              {coord !== 0 && coord % 2 === 0 ? (
                <>
                  <text x={x + 3} y={CENTER + 13} fill="#64748b" fontSize="8">{coord}</text>
                  <text x={CENTER + 5} y={y - 4} fill="#64748b" fontSize="8">{coord}</text>
                </>
              ) : null}
            </g>
          );
        })}

        <line x1="0" y1={CENTER} x2={SIZE} y2={CENTER} stroke="#94a3b8" strokeWidth="1.2" opacity="0.52" />
        <line x1={CENTER} y1="0" x2={CENTER} y2={SIZE} stroke="#94a3b8" strokeWidth="1.2" opacity="0.52" />

        {showLine ? (
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke={`rgb(${accentRgb})`}
            strokeWidth="3"
            opacity="0.86"
          />
        ) : null}

        {showRiseRun && first && second && first.x !== second.x ? (
          <g>
            <line
              x1={xFor(first.x)}
              y1={yFor(first.y)}
              x2={xFor(second.x)}
              y2={yFor(first.y)}
              stroke="#fbbf24"
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <line
              x1={xFor(second.x)}
              y1={yFor(first.y)}
              x2={xFor(second.x)}
              y2={yFor(second.y)}
              stroke={`rgb(${secondaryRgb})`}
              strokeWidth="2"
              strokeDasharray="5 4"
            />
            <text
              x={(xFor(first.x) + xFor(second.x)) / 2}
              y={yFor(first.y) - 7}
              textAnchor="middle"
              fill="#fbbf24"
              fontSize="10"
            >
              Δx = {second.x - first.x}
            </text>
            <text
              x={xFor(second.x) + 8}
              y={(yFor(first.y) + yFor(second.y)) / 2}
              fill={`rgb(${secondaryRgb})`}
              fontSize="10"
            >
              Δy = {second.y - first.y}
            </text>
          </g>
        ) : null}

        {points.map((point, index) => (
          <g key={`${point.x}-${point.y}-${index}`}>
            <circle
              cx={xFor(point.x)}
              cy={yFor(point.y)}
              r="5.5"
              fill={index === 0 ? "#f8fafc" : `rgb(${secondaryRgb})`}
              stroke="#020617"
              strokeWidth="2"
            />
            <text
              x={xFor(point.x) + 8}
              y={yFor(point.y) - 8}
              fill="#cbd5e1"
              fontSize="9"
            >
              {point.label ?? `(${point.x}, ${point.y})`}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
