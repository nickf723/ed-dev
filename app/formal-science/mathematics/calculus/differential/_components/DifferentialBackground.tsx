"use client";
import React, { useRef, useEffect } from 'react';

export default function DifferentialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const draw = () => {
      ctx.fillStyle = '#050202'; // Very dark red-black
      ctx.fillRect(0, 0, width, height);

      const step = 50; // Distance between needles
      const length = 15; // Length of needle

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          // Calculate angle based on Perlin-ish noise
          // This creates "waves" of slope
          const angle = Math.sin(x * 0.003 + time) + Math.cos(y * 0.003 + time);
          
          const centerX = x + step/2;
          const centerY = y + step/2;

          const x1 = centerX - Math.cos(angle) * length;
          const y1 = centerY - Math.sin(angle) * length;
          const x2 = centerX + Math.cos(angle) * length;
          const y2 = centerY + Math.sin(angle) * length;

          ctx.beginPath();
          // Gradient from Red to Orange
          const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
          gradient.addColorStop(0, 'rgba(239, 68, 68, 0.1)'); // Red
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0.3)'); // Orange
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.lineCap = 'round';
          
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
          
          // Draw a little "head" to show direction (optional, maybe too cluttered)
          // ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
          // ctx.fillRect(x2, y2, 2, 2);
        }
      }

      time += 0.005;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}