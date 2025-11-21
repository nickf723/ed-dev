"use client";
import { useEffect, useRef } from "react";

export default function SynthesisBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const orbs: Orb[] = [];
    const orbCount = 15;
    
    // The "Primary Colors" of knowledge that will mix
    const colors = [
      "#ef4444", // Red (Formal)
      "#22d3ee", // Cyan (Natural)
      "#8b5cf6", // Violet (Social)
      "#f59e0b", // Amber (Humanities)
      "#10b981", // Emerald (Applied)
    ];

    class Orb {
      x: number;
      y: number;
      radius: number;
      color: string;
      vx: number;
      vy: number;
      angle: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.radius = Math.random() * 100 + 50;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.angle = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += 0.002;

        // Gentle bounce
        if (this.x < -100 || this.x > w + 100) this.vx *= -1;
        if (this.y < -100 || this.y > h + 100) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        
        // Create gradient for soft edges
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        g.addColorStop(0, this.color + "88"); // Semi-transparent
        g.addColorStop(1, "transparent");
        
        ctx.fillStyle = g;
        // This blend mode is key for the "mixing" effect
        ctx.globalCompositeOperation = "screen"; 
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over"; // Reset
      }
    }

    for (let i = 0; i < orbCount; i++) {
        orbs.push(new Orb());
    }

    const animate = () => {
      // Clear with a very slight fade for trails, or full clear
      ctx.fillStyle = "#0a0a0a"; // Match background
      ctx.fillRect(0, 0, w, h);

      orbs.forEach(orb => {
        orb.update();
        orb.draw();
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
      className="fixed inset-0 pointer-events-none z-0 opacity-40"
    />
  );
}