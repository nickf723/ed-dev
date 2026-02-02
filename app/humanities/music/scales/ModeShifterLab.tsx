"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Music, Info } from 'lucide-react';

export default function ModeShifterLab() {
  const [modeIndex, setModeIndex] = useState(3); // Start at Ionian (Major)

  // Modes ordered by Brightness (Bright -> Dark)
  // Lydian (#4) -> Ionian (Major) -> Mixolydian (b7) -> Dorian (b3, b7) -> Aeolian (b3, b6, b7) -> Phrygian (b2, b3, b6, b7) -> Locrian (b2, b3, b5, b6, b7)
  const modes = [
    { name: "Lydian", mood: "Dreamy, Heavenly", formula: "1 2 3 #4 5 6 7", intervals: [0, 2, 4, 6, 7, 9, 11], color: "text-teal-300", bg: "bg-teal-500" },
    { name: "Ionian (Major)", mood: "Happy, Stable", formula: "1 2 3 4 5 6 7", intervals: [0, 2, 4, 5, 7, 9, 11], color: "text-emerald-300", bg: "bg-emerald-500" },
    { name: "Mixolydian", mood: "Bluesy, Rock", formula: "1 2 3 4 5 6 b7", intervals: [0, 2, 4, 5, 7, 9, 10], color: "text-yellow-300", bg: "bg-yellow-500" },
    { name: "Dorian", mood: "Soulful, Jazzy", formula: "1 2 b3 4 5 6 b7", intervals: [0, 2, 3, 5, 7, 9, 10], color: "text-orange-300", bg: "bg-orange-500" },
    { name: "Aeolian (Minor)", mood: "Sad, Serious", formula: "1 2 b3 4 5 b6 b7", intervals: [0, 2, 3, 5, 7, 8, 10], color: "text-rose-300", bg: "bg-rose-500" },
    { name: "Phrygian", mood: "Exotic, Spanish", formula: "1 b2 b3 4 5 b6 b7", intervals: [0, 1, 3, 5, 7, 8, 10], color: "text-purple-300", bg: "bg-purple-500" },
    { name: "Locrian", mood: "Evil, Unstable", formula: "1 b2 b3 4 b5 b6 b7", intervals: [0, 1, 3, 5, 6, 8, 10], color: "text-slate-300", bg: "bg-slate-500" },
  ];

  const current = modes[modeIndex];

  return (
    <div className="w-full bg-slate-900/90 border border-teal-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <SlidersHorizontal className="text-teal-400" size={16} /> Mode Spectrum
        </h3>
        <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-slate-500">
            <span>Bright</span>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-400 to-slate-700 rounded-full" />
            <span>Dark</span>
        </div>
      </div>

      <div className="p-8">
        
        {/* SLIDER CONTROL */}
        <div className="mb-10 px-4">
            <input 
                type="range" min="0" max="6" step="1"
                value={modeIndex}
                onChange={(e) => setModeIndex(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
            />
            <div className="flex justify-between mt-2 text-[9px] uppercase font-mono text-slate-500">
                <span>Lydian</span>
                <span>Ionian</span>
                <span>Mixo</span>
                <span>Dorian</span>
                <span>Aeolian</span>
                <span>Phryg</span>
                <span>Locrian</span>
            </div>
        </div>

        {/* PIANO VISUALIZER */}
        <div className="relative h-24 w-full max-w-lg mx-auto bg-black/40 rounded-xl border-t-4 border-slate-800 flex justify-center overflow-hidden mb-8">
            {Array.from({ length: 14 }).map((_, i) => {
                const noteIndex = i % 12;
                const isBlack = [1, 3, 6, 8, 10].includes(noteIndex);
                const isActive = current.intervals.includes(noteIndex);

                if (isBlack) return null;
                
                return (
                    <div key={i} className={`relative flex-1 bg-white border-r border-slate-300 rounded-b-md ${isActive ? 'bg-teal-50' : 'opacity-80'}`}>
                        {isActive && (
                            <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                                <div className={`w-2 h-2 rounded-full ${current.bg}`} />
                            </div>
                        )}
                    </div>
                )
            })}
             {/* Black Keys Overlay */}
             {[1, 3, 6, 8, 10].map((idx) => (
                 <BlackKey key={idx} index={idx} active={current.intervals.includes(idx)} color={current.bg} />
             ))}
        </div>

        {/* INFO CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl border border-white/10 bg-slate-950/50 flex flex-col justify-center`}>
                <h4 className={`text-2xl font-black ${current.color} mb-1`}>{current.name}</h4>
                <p className="text-sm text-slate-300 font-medium">{current.mood}</p>
            </div>
            <div className="p-4 rounded-xl border border-white/5 bg-slate-900 flex flex-col justify-center items-center">
                <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Interval Formula</div>
                <div className="font-mono text-lg text-white tracking-widest">
                    {current.formula.split(' ').map((char, i) => (
                        <span key={i} className={char.includes('b') || char.includes('#') ? current.color : 'text-slate-400'}>
                            {char}{' '}
                        </span>
                    ))}
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}

function BlackKey({ index, active, color }: any) {
    // Correct positioning for black keys
    const positions: {[key: number]: string} = { 1: 'left-[10%]', 3: 'left-[24%]', 6: 'left-[53%]', 8: 'left-[67%]', 10: 'left-[81%]' };
    
    return (
        <div className={`absolute top-0 w-[6%] h-[60%] bg-slate-900 rounded-b-sm z-10 ${positions[index]} ${active ? 'border-b-4 border-teal-500' : ''}`}>
             {active && <div className={`absolute bottom-2 left-0 right-0 w-1 h-1 rounded-full mx-auto ${color}`} />}
        </div>
    )
}