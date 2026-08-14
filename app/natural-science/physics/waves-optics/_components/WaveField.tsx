"use client";

import LaserBackground from "../LaserBackground";

export type WaveFieldMode = "overview" | "wave" | "superposition" | "refraction" | "diffraction" | "lenses" | "resonance";

type Props = {
  mode?: WaveFieldMode;
  intensity?: number;
};

const THEMES: Record<WaveFieldMode, { primary: string; secondary: string; accent: string }> = {
  overview: { primary: "74, 222, 128", secondary: "34, 211, 238", accent: "250, 204, 21" },
  wave: { primary: "34, 211, 238", secondary: "96, 165, 250", accent: "74, 222, 128" },
  superposition: { primary: "34, 211, 238", secondary: "232, 121, 249", accent: "167, 139, 250" },
  refraction: { primary: "250, 204, 21", secondary: "74, 222, 128", accent: "34, 211, 238" },
  diffraction: { primary: "34, 211, 238", secondary: "167, 139, 250", accent: "232, 121, 249" },
  lenses: { primary: "250, 204, 21", secondary: "34, 211, 238", accent: "248, 113, 113" },
  resonance: { primary: "232, 121, 249", secondary: "34, 211, 238", accent: "250, 204, 21" },
};

export default function WaveField({ mode = "overview", intensity = 1 }: Props) {
  const theme = THEMES[mode];
  const alpha = Math.max(0.6, Math.min(1.45, intensity));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 15% 18%, rgba(${theme.primary},${0.18 * alpha}), transparent 30%), radial-gradient(circle at 80% 24%, rgba(${theme.secondary},${0.20 * alpha}), transparent 32%), radial-gradient(circle at 54% 88%, rgba(${theme.accent},${0.08 * alpha}), transparent 28%), linear-gradient(180deg,#020617 0%,#020613 46%,#01040b 100%)`,
        }}
      />

      <LaserBackground />

      {(mode === "overview" || mode === "wave") ? <TravelingWave primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "superposition" ? <InterferenceField primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "refraction" ? <RefractionField primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "diffraction" ? <DiffractionField primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "lenses" ? <LensField primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "resonance" ? <StandingField primary={theme.primary} secondary={theme.secondary} /> : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,0.34)_100%)]" />
    </div>
  );
}

function TravelingWave({ primary, secondary }: { primary: string; secondary: string }) {
  return <>{[0, 1, 2].map((index) => <div key={index} className="absolute left-[4%] w-[92%] rounded-[50%] border animate-pulse" style={{ top: `${24 + index * 18}%`, height: `${12 + index * 2}%`, transform: `rotate(${index % 2 ? 3 : -3}deg)`, borderColor: `rgba(${index % 2 ? secondary : primary},${0.18 - index * 0.03})`, animationDuration: `${3.2 + index * 0.8}s` }} />)}</>;
}

function InterferenceField({ primary, secondary }: { primary: string; secondary: string }) {
  return <div className="absolute inset-0 opacity-62" style={{ backgroundImage: `repeating-radial-gradient(circle at 34% 50%, transparent 0 28px, rgba(${primary},0.12) 29px 30px, transparent 31px 58px), repeating-radial-gradient(circle at 66% 50%, transparent 0 28px, rgba(${secondary},0.12) 29px 30px, transparent 31px 58px)`, mixBlendMode: "screen" }} />;
}

function RefractionField({ primary, secondary }: { primary: string; secondary: string }) {
  return <><div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.13]" /><div className="absolute left-[18%] top-[23%] h-px w-[34%] origin-left rotate-[24deg]" style={{ background: `rgba(${primary},0.58)`, boxShadow: `0 0 20px rgba(${primary},0.22)` }} /><div className="absolute left-[50%] top-1/2 h-px w-[34%] origin-left rotate-[38deg]" style={{ background: `rgba(${secondary},0.62)`, boxShadow: `0 0 20px rgba(${secondary},0.22)` }} /><div className="absolute inset-x-0 bottom-0 h-1/2 bg-cyan-400/[0.02]" /></>;
}

function DiffractionField({ primary, secondary }: { primary: string; secondary: string }) {
  return <><div className="absolute left-1/2 top-[18%] bottom-[18%] w-1 bg-white/[0.09]" /><div className="absolute left-1/2 top-[46%] h-[8%] w-1 bg-transparent" />{[0, 1, 2, 3, 4].map((index) => <div key={index} className="absolute left-[51%] top-1/2 -translate-y-1/2 rounded-r-full border-r border-y" style={{ width: `${160 + index * 110}px`, height: `${90 + index * 70}px`, borderColor: `rgba(${index % 2 ? secondary : primary},${0.24 - index * 0.03})` }} />)}</>;
}

function LensField({ primary, secondary }: { primary: string; secondary: string }) {
  return <><div className="absolute left-1/2 top-[16%] h-[68%] w-16 -translate-x-1/2 rounded-[50%] border border-cyan-100/[0.16] bg-white/[0.02]" />{[-18, 0, 18].map((offset) => <div key={offset} className="absolute left-[14%] top-1/2 h-px w-[36%] origin-right" style={{ transform: `translateY(${offset}px) rotate(${offset / 8}deg)`, background: `rgba(${primary},0.50)` }} />)}{[-18, 0, 18].map((offset) => <div key={`out-${offset}`} className="absolute left-1/2 top-1/2 h-px w-[35%] origin-left" style={{ transform: `translateY(${offset}px) rotate(${-offset / 16}deg)`, background: `rgba(${secondary},0.54)` }} />)}</>;
}

function StandingField({ primary, secondary }: { primary: string; secondary: string }) {
  return <>{[0, 1].map((row) => <div key={row} className="absolute left-[8%] right-[8%] rounded-[50%] border animate-pulse" style={{ top: `${34 + row * 22}%`, height: "18%", borderColor: `rgba(${row ? secondary : primary},0.18)`, animationDuration: `${2.8 + row * 0.8}s` }} />)}{[20, 40, 60, 80].map((left) => <div key={left} className="absolute top-[28%] bottom-[28%] w-px bg-white/[0.08]" style={{ left: `${left}%` }} />)}</>;
}
