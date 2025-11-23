"use client";
import { useEffect, useRef } from "react";

export default function InkblotBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;
    
    // Ink blobs
    const blobs: Blob[] = [];
    const blobCount = 12;
    
    // Psychology Palette (Violet / Pink / Deep Purple)
    const colors = ["#5b21b6", "#8b5cf6", "#db2777", "#4c1d95"];

    class Blob {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      color: string;
      phase: number;

      constructor() {
        this.x = Math.random() * (w / 2); // Only spawn on left
        this.y = Math.random() * h;
        this.r = Math.random() * 100 + 50;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.phase = Math.random() * Math.PI * 2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.r += Math.sin(time + this.phase) * 0.5; // Pulse

        // Keep within left bounds mostly
        if (this.x < -100) this.x = w/2;
        if (this.x > w/2 + 50) this.x = -50;
        if (this.y < -100) this.y = h + 100;
        if (this.y > h + 100) this.y = -100;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for(let i=0; i<blobCount; i++) blobs.push(new Blob());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Create the "ink" look
      // 1. Draw blobs on left
      // 2. Mirror to right
      // 3. Apply threshold/blur (simulated via composite)
      
      // We'll just draw mirrored pairs
      ctx.globalCompositeOperation = "screen"; // Blends colors
      ctx.filter = "blur(40px)"; // Heavy blur for merging

      blobs.forEach(b => {
          b.update();
          
          // Left
          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI*2);
          ctx.fillStyle = b.color;
          ctx.fill();
          
          // Right (Mirror)
          ctx.beginPath();
          ctx.arc(w - b.x, b.y, b.r, 0, Math.PI*2);
          ctx.fillStyle = b.color;
          ctx.fill();
      });
      
      ctx.filter = "none";
      ctx.globalCompositeOperation = "source-over";

      time += 0.02;
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
        {/* Texture to make it look like paper */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03] bg-white mix-blend-overlay" 
             style={{ filter: "url(#noise)" }} 
        />
    </>
  );
}