"use client";
import React, { useEffect, useRef } from 'react';

export default function NetworkGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Nodes
    const nodes = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 2
    }));

    const animate = () => {
      // 1. Terminal Black BG
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Connections
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
              const dx = nodes[i].x - nodes[j].x;
              const dy = nodes[i].y - nodes[j].y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if (dist < 150) {
                  const alpha = 1 - (dist / 150);
                  ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.5})`; // Emerald Green
                  ctx.beginPath();
                  ctx.moveTo(nodes[i].x, nodes[i].y);
                  ctx.lineTo(nodes[j].x, nodes[j].y);
                  ctx.stroke();
              }
          }
      }

      // 3. Draw Nodes
      ctx.fillStyle = '#10b981'; // Emerald-500
      nodes.forEach(n => {
          n.x += n.vx;
          n.y += n.vy;

          if(n.x < 0 || n.x > width) n.vx *= -1;
          if(n.y < 0 || n.y > height) n.vy *= -1;

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
          ctx.fill();
          
          // Digital Glow
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#10b981';
      });
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