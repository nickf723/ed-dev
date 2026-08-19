"use client";

import { useEffect, useRef } from "react";

export default function SystemsBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let frameId = 0;
    let running = true;

    const lineA = { m: 0.5, b: 0, color: "#06b6d4" };
    const lineB = { m: -0.5, b: 0, color: "#f59e0b" };

    const drawLine = (line: typeof lineA, cx: number, cy: number) => {
      const mathXStart = -cx;
      const mathXEnd = cx;
      const mathYStart = line.m * mathXStart + line.b;
      const mathYEnd = line.m * mathXEnd + line.b;

      ctx.strokeStyle = line.color;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, cy - mathYStart);
      ctx.lineTo(w, cy - mathYEnd);
      ctx.stroke();
    };

    const render = () => {
      if (!running) return;

      ctx.fillStyle = "#04060f";
      ctx.fillRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const time = Date.now() * 0.001;

      // Slow, bounded motion keeps the field alive without turning the
      // background into a competing simulation.
      lineA.m = Math.sin(time * 0.12) * 0.95;
      lineA.b = Math.cos(time * 0.22) * 72;
      lineB.m = Math.cos(time * 0.14 + 2) * 0.95;
      lineB.b = Math.sin(time * 0.18) * 72;

      ctx.globalAlpha = 0.22;
      drawLine(lineA, cx, cy);
      drawLine(lineB, cx, cy);

      const denominator = lineA.m - lineB.m;
      const safelyNonParallel = Math.abs(denominator) > 0.12;

      if (safelyNonParallel) {
        const intersectX = (lineB.b - lineA.b) / denominator;
        const intersectY = lineA.m * intersectX + lineA.b;
        const screenX = cx + intersectX;
        const screenY = cy - intersectY;
        const visible = screenX > 70 && screenX < w - 70 && screenY > 70 && screenY < h - 70;

        if (visible) {
          const size = 13;
          ctx.globalAlpha = 0.26;
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(screenX - size, screenY - size + 6);
          ctx.lineTo(screenX - size, screenY - size);
          ctx.lineTo(screenX - size + 6, screenY - size);
          ctx.moveTo(screenX + size, screenY - size + 6);
          ctx.lineTo(screenX + size, screenY - size);
          ctx.lineTo(screenX + size - 6, screenY - size);
          ctx.moveTo(screenX - size, screenY + size - 6);
          ctx.lineTo(screenX - size, screenY + size);
          ctx.lineTo(screenX - size + 6, screenY + size);
          ctx.moveTo(screenX + size, screenY + size - 6);
          ctx.lineTo(screenX + size, screenY + size);
          ctx.lineTo(screenX + size - 6, screenY + size);
          ctx.stroke();

          ctx.globalAlpha = 0.18;
          ctx.fillStyle = "#ffffff";
          ctx.font = "9px monospace";
          ctx.fillText("shared solution", screenX + 20, screenY - 18);
        }
      }

      ctx.globalAlpha = 1;
      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    const handleResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      running = false;
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
