const THREADS = [
  { y: 150, rgb: "251,191,36", phase: 0 },
  { y: 280, rgb: "192,132,252", phase: 1 },
  { y: 430, rgb: "244,114,182", phase: 2 },
  { y: 590, rgb: "34,211,238", phase: 3 },
  { y: 720, rgb: "148,163,184", phase: 4 },
];

export default function DialecticFieldBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_17%,rgba(251,191,36,0.17),transparent_29%),radial-gradient(circle_at_82%_20%,rgba(192,132,252,0.17),transparent_31%),radial-gradient(circle_at_55%_86%,rgba(244,114,182,0.08),transparent_34%),linear-gradient(180deg,#0b0805_0%,#08060e_47%,#030305_100%)]" />
      <div className="absolute -left-[12%] top-[10%] h-[42vw] w-[42vw] rounded-full bg-amber-400/[0.045] blur-[110px]" />
      <div className="absolute -right-[12%] top-[17%] h-[46vw] w-[46vw] rounded-full bg-violet-500/[0.055] blur-[120px]" />

      <svg
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full opacity-75"
      >
        {THREADS.map((thread) => (
          <g key={thread.y}>
            <path
              d={`M-120 ${thread.y} C150 ${thread.y - 75} 310 ${thread.y + 70} 520 ${thread.y} S850 ${thread.y - 70} 1080 ${thread.y} S1370 ${thread.y + 60} 1510 ${thread.y}`}
              fill="none"
              stroke={`rgba(${thread.rgb},0.09)`}
              strokeWidth="1.7"
              strokeDasharray={thread.phase % 2 === 0 ? "none" : "7 11"}
            />
            <path
              d={`M-120 ${thread.y + 12} C150 ${thread.y - 40} 310 ${thread.y + 58} 520 ${thread.y + 12} S850 ${thread.y - 45} 1080 ${thread.y + 12} S1370 ${thread.y + 46} 1510 ${thread.y + 12}`}
              fill="none"
              stroke={`rgba(${thread.rgb},0.035)`}
              strokeWidth="10"
            />
          </g>
        ))}
        {[
          [210, 235, "251,191,36"],
          [510, 330, "192,132,252"],
          [785, 205, "244,114,182"],
          [1030, 420, "34,211,238"],
          [380, 650, "148,163,184"],
          [890, 690, "251,191,36"],
        ].map(([cx, cy, rgb], index) => (
          <g key={index}>
            <circle
              cx={Number(cx)}
              cy={Number(cy)}
              r="5"
              fill={`rgba(${rgb},0.30)`}
            />
            <circle
              cx={Number(cx)}
              cy={Number(cy)}
              r="26"
              fill="none"
              stroke={`rgba(${rgb},0.07)`}
            />
          </g>
        ))}
      </svg>

      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(192,132,252,0.028) 1px,transparent 1px)",
          backgroundSize: "68px 68px",
          maskImage: "radial-gradient(circle at center,black,transparent 83%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.50)_100%)]" />
    </div>
  );
}
