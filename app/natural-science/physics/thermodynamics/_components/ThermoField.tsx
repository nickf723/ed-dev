"use client";

export type ThermoFieldMode = "overview" | "equilibrium" | "transfer" | "first-law" | "phase" | "entropy" | "process";

type Props = { mode?: ThermoFieldMode; intensity?: number };

const MODES: Record<ThermoFieldMode, { hot: string; cool: string; accent: string }> = {
  overview: { hot: "248, 113, 113", cool: "56, 189, 248", accent: "251, 146, 60" },
  equilibrium: { hot: "251, 146, 60", cool: "56, 189, 248", accent: "250, 204, 21" },
  transfer: { hot: "248, 113, 113", cool: "34, 211, 238", accent: "251, 146, 60" },
  "first-law": { hot: "251, 146, 60", cool: "167, 139, 250", accent: "45, 212, 191" },
  phase: { hot: "244, 114, 182", cool: "34, 211, 238", accent: "167, 139, 250" },
  entropy: { hot: "248, 113, 113", cool: "232, 121, 249", accent: "250, 204, 21" },
  process: { hot: "251, 146, 60", cool: "96, 165, 250", accent: "45, 212, 191" },
};

const PARTICLES = Array.from({ length: 36 }, (_, i) => ({
  left: (i * 29) % 97,
  top: (i * 43) % 93,
  size: 2 + (i % 4),
  duration: 7 + (i % 7) * 1.3,
  delay: -(i % 9) * 0.8,
}));

export default function ThermoField({ mode = "overview", intensity = 1 }: Props) {
  const theme = MODES[mode];
  const alpha = Math.max(0.45, Math.min(1.35, intensity));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at 18% 24%, rgba(${theme.cool},${0.18 * alpha}), transparent 32%), radial-gradient(circle at 82% 26%, rgba(${theme.hot},${0.23 * alpha}), transparent 34%), radial-gradient(circle at 52% 86%, rgba(${theme.accent},${0.08 * alpha}), transparent 30%), linear-gradient(180deg, #08080d 0%, #07080d 48%, #030507 100%)`,
        }}
      />

      <div className="absolute -left-[15%] top-[12%] h-[58vw] w-[58vw] max-h-[760px] max-w-[760px] animate-[spin_32s_linear_infinite] rounded-[45%] blur-3xl" style={{ background: `conic-gradient(from 30deg, transparent, rgba(${theme.cool},${0.08 * alpha}), transparent 45%, rgba(${theme.hot},${0.06 * alpha}), transparent)` }} />
      <div className="absolute -right-[18%] top-[8%] h-[62vw] w-[62vw] max-h-[840px] max-w-[840px] animate-[spin_40s_linear_infinite_reverse] rounded-[44%] blur-3xl" style={{ background: `conic-gradient(from 210deg, transparent, rgba(${theme.hot},${0.11 * alpha}), transparent 42%, rgba(${theme.accent},${0.06 * alpha}), transparent)` }} />

      <div className="absolute inset-0 opacity-55">
        {PARTICLES.map((particle, index) => (
          <span
            key={index}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: particle.size,
              height: particle.size,
              background: index % 2 === 0 ? `rgba(${theme.hot},${0.34 * alpha})` : `rgba(${theme.cool},${0.32 * alpha})`,
              boxShadow: `0 0 ${8 + particle.size * 2}px ${index % 2 === 0 ? `rgba(${theme.hot},0.18)` : `rgba(${theme.cool},0.16)`}`,
              animationDuration: `${particle.duration}s`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {(mode === "equilibrium" || mode === "overview") ? (
        <div className="absolute inset-x-[10%] top-[48%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      ) : null}

      {mode === "transfer" ? (
        <>
          {[0, 1, 2, 3].map((i) => <div key={i} className="absolute left-[18%] h-px w-[62%] -rotate-6" style={{ top: `${28 + i * 12}%`, background: `linear-gradient(90deg, rgba(${theme.hot},0.02), rgba(${theme.hot},0.44), rgba(${theme.cool},0.16), transparent)` }} />)}
        </>
      ) : null}

      {mode === "entropy" ? (
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `radial-gradient(circle, rgba(${theme.accent},0.22) 0 1px, transparent 1.4px)`, backgroundSize: "29px 29px", maskImage: "linear-gradient(90deg, rgba(0,0,0,0.15), black)" }} />
      ) : null}

      {mode === "process" ? (
        <div className="absolute right-[8%] top-[18%] h-[48vw] max-h-[580px] w-[48vw] max-w-[580px] rounded-[50%] border border-emerald-200/[0.10]" style={{ boxShadow: "inset 0 0 0 60px rgba(45,212,191,0.015), inset 0 0 0 120px rgba(96,165,250,0.012)" }} />
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_42%,rgba(0,0,0,0.48)_100%)]" />
    </div>
  );
}
