"use client";
import React, { useEffect, useRef } from 'react';

export default function BlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let time = 0;

    // Construction Ghosts
    const ghosts = Array.from({ length: 8 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 100 + 50,
        startAngle: Math.random() * Math.PI * 2,
        speed: (Math.random() - 0.5) * 0.02,
        life: Math.random() * 100,
        type: Math.random() > 0.5 ? 'arc' : 'line'
    }));

    const animate = () => {
      // 1. Blueprint Blue Background
      const grad = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, width);
      grad.addColorStop(0, '#1e3a8a'); // Blue-900 (Center)
      grad.addColorStop(1, '#172554'); // Blue-950 (Edges)
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // 2. The Grid (Drafting Paper)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      
      ctx.beginPath();
      // Major lines
      for(let x=0; x<=width; x+=gridSize) { ctx.moveTo(x,0); ctx.lineTo(x,height); }
      for(let y=0; y<=height; y+=gridSize) { ctx.moveTo(0,y); ctx.lineTo(width,y); }
      ctx.stroke();

      // 3. Animated Constructions
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      
      ghosts.forEach(g => {
          g.life--;
          if(g.life < 0) {
              g.life = 200;
              g.x = Math.random() * width;
              g.y = Math.random() * height;
              g.type = Math.random() > 0.5 ? 'arc' : 'line';
          }
          
          const alpha = Math.sin((g.life / 200) * Math.PI); // Fade in/out
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          
          if(g.type === 'arc') {
              // Simulate Compass
              ctx.arc(g.x, g.y, g.r, g.startAngle + time * g.speed, g.startAngle + time * g.speed + 1);
          } else {
              // Simulate Straightedge
              const len = 200;
              ctx.moveTo(g.x, g.y);
              ctx.lineTo(g.x + Math.cos(g.startAngle)*len, g.y + Math.sin(g.startAngle)*len);
              
              // Draw "points" at ends
              ctx.fillStyle = '#fff';
              ctx.fillRect(g.x - 2, g.y - 2, 4, 4);
          }
          ctx.stroke();
      });
      ctx.globalAlpha = 1;

      time++;
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