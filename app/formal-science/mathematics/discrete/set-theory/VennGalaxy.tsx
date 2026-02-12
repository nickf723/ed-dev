"use client";
import React, { useEffect, useRef } from 'react';

export default function VennGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Bubble Sets
    const sets = Array.from({ length: 15 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 80 + 40,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: Math.random() > 0.5 ? '0, 255, 255' : '255, 0, 255' // Cyan or Magenta
    }));

    const animate = () => {
      // 1. Deep Void BG
      ctx.fillStyle = '#0f172a'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // 2. Set Composite Mode for "Glow"
      ctx.globalCompositeOperation = 'screen'; 

      // 3. Draw Sets
      sets.forEach(s => {
          s.x += s.vx;
          s.y += s.vy;

          // Bounce
          if(s.x < 0 || s.x > width) s.vx *= -1;
          if(s.y < 0 || s.y > height) s.vy *= -1;

          // Gradient Fill
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r);
          grad.addColorStop(0, `rgba(${s.color}, 0.2)`);
          grad.addColorStop(1, `rgba(${s.color}, 0)`);

          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
          
          // Stroke
          ctx.strokeStyle = `rgba(${s.color}, 0.3)`;
          ctx.lineWidth = 1;
          ctx.stroke();
      });

      // Reset
      ctx.globalCompositeOperation = 'source-over';

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