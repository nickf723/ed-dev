"use client";
import React, { useEffect, useRef } from 'react';

export default function HoloGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let rotation = 0;

    // Generate random points on a sphere
    const points: {x: number, y: number, z: number}[] = [];
    for(let i=0; i<400; i++) {
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = 300; // Radius
        points.push({
            x: r * Math.sin(phi) * Math.cos(theta),
            y: r * Math.sin(phi) * Math.sin(theta),
            z: r * Math.cos(phi)
        });
    }

    const animate = () => {
      // 1. Deep Space BG
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      grad.addColorStop(0, '#0f172a'); // Slate-900
      grad.addColorStop(1, '#020617'); // Slate-950
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Grid Lines (Latitude/Longitude) - Simplified ellipse
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)'; // Sky-400
      ctx.lineWidth = 1;
      
      const cx = width / 2;
      const cy = height / 2;

      rotation += 0.002;

      // 3. Draw Points
      points.forEach(p => {
          // Rotate Y
          const xRot = p.x * Math.cos(rotation) - p.z * Math.sin(rotation);
          const zRot = p.z * Math.cos(rotation) + p.x * Math.sin(rotation);
          
          // Project 3D to 2D
          const scale = 1000 / (1000 - zRot);
          const x2d = cx + xRot * scale;
          const y2d = cy + p.y * scale;
          const size = 2 * scale;

          // Only draw if on front side
          if (zRot < 0) {
              ctx.fillStyle = '#38bdf8'; // Sky-400
              ctx.globalAlpha = (zRot + 300) / 300 * 0.8; // Fade edges
              ctx.beginPath();
              ctx.arc(x2d, y2d, size, 0, Math.PI*2);
              ctx.fill();
          }
      });
      ctx.globalAlpha = 1;

      // Scanline overlay
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      for(let y=0; y<height; y+=4) {
          ctx.fillRect(0, y, width, 1);
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