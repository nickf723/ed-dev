"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Play, Pause, RefreshCw, Trash2 } from "lucide-react";

// CONFIG
const ROWS = 30;
const COLS = 50;
const CELL_SIZE = 12; // px

const operations = [
  [0, 1], [0, -1], [1, -1], [-1, 1],
  [1, 1], [-1, -1], [1, 0], [-1, 0]
];

export default function GameOfLife() {
  // Initialize Empty Grid
  const generateEmptyGrid = () => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
      rows.push(Array.from(Array(COLS), () => 0));
    }
    return rows;
  };

  const [grid, setGrid] = useState(() => generateEmptyGrid());
  const [running, setRunning] = useState(false);
  const [gen, setGen] = useState(0);

  const runningRef = useRef(running);
  runningRef.current = running;

  // SIMULATION LOOP
  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid((g) => {
      const gridCopy = JSON.parse(JSON.stringify(g));
      for (let i = 0; i < ROWS; i++) {
        for (let k = 0; k < COLS; k++) {
          let neighbors = 0;
          operations.forEach(([x, y]) => {
            const newI = i + x;
            const newK = k + y;
            if (newI >= 0 && newI < ROWS && newK >= 0 && newK < COLS) {
              neighbors += g[newI][newK];
            }
          });

          if (neighbors < 2 || neighbors > 3) {
            gridCopy[i][k] = 0;
          } else if (g[i][k] === 0 && neighbors === 3) {
            gridCopy[i][k] = 1;
          }
        }
      }
      return gridCopy;
    });
    
    setGen(c => c + 1);
    setTimeout(runSimulation, 100);
  }, []);

  // CONTROLS
  const toggleRunning = () => {
    setRunning(!running);
    if (!running) {
      runningRef.current = true;
      runSimulation();
    }
  };

  const randomize = () => {
    const rows = [];
    for (let i = 0; i < ROWS; i++) {
      rows.push(Array.from(Array(COLS), () => Math.random() > 0.7 ? 1 : 0));
    }
    setGrid(rows);
    setGen(0);
  };

  const clear = () => {
    setGrid(generateEmptyGrid());
    setRunning(false);
    setGen(0);
  };

  // Initial Random Seed
  useEffect(() => {
    randomize();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* TOOLBAR */}
      <div className="w-full flex justify-between items-center bg-red-950/20 border border-red-500/20 p-2 rounded-lg">
          <div className="flex gap-2">
            <button 
                onClick={toggleRunning}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-all ${running ? 'bg-red-600 text-white' : 'bg-red-900/40 text-red-200 hover:bg-red-800'}`}
            >
                {running ? <Pause size={12} /> : <Play size={12} />}
                {running ? "Halt" : "Simulate"}
            </button>
            <button onClick={randomize} className="p-2 bg-black/40 text-red-400 rounded hover:text-white border border-red-900/50">
                <RefreshCw size={12} />
            </button>
            <button onClick={clear} className="p-2 bg-black/40 text-red-400 rounded hover:text-white border border-red-900/50">
                <Trash2 size={12} />
            </button>
          </div>
          <div className="text-[10px] font-mono text-red-400">
              GENERATION: <span className="text-white">{gen}</span>
          </div>
      </div>

      {/* GRID CANVAS (Actually Divs for simplicity/interaction) */}
      <div 
        className="bg-black border border-red-900/50 shadow-[0_0_30px_rgba(220,38,38,0.1)] p-1 cursor-crosshair"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = JSON.parse(JSON.stringify(grid));
                newGrid[i][k] = grid[i][k] ? 0 : 1;
                setGrid(newGrid);
              }}
              style={{
                width: CELL_SIZE,
                height: CELL_SIZE,
                backgroundColor: grid[i][k] ? "#dc2626" : undefined, // Red-600
                border: "1px solid rgba(30, 10, 10, 1)"
              }}
              className="hover:bg-white/10 transition-colors duration-75"
            />
          ))
        )}
      </div>
      
      <p className="text-[10px] text-red-900/60 uppercase tracking-widest">
          Conway's Game of Life // Cellular Automata
      </p>
    </div>
  );
}