"use client";
import { useState } from "react";
import { Music, Mic2 } from "lucide-react";

const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export default function HarmonyEngine() {
  const [root, setRoot] = useState(0); // Index in NOTES (0 = C)
  const [mode, setMode] = useState<"Major" | "Minor">("Major");

  // Calculate Intervals
  // Major: Root, +4 (Major 3rd), +7 (Perfect 5th)
  // Minor: Root, +3 (Minor 3rd), +7 (Perfect 5th)
  const getChordIndices = () => {
      const third = mode === "Major" ? 4 : 3;
      const fifth = 7;
      return [root, (root + third) % 12, (root + fifth) % 12];
  };

  const activeIndices = getChordIndices();

  return (
    <div className="bg-slate-900/90 border border-amber-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl max-w-md mx-auto">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-amber-100 flex items-center gap-2 font-serif tracking-wider">
                <Music size={18} className="text-amber-500" /> HARMONY ENGINE
            </h3>
            <div className="flex gap-1 bg-black/40 p-1 rounded-lg">
                <button 
                    onClick={() => setMode("Major")}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${mode === "Major" ? "bg-amber-600 text-white" : "text-slate-500 hover:text-white"}`}
                >
                    MAJ
                </button>
                <button 
                    onClick={() => setMode("Minor")}
                    className={`px-3 py-1 rounded text-xs font-bold transition-colors ${mode === "Minor" ? "bg-indigo-600 text-white" : "text-slate-500 hover:text-white"}`}
                >
                    MIN
                </button>
            </div>
        </div>

        {/* ROOT SELECTOR */}
        <div className="flex justify-between mb-6 overflow-x-auto pb-2">
            {NOTES.map((note, i) => (
                <button
                    key={note}
                    onClick={() => setRoot(i)}
                    className={`
                        w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all
                        ${root === i 
                            ? "bg-amber-500 text-black scale-110 shadow-[0_0_15px_rgba(245,158,11,0.5)]" 
                            : "bg-slate-800 text-slate-500 hover:bg-slate-700"
                        }
                    `}
                >
                    {note}
                </button>
            ))}
        </div>

        {/* PIANO ROLL VISUALIZER */}
        <div className="relative h-32 w-full flex rounded-lg overflow-hidden border-t-4 border-slate-800 bg-black shadow-inner">
            {/* White Keys */}
            {["C", "D", "E", "F", "G", "A", "B", "C2"].map((note, i) => {
                // Map visualization note name back to index 0-11 for checking
                // Simplified mapping for demo visual only
                const noteIndex = i === 7 ? 0 : [0, 2, 4, 5, 7, 9, 11][i]; 
                const isActive = activeIndices.includes(noteIndex);
                
                return (
                    <div 
                        key={i} 
                        className={`flex-1 border-r border-slate-300 rounded-b-md relative transition-colors duration-300
                            ${isActive ? "bg-amber-100/90 shadow-[0_0_20px_inset_rgba(245,158,11,0.5)]" : "bg-slate-100"}
                        `}
                    >
                        {isActive && (
                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-amber-600 animate-bounce" />
                        )}
                    </div>
                );
            })}
            
            {/* Black Keys (Absolute positioned overlays) */}
            {/* C# D# - F# G# A# */}
            <div className={`absolute top-0 h-20 w-[10%] left-[8%] rounded-b-sm z-10 border border-slate-700 ${activeIndices.includes(1) ? "bg-amber-700" : "bg-slate-900"}`} />
            <div className={`absolute top-0 h-20 w-[10%] left-[22%] rounded-b-sm z-10 border border-slate-700 ${activeIndices.includes(3) ? "bg-amber-700" : "bg-slate-900"}`} />
            
            <div className={`absolute top-0 h-20 w-[10%] left-[48%] rounded-b-sm z-10 border border-slate-700 ${activeIndices.includes(6) ? "bg-amber-700" : "bg-slate-900"}`} />
            <div className={`absolute top-0 h-20 w-[10%] left-[62%] rounded-b-sm z-10 border border-slate-700 ${activeIndices.includes(8) ? "bg-amber-700" : "bg-slate-900"}`} />
            <div className={`absolute top-0 h-20 w-[10%] left-[76%] rounded-b-sm z-10 border border-slate-700 ${activeIndices.includes(10) ? "bg-amber-700" : "bg-slate-900"}`} />
        </div>

        <div className="mt-6 text-center">
            <div className="text-2xl font-black text-white font-serif tracking-widest">
                {NOTES[root]} {mode}
            </div>
            <div className="text-xs text-amber-500/60 font-mono mt-1">
                {activeIndices.map(i => NOTES[i]).join(" - ")}
            </div>
        </div>

    </div>
  );
}