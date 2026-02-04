"use client";
import React, { useEffect, useRef } from 'react';

export default function ConstellationBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Star {
      x: number; y: number;
      vx: number; vy: number;
      size: number;
      alpha: number;
    }

    const stars: Star[] = [];
    for(let i=0; i<150; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            size: Math.random() * 1.5,
            alpha: Math.random()
        });
    }

    // "Myths" - Pre-defined shapes to form
    const myths = [
       [{x:0.2, y:0.2}, {x:0.3, y:0.3}, {x:0.4, y:0.2}, {x:0.5, y:0.4}], // Cassiopeia-ish
       [{x:0.6, y:0.6}, {x:0.6, y:0.8}, {x:0.7, y:0.7}], // Triangle
    ];
    
    let activeMythVal = 0; // 0 to 1 (Fade in)

    const animate = () => {
      ctx.fillStyle = '#0f0518'; // Very dark violet
      ctx.fillRect(0, 0, width, height);

      // Draw random stars
      ctx.fillStyle = '#fff';
      stars.forEach(s => {
          s.x += s.vx;
          s.y += s.vy;
          if(s.x < 0) s.x = width;
          if(s.x > width) s.x = 0;
          if(s.y < 0) s.y = height;
          if(s.y > height) s.y = 0;

          ctx.globalAlpha = s.alpha * 0.5;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
          ctx.fill();
      });

      // Draw "Active Myth" lines (Procedural Constellation)
      // For simplicity in this demo, we'll draw nearest-neighbor connections 
      // that pulse, simulating stories forming in the noise.
      activeMythVal = (Math.sin(Date.now() * 0.001) + 1) / 2; // Pulse 0-1

      ctx.strokeStyle = `rgba(251, 191, 36, ${activeMythVal * 0.3})`; // Amber
      ctx.lineWidth = 1;
      
      for(let i=0; i<stars.length; i++) {
          for(let j=i+1; j<stars.length; j++) {
              const dx = stars[i].x - stars[j].x;
              const dy = stars[i].y - stars[j].y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if (dist < 100) {
                  ctx.beginPath();
                  ctx.moveTo(stars[i].x, stars[i].y);
                  ctx.lineTo(stars[j].x, stars[j].y);
                  ctx.stroke();
              }
          }
      }
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