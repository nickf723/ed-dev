"use client";
import { useEffect, useRef } from "react";

export default function GameOfLifeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuration
    const cellSize = 20;
    let cols = 0;
    let rows = 0;
    let grid: number[][] = [];
    let animationId: number;

    // Colors (Dark Theme Friendly)
    const deadColor = "rgba(0, 0, 0, 0)";
    const aliveColor = "rgba(220, 38, 38, 0.15)"; // Red-600 with low opacity

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / cellSize);
      rows = Math.ceil(canvas.height / cellSize);
      initGrid();
    };

    const initGrid = () => {
      grid = new Array(cols).fill(null).map(() =>
        new Array(rows).fill(null).map(() => (Math.random() > 0.85 ? 1 : 0)) // Sparse start
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = aliveColor;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j]) {
            ctx.fillRect(i * cellSize, j * cellSize, cellSize - 1, cellSize - 1);
          }
        }
      }
    };

    const update = () => {
      const next = grid.map((arr) => [...arr]);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const state = grid[i][j];
          
          // Count neighbors
          let sum = 0;
          for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
              if (x === 0 && y === 0) continue;
              const col = (i + x + cols) % cols;
              const row = (j + y + rows) % rows;
              sum += grid[col][row];
            }
          }

          // Rules
          if (state === 0 && sum === 3) {
            next[i][j] = 1;
          } else if (state === 1 && (sum < 2 || sum > 3)) {
            next[i][j] = 0;
          }
        }
      }

      grid = next;
    };

    const loop = () => {
      draw();
      // Slow down the animation slightly for a "thinking" vibe
      setTimeout(() => {
        update();
        animationId = requestAnimationFrame(loop);
      }, 100); 
    };

    // Interaction
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / cellSize);
      const y = Math.floor((e.clientY - rect.top) / cellSize);
      
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        // Add a "glider" or just noise at mouse position
        grid[x][y] = 1;
        if (x+1 < cols) grid[x+1][y] = 1;
        if (y+1 < rows) grid[x][y+1] = 1;
      }
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }} // Global transparency
    />
  );
}