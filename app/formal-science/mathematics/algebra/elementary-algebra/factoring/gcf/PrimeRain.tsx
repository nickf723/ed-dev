"use client";
import React, { useEffect, useRef } from 'react';

export default function PrimeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle High-DPI
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    
    const resize = () => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.scale(dpr, dpr);
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
    };
    resize();
    window.addEventListener('resize', resize);

    // Primes and Variables
    const symbols = ['2', '3', '5', '7', '11', 'x', 'y', 'a', 'b'];
    
    interface Particle {
        x: number; y: number;
        speed: number;
        text: string;
        size: number;
        opacity: number;
    }

    const particles: Particle[] = [];
    const count = 60; // Density

    // Init
    for(let i=0; i<count; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            speed: Math.random() * 0.5 + 0.2,
            text: symbols[Math.floor(Math.random() * symbols.length)],
            size: Math.random() * 20 + 10,
            opacity: Math.random() * 0.3 + 0.1
        });
    }

    let animationFrameId: number;

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      // Draw Particles
      particles.forEach(p => {
          p.y -= p.speed; // Float Up
          
          // Reset if off top
          if (p.y < -50) {
              p.y = height + 50;
              p.x = Math.random() * width;
              p.text = symbols[Math.floor(Math.random() * symbols.length)];
          }

          ctx.font = `700 ${p.size}px monospace`;
          ctx.fillStyle = `rgba(22, 163, 74, ${p.opacity})`; // Green-600
          ctx.fillText(p.text, p.x, p.y);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
        window.removeEventListener('resize', resize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}