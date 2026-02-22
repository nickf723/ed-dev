"use client";
import React, { useRef, useEffect } from 'react';

export default function CardiologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    // Blood cells drifting in the background
    const cells = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() * 0.5 + 0.1), // Flowing right
      vy: (Math.random() - 0.5) * 0.2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.15 + 0.05
    }));

    const draw = () => {
      ctx.fillStyle = '#050101'; // Deepest red-black
      ctx.fillRect(0, 0, width, height);

      // Medical Grid
      ctx.strokeStyle = '#1a0505';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for(let x = 0; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw Cells
      cells.forEach(c => {
        c.x += c.vx;
        c.y += c.vy;
        if (c.x > width) c.x = -10;

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(225, 29, 72, ${c.opacity})`; // Rose-600
        ctx.fill();
      });

      // The EKG Line
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)'; // Red-500
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';

      const baseline = height / 2;
      const cycleLength = 300; // Pixels per heartbeat
      const scanX = (time * 200) % width; // The leading edge

      for (let x = 0; x < width; x += 2) {
          // Only draw up to the scanner, or fade out the tail
          const distToScan = scanX - x;
          if (distToScan < 0 && distToScan > -100) continue; // The gap before the scanner

          const localX = x % cycleLength;
          let y = baseline;

          // PQRST Complex Math Approximation
          if (localX > 20 && localX < 40) { // P Wave
              y -= Math.sin((localX - 20) / 20 * Math.PI) * 15;
          } else if (localX > 60 && localX < 70) { // Q Dip
              y += Math.sin((localX - 60) / 10 * Math.PI) * 10;
          } else if (localX > 70 && localX < 85) { // R Spike
              y -= Math.sin((localX - 70) / 15 * Math.PI) * 120;
          } else if (localX > 85 && localX < 95) { // S Dip
              y += Math.sin((localX - 85) / 10 * Math.PI) * 20;
          } else if (localX > 130 && localX < 180) { // T Wave
              y -= Math.sin((localX - 130) / 50 * Math.PI) * 30;
          }

          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      
      ctx.stroke();

      // Scanner Head Glow
      ctx.beginPath();
      ctx.arc(scanX, baseline, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#ef4444';

      // Reset shadow for next frame
      ctx.shadowBlur = 0; 

      time += 0.016; // Approx 60fps
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}