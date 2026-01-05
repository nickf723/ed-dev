"use client";
import { useState } from "react";
import { BarChart3, Layers, Calculator, Sparkles } from "lucide-react";

export default function ManaCurveLab() {
  // Deck slots: [1-drop, 2-drop, 3-drop, 4-drop, 5-drop, 6+]
  const [curve, setCurve] = useState([4, 8, 10, 6, 4, 2]);
  
  // Constants
  const DECK_SIZE = 60;
  const LANDS = 24;
  const SPELLS = curve.reduce((a, b) => a + b, 0);
  const FREE_SLOTS = DECK_SIZE - LANDS - SPELLS;

  // Analysis
  const avgCost = curve.reduce((acc, count, i) => acc + (count * (i + 1)), 0) / SPELLS;
  
  // Hypergeometric approx for opening hand (7 cards)
  // Prob of having at least one 1-drop or 2-drop on Turn 1/2
  // P(X >= 1) = 1 - P(X=0)
  // P(X=0) approx = ((Total - Targets) / Total)^7
  const lowDrops = curve[0] + curve[1];
  const consistency = 1 - Math.pow((DECK_SIZE - lowDrops) / DECK_SIZE, 7);

  const updateCurve = (index: number, val: number) => {
      const newCurve = [...curve];
      // Prevent going over 60 cards
      if (val > newCurve[index] && FREE_SLOTS <= 0) return;
      newCurve[index] = Math.max(0, val);
      setCurve(newCurve);
  };

  return (
    <div className="bg-[#1e1b4b]/90 border border-violet-500/30 rounded-xl p-6 shadow-[0_0_30px_rgba(139,92,246,0.1)] w-full max-w-md relative overflow-hidden backdrop-blur-md">
        
        {/* Foil Header Effect */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50" />

        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-violet-200 flex items-center gap-2 tracking-wider text-sm font-sans">
                <Layers size={18} className="text-violet-500" /> DECK_ARCHITECT
            </h3>
            <div className={`text-[10px] font-bold font-mono px-2 py-1 rounded border ${FREE_SLOTS < 0 ? "border-red-500 text-red-400" : "border-violet-500/30 text-violet-300"}`}>
                {SPELLS + LANDS}/{DECK_SIZE} CARDS
            </div>
        </div>

        {/* VISUALIZER (Bar Chart) */}
        <div className="h-32 flex items-end justify-between gap-2 mb-6 px-2 relative">
            {/* Background Grid */}
            <div className="absolute inset-0 border-b border-white/10 z-0" />
            
            {curve.map((count, i) => {
                const height = Math.min(100, (count / 12) * 100);
                return (
                    <div key={i} className="flex-1 flex flex-col justify-end items-center group relative z-10">
                        <div 
                            className="w-full bg-cyan-500/80 rounded-t-sm hover:bg-cyan-400 transition-all duration-300 relative"
                            style={{ height: `${height}%` }}
                        >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                {count}
                            </div>
                        </div>
                        <div className="text-[10px] text-zinc-500 mt-2 font-mono border-t border-transparent group-hover:border-cyan-500/50 group-hover:text-cyan-400">
                            {i+1}{i===5 ? "+" : ""}
                        </div>
                    </div>
                )
            })}
        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-6 gap-2 mb-6">
            {curve.map((count, i) => (
                <div key={i} className="flex flex-col gap-1">
                    <button onClick={() => updateCurve(i, count+1)} className="bg-violet-900/50 hover:bg-violet-800 text-violet-200 text-[10px] rounded h-6">+</button>
                    <button onClick={() => updateCurve(i, count-1)} className="bg-black/50 hover:bg-black/80 text-zinc-500 text-[10px] rounded h-6">-</button>
                </div>
            ))}
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-3 rounded border border-white/5 flex flex-col">
                <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1 flex items-center gap-1">
                    <Calculator size={10} /> Avg Cost
                </div>
                <div className="text-xl font-mono font-bold text-cyan-400">
                    {isNaN(avgCost) ? "0.0" : avgCost.toFixed(2)}
                </div>
            </div>
            <div className="bg-black/30 p-3 rounded border border-white/5 flex flex-col">
                <div className="text-[10px] text-zinc-400 uppercase font-bold mb-1 flex items-center gap-1">
                    <Sparkles size={10} /> Consistency
                </div>
                <div className={`text-xl font-mono font-bold ${consistency > 0.85 ? "text-green-400" : consistency > 0.7 ? "text-yellow-400" : "text-red-400"}`}>
                    {(consistency * 100).toFixed(0)}%
                </div>
            </div>
        </div>
        
        <p className="mt-4 text-[10px] text-violet-300/50 text-center">
            *Probability of finding a 1 or 2 cost card in opening hand.
        </p>

    </div>
  );
}