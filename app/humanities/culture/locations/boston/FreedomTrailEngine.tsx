"use client";
import React, { useEffect, useRef } from 'react';

export default function FreedomTrailEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Lantern particles
    const lanterns = Array.from({ length: 20 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        baseY: Math.random() * height,
        speed: Math.random() * 0.2 + 0.1,
        flicker: Math.random(),
    }));

    const animate = () => {
      // 1. Midnight Blue/Brick Background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#1e1b4b'); // Indigo-950 (Night Sky)
      grad.addColorStop(1, '#450a0a'); // Red-950 (Brick shadows)
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      // 2. The Freedom Trail (Winding Red Line)
      ctx.beginPath();
      ctx.strokeStyle = '#ef4444'; // Red-500
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.setLineDash([15, 10]); // Cobblestone-ish dash
      
      // Draw a sine wave path that simulates a winding street
      for (let x = 0; x < width; x += 5) {
          const y = height/2 + Math.sin(x * 0.005 + time) * 100 + Math.cos(x * 0.02) * 50;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.setLineDash([]); // Reset

      // 3. Lanterns (Flickering Gold)
      lanterns.forEach(l => {
          l.flicker += 0.1;
          const alpha = 0.5 + Math.sin(l.flicker) * 0.3;
          
          ctx.beginPath();
          const glow = ctx.createRadialGradient(l.x, l.y, 0, l.x, l.y, 20);
          glow.addColorStop(0, `rgba(251, 191, 36, ${alpha})`); // Amber
          glow.addColorStop(1, 'transparent');
          
          ctx.fillStyle = glow;
          ctx.arc(l.x, l.y, 20, 0, Math.PI * 2);
          ctx.fill();
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