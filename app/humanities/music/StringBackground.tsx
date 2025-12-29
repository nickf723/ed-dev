"use client";
import { useEffect, useRef } from "react";

export default function StringBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -100, y: -100, vy: 0 };
    let lastMouseY = -100;

    // String Class
    class GuitarString {
        y: number;
        points: {x: number, y: number, vy: number}[];
        color: string;
        thickness: number;

        constructor(y: number, color: string, thickness: number) {
            this.y = y;
            this.color = color;
            this.thickness = thickness;
            this.points = [];
            // Create points along the string
            const segments = 50;
            for(let i=0; i<=segments; i++) {
                this.points.push({ x: (w/segments)*i, y: y, vy: 0 });
            }
        }

        update() {
            // Physics
            const tension = 0.05;
            const dampening = 0.95;

            for(let i=1; i<this.points.length-1; i++) {
                const p = this.points[i];
                const pPrev = this.points[i-1];
                const pNext = this.points[i+1];

                // Spring force towards neighbors
                const forceY = (pPrev.y + pNext.y)/2 - p.y;
                p.vy += forceY * tension;
                p.vy *= dampening;
                p.y += p.vy;

                // Mouse Interaction (Pluck)
                const dx = Math.abs(p.x - mouse.x);
                const dy = Math.abs(p.y - mouse.y);
                
                if (dx < 50 && dy < 20 && Math.abs(mouse.vy) > 2) {
                    p.vy += mouse.vy * 0.5;
                }
            }
        }

        draw() {
            if (!ctx) return;
            ctx.beginPath();
            ctx.moveTo(this.points[0].x, this.points[0].y);
            // Spline curve for smoothness
            for(let i=1; i<this.points.length-2; i++) {
                const xc = (this.points[i].x + this.points[i+1].x) / 2;
                const yc = (this.points[i].y + this.points[i+1].y) / 2;
                ctx.quadraticCurveTo(this.points[i].x, this.points[i].y, xc, yc);
            }
            ctx.quadraticCurveTo(
                this.points[this.points.length-2].x, 
                this.points[this.points.length-2].y, 
                this.points[this.points.length-1].x, 
                this.points[this.points.length-1].y
            );
            
            ctx.strokeStyle = this.color;
            ctx.lineWidth = this.thickness;
            ctx.shadowColor = this.color;
            ctx.shadowBlur = Math.abs(this.points[25].y - this.y) * 2; // Glow more when vibrating
            ctx.stroke();
            ctx.shadowBlur = 0;
        }
    }

    // Create Strings
    const strings: GuitarString[] = [];
    const colors = ["#f59e0b", "#d97706", "#b45309", "#78350f", "#92400e", "#b45309"];
    
    const initStrings = () => {
        strings.length = 0;
        const spacing = h / 8;
        for(let i=1; i<=6; i++) {
            strings.push(new GuitarString(i * spacing, colors[i-1], 1 + i*0.5));
        }
    };
    initStrings();

    const animate = () => {
      ctx.fillStyle = "#020617"; // Slate-950
      ctx.fillRect(0, 0, w, h);

      strings.forEach(s => {
          s.update();
          s.draw();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    
    const handleMouseMove = (e: MouseEvent) => { 
        mouse.vy = e.clientY - lastMouseY;
        mouse.x = e.clientX; 
        mouse.y = e.clientY;
        lastMouseY = e.clientY;
    };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; initStrings(); };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-auto cursor-row-resize" />;
}