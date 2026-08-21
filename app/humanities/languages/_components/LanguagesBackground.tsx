import {
  LANGUAGE_PRACTICE_STAGES,
  LANGUAGE_TRANSLATION_EXAMPLES,
} from "../languagesModel";

const SOURCE_ROWS = [
  { y: 214, width: 330, color: "216,180,254" },
  { y: 260, width: 270, color: "216,180,254" },
  { y: 306, width: 355, color: "251,191,36" },
  { y: 378, width: 295, color: "244,114,182" },
  { y: 424, width: 340, color: "244,114,182" },
] as const;

const TARGET_ROWS = [
  { y: 210, width: 286, color: "125,211,252" },
  { y: 268, width: 350, color: "125,211,252" },
  { y: 318, width: 250, color: "94,234,212" },
  { y: 374, width: 336, color: "94,234,212" },
  { y: 430, width: 278, color: "244,114,182" },
] as const;

export default function LanguagesBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#0a0c10]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_66%_45%,rgba(216,180,254,0.065),transparent_34%),radial-gradient(circle_at_24%_68%,rgba(251,191,36,0.025),transparent_30%),linear-gradient(142deg,#0a0c10_0%,#12101a_52%,#110c12_100%)]" />

      <svg
        className="absolute inset-[9%_2%_10%_2%] h-[81%] w-[96%] opacity-90"
        viewBox="0 0 1500 820"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="language-desk-grid"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <path d="M48 0H0V48" fill="none" stroke="rgba(216,180,254,0.035)" />
          </pattern>
          <linearGradient id="language-reading-light" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(251,191,36,0)" />
            <stop offset="0.5" stopColor="rgba(251,191,36,0.10)" />
            <stop offset="1" stopColor="rgba(251,191,36,0)" />
          </linearGradient>
        </defs>

        <rect
          x="24"
          y="22"
          width="1452"
          height="776"
          rx="34"
          fill="url(#language-desk-grid)"
          stroke="rgba(216,180,254,0.065)"
        />

        <g transform="translate(355 92)">
          <rect
            x="0"
            y="0"
            width="790"
            height="560"
            rx="28"
            fill="rgba(246,240,230,0.018)"
            stroke="rgba(251,191,36,0.075)"
          />
          <text
            x="34"
            y="42"
            fill="rgba(216,180,254,0.28)"
            fontSize="12"
            fontFamily="monospace"
          >
            SOURCE
          </text>
          <text
            x="756"
            y="42"
            textAnchor="end"
            fill="rgba(125,211,252,0.28)"
            fontSize="12"
            fontFamily="monospace"
          >
            TARGET
          </text>
          <line
            x1="395"
            y1="24"
            x2="395"
            y2="532"
            stroke="rgba(251,191,36,0.10)"
            strokeDasharray="5 8"
          />

          {SOURCE_ROWS.map((row, index) => (
            <g key={row.y}>
              <line
                x1="34"
                y1={row.y}
                x2={34 + row.width}
                y2={row.y}
                stroke={`rgba(${row.color},${0.13 + index * 0.012})`}
                strokeWidth={index % 2 ? 1.4 : 2}
              />
              <circle
                cx="34"
                cy={row.y}
                r="3"
                fill={`rgba(${row.color},0.17)`}
              />
            </g>
          ))}
          {TARGET_ROWS.map((row, index) => (
            <g key={row.y}>
              <line
                x1="430"
                y1={row.y}
                x2={430 + row.width}
                y2={row.y}
                stroke={`rgba(${row.color},${0.13 + index * 0.012})`}
                strokeWidth={index % 2 ? 1.4 : 2}
              />
              <circle
                cx={430 + row.width}
                cy={row.y}
                r="3"
                fill={`rgba(${row.color},0.17)`}
              />
            </g>
          ))}

          {SOURCE_ROWS.map((row, index) => {
            const target = TARGET_ROWS[index];
            return (
              <path
                key={`alignment-${row.y}`}
                d={`M${34 + row.width} ${row.y} C382 ${row.y},408 ${target.y},430 ${target.y}`}
                fill="none"
                stroke={
                  index % 2
                    ? "rgba(125,211,252,0.075)"
                    : "rgba(216,180,254,0.075)"
                }
              />
            );
          })}

          <g transform="translate(34 76)">
            {LANGUAGE_TRANSLATION_EXAMPLES.slice(0, 2).map((example, index) => (
              <g key={example.key} transform={`translate(0 ${index * 54})`}>
                <text x="0" y="0" fill="rgba(245,245,244,0.18)" fontSize="15">
                  {example.source}
                </text>
                <text x="396" y="0" fill="rgba(254,243,199,0.18)" fontSize="15">
                  {example.target}
                </text>
              </g>
            ))}
          </g>

          <text
            x="395"
            y="548"
            textAnchor="middle"
            fill="rgba(251,191,36,0.20)"
            fontSize="11"
            fontFamily="monospace"
          >
            ALIGN MEANING · NOT TOKEN POSITION
          </text>
        </g>

        <g transform="translate(82 182)">
          <text
            x="0"
            y="0"
            fill="rgba(244,114,182,0.25)"
            fontSize="11"
            fontFamily="monospace"
          >
            TRANSLATOR&apos;S MARGIN
          </text>
          {[
            ["REGISTER", "speaker · relationship"],
            ["GENRE", "purpose · convention"],
            ["CONTEXT", "place · time · reference"],
            ["RIGHTS", "access ≠ permission"],
          ].map(([label, note], index) => (
            <g key={label} transform={`translate(0 ${28 + index * 70})`}>
              <rect
                width="222"
                height="52"
                rx="9"
                fill="rgba(10,8,14,0.16)"
                stroke="rgba(244,114,182,0.085)"
              />
              <text
                x="12"
                y="20"
                fill="rgba(244,114,182,0.26)"
                fontSize="10"
                fontFamily="monospace"
              >
                {label}
              </text>
              <text
                x="12"
                y="39"
                fill="rgba(214,211,209,0.16)"
                fontSize="10"
                fontFamily="monospace"
              >
                {note}
              </text>
            </g>
          ))}
        </g>

        <g transform="translate(1210 170)">
          <text
            x="0"
            y="0"
            fill="rgba(94,234,212,0.22)"
            fontSize="11"
            fontFamily="monospace"
          >
            PRACTICE LOOP
          </text>
          {LANGUAGE_PRACTICE_STAGES.map((stage, index) => (
            <g key={stage.key} transform={`translate(0 ${26 + index * 64})`}>
              <rect
                width="190"
                height="42"
                rx="21"
                fill={`rgba(${stage.rgb},0.025)`}
                stroke={`rgba(${stage.rgb},0.11)`}
              />
              <text
                x="18"
                y="26"
                fill={`rgba(${stage.rgb},0.25)`}
                fontSize="11"
                fontFamily="monospace"
              >
                {String(index + 1).padStart(2, "0")} ·{" "}
                {stage.label.toUpperCase()}
              </text>
              {index < LANGUAGE_PRACTICE_STAGES.length - 1 ? (
                <path
                  d="M95 44v18"
                  stroke="rgba(214,211,209,0.10)"
                  strokeDasharray="3 4"
                />
              ) : null}
            </g>
          ))}
          <path
            d="M0 326c-44 0-44-298 0-298"
            fill="none"
            stroke="rgba(94,234,212,0.075)"
            strokeDasharray="5 7"
          />
        </g>

        <g transform="translate(310 704)">
          {[
            ["LTR", "Latin · Cyrillic"],
            ["RTL", "Arabic · Hebrew"],
            ["MIXED", "scripts · numerals"],
            ["VISUAL", "sign ≠ writing"],
          ].map(([label, note], index) => (
            <g key={label} transform={`translate(${index * 245} 0)`}>
              <line
                x1="0"
                y1="0"
                x2="214"
                y2="0"
                stroke="rgba(251,191,36,0.08)"
              />
              <text
                x="0"
                y="20"
                fill="rgba(251,191,36,0.22)"
                fontSize="10"
                fontFamily="monospace"
              >
                {label}
              </text>
              <text
                x="54"
                y="20"
                fill="rgba(214,211,209,0.15)"
                fontSize="10"
                fontFamily="monospace"
              >
                {note}
              </text>
            </g>
          ))}
        </g>

        <rect
          x="260"
          y="22"
          width="180"
          height="776"
          fill="url(#language-reading-light)"
          className="animate-[language-reading-light_52s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
        />
      </svg>

      <div className="absolute inset-x-0 top-0 h-[15%] bg-gradient-to-b from-[#0a0c10]/90 to-transparent" />
      <div className="from-[#0a0c10]/92 absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t to-transparent" />
      <style>{`@keyframes language-reading-light { from { transform: translateX(0); } to { transform: translateX(860px); } }`}</style>
    </div>
  );
}
