const SPECIMENS = [
  { x: 172, y: 250, label: "2", tone: "cyan" },
  { x: 256, y: 342, label: "8", tone: "cyan" },
  { x: 420, y: 264, label: "4", tone: "amber" },
  { x: 510, y: 382, label: "6", tone: "amber" },
  { x: 696, y: 278, label: "5", tone: "violet" },
  { x: 778, y: 390, label: "9", tone: "violet" },
  { x: 1014, y: 212, label: "1", tone: "slate" },
  { x: 1114, y: 412, label: "3", tone: "slate" },
] as const;

const TONES = {
  cyan: { fill: "#083344", stroke: "#67e8f9" },
  amber: { fill: "#451a03", stroke: "#fcd34d" },
  violet: { fill: "#2e1065", stroke: "#c4b5fd" },
  slate: { fill: "#0f172a", stroke: "#94a3b8" },
} as const;

export default function SetTheoryWorld() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#02060b]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_34%_34%,rgba(8,145,178,0.17),transparent_34%),radial-gradient(circle_at_70%_42%,rgba(124,58,237,0.14),transparent_36%),radial-gradient(circle_at_50%_70%,rgba(245,158,11,0.07),transparent_28%),linear-gradient(155deg,#06121a_0%,#02070c_54%,#08040f_100%)]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.78]"
        viewBox="0 0 1280 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="set-glass-a" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#67e8f9" stopOpacity="0.13" />
            <stop offset="1" stopColor="#0891b2" stopOpacity="0.025" />
          </linearGradient>
          <linearGradient id="set-glass-b" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c4b5fd" stopOpacity="0.13" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.025" />
          </linearGradient>
          <linearGradient id="set-scan" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#67e8f9" stopOpacity="0" />
            <stop offset="0.5" stopColor="#ecfeff" stopOpacity="0.36" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity="0" />
          </linearGradient>
          <filter
            id="set-soft-glow"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
          >
            <feGaussianBlur stdDeviation="12" />
          </filter>
        </defs>

        <path
          d="M70 132 L1200 94 L1240 718 L36 760 Z"
          fill="#061019"
          fillOpacity="0.76"
          stroke="#cbd5e1"
          strokeOpacity="0.08"
          strokeWidth="2"
        />
        <path
          d="M94 158 L1178 124 L1210 690 L66 730 Z"
          fill="none"
          stroke="#67e8f9"
          strokeDasharray="8 20"
          strokeOpacity="0.075"
        />

        <ellipse
          cx="430"
          cy="362"
          rx="310"
          ry="236"
          fill="url(#set-glass-a)"
          stroke="#67e8f9"
          strokeOpacity="0.22"
          strokeWidth="4"
        />
        <ellipse
          cx="676"
          cy="362"
          rx="310"
          ry="236"
          fill="url(#set-glass-b)"
          stroke="#c4b5fd"
          strokeOpacity="0.22"
          strokeWidth="4"
        />

        <g opacity="0.3" fontFamily="monospace" fontWeight="700">
          <text x="174" y="166" fill="#67e8f9" fontSize="20">
            SET A
          </text>
          <text x="864" y="166" fill="#c4b5fd" fontSize="20">
            SET B
          </text>
          <text x="514" y="144" fill="#fcd34d" fontSize="14">
            SHARED MEMBERSHIP
          </text>
        </g>

        {SPECIMENS.map((specimen) => {
          const tone = TONES[specimen.tone];
          return (
            <g key={`${specimen.x}-${specimen.y}`}>
              <circle
                cx={specimen.x}
                cy={specimen.y}
                r="38"
                fill={tone.stroke}
                fillOpacity="0.05"
                filter="url(#set-soft-glow)"
              />
              <rect
                x={specimen.x - 23}
                y={specimen.y - 23}
                width="46"
                height="46"
                rx="14"
                fill={tone.fill}
                fillOpacity="0.86"
                stroke={tone.stroke}
                strokeOpacity="0.42"
              />
              <text
                x={specimen.x}
                y={specimen.y + 6}
                fill={tone.stroke}
                fillOpacity="0.7"
                fontFamily="monospace"
                fontSize="17"
                fontWeight="700"
                textAnchor="middle"
              >
                {specimen.label}
              </text>
            </g>
          );
        })}

        <g opacity="0.14" stroke="#94a3b8" strokeWidth="2">
          <path d="M90 626 H1190" />
          <path d="M142 660 H1138" strokeDasharray="4 18" />
        </g>

        <g className="set-membership-scan">
          <rect
            x="-220"
            y="106"
            width="330"
            height="630"
            fill="url(#set-scan)"
            opacity="0.26"
          />
          <path
            d="M-40 120 V714"
            stroke="#ecfeff"
            strokeOpacity="0.18"
            strokeWidth="2"
          />
        </g>
      </svg>

      <div className="from-[#02060b]/74 absolute inset-y-0 left-0 w-[24%] bg-gradient-to-r to-transparent" />
      <div className="from-[#02060b]/74 absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l to-transparent" />
      <div className="from-[#02060b]/62 absolute inset-x-0 top-0 h-[24vh] bg-gradient-to-b to-transparent" />
      <div className="from-[#02060b]/82 absolute inset-x-0 bottom-0 h-[38vh] bg-gradient-to-t to-transparent" />

      <style>{`
        .set-membership-scan {
          animation: set-membership-pass 20s ease-in-out infinite;
        }

        @keyframes set-membership-pass {
          0%, 100% { transform: translateX(90px); opacity: 0.24; }
          50% { transform: translateX(1320px); opacity: 0.48; }
        }

        @media (prefers-reduced-motion: reduce) {
          .set-membership-scan {
            animation: none;
            transform: translateX(650px);
            opacity: 0.26;
          }
        }
      `}</style>
    </div>
  );
}
