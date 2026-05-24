"use client";
import { useEffect, useRef } from "react";

export default function LinearBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- CONFIG ---
    const gridSpacing = 60;
    const gridColor = "rgba(20, 184, 166, 0.05)"; // Teal-500 very faint
    const axisColor = "rgba(20, 184, 166, 0.2)";
    
    // --- STATE ---
    // We only simulate straight lines: y = mx + b
    const lines: { 
        m: number; 
        b: number; 
        color: string; 
        width: number;
        phase: number; // For animating the 'drawing' or 'dash' offset
        speed: number;
    }[] = [];

    const initLines = () => {
        lines.length = 0;
        // 1. The "Hero" Lines (Slow, bold)
        lines.push({ m: 1, b: 0, color: "#14b8a6", width: 2, phase: 0, speed: 0.5 }); // y = x
        lines.push({ m: -0.5, b: 100, color: "#2dd4bf", width: 1, phase: 0, speed: 0.3 }); // y = -0.5x + 100
        
        // 2. The "Context" Lines (Faint, varying slopes)
        for(let i=0; i<8; i++) {
            lines.push({
                m: (Math.random() - 0.5) * 4, // Slope between -2 and 2
                b: (Math.random() - 0.5) * h,
                color: "rgba(45, 212, 191, 0.1)",
                width: 1,
                phase: Math.random() * 100,
                speed: 0.2 + Math.random() * 0.2
            });
        }
    };

    initLines();

    const render = () => {
      // Clear
      ctx.fillStyle = "#040508"; // Very dark teal/black
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // 1. DRAW STATIC GRID
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;
      ctx.beginPath();
      // Vertical Grid
      for (let x = cx % gridSpacing; x < w; x += gridSpacing) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let x = cx % gridSpacing; x > 0; x -= gridSpacing) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      // Horizontal Grid
      for (let y = cy % gridSpacing; y < h; y += gridSpacing) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      for (let y = cy % gridSpacing; y > 0; y -= gridSpacing) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // Axes
      ctx.strokeStyle = axisColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(cx, 0); ctx.lineTo(cx, h);
      ctx.moveTo(0, cy); ctx.lineTo(w, cy);
      ctx.stroke();

      // 2. DRAW LINEAR FUNCTIONS
      // We calculate start and end points based on canvas bounds to ensure they span the screen
      lines.forEach(l => {
          l.phase -= l.speed; // Animate dash offset

          ctx.strokeStyle = l.color;
          ctx.lineWidth = l.width;
          
          // Create dashed effect for style
          ctx.setLineDash([10, 10]); // Dash pattern
          ctx.lineDashOffset = l.phase; 

          ctx.beginPath();

          // Calculate two points far off-screen to draw the full line
          // y = mx + b (coordinate space is centered at cx, cy, and Y is inverted)
          // Canvas Y = cy - (m * (Canvas X - cx) + b)
          
          const x1 = -100;
          const y1 = cy - (l.m * (x1 - cx) + l.b);
          
          const x2 = w + 100;
          const y2 = cy - (l.m * (x2 - cx) + l.b);

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();

          // Reset dash
          ctx.setLineDash([]);
          
          // Draw "Intercept" point if visible
          // y-intercept is at x=0 (which is cx on screen)
          const interceptY = cy - l.b;
          if (interceptY > 0 && interceptY < h) {
              ctx.fillStyle = l.color;
              ctx.beginPath();
              ctx.arc(cx, interceptY, 3, 0, Math.PI*2);
              ctx.fill();
          }
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        initLines();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}