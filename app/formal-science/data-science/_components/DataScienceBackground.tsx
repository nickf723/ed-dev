import { KMEANS_POINTS } from "../dataScienceModel";

const TABLE_ROWS = Array.from({ length: 9 }, (_, row) =>
  Array.from({ length: 5 }, (_, column) => ({
    id: `${row}-${column}`,
    missing: (row * 7 + column * 11) % 17 === 0,
    flagged: column === 4 && row % 4 === 0,
  }))
);

export default function DataScienceBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
      data-background="data-workbench"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(34,211,238,0.10),transparent_31%),radial-gradient(circle_at_76%_28%,rgba(167,139,250,0.09),transparent_34%),radial-gradient(circle_at_58%_82%,rgba(244,114,182,0.055),transparent_36%),linear-gradient(145deg,#03070c_0%,#06111a_48%,#050612_100%)]" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(148,163,184,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(148,163,184,0.03) 1px,transparent 1px)",
          backgroundSize: "62px 62px",
          maskImage:
            "linear-gradient(to bottom,transparent,black 18%,black 84%,transparent)",
        }}
      />

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        role="presentation"
      >
        <defs>
          <linearGradient id="data-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(34,211,238,0.02)" />
            <stop offset="0.48" stopColor="rgba(34,211,238,0.18)" />
            <stop offset="1" stopColor="rgba(167,139,250,0.04)" />
          </linearGradient>
          <filter id="data-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
        </defs>

        <g opacity="0.72">
          <WorkbenchPanel
            x={70}
            width={390}
            label="RAW TABLE"
            note="measure · missingness · provenance"
            rgb="34,211,238"
          />
          <WorkbenchPanel
            x={605}
            width={390}
            label="FEATURE SPACE"
            note="transform · scale · compare"
            rgb="167,139,250"
          />
          <WorkbenchPanel
            x={1140}
            width={390}
            label="MODEL VIEW"
            note="fit · evaluate · monitor"
            rgb="244,114,182"
          />

          <g transform="translate(94 274)">
            {TABLE_ROWS.map((row, rowIndex) =>
              row.map((cell, columnIndex) => (
                <g key={cell.id}>
                  <rect
                    x={columnIndex * 66}
                    y={rowIndex * 44}
                    width="58"
                    height="35"
                    rx="3"
                    fill={
                      cell.missing
                        ? "rgba(248,113,113,0.07)"
                        : cell.flagged
                          ? "rgba(251,191,36,0.055)"
                          : "rgba(148,163,184,0.018)"
                    }
                    stroke="rgba(148,163,184,0.055)"
                  />
                  {cell.missing ? (
                    <text
                      x={columnIndex * 66 + 10}
                      y={rowIndex * 44 + 22}
                      fill="rgba(248,113,113,0.26)"
                      fontSize="10"
                      fontFamily="monospace"
                    >
                      NA
                    </text>
                  ) : null}
                </g>
              ))
            )}
          </g>

          <g transform="translate(644 258)">
            <path d="M0 405V0M0 405H312" stroke="rgba(203,213,225,0.11)" />
            {KMEANS_POINTS.map((point) => {
              const rgb =
                point.id % 3 === 0
                  ? "34,211,238"
                  : point.id % 3 === 1
                    ? "167,139,250"
                    : "244,114,182";
              return (
                <circle
                  key={point.id}
                  cx={(point.x / 100) * 312}
                  cy={405 - (point.y / 100) * 405}
                  r={point.id % 4 === 0 ? 3.2 : 2.2}
                  fill={`rgba(${rgb},0.25)`}
                />
              );
            })}
            {[
              { x: 26, y: 30, rgb: "34,211,238" },
              { x: 67, y: 31, rgb: "167,139,250" },
              { x: 50, y: 70, rgb: "244,114,182" },
            ].map((center) => (
              <g
                key={center.rgb}
                transform={`translate(${(center.x / 100) * 312} ${405 - (center.y / 100) * 405})`}
              >
                <circle
                  r="18"
                  fill={`rgba(${center.rgb},0.025)`}
                  stroke={`rgba(${center.rgb},0.23)`}
                />
                <path d="M-7 0H7M0-7V7" stroke={`rgba(${center.rgb},0.42)`} />
              </g>
            ))}
          </g>

          <g transform="translate(1176 280)">
            <path
              d="M0 338 C42 305 75 324 112 255 S181 196 220 208 S277 136 324 72"
              fill="none"
              stroke="rgba(244,114,182,0.24)"
              strokeWidth="3"
            />
            <path
              d="M0 352 C42 319 75 338 112 269 S181 210 220 222 S277 150 324 86"
              fill="none"
              stroke="rgba(34,211,238,0.10)"
              strokeWidth="18"
            />
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <g
                key={index}
                transform={`translate(${index * 62} ${332 - index * 45})`}
              >
                <rect
                  width="38"
                  height={38 + index * 17}
                  y={-(38 + index * 17)}
                  rx="3"
                  fill={
                    index === 5
                      ? "rgba(251,191,36,0.09)"
                      : "rgba(148,163,184,0.035)"
                  }
                  stroke={
                    index === 5
                      ? "rgba(251,191,36,0.22)"
                      : "rgba(148,163,184,0.07)"
                  }
                />
              </g>
            ))}
          </g>

          <path d="M460 490H605" stroke="url(#data-flow)" strokeWidth="2" />
          <path d="M995 490H1140" stroke="url(#data-flow)" strokeWidth="2" />
          {[500, 532, 564].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy="490"
              r={index === 1 ? 5 : 3}
              fill="rgba(34,211,238,0.26)"
              filter="url(#data-glow)"
            />
          ))}
          {[1035, 1067, 1099].map((x, index) => (
            <circle
              key={x}
              cx={x}
              cy="490"
              r={index === 1 ? 5 : 3}
              fill="rgba(167,139,250,0.25)"
              filter="url(#data-glow)"
            />
          ))}
        </g>

        <g opacity="0.38">
          <path d="M82 850H1518" stroke="rgba(248,113,113,0.14)" />
          <rect
            x="82"
            y="830"
            width="184"
            height="39"
            rx="19"
            fill="rgba(248,113,113,0.035)"
            stroke="rgba(248,113,113,0.12)"
          />
          <text
            x="108"
            y="854"
            fill="rgba(254,202,202,0.55)"
            fontSize="11"
            fontFamily="monospace"
          >
            EVALUATION BOUNDARY
          </text>
          {[
            "provenance",
            "leakage",
            "baseline",
            "held-out",
            "shift",
            "decision cost",
          ].map((label, index) => (
            <g key={label} transform={`translate(${350 + index * 186} 834)`}>
              <circle
                cx="7"
                cy="16"
                r="6"
                fill={
                  index < 4 ? "rgba(94,234,212,0.13)" : "rgba(251,191,36,0.13)"
                }
                stroke={
                  index < 4 ? "rgba(94,234,212,0.34)" : "rgba(251,191,36,0.32)"
                }
              />
              <text
                x="22"
                y="20"
                fill="rgba(203,213,225,0.42)"
                fontSize="10"
                fontFamily="monospace"
              >
                {label}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#03070c]/90 to-transparent" />
      <div className="from-[#03070c]/86 absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(0,0,0,0.50)_100%)]" />
    </div>
  );
}

function WorkbenchPanel({
  x,
  width,
  label,
  note,
  rgb,
}: {
  x: number;
  width: number;
  label: string;
  note: string;
  rgb: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y="190"
        width={width}
        height="520"
        rx="22"
        fill="rgba(2,6,12,0.18)"
        stroke={`rgba(${rgb},0.13)`}
      />
      <text
        x={x + 24}
        y="224"
        fill={`rgba(${rgb},0.43)`}
        fontSize="12"
        fontWeight="600"
        fontFamily="monospace"
      >
        {label}
      </text>
      <text
        x={x + 24}
        y="246"
        fill="rgba(148,163,184,0.25)"
        fontSize="10"
        fontFamily="monospace"
      >
        {note}
      </text>
    </g>
  );
}
