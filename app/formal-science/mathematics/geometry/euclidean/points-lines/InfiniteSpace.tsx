"use client";
import React, { useEffect, useRef } from 'react';

export default function InfiniteSpace() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles (Points)
    const points = Array.from({ length: 60 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      // 1. Void Background
      ctx.fillStyle = '#0f172a'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Connections (Lines)
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
              const dx = points[i].x - points[j].x;
              const dy = points[i].y - points[j].y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if (dist < 150) {
                  // Opacity based on distance
                  const alpha = 1 - (dist / 150);
                  ctx.strokeStyle = `rgba(34, 211, 238, ${alpha * 0.5})`; // Cyan lines
                  ctx.beginPath();
                  ctx.moveTo(points[i].x, points[i].y);
                  ctx.lineTo(points[j].x, points[j].y);
                  ctx.stroke();
              }
          }
      }

      // 3. Draw Points
      ctx.fillStyle = '#fff';
      points.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce off walls
          if(p.x < 0 || p.x > width) p.vx *= -1;
          if(p.y < 0 || p.y > height) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
          ctx.fill();
          
          // Glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#22d3ee';
      });
      ctx.shadowBlur = 0;

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