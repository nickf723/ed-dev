"use client";

const TRACKS = [
  [8, 82, -18], [15, 74, 12], [23, 68, -8], [31, 59, 18], [39, 53, -16], [48, 45, 7],
  [62, 76, 16], [70, 69, -12], [77, 61, 8], [84, 54, -18], [90, 46, 12],
] as const;

export default function FieldTraceBackground({ accentRgb = "96, 165, 250" }: { accentRgb?: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 18%, rgba(${accentRgb},0.20), transparent 32%),
            radial-gradient(circle at 82% 26%, rgba(139,92,246,0.16), transparent 35%),
            radial-gradient(circle at 55% 92%, rgba(20,184,166,0.08), transparent 30%),
            linear-gradient(180deg,#020611 0%,#050717 45%,#010309 100%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-55"
        style={{
          backgroundImage: "radial-gradient(circle,rgba(191,219,254,0.16) 0 1px,transparent 1.4px)",
          backgroundSize: "44px 44px",
          maskImage: "radial-gradient(circle at 50% 46%,black,transparent 84%)",
        }}
      />

      <div className="absolute inset-0">
        {TRACKS.map(([left, top, rotate], index) => (
          <span
            key={`${left}-${top}`}
            className="field-track absolute h-7 w-4 rounded-[55%_55%_45%_45%] border"
            style={{
              left: `${left}%`, top: `${top}%`, transform: `rotate(${rotate}deg)`,
              borderColor: `rgba(${accentRgb},0.12)`, background: `rgba(${accentRgb},0.025)`,
              animationDelay: `${-index * 0.8}s`,
            }}
          >
            <span className="absolute -top-2 left-[-3px] h-2 w-2 rounded-full border" style={{ borderColor: `rgba(${accentRgb},0.10)` }} />
            <span className="absolute -top-2 right-[-3px] h-2 w-2 rounded-full border" style={{ borderColor: `rgba(${accentRgb},0.10)` }} />
          </span>
        ))}
      </div>

      <svg viewBox="0 0 1400 860" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <defs>
          <filter id="signal-glow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <g fill="none" strokeLinecap="round" filter="url(#signal-glow)">
          <path d="M110 610 C300 510 420 590 570 420 S850 250 1070 360 S1240 440 1450 310" stroke={`rgba(${accentRgb},0.18)`} strokeWidth="2.2" strokeDasharray="6 11" className="field-signal" />
          <path d="M-80 310 C190 170 360 330 590 200 S1020 100 1470 230" stroke="rgba(167,139,250,0.14)" strokeWidth="2" strokeDasharray="5 13" className="field-signal field-signal-delay" />
          <path d="M120 740 C360 670 480 760 710 640 S1070 560 1370 690" stroke="rgba(45,212,191,0.10)" strokeWidth="1.6" />
          {[260, 690, 1110].map((cx, index) => (
            <g key={cx} opacity={0.72 - index * 0.1}>
              <circle cx={cx} cy={230 + index * 120} r="34" stroke={`rgba(${accentRgb},0.10)`} className="field-ring" style={{ animationDelay: `${-index * 1.2}s` }} />
              <circle cx={cx} cy={230 + index * 120} r="68" stroke={`rgba(${accentRgb},0.055)`} className="field-ring" style={{ animationDelay: `${-index * 1.2 - 0.6}s` }} />
              <circle cx={cx} cy={230 + index * 120} r="5" fill={`rgba(${accentRgb},0.28)`} />
            </g>
          ))}
        </g>
      </svg>

      <div className="absolute bottom-[-18%] left-[-8%] right-[-8%] h-[42%] rounded-[50%] border border-blue-200/[0.05] bg-blue-300/[0.018]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_38%,rgba(0,0,0,0.52)_100%)]" />
      <style jsx>{`
        @keyframes fieldSignal { 0% { stroke-dashoffset: 0; opacity: .25; } 50% { opacity: .9; } 100% { stroke-dashoffset: -90; opacity: .25; } }
        @keyframes fieldRing { 0%,100% { opacity: .15; transform: scale(.82); transform-origin: center; } 50% { opacity: .8; transform: scale(1.18); transform-origin: center; } }
        @keyframes fieldTrack { 0%,100% { opacity: .12; } 50% { opacity: .48; } }
        .field-signal { animation: fieldSignal 9s linear infinite; }
        .field-signal-delay { animation-duration: 13s; animation-direction: reverse; }
        .field-ring { animation: fieldRing 6s ease-in-out infinite; }
        .field-track { animation: fieldTrack 8s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) { .field-signal,.field-ring,.field-track { animation: none !important; } }
      `}</style>
    </div>
  );
}
