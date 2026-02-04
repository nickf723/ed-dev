"use client";
import React, { useEffect, useRef } from 'react';

export default function BloodMoonFog() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const fogParticles: { x: number, y: number, r: number, speed: number }[] = [];
    
    // Create dense fog layers
    for(let i=0; i<50; i++) {
        fogParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 100 + 50,
            speed: Math.random() * 0.5 + 0.1
        });
    }

    const animate = () => {
      // 1. The Void Background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#1a0505'); // Deep Blood
      grad.addColorStop(1, '#000000'); // Pure Black
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. The Blood Moon (Static, Ominous)
      const moonX = width * 0.8;
      const moonY = height * 0.2;
      const moonGrad = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 150);
      moonGrad.addColorStop(0, '#ef4444');
      moonGrad.addColorStop(0.5, '#7f1d1d');
      moonGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = moonGrad;
      ctx.globalAlpha = 0.4 + Math.sin(frame * 0.02) * 0.05; // Pulse
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1.0;

      // 3. Rolling Fog
      fogParticles.forEach(p => {
          p.x -= p.speed;
          if(p.x < -p.r) p.x = width + p.r;

          const fogGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
          fogGrad.addColorStop(0, 'rgba(20, 0, 0, 0.4)');
          fogGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          
          ctx.fillStyle = fogGrad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
          ctx.fill();
      });

      // 4. "The Watcher" (Random Shadow Figure)
      if (Math.random() > 0.992) {
          const sx = Math.random() * width;
          const sy = height - (Math.random() * 200);
          ctx.fillStyle = 'rgba(0,0,0,0.8)';
          ctx.beginPath();
          ctx.ellipse(sx, sy, 20, 60, 0, 0, Math.PI*2);
          ctx.fill();
          // Eyes
          ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.beginPath();
          ctx.arc(sx - 5, sy - 20, 1, 0, Math.PI*2);
          ctx.arc(sx + 5, sy - 20, 1, 0, Math.PI*2);
          ctx.fill();
      }

      // 5. Film Grain/Noise Overlay
      const noise = ctx.getImageData(0, 0, width, height);
      // (Simplified noise logic would go here for performance, or use CSS overlay)

      frame++;
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