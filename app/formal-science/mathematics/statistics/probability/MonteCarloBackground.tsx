"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; inside: boolean; life: number };

export default function MonteCarloBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frameId = 0;
    let total = 0;
    let inside = 0;
    const dots: Dot[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots.length = 0;
      total = 0;
      inside = 0;
    };

    const render = () => {
      ctx.fillStyle = "rgba(2,6,23,0.24)";
      ctx.fillRect(0, 0, width, height);

      const size = Math.min(width, height) * 0.66;
      const radius = size / 2;
      const centerX = width * 0.68;
      const centerY = height * 0.48;

      ctx.strokeStyle = "rgba(192,132,252,0.08)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.strokeRect(centerX - radius, centerY - radius, size, size);

      for (let index = 0; index < 8; index += 1) {
        const dx = Math.random() * size - radius;
        const dy = Math.random() * size - radius;
        const isInside = dx * dx + dy * dy <= radius * radius;
        total += 1;
        if (isInside) inside += 1;
        dots.push({ x: centerX + dx, y: centerY + dy, inside: isInside, life: 1 });
      }

      for (let index = dots.length - 1; index >= 0; index -= 1) {
        const dot = dots[index];
        dot.life -= 0.012;
        if (dot.life <= 0) {
          dots.splice(index, 1);
          continue;
        }
        ctx.fillStyle = dot.inside ? `rgba(232,121,249,${dot.life * 0.70})` : `rgba(148,163,184,${dot.life * 0.20})`;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.inside ? 1.4 : 1, 0, Math.PI * 2);
        ctx.fill();
      }

      if (total > 0) {
        const fraction = inside / total;
        const estimate = 4 * fraction;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `600 ${Math.max(44, Math.min(84, width * 0.055))}px ui-monospace, monospace`;
        ctx.fillStyle = "rgba(255,255,255,0.035)";
        ctx.fillText(estimate.toFixed(4), centerX, centerY);
      }

      frameId = requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    frameId = requestAnimationFrame(render);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-90" />;
}
