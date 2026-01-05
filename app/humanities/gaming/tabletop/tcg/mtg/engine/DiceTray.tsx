"use client";
import { useState } from "react";
import { Dices, X } from "lucide-react";

export default function DiceTray({ onClose }: { onClose: () => void }) {
    const [result, setResult] = useState<number | null>(null);
    const [rolling, setRolling] = useState(false);

    const roll = (sides: number) => {
        setRolling(true);
        setResult(null);
        
        // Simple animation simulation
        let i = 0;
        const interval = setInterval(() => {
            setResult(Math.ceil(Math.random() * sides));
            i++;
            if (i > 10) {
                clearInterval(interval);
                setRolling(false);
            }
        }, 50);
    };

    return (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center" onClick={onClose}>
            <div className="bg-[#1c1917] border border-[#b45309] p-8 rounded-xl w-64 shadow-2xl flex flex-col items-center gap-6 animate-in zoom-in-95" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between w-full text-[#fbbf24] font-bold uppercase tracking-widest text-xs">
                    <span>Dice Tray</span>
                    <button onClick={onClose}><X size={14}/></button>
                </div>

                {/* Result Display */}
                <div className="w-24 h-24 bg-black rounded-xl border-2 border-zinc-700 flex items-center justify-center relative overflow-hidden group">
                    <div className={`text-4xl font-black text-white font-mono ${rolling ? "blur-sm opacity-50" : "scale-110"}`}>
                        {result ?? "?"}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-2 w-full">
                    <button onClick={() => roll(6)} disabled={rolling} className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded font-bold border border-white/5 flex flex-col items-center">
                        <span className="text-xs text-zinc-500">D6</span>
                    </button>
                    <button onClick={() => roll(20)} disabled={rolling} className="flex-1 py-3 bg-[#b45309] hover:bg-[#d97706] text-white rounded font-bold border border-white/5 flex flex-col items-center">
                        <span className="text-xs text-orange-200">D20</span>
                    </button>
                </div>
            </div>
        </div>
    );
}