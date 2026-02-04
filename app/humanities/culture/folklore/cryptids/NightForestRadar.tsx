"use client";
import React, { useEffect, useRef } from 'react';

export default function NightForestRadar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let angle = 0;

    const blips: { x: number, y: number, life: number }[] = [];
    const eyes: { x: number, y: number, life: number }[] = [];

    const animate = () => {
      // 1. CRT Fade Effect (Trails)
      ctx.fillStyle = 'rgba(0, 10, 2, 0.1)'; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.max(width, height) * 0.6;

      // 2. Draw Grid (Radar Lines)
      ctx.strokeStyle = 'rgba(34, 197, 94, 0.1)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let r=100; r<radius; r+=150) {
          ctx.arc(cx, cy, r, 0, Math.PI*2);
      }
      ctx.moveTo(0, cy); ctx.lineTo(width, cy);
      ctx.moveTo(cx, 0); ctx.lineTo(cx, height);
      ctx.stroke();

      // 3. The Sweep Line
      angle += 0.02;
      const ex = cx + Math.cos(angle) * radius;
      const ey = cy + Math.sin(angle) * radius;

      const grad = ctx.createLinearGradient(cx, cy, ex, ey);
      grad.addColorStop(0, 'rgba(34, 197, 94, 0)');
      grad.addColorStop(1, 'rgba(34, 197, 94, 0.5)'); // Bright Green tip

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(ex, ey);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2;
      ctx.stroke();

      // 4. Random Events
      if(Math.random() > 0.98) {
          // Add a blip near the sweep
          blips.push({
              x: cx + Math.cos(angle + 0.5) * (Math.random() * 300 + 100),
              y: cy + Math.sin(angle + 0.5) * (Math.random() * 300 + 100),
              life: 1.0
          });
      }

      if(Math.random() > 0.995 && eyes.length === 0) {
          // Spawn Eyes in the distance
          eyes.push({
              x: Math.random() * width,
              y: Math.random() * height,
              life: 1.0
          });
      }

      // 5. Draw Blips
      blips.forEach((b, i) => {
          b.life -= 0.02;
          if(b.life <= 0) blips.splice(i, 1);
          
          ctx.fillStyle = `rgba(34, 197, 94, ${b.life})`;
          ctx.beginPath();
          ctx.arc(b.x, b.y, 3, 0, Math.PI*2);
          ctx.fill();
      });

      // 6. Draw "The Watchers" (Eyes)
      eyes.forEach((e, i) => {
          e.life -= 0.01;
          if(e.life <= 0) eyes.splice(i, 1);

          ctx.fillStyle = `rgba(220, 38, 38, ${e.life})`; // Red Eyes
          ctx.shadowBlur = 10;
          ctx.shadowColor = 'red';
          
          // Left Eye
          ctx.beginPath();
          ctx.ellipse(e.x, e.y, 4, 2, 0, 0, Math.PI*2);
          ctx.fill();
          // Right Eye
          ctx.beginPath();
          ctx.ellipse(e.x + 15, e.y, 4, 2, 0, 0, Math.PI*2);
          ctx.fill();
          
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />;
}