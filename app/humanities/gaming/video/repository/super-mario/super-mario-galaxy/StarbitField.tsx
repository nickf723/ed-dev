"use client";
import React, { useEffect, useRef } from 'react';

export default function StarbitField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star Bits
    const colors = ['#fcd34d', '#f472b6', '#60a5fa', '#4ade80', '#ffffff'];
    const bits = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        angle: Math.random() * Math.PI * 2
    }));

    const animate = () => {
      // 1. Deep Space BG
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      grad.addColorStop(0, '#1e1b4b'); // Indigo-950
      grad.addColorStop(1, '#020617'); // Slate-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Star Bits
      bits.forEach(bit => {
          // Physics: Mouse Attraction (The "Star Pointer" effect)
          const dx = mouseRef.current.x - bit.x;
          const dy = mouseRef.current.y - bit.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 200) {
              bit.vx += dx * 0.0005;
              bit.vy += dy * 0.0005;
          }

          // Friction & Movement
          bit.x += bit.vx;
          bit.y += bit.vy;
          bit.vx *= 0.98; // Dampening
          bit.vy *= 0.98;
          bit.angle += 0.05;

          // Screen Wrap
          if (bit.x < 0) bit.x = width;
          if (bit.x > width) bit.x = 0;
          if (bit.y < 0) bit.y = height;
          if (bit.y > height) bit.y = 0;

          // Draw Crystal Shape (Diamond)
          ctx.save();
          ctx.translate(bit.x, bit.y);
          ctx.rotate(bit.angle);
          ctx.fillStyle = bit.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = bit.color;
          
          ctx.beginPath();
          ctx.moveTo(0, -bit.size * 2);
          ctx.lineTo(bit.size, 0);
          ctx.lineTo(0, bit.size * 2);
          ctx.lineTo(-bit.size, 0);
          ctx.fill();
          
          ctx.restore();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}