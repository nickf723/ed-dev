"use client";

import { motion } from "framer-motion";

type Props = {
  mode?: "energy" | "momentum" | "split";
};

export default function EnergyField({ mode = "split" }: Props) {
  const showEnergy = mode === "energy" || mode === "split";
  const showMomentum = mode === "momentum" || mode === "split";

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {showEnergy ? (
        <>
          <motion.div
            className="absolute -left-[12%] top-[8%] h-[44rem] w-[44rem] rounded-full blur-[110px]"
            style={{ background: "radial-gradient(circle, rgba(45,212,191,0.26), rgba(16,185,129,0.06) 48%, transparent 72%)" }}
            animate={{ x: [0, 70, -20, 0], y: [0, 45, 90, 0], scale: [1, 1.08, 0.96, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute left-[9%] top-[25%] h-px w-[58%]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.62), rgba(250,204,21,0.24), transparent)" }}
            animate={{ x: [-70, 120, -70], opacity: [0.35, 0.9, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          {[0, 1, 2].map((index) => (
            <motion.div
              key={`energy-${index}`}
              className="absolute h-2.5 w-2.5 rounded-full bg-emerald-300/60 shadow-[0_0_22px_rgba(110,231,183,0.7)]"
              style={{ left: `${18 + index * 13}%`, top: `${34 + index * 9}%` }}
              animate={{ x: [0, 180, 330], y: [0, index % 2 === 0 ? -25 : 28, 0], opacity: [0, 0.95, 0] }}
              transition={{ duration: 7 + index, repeat: Infinity, delay: index * 1.2, ease: "easeInOut" }}
            />
          ))}
        </>
      ) : null}

      {showMomentum ? (
        <>
          <motion.div
            className="absolute -right-[8%] top-[18%] h-[38rem] w-[38rem] rounded-full blur-[100px]"
            style={{ background: "radial-gradient(circle, rgba(96,165,250,0.24), rgba(167,139,250,0.08) 46%, transparent 72%)" }}
            animate={{ x: [0, -60, 20, 0], y: [0, 85, 35, 0], scale: [1, 0.94, 1.07, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={`momentum-${index}`}
              className="absolute right-[4%] h-px origin-right"
              style={{
                top: `${24 + index * 13}%`,
                width: `${34 + index * 5}%`,
                background: `linear-gradient(90deg, transparent, rgba(${index % 2 === 0 ? "96,165,250" : "167,139,250"},0.52))`,
                transform: `rotate(${index % 2 === 0 ? -5 : 4}deg)`,
              }}
              animate={{ x: [90, -30, 90], opacity: [0.25, 0.78, 0.25] }}
              transition={{ duration: 6.5 + index, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </>
      ) : null}

      <div
        className="absolute inset-0 opacity-45"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.78) 72%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_44%,rgba(1,5,10,0.62)_100%)]" />
    </div>
  );
}
