const CONTOURS = [
  "M-40 238C140 172 290 262 462 204S788 176 944 230s310 48 536-26",
  "M-30 292C150 226 302 316 474 258S800 230 956 284s310 48 536-26",
  "M-20 346C160 280 314 370 486 312S812 284 968 338s310 48 536-26",
] as const;

const FIELD_NODES = [
  { x: 180, label: "OBSERVE", rgb: "250,204,21" },
  { x: 510, label: "RECORD", rgb: "34,211,238" },
  { x: 840, label: "CONTEXT", rgb: "251,146,60" },
  { x: 1170, label: "CONSULT", rgb: "52,211,153" },
] as const;

const STRATA = [
  {
    path: "M0 650C190 622 316 682 500 648s344-10 500 20 284 20 440-8V714H0Z",
    fill: "rgba(180,112,62,0.08)",
  },
  {
    path: "M0 714C180 682 326 746 510 708s352-4 504 28 276 20 426-6V778H0Z",
    fill: "rgba(128,82,55,0.10)",
  },
  {
    path: "M0 778C190 746 324 812 518 774s354-2 506 30 274 16 416-8V900H0Z",
    fill: "rgba(75,57,48,0.16)",
  },
] as const;

export default function PaleoBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#160d09]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(250,204,21,0.08),transparent_26%),radial-gradient(circle_at_78%_24%,rgba(34,211,238,0.055),transparent_26%),radial-gradient(circle_at_67%_82%,rgba(251,146,60,0.07),transparent_31%),linear-gradient(145deg,#160d09_0%,#12100d_48%,#090908_100%)]" />
      <svg
        className="absolute inset-[4%_1%_7%_1%] h-[89%] w-[98%] opacity-75"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="anthropology-grid"
            width="38"
            height="38"
            patternUnits="userSpaceOnUse"
          >
            <path d="M38 0H0V38" fill="none" stroke="rgba(255,243,214,0.028)" />
          </pattern>
          <linearGradient id="record-chain" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(250,204,21,0.22)" />
            <stop offset="0.35" stopColor="rgba(34,211,238,0.20)" />
            <stop offset="0.68" stopColor="rgba(251,146,60,0.22)" />
            <stop offset="1" stopColor="rgba(52,211,153,0.22)" />
          </linearGradient>
        </defs>

        <rect
          x="16"
          y="16"
          width="1408"
          height="868"
          fill="url(#anthropology-grid)"
          stroke="rgba(255,243,214,0.045)"
        />
        {CONTOURS.map((path) => (
          <path
            key={path}
            d={path}
            fill="none"
            stroke="rgba(250,204,21,0.045)"
          />
        ))}

        <text
          x="62"
          y="74"
          fill="rgba(255,243,214,0.20)"
          fontFamily="monospace"
          fontSize="12"
        >
          FIELD RECORD · PERSON / PLACE / TIME / RELATIONSHIP / POSITION
        </text>
        <line
          x1="180"
          y1="170"
          x2="1170"
          y2="170"
          stroke="url(#record-chain)"
          strokeWidth="2"
        />
        {FIELD_NODES.map((node, index) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy="170"
              r="23"
              fill={`rgba(${node.rgb},0.035)`}
              stroke={`rgba(${node.rgb},0.20)`}
            />
            <circle
              cx={node.x}
              cy="170"
              r="5"
              fill={`rgba(${node.rgb},0.28)`}
            />
            <text
              x={node.x}
              y="212"
              textAnchor="middle"
              fill={`rgba(${node.rgb},0.28)`}
              fontFamily="monospace"
              fontSize="10"
            >
              0{index + 1} · {node.label}
            </text>
          </g>
        ))}

        <g transform="translate(82 310)">
          <rect
            width="360"
            height="248"
            rx="16"
            fill="rgba(28,18,12,0.10)"
            stroke="rgba(250,204,21,0.08)"
          />
          <text
            x="26"
            y="36"
            fill="rgba(250,204,21,0.24)"
            fontFamily="monospace"
            fontSize="11"
          >
            ETHNOGRAPHIC NOTE · OBSERVATION ≠ INTERPRETATION
          </text>
          {[76, 108, 140, 172, 204].map((y, index) => (
            <g key={y}>
              <circle
                cx="32"
                cy={y - 3}
                r="4"
                fill={
                  index === 1
                    ? "rgba(34,211,238,0.26)"
                    : "rgba(250,204,21,0.18)"
                }
              />
              <line
                x1="52"
                y1={y}
                x2={index % 2 ? 316 : 286}
                y2={y}
                stroke="rgba(255,243,214,0.075)"
              />
            </g>
          ))}
          <path
            d="M248 60c38 18 55 44 54 78s-26 67-64 84"
            fill="none"
            stroke="rgba(34,211,238,0.10)"
            strokeDasharray="5 8"
          />
        </g>

        <g transform="translate(1002 310)">
          <rect
            width="350"
            height="248"
            rx="16"
            fill="rgba(10,15,14,0.10)"
            stroke="rgba(34,211,238,0.08)"
          />
          <text
            x="24"
            y="36"
            fill="rgba(34,211,238,0.23)"
            fontFamily="monospace"
            fontSize="11"
          >
            SPEECH EVENT · AUDIENCE / TURN / REGISTER
          </text>
          <path
            d="M22 130C42 78 62 184 82 130s40-52 60 0 40 54 60 0 40-48 60 0 42 46 66 0"
            fill="none"
            stroke="rgba(34,211,238,0.22)"
            strokeWidth="2"
          />
          <path
            d="M22 130c34-18 50 20 84 0s50-18 84 0 50 20 84 0 42-15 54 0"
            fill="none"
            stroke="rgba(250,204,21,0.10)"
          />
          {[82, 178, 276].map((x, index) => (
            <g key={x}>
              <circle
                cx={x}
                cy="192"
                r="16"
                fill="rgba(34,211,238,0.025)"
                stroke="rgba(34,211,238,0.12)"
              />
              <line
                x1={x - 30}
                y1="226"
                x2={x + 30}
                y2="226"
                stroke={
                  index === 1
                    ? "rgba(250,204,21,0.12)"
                    : "rgba(34,211,238,0.10)"
                }
              />
            </g>
          ))}
        </g>

        <g transform="translate(536 300)">
          <circle
            cx="184"
            cy="128"
            r="112"
            fill="rgba(251,146,60,0.018)"
            stroke="rgba(251,146,60,0.10)"
          />
          <circle
            cx="184"
            cy="128"
            r="74"
            fill="none"
            stroke="rgba(52,211,153,0.09)"
          />
          <path
            d="M184 54v148M110 128h148"
            stroke="rgba(255,243,214,0.06)"
            strokeDasharray="4 7"
          />
          <text
            x="184"
            y="122"
            textAnchor="middle"
            fill="rgba(255,243,214,0.23)"
            fontFamily="monospace"
            fontSize="11"
          >
            CLAIM
          </text>
          <text
            x="184"
            y="143"
            textAnchor="middle"
            fill="rgba(255,243,214,0.15)"
            fontFamily="monospace"
            fontSize="10"
          >
            WHO · WHERE · WHEN · HOW
          </text>
        </g>

        {STRATA.map((layer) => (
          <path key={layer.path} d={layer.path} fill={layer.fill} />
        ))}
        <path
          d="M0 650C190 622 316 682 500 648s344-10 500 20 284 20 440-8"
          fill="none"
          stroke="rgba(251,146,60,0.16)"
        />
        <g transform="translate(300 735) rotate(-8)">
          <path
            d="M0-22 17 18 0 9-17 18Z"
            fill="rgba(251,146,60,0.06)"
            stroke="rgba(251,146,60,0.20)"
          />
          <line
            x1="28"
            y1="0"
            x2="178"
            y2="0"
            stroke="rgba(251,146,60,0.12)"
            strokeDasharray="5 7"
          />
          <text
            x="188"
            y="4"
            fill="rgba(251,146,60,0.21)"
            fontFamily="monospace"
            fontSize="10"
          >
            OBJECT + PROVENIENCE + ASSOCIATION
          </text>
        </g>
        <g transform="translate(1010 740)">
          {[0, 1, 2, 3, 4].map((index) => (
            <g key={index} transform={`translate(${index * 58} 0)`}>
              <circle
                r={index === 2 ? 21 : 15}
                fill="rgba(52,211,153,0.025)"
                stroke="rgba(52,211,153,0.14)"
              />
              {index > 0 ? (
                <line
                  x1="-43"
                  y1="0"
                  x2="-18"
                  y2="0"
                  stroke="rgba(52,211,153,0.11)"
                />
              ) : null}
            </g>
          ))}
          <text
            x="116"
            y="52"
            textAnchor="middle"
            fill="rgba(52,211,153,0.19)"
            fontFamily="monospace"
            fontSize="10"
          >
            VARIATION · OVERLAP · HISTORY
          </text>
        </g>
      </svg>
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#160d09] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#090807] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(9,6,5,0.72)_100%)]" />
    </div>
  );
}
