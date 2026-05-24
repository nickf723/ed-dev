"use client";
import { useEffect, useRef } from "react";

export default function RationalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const render = () => {
      ctx.fillStyle = "#090515"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const time = Date.now() * 0.0005;

      // 1. Smoothly Oscillating Asymptotes
      const h_asym = cx + Math.sin(time * 0.5) * (w * 0.3); // Sways left/right
      const k_asym = cy + Math.cos(time * 0.3) * (h * 0.2); // Sways up/down
      const a = 15000 + Math.sin(time) * 5000; // "Breathing" stretch factor

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)";
      ctx.setLineDash([10, 10]);

      // Vertical Asymptote
      ctx.beginPath();
      ctx.moveTo(h_asym, 0); ctx.lineTo(h_asym, h);
      ctx.stroke();

      // Horizontal Asymptote
      ctx.beginPath();
      ctx.moveTo(0, k_asym); ctx.lineTo(w, k_asym);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. Draw Hyperbola Branches safely
      ctx.strokeStyle = "rgba(139, 92, 246, 0.4)";
      ctx.lineWidth = 3;

      // Left Branch
      ctx.beginPath();
      for (let x = 0; x < h_asym - 5; x += 5) {
          const y = (a / (x - h_asym)) + k_asym;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Right Branch
      ctx.beginPath();
      let firstRight = true;
      for (let x = h_asym + 5; x <= w; x += 5) {
          const y = (a / (x - h_asym)) + k_asym;
          if (firstRight) { ctx.moveTo(x, y); firstRight = false; }
          else ctx.lineTo(x, y);
      }
      ctx.stroke();

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}