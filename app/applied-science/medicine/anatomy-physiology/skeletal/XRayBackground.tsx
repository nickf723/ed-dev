const RIBS = [0, 1, 2, 3, 4, 5].map((index) => ({
  y: 248 + index * 27,
  width: 78 - index * 5,
}));

const VERTEBRAE = Array.from({ length: 13 }, (_, index) => 205 + index * 27);

export default function XRayBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_36%,rgba(34,211,238,0.14),transparent_31%),radial-gradient(circle_at_17%_74%,rgba(251,191,36,0.10),transparent_30%),linear-gradient(180deg,#06101a_0%,#05090f_52%,#020407_100%)]" />
      <div className="absolute inset-[4%] border border-cyan-100/[0.045] bg-[linear-gradient(rgba(125,211,252,0.026)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.026)_1px,transparent_1px)] bg-[size:64px_64px] shadow-[inset_0_0_120px_rgba(0,0,0,0.52)]" />

      <svg
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-80"
      >
        <defs>
          <filter id="xray-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <linearGradient id="xray-scan" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="rgba(34,211,238,0)" />
            <stop offset="0.5" stopColor="rgba(34,211,238,0.30)" />
            <stop offset="1" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>

        <g
          transform="translate(1210 70)"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <ellipse
            cx="0"
            cy="80"
            rx="54"
            ry="64"
            stroke="rgba(251,191,36,0.34)"
            strokeWidth="8"
          />
          <path
            d="M-35 128Q0 156 35 128"
            stroke="rgba(251,191,36,0.28)"
            strokeWidth="5"
          />

          <g stroke="rgba(251,191,36,0.27)">
            {VERTEBRAE.map((y) => (
              <rect
                key={y}
                x="-10"
                y={y}
                width="20"
                height="14"
                rx="5"
                strokeWidth="4"
              />
            ))}
            {RIBS.map((rib) => (
              <path
                key={rib.y}
                d={`M-4 ${rib.y}C-${rib.width} ${rib.y - 12}-${rib.width + 18} ${rib.y + 32}-10 ${rib.y + 46}M4 ${rib.y}C${rib.width} ${rib.y - 12} ${rib.width + 18} ${rib.y + 32} 10 ${rib.y + 46}`}
                strokeWidth="5"
              />
            ))}
            <path
              d="M-74 206Q0 164 74 206M-66 493Q0 536 66 493"
              strokeWidth="10"
            />
          </g>

          <g stroke="rgba(34,211,238,0.25)" strokeWidth="13">
            <path d="M-70 210L-176 326L-204 490M70 210L176 326L204 490" />
            <path d="M-55 512L-100 700L-118 884M55 512L100 700L118 884" />
          </g>
          <g stroke="rgba(34,211,238,0.29)" strokeWidth="8">
            <path d="M-176 326L-146 480M176 326L146 480" />
            <path d="M-100 700L-78 882M100 700L78 882" />
          </g>
          <g
            fill="rgba(34,211,238,0.10)"
            stroke="rgba(34,211,238,0.29)"
            strokeWidth="4"
          >
            {[
              [-176, 326],
              [176, 326],
              [-204, 490],
              [204, 490],
              [-55, 512],
              [55, 512],
              [-100, 700],
              [100, 700],
            ].map(([cx, cy]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="15" />
            ))}
          </g>
          <g fill="none" stroke="rgba(125,211,252,0.18)" strokeWidth="3">
            <path d="M-204 490L-220 531M-204 490L-201 536M-204 490L-184 531" />
            <path d="M204 490L220 531M204 490L201 536M204 490L184 531" />
            <path d="M-78 882L-130 909M-78 882L-82 927M78 882L130 909M78 882L82 927" />
          </g>
        </g>

        <g filter="url(#xray-glow)" opacity="0.30">
          <path
            d="M1210 210V590"
            stroke="rgba(251,191,36,0.34)"
            strokeWidth="24"
          />
          <path
            d="M1140 280L1034 396M1280 280L1386 396"
            stroke="rgba(34,211,238,0.26)"
            strokeWidth="28"
          />
        </g>

        <g transform="translate(250 650)" fill="none">
          <circle r="172" stroke="rgba(251,191,36,0.10)" strokeWidth="2" />
          <circle r="112" stroke="rgba(34,211,238,0.10)" strokeWidth="2" />
          <circle r="56" stroke="rgba(251,191,36,0.13)" strokeWidth="2" />
          <path d="M-190 0H190M0-190V190" stroke="rgba(125,211,252,0.05)" />
        </g>

        <rect
          x="0"
          y="-220"
          width="1600"
          height="220"
          fill="url(#xray-scan)"
          className="xray-scan-band"
        />
      </svg>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_67%_38%,transparent_25%,rgba(2,5,9,0.34)_70%,rgba(2,4,7,0.70)_100%)]" />
      <style>{`
        @keyframes xrayScanDown {
          0% { transform: translateY(-180px); opacity: 0; }
          12% { opacity: .52; }
          88% { opacity: .52; }
          100% { transform: translateY(1320px); opacity: 0; }
        }
        .xray-scan-band { animation: xrayScanDown 16s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .xray-scan-band { animation: none !important; transform: translateY(520px); opacity: .22; }
        }
      `}</style>
    </div>
  );
}
