"use client";

const PHRASES = ["sound", "contrast", "word", "phrase", "meaning", "context", "variation", "change"];

export default function LanguageSignalBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_17%_16%,rgba(132,204,22,0.20),transparent_30%),radial-gradient(circle_at_83%_22%,rgba(34,211,238,0.16),transparent_32%),radial-gradient(circle_at_52%_86%,rgba(167,139,250,0.09),transparent_34%),linear-gradient(180deg,#030906_0%,#040914_49%,#020303_100%)]" />
      <div className="absolute -left-[12%] top-[8%] h-[42vw] w-[42vw] rounded-full bg-lime-400/[0.05] blur-[110px]" />
      <div className="absolute -right-[12%] top-[16%] h-[46vw] w-[46vw] rounded-full bg-cyan-400/[0.05] blur-[120px]" />

      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-75">
        {Array.from({ length: 5 }, (_, band) => {
          const y = 155 + band * 135;
          return (
            <g key={band} style={{ animation: `signal-slide ${24 + band * 5}s ease-in-out infinite`, animationDelay: `${-band * 4}s` }}>
              <path d={`M-130 ${y} C100 ${y - 55} 225 ${y + 60} 430 ${y} S760 ${y - 65} 970 ${y} S1260 ${y + 48} 1530 ${y}`} fill="none" stroke={`rgba(${band % 3 === 0 ? "132,204,22" : band % 3 === 1 ? "34,211,238" : "167,139,250"},0.10)`} strokeWidth="2" />
              <path d={`M-130 ${y + 9} C100 ${y - 30} 225 ${y + 45} 430 ${y + 9} S760 ${y - 38} 970 ${y + 9} S1260 ${y + 34} 1530 ${y + 9}`} fill="none" stroke={`rgba(${band % 3 === 0 ? "132,204,22" : band % 3 === 1 ? "34,211,238" : "167,139,250"},0.035)`} strokeWidth="10" />
            </g>
          );
        })}
        <g opacity="0.35">
          <path d="M180 210 L320 310 L480 235 L640 355 L820 255 L1010 360 L1190 260" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.2" />
          {[180,320,480,640,820,1010,1190].map((x, index) => <circle key={x} cx={x} cy={[210,310,235,355,255,360,260][index]} r="5" fill={`rgba(${index % 2 ? "34,211,238" : "132,204,22"},0.22)`} />)}
        </g>
      </svg>

      <div className="absolute inset-0 opacity-35">
        {PHRASES.map((phrase, index) => (
          <span key={phrase} className="absolute font-mono text-[9px] uppercase tracking-[0.18em] text-white/[0.10]" style={{ left: `${8 + (index * 13) % 82}%`, top: `${18 + (index * 19) % 70}%`, transform: `rotate(${index % 2 ? -4 : 5}deg)` }}>{phrase}</span>
        ))}
      </div>
      <div
        className="absolute inset-0 opacity-25"
        style={{ backgroundImage: "linear-gradient(rgba(132,204,22,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(34,211,238,0.03) 1px,transparent 1px)", backgroundSize: "62px 62px", maskImage: "radial-gradient(circle at center,black,transparent 84%)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.50)_100%)]" />
      <style jsx>{`
        @keyframes signal-slide {
          0%,100% { transform:translateX(-2.5%); opacity:.48; }
          50% { transform:translateX(2.5%); opacity:1; }
        }
        @media (prefers-reduced-motion: reduce) { g { animation:none !important; } }
      `}</style>
    </div>
  );
}
