"use client";
import { useEffect, useRef } from "react";

export default function SpacesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    let time = 0;

    const render = () => {
      time += 0.005;
      
      // Clear with "Void" Violet
      ctx.fillStyle = "#05020c"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = 150;

      // 1. DEFINE BASIS VECTORS (Animating)
      // v1 is fairly stable
      const v1 = {
          x: Math.cos(time * 0.3) * 1.2,
          y: Math.sin(time * 0.3) * 0.5
      };
      
      // v2 wanders around
      const v2 = {
          x: Math.cos(time * 0.7 + 2) * 0.8,
          y: Math.sin(time * 0.5) * 1.2
      };

      // 2. DRAW THE SPAN (The Grid)
      // The "Space" is all linear combinations: c1*v1 + c2*v2
      ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"; // Violet-500 faint
      ctx.lineWidth = 1;

      const lines = 15; // Grid density

      // Draw "Horizontal" grid lines (varying c1, fixed c2)
      for (let c2 = -lines; c2 <= lines; c2++) {
          ctx.beginPath();
          // Start point (c1 = -lines)
          let sx = cx + (-lines * v1.x + c2 * v2.x) * scale;
          let sy = cy - (-lines * v1.y + c2 * v2.y) * scale;
          ctx.moveTo(sx, sy);

          // End point (c1 = +lines)
          let ex = cx + (lines * v1.x + c2 * v2.x) * scale;
          let ey = cy - (lines * v1.y + c2 * v2.y) * scale;
          ctx.lineTo(ex, ey);
          ctx.stroke();
      }

      // Draw "Vertical" grid lines (fixed c1, varying c2)
      for (let c1 = -lines; c1 <= lines; c1++) {
          ctx.beginPath();
          // Start point (c2 = -lines)
          let sx = cx + (c1 * v1.x + -lines * v2.x) * scale;
          let sy = cy - (c1 * v1.y + -lines * v2.y) * scale;
          ctx.moveTo(sx, sy);

          // End point (c2 = +lines)
          let ex = cx + (c1 * v1.x + lines * v2.x) * scale;
          let ey = cy - (c1 * v1.y + lines * v2.y) * scale;
          ctx.lineTo(ex, ey);
          ctx.stroke();
      }

      // 3. DRAW BASIS VECTORS (The Source)
      const drawArrow = (vx: number, vy: number, color: string, label: string) => {
          const tx = cx + vx * scale;
          const ty = cy - vy * scale;

          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(tx, ty);
          ctx.stroke();

          // Dot at tip
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(tx, ty, 4, 0, Math.PI*2);
          ctx.fill();
          
          ctx.fillStyle = "#fff";
          ctx.font = "bold 14px monospace";
          ctx.fillText(label, tx + 10, ty);
      };

      drawArrow(v1.x, v1.y, "#d946ef", "v1"); // Fuchsia
      drawArrow(v2.x, v2.y, "#8b5cf6", "v2"); // Violet

      // Origin
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI*2);
      ctx.fill();

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