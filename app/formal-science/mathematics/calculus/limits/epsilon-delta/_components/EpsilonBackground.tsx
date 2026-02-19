"use client";
import React, { useRef, useEffect } from 'react';

export default function EpsilonBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // "Target" Particles
    const targets = Array.from({ length: 15 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 50 + 50,
      velX: (Math.random() - 0.5) * 0.5,
      velY: (Math.random() - 0.5) * 0.5,
      shrinkSpeed: Math.random() * 0.2 + 0.1,
      color: Math.random() > 0.5 ? '245, 158, 11' : '59, 130, 246' // Amber or Blue
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#050505'; 
      ctx.fillRect(0, 0, width, height);

      // Draw dashed crosshairs grid
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 1;
      ctx.setLineDash([5, 5]);
      
      const gridSize = 150;
      for(let x = 0; x <= width; x += gridSize) {
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }
      for(let y = 0; y <= height; y += gridSize) {
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke();
      }
      ctx.setLineDash([]);

      // Draw Targets
      targets.forEach(t => {
        t.x += t.velX;
        t.y += t.velY;
        t.size -= t.shrinkSpeed;

        // Reset if too small
        if (t.size <= 10) {
            t.x = Math.random() * width;
            t.y = Math.random() * height;
            t.size = 100;
        }

        ctx.strokeStyle = `rgba(${t.color}, 0.1)`;
        ctx.lineWidth = 2;
        
        // Draw brackets corners instead of full rect for a "HUD" look
        const s = t.size;
        const len = s * 0.3;
        
        ctx.beginPath();
        // Top Left
        ctx.moveTo(t.x, t.y + len); ctx.lineTo(t.x, t.y); ctx.lineTo(t.x + len, t.y);
        // Top Right
        ctx.moveTo(t.x + s - len, t.y); ctx.lineTo(t.x + s, t.y); ctx.lineTo(t.x + s, t.y + len);
        // Bottom Right
        ctx.moveTo(t.x + s, t.y + s - len); ctx.lineTo(t.x + s, t.y + s); ctx.lineTo(t.x + s - len, t.y + s);
        // Bottom Left
        ctx.moveTo(t.x + len, t.y + s); ctx.lineTo(t.x, t.y + s); ctx.lineTo(t.x, t.y + s - len);
        
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}