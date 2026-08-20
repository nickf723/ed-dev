"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function PlaybookBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.05 : 1.35);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(47);
    };

    const onVisibility = () => {
      paused = document.hidden;
      if (!paused && !reducedMotion) frame = requestAnimationFrame(loop);
    };

    const loop = (now: number) => {
      if (paused) return;
      draw(now / 1000);
      frame = requestAnimationFrame(loop);
    };

    const draw = (time: number) => {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawGround(context, width, height);
      drawStadium(context, width, height);
      drawSurfacePalimpsest(context, width, height);
      drawTechnicalNotes(context, width, height);
      drawTacticalTrace(context, width, height, reducedMotion ? 47 : time);
      drawFloodlight(context, width, height, reducedMotion ? 47 : time);
      drawVignette(context, width, height);
    };

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

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" aria-hidden="true" />;
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#06110d");
  gradient.addColorStop(0.48, "#081410");
  gradient.addColorStop(1, "#0b1015");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.58, height * 0.48, 0, width * 0.58, height * 0.48, Math.max(width, height) * 0.62);
  glow.addColorStop(0, "rgba(52,211,153,0.055)");
  glow.addColorStop(0.48, "rgba(249,115,22,0.018)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawStadium(context: CanvasRenderingContext2D, width: number, height: number) {
  const cx = width * (width < 900 ? 0.56 : 0.62);
  const cy = height * 0.50;
  const rx = Math.min(width * 0.43, height * 0.70);
  const ry = Math.min(height * 0.36, width * 0.24);

  context.save();
  context.translate(cx, cy);

  for (let ring = 0; ring < 4; ring += 1) {
    context.beginPath();
    context.ellipse(0, 0, rx + ring * 22, ry + ring * 16, 0, 0, Math.PI * 2);
    context.strokeStyle = `rgba(226,232,240,${0.035 - ring * 0.005})`;
    context.lineWidth = 1;
    context.stroke();
  }

  for (let section = 0; section < 24; section += 1) {
    const angle = (section / 24) * Math.PI * 2;
    const x1 = Math.cos(angle) * (rx + 8);
    const y1 = Math.sin(angle) * (ry + 6);
    const x2 = Math.cos(angle) * (rx + 67);
    const y2 = Math.sin(angle) * (ry + 45);
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = "rgba(148,163,184,0.025)";
    context.stroke();
  }

  context.restore();
}

function drawSurfacePalimpsest(context: CanvasRenderingContext2D, width: number, height: number) {
  const cx = width * (width < 900 ? 0.56 : 0.62);
  const cy = height * 0.50;
  const fieldW = Math.min(width * 0.60, height * 1.08);
  const fieldH = fieldW * 0.53;
  const left = cx - fieldW / 2;
  const top = cy - fieldH / 2;

  context.fillStyle = "rgba(16,185,129,0.025)";
  context.strokeStyle = "rgba(110,231,183,0.13)";
  context.lineWidth = 1.1;
  roundedRect(context, left, top, fieldW, fieldH, 16);
  context.fill();
  context.stroke();

  context.strokeStyle = "rgba(110,231,183,0.10)";
  context.beginPath();
  context.moveTo(cx, top);
  context.lineTo(cx, top + fieldH);
  context.stroke();

  context.beginPath();
  context.arc(cx, cy, fieldH * 0.16, 0, Math.PI * 2);
  context.stroke();

  const boxW = fieldW * 0.17;
  const boxH = fieldH * 0.50;
  context.strokeRect(left, cy - boxH / 2, boxW, boxH);
  context.strokeRect(left + fieldW - boxW, cy - boxH / 2, boxW, boxH);

  context.strokeStyle = "rgba(251,191,36,0.085)";
  context.setLineDash([7, 8]);
  for (let x = left + fieldW * 0.1; x < left + fieldW; x += fieldW * 0.1) {
    context.beginPath();
    context.moveTo(x, top);
    context.lineTo(x, top + fieldH);
    context.stroke();
  }
  context.setLineDash([]);

  context.strokeStyle = "rgba(96,165,250,0.085)";
  const courtW = fieldW * 0.54;
  const courtH = fieldH * 0.80;
  const courtLeft = cx - courtW / 2;
  const courtTop = cy - courtH / 2;
  context.strokeRect(courtLeft, courtTop, courtW, courtH);
  context.beginPath();
  context.arc(cx, cy, courtH * 0.13, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.arc(courtLeft + courtW * 0.08, cy, courtH * 0.28, -Math.PI / 2, Math.PI / 2);
  context.stroke();
  context.beginPath();
  context.arc(courtLeft + courtW * 0.92, cy, courtH * 0.28, Math.PI / 2, Math.PI * 1.5);
  context.stroke();

  context.strokeStyle = "rgba(244,114,182,0.055)";
  context.beginPath();
  context.ellipse(cx, cy, fieldW * 0.43, fieldH * 0.68, 0, 0, Math.PI * 2);
  context.stroke();

  const benchY = top + fieldH + 24;
  context.strokeStyle = "rgba(226,232,240,0.055)";
  context.strokeRect(cx - fieldW * 0.18, benchY, fieldW * 0.36, 13);
  label(context, "TECHNICAL AREA", cx - 38, benchY + 31, "rgba(226,232,240,0.12)");
  label(context, "RULES CREATE THE PLAYING SPACE", left + 10, top - 16, "rgba(110,231,183,0.19)");
}

function drawTechnicalNotes(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 880) return;
  const x = width * 0.055;
  const y = height * 0.25;
  const notes = [
    ["RULES", "define legal action"],
    ["SKILL", "solves movement problems"],
    ["TACTICS", "shape space and time"],
    ["TRAINING", "changes capacity"],
    ["CULTURE", "gives competition meaning"],
  ] as const;

  label(context, "COACHING BOARD · FIVE LENSES", x, y - 22, "rgba(251,191,36,0.20)");
  notes.forEach(([term, detail], index) => {
    const yy = y + index * 48;
    context.fillStyle = index === 2 ? "rgba(249,115,22,0.055)" : "rgba(255,255,255,0.018)";
    context.strokeStyle = index === 2 ? "rgba(249,115,22,0.16)" : "rgba(255,255,255,0.045)";
    context.fillRect(x, yy, 184, 34);
    context.strokeRect(x, yy, 184, 34);
    label(context, term, x + 9, yy + 14, index === 2 ? "rgba(253,186,116,0.32)" : "rgba(226,232,240,0.18)");
    label(context, detail, x + 9, yy + 27, "rgba(148,163,184,0.13)");
  });
}

function drawTacticalTrace(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const cx = width * (width < 900 ? 0.56 : 0.62);
  const cy = height * 0.50;
  const fieldW = Math.min(width * 0.60, height * 1.08);
  const fieldH = fieldW * 0.53;
  const left = cx - fieldW / 2;
  const top = cy - fieldH / 2;

  const route: Point[] = [
    { x: left + fieldW * 0.25, y: top + fieldH * 0.68 },
    { x: left + fieldW * 0.39, y: top + fieldH * 0.58 },
    { x: left + fieldW * 0.52, y: top + fieldH * 0.39 },
    { x: left + fieldW * 0.70, y: top + fieldH * 0.31 },
    { x: left + fieldW * 0.82, y: top + fieldH * 0.42 },
  ];

  context.strokeStyle = "rgba(249,115,22,0.22)";
  context.lineWidth = 1.6;
  context.setLineDash([8, 7]);
  context.beginPath();
  route.forEach((point, index) => {
    if (index === 0) context.moveTo(point.x, point.y);
    else context.lineTo(point.x, point.y);
  });
  context.stroke();
  context.setLineDash([]);

  const progress = (Math.sin(time * 0.055) + 1) / 2;
  const position = pointOnPolyline(route, progress);
  context.fillStyle = "rgba(251,146,60,0.75)";
  context.shadowBlur = 12;
  context.shadowColor = "rgba(249,115,22,0.6)";
  context.beginPath();
  context.arc(position.x, position.y, 3.2, 0, Math.PI * 2);
  context.fill();
  context.shadowBlur = 0;

  const markers = [
    [0.25, 0.68, "1"],
    [0.39, 0.58, "2"],
    [0.52, 0.39, "3"],
    [0.70, 0.31, "4"],
  ] as const;
  markers.forEach(([px, py, text]) => {
    context.strokeStyle = "rgba(96,165,250,0.24)";
    context.beginPath();
    context.arc(left + fieldW * px, top + fieldH * py, 7, 0, Math.PI * 2);
    context.stroke();
    label(context, text, left + fieldW * px - 2, top + fieldH * py + 3, "rgba(191,219,254,0.24)");
  });
}

function drawFloodlight(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const sweep = (Math.sin(time * 0.018) + 1) / 2;
  const x = width * (0.20 + sweep * 0.64);
  const beam = context.createLinearGradient(x - 170, 0, x + 170, 0);
  beam.addColorStop(0, "rgba(240,253,250,0)");
  beam.addColorStop(0.48, "rgba(240,253,250,0.022)");
  beam.addColorStop(0.52, "rgba(240,253,250,0.022)");
  beam.addColorStop(1, "rgba(240,253,250,0)");
  context.fillStyle = beam;
  context.fillRect(x - 170, height * 0.10, 340, height * 0.80);
}

function pointOnPolyline(points: readonly Point[], progress: number): Point {
  if (points.length < 2) return points[0] ?? { x: 0, y: 0 };
  const lengths = points.slice(1).map((point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let target = total * progress;
  for (let index = 0; index < lengths.length; index += 1) {
    if (target <= lengths[index]) {
      const start = points[index];
      const end = points[index + 1];
      const local = lengths[index] === 0 ? 0 : target / lengths[index];
      return { x: start.x + (end.x - start.x) * local, y: start.y + (end.y - start.y) * local };
    }
    target -= lengths[index];
  }
  return points[points.length - 1];
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + width - r, y);
  context.quadraticCurveTo(x + width, y, x + width, y + r);
  context.lineTo(x + width, y + height - r);
  context.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  context.lineTo(x + r, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
}

function label(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.58, height * 0.50, Math.min(width, height) * 0.12, width * 0.58, height * 0.50, Math.max(width, height) * 0.78);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.72, "rgba(1,7,5,0.12)");
  gradient.addColorStop(1, "rgba(1,7,5,0.68)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
