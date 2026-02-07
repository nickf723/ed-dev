"use client";
import React, { useEffect, useRef } from 'react';

export default function BauhausGridEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const gridSize = 60;

    interface Block {
      x: number; y: number;
      w: number; h: number;
      color: string;
      targetX: number;
      targetY: number;
    }

    const blocks: Block[] = [];
    const colors = ['#ef4444', '#3b82f6', '#fbbf24', '#171717']; // Red, Blue, Yellow, Black

    // Initialize random blocks
    for(let i=0; i<15; i++) {
        blocks.push({
            x: Math.floor(Math.random() * (width/gridSize)) * gridSize,
            y: Math.floor(Math.random() * (height/gridSize)) * gridSize,
            w: (Math.floor(Math.random() * 2) + 1) * gridSize,
            h: (Math.floor(Math.random() * 2) + 1) * gridSize,
            color: colors[Math.floor(Math.random() * colors.length)],
            targetX: 0, targetY: 0
        });
    }

    // Logic to pick a new target
    const retarget = (b: Block) => {
        if(Math.random() > 0.5) {
            // Move Horizontal
            b.targetX = b.x + (Math.random() > 0.5 ? gridSize : -gridSize) * 2;
            b.targetY = b.y;
        } else {
            // Move Vertical
            b.targetX = b.x;
            b.targetY = b.y + (Math.random() > 0.5 ? gridSize : -gridSize) * 2;
        }
    };

    blocks.forEach(b => retarget(b));

    const animate = () => {
      ctx.fillStyle = '#f5f5f4'; // Stone-100 (Off-white paper)
      ctx.fillRect(0, 0, width, height);

      // 1. Draw Grid Lines
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x=0; x<width; x+=gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, height); }
      for(let y=0; y<height; y+=gridSize) { ctx.moveTo(0, y); ctx.lineTo(width, y); }
      ctx.stroke();

      // 2. Animate Blocks
      blocks.forEach(b => {
          // Linear Interpolation (Lerp)
          b.x += (b.targetX - b.x) * 0.05;
          b.y += (b.targetY - b.y) * 0.05;

          // If close to target, pick new target occasionally
          if(Math.abs(b.x - b.targetX) < 1 && Math.abs(b.y - b.targetY) < 1) {
              if(Math.random() > 0.98) retarget(b);
          }

          // Draw Block
          ctx.fillStyle = b.color;
          ctx.fillRect(b.x, b.y, b.w, b.h);
          
          // Draw heavy border (Mondrian style)
          ctx.strokeStyle = '#171717';
          ctx.lineWidth = 4;
          ctx.strokeRect(b.x, b.y, b.w, b.h);
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