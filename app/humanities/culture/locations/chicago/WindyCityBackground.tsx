"use client";
import React, { useEffect, useRef } from 'react';

export default function WindyCityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface WindLine {
      x: number; y: number;
      length: number;
      speed: number;
      opacity: number;
    }

    const lines: WindLine[] = [];
    for(let i=0; i<100; i++) {
        lines.push({
            x: Math.random() * width,
            y: Math.random() * height * 0.8, // Sky area
            length: Math.random() * 200 + 50,
            speed: Math.random() * 10 + 5,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    const animate = () => {
      // Deep Lake Blue Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0c4a6e'); // Sky-900
      grad.addColorStop(1, '#020617'); // Slate-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Wind
      lines.forEach(l => {
          l.x += l.speed;
          if (l.x > width) l.x = -l.length;

          ctx.beginPath();
          ctx.moveTo(l.x, l.y);
          ctx.lineTo(l.x + l.length, l.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${l.opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
      });

      // Draw Skyline Silhouette (Procedural)
      ctx.fillStyle = '#0f172a';
      ctx.beginPath();
      ctx.moveTo(0, height);
      let cx = 0;
      while (cx < width) {
          const buildingW = Math.random() * 50 + 30;
          const buildingH = Math.random() * 150 + 50;
          // Willis Tower spike
          if (Math.random() > 0.95) {
              ctx.lineTo(cx, height - 300);
              ctx.lineTo(cx + 40, height - 300);
              ctx.lineTo(cx + 40, height);
              cx += 40;
          } else {
              ctx.lineTo(cx, height - buildingH);
              ctx.lineTo(cx + buildingW, height - buildingH);
              ctx.lineTo(cx + buildingW, height);
              cx += buildingW;
          }
      }
      ctx.lineTo(width, height);
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