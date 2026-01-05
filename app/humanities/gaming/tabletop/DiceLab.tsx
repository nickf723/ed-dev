"use client";
import { useState } from "react";
import { Dices, RefreshCw, Hexagon, Triangle, Square, Circle } from "lucide-react";

type DiceType = "d4" | "d6" | "d8" | "d10" | "d12" | "d20";
type Roll = { id: number; type: DiceType; value: number; max: number };

export default function DiceLab() {
  const [rolls, setRolls] = useState<Roll[]>([]);
  const [history, setHistory] = useState<number[]>([]);

  const addDie = (type: DiceType, max: number) => {
      const value = Math.ceil(Math.random() * max);
      const newRoll = { id: Date.now(), type, value, max };
      setRolls(prev => [...prev, newRoll]);
  };

  const clear = () => {
      if (rolls.length > 0) {
          const total = rolls.reduce((acc, r) => acc + r.value, 0);
          setHistory(prev => [total, ...prev].slice(0, 5));
      }
      setRolls([]);
  };

  const reroll = () => {
      setRolls(prev => prev.map(r => ({ ...r, value: Math.ceil(Math.random() * r.max) })));
  };

  const total = rolls.reduce((acc, r) => acc + r.value, 0);

  // Icon Helper
  const DieIcon = ({ type }: { type: DiceType }) => {
      switch(type) {
          case 'd4': return <Triangle size={16} className="text-emerald-400" />;
          case 'd6': return <Square size={16} className="text-blue-400" />;
          case 'd8': return <Triangle size={16} className="rotate-180 text-purple-400" />; // Octahedron-ish
          case 'd10': return <span className="font-bold text-[10px] text-red-400">D10</span>;
          case 'd12': return <Circle size={16} className="text-orange-400" />; // Dodecahedron approx
          case 'd20': return <Hexagon size={16} className="text-yellow-400" />;
          default: return <Square size={16} />;
      }
  };

  return (
    <div className="bg-[#1a1412] border border-emerald-800/50 rounded-xl p-6 shadow-2xl w-full max-w-md relative font-serif">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-emerald-500 flex items-center gap-2 tracking-wider font-sans text-sm">
                <Dices size={18} /> THE_DICE_LAB
            </h3>
            <div className="flex gap-2">
                 {history.map((h, i) => (
                     <span key={i} className="text-xs text-white/20 font-mono">{h}</span>
                 ))}
            </div>
        </div>

        {/* Dice Tray */}
        <div className="min-h-[120px] bg-[#0f2e1b] rounded-lg border-4 border-[#2e2315] p-4 mb-6 shadow-inner relative flex flex-wrap content-center justify-center gap-3">
            {/* Felt Texture */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />
            
            {rolls.length === 0 && (
                <span className="text-emerald-800/50 text-sm font-sans font-bold uppercase tracking-widest select-none">Empty Tray</span>
            )}

            {rolls.map((roll) => (
                <div key={roll.id} className="relative group animate-bounce-short">
                    <div className={`
                        w-12 h-12 flex items-center justify-center rounded-lg border-2 shadow-lg
                        ${roll.value === roll.max ? "bg-yellow-900/80 border-yellow-500 text-yellow-400" : "bg-black/40 border-emerald-700/50 text-white"}
                        ${roll.value === 1 ? "bg-red-900/50 border-red-500/50 text-red-400" : ""}
                    `}>
                        <span className="text-xl font-bold">{roll.value}</span>
                    </div>
                    {/* Tooltip Label */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[9px] text-white/30 uppercase font-sans opacity-0 group-hover:opacity-100 transition-opacity">
                        {roll.type}
                    </div>
                </div>
            ))}
        </div>

        {/* Total Display */}
        <div className="flex justify-between items-center mb-6 px-4 py-2 bg-black/30 rounded border border-white/5">
            <span className="text-xs text-zinc-500 font-sans uppercase font-bold">Total Result</span>
            <span className="text-2xl font-bold text-white">{total}</span>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-6 gap-2 mb-4">
            <button onClick={() => addDie('d4', 4)} className="bg-[#2a2522] hover:bg-[#3f3833] h-10 rounded flex items-center justify-center border-b-2 border-emerald-900 transition-all active:border-b-0 active:translate-y-[2px]"><DieIcon type="d4"/></button>
            <button onClick={() => addDie('d6', 6)} className="bg-[#2a2522] hover:bg-[#3f3833] h-10 rounded flex items-center justify-center border-b-2 border-emerald-900 transition-all active:border-b-0 active:translate-y-[2px]"><DieIcon type="d6"/></button>
            <button onClick={() => addDie('d8', 8)} className="bg-[#2a2522] hover:bg-[#3f3833] h-10 rounded flex items-center justify-center border-b-2 border-emerald-900 transition-all active:border-b-0 active:translate-y-[2px]"><DieIcon type="d8"/></button>
            <button onClick={() => addDie('d10', 10)} className="bg-[#2a2522] hover:bg-[#3f3833] h-10 rounded flex items-center justify-center border-b-2 border-emerald-900 transition-all active:border-b-0 active:translate-y-[2px]"><DieIcon type="d10"/></button>
            <button onClick={() => addDie('d12', 12)} className="bg-[#2a2522] hover:bg-[#3f3833] h-10 rounded flex items-center justify-center border-b-2 border-emerald-900 transition-all active:border-b-0 active:translate-y-[2px]"><DieIcon type="d12"/></button>
            <button onClick={() => addDie('d20', 20)} className="bg-[#2a2522] hover:bg-[#3f3833] h-10 rounded flex items-center justify-center border-b-2 border-emerald-900 transition-all active:border-b-0 active:translate-y-[2px]"><DieIcon type="d20"/></button>
        </div>

        <div className="flex gap-2">
            <button onClick={reroll} className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-600 text-white font-bold font-sans text-xs rounded shadow-lg flex items-center justify-center gap-2">
                <RefreshCw size={14} /> REROLL
            </button>
            <button onClick={clear} className="px-4 py-2 bg-red-900/50 hover:bg-red-900/80 text-red-200 font-bold font-sans text-xs rounded border border-red-900">
                CLEAR
            </button>
        </div>

    </div>
  );
}