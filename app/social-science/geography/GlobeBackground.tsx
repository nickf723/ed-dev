type Point = { x: number; y: number };

type City = Point & { size: number; phase: number };

type Route = {
  from: Point;
  to: Point;
  bend: number;
  rgb: string;
};

const LAND: Point[][] = [
  [
    { x: -0.84, y: -0.47 },
    { x: -0.7, y: -0.62 },
    { x: -0.48, y: -0.63 },
    { x: -0.28, y: -0.48 },
    { x: -0.18, y: -0.3 },
    { x: -0.28, y: -0.16 },
    { x: -0.43, y: -0.12 },
    { x: -0.48, y: 0.02 },
    { x: -0.63, y: -0.02 },
    { x: -0.72, y: -0.18 },
    { x: -0.88, y: -0.25 },
  ],
  [
    { x: -0.42, y: 0.05 },
    { x: -0.24, y: 0.1 },
    { x: -0.15, y: 0.25 },
    { x: -0.2, y: 0.47 },
    { x: -0.31, y: 0.72 },
    { x: -0.43, y: 0.55 },
    { x: -0.5, y: 0.31 },
    { x: -0.52, y: 0.13 },
  ],
  [
    { x: -0.08, y: -0.38 },
    { x: 0.1, y: -0.46 },
    { x: 0.29, y: -0.39 },
    { x: 0.35, y: -0.25 },
    { x: 0.26, y: -0.15 },
    { x: 0.11, y: -0.17 },
    { x: -0.02, y: -0.25 },
  ],
  [
    { x: 0.03, y: -0.1 },
    { x: 0.27, y: -0.13 },
    { x: 0.38, y: 0.06 },
    { x: 0.31, y: 0.34 },
    { x: 0.18, y: 0.56 },
    { x: 0.04, y: 0.38 },
    { x: -0.03, y: 0.12 },
  ],
  [
    { x: 0.22, y: -0.48 },
    { x: 0.48, y: -0.58 },
    { x: 0.76, y: -0.5 },
    { x: 0.91, y: -0.31 },
    { x: 0.82, y: -0.12 },
    { x: 0.61, y: -0.05 },
    { x: 0.54, y: 0.08 },
    { x: 0.39, y: 0.02 },
    { x: 0.33, y: -0.18 },
    { x: 0.19, y: -0.28 },
  ],
  [
    { x: 0.59, y: 0.35 },
    { x: 0.79, y: 0.31 },
    { x: 0.88, y: 0.44 },
    { x: 0.78, y: 0.58 },
    { x: 0.59, y: 0.55 },
    { x: 0.52, y: 0.44 },
  ],
  [
    { x: -0.23, y: -0.73 },
    { x: -0.1, y: -0.78 },
    { x: -0.02, y: -0.67 },
    { x: -0.12, y: -0.58 },
  ],
];

const CITIES: City[] = [
  { x: -0.67, y: -0.22, size: 3.2, phase: 0.4 },
  { x: -0.46, y: -0.18, size: 3, phase: 1.2 },
  { x: -0.38, y: 0.41, size: 2.8, phase: 2.4 },
  { x: 0.02, y: -0.31, size: 3.1, phase: 1.8 },
  { x: 0.12, y: -0.24, size: 2.6, phase: 3.2 },
  { x: 0.2, y: 0.02, size: 2.8, phase: 0.8 },
  { x: 0.36, y: -0.23, size: 3.3, phase: 2 },
  { x: 0.5, y: -0.2, size: 3.4, phase: 4.1 },
  { x: 0.63, y: -0.3, size: 3.4, phase: 0.2 },
  { x: 0.76, y: -0.22, size: 3, phase: 2.8 },
  { x: 0.7, y: 0.43, size: 2.9, phase: 3.7 },
  { x: 0.26, y: 0.3, size: 2.5, phase: 1.1 },
  { x: -0.28, y: 0.18, size: 2.4, phase: 5 },
];

const ROUTES: Route[] = [
  {
    from: { x: -0.67, y: -0.22 },
    to: { x: 0.02, y: -0.31 },
    bend: -0.24,
    rgb: "56,189,248",
  },
  {
    from: { x: 0.02, y: -0.31 },
    to: { x: 0.63, y: -0.3 },
    bend: -0.2,
    rgb: "167,139,250",
  },
  {
    from: { x: 0.36, y: -0.23 },
    to: { x: 0.76, y: -0.22 },
    bend: -0.15,
    rgb: "94,234,212",
  },
  {
    from: { x: -0.38, y: 0.41 },
    to: { x: 0.2, y: 0.02 },
    bend: -0.1,
    rgb: "244,114,182",
  },
  {
    from: { x: 0.5, y: -0.2 },
    to: { x: 0.7, y: 0.43 },
    bend: 0.18,
    rgb: "251,191,36",
  },
];

const STARS = Array.from({ length: 72 }, (_, index) => ({
  x: 24 + ((index * 173) % 1519),
  y: 18 + ((index * 271) % 947),
  opacity: 0.12 + (index % 4) * 0.04,
}));

const GLOBE = { cx: 1120, cy: 505, radius: 355 } as const;

export default function GlobeBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(14,165,233,0.13),transparent_32%),radial-gradient(circle_at_18%_72%,rgba(16,185,129,0.07),transparent_30%),linear-gradient(145deg,#020817_0%,#051426_48%,#02050d_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.025)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(circle_at_center,black,transparent_90%)]" />

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <clipPath id="geography-globe-clip">
            <circle cx={GLOBE.cx} cy={GLOBE.cy} r={GLOBE.radius} />
          </clipPath>
          <radialGradient id="geography-ocean" cx="32%" cy="28%">
            <stop offset="0" stopColor="#0c3b58" />
            <stop offset="0.58" stopColor="#06253c" />
            <stop offset="1" stopColor="#03111f" />
          </radialGradient>
          <linearGradient id="geography-night" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(2,6,23,0.68)" />
            <stop offset="0.46" stopColor="rgba(2,6,23,0.40)" />
            <stop offset="0.56" stopColor="rgba(2,6,23,0.04)" />
            <stop offset="1" stopColor="rgba(2,6,23,0)" />
          </linearGradient>
          <filter
            id="geography-soft-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        <g fill="rgba(186,230,253,0.34)">
          {STARS.map((star) => (
            <circle
              key={`${star.x}-${star.y}`}
              cx={star.x}
              cy={star.y}
              r="1.1"
              opacity={star.opacity}
            />
          ))}
        </g>

        <circle
          cx={GLOBE.cx}
          cy={GLOBE.cy}
          r={GLOBE.radius + 44}
          fill="rgba(14,165,233,0.055)"
          filter="url(#geography-soft-glow)"
        />

        <g clipPath="url(#geography-globe-clip)">
          <circle
            cx={GLOBE.cx}
            cy={GLOBE.cy}
            r={GLOBE.radius}
            fill="url(#geography-ocean)"
          />

          <g fill="none" stroke="rgba(125,211,252,0.095)" strokeWidth="1.2">
            {[-0.67, -0.33, 0, 0.33, 0.67].map((fraction) => (
              <ellipse
                key={`latitude-${fraction}`}
                cx={GLOBE.cx}
                cy={GLOBE.cy + fraction * GLOBE.radius * 0.78}
                rx={
                  GLOBE.radius *
                  Math.sqrt(Math.max(0.02, 1 - fraction * fraction * 0.72))
                }
                ry={GLOBE.radius * 0.12}
              />
            ))}
            {[-0.72, -0.36, 0, 0.36, 0.72].map((fraction) => (
              <ellipse
                key={`longitude-${fraction}`}
                cx={GLOBE.cx}
                cy={GLOBE.cy}
                rx={
                  GLOBE.radius * Math.max(0.12, 1 - Math.abs(fraction) * 0.78)
                }
                ry={GLOBE.radius}
              />
            ))}
          </g>

          <g>
            {LAND.map((polygon, index) => (
              <polygon
                key={index}
                points={polygon.map(toSvgPoint).join(" ")}
                fill={
                  index % 2 === 0
                    ? "rgba(30,94,85,0.62)"
                    : "rgba(35,111,91,0.54)"
                }
                stroke="rgba(134,239,172,0.22)"
                strokeWidth="1.2"
              />
            ))}
          </g>

          <g fill="none" strokeLinecap="round">
            {ROUTES.map((route, index) => (
              <g key={index}>
                <path
                  d={routePath(route)}
                  stroke={`rgba(${route.rgb},0.18)`}
                  strokeWidth="2"
                />
                <path
                  d={routePath(route)}
                  stroke={`rgba(${route.rgb},0.72)`}
                  strokeWidth="3"
                  strokeDasharray="3 70"
                  className="geography-route-flow"
                  style={{ animationDelay: `${index * -2.7}s` }}
                />
              </g>
            ))}
          </g>

          <g>
            {CITIES.map((city) => {
              const point = toSvgCoordinates(city);
              return (
                <g
                  key={`${city.x}-${city.y}`}
                  className="geography-city-pulse"
                  style={{ animationDelay: `${city.phase * -1}s` }}
                >
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={city.size * 5}
                    fill="rgba(56,189,248,0.10)"
                  />
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={city.size}
                    fill="rgba(254,249,195,0.82)"
                  />
                </g>
              );
            })}
          </g>

          <rect
            x={GLOBE.cx - GLOBE.radius}
            y={GLOBE.cy - GLOBE.radius}
            width={GLOBE.radius * 2}
            height={GLOBE.radius * 2}
            fill="url(#geography-night)"
            className="geography-night-band"
          />
        </g>

        <circle
          cx={GLOBE.cx}
          cy={GLOBE.cy}
          r={GLOBE.radius}
          fill="none"
          stroke="rgba(125,211,252,0.30)"
          strokeWidth="2"
        />
        <circle
          cx={GLOBE.cx}
          cy={GLOBE.cy}
          r={GLOBE.radius + 8}
          fill="none"
          stroke="rgba(186,230,253,0.10)"
        />

        <g transform="translate(76 330)">
          <rect
            width="260"
            height="138"
            fill="rgba(3,16,31,0.28)"
            stroke="rgba(125,211,252,0.15)"
          />
          <g
            fill="rgba(186,230,253,0.34)"
            fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
            fontSize="11"
          >
            <text x="16" y="29">
              HUMAN GEOGRAPHY
            </text>
            <text x="16" y="56">
              PATTERN / CONNECTION / SCALE
            </text>
            <text x="16" y="83">
              CITY LIGHTS · ILLUSTRATIVE
            </text>
            <text x="16" y="110">
              ROUTES · CONCEPTUAL FLOWS
            </text>
          </g>
          <path
            d="M260 69L465 130"
            fill="none"
            stroke="rgba(125,211,252,0.13)"
          />
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_69%_51%,transparent_28%,rgba(2,6,23,0.30)_70%,rgba(2,5,13,0.66)_100%)]" />
      <div className="from-[#020817]/82 absolute inset-x-0 top-0 h-[17%] bg-gradient-to-b to-transparent" />
      <div className="from-[#020817]/78 absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t to-transparent" />
      <style>{`
        @keyframes geographyRouteFlow {
          to { stroke-dashoffset: -146; }
        }
        @keyframes geographyCityPulse {
          0%, 100% { opacity: .55; }
          50% { opacity: 1; }
        }
        @keyframes geographyNightShift {
          0%, 100% { transform: rotate(-5deg); }
          50% { transform: rotate(7deg); }
        }
        .geography-route-flow { animation: geographyRouteFlow 12s linear infinite; }
        .geography-city-pulse { animation: geographyCityPulse 5.5s ease-in-out infinite; }
        .geography-night-band {
          animation: geographyNightShift 28s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }
        @media (prefers-reduced-motion: reduce) {
          .geography-route-flow,
          .geography-city-pulse,
          .geography-night-band { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function toSvgCoordinates(point: Point) {
  return {
    x: GLOBE.cx + point.x * GLOBE.radius,
    y: GLOBE.cy + point.y * GLOBE.radius,
  };
}

function toSvgPoint(point: Point) {
  const coordinates = toSvgCoordinates(point);
  return `${coordinates.x},${coordinates.y}`;
}

function routePath(route: Route) {
  const from = toSvgCoordinates(route.from);
  const to = toSvgCoordinates(route.to);
  const control = {
    x: (from.x + to.x) / 2,
    y: (from.y + to.y) / 2 + route.bend * GLOBE.radius,
  };
  return `M${from.x} ${from.y}Q${control.x} ${control.y} ${to.x} ${to.y}`;
}
