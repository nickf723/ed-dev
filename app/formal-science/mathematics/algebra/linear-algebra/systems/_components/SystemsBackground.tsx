"use client";
import { useEffect, useRef } from "react";

export default function SystemsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // We simulate a matrix of "Rows"
    const rowHeight = 60;
    const rowCount = Math.ceil(h / rowHeight);
    
    const rows = Array.from({ length: rowCount }).map((_, i) => ({
        y: i * rowHeight,
        cols: Array.from({ length: 10 }).map(() => Math.random()), // Data values
        status: 'idle', // idle, active, processing, solved
        flash: 0
    }));

    // The "Solver" State Machine
    let pivotRow = 0;
    let pivotCol = 0;
    let processTimer = 0;

    const render = () => {
      // Clear with dark blue void
      ctx.fillStyle = "#020617"; 
      ctx.fillRect(0, 0, w, h);

      processTimer++;

      // LOGIC: Simulate Gaussian Elimination Steps
      if (processTimer > 20) {
          // Reset Step
          rows.forEach(r => {
             if (r.status === 'processing') {
                 r.status = 'idle';
                 r.flash = 0;
             }
          });
          
          // Target rows below the pivot
          for(let r = pivotRow + 1; r < rowCount; r++) {
              if (Math.random() > 0.5) {
                  rows[r].status = 'processing';
                  rows[r].flash = 1;
                  // "Zero out" the column visually by dimming it
                  rows[r].cols[pivotCol] *= 0.1; 
              }
          }

          // Move Pivot
          pivotRow++;
          pivotCol++;
          if (pivotRow >= rowCount) {
              // Reset System
              pivotRow = 0;
              pivotCol = 0;
              rows.forEach(r => r.cols = r.cols.map(() => Math.random()));
          }
          
          rows[pivotRow].status = 'active'; // The Pivot Row
          processTimer = 0;
      }

      // DRAW
      rows.forEach((r, i) => {
          const cy = r.y + rowHeight/2;

          // Row Background
          if (r.status === 'active') {
              ctx.fillStyle = "rgba(59, 130, 246, 0.2)"; // Blue Pivot Highlight
              ctx.fillRect(0, r.y, w, rowHeight);
          } else if (r.status === 'processing') {
              ctx.fillStyle = `rgba(255, 50, 50, ${r.flash * 0.1})`; // Red "Elimination" flash
              ctx.fillRect(0, r.y, w, rowHeight);
              r.flash *= 0.9;
          }

          // Draw "Numbers" (Abstract Blocks)
          const colWidth = w / 12;
          r.cols.forEach((val, j) => {
              const cx = 100 + j * colWidth;
              
              // Visualization Logic
              let color = "#1e293b"; // Slate-800 (Default)
              let size = val * 20;

              // The Pivot
              if (i === pivotRow && j === pivotCol) {
                  color = "#ffffff"; // Pivot is White
                  size = 30;
                  // Draw Crosshair
                  ctx.strokeStyle = "rgba(59, 130, 246, 0.5)";
                  ctx.beginPath();
                  ctx.moveTo(cx, 0); ctx.lineTo(cx, h); // Vert Line
                  ctx.stroke();
              }
              // Zeros (Eliminated)
              else if (j < pivotCol && i > j) {
                  color = "#0f172a"; // Almost black (Zero)
                  size = 5;
              }
              // Active Processing
              else if (r.status === 'processing' && j === pivotCol) {
                  color = "#ef4444"; // Red (Being destroyed)
              }
              // Solved Variables (Diagonal)
              else if (i === j && i < pivotRow) {
                  color = "#3b82f6"; // Blue (Solved 1)
              }

              ctx.fillStyle = color;
              ctx.fillRect(cx - size/2, cy - 4, size, 8);
          });
          
          // Row Line
          ctx.strokeStyle = "#1e293b";
          ctx.beginPath();
          ctx.moveTo(0, r.y);
          ctx.lineTo(w, r.y);
          ctx.stroke();
      });

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}