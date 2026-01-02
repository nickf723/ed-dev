"use client";
import { useEffect, useRef } from "react";

export default function BlueprintBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // Drawing Agents (The "Draftsmen")
    class Drafter {
        x: number;
        y: number;
        targetX: number;
        targetY: number;
        state: 'moving' | 'drawing' | 'measuring';
        progress: number;
        life: number;

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.targetX = this.x;
            this.targetY = this.y;
            this.state = 'moving';
            this.progress = 0;
            this.life = 0;
            this.pickNewTarget();
        }

        pickNewTarget() {
            // Snap to grid (50px)
            this.targetX = Math.round((Math.random() * w) / 50) * 50;
            this.targetY = Math.round((Math.random() * h) / 50) * 50;
            this.state = Math.random() > 0.5 ? 'drawing' : 'measuring';
            this.progress = 0;
            this.life = 100; // Frames to persist
        }

        update() {
            if (this.progress < 1) this.progress += 0.05;
            else {
                this.life--;
                if (this.life <= 0) {
                    this.x = this.targetX;
                    this.y = this.targetY;
                    this.pickNewTarget();
                }
            }
        }

        draw() {
            ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
            ctx.lineWidth = 1;
            
            const curX = this.x + (this.targetX - this.x) * this.progress;
            const curY = this.y + (this.targetY - this.y) * this.progress;

            if (this.state === 'drawing') {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                ctx.lineTo(curX, curY);
                ctx.stroke();
                
                // Endpoints
                ctx.fillStyle = "#3b82f6";
                ctx.fillRect(curX - 2, curY - 2, 4, 4);
            } else if (this.state === 'measuring') {
                // Draw Arc
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.abs(this.targetX - this.x), 0, Math.PI * 2 * this.progress);
                ctx.stroke();
            }

            // Crosshair at active point
            if (this.life > 90) {
                ctx.strokeStyle = "rgba(249, 115, 22, 0.4)"; // Orange
                ctx.beginPath();
                ctx.moveTo(curX - 5, curY); ctx.lineTo(curX + 5, curY);
                ctx.moveTo(curX, curY - 5); ctx.lineTo(curX, curY + 5);
                ctx.stroke();
            }
        }
    }

    const drafters = Array.from({ length: 8 }, () => new Drafter());

    const animate = () => {
      // Deep Blueprint Blue
      ctx.fillStyle = "#172554"; 
      ctx.fillRect(0, 0, w, h);
      
      // Draw Grid
      ctx.strokeStyle = "rgba(255,255,255,0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for(let x=0; x<=w; x+=50) { ctx.moveTo(x,0); ctx.lineTo(x,h); }
      for(let y=0; y<=h; y+=50) { ctx.moveTo(0,y); ctx.lineTo(w,y); }
      ctx.stroke();

      // Update Drafters
      drafters.forEach(d => {
          d.update();
          d.draw();
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