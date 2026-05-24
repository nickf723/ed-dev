"use client";
import React, { useEffect, useRef } from 'react';

export default function ParabolaGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle High-DPI displays
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

      // 1. Draw Paper Background (Solid)
      ctx.fillStyle = '#434e8f'; // Slate-50
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Grid
      ctx.strokeStyle = 'rgba(114, 114, 114, 0.6)'; // Slate-300
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      ctx.beginPath();
      for(let x=0; x<=width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<=height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      // 3. Draw Axis
      ctx.strokeStyle = '#707070'; // Slate-400
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width/2, 0); ctx.lineTo(width/2, height);
      ctx.moveTo(0, height/2); ctx.lineTo(width, height/2);
      ctx.stroke();

      // 4. Parabolas
      time += 0.005; 
      const curves = [
          { a: 0.005, h: 0, k: -100, color: 'rgba(246, 59, 246, 0.5)' }, // Blue
          { a: 0.008, h: 300 * Math.sin(time), k: 50 * Math.cos(time), color: 'rgba(239, 79, 68, 0.5)' }, // Red
          { a: -0.005, h: -200, k: 300, color: 'rgba(50, 185, 16, 0.5)' } // Green
      ];

      curves.forEach(c => {
          ctx.beginPath();
          ctx.strokeStyle = c.color;
          ctx.lineWidth = 3;
          
          for (let x = -width/2; x < width/2; x+=10) {
              const graphX = x;
              const graphY = -1 * (c.a * Math.pow(graphX - c.h, 2) + c.k);
              const canvasX = width/2 + x;
              const canvasY = height/2 + graphY;

              if (x === -width/2) ctx.moveTo(canvasX, canvasY);
              else ctx.lineTo(canvasX, canvasY);
          }
          ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // FIXED Z-0. This sits at the bottom of the stack.
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}