"use client";

import { useEffect, useRef } from "react";

export default function SineConstructionBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let angle = 0;
    let frameId = 0;
    const trail: number[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      trail.length = 0;
    };

    const render = () => {
      ctx.fillStyle = "#020617";
      ctx.fillRect(0, 0, width, height);

      const cx = Math.max(120, width * 0.22);
      const cy = height * 0.52;
      const radius = Math.min(92, Math.max(58, width * 0.07));
      const waveStartX = Math.max(cx + radius + 70, width * 0.46);
      const maxTrail = Math.max(40, Math.floor((width - waveStartX - 40) / 2));

      angle += 0.012;
      const px = cx + Math.cos(angle) * radius;
      const py = cy - Math.sin(angle) * radius;

      trail.unshift(py);
      if (trail.length > maxTrail) trail.pop();

      ctx.strokeStyle = "rgba(148, 163, 184, 0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, cy);
      ctx.lineTo(width, cy);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,255,255,0.12)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.lineTo(px, cy);
      ctx.closePath();
      ctx.fillStyle = "rgba(34, 211, 238, 0.055)";
      ctx.fill();
      ctx.strokeStyle = "rgba(34, 211, 238, 0.34)";
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(waveStartX, py);
      ctx.strokeStyle = "rgba(192, 132, 252, 0.18)";
      ctx.setLineDash([5, 7]);
      ctx.stroke();
      ctx.setLineDash([]);

      if (trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(waveStartX, trail[0]);
        for (let index = 1; index < trail.length; index += 1) {
          ctx.lineTo(waveStartX + index * 2, trail[index]);
        }
        ctx.strokeStyle = "rgba(192, 132, 252, 0.46)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(255,255,255,0.78)";
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();

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
