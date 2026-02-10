"use client";
import React, { useEffect, useRef } from 'react';

export default function SignalWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;
    let animationFrameId: number;

    const animate = () => {
      // 1. Clear & Background
      ctx.fillStyle = '#1e1b4b'; // Indigo-950
      ctx.fillRect(0, 0, width, height);

      // 2. Static Grid (Optimized: Lower opacity, simple lines)
      ctx.strokeStyle = 'rgba(79, 70, 229, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 100; // Larger grid cells = fewer lines
      
      ctx.beginPath();
      for(let x=0; x<=width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<=height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      time += 0.05;

      // 3. The Signal (Optimized Sine Wave)
      const centerY = height / 2;
      const step = 5; // Calculate every 5th pixel instead of every 1
      
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      
      // We draw the line in segments to handle color changes
      ctx.beginPath();
      
      for (let x = 0; x < width; x += step) {
          // Base Signal
          let y = Math.sin(x * 0.01 + time) * 100;
          
          // Noise Injection
          const noiseTrigger = Math.abs((x + time * 50) % 800);
          let isNoise = false;
          
          if (noiseTrigger < 50) {
              y += (Math.random() - 0.5) * 80; // Larger distortion
              isNoise = true;
          }

          const yPos = centerY + y;

          if (x === 0) {
              ctx.moveTo(x, yPos);
          } else {
              // If we hit a noise patch, we need to stroke the previous clean line 
              // and start a new "noise colored" line, or vice versa.
              // For performance in this specific style, simpler is better:
              // We'll just draw the whole path in Cyan, and overlay noise particles separately.
              ctx.lineTo(x, yPos);
          }
      }
      
      // Main Blue Stroke
      ctx.strokeStyle = '#22d3ee'; // Cyan-400
      ctx.shadowBlur = 15;
      ctx.shadowColor = '#22d3ee';
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset for performance

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    animate();

    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}