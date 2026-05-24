"use client";
import React, { useEffect, useRef } from 'react';

export default function ArithmeticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Create soft, floating math "bubbles"
    const symbols = ["+", "-", "×", "÷", "=", "1", "2", "3", "5", "10"];
    const colors = ["#f472b6", "#38bdf8", "#fbbf24", "#34d399"]; // Soft pink, sky blue, amber, emerald

    const items = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3, // Very slow movement
      vy: (Math.random() - 0.5) * 0.3,
      char: symbols[Math.floor(Math.random() * symbols.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 40 + 20, // 20px to 60px
      rotation: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.01 // Slow spin
    }));

    const animate = () => {
      // Soft, dark plum/slate background
      ctx.fillStyle = "#0f0e17"; 
      ctx.fillRect(0, 0, w, h);

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;
        item.rotation += item.vRot;

        // Wrap around screen
        if (item.x < -50) item.x = w + 50;
        if (item.x > w + 50) item.x = -50;
        if (item.y < -50) item.y = h + 50;
        if (item.y > h + 50) item.y = -50;

        ctx.save();
        ctx.translate(item.x, item.y);
        ctx.rotate(item.rotation);
        
        ctx.font = `bold ${item.size}px "Comic Sans MS", "Nunito", sans-serif`;
        ctx.fillStyle = item.color;
        // Soft glowing opacity
        ctx.globalAlpha = 0.15; 
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(item.char, 0, 0);
        
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
      {/* Soft gradient overlay to keep text readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0e17]/50 via-transparent to-[#0f0e17] opacity-90" />
    </div>
  );
}