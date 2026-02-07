"use client";
import React, { useEffect, useRef } from 'react';

export default function CircuitBoardSnow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Generate circuit paths
    const paths: { x: number; y: number; length: number; dir: number }[] = [];
    for(let i=0; i<50; i++) {
        paths.push({
            x: Math.random() * width,
            y: Math.random() * height,
            length: Math.random() * 200 + 50,
            dir: Math.random() > 0.5 ? 1 : 0 // 1 = Horizontal, 0 = Vertical
        });
    }

    const animate = () => {
      // 1. UB Blue Background
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, '#005bbb'); // UB Blue
      grad.addColorStop(1, '#002f6c'); // Darker Blue
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Circuit Grid (Subtle)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      ctx.beginPath();
      for(let x=0; x<width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      // 3. Data Pulses (The "Snow")
      time += 0.02;
      ctx.lineWidth = 2;
      
      paths.forEach(p => {
          ctx.beginPath();
          const progress = (time % 5) / 5; // Loop 0 to 1
          
          let startX = p.x;
          let startY = p.y;
          let endX = p.dir ? p.x + p.length : p.x;
          let endY = p.dir ? p.y : p.y + p.length;

          // Draw Track
          ctx.strokeStyle = 'rgba(255,255,255,0.1)';
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
          ctx.stroke();

          // Draw Pulse
          const pulseX = startX + (endX - startX) * progress;
          const pulseY = startY + (endY - startY) * progress;
          
          const pulseGrad = ctx.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 4);
          pulseGrad.addColorStop(0, '#ffffff');
          pulseGrad.addColorStop(1, 'rgba(255,255,255,0)');
          
          ctx.fillStyle = pulseGrad;
          ctx.beginPath();
          ctx.arc(pulseX, pulseY, 3, 0, Math.PI*2);
          ctx.fill();
      });

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