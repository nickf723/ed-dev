"use client";
import React, { useEffect, useRef } from 'react';

export default function BlueprintEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Simulated "Draftsmen"
    const agents = Array.from({ length: 5 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 100 + 50,
        startAngle: Math.random() * Math.PI * 2,
        speed: 0.05,
        progress: 0,
        life: 100,
        color: Math.random() > 0.5 ? '#f87171' : '#fbbf24' // Red or Amber
    }));

    const animate = () => {
      // 1. Fade Effect (Vellum Paper)
      ctx.fillStyle = 'rgba(23, 23, 23, 0.05)'; // Neutral-900 with trails
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      ctx.beginPath();
      for(let x=0; x<width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      // 3. Agents Drawing Arcs
      agents.forEach(a => {
          if (a.life <= 0) {
              // Reset
              a.x = Math.random() * width;
              a.y = Math.random() * height;
              a.progress = 0;
              a.life = 100 + Math.random() * 100;
              a.startAngle = Math.random() * Math.PI * 2;
          }

          const currentAngle = a.startAngle + a.progress;
          const px = a.x + Math.cos(currentAngle) * a.r;
          const py = a.y + Math.sin(currentAngle) * a.r;

          // Draw "Compass Tip"
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();

          // Draw Arc Trail
          ctx.beginPath();
          ctx.arc(a.x, a.y, a.r, currentAngle - 0.2, currentAngle);
          ctx.strokeStyle = a.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw Center Point (Needle)
          ctx.fillStyle = '#525252';
          ctx.fillRect(a.x - 2, a.y - 2, 4, 4);

          a.progress += a.speed;
          a.life--;
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