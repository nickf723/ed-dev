"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';

export default function RhythmSequencerLab() {
  const [playing, setPlaying] = useState(false);
  const [step, setStep] = useState(0);
  const [bpm, setBpm] = useState(120);

  // 3 Tracks, 16 Steps
  // 0: Kick, 1: Snare, 2: Hat
  const [grid, setGrid] = useState([
    [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick (Four on the floor)
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare (Backbeat)
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Hat (Eighths)
  ]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (playing) {
      const msPerBeat = (60000 / bpm) / 4; // 16th notes
      interval = setInterval(() => {
        setStep(s => (s + 1) % 16);
      }, msPerBeat);
    }
    return () => clearInterval(interval);
  }, [playing, bpm]);

  const toggleCell = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = newGrid[row][col] ? 0 : 1;
    setGrid(newGrid);
  };

  const tracks = [
    { name: "Kick", color: "bg-teal-500", active: "bg-teal-400 shadow-[0_0_10px_#2dd4bf]" },
    { name: "Snare", color: "bg-rose-500", active: "bg-rose-400 shadow-[0_0_10px_#f43f5e]" },
    { name: "Hat", color: "bg-yellow-500", active: "bg-yellow-400 shadow-[0_0_10px_#eab308]" },
  ];

  return (
    <div className="w-full bg-slate-900/90 border border-teal-500/20 rounded-2xl backdrop-blur-md overflow-hidden flex flex-col">
      <div className="p-4 bg-black/20 border-b border-white/5 flex justify-between items-center">
        <h3 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
            <Clock className="text-teal-400" size={16} /> Step Sequencer (16th Notes)
        </h3>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>{bpm} BPM</span>
                <input 
                    type="range" min="60" max="180" value={bpm} 
                    onChange={(e) => setBpm(parseInt(e.target.value))}
                    className="w-20 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
                />
            </div>
            <button onClick={() => setPlaying(!playing)} className="text-white hover:text-teal-400 transition-colors">
                {playing ? <Pause size={18} /> : <Play size={18} />}
            </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex flex-col gap-2">
            {grid.map((row, r) => (
                <div key={r} className="flex gap-2 items-center">
                    <div className="w-12 text-[10px] font-bold text-slate-500 uppercase text-right mr-2">{tracks[r].name}</div>
                    {row.map((active, c) => {
                        const isCurrent = step === c;
                        const isBeat = c % 4 === 0; // Strong beat marker
                        
                        return (
                            <div 
                                key={c}
                                onClick={() => toggleCell(r, c)}
                                className={`
                                    relative flex-1 h-8 rounded cursor-pointer transition-all duration-75
                                    ${active ? tracks[r].color : 'bg-slate-800'}
                                    ${isCurrent ? 'brightness-150 scale-105 z-10' : ''}
                                    ${!active && isBeat ? 'border-l border-white/20' : ''}
                                `}
                            >
                                {isCurrent && <div className="absolute inset-0 border-2 border-white rounded opacity-50" />}
                            </div>
                        )
                    })}
                </div>
            ))}
        </div>

        {/* Playhead Markers */}
        <div className="flex gap-2 mt-2 ml-14">
             {Array.from({ length: 16 }).map((_, i) => (
                 <div key={i} className={`flex-1 text-center text-[8px] font-mono ${i % 4 === 0 ? 'text-white font-bold' : 'text-slate-600'}`}>
                     {i % 4 === 0 ? (i/4)+1 : '•'}
                 </div>
             ))}
        </div>
      </div>
    </div>
  );
}