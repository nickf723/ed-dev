"use client";
import React, { useEffect, useRef } from 'react';

export default function EquationsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Deep Red / Rose Theme
    const colors = ["#fb7185", "#f43f5e", "#e11d48", "#be123c"]; 
    const equations = [
        "2x + 4 = 10", "3y - 1 = 8", "x = 3", "y = 3", 
        "5a = 20", "a = 4", "x/2 = 6", "x = 12",
        "=", "x"
    ];

    const items = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: (Math.random() * 0.4) + 0.1, // Drifting down slowly
      text: equations[Math.floor(Math.random() * equations.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 16 + 12,
      opacity: Math.random() * 0.15 + 0.05
    }));

    const animate = () => {
      // Deep almost-black red background
      ctx.fillStyle = "#2a0a12"; 
      ctx.fillRect(0, 0, w, h);

      // Subtle horizontal balance lines
      ctx.strokeStyle = "rgba(244, 63, 94, 0.03)";
      ctx.lineWidth = 1;
      for(let i = 0; i < h; i += 60) {
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      items.forEach(item => {
        item.y += item.vy;

        // Wrap around screen
        if (item.y > h + 50) {
            item.y = -50;
            item.x = Math.random() * w;
        }

        ctx.font = `bold ${item.size}px "Fira Code", monospace`;
        ctx.fillStyle = item.color;
        ctx.globalAlpha = item.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.text, item.x, item.y);
      });

      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a0a12]/60 via-transparent to-[#2a0a12] opacity-90" />
    </div>
  );
}