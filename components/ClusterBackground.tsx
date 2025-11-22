"use client";
import { useEffect, useRef } from "react";

export default function ClusterBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const particleCount = 200;
    const centroidCount = 4;
    const particles: Particle[] = [];
    const centroids: Centroid[] = [];

    // Data Science Palette (Gold/Amber/Orange)
    const colors = ["#fbbf24", "#d97706", "#f59e0b", "#fffbeb"];

    class Centroid {
      x: number;
      y: number;
      vx: number;
      vy: number;
      
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        // Bounce
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }
    }

    class Particle {
      x: number;
      y: number;
      color: string;
      size: number;
      vx: number;
      vy: number;
      targetCentroid: number | null;
      
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.targetCentroid = Math.floor(Math.random() * centroidCount);
      }
      
      update(clustering: boolean) {
        if (clustering && this.targetCentroid !== null) {
           const target = centroids[this.targetCentroid];
           // Move towards centroid
           this.x += (target.x - this.x) * 0.02;
           this.y += (target.y - this.y) * 0.02;
        } else {
           // Drift randomly
           this.x += this.vx;
           this.y += this.vy;
        }
        
        // Wrap
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;
      }
      
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Init
    for(let i=0; i<centroidCount; i++) centroids.push(new Centroid());
    for(let i=0; i<particleCount; i++) particles.push(new Particle());
    
    let isClustering = false;
    
    // Toggle clustering behavior every few seconds
    setInterval(() => {
        isClustering = !isClustering;
    }, 4000);

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // Fade trails slightly for motion blur feel
      // ctx.fillStyle = "rgba(0,0,0,0.1)";
      // ctx.fillRect(0,0,w,h);

      centroids.forEach(c => c.update());
      
      particles.forEach(p => {
        p.update(isClustering);
        p.draw();
      });
      
      // Draw faint connections when clustering
      if (isClustering) {
          ctx.globalAlpha = 0.05;
          ctx.strokeStyle = "#fbbf24";
          ctx.beginPath();
          particles.forEach(p => {
              if (p.targetCentroid !== null) {
                  const c = centroids[p.targetCentroid];
                  ctx.moveTo(p.x, p.y);
                  ctx.lineTo(c.x, c.y);
              }
          });
          ctx.stroke();
          ctx.globalAlpha = 1;
      }

      requestAnimationFrame(animate);
    };

    const animId = requestAnimationFrame(animate);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
        cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-60 mix-blend-screen" />
        <div className="hd-vignette" />
    </>
  );
}