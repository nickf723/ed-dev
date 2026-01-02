"use client";
import { useEffect, useRef } from "react";

export default function HardwareBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    // Circuit Traces
    class Trace {
        x: number; y: number;
        history: {x: number, y: number}[];
        dir: 'x' | 'y';
        speed: number;
        life: number;
        color: string;

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.history = [];
            this.dir = Math.random() > 0.5 ? 'x' : 'y';
            this.speed = Math.random() > 0.5 ? 2 : -2;
            this.life = 100 + Math.random() * 200;
            // Gold or Dark Grey traces
            this.color = Math.random() > 0.9 ? "#facc15" : "#262626"; 
        }

        update() {
            if (this.dir === 'x') this.x += this.speed;
            else this.y += this.speed;

            this.history.push({x: this.x, y: this.y});
            if (this.history.length > 50) this.history.shift();

            // Random turn
            if (Math.random() > 0.98) {
                this.dir = this.dir === 'x' ? 'y' : 'x';
            }

            this.life--;
            if (this.life <= 0 || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
                 this.reset();
            }
        }
        
        reset() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.history = [];
            this.life = 100 + Math.random() * 200;
        }

        draw() {
            if (this.history.length < 2) return;
            
            ctx.beginPath();
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for(let i=1; i<this.history.length; i++) {
                ctx.lineTo(this.history[i].x, this.history[i].y);
            }
            
            ctx.lineWidth = this.color === "#facc15" ? 2 : 1;
            ctx.strokeStyle = this.color;
            ctx.globalAlpha = this.color === "#facc15" ? 0.5 : 0.2;
            
            // Draw schematic node at head
            if (this.color === "#facc15") {
                ctx.shadowColor = "#facc15";
                ctx.shadowBlur = 10;
            }
            ctx.stroke();
            ctx.shadowBlur = 0;
            ctx.globalAlpha = 1;

            // Draw solder pad at end
            ctx.fillStyle = this.color;
            ctx.beginPath(); ctx.arc(this.x, this.y, 2, 0, Math.PI*2); ctx.fill();
        }
    }

    const traces = Array.from({ length: 60 }, () => new Trace());

    const animate = () => {
      ctx.fillStyle = "#0a0a0a"; // Almost black
      ctx.fillRect(0, 0, w, h);

      // Draw subtle hex grid
      ctx.fillStyle = "#171717";
      for(let x=0; x<w; x+=50) {
          for(let y=0; y<h; y+=50) {
              if ((x+y)%100 === 0) ctx.fillRect(x,y,2,2);
          }
      }

      traces.forEach(t => {
          t.update();
          t.draw();
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