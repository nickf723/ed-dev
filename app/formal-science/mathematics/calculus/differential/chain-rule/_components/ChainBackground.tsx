"use client";
import React, { useRef, useEffect } from 'react';

export default function ChainBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Create 10 chains
    const chains = Array.from({ length: 15 }).map(() => {
      const x = Math.random() * width;
      const speed = Math.random() * 0.5 + 0.2;
      // Each chain has 5-10 links
      const links = Array.from({ length: Math.floor(Math.random() * 5) + 5 }).map((_, i) => ({
        y: (i * 60) + Math.random() * 20,
        offset: Math.random() * Math.PI * 2
      }));
      return { x, speed, links };
    });

    const draw = () => {
      ctx.fillStyle = '#020502'; // Deep Forest Black
      ctx.fillRect(0, 0, width, height);

      const time = Date.now() * 0.001;

      chains.forEach(chain => {
        // Drifting downward
        chain.links.forEach(l => {
           l.y += chain.speed;
           if (l.y > height + 100) l.y = -100;
        });

        ctx.beginPath();
        ctx.strokeStyle = 'rgba(34, 197, 94, 0.1)'; // Green-500 low opacity
        ctx.lineWidth = 1;

        // Draw connections
        for (let i = 0; i < chain.links.length - 1; i++) {
            const curr = chain.links[i];
            const next = chain.links[i+1];
            
            // Sway logic
            const swayX = Math.sin(time + curr.offset) * 20;
            const nextSwayX = Math.sin(time + next.offset) * 20;

            ctx.moveTo(chain.x + swayX, curr.y);
            ctx.lineTo(chain.x + nextSwayX, next.y);
            
            // Draw Node
            ctx.fillStyle = 'rgba(34, 197, 94, 0.2)';
            ctx.fillRect(chain.x + swayX - 2, curr.y - 2, 4, 4);
        }
        ctx.stroke();
      });

      requestAnimationFrame(draw);
    };

    const anim = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(anim);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
}