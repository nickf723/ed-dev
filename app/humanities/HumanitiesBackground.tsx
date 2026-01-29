"use client";
import { useEffect, useRef } from "react";

export default function HumanitiesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // --- STATE ---
    const particleCount = 2000;
    const particles: {x: number, y: number, vx: number, vy: number, life: number, color: string}[] = [];
    
    // Palette: Classic Humanities (Ochre, Sienna, Ink, Gold)
    const colors = [
        "rgb(234, 238, 3)",   // Amber
        "rgba(2, 162, 236, 0.86)",    // Sienna
        "rgba(14, 12, 173, 0.5)",  // Gold
        "rgba(30, 58, 138, 0.5)",   // Deep Blue
        "rgb(0, 0, 0)"  // Parchment White
    ];

    const initParticle = () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: 0,
        vy: 0,
        life: Math.random() * 100 + 50,
        color: colors[Math.floor(Math.random() * colors.length)]
    });

    for(let i=0; i<particleCount; i++) particles.push(initParticle());

    // Simplex/Perlin noise approximation for flow field
    const noise = (x: number, y: number) => {
        return Math.sin(x * 0.002) + Math.cos(y * 0.002 + x * 0.001);
    };

    const render = () => {
      // Fade out effect (Instead of clearing, we draw a semi-transparent rect)
      // This creates the "trails" or "brushstrokes"
      ctx.fillStyle = "rgba(6, 0, 95, 0.05)"; // Very dark warm black
      ctx.fillRect(0, 0, w, h);

      particles.forEach((p, i) => {
          // Calculate Flow Angle
          const angle = noise(p.x, p.y) * Math.PI * 2;
          
          // Update Velocity
          p.vx += Math.cos(angle) * 0.1;
          p.vy += Math.sin(angle) * 0.1;
          
          // Friction
          p.vx *= 0.95;
          p.vy *= 0.95;

          // Move
          p.x += p.vx;
          p.y += p.vy;

          // Draw Brushstroke
          ctx.beginPath();
          ctx.strokeStyle = p.color;
          ctx.lineWidth = 2;
          ctx.moveTo(p.x - p.vx*2, p.y - p.vy*2);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();

          // Reset if out of bounds or dead
          p.life--;
          if (p.life <= 0 || p.x < 0 || p.x > w || p.y < 0 || p.y > h) {
              particles[i] = initParticle();
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 opacity-60 pointer-events-none" />;
}