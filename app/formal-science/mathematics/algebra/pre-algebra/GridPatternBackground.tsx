"use client";
import React, { useEffect, useRef } from 'react';

export default function GridPatternBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let offset = 0;

    interface Equation {
      m: number;
      b: number;
      color: string;
      progress: number;
      points: {x: number, y: number}[];
    }

    const equations: Equation[] = [];

    const spawnEquation = () => {
        const m = (Math.random() - 0.5) * 4; // Slope
        const b = (Math.random() - 0.5) * height; // Y-intercept
        equations.push({
            m, b,
            color: Math.random() > 0.5 ? '#60a5fa' : '#fbbf24', // Blue or Yellow
            progress: 0,
            points: []
        });
    };

    const animate = () => {
      // Blueprint Blue Background
      ctx.fillStyle = '#172554'; 
      ctx.fillRect(0, 0, width, height);

      // Draw Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      
      const gridSize = 40;
      offset = (offset + 0.2) % gridSize;

      for (let x = offset; x < width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for (let y = offset; y < height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }

      // Draw "Solving" Lines
      if (Math.random() > 0.98) spawnEquation();

      equations.forEach((eq, i) => {
          eq.progress += 10;
          
          // Calculate line segment
          const startX = 0;
          const endX = eq.progress;
          const startY = (height/2) - (startX * eq.m + eq.b);
          const endY = (height/2) - (endX * eq.m + eq.b);

          ctx.beginPath();
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = eq.color;
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw "Solution" dot at intersections (simple visual effect)
          if (Math.random() > 0.95) {
             ctx.fillStyle = '#fff';
             ctx.beginPath();
             ctx.arc(endX, endY, 3, 0, Math.PI*2);
             ctx.fill();
          }

          if (eq.progress > width) equations.splice(i, 1);
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