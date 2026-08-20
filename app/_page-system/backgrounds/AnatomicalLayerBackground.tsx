"use client";

const SYSTEMS = [
  { y: 18, rgb: "248,113,113", width: 58 },
  { y: 34, rgb: "56,189,248", width: 66 },
  { y: 52, rgb: "250,204,21", width: 74 },
  { y: 70, rgb: "192,132,252", width: 62 },
] as const;

export default function AnatomicalLayerBackground({
  accentRgb = "45, 212, 191",
}: {
  accentRgb?: string;
}) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 15% 18%, rgba(${accentRgb},0.18), transparent 30%),
            radial-gradient(circle at 86% 22%, rgba(96,165,250,0.14), transparent 34%),
            radial-gradient(circle at 52% 86%, rgba(192,132,252,0.09), transparent 34%),
            linear-gradient(180deg,#031018 0%,#071018 46%,#020509 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage:
            "linear-gradient(rgba(125,211,252,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(125,211,252,0.04) 1px,transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(circle at center,black,transparent 86%)",
        }}
      />
      <svg viewBox="0 0 1400 850" className="absolute inset-0 h-full w-full opacity-80" preserveAspectRatio="none">
        <defs>
          <filter id="anatomy-glow"><feGaussianBlur stdDeviation="6" /></filter>
          <linearGradient id="scan" x1="0" x2="1"><stop offset="0" stopColor="rgba(34,211,238,0)"/><stop offset="0.5" stopColor="rgba(34,211,238,0.34)"/><stop offset="1" stopColor="rgba(34,211,238,0)"/></linearGradient>
        </defs>
        <g fill="none" strokeLinecap="round">
          <ellipse cx="290" cy="340" rx="210" ry="116" stroke="rgba(56,189,248,0.11)" strokeWidth="2" />
          <circle cx="500" cy="300" r="56" stroke="rgba(56,189,248,0.10)" strokeWidth="2" />
          <path d="M145 374 C240 320 350 324 458 350" stroke="rgba(248,113,113,0.16)" strokeWidth="8" />
          <path d="M180 355 C238 378 292 405 350 432" stroke="rgba(250,204,21,0.10)" strokeWidth="5" />
          <path d="M240 250 C254 186 305 158 360 190 C420 225 438 288 416 346" stroke="rgba(192,132,252,0.10)" strokeWidth="4" />

          <ellipse cx="1080" cy="338" rx="184" ry="92" stroke="rgba(45,212,191,0.11)" strokeWidth="2" />
          <path d="M890 338 L760 262 L790 350 L760 432 Z" stroke="rgba(45,212,191,0.10)" strokeWidth="2" />
          <path d="M930 330 C1010 280 1120 280 1230 344" stroke="rgba(248,113,113,0.13)" strokeWidth="7" />
          <path d="M950 365 C1020 390 1098 400 1195 370" stroke="rgba(56,189,248,0.12)" strokeWidth="5" />
        </g>
        <rect x="0" y="0" width="360" height="850" fill="url(#scan)" className="anatomy-scan" />
      </svg>

      <div className="absolute inset-y-[8%] left-[8%] w-[26%] rounded-[48%] border border-cyan-200/[0.05] bg-cyan-300/[0.015] blur-[1px]" />
      <div className="absolute inset-y-[10%] right-[7%] w-[25%] rounded-[48%] border border-violet-200/[0.05] bg-violet-300/[0.014] blur-[1px]" />

      {SYSTEMS.map((system, index) => (
        <div key={system.y} className="absolute left-[14%] right-[14%] h-px overflow-visible" style={{ top: `${system.y}%` }}>
          <div
            className="anatomy-pulse h-px"
            style={{
              width: `${system.width}%`,
              marginLeft: `${(100 - system.width) / 2}%`,
              background: `linear-gradient(90deg,transparent,rgba(${system.rgb},0.28),transparent)`,
              boxShadow: `0 0 24px rgba(${system.rgb},0.18)`,
              animationDelay: `${-index * 1.4}s`,
            }}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_43%,rgba(0,0,0,0.48)_100%)]" />
      <style jsx>{`
        @keyframes anatomyScan {
          0% { transform: translateX(-420px); opacity: 0; }
          18% { opacity: .7; }
          82% { opacity: .7; }
          100% { transform: translateX(1480px); opacity: 0; }
        }
        @keyframes anatomyPulse {
          0%,100% { opacity: .18; transform: scaleX(.86); }
          50% { opacity: .78; transform: scaleX(1.08); }
        }
        .anatomy-scan { animation: anatomyScan 11s linear infinite; }
        .anatomy-pulse { animation: anatomyPulse 6s ease-in-out infinite; transform-origin: center; }
        @media (prefers-reduced-motion: reduce) {
          .anatomy-scan,.anatomy-pulse { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
