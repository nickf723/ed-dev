"use client";
import { useEffect, useRef } from "react";

export default function ComplexBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // Vectors rotating in the complex plane
    const vectors: {
        r: number;       // Radius (Modulus)
        theta: number;   // Angle (Argument)
        speed: number;
        color: string;
        trail: {x: number, y: number}[];
    }[] = [];

    const initVectors = () => {
        vectors.length = 0;
        const count = 30;
        for(let i=0; i<count; i++) {
            vectors.push({
                r: 50 + Math.random() * 300,
                theta: Math.random() * Math.PI * 2,
                speed: (Math.random() > 0.5 ? 1 : -1) * (0.01 + Math.random() * 0.02),
                color: Math.random() > 0.5 ? "#06b6d4" : "#d946ef", // Cyan or Magenta
                trail: []
            });
        }
    };

    initVectors();

    const render = () => {
      // Clear with glitchy dark void
      ctx.fillStyle = "#050505"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // 1. DRAW COMPLEX PLANE GRID
      ctx.lineWidth = 1;
      
      // Real Axis (Horizontal - Cyan)
      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
      ctx.beginPath();
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.stroke();
      
      // Imaginary Axis (Vertical - Magenta)
      ctx.strokeStyle = "rgba(217, 70, 239, 0.2)";
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.stroke();

      // Grid Circles (Modulus rings)
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      for(let r=100; r<600; r+=100) {
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI*2);
          ctx.stroke();
      }

      // 2. ANIMATE VECTORS
      vectors.forEach(v => {
          v.theta += v.speed;
          
          // Polar to Cartesian
          // x = r * cos(theta)
          // y = r * sin(theta)
          const x = cx + v.r * Math.cos(v.theta);
          const y = cy + v.r * Math.sin(v.theta);

          // Add to trail
          v.trail.push({x, y});
          if (v.trail.length > 50) v.trail.shift();

          // Draw Trail
          ctx.strokeStyle = v.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          if (v.trail.length > 0) {
              ctx.moveTo(v.trail[0].x, v.trail[0].y);
              for (let i = 1; i < v.trail.length; i++) {
                  ctx.lineTo(v.trail[i].x, v.trail[i].y);
              }
          }
          ctx.stroke();

          // Draw Vector Head (Dot)
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(x, y, 2, 0, Math.PI*2);
          ctx.fill();

          // Draw Connection to Origin (The "Phasor")
          ctx.strokeStyle = v.color;
          ctx.globalAlpha = 0.1;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.globalAlpha = 1;
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        initVectors();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}