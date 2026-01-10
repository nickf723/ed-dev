"use client";
import { useEffect, useRef } from "react";

export default function QuadraticBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // We animate parabolas in Vertex Form: y = a(x-h)^2 + k
    const curves: { 
        a: number; 
        h_val: number; 
        k_val: number; 
        color: string; 
        width: number;
        phase: number;
        speed: number;
    }[] = [];

    const initCurves = () => {
        curves.length = 0;
        // 1. The "Hero" Curve (Centered, breathing)
        curves.push({ 
            a: 0.005, h_val: 0, k_val: 0, 
            color: "#3b82f6", width: 3, phase: 0, speed: 0.02 
        });

        // 2. Background Echoes
        for(let i=0; i<6; i++) {
            curves.push({
                a: (Math.random() * 0.01) + 0.002,
                h_val: (Math.random() - 0.5) * w, // Shift vertex X
                k_val: (Math.random() - 0.5) * h, // Shift vertex Y
                color: "rgba(59, 130, 246, 0.1)", // Blue-500 low opacity
                width: 1,
                phase: Math.random() * 100,
                speed: 0.01 + Math.random() * 0.02
            });
        }
    };

    initCurves();

    const render = () => {
      // Clear
      ctx.fillStyle = "#020617"; // Slate-950
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // 1. DRAW GRID (Curved Context)
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(59, 130, 246, 0.05)";
      
      // Draw Axis of Symmetry for Hero Curve
      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.stroke();
      ctx.setLineDash([]);

      // 2. DRAW CURVES
      curves.forEach(c => {
          c.phase += c.speed;
          
          // Animate 'a' (width) - "Breathing" effect
          const currentA = c.a + Math.sin(c.phase) * 0.001; 
          
          ctx.strokeStyle = c.color;
          ctx.lineWidth = c.width;
          ctx.beginPath();

          // Draw the parabola pixel by pixel (or in chunks)
          // Canvas Y is inverted.
          // Vertex is at (cx + h_val, cy + k_val)
          
          // Iterate X across screen
          let first = true;
          for (let x = -w/2; x < w/2; x+=5) {
              // y = a(x - h)^2 + k
              const y = currentA * Math.pow(x - c.h_val, 2) + c.k_val;
              
              const screenX = cx + x;
              const screenY = cy - y; // Invert Y

              // Optimization: Don't draw if way off screen vertically
              if (screenY > -100 && screenY < h + 100) {
                  if (first) { ctx.moveTo(screenX, screenY); first = false; }
                  else ctx.lineTo(screenX, screenY);
              }
          }
          ctx.stroke();

          // Draw Vertex Point
          const vx = cx + c.h_val;
          const vy = cy - c.k_val;
          if (vx > 0 && vx < w && vy > 0 && vy < h) {
              ctx.fillStyle = c.color;
              ctx.beginPath();
              ctx.arc(vx, vy, c.width * 1.5, 0, Math.PI*2);
              ctx.fill();
          }
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        initCurves();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}