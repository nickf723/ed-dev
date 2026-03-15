"use client";
import React, { useEffect, useRef } from 'react';

export default function HighmarkSnowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Snowflakes
    const flakes: { x: number, y: number, r: number, speed: number, wind: number }[] = [];
    for(let i=0; i<400; i++) {
        flakes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 2 + 0.5,
            speed: Math.random() * 3 + 1,
            wind: Math.random() * 2 + 1
        });
    }

    const animate = () => {
      // Clear with "Bills Blue" tint
      ctx.fillStyle = '#00338D'; 
      ctx.fillRect(0, 0, width, height);
      
      // Gradient Overlay (Vignette)
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      grad.addColorStop(0, 'rgba(0, 51, 141, 0.8)');
      grad.addColorStop(1, '#001e52'); // Darker Navy
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw Buffalo Silhouette (Procedural Shape or Image)
      // For this demo, we'll draw a subtle Red Streak representing the logo's motion
      ctx.beginPath();
      ctx.moveTo(width * 0.2, height * 0.5);
      ctx.bezierCurveTo(width * 0.4, height * 0.4, width * 0.6, height * 0.6, width * 0.8, height * 0.5);
      ctx.strokeStyle = 'rgba(198, 12, 48, 0.1)'; // Bills Red
      ctx.lineWidth = 100;
      ctx.lineCap = 'round';
      ctx.stroke();

      // Draw Snow
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      flakes.forEach(f => {
          f.y += f.speed;
          f.x += f.wind;

          // Wrap around
          if (f.y > height) f.y = -10;
          if (f.x > width) f.x = -10;

          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
      });

      // Wind Gust Effect (Shift all flakes)
      if (Math.random() > 0.98) {
          flakes.forEach(f => f.wind += 0.5);
      } else if (Math.random() > 0.98) {
          flakes.forEach(f => f.wind = Math.max(1, f.wind - 0.5));
      }

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