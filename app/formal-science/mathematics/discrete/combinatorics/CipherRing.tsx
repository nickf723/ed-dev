"use client";
import React, { useEffect, useRef } from 'react';

export default function CipherRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const rings = [
        { r: 200, speed: 0.002, count: 20 },
        { r: 350, speed: -0.003, count: 30 },
        { r: 500, speed: 0.001, count: 40 },
        { r: 650, speed: -0.002, count: 50 },
    ];

    const animate = () => {
      // 1. Dark Brass Background
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      grad.addColorStop(0, '#1c1917'); // Stone-900
      grad.addColorStop(1, '#0c0a09'); // Stone-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      time += 1;
      const cx = width / 2;
      const cy = height / 2;

      // 2. Draw Rings
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '20px monospace';

      rings.forEach((ring, idx) => {
          // Draw Circle Line
          ctx.beginPath();
          ctx.arc(cx, cy, ring.r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(214, 166, 70, ${0.1 - idx * 0.02})`; // Faint Gold
          ctx.lineWidth = 1;
          ctx.stroke();

          // Draw Characters
          const stepAngle = (Math.PI * 2) / ring.count;
          const currentRotation = time * ring.speed;

          for (let i = 0; i < ring.count; i++) {
              const theta = i * stepAngle + currentRotation;
              const x = cx + Math.cos(theta) * ring.r;
              const y = cy + Math.sin(theta) * ring.r;
              
              const charIndex = (i + idx * 5) % charset.length;
              
              // Highlight letters near horizontal center (The "Active Code")
              const distFromCenterLine = Math.abs(y - cy);
              const alpha = Math.max(0.1, 1 - distFromCenterLine / 100);
              
              ctx.fillStyle = `rgba(214, 166, 70, ${alpha})`;
              ctx.fillText(charset[charIndex], x, y);
          }
      });

      // 3. Central Highlight Bar
      ctx.fillStyle = 'rgba(214, 166, 70, 0.05)';
      ctx.fillRect(0, cy - 20, width, 40);
      ctx.strokeStyle = 'rgba(214, 166, 70, 0.2)';
      ctx.beginPath();
      ctx.moveTo(0, cy - 20); ctx.lineTo(width, cy - 20);
      ctx.moveTo(0, cy + 20); ctx.lineTo(width, cy + 20);
      ctx.stroke();

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