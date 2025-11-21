"use client";
import { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const stars: Star[] = [];
    const starCount = 150; // Lots of small stars
    const mouse = { x: w / 2, y: h / 2 };

    // Space Palette
    const colors = ["#ffffff", "#a5f3fc", "#c4b5fd", "#fcd34d"]; 

    class Star {
      x: number;
      y: number;
      size: number;
      baseSize: number;
      color: string;
      vx: number;
      vy: number;
      friction: number;
      gravity: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseSize = Math.random() * 1.5;
        this.size = this.baseSize;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.2; // Very slow drift
        this.vy = (Math.random() - 0.5) * 0.2;
        this.friction = 0.98;
        this.gravity = 0.05;
      }

      update() {
        // Gravitational pull to mouse (subtle)
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Only pull if reasonably close (simulate local gravity well)
        if (dist < 300) {
            const force = (300 - dist) / 300;
            const angle = Math.atan2(dy, dx);
            const fx = Math.cos(angle) * force * this.gravity;
            const fy = Math.sin(angle) * force * this.gravity;
            
            this.vx += fx;
            this.vy += fy;
        }

        // Apply velocity
        this.x += this.vx;
        this.y += this.vy;

        // Apply friction to prevent uncontrolled acceleration
        // But keep a minimum drift
        if (Math.abs(this.vx) > 0.5) this.vx *= this.friction;
        if (Math.abs(this.vy) > 0.5) this.vy *= this.friction;

        // Screen wrap
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        // Twinkle effect
        if (Math.random() > 0.95) {
            this.size = this.baseSize * (Math.random() * 1.5 + 0.5);
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.random() * 0.5 + 0.5; // Flicker
        ctx.shadowBlur = this.size * 2;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }
    }

    for (let i = 0; i < starCount; i++) {
      stars.push(new Star());
    }

    const animate = () => {
      // Trail effect for movement
      ctx.fillStyle = "rgba(10, 10, 15, 0.2)"; 
      ctx.fillRect(0, 0, w, h);

      stars.forEach(star => {
        star.update();
        star.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80 mix-blend-screen"
    />
  );
}