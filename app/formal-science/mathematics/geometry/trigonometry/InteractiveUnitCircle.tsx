"use client";
import React, { useEffect, useRef } from 'react';

export default function InteractiveUnitCircle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angle = 0;
    const sineTrail: number[] = [];
    const cosTrail: number[] = [];

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.2; // Circle Center X
      const cy = height * 0.5; // Circle Center Y
      const radius = 100;

      // Update Angle
      angle += 0.02;

      const x = cx + Math.cos(angle) * radius;
      const y = cy + Math.sin(angle) * radius;

      // Draw Unit Circle
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw Triangle
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x, y);
      ctx.lineTo(x, cy);
      ctx.fillStyle = 'rgba(34, 211, 238, 0.1)'; // Cyan-400 fill
      ctx.fill();
      ctx.strokeStyle = '#22d3ee';
      ctx.stroke();

      // Draw Sine Wave (Projection to Right)
      const sineX = width * 0.4;
      sineTrail.unshift(y);
      if (sineTrail.length > width * 0.5) sineTrail.pop();

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(sineX, y);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.3)'; // Purple line
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.moveTo(sineX, sineTrail[0]);
      for(let i=1; i<sineTrail.length; i++) {
          ctx.lineTo(sineX + i * 2, sineTrail[i]);
      }
      ctx.strokeStyle = '#c084fc'; // Purple-400
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Rotating Point
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI*2);
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