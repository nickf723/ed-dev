"use client";
import React, { useEffect, useRef } from 'react';

export default function MeasurementBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Deep slate/blue background theme
    const colors = ["#3b82f6", "#60a5fa", "#93c5fd"]; 

    // Floating ruler tick marks
    const ticks = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      length: Math.random() > 0.8 ? 30 : Math.random() > 0.5 ? 20 : 10,
      thickness: Math.random() > 0.8 ? 2 : 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      isHorizontal: Math.random() > 0.5
    }));

    let time = 0;

    const animate = () => {
      ctx.fillStyle = "#050a14"; // Deep midnight blue
      ctx.fillRect(0, 0, w, h);

      // Draw a subtle rotating concentric grid (like a radar or compass)
      ctx.save();
      ctx.translate(w / 2, h / 2);
      ctx.rotate(time * 0.05);
      
      ctx.strokeStyle = "rgba(59, 130, 246, 0.03)";
      ctx.lineWidth = 1;
      
      // Concentric circles
      for (let r = 50; r < Math.max(w, h); r += 100) {
          ctx.beginPath();
          ctx.arc(0, 0, r, 0, Math.PI * 2);
          ctx.stroke();
      }

      // Crosshairs
      ctx.beginPath();
      ctx.moveTo(-Math.max(w, h), 0);
      ctx.lineTo(Math.max(w, h), 0);
      ctx.moveTo(0, -Math.max(w, h));
      ctx.lineTo(0, Math.max(w, h));
      ctx.stroke();
      ctx.restore();

      // Animate floating tick marks
      ticks.forEach(tick => {
        tick.x += tick.vx;
        tick.y += tick.vy;

        if (tick.x < -50) tick.x = w + 50;
        if (tick.x > w + 50) tick.x = -50;
        if (tick.y < -50) tick.y = h + 50;
        if (tick.y > h + 50) tick.y = -50;

        ctx.beginPath();
        if (tick.isHorizontal) {
            ctx.moveTo(tick.x - tick.length / 2, tick.y);
            ctx.lineTo(tick.x + tick.length / 2, tick.y);
        } else {
            ctx.moveTo(tick.x, tick.y - tick.length / 2);
            ctx.lineTo(tick.x, tick.y + tick.length / 2);
        }
        
        ctx.strokeStyle = tick.color;
        ctx.lineWidth = tick.thickness;
        ctx.globalAlpha = 0.15; // Very subtle
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      });

      time += 0.01;
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/40 via-transparent to-[#050a14] opacity-90" />
    </div>
  );
}