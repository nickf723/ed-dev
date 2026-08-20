const PIECES = [
  { x: 248, y: 294, size: 42, tone: "cyan" },
  { x: 374, y: 246, size: 34, tone: "amber" },
  { x: 510, y: 326, size: 46, tone: "violet" },
  { x: 682, y: 258, size: 37, tone: "cyan" },
  { x: 840, y: 342, size: 43, tone: "amber" },
  { x: 1016, y: 268, size: 35, tone: "violet" },
  { x: 1178, y: 350, size: 44, tone: "cyan" },
  { x: 1326, y: 282, size: 38, tone: "amber" },
] as const;

const CONNECTIONS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [2, 4],
  [3, 5],
  [4, 5],
  [5, 6],
  [6, 7],
] as const;

const TONES = {
  cyan: { fill: "#082f49", stroke: "#67e8f9" },
  amber: { fill: "#451a03", stroke: "#fbbf24" },
  violet: { fill: "#2e1065", stroke: "#c4b5fd" },
} as const;

export default function DiscreteWorld() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#03060b]"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,rgba(8,145,178,0.16),transparent_34%),radial-gradient(circle_at_12%_74%,rgba(245,158,11,0.09),transparent_28%),radial-gradient(circle_at_88%_72%,rgba(139,92,246,0.12),transparent_30%),linear-gradient(155deg,#06101a_0%,#03070c_48%,#05030a_100%)]" />

      <svg
        className="absolute inset-0 h-full w-full opacity-[0.82]"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="discrete-board" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0d1b25" stopOpacity="0.84" />
            <stop offset="0.5" stopColor="#071017" stopOpacity="0.9" />
            <stop offset="1" stopColor="#0d0715" stopOpacity="0.88" />
          </linearGradient>
          <linearGradient id="discrete-rail" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#22d3ee" stopOpacity="0" />
            <stop offset="0.24" stopColor="#22d3ee" stopOpacity="0.22" />
            <stop offset="0.7" stopColor="#a78bfa" stopOpacity="0.2" />
            <stop offset="1" stopColor="#fbbf24" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="discrete-lamp">
            <stop offset="0" stopColor="#ecfeff" stopOpacity="0.34" />
            <stop offset="0.3" stopColor="#22d3ee" stopOpacity="0.12" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter
            id="discrete-soft-glow"
            x="-120%"
            y="-120%"
            width="340%"
            height="340%"
          >
            <feGaussianBlur stdDeviation="11" />
          </filter>
        </defs>

        <path
          d="M92 174 L1492 140 L1574 844 L34 884 Z"
          fill="url(#discrete-board)"
          stroke="#67e8f9"
          strokeOpacity="0.12"
          strokeWidth="2"
        />
        <path
          d="M118 208 L1462 176 L1532 808 L76 846 Z"
          fill="none"
          stroke="#c4b5fd"
          strokeDasharray="10 22"
          strokeOpacity="0.08"
        />

        <g fill="none" stroke="url(#discrete-rail)" strokeWidth="3">
          <path d="M112 458 C390 414 550 472 792 438 S1208 384 1508 442" />
          <path
            d="M90 666 C390 622 584 692 844 638 S1222 594 1538 646"
            opacity="0.62"
          />
        </g>

        <path
          d="M170 214 C250 174 442 170 542 226 C624 274 616 382 518 424 C400 476 222 440 164 350 C132 300 136 244 170 214 Z"
          fill="#0891b2"
          fillOpacity="0.035"
          stroke="#67e8f9"
          strokeOpacity="0.16"
          strokeWidth="3"
        />

        <g stroke="#67e8f9" strokeOpacity="0.18" strokeWidth="3">
          {CONNECTIONS.map(([sourceIndex, targetIndex]) => {
            const source = PIECES[sourceIndex];
            const target = PIECES[targetIndex];
            return (
              <line
                key={`${sourceIndex}-${targetIndex}`}
                x1={source.x}
                y1={source.y}
                x2={target.x}
                y2={target.y}
              />
            );
          })}
        </g>

        {PIECES.map((piece, index) => {
          const tone = TONES[piece.tone];
          return (
            <g key={`${piece.x}-${piece.y}`}>
              <circle
                cx={piece.x}
                cy={piece.y}
                r={piece.size * 1.65}
                fill={tone.stroke}
                fillOpacity="0.055"
                filter="url(#discrete-soft-glow)"
              />
              <rect
                x={piece.x - piece.size / 2}
                y={piece.y - piece.size / 2}
                width={piece.size}
                height={piece.size}
                rx="7"
                fill={tone.fill}
                fillOpacity="0.86"
                stroke={tone.stroke}
                strokeOpacity="0.48"
                transform={`rotate(${index % 2 === 0 ? -6 : 6} ${piece.x} ${piece.y})`}
              />
              <circle
                cx={piece.x}
                cy={piece.y}
                r="3"
                fill={tone.stroke}
                fillOpacity="0.72"
              />
            </g>
          );
        })}

        <g transform="translate(248 570)" opacity="0.34">
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <g key={index} transform={`translate(${index * 96} 0)`}>
              <rect
                x="0"
                y={index % 2 === 0 ? 0 : 18}
                width="66"
                height="66"
                rx="11"
                fill="#07141c"
                stroke="#fbbf24"
                strokeOpacity="0.34"
              />
              <path
                d="M18 33 H48"
                stroke="#fbbf24"
                strokeOpacity="0.42"
                strokeWidth="2"
              />
            </g>
          ))}
        </g>

        <g transform="translate(1012 548)" fill="none" stroke="#c4b5fd">
          <rect
            x="0"
            y="0"
            width="326"
            height="214"
            rx="24"
            strokeOpacity="0.08"
          />
          <rect
            x="36"
            y="30"
            width="254"
            height="154"
            rx="20"
            strokeOpacity="0.12"
          />
          <rect
            x="72"
            y="58"
            width="182"
            height="98"
            rx="16"
            strokeOpacity="0.18"
          />
          <rect
            x="108"
            y="82"
            width="110"
            height="50"
            rx="12"
            strokeOpacity="0.28"
          />
        </g>

        <g className="discrete-inspection-light">
          <rect
            x="-210"
            y="154"
            width="360"
            height="700"
            fill="url(#discrete-lamp)"
          />
        </g>
      </svg>

      <div className="from-[#03060b]/72 absolute inset-y-0 left-0 w-[24%] bg-gradient-to-r to-transparent" />
      <div className="from-[#03060b]/68 absolute inset-y-0 right-0 w-[24%] bg-gradient-to-l to-transparent" />
      <div className="from-[#03060b]/54 absolute inset-x-0 top-0 h-[26vh] bg-gradient-to-b to-transparent" />
      <div className="from-[#03060b]/76 absolute inset-x-0 bottom-0 h-[36vh] bg-gradient-to-t to-transparent" />

      <style>{`
        .discrete-inspection-light {
          animation: discrete-inspection-pass 18s ease-in-out infinite;
        }

        @keyframes discrete-inspection-pass {
          0%, 100% { transform: translateX(80px); opacity: 0.22; }
          50% { transform: translateX(1390px); opacity: 0.5; }
        }

        @media (prefers-reduced-motion: reduce) {
          .discrete-inspection-light {
            animation: none;
            transform: translateX(760px);
            opacity: 0.28;
          }
        }
      `}</style>
    </div>
  );
}
