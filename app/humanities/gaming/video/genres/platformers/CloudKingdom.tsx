"use client";
import React, { useEffect, useRef } from 'react';

export default function CloudKingdom() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Generate Clouds
    const clouds = Array.from({ length: 15 }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height * 0.5, // Top half only
        size: Math.random() * 50 + 50,
        speed: Math.random() * 0.2 + 0.05,
        opacity: Math.random() * 0.5 + 0.1
    }));

    // Generate Floating Islands (Triangles)
    const islands = Array.from({ length: 5 }, (_, i) => ({
        x: Math.random() * width,
        y: height * 0.6 + Math.random() * 200,
        w: Math.random() * 100 + 50,
        floatOffset: Math.random() * 100,
        speed: Math.random() * 0.1 + 0.02
    }));

    const animate = () => {
      // 1. Sky Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#38bdf8'); // Sky-400
      grad.addColorStop(1, '#e0f2fe'); // Sky-50
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      time += 0.01;

      // 2. Draw Clouds
      ctx.fillStyle = '#fff';
      clouds.forEach(c => {
          c.x += c.speed;
          if(c.x > width + 100) c.x = -100;
          
          ctx.globalAlpha = c.opacity;
          ctx.beginPath();
          ctx.arc(c.x, c.y, c.size, 0, Math.PI * 2);
          ctx.arc(c.x + c.size*0.7, c.y - c.size*0.5, c.size*0.8, 0, Math.PI * 2);
          ctx.arc(c.x - c.size*0.7, c.y - c.size*0.5, c.size*0.8, 0, Math.PI * 2);
          ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 3. Draw Floating Islands (Geometric)
      islands.forEach(isle => {
          // Bobbing motion
          const y = isle.y + Math.sin(time + isle.floatOffset) * 10;
          
          ctx.fillStyle = '#166534'; // Green Top
          ctx.beginPath();
          ctx.ellipse(isle.x, y, isle.w, isle.w * 0.3, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#78350f'; // Dirt Bottom (Cone)
          ctx.beginPath();
          ctx.moveTo(isle.x - isle.w, y);
          ctx.lineTo(isle.x + isle.w, y);
          ctx.lineTo(isle.x, y + isle.w * 1.5);
          ctx.fill();
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