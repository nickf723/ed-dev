"use client";

import { useEffect, useRef } from "react";

export default function CultureStream() {
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
      draw(37);
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
      drawWall(context, width, height);
      drawPinnedCommons(context, width, height);
      drawThreads(context, width, height);
      drawReadingLight(context, width, height, reducedMotion ? 37 : time);
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

function drawWall(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#140d11");
  gradient.addColorStop(0.46, "#181019");
  gradient.addColorStop(1, "#0e1116");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.fillStyle = "rgba(255,255,255,0.012)";
  for (let y = 0; y < height; y += 8) context.fillRect(0, y, width, 1);
}

function drawPinnedCommons(context: CanvasRenderingContext2D, width: number, height: number) {
  const scale = Math.min(width / 1440, height / 900);
  const cx = width * (width < 900 ? 0.58 : 0.62);
  const cy = height * 0.50;

  context.save();
  context.translate(cx, cy);
  context.scale(scale, scale);

  paper(context, -390, -250, 220, 145, -0.045, "rgba(251,113,133,0.065)", "POSTER / PUBLIC NOTICE");
  posterMarks(context, -370, -225);

  paper(context, -128, -275, 255, 170, 0.028, "rgba(34,211,238,0.045)", "MAP / PLACE / ROUTE");
  mapFragment(context, -102, -235);

  paper(context, 168, -235, 190, 132, -0.026, "rgba(251,191,36,0.050)", "RECIPE / MEMORY / PRACTICE");
  recipeCard(context, 190, -205);

  textile(context, -365, -40, 188, 154);
  photoFrame(context, -120, -60, 190, 150);
  ticket(context, 112, -32, 210, 82);
  digitalPane(context, 130, 92, 238, 158);
  zine(context, -345, 145, 205, 122);
  archiveLabel(context, -85, 130, 165, 110);

  context.restore();
}

function paper(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rotation: number, tint: string, title: string) {
  context.save();
  context.translate(x + w / 2, y + h / 2);
  context.rotate(rotation);
  context.fillStyle = "rgba(250,250,249,0.026)";
  context.strokeStyle = "rgba(255,255,255,0.07)";
  context.fillRect(-w / 2, -h / 2, w, h);
  context.fillStyle = tint;
  context.fillRect(-w / 2, -h / 2, w, h);
  context.strokeRect(-w / 2, -h / 2, w, h);
  pin(context, -w / 2 + 15, -h / 2 + 14);
  pin(context, w / 2 - 15, -h / 2 + 14);
  label(context, title, -w / 2 + 14, -h / 2 + 28, "rgba(231,229,228,0.18)");
  context.restore();
}

function posterMarks(context: CanvasRenderingContext2D, x: number, y: number) {
  context.fillStyle = "rgba(251,113,133,0.11)";
  context.fillRect(x, y + 17, 136, 10);
  context.fillRect(x, y + 40, 92, 6);
  context.fillRect(x, y + 57, 154, 5);
  context.fillRect(x, y + 74, 112, 5);
}

function mapFragment(context: CanvasRenderingContext2D, x: number, y: number) {
  context.strokeStyle = "rgba(34,211,238,0.13)";
  context.lineWidth = 1.2;
  context.beginPath();
  context.moveTo(x, y + 74);
  context.bezierCurveTo(x + 35, y + 10, x + 95, y + 110, x + 175, y + 38);
  context.stroke();
  [[8,68],[62,49],[105,75],[171,39]].forEach(([px, py]) => {
    context.beginPath(); context.arc(x + px, y + py, 3, 0, Math.PI * 2); context.fillStyle = "rgba(103,232,249,0.16)"; context.fill();
  });
}

function recipeCard(context: CanvasRenderingContext2D, x: number, y: number) {
  context.strokeStyle = "rgba(251,191,36,0.11)";
  for (let row = 0; row < 4; row += 1) {
    context.beginPath();
    context.moveTo(x, y + row * 18);
    context.lineTo(x + 132 - row * 9, y + row * 18);
    context.stroke();
  }
  context.beginPath(); context.arc(x + 142, y + 34, 15, 0, Math.PI * 2); context.stroke();
}

function textile(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  context.fillStyle = "rgba(244,114,182,0.032)";
  context.strokeStyle = "rgba(244,114,182,0.09)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  for (let row = 0; row < 5; row += 1) {
    for (let col = 0; col < 6; col += 1) {
      context.beginPath();
      context.moveTo(x + 10 + col * 29, y + 12 + row * 27);
      context.lineTo(x + 22 + col * 29, y + 24 + row * 27);
      context.lineTo(x + 10 + col * 29, y + 36 + row * 27);
      context.lineTo(x - 2 + col * 29, y + 24 + row * 27);
      context.closePath();
      context.stroke();
    }
  }
  label(context, "TEXTILE / PATTERN / MAKING", x + 8, y + h + 18, "rgba(244,114,182,0.17)");
}

function photoFrame(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  context.fillStyle = "rgba(255,255,255,0.018)";
  context.strokeStyle = "rgba(226,232,240,0.065)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  context.strokeStyle = "rgba(148,163,184,0.09)";
  context.beginPath();
  context.moveTo(x + 18, y + h - 26);
  context.quadraticCurveTo(x + 66, y + 56, x + 104, y + h - 45);
  context.quadraticCurveTo(x + 137, y + 75, x + w - 16, y + h - 31);
  context.stroke();
  context.beginPath(); context.arc(x + 58, y + 48, 21, 0, Math.PI * 2); context.stroke();
  label(context, "PHOTO / MEMORY / WHO IS FRAMED?", x + 9, y + h + 18, "rgba(226,232,240,0.14)");
}

function ticket(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  context.save();
  context.rotate(-0.035);
  context.fillStyle = "rgba(251,146,60,0.030)";
  context.strokeStyle = "rgba(251,146,60,0.10)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  context.setLineDash([5,5]);
  context.beginPath(); context.moveTo(x + w * 0.68, y); context.lineTo(x + w * 0.68, y + h); context.stroke();
  context.setLineDash([]);
  label(context, "VENUE / EVENT / AUDIENCE", x + 12, y + 27, "rgba(253,186,116,0.17)");
  label(context, "ADMIT ONE?  WHO GETS ACCESS?", x + 12, y + 54, "rgba(214,211,209,0.10)");
  context.restore();
}

function digitalPane(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  context.fillStyle = "rgba(34,211,238,0.018)";
  context.strokeStyle = "rgba(34,211,238,0.08)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  context.strokeStyle = "rgba(34,211,238,0.075)";
  context.strokeRect(x + 14, y + 18, 55, 55);
  for (let row = 0; row < 4; row += 1) {
    context.beginPath(); context.moveTo(x + 84, y + 25 + row * 18); context.lineTo(x + w - 16 - row * 9, y + 25 + row * 18); context.stroke();
  }
  context.beginPath(); context.moveTo(x + 15, y + 100); context.lineTo(x + w - 18, y + 100); context.stroke();
  label(context, "DIGITAL / PLATFORM / CIRCULATION", x + 12, y + h + 18, "rgba(103,232,249,0.15)");
}

function zine(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  context.save();
  context.rotate(0.03);
  context.fillStyle = "rgba(192,132,252,0.025)";
  context.strokeStyle = "rgba(192,132,252,0.09)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  context.fillStyle = "rgba(192,132,252,0.09)";
  context.fillRect(x + 12, y + 14, w - 24, 14);
  context.strokeStyle = "rgba(216,180,254,0.08)";
  for (let row = 0; row < 4; row += 1) { context.beginPath(); context.moveTo(x + 14, y + 45 + row * 15); context.lineTo(x + w - 18 - (row % 2) * 28, y + 45 + row * 15); context.stroke(); }
  label(context, "ZINE / SUBCULTURE / SELF-PUBLISHING", x + 10, y + h + 18, "rgba(216,180,254,0.15)");
  context.restore();
}

function archiveLabel(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  context.fillStyle = "rgba(148,163,184,0.020)";
  context.strokeStyle = "rgba(148,163,184,0.07)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  label(context, "ARCHIVE BOX", x + 12, y + 23, "rgba(203,213,225,0.15)");
  label(context, "ORIGIN", x + 12, y + 48, "rgba(148,163,184,0.11)");
  label(context, "DATE", x + 12, y + 66, "rgba(148,163,184,0.11)");
  label(context, "CONTEXT", x + 12, y + 84, "rgba(148,163,184,0.11)");
}

function drawThreads(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 760) return;
  context.strokeStyle = "rgba(251,113,133,0.055)";
  context.lineWidth = 1;
  const points = [
    [width * 0.33, height * 0.31], [width * 0.49, height * 0.36], [width * 0.60, height * 0.48], [width * 0.69, height * 0.61], [width * 0.45, height * 0.68],
  ] as const;
  context.beginPath();
  points.forEach(([x, y], index) => index === 0 ? context.moveTo(x, y) : context.lineTo(x, y));
  context.stroke();
  points.forEach(([x, y]) => { context.beginPath(); context.arc(x, y, 2.5, 0, Math.PI * 2); context.fillStyle = "rgba(251,113,133,0.11)"; context.fill(); });
}

function drawReadingLight(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const sweep = (Math.sin(time * 0.016) + 1) / 2;
  const x = width * (0.18 + sweep * 0.67);
  const beam = context.createRadialGradient(x, height * 0.46, 0, x, height * 0.46, Math.max(width, height) * 0.22);
  beam.addColorStop(0, "rgba(255,237,213,0.035)");
  beam.addColorStop(0.45, "rgba(255,237,213,0.014)");
  beam.addColorStop(1, "rgba(255,237,213,0)");
  context.fillStyle = beam;
  context.fillRect(0, 0, width, height);
}

function pin(context: CanvasRenderingContext2D, x: number, y: number) {
  context.beginPath();
  context.arc(x, y, 2.8, 0, Math.PI * 2);
  context.fillStyle = "rgba(251,191,36,0.22)";
  context.fill();
}

function label(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.60, height * 0.49, Math.min(width, height) * 0.15, width * 0.60, height * 0.49, Math.max(width, height) * 0.78);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.72, "rgba(8,5,9,0.16)");
  gradient.addColorStop(1, "rgba(8,5,9,0.72)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
