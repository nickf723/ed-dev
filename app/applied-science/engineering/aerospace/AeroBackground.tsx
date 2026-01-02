"use client";
import { useEffect, useRef } from "react";

export default function AeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        history: {x: number, y: number}[];

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = 2 + Math.random() * 2; // Flow speed
            this.vy = 0;
            this.history = [];
        }

        update() {
            // Airfoil Math (Simplified obstacle avoidance)
            // Obstacle center
            const ox = w / 2;
            const oy = h / 2;
            const radius = 100;

            const dx = this.x - ox;
            const dy = this.y - oy;
            const dist = Math.sqrt(dx*dx + dy*dy);

            // Flow Field Logic (Potential Flow approx)
            if (dist < 200) {
                // Deflect particles around the "wing" area
                // Push Y away from center
                const force = (200 - dist) / 200;
                if (this.y < oy) this.vy -= force * 0.5;
                if (this.y > oy) this.vy += force * 0.5;
                
                // Speed up over the top (Bernoulli!)
                if (this.y < oy) this.vx += force * 1.5;
            } else {
                // Return to laminar flow
                this.vy *= 0.95;
                this.vx += (3 - this.vx) * 0.05;
            }

            this.x += this.vx;
            this.y += this.vy;

            // Trail
            this.history.push({x: this.x, y: this.y});
            if(this.history.length > 10) this.history.shift();

            // Reset
            if (this.x > w) {
                this.x = -50;
                this.y = Math.random() * h;
                this.history = [];
            }
        }

        draw() {
            if (this.history.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for(let i=1; i<this.history.length; i++) {
                ctx.lineTo(this.history[i].x, this.history[i].y);
            }
            // Color based on speed (High speed = Red/Orange, Low = Blue/White)
            const speed = Math.sqrt(this.vx*this.vx + this.vy*this.vy);
            const r = Math.min(255, (speed - 2) * 100);
            const b = Math.max(100, 255 - (speed - 2) * 50);
            
            ctx.strokeStyle = `rgba(${r}, 200, ${b}, 0.2)`;
            ctx.stroke();
        }
    }

    const particles = Array.from({ length: 300 }, () => new Particle());

    const animate = () => {
      ctx.fillStyle = "#0f172a"; // Stratosphere Blue
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
          p.update();
          p.draw();
      });

      // Draw Airfoil Silhouette (Ghostly)
      ctx.beginPath();
      ctx.ellipse(w/2, h/2, 100, 25, 0.2, 0, Math.PI*2);
      ctx.fillStyle = "rgba(255,255,255,0.02)";
      ctx.fill();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}