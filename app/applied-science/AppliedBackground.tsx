"use client";
import { useEffect, useRef } from "react";

export default function AppliedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let offset = 0;

    const render = () => {
      // Background Color: Deep CAD Blue/Grey
      ctx.fillStyle = "#0f172a"; 
      ctx.fillRect(0, 0, w, h);

      // Grid Lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(148, 163, 184, 0.05)"; // Faint slate

      const gridSize = 40;
      
      // Vertical Lines
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal Lines (Moving)
      for (let y = -gridSize + (offset % gridSize); y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      
      // Moving Crosshairs
      const crosses = 15;
      ctx.fillStyle = "rgba(56, 189, 248, 0.3)";
      for(let i=0; i<crosses; i++) {
          const cx = (i * w / crosses + offset) % w;
          const cy = (Math.sin(i + offset * 0.01) * h * 0.5) + h/2;
          
          ctx.fillRect(cx - 2, cy - 0.5, 4, 1);
          ctx.fillRect(cx - 0.5, cy - 2, 1, 4);
      }

      offset += 0.2;
      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}