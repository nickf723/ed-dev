"use client";
import { useEffect, useRef } from "react";

export default function RationalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // Systems of Rational Functions: y = a / (x - h) + k
    const systems: {
        h_asym: number; // Vertical Asymptote x=h
        k_asym: number; // Horizontal Asymptote y=k
        a: number;      // Stretch/Direction
        color: string;
        speed: number;
        opacity: number;
    }[] = [];

    const initSystems = () => {
        systems.length = 0;
        const count = 5; 
        for(let i=0; i<count; i++) {
            systems.push({
                h_asym: Math.random() * w,
                k_asym: Math.random() * h,
                a: (Math.random() > 0.5 ? 1 : -1) * (2000 + Math.random() * 5000), // Large 'a' for smoother curves
                color: Math.random() > 0.5 ? "#8b5cf6" : "#a78bfa", // Violet-500/400
                speed: (Math.random() - 0.5) * 0.5,
                opacity: 0.1 + Math.random() * 0.4
            });
        }
    };

    initSystems();

    const render = () => {
      // Clear with dark violet void
      ctx.fillStyle = "#090515"; // Very dark violet/black
      ctx.fillRect(0, 0, w, h);

      systems.forEach(s => {
          // Drifting Asymptotes
          s.h_asym += s.speed;
          
          // Wrap around
          if (s.h_asym > w + 200) s.h_asym = -200;
          if (s.h_asym < -200) s.h_asym = w + 200;

          // 1. Draw Asymptotes (The "Walls")
          ctx.strokeStyle = "rgba(139, 92, 246, 0.1)"; // Faint Violet
          ctx.lineWidth = 1;
          ctx.setLineDash([5, 5]);
          
          // Vertical (x = h)
          ctx.beginPath();
          ctx.moveTo(s.h_asym, 0);
          ctx.lineTo(s.h_asym, h);
          ctx.stroke();

          // Horizontal (y = k)
          ctx.beginPath();
          ctx.moveTo(0, s.k_asym);
          ctx.lineTo(w, s.k_asym);
          ctx.stroke();
          
          ctx.setLineDash([]);

          // 2. Draw Hyperbola Curves
          ctx.strokeStyle = s.color;
          ctx.globalAlpha = s.opacity;
          ctx.lineWidth = 2;
          ctx.beginPath();

          // We draw the curve in segments to avoid the "jump" across the asymptote
          // Left Branch (x < h)
          for (let x = 0; x < w; x+=5) {
              // Avoid the singularity
              if (Math.abs(x - s.h_asym) < 2) continue;

              // y = a / (x - h) + k
              const y = (s.a / (x - s.h_asym)) + s.k_asym;
              
              // Canvas Logic: If we just jumped across the asymptote, start a new path
              // Otherwise, lineTo
              if (x === 0 || Math.abs(x - s.h_asym) < 6) {
                  ctx.moveTo(x, y);
              } else {
                  // Don't draw connecting lines if we are off screen vertically
                  if (y > -1000 && y < h + 1000) {
                      ctx.lineTo(x, y);
                  }
              }
          }
          ctx.stroke();
          ctx.globalAlpha = 1;
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        initSystems();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}