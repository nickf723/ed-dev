"use client";
import { useEffect, useRef } from "react";

export default function TectonicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };
    let time = 0;

    // Voronoi Seeds (Plate Centers)
    const seedCount = 20;
    const seeds = Array.from({ length: seedCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      color: Math.random() > 0.5 ? "#1c1917" : "#0c0a09" // Stone colors (Stone-900/950)
    }));

    const animate = () => {
      ctx.fillStyle = "#0c0a09"; // Base rock
      ctx.fillRect(0, 0, w, h);
      time += 0.05;

      // Update Seeds (Continental Drift)
      seeds.forEach(s => {
          s.x += s.vx; s.y += s.vy;
          // Wrap
          if(s.x < -100) s.x = w + 100;
          if(s.x > w + 100) s.x = -100;
          if(s.y < -100) s.y = h + 100;
          if(s.y > h + 100) s.y = -100;
      });

      // Pixel-based Voronoi Rendering is too slow for high-res full screen in JS.
      // Instead, we use a geometric approximation or just draw edges between neighbors.
      // Optimization: Draw large polygons based on seeds? 
      // Better Visual: Just draw "Cracks" connecting random nearby points?
      
      // Let's do a "Delaunay-ish" web to simulate fault lines.
      ctx.lineWidth = 2;
      
      for (let i = 0; i < seeds.length; i++) {
          for (let j = i + 1; j < seeds.length; j++) {
              const s1 = seeds[i];
              const s2 = seeds[j];
              const dist = Math.sqrt((s1.x - s2.x)**2 + (s1.y - s2.y)**2);
              
              if (dist < 400) {
                  // This is a "Fault Line"
                  
                  // Interaction: Distance to mouse
                  const midX = (s1.x + s2.x) / 2;
                  const midY = (s1.y + s2.y) / 2;
                  const mouseDist = Math.sqrt((midX - mouse.x)**2 + (midY - mouse.y)**2);
                  
                  // Stress Glow
                  const stress = Math.max(0, (300 - mouseDist) / 300);
                  
                  ctx.beginPath();
                  ctx.moveTo(s1.x, s1.y);
                  ctx.lineTo(s2.x, s2.y);
                  
                  // Magma Color Logic
                  const r = Math.floor(50 + stress * 200); // Dark grey to Bright Red
                  const g = Math.floor(50 + stress * 100);
                  const b = 50;
                  
                  ctx.strokeStyle = `rgb(${r},${g},${b})`;
                  ctx.lineWidth = 1 + stress * 3;
                  ctx.globalAlpha = 0.2 + stress * 0.8;
                  
                  // Jitter (Earthquake)
                  if (stress > 0.8) {
                      const jitterX = (Math.random()-0.5) * 5;
                      const jitterY = (Math.random()-0.5) * 5;
                      ctx.lineTo(s2.x + jitterX, s2.y + jitterY);
                  }
                  
                  ctx.stroke();
              }
          }
      }
      ctx.globalAlpha = 1;

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}