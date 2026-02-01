"use client";
import React, { useEffect, useRef } from 'react';

export default function DataGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const cellSize = 40;
    const cols = Math.ceil(width / cellSize);
    const rows = Math.ceil(height / cellSize);

    // Grid state
    const cells: number[] = new Array(cols * rows).fill(0);

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Update random cells
      for (let i = 0; i < 20; i++) {
        const idx = Math.floor(Math.random() * cells.length);
        cells[idx] = 100; // Flash intensity
      }

      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.font = '10px monospace';

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;
          const px = x * cellSize;
          const py = y * cellSize;

          // Decay intensity
          if (cells[idx] > 0) cells[idx] -= 2;

          // Draw Cell Border
          ctx.strokeRect(px, py, cellSize, cellSize);

          // Draw Activity
          if (cells[idx] > 0) {
            const alpha = cells[idx] / 100;
            ctx.fillStyle = `rgba(249, 115, 22, ${alpha * 0.2})`; // Orange background
            ctx.fillRect(px, py, cellSize, cellSize);
            
            // Draw dummy data
            ctx.fillStyle = `rgba(249, 115, 22, ${alpha})`;
            ctx.fillText((Math.random() * 99).toFixed(0), px + 10, py + 24);
          }
        }
      }

      // Draw "Scan Line"
      const scanY = (frame * 2) % height;
      ctx.beginPath();
      ctx.moveTo(0, scanY);
      ctx.lineTo(width, scanY);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.2)'; // Sky blue scan
      ctx.stroke();

      frame++;
      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}