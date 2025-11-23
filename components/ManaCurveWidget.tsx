"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Zap } from "lucide-react";

export default function ManaCurveWidget() {
  // Default Curve (Midrange)
  const [curve, setCurve] = useState([0, 4, 8, 6, 4, 2, 1]); // Drops: 0, 1, 2, 3, 4, 5, 6+

  const handleAdjust = (idx: number, delta: number) => {
      setCurve(c => c.map((val, i) => i === idx ? Math.max(0, val + delta) : val));
  };

  const totalCards = curve.reduce((a, b) => a + b, 0);
  const avgCMC = curve.reduce((acc, val, i) => acc + (val * (i+1)), 0) / totalCards; // i+1 assuming index 0 is 1-drop

  return (
    <div className="glass overflow-hidden rounded-xl border border-white/10 bg-neutral-900/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4 flex justify-between items-center">
        <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-300">
          <BarChart3 size={14} className="text-cyan-400" /> Mana Curve
        </h3>
        <div className="flex items-center gap-2 text-[10px]">
            <span className="text-neutral-500">Avg CMC:</span>
            <span className="font-mono font-bold text-cyan-400">{isNaN(avgCMC) ? 0 : avgCMC.toFixed(2)}</span>
        </div>
      </div>

      <div className="p-6">
        
        {/* Chart */}
        <div className="flex items-end justify-between h-32 gap-2 mb-4">
            {curve.map((val, i) => {
                const height = Math.min(100, (val / 12) * 100); // Cap at 12 visual max
                return (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                        <div className="w-full relative flex-1 flex items-end bg-neutral-900/50 rounded-t-md overflow-hidden">
                            <motion.div 
                                className="w-full bg-cyan-500/20 border-t border-l border-r border-cyan-500/50 group-hover:bg-cyan-500/40 transition-colors"
                                animate={{ height: `${height}%` }}
                            />
                            <span className="absolute bottom-1 w-full text-center text-[10px] font-bold text-white drop-shadow-md">
                                {val}
                            </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-[9px] font-bold text-neutral-500">{i+1}</span>
                            <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => handleAdjust(i, 1)} className="w-4 h-4 rounded bg-neutral-800 text-white flex items-center justify-center text-[10px] hover:bg-neutral-700">+</button>
                                <button onClick={() => handleAdjust(i, -1)} className="w-4 h-4 rounded bg-neutral-800 text-white flex items-center justify-center text-[10px] hover:bg-neutral-700">-</button>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>

        <p className="text-[10px] text-neutral-500 leading-relaxed text-center border-t border-white/5 pt-3">
            The <strong>Mana Curve</strong> ensures you use your mana efficiently every turn. A low curve implies aggressive play; a high curve implies control or ramp.
        </p>

      </div>
    </div>
  );
}