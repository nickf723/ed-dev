import {
  CANONICAL_COUNTING_CASE,
  COUNTING_TOKENS,
  enumerateOutcomes,
  type CountingToken,
} from "./combinatoricsModel";

const ORDERED = enumerateOutcomes(
  CANONICAL_COUNTING_CASE.tokenIds,
  CANONICAL_COUNTING_CASE.k,
  "permutation"
);

const UNORDERED = enumerateOutcomes(
  CANONICAL_COUNTING_CASE.tokenIds,
  CANONICAL_COUNTING_CASE.k,
  "combination"
);

const OUTER_POSITIONS = ringPositions(ORDERED.length, 42);
const INNER_POSITIONS = ringPositions(UNORDERED.length, 27);

function ringPositions(count: number, radius: number) {
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * Math.PI * 2 - Math.PI / 2;
    return {
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
    };
  });
}

export default function CombinatoricsWorld() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_70%_24%,rgba(146,64,14,0.23),transparent_35%),radial-gradient(circle_at_16%_68%,rgba(8,145,178,0.12),transparent_30%),linear-gradient(135deg,#080705_0%,#110c07_48%,#050505_100%)]"
      aria-hidden="true"
    >
      <div className="absolute -right-[19rem] top-[4vh] h-[min(1040px,112vw)] w-[min(1040px,112vw)] opacity-45 sm:-right-[14rem]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <radialGradient id="combo-brass" cx="50%" cy="44%" r="58%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.14" />
              <stop offset="72%" stopColor="#92400e" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#451a03" stopOpacity="0" />
            </radialGradient>
            <filter id="combo-soft-glow">
              <feGaussianBlur stdDeviation="0.42" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="50" cy="50" r="49" fill="url(#combo-brass)" />
          <g className="combo-world-ring combo-world-ring--outer">
            <circle
              cx="50"
              cy="50"
              r="45.5"
              fill="none"
              stroke="rgba(251,191,36,0.2)"
              strokeWidth="0.28"
            />
            <circle
              cx="50"
              cy="50"
              r="40.2"
              fill="none"
              stroke="rgba(251,191,36,0.11)"
              strokeWidth="0.18"
              strokeDasharray="0.8 1.8"
            />
            {ORDERED.map((outcome, index) => (
              <g
                key={outcome.join("")}
                transform={`translate(${OUTER_POSITIONS[index].x} ${OUTER_POSITIONS[index].y})`}
              >
                <circle
                  r="3.45"
                  fill="rgba(18,12,6,0.92)"
                  stroke="rgba(251,191,36,0.34)"
                  strokeWidth="0.25"
                />
                <WorldTokenGlyph tokenId={outcome[0]} x={-1.25} />
                <WorldTokenGlyph tokenId={outcome[1]} x={1.25} />
              </g>
            ))}
          </g>

          <g className="combo-world-ring combo-world-ring--inner">
            <circle
              cx="50"
              cy="50"
              r="31"
              fill="rgba(8,145,178,0.018)"
              stroke="rgba(103,232,249,0.2)"
              strokeWidth="0.24"
            />
            {UNORDERED.map((outcome, index) => (
              <g
                key={outcome.join("")}
                transform={`translate(${INNER_POSITIONS[index].x} ${INNER_POSITIONS[index].y})`}
              >
                <rect
                  x="-4.1"
                  y="-2.25"
                  width="8.2"
                  height="4.5"
                  rx="2.25"
                  fill="rgba(5,18,22,0.92)"
                  stroke="rgba(103,232,249,0.35)"
                  strokeWidth="0.24"
                />
                <WorldTokenGlyph tokenId={outcome[0]} x={-1.2} scale={0.86} />
                <WorldTokenGlyph tokenId={outcome[1]} x={1.2} scale={0.86} />
              </g>
            ))}
          </g>

          <g filter="url(#combo-soft-glow)">
            <circle
              cx="50"
              cy="50"
              r="10.5"
              fill="rgba(17,12,7,0.94)"
              stroke="rgba(251,191,36,0.28)"
              strokeWidth="0.3"
            />
            <text
              x="50"
              y="48.2"
              textAnchor="middle"
              fill="rgba(254,243,199,0.82)"
              fontSize="2.1"
              fontFamily="monospace"
            >
              12 ORDERED
            </text>
            <text
              x="50"
              y="52.3"
              textAnchor="middle"
              fill="rgba(165,243,252,0.78)"
              fontSize="1.8"
              fontFamily="monospace"
            >
              6 GROUPS
            </text>
          </g>
        </svg>
      </div>

      <div className="absolute bottom-[-18vh] left-[-19vw] h-[68vw] min-h-[520px] w-[68vw] min-w-[520px] rounded-full border border-amber-200/[0.08] shadow-[0_0_120px_rgba(180,83,9,0.08),inset_0_0_80px_rgba(251,191,36,0.035)]" />
      <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-amber-200/[0.08] to-transparent" />
      <div className="absolute inset-y-0 left-[calc(8%+7px)] w-px bg-gradient-to-b from-transparent via-amber-200/[0.035] to-transparent" />

      <style>{`
        .combo-world-ring {
          transform-box: view-box;
          transform-origin: 50px 50px;
        }

        .combo-world-ring--outer {
          animation: combo-turn 96s linear infinite;
        }

        .combo-world-ring--inner {
          animation: combo-turn-reverse 118s linear infinite;
        }

        @keyframes combo-turn {
          to { transform: rotate(360deg); }
        }

        @keyframes combo-turn-reverse {
          to { transform: rotate(-360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .combo-world-ring--outer,
          .combo-world-ring--inner {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}

const WORLD_TOKEN_PALETTE = {
  amber: { fill: "#b45309", stroke: "#fde68a" },
  cyan: { fill: "#0e7490", stroke: "#a5f3fc" },
  violet: { fill: "#6d28d9", stroke: "#ddd6fe" },
  rose: { fill: "#be123c", stroke: "#fecdd3" },
  emerald: { fill: "#047857", stroke: "#a7f3d0" },
  sky: { fill: "#0369a1", stroke: "#bae6fd" },
  orange: { fill: "#c2410c", stroke: "#fed7aa" },
} as const;

function WorldTokenGlyph({
  tokenId,
  x,
  scale = 1,
}: {
  tokenId: string;
  x: number;
  scale?: number;
}) {
  const token = COUNTING_TOKENS.find((candidate) => candidate.id === tokenId);
  if (!token) return null;
  const palette = WORLD_TOKEN_PALETTE[token.tone];

  return (
    <g transform={`translate(${x} 0) scale(${scale})`}>
      <WorldTokenShape
        token={token}
        fill={palette.fill}
        stroke={palette.stroke}
      />
      <text
        textAnchor="middle"
        dominantBaseline="central"
        fill="#fffaf0"
        fontSize="0.82"
        fontWeight="700"
        fontFamily="monospace"
      >
        {token.label}
      </text>
    </g>
  );
}

function WorldTokenShape({
  token,
  fill,
  stroke,
}: {
  token: CountingToken;
  fill: string;
  stroke: string;
}) {
  const common = { fill, stroke, strokeWidth: 0.16 };

  if (token.shape === "circle") return <circle r="1.08" {...common} />;
  if (token.shape === "square")
    return (
      <rect
        x="-0.98"
        y="-0.98"
        width="1.96"
        height="1.96"
        rx="0.2"
        {...common}
      />
    );
  if (token.shape === "hexagon")
    return (
      <polygon
        points="0,-1.15 1,-0.58 1,0.58 0,1.15 -1,0.58 -1,-0.58"
        {...common}
      />
    );
  if (token.shape === "triangle")
    return <polygon points="0,-1.12 1.16,0.96 -1.16,0.96" {...common} />;
  if (token.shape === "star")
    return (
      <polygon
        points="0,-1.2 0.3,-0.36 1.16,-0.35 0.47,0.18 0.72,1.02 0,0.52 -0.72,1.02 -0.47,0.18 -1.16,-0.35 -0.3,-0.36"
        {...common}
      />
    );
  if (token.shape === "bar")
    return (
      <rect
        x="-1.18"
        y="-0.68"
        width="2.36"
        height="1.36"
        rx="0.68"
        {...common}
      />
    );

  return <polygon points="0,-1.18 1.18,0 0,1.18 -1.18,0" {...common} />;
}
