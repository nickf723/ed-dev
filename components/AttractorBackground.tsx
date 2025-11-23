"use client";
import { useEffect, useRef } from "react";

export default function AttractorBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Clifford Attractor Parameters (Slowly shifting)
    let a = 1.5, b = -1.8, c = 1.6, d = 0.9;
    let targetA = 1.5, targetB = -1.8, targetC = 1.6, targetD = 0.9;
    
    // Particle System
    const points: {x: number, y: number, color: string}[] = [];
    const numPoints = 10000; // High density for "smoke" look
    
    // Colors: Violet, Blue, Cyan
    const colors = ["#8b5cf6", "#3b82f6", "#06b6d4"];

    for(let i=0; i<numPoints; i++) {
        points.push({
            x: Math.random() * w,
            y: Math.random() * h,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    const animate = () => {
      // Fade out technique for trails
      ctx.fillStyle = "rgba(5, 5, 10, 0.05)";
      ctx.fillRect(0, 0, w, h);
      
      // Smoothly morph parameters (The Chaos Shift)
      if (Math.random() > 0.98) {
          targetA = (Math.random() - 0.5) * 3;
          targetB = (Math.random() - 0.5) * 3;
          targetC = (Math.random() - 0.5) * 3;
          targetD = (Math.random() - 0.5) * 3;
      }
      
      a += (targetA - a) * 0.001;
      b += (targetB - b) * 0.001;
      c += (targetC - c) * 0.001;
      d += (targetD - d) * 0.001;

      const scale = 200;
      const cx = w / 2;
      const cy = h / 2;

      // Clifford Attractor Equation:
      // x_n+1 = sin(a * y_n) + c * cos(a * x_n)
      // y_n+1 = sin(b * x_n) + d * cos(b * y_n)

      points.forEach(p => {
          // Normalize to -3 to 3 range roughly before equation
          let nx = (p.x - cx) / scale;
          let ny = (p.y - cy) / scale;

          // Apply equation
          const nextX = Math.sin(a * ny) + c * Math.cos(a * nx);
          const nextY = Math.sin(b * nx) + d * Math.cos(b * ny);
          
          // Map back to screen
          p.x = cx + nextX * scale;
          p.y = cy + nextY * scale;
          
          // Draw
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, 1, 1);
      });

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