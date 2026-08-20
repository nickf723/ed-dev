"use client";

const NOTES = [
  [16, 22, "244,114,182"], [31, 16, "251,146,60"], [46, 28, "167,139,250"],
  [62, 17, "34,211,238"], [77, 30, "244,114,182"], [88, 15, "250,204,21"],
  [22, 48, "34,211,238"], [39, 56, "244,114,182"], [55, 45, "251,146,60"],
  [71, 57, "167,139,250"], [84, 46, "34,211,238"], [14, 74, "250,204,21"],
  [34, 80, "167,139,250"], [52, 70, "244,114,182"], [68, 82, "251,146,60"], [87, 72, "34,211,238"],
] as const;

const CONNECTIONS = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[0,6],[1,6],[2,7],[3,8],[4,9],[5,10],
  [6,7],[7,8],[8,9],[9,10],[6,11],[7,12],[8,13],[9,14],[10,15],[11,12],[12,13],[13,14],[14,15],
] as const;

export default function HarmonicLatticeBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,114,182,0.20),transparent_29%),radial-gradient(circle_at_82%_18%,rgba(251,146,60,0.15),transparent_31%),radial-gradient(circle_at_52%_84%,rgba(167,139,250,0.13),transparent_34%),linear-gradient(180deg,#090309_0%,#07040f_48%,#020205_100%)]" />
      <div className="absolute -left-[12%] top-[8%] h-[42vw] w-[42vw] rounded-full bg-rose-500/[0.055] blur-[105px]" />
      <div className="absolute -right-[10%] top-[18%] h-[45vw] w-[45vw] rounded-full bg-amber-400/[0.04] blur-[115px]" />

      <svg viewBox="0 0 1000 800" className="absolute inset-0 h-full w-full opacity-70" preserveAspectRatio="none">
        {CONNECTIONS.map(([a,b], index) => {
          const A = NOTES[a]; const B = NOTES[b];
          return <line key={index} x1={`${A[0]}%`} y1={`${A[1]}%`} x2={`${B[0]}%`} y2={`${B[1]}%`} stroke={`rgba(${index % 3 === 0 ? "244,114,182" : index % 3 === 1 ? "167,139,250" : "251,146,60"},0.075)`} strokeWidth="1.1" />;
        })}
        {NOTES.map(([x,y,rgb], index) => (
          <g key={index} style={{ animation: `harmonic-pulse ${8 + (index % 6) * 2}s ease-in-out infinite`, animationDelay: `${-(index % 7) * 1.1}s` }}>
            <circle cx={`${x}%`} cy={`${y}%`} r={4 + (index % 3)} fill={`rgba(${rgb},0.24)`} />
            <circle cx={`${x}%`} cy={`${y}%`} r={12 + (index % 4) * 3} fill="none" stroke={`rgba(${rgb},0.06)`} />
          </g>
        ))}
        {Array.from({ length: 7 }, (_, index) => (
          <ellipse key={index} cx="520" cy="420" rx={90 + index * 54} ry={34 + index * 19} fill="none" stroke={`rgba(${index % 2 ? "244,114,182" : "167,139,250"},${0.055 - index * 0.004})`} transform={`rotate(${index * 17 - 42} 520 420)`} />
        ))}
      </svg>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: "linear-gradient(rgba(244,114,182,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,0.03) 1px,transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(circle at center,black,transparent 83%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.50)_100%)]" />
      <style jsx>{`
        @keyframes harmonic-pulse {
          0%,100% { opacity:.38; transform:scale(.86); }
          50% { opacity:1; transform:scale(1.24); }
        }
        @media (prefers-reduced-motion: reduce) { g { animation:none !important; } }
      `}</style>
    </div>
  );
}
