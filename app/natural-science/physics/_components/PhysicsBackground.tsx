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
      radial-gradient(circle at 76% 11%, rgba(${theme.rgb},0.30), transparent 31%),
      radial-gradient(circle at 15% 76%, rgba(${theme.secondary},0.18), transparent 35%),
      radial-gradient(circle at 49% 48%, rgba(${theme.rgb},0.075), transparent 38%),
      linear-gradient(180deg, #071321 0%, #040a12 50%, #020509 100%)
    `,
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 transition-[background] duration-500" style={baseStyle} />
      <div
        className="absolute inset-0 opacity-70 transition-[background-image] duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(${theme.rgb},0.075) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.rgb},0.075) 1px, transparent 1px)`,
          backgroundSize: mode === "motion" || mode === "classical" ? "46px 46px" : "62px 62px",
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.92) 70%, transparent 100%)",
        }}
      />

      {mode === "overview" && <OverviewField rgb={theme.rgb} secondary={theme.secondary} />}
      {(mode === "motion" || mode === "classical") && <MotionField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "thermo" && <ThermalField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "electromagnetism" && <ElectromagneticField rgb={theme.rgb} />}
      {mode === "waves" && <WaveField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "relativity" && <RelativityField rgb={theme.rgb} />}
      {mode === "quantum" && <QuantumField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "nuclear" && <NuclearField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "atomic" && <AtomicField rgb={theme.rgb} secondary={theme.secondary} />}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(0,0,0,0.44)_100%)]" />
    </div>
  );
}

function OverviewField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <div className="absolute left-1/2 top-[47%] h-[58vw] max-h-[780px] w-[58vw] max-w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full border opacity-70" style={{ borderColor: `rgba(${rgb},0.14)`, boxShadow: `inset 0 0 0 70px rgba(${rgb},0.018), inset 0 0 0 140px rgba(${secondary},0.014), 0 0 120px rgba(${rgb},0.09)` }} />
      <div className="absolute left-[8%] top-[16%] h-[42vw] max-h-[540px] w-[42vw] max-w-[540px] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, rgba(${rgb},0.10), transparent 66%)` }} />
      <div className="absolute right-[3%] top-[14%] h-[44vw] max-h-[560px] w-[44vw] max-w-[560px] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, rgba(${secondary},0.11), transparent 68%)` }} />
    </>
  );
}

function MotionField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <div className="absolute left-[2%] top-[21%] h-[2px] w-[61%] -rotate-6" style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.85), rgba(${secondary},0.34), transparent)`, boxShadow: `0 0 24px rgba(${rgb},0.20)` }} />
      <div className="absolute left-[12%] top-[40%] h-px w-[67%] rotate-3" style={{ background: `linear-gradient(90deg, transparent, rgba(${secondary},0.55), transparent)` }} />
      <div className="absolute right-[13%] top-[17%] h-4 w-4 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 42px rgba(${rgb},0.88), -120px 24px 42px rgba(${rgb},0.28), -245px 45px 55px rgba(${rgb},0.16)` }} />
      <div className="absolute bottom-[8%] left-[8%] right-[8%] h-32 opacity-50" style={{ background: `repeating-linear-gradient(90deg, transparent 0 62px, rgba(${rgb},0.12) 63px 64px)` }} />
    </>
  );
}

function ThermalField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <div className="absolute -right-[8%] top-[2%] h-[64vw] w-[64vw] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, rgba(${rgb},0.25), rgba(${secondary},0.09) 42%, transparent 69%)` }} />
      <div className="absolute bottom-[3%] left-[2%] h-40 w-[78%] blur-2xl" style={{ background: `linear-gradient(90deg, transparent, rgba(${secondary},0.21), transparent)` }} />
      {[0, 1, 2].map((index) => <div key={index} className="absolute h-44 w-28 rounded-full border opacity-30" style={{ left: `${18 + index * 18}%`, top: `${31 + index * 4}%`, borderColor: `rgba(${rgb},0.22)`, transform: `rotate(${index % 2 === 0 ? -16 : 14}deg)` }} />)}
    </>
  );
}

function ElectromagneticField({ rgb }: { rgb: string }) {
  return (
    <>
      <div className="absolute right-[0%] top-[2%] h-[65vw] max-h-[850px] w-[65vw] max-w-[850px] rounded-full border opacity-80" style={{ borderColor: `rgba(${rgb},0.32)`, boxShadow: `inset 0 0 0 56px rgba(${rgb},0.030), inset 0 0 0 112px rgba(${rgb},0.024), inset 0 0 0 168px rgba(${rgb},0.019), 0 0 120px rgba(${rgb},0.14)` }} />
      <div className="absolute left-[10%] top-[28%] h-px w-[65%] rotate-12" style={{ background: `linear-gradient(90deg, transparent, rgba(${rgb},0.56), transparent)` }} />
    </>
  );
}

function WaveField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => (
        <div
          key={index}
          className="absolute left-[3%] rounded-[50%] border"
          style={{
            top: `${16 + index * 10}%`,
            width: `${88 - index * 5}%`,
            height: `${13 + index * 2}%`,
            borderColor: `rgba(${index % 2 === 0 ? rgb : secondary},${0.31 - index * 0.035})`,
            boxShadow: index === 0 ? `0 0 28px rgba(${rgb},0.11)` : undefined,
            transform: `rotate(${index % 2 === 0 ? -4 : 4}deg)`,
          }}
        />
      ))}
    </>
  );
}

function RelativityField({ rgb }: { rgb: string }) {
  return (
    <>
      <div className="absolute right-[0%] top-[2%] h-[72vw] max-h-[920px] w-[72vw] max-w-[920px] rounded-full opacity-80" style={{ background: `repeating-radial-gradient(circle at center, transparent 0 42px, rgba(${rgb},0.19) 43px 45px, transparent 46px 84px)`, transform: "scaleX(1.35) rotate(-13deg)" }} />
      <div className="absolute right-[28%] top-[35%] h-28 w-28 rounded-full blur-2xl" style={{ background: `rgba(${rgb},0.22)` }} />
    </>
  );
}

function QuantumField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <div className="absolute inset-0 opacity-75" style={{ backgroundImage: `radial-gradient(circle, rgba(${rgb},0.48) 0 1.3px, transparent 1.8px), radial-gradient(circle, rgba(${secondary},0.34) 0 1.1px, transparent 1.6px)`, backgroundSize: "43px 43px, 67px 67px", backgroundPosition: "8px 14px, 21px 33px" }} />
      <div className="absolute right-[12%] top-[16%] h-64 w-64 rounded-full blur-3xl" style={{ background: `rgba(${rgb},0.22)` }} />
      <div className="absolute left-[15%] bottom-[14%] h-44 w-44 rounded-full blur-3xl" style={{ background: `rgba(${secondary},0.13)` }} />
    </>
  );
}

function NuclearField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <div className="absolute right-[5%] top-[8%] h-[44vw] max-h-[560px] w-[44vw] max-w-[560px] rounded-full" style={{ background: `radial-gradient(circle, rgba(${secondary},0.52) 0 2%, rgba(${rgb},0.30) 3% 13%, transparent 14% 24%, rgba(${rgb},0.16) 25% 27%, transparent 28% 100%)`, boxShadow: `0 0 125px rgba(${rgb},0.18)` }} />
  );
}

function AtomicField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <div className="absolute right-[2%] top-[5%] h-[58vw] max-h-[740px] w-[58vw] max-w-[740px]">
      <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 65px rgba(${rgb},0.82)` }} />
      {[0, 60, 120].map((rotation) => (
        <div key={rotation} className="absolute inset-[13%] rounded-[50%] border" style={{ borderColor: `rgba(${secondary},0.34)`, boxShadow: `0 0 25px rgba(${secondary},0.06)`, transform: `rotate(${rotation}deg) scaleY(0.38)` }} />
      ))}
    </div>
  );
}
