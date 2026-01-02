"use client";
import { useEffect, useRef } from "react";

export default function LogicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Gate Types
    const gates = ['AND', 'OR', 'XOR', 'NOT'];
    
    class Signal {
        x: number; y: number; vx: number; vy: number; life: number; type: string;
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = Math.random() > 0.5 ? 2 : -2;
            this.vy = 0; // Horizontal movement mostly
            this.life = 100 + Math.random() * 100;
            this.type = gates[Math.floor(Math.random() * gates.length)];
        }

        update() {
            this.x += this.vx;
            
            // Randomly shift lanes
            if (Math.random() > 0.98) {
                this.y += (Math.random() - 0.5) * 40;
            }

            this.life--;
            if (this.life <= 0 || this.x < 0 || this.x > w) {
                 this.x = Math.random() > 0.5 ? 0 : w;
                 this.y = Math.random() * h;
                 this.vx = this.x === 0 ? 2 : -2;
                 this.life = 200;
            }
        }

        draw() {
            ctx.fillStyle = "#10b981"; // Signal Green
            ctx.shadowColor = "#10b981";
            ctx.shadowBlur = 15;
            
            // Draw Pulse
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI*2);
            ctx.fill();
            ctx.shadowBlur = 0;

            // Draw Gate Symbol occasionally
            if (this.life % 20 === 0) {
                ctx.font = "10px monospace";
                ctx.fillStyle = "rgba(16, 185, 129, 0.3)";
                ctx.fillText(this.type, this.x, this.y - 10);
            }
            
            // Draw Trace Line behind
            ctx.strokeStyle = "rgba(16, 185, 129, 0.1)";
            ctx.beginPath();
            ctx.moveTo(this.x - this.vx * 10, this.y);
            ctx.lineTo(this.x, this.y);
            ctx.stroke();
        }
    }

    const signals = Array.from({ length: 50 }, () => new Signal());

    const animate = () => {
      ctx.fillStyle = "#0c0a09"; // Warm Black
      ctx.fillRect(0, 0, w, h);

      // Draw Schematic Grid Points
      ctx.fillStyle = "#292524";
      for (let x = 0; x < w; x += 40) {
          for (let y = 0; y < h; y += 40) {
              ctx.fillRect(x, y, 1, 1);
          }
      }

      signals.forEach(s => {
          s.update();
          s.draw();
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