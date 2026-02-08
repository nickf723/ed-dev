"use client";
import React, { useEffect, useRef } from 'react';

export default function QuantumNebula() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    const animate = () => {
      // 1. Deep Space Background
      ctx.fillStyle = '#020617'; // Slate-950 (Void)
      ctx.fillRect(0, 0, width, height);

      // 2. Procedural Nebula (Stacked Sine Waves)
      time += 0.002;
      
      for(let i=0; i<3; i++) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(
              width/2 + Math.sin(time + i) * 200, 
              height/2 + Math.cos(time + i) * 200, 
              0, 
              width/2, 
              height/2, 
              width
          );
          
          if (i===0) {
              gradient.addColorStop(0, 'rgba(76, 29, 149, 0.2)'); // Violet
              gradient.addColorStop(1, 'transparent');
          } else if (i===1) {
              gradient.addColorStop(0, 'rgba(29, 78, 216, 0.2)'); // Blue
              gradient.addColorStop(1, 'transparent');
          } else {
              gradient.addColorStop(0, 'rgba(219, 39, 119, 0.1)'); // Pink
              gradient.addColorStop(1, 'transparent');
          }
          
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, width, height);
      }

      // 3. Stars
      ctx.fillStyle = '#fff';
      for(let j=0; j<50; j++) {
          const x = (Math.sin(j * 132.1 + time * 0.1) + 1) * width/2;
          const y = (Math.cos(j * 432.1 + time * 0.1) + 1) * height/2;
          const size = Math.random() * 1.5;
          ctx.globalAlpha = Math.random() * 0.5 + 0.2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI*2);
          ctx.fill();
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