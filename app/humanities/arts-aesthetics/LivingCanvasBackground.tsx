"use client";
import { useEffect, useRef } from "react";

export default function LivingCanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    
    const shapes: Shape[] = [];
    const shapeCount = 15;
    
    // Art Palette: Painterly tones
    const colors = ["#f43f5e", "#f59e0b", "#10b981", "#3b82f6", "#8b5cf6", "#ec4899"];

    class Shape {
      x: number;
      y: number;
      r: number;
      color: string;
      vx: number;
      vy: number;
      angle: number;
      vAngle: number;
      distortion: number[];

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.r = Math.random() * 150 + 100;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.002;
        
        // Create irregular blob shape
        this.distortion = [];
        const segments = 10;
        for(let i=0; i<segments; i++) {
            this.distortion.push(Math.random() * 0.4 + 0.8); // Scale factor 0.8 to 1.2
        }
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vAngle;

        if (this.x < -200) this.x = w + 200;
        if (this.x > w + 200) this.x = -200;
        if (this.y < -200) this.y = h + 200;
        if (this.y > h + 200) this.y = -200;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        
        ctx.beginPath();
        const segments = this.distortion.length;
        for (let i = 0; i <= segments; i++) {
            const r = this.r * this.distortion[i % segments];
            const a = (i / segments) * Math.PI * 2;
            const px = Math.cos(a) * r;
            const py = Math.sin(a) * r;
            
            if (i === 0) ctx.moveTo(px, py);
            else {
                // Simple curve smoothing could go here, but straight lines for poly-art look
                // Or quadratic curves for blobs. Let's try simple lines for "cut paper" look
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        
        // Watercolor effect
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.r);
        g.addColorStop(0, this.color);
        g.addColorStop(1, "transparent");
        
        ctx.fillStyle = g;
        // Multiply blends colors nicely on dark background
        ctx.globalCompositeOperation = "screen"; 
        ctx.globalAlpha = 0.4;
        ctx.fill();
        
        ctx.restore();
      }
    }

    for(let i=0; i<shapeCount; i++) shapes.push(new Shape());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      // Texture overlay
      // ctx.fillStyle = "#0f0f0f"; // Let global CSS handle bg
      // ctx.fillRect(0, 0, w, h);

      shapes.forEach(s => {
        s.update();
        s.draw();
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
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-50" />
        {/* Paper Texture Overlay */}
        <div className="hd-noise opacity-10 mix-blend-overlay" />
        <div className="hd-vignette" />
    </>
  );
}