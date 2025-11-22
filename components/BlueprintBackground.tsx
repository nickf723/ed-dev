"use client";
import { useEffect, useRef } from "react";

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animationFrameId: number;
    
    let offset = 0;
    const speed = 0.5;
    const gridSize = 40;
    
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#020617"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2; 
      
      // Horizon
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.5)"; 
      ctx.lineWidth = 2;
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();
      ctx.lineWidth = 1;

      // FLOOR LINES (The Fix is here)
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.15)"; 
      
      // Start 5px below horizon to avoid Z=0 issues
      let y = cy + 5; 
      
      while (y < h) {
         const dist = y - cy;
         const moveY = y + (offset % 40) * (dist / h); 
         
         if (moveY < h) {
            ctx.moveTo(0, moveY);
            ctx.lineTo(w, moveY);
         }
         
         // CRITICAL FIX: Always increment by at least 2 pixels
         // The original code allowed this to be 0, causing the freeze
         y += Math.max(2, dist * 0.15); 
      }
      ctx.stroke();

      // CEILING LINES
      ctx.beginPath();
      y = cy - 5;
      while (y > 0) {
         const dist = cy - y;
         const moveY = y - (offset % 40) * (dist / h);
         
         if (moveY > 0) {
            ctx.moveTo(0, moveY);
            ctx.lineTo(w, moveY);
         }
         y -= Math.max(2, dist * 0.15); // CRITICAL FIX
      }
      ctx.stroke();

      // Vertical Lines
      ctx.beginPath();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.05)";
      for (let x = -w; x < w * 2; x += gridSize * 3) {
          ctx.moveTo(x, h);
          ctx.lineTo(cx, cy);
          ctx.moveTo(x, 0);
          ctx.lineTo(cx, cy);
      }
      ctx.stroke();

      offset += speed;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}