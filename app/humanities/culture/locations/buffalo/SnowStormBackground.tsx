"use client";
import React, { useEffect, useRef } from 'react';

export default function SnowStormBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Snowflake {
      x: number; y: number;
      z: number; // Depth (size/speed)
      vx: number; vy: number;
    }

    const flakes: Snowflake[] = [];
    const count = 400;

    for(let i=0; i<count; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            z: Math.random() * 2 + 0.5,
            vx: Math.random() * 2 + 2, // Wind speed
            vy: Math.random() * 3 + 2  // Fall speed
        });
    }

    const animate = () => {
      // 1. Deep Navy/Slate Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f172a'); // Slate-900
      grad.addColorStop(1, '#1e3a8a'); // Blue-900 (Bills Blueish)
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Snow
      ctx.fillStyle = '#fff';
      flakes.forEach(f => {
          f.x += f.vx * f.z;
          f.y += f.vy * f.z;

          // Loop
          if (f.x > width) f.x = -10;
          if (f.y > height) f.y = -10;

          const size = f.z * 1.5;
          ctx.globalAlpha = Math.min(1, f.z * 0.4);
          ctx.beginPath();
          ctx.arc(f.x, f.y, size, 0, Math.PI*2);
          ctx.fill();
      });

      // 3. City Hall Silhouette (Art Deco Peak)
      ctx.fillStyle = '#020617'; // Very dark base
      ctx.globalAlpha = 1;
      
      const cx = width / 2;
      const base = height;
      
      // Procedural Art Deco Shape
      ctx.beginPath();
      ctx.moveTo(0, base);
      // Left generic buildings
      ctx.lineTo(cx - 200, base);
      ctx.lineTo(cx - 200, base - 100);
      ctx.lineTo(cx - 100, base - 100);
      ctx.lineTo(cx - 100, base - 250); // City Hall Wing
      ctx.lineTo(cx - 50, base - 250);
      ctx.lineTo(cx - 50, base - 400); // Main Tower
      ctx.lineTo(cx + 50, base - 400);
      ctx.lineTo(cx + 50, base - 250); // City Hall Wing
      ctx.lineTo(cx + 100, base - 250);
      ctx.lineTo(cx + 100, base - 100);
      ctx.lineTo(cx + 200, base - 100);
      ctx.lineTo(cx + 200, base);
      ctx.lineTo(width, base);
      ctx.fill();

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