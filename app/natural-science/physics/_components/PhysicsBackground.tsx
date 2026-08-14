"use client";

import type { CSSProperties } from "react";
import { motion } from "framer-motion";

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
  tertiary: string;
};

const THEMES: Record<PhysicsBackgroundMode, Theme> = {
  overview: { rgb: "56, 189, 248", secondary: "129, 140, 248", tertiary: "45, 212, 191" },
  motion: { rgb: "251, 146, 60", secondary: "34, 211, 238", tertiary: "250, 204, 21" },
  classical: { rgb: "251, 146, 60", secondary: "250, 204, 21", tertiary: "45, 212, 191" },
  thermo: { rgb: "248, 113, 113", secondary: "251, 146, 60", tertiary: "250, 204, 21" },
  electromagnetism: { rgb: "34, 211, 238", secondary: "96, 165, 250", tertiary: "167, 139, 250" },
  waves: { rgb: "96, 165, 250", secondary: "192, 132, 252", tertiary: "34, 211, 238" },
  relativity: { rgb: "167, 139, 250", secondary: "96, 165, 250", tertiary: "232, 121, 249" },
  quantum: { rgb: "232, 121, 249", secondary: "34, 211, 248", tertiary: "167, 139, 250" },
  nuclear: { rgb: "244, 114, 182", secondary: "251, 191, 36", tertiary: "248, 113, 113" },
  atomic: { rgb: "52, 211, 153", secondary: "34, 211, 238", tertiary: "96, 165, 250" },
};

export default function PhysicsBackground({ mode }: Props) {
  const theme = THEMES[mode];

  const baseStyle: CSSProperties = {
    background: `
      radial-gradient(circle at 76% 12%, rgba(${theme.rgb},0.30), transparent 30%),
      radial-gradient(circle at 15% 78%, rgba(${theme.secondary},0.18), transparent 34%),
      radial-gradient(circle at 48% 46%, rgba(${theme.tertiary},0.08), transparent 36%),
      linear-gradient(180deg, #071321 0%, #040a13 50%, #02060b 100%)
    `,
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: [0.9, 1, 0.94] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={baseStyle}
      />

      <motion.div
        className="absolute -right-[12%] top-[-18%] h-[62vw] w-[62vw] rounded-full blur-[90px]"
        style={{ background: `rgba(${theme.rgb},0.16)` }}
        animate={{ x: [0, -70, 20, 0], y: [0, 55, -20, 0], scale: [1, 1.08, 0.96, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-[16%] bottom-[-30%] h-[58vw] w-[58vw] rounded-full blur-[105px]"
        style={{ background: `rgba(${theme.secondary},0.11)` }}
        animate={{ x: [0, 80, -15, 0], y: [0, -45, 15, 0], scale: [1, 0.95, 1.1, 1] }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-55 transition-[background-image] duration-500"
        style={{
          backgroundImage: `linear-gradient(rgba(${theme.rgb},0.065) 1px, transparent 1px), linear-gradient(90deg, rgba(${theme.rgb},0.065) 1px, transparent 1px)`,
          backgroundSize: mode === "motion" || mode === "classical" ? "46px 46px" : "62px 62px",
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.92) 70%, transparent 100%)",
        }}
      />

      {mode === "overview" && <OverviewField rgb={theme.rgb} secondary={theme.secondary} tertiary={theme.tertiary} />}
      {(mode === "motion" || mode === "classical") && <MotionField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "thermo" && <ThermalField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "electromagnetism" && <ElectromagneticField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "waves" && <WaveField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "relativity" && <RelativityField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "quantum" && <QuantumField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "nuclear" && <NuclearField rgb={theme.rgb} secondary={theme.secondary} />}
      {mode === "atomic" && <AtomicField rgb={theme.rgb} secondary={theme.secondary} />}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_28%,rgba(0,0,0,0.50)_100%)]" />
    </div>
  );
}

function OverviewField({ rgb, secondary, tertiary }: { rgb: string; secondary: string; tertiary: string }) {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute left-1/2 top-[43%] rounded-full border"
          style={{
            width: `${520 + index * 190}px`,
            height: `${220 + index * 90}px`,
            marginLeft: `${-(260 + index * 95)}px`,
            marginTop: `${-(110 + index * 45)}px`,
            borderColor: `rgba(${index === 0 ? rgb : index === 1 ? secondary : tertiary},${0.16 - index * 0.025})`,
          }}
          animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
          transition={{ duration: 40 + index * 13, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </>
  );
}

function MotionField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute h-px"
          style={{
            left: `${5 + index * 8}%`,
            top: `${23 + index * 15}%`,
            width: `${60 - index * 7}%`,
            background: `linear-gradient(90deg, transparent, rgba(${index === 1 ? secondary : rgb},${0.76 - index * 0.14}), transparent)`,
            rotate: `${-8 + index * 6}deg`,
          }}
          animate={{ x: [-80, 120, -80], opacity: [0.25, 0.95, 0.25] }}
          transition={{ duration: 8 + index * 2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
      <motion.div
        className="absolute right-[18%] top-[18%] h-4 w-4 rounded-full"
        style={{ background: `rgb(${rgb})`, boxShadow: `0 0 42px rgba(${rgb},0.85), -130px 35px 44px rgba(${rgb},0.22), -260px 70px 58px rgba(${rgb},0.13)` }}
        animate={{ x: [0, -180, -40, 0], y: [0, 42, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function ThermalField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            right: `${-4 + index * 16}%`,
            top: `${8 + index * 18}%`,
            width: `${34 - index * 5}vw`,
            height: `${34 - index * 5}vw`,
            background: `radial-gradient(circle, rgba(${index % 2 ? secondary : rgb},${0.22 - index * 0.035}), transparent 68%)`,
          }}
          animate={{ y: [0, -42, 16, 0], x: [0, index % 2 ? -25 : 35, 0] }}
          transition={{ duration: 9 + index * 3, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function ElectromagneticField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <motion.div
      className="absolute right-[3%] top-[5%] h-[62vw] max-h-[800px] w-[62vw] max-w-[800px] rounded-full border"
      style={{
        borderColor: `rgba(${rgb},0.34)`,
        boxShadow: `inset 0 0 0 52px rgba(${secondary},0.035), inset 0 0 0 106px rgba(${rgb},0.026), inset 0 0 0 162px rgba(${secondary},0.020), 0 0 120px rgba(${rgb},0.16)`,
      }}
      animate={{ rotate: 360, scale: [1, 1.04, 1] }}
      transition={{ rotate: { duration: 30, repeat: Infinity, ease: "linear" }, scale: { duration: 7, repeat: Infinity, ease: "easeInOut" } }}
    />
  );
}

function WaveField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          className="absolute left-[7%] rounded-[50%] border"
          style={{
            top: `${17 + index * 10}%`,
            width: `${82 - index * 5}%`,
            height: `${13 + index * 2}%`,
            borderColor: `rgba(${index % 2 === 0 ? rgb : secondary},${0.28 - index * 0.03})`,
            transform: `rotate(${index % 2 === 0 ? -4 : 4}deg)`,
          }}
          animate={{ x: [-30, 45, -30], scaleX: [0.96, 1.04, 0.96] }}
          transition={{ duration: 7 + index * 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

function RelativityField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <motion.div
      className="absolute right-[4%] top-[5%] h-[70vw] max-h-[860px] w-[70vw] max-w-[860px] rounded-full"
      style={{
        background: `repeating-radial-gradient(circle at center, transparent 0 37px, rgba(${rgb},0.19) 38px 40px, transparent 41px 78px)`,
        boxShadow: `0 0 120px rgba(${secondary},0.12)`,
      }}
      animate={{ rotate: [0, 18, -8, 0], scaleX: [1.25, 1.4, 1.18, 1.25], scaleY: [0.92, 0.82, 1.02, 0.92] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function QuantumField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(${rgb},0.52) 0 1.5px, transparent 2px), radial-gradient(circle, rgba(${secondary},0.38) 0 1px, transparent 1.7px)`,
          backgroundSize: "43px 43px, 67px 67px",
          backgroundPosition: "8px 14px, 21px 33px",
        }}
        animate={{ backgroundPosition: ["8px 14px, 21px 33px", "38px 4px, -22px 63px", "8px 14px, 21px 33px"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[15%] top-[20%] h-64 w-64 rounded-full blur-[70px]"
        style={{ background: `rgba(${rgb},0.22)` }}
        animate={{ scale: [0.8, 1.25, 0.9], opacity: [0.45, 0.9, 0.45] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </>
  );
}

function NuclearField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <motion.div
      className="absolute right-[8%] top-[12%] h-[40vw] max-h-[500px] w-[40vw] max-w-[500px] rounded-full"
      style={{
        background: `radial-gradient(circle, rgba(${secondary},0.48) 0 2%, rgba(${rgb},0.29) 3% 14%, transparent 15% 24%, rgba(${rgb},0.16) 25% 27%, transparent 28% 100%)`,
        boxShadow: `0 0 130px rgba(${rgb},0.24)`,
      }}
      animate={{ scale: [0.92, 1.08, 0.96, 1], rotate: [0, 12, -7, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function AtomicField({ rgb, secondary }: { rgb: string; secondary: string }) {
  return (
    <motion.div
      className="absolute right-[6%] top-[8%] h-[54vw] max-h-[680px] w-[54vw] max-w-[680px]"
      animate={{ rotate: 360 }}
      transition={{ duration: 44, repeat: Infinity, ease: "linear" }}
    >
      <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `rgb(${rgb})`, boxShadow: `0 0 60px rgba(${rgb},0.85)` }} />
      {[0, 60, 120].map((rotation, index) => (
        <div
          key={rotation}
          className="absolute inset-[12%] rounded-[50%] border"
          style={{ borderColor: `rgba(${index === 1 ? rgb : secondary},0.30)`, transform: `rotate(${rotation}deg) scaleY(0.36)` }}
        />
      ))}
    </motion.div>
  );
}
