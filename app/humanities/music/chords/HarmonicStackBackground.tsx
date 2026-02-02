"use client";
import React, { useEffect, useRef } from 'react';

export default function HarmonicStackBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Configuration
    const cols = 24;
    const stacks: { h: number, speed: number, hue: number }[] = [];

    for (let i = 0; i < cols; i++) {
        stacks.push({
            h: Math.random() * height * 0.5,
            speed: Math.random() * 0.02 + 0.01,
            hue: Math.random() > 0.5 ? 45 : 340 // Amber or Rose
        });
    }

    const animate = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);

      const colWidth = width / cols;

      stacks.forEach((stack, i) => {
        // Oscillate height
        const currentH = stack.h + Math.sin(Date.now() * stack.speed * 0.1) * 50;
        
        const x = i * colWidth;
        const y = height - currentH;

        // Draw Bar
        const gradient = ctx.createLinearGradient(x, height, x, y);
        gradient.addColorStop(0, `hsla(${stack.hue}, 80%, 60%, 0.1)`);
        gradient.addColorStop(1, `hsla(${stack.hue}, 80%, 60%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, colWidth - 2, currentH);

        // Draw "Note" head
        ctx.fillStyle = `hsla(${stack.hue}, 80%, 70%, 0.3)`;
        ctx.fillRect(x, y, colWidth - 2, 4);
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