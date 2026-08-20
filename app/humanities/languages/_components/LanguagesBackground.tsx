"use client";

import { useEffect, useRef } from "react";

type Line = { y: number; width: number; indent: number; rgb: string };

const SOURCE_LINES: readonly Line[] = [
  { y: 0.18, width: 0.72, indent: 0.04, rgb: "216,180,254" },
  { y: 0.27, width: 0.58, indent: 0.11, rgb: "216,180,254" },
  { y: 0.36, width: 0.78, indent: 0.03, rgb: "216,180,254" },
  { y: 0.50, width: 0.63, indent: 0.08, rgb: "251,191,36" },
  { y: 0.59, width: 0.74, indent: 0.03, rgb: "251,191,36" },
  { y: 0.73, width: 0.55, indent: 0.13, rgb: "244,114,182" },
] as const;

const TARGET_LINES: readonly Line[] = [
  { y: 0.17, width: 0.62, indent: 0.07, rgb: "125,211,252" },
  { y: 0.29, width: 0.75, indent: 0.02, rgb: "125,211,252" },
  { y: 0.39, width: 0.55, indent: 0.13, rgb: "125,211,252" },
  { y: 0.52, width: 0.73, indent: 0.04, rgb: "94,234,212" },
  { y: 0.62, width: 0.59, indent: 0.11, rgb: "94,234,212" },
  { y: 0.75, width: 0.70, indent: 0.04, rgb: "244,114,182" },
] as const;

export default function LanguagesBackground() {
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
      draw(51);
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
      drawGround(context, width, height);
      drawDesk(context, width, height);
      drawPages(context, width, height);
      drawAlignment(context, width, height);
      drawGlossary(context, width, height);
      drawScriptRulers(context, width, height);
      drawReadingLight(context, width, height, reducedMotion ? 51 : time);
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
      <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-[#0a0c10]/92 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#0a0c10]/92 to-transparent" />
    </div>
  );
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0a0c10");
  gradient.addColorStop(0.52, "#12101a");
  gradient.addColorStop(1, "#110c12");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.62, height * 0.48, 0, width * 0.62, height * 0.48, Math.max(width, height) * 0.60);
  glow.addColorStop(0, "rgba(216,180,254,0.045)");
  glow.addColorStop(0.5, "rgba(251,191,36,0.014)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawDesk(context: CanvasRenderingContext2D, width: number, height: number) {
  const top = height * 0.20;
  const bottom = height * 0.82;
  const gradient = context.createLinearGradient(0, top, 0, bottom);
  gradient.addColorStop(0, "rgba(68,45,36,0.16)");
  gradient.addColorStop(1, "rgba(35,25,22,0.32)");
  context.fillStyle = gradient;
  context.fillRect(width * 0.04, top, width * 0.92, bottom - top);
  context.strokeStyle = "rgba(251,191,36,0.055)";
  context.strokeRect(width * 0.04, top, width * 0.92, bottom - top);
}

function drawPages(context: CanvasRenderingContext2D, width: number, height: number) {
  const pageTop = height * 0.25;
  const pageH = height * 0.50;
  const gap = Math.max(18, width * 0.018);
  const pageW = Math.min(width * 0.30, 430);
  const center = width * (width < 900 ? 0.60 : 0.64);
  const sourceX = center - pageW - gap / 2;
  const targetX = center + gap / 2;

  drawPaper(context, sourceX, pageTop, pageW, pageH, "SOURCE TEXT", "rgba(216,180,254,0.20)");
  drawPaper(context, targetX, pageTop, pageW, pageH, "TARGET TEXT", "rgba(125,211,252,0.20)");
  drawLineSet(context, sourceX, pageTop, pageW, pageH, SOURCE_LINES);
  drawLineSet(context, targetX, pageTop, pageW, pageH, TARGET_LINES);

  context.strokeStyle = "rgba(251,191,36,0.12)";
  context.setLineDash([3, 5]);
  context.beginPath();
  context.moveTo(center, pageTop + 20);
  context.lineTo(center, pageTop + pageH - 20);
  context.stroke();
  context.setLineDash([]);
  label(context, "ALIGNMENT", center - 26, pageTop + pageH + 18, "rgba(251,191,36,0.20)");
}

function drawPaper(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, title: string, edge: string) {
  context.fillStyle = "rgba(246,240,230,0.035)";
  context.strokeStyle = edge;
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  context.fillStyle = "rgba(245,245,244,0.14)";
  context.fillRect(x + 18, y + 22, w - 36, 1);
  label(context, title, x + 18, y + 16, edge.replace(/0\.\d+\)/, "0.58)"));
}

function drawLineSet(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, lines: readonly Line[]) {
  lines.forEach((line, index) => {
    const yy = y + h * line.y;
    const xx = x + w * line.indent;
    const ww = w * line.width;
    context.strokeStyle = `rgba(${line.rgb},${0.11 + (index % 3) * 0.025})`;
    context.lineWidth = index % 2 === 0 ? 2 : 1.2;
    context.beginPath();
    context.moveTo(xx, yy);
    context.lineTo(xx + ww, yy);
    context.stroke();
    if (index === 2 || index === 4) {
      context.fillStyle = `rgba(${line.rgb},0.08)`;
      context.fillRect(xx + ww * 0.15, yy + 7, ww * 0.28, 13);
    }
  });
}

function drawAlignment(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 700) return;
  const pageTop = height * 0.25;
  const pageH = height * 0.50;
  const gap = Math.max(18, width * 0.018);
  const pageW = Math.min(width * 0.30, 430);
  const center = width * (width < 900 ? 0.60 : 0.64);
  const sourceX = center - pageW - gap / 2;
  const targetX = center + gap / 2;
  const pairs = [[0,0], [1,1], [2,2], [3,3], [4,4], [5,5]] as const;

  pairs.forEach(([a, b], index) => {
    const sy = pageTop + pageH * SOURCE_LINES[a].y;
    const ty = pageTop + pageH * TARGET_LINES[b].y;
    context.strokeStyle = index % 2 === 0 ? "rgba(216,180,254,0.07)" : "rgba(125,211,252,0.07)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(sourceX + pageW - 8, sy);
    context.bezierCurveTo(center - 10, sy, center + 10, ty, targetX + 8, ty);
    context.stroke();
  });
}

function drawGlossary(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 820) return;
  const x = width * 0.055;
  const y = height * 0.33;
  const w = Math.min(220, width * 0.17);
  const entries = [
    ["REGISTER", "formal · familiar"],
    ["IDIOM", "meaning ≠ word sum"],
    ["GLOSS", "structure aid"],
    ["CONTEXT", "speaker · goal · setting"],
  ] as const;
  label(context, "TRANSLATOR'S MARGIN", x, y - 18, "rgba(244,114,182,0.24)");
  entries.forEach(([term, note], index) => {
    const yy = y + index * 58;
    context.fillStyle = "rgba(12,12,18,0.24)";
    context.strokeStyle = "rgba(244,114,182,0.09)";
    context.fillRect(x, yy, w, 44);
    context.strokeRect(x, yy, w, 44);
    label(context, term, x + 10, yy + 17, "rgba(244,114,182,0.28)");
    label(context, note, x + 10, yy + 33, "rgba(214,211,209,0.17)");
  });
}

function drawScriptRulers(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 760) return;
  const y = height * 0.79;
  const entries = [
    ["LTR", "Latin · Cyrillic · Devanagari"],
    ["RTL", "Arabic · Hebrew"],
    ["MIXED", "scripts + numerals + borrowed text"],
    ["VISUAL", "signed languages are not writing systems"],
  ] as const;
  const start = width * 0.20;
  const total = width * 0.68;
  const cell = total / entries.length;
  entries.forEach(([labelText, note], index) => {
    const x = start + index * cell;
    context.strokeStyle = "rgba(251,191,36,0.07)";
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + cell - 12, y);
    context.stroke();
    label(context, labelText, x, y + 17, "rgba(251,191,36,0.25)");
    label(context, note, x, y + 33, "rgba(214,211,209,0.14)");
  });
}

function drawReadingLight(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const sweep = (Math.sin(time * 0.018) + 1) / 2;
  const x = width * (0.23 + sweep * 0.65);
  const beam = context.createLinearGradient(x - 95, 0, x + 95, 0);
  beam.addColorStop(0, "rgba(251,191,36,0)");
  beam.addColorStop(0.5, "rgba(251,191,36,0.022)");
  beam.addColorStop(1, "rgba(251,191,36,0)");
  context.fillStyle = beam;
  context.fillRect(x - 95, height * 0.20, 190, height * 0.64);
}

function label(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.58, height * 0.48, Math.min(width, height) * 0.18, width * 0.58, height * 0.48, Math.max(width, height) * 0.78);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.74, "rgba(4,4,8,0.14)");
  gradient.addColorStop(1, "rgba(4,4,8,0.64)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
