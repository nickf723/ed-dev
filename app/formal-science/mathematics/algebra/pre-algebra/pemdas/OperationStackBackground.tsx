"use client";
import React, { useEffect, useRef } from 'react';

export default function OperationStackBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const ops = [
      { char: '( )', weight: 4, color: '#f97316' }, // Orange (Highest)
      { char: 'x²',  weight: 3, color: '#fbbf24' }, // Yellow
      { char: '×',   weight: 2, color: '#38bdf8' }, // Sky
      { char: '÷',   weight: 2, color: '#38bdf8' },
      { char: '+',   weight: 1, color: '#94a3b8' }, // Slate (Lowest)
      { char: '-',   weight: 1, color: '#94a3b8' },
    ];

    interface Particle {
      x: number; y: number;
      char: string;
      color: string;
      speed: number;
      targetY: number; // Where it wants to float based on weight
    }

    const particles: Particle[] = [];

    const spawn = () => {
      const op = ops[Math.floor(Math.random() * ops.length)];
      // Heavier weights (lower priority) go lower physically in this metaphor? 
      // Actually, let's invert: High Priority = High Altitude (Top of stack)
      const targetY = height - (op.weight * (height / 5)); 
      
      particles.push({
        x: Math.random() * width,
        y: height + 50, // Start from bottom
        char: op.char,
        color: op.color,
        speed: Math.random() * 2 + 1,
        targetY: targetY + (Math.random() * 50 - 25)
      });
    };

    const animate = () => {
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw Priority Zones (Subtle background stripes)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
      for(let i=1; i<=4; i++) {
          const y = height - (i * (height / 5));
          ctx.fillRect(0, y, width, 2);
      }

      if (Math.random() > 0.92) spawn();

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        // Float towards target level
        const dy = p.targetY - p.y;
        p.y += dy * 0.02; // Ease to position
        p.x += Math.sin(Date.now() * 0.001 + p.y) * 0.5; // Drift

        ctx.font = '20px monospace';
        ctx.fillStyle = p.color;
        ctx.fillText(p.char, p.x, p.y);

        // Fade out if it's been around too long (simple culling)
        if (Math.random() > 0.995) particles.splice(i, 1);
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