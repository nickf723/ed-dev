"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Atom, Microscope,  Earth, Telescope, } from "lucide-react";
import { User, ZoomIn } from "lucide-react";

// Scale definitions
export const SCALES = [
  { id: "quantum", label: "Quantum", power: "10⁻³⁵m", Icon: Atom, color: "text-purple-400" },
  { id: "micro", label: "Microscopic", power: "10⁻⁶m", Icon: Microscope, color: "text-cyan-400" },
  { id: "macro", label: "Macroscopic", power: "10⁰m", Icon: User, color: "text-emerald-400" },
  { id: "planetary", label: "Planetary", power: "10⁷m", Icon: Earth, color: "text-blue-400" },
  { id: "cosmic", label: "Cosmic", power: "10²⁶m", Icon: Telescope, color: "text-amber-400" },
];

type ScaleSliderProps = {
  activeScale: string | null;
  setActiveScale: (scale: string | null) => void;
};

export default function ScaleSlider({ activeScale, setActiveScale }: ScaleSliderProps) {
  return (
    <div className="glass relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/80 p-6 backdrop-blur-xl">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-300 flex items-center gap-2">
          <ZoomIn size={14} className="text-cyan-400"/> Scale of Reality
        </h3>
        {/* Clear Button */}
        {activeScale && (
             <button 
                onClick={() => setActiveScale(null)}
                className="text-[10px] uppercase font-bold text-red-400 hover:text-red-300 transition-colors"
             >
                Reset
             </button>
        )}
      </div>

      {/* The Track */}
      <div className="relative flex flex-col gap-6 pl-4 border-l-2 border-neutral-800 ml-3">
        {SCALES.map((scale) => {
          const isActive = activeScale === scale.id;
          const isDimmed = activeScale && !isActive;

          return (
            <motion.div
              key={scale.id}
              className="relative"
              onMouseEnter={() => setActiveScale(scale.id)}
              // We don't clear on leave immediately to allow clicking, 
              // but for this UX, let's stick to hover-to-focus
            >
              {/* Node on the line */}
              <div 
                className={`absolute -left-[21px] top-0.5 h-3 w-3 rounded-full border-2 transition-all duration-300
                    ${isActive ? `bg-neutral-950 ${scale.color} border-current scale-125` : "bg-neutral-800 border-transparent"}
                `}
              />

              {/* Label Content */}
              <div 
                className={`cursor-pointer transition-all duration-300 ${isActive ? "translate-x-2" : ""} ${isDimmed ? "opacity-30" : "opacity-100"}`}
              >
                <div className="flex items-center gap-3">
                    <scale.Icon size={16} className={isActive ? scale.color : "text-neutral-500"} />
                    <span className={`text-sm font-bold ${isActive ? "text-white" : "text-neutral-400"}`}>
                        {scale.label}
                    </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-600 ml-7">
                    {scale.power}
                </span>
              </div>
              
              {/* Active Indicator Glow (Background) */}
              {isActive && (
                <motion.div 
                    layoutId="scaleHighlight"
                    className="absolute -inset-2 -z-10 rounded-lg bg-white/5"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 p-4 rounded-lg bg-cyan-950/20 border border-cyan-900/30">
        <p className="text-[10px] text-cyan-200/70 font-mono leading-relaxed">
            {activeScale 
                ? `> DISPLAYING: ${activeScale.toUpperCase()}_SCALE` 
                : "> HOVER TO FILTER DISCIPLINES BY MAGNITUDE"}
        </p>
      </div>
    </div>
  );
}