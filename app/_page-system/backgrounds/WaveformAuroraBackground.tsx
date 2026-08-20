"use client";

const WAVES = [
  { y: 190, amp: 58, rgb: "244, 114, 182", delay: -4, duration: 18 },
  { y: 320, amp: 42, rgb: "167, 139, 250", delay: -11, duration: 24 },
  { y: 470, amp: 76, rgb: "251, 146, 60", delay: -7, duration: 22 },
  { y: 625, amp: 36, rgb: "34, 211, 238", delay: -16, duration: 28 },
];

export default function WaveformAuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(244,114,182,0.22),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(167,139,250,0.18),transparent_31%),radial-gradient(circle_at_52%_88%,rgba(251,146,60,0.08),transparent_34%),linear-gradient(180deg,#09030a_0%,#070512_48%,#020206_100%)]" />
      <div className="absolute -left-[14%] top-[6%] h-[46vw] w-[46vw] rounded-full bg-rose-500/[0.075] blur-[115px]" />
      <div className="absolute -right-[14%] top-[16%] h-[50vw] w-[50vw] rounded-full bg-violet-500/[0.065] blur-[125px]" />

      <svg viewBox="0 0 1400 900" preserveAspectRatio="none" className="absolute inset-0 h-full w-full opacity-80">
        {WAVES.map((wave, index) => (
          <g
            key={wave.y}
            style={{
              animation: `waveform-drift ${wave.duration}s ease-in-out infinite`,
              animationDelay: `${wave.delay}s`,
            }}
          >
            <path
              d={wavePath(wave.y, wave.amp, index)}
              fill="none"
              stroke={`rgba(${wave.rgb},0.17)`}
              strokeWidth="2"
            />
            <path
              d={wavePath(wave.y + 8, wave.amp * 0.72, index + 1)}
              fill="none"
              stroke={`rgba(${wave.rgb},0.055)`}
              strokeWidth="12"
            />
          </g>
        ))}

        {Array.from({ length: 28 }, (_, index) => {
          const x = 50 + index * 52;
          const h = 20 + ((index * 37) % 115);
          return (
            <rect
              key={index}
              x={x}
              y={780 - h}
              width="5"
              height={h}
              rx="2.5"
              fill={`rgba(${index % 3 === 0 ? "244,114,182" : index % 3 === 1 ? "167,139,250" : "34,211,238"},0.07)`}
            />
          );
        })}
      </svg>

      <div
        className="absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(244,114,182,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(167,139,250,0.03) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at center,black,transparent 82%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.50)_100%)]" />

      <style jsx>{`
        @keyframes waveform-drift {
          0%,100% { transform: translateX(-2.5%) scaleY(.94); opacity: .58; }
          50% { transform: translateX(2.5%) scaleY(1.08); opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          g { animation: none !important; }
        }
      `}</style>
    </div>
  );
}

function wavePath(y: number, amp: number, seed: number) {
  return `M-120 ${y} C90 ${y - amp} 210 ${y + amp} 400 ${y} S720 ${y - amp * (0.72 + seed * 0.03)} 900 ${y} S1190 ${y + amp * 0.8} 1510 ${y}`;
}
