"use client";
import React, { useEffect, useRef } from 'react';

export default function FirstOrderFlashyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    // --- Configuration ---
    const particleCount = 80;
    const connectionDistance = 150;
    const particleSpeed = 0.5;

    // --- Resize Canvas to fit screen perfectly ---
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- Particle Class ---
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * (canvas?.width ?? 0);
        this.y = Math.random() * (canvas?.height ?? 0);
        this.vx = (Math.random() - 0.5) * particleSpeed;
        this.vy = (Math.random() - 0.5) * particleSpeed;
        this.radius = Math.random() * 2 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off walls
        if (canvas && (this.x < 0 || this.x > canvas.width)) this.vx = -this.vx;
        if (canvas && (this.y < 0 || this.y > canvas.height)) this.vy = -this.vy;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(59, 130, 246, 0.5)'; // Tailwind blue-500
        ctx.fill();
      }
    }

    // Initialize Particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // --- Main Animation Loop ---
    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(p => p.update());
      particles.forEach(p => p.draw());

      // Draw Connection Matrix
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            // The closer they are, the more opaque the line
            const opacity = 1 - (distance / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // --- Cleanup on Unmount ---
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-950/20 via-[#05030a] to-[#05030a]" />

      {/* Floating Mathematical Symbols (Nodes in the network) using pure CSS Tailwind animations */}
      <div className="absolute inset-0 opacity-[0.05] font-serif text-blue-400">
        <div className="absolute top-[15%] left-[10%] text-9xl animate-[pulse_6s_ease-in-out_infinite]">∀</div>
        <div className="absolute top-[60%] right-[15%] text-8xl animate-[pulse_8s_ease-in-out_infinite_1s]">∃</div>
        <div className="absolute bottom-[20%] left-[25%] text-7xl animate-[pulse_7s_ease-in-out_infinite_2s]">x</div>
        <div className="absolute top-[30%] right-[30%] text-8xl animate-[pulse_9s_ease-in-out_infinite_0.5s]">P(x)</div>
      </div>

      {/* The Native HTML5 Canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-60"
      />
    </div>
  );
}