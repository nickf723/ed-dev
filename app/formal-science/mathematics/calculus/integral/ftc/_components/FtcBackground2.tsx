"use client";
import React, { useRef, useEffect } from 'react';

export default function FTCBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const particles = Array.from({ length: 60 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: Math.random() * 2 + 1,
      offset: Math.random() * Math.PI * 2,
      // Half red (derivatives), half blue (integrals)
      type: Math.random() > 0.5 ? 'red' : 'blue' 
    }));

    const draw = () => {
      ctx.fillStyle = '#03000a'; // Deep indigo black
      ctx.fillRect(0, 0, width, height);

      // Draw merging wave in the background
      ctx.beginPath();
      for (let x = 0; x <= width; x += 10) {
          const wave = Math.sin(x * 0.005 - time * 0.5) * 100;
          const y = height / 2 + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.1)'; // Indigo-500
      ctx.lineWidth = 40;
      ctx.stroke();

      // Draw particles
      particles.forEach(p => {
        p.x += p.speed;
        p.y += Math.sin(time + p.offset) * 1;

        if (p.x > width) p.x = 0;

        // As they get closer to the center Y, they merge into Indigo
        const distFromCenter = Math.abs(p.y - height / 2);
        const isMerged = distFromCenter < 100;

        let color = p.type === 'red' ? '239, 68, 68' : '59, 130, 246';
        if (isMerged) color = '99, 102, 241'; // Indigo

        ctx.beginPath();
        ctx.arc(p.x, p.y, isMerged ? 3 : 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${isMerged ? 0.8 : 0.3})`;
        ctx.fill();
        
        if (isMerged) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = `rgba(${color}, 0.8)`;
        } else {
            ctx.shadowBlur = 0;
        }
      });

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}