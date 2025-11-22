"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Brain, Wind, Droplet, Activity, Scan } from "lucide-react";

const REGIONS = [
  { 
    id: "head", 
    label: "Cranial", 
    systems: ["Nervous", "Endocrine"], 
    organs: ["Brain", "Pituitary", "Eyes"],
    icon: Brain,
    color: "text-cyan-400"
  },
  { 
    id: "thorax", 
    label: "Thoracic", 
    systems: ["Circulatory", "Respiratory"], 
    organs: ["Heart", "Lungs", "Thymus"],
    icon: Wind,
    color: "text-red-400"
  },
  { 
    id: "abdomen", 
    label: "Abdominal", 
    systems: ["Digestive", "Renal"], 
    organs: ["Stomach", "Liver", "Kidneys"],
    icon: Droplet,
    color: "text-amber-400"
  },
];

export default function SystemScanner() {
  const [activeRegion, setActiveRegion] = useState<typeof REGIONS[0] | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Scan size={14} className="text-rose-400" /> Bio-Scan
        </h3>
        <Activity size={14} className="text-neutral-600 animate-pulse" />
      </div>

      <div className="p-2 grid grid-cols-3 gap-1 bg-neutral-950/50">
        {REGIONS.map((region) => {
            const isActive = activeRegion?.id === region.id;
            return (
                <button
                    key={region.id}
                    onClick={() => setActiveRegion(region)}
                    className={`flex flex-col items-center justify-center py-4 rounded-lg transition-all border border-transparent
                        ${isActive 
                            ? `bg-white/10 border-white/10 ${region.color}` 
                            : "hover:bg-white/5 text-neutral-500 hover:text-neutral-300"}
                    `}
                >
                    <region.icon size={20} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase">{region.label}</span>
                </button>
            );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeRegion ? (
            <motion.div
                key={activeRegion.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-6 py-5 border-t border-white/5"
            >
                <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-white">{activeRegion.label} Cavity</span>
                    <span className="text-[10px] font-mono text-neutral-500 uppercase">Status: Optimal</span>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-bold uppercase text-neutral-500 mb-1">Primary Systems</p>
                        <div className="flex gap-2">
                            {activeRegion.systems.map(s => (
                                <span key={s} className="px-2 py-1 rounded bg-white/10 text-[10px] text-white border border-white/5">{s}</span>
                            ))}
                        </div>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold uppercase text-neutral-500 mb-1">Key Organs</p>
                        <p className="text-xs text-neutral-300 font-mono">
                            {activeRegion.organs.join(" • ")}
                        </p>
                    </div>
                </div>
            </motion.div>
        ) : (
            <div className="px-6 py-8 text-center text-neutral-600">
                <p className="text-xs uppercase tracking-widest">Select Region to Scan</p>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}