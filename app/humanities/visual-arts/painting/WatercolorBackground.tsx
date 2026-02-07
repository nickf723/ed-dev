"use client";
import React, { useEffect, useRef } from 'react';

export default function WatercolorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Bloom {
      x: number; y: number;
      radius: number;
      maxRadius: number;
      color: string;
      alpha: number;
      growth: number;
    }

    const blooms: Bloom[] = [];
    const colors = [
        '244, 63, 94',  // Rose
        '59, 130, 246', // Blue
        '245, 158, 11', // Amber
        '16, 185, 129'  // Emerald
    ];

    const animate = () => {
      // 1. Paper Texture Background (Creamy)
      ctx.fillStyle = '#fefce8'; // Yellow-50 (Paper)
      ctx.fillRect(0, 0, width, height);

      // 2. Add New Bloom Randomly
      if (Math.random() > 0.99 && blooms.length < 8) {
          blooms.push({
              x: Math.random() * width,
              y: Math.random() * height,
              radius: 0,
              maxRadius: Math.random() * 300 + 100,
              color: colors[Math.floor(Math.random() * colors.length)],
              alpha: 0.8,
              growth: Math.random() * 0.5 + 0.2
          });
      }

      // 3. Draw Blooms
      blooms.forEach((b, i) => {
          b.radius += b.growth;
          b.alpha -= 0.001; // Fade out very slowly

          if (b.alpha <= 0) {
              blooms.splice(i, 1);
              return;
          }

          const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.radius);
          grad.addColorStop(0, `rgba(${b.color}, ${b.alpha * 0.2})`);
          grad.addColorStop(0.5, `rgba(${b.color}, ${b.alpha * 0.1})`);
          grad.addColorStop(1, `rgba(${b.color}, 0)`);

          // Organic wobble effect
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.radius, 0, Math.PI*2);
          ctx.fillStyle = grad;
          // Composite mode to blend like watercolors
          ctx.globalCompositeOperation = 'multiply';
          ctx.fill();
          ctx.globalCompositeOperation = 'source-over';
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