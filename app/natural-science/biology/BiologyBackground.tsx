"use client";
import { useEffect, useRef } from "react";

export default function BiologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // CONFIG
    const particleCount = 60;
    const connectDistance = 150;
    
    const particles: {x: number, y: number, vx: number, vy: number, size: number}[] = [];

    // Init Particles
    for(let i=0; i<particleCount; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 2 + 1
        });
    }

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Update & Draw Particles
      particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;

          // Bounce
          if(p.x < 0 || p.x > w) p.vx *= -1;
          if(p.y < 0 || p.y > h) p.vy *= -1;

          // Draw Dot
          ctx.fillStyle = "rgba(16, 185, 129, 0.6)"; // Emerald Green
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

          // Connect Neighbors (The Mycelium Effect)
          for(let j=i+1; j<particles.length; j++) {
              const p2 = particles[j];
              const dx = p.x - p2.x;
              const dy = p.y - p2.y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if(dist < connectDistance) {
                  const opacity = 1 - (dist / connectDistance);
                  ctx.strokeStyle = `rgba(52, 211, 153, ${opacity * 0.4})`; // Light Green lines
                  ctx.lineWidth = 1;
                  ctx.beginPath();
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none bg-[#050a07]" />;
}