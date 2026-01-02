"use client";
import { useEffect, useRef } from "react";

export default function LogicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const symbols = ["∀", "∃", "∄", "∴", "∵", "≡", "≠", "¬", "∧", "∨", "⊕", "⇒", "⇔", "⊤", "⊥"];
    
    class Glyphs {
        x: number; y: number; char: string; size: number; speed: number; opacity: number;
        constructor() {
            this.x = Math.random() * w;
            this.y = h + Math.random() * 100;
            this.char = symbols[Math.floor(Math.random() * symbols.length)];
            this.size = 10 + Math.random() * 20;
            this.speed = 0.5 + Math.random() * 1;
            this.opacity = Math.random() * 0.5;
        }
        update() {
            this.y -= this.speed;
            if (this.y < -50) {
                this.y = h + 50;
                this.x = Math.random() * w;
                this.char = symbols[Math.floor(Math.random() * symbols.length)];
            }
        }
        draw() {
            ctx.font = `${this.size}px serif`;
            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
            ctx.fillText(this.char, this.x, this.y);
        }
    }

    const glyphs = Array.from({ length: 100 }, () => new Glyphs());

    const animate = () => {
      ctx.fillStyle = "#09090b"; // Zinc-950
      ctx.fillRect(0, 0, w, h);

      glyphs.forEach(g => {
          g.update();
          g.draw();
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