"use client";
import { useEffect, useRef } from "react";

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let mouse = { x: -1000, y: -1000 };

    // Node Class
    class Node {
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        group: number; // 0, 1, 2 for colors

        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = 3 + Math.random() * 2;
            this.group = Math.floor(Math.random() * 3);
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Bounce
            if (this.x < 0 || this.x > w) this.vx *= -1;
            if (this.y < 0 || this.y > h) this.vy *= -1;
            
            // Mouse Repel
            const dx = this.x - mouse.x;
            const dy = this.y - mouse.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < 150) {
                const force = (150 - dist) / 150;
                this.x += (dx/dist) * force * 2;
                this.y += (dy/dist) * force * 2;
            }
        }

        draw() {
            const colors = ["#22d3ee", "#0ea5e9", "#6366f1"]; // Cyan, Sky, Indigo
            ctx!.beginPath();
            ctx!.arc(this.x, this.y, this.radius, 0, Math.PI*2);
            ctx!.fillStyle = colors[this.group];
            ctx!.fill();
        }
    }

    const nodes = Array.from({ length: 80 }, () => new Node());

    const animate = () => {
      ctx.fillStyle = "#0f172a"; // Slate-900
      ctx.fillRect(0, 0, w, h);

      // Draw Connections first
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
          const a = nodes[i];
          // Connect to nearby
          for (let j = i + 1; j < nodes.length; j++) {
              const b = nodes[j];
              const dx = a.x - b.x;
              const dy = a.y - b.y;
              const dist = Math.sqrt(dx*dx + dy*dy);

              if (dist < 120) {
                  ctx.beginPath();
                  ctx.moveTo(a.x, a.y);
                  ctx.lineTo(b.x, b.y);
                  ctx.strokeStyle = `rgba(34, 211, 238, ${1 - dist/120})`; // Cyan fade
                  ctx.stroke();
              }
          }
      }

      // Draw Nodes on top
      nodes.forEach(n => {
          n.update();
          n.draw();
      });

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}