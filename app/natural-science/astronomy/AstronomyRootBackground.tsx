import { ASTRONOMY_LIGHT_TRAVEL_EXAMPLES } from "./astronomyModel";

const STAR_FIELD = [
  [92, 116, 1.4],
  [168, 222, 0.9],
  [252, 82, 1.1],
  [336, 174, 1.8],
  [438, 104, 0.8],
  [548, 214, 1.2],
  [666, 72, 1.5],
  [760, 184, 0.8],
  [872, 96, 1.2],
  [982, 210, 1.7],
  [1096, 78, 0.9],
  [1214, 168, 1.3],
  [1326, 94, 1.8],
  [1452, 230, 1],
  [118, 398, 1.1],
  [288, 328, 0.8],
  [492, 402, 1.5],
  [720, 324, 1],
  [930, 390, 0.9],
  [1158, 336, 1.4],
  [1402, 416, 0.8],
  [206, 606, 1.4],
  [410, 534, 0.8],
  [642, 632, 1.1],
  [968, 548, 1.5],
  [1266, 618, 1],
  [1494, 526, 1.3],
] as const;

const SOURCE_MARKS = [
  { x: 686, y: 825, example: ASTRONOMY_LIGHT_TRAVEL_EXAMPLES[0], radius: 7 },
  { x: 572, y: 704, example: ASTRONOMY_LIGHT_TRAVEL_EXAMPLES[1], radius: 13 },
  { x: 1050, y: 563, example: ASTRONOMY_LIGHT_TRAVEL_EXAMPLES[2], radius: 9 },
  { x: 412, y: 350, example: ASTRONOMY_LIGHT_TRAVEL_EXAMPLES[3], radius: 18 },
] as const;

export default function AstronomyRootBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#010208]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1600 1100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="astro-deep-field" cx="50%" cy="82%" r="88%">
            <stop offset="0" stopColor="#10203b" />
            <stop offset="0.36" stopColor="#080d22" />
            <stop offset="0.72" stopColor="#030611" />
            <stop offset="1" stopColor="#010208" />
          </radialGradient>
          <linearGradient id="astro-light-cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="rgba(192,132,252,0.02)" />
            <stop offset="0.55" stopColor="rgba(34,211,238,0.07)" />
            <stop offset="1" stopColor="rgba(165,243,252,0.18)" />
          </linearGradient>
          <radialGradient id="astro-observer" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="rgba(207,250,254,0.94)" />
            <stop offset="0.28" stopColor="rgba(34,211,238,0.44)" />
            <stop offset="1" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
          <filter
            id="astro-soft-glow"
            x="-100%"
            y="-100%"
            width="300%"
            height="300%"
          >
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>

        <rect width="1600" height="1100" fill="url(#astro-deep-field)" />

        <g fill="#e0f2fe">
          {STAR_FIELD.map(([x, y, radius], index) => (
            <circle
              key={`${x}-${y}`}
              cx={x}
              cy={y}
              r={radius}
              opacity={0.18 + (index % 4) * 0.08}
            />
          ))}
        </g>

        <g opacity="0.22" fill="none" stroke="#a78bfa">
          <path d="M45 232 C188 146 274 298 414 215 S678 126 816 220 S1060 318 1196 208 S1438 142 1578 246" />
          <path d="M34 301 C194 374 298 216 454 318 S720 390 882 292 S1174 212 1322 314 S1492 344 1580 298" />
          <path d="M188 148 L308 268 L454 178 L594 292 L738 166 L892 280 L1044 152 L1196 272 L1352 176" />
          {[
            [188, 148],
            [308, 268],
            [454, 178],
            [594, 292],
            [738, 166],
            [892, 280],
            [1044, 152],
            [1196, 272],
            [1352, 176],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="5" fill="#c4b5fd" />
          ))}
        </g>

        <path
          d="M80 86 L800 1010 L1520 86 Z"
          fill="url(#astro-light-cone)"
          stroke="rgba(125,211,252,0.10)"
        />

        <g fill="none" stroke="rgba(125,211,252,0.16)" strokeDasharray="4 12">
          <ellipse cx="800" cy="1010" rx="176" ry="118" />
          <ellipse cx="800" cy="1010" rx="330" ry="244" />
          <ellipse cx="800" cy="1010" rx="520" ry="392" />
          <ellipse cx="800" cy="1010" rx="720" ry="556" />
          <ellipse cx="800" cy="1010" rx="930" ry="744" />
        </g>

        <g strokeLinecap="round">
          {SOURCE_MARKS.map(({ x, y, example, radius }) => (
            <g key={example.id}>
              <line
                x1={x}
                y1={y}
                x2="800"
                y2="1002"
                stroke={`rgba(${example.accentRgb},0.22)`}
                strokeDasharray="8 13"
              />
              <circle
                cx={x}
                cy={y}
                r={radius * 2.2}
                fill={`rgba(${example.accentRgb},0.09)`}
                filter="url(#astro-soft-glow)"
              />
              <circle
                cx={x}
                cy={y}
                r={radius}
                fill={`rgba(${example.accentRgb},0.64)`}
                stroke={`rgba(${example.accentRgb},0.88)`}
              />
            </g>
          ))}
        </g>

        <g transform="translate(800 1008)">
          <circle r="82" fill="url(#astro-observer)" opacity="0.34" />
          <path
            d="M-42 24 Q-5 -22 40 -3 Q24 37 -9 42 Q-29 40 -42 24 Z M5 38 V61 M-19 61 H29"
            fill="rgba(8,18,38,0.92)"
            stroke="rgba(165,243,252,0.72)"
            strokeWidth="3"
          />
        </g>

        <g opacity="0.34" stroke="rgba(244,114,182,0.58)" fill="none">
          <path d="M1180 678 C1218 654 1250 702 1288 678 S1358 654 1394 678 S1462 702 1502 678" />
          <path d="M1180 694 C1218 670 1250 718 1288 694 S1358 670 1394 694 S1462 718 1502 694" />
        </g>

        <g
          fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
          fontSize="12"
          letterSpacing="2"
          fill="rgba(186,230,253,0.32)"
        >
          <text x="76" y="1038">
            CONCEPTUAL LOOKBACK FIELD · INTERVALS NOT TO SCALE
          </text>
          <text x="1190" y="1028">
            SIGNAL → DETECTOR → MODEL
          </text>
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_74%,transparent_8%,rgba(1,2,8,0.12)_52%,rgba(1,2,8,0.66)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[30%] bg-gradient-to-b from-[#010208]/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#010208]/70 to-transparent" />
    </div>
  );
}
