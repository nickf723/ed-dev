"use client";
import { useEffect, useRef } from "react";

export default function ColliderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Discipline Colors
    const colors = ["#4ade80", "#60a5fa", "#22d3ee", "#c084fc", "#fb923c"];
    
    type Particle = { x: number; y: number; vx: number; vy: number; radius: number; color: string };
    const particles: Particle[] = [];

    // Spawn Particles
    for(let i=0; i<40; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: 2 + Math.random() * 4,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }

    const animate = () => {
      // Dark Lab Background
      ctx.fillStyle = "#09090b"; 
      ctx.fillRect(0, 0, w, h);

      // Draw Connection Lines (The Network)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
          const p1 = particles[i];
          p1.x += p1.vx;
          p1.y += p1.vy;

          // Bounce
          if (p1.x < 0 || p1.x > w) p1.vx *= -1;
          if (p1.y < 0 || p1.y > h) p1.vy *= -1;

          for (let j = i + 1; j < particles.length; j++) {
              const p2 = particles[j];
              const dist = Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2);
              
              if (dist < 100) {
                  // If colors match, solid line. If different, gradient line (Fusion).
                  const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                  gradient.addColorStop(0, p1.color);
                  gradient.addColorStop(1, p2.color);
                  
                  ctx.strokeStyle = gradient;
                  ctx.globalAlpha = 1 - (dist / 100);
                  ctx.beginPath();
                  ctx.moveTo(p1.x, p1.y);
                  ctx.lineTo(p2.x, p2.y);
                  ctx.stroke();
              }
          }

          // Draw Particle
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI*2);
          ctx.fillStyle = p1.color;
          ctx.fill();
      }

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