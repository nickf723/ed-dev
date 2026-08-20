"use client";

import { useEffect, useRef } from "react";

type ConstructionGhost = {
  x: number;
  y: number;
  r: number;
  angle: number;
  speed: number;
  life: number;
  type: "arc" | "line";
};

export default function BlueprintGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let frameId = 0;
    let ghosts: ConstructionGhost[] = [];

    const seedGhosts = () => {
      ghosts = Array.from({ length: 7 }, (_, index) => ({
        x: ((index * 0.173 + 0.08) % 1) * width,
        y: ((index * 0.271 + 0.16) % 1) * height,
        r: 54 + ((index * 31) % 78),
        angle: index * 0.77,
        speed: (index % 2 === 0 ? 1 : -1) * (0.002 + index * 0.00035),
        life: 90 + index * 17,
        type: index % 2 === 0 ? "arc" : "line",
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedGhosts();
    };

    const render = () => {
      const gradient = ctx.createRadialGradient(width * 0.54, height * 0.42, 0, width * 0.54, height * 0.42, Math.max(width, height));
      gradient.addColorStop(0, "#153b74");
      gradient.addColorStop(0.58, "#0d2854");
      gradient.addColorStop(1, "#07162f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const grid = 40;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(186,230,253,0.055)";
      ctx.beginPath();
      for (let x = 0; x <= width; x += grid) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += grid) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      ctx.strokeStyle = "rgba(224,242,254,0.16)";
      ctx.lineWidth = 1.2;
      for (const ghost of ghosts) {
        ghost.life -= 0.28;
        if (ghost.life <= 0) ghost.life = 180;
        const alpha = Math.sin((ghost.life / 180) * Math.PI);
        ctx.globalAlpha = Math.max(0, alpha) * 0.72;
        ctx.beginPath();

        if (ghost.type === "arc") {
          const start = ghost.angle + time * ghost.speed;
          ctx.arc(ghost.x, ghost.y, ghost.r, start, start + 1.12);
        } else {
          const direction = ghost.angle + Math.sin(time * ghost.speed) * 0.06;
          const length = 170;
          ctx.moveTo(ghost.x, ghost.y);
          ctx.lineTo(ghost.x + Math.cos(direction) * length, ghost.y + Math.sin(direction) * length);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      time += 1;
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
