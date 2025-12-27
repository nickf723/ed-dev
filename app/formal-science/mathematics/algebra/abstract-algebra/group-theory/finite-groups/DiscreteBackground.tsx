"use client";
import { useEffect, useRef } from "react";

export default function DiscreteBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const animate = () => {
      // 1. Heavy Fade for subtle trails
      ctx.fillStyle = "rgba(2, 6, 23, 0.2)"; // Deep Slate (almost black)
      ctx.fillRect(0, 0, w, h);

      // 2. The Lattice
      const size = 60; // Larger cells = less noise
      const cols = Math.ceil(w / size);
      const rows = Math.ceil(h / size);
      
      // Slower time step
      const t = Math.floor(time * 0.05); 

      for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
              // Pattern: Classic XOR fractal
              const val = (i ^ j) ^ t;
              
              // Only draw sparse points
              if (val % 11 === 0) {
                  const x = i * size;
                  const y = j * size;
                  
                  // Monochromatic Palette (Cyan/Slate)
                  const alpha = (Math.sin(time * 0.02 + i * 0.1) + 1) * 0.1; // Breathing opacity
                  ctx.fillStyle = `rgba(56, 189, 248, ${alpha})`; // Sky-400
                  
                  // Draw "Data Point" (Square)
                  const s = size * 0.8;
                  const offset = (size - s) / 2;
                  ctx.fillRect(x + offset, y + offset, s, s);
                  
                  // Connector Dot
                  if (val % 3 === 0) {
                      ctx.fillStyle = `rgba(148, 163, 184, ${alpha * 1.5})`; // Slate-400
                      ctx.beginPath();
                      ctx.arc(x + size/2, y + size/2, 2, 0, Math.PI*2);
                      ctx.fill();
                  }
              }
          }
      }

      time++;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_95%)]" />
    </>
  );
}