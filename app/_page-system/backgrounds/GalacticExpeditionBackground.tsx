"use client";

const NEAR_STARS = Array.from({ length: 54 }, (_, index) => ({
  x: (index * 41.7) % 100,
  y: (index * 63.1) % 100,
  size: 1.2 + (index % 5) * 0.7,
  delay: -(index % 9) * 1.4,
}));

const FAR_STARS = Array.from({ length: 120 }, (_, index) => ({
  x: (index * 29.37) % 100,
  y: (index * 47.83) % 100,
  size: 0.45 + (index % 4) * 0.28,
  opacity: 0.18 + (index % 6) * 0.055,
}));

export default function GalacticExpeditionBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(34,211,238,0.24),transparent_26%),radial-gradient(circle_at_76%_20%,rgba(139,92,246,0.25),transparent_30%),radial-gradient(circle_at_55%_76%,rgba(244,114,182,0.11),transparent_33%),linear-gradient(180deg,#02040e_0%,#06051a_48%,#010208_100%)]" />

      <div className="absolute left-[8%] top-[10%] h-[62vh] w-[62vh] rounded-full border border-cyan-100/[0.07] shadow-[0_0_120px_rgba(34,211,238,0.08)]">
        <span className="absolute inset-[10%] rounded-full border border-cyan-100/[0.055]" />
        <span className="absolute inset-[24%] rounded-full border border-cyan-100/[0.05]" />
        <span className="absolute inset-[39%] rounded-full border border-cyan-100/[0.045]" />
        <span className="absolute left-1/2 top-1/2 h-[130%] w-px -translate-x-1/2 -translate-y-1/2 rotate-[24deg] bg-gradient-to-b from-transparent via-cyan-100/[0.12] to-transparent" />
        <span className="absolute left-1/2 top-1/2 h-px w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-[18deg] bg-gradient-to-r from-transparent via-cyan-100/[0.10] to-transparent" />
        <span className="absolute inset-[4%] rounded-full border border-cyan-100/[0.10] animate-[mission-scan_16s_linear_infinite]" style={{ clipPath: "polygon(50% 50%,100% 0,100% 35%)" }} />
      </div>

      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <defs>
          <linearGradient id="mission-path" x1="0" x2="1">
            <stop offset="0" stopColor="rgba(34,211,238,0.34)" />
            <stop offset="0.55" stopColor="rgba(167,139,250,0.34)" />
            <stop offset="1" stopColor="rgba(244,114,182,0.28)" />
          </linearGradient>
          <radialGradient id="mission-core">
            <stop offset="0" stopColor="rgba(255,255,255,0.48)" />
            <stop offset="0.2" stopColor="rgba(192,132,252,0.24)" />
            <stop offset="1" stopColor="rgba(99,102,241,0)" />
          </radialGradient>
        </defs>

        <path d="M-80 736 C140 610 284 770 465 620 S745 390 920 460 S1192 566 1490 294" fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="24" strokeLinecap="round" />
        <path d="M-80 736 C140 610 284 770 465 620 S745 390 920 460 S1192 566 1490 294" fill="none" stroke="url(#mission-path)" strokeWidth="2" strokeDasharray="7 16" strokeLinecap="round" className="animate-[mission-route_22s_linear_infinite]" />

        <ellipse cx="1115" cy="250" rx="212" ry="62" transform="rotate(22 1115 250)" fill="url(#mission-core)" stroke="rgba(192,132,252,0.13)" strokeWidth="1.4" />
        <ellipse cx="1115" cy="250" rx="148" ry="42" transform="rotate(22 1115 250)" fill="none" stroke="rgba(244,114,182,0.10)" strokeWidth="1" />
        <ellipse cx="290" cy="690" rx="126" ry="35" transform="rotate(-14 290 690)" fill="none" stroke="rgba(34,211,238,0.11)" strokeWidth="1.2" />

        <g fill="rgba(255,255,255,0.54)">
          {FAR_STARS.map((star, index) => (
            <circle key={`far-${index}`} cx={`${star.x}%`} cy={`${star.y}%`} r={star.size} opacity={star.opacity} />
          ))}
        </g>
      </svg>

      {NEAR_STARS.map((star, index) => (
        <span
          key={index}
          className="absolute rounded-full bg-white animate-[mission-twinkle_9s_ease-in-out_infinite]"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}s`,
            boxShadow: index % 3 === 0 ? "0 0 13px rgba(186,230,253,0.50)" : "0 0 8px rgba(221,214,254,0.35)",
          }}
        />
      ))}

      <div className="absolute inset-x-[4%] top-[8%] h-[84%] rounded-[52px] border border-white/[0.035]" />
      <div className="absolute left-[4%] top-[8%] h-16 w-16 border-l border-t border-cyan-100/[0.12]" />
      <div className="absolute right-[4%] top-[8%] h-16 w-16 border-r border-t border-violet-100/[0.12]" />
      <div className="absolute bottom-[8%] left-[4%] h-16 w-16 border-b border-l border-cyan-100/[0.08]" />
      <div className="absolute bottom-[8%] right-[4%] h-16 w-16 border-b border-r border-violet-100/[0.08]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_38%,transparent_42%,rgba(0,0,0,0.58)_100%)]" />

      <style jsx>{`
        @keyframes mission-route { to { stroke-dashoffset: -260; } }
        @keyframes mission-scan { to { transform: rotate(360deg); } }
        @keyframes mission-twinkle {
          0%, 100% { opacity: .35; transform: scale(.8); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
