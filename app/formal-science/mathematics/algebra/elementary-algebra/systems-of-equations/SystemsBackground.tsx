"use client";
import { useEffect, useRef } from "react";

export default function SystemsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // Line 1 (Cyan)
    const l1 = { m: 0.5, b: 0, color: "#06b6d4", speed: 0.002, phase: 0 };
    // Line 2 (Orange)
    const l2 = { m: -0.5, b: 0, color: "#f59e0b", speed: 0.003, phase: Math.PI };
    
    // Intersection Point
    const target = { x: 0, y: 0 };

    const render = () => {
      // Clear
      ctx.fillStyle = "#04060f"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const time = Date.now() * 0.001;

      // 1. ANIMATE LINES
      // Oscillate slopes and intercepts slightly
      l1.m = Math.sin(time * 0.2) * 1.5; 
      l1.b = Math.cos(time * 0.5) * 100;
      
      l2.m = Math.cos(time * 0.3 + 2) * 1.5;
      l2.b = Math.sin(time * 0.4) * 100;

      // 2. CALCULATE INTERSECTION (Algebra Logic)
      // m1*x + b1 = m2*x + b2
      // x * (m1 - m2) = b2 - b1
      // x = (b2 - b1) / (m1 - m2)
      
      let intersectX = (l2.b - l1.b) / (l1.m - l2.m);
      // Clamp for visual sanity if parallel
      if (!isFinite(intersectX)) intersectX = 0; 
      
      const intersectY = l1.m * intersectX + l1.b;

      // Map to Screen Coords
      // Note: Canvas Y is inverted
      target.x = cx + intersectX;
      target.y = cy - intersectY;

      // 3. DRAW LINES
      const drawLine = (line: typeof l1) => {
          ctx.strokeStyle = line.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          const xStart = -cx;
          const yStart = cy - (line.m * xStart + line.b);
          const xEnd = cx * 2; // Extra wide
          const yEnd = cy - (line.m * xEnd + line.b);
          
          ctx.moveTo(0, yStart);
          ctx.lineTo(w, yEnd);
          ctx.stroke();
      };

      ctx.globalAlpha = 0.4;
      drawLine(l1);
      drawLine(l2);

      // 4. DRAW TARGET RETICLE (The Solution)
      ctx.globalAlpha = 1;
      const size = 20;
      
      // Glow
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#ffffff";
      
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Box corners
      ctx.moveTo(target.x - size, target.y - size + 10); ctx.lineTo(target.x - size, target.y - size); ctx.lineTo(target.x - size + 10, target.y - size);
      ctx.moveTo(target.x + size, target.y - size + 10); ctx.lineTo(target.x + size, target.y - size); ctx.lineTo(target.x + size - 10, target.y - size);
      ctx.moveTo(target.x - size, target.y + size - 10); ctx.lineTo(target.x - size, target.y + size); ctx.lineTo(target.x - size + 10, target.y + size);
      ctx.moveTo(target.x + size, target.y + size - 10); ctx.lineTo(target.x + size, target.y + size); ctx.lineTo(target.x + size - 10, target.y + size);
      ctx.stroke();

      // Coordinates Label
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#ffffff";
      ctx.font = "10px monospace";
      ctx.fillText(`SOL: (${Math.round(intersectX)}, ${Math.round(intersectY)})`, target.x + 25, target.y - 25);

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}