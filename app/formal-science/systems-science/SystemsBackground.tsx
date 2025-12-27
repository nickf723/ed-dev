"use client";
import { useEffect, useRef } from "react";

export default function SystemsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // Lorenz System Parameters
    const sigma = 10;
    const rho = 28;
    const beta = 8/3;
    
    // Simulation State
    let x = 0.1;
    let y = 0;
    let z = 0;
    const dt = 0.01;
    
    // Trail
    const points: {x: number, y: number, z: number, hue: number}[] = [];
    const maxPoints = 2000;
    let hue = 0;

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = "rgba(5, 5, 10, 0.1)";
      ctx.fillRect(0, 0, w, h);

      // Calculate lots of steps per frame for smooth lines
      for (let i = 0; i < 20; i++) {
          const dx = (sigma * (y - x)) * dt;
          const dy = (x * (rho - z) - y) * dt;
          const dz = (x * y - beta * z) * dt;
          
          x += dx;
          y += dy;
          z += dz;

          points.push({ x, y, z, hue });
          hue = (hue + 0.5) % 360; // Cycle colors
          
          if (points.length > maxPoints) {
              points.shift();
          }
      }

      // Draw
      ctx.lineWidth = 2;
      const cx = w / 2;
      const cy = h / 2;
      const scale = 15;

      ctx.beginPath();
      if (points.length > 0) {
        // Start from first point
        let p = points[0];
        ctx.moveTo(cx + p.x * scale, cy + p.y * scale);
        
        for (let i = 1; i < points.length; i++) {
            p = points[i];
            ctx.lineTo(cx + p.x * scale, cy + p.y * scale);
            
            // Stroke continuously for gradient effect
            // Note: To do a true gradient stroke in Canvas 2D is expensive.
            // We'll just draw the path in one color for performance, 
            // or segments. Let's do segments for the "flow" look.
        }
      }
      
      // System Science Colors: Purple/Blue/Cyan
      // We'll use a dynamic stroke style
      const gradient = ctx.createLinearGradient(0, 0, w, h);
      gradient.addColorStop(0, "#ae00ff");
      gradient.addColorStop(0.5, "#1100ff");
      gradient.addColorStop(1, "#00ffea");
      
      ctx.strokeStyle = gradient;
      ctx.stroke();

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
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen" />
        <div className="hd-vignette" />
        <div className="hd-scanlines opacity-20" />
    </>
  );
}