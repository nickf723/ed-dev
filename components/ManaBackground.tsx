"use client";
import { useEffect, useRef } from "react";

export default function ManaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    // WUBRG Palette
    const manaColors = [
      "rgba(248, 250, 252, 0.15)", // White (Slate-50)
      "rgba(59, 130, 246, 0.15)",  // Blue (Blue-500)
      "rgba(2, 6, 23, 0.3)",       // Black (Slate-950 - deeper shadow)
      "rgba(239, 68, 68, 0.15)",   // Red (Red-500)
      "rgba(34, 197, 94, 0.15)"    // Green (Green-500)
    ];

    const particles: ManaMote[] = [];
    const count = 100;

    class ManaMote {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      phase: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 3 + 1;
        this.color = manaColors[Math.floor(Math.random() * manaColors.length)];
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        // Swirling motion using noise-like sine waves
        const theta = Math.sin(this.x * 0.002 + time) + Math.cos(this.y * 0.002 + time);
        this.vx += Math.cos(theta) * 0.01;
        this.vy += Math.sin(theta) * 0.01;
        
        // Friction
        this.vx *= 0.98;
        this.vy *= 0.98;

        this.x += this.vx;
        this.y += this.vy;

        // Wrap
        if (this.x < -50) this.x = w + 50;
        if (this.x > w + 50) this.x = -50;
        if (this.y < -50) this.y = h + 50;
        if (this.y > h + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for(let i=0; i<count; i++) particles.push(new ManaMote());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      // Deep Void
      ctx.fillStyle = "#09050f"; 
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      time += 0.005;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen" />
        <div className="hd-vignette" />
        <div className="hd-noise opacity-10" />
    </>
  );
}