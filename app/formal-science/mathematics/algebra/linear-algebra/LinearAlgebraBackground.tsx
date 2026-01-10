"use client";
import { useEffect, useRef } from "react";

export default function LinearAlgebraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIG ---
    // A matrix M that changes over time
    let time = 0;

    const render = () => {
      time += 0.005;
      
      // Clear with "The Void" (Deep Indigo)
      ctx.fillStyle = "#020410"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = 100; // Pixels per unit

      // 1. CALCULATE TRANSFORMATION MATRIX
      // We combine Rotation and Shear
      const cos = Math.cos(time * 0.5);
      const sin = Math.sin(time * 0.5);
      const shear = Math.sin(time * 0.2) * 0.5;
      
      // Matrix columns (Basis vectors i and j)
      // i_hat = [cos, sin + shear*cos]
      // j_hat = [-sin, cos + shear*-sin]
      
      const ix = cos;
      const iy = sin + shear * cos;
      const jx = -sin;
      const jy = cos - shear * sin;

      // 2. DRAW TRANSFORMED GRID (The "Fabric" of Space)
      ctx.lineWidth = 1;
      
      const gridSize = 10;
      for (let x = -gridSize; x <= gridSize; x++) {
          for (let y = -gridSize; y <= gridSize; y++) {
              // Transform (x, y) by Matrix
              // X' = x*ix + y*jx
              // Y' = x*iy + y*jy
              const tx = x * ix + y * jx;
              const ty = x * iy + y * jy;

              // Project to screen
              const px = cx + tx * scale;
              const py = cy - ty * scale; // Invert Y

              // Draw Grid Points
              ctx.fillStyle = "rgba(99, 102, 241, 0.2)"; // Indigo-500
              ctx.beginPath();
              ctx.arc(px, py, 1, 0, Math.PI*2);
              ctx.fill();
          }
      }

      // 3. DRAW BASIS VECTORS (The Arrows)
      const drawVector = (vx: number, vy: number, color: string, label: string) => {
          const px = cx + vx * scale;
          const py = cy - vy * scale;

          ctx.strokeStyle = color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(px, py);
          ctx.stroke();

          // Arrowhead
          ctx.fillStyle = color;
          ctx.beginPath();
          ctx.arc(px, py, 4, 0, Math.PI*2);
          ctx.fill();
          
          // Label
          ctx.font = "14px monospace";
          ctx.fillText(label, px + 10, py);
      };

      // Draw i_hat (Transformed X axis)
      drawVector(ix, iy, "#ef4444", "i"); // Red
      
      // Draw j_hat (Transformed Y axis)
      drawVector(jx, jy, "#22c55e", "j"); // Green

      // 4. DRAW ORIGIN
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