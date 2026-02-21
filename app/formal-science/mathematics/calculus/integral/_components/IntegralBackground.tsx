"use client";
import React, { useRef, useEffect } from 'react';

export default function IntegralBackground() {
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
      ctx.fillStyle = '#010a0c'; // Deep cyan-black
      ctx.fillRect(0, 0, width, height);

      const numBars = Math.floor(width / 40); // Dynamic based on screen size
      const barWidth = width / numBars;

      ctx.globalCompositeOperation = 'screen';

      for (let i = 0; i < numBars; i++) {
        const x = i * barWidth;
        
        // Complex wave function for the "curve"
        const wave1 = Math.sin(i * 0.1 + time * 0.5) * 100;
        const wave2 = Math.cos(i * 0.05 - time * 0.2) * 50;
        const targetHeight = height / 2 + wave1 + wave2;

        // Draw the background grid behind the bars
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.05)';
        ctx.strokeRect(x, 0, barWidth, height);

        // Draw the Riemann Bar
        const barHeight = height - targetHeight;
        
        // Gradient for the bar
        const gradient = ctx.createLinearGradient(x, targetHeight, x, height);
        gradient.addColorStop(0, 'rgba(6, 182, 212, 0.2)');   // Cyan-500
        gradient.addColorStop(1, 'rgba(8, 145, 178, 0.05)');  // Cyan-600

        ctx.fillStyle = gradient;
        ctx.fillRect(x, targetHeight, barWidth - 2, barHeight);

        // Top edge highlight
        ctx.fillStyle = 'rgba(34, 211, 238, 0.5)'; // Cyan-400
        ctx.fillRect(x, targetHeight, barWidth - 2, 2);
      }

      ctx.globalCompositeOperation = 'source-over';

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}