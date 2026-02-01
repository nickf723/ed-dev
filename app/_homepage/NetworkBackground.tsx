"use client";
import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const particleCount = 600; 
    const connectionDist = 180;
    const mouse = { x: w/2, y: h/2 };
    
    const colors = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"];

    // --- OBJECTS ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      neighbors: Particle[]; // Store connected neighbors

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.neighbors = [];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
        this.neighbors = []; // Reset neighbors per frame
      }

      draw(alpha: number) {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    class Packet {
      start: Particle;
      end: Particle;
      progress: number;
      speed: number;
      active: boolean;

      constructor(start: Particle, end: Particle) {
        this.start = start;
        this.end = end;
        this.progress = 0;
        this.speed = Math.random() * 0.02 + 0.01;
        this.active = true;
      }

      update() {
        this.progress += this.speed;
        if (this.progress >= 1) this.active = false;
      }

      draw() {
        if (!ctx) return;
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;
        
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI*2);
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#fff";
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());
    
    let packets: Packet[] = [];

    // --- ANIMATION ---
    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // 1. Update Particles
      particles.forEach(p => {
        p.update();
        // Calc Alpha based on mouse distance
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const lightRadius = 400;
        const alpha = dist < lightRadius ? 0.1 + (1 - dist / lightRadius) * 0.9 : 0.1;
        
        p.draw(alpha);
        
        // Identify Neighbors
        if (alpha > 0.2) {
             for (const other of particles) {
                 if (p === other) continue;
                 const d = Math.hypot(p.x - other.x, p.y - other.y);
                 if (d < connectionDist) {
                     p.neighbors.push(other);
                     
                     // Draw Line
                     ctx.beginPath();
                     ctx.strokeStyle = "rgba(255,255,255,0.1)";
                     ctx.lineWidth = 0.2;
                     ctx.globalAlpha = Math.min(alpha, 1 - d/connectionDist);
                     ctx.moveTo(p.x, p.y);
                     ctx.lineTo(other.x, other.y);
                     ctx.stroke();
                     ctx.globalAlpha = 1;
                 }
             }
        }
      });

      // 2. Spawn Packets randomly
      if (packets.length < 10 && Math.random() > 0.95) {
          // Find a visible particle with neighbors
          const activeParticles = particles.filter(p => p.neighbors.length > 0);
          if (activeParticles.length > 0) {
              const start = activeParticles[Math.floor(Math.random() * activeParticles.length)];
              const end = start.neighbors[Math.floor(Math.random() * start.neighbors.length)];
              packets.push(new Packet(start, end));
          }
      }

      // 3. Update & Draw Packets
      for (let i = packets.length - 1; i >= 0; i--) {
          const p = packets[i];
          p.update();
          p.draw();
          if (!p.active) packets.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    const anim = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => { 
        window.removeEventListener("resize", handleResize); 
        window.removeEventListener("mousemove", handleMouseMove); 
        cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="hd-vignette" />
        <div className="hd-noise" />
    </>
  );
}