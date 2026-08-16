"use client";

const BRANCHES = [
  "M110 760 C210 650 280 612 356 516 C424 430 475 358 536 256",
  "M356 516 C470 520 558 494 646 420 C734 346 806 264 892 160",
  "M356 516 C484 586 584 638 710 692 C802 732 914 746 1080 730",
  "M536 256 C650 254 734 226 824 148 C908 78 1006 48 1150 66",
  "M536 256 C596 174 638 106 646 36",
  "M646 420 C744 430 834 410 930 352 C1024 296 1110 282 1238 304",
  "M646 420 C722 500 812 552 932 582 C1022 604 1132 606 1260 572",
] as const;

export default function PhylogeneticCanopyBackground({
  accentRgb = "52, 211, 153",
}: {
  accentRgb?: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 12% 15%, rgba(${accentRgb},0.20), transparent 32%),
            radial-gradient(circle at 82% 16%, rgba(34,211,238,0.13), transparent 34%),
            radial-gradient(circle at 58% 88%, rgba(132,204,22,0.10), transparent 30%),
            linear-gradient(180deg,#020b08 0%,#03110d 42%,#010504 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(110,231,183,0.16) 0 1px,transparent 1.4px)",
          backgroundSize: "38px 38px",
          maskImage: "radial-gradient(circle at 52% 44%,black,transparent 82%)",
        }}
      />
      <svg viewBox="0 0 1400 820" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <filter id="canopy-glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="canopy-line" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor={`rgba(${accentRgb},0.12)`} />
            <stop offset="0.5" stopColor={`rgba(${accentRgb},0.42)`} />
            <stop offset="1" stopColor="rgba(34,211,238,0.18)" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#canopy-line)" strokeLinecap="round" filter="url(#canopy-glow)">
          {BRANCHES.map((branch, index) => (
            <path
              key={branch}
              d={branch}
              strokeWidth={index === 0 ? 4 : 2.2}
              strokeDasharray={index === 0 ? undefined : "7 12"}
              className="phylo-branch"
              style={{ animationDelay: `${-index * 1.8}s` }}
            />
          ))}
        </g>
        {["356,516","536,256","646,420","892,160","710,692","930,352","932,582"].map((point, index) => {
          const [cx, cy] = point.split(",").map(Number);
          return (
            <g key={point}>
              <circle cx={cx} cy={cy} r={6 + (index % 3) * 2} fill={`rgba(${accentRgb},0.22)`} className="phylo-node" style={{ animationDelay: `${-index * 0.7}s` }} />
              <circle cx={cx} cy={cy} r={18 + (index % 2) * 7} fill="none" stroke={`rgba(${accentRgb},0.08)`} />
            </g>
          );
        })}
      </svg>
      <div className="absolute inset-x-[-10%] bottom-[-28%] h-[58%] rounded-[50%] border border-emerald-200/[0.06] bg-emerald-400/[0.025] blur-[1px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_40%,rgba(0,0,0,0.46)_100%)]" />
      <style jsx>{`
        @keyframes phyloPulse {
          0%,100% { stroke-opacity: .28; }
          50% { stroke-opacity: .82; }
        }
        @keyframes phyloNode {
          0%,100% { opacity: .28; transform: scale(.8); transform-origin: center; }
          50% { opacity: .9; transform: scale(1.25); transform-origin: center; }
        }
        .phylo-branch { animation: phyloPulse 8s ease-in-out infinite; }
        .phylo-node { animation: phyloNode 5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .phylo-branch,.phylo-node { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
