"use client";
import React, { useEffect, useRef } from 'react';

export default function CongruenceScanner() {
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
      // 1. Blueprint Background
      ctx.fillStyle = '#172554'; // Blue-950
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      ctx.beginPath();
      for(let x=0; x<=width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<=height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      time += 0.01;

      // 3. Floating Triangles (The "Search")
      // Triangle 1 (Static-ish)
      const cx = width / 2 - 100;
      const cy = height / 2;
      const size = 150;
      
      const drawTri = (x: number, y: number, rot: number, color: string, isGhost: boolean) => {
          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rot);
          
          ctx.beginPath();
          ctx.moveTo(0, -size); // Top
          ctx.lineTo(size * 0.866, size * 0.5); // Bottom Right
          ctx.lineTo(-size * 0.866, size * 0.5); // Bottom Left
          ctx.closePath();
          
          if (isGhost) {
              ctx.strokeStyle = color;
              ctx.setLineDash([5, 5]);
              ctx.stroke();
              ctx.setLineDash([]);
          } else {
              ctx.strokeStyle = color;
              ctx.lineWidth = 3;
              ctx.stroke();
              ctx.fillStyle = color.replace('1)', '0.1)');
              ctx.fill();
          }
          
          // Tick Marks (Congruence indicators)
          ctx.beginPath();
          ctx.moveTo(10, size * 0.5 - 5); ctx.lineTo(10, size * 0.5 + 5); // Bottom tick
          ctx.stroke();

          ctx.restore();
      };

      // Draw Left Triangle (Target)
      drawTri(cx, cy, 0, 'rgba(250, 204, 21, 1)', false); // Yellow

      // Draw Right Triangle (Scanning/Matching)
      // It moves closer and rotates to match
      const matchProgress = (Math.sin(time) + 1) / 2; // 0 to 1 oscillating
      const tx = width / 2 + 100 - (200 * matchProgress); // Moves left
      const trot = Math.PI - (Math.PI * matchProgress); // Rotates to 0
      
      // When close, it glows green
      const isMatched = matchProgress > 0.95;
      const color = isMatched ? 'rgba(74, 222, 128, 1)' : 'rgba(96, 165, 250, 1)'; // Green vs Blue

      drawTri(tx, cy, trot, color, false);

      // Scanline effect
      if (isMatched) {
          ctx.fillStyle = 'rgba(74, 222, 128, 0.2)';
          ctx.fillRect(cx - size, cy - size - 50, size * 2, size * 2 + 100);
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