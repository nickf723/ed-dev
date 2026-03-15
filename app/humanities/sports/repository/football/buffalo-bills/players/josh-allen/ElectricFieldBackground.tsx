"use client";
import React, { useEffect, useRef } from 'react';

export default function ElectricFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    interface Bolt {
        x: number; y: number;
        segments: {x: number, y: number}[];
        life: number;
        color: string;
    }
    const bolts: Bolt[] = [];

    const createBolt = () => {
        const startX = Math.random() * width;
        const startY = Math.random() * height;
        const length = Math.random() * 200 + 100;
        const segments = [{x: startX, y: startY}];
        let currX = startX;
        let currY = startY;

        for(let i=0; i<10; i++) {
            currX += (Math.random() - 0.5) * 50;
            currY += (Math.random() - 0.5) * 50;
            segments.push({x: currX, y: currY});
        }
        
        bolts.push({
            x: startX, y: startY,
            segments,
            life: 1.0,
            color: Math.random() > 0.5 ? '#3b82f6' : '#60a5fa' // Blue-500 or Blue-400
        });
    };

    const animate = () => {
      // Dark Stormy Background
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, width, height);
      
      // Random background flashes (Storm clouds)
      if (Math.random() > 0.95) {
          ctx.fillStyle = `rgba(59, 130, 246, ${Math.random() * 0.1})`;
          ctx.fillRect(0, 0, width, height);
      }

      // Spawn Lightning
      if (Math.random() > 0.92) createBolt();

      // Draw Bolts
      bolts.forEach((b, i) => {
          b.life -= 0.05;
          if (b.life <= 0) {
              bolts.splice(i, 1);
              return;
          }

          ctx.beginPath();
          ctx.moveTo(b.segments[0].x, b.segments[0].y);
          for(let j=1; j<b.segments.length; j++) {
              ctx.lineTo(b.segments[j].x, b.segments[j].y);
          }
          
          ctx.strokeStyle = `rgba(147, 197, 253, ${b.life})`; // Blue-300
          ctx.lineWidth = 2;
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#3b82f6';
          ctx.stroke();
          ctx.shadowBlur = 0;
      });

      // Draw "Motion Blur" Particles (Speed)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      for(let i=0; i<20; i++) {
          const x = (frame * 10 + i * 100) % width;
          const y = (Math.sin(frame * 0.01 + i) * 200) + height/2;
          ctx.fillRect(x, y, 50, 2);
      }

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