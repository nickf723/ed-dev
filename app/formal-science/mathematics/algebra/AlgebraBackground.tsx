"use client";
import { useEffect, useRef } from "react";

export default function AlgebraBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // A curve object
    class Curve {
        type: 'quad' | 'cubic' | 'sin';
        a: number;
        b: number;
        c: number;
        offset: number;
        color: string;
        progress: number;
        life: number;

        constructor() {
            this.type = Math.random() > 0.6 ? 'cubic' : Math.random() > 0.5 ? 'sin' : 'quad';
            this.a = (Math.random() - 0.5) * 0.02;
            this.b = (Math.random() - 0.5) * 2;
            this.c = (Math.random() - 0.5) * h/2;
            this.offset = Math.random() * 100;
            this.color = Math.random() > 0.5 ? "#f59e0b" : "#ffffff";
            this.progress = 0;
            this.life = 1;
        }

        draw(t: number) {
            ctx.beginPath();
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = this.life * 0.3; // Faint

            const startX = 0;
            const endX = w * this.progress;
            
            // Draw segment
            for (let x = startX; x < endX; x += 10) {
                // Cartesian shift: Center is (w/2, h/2)
                const graphX = x - w/2; 
                let graphY = 0;

                if (this.type === 'quad') graphY = this.a * graphX * graphX + this.c;
                if (this.type === 'cubic') graphY = this.a * 0.01 * graphX * graphX * graphX + this.c;
                if (this.type === 'sin') graphY = Math.sin(graphX * 0.02 + this.offset) * 100;

                const screenY = h/2 - graphY;
                
                if (x === 0) ctx.moveTo(x, screenY);
                else ctx.lineTo(x, screenY);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;

            // Animate
            if (this.progress < 1) this.progress += 0.01;
            else this.life -= 0.01;
        }
    }

    let curves: Curve[] = [];

    const animate = () => {
      ctx.fillStyle = "#18181b"; // Zinc-950
      ctx.fillRect(0, 0, w, h);
      time++;

      // Draw Axes
      ctx.strokeStyle = "rgba(255,255,255,0.05)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w/2, 0); ctx.lineTo(w/2, h); // Y-axis
      ctx.moveTo(0, h/2); ctx.lineTo(w, h/2); // X-axis
      ctx.stroke();

      // Spawn Curves
      if (time % 60 === 0) curves.push(new Curve());

      // Update Curves
      curves.forEach((c, i) => {
          c.draw(time);
          if (c.life <= 0) curves.splice(i, 1);
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