"use client";

import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  phase: number;
};

const STRATA = [
  { top: 0.60, rgb: "120,73,43", amplitude: 17, period: 270 },
  { top: 0.68, rgb: "154,92,48", amplitude: 14, period: 230 },
  { top: 0.76, rgb: "103,67,46", amplitude: 18, period: 320 },
  { top: 0.84, rgb: "75,53,43", amplitude: 13, period: 250 },
  { top: 0.92, rgb: "50,40,37", amplitude: 10, period: 300 },
] as const;

export default function PaleoBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let paused = document.hidden;
    let sparks: Spark[] = [];

    function makeSparks() {
      const count = width < 800 ? 18 : 34;
      sparks = Array.from({ length: count }, (_, index) => ({
        x: ((index * 173) % 997) / 997 * width,
        y: height * (0.48 + ((index * 97) % 430) / 1000),
        vx: (((index * 37) % 17) - 8) * 0.006,
        vy: -(0.055 + ((index * 29) % 13) * 0.005),
        size: 0.8 + ((index * 23) % 9) * 0.13,
        phase: index * 0.73,
      }));
    }

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.1 : 1.45);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      makeSparks();
      draw(reducedMotion ? 24 : performance.now() / 1000);
    }

    function onVisibility() {
      paused = document.hidden;
      if (!paused && !reducedMotion) frame = requestAnimationFrame(loop);
    }

    function loop(now: number) {
      if (paused) return;
      draw(now / 1000);
      frame = requestAnimationFrame(loop);
    }

    function draw(time: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawCave(context, width, height);
      drawWallMarks(context, width, height);
      drawStratigraphy(context, width, height, time);
      drawExcavationGrid(context, width, height);
      drawArtifacts(context, width, height, time);
      drawSparks(context, width, height, time, sparks, reducedMotion);
      drawTorchField(context, width, height, time, reducedMotion);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#120b08]/72 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[12%] bg-gradient-to-t from-[#090605]/66 to-transparent" />
      <div className="hd-noise opacity-[0.055] mix-blend-overlay" />
    </div>
  );
}

function drawCave(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#1c100b");
  gradient.addColorStop(0.46, "#17110e");
  gradient.addColorStop(0.72, "#10100e");
  gradient.addColorStop(1, "#090807");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.23;
  for (let index = 0; index < 110; index += 1) {
    const x = ((index * 181) % 1009) / 1009 * width;
    const y = ((index * 263) % 1013) / 1013 * height * 0.64;
    const radius = 12 + ((index * 31) % 50);
    const rough = context.createRadialGradient(x, y, 0, x, y, radius);
    rough.addColorStop(0, index % 3 === 0 ? "rgba(231,180,113,0.018)" : "rgba(255,255,255,0.012)");
    rough.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = rough;
    context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
  }
  context.restore();
}

function drawWallMarks(context: CanvasRenderingContext2D, width: number, height: number) {
  const marks = [
    { x: 0.10, y: 0.23, scale: 0.72, rotate: -0.17, rgb: "197,78,45" },
    { x: 0.83, y: 0.18, scale: 0.58, rotate: 0.20, rgb: "231,173,85" },
    { x: 0.73, y: 0.42, scale: 0.42, rotate: -0.10, rgb: "177,72,46" },
  ];

  context.save();
  marks.forEach((mark) => {
    context.save();
    context.translate(width * mark.x, height * mark.y);
    context.rotate(mark.rotate);
    context.scale(mark.scale, mark.scale);
    context.strokeStyle = `rgba(${mark.rgb},0.22)`;
    context.fillStyle = `rgba(${mark.rgb},0.075)`;
    context.lineWidth = 4;
    context.beginPath();
    context.ellipse(0, 8, 22, 28, 0, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    [-17, -8, 2, 12, 21].forEach((offset, fingerIndex) => {
      context.beginPath();
      context.moveTo(offset * 0.72, -11);
      context.lineTo(offset, -42 - (fingerIndex === 2 ? 8 : fingerIndex % 2 === 0 ? 2 : 0));
      context.stroke();
    });
    context.beginPath();
    context.moveTo(-18, 18);
    context.lineTo(-38, 2);
    context.stroke();
    context.restore();
  });

  context.strokeStyle = "rgba(214,125,63,0.12)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(width * 0.16, height * 0.38);
  context.bezierCurveTo(width * 0.24, height * 0.31, width * 0.32, height * 0.43, width * 0.40, height * 0.34);
  context.bezierCurveTo(width * 0.48, height * 0.25, width * 0.56, height * 0.39, width * 0.64, height * 0.30);
  context.stroke();
  context.restore();
}

function drawStratigraphy(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  context.save();
  STRATA.forEach((layer, index) => {
    const top = height * layer.top;
    const nextTop = index === STRATA.length - 1 ? height + 30 : height * STRATA[index + 1].top + 8;
    context.beginPath();
    context.moveTo(0, top);
    for (let x = 0; x <= width + 30; x += 36) {
      const y = top + Math.sin(x / layer.period + index * 1.7 + time * 0.012) * layer.amplitude;
      context.lineTo(x, y);
    }
    context.lineTo(width, nextTop);
    context.lineTo(0, nextTop);
    context.closePath();
    const opacity = 0.19 + index * 0.018;
    context.fillStyle = `rgba(${layer.rgb},${opacity})`;
    context.fill();
    context.strokeStyle = `rgba(${layer.rgb},${0.27 - index * 0.025})`;
    context.lineWidth = 1.2;
    context.stroke();
  });
  context.restore();
}

function drawExcavationGrid(context: CanvasRenderingContext2D, width: number, height: number) {
  const horizon = height * 0.61;
  const bottom = height * 0.98;
  context.save();
  context.strokeStyle = "rgba(236,188,123,0.075)";
  context.lineWidth = 1;
  for (let index = -5; index <= 5; index += 1) {
    const xBottom = width * 0.50 + index * width * 0.12;
    const xTop = width * 0.50 + index * width * 0.035;
    context.beginPath();
    context.moveTo(xTop, horizon);
    context.lineTo(xBottom, bottom);
    context.stroke();
  }
  for (let row = 0; row < 5; row += 1) {
    const t = row / 5;
    const y = horizon + (bottom - horizon) * Math.pow(t, 1.28);
    context.beginPath();
    context.moveTo(width * (0.22 - t * 0.12), y);
    context.lineTo(width * (0.78 + t * 0.12), y);
    context.stroke();
  }
  context.restore();
}

function drawArtifacts(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const items = [
    { x: 0.26, y: 0.72, type: "point", rgb: "229,158,81" },
    { x: 0.63, y: 0.79, type: "pot", rgb: "197,107,59" },
    { x: 0.43, y: 0.87, type: "bone", rgb: "226,207,164" },
    { x: 0.80, y: 0.68, type: "point", rgb: "183,139,90" },
  ] as const;

  context.save();
  items.forEach((item, index) => {
    const x = width * item.x;
    const y = height * item.y;
    const pulse = 0.72 + Math.sin(time * 0.18 + index * 1.3) * 0.08;
    context.strokeStyle = `rgba(${item.rgb},${0.36 * pulse})`;
    context.fillStyle = `rgba(${item.rgb},${0.12 * pulse})`;
    context.lineWidth = 1.5;

    if (item.type === "point") {
      context.beginPath();
      context.moveTo(x, y - 14);
      context.lineTo(x + 11, y + 10);
      context.lineTo(x, y + 5);
      context.lineTo(x - 11, y + 10);
      context.closePath();
      context.fill();
      context.stroke();
    } else if (item.type === "pot") {
      context.beginPath();
      context.arc(x, y, 13, 0.12 * Math.PI, 0.88 * Math.PI, false);
      context.lineTo(x - 9, y + 16);
      context.quadraticCurveTo(x, y + 24, x + 9, y + 16);
      context.closePath();
      context.fill();
      context.stroke();
      context.beginPath();
      context.moveTo(x - 10, y - 7);
      context.lineTo(x + 10, y - 7);
      context.stroke();
    } else {
      context.save();
      context.translate(x, y);
      context.rotate(-0.36);
      context.beginPath();
      context.moveTo(-19, 0);
      context.lineTo(19, 0);
      context.stroke();
      [-20, 20].forEach((offset) => {
        context.beginPath();
        context.arc(offset, 0, 5.5, 0, Math.PI * 2);
        context.fill();
        context.stroke();
      });
      context.restore();
    }
  });
  context.restore();
}

function drawSparks(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  sparks: Spark[],
  reducedMotion: boolean,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  sparks.forEach((spark) => {
    if (!reducedMotion) {
      spark.x += spark.vx + Math.sin(time * 0.5 + spark.phase) * 0.018;
      spark.y += spark.vy;
      if (spark.y < height * 0.38) {
        spark.y = height * (0.82 + (spark.phase % 1) * 0.12);
        spark.x = (spark.x + width * 0.37) % width;
      }
    }
    const alpha = 0.18 + Math.sin(time * 0.7 + spark.phase) * 0.05;
    context.fillStyle = `rgba(245,158,11,${alpha})`;
    context.beginPath();
    context.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
}

function drawTorchField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const progress = reducedMotion ? 0.48 : (Math.sin(time * 0.075) + 1) / 2;
  const x = width * (0.18 + progress * 0.64);
  const y = height * (0.39 + Math.sin(time * 0.043) * 0.025);
  const radius = Math.max(width, height) * 0.44;
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, "rgba(255,201,116,0.18)");
  glow.addColorStop(0.20, "rgba(245,158,11,0.10)");
  glow.addColorStop(0.52, "rgba(180,83,9,0.035)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(
    width * 0.50,
    height * 0.42,
    Math.min(width, height) * 0.12,
    width * 0.50,
    height * 0.42,
    Math.max(width, height) * 0.80,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.70, "rgba(7,4,2,0.06)");
  vignette.addColorStop(1, "rgba(5,2,1,0.68)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
