"use client";
import { useEffect, useRef } from "react";

export default function TheoryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const cellSize = 20;
    let cols = Math.ceil(w / cellSize);
    let rows = Math.ceil(h / cellSize);

    // Initialize Grid
    let grid = new Array(cols).fill(0).map(() => new Array(rows).fill(0).map(() => Math.random() > 0.85 ? 1 : 0));

    const animate = () => {
      ctx.fillStyle = "#1c1917"; // Stone-900 (Blackboard)
      ctx.fillRect(0, 0, w, h);

      // Draw Grid
      ctx.fillStyle = "rgba(168, 85, 247, 0.1)"; // Purple Chalk
      const nextGrid = grid.map(arr => [...arr]); // Clone

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const state = grid[i][j];
          
          // Count Neighbors
          let neighbors = 0;
          for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
              if (x === 0 && y === 0) continue;
              const col = (i + x + cols) % cols;
              const row = (j + y + rows) % rows;
              neighbors += grid[col][row];
            }
          }

          // Rules of Life
          if (state === 0 && neighbors === 3) nextGrid[i][j] = 1;
          else if (state === 1 && (neighbors < 2 || neighbors > 3)) nextGrid[i][j] = 0;

          // Draw Live Cells
          if (state === 1) {
             ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
          }
        }
      }

      grid = nextGrid;
      // Slow down animation slightly
      setTimeout(() => requestAnimationFrame(animate), 100); 
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        cols = Math.ceil(w / cellSize);
        rows = Math.ceil(h / cellSize);
        grid = new Array(cols).fill(0).map(() => new Array(rows).fill(0).map(() => Math.random() > 0.85 ? 1 : 0));
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}