"use client";
import { useEffect, useRef } from "react";

export default function TriangleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const pointCount = 40;
    const connectionDist = 250;
    
    const points: {x: number, y: number, vx: number, vy: number}[] = [];

    // Init Points
    for(let i=0; i<pointCount; i++) {
        points.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }

    const render = () => {
      // Clear with Blueprint Blue
      ctx.fillStyle = "#0f172a"; 
      ctx.fillRect(0, 0, w, h);

      // Move Points
      points.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      // Draw Triangles
      // Simple algorithm: For each point, find neighbors within dist, form triangle with mutual neighbor
      ctx.lineWidth = 1;
      
      for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
              const d1 = Math.hypot(points[i].x - points[j].x, points[i].y - points[j].y);
              
              if (d1 < connectionDist) {
                  for (let k = j + 1; k < points.length; k++) {
                      const d2 = Math.hypot(points[j].x - points[k].x, points[j].y - points[k].y);
                      const d3 = Math.hypot(points[i].x - points[k].x, points[i].y - points[k].y);

                      if (d2 < connectionDist && d3 < connectionDist) {
                          // Found a triangle
                          ctx.beginPath();
                          ctx.moveTo(points[i].x, points[i].y);
                          ctx.lineTo(points[j].x, points[j].y);
                          ctx.lineTo(points[k].x, points[k].y);
                          ctx.closePath();

                          // Stroke
                          ctx.strokeStyle = "rgba(56, 189, 248, 0.1)"; // Sky-400
                          ctx.stroke();

                          // Fill (Subtle)
                          ctx.fillStyle = `rgba(56, 189, 248, ${0.02 + Math.random() * 0.01})`;
                          ctx.fill();
                      }
                  }
              }
          }
      }

      // Draw Nodes
      points.forEach(p => {
          ctx.fillStyle = "#38bdf8";
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
          ctx.fill();
      });

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