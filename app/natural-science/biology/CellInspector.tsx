"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Disc, Zap, Circle, Box, Shield, Activity } from "lucide-react";

const ORGANELLES = [
  { 
    id: "nucleus", 
    name: "Nucleus", 
    icon: Disc, 
    color: "text-purple-400", 
    desc: "The command center. Contains genetic material (DNA) and controls cell growth and reproduction." 
  },
  { 
    id: "mitochondria", 
    name: "Mitochondria", 
    icon: Zap, 
    color: "text-orange-400", 
    desc: "The powerhouse. Generates energy (ATP) through cellular respiration." 
  },
  { 
    id: "ribosome", 
    name: "Ribosome", 
    icon: Circle, 
    color: "text-red-400", 
    desc: "The factory. Translates genetic code into proteins." 
  },
  { 
    id: "membrane", 
    name: "Cell Membrane", 
    icon: Shield, 
    color: "text-cyan-400", 
    desc: "The gatekeeper. Controls what enters and leaves the cell." 
  },
];

export default function CellInspector() {
  const [activePart, setActivePart] = useState(ORGANELLES[0]);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Activity size={14} className="text-lime-400" /> Cell Inspector
        </h3>
      </div>

      <div className="p-6 flex flex-col items-center">
        
        {/* Abstract Cell Visual */}
        <div className="relative w-40 h-40 mb-6">
            {/* Membrane */}
            <motion.div 
                className={`absolute inset-0 rounded-full border-4 border-dashed transition-colors duration-500 ${activePart.id === 'membrane' ? "border-cyan-400 bg-cyan-900/20" : "border-neutral-700"}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
            />
            
            {/* Cytoplasm */}
            <div className="absolute inset-2 rounded-full bg-neutral-800/50 backdrop-blur-sm" />
            
            {/* Nucleus */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center
                ${activePart.id === 'nucleus' ? "bg-purple-500/20 border-purple-400 shadow-[0_0_20px_rgba(192,132,252,0.3)]" : "bg-neutral-900 border-neutral-600"}
            `}>
                <span className="text-[8px] font-bold text-white/50">DNA</span>
            </div>

            {/* Mitochondria (Orbiting) */}
            <div className={`absolute top-4 left-8 w-8 h-4 rounded-full border transition-all duration-300 rotate-45
                 ${activePart.id === 'mitochondria' ? "bg-orange-500/20 border-orange-400 shadow-[0_0_15px_rgba(251,146,60,0.3)]" : "bg-neutral-900 border-neutral-600"}
            `} />

            {/* Ribosome (Floating dots) */}
            <div className={`absolute bottom-6 right-8 w-3 h-3 rounded-full transition-all duration-300
                 ${activePart.id === 'ribosome' ? "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" : "bg-neutral-600"}
            `} />
             <div className={`absolute bottom-8 right-4 w-2 h-2 rounded-full transition-all duration-300
                 ${activePart.id === 'ribosome' ? "bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" : "bg-neutral-600"}
            `} />
        </div>

        {/* Selector */}
        <div className="w-full grid grid-cols-2 gap-2 mb-4">
            {ORGANELLES.map((part) => (
                <button
                    key={part.id}
                    onClick={() => setActivePart(part)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs transition-all
                        ${activePart.id === part.id 
                            ? `bg-neutral-800 border-neutral-600 text-white` 
                            : "bg-transparent border-transparent text-neutral-500 hover:bg-white/5"}
                    `}
                >
                    <part.icon size={14} className={part.color} />
                    <span className="font-bold">{part.name}</span>
                </button>
            ))}
        </div>

        {/* Info Panel */}
        <AnimatePresence mode="wait">
            <motion.div
                key={activePart.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="text-center"
            >
                <p className="text-xs text-neutral-300 leading-relaxed">
                    {activePart.desc}
                </p>
            </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}