"use client";
import React, { useEffect, useRef } from 'react';

export default function CleanRoomBackground() {
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
      // 1. Sterile White/Grey Background
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#f8fafc'); // Slate-50
      grad.addColorStop(1, '#e2e8f0'); // Slate-200
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Isometric Grid Overlay
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.2)'; // Slate-400
      ctx.lineWidth = 1;
      
      const size = 40;
      for (let y = 0; y < height + size; y += size) {
          // A simple dot grid for the clean room floor look
          for (let x = 0; x < width + size; x += size) {
              ctx.beginPath();
              ctx.arc(x, y, 1, 0, Math.PI*2);
              ctx.fillStyle = '#cbd5e1';
              ctx.fill();
          }
      }

      // 3. "Data Streams" (Copper Lines)
      time += 0.05;
      const streamCount = 5;
      ctx.lineWidth = 2;
      
      for(let i=0; i<streamCount; i++) {
          const yPos = (height / streamCount) * i + 100;
          const speed = (i + 1) * 2;
          const xPos = (time * speed * 20) % (width + 200) - 200;

          // Trail
          const trailGrad = ctx.createLinearGradient(xPos - 200, yPos, xPos, yPos);
          trailGrad.addColorStop(0, 'rgba(245, 158, 11, 0)'); // Transparent
          trailGrad.addColorStop(1, 'rgba(245, 158, 11, 0.5)'); // Copper/Amber

          ctx.strokeStyle = trailGrad;
          ctx.beginPath();
          ctx.moveTo(xPos - 200, yPos);
          ctx.lineTo(xPos, yPos);
          ctx.stroke();

          // Leading Spark
          ctx.fillStyle = '#f59e0b'; // Amber-500
          ctx.beginPath();
          ctx.arc(xPos, yPos, 3, 0, Math.PI*2);
          ctx.fill();
          
          // Technical markers
          ctx.fillStyle = '#64748b';
          ctx.font = '10px monospace';
          if (xPos > 0 && xPos < width) {
             ctx.fillText(`CH-0${i} :: ACTV`, xPos + 10, yPos + 3);
          }
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