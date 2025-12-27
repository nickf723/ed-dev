"use client";
import { useEffect, useRef } from "react";

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let time = 0;

    // --- CONFIGURATION ---
    const SYMBOLS = ["Σ", "π", "∫", "∞", "√", "ƒ", "∂", "∆", "∀", "∃", "≠", "≈"];
    const COLORS = ["#22d3ee", "#818cf8", "#c084fc", "#e879f9"]; // Cyan, Indigo, Purple, Fuchsia
    
    // --- PARTICLES (The Symbols) ---
    const particles: Particle[] = [];
    const particleCount = 40; // Dense enough to look cool, sparse enough to read

    class Particle {
      x: number;
      y: number;
      char: string;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.char = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        this.size = Math.random() * 20 + 10; // 10px to 30px
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.opacity = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x < -50) this.x = w + 50;
        if (this.x > w + 50) this.x = -50;
        if (this.y < -50) this.y = h + 50;
        if (this.y > h + 50) this.y = -50;
      }

      draw() {
        if(!ctx) return;
        ctx.font = `${this.size}px "Times New Roman", serif`; // Serif font for "Math" feel
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fillText(this.char, this.x, this.y);
      }
    }

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // --- ANIMATION LOOP ---
    const animate = () => {
      ctx.clearRect(0, 0, w, h);
      
      // 1. Background Fill (Deep Void)
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, "#020617"); // Slate-950
      grad.addColorStop(1, "#0f172a"); // Slate-900
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // 2. The Continuous Layer (Sine Waves)
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          const yOffset = (h / 6) * (i + 1);
          const color = COLORS[i % COLORS.length];
          ctx.strokeStyle = color;
          ctx.globalAlpha = 0.1;

          for (let x = 0; x < w; x += 10) {
              // y = A * sin(Bx + C) + D
              // Dynamic wave: moves with 'time'
              const y = Math.sin(x * 0.005 + time * (i % 2 === 0 ? 1 : -1) + i) * 50; 
              ctx.lineTo(x, yOffset + y);
          }
          ctx.stroke();
      }

      // 3. The Discrete Layer (Grid Points)
      ctx.fillStyle = "#ffffff";
      ctx.globalAlpha = 0.03;
      const gridSize = 60;
      for(let x = 0; x < w; x+=gridSize) {
          for(let y = 0; y < h; y+=gridSize) {
              ctx.beginPath();
              // Subtle movement of grid points to simulate "breathing" space
              const dx = Math.sin(time + y) * 2;
              const dy = Math.cos(time + x) * 2;
              ctx.arc(x + dx, y + dy, 1, 0, Math.PI*2);
              ctx.fill();
          }
      }

      // 4. The Symbolic Layer (Floating Particles)
      particles.forEach(p => {
          p.update();
          p.draw();
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
        <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
        {/* Vignette for focus */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </>
  );
}