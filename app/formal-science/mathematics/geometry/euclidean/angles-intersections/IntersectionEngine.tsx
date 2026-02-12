"use client";
import React, { useEffect, useRef } from 'react';

export default function IntersectionEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Dynamic Lines
    const lines = Array.from({ length: 6 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        angle: Math.random() * Math.PI,
        length: Math.random() * 400 + 200,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        va: (Math.random() - 0.5) * 0.002, // Rotation speed
        color: Math.random() > 0.5 ? '#ec4899' : '#06b6d4' // Pink or Cyan
    }));

    const animate = () => {
      // 1. Dark Background
      ctx.fillStyle = '#0f172a'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Grid (Subtle)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      ctx.beginPath();
      for(let x=0; x<=width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<=height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      // 3. Update & Draw Lines
      lines.forEach(l => {
          l.x += l.vx;
          l.y += l.vy;
          l.angle += l.va;

          // Bounce
          if (l.x < -100 || l.x > width + 100) l.vx *= -1;
          if (l.y < -100 || l.y > height + 100) l.vy *= -1;

          const x1 = l.x - (Math.cos(l.angle) * l.length) / 2;
          const y1 = l.y - (Math.sin(l.angle) * l.length) / 2;
          const x2 = l.x + (Math.cos(l.angle) * l.length) / 2;
          const y2 = l.y + (Math.sin(l.angle) * l.length) / 2;

          ctx.beginPath();
          ctx.strokeStyle = l.color;
          ctx.lineWidth = 2;
          ctx.shadowBlur = 15;
          ctx.shadowColor = l.color;
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}