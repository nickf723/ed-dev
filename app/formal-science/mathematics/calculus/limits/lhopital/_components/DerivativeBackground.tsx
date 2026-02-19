"use client";
import React, { useRef, useEffect } from 'react';

export default function DerivativeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = '#0a0505'; // Red-tinted dark background
      ctx.fillRect(0, 0, width, height);

      const step = 40;
      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          // Calculate slope based on position and time
          const angle = Math.sin(x * 0.005 + time) * Math.cos(y * 0.005 + time);
          
          const length = 10;
          const x2 = x + Math.cos(angle) * length;
          const y2 = y + Math.sin(angle) * length;

          ctx.beginPath();
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)'; // Red vectors
          ctx.moveTo(x, y);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
      time += 0.005;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}