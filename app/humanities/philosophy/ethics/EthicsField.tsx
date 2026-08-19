export default function EthicsField() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#07070b]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(245,158,11,0.09),transparent_28%),radial-gradient(circle_at_82%_30%,rgba(167,139,250,0.08),transparent_32%),radial-gradient(circle_at_50%_86%,rgba(45,212,191,0.055),transparent_32%)]" />

      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="ethics-grid" width="68" height="68" patternUnits="userSpaceOnUse">
            <path d="M68 0H0V68" fill="none" stroke="rgba(255,255,255,0.022)" strokeWidth="1" />
          </pattern>
          <filter id="ethics-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect width="1600" height="1000" fill="url(#ethics-grid)" />

        <g fill="none" strokeLinecap="round">
          <path d="M790 105 C735 220 585 270 390 355 C290 400 230 485 215 610" stroke="rgba(245,158,11,0.11)" strokeWidth="2" />
          <path d="M805 105 C805 250 800 370 800 610" stroke="rgba(167,139,250,0.11)" strokeWidth="2" />
          <path d="M820 105 C875 220 1025 270 1215 355 C1320 402 1375 485 1390 610" stroke="rgba(45,212,191,0.10)" strokeWidth="2" />

          <path d="M215 610 C300 735 470 775 640 835" stroke="rgba(245,158,11,0.065)" strokeWidth="1.5" strokeDasharray="7 12" />
          <path d="M800 610 C760 720 720 770 640 835" stroke="rgba(167,139,250,0.065)" strokeWidth="1.5" strokeDasharray="7 12" />
          <path d="M1390 610 C1265 735 1080 785 960 835" stroke="rgba(45,212,191,0.06)" strokeWidth="1.5" strokeDasharray="7 12" />
          <path d="M640 835 C725 875 875 875 960 835" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5" />
        </g>

        <g filter="url(#ethics-glow)">
          <circle cx="790" cy="105" r="7" fill="rgba(255,255,255,0.16)" />
          <circle cx="215" cy="610" r="6" fill="rgba(245,158,11,0.14)" />
          <circle cx="800" cy="610" r="6" fill="rgba(167,139,250,0.14)" />
          <circle cx="1390" cy="610" r="6" fill="rgba(45,212,191,0.13)" />
        </g>

        <g fontFamily="monospace" fontSize="13" letterSpacing="1.5">
          <text x="175" y="642" fill="rgba(253,230,138,0.12)">OUTCOMES</text>
          <text x="742" y="642" fill="rgba(221,214,254,0.12)">DUTIES</text>
          <text x="1332" y="642" fill="rgba(153,246,228,0.11)">CHARACTER</text>
          <text x="744" y="82" fill="rgba(226,232,240,0.08)">A REASON FOR ACTING</text>
        </g>
      </svg>

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,7,11,0.16),rgba(7,7,11,0.42)_52%,rgba(5,5,9,0.78))]" />
    </div>
  );
}
