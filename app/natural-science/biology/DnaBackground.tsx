const HELIX_PAIRS = Array.from({ length: 18 }, (_, index) => {
  const y = 88 + index * 38;
  const phase = index * 0.72;
  const offset = Math.sin(phase) * 58;
  return {
    y,
    left: 262 + offset,
    right: 262 - offset,
    front: Math.cos(phase) > 0,
  };
});

const CELLS = [
  { x: 570, y: 176, r: 54, nucleus: 19, rgb: "34,211,238" },
  { x: 690, y: 248, r: 42, nucleus: 14, rgb: "45,212,191" },
  { x: 590, y: 332, r: 64, nucleus: 22, rgb: "132,204,22" },
  { x: 730, y: 396, r: 48, nucleus: 17, rgb: "52,211,153" },
] as const;

const ORGANISM_POINTS = [
  [920, 180],
  [876, 258],
  [944, 306],
  [890, 390],
  [968, 452],
  [870, 522],
] as const;

const ECOLOGY_NODES = [
  { x: 1120, y: 170, r: 18, rgb: "132,204,22" },
  { x: 1270, y: 225, r: 24, rgb: "251,146,60" },
  { x: 1180, y: 330, r: 20, rgb: "52,211,153" },
  { x: 1335, y: 390, r: 16, rgb: "34,211,238" },
  { x: 1218, y: 500, r: 22, rgb: "192,132,252" },
] as const;

export default function DnaBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#020b06]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(139,92,246,0.08),transparent_29%),radial-gradient(circle_at_48%_43%,rgba(34,211,238,0.07),transparent_28%),radial-gradient(circle_at_80%_45%,rgba(52,211,153,0.07),transparent_32%),linear-gradient(145deg,#020b06_0%,#03120b_48%,#020905_100%)]" />
      <svg
        className="absolute inset-[7%_2%_10%_2%] h-[83%] w-[96%] opacity-80"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="biology-grid"
            width="42"
            height="42"
            patternUnits="userSpaceOnUse"
          >
            <path d="M42 0H0V42" fill="none" stroke="rgba(187,247,208,0.035)" />
          </pattern>
          <linearGradient id="biology-scale-line" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(139,92,246,0.28)" />
            <stop offset="0.35" stopColor="rgba(34,211,238,0.24)" />
            <stop offset="0.68" stopColor="rgba(132,204,22,0.24)" />
            <stop offset="1" stopColor="rgba(52,211,153,0.28)" />
          </linearGradient>
        </defs>

        <rect
          x="18"
          y="18"
          width="1404"
          height="724"
          fill="url(#biology-grid)"
          stroke="rgba(187,247,208,0.05)"
        />
        <text
          x="62"
          y="72"
          fill="rgba(187,247,208,0.22)"
          fontFamily="monospace"
          fontSize="12"
        >
          LIVING SYSTEMS BENCH · MOLECULE / CELL / ORGANISM / POPULATION /
          ECOSYSTEM
        </text>
        <line
          x1="115"
          y1="680"
          x2="1350"
          y2="680"
          stroke="url(#biology-scale-line)"
          strokeWidth="2"
        />
        {[
          [150, "nm", "MOLECULAR"],
          [520, "µm", "CELLULAR"],
          [855, "mm–m", "ORGANISMAL"],
          [1190, "m–km", "ECOLOGICAL"],
        ].map(([x, unit, label]) => (
          <g key={String(label)} transform={`translate(${Number(x)} 680)`}>
            <line y1="-7" y2="7" stroke="rgba(187,247,208,0.22)" />
            <text
              y="28"
              fill="rgba(187,247,208,0.18)"
              fontFamily="monospace"
              fontSize="10"
            >
              {String(unit)} · {String(label)}
            </text>
          </g>
        ))}

        <g>
          <text
            x="138"
            y="120"
            fill="rgba(196,181,253,0.24)"
            fontFamily="monospace"
            fontSize="11"
          >
            INFORMATION / EXPRESSION
          </text>
          {HELIX_PAIRS.map((pair, index) => (
            <g key={pair.y}>
              <line
                x1={pair.left}
                y1={pair.y}
                x2={pair.right}
                y2={pair.y}
                stroke={
                  pair.front
                    ? "rgba(196,181,253,0.18)"
                    : "rgba(103,232,249,0.10)"
                }
              />
              <circle
                cx={pair.left}
                cy={pair.y}
                r={pair.front ? 6 : 4}
                fill="rgba(196,181,253,0.22)"
              />
              <circle
                cx={pair.right}
                cy={pair.y}
                r={pair.front ? 4 : 6}
                fill="rgba(103,232,249,0.20)"
              />
              {index < HELIX_PAIRS.length - 1 ? (
                <>
                  <line
                    x1={pair.left}
                    y1={pair.y}
                    x2={HELIX_PAIRS[index + 1].left}
                    y2={HELIX_PAIRS[index + 1].y}
                    stroke="rgba(196,181,253,0.14)"
                  />
                  <line
                    x1={pair.right}
                    y1={pair.y}
                    x2={HELIX_PAIRS[index + 1].right}
                    y2={HELIX_PAIRS[index + 1].y}
                    stroke="rgba(103,232,249,0.13)"
                  />
                </>
              ) : null}
            </g>
          ))}
        </g>

        <g>
          <text
            x="535"
            y="118"
            fill="rgba(103,232,249,0.24)"
            fontFamily="monospace"
            fontSize="11"
          >
            BOUNDARY / EXCHANGE / REGULATION
          </text>
          {CELLS.map((cell, index) => (
            <g key={`${cell.x}-${cell.y}`}>
              <circle
                cx={cell.x}
                cy={cell.y}
                r={cell.r}
                fill={`rgba(${cell.rgb},0.035)`}
                stroke={`rgba(${cell.rgb},0.20)`}
                strokeWidth="2"
              />
              <circle
                cx={cell.x + (index % 2 ? 7 : -8)}
                cy={cell.y - 3}
                r={cell.nucleus}
                fill={`rgba(${cell.rgb},0.045)`}
                stroke={`rgba(${cell.rgb},0.15)`}
              />
              <path
                d={`M${cell.x - cell.r - 10} ${cell.y}h-34m20-8 14 8-14 8M${cell.x + cell.r + 10} ${cell.y}h34m-20-8-14 8 14 8`}
                fill="none"
                stroke={`rgba(${cell.rgb},0.13)`}
              />
            </g>
          ))}
          <path
            d="M520 510C602 465 674 498 760 456"
            fill="none"
            stroke="rgba(103,232,249,0.10)"
            strokeDasharray="6 9"
          />
        </g>

        <g>
          <text
            x="842"
            y="118"
            fill="rgba(190,242,100,0.22)"
            fontFamily="monospace"
            fontSize="11"
          >
            STRUCTURE / FUNCTION / HOMEOSTASIS
          </text>
          <path
            d="M910 166C884 240 902 294 890 365s23 135 7 210"
            fill="none"
            stroke="rgba(190,242,100,0.18)"
            strokeWidth="3"
          />
          {ORGANISM_POINTS.map(([x, y], index) => (
            <g key={`${x}-${y}`}>
              <circle
                cx={x}
                cy={y}
                r={index === 0 ? 24 : 15 + (index % 3) * 3}
                fill="rgba(132,204,22,0.035)"
                stroke="rgba(190,242,100,0.17)"
              />
              {index > 0 ? (
                <line
                  x1={ORGANISM_POINTS[index - 1][0]}
                  y1={ORGANISM_POINTS[index - 1][1]}
                  x2={x}
                  y2={y}
                  stroke="rgba(190,242,100,0.12)"
                />
              ) : null}
            </g>
          ))}
          <path d="M830 605h180" stroke="rgba(190,242,100,0.13)" />
          <path
            d="M850 605c20-38 35-56 62-78m66 78c-17-34-34-55-63-79"
            fill="none"
            stroke="rgba(190,242,100,0.12)"
          />
        </g>

        <g>
          <text
            x="1080"
            y="118"
            fill="rgba(110,231,183,0.22)"
            fontFamily="monospace"
            fontSize="11"
          >
            INTERACTION / FLOW / CHANGE
          </text>
          {ECOLOGY_NODES.map((node) => (
            <g key={`${node.x}-${node.y}`}>
              <circle
                cx={node.x}
                cy={node.y}
                r={node.r}
                fill={`rgba(${node.rgb},0.05)`}
                stroke={`rgba(${node.rgb},0.19)`}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r="4"
                fill={`rgba(${node.rgb},0.30)`}
              />
            </g>
          ))}
          {[
            [0, 1],
            [0, 2],
            [1, 2],
            [1, 3],
            [2, 3],
            [2, 4],
            [3, 4],
          ].map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={ECOLOGY_NODES[from].x}
              y1={ECOLOGY_NODES[from].y}
              x2={ECOLOGY_NODES[to].x}
              y2={ECOLOGY_NODES[to].y}
              stroke="rgba(110,231,183,0.13)"
            />
          ))}
          <path
            d="M1085 585c55-32 99-16 142 2s88 15 137-16"
            fill="none"
            stroke="rgba(110,231,183,0.12)"
            strokeDasharray="7 9"
          />
        </g>
      </svg>
      <div className="via-[#020b06]/82 absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#020b06] to-transparent" />
      <div className="via-[#020b06]/84 absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#020b06] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_36%,rgba(1,7,4,0.70)_100%)]" />
    </div>
  );
}
