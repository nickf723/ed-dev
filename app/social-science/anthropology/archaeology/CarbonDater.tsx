"use client";
import { useState } from "react";
import { M } from "@/components/Math";
import { Timer, Atom } from "lucide-react";

export default function CarbonDater() {
  const [years, setYears] = useState(0);
  const halfLife = 5730; // C-14
  
  // Calculate remaining Carbon-14
  // N(t) = 100 * (0.5)^(t / halfLife)
  const percentage = 100 * Math.pow(0.5, years / halfLife);

  return (
    <div className="bg-[#292524] border border-[#a8a29e] rounded-xl p-6 shadow-2xl max-w-sm rotate-1">
        
        {/* Tape/Label Effect */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#f5f5f4] text-black px-4 py-1 text-xs font-bold font-mono tracking-widest shadow-sm transform -rotate-1">
            LAB SAMPLE #844
        </div>

        <div className="flex items-center gap-2 mb-6 mt-2">
            <Atom size={20} className="text-amber-500" />
            <h3 className="font-bold text-[#e7e5e4] font-serif">Radiocarbon Dating</h3>
        </div>

        {/* VISUALIZER */}
        <div className="mb-6 relative">
             <div className="flex justify-between text-[10px] font-mono text-stone-500 mb-1">
                 <span>PARENT (C-14)</span>
                 <span>DAUGHTER (N-14)</span>
             </div>
             <div className="h-8 w-full bg-stone-800 rounded border border-stone-600 overflow-hidden relative flex">
                 {/* Carbon 14 Bar */}
                 <div 
                    className="h-full bg-amber-600 transition-all duration-300 flex items-center justify-center text-[10px] font-bold text-black"
                    style={{ width: `${percentage}%` }}
                 >
                    {percentage > 20 && `${percentage.toFixed(1)}%`}
                 </div>
                 {/* Nitrogen 14 Bar */}
                 <div className="flex-1 bg-stone-700 h-full flex items-center justify-center text-[10px] text-stone-400">
                    {(100 - percentage).toFixed(1)}%
                 </div>
             </div>
        </div>

        {/* CONTROLS */}
        <div className="space-y-4">
             <div className="flex justify-between items-end">
                 <div className="text-xs text-stone-400 font-mono">ELAPSED TIME</div>
                 <div className="text-xl font-bold text-amber-500 font-mono">{years.toLocaleString()} <span className="text-xs">yrs</span></div>
             </div>
             
             <input 
                type="range" min="0" max="25000" step="100"
                value={years} onChange={(e) => setYears(parseInt(e.target.value))}
                className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-600"
             />
             
             <div className="flex justify-between text-[10px] text-stone-600 font-mono">
                 <span>Present</span>
                 <span>1 Half-Life</span>
                 <span>~4 Half-Lives</span>
             </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-700 text-center">
             <div className="text-xs text-stone-500 mb-1">DECAY EQUATION</div>
             <div className="text-lg font-serif text-[#d6d3d1]">
                 <M>{"N(t) = N_0 \\left(\\frac{1}{2}\\right)^{\\frac{t}{5730}}"}</M>
             </div>
        </div>

    </div>
  );
}