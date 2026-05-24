"use client";
import React, { useEffect, useRef } from 'react';

export default function FractionsAdvBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = ["#f97316", "#f59e0b", "#fbbf24", "#fb923c"]; 
    const numbers = [1, 2, 3, 4, 5, 7, 8, 9];

    const items = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      num: numbers[Math.floor(Math.random() * numbers.length)],
      den: numbers[Math.floor(Math.random() * numbers.length)],
      whole: Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : null,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 15 + 15,
      opacity: Math.random() * 0.2 + 0.05
    }));

    const animate = () => {
      ctx.fillStyle = "#1e1005"; // Deep warm brown/black
      ctx.fillRect(0, 0, w, h);

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;

        if (item.x < -100) item.x = w + 100;
        if (item.x > w + 100) item.x = -100;
        if (item.y < -100) item.y = h + 100;
        if (item.y > h + 100) item.y = -100;

        ctx.font = `bold ${item.size}px "Fira Code", monospace`;
        ctx.fillStyle = item.color;
        ctx.globalAlpha = item.opacity;
        ctx.textAlign = "center";
        
        let offsetX = item.x;

        // Draw Whole Number if it's a mixed fraction
        if (item.whole) {
            ctx.fillText(item.whole.toString(), offsetX - item.size, item.y + item.size / 4);
        }

        // Numerator
        ctx.fillText(item.num.toString(), offsetX, item.y - item.size / 2);
        // Denominator
        ctx.fillText(item.den.toString(), offsetX, item.y + item.size / 2);
        
        // Fraction Line
        ctx.beginPath();
        ctx.moveTo(offsetX - item.size / 2, item.y - 8);
        ctx.lineTo(offsetX + item.size / 2, item.y - 8);
        ctx.strokeStyle = item.color;
        ctx.lineWidth = 2;
        ctx.stroke();
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#1e1005]/60 via-transparent to-[#1e1005] opacity-90" />
    </div>
  );
}