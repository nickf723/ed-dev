"use client";
import React, { useRef, useEffect } from 'react';

export default function AmericasBackground() {
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
      ctx.fillStyle = '#020a06'; // Deep forest/charcoal black
      ctx.fillRect(0, 0, width, height);

      // Geographic Latitude/Longitude Grid
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)'; // Faint Emerald
      ctx.lineWidth = 1;
      const gridSize = 100;
      for(let x = (time * 10) % gridSize; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Topographic Contour Lines
      ctx.lineWidth = 1.5;
      for (let i = 1; i <= 6; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          // Complex wave to simulate organic terrain/coastlines
          const noise1 = Math.sin(x * 0.003 + time * 0.2) * 100;
          const noise2 = Math.cos(x * 0.007 - time * 0.1) * 50;
          const y = height / 2 + noise1 + noise2 + (i * 80) - 240;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        // Fading opacity based on distance from center
        const opacity = 0.15 - (Math.abs(3 - i) * 0.03);
        ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`; // Emerald-400
        ctx.stroke();
      }

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}