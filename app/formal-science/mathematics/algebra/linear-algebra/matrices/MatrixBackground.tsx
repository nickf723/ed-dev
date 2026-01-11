"use client";
import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const cellSize = 40;
    const cols = Math.ceil(w / cellSize);
    const rows = Math.ceil(h / cellSize);
    
    // Grid of random numbers
    const grid: number[] = new Array(cols * rows).fill(0).map(() => Math.floor(Math.random() * 9));

    // Scanners
    const rowScan = { y: 0, speed: 0.1, index: 0 }; // Scans rows
    const colScan = { x: 0, speed: 0.15, index: 0 }; // Scans cols

    const render = () => {
      // Clear with dark emerald/black
      ctx.fillStyle = "#020a05"; 
      ctx.fillRect(0, 0, w, h);

      ctx.font = "14px monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Update Scanners
      rowScan.y += rowScan.speed;
      if (rowScan.y >= rows) rowScan.y = 0;
      rowScan.index = Math.floor(rowScan.y);

      colScan.x += colScan.speed;
      if (colScan.x >= cols) colScan.x = 0;
      colScan.index = Math.floor(colScan.x);

      // Draw Grid
      for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
              const i = r * cols + c;
              const x = c * cellSize + cellSize/2;
              const y = r * cellSize + cellSize/2;

              // Logic: Highlight if in Active Row or Active Col
              const isRow = r === rowScan.index;
              const isCol = c === colScan.index;
              const isIntersect = isRow && isCol;

              if (isIntersect) {
                  // The "Product" Cell - Bright Flash
                  ctx.fillStyle = "#ffffff";
                  ctx.shadowBlur = 15;
                  ctx.shadowColor = "#ffffff";
                  ctx.fillText(grid[i].toString(), x, y);
                  ctx.shadowBlur = 0;
              } else if (isRow) {
                  // Active Row - Emerald High
                  ctx.fillStyle = "#34d399"; // Emerald-400
                  ctx.fillText(grid[i].toString(), x, y);
              } else if (isCol) {
                  // Active Col - Emerald High
                  ctx.fillStyle = "#34d399"; // Emerald-400
                  ctx.fillText(grid[i].toString(), x, y);
              } else {
                  // Dormant - Faint Green
                  ctx.fillStyle = "rgba(16, 185, 129, 0.05)"; // Emerald-500 very low
                  ctx.fillText(grid[i].toString(), x, y);
              }
          }
      }

      // Draw Scanner Lines (Visual cues)
      ctx.strokeStyle = "rgba(52, 211, 153, 0.2)";
      ctx.lineWidth = 1;
      
      // Row Line
      const ry = rowScan.index * cellSize;
      ctx.strokeRect(0, ry, w, cellSize);
      
      // Col Line
      const cx = colScan.index * cellSize;
      ctx.strokeRect(cx, 0, cellSize, h);

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}