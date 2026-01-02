"use client";
import { useEffect, useRef } from "react";

export default function ChemBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    class Atom {
        x: number; y: number; vx: number; vy: number;
        type: 'A' | 'B' | 'Product';
        radius: number;
        bonded: Atom | null;

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 1;
            this.vy = (Math.random() - 0.5) * 1;
            this.type = Math.random() > 0.5 ? 'A' : 'B';
            this.radius = 4 + Math.random() * 3;
            this.bonded = null;
        }

        update(atoms: Atom[]) {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce walls
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;

            // Bond Logic
            if (!this.bonded && this.type !== 'Product') {
                for (let other of atoms) {
                    if (other !== this && !other.bonded && other.type !== 'Product' && other.type !== this.type) {
                        const dx = this.x - other.x;
                        const dy = this.y - other.y;
                        const dist = Math.sqrt(dx*dx + dy*dy);
                        
                        if (dist < 20) {
                            // REACT!
                            this.type = 'Product';
                            other.type = 'Product';
                            this.bonded = other;
                            other.bonded = this;
                            
                            // Merge velocity roughly
                            const avgVx = (this.vx + other.vx) / 2;
                            const avgVy = (this.vy + other.vy) / 2;
                            this.vx = avgVx; this.vy = avgVy;
                            other.vx = avgVx; other.vy = avgVy;
                        }
                    }
                }
            }

            // Keep bonded atoms together (Spring-like)
            if (this.bonded) {
                const targetDist = 12;
                const dx = this.x - this.bonded.x;
                const dy = this.y - this.bonded.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                const force = (dist - targetDist) * 0.05;
                const fx = (dx / dist) * force;
                const fy = (dy / dist) * force;
                
                this.x -= fx;
                this.y -= fy;
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            
            if (this.type === 'A') ctx.fillStyle = "rgba(59, 130, 246, 0.4)"; // Blue
            else if (this.type === 'B') ctx.fillStyle = "rgba(234, 179, 8, 0.4)"; // Yellow
            else ctx.fillStyle = "rgba(132, 204, 22, 0.8)"; // Lime (Product)
            
            ctx.fill();

            // Draw Bond Line
            if (this.bonded) {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(this.bonded.x, this.bonded.y);
                ctx.strokeStyle = "rgba(132, 204, 22, 0.4)";
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        }
    }

    const atoms = Array.from({ length: 100 }, () => new Atom());

    const animate = () => {
      ctx.fillStyle = "#022c22"; // Deep Emerald
      ctx.fillRect(0, 0, w, h);

      atoms.forEach(a => {
          a.update(atoms);
          a.draw();
      });

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