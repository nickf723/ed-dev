"use client";

import { useEffect, useRef } from "react";

type Anchor = {
  x: number;
  y: number;
  rgb: string;
};

type Thread = {
  offset: number;
  amplitude: number;
  speed: number;
  rgb: string;
};

const PLACE_ANCHORS: Anchor[] = [
  { x: 0.12, y: 0.27, rgb: "56,189,248" },
  { x: 0.31, y: 0.18, rgb: "45,212,191" },
  { x: 0.48, y: 0.35, rgb: "251,191,36" },
  { x: 0.68, y: 0.21, rgb: "244,114,182" },
  { x: 0.84, y: 0.42, rgb: "167,139,250" },
  { x: 0.62, y: 0.64, rgb: "96,165,250" },
  { x: 0.29, y: 0.72, rgb: "52,211,153" },
];

const PLACE_ROUTES: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [2, 5],
  [5, 6],
  [6, 0],
];

const THEME_THREADS: Thread[] = [
  { offset: 0.08, amplitude: 0.075, speed: 0.009, rgb: "251,191,36" },
  { offset: 0.29, amplitude: 0.11, speed: -0.006, rgb: "244,114,182" },
  { offset: 0.52, amplitude: 0.085, speed: 0.007, rgb: "45,212,191" },
  { offset: 0.73, amplitude: 0.10, speed: -0.005, rgb: "167,139,250" },
];

const ARCHIVE_SHEETS = [
  { x: 0.08, y: 0.12, width: 0.17, height: 0.25, rotation: -0.075 },
  { x: 0.71, y: 0.08, width: 0.20, height: 0.29, rotation: 0.055 },
  { x: 0.10, y: 0.58, width: 0.19, height: 0.28, rotation: 0.035 },
  { x: 0.72, y: 0.59, width: 0.18, height: 0.25, rotation: -0.045 },
] as const;

export default function HistoryBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let paused = document.hidden;

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.1 : 1.45);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(34);
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
      drawBase(context, width, height);
      drawArchiveSheets(context, width, height);
      drawChronologyBands(context, width, height, time);
      drawPlaceRoutes(context, width, height, time);
      drawThemeThreads(context, width, height, time);
      drawEvidenceMarks(context, width, height, time);
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
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,7,5,0.26),transparent_27%,transparent_74%,rgba(6,5,9,0.42))]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#090705]/78 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#050404]/76 to-transparent" />
    </div>
  );
}

function drawBase(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#120d09");
  gradient.addColorStop(0.42, "#0a1116");
  gradient.addColorStop(0.75, "#111020");
  gradient.addColorStop(1, "#090609");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.18;
  for (let index = 0; index < 70; index += 1) {
    const x = ((index * 157) % 997) / 997 * width;
    const y = ((index * 263) % 991) / 991 * height;
    context.fillStyle = index % 3 === 0
      ? "rgba(251,191,36,0.12)"
      : "rgba(226,232,240,0.07)";
    context.fillRect(x, y, 1.2, 1.2);
  }
  context.restore();
}

function drawArchiveSheets(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  context.save();
  ARCHIVE_SHEETS.forEach((sheet, sheetIndex) => {
    const sheetWidth = width * sheet.width;
    const sheetHeight = height * sheet.height;
    const x = width * sheet.x;
    const y = height * sheet.y;
    context.save();
    context.translate(x + sheetWidth / 2, y + sheetHeight / 2);
    context.rotate(sheet.rotation);
    context.fillStyle = "rgba(226,207,164,0.018)";
    context.strokeStyle = "rgba(226,207,164,0.075)";
    context.lineWidth = 1;
    context.beginPath();
    context.roundRect(-sheetWidth / 2, -sheetHeight / 2, sheetWidth, sheetHeight, 12);
    context.fill();
    context.stroke();

    const lines = Math.max(5, Math.floor(sheetHeight / 22));
    for (let line = 0; line < lines; line += 1) {
      const lineY = -sheetHeight / 2 + 20 + line * 19;
      const fraction = 0.48 + ((sheetIndex * 7 + line * 3) % 5) * 0.09;
      context.strokeStyle = "rgba(226,207,164,0.045)";
      context.beginPath();
      context.moveTo(-sheetWidth * 0.36, lineY);
      context.lineTo(-sheetWidth * 0.36 + sheetWidth * fraction, lineY);
      context.stroke();
    }
    context.restore();
  });
  context.restore();
}

function drawChronologyBands(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const bands = [
    { y: 0.20, rgb: "251,191,36", speed: 0.006, spacing: 142 },
    { y: 0.44, rgb: "56,189,248", speed: -0.004, spacing: 176 },
    { y: 0.67, rgb: "167,139,250", speed: 0.003, spacing: 158 },
  ];

  context.save();
  bands.forEach((band, bandIndex) => {
    const y = height * band.y;
    context.strokeStyle = `rgba(${band.rgb},0.16)`;
    context.lineWidth = bandIndex === 1 ? 1.8 : 1.2;
    context.beginPath();
    context.moveTo(-40, y);
    context.lineTo(width + 40, y);
    context.stroke();

    const drift = ((time * band.speed * width) % band.spacing + band.spacing) % band.spacing;
    for (let x = -band.spacing + drift; x < width + band.spacing; x += band.spacing) {
      const major = Math.round((x - drift) / band.spacing) % 4 === 0;
      context.strokeStyle = `rgba(${band.rgb},${major ? 0.26 : 0.13})`;
      context.beginPath();
      context.moveTo(x, y - (major ? 13 : 7));
      context.lineTo(x, y + (major ? 13 : 7));
      context.stroke();
      if (major) {
        context.fillStyle = `rgba(${band.rgb},0.34)`;
        context.fillRect(x - 2, y - 2, 4, 4);
      }
    }
  });
  context.restore();
}

function drawPlaceRoutes(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const anchors = PLACE_ANCHORS.map((anchor) => ({
    ...anchor,
    px: anchor.x * width,
    py: anchor.y * height,
  }));

  context.save();
  context.globalCompositeOperation = "lighter";
  PLACE_ROUTES.forEach(([from, to], routeIndex) => {
    const a = anchors[from];
    const b = anchors[to];
    const bend = (routeIndex % 2 === 0 ? -1 : 1) * Math.min(width, height) * 0.055;
    const controlX = (a.px + b.px) / 2;
    const controlY = (a.py + b.py) / 2 + bend;

    context.strokeStyle = `rgba(${a.rgb},0.095)`;
    context.lineWidth = 1.25;
    context.beginPath();
    context.moveTo(a.px, a.py);
    context.quadraticCurveTo(controlX, controlY, b.px, b.py);
    context.stroke();

    const progress = (time * 0.012 + routeIndex * 0.19) % 1;
    const point = quadraticPoint(a.px, a.py, controlX, controlY, b.px, b.py, progress);
    const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 15);
    glow.addColorStop(0, `rgba(${a.rgb},0.52)`);
    glow.addColorStop(1, `rgba(${a.rgb},0)`);
    context.fillStyle = glow;
    context.fillRect(point.x - 17, point.y - 17, 34, 34);
    context.fillStyle = `rgba(${a.rgb},0.58)`;
    context.fillRect(point.x - 2, point.y - 2, 4, 4);
  });

  anchors.forEach((anchor, index) => {
    context.fillStyle = `rgba(${anchor.rgb},0.055)`;
    context.strokeStyle = `rgba(${anchor.rgb},0.20)`;
    context.beginPath();
    context.rect(anchor.px - 6 - index % 2, anchor.py - 6 - index % 2, 12 + (index % 2) * 2, 12 + (index % 2) * 2);
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawThemeThreads(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  THEME_THREADS.forEach((thread, threadIndex) => {
    const phase = time * thread.speed * Math.PI * 2 + threadIndex * 1.3;
    context.strokeStyle = `rgba(${thread.rgb},0.12)`;
    context.lineWidth = threadIndex === 0 ? 1.7 : 1.15;
    context.beginPath();
    for (let step = 0; step <= 90; step += 1) {
      const t = step / 90;
      const x = -width * 0.05 + t * width * 1.1;
      const baseY = height * (thread.offset + t * 0.18);
      const y = baseY + Math.sin(t * Math.PI * 3.2 + phase) * height * thread.amplitude;
      if (step === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  });
  context.restore();
}

function drawEvidenceMarks(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const marks = 18;
  context.save();
  for (let index = 0; index < marks; index += 1) {
    const x = (((index * 83) % 97) / 97) * width;
    const y = (0.14 + (((index * 47) % 71) / 71) * 0.70) * height;
    const pulse = 0.5 + Math.sin(time * 0.30 + index * 0.9) * 0.5;
    context.strokeStyle = `rgba(226,207,164,${0.06 + pulse * 0.06})`;
    context.strokeRect(x - 3, y - 3, 6, 6);
  }
  context.restore();
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const vignette = context.createRadialGradient(
    width * 0.52,
    height * 0.40,
    Math.min(width, height) * 0.12,
    width * 0.52,
    height * 0.40,
    Math.max(width, height) * 0.80,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.70, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.70)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function quadraticPoint(
  x0: number,
  y0: number,
  cx: number,
  cy: number,
  x1: number,
  y1: number,
  t: number,
) {
  const inverse = 1 - t;
  return {
    x: inverse * inverse * x0 + 2 * inverse * t * cx + t * t * x1,
    y: inverse * inverse * y0 + 2 * inverse * t * cy + t * t * y1,
  };
}
