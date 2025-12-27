"use client";
import { useEffect, useRef } from "react";

export default function OrbitalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    const electronCount = 50;
    const electrons: Electron[] = [];
    
    const colors = ["#84cc16", "#f97316", "#22d3ee"];

    class Electron {
      orbitR: number;
      speed: number;
      angle: number;
      color: string;
      tilt: number;
      size: number;

      constructor() {
        this.orbitR = Math.random() * 300 + 50;
        this.speed = (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1);
        this.angle = Math.random() * Math.PI * 2;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.tilt = Math.random() * Math.PI;
        this.size = Math.random() * 2 + 1;
      }

      update() {
        this.angle += this.speed;
      }

      draw(cx: number, cy: number) {
        if (!ctx) return;
        
        const x = cx + Math.cos(this.angle) * this.orbitR;
        const y = cy + Math.sin(this.angle) * (this.orbitR * Math.cos(this.tilt));
        
        const z = Math.sin(this.angle) * Math.sin(this.tilt);
        
        ctx.beginPath();
        ctx.arc(x, y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = 0.5 + z * 0.4; 
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      
      drawOrbit(cx: number, cy: number) {
          if (!ctx) return;
          ctx.beginPath();
          // FIX: Use Math.abs() to ensure radius is never negative
          const radiusY = Math.abs(this.orbitR * Math.cos(this.tilt));
          ctx.ellipse(cx, cy, this.orbitR, radiusY, 0, 0, Math.PI*2);
          ctx.strokeStyle = this.color;
          ctx.globalAlpha = 0.05;
          ctx.stroke();
          ctx.globalAlpha = 1;
      }
    }

    for(let i=0; i<electronCount; i++) electrons.push(new Electron());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#0a0f05"; 
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;

      // Nucleus
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI*2);
      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#fff";
      ctx.fill();
      ctx.shadowBlur = 0;

      electrons.forEach(e => {
          e.update();
          e.drawOrbit(cx, cy);
          e.draw(cx, cy);
      });

      time += 0.01;
      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);
    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { window.removeEventListener("resize", handleResize); cancelAnimationFrame(animId); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />
        <div className="hd-vignette" />
    </>
  );
}