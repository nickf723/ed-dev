"use client";
import React, { useEffect, useRef } from 'react';

export default function PolygonField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const shapes = Array.from({ length: 15 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        sides: Math.floor(Math.random() * 5) + 3, // 3 to 7 sides
        radius: Math.random() * 40 + 20,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.02,
        color: Math.random() > 0.5 ? '#a855f7' : '#22c55e' // Purple or Green
    }));

    const drawPoly = (x: number, y: number, r: number, sides: number, angle: number, color: string) => {
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const theta = angle + (i * 2 * Math.PI / sides);
            const px = x + r * Math.cos(theta);
            const py = y + r * Math.sin(theta);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.stroke();
    };

    const animate = () => {
      // 1. Dark Void
      ctx.fillStyle = '#0f172a'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      // 2. Animate Shapes
      shapes.forEach(s => {
          s.x += s.vx;
          s.y += s.vy;
          s.rotation += s.spin;

          // Bounce
          if (s.x < 0 || s.x > width) s.vx *= -1;
          if (s.y < 0 || s.y > height) s.vy *= -1;

          // Glow effect
          ctx.shadowBlur = 15;
          ctx.shadowColor = s.color;
          drawPoly(s.x, s.y, s.radius, s.sides, s.rotation, s.color);
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