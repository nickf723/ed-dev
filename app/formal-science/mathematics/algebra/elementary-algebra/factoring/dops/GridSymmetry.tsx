"use client";
import React, { useEffect, useRef } from 'react';

export default function GridSymmetry() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

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

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Clear
      ctx.clearRect(0, 0, width, height);

      // Draw Squares
      time += 0.01;
      const cols = 8;
      const rows = 4;
      const size = 100;
      const gap = 150;
      const startX = (width - (cols * gap)) / 2;
      const startY = (height - (rows * gap)) / 2;

      for(let r=0; r<rows; r++) {
          for(let c=0; c<cols; c++) {
              const x = startX + c * gap;
              const y = startY + r * gap;
              
              // Pulsing effect
              const pulse = Math.sin(time + c * 0.5 + r * 0.5);
              const scale = 1 + pulse * 0.1;
              
              ctx.save();
              ctx.translate(x + size/2, y + size/2);
              ctx.scale(scale, scale);
              ctx.rotate(pulse * 0.05);
              
              // Outer Square (a^2)
              ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)'; // Indigo
              ctx.lineWidth = 2;
              ctx.strokeRect(-size/2, -size/2, size, size);

              // Inner Cutout (b^2) - Visualizing the "Difference"
              const innerSize = size * 0.6;
              ctx.fillStyle = 'rgba(244, 63, 94, 0.05)'; // Rose
              ctx.fillRect(-innerSize/2, -innerSize/2, innerSize, innerSize);
              
              ctx.restore();
          }
      }

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