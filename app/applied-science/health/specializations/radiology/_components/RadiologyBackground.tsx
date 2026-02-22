"use client";
import React, { useRef, useEffect } from 'react';

export default function RadiologyBackground() {
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
      ctx.fillStyle = '#020202'; // Pitch black (unexposed film)
      ctx.fillRect(0, 0, width, height);

      // The sweeping scanner line
      const scanY = (time * 3) % height;

      // Draw the underlying "tissue" grid (only visible near the scanner)
      ctx.lineWidth = 1;
      const gridSize = 60;
      
      for(let x = 0; x <= width; x += gridSize) {
          for(let y = 0; y <= height; y += gridSize) {
              // Calculate distance from the scanner line
              const dist = Math.abs(y - scanY);
              
              if (dist < 150) {
                  // The closer to the scanner, the brighter it glows (X-ray exposure)
                  const intensity = 1 - (dist / 150);
                  
                  // Faint cyan/white structural nodes
                  ctx.beginPath();
                  ctx.arc(x, y, 2, 0, Math.PI * 2);
                  ctx.fillStyle = `rgba(255, 255, 255, ${intensity * 0.3})`;
                  ctx.fill();

                  // Structural connecting lines
                  if (x < width) {
                      ctx.beginPath();
                      ctx.moveTo(x, y);
                      ctx.lineTo(x + gridSize, y);
                      ctx.strokeStyle = `rgba(34, 211, 238, ${intensity * 0.1})`; // Cyan-400
                      ctx.stroke();
                  }
                  if (y < height) {
                      ctx.beginPath();
                      ctx.moveTo(x, y);
                      ctx.lineTo(x, y + gridSize);
                      ctx.strokeStyle = `rgba(34, 211, 238, ${intensity * 0.1})`;
                      ctx.stroke();
                  }
              }
          }
      }

      // Draw the bright scanner beam
      const gradient = ctx.createLinearGradient(0, scanY - 50, 0, scanY);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
      gradient.addColorStop(0.9, 'rgba(255, 255, 255, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.8)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanY - 50, width, 50);
      
      // Leading edge
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, scanY, width, 2);
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#22d3ee'; // Cyan glow
      
      ctx.shadowBlur = 0; // reset

      time += 1;
      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}