"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type Grain = {
  cx: number;
  cy: number;
  radius: number;
  sides: number;
  phase: number;
  rgb: string;
};

const GRAINS: Grain[] = Array.from({ length: 34 }, (_, index) => ({
  cx: ((index * 73) % 101) / 100,
  cy: ((index * 47 + 17) % 103) / 102,
  radius: 0.055 + ((index * 19) % 17) / 420,
  sides: 5 + (index % 4),
  phase: (index * 0.73) % (Math.PI * 2),
  rgb: index % 4 === 0 ? "251,191,36" : index % 4 === 1 ? "56,189,248" : index % 4 === 2 ? "167,139,250" : "94,234,212",
}));

export default function MicrostructureBackground() {
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

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.05 : 1.4);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(44);
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
      drawMicroscopeField(context, width, height, reducedMotion ? 44 : time);
      drawSpecimenNotes(context, width, height);
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
      <div className="absolute inset-x-0 top-0 h-[17%] bg-gradient-to-b from-[#05080c]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#05080c]/82 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#05080c");
  gradient.addColorStop(0.48, "#081018");
  gradient.addColorStop(1, "#040609");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.strokeStyle = "rgba(148,163,184,0.025)";
  for (let x = 0; x < width; x += 58) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += 58) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function drawMicroscopeField(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const radius = Math.min(width < 900 ? width * 0.45 : width * 0.34, height * 0.43);
  const cx = width < 900 ? width * 0.54 : width * 0.65;
  const cy = height * 0.54;

  const halo = context.createRadialGradient(cx, cy, radius * 0.65, cx, cy, radius * 1.25);
  halo.addColorStop(0, "rgba(125,211,252,0.065)");
  halo.addColorStop(0.58, "rgba(167,139,250,0.028)");
  halo.addColorStop(1, "rgba(2,6,23,0)");
  context.fillStyle = halo;
  context.fillRect(cx - radius * 1.4, cy - radius * 1.4, radius * 2.8, radius * 2.8);

  context.save();
  context.beginPath();
  context.arc(cx, cy, radius, 0, Math.PI * 2);
  context.clip();
  context.fillStyle = "#0b1118";
  context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  drawGrainWindow(context, cx - radius, cy - radius, radius, radius, time);
  drawLatticeWindow(context, cx, cy - radius, radius, radius, time);
  drawPolymerWindow(context, cx - radius, cy, radius, radius, time);
  drawCompositeWindow(context, cx, cy, radius, radius, time);

  context.strokeStyle = "rgba(226,232,240,0.11)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(cx, cy - radius);
  context.lineTo(cx, cy + radius);
  context.moveTo(cx - radius, cy);
  context.lineTo(cx + radius, cy);
  context.stroke();

  drawScan(context, cx, cy, radius, time);
  context.restore();

  context.strokeStyle = "rgba(186,230,253,0.24)";
  context.lineWidth = 1.2;
  context.beginPath();
  context.arc(cx, cy, radius, 0, Math.PI * 2);
  context.stroke();
  context.strokeStyle = "rgba(226,232,240,0.08)";
  context.beginPath();
  context.arc(cx, cy, radius + 9, 0, Math.PI * 2);
  context.stroke();

  drawWindowLabels(context, cx, cy, radius);
}

function drawGrainWindow(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, time: number) {
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();
  const minDim = Math.min(width, height);

  GRAINS.forEach((grain, index) => {
    const gx = x + grain.cx * width;
    const gy = y + grain.cy * height;
    const radius = grain.radius * minDim;
    context.beginPath();
    for (let side = 0; side < grain.sides; side += 1) {
      const angle = (side / grain.sides) * Math.PI * 2 + grain.phase;
      const jitter = 0.86 + (((index + side * 7) % 13) / 100);
      const px = gx + Math.cos(angle) * radius * jitter;
      const py = gy + Math.sin(angle) * radius * jitter;
      if (side === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    }
    context.closePath();
    context.fillStyle = `rgba(${grain.rgb},${0.028 + (index % 3) * 0.008})`;
    context.strokeStyle = `rgba(${grain.rgb},${0.15 + (index % 4) * 0.018})`;
    context.lineWidth = 1;
    context.fill();
    context.stroke();
  });

  const slipY = y + height * (0.30 + Math.sin(time * 0.025) * 0.05);
  context.strokeStyle = "rgba(251,191,36,0.28)";
  context.setLineDash([5, 7]);
  context.beginPath();
  context.moveTo(x + width * 0.10, slipY);
  context.lineTo(x + width * 0.88, slipY + height * 0.18);
  context.stroke();
  context.setLineDash([]);
  context.restore();
}

function drawLatticeWindow(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, time: number) {
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();
  const spacing = Math.max(22, width / 9.5);
  const offset = Math.sin(time * 0.018) * spacing * 0.08;

  for (let row = -1; row < height / spacing + 2; row += 1) {
    for (let col = -1; col < width / spacing + 2; col += 1) {
      const px = x + col * spacing + (row % 2) * spacing * 0.5 + offset;
      const py = y + row * spacing * 0.87;
      const missing = (row === 4 && col === 4) || (row === 2 && col === 7);
      if (missing) continue;
      context.fillStyle = (row + col) % 5 === 0 ? "rgba(167,139,250,0.46)" : "rgba(125,211,252,0.40)";
      context.beginPath();
      context.arc(px, py, 2.6, 0, Math.PI * 2);
      context.fill();
      context.strokeStyle = "rgba(125,211,252,0.075)";
      context.beginPath();
      context.moveTo(px, py);
      context.lineTo(px + spacing, py);
      context.moveTo(px, py);
      context.lineTo(px + spacing * 0.5, py + spacing * 0.87);
      context.stroke();
    }
  }
  context.restore();
}

function drawPolymerWindow(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, time: number) {
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();

  for (let chain = 0; chain < 10; chain += 1) {
    const baseY = y + height * (0.12 + chain * 0.09);
    const phase = chain * 0.74 + time * 0.014;
    context.strokeStyle = chain % 3 === 0 ? "rgba(244,114,182,0.25)" : "rgba(192,132,252,0.20)";
    context.lineWidth = chain % 3 === 0 ? 1.6 : 1.1;
    context.beginPath();
    for (let step = 0; step <= 24; step += 1) {
      const t = step / 24;
      const px = x + width * (0.04 + t * 0.92);
      const py = baseY + Math.sin(t * Math.PI * (2.2 + chain * 0.08) + phase) * height * 0.055 + Math.sin(t * 13 + chain) * height * 0.018;
      if (step === 0) context.moveTo(px, py);
      else context.lineTo(px, py);
    }
    context.stroke();
  }

  for (let cross = 0; cross < 9; cross += 1) {
    const px = x + width * (0.12 + cross * 0.095);
    const py = y + height * (0.16 + ((cross * 37) % 70) / 100);
    context.strokeStyle = "rgba(94,234,212,0.18)";
    context.beginPath();
    context.moveTo(px - 5, py - 5);
    context.lineTo(px + 5, py + 5);
    context.moveTo(px + 5, py - 5);
    context.lineTo(px - 5, py + 5);
    context.stroke();
  }
  context.restore();
}

function drawCompositeWindow(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, time: number) {
  context.save();
  context.beginPath();
  context.rect(x, y, width, height);
  context.clip();
  context.fillStyle = "rgba(35,47,59,0.36)";
  context.fillRect(x, y, width, height);

  const angle = -0.28;
  const spacing = Math.max(23, width / 10);
  const drift = Math.sin(time * 0.012) * 2;
  context.translate(x + width / 2, y + height / 2);
  context.rotate(angle);
  for (let row = -8; row <= 8; row += 1) {
    const py = row * spacing + drift;
    context.strokeStyle = row % 2 === 0 ? "rgba(94,234,212,0.30)" : "rgba(56,189,248,0.24)";
    context.lineWidth = row % 2 === 0 ? 4.5 : 3.2;
    context.beginPath();
    context.moveTo(-width, py);
    context.lineTo(width, py);
    context.stroke();
    context.strokeStyle = "rgba(226,232,240,0.12)";
    context.lineWidth = 0.8;
    context.beginPath();
    context.moveTo(-width, py - 5);
    context.lineTo(width, py - 5);
    context.stroke();
  }
  context.restore();
}

function drawScan(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  const progress = (Math.sin(time * 0.055) + 1) / 2;
  const x = cx - radius + progress * radius * 2;
  const beam = context.createLinearGradient(x - radius * 0.10, 0, x + radius * 0.10, 0);
  beam.addColorStop(0, "rgba(125,211,252,0)");
  beam.addColorStop(0.45, "rgba(125,211,252,0.025)");
  beam.addColorStop(0.50, "rgba(226,232,240,0.14)");
  beam.addColorStop(0.55, "rgba(167,139,250,0.025)");
  beam.addColorStop(1, "rgba(125,211,252,0)");
  context.fillStyle = beam;
  context.fillRect(x - radius * 0.10, cy - radius, radius * 0.20, radius * 2);
  context.strokeStyle = "rgba(226,232,240,0.22)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(x, cy - radius * 0.93);
  context.lineTo(x, cy + radius * 0.93);
  context.stroke();
}

function drawWindowLabels(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  context.save();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(226,232,240,0.32)";
  const labels = [
    { text: "GRAINS / PHASES", x: cx - radius * 0.80, y: cy - radius * 0.77 },
    { text: "LATTICE / DEFECTS", x: cx + radius * 0.08, y: cy - radius * 0.77 },
    { text: "CHAINS / CROSSLINKS", x: cx - radius * 0.80, y: cy + radius * 0.86 },
    { text: "FIBERS / MATRIX", x: cx + radius * 0.08, y: cy + radius * 0.86 },
  ];
  labels.forEach((label) => context.fillText(label.text, label.x, label.y));
  context.restore();
}

function drawSpecimenNotes(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 850) return;
  const x = width * 0.045;
  const y = height * 0.27;
  const w = 238;
  const h = 142;
  context.save();
  context.strokeStyle = "rgba(148,163,184,0.13)";
  context.fillStyle = "rgba(203,213,225,0.26)";
  context.strokeRect(x, y, w, h);
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ["MICROSTRUCTURE ATLAS", "4 SCHEMATIC WINDOWS", "NOT ONE PHYSICAL SPECIMEN", "PROCESS → STRUCTURE", "STRUCTURE → PROPERTIES"].forEach((line, index) => context.fillText(line, x + 13, y + 24 + index * 20));
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.64, height * 0.54, Math.min(width, height) * 0.20, width * 0.64, height * 0.54, Math.max(width, height) * 0.78);
  vignette.addColorStop(0, "rgba(2,6,23,0)");
  vignette.addColorStop(1, "rgba(2,6,8,0.62)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
