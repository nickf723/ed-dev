"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, MapPin, Building2 } from 'lucide-react';

export default function IntegerElevatorLab() {
  const [currentFloor, setCurrentFloor] = useState(0);
  const [targetFloor, setTargetFloor] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const [mode, setMode] = useState<'add' | 'sub'>('add');
  const [val, setVal] = useState(1);

  const move = () => {
    let next = currentFloor;
    let opString = "";

    if (mode === 'add') {
        next += val; // e.g., -2 + (-3) = -5
        opString = `${currentFloor} + (${val}) = ${next}`;
    } else {
        next -= val; // e.g., -2 - (-3) = 1
        opString = `${currentFloor} - (${val}) = ${next}`;
    }

    // Clamp to building height (-5 to 5 for demo)
    if (next > 5) next = 5;
    if (next < -5) next = -5;

    setTargetFloor(next);
    setHistory(h => [opString, ...h].slice(0, 3));
    setTimeout(() => setCurrentFloor(next), 500); // Delay for visual effect
  };

  const floors = [5, 4, 3, 2, 1, 0, -1, -2, -3, -4, -5];

  return (
    <div className="w-full bg-slate-900/90 border border-slate-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col md:flex-row h-[500px]">
      
      {/* LEFT: CONTROLS */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/5">
         <div className="mb-8">
            <h3 className="font-bold text-white text-lg flex items-center gap-2">
                <Building2 className="text-teal-400" /> The Integer Tower
            </h3>
            <p className="text-sm text-slate-400 mt-2">
                Think of Integers as floors in a building. Zero is the lobby. Negatives are the basement.
            </p>
         </div>

         {/* Calculator Interface */}
         <div className="bg-black/40 p-6 rounded-xl border border-white/10 space-y-4">
             <div className="text-center font-mono text-xl text-white mb-4">
                 Start at <span className={currentFloor >= 0 ? "text-teal-400" : "text-red-400"}>{currentFloor}</span>
             </div>

             <div className="flex gap-2">
                 <button 
                    onClick={() => setMode('add')}
                    className={`flex-1 py-2 rounded font-bold uppercase transition-colors ${mode === 'add' ? 'bg-teal-500 text-black' : 'bg-slate-800 text-slate-400'}`}
                 >
                    Add (+)
                 </button>
                 <button 
                    onClick={() => setMode('sub')}
                    className={`flex-1 py-2 rounded font-bold uppercase transition-colors ${mode === 'sub' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-400'}`}
                 >
                    Subtract (-)
                 </button>
             </div>

             <div className="flex items-center gap-4">
                 <span className="text-sm text-slate-400 font-bold uppercase">Value:</span>
                 <input 
                    type="range" min="-5" max="5" step="1" 
                    value={val} onChange={(e) => setVal(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-white"
                 />
                 <span className={`w-8 text-center font-bold ${val >= 0 ? 'text-teal-400' : 'text-red-400'}`}>{val}</span>
             </div>

             <button 
                onClick={move}
                className="w-full py-3 mt-2 bg-white text-black font-black uppercase rounded hover:bg-slate-200 transition-colors"
             >
                Go
             </button>
         </div>

         {/* History Log */}
         <div className="mt-6 space-y-1 font-mono text-xs text-center text-slate-500">
             {history.map((h, i) => (
                 <div key={i}>{h}</div>
             ))}
         </div>
      </div>

      {/* RIGHT: THE ELEVATOR SHAFT */}
      <div className="w-full md:w-1/2 bg-slate-950 relative overflow-hidden flex justify-center">
         {/* Shaft Lines */}
         <div className="absolute inset-y-0 w-32 border-x border-white/10 bg-black/20" />
         
         {/* Floors */}
         <div className="absolute inset-0 flex flex-col justify-between py-8 pl-4">
            {floors.map(f => (
                <div key={f} className="flex items-center gap-4 h-8 relative z-0">
                    <span className={`text-xs font-mono w-6 text-right ${f === 0 ? 'text-white font-bold' : f > 0 ? 'text-teal-500/50' : 'text-red-500/50'}`}>
                        {f === 0 ? 'Lobby' : f}
                    </span>
                    <div className={`h-px flex-1 ${f === 0 ? 'bg-white/30' : 'bg-white/5'}`} />
                </div>
            ))}
         </div>

         {/* The Elevator Car */}
         <motion.div 
            className={`absolute w-24 h-20 rounded-lg border-2 z-10 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-sm ${currentFloor >= 0 ? 'bg-teal-500/20 border-teal-500 text-teal-300' : 'bg-red-500/20 border-red-500 text-red-300'}`}
            initial={false}
            animate={{ 
                y: (5 - currentFloor) * (500 / 12) + 20 // Rough calculation to map floor index to pixels
            }}
            transition={{ type: "spring", stiffness: 60, damping: 15 }}
         >
            <div className="text-2xl font-black">{currentFloor}</div>
         </motion.div>

      </div>
    </div>
  );
}