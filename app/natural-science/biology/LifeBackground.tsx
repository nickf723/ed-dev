"use client";
import { useEffect, useRef } from "react";

export default function LifeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: w / 2, y: h / 2 };

    // Creature Class
    class Organism {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      color: string;
      speed: number;
      angle: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.angle = Math.random() * Math.PI * 2;
        this.speed = 0.5 + Math.random() * 1.5;
        this.vx = Math.cos(this.angle) * this.speed;
        this.vy = Math.sin(this.angle) * this.speed;
        this.radius = 2 + Math.random() * 4;
        // Colors: Lime to Emerald to Cyan
        const colors = ["#84cc16", "#10b981", "#06b6d4"];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // 1. Move
        this.x += this.vx;
        this.y += this.vy;

        // 2. Mouse Interaction (Avoidance)
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        
        if (dist < 150) {
            const force = (150 - dist) / 150;
            this.vx += (dx / dist) * force * 0.5;
            this.vy += (dy / dist) * force * 0.5;
        }

        // 3. Wander / Organic Motion
        this.angle += (Math.random() - 0.5) * 0.1;
        // Gently steer towards current angle + wander
        const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
        // Normalize speed
        if(speed > 2) { this.vx *= 0.95; this.vy *= 0.95; }
        if(speed < 0.5) { this.vx *= 1.05; this.vy *= 1.05; }

        // 4. Wrap around screen
        if (this.x < -20) this.x = w + 20;
        if (this.x > w + 20) this.x = -20;
        if (this.y < -20) this.y = h + 20;
        if (this.y > h + 20) this.y = -20;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        // Draw body (Tadpole shape)
        const angle = Math.atan2(this.vy, this.vx);
        const headX = this.x + Math.cos(angle) * this.radius;
        const headY = this.y + Math.sin(angle) * this.radius;
        const tailX = this.x - Math.cos(angle) * (this.radius * 3);
        const tailY = this.y - Math.sin(angle) * (this.radius * 3);

        // Body
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();

        // Tail (Wiggle)
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(
            this.x - Math.cos(angle + 0.5) * 10, 
            this.y - Math.sin(angle + 0.5) * 10,
            tailX, tailY
        );
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.radius * 0.5;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }

    const population = Array.from({ length: 80 }, () => new Organism());

    const animate = () => {
      // Clear with slight green tint for "soup" feel
      ctx.fillStyle = "#020602"; 
      ctx.fillRect(0, 0, w, h);

      // Draw subtle background floating particles (dust/plankton)
      ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
      for(let i=0; i<50; i++) {
          const x = (Date.now() * 0.01 + i * 100) % w;
          const y = (Math.sin(i + Date.now() * 0.0001) * h + h) % h;
          ctx.beginPath();
          ctx.arc(x, y, Math.random(), 0, Math.PI*2);
          ctx.fill();
      }

      population.forEach(org => {
          org.update();
          org.draw();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}