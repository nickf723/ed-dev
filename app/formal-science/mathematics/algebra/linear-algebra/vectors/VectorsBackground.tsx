"use client";
import { useEffect, useRef } from "react";

export default function VectorsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const gridSize = 40;
    let time = 0;

    const render = () => {
      time += 0.005;
      
      // Clear with "Villain Base" Orange/Black
      ctx.fillStyle = "#0f0500"; 
      ctx.fillRect(0, 0, w, h);

      // Draw Vector Field
      for (let x = 0; x < w; x += gridSize) {
          for (let y = 0; y < h; y += gridSize) {
              // Calculate Angle using Simplex-ish noise (Sine waves)
              // This creates smooth, flowing patterns
              const angle = Math.sin(x * 0.005 + time) + Math.cos(y * 0.005 + time);
              
              const cx = x + gridSize/2;
              const cy = y + gridSize/2;

              // Draw Arrow
              ctx.save();
              ctx.translate(cx, cy);
              ctx.rotate(angle);

              ctx.strokeStyle = "rgba(249, 115, 22, 0.3)"; // Orange-500
              ctx.lineWidth = 2;
              
              // Arrow Shaft
              const len = gridSize * 0.6;
              ctx.beginPath();
              ctx.moveTo(-len/2, 0);
              ctx.lineTo(len/2, 0);
              ctx.stroke();

              // Arrow Head
              ctx.beginPath();
              ctx.moveTo(len/2, 0);
              ctx.lineTo(len/2 - 5, -3);
              ctx.lineTo(len/2 - 5, 3);
              ctx.fillStyle = "rgba(249, 115, 22, 0.5)";
              ctx.fill();

              ctx.restore();
          }
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}