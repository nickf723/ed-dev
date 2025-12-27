"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pyramid, Heart, Shield, Apple, Award, Sparkles } from "lucide-react";

const LEVELS = [
  { id: "self", label: "Self-Actualization", icon: Sparkles, color: "bg-violet-500", desc: "Achieving one's full potential, creative activities." },
  { id: "esteem", label: "Esteem", icon: Award, color: "bg-fuchsia-600", desc: "Prestige and feeling of accomplishment." },
  { id: "love", label: "Belonging & Love", icon: Heart, color: "bg-pink-600", desc: "Intimate relationships, friends." },
  { id: "safety", label: "Safety Needs", icon: Shield, color: "bg-rose-700", desc: "Security, safety." },
  { id: "physio", label: "Physiological", icon: Apple, color: "bg-red-800", desc: "Food, water, warmth, rest." },
];

export default function MaslowWidget() {
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Pyramid size={14} className="text-pink-400" /> Hierarchy of Needs
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* The Pyramid */}
        <div className="flex flex-col w-full gap-1 mb-6">
            {LEVELS.map((lvl, i) => {
                const width = 40 + (i * 15); // 40%, 55%, 70%, 85%, 100%
                const isActive = activeLevel === lvl.id;
                
                return (
                    <div key={lvl.id} className="flex justify-center w-full">
                         <motion.button
                            onMouseEnter={() => setActiveLevel(lvl.id)}
                            onMouseLeave={() => setActiveLevel(null)}
                            className={`h-8 rounded-sm flex items-center justify-center text-[10px] font-bold uppercase tracking-wider transition-all duration-200 relative
                                ${lvl.color} ${isActive ? "scale-105 z-10 shadow-lg ring-2 ring-white/20" : "opacity-80 hover:opacity-100"}
                            `}
                            style={{ width: `${width}%` }}
                         >
                            <span className="truncate px-2 text-white drop-shadow-md">{lvl.label}</span>
                         </motion.button>
                    </div>
                );
            })}
        </div>

        {/* Details Panel */}
        <div className="w-full bg-neutral-950/50 rounded-lg border border-white/5 p-4 min-h-[80px] flex items-center justify-center text-center">
            <AnimatePresence mode="wait">
                {activeLevel ? (
                    <motion.div
                        key={activeLevel}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                    >
                         {(() => {
                             const lvl = LEVELS.find(l => l.id === activeLevel);
                             if (!lvl) return null;
                             return (
                                 <>
                                    <div className="flex justify-center mb-2">
                                        <lvl.icon size={20} className="text-pink-300" />
                                    </div>
                                    <h4 className="text-xs font-bold text-white mb-1">{lvl.label}</h4>
                                    <p className="text-[10px] text-neutral-400">{lvl.desc}</p>
                                 </>
                             );
                         })()}
                    </motion.div>
                ) : (
                    <p className="text-[10px] text-neutral-600 italic">Hover over a level to explore human motivation.</p>
                )}
            </AnimatePresence>
        </div>

      </div>
    </div>
  );
}