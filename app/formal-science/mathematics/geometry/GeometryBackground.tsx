"use client";
import { useEffect, useRef } from "react";

export default function GeometryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const points = Array.from({ length: 60 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const animate = () => {
      ctx.fillStyle = "#022c22"; // Emerald-950
      ctx.fillRect(0, 0, w, h);

      // Update Points
      points.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
      });

      // Draw Triangles (Simple Proximity Check)
      // Note: Real Delaunay is complex; we'll simulate the look by connecting 3 nearest neighbors
      ctx.lineWidth = 1;
      
      points.forEach((p1, i) => {
          // Find closest neighbors
          const neighbors = points
              .map((p2, j) => {
                  if (i === j) return { p: p2, dist: Infinity };
                  const dx = p1.x - p2.x;
                  const dy = p1.y - p2.y;
                  return { p: p2, dist: Math.sqrt(dx*dx + dy*dy) };
              })
              .sort((a, b) => a.dist - b.dist)
              .slice(0, 3); // Top 3 neighbors

          // Draw Triangle to first 2 neighbors to form a closed shape? 
          // Simpler aesthetic: Just lines to neighbors
          neighbors.forEach(n => {
              if (n.dist < 200) {
                  ctx.strokeStyle = `rgba(52, 211, 153, ${1 - n.dist/200})`; // Emerald-400
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(n.p.x, n.p.y);
                  ctx.stroke();
              }
          });
      });

      // Draw Vertices
      ctx.fillStyle = "#34d399";
      points.forEach(p => {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2, 0, Math.PI*2);
          ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}