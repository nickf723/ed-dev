"use client";
import { useState } from "react";
import { Layers, ArrowUp, ArrowDown, Zap, XCircle, CheckCircle2 } from "lucide-react";

type Spell = {
    id: number;
    name: string;
    type: "Instant" | "Sorcery" | "Creature";
    color: string;
};

const SAMPLE_SPELLS: Spell[] = [
    { id: 1, name: "Lightning Bolt", type: "Instant", color: "text-red-500 border-red-500" },
    { id: 2, name: "Counterspell", type: "Instant", color: "text-blue-500 border-blue-500" },
    { id: 3, name: "Giant Growth", type: "Instant", color: "text-green-500 border-green-500" },
    { id: 4, name: "Doom Blade", type: "Instant", color: "text-purple-500 border-purple-500" },
];

export default function TheStack() {
  const [stack, setStack] = useState<Spell[]>([]);
  const [resolvedLog, setResolvedLog] = useState<string[]>([]);

  const castSpell = (spell: Spell) => {
      const newSpell = { ...spell, id: Date.now() }; // Unique ID
      setStack(prev => [newSpell, ...prev]); // Add to TOP (front of array)
  };

  const resolveTop = () => {
      if (stack.length === 0) return;
      const [top, ...rest] = stack;
      setStack(rest);
      setResolvedLog(prev => [`Resolved: ${top.name}`, ...prev].slice(0, 3));
  };

  return (
    <div className="bg-[#1c1917] border-2 border-[#b45309] rounded-xl p-6 shadow-2xl w-full max-w-md relative overflow-hidden font-serif">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-[#fcd34d] flex items-center gap-2 tracking-wider text-sm font-sans">
                <Layers size={18} /> THE_STACK
            </h3>
            <div className="text-[10px] font-bold font-mono px-2 py-1 rounded bg-[#b45309]/20 text-[#fcd34d] border border-[#b45309]">
                LIFO SYSTEM
            </div>
        </div>

        {/* THE STACK VISUALIZATION */}
        <div className="min-h-[200px] flex flex-col justify-end gap-2 mb-6 relative">
            
            {/* Empty State */}
            {stack.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-700 text-xs font-mono uppercase tracking-widest border-2 border-dashed border-zinc-800 rounded">
                    Stack is Empty
                </div>
            )}

            {/* Stack Items */}
            {stack.map((spell, index) => (
                <div 
                    key={spell.id}
                    className={`
                        bg-zinc-900 border-l-4 p-3 rounded shadow-lg flex justify-between items-center animate-in slide-in-from-top duration-300
                        ${spell.color}
                        ${index === 0 ? "scale-105 border-white ring-1 ring-white/20 z-10" : "opacity-60 scale-95"}
                    `}
                >
                    <div>
                        <div className="font-bold text-sm text-white">{spell.name}</div>
                        <div className="text-[10px] text-zinc-500 uppercase">{spell.type}</div>
                    </div>
                    {index === 0 && <span className="text-[10px] text-white bg-red-600 px-1 rounded animate-pulse">ACTIVE</span>}
                </div>
            ))}
        </div>

        {/* CONTROLS */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            
            {/* Hand (Cast) */}
            <div className="space-y-2">
                <div className="text-[10px] text-zinc-500 uppercase font-bold text-center">Cast Spells (Push)</div>
                <div className="grid grid-cols-2 gap-2">
                    {SAMPLE_SPELLS.map(s => (
                        <button 
                            key={s.id} onClick={() => castSpell(s)}
                            className={`px-2 py-2 text-[10px] font-bold border rounded bg-zinc-900 hover:bg-zinc-800 transition-colors ${s.color}`}
                        >
                            {s.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Resolution (Pop) */}
            <div className="flex flex-col gap-2">
                <div className="text-[10px] text-zinc-500 uppercase font-bold text-center">Resolution (Pop)</div>
                <button 
                    onClick={resolveTop}
                    disabled={stack.length === 0}
                    className="flex-1 bg-[#b45309] hover:bg-[#d97706] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded flex flex-col items-center justify-center gap-1 transition-all active:translate-y-1"
                >
                    <ArrowDown size={20} />
                    RESOLVE TOP
                </button>
            </div>

        </div>

        {/* LOG */}
        <div className="h-16 bg-black/40 rounded border border-white/5 p-2 overflow-hidden flex flex-col justify-end">
            {resolvedLog.map((log, i) => (
                <div key={i} className="text-[10px] font-mono text-green-400/70 flex items-center gap-2">
                    <CheckCircle2 size={10} /> {log}
                </div>
            ))}
        </div>

    </div>
  );
}