"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function CytologyBackground() {
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
      draw(17);
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
      drawExtracellularField(context, width, height);
      drawCellBoundary(context, width, height);
      drawNucleus(context, width, height);
      drawERAndGolgi(context, width, height);
      drawMitochondria(context, width, height);
      drawCytoskeleton(context, width, height);
      drawTransport(context, width, height, reducedMotion ? 17 : time);
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

function geometry(width: number, height: number) {
  const cx = width * (width < 900 ? 0.58 : 0.62);
  const cy = height * 0.52;
  const rx = Math.min(width * 0.43, height * 0.63);
  const ry = Math.min(height * 0.37, width * 0.28);
  return { cx, cy, rx, ry };
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#03100c");
  gradient.addColorStop(0.48, "#04130f");
  gradient.addColorStop(1, "#07101a");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.61, height * 0.50, 0, width * 0.61, height * 0.50, Math.max(width, height) * 0.58);
  glow.addColorStop(0, "rgba(52,211,153,0.045)");
  glow.addColorStop(0.42, "rgba(34,211,238,0.018)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawExtracellularField(context: CanvasRenderingContext2D, width: number, height: number) {
  context.strokeStyle = "rgba(45,212,191,0.025)";
  context.lineWidth = 1;
  for (let y = 0; y < height; y += 48) {
    context.beginPath();
    context.moveTo(0, y);
    context.bezierCurveTo(width * 0.22, y + 9, width * 0.48, y - 11, width, y + 4);
    context.stroke();
  }
  if (width < 860) return;
  const cells = [
    { x: width * 0.09, y: height * 0.21, rx: 72, ry: 45 },
    { x: width * 0.12, y: height * 0.75, rx: 92, ry: 58 },
    { x: width * 0.91, y: height * 0.18, rx: 84, ry: 51 },
  ];
  cells.forEach((cell) => {
    context.beginPath();
    context.ellipse(cell.x, cell.y, cell.rx, cell.ry, -0.18, 0, Math.PI * 2);
    context.fillStyle = "rgba(52,211,153,0.012)";
    context.strokeStyle = "rgba(52,211,153,0.045)";
    context.fill(); context.stroke();
  });
  label(context, "EXTRACELLULAR SPACE", width * 0.055, height * 0.14, "rgba(94,234,212,0.10)");
}

function drawCellBoundary(context: CanvasRenderingContext2D, width: number, height: number) {
  const { cx, cy, rx, ry } = geometry(width, height);
  context.beginPath();
  context.ellipse(cx, cy, rx, ry, -0.045, 0, Math.PI * 2);
  context.fillStyle = "rgba(16,185,129,0.020)";
  context.strokeStyle = "rgba(52,211,153,0.21)";
  context.lineWidth = 3;
  context.fill();
  context.stroke();

  context.beginPath();
  context.ellipse(cx, cy, rx - 7, ry - 7, -0.045, 0, Math.PI * 2);
  context.strokeStyle = "rgba(110,231,183,0.085)";
  context.lineWidth = 1;
  context.stroke();
  label(context, "PLASMA MEMBRANE", cx + rx * 0.60, cy - ry * 0.72, "rgba(110,231,183,0.15)");
}

function drawNucleus(context: CanvasRenderingContext2D, width: number, height: number) {
  const { cx, cy, rx, ry } = geometry(width, height);
  const nx = cx - rx * 0.22;
  const ny = cy - ry * 0.04;
  const nr = Math.min(rx, ry) * 0.36;

  const fill = context.createRadialGradient(nx - nr * 0.18, ny - nr * 0.18, nr * 0.12, nx, ny, nr);
  fill.addColorStop(0, "rgba(216,180,254,0.10)");
  fill.addColorStop(1, "rgba(88,28,135,0.035)");
  context.fillStyle = fill;
  context.strokeStyle = "rgba(192,132,252,0.22)";
  context.lineWidth = 2;
  context.beginPath(); context.arc(nx, ny, nr, 0, Math.PI * 2); context.fill(); context.stroke();
  context.beginPath(); context.arc(nx, ny, nr - 7, 0, Math.PI * 2); context.strokeStyle = "rgba(216,180,254,0.075)"; context.stroke();

  context.strokeStyle = "rgba(216,180,254,0.075)";
  for (let strand = 0; strand < 5; strand += 1) {
    context.beginPath();
    for (let step = 0; step <= 32; step += 1) {
      const t = step / 32;
      const x = nx - nr * 0.62 + t * nr * 1.22;
      const y = ny - nr * 0.42 + strand * nr * 0.20 + Math.sin(t * Math.PI * 3 + strand) * nr * 0.06;
      if (step === 0) context.moveTo(x, y); else context.lineTo(x, y);
    }
    context.stroke();
  }

  context.beginPath(); context.arc(nx + nr * 0.22, ny - nr * 0.12, nr * 0.18, 0, Math.PI * 2); context.fillStyle = "rgba(233,213,255,0.08)"; context.fill();
  label(context, "NUCLEUS", nx - nr * 0.36, ny + nr + 18, "rgba(216,180,254,0.16)");
}

function drawERAndGolgi(context: CanvasRenderingContext2D, width: number, height: number) {
  const { cx, cy, rx, ry } = geometry(width, height);
  const erX = cx - rx * 0.03;
  const erY = cy - ry * 0.08;
  context.strokeStyle = "rgba(96,165,250,0.14)";
  context.lineWidth = 2;
  for (let band = 0; band < 6; band += 1) {
    context.beginPath();
    const offset = (band - 2.5) * 16;
    context.moveTo(erX - rx * 0.20, erY + offset);
    context.bezierCurveTo(erX - rx * 0.06, erY - 31 + offset, erX + rx * 0.13, erY + 31 + offset, erX + rx * 0.25, erY + offset);
    context.stroke();
    for (let dot = 0; dot < 7; dot += 1) {
      const t = dot / 6;
      const x = erX - rx * 0.17 + t * rx * 0.38;
      const y = erY + offset + Math.sin(t * Math.PI * 2 + band) * 9;
      context.beginPath(); context.arc(x, y, 1.6, 0, Math.PI * 2); context.fillStyle = "rgba(190,242,100,0.20)"; context.fill();
    }
  }
  label(context, "ROUGH ER + RIBOSOMES", erX - rx * 0.16, erY - 78, "rgba(147,197,253,0.14)");

  const gx = cx + rx * 0.35;
  const gy = cy + ry * 0.03;
  for (let layer = 0; layer < 6; layer += 1) {
    const y = gy + (layer - 2.5) * 12;
    context.beginPath();
    context.arc(gx, y, 54 - Math.abs(layer - 2.5) * 4, Math.PI * 0.16, Math.PI * 0.84);
    context.strokeStyle = "rgba(244,114,182,0.18)";
    context.lineWidth = 3;
    context.stroke();
  }
  [[-55,-31],[-60,18],[59,-23],[55,34]].forEach(([dx,dy]) => { context.beginPath(); context.arc(gx + dx, gy + dy, 5, 0, Math.PI * 2); context.fillStyle = "rgba(244,114,182,0.09)"; context.fill(); context.strokeStyle = "rgba(244,114,182,0.16)"; context.stroke(); });
  label(context, "GOLGI", gx - 24, gy + 87, "rgba(249,168,212,0.15)");
}

function drawMitochondria(context: CanvasRenderingContext2D, width: number, height: number) {
  const { cx, cy, rx, ry } = geometry(width, height);
  const mitochondria = [
    { x: cx + rx * 0.18, y: cy - ry * 0.48, a: -0.42 },
    { x: cx + rx * 0.56, y: cy + ry * 0.41, a: 0.22 },
    { x: cx - rx * 0.48, y: cy + ry * 0.46, a: -0.15 },
  ];
  mitochondria.forEach((m) => {
    context.save(); context.translate(m.x, m.y); context.rotate(m.a);
    roundedRect(context, -38, -17, 76, 34, 17);
    context.fillStyle = "rgba(251,191,36,0.055)"; context.strokeStyle = "rgba(251,191,36,0.18)"; context.fill(); context.stroke();
    context.strokeStyle = "rgba(253,230,138,0.13)";
    context.beginPath(); context.moveTo(-25,0); context.bezierCurveTo(-12,-12,-5,12,6,0); context.bezierCurveTo(15,-12,22,12,29,0); context.stroke();
    context.restore();
  });
  label(context, "MITOCHONDRIA", cx + rx * 0.32, cy + ry * 0.58, "rgba(253,230,138,0.13)");
}

function drawCytoskeleton(context: CanvasRenderingContext2D, width: number, height: number) {
  const { cx, cy, rx, ry } = geometry(width, height);
  const origin = { x: cx - rx * 0.12, y: cy + ry * 0.06 };
  const ends: Point[] = [
    { x: cx + rx * 0.73, y: cy - ry * 0.36 },
    { x: cx + rx * 0.77, y: cy + ry * 0.32 },
    { x: cx - rx * 0.67, y: cy + ry * 0.55 },
    { x: cx - rx * 0.61, y: cy - ry * 0.46 },
    { x: cx + rx * 0.13, y: cy + ry * 0.72 },
  ];
  context.strokeStyle = "rgba(34,211,238,0.075)";
  context.lineWidth = 1.5;
  ends.forEach((end, index) => {
    context.beginPath(); context.moveTo(origin.x, origin.y); context.quadraticCurveTo((origin.x + end.x) / 2 + (index - 2) * 14, (origin.y + end.y) / 2 - 18, end.x, end.y); context.stroke();
  });
  label(context, "MICROTUBULE TRACKS", cx + rx * 0.39, cy - ry * 0.60, "rgba(103,232,249,0.11)");
}

function drawTransport(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const { cx, cy, rx, ry } = geometry(width, height);
  const path: Point[] = [
    { x: cx + rx * 0.05, y: cy - ry * 0.08 },
    { x: cx + rx * 0.17, y: cy - ry * 0.20 },
    { x: cx + rx * 0.28, y: cy - ry * 0.12 },
    { x: cx + rx * 0.36, y: cy + ry * 0.01 },
  ];
  context.strokeStyle = "rgba(244,114,182,0.10)";
  context.setLineDash([5,7]);
  context.beginPath(); path.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y)); context.stroke(); context.setLineDash([]);

  const progress = (Math.sin(time * 0.06) + 1) / 2;
  const p = pointOnPolyline(path, progress);
  context.beginPath(); context.arc(p.x, p.y, 4.2, 0, Math.PI * 2); context.fillStyle = "rgba(244,114,182,0.66)"; context.shadowBlur = 11; context.shadowColor = "rgba(244,114,182,0.52)"; context.fill(); context.shadowBlur = 0;
  context.beginPath(); context.arc(p.x, p.y, 7.5, 0, Math.PI * 2); context.strokeStyle = "rgba(244,114,182,0.18)"; context.stroke();
  label(context, "SLOW TRANSPORT EXAMPLE", cx + rx * 0.12, cy - ry * 0.30, "rgba(249,168,212,0.11)");
}

function pointOnPolyline(points: readonly Point[], progress: number): Point {
  if (points.length < 2) return points[0] ?? { x: 0, y: 0 };
  const lengths = points.slice(1).map((point, index) => Math.hypot(point.x - points[index].x, point.y - points[index].y));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  let target = total * progress;
  for (let index = 0; index < lengths.length; index += 1) {
    if (target <= lengths[index]) {
      const start = points[index]; const end = points[index + 1]; const local = lengths[index] === 0 ? 0 : target / lengths[index];
      return { x: start.x + (end.x - start.x) * local, y: start.y + (end.y - start.y) * local };
    }
    target -= lengths[index];
  }
  return points[points.length - 1];
}

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath(); context.moveTo(x + r, y); context.lineTo(x + width - r, y); context.quadraticCurveTo(x + width, y, x + width, y + r); context.lineTo(x + width, y + height - r); context.quadraticCurveTo(x + width, y + height, x + width - r, y + height); context.lineTo(x + r, y + height); context.quadraticCurveTo(x, y + height, x, y + height - r); context.lineTo(x, y + r); context.quadraticCurveTo(x, y, x + r, y); context.closePath();
}

function label(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.61, height * 0.51, Math.min(width, height) * 0.13, width * 0.61, height * 0.51, Math.max(width, height) * 0.79);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.74, "rgba(1,8,6,0.13)");
  gradient.addColorStop(1, "rgba(1,8,6,0.72)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
