"use client";
import { useEffect, useRef } from "react";

export default function RadicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    // We animate "growers" that split
    const particles: {
        x: number; 
        y: number; 
        angle: number; 
        speed: number; 
        life: number; 
        generation: number;
        color: string;
    }[] = [];

    const spawnRoot = (x: number, y: number, angle: number, gen: number) => {
        particles.push({
            x, y, angle,
            speed: 2 + Math.random(),
            life: 100 - gen * 10, // Younger generations die faster
            generation: gen,
            color: gen === 0 ? "#e879f9" : "#d946ef" // Fuchsia-400/500
        });
    };

    // Initial roots
    const init = () => {
        particles.length = 0;
        // Spawn from top center
        spawnRoot(w/2, 0, Math.PI/2, 0); 
        // Spawn from bottom corners for variety
        spawnRoot(0, h, -Math.PI/4, 0);
        spawnRoot(w, h, -Math.PI*0.75, 0);
    };

    init();

    const render = () => {
      // Fade effect (Trails)
      ctx.fillStyle = "rgba(10, 5, 20, 0.1)"; // Dark Fuchsia Void
      ctx.fillRect(0, 0, w, h);

      for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          
          // Move
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.life--;

          // Jitter angle (Organic feel)
          p.angle += (Math.random() - 0.5) * 0.2;

          // Draw
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(1, 4 - p.generation), 0, Math.PI*2);
          ctx.fillStyle = p.color;
          ctx.fill();

          // Split logic (The Fractal)
          // Chance to branch decreases with generation
          if (p.life > 0 && Math.random() < 0.05 && p.generation < 4) {
              spawnRoot(p.x, p.y, p.angle + Math.PI/4, p.generation + 1);
              spawnRoot(p.x, p.y, p.angle - Math.PI/4, p.generation + 1);
              // Main branch loses some life when splitting
              p.life -= 10;
          }

          // Death / Reset
          if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
              particles.splice(i, 1);
              // Respawn main roots periodically if empty
              if (particles.length < 5) init();
          }
      }

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        init();
    };
    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-40 pointer-events-none" />;
}