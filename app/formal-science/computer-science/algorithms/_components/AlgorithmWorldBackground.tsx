"use client";

import { useEffect, useRef } from "react";

const GRAPH_POINTS = [
  [0.08, 0.24],
  [0.19, 0.14],
  [0.22, 0.36],
  [0.34, 0.10],
  [0.38, 0.28],
  [0.38, 0.49],
  [0.51, 0.34],
] as const;

const GRAPH_EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [1, 4],
  [2, 5],
  [4, 6],
  [5, 6],
] as const;

const SORT_VALUES = [7, 2, 9, 4, 1, 8, 3, 6];

export default function AlgorithmWorldBackground() {
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
    let previous = performance.now();
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
      draw(18);
    }

    function onVisibility() {
      paused = document.hidden;
      if (!paused && !reducedMotion) {
        previous = performance.now();
        frame = requestAnimationFrame(loop);
      }
    }

    function loop(now: number) {
      if (paused) return;
      const delta = Math.min(0.05, (now - previous) / 1000);
      previous = now;
      draw(now / 1000 + delta);
      frame = requestAnimationFrame(loop);
    }

    function draw(time: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawBase(context, width, height);
      drawTraversalAmbient(context, width, height, time);
      drawSortingAmbient(context, width, height, time);
      drawGrowthAmbient(context, width, height, time);
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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,10,0.20),transparent_30%,transparent_76%,rgba(2,5,9,0.42))]" />
      <div className="absolute inset-x-0 top-0 h-[20%] bg-gradient-to-b from-[#020608]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-[#010305]/75 to-transparent" />
    </div>
  );
}

function drawBase(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#031013");
  gradient.addColorStop(0.52, "#071019");
  gradient.addColorStop(1, "#05050b");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.lineWidth = 1;
  const spacing = width < 900 ? 64 : 82;
  for (let x = 0; x < width; x += spacing) {
    context.strokeStyle = "rgba(34,211,238,0.035)";
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += spacing) {
    context.strokeStyle = "rgba(167,139,250,0.03)";
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function drawTraversalAmbient(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const points = GRAPH_POINTS.map(([x, y]) => ({ x: x * width, y: y * height }));
  context.save();
  context.globalCompositeOperation = "lighter";

  GRAPH_EDGES.forEach(([from, to], index) => {
    const a = points[from];
    const b = points[to];
    context.strokeStyle = "rgba(34,211,238,0.12)";
    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();

    const progress = (time * 0.035 + index * 0.17) % 1;
    const packetX = a.x + (b.x - a.x) * progress;
    const packetY = a.y + (b.y - a.y) * progress;
    context.fillStyle = "rgba(34,211,238,0.55)";
    context.beginPath();
    context.arc(packetX, packetY, 2.2, 0, Math.PI * 2);
    context.fill();
  });

  points.forEach((point, index) => {
    const pulse = 1 + Math.sin(time * 0.45 + index * 0.8) * 0.08;
    context.fillStyle = "rgba(34,211,238,0.055)";
    context.strokeStyle = "rgba(34,211,238,0.20)";
    context.beginPath();
    context.arc(point.x, point.y, (7 + (index % 3) * 2) * pulse, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawSortingAmbient(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const baseline = height * 0.82;
  const stageWidth = Math.min(width * 0.43, 720);
  const startX = width * 0.08;
  const gap = stageWidth / SORT_VALUES.length;
  const activeIndex = Math.floor((time * 0.18) % SORT_VALUES.length);

  context.save();
  context.strokeStyle = "rgba(52,211,153,0.10)";
  context.beginPath();
  context.moveTo(startX, baseline + 12);
  context.lineTo(startX + stageWidth, baseline + 12);
  context.stroke();

  SORT_VALUES.forEach((value, index) => {
    const barHeight = 20 + value * Math.min(24, height * 0.03);
    const x = startX + index * gap + gap * 0.14;
    const barWidth = gap * 0.66;
    const active = index === activeIndex || index === activeIndex + 1;
    const gradient = context.createLinearGradient(0, baseline - barHeight, 0, baseline);
    gradient.addColorStop(
      0,
      active ? "rgba(250,204,21,0.24)" : "rgba(52,211,153,0.17)",
    );
    gradient.addColorStop(1, "rgba(3,25,18,0.22)");
    context.fillStyle = gradient;
    context.strokeStyle = active
      ? "rgba(250,204,21,0.34)"
      : "rgba(52,211,153,0.14)";
    context.beginPath();
    context.roundRect(x, baseline - barHeight, barWidth, barHeight, 9);
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawGrowthAmbient(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const left = width * 0.60;
  const right = width * 0.95;
  const bottom = height * 0.78;
  const top = height * 0.16;
  const families = [
    { exponent: 0.12, rgb: "52,211,153", opacity: 0.18 },
    { exponent: 0.34, rgb: "34,211,238", opacity: 0.20 },
    { exponent: 0.58, rgb: "96,165,250", opacity: 0.22 },
    { exponent: 1.0, rgb: "167,139,250", opacity: 0.27 },
    { exponent: 2.0, rgb: "244,114,182", opacity: 0.34 },
  ];

  context.save();
  context.globalCompositeOperation = "lighter";
  families.forEach((family, familyIndex) => {
    context.beginPath();
    for (let step = 0; step <= 80; step += 1) {
      const t = step / 80;
      const x = left + (right - left) * t;
      const normalized = familyIndex === 0 ? 0.08 : Math.pow(t, family.exponent);
      const y = bottom - normalized * (bottom - top) * (0.24 + familyIndex * 0.17);
      if (step === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.strokeStyle = `rgba(${family.rgb},${family.opacity})`;
    context.lineWidth = familyIndex === families.length - 1 ? 2.3 : 1.3;
    context.stroke();
  });

  const scan = (time * 0.025) % 1;
  const scanX = left + (right - left) * scan;
  context.strokeStyle = "rgba(250,204,21,0.20)";
  context.setLineDash([5, 8]);
  context.beginPath();
  context.moveTo(scanX, top);
  context.lineTo(scanX, bottom + 6);
  context.stroke();
  context.restore();
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.38,
    Math.min(width, height) * 0.12,
    width * 0.5,
    height * 0.38,
    Math.max(width, height) * 0.78,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.72, "rgba(0,0,0,0.10)");
  vignette.addColorStop(1, "rgba(0,0,0,0.68)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
