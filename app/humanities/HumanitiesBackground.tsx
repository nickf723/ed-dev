export default function HumanitiesBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#090708]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(251,191,36,0.09),transparent_27%),radial-gradient(circle_at_82%_42%,rgba(232,121,249,0.065),transparent_28%),radial-gradient(circle_at_58%_84%,rgba(129,140,248,0.07),transparent_32%),linear-gradient(135deg,#090708_0%,#080609_48%,#0a0807_100%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-75" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="humanities-current-a" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(251,191,36,0)" />
            <stop offset="0.45" stopColor="rgba(251,191,36,0.16)" />
            <stop offset="1" stopColor="rgba(251,191,36,0)" />
          </linearGradient>
          <linearGradient id="humanities-current-b" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(232,121,249,0)" />
            <stop offset="0.52" stopColor="rgba(232,121,249,0.12)" />
            <stop offset="1" stopColor="rgba(232,121,249,0)" />
          </linearGradient>
          <linearGradient id="humanities-current-c" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(129,140,248,0)" />
            <stop offset="0.58" stopColor="rgba(129,140,248,0.12)" />
            <stop offset="1" stopColor="rgba(129,140,248,0)" />
          </linearGradient>
        </defs>

        <g fill="none" strokeLinecap="round">
          <path d="M-80 285 C240 165, 420 410, 760 270 S1280 160, 1700 310" stroke="url(#humanities-current-a)" strokeWidth="2" />
          <path d="M-100 500 C270 680, 500 360, 820 515 S1300 700, 1710 470" stroke="url(#humanities-current-b)" strokeWidth="1.6" />
          <path d="M-80 760 C260 590, 520 880, 900 710 S1350 620, 1690 780" stroke="url(#humanities-current-c)" strokeWidth="1.5" />

          <path d="M90 150H510" stroke="rgba(251,191,36,0.055)" />
          <path d="M90 174H430" stroke="rgba(251,191,36,0.038)" />
          <path d="M90 198H555" stroke="rgba(251,191,36,0.042)" />
          <path d="M90 222H370" stroke="rgba(251,191,36,0.032)" />

          <rect x="1170" y="125" width="250" height="165" stroke="rgba(232,121,249,0.045)" />
          <rect x="1200" y="155" width="190" height="105" stroke="rgba(232,121,249,0.035)" />
          <path d="M1225 225 C1260 185, 1290 245, 1320 205 S1370 190, 1400 228" stroke="rgba(232,121,249,0.07)" />

          <line x1="188" y1="610" x2="188" y2="930" stroke="rgba(251,191,36,0.055)" />
          {Array.from({ length: 9 }).map((_, index) => (
            <g key={index}>
              <line x1="178" y1={635 + index * 33} x2={index % 3 === 0 ? 210 : 199} y2={635 + index * 33} stroke="rgba(251,191,36,0.075)" />
              <circle cx="188" cy={635 + index * 33} r={index % 3 === 0 ? 3 : 1.8} fill="rgba(251,191,36,0.10)" />
            </g>
          ))}

          <path d="M1110 780 q35 -42 70 0 t70 0 t70 0 t70 0" stroke="rgba(129,140,248,0.075)" />
          <path d="M1110 810 q28 -28 56 0 t56 0 t56 0 t56 0 t56 0" stroke="rgba(129,140,248,0.050)" />
        </g>

        <g fill="rgba(226,232,240,0.11)" fontFamily="serif">
          <text x="128" y="116" fontSize="68">A</text>
          <text x="1428" y="372" fontSize="54">α</text>
          <text x="1325" y="885" fontSize="58">♪</text>
        </g>
      </svg>

      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(251,191,36,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(251,191,36,0.016)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,7,8,0.05),rgba(9,7,8,0.36)_55%,rgba(9,7,8,0.88))]" />
    </div>
  );
}
