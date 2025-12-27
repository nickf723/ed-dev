"use client";
import { useEffect, useRef } from "react";

export default function BiologicalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const cells: Cell[] = [];
    const cellCount = 40;
    
    // Organic Palette (Blood, Tissue, Oxygen)
    const colors = ["#ef4444", "#f87171", "#fee2e2", "#99f6e4"]; 

    class Cell {
      x: number;
      y: number;
      rx: number;
      ry: number;
      angle: number;
      speed: number;
      spin: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.rx = Math.random() * 30 + 20; // X Radius
        this.ry = this.rx * 0.8;           // Y Radius (slightly flattened like RBC)
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.2;
        this.spin = (Math.random() - 0.5) * 0.01;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speed;
        this.y += Math.sin(this.x * 0.01) * 0.2; // Gentle wave motion
        this.angle += this.spin;

        if (this.x > w + 50) {
            this.x = -50;
            this.y = Math.random() * h;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        // Draw Ellipse (Cell shape)
        ctx.ellipse(0, 0, this.rx, this.ry, 0, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        // Inner shadow effect for depth
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
        
        // Nucleus / Dimple (for RBC look)
        ctx.beginPath();
        ctx.ellipse(0, 0, this.rx * 0.3, this.ry * 0.3, 0, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,0,0,0.1)";
        ctx.fill();

        ctx.restore();
      }
    }

    for(let i=0; i<cellCount; i++) cells.push(new Cell());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Background Tint
      // ctx.fillStyle = "#100505"; // Very dark red/black
      // ctx.fillRect(0, 0, w, h);

      cells.forEach(c => {
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
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen" />
        <div className="hd-vignette" />
        <div className="fixed inset-0 pointer-events-none z-0 bg-red-950/10 mix-blend-overlay" />
    </>
  );
}