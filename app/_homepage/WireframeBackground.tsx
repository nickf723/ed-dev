"use client";

import { useEffect, useRef } from "react";

export default function WireframeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = window.innerWidth;
    let height = window.innerHeight;
    let frameId = 0;
    let hidden = document.hidden;
    let angleX = 0;
    let angleY = 0;

    const radius = 340;
    const pointCount = 104;
    const basePoints: { x: number; y: number; z: number }[] = [];
    const phi = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < pointCount; i += 1) {
      const y = 1 - (i / (pointCount - 1)) * 2;
      const ringRadius = Math.sqrt(1 - y * y);
      const theta = phi * i;
      basePoints.push({
        x: Math.cos(theta) * ringRadius * radius,
        y: y * radius,
        z: Math.sin(theta) * ringRadius * radius,
      });
    }

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleVisibility = () => {
      hidden = document.hidden;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Keep the wireframe as a separate lower-right layer so it balances the
      // honeycomb instead of disappearing underneath it.
      const cx = width * 0.77;
      const cy = height * 0.76;

      const rotatedPoints = basePoints.map((point) => {
        const x1 = point.x * Math.cos(angleY) - point.z * Math.sin(angleY);
        const z1 = point.z * Math.cos(angleY) + point.x * Math.sin(angleY);
        const y2 = point.y * Math.cos(angleX) - z1 * Math.sin(angleX);
        const z2 = z1 * Math.cos(angleX) + point.y * Math.sin(angleX);
        return { x: x1, y: y2, z: z2 };
      });

      ctx.lineWidth = 0.8;
      ctx.strokeStyle = "rgba(125,211,252,0.075)";

      for (let i = 0; i < rotatedPoints.length; i += 1) {
        const first = rotatedPoints[i];
        const firstScale = 820 / (820 + first.z);
        const x1 = first.x * firstScale + cx;
        const y1 = first.y * firstScale + cy;

        ctx.beginPath();
        ctx.arc(x1, y1, Math.max(0.8, 1.65 * firstScale), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(226,232,240,0.16)";
        ctx.fill();

        for (let j = i + 1; j < rotatedPoints.length; j += 1) {
          const second = rotatedPoints[j];
          const dx = first.x - second.x;
          const dy = first.y - second.y;
          const dz = first.z - second.z;
          const distanceSquared = dx * dx + dy * dy + dz * dz;

          if (distanceSquared >= 155 * 155) continue;

          const secondScale = 820 / (820 + second.z);
          const x2 = second.x * secondScale + cx;
          const y2 = second.y * secondScale + cy;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      if (!reducedMotion.matches) {
        angleY += 0.0008;
        angleX += 0.00035;
      }
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
      className="pointer-events-none fixed inset-0 z-0 opacity-75"
      aria-hidden="true"
    />
  );
}
