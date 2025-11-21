"use client";
import { useEffect, useRef } from "react";

export default function GlyphBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    // The building blocks of human thought
    const glyphs = "αβγδεζηθικλμνξοπρστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZ&¶§©®?¿!¡æœ∑∫∂√∞≈≠≡≤≥1234567890あいうえお";
    
    const particles: SymbolParticle[] = [];
    const count = 60; 

    // Warm / Gold / Paper Palette
    const colors = ["#fbbf24", "#d97706", "#b45309", "#78350f", "#ffffff"];

    class SymbolParticle {
      x: number;
      y: number;
      char: string;
      size: number;
      color: string;
      vy: number;
      opacity: number;
      angle: number;
      spinSpeed: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.char = glyphs[Math.floor(Math.random() * glyphs.length)];
        this.size = Math.random() * 14 + 8; // Varying font size
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vy = (Math.random() * 0.5 + 0.2) * -1; // Float up
        this.opacity = Math.random() * 0.5 + 0.1;
        this.angle = Math.random() * 360;
        this.spinSpeed = (Math.random() - 0.5) * 0.02;
      }

      update() {
        this.y += this.vy;
        this.angle += this.spinSpeed;

        // Reset if off top
        if (this.y < -50) {
            this.y = h + 50;
            this.x = Math.random() * w;
            this.char = glyphs[Math.floor(Math.random() * glyphs.length)];
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.font = `${this.size}px "Times New Roman", serif`; // Serif for humanities vibe
        ctx.fillText(this.char, -this.size/2, this.size/2);
        ctx.restore();
      }
    }

    // Init
    for (let i = 0; i < count; i++) {
        particles.push(new SymbolParticle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      particles.forEach(p => {
        p.update();
        p.draw();
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
      className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-screen"
    />
  );
}