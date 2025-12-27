"use client";
import { useEffect, useRef } from "react";

export default function PaleoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    // Embers (Sparks)
    const sparks: Spark[] = [];
    const sparkCount = 60;
    
    // Fire Palette (Amber / Orange / Red / Smoke)
    const colors = ["#f59e0b", "#d97706", "#b45309", "#fbbf24"];

    class Spark {
      x: number;
      y: number;
      vy: number;
      vx: number;
      size: number;
      life: number;
      maxLife: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = h + Math.random() * 100; // Start below screen
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() * 1 + 0.5) * -1; // Rise up
        this.size = Math.random() * 3 + 1;
        this.maxLife = Math.random() * 200 + 100;
        this.life = this.maxLife;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx + Math.sin(time + this.y * 0.01) * 0.2; // Wiggle
        this.y += this.vy;
        this.life--;
        this.size *= 0.995; // Shrink

        if (this.life <= 0 || this.size < 0.1) {
            this.reset();
        }
      }

      reset() {
          this.x = Math.random() * w;
          this.y = h + 50;
          this.vx = (Math.random() - 0.5) * 0.5;
          this.vy = (Math.random() * 1 + 0.5) * -1;
          this.size = Math.random() * 3 + 1;
          this.life = Math.random() * 200 + 100;
      }

      draw() {
        if (!ctx) return;
        ctx.fillStyle = this.color;
        ctx.globalAlpha = (this.life / this.maxLife) * 0.8;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for(let i=0; i<sparkCount; i++) sparks.push(new Spark());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Dark Cave Background
      ctx.fillStyle = "#1c100b"; // Very dark brown/black
      ctx.fillRect(0, 0, w, h);
      
      // Flicker Logic
      const flicker = Math.sin(time * 10) * 0.05 + Math.sin(time * 23) * 0.05;
      const baseLight = 0.15;
      
      // Warm Glow from bottom (The Fire)
      const g = ctx.createRadialGradient(w/2, h + 100, 50, w/2, h + 100, h * 1.2);
      g.addColorStop(0, `rgba(245, 158, 11, ${baseLight + flicker})`); // Bright Amber
      g.addColorStop(0.4, `rgba(180, 83, 9, ${baseLight * 0.5 + flicker})`); // Dark Orange
      g.addColorStop(1, "transparent");
      
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Draw Sparks
      sparks.forEach(s => {
          s.update();
          s.draw();
      });

      time += 0.01;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
        {/* Heavy Vignette for cave feel */}
        <div className="hd-vignette" style={{ background: "radial-gradient(circle, transparent 30%, rgba(15, 5, 0, 0.9) 100%)" }} />
        {/* Grain texture */}
        <div className="hd-noise opacity-10 mix-blend-overlay" />
    </>
  );
}