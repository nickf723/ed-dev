"use client";
import { useEffect, useRef } from "react";

export default function TransformationsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const render = () => {
      // Clear with deep void
      ctx.fillStyle = "#0f0500"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const time = Date.now() * 0.0005;

      // Transformation Matrix varying over time
      // This creates a smooth blend of rotation and shear
      const a = Math.cos(time * 0.5);
      const b = Math.sin(time * 0.8) * 0.5;
      const c = Math.sin(time * 0.6) * 0.5;
      const d = Math.cos(time * 0.7);

      const scale = 60; // Grid spacing

      ctx.lineWidth = 1;
      
      // Draw Warped Grid
      const gridSteps = 20;
      
      // Draw Vertical-ish lines
      for (let x = -gridSteps; x <= gridSteps; x++) {
          ctx.beginPath();
          ctx.strokeStyle = x === 0 ? "rgba(249, 115, 22, 0.4)" : "rgba(249, 115, 22, 0.1)"; // Highlight Y axis
          for (let y = -gridSteps; y <= gridSteps; y++) {
              const tx = x * a + y * b;
              const ty = x * c + y * d;
              const px = cx + tx * scale;
              const py = cy - ty * scale;
              if (y === -gridSteps) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
          }
          ctx.stroke();
      }

      // Draw Horizontal-ish lines
      for (let y = -gridSteps; y <= gridSteps; y++) {
          ctx.beginPath();
          ctx.strokeStyle = y === 0 ? "rgba(249, 115, 22, 0.4)" : "rgba(249, 115, 22, 0.1)"; // Highlight X axis
          for (let x = -gridSteps; x <= gridSteps; x++) {
              const tx = x * a + y * b;
              const ty = x * c + y * d;
              const px = cx + tx * scale;
              const py = cy - ty * scale;
              if (x === -gridSteps) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
          }
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