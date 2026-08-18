"use client";

import { useEffect, useRef } from "react";

type Line = { x: number; y: number; w: number; emphasis?: boolean };

const PROSE_LINES: Line[] = [
  { x: 0.00, y: 0.00, w: 0.86 }, { x: 0.00, y: 0.07, w: 0.94 }, { x: 0.00, y: 0.14, w: 0.76 },
  { x: 0.00, y: 0.21, w: 0.90 }, { x: 0.00, y: 0.28, w: 0.83 }, { x: 0.00, y: 0.35, w: 0.96 },
  { x: 0.00, y: 0.42, w: 0.70 }, { x: 0.00, y: 0.49, w: 0.89 }, { x: 0.00, y: 0.56, w: 0.81 },
  { x: 0.00, y: 0.63, w: 0.93 }, { x: 0.00, y: 0.70, w: 0.74 }, { x: 0.00, y: 0.77, w: 0.90 },
];

const VERSE_LINES: Line[] = [
  { x: 0.05, y: 0.00, w: 0.52 }, { x: 0.13, y: 0.10, w: 0.64 }, { x: 0.08, y: 0.20, w: 0.44 },
  { x: 0.20, y: 0.30, w: 0.58 }, { x: 0.09, y: 0.40, w: 0.68 }, { x: 0.15, y: 0.50, w: 0.39 },
  { x: 0.06, y: 0.67, w: 0.56 }, { x: 0.18, y: 0.77, w: 0.47 },
];

export default function TextBackground() {
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
      draw(42);
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
      drawDesk(context, width, height);
      drawOpenBook(context, width, height, reducedMotion ? 42 : time);
      drawLooseLeaf(context, width, height);
      drawReadingLight(context, width, height, reducedMotion ? 42 : time);
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
      <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-[#160c09]/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#100806]/78 to-transparent" />
    </div>
  );
}

function drawDesk(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#1b0f0c");
  gradient.addColorStop(0.45, "#160c0a");
  gradient.addColorStop(1, "#0b0707");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.strokeStyle = "rgba(251,191,36,0.022)";
  context.lineWidth = 1;
  for (let y = 40; y < height; y += 54) {
    context.beginPath();
    context.moveTo(0, y);
    for (let x = 0; x <= width; x += 80) {
      context.quadraticCurveTo(x + 34, y + Math.sin(x * 0.009) * 4, x + 80, y + Math.sin((x + 80) * 0.009) * 4);
    }
    context.stroke();
  }
  context.restore();
}

function drawOpenBook(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const cx = width * (width < 900 ? 0.52 : 0.57);
  const cy = height * 0.56;
  const bookWidth = Math.min(width * (width < 900 ? 0.90 : 0.70), 1040);
  const bookHeight = Math.min(height * 0.58, 540);
  const left = cx - bookWidth / 2;
  const top = cy - bookHeight / 2;
  const pageGap = Math.max(12, bookWidth * 0.018);
  const half = (bookWidth - pageGap) / 2;

  context.save();
  context.shadowColor = "rgba(0,0,0,0.54)";
  context.shadowBlur = 38;
  context.shadowOffsetY = 18;
  roundRect(context, left, top, bookWidth, bookHeight, 26);
  context.fillStyle = "rgba(41,24,17,0.72)";
  context.fill();
  context.restore();

  drawPage(context, left + 10, top + 9, half - 12, bookHeight - 18, true);
  drawPage(context, left + half + pageGap + 2, top + 9, half - 12, bookHeight - 18, false);

  const spine = context.createLinearGradient(cx - 18, 0, cx + 18, 0);
  spine.addColorStop(0, "rgba(62,36,24,0.06)");
  spine.addColorStop(0.48, "rgba(49,26,18,0.44)");
  spine.addColorStop(0.52, "rgba(255,236,190,0.08)");
  spine.addColorStop(1, "rgba(62,36,24,0.06)");
  context.fillStyle = spine;
  context.fillRect(cx - pageGap / 2 - 9, top + 8, pageGap + 18, bookHeight - 16);

  drawPageContent(context, left + 34, top + 48, half - 72, bookHeight - 96, "prose");
  drawPageContent(context, left + half + pageGap + 28, top + 48, half - 64, bookHeight - 96, "mixed");
  drawMarginNotes(context, left, top, bookWidth, bookHeight);
  drawPageTurn(context, cx, top, half, bookHeight, time);
}

function drawPage(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, leftPage: boolean) {
  const gradient = context.createLinearGradient(x, y, x + width, y + height);
  if (leftPage) {
    gradient.addColorStop(0, "rgba(224,207,170,0.94)");
    gradient.addColorStop(0.76, "rgba(204,184,148,0.89)");
    gradient.addColorStop(1, "rgba(157,133,104,0.80)");
  } else {
    gradient.addColorStop(0, "rgba(164,140,108,0.80)");
    gradient.addColorStop(0.15, "rgba(212,193,156,0.90)");
    gradient.addColorStop(1, "rgba(228,211,176,0.94)");
  }
  context.fillStyle = gradient;
  context.strokeStyle = "rgba(104,75,50,0.42)";
  context.lineWidth = 1;
  roundRect(context, x, y, width, height, 20);
  context.fill();
  context.stroke();
}

function drawPageContent(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, mode: "prose" | "mixed") {
  context.save();
  context.fillStyle = "rgba(79,53,39,0.72)";
  context.font = "600 11px Georgia, serif";
  context.letterSpacing = "1px";
  context.fillText(mode === "prose" ? "NARRATIVE / VOICE" : "FORM / RHYTHM / DIALOGUE", x, y - 18);

  const proseWidth = mode === "prose" ? width : width * 0.52;
  drawLineBlock(context, PROSE_LINES, x, y + 10, proseWidth, height * 0.45, "rgba(75,51,38,0.28)");

  context.strokeStyle = "rgba(139,92,246,0.28)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(x + width * 0.02, y + height * 0.29);
  context.lineTo(x + width * 0.72, y + height * 0.29);
  context.stroke();

  if (mode === "mixed") {
    drawLineBlock(context, VERSE_LINES, x + width * 0.55, y + 12, width * 0.42, height * 0.42, "rgba(101,65,48,0.30)");
    context.font = "italic 10px Georgia, serif";
    context.fillStyle = "rgba(116,73,52,0.50)";
    context.fillText("VERSE", x + width * 0.57, y + height * 0.03);
  }

  const sceneY = y + height * 0.55;
  context.font = "600 10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(139,74,45,0.52)";
  context.fillText(mode === "prose" ? "SCENE CHANGE" : "DIALOGUE / STAGE", x, sceneY - 12);
  for (let row = 0; row < 6; row += 1) {
    const rowY = sceneY + row * 24;
    context.fillStyle = "rgba(90,58,42,0.34)";
    context.fillRect(x + (row % 2 ? width * 0.12 : 0), rowY, width * (row % 2 ? 0.64 : 0.82), 3);
    if (row % 2 === 0) {
      context.fillStyle = "rgba(190,122,58,0.30)";
      context.fillRect(x, rowY - 9, width * 0.18, 2);
    }
  }

  context.restore();
}

function drawLineBlock(context: CanvasRenderingContext2D, lines: Line[], x: number, y: number, width: number, height: number, color: string) {
  context.save();
  context.fillStyle = color;
  lines.forEach((line) => {
    const px = x + line.x * width;
    const py = y + line.y * height;
    context.fillRect(px, py, Math.max(12, width * line.w), line.emphasis ? 4 : 2.4);
  });
  context.restore();
}

function drawMarginNotes(context: CanvasRenderingContext2D, left: number, top: number, bookWidth: number, bookHeight: number) {
  context.save();
  context.font = "italic 10px Georgia, serif";
  context.fillStyle = "rgba(147,76,47,0.46)";
  context.strokeStyle = "rgba(147,76,47,0.28)";
  context.lineWidth = 1;

  const notes = [
    { x: left + bookWidth * 0.06, y: top + bookHeight * 0.20, text: "who speaks?", dx: 64 },
    { x: left + bookWidth * 0.42, y: top + bookHeight * 0.66, text: "why here?", dx: -54 },
    { x: left + bookWidth * 0.80, y: top + bookHeight * 0.34, text: "pattern", dx: -54 },
    { x: left + bookWidth * 0.68, y: top + bookHeight * 0.78, text: "context", dx: 54 },
  ];
  notes.forEach((note) => {
    context.fillText(note.text, note.x, note.y);
    context.beginPath();
    context.moveTo(note.x, note.y + 5);
    context.quadraticCurveTo(note.x + note.dx * 0.55, note.y + 18, note.x + note.dx, note.y + 10);
    context.stroke();
  });
  context.restore();
}

function drawPageTurn(context: CanvasRenderingContext2D, cx: number, top: number, half: number, bookHeight: number, time: number) {
  const period = 36;
  const local = ((time % period) + period) % period;
  if (local < 25) return;
  const t = Math.min(1, (local - 25) / 11);
  const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  const sweepX = cx + half * (0.95 - eased * 1.90);
  const curl = 26 + Math.sin(eased * Math.PI) * 62;

  context.save();
  const shadow = context.createLinearGradient(sweepX - curl, 0, sweepX + curl, 0);
  shadow.addColorStop(0, "rgba(52,31,20,0)");
  shadow.addColorStop(0.48, "rgba(52,31,20,0.24)");
  shadow.addColorStop(0.56, "rgba(255,244,211,0.10)");
  shadow.addColorStop(1, "rgba(52,31,20,0)");
  context.fillStyle = shadow;
  context.fillRect(sweepX - curl, top + 16, curl * 2, bookHeight - 32);
  context.restore();
}

function drawLooseLeaf(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 880) return;
  const x = width * 0.055;
  const y = height * 0.70;
  const w = width * 0.20;
  const h = Math.min(150, height * 0.17);
  context.save();
  context.translate(x + w / 2, y + h / 2);
  context.rotate(-0.055);
  context.fillStyle = "rgba(204,185,151,0.10)";
  context.strokeStyle = "rgba(224,203,165,0.16)";
  context.lineWidth = 1;
  roundRect(context, -w / 2, -h / 2, w, h, 12);
  context.fill();
  context.stroke();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(234,191,106,0.28)";
  context.fillText("READING NOTE", -w * 0.39, -h * 0.28);
  for (let index = 0; index < 5; index += 1) {
    context.fillStyle = "rgba(211,194,161,0.12)";
    context.fillRect(-w * 0.39, -h * 0.10 + index * 18, w * (0.50 + (index % 3) * 0.12), 2);
  }
  context.restore();
}

function drawReadingLight(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const drift = Math.sin(time * 0.035) * width * 0.035;
  const x = width * 0.57 + drift;
  const y = height * 0.42;
  const radius = Math.max(width, height) * 0.47;
  const light = context.createRadialGradient(x, y, 0, x, y, radius);
  light.addColorStop(0, "rgba(251,191,36,0.085)");
  light.addColorStop(0.34, "rgba(251,146,60,0.035)");
  light.addColorStop(1, "rgba(251,191,36,0)");
  context.fillStyle = light;
  context.fillRect(0, 0, width, height);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.56, height * 0.54, Math.min(width, height) * 0.25, width * 0.56, height * 0.54, Math.max(width, height) * 0.78);
  vignette.addColorStop(0, "rgba(12,7,5,0)");
  vignette.addColorStop(1, "rgba(8,4,4,0.68)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}
