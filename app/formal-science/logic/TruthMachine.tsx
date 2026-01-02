"use client";
import { useState } from "react";
import { ToggleLeft, ToggleRight, Check, X, GitCommit } from "lucide-react";

export default function TruthMachine() {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);

  // Logic Gates
  const or = p || q;
  const and = p && q;
  const notAnd = !and;
  const result = or && notAnd; // XOR essentially

  // Helper for visualizing lines
  const Line = ({ active, vertical = false }: { active: boolean, vertical?: boolean }) => (
      <div className={`transition-colors duration-300 ${active ? "bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" : "bg-zinc-800"}`}
           style={{ width: vertical ? '2px' : '100%', height: vertical ? '100%' : '2px' }} 
      />
  );

  return (
    <div className="bg-zinc-900/90 border border-amber-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-md">
        
        <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-amber-100 flex items-center gap-2 font-serif tracking-widest">
                <GitCommit size={18} className="text-amber-500" /> TRUTH_MACHINE
            </h3>
            <div className="font-mono text-[10px] text-amber-500/50">PROPOSITION: (P ∨ Q) ∧ ¬(P ∧ Q)</div>
        </div>

        {/* INPUTS */}
        <div className="flex justify-between mb-4 px-4">
            <button onClick={() => setP(!p)} className="flex flex-col items-center gap-2 group">
                <div className={`text-2xl font-bold font-serif ${p ? "text-green-400" : "text-red-500"}`}>{p ? "T" : "F"}</div>
                <div className="text-xs font-mono text-zinc-500">INPUT P</div>
                {p ? <ToggleRight size={24} className="text-green-500"/> : <ToggleLeft size={24} className="text-zinc-600"/>}
            </button>
            <button onClick={() => setQ(!q)} className="flex flex-col items-center gap-2 group">
                <div className={`text-2xl font-bold font-serif ${q ? "text-green-400" : "text-red-500"}`}>{q ? "T" : "F"}</div>
                <div className="text-xs font-mono text-zinc-500">INPUT Q</div>
                {q ? <ToggleRight size={24} className="text-green-500"/> : <ToggleLeft size={24} className="text-zinc-600"/>}
            </button>
        </div>

        {/* CIRCUIT VISUALIZER */}
        <div className="relative h-40 bg-black/40 border border-white/5 rounded-lg mb-6 p-4 flex flex-col justify-between">
            
            {/* Layer 1: Gates */}
            <div className="flex justify-between items-center h-full relative z-10">
                {/* OR GATE */}
                <div className={`w-16 h-12 border-2 rounded flex items-center justify-center text-xs font-bold transition-all ${or ? "border-amber-500 text-amber-100 bg-amber-900/20" : "border-zinc-700 text-zinc-600"}`}>
                    OR (∨)
                </div>

                {/* FINAL AND GATE */}
                <div className={`w-16 h-12 border-2 rounded flex items-center justify-center text-xs font-bold transition-all ${result ? "border-green-500 text-green-100 bg-green-900/20" : "border-red-900 text-red-700 bg-red-950/20"}`}>
                    AND (∧)
                </div>

                {/* NAND GATE (Visualized as AND -> NOT) */}
                <div className={`w-16 h-12 border-2 rounded flex items-center justify-center text-xs font-bold transition-all ${notAnd ? "border-amber-500 text-amber-100 bg-amber-900/20" : "border-zinc-700 text-zinc-600"}`}>
                    NAND
                </div>
            </div>

            {/* Wires (Absolute positioning hacks for simple visualization) */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -z-0" />
            <div className={`absolute top-1/2 left-[20%] w-[20%] h-0.5 transition-colors ${or ? "bg-amber-500" : "bg-zinc-800"}`} />
            <div className={`absolute top-1/2 right-[20%] w-[20%] h-0.5 transition-colors ${notAnd ? "bg-amber-500" : "bg-zinc-800"}`} />

        </div>

        {/* RESULT */}
        <div className={`p-4 rounded-lg border flex items-center justify-between transition-all duration-500 ${result ? "bg-green-900/20 border-green-500/50" : "bg-red-900/20 border-red-500/50"}`}>
            <div className="text-xs font-mono text-zinc-400">CONCLUSION (Exclusive OR)</div>
            <div className={`text-xl font-bold flex items-center gap-2 ${result ? "text-green-400" : "text-red-400"}`}>
                {result ? <Check size={20} /> : <X size={20} />}
                {result ? "TRUE" : "FALSE"}
            </div>
        </div>

    </div>
  );
}