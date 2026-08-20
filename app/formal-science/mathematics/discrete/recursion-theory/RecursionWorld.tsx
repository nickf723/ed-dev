import { CANONICAL_HANOI_MOVES, HANOI_DISKS } from "./recursionModel";

const MOVE_POINTS = CANONICAL_HANOI_MOVES.map((move, index) => ({
  move,
  x: 12 + index * 12.7,
  y: index <= 3 ? 18 + index * 15 : 63 - (index - 4) * 15,
}));

export default function RecursionWorld() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[radial-gradient(circle_at_82%_34%,rgba(99,102,241,0.19),transparent_33%),radial-gradient(circle_at_12%_78%,rgba(6,182,212,0.14),transparent_32%),linear-gradient(145deg,#02060d_0%,#07101e_48%,#080819_100%)]"
      aria-hidden="true"
    >
      <div className="absolute -right-[26rem] top-[5vh] h-[min(1080px,116vw)] w-[min(1080px,116vw)] opacity-55 sm:-right-[17rem]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <linearGradient id="recursion-edge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#67e8f9" stopOpacity="0.18" />
              <stop offset="0.52" stopColor="#c4b5fd" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fda4af" stopOpacity="0.2" />
            </linearGradient>
            <radialGradient id="recursion-depth" cx="55%" cy="46%" r="58%">
              <stop offset="0" stopColor="#818cf8" stopOpacity="0.13" />
              <stop offset="0.74" stopColor="#0891b2" stopOpacity="0.04" />
              <stop offset="1" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
            <filter id="recursion-glow">
              <feGaussianBlur stdDeviation="0.42" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <circle cx="50" cy="50" r="49" fill="url(#recursion-depth)" />
          <g className="recursion-world-breathe">
            <path
              d={MOVE_POINTS.map(
                (point, index) =>
                  `${index === 0 ? "M" : "L"}${point.x} ${point.y}`
              ).join(" ")}
              fill="none"
              stroke="url(#recursion-edge)"
              strokeWidth="0.45"
              strokeLinejoin="round"
            />

            {MOVE_POINTS.map(({ move, x, y }) => {
              const disk = HANOI_DISKS[move.disk - 1];
              const palette = WORLD_DISK_PALETTE[disk.tone];

              return (
                <g key={move.index} transform={`translate(${x} ${y})`}>
                  <circle
                    r={move.phase === "base" ? 4 : 4.7}
                    fill="rgba(2,6,23,0.9)"
                    stroke={palette.stroke}
                    strokeOpacity="0.48"
                    strokeWidth="0.28"
                  />
                  <rect
                    x={-1.1 - move.disk * 0.45}
                    y="-0.72"
                    width={2.2 + move.disk * 0.9}
                    height="1.44"
                    rx="0.7"
                    fill={palette.fill}
                    stroke={palette.stroke}
                    strokeOpacity="0.64"
                    strokeWidth="0.18"
                  />
                  <text
                    x="0"
                    y="-5.7"
                    textAnchor="middle"
                    fill="rgba(224,231,255,0.66)"
                    fontFamily="monospace"
                    fontSize="1.55"
                  >
                    {move.from}→{move.to}
                  </text>
                  <text
                    x="0"
                    y="6.5"
                    textAnchor="middle"
                    fill="rgba(148,163,184,0.58)"
                    fontFamily="monospace"
                    fontSize="1.25"
                  >
                    {String(move.index).padStart(2, "0")}
                  </text>
                </g>
              );
            })}
          </g>

          <g filter="url(#recursion-glow)">
            <path
              d="M50 13 L33 28 M50 13 L67 28 M33 28 L23 43 M33 28 L43 43 M67 28 L57 43 M67 28 L77 43"
              fill="none"
              stroke="rgba(103,232,249,0.21)"
              strokeWidth="0.28"
            />
            <WorldCall x={50} y={11} label="H(3)" depth="0" />
            <WorldCall x={33} y={27} label="H(2)" depth="1" />
            <WorldCall x={67} y={27} label="H(2)" depth="1" />
            <WorldCall x={23} y={43} label="H(1)" depth="base" />
            <WorldCall x={43} y={43} label="H(1)" depth="base" />
            <WorldCall x={57} y={43} label="H(1)" depth="base" />
            <WorldCall x={77} y={43} label="H(1)" depth="base" />
          </g>
        </svg>
      </div>

      <div className="absolute inset-y-0 left-[8%] w-px bg-gradient-to-b from-transparent via-cyan-200/[0.09] to-transparent" />
      <div className="absolute inset-y-0 left-[calc(8%+8px)] w-px bg-gradient-to-b from-transparent via-violet-200/[0.04] to-transparent" />
      <div className="absolute -bottom-[32rem] -left-[23rem] h-[760px] w-[760px] rotate-45 border border-cyan-200/[0.08] shadow-[0_0_110px_rgba(6,182,212,0.06),inset_0_0_90px_rgba(99,102,241,0.025)]" />

      <style>{`
        .recursion-world-breathe {
          transform-box: view-box;
          transform-origin: 50px 50px;
          animation: recursion-world-breathe 16s ease-in-out infinite alternate;
        }

        @keyframes recursion-world-breathe {
          from { opacity: 0.58; transform: translateY(-0.5px); }
          to { opacity: 0.94; transform: translateY(0.7px); }
        }

        @media (prefers-reduced-motion: reduce) {
          .recursion-world-breathe { animation: none; }
        }
      `}</style>
    </div>
  );
}

const WORLD_DISK_PALETTE = {
  cyan: { fill: "#0e7490", stroke: "#a5f3fc" },
  violet: { fill: "#6d28d9", stroke: "#ddd6fe" },
  rose: { fill: "#be123c", stroke: "#fecdd3" },
  amber: { fill: "#b45309", stroke: "#fde68a" },
  emerald: { fill: "#047857", stroke: "#a7f3d0" },
} as const;

function WorldCall({
  x,
  y,
  label,
  depth,
}: {
  x: number;
  y: number;
  label: string;
  depth: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        x="-5.6"
        y="-2.8"
        width="11.2"
        height="5.6"
        rx="1.2"
        fill="rgba(3,7,18,0.9)"
        stroke="rgba(196,181,253,0.4)"
        strokeWidth="0.25"
      />
      <text
        x="0"
        y="0.65"
        textAnchor="middle"
        fill="rgba(238,242,255,0.78)"
        fontFamily="monospace"
        fontSize="1.7"
      >
        {label}
      </text>
      <text
        x="0"
        y="-4.25"
        textAnchor="middle"
        fill="rgba(103,232,249,0.45)"
        fontFamily="monospace"
        fontSize="1.1"
      >
        depth {depth}
      </text>
    </g>
  );
}
