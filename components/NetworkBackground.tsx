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
    
    const particleCount = 80;
    const connectionDist = 180;
    
    const mouse = { x: w/2, y: h/2 };
    
    // Neon Cyber Palette (Hex Codes)
    const colors = ["#22d3ee", "#a78bfa", "#f472b6", "#34d399", "#fbbf24"];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.vx = Math.random() * 0.4 - 0.2;
        this.vy = Math.random() * 0.4 - 0.2;
        this.size = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > w) this.vx *= -1;
        if (this.y < 0 || this.y > h) this.vy *= -1;
      }

      draw() {
        // Searchlight Logic
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const lightRadius = 400;

        // Calculate Alpha based on distance
        let alpha = 0.1;
        if (dist < lightRadius) {
            alpha += (1 - dist / lightRadius) * 0.9;
        }

        if (!ctx) return 0;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha; // Apply transparency
        ctx.fill();
        ctx.globalAlpha = 1; // Reset
        
        return alpha;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.update();
        const pAlpha = p.draw() || 0;

        // Draw Connections
        if (pAlpha > 0.2) {
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    // Calculate line transparency
                    const lineAlpha = Math.min(pAlpha, 1 - dist/connectionDist);
                    
                    // Set styles
                    ctx.globalAlpha = lineAlpha;
                    
                    // Create gradient between the two particle colors
                    const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                    gradient.addColorStop(0, p.color);
                    gradient.addColorStop(1, p2.color);
                    
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.5;
                    
                    // Draw
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    
                    ctx.globalAlpha = 1; // Reset immediately
                }
            }
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    return () => { window.removeEventListener("resize", handleResize); window.removeEventListener("mousemove", handleMouseMove); };
  }, []);

  return (
    <>
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        <div className="hd-vignette" />
        <div className="hd-noise" />
    </>
  );
}