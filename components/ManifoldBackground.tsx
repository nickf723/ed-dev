"use client";
import { useEffect, useRef } from "react";

export default function ManifoldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    const cols = 40;
    const rows = 25;
    const spacing = w / cols;

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Deep Void Background
      ctx.fillStyle = "#0a0510"; 
      ctx.fillRect(0, 0, w, h);
      
      ctx.strokeStyle = "rgba(139, 92, 246, 0.15)"; // Violet-500
      ctx.lineWidth = 1;

      // Draw the mesh
      for (let y = 0; y <= rows; y++) {
        ctx.beginPath();
        for (let x = 0; x <= cols; x++) {
            const px = x * spacing;
            // 3D Wave Function: z = sin(x) * cos(y)
            const z = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 50;
            const py = (y * spacing) + (h/4) + z; // Center vertically + wave height

            if (x === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.stroke();
      }
      
      // Vertical lines for grid effect
      for (let x = 0; x <= cols; x++) {
          ctx.beginPath();
          for (let y = 0; y <= rows; y++) {
             const px = x * spacing;
             const z = Math.sin(x * 0.2 + time) * Math.cos(y * 0.2 + time) * 50;
             const py = (y * spacing) + (h/4) + z;
             
             if (y === 0) ctx.moveTo(px, py);
             else ctx.lineTo(px, py);
          }
          ctx.stroke();
      }

      time += 0.005;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50 mix-blend-screen" />
        <div className="hd-vignette" />
    </>
  );
}