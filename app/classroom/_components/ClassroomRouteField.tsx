export default function ClassroomRouteField() {
  const stations = [
    [188, 188, "#34d399"],
    [428, 296, "#22d3ee"],
    [728, 254, "#a3e635"],
    [1040, 386, "#fb923c"],
    [1330, 324, "#a78bfa"],
    [255, 690, "#a78bfa"],
    [602, 620, "#34d399"],
    [978, 744, "#22d3ee"],
    [1316, 650, "#fb923c"],
  ] as const;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_4%,rgba(52,211,153,0.12),transparent_27%),radial-gradient(circle_at_88%_16%,rgba(34,211,238,0.09),transparent_30%),radial-gradient(circle_at_72%_94%,rgba(167,139,250,0.08),transparent_32%),linear-gradient(180deg,#031912_0%,#041610_56%,#030d0a_100%)]" />
      <svg
        viewBox="0 0 1500 920"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-55"
      >
        <defs>
          <filter id="classroom-route-glow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="classroom-math-line" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#34d399" stopOpacity="0.38" />
            <stop offset="1" stopColor="#22d3ee" stopOpacity="0.12" />
          </linearGradient>
          <linearGradient id="classroom-humanities-line" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#a78bfa" stopOpacity="0.24" />
            <stop offset="0.6" stopColor="#fb923c" stopOpacity="0.18" />
            <stop offset="1" stopColor="#f472b6" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        <path
          d="M-80 130 C 170 120, 270 330, 510 292 S 860 120, 1090 310 S 1370 360, 1580 230"
          fill="none"
          stroke="url(#classroom-math-line)"
          strokeWidth="2"
        />
        <path
          d="M-110 760 C 180 780, 280 560, 560 620 S 900 830, 1160 710 S 1400 540, 1580 650"
          fill="none"
          stroke="url(#classroom-humanities-line)"
          strokeWidth="2"
        />
        <path
          d="M140 970 C 210 730, 520 720, 590 486 S 680 130, 945 -60"
          fill="none"
          stroke="#a3e635"
          strokeOpacity="0.11"
          strokeWidth="1.5"
        />
        <path
          d="M1540 840 C 1300 780, 1230 560, 1040 520 S 760 580, 610 430 S 400 70, 140 -80"
          fill="none"
          stroke="#22d3ee"
          strokeOpacity="0.09"
          strokeWidth="1.5"
        />

        {stations.map(([cx, cy, color], index) => (
          <g key={`${cx}-${cy}`} filter="url(#classroom-route-glow)">
            <circle cx={cx} cy={cy} r={index % 3 === 0 ? 8 : 6} fill="#031912" stroke={color} strokeOpacity="0.42" strokeWidth="2" />
            <circle cx={cx} cy={cy} r="2" fill={color} fillOpacity="0.6" />
          </g>
        ))}
      </svg>
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(3,13,10,0.04),rgba(3,13,10,0.30))]" />
    </div>
  );
}
