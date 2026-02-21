"use client";
import React, { useRef, useEffect } from 'react';

export default function ImplicitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const shapes = Array.from({ length: 12 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      rx: Math.random() * 100 + 50,
      ry: Math.random() * 100 + 50,
      rotationSpeed: (Math.random() - 0.5) * 0.005,
      angle: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.fillStyle = '#02050a'; // Deep Navy Black
      ctx.fillRect(0, 0, width, height);

      // Subtle Grid
      ctx.strokeStyle = '#0a101a';
      ctx.lineWidth = 1;
      const gridSize = 100;
      for(let x = 0; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      shapes.forEach(s => {
        s.angle += s.rotationSpeed;

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);

        // Breathing effect for radius
        const breathe = Math.sin(time * 0.5 + s.x) * 10;

        ctx.beginPath();
        ctx.ellipse(0, 0, s.rx + breathe, s.ry + breathe, 0, 0, Math.PI * 2);
        
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)'; // Blue
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      });

      time += 0.05;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}