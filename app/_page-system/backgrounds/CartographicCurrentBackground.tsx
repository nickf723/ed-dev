"use client";

const CURRENTS = [
  { d: "M-80 300 C160 190 330 380 560 285 S940 140 1190 300 S1430 390 1540 290", rgb: "16,185,129", delay: -7 },
  { d: "M-70 520 C120 430 310 620 530 505 S900 390 1120 520 S1410 610 1530 500", rgb: "59,130,246", delay: -15 },
  { d: "M120 710 C320 590 520 760 760 650 S1100 540 1390 690", rgb: "245,158,11", delay: -4 },
] as const;

export default function CartographicCurrentBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(59,130,246,0.15),transparent_32%),radial-gradient(circle_at_52%_86%,rgba(245,158,11,0.07),transparent_35%),linear-gradient(180deg,#030807_0%,#04070d_50%,#020303_100%)]" />
      <div className="absolute -left-[14%] top-[8%] h-[42vw] w-[42vw] rounded-full bg-emerald-400/[0.05] blur-[110px]" />
      <div className="absolute -right-[12%] top-[18%] h-[46vw] w-[46vw] rounded-full bg-blue-400/[0.045] blur-[120px]" />

      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-70">
        {Array.from({ length: 11 }, (_, index) => (
          <ellipse key={`lat-${index}`} cx="700" cy={100 + index * 70} rx="780" ry={38 + Math.abs(index - 5) * 12} fill="none" stroke="rgba(255,255,255,0.035)" />
        ))}
        {Array.from({ length: 13 }, (_, index) => (
          <path key={`lon-${index}`} d={`M${80 + index * 104} -80 C${40 + index * 112} 220 ${115 + index * 96} 620 ${75 + index * 105} 980`} fill="none" stroke="rgba(255,255,255,0.028)" />
        ))}
        {CURRENTS.map((current, index) => (
          <g key={index} style={{ animation: `map-current ${24 + index * 8}s ease-in-out infinite`, animationDelay: `${current.delay}s` }}>
            <path d={current.d} fill="none" stroke={`rgba(${current.rgb},0.075)`} strokeWidth="13" strokeLinecap="round" />
            <path d={current.d} fill="none" stroke={`rgba(${current.rgb},0.18)`} strokeWidth="1.4" strokeDasharray="4 13" />
          </g>
        ))}
        {[[240,260],[470,210],[710,315],[980,225],[1160,410],[355,570],[720,620],[1030,610]].map(([cx,cy], index) => (
          <g key={index} style={{ animation: `map-node ${9 + index * 1.3}s ease-in-out infinite`, animationDelay: `${-index * 1.7}s` }}>
            <circle cx={cx} cy={cy} r="5" fill={`rgba(${index % 2 ? "59,130,246" : "16,185,129"},0.22)`} />
            <circle cx={cx} cy={cy} r="24" fill="none" stroke={`rgba(${index % 2 ? "59,130,246" : "16,185,129"},0.055)`} />
          </g>
        ))}
      </svg>

      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.10) 0 1px,transparent 1.5px)", backgroundSize: "68px 68px", maskImage: "radial-gradient(circle at center,black,transparent 82%)" }} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.50)_100%)]" />
      <style jsx>{`
        @keyframes map-current { 0%,100% { transform:translateX(-2%); opacity:.48; } 50% { transform:translateX(2%); opacity:1; } }
        @keyframes map-node { 0%,100% { opacity:.45; transform:scale(.88); } 50% { opacity:1; transform:scale(1.18); } }
        @media (prefers-reduced-motion: reduce) { g { animation:none !important; } }
      `}</style>
    </div>
  );
}
