"use client";

import { useEffect, useRef } from "react";

type LorenzPoint = { x: number; y: number; z: number };

type NetworkPoint = { x: number; y: number; r: number };

const EQUATIONS = [
  "eⁱπ + 1 = 0",
  "∇ · F = 0",
  "det(A) = ad − bc",
  "Σ 1/n² = π²/6",
  "f′(x) = lim Δx→0 Δf/Δx",
  "P(A|B) = P(A∩B)/P(B)",
] as const;

function buildLorenz(): LorenzPoint[] {
  const sigma = 10;
  const rho = 28;
  const beta = 8 / 3;
  const dt = 0.005;
  let x = 0.1;
  let y = 0;
  let z = 0;
  const points: LorenzPoint[] = [];

  for (let i = 0; i < 5200; i += 1) {
    const dx = sigma * (y - x) * dt;
    const dy = (x * (rho - z) - y) * dt;
    const dz = (x * y - beta * z) * dt;
    x += dx;
    y += dy;
    z += dz;
    if (i > 900 && i % 2 === 0) points.push({ x, y, z });
  }

  return points;
}

const LORENZ = buildLorenz();

export default function MathBackground() {
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
    let phase = 0;
    let lastFrame = 0;

    const network: NetworkPoint[] = Array.from({ length: 38 }, (_, index) => ({
      x: ((index * 73) % 997) / 997,
      y: ((index * 137 + 41) % 991) / 991,
      r: 0.7 + (index % 4) * 0.35,
    }));

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawGridDetails = () => {
      ctx.save();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 96, 78, 0.055)";

      for (let x = 12; x < width; x += 72) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 20; y < height; y += 72) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      ctx.restore();
    };

    const drawEquations = () => {
      const positions = [
        [0.24, 0.055],
        [0.58, 0.10],
        [0.79, 0.47],
        [0.36, 0.88],
        [0.08, 0.62],
        [0.72, 0.91],
      ] as const;

      ctx.save();
      ctx.font = "12px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      ctx.fillStyle = "rgba(255, 126, 105, 0.13)";
      EQUATIONS.forEach((equation, index) => {
        const [px, py] = positions[index];
        ctx.fillText(equation, width * px, height * py);
      });
      ctx.restore();
    };

    const drawNetwork = () => {
      ctx.save();
      const points = network.map((point) => ({
        x: point.x * width,
        y: point.y * height,
        r: point.r,
      }));

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance > 150) continue;
          ctx.strokeStyle = `rgba(255, 90, 70, ${0.055 * (1 - distance / 150)})`;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      for (const point of points) {
        ctx.fillStyle = "rgba(255, 104, 84, 0.17)";
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawLorenz = () => {
      const centerX = width * 0.78;
      const centerY = height * 0.20;
      const scale = Math.min(width, height) * 0.0105;
      const angle = -0.42 + Math.sin(phase * 0.22) * 0.045;

      ctx.save();
      ctx.lineWidth = 0.9;
      ctx.strokeStyle = "rgba(255, 104, 84, 0.17)";
      ctx.beginPath();
      LORENZ.forEach((point, index) => {
        const rx = point.x * Math.cos(angle) - point.y * Math.sin(angle);
        const sx = centerX + rx * scale;
        const sy = centerY + (point.z - 25) * scale;
        if (index === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);
      });
      ctx.stroke();
      ctx.restore();
    };

    const drawUnitCircle = () => {
      const cx = width * 0.23;
      const cy = height * 0.83;
      const radius = Math.min(width, height) * 0.07;
      const theta = 0.75 + Math.sin(phase * 0.35) * 0.18;
      const px = cx + Math.cos(theta) * radius;
      const py = cy - Math.sin(theta) * radius;

      ctx.save();
      ctx.strokeStyle = "rgba(255, 126, 105, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - radius * 1.35, cy);
      ctx.lineTo(cx + radius * 1.35, cy);
      ctx.moveTo(cx, cy - radius * 1.35);
      ctx.lineTo(cx, cy + radius * 1.35);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 126, 105, 0.18)";
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "rgba(255, 155, 125, 0.28)";
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.lineTo(px, cy);
      ctx.stroke();

      ctx.fillStyle = "rgba(255, 155, 125, 0.35)";
      ctx.beginPath();
      ctx.arc(px, py, 2.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const drawVectorField = () => {
      const originX = width * 0.055;
      const originY = height * 0.64;
      const cols = 10;
      const rows = 7;
      const spacing = 24;

      ctx.save();
      ctx.strokeStyle = "rgba(255, 102, 82, 0.09)";
      ctx.lineWidth = 0.9;
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const x = originX + col * spacing;
          const y = originY + row * spacing;
          const vx = col - cols / 2;
          const vy = row - rows / 2;
          const angle = Math.atan2(vx, -vy) + Math.sin(phase * 0.18) * 0.06;
          const length = 8 + Math.min(6, Math.hypot(vx, vy));
          const ex = x + Math.cos(angle) * length;
          const ey = y + Math.sin(angle) * length;
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }
      ctx.restore();
    };

    const drawWave = () => {
      const startX = width * 0.62;
      const endX = width * 0.93;
      const baseline = height * 0.84;
      const amplitude = Math.min(width, height) * 0.028;

      ctx.save();
      ctx.strokeStyle = "rgba(255, 112, 91, 0.13)";
      ctx.beginPath();
      for (let x = startX; x <= endX; x += 3) {
        const t = (x - startX) / 34;
        const y = baseline + Math.sin(t + phase * 0.45) * amplitude + Math.sin(t * 0.42) * amplitude * 0.45;
        if (x === startX) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawParaboloid = () => {
      const cx = width * 0.54;
      const cy = height * 0.82;
      const rx = 62;
      const ry = 24;

      ctx.save();
      ctx.strokeStyle = "rgba(255, 112, 91, 0.09)";
      ctx.lineWidth = 0.8;
      for (let i = -4; i <= 4; i += 1) {
        ctx.beginPath();
        ctx.ellipse(cx, cy + i * 5, rx - Math.abs(i) * 7, Math.max(4, ry - Math.abs(i) * 3), 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      for (let i = -4; i <= 4; i += 1) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 12, cy - 24);
        ctx.quadraticCurveTo(cx + i * 7, cy + 6, cx + i * 4, cy + 44);
        ctx.stroke();
      }
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawGridDetails();
      drawNetwork();
      drawEquations();
      drawLorenz();
      drawUnitCircle();
      drawVectorField();
      drawWave();
      drawParaboloid();
    };

    const animate = (timestamp: number) => {
      if (timestamp - lastFrame > 32) {
        if (!document.hidden) {
          phase += 0.035;
          draw();
        }
        lastFrame = timestamp;
      }
      frameId = requestAnimationFrame(animate);
    };

    resize();
    draw();
    if (!reducedMotion.matches) frameId = requestAnimationFrame(animate);

    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-90"
      aria-hidden="true"
    />
  );
}
