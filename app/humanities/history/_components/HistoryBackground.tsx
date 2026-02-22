"use client";
import React, { useRef, useEffect } from 'react';

export default function HistoryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    // "Dust of Ages" particles
    const dust = Array.from({ length: 80 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 0.5 + 0.1,
      size: Math.random() * 2,
      opacity: Math.random() * 0.5
    }));

    const draw = () => {
      ctx.fillStyle = '#0a0806'; // Deep, warm charcoal/sepia black
      ctx.fillRect(0, 0, width, height);

      // The River of Time (Horizontal flowing waves)
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const yOffset = (height / 6) * (i + 1);
          
          for (let x = 0; x <= width; x += 20) {
              const wave = Math.sin(x * 0.002 + time * 0.2 + i) * 50 + Math.cos(x * 0.005 - time * 0.1) * 20;
              const y = yOffset + wave;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.strokeStyle = `rgba(217, 119, 6, ${0.02 + i * 0.01})`; // Amber/Bronze flow
          ctx.stroke();
      }

      // Drifting Dust
      dust.forEach(p => {
        p.x -= p.speed; // Drifting left into the past
        if (p.x < 0) {
            p.x = width;
            p.y = Math.random() * height;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(251, 191, 36, ${p.opacity})`; // Amber-400
        ctx.fill();
      });

      time += 0.05;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}