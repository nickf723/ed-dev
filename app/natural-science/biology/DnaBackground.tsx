"use client";

import { useEffect, useRef } from "react";

const PAIR_COUNT = 54;
const mutations = Array.from({ length: PAIR_COUNT }, (_, index) => index % 17 === 8);

export default function DnaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let animationFrame = 0;
    let hidden = document.hidden;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibility = () => {
      hidden = document.hidden;
    };

    const draw = () => {
      if (!hidden) {
        const gradient = ctx.createRadialGradient(
          width * 0.72,
          height * 0.45,
          0,
          width * 0.72,
          height * 0.45,
          Math.max(width, height) * 0.72,
        );
        gradient.addColorStop(0, "#062014");
        gradient.addColorStop(0.45, "#04150d");
        gradient.addColorStop(1, "#020906");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);

        const centerX = width * (width > 900 ? 0.72 : 0.58);
        const spacing = height / (PAIR_COUNT - 4);
        const radius = Math.min(128, Math.max(74, width * 0.085));
        const speed = reducedMotion.matches ? 0.0012 : 0.006;
        const pairCount = reducedMotion.matches ? 30 : PAIR_COUNT;

        for (let index = 0; index < pairCount; index += 1) {
          const y = index * spacing - spacing + ((time * 34) % spacing);
          const angle = y * 0.011 + time;
          const depthA = Math.sin(angle);
          const depthB = -depthA;
          const xA = centerX + Math.cos(angle) * radius;
          const xB = centerX - Math.cos(angle) * radius;
          const alphaA = 0.28 + (depthA + 1) * 0.22;
          const alphaB = 0.28 + (depthB + 1) * 0.22;

          if (!mutations[index % mutations.length]) {
            const connector = ctx.createLinearGradient(xA, y, xB, y);
            connector.addColorStop(0, `rgba(34,211,238,${alphaA * 0.34})`);
            connector.addColorStop(0.5, "rgba(187,247,208,0.10)");
            connector.addColorStop(1, `rgba(132,204,22,${alphaB * 0.34})`);
            ctx.beginPath();
            ctx.strokeStyle = connector;
            ctx.lineWidth = 1;
            ctx.moveTo(xA, y);
            ctx.lineTo(xB, y);
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.arc(xA, y, 4.5 + depthA * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(34,211,238,${alphaA})`;
          ctx.shadowColor = "rgba(34,211,238,0.35)";
          ctx.shadowBlur = 10;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(xB, y, 4.5 + depthB * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(132,204,22,${alphaB})`;
          ctx.shadowColor = "rgba(132,204,22,0.30)";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        time += speed;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", handleVisibility);
    animationFrame = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      aria-hidden="true"
    />
  );
}
