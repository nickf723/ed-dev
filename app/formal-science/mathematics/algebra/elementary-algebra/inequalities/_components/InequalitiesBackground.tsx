"use client";
import React, { useEffect, useRef } from 'react';

export default function InequalitiesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Sky / Cyan theme
    const symbols = ['<', '>', '≤', '≥', '≠'];
    const particles = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: Math.random() * 20 + 10,
      opacity: Math.random() * 0.2 + 0.05
    }));

    // Shaded Regions
    const regions = [
      { x: w * 0.2, dir: 1, speed: 0.2, color: 'rgba(14, 165, 233, 0.03)' },
      { x: w * 0.8, dir: -1, speed: 0.15, color: 'rgba(6, 182, 212, 0.03)' }
    ];

    const animate = () => {
      ctx.fillStyle = '#081326'; // Very dark sky/navy
      ctx.fillRect(0, 0, w, h);

      // Draw Shaded Regions
      regions.forEach(r => {
        r.x += r.dir * r.speed;
        if (r.x > w + 100 || r.x < -100) r.dir *= -1; // Bounce
        
        ctx.fillStyle = r.color;
        if (r.dir === 1) {
            ctx.fillRect(r.x, 0, w, h); // Shade right
            ctx.strokeStyle = 'rgba(14, 165, 233, 0.2)';
            ctx.beginPath(); ctx.moveTo(r.x, 0); ctx.lineTo(r.x, h); ctx.stroke();
        } else {
            ctx.fillRect(0, 0, r.x, h); // Shade left
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.2)';
            ctx.beginPath(); ctx.moveTo(r.x, 0); ctx.lineTo(r.x, h); ctx.stroke();
        }
      });

      // Draw Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        ctx.font = `bold ${p.size}px "Fira Code", monospace`;
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`; // Sky-400
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.symbol, p.x, p.y);
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener('resize', handleResize);
    return () => { window.removeEventListener('resize', handleResize); cancelAnimationFrame(animId); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}