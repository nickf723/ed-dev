"use client";

import TeslaBackground from "../TeslaBackground";

export type EMFieldMode = "overview" | "electric" | "potential" | "circuits" | "magnetic" | "induction" | "waves";

type Props = {
  mode?: EMFieldMode;
  intensity?: number;
};

const THEMES: Record<EMFieldMode, { primary: string; secondary: string; accent: string }> = {
  overview: { primary: "34, 211, 238", secondary: "99, 102, 241", accent: "250, 204, 21" },
  electric: { primary: "250, 204, 21", secondary: "34, 211, 238", accent: "248, 113, 113" },
  potential: { primary: "167, 139, 250", secondary: "34, 211, 238", accent: "250, 204, 21" },
  circuits: { primary: "34, 211, 238", secondary: "45, 212, 191", accent: "250, 204, 21" },
  magnetic: { primary: "248, 113, 113", secondary: "96, 165, 250", accent: "167, 139, 250" },
  induction: { primary: "167, 139, 250", secondary: "34, 211, 238", accent: "248, 113, 113" },
  waves: { primary: "34, 211, 238", secondary: "232, 121, 249", accent: "96, 165, 250" },
};

export default function EMField({ mode = "overview", intensity = 1 }: Props) {
  const theme = THEMES[mode];
  const alpha = Math.max(0.6, Math.min(1.5, intensity));

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 18%, rgba(${theme.secondary},${0.18 * alpha}), transparent 30%), radial-gradient(circle at 82% 26%, rgba(${theme.primary},${0.23 * alpha}), transparent 32%), radial-gradient(circle at 56% 88%, rgba(${theme.accent},${0.09 * alpha}), transparent 28%), linear-gradient(180deg,#04070d 0%,#04050a 48%,#020307 100%)`,
        }}
      />

      <div className="absolute -left-[16%] top-[4%] h-[62vw] w-[62vw] max-h-[780px] max-w-[780px] animate-[spin_34s_linear_infinite] rounded-[46%] blur-[100px]" style={{ background: `conic-gradient(from 20deg, transparent, rgba(${theme.secondary},${0.11 * alpha}), transparent 42%, rgba(${theme.primary},${0.08 * alpha}), transparent)` }} />
      <div className="absolute -right-[14%] top-[8%] h-[58vw] w-[58vw] max-h-[740px] max-w-[740px] animate-[spin_40s_linear_infinite_reverse] rounded-[44%] blur-[110px]" style={{ background: `conic-gradient(from 210deg, transparent, rgba(${theme.primary},${0.13 * alpha}), transparent 45%, rgba(${theme.accent},${0.07 * alpha}), transparent)` }} />

      <TeslaBackground />

      {(mode === "overview" || mode === "electric") ? <ElectricGeometry primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "potential" ? <PotentialGeometry primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "circuits" ? <CircuitGeometry primary={theme.primary} accent={theme.accent} /> : null}
      {mode === "magnetic" ? <MagneticGeometry primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "induction" ? <InductionGeometry primary={theme.primary} secondary={theme.secondary} /> : null}
      {mode === "waves" ? <WaveGeometry primary={theme.primary} secondary={theme.secondary} /> : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_54%,rgba(0,0,0,0.34)_100%)]" />
    </div>
  );
}

function ElectricGeometry({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <>
      <div className="absolute left-[16%] top-[28%] h-5 w-5 rounded-full" style={{ background: `rgb(${primary})`, boxShadow: `0 0 42px rgba(${primary},0.68)` }} />
      <div className="absolute right-[17%] top-[38%] h-5 w-5 rounded-full" style={{ background: `rgb(${secondary})`, boxShadow: `0 0 42px rgba(${secondary},0.65)` }} />
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className="absolute left-[18%] h-px origin-left" style={{ top: `${31 + index * 8}%`, width: `${58 - Math.abs(2 - index) * 5}%`, transform: `rotate(${(index - 2) * 4}deg)`, background: `linear-gradient(90deg, rgba(${primary},0.46), rgba(${secondary},0.20), transparent)` }} />
      ))}
    </>
  );
}

function PotentialGeometry({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="absolute right-[5%] top-[9%] h-[64vw] max-h-[780px] w-[64vw] max-w-[780px] rounded-full opacity-70" style={{ background: `repeating-radial-gradient(circle at center, transparent 0 42px, rgba(${primary},0.10) 43px 44px, transparent 45px 82px), radial-gradient(circle, rgba(${secondary},0.06), transparent 64%)` }} />
  );
}

function CircuitGeometry({ primary, accent }: { primary: string; accent: string }) {
  return (
    <>
      <div className="absolute left-[12%] right-[12%] top-[26%] bottom-[20%] rounded-[38px] border" style={{ borderColor: `rgba(${primary},0.16)`, boxShadow: `inset 0 0 45px rgba(${primary},0.025),0 0 60px rgba(${accent},0.035)` }} />
      {[18, 34, 50, 66, 82].map((left, index) => <span key={left} className="absolute top-[26%] h-2.5 w-2.5 animate-pulse rounded-full" style={{ left: `${left}%`, background: `rgb(${index % 2 ? accent : primary})`, boxShadow: `0 0 18px rgba(${index % 2 ? accent : primary},0.55)`, animationDelay: `${index * 0.25}s` }} />)}
    </>
  );
}

function MagneticGeometry({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <div className="absolute right-[7%] top-[10%] h-[60vw] max-h-[760px] w-[60vw] max-w-[760px] animate-[spin_34s_linear_infinite] rounded-full opacity-72" style={{ background: `repeating-radial-gradient(ellipse at center, transparent 0 36px, rgba(${primary},0.11) 37px 38px, transparent 39px 75px)`, boxShadow: `inset 0 0 0 110px rgba(${secondary},0.012)` }} />
  );
}

function InductionGeometry({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <>
      {[0, 1, 2, 3].map((index) => <div key={index} className="absolute left-1/2 top-1/2 rounded-full border animate-pulse" style={{ width: `${220 + index * 105}px`, height: `${220 + index * 105}px`, transform: "translate(-50%,-50%)", borderColor: `rgba(${index % 2 ? secondary : primary},${0.22 - index * 0.03})`, animationDuration: `${2.2 + index * 0.6}s` }} />)}
    </>
  );
}

function WaveGeometry({ primary, secondary }: { primary: string; secondary: string }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => (
        <div key={index} className="absolute left-[4%] rounded-[50%] border" style={{ top: `${18 + index * 13}%`, width: "92%", height: `${12 + (index % 2) * 5}%`, transform: `rotate(${index % 2 ? 4 : -4}deg)`, borderColor: `rgba(${index % 2 ? secondary : primary},${0.18 - index * 0.018})` }} />
      ))}
    </>
  );
}
