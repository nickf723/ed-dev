"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Pi, Info, Calculator } from "lucide-react";

const CONSTANTS = [
  { 
    symbol: "π", 
    name: "Pi", 
    val: "3.14159...", 
    desc: "The ratio of a circle's circumference to its diameter. Essential for geometry and waves." 
  },
  { 
    symbol: "e", 
    name: "Euler's Number", 
    val: "2.71828...", 
    desc: "The base of natural logarithms. It describes continuous growth and decay." 
  },
  { 
    symbol: "i", 
    name: "Imaginary Unit", 
    val: "√-1", 
    desc: "The solution to x² + 1 = 0. Extends the number line into the complex plane." 
  },
  { 
    symbol: "φ", 
    name: "Golden Ratio", 
    val: "1.61803...", 
    desc: "A proportion appearing frequently in geometry, art, and nature." 
  },
  { 
    symbol: "∞", 
    name: "Infinity", 
    val: "Undefined", 
    desc: "A concept describing something larger than any natural number." 
  },
];

export default function ConstantsWidget() {
  const [selected, setSelected] = useState<typeof CONSTANTS[0] | null>(null);

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <Calculator size={14} className="text-pink-400" /> Constants
        </h3>
        <Pi size={14} className="text-neutral-600" />
      </div>

      <div className="grid grid-cols-5 gap-1 p-2 bg-neutral-950/50">
        {CONSTANTS.map((c) => (
            <button
                key={c.symbol}
                onClick={() => setSelected(c)}
                className={`aspect-square flex items-center justify-center rounded-lg border text-lg font-serif transition-all
                    ${selected?.symbol === c.symbol 
                        ? "bg-pink-500/20 border-pink-500/50 text-pink-200 shadow-[0_0_15px_rgba(236,72,153,0.2)]" 
                        : "bg-neutral-900 border-neutral-800 text-neutral-500 hover:text-white hover:bg-neutral-800"}
                `}
            >
                {c.symbol}
            </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selected ? (
            <motion.div
                key={selected.symbol}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-5 py-4 border-t border-white/5"
            >
                <div className="flex justify-between items-baseline mb-1">
                    <span className="text-sm font-bold text-white">{selected.name}</span>
                    <span className="font-mono text-xs text-pink-400">{selected.val}</span>
                </div>
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                    {selected.desc}
                </p>
            </motion.div>
        ) : (
            <div className="px-5 py-4 border-t border-white/5 text-center">
                <span className="text-[10px] text-neutral-600 uppercase tracking-wide">Select a constant</span>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}