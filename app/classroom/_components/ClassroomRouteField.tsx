export default function ClassroomRouteField() {
  const stations = [
    [188, 188, "#f87171"],
    [428, 296, "#f87171"],
    [728, 254, "#4ade80"],
    [1040, 386, "#4ade80"],
    [1330, 324, "#60a5fa"],
    [255, 690, "#facc15"],
    [602, 620, "#facc15"],
    [978, 744, "#60a5fa"],
    [1316, 650, "#60a5fa"],
  ] as const;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_4%,rgba(248,113,113,0.10),transparent_27%),radial-gradient(circle_at_90%_12%,rgba(74,222,128,0.09),transparent_30%),radial-gradient(circle_at_78%_94%,rgba(96,165,250,0.08),transparent_32%),radial-gradient(circle_at_20%_92%,rgba(250,204,21,0.06),transparent_28%),linear-gradient(180deg,#031912_0%,#041610_56%,#030d0a_100%)]" />
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
        </defs>

        <path
          d="M-80 130 C 170 120, 270 330, 510 292 S 860 120, 1090 310 S 1370 360, 1580 230"
          fill="none"
          stroke="#f87171"
          strokeOpacity="0.20"
          strokeWidth="2"
        />
        <path
          d="M-110 760 C 180 780, 280 560, 560 620 S 900 830, 1160 710 S 1400 540, 1580 650"
          fill="none"
          stroke="#facc15"
          strokeOpacity="0.15"
          strokeWidth="2"
        />
        <path
          d="M140 970 C 210 730, 520 720, 590 486 S 680 130, 945 -60"
          fill="none"
          stroke="#4ade80"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
        <path
          d="M1540 840 C 1300 780, 1230 560, 1040 520 S 760 580, 610 430 S 400 70, 140 -80"
          fill="none"
          stroke="#60a5fa"
          strokeOpacity="0.13"
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
