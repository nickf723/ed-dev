"use client";
import { useEffect, useRef } from "react";

export default function LifeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animationId: number;

    const cellSize = 20;
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);

    // Initialize Grid
    let grid = new Array(cols).fill(null).map(() => new Array(rows).fill(0).map(() => Math.random() > 0.8 ? 1 : 0));

    const draw = () => {
        // Blueprint Blue Background
        ctx.fillStyle = "#172554"; 
        ctx.fillRect(0, 0, w, h);

        // Draw Grid Lines (Schematic look)
        ctx.strokeStyle = "rgba(255,255,255,0.05)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += cellSize) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
        for (let y = 0; y <= h; y += cellSize) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
        ctx.stroke();

        // Draw Live Cells
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)"; // Faint white squares
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (grid[i][j] === 1) {
                    ctx.fillRect(i * cellSize + 1, j * cellSize + 1, cellSize - 2, cellSize - 2);
                }
            }
        }
    };

    const update = () => {
        const nextGrid = grid.map(arr => [...arr]);
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

                // Rules
                if (state === 0 && neighbors === 3) nextGrid[i][j] = 1;
                else if (state === 1 && (neighbors < 2 || neighbors > 3)) nextGrid[i][j] = 0;
            }
        }
        grid = nextGrid;
    };

    let tick = 0;
    const loop = () => {
        // Slow down update rate
        if (tick % 10 === 0) update();
        draw();
        tick++;
        animationId = requestAnimationFrame(loop);
    };

    loop();

    const handleResize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        // Re-init logic omitted for brevity, essentially re-run setup
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}