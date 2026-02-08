"use client";
import React, { useEffect, useRef } from 'react';

export default function TokyoHighway() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Car {
      x: number;
      y: number;
      z: number; // Depth
      speed: number;
      color: string;
      lane: number; // -1 (Left/Incoming), 1 (Right/Outgoing)
    }

    const cars: Car[] = [];
    const carCount = 100;

    // Init cars
    for(let i=0; i<carCount; i++) {
        const lane = Math.random() > 0.5 ? 1 : -1;
        cars.push({
            x: (Math.random() - 0.5) * width * 2, // Wide spread
            y: 0,
            z: Math.random() * 2000, // Deep into screen
            speed: Math.random() * 1.0 + 2.0,
            color: lane === 1 ? '#ef4444' : '#ffffff', // Red tails, White heads
            lane: lane
        });
    }

    const animate = () => {
      // 1. Cyberpunk Night Background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#020617'); // Slate-950
      grad.addColorStop(1, '#1e1b4b'); // Indigo-950 (City Glow)
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Center vanishing point
      const cx = width / 2;
      const cy = height / 2;

      // 2. Draw Grid (The "Ground")
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.15)'; // Pink-500 low opacity
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Radial lines
      for(let i=-10; i<=10; i++) {
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx + i * width * 0.5, height);
      }
      // Horizontal lines (moving)
      const time = Date.now() * 0.002;
      for(let i=0; i<20; i++) {
          const z = (i * 100 + (time * 100)) % 2000;
          const y = cy + (1000 / (2000 - z)) * 300; // Perspective math
          if(y > cy && y < height) {
              ctx.moveTo(0, y);
              ctx.lineTo(width, y);
          }
      }
      ctx.stroke();

      // 3. Draw Light Streams (Cars)
      cars.forEach(c => {
          c.z -= c.speed;
          if (c.z <= 10) c.z = 2000; // Loop back

          // Perspective Projection
          const scale = 1000 / (2000 - c.z);
          const x2d = cx + (c.lane * 100 + c.x * 0.1) * scale;
          const y2d = cy + 100 * scale;
          const size = 10 * scale;

          // Draw "Streak" (Motion Blur effect)
          ctx.beginPath();
          ctx.strokeStyle = c.color;
          ctx.lineWidth = size;
          ctx.lineCap = 'round';
          ctx.globalAlpha = Math.min(1, scale * 2); // Fade in distance
          
          // Tail length depends on speed
          const tailLen = c.speed * scale * 5;
          ctx.moveTo(x2d, y2d);
          // Angle streaks slightly outward
          ctx.lineTo(x2d + (x2d - cx) * 0.1, y2d - tailLen);
          ctx.stroke();
      });
      ctx.globalAlpha = 1;

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