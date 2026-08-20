"use client";

const STARS = Array.from({ length: 96 }, (_, index) => ({
  x: (index * 37.71) % 100,
  y: (index * 61.37) % 100,
  r: 0.6 + (index % 5) * 0.42,
  a: 0.18 + (index % 7) * 0.07,
  duration: 9 + (index % 8) * 3,
  delay: -(index % 11) * 1.7,
}));

export default function DeepFieldBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(99,102,241,0.23),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(168,85,247,0.19),transparent_31%),radial-gradient(circle_at_54%_80%,rgba(34,211,238,0.09),transparent_33%),linear-gradient(180deg,#02030a_0%,#050318_48%,#010205_100%)]" />
      <div className="absolute -left-[14%] top-[10%] h-[42vw] w-[42vw] rounded-full bg-indigo-500/[0.08] blur-[110px]" />
      <div className="absolute -right-[12%] top-[18%] h-[46vw] w-[46vw] rounded-full bg-fuchsia-500/[0.065] blur-[120px]" />

      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <g opacity="0.88">
          {STARS.map((star, index) => (
            <circle
              key={index}
              cx={`${star.x}%`}
              cy={`${star.y}%`}
              r={star.r}
              fill={`rgba(${index % 9 === 0 ? "186,230,253" : index % 7 === 0 ? "221,214,254" : "255,255,255"},${star.a})`}
              style={{ animation: `deep-field-twinkle ${star.duration}s ease-in-out infinite`, animationDelay: `${star.delay}s` }}
            />
          ))}
        </g>
        <ellipse cx="250" cy="650" rx="180" ry="48" transform="rotate(-18 250 650)" fill="none" stroke="rgba(34,211,238,0.10)" strokeWidth="1.4" />
        <ellipse cx="1110" cy="195" rx="126" ry="38" transform="rotate(26 1110 195)" fill="none" stroke="rgba(192,132,252,0.13)" strokeWidth="1.6" />
        <ellipse cx="1110" cy="195" rx="82" ry="25" transform="rotate(26 1110 195)" fill="rgba(192,132,252,0.025)" stroke="rgba(192,132,252,0.07)" />
        <path d="M-100 770 C190 640 390 820 620 690 S1060 560 1490 735" fill="none" stroke="rgba(129,140,248,0.07)" strokeWidth="2" strokeDasharray="3 13" />
      </svg>

      <div
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle,rgba(129,140,248,0.16) 0 1px,transparent 1.5px)",
          backgroundSize: "76px 76px",
          maskImage: "linear-gradient(180deg,black,transparent 76%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_48%,rgba(0,0,0,0.52)_100%)]" />
      <style jsx>{`
        @keyframes deep-field-twinkle {
          0%, 100% { opacity: .45; transform: scale(.85); }
          50% { opacity: 1; transform: scale(1.28); }
        }
        @media (prefers-reduced-motion: reduce) {
          circle { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
