"use client";
import React, { useEffect, useRef } from 'react';

export default function MonteCarloBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Simulation State
    let total = 0;
    let inside = 0;
    const dotsPerFrame = 20;
    
    // Visual storage (only keep recent dots to prevent lag)
    const dots: {x: number, y: number, in: boolean, life: number}[] = [];

    const animate = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)'; // Slate-950 with trail
      ctx.fillRect(0, 0, width, height);

      // Define Simulation Area (Centered Square)
      const size = Math.min(width, height) * 0.8;
      const radius = size / 2;
      const centerX = width / 2;
      const centerY = height / 2;

      // Draw Boundary Circle (Target)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.1)'; // Purple-400
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw Boundary Square
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.strokeRect(centerX - radius, centerY - radius, size, size);

      // Generate Random Points
      for(let i=0; i<dotsPerFrame; i++) {
        // Random point inside the square
        const x = (Math.random() * size) - radius;
        const y = (Math.random() * size) - radius;
        
        // Check if inside circle (Pythagoras)
        const isInside = (x*x + y*y) <= (radius*radius);
        
        total++;
        if (isInside) inside++;

        dots.push({
            x: centerX + x,
            y: centerY + y,
            in: isInside,
            life: 1.0
        });
      }

      // Draw Dots
      for (let i = dots.length - 1; i >= 0; i--) {
        const d = dots[i];
        d.life -= 0.02; // Fade out

        if (d.life <= 0) {
            dots.splice(i, 1);
            continue;
        }

        ctx.fillStyle = d.in 
            ? `rgba(232, 121, 249, ${d.life})` // Pink-400 (Hit)
            : `rgba(148, 163, 184, ${d.life * 0.3})`; // Slate-400 (Miss)
        
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.in ? 1.5 : 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw PI Estimation
      const piEstimate = (4 * (inside / total)).toFixed(5);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.font = '100px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(piEstimate, centerX, centerY);

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