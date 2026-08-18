export default function IndustrialDesignWorld2026() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#100d0b]" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_44%,rgba(251,146,60,0.07),transparent_32%),radial-gradient(circle_at_18%_70%,rgba(244,114,182,0.035),transparent_28%),linear-gradient(135deg,#100d0b_0%,#18120f_52%,#111018_100%)]" />

      <svg className="absolute inset-[13%_3%_13%_3%] h-[74%] w-[94%] opacity-90" viewBox="0 0 1400 760" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="studio-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M48 0H0V48" fill="none" stroke="rgba(251,146,60,0.055)" strokeWidth="1" />
          </pattern>
          <linearGradient id="inspect" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(255,237,213,0)" />
            <stop offset="0.5" stopColor="rgba(255,237,213,0.12)" />
            <stop offset="1" stopColor="rgba(255,237,213,0)" />
          </linearGradient>
        </defs>

        <rect x="15" y="15" width="1370" height="730" fill="url(#studio-grid)" stroke="rgba(251,146,60,0.08)" />

        <g transform="translate(500 145)" fill="rgba(251,146,60,0.025)" stroke="rgba(251,146,60,0.28)" strokeWidth="2">
          <path d="M0 112C54 62 209 58 337 92c45 12 76 37 91 68-25 38-79 58-170 63-73 4-127-7-169-27-29-14-51-13-78 9-19 16-43 16-58-7-20-30-18-64 4-86Z" />
          <path d="M84 193c23 20 38 44 31 103-19 16-46 13-61-8-5-49-2-77 13-95" />
          <ellipse cx="370" cy="158" rx="47" ry="45" fill="none" stroke="rgba(125,211,252,0.23)" />
          <rect x="226" y="77" width="46" height="20" rx="10" fill="rgba(251,191,36,0.10)" stroke="rgba(251,191,36,0.26)" />
          <path d="M78 108v83M191 67v153M299 72v149" stroke="rgba(251,146,60,0.12)" strokeDasharray="6 7" />
        </g>

        <g transform="translate(530 500)" fill="none" stroke="rgba(192,132,252,0.20)" strokeWidth="1.5">
          <rect x="0" y="0" width="230" height="128" />
          <rect x="28" y="31" width="68" height="70" />
          <rect x="116" y="39" width="48" height="52" />
          <circle cx="198" cy="64" r="28" />
          <path d="M0 145h230M0 139v12M230 139v12" stroke="rgba(214,211,209,0.12)" />
        </g>

        <g transform="translate(820 488)" fill="rgba(245,245,244,0.025)" stroke="rgba(245,245,244,0.12)" strokeWidth="1.5">
          <path d="M0 88c50-41 183-46 270-9-20 40-70 61-154 62-56 1-100-9-129-28-12-8-8-17 13-25Z" />
          <ellipse cx="48" cy="124" rx="43" ry="25" fill="rgba(251,146,60,0.05)" stroke="rgba(244,114,182,0.13)" />
        </g>

        <g transform="translate(92 240)">
          <text x="0" y="0" fill="rgba(251,146,60,0.28)" fontSize="13" fontFamily="monospace">CMF / MATERIAL STUDIES</text>
          {[
            [0, "#c36f36", "warm polymer"],
            [62, "#727b82", "bead-blast metal"],
            [124, "#313943", "elastomer grip"],
            [186, "#b5aa90", "recycled composite"],
          ].map(([offset, color, label]) => (
            <g key={String(label)} transform={`translate(0 ${Number(offset) + 24})`}>
              <rect width="56" height="34" fill={String(color)} fillOpacity="0.30" stroke="rgba(255,255,255,0.08)" />
              <text x="70" y="22" fill="rgba(214,211,209,0.22)" fontSize="12" fontFamily="monospace">{String(label)}</text>
            </g>
          ))}
        </g>

        <g transform="translate(92 602)" fill="none" stroke="rgba(244,114,182,0.14)" strokeWidth="2">
          <path d="M0 44C35-18 77-23 111 17c25 28 54 31 91 11" />
          <text x="0" y="78" fill="rgba(244,114,182,0.22)" stroke="none" fontSize="12" fontFamily="monospace">CONTACT / REACH / WRIST ANGLE</text>
        </g>

        <g fill="rgba(214,211,209,0.20)" fontFamily="monospace" fontSize="12">
          <text x="500" y="112">HANDHELD LIGHT · FORM / GRIP / ASSEMBLY</text>
          <text x="530" y="484">SECTION · INTERNAL PACKAGING</text>
          <text x="820" y="470">FOAM MODEL · GRIP CHECK</text>
          <text x="1010" y="155">SPLIT LINE</text>
          <text x="1045" y="182">PRIMARY CONTROL</text>
        </g>

        <rect x="180" y="15" width="165" height="730" fill="url(#inspect)" className="animate-[studio-scan_42s_ease-in-out_infinite_alternate] motion-reduce:animate-none" />
      </svg>

      <style>{`@keyframes studio-scan { from { transform: translateX(0); } to { transform: translateX(860px); } }`}</style>
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#100d0b] via-[#100d0b]/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#100d0b] via-[#100d0b]/78 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(8,6,5,0.68)_100%)]" />
    </div>
  );
}
