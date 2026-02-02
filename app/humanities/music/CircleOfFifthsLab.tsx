"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';

export default function CircleOfFifthsLab() {
  const [activeKey, setActiveKey] = useState(0); // 0 = C

  const keys = [
    { note: "C", minor: "a", sharps: 0 },
    { note: "G", minor: "e", sharps: 1 },
    { note: "D", minor: "b", sharps: 2 },
    { note: "A", minor: "f#", sharps: 3 },
    { note: "E", minor: "c#", sharps: 4 },
    { note: "B", minor: "g#", sharps: 5 },
    { note: "F#", minor: "d#", sharps: 6 },
    { note: "Db", minor: "bb", sharps: -5 },
    { note: "Ab", minor: "f", sharps: -4 },
    { note: "Eb", minor: "c", sharps: -3 },
    { note: "Bb", minor: "g", sharps: -2 },
    { note: "F", minor: "d", sharps: -1 },
  ];

  // Helper to get index with wrap-around
  const getIdx = (i: number) => (i + keys.length) % keys.length;

  const current = keys[activeKey];
  const dominant = keys[getIdx(activeKey + 1)];
  const subdominant = keys[getIdx(activeKey - 1)];

  return (
    <div className="w-full bg-slate-900/90 border border-amber-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row h-[500px]">
      
      {/* LEFT: THE CIRCLE */}
      <div className="w-full md:w-1/2 p-8 relative flex items-center justify-center bg-black/20">
        <div className="relative w-64 h-64">
           {/* Center Info */}
           <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 pointer-events-none">
              <span className="text-4xl font-black text-white">{current.note}</span>
              <span className="text-sm font-mono text-amber-400 mt-1">{current.minor} min</span>
              <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">
                {current.sharps > 0 ? `${current.sharps} Sharps` : current.sharps < 0 ? `${Math.abs(current.sharps)} Flats` : 'Natural'}
              </span>
           </div>

           {/* Keys Ring */}
           {keys.map((k, i) => {
             const angle = (i * 30 - 90) * (Math.PI / 180);
             const x = 50 + 40 * Math.cos(angle);
             const y = 50 + 40 * Math.sin(angle);
             
             const isActive = i === activeKey;
             const isNeighbor = i === getIdx(activeKey + 1) || i === getIdx(activeKey - 1);

             return (
               <button
                 key={k.note}
                 onClick={() => setActiveKey(i)}
                 className={`absolute w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 -ml-5 -mt-5 ${isActive ? 'bg-amber-500 text-black scale-110 z-20 shadow-[0_0_20px_rgba(251,191,36,0.6)]' : isNeighbor ? 'bg-slate-700 text-white border border-amber-500/50' : 'bg-slate-800 text-slate-500 hover:bg-slate-700'}`}
                 // FIX: Use .toFixed(3) to prevent hydration mismatch due to float precision
                 style={{ left: `${x.toFixed(3)}%`, top: `${y.toFixed(3)}%` }}
               >
                 {k.note}
               </button>
             );
           })}
           
           {/* Inner Ring (Minors) - Visual decoration mainly */}
           <div className="absolute inset-8 rounded-full border border-white/5 pointer-events-none" />
        </div>
      </div>

      {/* RIGHT: THE ANALYSIS */}
      <div className="w-full md:w-1/2 p-6 flex flex-col justify-center border-l border-white/5">
        <div className="mb-6 flex items-center gap-2 text-amber-400 font-bold uppercase text-xs tracking-wider">
            <RotateCw size={14} /> Harmonic Function
        </div>

        <div className="space-y-4">
            <ChordCard role="I - Tonic" chord={current.note} desc="Home. Stable. The key center." color="bg-amber-500 text-black" />
            <ChordCard role="IV - Subdominant" chord={subdominant.note} desc="Moving away from home. Creates tension." color="bg-slate-700 border border-amber-500/30 text-white" />
            <ChordCard role="V - Dominant" chord={dominant.note} desc="Maximum tension. Pulls strongly back to I." color="bg-slate-700 border border-amber-500/30 text-white" />
        </div>

        <div className="mt-8 p-4 bg-black/40 rounded-xl border border-white/5 text-center">
            <div className="text-[10px] text-slate-500 uppercase font-bold mb-2">Common Progression (I-IV-V)</div>
            <div className="flex justify-center gap-4 text-xl font-mono font-bold text-white">
                <span>{current.note}</span>
                <span className="text-slate-600">→</span>
                <span>{subdominant.note}</span>
                <span className="text-slate-600">→</span>
                <span>{dominant.note}</span>
                <span className="text-slate-600">→</span>
                <span>{current.note}</span>
            </div>
        </div>
      </div>
    </div>
  );
}

function ChordCard({ role, chord, desc, color }: any) {
    return (
        <div className={`p-4 rounded-xl flex items-center justify-between ${color}`}>
            <div>
                <div className="text-[10px] uppercase font-bold opacity-80">{role}</div>
                <div className="text-2xl font-black">{chord} Major</div>
            </div>
            <div className="text-[10px] w-32 text-right opacity-80 leading-tight">
                {desc}
            </div>
        </div>
    )
}