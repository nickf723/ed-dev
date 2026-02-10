"use client";
import React, { useEffect, useRef } from 'react';

export default function SynthwaveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let offset = 0;

    const animate = () => {
      // 1. Deep Space Background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f0c29'); // Dark Blue
      grad.addColorStop(0.5, '#302b63'); // Purple
      grad.addColorStop(1, '#24243e'); // Darker
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. The Sun (Retro Gradient)
      const sunGrad = ctx.createLinearGradient(0, height * 0.2, 0, height * 0.5);
      sunGrad.addColorStop(0, '#fcd34d'); // Yellow
      sunGrad.addColorStop(1, '#db2777'); // Pink
      
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(width / 2, height * 0.4, 150, 0, Math.PI * 2);
      ctx.fill();

      // Sun cuts (Scanlines)
      ctx.fillStyle = '#302b63';
      for(let i=0; i<10; i++) {
          const y = height * 0.3 + i * 20;
          const h = 2 + i * 2;
          ctx.fillRect(width/2 - 160, y, 320, h);
      }

      // 3. The Grid (Perspective)
      const horizon = height * 0.5;
      const fov = 300;
      
      ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)'; // Pink-500
      ctx.lineWidth = 2;
      ctx.beginPath();

      // Vertical Lines (Fan out)
      for (let x = -width; x < width * 2; x += 50) {
          ctx.moveTo(x, height);
          ctx.lineTo(width / 2 + (x - width / 2) * 0.1, horizon);
      }

      // Horizontal Lines (Move down)
      offset = (offset + 1) % 40;
      for (let z = 0; z < height / 2; z += 40) {
          // Add perspective scaling to gap
          const y = horizon + z + offset;
          // Scale gap exponentially to simulate depth
          const depthY = horizon + Math.pow(z/ (height/2), 2) * (height/2);
          
          // Simple scrolling lines for aesthetic feel rather than perfect math
          // Let's use a simple linear scroll for the retro "flat" look
          const scrollY = horizon + ((z + offset) % (height/2));
          
          if (scrollY < height) {
              ctx.moveTo(0, scrollY);
              ctx.lineTo(width, scrollY);
          }
      }
      ctx.stroke();

      // 4. Glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#ec4899';

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