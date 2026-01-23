"use client";
import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RefreshCw, Users } from "lucide-react";

// 0: Empty, 1: Group A (Purple), 2: Group B (Teal)
type Cell = 0 | 1 | 2;

const SIZE = 20; // 20x20 Grid
const THRESHOLD = 0.30; // Agents move if < 30% of neighbors are like them

export default function SchellingModel() {
  const [grid, setGrid] = useState<Cell[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [steps, setSteps] = useState(0);
  const [happyCount, setHappyCount] = useState(0);

  // 1. INITIALIZE GRID
  const reset = () => {
    const newGrid: Cell[] = Array(SIZE * SIZE).fill(0).map(() => {
      const r = Math.random();
      if (r < 0.1) return 0; // 10% Empty
      if (r < 0.55) return 1; // 45% Group A
      return 2; // 45% Group B
    });
    setGrid(newGrid);
    setSteps(0);
    setIsRunning(false);
  };

  useEffect(() => { reset(); }, []);

  // 2. SIMULATION LOGIC
  const runStep = () => {
    setGrid((prev) => {
      const next = [...prev];
      const emptyIndices = next.map((c, i) => c === 0 ? i : -1).filter(i => i !== -1);
      let moved = false;
      let happy = 0;
      let totalAgents = 0;

      for (let i = 0; i < next.length; i++) {
        const agent = prev[i];
        if (agent === 0) continue;

        totalAgents++;
        
        // Check Neighbors
        const row = Math.floor(i / SIZE);
        const col = i % SIZE;
        let alike = 0;
        let totalNeighbors = 0;

        for (let r = -1; r <= 1; r++) {
          for (let c = -1; c <= 1; c++) {
            if (r === 0 && c === 0) continue;
            const nr = row + r;
            const nc = col + c;
            if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
              const neighbor = prev[nr * SIZE + nc];
              if (neighbor !== 0) {
                totalNeighbors++;
                if (neighbor === agent) alike++;
              }
            }
          }
        }

        // Calculate Happiness
        const ratio = totalNeighbors === 0 ? 1 : alike / totalNeighbors;
        
        if (ratio < THRESHOLD) {
          // UNHAPPY: Move to random empty spot
          if (emptyIndices.length > 0) {
            const randomEmptyIdx = Math.floor(Math.random() * emptyIndices.length);
            const target = emptyIndices[randomEmptyIdx];
            
            next[target] = agent; // Move here
            next[i] = 0; // Leave old spot
            
            // Update empty list
            emptyIndices[randomEmptyIdx] = i; 
            moved = true;
          }
        } else {
            happy++;
        }
      }
      
      setHappyCount(Math.round((happy / totalAgents) * 100));
      return next;
    });
    
    setSteps(s => s + 1);
  };

  // Timer
  useEffect(() => {
    let interval: any;
    if (isRunning) {
      interval = setInterval(runStep, 200);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-start w-full">
        
        {/* CANVAS */}
        <div className="w-full md:w-auto flex flex-col items-center">
             <div 
                className="grid gap-[1px] bg-stone-900 border border-violet-900/50 p-1 shadow-2xl rounded"
                style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)`, width: "300px", height: "300px" }}
             >
                {grid.map((cell, i) => (
                    <div 
                        key={i} 
                        className={`
                            w-full h-full rounded-[1px] transition-colors duration-200
                            ${cell === 0 ? "bg-transparent" : cell === 1 ? "bg-violet-500" : "bg-teal-400"}
                        `}
                    />
                ))}
            </div>
            
            {/* CONTROLS */}
            <div className="flex gap-2 mt-4">
                <button onClick={() => setIsRunning(!isRunning)} className="px-4 py-2 bg-violet-900/40 border border-violet-500/30 rounded text-violet-300 text-xs font-bold uppercase hover:bg-violet-500 hover:text-white transition-all flex items-center gap-2">
                    {isRunning ? <Pause size={14} /> : <Play size={14} />}
                    {isRunning ? "Pause" : "Simulate"}
                </button>
                <button onClick={reset} className="px-4 py-2 bg-stone-800 border border-stone-700 rounded text-stone-400 text-xs font-bold uppercase hover:text-white transition-all">
                    <RefreshCw size={14} />
                </button>
            </div>
        </div>

        {/* INFO PANEL */}
        <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Users className="text-violet-500" size={20} /> Schelling's Segregation
            </h3>
            <p className="text-sm text-violet-200/60 leading-relaxed mb-6">
                This model demonstrates <strong>Micro-Motives vs. Macro-Behavior</strong>. 
                Even if individual agents have a very mild preference (e.g., "I want just 30% of my neighbors to look like me"), 
                the entire system will eventually segregate completely.
            </p>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-violet-950/20 border border-violet-500/20 rounded">
                    <div className="text-[10px] font-mono text-violet-400 uppercase">Happiness</div>
                    <div className="text-2xl font-black text-white">{happyCount}%</div>
                </div>
                <div className="p-3 bg-stone-900/40 border border-stone-800 rounded">
                    <div className="text-[10px] font-mono text-stone-500 uppercase">Steps</div>
                    <div className="text-2xl font-black text-stone-300">{steps}</div>
                </div>
            </div>
            
            <div className="mt-4 p-3 border-l-2 border-violet-500 bg-violet-500/5 text-xs text-violet-300 italic">
                "Mild individual bias can create extreme collective separation."
            </div>
        </div>
    </div>
  );
}