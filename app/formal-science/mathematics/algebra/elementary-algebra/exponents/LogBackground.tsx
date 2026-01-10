"use client";
import { useEffect, useRef } from "react";

export default function LogBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // Particles that follow exponential paths
    const particles: {
        x: number;
        y: number;
        startX: number;
        type: 'exp' | 'log';
        speed: number;
        life: number;
    }[] = [];

    const spawnParticle = () => {
        const type = Math.random() > 0.5 ? 'exp' : 'log';
        particles.push({
            x: 0, 
            y: h,
            startX: Math.random() * w,
            type,
            speed: 0.5 + Math.random() * 0.5,
            life: 0
        });
    };

    // Initial population
    for(let i=0; i<50; i++) spawnParticle();

    const render = () => {
      // Fade effect (High Energy Amber Void)
      ctx.fillStyle = "rgba(20, 10, 5, 0.1)"; 
      ctx.fillRect(0, 0, w, h);

      const cy = h - 100; // Ground level

      // Add new particles
      if (particles.length < 100) spawnParticle();

      for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.life += p.speed;

          // LOGIC: Map Linear Time to Exponential/Log Curves
          
          if (p.type === 'exp') {
              // y = 2^x
              // We map 'x' to screen width
              const normalizedX = p.life * 0.5; 
              p.x = p.startX + normalizedX * 10;
              // Exponential rise
              const rise = Math.pow(1.1, normalizedX); 
              p.y = cy - rise;
          } else {
              // y = log(x)
              // We map 'x' to vertical ascent
              const normalizedX = p.life;
              p.x = p.startX + normalizedX * 10;
              // Logarithmic rise (slows down)
              const rise = Math.log(normalizedX + 1) * 50; 
              p.y = cy - rise;
          }

          // Draw
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.type === 'exp' ? 2 : 1.5, 0, Math.PI*2);
          ctx.fillStyle = p.type === 'exp' ? "#f59e0b" : "#fbbf24"; // Amber-500 vs Amber-400
          ctx.fill();

          // Reset if off screen
          if (p.y < 0 || p.x > w) {
              particles.splice(i, 1);
          }
      }
      
      // Draw Asymptote Line (The limit)
      ctx.strokeStyle = "rgba(245, 158, 11, 0.1)";
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(w, cy);
      ctx.stroke();

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-50 pointer-events-none" />;
}