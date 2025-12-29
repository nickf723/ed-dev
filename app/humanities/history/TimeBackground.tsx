"use client";
import { useEffect, useRef } from "react";

export default function TimeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 };

    // Particles representing moments in time
    const count = 400;
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: 0.2 + Math.random() * 0.5, // Drift speed
      size: Math.random() * 2,
      color: Math.random() > 0.95 ? "#fbbf24" : "#78350f", // Rare Gold vs Common Brown
      alpha: 0.1 + Math.random() * 0.5
    }));

    const animate = () => {
      // Clear with trail for motion blur
      ctx.fillStyle = "rgba(26, 5, 5, 0.2)"; // Deep Maroon trail
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
          // Move
          p.x += p.vx;
          
          // Mouse Interaction (Time Dilation)
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          
          if (dist < 200) {
              const force = (200 - dist) / 200;
              // Swirl / Slow down
              p.x -= force * 1; 
              p.y += (dy/dist) * force; 
          }

          // Reset if off screen
          if (p.x > w) {
              p.x = -10;
              p.y = Math.random() * h;
          }

          // Draw
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.alpha;
          ctx.fill();
      });
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