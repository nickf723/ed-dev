"use client";
import React, { useEffect, useRef } from 'react';

export default function SineConstructionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angle = 0;
    const trail: number[] = [];

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.15; // Circle X
      const cy = height / 2;   // Circle Y
      const radius = 80;

      // Update Angle
      angle += 0.02;

      // Calculate Point on Circle
      const px = cx + Math.cos(angle) * radius;
      const py = cy + Math.sin(angle) * radius;

      // Store y-value for the wave
      trail.unshift(py);
      if (trail.length > width * 0.8) trail.pop();

      // 1. Draw The Circle
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.1)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 2. Draw The Triangle inside the Circle
      ctx.beginPath();
      ctx.moveTo(cx, cy); // Center
      ctx.lineTo(px, py); // Point
      ctx.lineTo(px, cy); // Drop perpendicular
      ctx.lineTo(cx, cy); // Back to center
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.stroke();

      // 3. Draw The Projection Line
      const waveStartX = width * 0.3;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(waveStartX, py); // Connect circle to wave start
      ctx.strokeStyle = 'rgba(232, 121, 249, 0.3)'; // Magenta line
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4. Draw The Sine Wave
      ctx.beginPath();
      ctx.moveTo(waveStartX, trail[0]);
      for(let i=1; i<trail.length; i++) {
          ctx.lineTo(waveStartX + i * 2, trail[i]);
      }
      ctx.strokeStyle = '#e879f9'; // Magenta-400
      ctx.lineWidth = 2;
      ctx.stroke();

      // 5. Draw The Point
      ctx.fillStyle = '#22d3ee'; // Cyan
      ctx.beginPath();
      ctx.arc(px, py, 6, 0, Math.PI * 2);
      ctx.fill();

      // 6. Draw Wave Leading Point
      ctx.beginPath();
      ctx.arc(waveStartX, py, 4, 0, Math.PI * 2);
      ctx.fill();

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