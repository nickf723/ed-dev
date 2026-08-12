"use client";

import { useEffect, useRef } from "react";

export default function InequalitiesBackgroundV2() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let frame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const drawRay = (
      y: number,
      boundaryX: number,
      direction: "left" | "right",
      inclusive: boolean,
      symbol: string,
      rgb: string,
    ) => {
      ctx.strokeStyle = "rgba(148,163,184,0.10)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, y);
      ctx.lineTo(width * 0.92, y);
      ctx.stroke();

      const startX = direction === "left" ? width * 0.08 : boundaryX;
      const endX = direction === "left" ? boundaryX : width * 0.92;
      const gradient = ctx.createLinearGradient(startX, y, endX, y);
      if (direction === "left") {
        gradient.addColorStop(0, `rgba(${rgb},0.01)`);
        gradient.addColorStop(1, `rgba(${rgb},0.15)`);
      } else {
        gradient.addColorStop(0, `rgba(${rgb},0.15)`);
        gradient.addColorStop(1, `rgba(${rgb},0.01)`);
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 14;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();

      ctx.strokeStyle = `rgba(${rgb},0.22)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(boundaryX, y - 62);
      ctx.lineTo(boundaryX, y + 62);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(boundaryX, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = inclusive ? `rgba(${rgb},0.75)` : "rgba(7,20,38,0.95)";
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb},0.72)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '600 14px "Fira Code", monospace';
      ctx.fillStyle = `rgba(${rgb},0.42)`;
      ctx.textAlign = "center";
      ctx.fillText(symbol, boundaryX, y - 78);
    };

    const drawCompound = (y: number, leftX: number, rightX: number) => {
      ctx.strokeStyle = "rgba(148,163,184,0.09)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.08, y);
      ctx.lineTo(width * 0.92, y);
      ctx.stroke();

      const gradient = ctx.createLinearGradient(leftX, y, rightX, y);
      gradient.addColorStop(0, "rgba(129,140,248,0.08)");
      gradient.addColorStop(0.5, "rgba(56,189,248,0.16)");
      gradient.addColorStop(1, "rgba(129,140,248,0.08)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 12;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(leftX, y);
      ctx.lineTo(rightX, y);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(leftX, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(7,20,38,0.95)";
      ctx.fill();
      ctx.strokeStyle = "rgba(129,140,248,0.70)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rightX, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(129,140,248,0.72)";
      ctx.fill();
      ctx.strokeStyle = "rgba(129,140,248,0.76)";
      ctx.stroke();

      ctx.font = '600 13px "Fira Code", monospace';
      ctx.fillStyle = "rgba(165,180,252,0.34)";
      ctx.textAlign = "center";
      ctx.fillText("a < x ≤ b", (leftX + rightX) / 2, y - 28);
    };

    const render = (time = 0) => {
      ctx.clearRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(56,189,248,0.025)";
      ctx.lineWidth = 1;
      for (let x = 0; x < width; x += 64) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += 64) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const t = reduceMotion ? 0 : time * 0.00018;
      const leftBoundary = width * (0.34 + Math.sin(t) * 0.08);
      const rightBoundary = width * (0.66 + Math.sin(t + 2.4) * 0.08);
      const bandHalfWidth = width * (0.12 + (Math.sin(t * 0.85 + 1.1) + 1) * 0.025);
      const bandCenter = width * (0.5 + Math.sin(t * 0.55) * 0.035);

      drawRay(height * 0.24, leftBoundary, "left", false, "x < a", "56,189,248");
      drawRay(height * 0.52, rightBoundary, "right", true, "x ≥ b", "34,211,238");
      drawCompound(height * 0.80, bandCenter - bandHalfWidth, bandCenter + bandHalfWidth);

      if (!reduceMotion) frame = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      if (reduceMotion) render();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
