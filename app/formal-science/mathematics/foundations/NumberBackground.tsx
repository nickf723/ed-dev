"use client";
import { useEffect, useRef } from "react";

export default function NumberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const items = Array.from({ length: 40 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      char: Math.random() > 0.5 ? Math.floor(Math.random() * 9).toString() : ["+", "-", "=", "×", "÷"][Math.floor(Math.random() * 5)],
      color: ["#f472b6", "#22d3ee", "#facc15"][Math.floor(Math.random() * 3)], // Pink, Cyan, Yellow
      size: 20 + Math.random() * 30
    }));

    const animate = () => {
      ctx.fillStyle = "#09090b"; // Zinc-950
      ctx.fillRect(0, 0, w, h);

      items.forEach(item => {
        item.x += item.vx;
        item.y += item.vy;

        if (item.x < 0 || item.x > w) item.vx *= -1;
        if (item.y < 0 || item.y > h) item.vy *= -1;

        ctx.font = `bold ${item.size}px monospace`;
        ctx.fillStyle = item.color;
        ctx.globalAlpha = 0.2;
        ctx.fillText(item.char, item.x, item.y);
      });
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}