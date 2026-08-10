"use client";

import { useEffect, useRef } from "react";

export default function LibraryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let offset = 0;
    let frameId = 0;
    let hidden = document.hidden;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibility = () => {
      hidden = document.hidden;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const spacing = 96;
      if (!reducedMotion.matches) offset = (offset + 0.24) % spacing;

      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(148,163,184,0.045)";

      for (let x = 0; x <= width; x += spacing * 2) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = -spacing; y <= height; y += spacing) {
        const yPos = y + offset;
        ctx.beginPath();
        ctx.moveTo(0, yPos);
        ctx.lineTo(width, yPos);
        ctx.stroke();
      }

      // A second, broader grid makes the "library shelves" layer readable
      // without turning it into foreground chrome.
      ctx.strokeStyle = "rgba(34,211,238,0.022)";
      const majorSpacing = spacing * 4;
      for (let x = 0; x <= width; x += majorSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      const glow = ctx.createRadialGradient(
        width * 0.56,
        height * 0.44,
        40,
        width * 0.56,
        height * 0.44,
        Math.max(width, height) * 0.58,
      );
      glow.addColorStop(0, "rgba(125,211,252,0.035)");
      glow.addColorStop(0.5, "rgba(167,139,250,0.014)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      if (!hidden) draw();
      frameId = requestAnimationFrame(animate);
    };

    resize();
    if (reducedMotion.matches) draw();
    else animate();

    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
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
