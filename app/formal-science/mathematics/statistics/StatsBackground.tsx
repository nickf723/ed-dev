"use client";
import { useEffect, useRef } from "react";

export default function StatsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Physics Constants
    const gravity = 0.5;
    const friction = 0.99;
    
    // Bin Configuration
    const binCount = 20;
    const binWidth = w / binCount;
    const bins = new Array(binCount).fill(0);

    class Particle {
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        settled: boolean;
        color: string;

        constructor() {
            this.x = w / 2 + (Math.random() - 0.5) * 10; // Start center top
            this.y = -20;
            this.vx = (Math.random() - 0.5) * 2;
            this.vy = 0;
            this.radius = 3 + Math.random() * 2;
            this.settled = false;
            this.color = Math.random() > 0.5 ? "#8b5cf6" : "#a78bfa"; // Violet-500/400
        }

        update() {
            if (this.settled) return;

            // Apply Forces
            this.vy += gravity;
            this.vx *= friction;

            // Random "Peg" Bounces (Brownian motion simulation)
            if (this.y < h - 100) {
                 if (Math.random() > 0.9) this.vx += (Math.random() - 0.5) * 2;
            }

            // Move
            this.x += this.vx;
            this.y += this.vy;

            // Floor Collision / Binning
            if (this.y > h - 10) {
                this.y = h - 10;
                this.settled = true;
                
                // Add to bin height logic (visual only for background)
                const binIndex = Math.floor(this.x / binWidth);
                if (binIndex >= 0 && binIndex < binCount) {
                    bins[binIndex]++;
                    this.y = h - 10 - (bins[binIndex] * 6); // Stack em up
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.settled ? 0.6 : 1;
            ctx.fill();
        }
    }

    const particles: Particle[] = [];

    const animate = () => {
      // Clear with Fade for trail effect on falling particles
      ctx.fillStyle = "rgba(15, 5, 24, 0.2)"; // Deep Violet-Black
      ctx.fillRect(0, 0, w, h);

      // Spawn
      if (particles.length < 800) {
          particles.push(new Particle());
      } else {
          // Recycle settled particles occasionally to keep animation alive
          const i = Math.floor(Math.random() * particles.length);
          if (particles[i].settled && Math.random() > 0.95) {
               // Decrement bin height
               const binIndex = Math.floor(particles[i].x / binWidth);
               if(binIndex >= 0 && binIndex < binCount && bins[binIndex] > 0) bins[binIndex]--;
               
               // Reset
               particles[i] = new Particle();
          }
      }

      particles.forEach(p => {
          p.update();
          p.draw();
      });

      // Draw Bell Curve Overlay (Theoretical)
      ctx.strokeStyle = "rgba(255,255,255,0.1)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      // Simple gaussian approx shape
      for (let x = 0; x <= w; x+=10) {
          const u = (x - w/2) / (w/6);
          const y = h - 10 - Math.exp(-u*u/2) * (h/2);
          x===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
      }
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { 
        w = canvas.width = window.innerWidth; 
        h = canvas.height = window.innerHeight; 
        // Reset bins on resize to avoid stacking errors
        bins.fill(0);
        particles.length = 0;
    };
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}