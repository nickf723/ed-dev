"use client";
import { useEffect, useRef } from "react";

export default function WindBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 };

    // Flow Field Setup
    const resolution = 20; // Grid cell size
    let cols = Math.floor(w / resolution);
    let rows = Math.floor(h / resolution);
    const grid: number[] = new Array(cols * rows).fill(0);

    // Particles
    const particleCount = 1000;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0,
      vy: 0,
      life: Math.random() * 100,
      maxLife: 50 + Math.random() * 100,
      color: Math.random() > 0.5 ? "rgba(224, 242, 254, 0.5)" : "rgba(186, 230, 253, 0.3)" // Sky colors
    }));

    // Simple Pseudo-Noise (Simplex-ish)
    const noise = (x: number, y: number) => {
        return Math.sin(x * 0.01) + Math.cos(y * 0.01) + Math.sin((x+y)*0.005);
    };

    const animate = () => {
      // Fade out for trails
      ctx.fillStyle = "rgba(2, 6, 23, 0.1)"; // Slate-950
      ctx.fillRect(0, 0, w, h);

      // Update Flow Field
      const time = Date.now() * 0.0002;
      for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
              const idx = x + y * cols;
              // Angle based on noise
              const angle = noise(x * resolution + time*50, y * resolution) * Math.PI * 2;
              grid[idx] = angle;
          }
      }

      // Update Particles
      ctx.lineWidth = 1;
      particles.forEach(p => {
          // Find grid angle
          let col = Math.floor(p.x / resolution);
          let row = Math.floor(p.y / resolution);
          
          // Clamp
          if (col < 0) col = 0; if (col >= cols) col = cols - 1;
          if (row < 0) row = 0; if (row >= rows) row = rows - 1;
          
          const angle = grid[col + row * cols];
          
          // Mouse Interaction (Deflection)
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const push = Math.max(0, (200 - dist) / 200);

          // Apply Forces
          p.vx += Math.cos(angle) * 0.1 + (dx/dist) * push * 0.5;
          p.vy += Math.sin(angle) * 0.1 + (dy/dist) * push * 0.5;
          
          // Friction/Speed Limit
          p.vx *= 0.95;
          p.vy *= 0.95;
          
          // Move
          const prevX = p.x;
          const prevY = p.y;
          p.x += p.vx * 2;
          p.y += p.vy * 2;
          p.life--;

          // Draw Line
          ctx.beginPath();
          ctx.moveTo(prevX, prevY);
          ctx.lineTo(p.x, p.y);
          ctx.strokeStyle = p.color;
          ctx.stroke();

          // Respawn
          if (p.x < 0 || p.x > w || p.y < 0 || p.y > h || p.life <= 0) {
              p.x = Math.random() * w;
              p.y = Math.random() * h;
              p.vx = 0; p.vy = 0;
              p.life = p.maxLife;
          }
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight;
        cols = Math.floor(w / resolution);
        rows = Math.floor(h / resolution);
    };

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