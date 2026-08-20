"use client";

const STREAMS = [
  { y: 145, rgb: "34, 197, 94", duration: 22, delay: -4 },
  { y: 260, rgb: "59, 130, 246", duration: 30, delay: -12 },
  { y: 390, rgb: "250, 204, 21", duration: 26, delay: -19 },
  { y: 535, rgb: "139, 92, 246", duration: 34, delay: -7 },
  { y: 680, rgb: "20, 184, 166", duration: 28, delay: -17 },
];

export default function MarketFlowBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(34,197,94,0.19),transparent_30%),radial-gradient(circle_at_85%_20%,rgba(59,130,246,0.17),transparent_32%),radial-gradient(circle_at_50%_88%,rgba(250,204,21,0.07),transparent_34%),linear-gradient(180deg,#040b08_0%,#050910_48%,#020404_100%)]" />
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,197,94,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(59,130,246,0.035) 1px,transparent 1px)",
          backgroundSize: "58px 58px",
          maskImage: "radial-gradient(circle at center,black,transparent 85%)",
        }}
      />
      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-75">
        {STREAMS.map((stream, index) => (
          <g
            key={stream.y}
            style={{
              animation: `market-flow-${index % 2 ? "reverse" : "forward"} ${stream.duration}s linear infinite`,
              animationDelay: `${stream.delay}s`,
            }}
          >
            <path
              d={`M-220 ${stream.y} C60 ${stream.y - 80} 280 ${stream.y + 90} 510 ${stream.y} S900 ${stream.y - 95} 1140 ${stream.y} S1440 ${stream.y + 70} 1650 ${stream.y}`}
              fill="none"
              stroke={`rgba(${stream.rgb},0.11)`}
              strokeWidth="10"
            />
            <path
              d={`M-220 ${stream.y} C60 ${stream.y - 80} 280 ${stream.y + 90} 510 ${stream.y} S900 ${stream.y - 95} 1140 ${stream.y} S1440 ${stream.y + 70} 1650 ${stream.y}`}
              fill="none"
              stroke={`rgba(${stream.rgb},0.26)`}
              strokeWidth="1.4"
              strokeDasharray="3 16"
            />
          </g>
        ))}
        {[
          [250, 225, "34,197,94"],
          [520, 410, "59,130,246"],
          [840, 250, "250,204,21"],
          [1080, 570, "139,92,246"],
          [690, 680, "20,184,166"],
        ].map(([cx, cy, rgb], index) => (
          <g key={index}>
            <circle cx={Number(cx)} cy={Number(cy)} r="56" fill={`rgba(${rgb},0.025)`} stroke={`rgba(${rgb},0.11)`} />
            <circle cx={Number(cx)} cy={Number(cy)} r="7" fill={`rgba(${rgb},0.28)`} />
          </g>
        ))}
      </svg>
      <div className="absolute -left-[14%] top-[4%] h-[40vw] w-[40vw] rounded-full bg-emerald-400/[0.05] blur-[100px]" />
      <div className="absolute -right-[12%] top-[14%] h-[42vw] w-[42vw] rounded-full bg-blue-400/[0.045] blur-[110px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.46)_100%)]" />
      <style jsx>{`
        @keyframes market-flow-forward {
          from { transform: translateX(-3%); }
          50% { transform: translateX(3%); }
          to { transform: translateX(-3%); }
        }
        @keyframes market-flow-reverse {
          from { transform: translateX(3%); }
          50% { transform: translateX(-3%); }
          to { transform: translateX(3%); }
        }
        @media (prefers-reduced-motion: reduce) {
          g { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
