"use client";
import React, { useRef, useEffect } from 'react';

export default function InfinityBackground() {
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
      ctx.fillStyle = '#050205'; // Deep purple-black
      ctx.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const numLines = 20;
      
      ctx.lineWidth = 1;

      // Draw "The Wall"
      ctx.beginPath();
      ctx.moveTo(centerX, 0);
      ctx.lineTo(centerX, height);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.1)';
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      for (let i = 0; i < numLines; i++) {
          ctx.beginPath();
          const offset = (i / numLines) * height;
          const movingOffset = (offset + time) % height;
          
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 + (movingOffset/height)*0.1})`; // Purple fade
          
          // Draw Left Side (Shoots up to -Inf)
          for (let x = 0; x < centerX - 10; x += 20) {
              // 1/x curve effect
              const dist = (centerX - x) / 50;
              const curve = 100 / (dist * dist); 
              const y = movingOffset + curve;
              
              if (x===0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();

          // Draw Right Side (Shoots up to +Inf)
          ctx.beginPath();
          for (let x = centerX + 10; x < width; x += 20) {
              const dist = (x - centerX) / 50;
              const curve = 100 / (dist * dist);
              const y = movingOffset - curve; // Inverted for symmetry
              
              if (x === centerX + 10) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
      }

      time += 0.5;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}