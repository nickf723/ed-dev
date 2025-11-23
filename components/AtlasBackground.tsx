"use client";
import { useEffect, useRef } from "react";

export default function AtlasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const charts: Chart[] = [];
    const count = 12;
    
    // Topology Palette (Violet, Indigo, Rose)
    const colors = ["rgba(139, 92, 246, 0.1)", "rgba(79, 70, 229, 0.1)", "rgba(244, 63, 94, 0.05)"];

    class Chart {
      x: number;
      y: number;
      r: number;
      angle: number;
      vAngle: number;
      vx: number;
      vy: number;
      color: string;
      gridOffset: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 100 + 80;
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.002;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.gridOffset = Math.random() * 20;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vAngle;

        // Gentle bounce
        if (this.x < -150) this.x = w + 150;
        if (this.x > w + 150) this.x = -150;
        if (this.y < -150) this.y = h + 150;
        if (this.y > h + 150) this.y = -150;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        // Draw Circle Background
        ctx.beginPath();
        ctx.arc(0, 0, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Clip to circle for grid
        ctx.clip();

        // Draw Local Coordinate Grid
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
        const step = 20;
        
        // Curvilinear distortion
        for(let gx = -this.r; gx < this.r; gx += step) {
            ctx.beginPath();
            for(let gy = -this.r; gy < this.r; gy += 5) {
                // Slight warping
                const dx = Math.sin(gy * 0.05) * 5;
                if(gy === -this.r) ctx.moveTo(gx + dx, gy);
                else ctx.lineTo(gx + dx, gy);
            }
            ctx.stroke();
        }
        
        for(let gy = -this.r; gy < this.r; gy += step) {
            ctx.beginPath();
            for(let gx = -this.r; gx < this.r; gx += 5) {
                const dy = Math.cos(gx * 0.05) * 5;
                if(gx === -this.r) ctx.moveTo(gx, gy + dy);
                else ctx.lineTo(gx, gy + dy);
            }
            ctx.stroke();
        }

        ctx.restore();
      }
    }

    for(let i=0; i<count; i++) charts.push(new Chart());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      // Deep background
      ctx.fillStyle = "#05050a";
      ctx.fillRect(0, 0, w, h);

      charts.forEach(c => {
        c.update();
        c.draw();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="hd-vignette" />
        <div className="hd-scanlines opacity-5" />
    </>
  );
}