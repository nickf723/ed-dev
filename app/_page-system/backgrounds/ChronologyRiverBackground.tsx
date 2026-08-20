"use client";

const THREADS = [
  { y: 18, amp: 40, rgb: "245, 158, 11", delay: "-7s" },
  { y: 34, amp: 28, rgb: "192, 132, 252", delay: "-15s" },
  { y: 53, amp: 48, rgb: "34, 211, 238", delay: "-23s" },
  { y: 72, amp: 34, rgb: "96, 165, 250", delay: "-11s" },
];

export default function ChronologyRiverBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(245,158,11,0.20),transparent_31%),radial-gradient(circle_at_84%_22%,rgba(129,140,248,0.15),transparent_34%),radial-gradient(circle_at_50%_88%,rgba(34,211,238,0.08),transparent_35%),linear-gradient(180deg,#0b0703_0%,#070503_47%,#030303_100%)]" />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(rgba(245,158,11,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(245,158,11,0.028) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(circle at center,black,transparent 84%)",
        }}
      />

      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-70">
        {THREADS.map((thread, index) => (
          <g key={thread.y} style={{ animation: `chronology-drift ${38 + index * 9}s linear infinite`, animationDelay: thread.delay }}>
            <path
              d={`M-180 ${thread.y * 9} C120 ${thread.y * 9 - thread.amp} 270 ${thread.y * 9 + thread.amp} 500 ${thread.y * 9} S880 ${thread.y * 9 - thread.amp} 1120 ${thread.y * 9} S1450 ${thread.y * 9 + thread.amp} 1600 ${thread.y * 9}`}
              fill="none"
              stroke={`rgba(${thread.rgb},0.13)`}
              strokeWidth="2"
            />
            <path
              d={`M-180 ${thread.y * 9 + 12} C120 ${thread.y * 9 + 12 - thread.amp * 0.7} 270 ${thread.y * 9 + 12 + thread.amp * 0.7} 500 ${thread.y * 9 + 12} S880 ${thread.y * 9 + 12 - thread.amp * 0.7} 1120 ${thread.y * 9 + 12} S1450 ${thread.y * 9 + 12 + thread.amp * 0.7} 1600 ${thread.y * 9 + 12}`}
              fill="none"
              stroke={`rgba(${thread.rgb},0.055)`}
              strokeWidth="8"
            />
          </g>
        ))}
        {Array.from({ length: 12 }, (_, index) => (
          <circle
            key={index}
            cx={80 + index * 118}
            cy={112 + ((index * 137) % 660)}
            r={2 + (index % 3)}
            fill={`rgba(${index % 2 ? "245,158,11" : "129,140,248"},0.22)`}
          />
        ))}
      </svg>

      <div className="absolute -left-[18%] top-[20%] h-[46vw] w-[46vw] rounded-full bg-amber-400/[0.05] blur-[110px]" />
      <div className="absolute -right-[16%] bottom-[5%] h-[50vw] w-[50vw] rounded-full bg-indigo-400/[0.045] blur-[120px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_51%,rgba(0,0,0,0.48)_100%)]" />
      <style jsx>{`
        @keyframes chronology-drift {
          0% { transform: translateX(-2%); opacity: .58; }
          50% { transform: translateX(3%); opacity: 1; }
          100% { transform: translateX(-2%); opacity: .58; }
        }
        @media (prefers-reduced-motion: reduce) {
          g { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
