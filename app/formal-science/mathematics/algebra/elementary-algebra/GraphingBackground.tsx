"use client";
import { useEffect, useRef } from "react";

export default function GraphingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIG ---
    const gridSize = 50;
    const axisColor = "rgba(6, 182, 212, 0.3)"; // Cyan-500
    const gridColor = "rgba(6, 182, 212, 0.05)"; 
    
    // --- STATE ---
    // We animate "functions" being drawn
    const functions: { 
        type: 'linear' | 'quadratic';
        m: number; b: number; // Linear params
        a: number; h_shift: number; k_shift: number; // Quadratic params
        color: string;
        progress: number; // -w/2 to w/2
        speed: number;
    }[] = [];

    const spawnFunction = () => {
        const isLinear = Math.random() > 0.3;
        functions.push({
            type: isLinear ? 'linear' : 'quadratic',
            m: (Math.random() - 0.5) * 2,
            b: (Math.random() - 0.5) * h/2,
            a: (Math.random() - 0.5) * 0.01,
            h_shift: (Math.random() - 0.5) * w/2,
            k_shift: (Math.random() - 0.5) * h/2,
            color: Math.random() > 0.5 ? "#33ee22ff" : "#ff0000ff", 
            progress: -w/2,
            speed: 5 + Math.random() * 5
        });
    };

    // Spawn initial functions
    for(let i=0; i<5; i++) spawnFunction();

    const render = () => {
      // Clear with Graph Paper Blue
      ctx.fillStyle = "#080b14"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // 1. DRAW GRID
      ctx.lineWidth = 1;
      
      // Minor Grid
      ctx.strokeStyle = gridColor;
      ctx.beginPath();
      // Verticals
      for (let x = cx % gridSize; x < w; x += gridSize) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      // Horizontals
      for (let y = cy % gridSize; y < h; y += gridSize) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // Axes
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h); // Y Axis
      ctx.moveTo(0, cy); ctx.lineTo(w, cy); // X Axis
      ctx.stroke();

      // 2. DRAW FUNCTIONS
      ctx.lineWidth = 3;
      
      for (let i = functions.length - 1; i >= 0; i--) {
          const f = functions[i];
          f.progress += f.speed;

          // Remove if off screen
          if (f.progress > w/2) {
              functions.splice(i, 1);
              spawnFunction();
              continue;
          }

          ctx.strokeStyle = f.color;
          ctx.beginPath();

          // We draw a trail behind the 'head' (progress)
          const tailLength = w; 
          // Iterate from tail to head
          let first = true;
          for (let x = f.progress - tailLength; x <= f.progress; x+=10) {
              let y = 0;
              if (f.type === 'linear') {
                  y = f.m * x + f.b; // y = mx + b
              } else {
                  y = f.a * Math.pow(x - f.h_shift, 2) + f.k_shift; // Vertex form
              }
              
              // Canvas Y is inverted relative to Cartesian Y
              const screenX = cx + x;
              const screenY = cy - y;

              if (first) { ctx.moveTo(screenX, screenY); first = false; }
              else ctx.lineTo(screenX, screenY);
          }
          
          // Fade the tail
          // Using a gradient stroke is expensive, so we just use globalAlpha for the whole line for now
          // or rely on the background clear to handle trails if we weren't redrawing every frame.
          // Since we redraw, let's keep it solid but add a "head" dot.
          ctx.stroke();

          // Draw the "Pen" tip
          let tipY = 0;
          if (f.type === 'linear') tipY = f.m * f.progress + f.b;
          else tipY = f.a * Math.pow(f.progress - f.h_shift, 2) + f.k_shift;

          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(cx + f.progress, cy - tipY, 4, 0, Math.PI*2);
          ctx.fill();
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}