"use client";
import { useEffect, useRef } from "react";

export default function GameOfLifeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cellSize = 20;
    let cols = 0;
    let rows = 0;
    let grid: number[][] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.ceil(canvas.width / cellSize);
      rows = Math.ceil(canvas.height / cellSize);
      initGrid();
    };

    const initGrid = () => {
      grid = new Array(cols).fill(null).map(() =>
        new Array(rows).fill(null).map(() => (Math.random() > 0.9 ? 1 : 0))
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Red glow for "Alive" cells (Formal Science Theme)
      ctx.fillStyle = "#ef4444"; 
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ef4444";

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (grid[i][j]) {
            // Draw slightly smaller than cell for grid effect
            ctx.fillRect(i * cellSize + 2, j * cellSize + 2, cellSize - 4, cellSize - 4);
          }
        }
      }
      ctx.shadowBlur = 0; // Reset
    };

    const update = () => {
      const next = grid.map((arr) => [...arr]);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const state = grid[i][j];
          let sum = 0;
          for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
              if (x === 0 && y === 0) continue;
              const col = (i + x + cols) % cols;
              const row = (j + y + rows) % rows;
              sum += grid[col][row];
            }
          }
          if (state === 0 && sum === 3) next[i][j] = 1;
          else if (state === 1 && (sum < 2 || sum > 3)) next[i][j] = 0;
        }
      }
      grid = next;
    };

    const loop = () => {
      draw();
      setTimeout(() => {
        update();
        animationId = requestAnimationFrame(loop);
      }, 100); 
    };
    
    resize();
    loop();

    window.addEventListener("resize", resize);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(animationId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-20" />
        {/* HD-2D Layers: Scanlines + Blur = Monitor Effect */}
        <div className="hd-scanlines opacity-50" />
        <div className="hd-vignette" />
        {/* Tilt Shift via backdrop blur mask */}
        <div className="fixed inset-0 pointer-events-none z-0 backdrop-blur-[2px]" 
             style={{ maskImage: "linear-gradient(to bottom, black 0%, transparent 20%, transparent 80%, black 100%)" }} 
        />
    </>
  );
}