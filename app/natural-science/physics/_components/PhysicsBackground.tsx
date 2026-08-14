"use client";

import type { CSSProperties } from "react";

export type PhysicsBackgroundMode =
  | "overview"
  | "motion"
  | "classical"
  | "thermo"
  | "electromagnetism"
  | "waves"
  | "relativity"
  | "quantum"
  | "nuclear"
  | "atomic";

type Props = {
  mode: PhysicsBackgroundMode;
};

type Theme = {
  rgb: string;
  secondary: string;
};

const THEMES: Record<PhysicsBackgroundMode, Theme> = {
  overview: { rgb: "56, 189, 248", secondary: "129, 140, 248" },
  motion: { rgb: "251, 146, 60", secondary: "34, 211, 238" },
  classical: { rgb: "251, 146, 60", secondary: "250, 204, 21" },
  thermo: { rgb: "248, 113, 113", secondary: "251, 146, 60" },
  electromagnetism: { rgb: "34, 211, 238", secondary: "96, 165, 250" },
  waves: { rgb: "96, 165, 250", secondary: "192, 132, 252" },
  relativity: { rgb: "167, 139, 250", secondary: "96, 165, 250" },
  quantum: { rgb: "232, 121, 249", secondary: "34, 211, 238" },
  nuclear: { rgb: "244, 114, 182", secondary: "251, 191, 36" },
  atomic: { rgb: "52, 211, 153", secondary: "34, 211, 238" },
};

export default function PhysicsBackground({ mode }: Props) {
  const theme = THEMES[mode];

  const baseStyle: CSSProperties = {
    background: `
      radial-gradient(circle at 78% 12%, rgba(${theme.rgb},0.16), transparent 28%),
      radial-gradient(circle at 16% 76%, rgba(${theme.secondary},0.08), transparent 31%),
      linear-gradient(180deg, #07101b 0%, #040910 48%, #020509 100%)
    `,
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-500" aria-hidden="true">
      <div className="absolute inset-0 transition-[background] duration-500" style={baseStyle} />
      <div
        className="absolute inset-0 opacity-35 transition-[background-image] duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(${theme.rgb},0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.rgb},0.045) 1px, transparent 1px)`,
          backgroundSize: mode === "motion" || mode === "classical" ? "48px 48px" : "64px 64px",
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.82) 56%, transparent 100%)",
        }}
      />

      {(mode === "motion" || mode === "classical") && <MotionField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "thermo" && <ThermalField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "electromagnetism" && <ElectromagneticField rgb={theme.rgb} />}
      {mode === "waves" && <WaveField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "relativity" && <RelativityField rgb={theme.rgb} />}
      {mode === "quantum" && <QuantumField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "nuclear" && <NuclearField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "atomic" && <AtomicField rgb={theme.rgb} secondary={theme.secondary} />}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.72)_100%)]" />
    </div>
  );
}

function MotionField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <div className="absolute left-[7%] top-[23%] h-px w-[48%] -rotate-6" style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.62), transparent)` }} />
      <div className="absolute left-[17%] top-[39%] h-px w-[58%] rotate-3" style={{ background: `linear-gradient(90deg, transparent, rgba(${secondary},0.34), transparent)` }} />
      <div className="absolute right-[18%] top-[19%] h-3 w-3 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 30px rgba(${rgb},0.7), -110px 20px 36px rgba(${rgb},0.18), -220px 38px 48px rgba(${rgb},0.10)` }} />
    </>
  );
}

function ThermalField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <div className="absolute -right-[6%] top-[8%] h-[52vw] w-[52vw] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, rgba(${rgb},0.13), rgba(${secondary},0.04) 42%, transparent 68%)` }} />
      <div className="absolute bottom-[10%] left-[5%] h-24 w-[70%] blur-2xl" style={{ background: `linear-gradient(90deg, transparent, rgba(${secondary},0.12), transparent)` }} />
    </>
  );
}

function ElectromagneticField({ rgb }: { rgb: string }) {
  return (
    <div className="absolute right-[4%] top-[8%] h-[58vw] max-h-[760px] w-[58vw] max-w-[760px] rounded-full border opacity-45" style={{ borderColor: `rgba(${rgb},0.22)`, boxShadow: `inset 0 0 0 46px rgba(${rgb},0.018), inset 0 0 0 94px rgba(${rgb},0.014), inset 0 0 0 142px rgba(${rgb},0.011), 0 0 90px rgba(${rgb},0.08)` }} />
  );
}

function WaveField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          className="absolute left-[10%] rounded-[50%] border"
          style={{
            top: `${22 + index * 10}%`,
            width: `${72 - index * 6}%`,
            height: `${11 + index * 2}%`,
            borderColor: `rgba(${index % 2 === 0 ? rgb : secondary},${0.18 - index * 0.025})`,
            transform: `rotate(${index % 2 === 0 ? -4 : 4}deg)`,
          }}
        />
      ))}
    </>
  );
}

function RelativityField({ rgb }: { rgb: string }) {
  return (
    <div className="absolute right-[6%] top-[10%] h-[64vw] max-h-[820px] w-[64vw] max-w-[820px] rounded-full opacity-55" style={{ background: `repeating-radial-gradient(circle at center, transparent 0 42px, rgba(${rgb},0.11) 43px 44px, transparent 45px 84px)`, transform: "scaleX(1.28) rotate(-12deg)" }} />
  );
}

function QuantumField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <div className="absolute inset-0 opacity-50" style={{ backgroundImage: `radial-gradient(circle, rgba(${rgb},0.34) 0 1px, transparent 1.5px), radial-gradient(circle, rgba(${secondary},0.22) 0 1px, transparent 1.5px)`, backgroundSize: "47px 47px, 73px 73px", backgroundPosition: "8px 14px, 21px 33px" }} />
      <div className="absolute right-[18%] top-[24%] h-48 w-48 rounded-full blur-3xl" style={{ background: `rgba(${rgb},0.12)` }} />
    </>
  );
}

function NuclearField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <div className="absolute right-[10%] top-[15%] h-[34vw] max-h-[430px] w-[34vw] max-w-[430px] rounded-full" style={{ background: `radial-gradient(circle, rgba(${secondary},0.28) 0 2%, rgba(${rgb},0.16) 3% 13%, transparent 14% 24%, rgba(${rgb},0.08) 25% 26%, transparent 27% 100%)`, boxShadow: `0 0 90px rgba(${rgb},0.10)` }} />
  );
}

function AtomicField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <div className="absolute right-[8%] top-[12%] h-[46vw] max-h-[600px] w-[46vw] max-w-[600px]">
      <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 45px rgba(${rgb},0.6)` }} />
      {[0, 60, 120].map((rotation) => (
        <div key={rotation} className="absolute inset-[16%] rounded-[50%] border" style={{ borderColor: `rgba(${secondary},0.18)`, transform: `rotate(${rotation}deg) scaleY(0.38)` }} />
      ))}
    </div>
  );
}
