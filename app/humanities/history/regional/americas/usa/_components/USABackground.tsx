"use client";
import React, { useRef, useEffect } from 'react';

export default function USABackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const nodes = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      offset: Math.random() * Math.PI * 2
    }));

    const draw = () => {
      ctx.fillStyle = '#010814'; // Midnight blue
      ctx.fillRect(0, 0, width, height);

      // Drafting Grid (Moving slowly left)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 80;
      const panX = (time * 10) % gridSize;

      for(let x = -gridSize; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x - panX, 0); ctx.lineTo(x - panX, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Intersecting "Federal" Lines (Crimson and White)
      ctx.beginPath();
      const waveY = height / 2 + Math.sin(time * 0.5) * 100;
      ctx.moveTo(0, waveY);
      ctx.lineTo(width, waveY);
      ctx.strokeStyle = 'rgba(225, 29, 72, 0.1)'; // Crimson
      ctx.lineWidth = 2;
      ctx.stroke();

      // Pulsing Nodes
      nodes.forEach(n => {
        const pulse = Math.sin(time * 2 + n.offset) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 2 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.4})`;
        ctx.fill();
        
        // Faint connecting lines to simulate infrastructure/railroads
        nodes.forEach(other => {
            const dist = Math.hypot(n.x - other.x, n.y - other.y);
            if (dist < 150) {
                ctx.beginPath();
                ctx.moveTo(n.x, n.y);
                ctx.lineTo(other.x, other.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist/150) * 0.05})`;
                ctx.stroke();
            }
        });
      });

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}