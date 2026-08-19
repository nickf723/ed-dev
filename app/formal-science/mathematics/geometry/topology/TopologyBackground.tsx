"use client";

import { useEffect, useRef } from "react";

export default function TopologyBackground() {
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
    const p = 3;
    const q = 7;
    const segments = 420;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const render = () => {
      time += 0.0035;
      ctx.fillStyle = "#05020c";
      ctx.fillRect(0, 0, width, height);

      const cx = width * 0.56;
      const cy = height * 0.52;
      const scale = Math.min(170, Math.max(95, width * 0.12));
      const rotX = time * 0.45;
      const rotY = time * 0.28;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      ctx.beginPath();
      for (let index = 0; index <= segments; index += 1) {
        const t = (index / segments) * Math.PI * 2;
        const tube = Math.cos(q * t) + 3;
        const rawX = tube * Math.cos(p * t);
        const rawY = tube * Math.sin(p * t);
        const rawZ = -Math.sin(q * t) * 2;

        const x = rawX * cosY - rawZ * sinY;
        const z = rawX * sinY + rawZ * cosY;
        const y = rawY;
        const y2 = y * cosX - z * sinX;
        const z2 = y * sinX + z * cosX;
        const perspective = 900 / (900 + z2 * 30);
        const px = cx + x * scale * perspective * 0.38;
        const py = cy + y2 * scale * perspective * 0.38;

        if (index === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.strokeStyle = "rgba(167,139,250,0.26)";
      ctx.lineWidth = 3;
      ctx.shadowBlur = 18;
      ctx.shadowColor = "rgba(167,139,250,0.30)";
      ctx.stroke();
      ctx.shadowBlur = 0;

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

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-80" />;
}
