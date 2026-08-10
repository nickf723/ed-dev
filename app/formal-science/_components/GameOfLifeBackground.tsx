"use client";

import { useEffect, useRef } from "react";

export default function GameOfLifeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const cellSize = 9;
    let cols = 0;
    let rows = 0;
    let grid: number[][] = [];
    let intervalId = 0;

    const initialize = () => {
      cols = Math.ceil(window.innerWidth / cellSize);
      rows = Math.ceil(window.innerHeight / cellSize);
      grid = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, () => (Math.random() > 0.80 ? 1 : 0)),
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.fillStyle = "rgba(255,65,54,0.24)";

      for (let x = 0; x < cols; x += 1) {
        for (let y = 0; y < rows; y += 1) {
          if (!grid[x]?.[y]) continue;
          ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
        }
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initialize();
      draw();
    };

    const evolve = () => {
      if (document.hidden) return;
      const next = grid.map((column) => [...column]);

      for (let x = 0; x < cols; x += 1) {
        for (let y = 0; y < rows; y += 1) {
          let neighbors = 0;
          for (let dx = -1; dx <= 1; dx += 1) {
            for (let dy = -1; dy <= 1; dy += 1) {
              if (dx === 0 && dy === 0) continue;
              const column = (x + dx + cols) % cols;
              const row = (y + dy + rows) % rows;
              neighbors += grid[column][row];
            }
          }

          const alive = grid[x][y] === 1;
          next[x][y] = alive
            ? neighbors === 2 || neighbors === 3
              ? 1
              : 0
            : neighbors === 3
              ? 1
              : 0;
        }
      }

      grid = next;
      draw();
    };

    resize();
    if (!reducedMotion.matches) intervalId = window.setInterval(evolve, 700);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      if (intervalId) window.clearInterval(intervalId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-65"
      aria-hidden="true"
    />
  );
}
