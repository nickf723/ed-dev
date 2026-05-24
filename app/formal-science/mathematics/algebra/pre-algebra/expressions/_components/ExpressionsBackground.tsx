"use client";
import React, { useEffect, useRef } from 'react';

export default function ExpressionsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Cyan / Sky / Teal Theme
    const colors = ["#22d3ee", "#38bdf8", "#06b6d4", "#0ea5e9"]; 
    const terms = ["3x", "5y", "-2", "x²", "+", "-", "4x", "7"];

    const items = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      text: terms[Math.floor(Math.random() * terms.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 12,
      opacity: Math.random() * 0.2 + 0.05
    }));

    const animate = () => {
      // Deep Slate/Cyan background
      ctx.fillStyle = "#082f49"; 
      ctx.fillRect(0, 0, w, h);

      // Subtle Grid 
      ctx.strokeStyle = "rgba(34, 211, 238, 0.03)";
      ctx.lineWidth = 1;
      for(let i = 0; i < w; i += 80) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for(let i = 0; i < h; i += 80) {
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;

        // Screen wrap
        if (item.x < -50) item.x = w + 50;
        if (item.x > w + 50) item.x = -50;
        if (item.y < -50) item.y = h + 50;
        if (item.y > h + 50) item.y = -50;

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#082f49]/60 via-transparent to-[#082f49] opacity-90" />
    </div>
  );
}