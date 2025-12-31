"use client";
import { useEffect, useRef } from "react";

export default function MarketBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    let mouse = { x: -1000, y: 0 };

    // Candlestick Generators
    const columns = Math.ceil(w / 40);
    const candles = Array.from({ length: columns }, (_, i) => ({
      x: i * 40,
      h: Math.random() * 100,
      dir: Math.random() > 0.5 ? 1 : -1, // 1 = Green/Up, -1 = Red/Down
      speed: 0.5 + Math.random(),
      offset: Math.random() * 100
    }));

    const animate = () => {
      // Clear with dark blue-black
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, w, h);
      time += 0.05;

      // Draw Grid (The "Ledger")
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let y=0; y<=h; y+=50) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
      ctx.stroke();

      // Update & Draw Candles
      candles.forEach((c, i) => {
          // Market Fluctuation (Perlin-ish noise via Sine)
          const fluctuation = Math.sin(time + c.offset) * 20;
          
          // Mouse "Shock"
          const dx = c.x - mouse.x;
          const dist = Math.abs(dx);
          let shock = 0;
          if (dist < 200) {
              shock = (200 - dist) * 0.5 * Math.sin(time * 10);
          }

          const height = Math.abs(c.h + fluctuation + shock);
          const centerY = h / 2 + Math.sin(time * 0.2 + i * 0.1) * 100; // Wave trend
          
          const top = centerY - height / 2;
          const bottom = centerY + height / 2;

          // Wick
          ctx.beginPath();
          ctx.moveTo(c.x, top - 20);
          ctx.lineTo(c.x, bottom + 20);
          ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
          ctx.stroke();

          // Body
          ctx.fillStyle = c.dir > 0 ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"; // Emerald vs Rose
          // Highlight if shocked
          if (Math.abs(shock) > 10) {
             ctx.fillStyle = c.dir > 0 ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)";
          }

          const width = 20;
          ctx.fillRect(c.x - width/2, top, width, height);
      });

      // Draw "The Trend Line" (Moving Average)
      ctx.beginPath();
      ctx.moveTo(0, h/2);
      for(let x=0; x<=w; x+=10) {
          const y = h/2 + Math.sin(time * 0.2 + x * 0.005) * 100 + Math.sin(x * 0.02) * 20;
          ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(245, 158, 11, 0.2)"; // Gold
      ctx.lineWidth = 2;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}