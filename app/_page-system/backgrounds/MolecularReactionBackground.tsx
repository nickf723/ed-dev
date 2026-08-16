"use client";

const ATOMS = [
  { x: 16, y: 22, r: 10, rgb: "52,211,153", delay: -3 },
  { x: 31, y: 15, r: 7, rgb: "34,211,238", delay: -8 },
  { x: 45, y: 31, r: 12, rgb: "250,204,21", delay: -12 },
  { x: 62, y: 18, r: 8, rgb: "96,165,250", delay: -5 },
  { x: 80, y: 29, r: 11, rgb: "244,114,182", delay: -14 },
  { x: 21, y: 58, r: 8, rgb: "251,146,60", delay: -10 },
  { x: 39, y: 72, r: 13, rgb: "52,211,153", delay: -6 },
  { x: 57, y: 55, r: 7, rgb: "34,211,238", delay: -16 },
  { x: 74, y: 73, r: 10, rgb: "167,139,250", delay: -2 },
  { x: 88, y: 57, r: 7, rgb: "250,204,21", delay: -11 },
] as const;

const BONDS = [[0,1],[1,2],[2,3],[3,4],[0,5],[2,7],[5,6],[6,7],[7,8],[8,9],[4,9]] as const;

export default function MolecularReactionBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(52,211,153,0.19),transparent_30%),radial-gradient(circle_at_82%_22%,rgba(34,211,238,0.15),transparent_32%),radial-gradient(circle_at_52%_84%,rgba(250,204,21,0.07),transparent_34%),linear-gradient(180deg,#030b08_0%,#04080d_48%,#020403_100%)]" />
      <div className="absolute -left-[14%] top-[8%] h-[44vw] w-[44vw] rounded-full bg-emerald-400/[0.055] blur-[110px]" />
      <div className="absolute -right-[12%] top-[16%] h-[46vw] w-[46vw] rounded-full bg-cyan-400/[0.045] blur-[120px]" />

      <svg viewBox="0 0 1000 800" className="absolute inset-0 h-full w-full opacity-75" preserveAspectRatio="none">
        {BONDS.map(([a,b], index) => {
          const A = ATOMS[a]; const B = ATOMS[b];
          return (
            <line
              key={index}
              x1={`${A.x}%`}
              y1={`${A.y}%`}
              x2={`${B.x}%`}
              y2={`${B.y}%`}
              stroke={`rgba(${index % 3 === 0 ? "52,211,153" : index % 3 === 1 ? "34,211,238" : "250,204,21"},0.075)`}
              strokeWidth="1.6"
              strokeDasharray={index % 4 === 0 ? "5 8" : undefined}
            />
          );
        })}
        {ATOMS.map((atom, index) => (
          <g key={index} style={{ animation: `chem-atom ${11 + (index % 5) * 3}s ease-in-out infinite`, animationDelay: `${atom.delay}s` }}>
            <circle cx={`${atom.x}%`} cy={`${atom.y}%`} r={atom.r} fill={`rgba(${atom.rgb},0.12)`} stroke={`rgba(${atom.rgb},0.28)`} strokeWidth="1.3" />
            <circle cx={`${atom.x}%`} cy={`${atom.y}%`} r={atom.r * 2.4} fill="none" stroke={`rgba(${atom.rgb},0.045)`} />
          </g>
        ))}
        <path d="M70 660 C280 540 390 760 580 630 S900 500 1080 640" fill="none" stroke="rgba(52,211,153,0.07)" strokeWidth="2" />
        <path d="M70 690 C280 570 390 790 580 660 S900 530 1080 670" fill="none" stroke="rgba(34,211,238,0.04)" strokeWidth="9" />
      </svg>

      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage: "linear-gradient(rgba(52,211,153,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at center,black,transparent 84%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_51%,rgba(0,0,0,0.48)_100%)]" />
      <style jsx>{`
        @keyframes chem-atom {
          0%,100% { transform:translate(0,0) scale(.92); opacity:.55; }
          50% { transform:translate(7px,-9px) scale(1.1); opacity:1; }
        }
        @media (prefers-reduced-motion: reduce) { g { animation:none !important; } }
      `}</style>
    </div>
  );
}
