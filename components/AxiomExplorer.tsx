"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AXIOM_LIBRARY, AxiomEntry } from "@/lib/axiom-db";
import { Calculator, Scale, Zap, Brain, Cpu } from "lucide-react";
import { M } from "@/components/Math"; // Assuming you have your LaTeX component

export default function AxiomExplorer() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All" 
    ? AXIOM_LIBRARY 
    : AXIOM_LIBRARY.filter(a => a.category === activeCategory);

  return (
    <div className="w-full space-y-8">
        
        {/* Filter Tabs */}
        <div className="flex gap-2 justify-center">
            {["All", "Physics", "Economics", "Computing", "Philosophy"].map(cat => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all
                        ${activeCategory === cat 
                            ? "bg-white text-black" 
                            : "bg-white/5 text-neutral-500 hover:text-white"}
                    `}
                >
                    {cat}
                </button>
            ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
                {filtered.map(axiom => (
                    <motion.div
                        key={axiom.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <AxiomCard axiom={axiom} />
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    </div>
  );
}

// --- INTERNAL COMPONENT: The Interactive Card ---
function AxiomCard({ axiom }: { axiom: AxiomEntry }) {
    // Initialize state with defaults
    const [values, setValues] = useState<number[]>(
        axiom.variables ? axiom.variables.map(v => v.default) : []
    );

    const handleSliderChange = (index: number, val: number) => {
        const newVals = [...values];
        newVals[index] = val;
        setValues(newVals);
    };

    // Calculate result if calculator exists
    const result = axiom.calculate ? axiom.calculate(values) : null;

    // Icon selection
    const Icon = axiom.category === "Physics" ? Zap : 
                 axiom.category === "Economics" ? Scale : 
                 axiom.category === "Computing" ? Cpu : Brain;

    const themeColor = axiom.category === "Physics" ? "text-cyan-400" :
                       axiom.category === "Economics" ? "text-emerald-400" :
                       axiom.category === "Computing" ? "text-violet-400" : "text-amber-400";

    return (
        <div className="h-full rounded-xl border border-white/10 bg-neutral-900/60 p-6 backdrop-blur-md hover:border-white/20 transition-colors">
            
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-white/5 ${themeColor}`}>
                        <Icon size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white">{axiom.title}</h3>
                        <span className="text-[10px] uppercase text-neutral-500 tracking-widest">{axiom.category}</span>
                    </div>
                </div>
            </div>

            {/* Formula (LaTeX) */}
            <div className="mb-6 p-4 rounded-lg bg-black/40 border border-white/5 text-center">
                <M>{axiom.formula || ""}</M>
            </div>

            <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                {axiom.desc}
            </p>

            {/* Interactive Controls (If Variables Exist) */}
            {axiom.variables && (
                <div className="space-y-4 border-t border-white/5 pt-4">
                    {axiom.variables.map((v, i) => (
                        <div key={v.symbol}>
                            <div className="flex justify-between text-xs mb-1">
                                <span className="text-neutral-300 font-mono">{v.symbol} ({v.name})</span>
                                <span className="text-white font-mono">{values[i]} {v.unit}</span>
                            </div>
                            <input 
                                type="range"
                                min={v.min} max={v.max} step={v.step}
                                value={values[i]}
                                onChange={(e) => handleSliderChange(i, Number(e.target.value))}
                                className={`w-full h-1 rounded-full appearance-none cursor-pointer bg-neutral-800 accent-current ${themeColor.replace('text-','accent-')}`} // Simple accent color logic
                            />
                        </div>
                    ))}

                    {/* Result Display */}
                    <div className="mt-4 flex items-center justify-between p-3 rounded bg-white/5 border border-white/5">
                        <span className="text-xs font-bold text-neutral-400 uppercase">Result</span>
                        <div className={`font-mono font-bold text-lg ${themeColor}`}>
                            {result && result % 1 !== 0 ? result.toFixed(2) : result} 
                            <span className="text-xs ml-1 opacity-70">{axiom.resultUnit}</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}