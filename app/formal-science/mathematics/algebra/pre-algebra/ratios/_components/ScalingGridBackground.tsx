"use client";
import React, { useEffect, useRef } from 'react';

export default function ScalingGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Box {
      x: number; y: number;
      baseW: number;
      baseH: number;
      scale: number;
      targetScale: number;
      color: string;
    }

    const boxes: Box[] = [];
    const count = 15;

    for(let i=0; i<count; i++) {
        // Enforce 16:9 Ratio (1.77)
        const baseH = Math.random() * 50 + 20;
        const baseW = baseH * 1.77; 
        
        boxes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            baseW, baseH,
            scale: 0,
            targetScale: Math.random() * 2 + 0.5,
            color: Math.random() > 0.5 ? '#fb7185' : '#1e3a8a' // Rose-400 or Blue-900
        });
    }

    const animate = () => {
      ctx.fillStyle = '#172554'; // Blue-950
      ctx.fillRect(0, 0, width, height);

      // Draw faint grid background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      const gridSize = 50;
      for(let x=0; x<width; x+=gridSize) { ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,height); ctx.stroke(); }
      for(let y=0; y<height; y+=gridSize) { ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(width,y); ctx.stroke(); }

      boxes.forEach(b => {
          // Smooth Lerp Scale
          b.scale += (b.targetScale - b.scale) * 0.05;
          
          // Randomly change target
          if (Math.random() > 0.99) b.targetScale = Math.random() * 3 + 0.5;

          const w = b.baseW * b.scale;
          const h = b.baseH * b.scale;

          // Draw the Box
          ctx.strokeStyle = b.color === '#fb7185' ? 'rgba(251, 113, 133, 0.5)' : 'rgba(30, 58, 138, 0.5)';
          ctx.lineWidth = 2;
          ctx.strokeRect(b.x - w/2, b.y - h/2, w, h);

          // Draw diagonal (The "Linear Relationship")
          ctx.beginPath();
          ctx.moveTo(b.x - w/2, b.y + h/2);
          ctx.lineTo(b.x + w/2, b.y - h/2);
          ctx.stroke();

          // Move slowly
          b.y -= 0.2;
          if (b.y < -100) b.y = height + 100;
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