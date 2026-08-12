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

    const drawBoundaryGlow = (x: number, y: number, rgb: string) => {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.26);
      glow.addColorStop(0, `rgba(${rgb},0.08)`);
      glow.addColorStop(0.45, `rgba(${rgb},0.025)`);
      glow.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawRay = (
      y: number,
      boundaryX: number,
      direction: "left" | "right",
      inclusive: boolean,
      symbol: string,
      rgb: string,
    ) => {
      const regionStart = direction === "left" ? width * 0.04 : boundaryX;
      const regionEnd = direction === "left" ? boundaryX : width * 0.96;
      const regionWidth = Math.max(0, regionEnd - regionStart);
      const regionGradient = ctx.createLinearGradient(regionStart, 0, regionEnd, 0);
      if (direction === "left") {
        regionGradient.addColorStop(0, `rgba(${rgb},0.006)`);
        regionGradient.addColorStop(1, `rgba(${rgb},0.04)`);
      } else {
        regionGradient.addColorStop(0, `rgba(${rgb},0.04)`);
        regionGradient.addColorStop(1, `rgba(${rgb},0.006)`);
      }
      ctx.fillStyle = regionGradient;
      ctx.fillRect(regionStart, y - height * 0.11, regionWidth, height * 0.22);

      ctx.strokeStyle = "rgba(148,163,184,0.09)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.06, y);
      ctx.lineTo(width * 0.94, y);
      ctx.stroke();

      const startX = direction === "left" ? width * 0.06 : boundaryX;
      const endX = direction === "left" ? boundaryX : width * 0.94;
      const gradient = ctx.createLinearGradient(startX, y, endX, y);
      if (direction === "left") {
        gradient.addColorStop(0, `rgba(${rgb},0.01)`);
        gradient.addColorStop(1, `rgba(${rgb},0.22)`);
      } else {
        gradient.addColorStop(0, `rgba(${rgb},0.22)`);
        gradient.addColorStop(1, `rgba(${rgb},0.01)`);
      }
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 15;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(startX, y);
      ctx.lineTo(endX, y);
      ctx.stroke();

      drawBoundaryGlow(boundaryX, y, rgb);

      ctx.strokeStyle = `rgba(${rgb},0.30)`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(boundaryX, y - 78);
      ctx.lineTo(boundaryX, y + 78);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(boundaryX, y, 9, 0, Math.PI * 2);
      ctx.fillStyle = inclusive ? `rgba(${rgb},0.84)` : "rgba(7,20,38,0.93)";
      ctx.fill();
      ctx.strokeStyle = `rgba(${rgb},0.82)`;
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.font = '600 14px "Fira Code", monospace';
      ctx.fillStyle = `rgba(${rgb},0.55)`;
      ctx.textAlign = "center";
      ctx.fillText(symbol, boundaryX, y - 94);
    };

    const drawCompound = (y: number, leftX: number, rightX: number) => {
      const bandGradient = ctx.createLinearGradient(leftX, 0, rightX, 0);
      bandGradient.addColorStop(0, "rgba(129,140,248,0.018)");
      bandGradient.addColorStop(0.5, "rgba(56,189,248,0.055)");
      bandGradient.addColorStop(1, "rgba(129,140,248,0.018)");
      ctx.fillStyle = bandGradient;
      ctx.fillRect(leftX, y - height * 0.10, Math.max(0, rightX - leftX), height * 0.20);

      ctx.strokeStyle = "rgba(148,163,184,0.08)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(width * 0.06, y);
      ctx.lineTo(width * 0.94, y);
      ctx.stroke();

      const gradient = ctx.createLinearGradient(leftX, y, rightX, y);
      gradient.addColorStop(0, "rgba(129,140,248,0.10)");
      gradient.addColorStop(0.5, "rgba(56,189,248,0.22)");
      gradient.addColorStop(1, "rgba(129,140,248,0.10)");
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 13;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(leftX, y);
      ctx.lineTo(rightX, y);
      ctx.stroke();

      drawBoundaryGlow(leftX, y, "129,140,248");
      drawBoundaryGlow(rightX, y, "56,189,248");

      ctx.beginPath();
      ctx.arc(leftX, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(7,20,38,0.93)";
      ctx.fill();
      ctx.strokeStyle = "rgba(129,140,248,0.78)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(rightX, y, 8, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(129,140,248,0.80)";
      ctx.fill();
      ctx.strokeStyle = "rgba(129,140,248,0.84)";
      ctx.stroke();

      ctx.font = '600 13px "Fira Code", monospace';
      ctx.fillStyle = "rgba(165,180,252,0.46)";
      ctx.textAlign = "center";
      ctx.fillText("a < x ≤ b", (leftX + rightX) / 2, y - 30);
    };

    const render = (time = 0) => {
      ctx.clearRect(0, 0, width, height);

      const wash = ctx.createLinearGradient(0, 0, width, height);
      wash.addColorStop(0, "rgba(7,20,38,0.58)");
      wash.addColorStop(0.5, "rgba(5,16,30,0.34)");
      wash.addColorStop(1, "rgba(4,10,20,0.62)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = "rgba(56,189,248,0.028)";
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
      const leftBoundary = width * (0.31 + Math.sin(t) * 0.095);
      const rightBoundary = width * (0.69 + Math.sin(t + 2.35) * 0.095);
      const bandHalfWidth = width * (0.11 + (Math.sin(t * 0.82 + 1.1) + 1) * 0.03);
      const bandCenter = width * (0.5 + Math.sin(t * 0.48) * 0.045);

      drawRay(height * 0.23, leftBoundary, "left", false, "x < a", "56,189,248");
      drawRay(height * 0.52, rightBoundary, "right", true, "x ≥ b", "34,211,238");
      drawCompound(height * 0.81, bandCenter - bandHalfWidth, bandCenter + bandHalfWidth);

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
