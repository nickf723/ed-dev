"use client";
import React, { useEffect, useRef } from 'react';

export default function SynthesiaRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Falling Notes
    const notes = Array.from({ length: 30 }, () => ({
        x: Math.random() * width,
        y: Math.random() * -height, // Start above screen
        width: Math.random() * 20 + 10,
        height: Math.random() * 100 + 50,
        speed: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)` // Cyans and Blues
    }));

    const animate = () => {
      // 1. Concert Black BG
      ctx.fillStyle = '#0a0a0a'; 
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Lane Lines (Subtle)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const laneWidth = width / 50;
      for(let x=0; x<width; x+=laneWidth) {
          ctx.beginPath();
          ctx.moveTo(x, 0); ctx.lineTo(x, height);
          ctx.stroke();
      }

      // 3. Draw Notes
      notes.forEach(n => {
          n.y += n.speed;
          if (n.y > height) {
              n.y = -n.height;
              n.x = Math.random() * width;
          }

          // Glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = n.color;
          ctx.fillStyle = n.color;
          ctx.fillRect(n.x, n.y, n.width, n.height);
          ctx.shadowBlur = 0;
      });

      // 4. Gradient Overlay (Fade out at bottom)
      const grad = ctx.createLinearGradient(0, height - 100, 0, height);
      grad.addColorStop(0, 'rgba(10, 10, 10, 0)');
      grad.addColorStop(1, 'rgba(10, 10, 10, 1)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, height - 100, width, 100);

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