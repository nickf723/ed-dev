"use client";
import React, { useRef, useEffect } from 'react';

export default function RiemannBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let time = 0;

    const draw = () => {
      // Deep teal/black background
      ctx.fillStyle = '#04010a'; 
      ctx.fillRect(0, 0, width, height);

      // We want distinct, chunky rectangles to emphasize "Riemann Sums"
      const rectWidth = 60; 
      const numRects = Math.ceil(width / rectWidth);

      // The baseline for our area
      const baseline = height - 50;

      ctx.lineWidth = 1;

      // Draw the Rectangles
      for (let i = 0; i < numRects; i++) {
        const x = i * rectWidth;
        
        // Calculate the "true" height at the left edge of this rectangle
        // We use a combination of sine waves to make a rolling landscape
        const wave = Math.sin(x * 0.005 + time * 0.5) * 150 + Math.cos(x * 0.01 - time * 0.2) * 50;
        const rectHeight = baseline - (height / 2 + wave);

        // Fill
        ctx.fillStyle = 'rgba(78, 6, 212, 0.03)'; // Very faint cyan fill
        ctx.fillRect(x, height / 2 + wave, rectWidth, rectHeight);

        // Wireframe Outlines
        ctx.strokeStyle = 'rgba(44, 6, 212, 0.2)'; // Brighter cyan outline
        ctx.strokeRect(x, height / 2 + wave, rectWidth, rectHeight);
        
        // Glowing Top Edge (The evaluation point)
        ctx.fillStyle = 'rgba(88, 34, 238, 0.6)';
        ctx.fillRect(x, height / 2 + wave, rectWidth, 2);
      }

      // Draw the "True Curve" cutting smoothly through the blocks
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'; // Faint white smooth line
      ctx.lineWidth = 2;
      for (let x = 0; x < width; x += 5) {
          const wave = Math.sin(x * 0.005 + time * 0.5) * 150 + Math.cos(x * 0.01 - time * 0.2) * 50;
          const y = height / 2 + wave;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();

      time += 0.02;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}