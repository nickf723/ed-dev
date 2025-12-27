"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertTriangle, Infinity, Scale, ShieldAlert } from "lucide-react";

type AxiomMode = "IDENTITY" | "NON_CONTRADICTION" | "EXCLUDED_MIDDLE";

export default function AxiomPlayground() {
  const [mode, setMode] = useState<AxiomMode>("IDENTITY");
  const [inputValue, setInputValue] = useState<string>("A");
  
  // Non-Contradiction State
  const [isTrue, setIsTrue] = useState(false);
  const [isFalse, setIsFalse] = useState(false);
  
  // Excluded Middle State
  const [middleValue, setMiddleValue] = useState(50);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 rounded-3xl border border-red-900/30 bg-black/60 backdrop-blur-xl shadow-2xl relative overflow-hidden">
      
      {/* Header / Selector */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-white/10 pb-6 mb-8 gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20 text-red-500">
                <ShieldAlert size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold text-white">Logic Kernel</h3>
                <p className="text-xs text-red-400 font-mono">SYS_INTEGRITY_CHECK</p>
            </div>
        </div>
        
        <div className="flex p-1 bg-neutral-900 rounded-lg border border-white/5">
            {[
                { id: "IDENTITY", label: "Identity", icon: Scale },
                { id: "NON_CONTRADICTION", label: "Non-Contradiction", icon: X },
                { id: "EXCLUDED_MIDDLE", label: "Excluded Middle", icon: Infinity },
            ].map((m) => (
                <button
                    key={m.id}
                    onClick={() => setMode(m.id as AxiomMode)}
                    className={`
                        flex items-center gap-2 px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all
                        ${mode === m.id ? "bg-red-600 text-white shadow-lg" : "text-neutral-500 hover:text-white hover:bg-white/5"}
                    `}
                >
                    <m.icon size={12} />
                    <span className="hidden md:inline">{m.label}</span>
                </button>
            ))}
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="min-h-[300px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
            
            {/* 1. LAW OF IDENTITY: A = A */}
            {mode === "IDENTITY" && (
                <motion.div 
                    key="identity"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-8 w-full"
                >
                    <div className="text-center space-y-2">
                        <div className="text-4xl font-black text-white font-mono">A = A</div>
                        <p className="text-sm text-neutral-400">"An entity is itself."</p>
                    </div>

                    <div className="flex items-center gap-8 text-6xl font-bold font-mono">
                        <input 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            maxLength={1}
                            className="w-24 h-24 bg-neutral-900 border-2 border-red-500/50 rounded-xl text-center text-white focus:outline-none focus:border-red-500 transition-colors uppercase"
                        />
                        <div className="text-red-500">=</div>
                        <div className="w-24 h-24 bg-neutral-900/50 border-2 border-dashed border-neutral-700 rounded-xl flex items-center justify-center text-neutral-500 uppercase">
                            {inputValue}
                        </div>
                    </div>
                    
                    <div className="p-4 bg-red-950/20 border border-red-500/20 rounded-lg max-w-md text-center">
                        <p className="text-xs text-red-300">
                            The input is instantly mirrored. Reality is consistent.
                            <br/>If A became B without cause, logic would collapse.
                        </p>
                    </div>
                </motion.div>
            )}

            {/* 2. LAW OF NON-CONTRADICTION: ~(A & ~A) */}
            {mode === "NON_CONTRADICTION" && (
                <motion.div 
                    key="contradiction"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-8 w-full"
                >
                    <div className="text-center space-y-2">
                        <div className="text-4xl font-black text-white font-mono">¬(A ∧ ¬A)</div>
                        <p className="text-sm text-neutral-400">"Nothing can both be and not be."</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => { setIsTrue(!isTrue); if(!isTrue) setIsFalse(false); }}
                            className={`w-32 h-20 rounded-xl border-2 font-bold text-xl transition-all ${isTrue ? "bg-emerald-500/20 border-emerald-500 text-emerald-400" : "bg-neutral-900 border-white/10 text-neutral-500"}`}
                        >
                            IS TRUE
                        </button>
                        <button
                            onClick={() => { setIsFalse(!isFalse); if(!isFalse) setIsTrue(false); }}
                            className={`w-32 h-20 rounded-xl border-2 font-bold text-xl transition-all ${isFalse ? "bg-red-500/20 border-red-500 text-red-400" : "bg-neutral-900 border-white/10 text-neutral-500"}`}
                        >
                            IS FALSE
                        </button>
                    </div>

                    {/* Attempting to force both triggers error visual */}
                    <div className="h-12 flex items-center">
                         {isTrue && isFalse ? (
                             // This state is technically prevented by logic above, but if we allowed it:
                             <div className="flex items-center gap-2 text-red-500 font-bold animate-pulse">
                                 <AlertTriangle /> SYSTEM CRASH: PARADOX DETECTED
                             </div>
                         ) : (
                             <div className="flex items-center gap-2 text-neutral-500 text-sm font-mono">
                                 STATUS: CONSISTENT
                             </div>
                         )}
                    </div>
                </motion.div>
            )}

            {/* 3. LAW OF EXCLUDED MIDDLE: A v ~A */}
            {mode === "EXCLUDED_MIDDLE" && (
                <motion.div 
                    key="middle"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-8 w-full"
                >
                    <div className="text-center space-y-2">
                        <div className="text-4xl font-black text-white font-mono">A ∨ ¬A</div>
                        <p className="text-sm text-neutral-400">"Everything must either be or not be."</p>
                    </div>

                    <div className="w-full max-w-md relative pt-10 pb-4">
                        {/* The Track */}
                        <div className="h-2 bg-neutral-800 rounded-full w-full" />
                        
                        {/* The Snap Zones */}
                        <div className="absolute top-10 left-0 w-4 h-4 bg-red-500 rounded-full blur-[2px]" />
                        <div className="absolute top-10 right-0 w-4 h-4 bg-emerald-500 rounded-full blur-[2px]" />
                        
                        <input 
                            type="range" 
                            min="0" 
                            max="100" 
                            value={middleValue}
                            onChange={(e) => setMiddleValue(parseInt(e.target.value))}
                            onMouseUp={() => setMiddleValue(middleValue > 50 ? 100 : 0)} // SNAP LOGIC
                            className="absolute top-8 w-full opacity-0 cursor-pointer h-8"
                        />
                        
                        {/* The Handle */}
                        <motion.div 
                            className="absolute top-6 w-8 h-8 bg-white rounded-full shadow-[0_0_20px_white] cursor-grab active:cursor-grabbing flex items-center justify-center"
                            animate={{ left: `calc(${middleValue}% - 16px)` }}
                        >
                            <div className="w-2 h-2 bg-black rounded-full" />
                        </motion.div>

                        <div className="flex justify-between mt-4 text-xs font-mono font-bold uppercase">
                            <span className="text-red-500">False (0)</span>
                            <span className="text-neutral-600">The Middle (Excluded)</span>
                            <span className="text-emerald-500">True (1)</span>
                        </div>
                    </div>

                    <div className="text-xs text-neutral-400 max-w-xs text-center">
                        *Release the slider. It will snap to Truth or Falsehood. There is no "half-true" in classical logic.
                    </div>
                </motion.div>
            )}

        </AnimatePresence>
      </div>

    </div>
  );
}