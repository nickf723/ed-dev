"use client";
import { useState, useEffect, useCallback } from "react";
import { Users, Shuffle, Play, Pause, RefreshCw } from "lucide-react";

// Grid Config
const SIZE = 12; // 12x12 grid
const CELLS = SIZE * SIZE;
const TYPES = ["empty", "A", "B"]; // 0=empty, 1=A(Cyan), 2=B(Indigo)

export default function SchellingModel() {
  const [grid, setGrid] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [round, setRound] = useState(0);
  const [similarity, setSimilarity] = useState(0);

  // Initialize
  const initGrid = useCallback(() => {
    const newGrid = Array(CELLS).fill(0).map(() => {
        const r = Math.random();
        if (r < 0.1) return 0; // 10% empty
        return r < 0.55 ? 1 : 2; // Split A/B
    });
    setGrid(newGrid);
    setRound(0);
    setIsRunning(false);
  }, []);

  useEffect(() => { initGrid(); }, [initGrid]);

  // Step Simulation
  const step = () => {
      setGrid(prev => {
          const next = [...prev];
          const emptyIndices = next.map((v, i) => v === 0 ? i : -1).filter(i => i !== -1);
          let moved = false;
          let totalSim = 0;
          let agentCount = 0;

          // Check every cell
          for (let i = 0; i < CELLS; i++) {
              const type = prev[i];
              if (type === 0) continue;

              // Check neighbors
              const neighbors = [];
              const x = i % SIZE;
              const y = Math.floor(i / SIZE);

              for (let dy = -1; dy <= 1; dy++) {
                  for (let dx = -1; dx <= 1; dx++) {
                      if (dx === 0 && dy === 0) continue;
                      const nx = x + dx;
                      const ny = y + dy;
                      if (nx >= 0 && nx < SIZE && ny >= 0 && ny < SIZE) {
                          const nType = prev[ny * SIZE + nx];
                          if (nType !== 0) neighbors.push(nType);
                      }
                  }
              }

              if (neighbors.length > 0) {
                  const same = neighbors.filter(n => n === type).length;
                  const ratio = same / neighbors.length;
                  
                  // Calc stats
                  totalSim += ratio;
                  agentCount++;

                  // Threshold Rule (e.g., 30% preference)
                  if (ratio < 0.30) {
                      // Unhappy -> Move
                      if (emptyIndices.length > 0) {
                          const randIndex = Math.floor(Math.random() * emptyIndices.length);
                          const target = emptyIndices[randIndex];
                          
                          // Swap
                          next[target] = type;
                          next[i] = 0;
                          
                          // Update empty list (simple swap logic for this tick)
                          emptyIndices[randIndex] = i; 
                          moved = true;
                      }
                  }
              }
          }
          
          if (agentCount > 0) setSimilarity(totalSim / agentCount);
          return next;
      });
      setRound(r => r + 1);
  };

  useEffect(() => {
      let interval: any;
      if (isRunning) {
          interval = setInterval(step, 200);
      }
      return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="bg-slate-900/90 border border-cyan-500/30 rounded-xl p-6 backdrop-blur-md shadow-2xl w-full max-w-sm">
        
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-cyan-100 flex items-center gap-2 font-serif tracking-wider">
                <Users size={18} className="text-cyan-500" /> MICRO-MOTIVES
            </h3>
            <button onClick={initGrid} className="text-cyan-500/50 hover:text-cyan-400"><RefreshCw size={14}/></button>
        </div>

        <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            Schelling's Model: Agents move if fewer than 30% of neighbors are like them. Slight bias creates massive segregation.
        </p>

        {/* GRID VISUAL */}
        <div className="aspect-square w-full bg-black/40 rounded border border-slate-700 grid gap-1 p-1 mb-4"
             style={{ gridTemplateColumns: `repeat(${SIZE}, 1fr)` }}>
            {grid.map((cell, i) => (
                <div 
                    key={i} 
                    className={`rounded-sm transition-colors duration-300
                        ${cell === 0 ? "bg-transparent" : cell === 1 ? "bg-cyan-500" : "bg-indigo-500"}
                    `}
                />
            ))}
        </div>

        {/* STATS */}
        <div className="flex justify-between text-xs font-mono text-slate-400 mb-4">
            <div>ROUND: <span className="text-white">{round}</span></div>
            <div>SEGREGATION: <span className={`${similarity > 0.7 ? "text-rose-400" : "text-emerald-400"}`}>{(similarity * 100).toFixed(0)}%</span></div>
        </div>

        {/* CONTROLS */}
        <button 
            onClick={() => setIsRunning(!isRunning)}
            className={`w-full py-3 rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition-colors
                ${isRunning ? "bg-rose-500/20 text-rose-400 border border-rose-500/50" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30"}
            `}
        >
            {isRunning ? <><Pause size={14}/> PAUSE SIMULATION</> : <><Play size={14}/> START SIMULATION</>}
        </button>

    </div>
  );
}