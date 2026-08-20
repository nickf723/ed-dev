const PRIMES = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);

const INTEGER_CAUSEWAY = [
  { value: 2, x: 82, y: 898, radius: 34 },
  { value: 3, x: 188, y: 850, radius: 32 },
  { value: 4, x: 306, y: 812, radius: 30 },
  { value: 5, x: 414, y: 758, radius: 29 },
  { value: 6, x: 374, y: 692, radius: 27 },
  { value: 7, x: 478, y: 636, radius: 26 },
  { value: 8, x: 606, y: 606, radius: 24 },
  { value: 9, x: 724, y: 560, radius: 23 },
  { value: 10, x: 776, y: 500, radius: 22 },
  { value: 11, x: 880, y: 448, radius: 21 },
  { value: 12, x: 1008, y: 416, radius: 20 },
  { value: 13, x: 1124, y: 370, radius: 19 },
  { value: 14, x: 1252, y: 344, radius: 18 },
  { value: 15, x: 1370, y: 302, radius: 17 },
  { value: 16, x: 1462, y: 252, radius: 16 },
  { value: 17, x: 1374, y: 214, radius: 15 },
  { value: 18, x: 1260, y: 192, radius: 14 },
  { value: 19, x: 1142, y: 176, radius: 13 },
  { value: 20, x: 1034, y: 158, radius: 12 },
  { value: 21, x: 946, y: 138, radius: 11 },
  { value: 22, x: 880, y: 116, radius: 10 },
  { value: 23, x: 834, y: 92, radius: 9 },
] as const;

const CAUSEWAY_POINTS = INTEGER_CAUSEWAY.map(({ x, y }) => `${x},${y}`).join(
  " "
);

function slabPoints(x: number, y: number, radius: number, scale = 1) {
  const r = radius * scale;
  return [
    `${x - r},${y}`,
    `${x - r * 0.45},${y - r * 0.68}`,
    `${x + r * 0.45},${y - r * 0.68}`,
    `${x + r},${y}`,
    `${x + r * 0.45},${y + r * 0.68}`,
    `${x - r * 0.45},${y + r * 0.68}`,
  ].join(" ");
}

export default function NumberTheoryBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#05040a]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(88,28,135,0.24),transparent_34%),radial-gradient(circle_at_82%_30%,rgba(6,95,70,0.15),transparent_30%),linear-gradient(152deg,#080512_0%,#05050b_48%,#020406_100%)]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.76]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="integer-path" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#a78bfa" stopOpacity="0.08" />
            <stop offset="0.52" stopColor="#c4b5fd" stopOpacity="0.28" />
            <stop offset="1" stopColor="#6ee7b7" stopOpacity="0.11" />
          </linearGradient>
          <linearGradient id="integer-depth" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#a78bfa" stopOpacity="0.22" />
            <stop offset="1" stopColor="#05040a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="prime-light">
            <stop offset="0" stopColor="#fef3c7" stopOpacity="0.92" />
            <stop offset="0.28" stopColor="#fbbf24" stopOpacity="0.55" />
            <stop offset="1" stopColor="#34d399" stopOpacity="0" />
          </radialGradient>
          <filter
            id="prime-glow"
            x="-180%"
            y="-180%"
            width="460%"
            height="460%"
          >
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.2" />
          </filter>
        </defs>

        <g opacity="0.38" fill="none" stroke="#a78bfa">
          <path
            d="M-120 878 C310 772 560 790 826 606 S1274 330 1730 304"
            strokeOpacity="0.12"
          />
          <path
            d="M-100 932 C342 816 570 838 860 650 S1290 384 1730 354"
            strokeOpacity="0.07"
          />
          <path
            d="M-80 984 C370 868 612 882 906 700 S1320 436 1730 408"
            strokeOpacity="0.045"
          />
        </g>

        <ellipse
          cx="916"
          cy="102"
          rx="340"
          ry="86"
          fill="none"
          stroke="#6ee7b7"
          strokeOpacity="0.055"
        />
        <ellipse
          cx="916"
          cy="102"
          rx="240"
          ry="58"
          fill="none"
          stroke="#c4b5fd"
          strokeOpacity="0.07"
        />

        <polyline
          points={CAUSEWAY_POINTS}
          fill="none"
          stroke="#05040a"
          strokeOpacity="0.88"
          strokeWidth="26"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polyline
          points={CAUSEWAY_POINTS}
          fill="none"
          stroke="url(#integer-path)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#soften)"
        />

        {INTEGER_CAUSEWAY.map(({ value, x, y, radius }, index) => {
          const prime = PRIMES.has(value);
          const depth = Math.max(36, radius * 5.4);
          const slab = slabPoints(x, y, radius);

          return (
            <g key={value}>
              <line
                x1={x}
                y1={y + radius}
                x2={x}
                y2={Math.min(1010, y + depth)}
                stroke="url(#integer-depth)"
                strokeWidth={Math.max(1, radius / 7)}
              />

              {prime ? (
                <>
                  <circle
                    className="number-theory-prime-halo"
                    cx={x}
                    cy={y}
                    r={radius * 2.8}
                    fill="url(#prime-light)"
                    filter="url(#prime-glow)"
                    style={{ animationDelay: `${index * -0.7}s` }}
                  />
                  <polygon
                    points={slab}
                    fill="#0b1515"
                    fillOpacity="0.88"
                    stroke="#fcd34d"
                    strokeOpacity="0.66"
                    strokeWidth={Math.max(1, radius / 9)}
                  />
                  <polygon
                    points={slabPoints(x, y, radius, 0.62)}
                    fill="none"
                    stroke="#6ee7b7"
                    strokeOpacity="0.32"
                    strokeWidth="1"
                  />
                </>
              ) : (
                <>
                  <polygon
                    points={slab}
                    fill="#0d0a14"
                    fillOpacity="0.76"
                    stroke="#a78bfa"
                    strokeOpacity="0.16"
                    strokeWidth={Math.max(1, radius / 11)}
                  />
                  <path
                    d={`M ${x - radius * 0.54} ${y} H ${x + radius * 0.54}`}
                    stroke="#a78bfa"
                    strokeOpacity="0.14"
                    strokeWidth="1"
                  />
                </>
              )}

              <text
                x={x}
                y={y + Math.max(3.5, radius * 0.14)}
                textAnchor="middle"
                fill={prime ? "#fef3c7" : "#a1a1aa"}
                fillOpacity={prime ? 0.78 : 0.24}
                fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
                fontSize={Math.max(7, radius * 0.58)}
              >
                {value}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="from-[#05040a]/78 via-[#05040a]/24 absolute inset-y-0 left-0 w-[38%] bg-gradient-to-r to-transparent" />
      <div className="from-[#05040a]/46 absolute inset-x-0 top-0 h-[32vh] bg-gradient-to-b to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_28%,rgba(5,4,10,0.18)_66%,rgba(5,4,10,0.72)_100%)]" />

      <style>{`
        .number-theory-prime-halo {
          animation: number-theory-beacon 8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        @keyframes number-theory-beacon {
          0%, 100% { opacity: 0.34; transform: scale(0.92); }
          50% { opacity: 0.72; transform: scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .number-theory-prime-halo { animation: none; opacity: 0.52; }
        }
      `}</style>
    </div>
  );
}
