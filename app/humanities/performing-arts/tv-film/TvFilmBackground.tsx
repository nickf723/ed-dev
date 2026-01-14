"use client";
import { useEffect, useRef } from "react";

export default function TvFilmBackground() {
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
      // CLEAR (Transparent, so we can layer over the other background)
      ctx.clearRect(0, 0, w, h);

      // 1. DYNAMIC GRID (The "Floor")
      // A perspective grid moving slowly towards the viewer
      ctx.strokeStyle = "rgba(6, 182, 212, 0.1)"; // Cyan low opacity
      ctx.lineWidth = 1;
      
      const horizon = h * 0.4;
      const gridSpacing = 40;
      const speed = 0.5;
      const offset = (time * speed) % gridSpacing;

      ctx.beginPath();
      // Vertical Lines (Perspective)
      for (let x = 0; x <= w; x += 100) {
          ctx.moveTo(x, horizon);
          // Fanning out slightly for perspective illusion
          const xDist = x - w/2;
          ctx.lineTo(x + xDist * 2, h);
      }
      
      // Horizontal Lines (Moving)
      for (let y = horizon; y <= h; y += gridSpacing) {
          const yPos = y + offset;
          if(yPos > h) continue;
          
          // Fade out near horizon
          const alpha = (yPos - horizon) / (h - horizon);
          ctx.strokeStyle = `rgba(6, 182, 212, ${alpha * 0.15})`;
          ctx.beginPath();
          ctx.moveTo(0, yPos);
          ctx.lineTo(w, yPos);
          ctx.stroke();
      }
      ctx.stroke();

      // 2. FLOATING DATA POINTS (Constellation)
      // Random clean dots connecting
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      for(let i=0; i<30; i++) {
         const x = (Math.sin(time * 0.001 + i) * w/2) + w/2;
         const y = (Math.cos(time * 0.002 + i) * h/2) + h/2;
         ctx.beginPath();
         ctx.arc(x, y, 1.5, 0, Math.PI*2);
         ctx.fill();
      }

      time++;
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />;
}