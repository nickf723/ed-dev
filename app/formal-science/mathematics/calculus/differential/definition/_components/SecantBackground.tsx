"use client";
import React, { useRef, useEffect } from 'react';

export default function SecantBackground() {
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
      ctx.fillStyle = '#050202'; // Deep dark background
      ctx.fillRect(0, 0, width, height);

      const step = 60; // Spacing
      const length = 20; // Line length

      for (let x = 0; x < width; x += step) {
        for (let y = 0; y < height; y += step) {
          const centerX = x + step / 2;
          const centerY = y + step / 2;

          // 1. The True Slope (Red Tangent)
          // Varies slowly across screen
          const tangentAngle = Math.sin(x * 0.002) + Math.cos(y * 0.002);
          
          // 2. The Approximating Slope (Blue Secant)
          // Oscillates closer and further from the tangent based on time
          // Simulates h -> 0
          const h = Math.sin(time * 0.02) * 1.5; // The "distance"
          const secantAngle = tangentAngle + h;

          // Draw Tangent (Ghostly Red)
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(239, 68, 68, 0.15)'; // Red
          ctx.lineWidth = 2;
          ctx.moveTo(centerX - Math.cos(tangentAngle) * length, centerY - Math.sin(tangentAngle) * length);
          ctx.lineTo(centerX + Math.cos(tangentAngle) * length, centerY + Math.sin(tangentAngle) * length);
          ctx.stroke();

          // Draw Secant (Blue -> Red transition)
          // As h gets smaller (secantAngle close to tangentAngle), turn red
          const diff = Math.abs(secantAngle - tangentAngle);
          const isClose = diff < 0.1;
          
          ctx.beginPath();
          ctx.strokeStyle = isClose 
            ? 'rgba(239, 68, 68, 0.6)' // Snap to Red
            : 'rgba(59, 130, 246, 0.3)'; // Drift to Blue
            
          ctx.lineWidth = isClose ? 3 : 1;
          
          ctx.moveTo(centerX - Math.cos(secantAngle) * length, centerY - Math.sin(secantAngle) * length);
          ctx.lineTo(centerX + Math.cos(secantAngle) * length, centerY + Math.sin(secantAngle) * length);
          ctx.stroke();
        }
      }

      time += 1;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}