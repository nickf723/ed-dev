export default function LearningStudioBackground() {
  const attempts = [
    {
      x: 120,
      y: 240,
      title: "ATTEMPT 01",
      rgb: "96,165,250",
      marks: [0.62, 0.38, 0.72],
    },
    {
      x: 470,
      y: 205,
      title: "ATTEMPT 02",
      rgb: "167,139,250",
      marks: [0.78, 0.61, 0.83],
    },
    {
      x: 835,
      y: 255,
      title: "REVISION",
      rgb: "52,211,153",
      marks: [0.88, 0.78, 0.92],
    },
    {
      x: 1160,
      y: 210,
      title: "NEW CONTEXT",
      rgb: "251,191,36",
      marks: [0.74, 0.82, 0.69],
    },
  ] as const;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#070911]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_42%,rgba(96,165,250,0.065),transparent_34%),radial-gradient(circle_at_78%_70%,rgba(167,139,250,0.04),transparent_30%),linear-gradient(145deg,#070911_0%,#080a12_50%,#0d0911_100%)]" />
      <svg
        className="absolute inset-[9%_2%_11%_2%] h-[80%] w-[96%] opacity-90"
        viewBox="0 0 1440 740"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="learning-grid"
            width="46"
            height="46"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M46 0H0V46"
              fill="none"
              stroke="rgba(96,165,250,0.04)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="review-strip" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(219,234,254,0)" />
            <stop offset="0.5" stopColor="rgba(219,234,254,0.10)" />
            <stop offset="1" stopColor="rgba(219,234,254,0)" />
          </linearGradient>
        </defs>
        <rect
          x="18"
          y="18"
          width="1404"
          height="704"
          fill="url(#learning-grid)"
          stroke="rgba(96,165,250,0.055)"
        />
        <text
          x="72"
          y="84"
          fill="rgba(147,197,253,0.27)"
          fontSize="13"
          fontFamily="monospace"
        >
          LEARNING EVIDENCE WALL · GOAL / EXPERIENCE / ATTEMPT / FEEDBACK /
          REVISION / TRANSFER
        </text>

        <path
          d="M180 505C330 565 472 548 590 485S812 428 930 493s236 72 355 20"
          fill="none"
          stroke="rgba(96,165,250,0.10)"
          strokeWidth="2"
          strokeDasharray="7 10"
        />

        {attempts.map((attempt, attemptIndex) => (
          <g
            key={attempt.title}
            transform={`translate(${attempt.x} ${attempt.y}) rotate(${attemptIndex % 2 ? 1.5 : -1.2})`}
          >
            <rect
              width="245"
              height="245"
              rx="8"
              fill="rgba(248,250,252,0.022)"
              stroke={`rgba(${attempt.rgb},0.14)`}
            />
            <text
              x="18"
              y="29"
              fill={`rgba(${attempt.rgb},0.31)`}
              fontSize="11"
              fontFamily="monospace"
            >
              {attempt.title}
            </text>
            <line
              x1="18"
              y1="43"
              x2="225"
              y2="43"
              stroke="rgba(255,255,255,0.06)"
            />
            {[0, 1, 2].map((row) => (
              <g key={row} transform={`translate(18 ${71 + row * 52})`}>
                <rect
                  width="205"
                  height="31"
                  rx="5"
                  fill="rgba(255,255,255,0.012)"
                  stroke="rgba(255,255,255,0.045)"
                />
                <rect
                  x="8"
                  y="10"
                  width={178 * attempt.marks[row]}
                  height="10"
                  rx="5"
                  fill={`rgba(${attempt.rgb},0.08)`}
                />
                <path
                  d={`M12 24h${118 + row * 17}`}
                  stroke="rgba(226,232,240,0.08)"
                />
              </g>
            ))}
            {attemptIndex < 3 ? (
              <>
                <path
                  d="M198 58l24 15-21 11"
                  fill="none"
                  stroke={`rgba(${attempt.rgb},0.18)`}
                />
                <text
                  x="132"
                  y="229"
                  fill={`rgba(${attempt.rgb},0.20)`}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  FEEDBACK → NEXT ATTEMPT
                </text>
              </>
            ) : (
              <text
                x="125"
                y="229"
                fill={`rgba(${attempt.rgb},0.20)`}
                fontSize="9"
                fontFamily="monospace"
              >
                TRANSFER EVIDENCE
              </text>
            )}
          </g>
        ))}

        <g transform="translate(130 570)">
          <text
            x="0"
            y="0"
            fill="rgba(167,139,250,0.24)"
            fontSize="11"
            fontFamily="monospace"
          >
            CONCEPT MAP · CONNECTIONS CAN CHANGE AS UNDERSTANDING CHANGES
          </text>
          {[
            [40, 50, "prior"],
            [175, 80, "idea A"],
            [310, 42, "idea B"],
            [455, 82, "example"],
            [605, 48, "new case"],
          ].map(([x, y, label], index, list) => (
            <g
              key={String(label)}
              transform={`translate(${Number(x)} ${Number(y)})`}
            >
              {index > 0 ? (
                <line
                  x1={-Number(x) + Number(list[index - 1][0])}
                  y1={-Number(y) + Number(list[index - 1][1])}
                  x2="0"
                  y2="0"
                  stroke="rgba(167,139,250,0.10)"
                />
              ) : null}
              <circle
                r="14"
                fill="rgba(167,139,250,0.035)"
                stroke="rgba(167,139,250,0.16)"
              />
              <text
                x="0"
                y="35"
                textAnchor="middle"
                fill="rgba(196,181,253,0.19)"
                fontSize="9"
                fontFamily="monospace"
              >
                {String(label).toUpperCase()}
              </text>
            </g>
          ))}
        </g>

        <g transform="translate(1040 565)">
          <text
            x="0"
            y="0"
            fill="rgba(52,211,153,0.24)"
            fontSize="11"
            fontFamily="monospace"
          >
            EVIDENCE SOURCES
          </text>
          {[
            ["observation", "96,165,250"],
            ["performance", "52,211,153"],
            ["explanation", "167,139,250"],
            ["product", "251,191,36"],
          ].map(([label, rgb], index) => (
            <g key={label} transform={`translate(0 ${24 + index * 33})`}>
              <circle cx="5" cy="5" r="5" fill={`rgba(${rgb},0.16)`} />
              <text
                x="21"
                y="9"
                fill={`rgba(${rgb},0.22)`}
                fontSize="10"
                fontFamily="monospace"
              >
                {label.toUpperCase()}
              </text>
            </g>
          ))}
        </g>

        <rect
          x="180"
          y="18"
          width="155"
          height="704"
          fill="url(#review-strip)"
          opacity="0.46"
        />
        <rect
          x="665"
          y="18"
          width="94"
          height="704"
          fill="url(#review-strip)"
          opacity="0.28"
        />
        <rect
          x="1125"
          y="18"
          width="128"
          height="704"
          fill="url(#review-strip)"
          opacity="0.36"
        />
      </svg>
      <div className="via-[#070911]/82 absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#070911] to-transparent" />
      <div className="via-[#070911]/84 absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#070911] to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(4,5,12,0.72)_100%)]" />
    </div>
  );
}
