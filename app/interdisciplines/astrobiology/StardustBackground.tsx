"use client";
import { useEffect, useRef } from "react";

export default function StardustBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const atomCount = 100;
    const atoms: Atom[] = [];
    
    // Bio-Cosmic Palette (Cyan, Lime, Violet)
    const colors = ["#22d3ee", "#84cc16", "#a78bfa"];

    class Atom {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      bonds: Atom[];

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.bonds = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bonding Logic
        // If close to another atom, gently attract
        atoms.forEach(other => {
            if (other === this) return;
            const dx = other.x - this.x;
            const dy = other.y - this.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist < 60) {
                // Spring force
                this.vx += dx * 0.0001;
                this.vy += dy * 0.0001;
                
                // Visual Bond
                if (dist < 40 && this.bonds.length < 2) {
                    // Temporary association
                }
            }
        });

        // Wrap
        if (this.x < -50) this.x = w + 50;
        if (this.x > w + 50) this.x = -50;
        if (this.y < -50) this.y = h + 50;
        if (this.y > h + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for(let i=0; i<atomCount; i++) atoms.push(new Atom());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Draw Bonds first
      ctx.lineWidth = 0.5;
      atoms.forEach((a, i) => {
          for(let j=i+1; j<atoms.length; j++) {
              const b = atoms[j];
              const dist = Math.hypot(a.x - b.x, a.y - b.y);
              if (dist < 50) {
                  ctx.beginPath();
                  ctx.strokeStyle = `rgba(255, 255, 255, ${1 - dist/50})`;
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  ctx.stroke();
              }
          }
      });

      atoms.forEach(a => {
        a.update();
        a.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();
    
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen" />
        <div className="hd-vignette" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-indigo-950/20 mix-blend-overlay" />
    </>
  );
}