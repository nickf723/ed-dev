"use client";
import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Layers } from 'lucide-react';

// Disk Logic
type Disk = number; // size 1-5
type Tower = Disk[];

export default function HanoiTower() {
  const [towers, setTowers] = useState<Tower[]>([[5,4,3,2,1], [], []]); // 3 Towers
  const [selectedTower, setSelectedTower] = useState<number | null>(null);
  const [moves, setMoves] = useState(0);
  const [isSolving, setIsSolving] = useState(false);
  const [message, setMessage] = useState("Move all disks to Tower 3.");

  const reset = () => {
      setTowers([[5,4,3,2,1], [], []]);
      setMoves(0);
      setIsSolving(false);
      setMessage("Move all disks to Tower 3.");
      setSelectedTower(null);
  };

  const moveDisk = (fromIdx: number, toIdx: number) => {
      setTowers(prev => {
          const newTowers = prev.map(t => [...t]);
          const disk = newTowers[fromIdx].pop();
          if (disk) {
              // Valid move check
              const topDest = newTowers[toIdx][newTowers[toIdx].length - 1];
              if (topDest && topDest < disk) {
                  // Invalid: Cannot place larger on smaller
                  setMessage("Invalid Move: Larger disk on smaller.");
                  return prev; 
              }
              newTowers[toIdx].push(disk);
              setMoves(m => m + 1);
              setMessage("");
          }
          return newTowers;
      });
  };

  const handleClick = (idx: number) => {
      if (isSolving) return;

      if (selectedTower === null) {
          // Select source
          if (towers[idx].length > 0) setSelectedTower(idx);
      } else {
          // Select destination
          moveDisk(selectedTower, idx);
          setSelectedTower(null);
      }
  };

  // RECURSIVE SOLVER
  const solve = async () => {
      reset();
      setIsSolving(true);
      setMessage("Running Recursive Algorithm...");
      
      const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

      // The Classic Recursive Function
      // move(n, source, auxiliary, target)
      const move = async (n: number, src: number, aux: number, tgt: number) => {
          if (n === 0) return;

          await move(n - 1, src, tgt, aux); // Move n-1 to Aux
          
          await delay(200); // Animation pause
          // Move nth disk src -> tgt
          setTowers(prev => {
              const newTowers = prev.map(t => [...t]);
              const disk = newTowers[src].pop();
              if (disk) newTowers[tgt].push(disk);
              return newTowers;
          });
          setMoves(m => m + 1);

          await move(n - 1, aux, src, tgt); // Move n-1 from Aux to Tgt
      };

      await move(5, 0, 1, 2);
      setIsSolving(false);
      setMessage("Solved via Recursion!");
  };

  return (
    <div className="w-full bg-slate-900 border border-violet-500/30 rounded-xl p-8 shadow-2xl flex flex-col gap-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-b border-violet-900/50 pb-4">
            <div>
                <div className="text-xs font-bold text-violet-500 uppercase tracking-widest mb-1">Recursive Problem</div>
                <h3 className="text-2xl font-black text-white">Tower of Hanoi</h3>
            </div>
            <div className="flex gap-4 items-center">
                 <div className="font-mono text-violet-300 text-sm">Moves: {moves}</div>
                 <button onClick={solve} disabled={isSolving} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 disabled:opacity-50 rounded text-xs font-bold uppercase text-white flex items-center gap-2">
                     <Play size={14} /> Auto-Solve
                 </button>
                 <button onClick={reset} className="px-3 py-2 bg-slate-800 rounded text-slate-300 hover:text-white">
                     <RotateCcw size={14} />
                 </button>
            </div>
        </div>

        {/* GAME BOARD */}
        <div className="bg-black/40 rounded-xl h-64 relative flex items-end justify-around px-12 pb-4 border-b-8 border-slate-700">
            {[0, 1, 2].map(idx => (
                <div 
                    key={idx}
                    onClick={() => handleClick(idx)}
                    className={`relative w-2 bg-slate-600 h-48 rounded-t-full cursor-pointer transition-colors group ${selectedTower === idx ? 'bg-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.5)]' : 'hover:bg-slate-500'}`}
                >
                    {/* Hover Target Area */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-64 bg-transparent z-10" />

                    {/* Disks */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 flex flex-col-reverse items-center gap-1 mb-1 pointer-events-none">
                        {towers[idx].map((size) => (
                            <div 
                                key={size}
                                className="h-6 rounded-md bg-gradient-to-r from-violet-600 to-fuchsia-600 shadow-lg border-t border-white/20"
                                style={{ width: `${size * 20 + 20}%` }} // 1->40%, 5->120%
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* MESSAGE BAR */}
        <div className="text-center h-6">
            <span className="text-xs font-mono text-violet-400 uppercase tracking-widest bg-slate-900 px-4 py-1 rounded-full border border-violet-500/20">
                {message}
            </span>
        </div>

    </div>
  );
}