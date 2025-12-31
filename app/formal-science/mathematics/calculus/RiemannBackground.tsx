"use client";
import { useEffect, useRef } from "react";

export default function RiemannBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const barWidth = 10;
    const cols = Math.ceil(w / barWidth);

    const animate = () => {
      // Void Background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, w, h);
      
      time += 0.02;

      // Draw Riemann Sum Bars
      for(let i=0; i<cols; i++) {
          const x = i * barWidth;
          
          // A complex wave function f(x)
          const yNorm = Math.sin(x * 0.005 + time) * 0.5 + Math.sin(x * 0.02 - time * 2) * 0.2;
          
          // Map to screen height (center is baseline)
          const height = yNorm * 200; 
          const centerY = h / 2;

          // Color based on height (Positive = Blue, Negative = Magenta)
          ctx.fillStyle = height > 0 ? "rgba(59, 130, 246, 0.1)" : "rgba(217, 70, 239, 0.1)";
          
          // Draw Bar
          ctx.fillRect(x, centerY, barWidth - 1, -height);
          
          // Draw Top Cap (The Function Line)
          ctx.fillStyle = height > 0 ? "#60a5fa" : "#e879f9";
          ctx.fillRect(x, centerY - height, barWidth, 2);
      }

      // Axis Line
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.beginPath();
      ctx.moveTo(0, h/2);
      ctx.lineTo(w, h/2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}