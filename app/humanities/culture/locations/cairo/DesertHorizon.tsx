"use client";
import React, { useEffect, useRef } from 'react';

export default function DesertHorizon() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Stars array
    const stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * width,
        y: Math.random() * (height / 2),
        size: Math.random() * 1.5,
        twinkle: Math.random()
    }));

    const animate = () => {
      // 1. Sunset to Night Gradient
      // We simulate a permanent twilight/dusk aesthetic
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#0f172a'); // Slate-900 (Top Sky)
      grad.addColorStop(0.5, '#1e1b4b'); // Indigo-950
      grad.addColorStop(1, '#7c2d12'); // Amber-900 (Horizon glow)
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      time += 0.005;

      // 2. Draw Stars
      ctx.fillStyle = '#fff';
      stars.forEach(s => {
          const alpha = 0.5 + 0.5 * Math.sin(time + s.twinkle * 10);
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
      });
      ctx.globalAlpha = 1;

      // 3. The Pyramids (Silhouettes)
      const horizonY = height - 100;
      ctx.fillStyle = '#020617'; // Almost black

      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, horizonY);
      
      // Great Pyramid
      ctx.lineTo(width * 0.2, horizonY); 
      ctx.lineTo(width * 0.35, horizonY - 200); // Peak
      ctx.lineTo(width * 0.5, horizonY);
      
      // Khafre
      ctx.lineTo(width * 0.55, horizonY - 180); // Peak
      ctx.lineTo(width * 0.7, horizonY);

      // Menkaure
      ctx.lineTo(width * 0.75, horizonY - 100); // Peak
      ctx.lineTo(width * 0.85, horizonY);
      
      ctx.lineTo(width, horizonY);
      ctx.lineTo(width, height);
      ctx.fill();

      // 4. Heat Haze (Overlay)
      // Subtle wavering lines at the bottom
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.05)';
      ctx.lineWidth = 2;
      for(let i=0; i<5; i++) {
          ctx.beginPath();
          for(let x=0; x<width; x+=20) {
              const y = horizonY + 50 + i*10 + Math.sin(x*0.01 + time*2 + i)*5;
              if (x===0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }
          ctx.stroke();
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