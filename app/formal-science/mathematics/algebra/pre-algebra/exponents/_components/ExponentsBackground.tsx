"use client";
import React, { useEffect, useRef } from 'react';

export default function ExponentsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Deep Purple / Fuchsia theme
    const colors = ["#a855f7", "#c084fc", "#d946ef", "#e879f9"]; 
    const strings = ["x²", "y³", "2ⁿ", "10⁵", "aᵇ", "√x", "3⁴"];

    const items = Array.from({ length: 35 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: (Math.random() * -0.5) - 0.2, // Drifting upwards
      text: strings[Math.floor(Math.random() * strings.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 24 + 14,
      opacity: Math.random() * 0.2 + 0.05
    }));

    const animate = () => {
      // Deep Violet background
      ctx.fillStyle = "#1e1b4b"; 
      ctx.fillRect(0, 0, w, h);

      // Draw horizontal axis lines (like a line chart background)
      ctx.strokeStyle = "rgba(168, 85, 247, 0.05)";
      ctx.lineWidth = 1;
      for(let i = h; i > 0; i -= 80) {
          ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(w, i); ctx.stroke();
      }

      items.forEach(item => {
        item.y += item.vy;

        // Wrap around screen (reset to bottom)
        if (item.y < -50) {
            item.y = h + 50;
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1b4b]/60 via-transparent to-[#1e1b4b] opacity-90" />
    </div>
  );
}