"use client";
import { useEffect, useRef } from "react";

export default function StudioBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const orbs: Orb[] = [];
    
    // Cinematic / Studio Lights Palette (Teal & Orange usually looks great)
    const colors = ["#ccfbf1", "#f0abfc", "#818cf8"]; 

    class Orb {
      x: number;
      y: number;
      r: number;
      color: string;
      vx: number;
      vy: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 150 + 50;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.1 + 0.05;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // Soft bounce
        if (this.x < -200 || this.x > w + 200) this.vx *= -1;
        if (this.y < -200 || this.y > h + 200) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, this.color);
        g.addColorStop(1, "transparent");
        
        ctx.fillStyle = g;
        ctx.globalAlpha = this.opacity;
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    for(let i=0; i<8; i++) orbs.push(new Orb());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      // Dark studio floor
      ctx.fillStyle = "#09090b"; 
      ctx.fillRect(0, 0, w, h);

      // Draw faint spotlight cone
      const g = ctx.createRadialGradient(w/2, h/2, 100, w/2, h/2, h);
      g.addColorStop(0, "rgba(255,255,255,0.03)");
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0,0,w,h);

      orbs.forEach(o => {
        o.update();
        o.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}