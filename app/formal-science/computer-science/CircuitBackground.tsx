"use client";
import { useEffect, useRef } from "react";

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Grid configuration
    const gridSize = 40;
    
    // "Packets" of data moving through the system
    class Packet {
        x: number; y: number; vx: number; vy: number; life: number; color: string;
        constructor() {
            // Snap to grid
            this.x = Math.floor(Math.random() * (w/gridSize)) * gridSize;
            this.y = Math.floor(Math.random() * (h/gridSize)) * gridSize;
            // Manhattan movement (only X or Y)
            if (Math.random() > 0.5) {
                this.vx = Math.random() > 0.5 ? 2 : -2; this.vy = 0;
            } else {
                this.vx = 0; this.vy = Math.random() > 0.5 ? 2 : -2;
            }
            this.life = 100 + Math.random() * 100;
            this.color = Math.random() > 0.5 ? "#22c55e" : "#3b82f6"; // Green or Blue
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life--;

            // Change direction randomly at grid intersections
            if (this.x % gridSize === 0 && this.y % gridSize === 0 && Math.random() > 0.8) {
                if (this.vx !== 0) {
                    this.vx = 0;
                    this.vy = Math.random() > 0.5 ? 2 : -2;
                } else {
                    this.vy = 0;
                    this.vx = Math.random() > 0.5 ? 2 : -2;
                }
            }

            // Reset
            if (this.life <= 0 || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
                 this.x = Math.floor(Math.random() * (w/gridSize)) * gridSize;
                 this.y = Math.floor(Math.random() * (h/gridSize)) * gridSize;
                 this.life = 200;
            }
        }

        draw() {
            // Draw Head
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
            ctx.shadowBlur = 0;

            // Draw Tail (simple fade)
            ctx.fillStyle = `rgba(255,255,255,0.1)`;
            // ctx.fillRect(this.x - this.vx * 4, this.y - this.vy * 4, 2, 2); 
        }
    }

    const packets = Array.from({ length: 40 }, () => new Packet());

    const animate = () => {
      // Fade effect for trails
      ctx.fillStyle = "rgba(15, 23, 42, 0.2)"; // Slate-900
      ctx.fillRect(0, 0, w, h);

      // Draw Grid (Static)
      ctx.fillStyle = "rgba(255,255,255,0.03)";
      for (let x = 0; x < w; x += gridSize) {
          for (let y = 0; y < h; y += gridSize) {
              ctx.fillRect(x-1, y-1, 2, 2);
          }
      }

      packets.forEach(p => {
          p.update();
          p.draw();
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