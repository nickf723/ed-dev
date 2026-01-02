"use client";
import { useState, useEffect } from "react";
import { Network, Play, RotateCcw, MapPin } from "lucide-react";

type CellType = "empty" | "wall" | "start" | "end" | "visited" | "path";
const SIZE = 10; // 10x10 Grid

export default function PathfindingLab() {
  const [grid, setGrid] = useState<CellType[]>([]);
  const [running, setRunning] = useState(false);

  // Init
  useEffect(() => { reset(); }, []);

  const reset = () => {
      const newGrid = new Array(SIZE * SIZE).fill("empty");
      newGrid[0] = "start"; // Top Left
      newGrid[SIZE * SIZE - 1] = "end"; // Bottom Right
      // Random walls
      for(let i=0; i<20; i++) {
          const r = Math.floor(Math.random() * (SIZE * SIZE));
          if (newGrid[r] === "empty") newGrid[r] = "wall";
      }
      setGrid(newGrid);
      setRunning(false);
  };

  const runBFS = () => {
      if (running) return;
      setRunning(true);
      
      const startIdx = grid.indexOf("start");
      const endIdx = grid.indexOf("end");
      const parentMap = new Map<number, number>();
      
      const queue = [startIdx];
      const visited = new Set([startIdx]);
      
      const interval = setInterval(() => {
          if (queue.length === 0) {
              clearInterval(interval);
              setRunning(false);
              return;
          }

          const curr = queue.shift()!;
          if (curr === endIdx) {
              // Reconstruct Path
              let temp = endIdx;
              while (temp !== startIdx) {
                  const p = parentMap.get(temp);
                  if (p !== undefined && p !== startIdx) {
                      setGrid(prev => {
                          const next = [...prev];
                          next[p] = "path";
                          return next;
                      });
                  }
                  temp = parentMap.get(temp)!;
              }
              clearInterval(interval);
              setRunning(false);
              return;
          }

          // Neighbors (Up, Down, Left, Right)
          const moves = [-1, 1, -SIZE, SIZE];
          moves.forEach(move => {
              const next = curr + move;
              // Boundary checks
              if (next >= 0 && next < SIZE * SIZE) {
                  // Wrap-around prevention for left/right moves
                  if (move === 1 && next % SIZE === 0) return;
                  if (move === -1 && (next + 1) % SIZE === 0) return;

                  if (!visited.has(next) && grid[next] !== "wall") {
                      visited.add(next);
                      parentMap.set(next, curr);
                      queue.push(next);
                      
                      if (next !== endIdx) {
                          setGrid(prev => {
                              const g = [...prev];
                              g[next] = "visited";
                              return g;
                          });
                      }
                  }
              }
          });

      }, 50);
  };

  const getCellColor = (type: CellType) => {
      switch(type) {
          case "start": return "bg-green-500 text-black";
          case "end": return "bg-red-500 text-white";
          case "wall": return "bg-zinc-700";
          case "visited": return "bg-purple-500/30 animate-pulse";
          case "path": return "bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]";
          default: return "bg-zinc-800/50 hover:bg-zinc-700/50";
      }
  };

  return (
    <div className="bg-[#262626] border border-purple-500/30 rounded-xl p-6 shadow-2xl w-full max-w-md font-mono">
        <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-purple-400 flex items-center gap-2 tracking-wider text-sm">
                <Network size={16} /> PATHFINDER_ALGO
            </h3>
            <div className="text-[10px] text-zinc-500">BREADTH_FIRST_SEARCH</div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-10 gap-1 mb-6 bg-black/40 p-2 rounded-lg border border-white/5">
            {grid.map((cell, i) => (
                <div 
                    key={i}
                    className={`w-6 h-6 rounded-sm flex items-center justify-center text-[10px] font-bold ${getCellColor(cell)}`}
                >
                    {cell === "start" && "S"}
                    {cell === "end" && "E"}
                </div>
            ))}
        </div>

        {/* CONTROLS */}
        <div className="flex gap-2">
            <button 
                onClick={runBFS}
                disabled={running}
                className="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded flex items-center justify-center gap-2 disabled:opacity-50 transition-colors text-xs"
            >
                <Play size={14} fill="currentColor" /> SOLVE GRAPH
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