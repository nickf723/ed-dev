"use client";
import { useEffect, useRef } from "react";

export default function CircuitBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const gridSize = 40;
    const pulses: Pulse[] = [];
    
    // Cyber Palette
    const colors = ["#0ea5e9", "#6366f1", "#10b981"]; // Sky, Indigo, Emerald

    class Pulse {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      history: {x: number, y: number}[];

      constructor() {
        // Snap to grid
        this.x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
        this.y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
        
        // Random cardinal direction
        const dir = Math.floor(Math.random() * 4);
        this.vx = dir === 0 ? 1 : dir === 1 ? -1 : 0;
        this.vy = dir === 2 ? 1 : dir === 3 ? -1 : 0;
        
        this.life = Math.random() * 100 + 50;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.history = [];
      }

      update() {
        this.life--;
        
        // Store history for trail
        this.history.push({ x: this.x, y: this.y });
        if (this.history.length > 10) this.history.shift();

        // Move
        this.x += this.vx * 2; // Speed
        this.y += this.vy * 2;

        // Random turn (rarely)
        if (this.x % gridSize === 0 && this.y % gridSize === 0 && Math.random() > 0.8) {
            const axis = this.vx !== 0 ? "y" : "x"; // Switch axis
            const dir = Math.random() > 0.5 ? 1 : -1;
            if (axis === "x") { this.vx = dir; this.vy = 0; }
            else { this.vx = 0; this.vy = dir; }
        }

        // Respawn if dead or out of bounds
        if (this.life <= 0 || this.x < 0 || this.x > w || this.y < 0 || this.y > h) {
            this.x = Math.floor(Math.random() * (w / gridSize)) * gridSize;
            this.y = Math.floor(Math.random() * (h / gridSize)) * gridSize;
            this.history = [];
            this.life = Math.random() * 100 + 50;
        }
      }

      draw() {
        if (!ctx) return;
        
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;

        if (this.history.length > 1) {
            ctx.moveTo(this.history[0].x, this.history[0].y);
            for (const p of this.history) ctx.lineTo(p.x, p.y);
        }
        
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset
        
        // Head
        ctx.fillStyle = "#fff";
        ctx.fillRect(this.x - 1, this.y - 1, 3, 3);
      }
    }

    // Init pulses
    for (let i = 0; i < 20; i++) {
        pulses.push(new Pulse());
    }

    const drawGrid = () => {
        ctx.beginPath();
        ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
        ctx.lineWidth = 1;
        
        for(let x = 0; x <= w; x += gridSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, h);
        }
        for(let y = 0; y <= h; y += gridSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(w, y);
        }
        ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      drawGrid();
      
      pulses.forEach(p => {
        p.update();
        p.draw();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
}