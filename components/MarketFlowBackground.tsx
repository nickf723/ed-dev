"use client";
import { useEffect, useRef } from "react";

export default function MarketFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const particles: Particle[] = [];
    const particleCount = 80;
    
    // Econ Palette (Emerald/Gold/Slate)
    const colors = ["#10b981", "#059669", "#f59e0b", "#64748b"];

    class Particle {
      x: number;
      y: number;
      speed: number;
      angle: number;
      size: number;
      color: string;
      wobble: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.speed = Math.random() * 1 + 0.2;
        this.angle = -Math.PI / 4; // Flowing Up-Right (Growth)
        this.size = Math.random() * 2 + 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.wobble = Math.random() * 100;
      }

      update(time: number) {
        // Add some sine wave motion
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Vertical wobble
        this.y += Math.sin(time + this.wobble) * 0.2;

        // Wrap around
        if (this.x > w) this.x = -10;
        if (this.y < -10) this.y = h + 10;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for(let i=0; i<particleCount; i++) particles.push(new Particle());

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Gradient Background (Subtle)
      const grad = ctx.createLinearGradient(0, h, w, 0);
      grad.addColorStop(0, "#020617"); // Slate-950
      grad.addColorStop(1, "#064e3b"); // Emerald-900 (very dark)
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Draw flow lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,255,255,0.02)";
      ctx.beginPath();
      for (let i = -100; i < w; i+= 100) {
          ctx.moveTo(i, h);
          ctx.lineTo(i + h, 0);
      }
      ctx.stroke();

      particles.forEach(p => {
          p.update(time);
          p.draw();
      });

      time += 0.02;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />
        <div className="hd-vignette" />
    </>
  );
}