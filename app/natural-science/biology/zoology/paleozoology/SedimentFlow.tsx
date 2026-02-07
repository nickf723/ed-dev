"use client";
import React, { useEffect, useRef } from 'react';

export default function SedimentFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particles (Dust/Dirt)
    const particles = Array.from({ length: 150 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 0.5 + 0.1,
        size: Math.random() * 2,
        opacity: Math.random() * 0.5
    }));

    const animate = () => {
      // 1. Stratigraphy Gradient
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#292524'); // Stone-800
      grad.addColorStop(1, '#1c1917'); // Stone-900
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Texture Overlay (Noise simulation)
      // (Simplified for canvas performance)
      
      // 3. Drifting Sediment
      ctx.fillStyle = '#d6d3d1'; // Stone-300
      particles.forEach(p => {
          p.y += p.speed;
          if (p.y > height) p.y = -10;
          
          ctx.globalAlpha = p.opacity;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-overlay" />;
}