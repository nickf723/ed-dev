"use client";

import { useEffect, useRef } from "react";

type Trail = {
  x: number;
  y: number;
  z: number;
  history: { x: number; y: number }[];
  hue: number;
};

export default function MathBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sigma = 10;
    const rho = 28;
    const beta = 8 / 3;
    const dt = 0.006;
    const trails: Trail[] = Array.from({ length: 28 }, (_, index) => ({
      x: 0.1 + index * 0.002,
      y: 0,
      z: 0,
      history: [],
      hue: 2 + (index / 27) * 190,
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

    const step = () => {
      time += 0.0022;
      const scale = Math.min(width, height) * 0.018;
      const centerX = width * 0.72;
      const centerY = height * 0.58;
      const angle = time * 0.55;

      for (const trail of trails) {
        if (!reducedMotion.matches) {
          const dx = sigma * (trail.y - trail.x) * dt;
          const dy = (trail.x * (rho - trail.z) - trail.y) * dt;
          const dz = (trail.x * trail.y - beta * trail.z) * dt;
          trail.x += dx;
          trail.y += dy;
          trail.z += dz;
        }

        const rotatedX = trail.x * Math.cos(angle) - trail.y * Math.sin(angle);
        const screenX = centerX + rotatedX * scale;
        const screenY = centerY + (trail.z - 25) * scale;
        trail.history.push({ x: screenX, y: screenY });
        if (trail.history.length > 38) trail.history.shift();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      step();
      ctx.lineWidth = 1.1;

      for (const trail of trails) {
        if (trail.history.length < 2) continue;
        ctx.beginPath();
        ctx.moveTo(trail.history[0].x, trail.history[0].y);
        for (let index = 1; index < trail.history.length; index += 1) {
          ctx.lineTo(trail.history[index].x, trail.history[index].y);
        }
        ctx.strokeStyle = `hsla(${trail.hue}, 78%, 62%, 0.16)`;
        ctx.stroke();
      }
    };

    const animate = () => {
      if (!document.hidden) draw();
      frameId = requestAnimationFrame(animate);
    };

    resize();
    if (reducedMotion.matches) {
      for (let index = 0; index < 1600; index += 1) step();
      draw();
    } else {
      animate();
    }

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70 mix-blend-screen"
      aria-hidden="true"
    />
  );
}
