"use client";
import React, { useEffect, useRef } from 'react';

export default function ScoreFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Symbols to draw
    const symbols = ['♩', '♪', '♫', '♬', '♭', '♯', '𝄞', '𝄢', '𝄽'];
    
    interface Floater {
      x: number;
      y: number;
      symbol: string;
      size: number;
      speed: number;
      opacity: number;
    }

    const floaters: Floater[] = [];
    
    // Create static staff lines
    const staves = 4;
    const spacing = height / (staves + 1);

    const spawnFloater = () => {
       const staffIndex = Math.floor(Math.random() * staves);
       const baseY = spacing * (staffIndex + 1);
       // Random offset within the staff lines (approx 40px height)
       const offset = (Math.random() * 40) - 20; 
       
       floaters.push({
         x: width + 50,
         y: baseY + offset,
         symbol: symbols[Math.floor(Math.random() * symbols.length)],
         size: Math.random() * 20 + 20,
         speed: Math.random() * 1 + 0.5,
         opacity: Math.random() * 0.5 + 0.1
       });
    };

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      // Draw Staves (5 lines per staff)
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(167, 139, 250, 0.1)'; // Purple-400 low opacity

      for(let s = 0; s < staves; s++) {
        const baseY = spacing * (s + 1);
        for(let l = -2; l <= 2; l++) {
            const y = baseY + (l * 10);
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
      }

      // Update & Draw Symbols
      if (Math.random() > 0.97) spawnFloater();

      for (let i = floaters.length - 1; i >= 0; i--) {
        const f = floaters[i];
        f.x -= f.speed;

        ctx.font = `${f.size}px serif`;
        ctx.fillStyle = `rgba(167, 139, 250, ${f.opacity})`;
        ctx.fillText(f.symbol, f.x, f.y);

        if (f.x < -50) floaters.splice(i, 1);
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