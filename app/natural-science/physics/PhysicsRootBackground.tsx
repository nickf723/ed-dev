const RULER_TICKS = Array.from({ length: 25 }, (_, index) => index);
const FIELD_POINTS = [
  [1015, 230],
  [1085, 285],
  [1018, 342],
  [950, 286],
] as const;

export default function PhysicsRootBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#071019]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_14%,rgba(56,189,248,0.12),transparent_27%),radial-gradient(circle_at_13%_76%,rgba(251,146,60,0.09),transparent_31%),linear-gradient(180deg,#08131d_0%,#050b12_58%,#03070b_100%)]" />
      <svg
        viewBox="0 0 1440 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-80"
      >
        <defs>
          <pattern
            id="physics-minor-grid"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M28 0H0V28"
              fill="none"
              stroke="rgba(125,211,252,0.035)"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="physics-major-grid"
            width="140"
            height="140"
            patternUnits="userSpaceOnUse"
          >
            <rect width="140" height="140" fill="url(#physics-minor-grid)" />
            <path
              d="M140 0H0V140"
              fill="none"
              stroke="rgba(125,211,252,0.065)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="physics-fade" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(3,7,11,0.96)" />
            <stop offset="0.24" stopColor="rgba(3,7,11,0.12)" />
            <stop offset="0.74" stopColor="rgba(3,7,11,0.08)" />
            <stop offset="1" stopColor="rgba(3,7,11,0.94)" />
          </linearGradient>
          <filter id="physics-soft-glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="1440" height="1000" fill="url(#physics-major-grid)" />

        <g transform="translate(100 168)" opacity="0.72">
          <path
            d="M0 390H560M64 440V36"
            stroke="rgba(186,230,253,0.20)"
            strokeWidth="1.5"
          />
          <path
            d="M64 350 C165 70 330 78 518 350"
            fill="none"
            stroke="rgba(251,146,60,0.38)"
            strokeWidth="2"
          />
          <path
            d="M64 350 C165 70 330 78 518 350"
            fill="none"
            stroke="rgba(251,146,60,0.15)"
            strokeWidth="12"
            filter="url(#physics-soft-glow)"
          />
          {[0, 1, 2, 3, 4, 5, 6].map((index) => {
            const x = 64 + index * 75.7;
            const y = 350 - index * (6 - index) * 12.3;
            return (
              <g key={index}>
                <circle cx={x} cy={y} r="4.5" fill="rgba(253,186,116,0.72)" />
                <path
                  d={`M${x} ${y}v${350 - y}`}
                  stroke="rgba(253,186,116,0.09)"
                  strokeDasharray="3 7"
                />
              </g>
            );
          })}
          <path
            d="M126 311l58-80"
            stroke="rgba(125,211,252,0.48)"
            strokeWidth="2"
          />
          <path
            d="M184 231l-6 15m6-15l-15 3"
            stroke="rgba(125,211,252,0.48)"
            strokeWidth="2"
          />
          <text
            x="190"
            y="224"
            fill="rgba(186,230,253,0.42)"
            fontSize="11"
            letterSpacing="2"
          >
            VELOCITY
          </text>
          <text
            x="22"
            y="32"
            fill="rgba(186,230,253,0.34)"
            fontSize="10"
            letterSpacing="2"
          >
            MEASURED TRAJECTORY
          </text>
        </g>

        <g transform="translate(810 585)" opacity="0.64">
          <path
            d="M0 108 C30 22 62 22 92 108 S154 194 184 108 S246 22 276 108 S338 194 368 108 S430 22 460 108"
            fill="none"
            stroke="rgba(125,211,252,0.34)"
            strokeWidth="2"
          />
          <path
            d="M0 108H490"
            stroke="rgba(186,230,253,0.12)"
            strokeDasharray="4 8"
          />
          <path
            d="M92 108V22M184 108V194"
            stroke="rgba(196,181,253,0.14)"
            strokeDasharray="3 6"
          />
          <text
            x="0"
            y="8"
            fill="rgba(186,230,253,0.34)"
            fontSize="10"
            letterSpacing="2"
          >
            PERIOD · AMPLITUDE · PHASE
          </text>
        </g>

        <g opacity="0.58">
          <circle
            cx="1018"
            cy="286"
            r="118"
            fill="rgba(34,211,238,0.018)"
            stroke="rgba(34,211,238,0.16)"
          />
          <circle
            cx="1018"
            cy="286"
            r="67"
            fill="none"
            stroke="rgba(167,139,250,0.14)"
            strokeDasharray="4 8"
          />
          {FIELD_POINTS.map(([x, y], index) => (
            <g key={`${x}-${y}`}>
              <path
                d={`M1018 286L${x} ${y}`}
                stroke={
                  index % 2 === 0
                    ? "rgba(34,211,238,0.34)"
                    : "rgba(167,139,250,0.30)"
                }
              />
              <circle
                cx={x}
                cy={y}
                r="6"
                fill={
                  index % 2 === 0
                    ? "rgba(103,232,249,0.58)"
                    : "rgba(196,181,253,0.56)"
                }
              />
            </g>
          ))}
          <circle
            cx="1018"
            cy="286"
            r="10"
            fill="rgba(253,186,116,0.64)"
            filter="url(#physics-soft-glow)"
          />
          <text
            x="876"
            y="144"
            fill="rgba(186,230,253,0.34)"
            fontSize="10"
            letterSpacing="2"
          >
            FIELD · INTERACTION · RESPONSE
          </text>
        </g>

        <g transform="translate(118 858)" opacity="0.44">
          <path d="M0 0H1200" stroke="rgba(253,186,116,0.24)" />
          {RULER_TICKS.map((tick) => (
            <path
              key={tick}
              d={`M${tick * 50} 0v${tick % 5 === 0 ? 24 : 11}`}
              stroke="rgba(253,186,116,0.36)"
            />
          ))}
          <text
            x="0"
            y="44"
            fill="rgba(253,186,116,0.42)"
            fontSize="10"
            letterSpacing="2"
          >
            DEFINE THE UNIT · REPORT THE PRECISION · KEEP THE SOURCE
          </text>
        </g>

        <rect width="1440" height="1000" fill="url(#physics-fade)" />
      </svg>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_24%,rgba(1,4,7,0.60)_100%)]" />
    </div>
  );
}
