"use client";
import { useEffect, useRef } from "react";

export default function AestheticsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const goldenAngle = 137.508 * (Math.PI / 180);
    const count = 600;
    
    let time = 0;

    const render = () => {
      time += 0.002;
      
      // Clear with "Velvet" Dark Red/Black
      ctx.fillStyle = "#1a0505"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = 8; // Spread of the seeds

      ctx.globalCompositeOperation = "screen";

      for (let i = 0; i < count; i++) {
          // Phyllotaxis Formula
          // r = c * sqrt(n)
          // theta = n * 137.5 deg
          
          const r = scale * Math.sqrt(i) + (Math.sin(time + i * 0.01) * 5); // Breathe
          const theta = i * goldenAngle + time * 0.5; // Rotate

          const x = cx + r * Math.cos(theta);
          const y = cy + r * Math.sin(theta);

          // Color Gradient: Center (Gold) -> Edge (Rose)
          const hue = (i / count) * 60 + 330; // 330 (Rose) to 30 (Gold) cycle
          const alpha = 1 - (r / (Math.min(w,h)/2));

          if (alpha > 0) {
              ctx.fillStyle = `hsla(${hue}, 70%, 60%, ${alpha})`;
              ctx.beginPath();
              // Size varies slightly
              const size = 2 + (i/count)*2;
              ctx.arc(x, y, size, 0, Math.PI*2);
              ctx.fill();
              
              // Occasional sparkle
              if (Math.random() > 0.995) {
                  ctx.fillStyle = "#fff";
                  ctx.beginPath();
                  ctx.arc(x, y, size * 2, 0, Math.PI*2);
                  ctx.fill();
              }
          }
      }

      ctx.globalCompositeOperation = "source-over";
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