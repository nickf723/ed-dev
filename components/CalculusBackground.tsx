"use client";
import { useEffect, useRef } from "react";

export default function CalculusBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Configuration
    const gridSize = 30; // Spacing between slopes
    const length = 15;   // Length of tangent line
    
    // Differential Equation: dy/dx = sin(x + t) + cos(y + t)
    // This creates a beautiful, shifting wave pattern
    const slopeFunction = (x: number, y: number, t: number) => {
        const normalizedX = x * 0.01;
        const normalizedY = y * 0.01;
        return Math.sin(normalizedX + t) + Math.cos(normalizedY + t);
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      for (let x = 0; x < w; x += gridSize) {
        for (let y = 0; y < h; y += gridSize) {
            // Calculate slope (m) at this point
            const m = slopeFunction(x, y, time);
            
            // Calculate angle from slope: theta = arctan(m)
            const angle = Math.atan(m);
            
            // Draw line centered on (x,y)
            const x1 = x - (length/2) * Math.cos(angle);
            const y1 = y - (length/2) * Math.sin(angle);
            const x2 = x + (length/2) * Math.cos(angle);
            const y2 = y + (length/2) * Math.sin(angle);

            ctx.beginPath();
            // Dynamic color based on slope steepness
            const intensity = Math.abs(m); 
            // Red/Blue shift based on positive/negative slope
            const r = m > 0 ? 255 : 50;
            const b = m < 0 ? 255 : 50;
            
            ctx.strokeStyle = `rgba(${r}, 50, ${b}, ${0.1 + intensity * 0.2})`;
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
      }

      time += 0.005; // Slow evolution
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50 mix-blend-screen" />
        <div className="hd-vignette" />
    </>
  );
}