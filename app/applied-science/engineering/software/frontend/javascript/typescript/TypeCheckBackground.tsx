"use client";
import React, { useEffect, useRef } from 'react';

export default function TypeCheckBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Packet {
      x: number; y: number;
      type: 'string' | 'number' | 'boolean';
      valid: boolean;
      speed: number;
    }

    const packets: Packet[] = [];
    
    const spawnPacket = () => {
      packets.push({
        x: Math.random() * width,
        y: height + 20,
        type: Math.random() > 0.6 ? 'string' : Math.random() > 0.5 ? 'number' : 'boolean',
        valid: Math.random() > 0.2, // 20% syntax errors
        speed: 1 + Math.random() * 2
      });
    };

    const animate = () => {
      ctx.fillStyle = '#0f172a'; // Slate-900
      ctx.fillRect(0, 0, width, height);

      // Add packets
      if (Math.random() > 0.95) spawnPacket();

      // Draw "Compiler Layer" Grid
      ctx.strokeStyle = 'rgba(49, 120, 198, 0.1)';
      ctx.lineWidth = 1;
      const gridSize = 100;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke();
      }

      packets.forEach((p, i) => {
        p.y -= p.speed;

        // Draw shape based on type
        ctx.beginPath();
        if (p.type === 'string') ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        else if (p.type === 'number') ctx.rect(p.x - 4, p.y - 4, 8, 8);
        else { ctx.moveTo(p.x, p.y - 5); ctx.lineTo(p.x + 5, p.y + 5); ctx.lineTo(p.x - 5, p.y + 5); }

        // Color based on validity (The Type Check)
        if (p.valid) {
            ctx.fillStyle = '#3178C6'; // TS Blue
            ctx.shadowBlur = 10;
            ctx.shadowColor = '#3178C6';
        } else {
            ctx.fillStyle = '#ef4444'; // Red (Error)
            ctx.shadowBlur = 0;
        }
        ctx.fill();
        ctx.shadowBlur = 0;

        // Remove off-screen
        if (p.y < -10) packets.splice(i, 1);
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