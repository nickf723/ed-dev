export default function CognitiveFieldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#04070b]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_20%,rgba(34,211,238,0.10),transparent_26%),radial-gradient(circle_at_78%_25%,rgba(167,139,250,0.10),transparent_28%),radial-gradient(circle_at_64%_82%,rgba(244,114,182,0.07),transparent_30%),linear-gradient(145deg,#04070b_0%,#060612_52%,#05080d_100%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="cog-core">
            <stop offset="0" stopColor="rgba(224,242,254,0.09)" />
            <stop offset="0.55" stopColor="rgba(34,211,238,0.028)" />
            <stop offset="1" stopColor="rgba(34,211,238,0)" />
          </radialGradient>
          <linearGradient id="cog-signal" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(34,211,238,0)" />
            <stop offset="0.5" stopColor="rgba(34,211,238,0.11)" />
            <stop offset="1" stopColor="rgba(167,139,250,0)" />
          </linearGradient>
        </defs>

        <circle cx="800" cy="500" r="245" fill="url(#cog-core)" />
        <g fill="none" strokeLinecap="round">
          <ellipse cx="800" cy="500" rx="205" ry="128" stroke="rgba(224,242,254,0.035)" />
          <ellipse cx="800" cy="500" rx="315" ry="205" stroke="rgba(167,139,250,0.027)" transform="rotate(-17 800 500)" />
          <ellipse cx="800" cy="500" rx="420" ry="292" stroke="rgba(244,114,182,0.022)" transform="rotate(11 800 500)" />

          <path d="M220 510 C420 365, 540 650, 760 505 S1110 365, 1380 510" stroke="url(#cog-signal)" strokeWidth="1.5" />
          <path d="M260 555 C470 705, 560 405, 820 560 S1160 680, 1390 530" stroke="rgba(167,139,250,0.055)" />
          <path d="M250 445 C470 300, 610 560, 835 430 S1160 310, 1390 470" stroke="rgba(34,211,238,0.045)" />

          <path d="M450 215L650 350M1150 215L950 350M405 780L650 650M1195 780L950 650" stroke="rgba(226,232,240,0.025)" strokeDasharray="3 12" />
          <path d="M800 110V305M800 695V890" stroke="rgba(226,232,240,0.022)" strokeDasharray="2 13" />
        </g>

        {[
          [450, 215, "34,211,238"],
          [800, 110, "96,165,250"],
          [1150, 215, "167,139,250"],
          [1195, 780, "244,114,182"],
          [800, 890, "251,191,36"],
          [405, 780, "52,211,153"],
        ].map(([x, y, rgb], index) => (
          <g key={index}>
            <circle cx={x} cy={y} r="4" fill={`rgba(${rgb},0.34)`} />
            <circle cx={x} cy={y} r="15" fill="none" stroke={`rgba(${rgb},0.07)`} />
          </g>
        ))}

        <g fill="rgba(148,163,184,0.10)" fontFamily="monospace" fontSize="10" letterSpacing="1.8">
          <text x="92" y="100">COGNITIVE FIELD / MULTIPLE LEVELS OF EXPLANATION</text>
          <text x="1230" y="910">SIGNAL → REPRESENTATION → ACTION</text>
        </g>
      </svg>

      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(34,211,238,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.018)_1px,transparent_1px)] [background-size:68px_68px]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(4,7,11,0.03),rgba(4,7,11,0.30)_58%,rgba(4,7,11,0.88))]" />
    </div>
  );
}
