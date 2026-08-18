export default function PulseBackground() {
  const days = [0, 1, 2, 3, 4, 5, 6];
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07100f]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_42%,rgba(45,212,191,0.07),transparent_34%),radial-gradient(circle_at_18%_68%,rgba(248,113,113,0.035),transparent_28%),linear-gradient(145deg,#07100f_0%,#091311_48%,#0c0f14_100%)]" />

      <svg className="absolute inset-[11%_3%_12%_3%] h-[77%] w-[94%] opacity-90" viewBox="0 0 1400 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="med-grid" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0H0V44" fill="none" stroke="rgba(45,212,191,0.045)" strokeWidth="1" />
          </pattern>
          <linearGradient id="review-beam" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(153,246,228,0)" />
            <stop offset="0.5" stopColor="rgba(153,246,228,0.12)" />
            <stop offset="1" stopColor="rgba(153,246,228,0)" />
          </linearGradient>
        </defs>

        <rect x="18" y="18" width="1364" height="724" fill="url(#med-grid)" stroke="rgba(45,212,191,0.07)" />

        <g transform="translate(360 160)">
          <text x="0" y="0" fill="rgba(153,246,228,0.28)" fontSize="13" fontFamily="monospace">CASE TIMELINE · SYNTHETIC TEACHING RECORD</text>
          <line x1="0" y1="78" x2="820" y2="78" stroke="rgba(153,246,228,0.16)" strokeWidth="2" />
          {days.map((day, index) => (
            <g key={day} transform={`translate(${index * 132} 0)`}>
              <line x1="0" y1="62" x2="0" y2="96" stroke="rgba(153,246,228,0.17)" />
              <circle cx="0" cy="78" r="6" fill="rgba(45,212,191,0.16)" stroke="rgba(153,246,228,0.28)" />
              <text x="-18" y="119" fill="rgba(214,211,209,0.18)" fontSize="11" fontFamily="monospace">T+{day}</text>
            </g>
          ))}

          <g transform="translate(20 156)">
            <text x="0" y="0" fill="rgba(248,113,113,0.28)" fontSize="12" fontFamily="monospace">OBSERVATIONS / VITAL TRENDS</text>
            <path d="M0 68 C70 62 112 73 170 66 S283 49 350 59 S473 75 545 61 S680 46 790 56" fill="none" stroke="rgba(248,113,113,0.24)" strokeWidth="2" />
            <path d="M0 104 C92 93 144 112 232 100 S389 86 477 97 S626 110 790 92" fill="none" stroke="rgba(125,211,252,0.19)" strokeWidth="2" />
            <line x1="0" y1="122" x2="790" y2="122" stroke="rgba(255,255,255,0.055)" />
          </g>

          <g transform="translate(20 340)">
            <text x="0" y="0" fill="rgba(192,132,252,0.28)" fontSize="12" fontFamily="monospace">ORDERS / INTERVENTIONS / FOLLOW-UP</text>
            {[0, 1, 2, 3].map((row) => (
              <g key={row} transform={`translate(0 ${34 + row * 46})`}>
                <rect x="0" y="0" width={230 + row * 72} height="26" rx="5" fill="rgba(192,132,252,0.035)" stroke="rgba(192,132,252,0.11)" />
                <circle cx="13" cy="13" r="4" fill={row === 3 ? "rgba(134,239,172,0.20)" : "rgba(192,132,252,0.18)"} />
              </g>
            ))}
          </g>
        </g>

        <g transform="translate(85 200)">
          <text x="0" y="0" fill="rgba(125,211,252,0.28)" fontSize="12" fontFamily="monospace">IMAGING / EXAM WINDOWS</text>
          <rect x="0" y="28" width="198" height="154" rx="10" fill="rgba(0,0,0,0.12)" stroke="rgba(125,211,252,0.12)" />
          <ellipse cx="99" cy="101" rx="55" ry="69" fill="none" stroke="rgba(125,211,252,0.16)" />
          <path d="M99 45v116M69 76c18 14 43 14 60 0M70 130c18-13 41-13 59 0" fill="none" stroke="rgba(125,211,252,0.12)" />
          <rect x="0" y="206" width="198" height="112" rx="10" fill="rgba(0,0,0,0.12)" stroke="rgba(244,114,182,0.11)" />
          <path d="M28 260h22l9-18 16 43 15-31 13 13h67" fill="none" stroke="rgba(244,114,182,0.19)" strokeWidth="2" />
        </g>

        <g transform="translate(1140 230)">
          <text x="0" y="0" fill="rgba(251,191,36,0.28)" fontSize="12" fontFamily="monospace">REASONING LOOP</text>
          {[
            ["observe", 0],
            ["interpret", 62],
            ["test", 124],
            ["act", 186],
            ["monitor", 248],
          ].map(([label, y], index) => (
            <g key={String(label)} transform={`translate(0 ${Number(y) + 28})`}>
              <rect width="130" height="34" rx="17" fill="rgba(251,191,36,0.025)" stroke="rgba(251,191,36,0.12)" />
              <text x="65" y="22" textAnchor="middle" fill="rgba(251,191,36,0.22)" fontSize="11" fontFamily="monospace">{String(label).toUpperCase()}</text>
              {index < 4 ? <path d="M65 36v22" stroke="rgba(251,191,36,0.12)" /> : null}
            </g>
          ))}
          <path d="M0 318c-44 0-44-286 0-286" fill="none" stroke="rgba(251,191,36,0.09)" strokeDasharray="5 7" />
        </g>

        <rect x="250" y="18" width="150" height="724" fill="url(#review-beam)" className="animate-[chart-review_48s_ease-in-out_infinite_alternate] motion-reduce:animate-none" />
      </svg>

      <style>{`@keyframes chart-review { from { transform: translateX(0); } to { transform: translateX(820px); } }`}</style>
      <div className="absolute inset-x-0 top-0 h-[19%] bg-gradient-to-b from-[#07100f] via-[#07100f]/78 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[21%] bg-gradient-to-t from-[#07100f] via-[#07100f]/82 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_34%,rgba(3,8,8,0.70)_100%)]" />
    </div>
  );
}
