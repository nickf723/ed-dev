"use client";
import React, { useEffect, useRef } from 'react';

export default function FieldTacticsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let scrollY = 0;

    const plays: { x: number, y: number, path: {x:number, y:number}[], age: number }[] = [];

    const spawnPlay = () => {
        const startX = Math.random() * width;
        const startY = Math.random() * height * 0.5 + height * 0.25;
        const path = [{x: startX, y: startY}];
        
        // Generate a random route (Post, Corner, Slant)
        let cx = startX;
        let cy = startY;
        for(let i=0; i<3; i++) {
            cx += (Math.random() - 0.5) * 100;
            cy -= Math.random() * 100;
            path.push({x: cx, y: cy});
        }
        
        plays.push({ x: startX, y: startY, path, age: 0 });
    };

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // Draw Field Grid (Perspective)
      const perspective = 0.5;
      const fieldWidth = width * 1.5;
      const offsetX = (width - fieldWidth) / 2;

      ctx.strokeStyle = 'rgba(16, 185, 129, 0.05)'; // Emerald
      ctx.lineWidth = 2;

      // Vertical Hash Lines
      for(let i=0; i<=10; i++) {
          const x = offsetX + (i * (fieldWidth/10));
          // Vanishing point logic
          const topX = width/2 + (x - width/2) * perspective;
          
          ctx.beginPath();
          ctx.moveTo(x, height);
          ctx.lineTo(topX, 0);
          ctx.stroke();
      }

      // Horizontal Yard Lines (Scrolling)
      scrollY = (scrollY + 0.5) % 100;
      for(let i=0; i<20; i++) {
          const y = (i * 100) + scrollY - 100;
          // Scale width based on Y position for perspective
          const scale = 0.5 + (y / height) * 0.5;
          const currentFieldWidth = fieldWidth * scale;
          const currentOffsetX = (width - currentFieldWidth) / 2;

          ctx.beginPath();
          ctx.moveTo(currentOffsetX, y);
          ctx.lineTo(currentOffsetX + currentFieldWidth, y);
          ctx.stroke();
      }

      // Draw Plays (Tactical Chalk)
      if(Math.random() > 0.95) spawnPlay();

      plays.forEach((p, i) => {
          p.age += 0.01;
          const alpha = Math.max(0, 1 - p.age);
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.setLineDash([5, 5]);
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.path[0].x, p.path[0].y);
          
          // Draw path segments
          for(let j=1; j<p.path.length; j++) {
              ctx.lineTo(p.path[j].x, p.path[j].y);
          }
          ctx.stroke();
          ctx.setLineDash([]);

          // Draw "X" or "O" at start
          ctx.font = '12px sans-serif';
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillText("X", p.path[0].x - 4, p.path[0].y + 4);

          // Arrow at end
          const last = p.path[p.path.length-1];
          ctx.beginPath();
          ctx.arc(last.x, last.y, 3, 0, Math.PI*2);
          ctx.fill();

          if (p.age > 1) plays.splice(i, 1);
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