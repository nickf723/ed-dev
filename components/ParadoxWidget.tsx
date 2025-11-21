"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, RefreshCw, CheckCircle2, AlertTriangle } from "lucide-react";

const paradoxes = [
  {
    name: "Russell's Paradox",
    problem: "Does the set of all sets that do not contain themselves contain itself?",
    resolution: "Axiomatic Set Theory (ZFC) restricts set formation to prevent this loop.",
    axiom: "Axiom of Separation"
  },
  {
    name: "The Halting Problem",
    problem: "Can a program determine if any arbitrary program will eventually stop?",
    resolution: "Proven impossible by Alan Turing using proof by contradiction.",
    axiom: "Undecidability"
  },
  {
    name: "Banach-Tarski",
    problem: "Can you cut a sphere into finite pieces and reassemble them into two identical spheres?",
    resolution: "Yes, theoretically, if you accept non-measurable sets.",
    axiom: "Axiom of Choice"
  },
  {
    name: "Achilles & Tortoise",
    problem: "Can a fast runner ever overtake a slow one if the slow one has a head start?",
    resolution: "Infinite series can sum to a finite result (Limits).",
    axiom: "Calculus / Limits"
  }
];

export default function ParadoxWidget() {
  const [index, setIndex] = useState(0);
  const [resolved, setResolved] = useState(false);

  const nextParadox = () => {
    setResolved(false);
    setTimeout(() => setIndex((prev) => (prev + 1) % paradoxes.length), 200);
  };

  const current = paradoxes[index];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-neutral-900/60 p-6 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-yellow-500">
          <AlertTriangle size={18} />
          <span className="text-xs font-bold uppercase tracking-widest">System Anomaly</span>
        </div>
        <button 
            onClick={nextParadox}
            className="rounded-full p-1.5 text-neutral-500 hover:bg-white/10 hover:text-white transition-colors"
        >
            <RefreshCw size={14} />
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
        >
            <h4 className="text-lg font-bold text-neutral-200 mb-2">{current.name}</h4>
            <p className="text-sm text-neutral-400 leading-relaxed mb-6 h-16">
                "{current.problem}"
            </p>

            {/* Interactive Resolution Area */}
            <div className="relative">
                {!resolved ? (
                    <button 
                        onClick={() => setResolved(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/10 py-3 text-xs font-bold uppercase tracking-wider text-yellow-400 transition-all hover:bg-yellow-500/20 hover:shadow-[0_0_15px_rgba(234,179,8,0.2)]"
                    >
                        <BrainCircuit size={16} /> Resolve Anomaly
                    </button>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="rounded-lg border border-green-500/20 bg-green-500/5 p-3"
                    >
                        <div className="mb-1 flex items-center gap-2 text-xs font-bold uppercase text-green-400">
                            <CheckCircle2 size={14} /> 
                            <span>Resolved: {current.axiom}</span>
                        </div>
                        <p className="text-xs text-neutral-300">{current.resolution}</p>
                    </motion.div>
                )}
            </div>
        </motion.div>
      </AnimatePresence>
      
      {/* Background Noise Texture */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} 
      />
    </div>
  );
}