"use client";
import { useEffect, useRef } from "react";

export default function SocialBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -500, y: -500 };

    // Agent Class
    class Agent {
        x: number;
        y: number;
        vx: number;
        vy: number;
        color: number; // Hue 0-360
        baseColor: number;

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            // Start with mostly cool colors (status quo)
            this.baseColor = 200 + Math.random() * 60; // Blue/Indigo range
            this.color = this.baseColor;
        }

        update(neighbors: Agent[]) {
            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Bounce
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;

            // Social Influence (Color Blending)
            // If near mouse, shift to "Radical" color (Teal/Gold)
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 150) {
                // Radicalize (Shift towards 170 - Teal or 45 - Gold)
                this.color += (170 - this.color) * 0.05;
            } else {
                // Revert to status quo slowly
                this.color += (this.baseColor - this.color) * 0.01;
            }
        }

        draw() {
            // ctx is guaranteed to be non-null because we return early in useEffect if it's null
            ctx!.beginPath();
            ctx!.arc(this.x, this.y, 3, 0, Math.PI*2);
            ctx!.fillStyle = `hsl(${this.color}, 70%, 50%)`;
            ctx!.fill();
        }
    }

    // Create Society
    const agents: Agent[] = Array.from({ length: 100 }, () => new Agent());

    const animate = () => {
      // Clear with trail
      ctx.fillStyle = "rgba(30, 27, 75, 0.2)"; // Indigo-950
      ctx.fillRect(0, 0, w, h);

      // Update & Draw Connections
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < agents.length; i++) {
          const a = agents[i];
          a.update(agents);
          a.draw();

          // Connect to neighbors
          for (let j = i + 1; j < agents.length; j++) {
              const b = agents[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if (dist < 100) {
                  ctx.beginPath();
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  // Line color is average of agents
                  const avgHue = (a.color + b.color) / 2;
                  ctx.strokeStyle = `hsla(${avgHue}, 70%, 50%, ${1 - dist/100})`;
                  ctx.stroke();
              }
          }
      }

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