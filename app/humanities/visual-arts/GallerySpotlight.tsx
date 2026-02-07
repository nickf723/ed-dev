"use client";
import React, { useEffect, useRef, useState } from 'react';

export default function GallerySpotlight() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
        setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Floating Particles (Dust Motes in the light)
    const particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2
    }));

    const animate = () => {
      // 1. Clear
      ctx.fillStyle = '#09090b'; // Zinc-950
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Subtle Background Texture (Sketches)
      // Only visible near mouse (We cheat by drawing them low opacity everywhere, 
      // but bright near mouse)
      
      // ... (Particle Logic)
      particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if(p.x < 0) p.x = width; 
          if(p.x > width) p.x = 0;
          if(p.y < 0) p.y = height;
          if(p.y > height) p.y = 0;

          // Distance to mouse
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const spotlightRadius = 400;

          if (dist < spotlightRadius) {
              const alpha = 1 - (dist / spotlightRadius);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
              ctx.fill();
          }
      });

      // 3. The Spotlight Beam (Gradient Overlay)
      const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 600);
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.34)'); // Center glow
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, [mouse]);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}