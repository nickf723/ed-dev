"use client";
import React, { useEffect, useRef } from 'react';

export default function GlobalTradeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    // Abstract "Hubs" representing major economic centers
    const hubs = Array.from({ length: 15 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 4 + 2,
    }));

    // "Capital Packets" traveling between hubs
    const packets: { 
      from: number; to: number; progress: number; speed: number; color: string 
    }[] = [];

    const init = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Re-distribute hubs on resize
      hubs.forEach(h => {
        h.x = Math.random() * width;
        h.y = Math.random() * height;
      });
    };

    const animate = () => {
      // Create trailing effect for "high frequency trading" look
      ctx.fillStyle = 'rgba(2, 6, 23, 0.2)'; // Slate-950 with fade
      ctx.fillRect(0, 0, width, height);

      // Draw Hubs
      hubs.forEach(hub => {
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, hub.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.3)'; // Emerald-400
        ctx.fill();
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.1)';
        ctx.stroke();
      });

      // Spawn packets
      if (frame % 10 === 0) {
        const from = Math.floor(Math.random() * hubs.length);
        let to = Math.floor(Math.random() * hubs.length);
        while(to === from) to = Math.floor(Math.random() * hubs.length);
        
        packets.push({
          from, to, 
          progress: 0, 
          speed: Math.random() * 0.01 + 0.005,
          color: Math.random() > 0.5 ? '#34d399' : '#10b981' // Emerald variants
        });
      }

      // Draw Arcs
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        const h1 = hubs[p.from];
        const h2 = hubs[p.to];

        p.progress += p.speed;
        
        if (p.progress >= 1) {
          packets.splice(i, 1);
          continue;
        }

        // Calculate current position on line
        const currX = h1.x + (h2.x - h1.x) * p.progress;
        const currY = h1.y + (h2.y - h1.y) * p.progress;

        // Draw the "Transaction" particle
        ctx.beginPath();
        ctx.arc(currX, currY, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Faint connection line
        ctx.beginPath();
        ctx.moveTo(h1.x, h1.y);
        ctx.lineTo(h2.x, h2.y);
        ctx.strokeStyle = `rgba(52, 211, 153, ${0.02 * (1 - p.progress)})`;
        ctx.stroke();
      }

      frame++;
      requestAnimationFrame(animate);
    };

    window.addEventListener('resize', init);
    animate();

    return () => window.removeEventListener('resize', init);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}