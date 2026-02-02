"use client";
import React, { useEffect, useRef } from 'react';

export default function PlaybookBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Player {
      x: number; y: number;
      tx: number; ty: number; // Target
      role: 'offense' | 'defense';
      speed: number;
    }

    const players: Player[] = [];
    const playState = { active: false, timer: 0 };

    const resetPlay = () => {
        players.length = 0;
        // Offense Line
        for(let i=0; i<5; i++) {
            players.push({
                x: width/2 - 100 + i*50,
                y: height * 0.7,
                tx: width/2 - 100 + i*50 + (Math.random() - 0.5) * 200,
                ty: height * 0.3,
                role: 'offense',
                speed: Math.random() * 2 + 2
            });
        }
        // Defense Line
        for(let i=0; i<5; i++) {
            players.push({
                x: width/2 - 100 + i*50,
                y: height * 0.5,
                tx: width/2 - 100 + i*50 + (Math.random() - 0.5) * 100,
                ty: height * 0.6, // Reacting back
                role: 'defense',
                speed: Math.random() * 1.5 + 1
            });
        }
        playState.active = true;
        playState.timer = 0;
    };

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // Draw Field Lines (Perspective Grid)
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)'; // Emerald-500 low opacity
      ctx.lineWidth = 1;
      
      // Vertical Yard Lines
      for(let x = 0; x < width; x += 100) {
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(width/2 + (x - width/2)*0.2, 0); // Vanishing point perspective
          ctx.stroke();
      }
      // Horizontal Hash Marks
      for(let y = height; y > 0; y -= 80) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
      }

      // Logic
      if (playState.timer > 200) resetPlay();
      playState.timer++;

      // Draw Players
      players.forEach(p => {
          // Move towards target
          const dx = p.tx - p.x;
          const dy = p.ty - p.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist > 5) {
              p.x += (dx/dist) * p.speed;
              p.y += (dy/dist) * p.speed;
          }

          // Draw Route Line (The Chalk)
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.tx, p.ty);
          ctx.strokeStyle = p.role === 'offense' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(59, 130, 246, 0.1)'; // Orange vs Blue
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw Player Dot
          ctx.fillStyle = p.role === 'offense' ? '#f97316' : '#3b82f6';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fill();
          
          // Halo
          ctx.fillStyle = p.role === 'offense' ? 'rgba(249, 115, 22, 0.2)' : 'rgba(59, 130, 246, 0.2)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
          ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        resetPlay();
    };
    window.addEventListener('resize', handleResize);
    
    resetPlay();
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}