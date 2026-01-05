"use client";
import { useEffect, useRef } from "react";

export default function MtgBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const colors = [
        "#fde047", // White (Sun)
        "#3b82f6", // Blue (Water)
        "#a855f7", // Black (Swamp/Death - visualized as purple/black)
        "#ef4444", // Red (Fire)
        "#22c55e"  // Green (Forest)
    ];

    class ManaMote {
        x: number; y: number; vx: number; vy: number;
        size: number; color: string; life: number; maxLife: number;

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 3;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.life = 0;
            this.maxLife = 100 + Math.random() * 100;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life++;
            
            // Fade in and out
            if (this.life > this.maxLife) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.life = 0;
            }
        }
        draw(context: CanvasRenderingContext2D) { // PASS CONTEXT EXPLICITLY
             const opacity = Math.sin((this.life / this.maxLife) * Math.PI);
             context.fillStyle = this.color;
             context.globalAlpha = opacity * 0.5;
             context.shadowBlur = 10;
             context.shadowColor = this.color;
             context.beginPath();
             context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
             context.fill();
             context.shadowBlur = 0;
             context.globalAlpha = 1;
         }
    }

    const motes = Array.from({ length: 100 }, () => new ManaMote());

    const animate = () => {
      ctx.clearRect(0, 0, w, h); // Transparent clear
      
      // We don't fillRect here because we want this to layer over the page background color
      
      motes.forEach(m => {
          m.update();
          m.draw(ctx);
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none mix-blend-screen" />;
}