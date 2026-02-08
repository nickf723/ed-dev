"use client";
import React, { useEffect, useRef } from 'react';

export default function TopoMapEngine() {
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
      // 1. Map Paper Background
      ctx.fillStyle = '#ecfccb'; // Lime-100 (Survey paper color)
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Contour Lines
      ctx.lineWidth = 1;
      
      const layers = 15;
      offset += 0.002;

      for (let i = 0; i < layers; i++) {
          const elevation = i * (height / layers);
          
          ctx.beginPath();
          // Generate a wavy line
          for (let x = 0; x <= width; x += 10) {
              // Create "Terrain" using multiple sine waves
              const noise = 
                  Math.sin(x * 0.005 + offset + i) * 50 +
                  Math.sin(x * 0.01 - offset * 2) * 20 +
                  Math.cos(x * 0.002 + i * 0.5) * 100;
              
              const y = elevation + noise;
              
              if (x === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
          }

          // Depth coloring (Lower = Blue/Green, Higher = Brown/Red)
          const isMajor = i % 5 === 0;
          ctx.strokeStyle = isMajor ? 'rgba(63, 98, 18, 0.4)' : 'rgba(63, 98, 18, 0.15)'; // Green-900
          ctx.lineWidth = isMajor ? 1.5 : 1;
          ctx.stroke();

          // Elevation Labels on major lines
          if (isMajor) {
              ctx.fillStyle = 'rgba(63, 98, 18, 0.6)';
              ctx.font = '10px monospace';
              ctx.fillText(`${i * 100}m`, 20 + i * 50, elevation + Math.sin(20 * 0.005 + offset + i) * 50);
          }
      }

      // 3. Grid Overlay
      ctx.strokeStyle = 'rgba(0,0,0,0.05)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      ctx.beginPath();
      for(let x=0; x<width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

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