"use client";
import React, { useEffect, useRef } from 'react';

export default function FlatironsEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const animate = () => {
      // 1. Sky Gradient (Day to Dusk cycle)
      time += 0.002;
      const cycle = Math.sin(time) * 0.5 + 0.5; // 0 to 1
      
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      // Interpolate colors: Blue (Day) -> Purple/Orange (Sunset)
      const r1 = 135 + (20 - 135) * cycle;
      const g1 = 206 + (24 - 206) * cycle;
      const b1 = 235 + (70 - 235) * cycle;
      
      grad.addColorStop(0, `rgb(${r1},${g1},${b1})`); // Sky Top
      grad.addColorStop(1, cycle > 0.7 ? '#f97316' : '#bfdbfe'); // Horizon glow
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. The Flatirons (Procedural Slanted Rocks)
      const baseH = height;
      const peaks = [
          { x: width * 0.3, h: 400, w: 150 },
          { x: width * 0.45, h: 500, w: 180 }, // Third Flatiron (Tallest)
          { x: width * 0.6, h: 420, w: 160 },
          { x: width * 0.75, h: 350, w: 140 },
      ];

      peaks.forEach((p, i) => {
          ctx.beginPath();
          // The iconic 60-degree slant
          const slant = 100; 
          
          ctx.moveTo(p.x - p.w/2, baseH); // Bottom Left
          ctx.lineTo(p.x + slant, baseH - p.h); // Peak
          ctx.lineTo(p.x + p.w/2 + slant, baseH); // Bottom Right
          
          // Sandstone Color with Shadow
          const rockColor = cycle > 0.6 ? '#7c2d12' : '#57534e'; // Redder at sunset
          ctx.fillStyle = rockColor;
          ctx.fill();
          
          // Highlight edge (Sun hitting the slab)
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x - p.w/2 + 20, baseH);
          ctx.lineTo(p.x + slant, baseH - p.h);
          ctx.stroke();
      });

      // 3. Pine Trees (Silhouette Foreground)
      ctx.fillStyle = '#022c22'; // Dark Green/Black
      const treeCount = Math.floor(width / 30);
      for(let i=0; i<treeCount; i++) {
          const x = i * 30 + Math.sin(i)*10;
          const h = 50 + Math.abs(Math.sin(i*132))*100;
          
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(x + 10, height - h);
          ctx.lineTo(x + 20, height);
          ctx.fill();
      }

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