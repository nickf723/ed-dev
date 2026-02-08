"use client";
import React, { useEffect, useRef } from 'react';

export default function EquilibriumEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High-DPI support
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const resize = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    let animationFrameId: number;

    const scales = Array.from({ length: 6 }, (_, i) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 40 + 30,
        offset: Math.random() * 100,
        speed: Math.random() * 0.005 + 0.002
    }));

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear
      ctx.clearRect(0, 0, width, height);

      time += 0.02;

      // Draw Scales
      scales.forEach(s => {
          const tilt = Math.sin(time * s.speed + s.offset) * 0.2; // Radians
          
          ctx.save();
          ctx.translate(s.x, s.y);
          ctx.rotate(tilt);

          ctx.strokeStyle = 'rgba(20, 184, 166, 0.15)'; // Teal-500 low opacity
          ctx.lineWidth = 2;

          // Main Beam
          ctx.beginPath();
          ctx.moveTo(-s.size, 0);
          ctx.lineTo(s.size, 0);
          ctx.stroke();

          // Fulcrum
          ctx.fillStyle = 'rgba(20, 184, 166, 0.2)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(-5, 10);
          ctx.lineTo(5, 10);
          ctx.fill();

          // Plates
          [ -1, 1 ].forEach(dir => {
              const px = dir * s.size;
              const py = 0;
              
              // String
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(px, py + 20);
              ctx.stroke();

              // Plate
              ctx.beginPath();
              ctx.arc(px, py + 25, 8, 0, Math.PI, false);
              ctx.stroke();
          });

          ctx.restore();

          // Drift
          s.y -= 0.2; 
          if(s.y < -50) s.y = height + 50;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}