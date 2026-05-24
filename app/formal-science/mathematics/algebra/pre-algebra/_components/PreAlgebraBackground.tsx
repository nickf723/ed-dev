"use client";
import React, { useEffect, useRef } from 'react';

export default function PreAlgebraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Blue, Cyan, and Yellow theme to match the page
    const colors = ["#3b82f6", "#06b6d4", "#facc15", "#8b5cf6"]; 
    const symbols = ["x", "y", "a", "b", "=", "+", "-", "÷"];

    const items = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 15,
      opacity: Math.random() * 0.3 + 0.1
    }));

    const animate = () => {
      // Deep Slate/Blue background
      ctx.fillStyle = "#020617"; 
      ctx.fillRect(0, 0, w, h);

      // Draw faint graph paper grid
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
      ctx.lineWidth = 1;
      for(let i = 0; i < w; i += 60) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }
      for(let i = 0; i < h; i += 60) {
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;

        // Wrap around screen
        if (item.x < -50) item.x = w + 50;
        if (item.x > w + 50) item.x = -50;
        if (item.y < -50) item.y = h + 50;
        if (item.y > h + 50) item.y = -50;

        ctx.font = `bold ${item.size}px "Fira Code", monospace`;
        ctx.fillStyle = item.color;
        ctx.globalAlpha = item.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.char, item.x, item.y);
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-transparent to-[#020617] opacity-90" />
    </div>
  );
}