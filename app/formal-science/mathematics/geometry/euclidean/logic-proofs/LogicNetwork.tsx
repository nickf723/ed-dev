"use client";
import React, { useEffect, useRef } from 'react';

export default function LogicNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Grid nodes
    const cols = Math.ceil(width / 100);
    const rows = Math.ceil(height / 100);
    const pulses: {x: number, y: number, dir: 'h'|'v', prog: number, speed: number}[] = [];

    // Create pulses
    setInterval(() => {
        if(pulses.length < 20) {
            pulses.push({
                x: Math.floor(Math.random() * cols) * 100,
                y: Math.floor(Math.random() * rows) * 100,
                dir: Math.random() > 0.5 ? 'h' : 'v',
                prog: 0,
                speed: Math.random() * 2 + 2
            });
        }
    }, 200);

    const animate = () => {
      // 1. Circuit Board Green BG
      ctx.fillStyle = '#022c22'; // Dark Green
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Static Grid (Traces)
      ctx.strokeStyle = '#064e3b'; // Slightly lighter green
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for(let x=0; x<width; x+=100) {
          ctx.moveTo(x, 0); ctx.lineTo(x, height);
          // Nodes
          for(let y=0; y<height; y+=100) {
              ctx.moveTo(x-2, y); ctx.lineTo(x+2, y); // Crosshair
              ctx.moveTo(x, y-2); ctx.lineTo(x, y+2);
          }
      }
      for(let y=0; y<height; y+=100) {
          ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Draw Pulses (Data)
      ctx.lineWidth = 3;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#4ade80'; // Bright Green
      
      for(let i = pulses.length - 1; i >= 0; i--) {
          const p = pulses[i];
          p.prog += p.speed;
          
          ctx.strokeStyle = `rgba(74, 222, 128, ${1 - p.prog/200})`; // Fade out
          ctx.beginPath();
          
          if (p.dir === 'h') {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x + p.prog, p.y);
          } else {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p.x, p.y + p.prog);
          }
          ctx.stroke();

          // Remove if dead
          if(p.prog > 200) pulses.splice(i, 1);
      }
      
      ctx.shadowBlur = 0;
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