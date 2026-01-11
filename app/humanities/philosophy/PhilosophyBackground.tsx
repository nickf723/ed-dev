"use client";
import { useEffect, useRef } from "react";

export default function PhilosophyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const particleCount = 150;
    const particles: {x: number, y: number, vx: number, vy: number, size: number, alpha: number}[] = [];

    const initParticle = () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2, // Drifting slowly
        size: Math.random() * 2,
        alpha: Math.random() * 0.5 + 0.1
    });

    for(let i=0; i<particleCount; i++) particles.push(initParticle());

    let time = 0;

    const render = () => {
      time += 0.01;
      
      // 1. Base Layer: Dark Stone
      ctx.fillStyle = "#0c0a09"; // Stone-950
      ctx.fillRect(0, 0, w, h);

      // 2. Volumetric Light (The "Cave" Opening)
      // A gradient from top-center fading down
      const gradient = ctx.createLinearGradient(w/2, 0, w/2, h);
      gradient.addColorStop(0, "rgba(251, 191, 36, 0.15)"); // Amber Light
      gradient.addColorStop(0.6, "rgba(251, 191, 36, 0.0)"); // Fade to black
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(w * 0.2, 0);
      ctx.lineTo(w * 0.8, 0);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fill();

      // 3. Drifting Dust Motes (Ideas)
      particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;

          // Wrap around screen
          if (p.x < 0) p.x = w;
          if (p.x > w) p.x = 0;
          if (p.y < 0) p.y = h;
          if (p.y > h) p.y = 0;

          // Sparkle effect based on position in "light"
          const distFromCenter = Math.abs(p.x - w/2);
          const brightness = Math.max(0, 1 - distFromCenter / (w * 0.4));
          
          ctx.fillStyle = `rgba(251, 191, 36, ${p.alpha * brightness})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI*2);
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-100 pointer-events-none" />;
}