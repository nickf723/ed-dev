"use client";

import { useEffect, useRef } from "react";

type SeedPoint = {
  x: number;
  y: number;
  phase: number;
  weight: number;
};

const EQUATIONS = [
  "eⁱπ + 1 = 0",
  "∇ · F = 0",
  "det(A) = ad − bc",
  "Σ 1/n² = π²/6",
  "f′(x) = lim Δx→0 Δf/Δx",
  "P(A|B) = P(A∩B)/P(B)",
  "G = (V,E)",
  "∫ₐᵇ f(x) dx",
] as const;

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

    const seeds: SeedPoint[] = Array.from({ length: 34 }, (_, index) => ({
      x: ((index * 83 + 17) % 997) / 997,
      y: ((index * 151 + 29) % 991) / 991,
      phase: index * 0.77,
      weight: 0.7 + (index % 4) * 0.25,
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

    const warpedPoint = (x: number, y: number) => {
      const nx = x / Math.max(width, 1);
      const ny = y / Math.max(height, 1);
      const dx =
        Math.sin(ny * Math.PI * 3.2 + phase * 0.42) * 8 +
        Math.sin((nx + ny) * Math.PI * 2.4 - phase * 0.18) * 4;
      const dy =
        Math.sin(nx * Math.PI * 3.0 - phase * 0.34) * 7 +
        Math.cos((nx - ny) * Math.PI * 2.0 + phase * 0.22) * 3;
      return [x + dx, y + dy] as const;
    };

    const drawWarpedGrid = () => {
      ctx.save();
      ctx.lineWidth = 0.8;

      const xStep = Math.max(54, Math.min(76, width / 22));
      const yStep = Math.max(54, Math.min(76, height / 13));

      for (let x = -xStep; x < width + xStep; x += xStep) {
        ctx.beginPath();
        for (let y = -20; y <= height + 20; y += 10) {
          const [px, py] = warpedPoint(x, y);
          if (y === -20) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(255, 92, 72, 0.050)";
        ctx.stroke();
      }

      for (let y = -yStep; y < height + yStep; y += yStep) {
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 10) {
          const [px, py] = warpedPoint(x, y);
          if (x === -20) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.strokeStyle = "rgba(255, 92, 72, 0.046)";
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawCurveFamily = () => {
      const families = [
        {
          baseline: height * 0.17,
          amplitude: Math.min(width, height) * 0.035,
          frequency: 72,
          phaseScale: 0.72,
          alpha: 0.13,
        },
        {
          baseline: height * 0.78,
          amplitude: Math.min(width, height) * 0.045,
          frequency: 98,
          phaseScale: -0.48,
          alpha: 0.10,
        },
        {
          baseline: height * 0.49,
          amplitude: Math.min(width, height) * 0.024,
          frequency: 58,
          phaseScale: 0.31,
          alpha: 0.07,
        },
      ];

      ctx.save();
      ctx.lineWidth = 1.1;

      families.forEach((family, familyIndex) => {
        for (let variant = 0; variant < 3; variant += 1) {
          ctx.beginPath();
          for (let x = -10; x <= width + 10; x += 5) {
            const t = x / family.frequency;
            const y =
              family.baseline +
              Math.sin(t + phase * family.phaseScale + variant * 0.72) *
                family.amplitude *
                (1 - variant * 0.15) +
              Math.sin(t * 0.43 - phase * 0.22) *
                family.amplitude *
                0.35;
            if (x === -10) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }

          const alpha = family.alpha * (1 - variant * 0.22);
          ctx.strokeStyle =
            familyIndex === 1
              ? `rgba(34,211,238,${alpha})`
              : `rgba(255,104,84,${alpha})`;
          ctx.stroke();
        }
      });

      ctx.restore();
    };

    const drawParametricOrbit = () => {
      const cx = width * 0.79;
      const cy = height * 0.18;
      const rx = Math.min(width, height) * 0.12;
      const ry = rx * 0.58;

      ctx.save();
      ctx.lineWidth = 0.9;

      for (let ring = 0; ring < 5; ring += 1) {
        ctx.beginPath();
        for (let i = 0; i <= 240; i += 1) {
          const t = (i / 240) * Math.PI * 2;
          const rScale = 0.58 + ring * 0.11;
          const wobble = 1 + Math.sin(t * 3 + phase * 0.32 + ring) * 0.06;
          const x =
            cx +
            Math.cos(t + phase * 0.06) *
              rx *
              rScale *
              wobble +
            Math.cos(t * 3) * 7;
          const y =
            cy +
            Math.sin(t * 2 - phase * 0.08) *
              ry *
              rScale +
            Math.sin(t) * 5;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255,104,84,${0.07 + ring * 0.018})`;
        ctx.stroke();
      }

      ctx.restore();
    };

    const drawVectorField = () => {
      const cols = Math.min(16, Math.max(9, Math.floor(width / 120)));
      const rows = Math.min(9, Math.max(6, Math.floor(height / 120)));
      const xGap = width / (cols + 1);
      const yGap = height / (rows + 1);

      ctx.save();
      ctx.lineWidth = 0.8;

      for (let row = 1; row <= rows; row += 1) {
        for (let col = 1; col <= cols; col += 1) {
          const x = col * xGap;
          const y = row * yGap;
          const nx = col / cols - 0.5;
          const ny = row / rows - 0.5;
          const angle =
            Math.atan2(nx, -ny) +
            Math.sin(phase * 0.18 + col * 0.37 + row * 0.21) * 0.22;
          const length = 5 + Math.min(7, Math.hypot(nx, ny) * 10);
          const ex = x + Math.cos(angle) * length;
          const ey = y + Math.sin(angle) * length;

          ctx.strokeStyle =
            (row + col) % 4 === 0
              ? "rgba(34,211,238,0.060)"
              : "rgba(255,104,84,0.052)";
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(ex, ey);
          ctx.stroke();
        }
      }

      ctx.restore();
    };

    const drawNetwork = () => {
      const points = seeds.map((seed) => {
        const driftX = Math.sin(phase * 0.16 + seed.phase) * 12;
        const driftY = Math.cos(phase * 0.13 + seed.phase * 1.3) * 9;
        return {
          x: seed.x * width + driftX,
          y: seed.y * height + driftY,
          r: seed.weight,
        };
      });

      ctx.save();

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.hypot(dx, dy);
          if (distance > 138) continue;

          ctx.strokeStyle = `rgba(255,96,78,${
            0.044 * (1 - distance / 138)
          })`;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }

      for (const point of points) {
        ctx.fillStyle = "rgba(255,112,91,0.14)";
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    const drawGeometry = () => {
      const cx = width * 0.22;
      const cy = height * 0.83;
      const radius = Math.min(width, height) * 0.068;
      const rotation = phase * 0.08;

      ctx.save();
      ctx.lineWidth = 0.9;

      ctx.strokeStyle = "rgba(255,126,105,0.10)";
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      const vertices = Array.from({ length: 6 }, (_, index) => {
        const angle = rotation + (index / 6) * Math.PI * 2;
        return [
          cx + Math.cos(angle) * radius,
          cy + Math.sin(angle) * radius,
        ] as const;
      });

      ctx.strokeStyle = "rgba(255,144,112,0.14)";
      ctx.beginPath();
      vertices.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.closePath();
      ctx.stroke();

      ctx.strokeStyle = "rgba(34,211,238,0.085)";
      vertices.forEach(([x, y], index) => {
        const [tx, ty] = vertices[(index + 2) % vertices.length];
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      });

      ctx.restore();
    };

    const drawEquationCloud = () => {
      const positions = [
        [0.24, 0.055],
        [0.57, 0.10],
        [0.84, 0.46],
        [0.35, 0.92],
        [0.075, 0.58],
        [0.70, 0.90],
        [0.48, 0.30],
        [0.12, 0.28],
      ] as const;

      ctx.save();
      ctx.font =
        "11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

      EQUATIONS.forEach((equation, index) => {
        const [px, py] = positions[index];
        const pulse =
          0.085 +
          Math.sin(phase * 0.15 + index * 0.8) * 0.025;
        ctx.fillStyle = `rgba(255,126,105,${pulse})`;
        ctx.fillText(equation, width * px, height * py);
      });

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      drawWarpedGrid();
      drawCurveFamily();
      drawNetwork();
      drawVectorField();
      drawGeometry();
      drawParametricOrbit();
      drawEquationCloud();
    };

    const animate = (timestamp: number) => {
      frameId = requestAnimationFrame(animate);
      if (document.hidden) return;
      if (!reducedMotion.matches && timestamp - lastFrame < 33) return;
      lastFrame = timestamp;
      if (!reducedMotion.matches) phase += 0.024;
      draw();
    };

    resize();
    draw();
    frameId = requestAnimationFrame(animate);
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
