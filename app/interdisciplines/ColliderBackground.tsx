"use client";

import { useEffect, useRef } from "react";

export default function ColliderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;

    const colors = [
      "#fb923c",
      "#fb923c",
      "#f97316",
      "#fdba74",
      "#ff4136",
      "#34d399",
      "#60a5fa",
      "#fbbf24",
      "#a78bfa",
    ];

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    };

    const particles: Particle[] = Array.from({ length: 58 }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.68,
      vy: (Math.random() - 0.5) * 0.68,
      radius: 1.1 + Math.random() * 2.2,
      color: colors[index % colors.length],
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "rgba(7,5,3,0.84)";
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 0.65;

      for (let i = 0; i < particles.length; i += 1) {
        const first = particles[i];
        first.x += first.vx;
        first.y += first.vy;

        if (first.x < -10) first.x = width + 10;
        if (first.x > width + 10) first.x = -10;
        if (first.y < -10) first.y = height + 10;
        if (first.y > height + 10) first.y = -10;

        for (let j = i + 1; j < particles.length; j += 1) {
          const second = particles[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const distance = Math.hypot(dx, dy);
          if (distance > 140) continue;

          const gradient = ctx.createLinearGradient(first.x, first.y, second.x, second.y);
          gradient.addColorStop(0, first.color);
          gradient.addColorStop(0.5, "#fb923c");
          gradient.addColorStop(1, second.color);
          ctx.strokeStyle = gradient;
          ctx.globalAlpha = 0.17 * (1 - distance / 140);
          ctx.beginPath();
          ctx.moveTo(first.x, first.y);
          ctx.lineTo(second.x, second.y);
          ctx.stroke();
        }

        ctx.globalAlpha = first.color === "#fb923c" || first.color === "#f97316" ? 0.82 : 0.56;
        ctx.fillStyle = first.color;
        ctx.beginPath();
        ctx.arc(first.x, first.y, first.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      if (!document.hidden) draw();
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}
