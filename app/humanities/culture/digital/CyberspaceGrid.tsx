"use client";
import React, { useEffect, useRef } from 'react';

export default function CyberspaceGrid() {
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
      // 1. Void Background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f0014'); // Deep Purple Black
      grad.addColorStop(1, '#240046'); // Indigo
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. The Sun (Vaporwave style)
      const sunY = height * 0.3;
      const sunGrad = ctx.createLinearGradient(0, sunY - 100, 0, sunY + 100);
      sunGrad.addColorStop(0, '#facc15'); // Yellow
      sunGrad.addColorStop(1, '#ec4899'); // Pink
      
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, sunY, 150, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.shadowBlur = 50;
      ctx.shadowColor = '#ec4899';
      ctx.fill();
      
      // Sun Stripes (cuts)
      ctx.fillStyle = '#240046'; // Match horizon color
      for(let i=0; i<10; i++) {
          const y = sunY + 50 + (i * 12);
          const h = 2 + (i * 1.5);
          ctx.fillRect(width/2 - 160, y, 320, h);
      }
      ctx.restore();

      // 3. The Grid (Perspective)
      const horizonY = height * 0.5;
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, horizonY, width, height - horizonY);
      ctx.clip(); // Only draw below horizon

      // Background floor
      const floorGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      floorGrad.addColorStop(0, '#10002b');
      floorGrad.addColorStop(1, '#3c096c');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      ctx.strokeStyle = 'rgba(236, 72, 153, 0.5)'; // Pink lines
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#ec4899';

      // Vertical Lines (Perspective)
      const centerX = width / 2;
      for (let i = -20; i <= 20; i++) {
          const x = centerX + (i * 100); // Base spacing
          // Simple perspective: lines fan out from center horizon
          ctx.beginPath();
          ctx.moveTo(centerX + (i * 10), horizonY); // Vanishing pointish
          ctx.lineTo(centerX + (i * 600), height);
          ctx.stroke();
      }

      // Horizontal Lines (Moving)
      offset = (offset + 1) % 100;
      for (let i = 0; i < 20; i++) {
          // Exponential spacing for depth perception
          const y = horizonY + Math.pow(i, 2.5) + offset;
          if (y > height) continue;
          
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
      }
      ctx.restore();

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