"use client";
import React, { useRef, useEffect } from 'react';

export default function NorthAmericaBackground() {
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
      ctx.fillStyle = '#01060a'; // Deep slate-blue
      ctx.fillRect(0, 0, width, height);

      // Latitude and Longitude Grids
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.03)'; // Sky-500
      ctx.lineWidth = 1;
      const gridSize = 120;
      for(let x = 0; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Topographic "Mountain" Iso-lines
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
          const wave1 = Math.sin(x * 0.002 + time * 0.1) * 150;
          const wave2 = Math.cos(x * 0.005 - time * 0.05) * 80;
          const y = height / 2 + wave1 + wave2 + (i * 40) - 100;
          
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        
        ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 - (i * 0.015)})`; // Sky-400
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