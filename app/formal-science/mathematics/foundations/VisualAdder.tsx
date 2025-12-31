"use client";
import { useState } from "react";
import { Plus, Equal, RefreshCw, Calculator } from "lucide-react";

export default function VisualAdder() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);

  return (
    <div className="bg-zinc-900/80 border border-yellow-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-sm">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-yellow-100 flex items-center gap-2 font-mono tracking-wider">
                <Calculator size={18} className="text-yellow-500" /> VISUAL_ADDER
            </h3>
            <div className="text-[10px] font-mono text-yellow-500/50">ARITHMETIC.MOD</div>
        </div>

        {/* INPUTS */}
        <div className="flex items-center justify-center gap-4 mb-8">
            <div className="flex flex-col items-center gap-2">
                <input 
                    type="number" min="0" max="9"
                    value={a} onChange={(e) => setA(Math.min(9, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-16 h-16 bg-black border-2 border-cyan-500 rounded-xl text-center text-3xl font-bold text-white focus:outline-none focus:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all"
                />
                <span className="text-[10px] text-cyan-500 font-mono uppercase">Term A</span>
            </div>
            
            <Plus size={32} className="text-zinc-600" />

            <div className="flex flex-col items-center gap-2">
                <input 
                    type="number" min="0" max="9"
                    value={b} onChange={(e) => setB(Math.min(9, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-16 h-16 bg-black border-2 border-magenta-500 rounded-xl text-center text-3xl font-bold text-white focus:outline-none focus:border-pink-500 focus:shadow-[0_0_20px_rgba(236,72,153,0.3)] transition-all"
                />
                 <span className="text-[10px] text-pink-500 font-mono uppercase">Term B</span>
            </div>
        </div>

        {/* VISUALIZER */}
        <div className="bg-black/40 rounded-xl p-6 border border-white/5 relative overflow-hidden min-h-[120px] flex flex-col items-center justify-center gap-4">
            
            {/* The Units */}
            <div className="flex items-center gap-2 flex-wrap justify-center">
                {/* Group A */}
                {Array.from({ length: a }).map((_, i) => (
                    <div key={`a-${i}`} className="w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.5)] animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
                {/* Spacer if both exist */}
                {a > 0 && b > 0 && <div className="w-px h-8 bg-white/10 mx-2" />}
                {/* Group B */}
                {Array.from({ length: b }).map((_, i) => (
                    <div key={`b-${i}`} className="w-4 h-4 rounded-full bg-pink-500 shadow-[0_0_10px_rgba(236,72,153,0.5)] animate-bounce" style={{ animationDelay: `${(a+i) * 0.1}s` }} />
                ))}
            </div>

            {/* Result Line */}
            <div className="w-full h-px bg-white/10" />

            {/* Total */}
            <div className="flex items-center gap-3">
                <Equal size={20} className="text-zinc-500" />
                <span className="text-4xl font-black text-white">{a + b}</span>
            </div>

        </div>

        <p className="mt-4 text-[10px] text-zinc-500 text-center leading-relaxed">
            "Quantity" is the abstraction of distinct objects. <br/>Addition is the union of disjoint sets.
        </p>

    </div>
  );
}