"use client";
import React, { useRef, useEffect } from 'react';

export default function PowerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles = Array.from({ length: 40 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      val: Math.floor(Math.random() * 5) + 2, // 2, 3, 4, 5
      velY: Math.random() * 1 + 0.5,
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.3
    }));

    const draw = () => {
      ctx.fillStyle = '#0a0500'; // Dark orange-black
      ctx.fillRect(0, 0, width, height);

      ctx.font = 'bold 20px monospace';
      
      particles.forEach(p => {
        p.y += p.velY;
        if (p.y > height) p.y = -50;
        
        // Draw "x^n" falling
        ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity})`;
        ctx.fillText(`x^${p.val}`, p.x, p.y);
        
        // Draw the derivative "nx^(n-1)" ghosting behind it
        ctx.fillStyle = `rgba(249, 115, 22, ${p.opacity * 0.3})`;
        ctx.fillText(`${p.val}x^${p.val-1}`, p.x, p.y - 30);
      });

      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}