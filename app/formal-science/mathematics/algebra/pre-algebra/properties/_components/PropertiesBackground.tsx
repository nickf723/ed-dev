"use client";
import React, { useEffect, useRef } from 'react';

export default function PropertiesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Emerald / Teal / Slate theme
    const colors = ["#10b981", "#14b8a6", "#34d399", "#94a3b8"]; 
    const equations = [
        "a + b = b + a", 
        "(a + b) + c = a + (b + c)", 
        "a(b + c) = ab + ac", 
        "a × 1 = a",
        "a + 0 = a",
        "{ }",
        "[ ]",
        "( )"
    ];

    const items = Array.from({ length: 25 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      text: equations[Math.floor(Math.random() * equations.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 20 + 14,
      opacity: Math.random() * 0.15 + 0.05
    }));

    const animate = () => {
      // Deep Slate background
      ctx.fillStyle = "#0f172a"; 
      ctx.fillRect(0, 0, w, h);

      // Draw faint geometric layout lines (representing area models/structure)
      ctx.strokeStyle = "rgba(16, 185, 129, 0.03)";
      ctx.lineWidth = 1;
      
      // Vertical rules
      for(let i = w/4; i < w; i += w/4) {
          ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, h); ctx.stroke();
      }

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;

        // Wrap around screen
        if (item.x < -100) item.x = w + 100;
        if (item.x > w + 100) item.x = -100;
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/60 via-transparent to-[#0f172a] opacity-90" />
    </div>
  );
}