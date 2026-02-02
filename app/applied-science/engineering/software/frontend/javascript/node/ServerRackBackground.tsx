"use client";
import React, { useEffect, useRef } from 'react';

export default function ServerRackBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;

    const racks = Math.floor(width / 40);
    const packets: { x: number; y: number; speed: number; len: number }[] = [];

    const animate = () => {
      ctx.fillStyle = '#020617'; // Slate-950
      ctx.fillRect(0, 0, width, height);

      // Draw Racks
      for (let i = 0; i < racks; i++) {
        const x = i * 40;
        
        // Rack housing
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();

        // Blinking LEDs
        if (Math.random() > 0.9) {
            const y = Math.random() * height;
            ctx.fillStyle = Math.random() > 0.5 ? '#10b981' : '#059669'; // Emerald
            ctx.fillRect(x + 18, y, 4, 2);
        }
      }

      // Spawn Data Packets
      if (Math.random() > 0.8) {
        packets.push({
            x: Math.floor(Math.random() * racks) * 40 + 20,
            y: -100,
            speed: Math.random() * 10 + 5,
            len: Math.random() * 50 + 20
        });
      }

      // Update Packets
      ctx.lineWidth = 2;
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.y += p.speed;

        // Draw Packet Trail
        const gradient = ctx.createLinearGradient(p.x, p.y, p.x, p.y - p.len);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y - p.len);
        ctx.stroke();

        if (p.y - p.len > height) packets.splice(i, 1);
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