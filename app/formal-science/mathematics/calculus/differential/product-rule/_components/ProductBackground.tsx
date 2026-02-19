"use client";
import React, { useRef, useEffect } from 'react';

export default function ProductBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const shapes = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      w: Math.random() * 200 + 50,
      h: Math.random() * 200 + 50,
      velX: (Math.random() - 0.5) * 0.2,
      velY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.05 + 0.02 // Very subtle opacity
    }));

    const draw = () => {
      // Deep, warm charcoal (almost black, but warm)
      ctx.fillStyle = '#080604'; 
      ctx.fillRect(0, 0, width, height);

      // Grid: Very faint warm grey
      ctx.strokeStyle = '#1c1917';
      ctx.lineWidth = 1;
      const gridSize = 120;
      for(let x = 0; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Standard blending (No 'lighter' or 'screen' to prevent blowout)
      ctx.globalCompositeOperation = 'source-over';

      shapes.forEach(s => {
        s.x += s.velX;
        s.y += s.velY;
        
        // Color: Bronze / Ochre (Dull, Earthy Yellow)
        // RGB: 161, 98, 7
        const color = `0, 98, 161`; 

        ctx.fillStyle = `rgba(${color}, ${s.opacity})`; 
        ctx.fillRect(s.x, s.y, s.w, s.h);
        
        // Outline is just slightly more visible than the fill
        ctx.strokeStyle = `rgba(${color}, ${s.opacity * 1.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(s.x, s.y, s.w, s.h);
      });

      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}