"use client";
import React, { useRef, useEffect } from 'react';

export default function AlgebraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const symbols = ['x', 'y', 'lim', '∞', 'f(x)', '÷', '=', '√'];
    const particles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      velY: Math.random() * 0.5 + 0.2,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.3
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#050505'; // Deep black base
      ctx.fillRect(0, 0, width, height);

      // Grid
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      const gridSize = 80;
      for(let x = 0; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Floating Algebra
      ctx.font = 'bold 20px monospace';
      particles.forEach(p => {
        p.y -= p.velY;
        if (p.y < -50) p.y = height + 50;
        
        ctx.fillStyle = `rgba(59, 130, 246, ${p.opacity})`;
        ctx.fillText(p.char, p.x, p.y);
      });

      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}