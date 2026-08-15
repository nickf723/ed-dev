"use client";

import { useEffect, useRef } from "react";

type DustParticle = {
  x: number;
  y: number;
  speed: number;
  radius: number;
  opacity: number;
  drift: number;
};

const NETWORK_POINTS = [
  { x: 0.13, y: 0.68, links: [1, 3] },
  { x: 0.23, y: 0.56, links: [2, 4] },
  { x: 0.34, y: 0.72, links: [4, 5] },
  { x: 0.18, y: 0.83, links: [4] },
  { x: 0.31, y: 0.86, links: [5] },
  { x: 0.42, y: 0.63, links: [] },
] as const;

export default function HistoryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId = 0;
    let time = 0;

    const dust: DustParticle[] = Array.from({ length: width < 900 ? 44 : 78 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.08 + Math.random() * 0.34,
      radius: 0.6 + Math.random() * 1.8,
      opacity: 0.08 + Math.random() * 0.28,
      drift: Math.random() * Math.PI * 2,
    }));

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawBase() {
      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#090705");
      gradient.addColorStop(0.48, "#070606");
      gradient.addColorStop(1, "#040608");
      context.fillStyle = gradient;
      context.fillRect(0, 0, width, height);

      const amberGlow = context.createRadialGradient(width * 0.18, height * 0.2, 0, width * 0.18, height * 0.2, width * 0.48);
      amberGlow.addColorStop(0, "rgba(245,158,11,0.12)");
      amberGlow.addColorStop(1, "rgba(245,158,11,0)");
      context.fillStyle = amberGlow;
      context.fillRect(0, 0, width, height);

      const greenGlow = context.createRadialGradient(width * 0.74, height * 0.42, 0, width * 0.74, height * 0.42, width * 0.42);
      greenGlow.addColorStop(0, "rgba(16,185,129,0.075)");
      greenGlow.addColorStop(1, "rgba(16,185,129,0)");
      context.fillStyle = greenGlow;
      context.fillRect(0, 0, width, height);

      const indigoGlow = context.createRadialGradient(width * 0.35, height * 0.82, 0, width * 0.35, height * 0.82, width * 0.4);
      indigoGlow.addColorStop(0, "rgba(99,102,241,0.07)");
      indigoGlow.addColorStop(1, "rgba(99,102,241,0)");
      context.fillStyle = indigoGlow;
      context.fillRect(0, 0, width, height);
    }

    function drawTimeRivers() {
      context.lineWidth = 1;

      for (let band = 0; band < 4; band += 1) {
        context.beginPath();
        const baseline = height * (0.18 + band * 0.17);

        for (let x = -20; x <= width + 20; x += 18) {
          const y =
            baseline +
            Math.sin(x * 0.004 + time * 0.32 + band * 0.9) * (16 + band * 5) +
            Math.cos(x * 0.0017 - time * 0.14 + band) * 9;

          if (x === -20) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = `rgba(245,158,11,${0.035 + band * 0.012})`;
        context.stroke();
      }
    }

    function drawCartographicField() {
      const centerX = width * 0.77;
      const centerY = height * 0.38;
      const radiusX = Math.min(width * 0.31, 460);
      const radiusY = Math.min(height * 0.31, 280);

      context.save();
      context.translate(centerX, centerY);
      context.rotate(-0.14);
      context.lineWidth = 1;

      for (let index = -2; index <= 2; index += 1) {
        context.beginPath();
        context.ellipse(0, index * radiusY * 0.18, radiusX, radiusY * (0.5 - Math.abs(index) * 0.055), 0, 0, Math.PI * 2);
        context.strokeStyle = "rgba(16,185,129,0.045)";
        context.stroke();
      }

      for (let index = -3; index <= 3; index += 1) {
        context.beginPath();
        context.ellipse(index * radiusX * 0.11, 0, radiusX * 0.33, radiusY, 0, 0, Math.PI * 2);
        context.strokeStyle = "rgba(34,211,238,0.035)";
        context.stroke();
      }

      context.restore();
    }

    function drawThemeNetwork() {
      context.lineWidth = 1;

      NETWORK_POINTS.forEach((point, index) => {
        const x = point.x * width;
        const y = point.y * height + Math.sin(time * 0.16 + index) * 4;

        point.links.forEach((targetIndex) => {
          const target = NETWORK_POINTS[targetIndex];
          const targetX = target.x * width;
          const targetY = target.y * height + Math.sin(time * 0.16 + targetIndex) * 4;

          context.beginPath();
          context.moveTo(x, y);
          context.lineTo(targetX, targetY);
          context.strokeStyle = "rgba(129,140,248,0.055)";
          context.stroke();
        });

        context.beginPath();
        context.arc(x, y, 2.1 + (index % 3) * 0.6, 0, Math.PI * 2);
        context.fillStyle = "rgba(165,180,252,0.16)";
        context.fill();
      });
    }

    function drawDust() {
      for (const particle of dust) {
        if (!reducedMotion) {
          particle.x -= particle.speed;
          particle.y += Math.sin(time * 0.22 + particle.drift) * 0.025;
        }

        if (particle.x < -8) {
          particle.x = width + 8;
          particle.y = Math.random() * height;
        }

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(251,191,36,${particle.opacity})`;
        context.fill();
      }
    }

    function draw() {
      drawBase();
      drawTimeRivers();
      drawCartographicField();
      drawThemeNetwork();
      drawDust();

      time += reducedMotion ? 0 : 0.025;
      animationId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0" aria-hidden="true" />;
}
