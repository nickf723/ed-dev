"use client";
import { useEffect, useRef } from "react";

export default function FuturologyBackground() {
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
      // Clear: Deep Cyberpunk Blue/Purple
      const bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, "#000874");
      bg.addColorStop(1, "#d801bb");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // PERSPECTIVE GRID
      // Horizon Line
      const horizon = h * 0.4;
      const fov = 300;

      ctx.lineWidth = 2;
      ctx.strokeStyle = "rgba(214, 12, 245, 0.3)"; // Neon Pink
      ctx.shadowBlur = 10;
      ctx.shadowColor = "rgba(232, 121, 249, 0.8)";

      // Vertical Lines (Converging to center)
      ctx.beginPath();
      for(let x = -w; x < w * 2; x += 100) {
          ctx.moveTo(x, h);
          ctx.lineTo(w/2, horizon);
      }
      ctx.stroke();

      // Horizontal Lines (Moving down)
      ctx.beginPath();
      offset = (offset + 1) % 100; // Speed
      
      // Z-depth simulation
      for(let z = 0; z < h; z += 20) {
          // Exponential spacing to fake depth
          const y = horizon + (z + offset) * (z * 0.002);
          if (y > h) continue;

          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // THE SUN (The Future)
      const sunGrad = ctx.createLinearGradient(w/2, horizon-200, w/2, horizon+100);
      sunGrad.addColorStop(0, "#facc15");
      sunGrad.addColorStop(1, "#ec4899");
      
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(w/2, horizon, 150, 0, Math.PI, true); // Semi-circle sun
      ctx.fill();

      // Scanline Overlay
      ctx.fillStyle = "rgba(0,0,0,0.1)";
      for(let i=0; i<h; i+=4) ctx.fillRect(0, i, w, 2);

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#05000a]" />;
}