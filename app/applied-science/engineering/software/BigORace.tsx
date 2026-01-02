"use client";
import { useState, useEffect } from "react";
import { Timer, Play, RotateCcw, Database } from "lucide-react";

export default function BigORace() {
  const [n, setN] = useState(10);
  const [progress, setProgress] = useState({ o1: 0, on: 0, on2: 0 });
  const [running, setRunning] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);

  const reset = () => {
      setRunning(false);
      setProgress({ o1: 0, on: 0, on2: 0 });
      setWinner(null);
  };

  useEffect(() => {
      if (!running) return;

      let frame = 0;
      const interval = setInterval(() => {
          frame++;
          
          setProgress(prev => {
              const newP = { ...prev };
              
              // O(1) - Instant / Constant Speed
              if (newP.o1 < 100) newP.o1 += 50; 

              // O(n) - Linear Speed (Inversely proportional to N)
              // Base speed 10. If N=10, speed=1. If N=100, speed=0.1
              const speedN = 200 / n; 
              if (newP.on < 100) newP.on += speedN;

              // O(n^2) - Exponential decay in speed
              // Speed ~ 1/N^2
              const speedN2 = 2000 / (n * n);
              if (newP.on2 < 100) newP.on2 += speedN2;

              // Check Winner
              if (!winner) {
                  if (newP.o1 >= 100) setWinner("O(1)");
                  else if (newP.on >= 100) setWinner("O(n)");
                  else if (newP.on2 >= 100) setWinner("O(n²)");
              }

              return newP;
          });

      }, 16); // 60fps

      return () => clearInterval(interval);
  }, [running, n, winner]);

  return (
    <div className="bg-[#252526] border border-blue-500/30 rounded-xl p-6 shadow-2xl w-full max-w-md font-mono">
        
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-blue-400 flex items-center gap-2">
                <Timer size={18} /> THE_BIG_O_RACE
            </h3>
            <div className="text-[10px] text-zinc-500">ALGORITHM_OPTIMIZER</div>
        </div>

        {/* INPUT SIZE SLIDER */}
        <div className="mb-6 space-y-2">
             <div className="flex justify-between text-xs font-bold text-zinc-300">
                <span>INPUT SIZE (n)</span>
                <span className="text-blue-400">{n} items</span>
            </div>
            <input 
                type="range" min="10" max="100" step="10"
                value={n} onChange={(e) => { reset(); setN(parseInt(e.target.value)); }}
                className="w-full h-1 bg-zinc-700 rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
            />
        </div>

        {/* TRACKS */}
        <div className="space-y-4 mb-6">
            
            {/* O(1) */}
            <div className="relative">
                <div className="flex justify-between text-[10px] text-green-400 mb-1">
                    <span>HashMap Lookup O(1)</span>
                    <span>{progress.o1 >= 100 ? "DONE" : ""}</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: `${Math.min(100, progress.o1)}%` }} />
                </div>
            </div>

            {/* O(n) */}
            <div className="relative">
                <div className="flex justify-between text-[10px] text-yellow-400 mb-1">
                    <span>Linear Search O(n)</span>
                    <span>{progress.on >= 100 ? "DONE" : ""}</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-yellow-500 transition-all duration-75" style={{ width: `${Math.min(100, progress.on)}%` }} />
                </div>
            </div>

            {/* O(n^2) */}
            <div className="relative">
                <div className="flex justify-between text-[10px] text-red-400 mb-1">
                    <span>Nested Loop O(n²)</span>
                    <span>{progress.on2 >= 100 ? "DONE" : ""}</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 transition-all duration-75" style={{ width: `${Math.min(100, progress.on2)}%` }} />
                </div>
            </div>

        </div>

        {/* CONTROLS */}
        <div className="flex gap-2">
            <button 
                onClick={() => setRunning(true)}
                disabled={running}
                className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-xs"
            >
                <Play size={14} /> RUN BENCHMARK
            </button>
            <button 
                onClick={reset}
                className="px-4 bg-zinc-700 hover:bg-zinc-600 text-white rounded flex items-center justify-center transition-colors"
            >
                <RotateCcw size={16} />
            </button>
        </div>

    </div>
  );
}