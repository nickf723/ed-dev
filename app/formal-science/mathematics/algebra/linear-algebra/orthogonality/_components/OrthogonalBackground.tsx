"use client";
import { useEffect, useRef } from "react";

export default function OrthogonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    let time = 0;

    const render = () => {
      // Clear with deep cyan void
      ctx.fillStyle = "#020812"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      time += 0.005;

      const scale = 200;

      // Fixed Base Vector (u)
      const ux = Math.cos(time * 0.2);
      const uy = Math.sin(time * 0.2);

      // Rotating Target Vector (v)
      const vx = Math.cos(time * 0.8) * 1.5;
      const vy = Math.sin(time * 0.8) * 1.5;

      // Projection Math
      const dot = vx * ux + vy * uy;
      const magUSq = ux * ux + uy * uy;
      const scalar = dot / magUSq;

      const px = scalar * ux;
      const py = scalar * uy;

      ctx.lineWidth = 2;

      // Draw Grid Line for u
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)"; // Cyan-500 faint
      ctx.beginPath();
      ctx.moveTo(cx - ux * w, cy + uy * w);
      ctx.lineTo(cx + ux * w, cy - uy * w);
      ctx.stroke();

      // Draw Grid Line perpendicular to u
      ctx.strokeStyle = "rgba(45, 212, 191, 0.05)"; // Teal-400 faint
      ctx.beginPath();
      ctx.moveTo(cx - (-uy) * w, cy + (-ux) * w);
      ctx.lineTo(cx + (-uy) * w, cy - (-ux) * w);
      ctx.stroke();

      // Draw Vector u
      ctx.strokeStyle = "#0891b2"; // Cyan-600
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + ux * scale, cy - uy * scale);
      ctx.stroke();

      // Draw Vector v
      ctx.strokeStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + vx * scale, cy - vy * scale);
      ctx.stroke();

      // Draw Projection (Shadow)
      ctx.strokeStyle = "#2dd4bf"; // Teal-400
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + px * scale, cy - py * scale);
      ctx.stroke();

      // Draw Perpendicular Drop (Dashed)
      ctx.strokeStyle = "#f472b6"; // Pink-400
      ctx.lineWidth = 2;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(cx + vx * scale, cy - vy * scale);
      ctx.lineTo(cx + px * scale, cy - py * scale);
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw Origin
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, Math.PI * 2);
      ctx.fill();

      // Background particles projecting
      for(let i=0; i<5; i++) {
          const pvx = Math.cos(time + i) * (i+1);
          const pvy = Math.sin(time * 0.5 + i) * (i+1);
          const pdot = pvx * ux + pvy * uy;
          const ppx = pdot * ux;
          const ppy = pdot * uy;

          ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
          ctx.beginPath();
          ctx.moveTo(cx + pvx * 50, cy - pvy * 50);
          ctx.lineTo(cx + ppx * 50, cy - ppy * 50);
          ctx.stroke();
      }

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}