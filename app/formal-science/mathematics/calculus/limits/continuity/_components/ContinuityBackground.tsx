"use client";
import React, { useRef, useEffect } from 'react';

export default function ContinuityBackground() {
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
      ctx.fillStyle = '#020602'; // Very deep green-black
      ctx.fillRect(0, 0, width, height);

      ctx.lineWidth = 2;
      
      // Draw 5 ribbons
      for(let i = 0; i < 5; i++) {
          ctx.beginPath();
          const yBase = (height / 6) * (i + 1);
          const color = `rgba(34, 197, 94, ${0.05 + i * 0.02})`; // Green gradient

          ctx.strokeStyle = color;
          
          for(let x = 0; x <= width; x += 10) {
              // Perlin-ish noise combination
              const noise = Math.sin(x * 0.002 + time * 0.001 + i) * 50 
                          + Math.sin(x * 0.01 - time * 0.002) * 20;
              
              const y = yBase + noise;
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
      }

      time += 1;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}