"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  size: number;
  phase: number;
};

export default function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stars: Star[] = Array.from({ length: 120 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 0.5 + Math.random() * 1.2,
      phase: Math.random() * Math.PI * 2,
    }));

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;
    let time = 0;

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
      if (!reducedMotion.matches) time += 0.003;

      const centerX = width * 0.64;
      const centerY = height * 0.56;
      const radius = Math.max(width, height) * 0.62;

      ctx.strokeStyle = "rgba(255,65,54,0.045)";
      ctx.lineWidth = 1;
      for (let index = 0; index < 12; index += 1) {
        const angle = (index / 12) * Math.PI * 2 + time * 0.16;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + Math.cos(angle) * radius, centerY + Math.sin(angle) * radius);
        ctx.stroke();
      }

      for (const ring of [110, 220, 360, 520]) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, ring, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(148,163,184,0.025)";
        ctx.stroke();
      }

      for (const star of stars) {
        const opacity = 0.12 + 0.16 * (0.5 + 0.5 * Math.sin(time * 5 + star.phase));
        ctx.beginPath();
        ctx.arc(star.x * width, star.y * height, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(226,232,240,${opacity})`;
        ctx.fill();
      }
    };

    const animate = () => {
      if (!document.hidden) draw();
      frameId = requestAnimationFrame(animate);
    };

    resize();
    if (reducedMotion.matches) draw();
    else animate();

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80"
      aria-hidden="true"
    />
  );
}
