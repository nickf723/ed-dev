"use client";
import React, { useEffect, useRef } from 'react';

export default function StadiumLightsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const lights: { x: number, y: number, size: number, flash: number }[] = [];
    const fogLayers: { x: number, speed: number }[] = [];

    // Initialize Crowd Flashbulbs
    for(let i=0; i<50; i++) {
        lights.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2 + 1,
            flash: 0
        });
    }

    // Initialize Fog
    for(let i=0; i<5; i++) {
        fogLayers.push({ x: Math.random() * width, speed: Math.random() * 0.5 + 0.2 });
    }

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // Draw Fog
      fogLayers.forEach(fog => {
          fog.x += fog.speed;
          if (fog.x > width) fog.x = -width;
          
          const gradient = ctx.createLinearGradient(fog.x, 0, fog.x + width/2, 0);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
          gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.05)'); // Faint Emerald
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
      });

      // Draw Flashbulbs
      lights.forEach(l => {
          if (Math.random() > 0.995) l.flash = 1; // Trigger flash

          if (l.flash > 0) {
              ctx.beginPath();
              ctx.arc(l.x, l.y, l.size * (1 + l.flash * 2), 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${l.flash})`;
              ctx.shadowBlur = 15;
              ctx.shadowColor = 'white';
              ctx.fill();
              ctx.shadowBlur = 0;
              l.flash -= 0.1; // Decay
          }
      });

      // Draw "Stadium Beams" (Top lights)
      ctx.save();
      ctx.translate(width/2, -50);
      for(let i=-2; i<=2; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(i * 300, height * 1.5);
          ctx.lineTo((i * 300) + 100, height * 1.5);
          ctx.closePath();
          
          const beamGrad = ctx.createLinearGradient(0, 0, 0, height);
          beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = beamGrad;
          ctx.fill();
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