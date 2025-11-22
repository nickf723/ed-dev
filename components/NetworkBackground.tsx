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
    
    // We track mouse for the "Searchlight" effect
    const mouse = { x: w/2, y: h/2 };
    
    // Neon Cyber Palette
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
        // Distance to mouse (Searchlight Logic)
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const lightRadius = 400;

        // Brightness falls off with distance from mouse
        let alpha = 0.1; // Base dimness
        if (dist < lightRadius) {
            alpha += (1 - dist / lightRadius) * 0.9;
        }

        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
        
        // Draw connections only if bright enough
        if (alpha > 0.2) return alpha; // Return alpha for line drawing
        return 0;
      }
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.forEach((p, i) => {
        p.update();
        const pAlpha = p.draw() || 0;

        // Connect
        if (pAlpha > 0.2) {
            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDist) {
                    ctx.beginPath();
                    const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
                    // Fade lines out at edges of spotlight
                    const lineAlpha = Math.min(pAlpha, 1 - dist/connectionDist);
                    
                    gradient.addColorStop(0, p.color.replace(')', `, ${lineAlpha})`).replace('rgb', 'rgba').replace('#', '')); // Simple hack or just use globalAlpha
                    
                    ctx.globalAlpha = lineAlpha;
                    ctx.strokeStyle = "white"; // Use white to let colors pop via blend mode
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                    ctx.globalAlpha = 1;
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
        {/* HD-2D Layers */}
        <div className="hd-vignette" />
        <div className="hd-noise" />
    </>
  );
}