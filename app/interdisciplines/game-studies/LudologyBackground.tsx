"use client";
import { useEffect, useRef } from "react";

export default function LudologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const objects: GameObj[] = [];
    const count = 15;
    
    // Gaming Palette
    const colors = ["#9333ea", "#facc15", "#ec4899", "#22d3ee"];

    class GameObj {
      x: number;
      y: number;
      type: "d20" | "card" | "hex";
      size: number;
      angle: number;
      vAngle: number;
      vx: number;
      vy: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.type = Math.random() > 0.6 ? "d20" : Math.random() > 0.5 ? "card" : "hex";
        this.size = Math.random() * 30 + 20;
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.02;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vAngle;

        if (this.x < -50) this.x = w + 50;
        if (this.x > w + 50) this.x = -50;
        if (this.y < -50) this.y = h + 50;
        if (this.y > h + 50) this.y = -50;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3;

        if (this.type === "d20") {
            // Simple Hexagon with internal lines to fake a D20
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 3) * i;
                ctx.lineTo(Math.cos(a) * this.size, Math.sin(a) * this.size);
            }
            ctx.closePath();
            // Inner triangle
            ctx.moveTo(Math.cos(0) * this.size, Math.sin(0) * this.size);
            ctx.lineTo(Math.cos(2*Math.PI/3) * this.size, Math.sin(2*Math.PI/3) * this.size);
            ctx.lineTo(Math.cos(4*Math.PI/3) * this.size, Math.sin(4*Math.PI/3) * this.size);
            ctx.closePath();
            ctx.stroke();
        } else if (this.type === "card") {
            // Rectangle
            ctx.strokeRect(-this.size/1.5, -this.size, this.size*1.33, this.size*2);
            // Corner pip
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size/2, -this.size*0.8, 5, 5);
            ctx.fillRect(this.size/2 - 5, this.size*0.8 - 5, 5, 5);
        } else {
            // Hex grid tile
            ctx.beginPath();
            for (let i = 0; i < 6; i++) {
                const a = (Math.PI / 3) * i;
                ctx.lineTo(Math.cos(a) * this.size, Math.sin(a) * this.size);
            }
            ctx.closePath();
            ctx.stroke();
        }

        ctx.restore();
      }
    }

    for(let i=0; i<count; i++) objects.push(new GameObj());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Background
      ctx.fillStyle = "#0f0518"; // Deep Purple
      ctx.fillRect(0, 0, w, h);

      objects.forEach(o => {
        o.update();
        o.draw();
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
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60" />
        <div className="hd-vignette" />
    </>
  );
}