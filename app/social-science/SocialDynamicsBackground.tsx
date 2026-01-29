"use client";
import { useEffect, useRef } from "react";

export default function SocialDynamicsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const count = 250;
    const agents: Agent[] = [];
    
    // Social Palette
    const colors = ["#2f32ec", "#6329eb", "#1e70f3", "#a619dd"];

    class Agent {
      x: number;
      y: number;
      vx: number;
      vy: number;
      color: string;
      size: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 3 + 2;
      }

      update() {
        // Cohesion & Separation (Simplified Boids)
        let dx = 0;
        let dy = 0;
        let neighbors = 0;

        agents.forEach(other => {
          if (other === this) return;
          const dist = Math.hypot(this.x - other.x, this.y - other.y);
          
          // Separation: Avoid crowding
          if (dist < 40) {
            dx += (this.x - other.x) * 0.5;
            dy += (this.y - other.y) * 0.5;
          }
          // Cohesion: Move toward group
          if (dist < 100) {
             dx -= (this.x - other.x) * 0.005;
             dy -= (this.y - other.y) * 0.005;
             neighbors++;
          }
        });

        // Add social force to velocity
        this.vx += dx * 0.01;
        this.vy += dy * 0.01;

        // Speed Limit
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > 2) {
            this.vx = (this.vx / speed) * 2;
            this.vy = (this.vy / speed) * 2;
        }

        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen (Seamless Society)
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Connection lines to nearby neighbors
        agents.forEach(other => {
            const dist = Math.hypot(this.x - other.x, this.y - other.y);
            if (dist < 60) {
                ctx.beginPath();
                ctx.strokeStyle = this.color;
                ctx.globalAlpha = 0.1; // Very faint connections
                ctx.lineWidth = 3;
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(other.x, other.y);
                ctx.stroke();
                ctx.globalAlpha = 1;
            }
        });
      }
    }

    for (let i = 0; i < count; i++) {
      agents.push(new Agent());
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      agents.forEach(agent => {
        agent.update();
        agent.draw();
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