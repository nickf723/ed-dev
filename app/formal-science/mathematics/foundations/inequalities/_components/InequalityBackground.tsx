"use client";
import React, { useEffect, useRef } from 'react';

export default function InequalityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Amber and Sky Blue to represent the two sides of an inequality
    const colors = ["#f59e0b", "#0ea5e9"]; 
    const symbols = ["<", ">", "≠", "="];

    const items = Array.from({ length: 40 }, () => {
      const isSymbol = Math.random() > 0.6;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 80 + 10, // Massive variance in magnitude (10px to 90px)
        color: colors[Math.floor(Math.random() * colors.length)],
        isSymbol,
        char: isSymbol ? symbols[Math.floor(Math.random() * symbols.length)] : "",
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.01
      };
    });

    const animate = () => {
      // Deep zinc background
      ctx.fillStyle = "#09090b"; 
      ctx.fillRect(0, 0, w, h);

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;
        item.rotation += item.vRot;

        // Wrap around screen seamlessly
        if (item.x < -100) item.x = w + 100;
        if (item.x > w + 100) item.x = -100;
        if (item.y < -100) item.y = h + 100;
        if (item.y > h + 100) item.y = -100;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);

        if (item.isSymbol) {
            ctx.font = `bold ${item.radius}px "Nunito", sans-serif`;
            ctx.fillStyle = item.color;
            ctx.globalAlpha = 0.08; 
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(item.char, 0, 0);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, item.radius, 0, Math.PI * 2);
            ctx.fillStyle = item.color;
            ctx.globalAlpha = 0.03; // Extremely subtle glowing orbs
            ctx.fill();
            ctx.strokeStyle = item.color;
            ctx.globalAlpha = 0.08;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        ctx.restore();
      });

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
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/40 via-transparent to-[#09090b] opacity-90" />
    </div>
  );
}