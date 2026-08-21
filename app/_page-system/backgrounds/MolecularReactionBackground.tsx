const ELEMENT_CELLS = [
  { x: 105, y: 120, symbol: "H", z: "1", rgb: "241,245,249" },
  { x: 185, y: 120, symbol: "C", z: "6", rgb: "148,163,184" },
  { x: 105, y: 200, symbol: "N", z: "7", rgb: "96,165,250" },
  { x: 185, y: 200, symbol: "O", z: "8", rgb: "248,113,113" },
  { x: 105, y: 280, symbol: "Na", z: "11", rgb: "250,204,21" },
  { x: 185, y: 280, symbol: "Cl", z: "17", rgb: "52,211,153" },
] as const;

const MOLECULE_ATOMS = [
  { x: 610, y: 260, r: 30, label: "O", rgb: "248,113,113" },
  { x: 545, y: 325, r: 20, label: "H", rgb: "241,245,249" },
  { x: 675, y: 325, r: 20, label: "H", rgb: "241,245,249" },
] as const;

export default function MolecularReactionBackground() {
  return (
    <div
      data-background="chemistry-representation-bench"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(52,211,153,0.17),transparent_30%),radial-gradient(circle_at_53%_42%,rgba(34,211,238,0.13),transparent_34%),radial-gradient(circle_at_86%_26%,rgba(250,204,21,0.10),transparent_30%),linear-gradient(150deg,#03110b_0%,#041016_42%,#0b0804_72%,#010302_100%)]" />
      <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(rgba(52,211,153,0.032)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.032)_1px,transparent_1px)] [background-size:54px_54px] [mask-image:radial-gradient(circle_at_center,black,transparent_88%)]" />

      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-75"
      >
        <defs>
          <linearGradient id="chemistry-flow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(52,211,153,0.04)" />
            <stop offset="0.5" stopColor="rgba(34,211,238,0.18)" />
            <stop offset="1" stopColor="rgba(250,204,21,0.05)" />
          </linearGradient>
          <radialGradient id="chemistry-atom" cx="32%" cy="28%">
            <stop offset="0" stopColor="rgba(255,255,255,0.44)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.02)" />
          </radialGradient>
        </defs>

        <path
          d="M250 236C390 170 455 260 520 278C708 330 760 190 905 245C1020 289 1115 375 1320 295"
          fill="none"
          stroke="url(#chemistry-flow)"
          strokeWidth="2"
          strokeDasharray="6 16"
        />

        <g opacity="0.62">
          <rect
            x="70"
            y="74"
            width="250"
            height="264"
            rx="20"
            fill="rgba(0,0,0,0.10)"
            stroke="rgba(52,211,153,0.12)"
          />
          <text
            x="96"
            y="103"
            fill="rgba(110,231,183,0.32)"
            fontSize="11"
            fontFamily="monospace"
            letterSpacing="2"
          >
            ELEMENT IDENTITY
          </text>
          {ELEMENT_CELLS.map((cell) => (
            <g key={cell.symbol} transform={`translate(${cell.x} ${cell.y})`}>
              <rect
                width="58"
                height="58"
                rx="9"
                fill={`rgba(${cell.rgb},0.035)`}
                stroke={`rgba(${cell.rgb},0.19)`}
              />
              <text
                x="8"
                y="15"
                fill={`rgba(${cell.rgb},0.38)`}
                fontSize="9"
                fontFamily="monospace"
              >
                {cell.z}
              </text>
              <text
                x="29"
                y="40"
                textAnchor="middle"
                fill={`rgba(${cell.rgb},0.56)`}
                fontSize="22"
                fontWeight="700"
              >
                {cell.symbol}
              </text>
            </g>
          ))}
        </g>

        <g opacity="0.66">
          <rect
            x="465"
            y="154"
            width="290"
            height="252"
            rx="126"
            fill="rgba(34,211,238,0.015)"
            stroke="rgba(34,211,238,0.11)"
          />
          <text
            x="498"
            y="190"
            fill="rgba(103,232,249,0.30)"
            fontSize="11"
            fontFamily="monospace"
            letterSpacing="2"
          >
            ARRANGEMENT → PROPERTY
          </text>
          <path
            d="M610 260L545 325M610 260L675 325"
            stroke="rgba(186,230,253,0.24)"
            strokeWidth="8"
            strokeLinecap="round"
          />
          {MOLECULE_ATOMS.map((atom) => (
            <g key={`${atom.label}-${atom.x}`}>
              <circle
                cx={atom.x}
                cy={atom.y}
                r={atom.r * 1.8}
                fill={`rgba(${atom.rgb},0.035)`}
              />
              <circle
                cx={atom.x}
                cy={atom.y}
                r={atom.r}
                fill={`rgba(${atom.rgb},0.17)`}
                stroke={`rgba(${atom.rgb},0.34)`}
              />
              <circle
                cx={atom.x}
                cy={atom.y}
                r={atom.r}
                fill="url(#chemistry-atom)"
              />
              <text
                x={atom.x}
                y={atom.y + 5}
                textAnchor="middle"
                fill={`rgba(${atom.rgb},0.64)`}
                fontSize="14"
                fontWeight="700"
              >
                {atom.label}
              </text>
            </g>
          ))}
          <path
            d="M560 360Q610 396 660 360"
            fill="none"
            stroke="rgba(34,211,238,0.22)"
            strokeDasharray="4 7"
          />
          <text
            x="610"
            y="389"
            textAnchor="middle"
            fill="rgba(103,232,249,0.26)"
            fontSize="10"
            fontFamily="monospace"
          >
            BENT · NET DIPOLE
          </text>
        </g>

        <g opacity="0.62" transform="translate(850 126)">
          <rect
            width="430"
            height="300"
            rx="22"
            fill="rgba(0,0,0,0.11)"
            stroke="rgba(250,204,21,0.12)"
          />
          <text
            x="28"
            y="38"
            fill="rgba(253,224,71,0.30)"
            fontSize="11"
            fontFamily="monospace"
            letterSpacing="2"
          >
            CONSERVATION LEDGER
          </text>
          <text
            x="28"
            y="108"
            fill="rgba(255,255,255,0.25)"
            fontSize="28"
            fontWeight="700"
          >
            CH₄ + 2 O₂
          </text>
          <path
            d="M205 100H270"
            stroke="rgba(253,224,71,0.30)"
            strokeWidth="2"
          />
          <path d="M270 100l-12-7v14z" fill="rgba(253,224,71,0.30)" />
          <text
            x="282"
            y="108"
            fill="rgba(255,255,255,0.25)"
            fontSize="28"
            fontWeight="700"
          >
            CO₂ + 2 H₂O
          </text>
          {[
            ["C", "1", "1"],
            ["H", "4", "4"],
            ["O", "4", "4"],
          ].map(([element, left, right], index) => (
            <g key={element} transform={`translate(34 ${164 + index * 42})`}>
              <text
                x="0"
                y="0"
                fill="rgba(255,255,255,0.26)"
                fontSize="12"
                fontFamily="monospace"
              >
                {element}
              </text>
              <rect
                x="64"
                y="-15"
                width="110"
                height="25"
                rx="5"
                fill="rgba(52,211,153,0.035)"
                stroke="rgba(52,211,153,0.12)"
              />
              <text
                x="119"
                y="2"
                textAnchor="middle"
                fill="rgba(110,231,183,0.36)"
                fontSize="12"
                fontFamily="monospace"
              >
                {left}
              </text>
              <text
                x="208"
                y="2"
                textAnchor="middle"
                fill="rgba(255,255,255,0.18)"
                fontSize="13"
              >
                =
              </text>
              <rect
                x="244"
                y="-15"
                width="110"
                height="25"
                rx="5"
                fill="rgba(250,204,21,0.035)"
                stroke="rgba(250,204,21,0.12)"
              />
              <text
                x="299"
                y="2"
                textAnchor="middle"
                fill="rgba(253,224,71,0.36)"
                fontSize="12"
                fontFamily="monospace"
              >
                {right}
              </text>
            </g>
          ))}
        </g>

        <g opacity="0.38" transform="translate(100 610)">
          <path
            d="M0 82H1160"
            stroke="rgba(255,255,255,0.08)"
            strokeDasharray="4 18"
          />
          {[
            [0, "SYMBOL"],
            [310, "PARTICLE MODEL"],
            [650, "MEASUREMENT"],
            [970, "SAFETY"],
          ].map(([x, label]) => (
            <g key={String(label)} transform={`translate(${x} 0)`}>
              <rect
                width="190"
                height="58"
                rx="12"
                fill="rgba(0,0,0,0.12)"
                stroke="rgba(255,255,255,0.08)"
              />
              <text
                x="95"
                y="35"
                textAnchor="middle"
                fill="rgba(255,255,255,0.24)"
                fontSize="10"
                fontFamily="monospace"
                letterSpacing="2"
              >
                {label}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(1,3,3,0.52)_100%)]" />
      <div className="from-[#020705]/78 absolute inset-x-0 top-0 h-[23%] bg-gradient-to-b to-transparent" />
      <div className="from-[#010302]/88 absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t to-transparent" />
    </div>
  );
}
