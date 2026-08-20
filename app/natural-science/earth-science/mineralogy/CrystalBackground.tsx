const LATTICE_POINTS = [
  [82, 72],
  [142, 42],
  [202, 72],
  [82, 132],
  [142, 102],
  [202, 132],
  [82, 192],
  [142, 162],
  [202, 192],
] as const;

const LATTICE_EDGES = [
  [0, 1],
  [1, 2],
  [0, 3],
  [0, 4],
  [1, 4],
  [2, 4],
  [2, 5],
  [3, 4],
  [4, 5],
  [3, 6],
  [3, 7],
  [4, 7],
  [5, 7],
  [5, 8],
  [6, 7],
  [7, 8],
] as const;

export default function CrystalBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#08060b]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_24%,rgba(216,180,254,0.17),transparent_29%),radial-gradient(circle_at_18%_72%,rgba(94,234,212,0.08),transparent_28%),linear-gradient(145deg,#08060b_0%,#100816_46%,#06080d_100%)]" />

      <svg
        viewBox="0 0 320 240"
        className="absolute -left-12 top-[8%] h-[44vh] min-h-[340px] w-auto opacity-50 motion-safe:animate-[pulse_12s_ease-in-out_infinite]"
      >
        <g fill="none" stroke="rgba(103,232,249,0.30)" strokeWidth="0.8">
          {LATTICE_EDGES.map(([from, to]) => (
            <line
              key={`${from}-${to}`}
              x1={LATTICE_POINTS[from][0]}
              y1={LATTICE_POINTS[from][1]}
              x2={LATTICE_POINTS[to][0]}
              y2={LATTICE_POINTS[to][1]}
            />
          ))}
        </g>
        {LATTICE_POINTS.map(([x, y], index) => (
          <g key={`${x}-${y}`}>
            <circle
              cx={x}
              cy={y}
              r="5.5"
              fill={
                index % 3 === 1
                  ? "rgba(216,180,254,0.24)"
                  : "rgba(103,232,249,0.20)"
              }
            />
            <circle
              cx={x}
              cy={y}
              r="1.6"
              fill={
                index % 3 === 1
                  ? "rgba(240,171,252,0.74)"
                  : "rgba(165,243,252,0.70)"
              }
            />
          </g>
        ))}
      </svg>

      <svg
        viewBox="0 0 760 760"
        className="absolute -bottom-[15vh] -right-[9vw] h-[96vh] min-h-[740px] w-auto opacity-80 motion-safe:animate-[pulse_14s_ease-in-out_infinite]"
      >
        <defs>
          <linearGradient id="crystal-amethyst" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(250,232,255,0.36)" />
            <stop offset="0.38" stopColor="rgba(216,180,254,0.20)" />
            <stop offset="1" stopColor="rgba(88,28,135,0.04)" />
          </linearGradient>
          <linearGradient id="crystal-cyan" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(207,250,254,0.28)" />
            <stop offset="1" stopColor="rgba(8,145,178,0.035)" />
          </linearGradient>
          <filter
            id="cabinet-glow"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="11" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#cabinet-glow)" strokeLinejoin="round">
          <path
            d="M120 647 168 274 263 90l88 187-38 370Z"
            fill="url(#crystal-amethyst)"
            stroke="rgba(232,121,249,0.45)"
            strokeWidth="2"
          />
          <path
            d="m168 274 95 58 88-55M263 332l-8 315M263 90v242"
            fill="none"
            stroke="rgba(255,255,255,0.24)"
            strokeWidth="1.4"
          />

          <path
            d="m296 646 34-284 100-210 92 192 8 302Z"
            fill="url(#crystal-cyan)"
            stroke="rgba(103,232,249,0.34)"
            strokeWidth="2"
          />
          <path
            d="m330 362 100 57 92-75M430 419l-3 227M430 152v267"
            fill="none"
            stroke="rgba(255,255,255,0.20)"
            strokeWidth="1.4"
          />

          <path
            d="m478 647 20-240 79-151 75 144-4 247Z"
            fill="url(#crystal-amethyst)"
            stroke="rgba(196,181,253,0.34)"
            strokeWidth="2"
          />
          <path
            d="m498 407 79 48 75-55M577 455l-2 192M577 256v199"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1.2"
          />

          <path
            d="m56 647 18-176 56-115 51 111-7 180Z"
            fill="url(#crystal-cyan)"
            stroke="rgba(94,234,212,0.28)"
            strokeWidth="1.6"
          />
          <path
            d="m74 471 56 31 51-35M130 502l-2 145"
            fill="none"
            stroke="rgba(255,255,255,0.16)"
          />
        </g>

        <path
          d="M42 648c166-31 432-26 668 0"
          fill="none"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="2"
        />
        <path
          d="M70 681c184-24 430-20 606 0"
          fill="none"
          stroke="rgba(216,180,254,0.10)"
        />
      </svg>

      <div className="absolute inset-y-0 left-[23%] hidden w-px bg-gradient-to-b from-transparent via-fuchsia-100/10 to-transparent 2xl:block" />
      <div className="absolute inset-y-0 left-[24.4%] hidden w-px bg-gradient-to-b from-transparent via-cyan-100/[0.06] to-transparent 2xl:block" />
      <div className="absolute inset-x-0 bottom-[8%] h-px bg-gradient-to-r from-transparent via-fuchsia-100/10 to-transparent" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,6,11,0.03),rgba(8,6,11,0.58)_72%,rgba(5,5,8,0.92))]" />
    </div>
  );
}
