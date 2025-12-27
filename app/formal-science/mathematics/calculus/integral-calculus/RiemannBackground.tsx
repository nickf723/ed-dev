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
    
    const barWidth = 20;
    const cols = Math.ceil(w / barWidth);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Deep Blue Void
      ctx.fillStyle = "#020617"; 
      ctx.fillRect(0, 0, w, h);
      
      ctx.fillStyle = "rgba(59, 130, 246, 0.15)"; // Blue-500 low opacity
      
      for (let i = 0; i < cols; i++) {
          // Complex wave function to create "landscape"
          // y = sin(x) + cos(2x) + noise
          const x = i * 0.1;
          const noise = Math.sin(x * 3 + time) * 20;
          const wave = Math.sin(x + time * 0.5) * 100 + Math.cos(x * 0.5 - time) * 50;
          
          const barHeight = (h / 2) + wave + noise;
          
          // Draw Riemann Bar
          const px = i * barWidth;
          
          // Gradient for depth
          const g = ctx.createLinearGradient(0, h, 0, h - barHeight);
          g.addColorStop(0, "rgba(30, 58, 138, 0.4)"); // Dark Blue
          g.addColorStop(1, "rgba(96, 165, 250, 0.1)"); // Light Blue
          
          ctx.fillStyle = g;
          ctx.fillRect(px, h - barHeight, barWidth - 2, barHeight);
          
          // Highlight Top
          ctx.fillStyle = "rgba(147, 197, 253, 0.5)";
          ctx.fillRect(px, h - barHeight, barWidth - 2, 2);
      }

      time += 0.01;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
        <div className="hd-vignette" />
    </>
  );
}