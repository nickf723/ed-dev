"use client";
import React, { useEffect, useRef } from 'react';

export default function AsylumHallway() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const animate = () => {
      // 1. Base Atmosphere (Darker)
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      // 2. The Flicker (Randomized lighting failure)
      const flicker = Math.random() > 0.98 ? 0.2 : (Math.random() > 0.9 ? 0.5 : 0.8);
      
      // 3. Perspective Lines (The Hallway)
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(50, 60, 70, ${0.3 * flicker})`;

      // Floor/Ceiling
      for(let i=0; i<8; i++) {
          const spread = i * 150;
          ctx.beginPath();
          ctx.moveTo(0, height - spread); // Floor Left
          ctx.lineTo(cx, cy);
          ctx.moveTo(width, height - spread); // Floor Right
          ctx.lineTo(cx, cy);
          ctx.stroke();
      }

      // 4. Moving Doors (The endless walk)
      const speed = 2;
      const depth = (frame * speed) % 1000;
      
      for(let i=0; i<6; i++) {
          const d = (depth + i * 1000) % 6000;
          if(d < 100) continue; // Don't draw behind camera

          const scale = 500 / d; // Perspective math
          const w = 600 * scale;
          const h = 900 * scale;
          const x = cx - w/2;
          const y = cy - h/2;

          ctx.strokeStyle = `rgba(40, 40, 45, ${scale * flicker})`;
          ctx.strokeRect(x, y, w, h);
      }

      // 5. Film Grain (Noise)
      if (Math.random() > 0.5) {
          ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.03})`;
          ctx.fillRect(Math.random() * width, Math.random() * height, 2, 2);
      }

      frame++;
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