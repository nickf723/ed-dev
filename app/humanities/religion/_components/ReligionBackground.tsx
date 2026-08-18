"use client";

import { useEffect, useRef } from "react";

const LENSES = ["TEXT", "PRACTICE", "COMMUNITY", "PLACE", "HISTORY", "EXPERIENCE", "IDEAS"] as const;

export default function ReligionBackground() {
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
      draw(38);
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
      drawAstrolabe(context, width, height, reducedMotion ? 38 : time);
      drawSourceCards(context, width, height);
      drawReadingBeam(context, width, height, reducedMotion ? 38 : time);
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
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#120b09]/88 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#120b09]/86 to-transparent" />
    </div>
  );
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#130b09");
  gradient.addColorStop(0.48, "#21120d");
  gradient.addColorStop(1, "#0b0a13");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const warm = context.createRadialGradient(width * 0.68, height * 0.45, 0, width * 0.68, height * 0.45, Math.max(width, height) * 0.6);
  warm.addColorStop(0, "rgba(251,191,36,0.060)");
  warm.addColorStop(0.5, "rgba(244,114,182,0.018)");
  warm.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = warm;
  context.fillRect(0, 0, width, height);
}

function drawAstrolabe(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const cx = width < 900 ? width * 0.57 : width * 0.72;
  const cy = height * 0.49;
  const radius = Math.min(width < 900 ? width * 0.48 : width * 0.34, height * 0.43);
  const rotation = time * 0.0032;

  context.save();
  context.translate(cx, cy);

  const halo = context.createRadialGradient(0, 0, radius * 0.12, 0, 0, radius * 1.12);
  halo.addColorStop(0, "rgba(251,191,36,0.045)");
  halo.addColorStop(0.62, "rgba(192,132,252,0.014)");
  halo.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = halo;
  context.beginPath();
  context.arc(0, 0, radius * 1.14, 0, Math.PI * 2);
  context.fill();

  [1, 0.78, 0.55, 0.31].forEach((fraction, index) => {
    context.strokeStyle = index === 0 ? "rgba(253,230,138,0.20)" : "rgba(253,230,138,0.105)";
    context.lineWidth = index === 0 ? 1.35 : 0.8;
    context.beginPath();
    context.arc(0, 0, radius * fraction, 0, Math.PI * 2);
    context.stroke();
  });

  context.rotate(rotation);
  for (let index = 0; index < LENSES.length; index += 1) {
    const angle = (index / LENSES.length) * Math.PI * 2 - Math.PI / 2;
    const x1 = Math.cos(angle) * radius * 0.30;
    const y1 = Math.sin(angle) * radius * 0.30;
    const x2 = Math.cos(angle) * radius;
    const y2 = Math.sin(angle) * radius;
    context.strokeStyle = index % 2 === 0 ? "rgba(251,191,36,0.105)" : "rgba(192,132,252,0.09)";
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();

    const labelRadius = radius * 0.88;
    const lx = Math.cos(angle) * labelRadius;
    const ly = Math.sin(angle) * labelRadius;
    context.save();
    context.translate(lx, ly);
    context.rotate(-rotation);
    context.font = `${width < 700 ? 8 : 10}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    context.textAlign = "center";
    context.fillStyle = index % 2 === 0 ? "rgba(253,230,138,0.30)" : "rgba(216,180,254,0.26)";
    context.fillText(LENSES[index], 0, 3);
    context.restore();
  }

  context.rotate(-rotation);
  context.fillStyle = "rgba(251,191,36,0.045)";
  context.strokeStyle = "rgba(253,230,138,0.20)";
  context.lineWidth = 1;
  context.beginPath();
  context.arc(0, 0, radius * 0.18, 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.textAlign = "center";
  context.font = `${width < 700 ? 9 : 11}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  context.fillStyle = "rgba(255,247,237,0.33)";
  context.fillText("EVIDENCE", 0, -6);
  context.fillStyle = "rgba(253,230,138,0.26)";
  context.fillText("↕", 0, 8);
  context.fillStyle = "rgba(255,247,237,0.29)";
  context.fillText("INTERPRETATION", 0, 22);

  context.restore();
}

function drawSourceCards(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 760) return;
  const left = width * 0.055;
  const top = height * 0.31;
  const cardW = Math.min(260, width * 0.18);
  const rows = [
    { label: "FIELDNOTE", note: "practice observed", rgb: "251,191,36" },
    { label: "TEXT FRAGMENT", note: "genre + transmission", rgb: "192,132,252" },
    { label: "OBJECT RECORD", note: "material + use", rgb: "94,234,212" },
    { label: "ORAL ACCOUNT", note: "speaker + context", rgb: "244,114,182" },
  ] as const;

  rows.forEach((row, index) => {
    const y = top + index * 72;
    context.fillStyle = "rgba(18,11,9,0.28)";
    context.strokeStyle = `rgba(${row.rgb},0.13)`;
    context.lineWidth = 1;
    context.fillRect(left, y, cardW, 54);
    context.strokeRect(left, y, cardW, 54);
    context.fillStyle = `rgba(${row.rgb},0.32)`;
    context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.fillText(row.label, left + 12, y + 18);
    context.fillStyle = "rgba(231,229,228,0.20)";
    context.fillText(row.note, left + 12, y + 36);
  });

  context.strokeStyle = "rgba(253,230,138,0.08)";
  context.setLineDash([4, 8]);
  context.beginPath();
  context.moveTo(left + cardW, top + 27);
  context.bezierCurveTo(width * 0.36, top + 27, width * 0.42, height * 0.48, width * 0.52, height * 0.48);
  context.stroke();
  context.setLineDash([]);
}

function drawReadingBeam(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const sweep = (Math.sin(time * 0.018) + 1) / 2;
  const x = width * (0.18 + sweep * 0.66);
  const beam = context.createLinearGradient(x - 80, 0, x + 80, 0);
  beam.addColorStop(0, "rgba(253,230,138,0)");
  beam.addColorStop(0.5, "rgba(253,230,138,0.025)");
  beam.addColorStop(1, "rgba(253,230,138,0)");
  context.fillStyle = beam;
  context.fillRect(x - 80, height * 0.16, 160, height * 0.70);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.56, height * 0.48, Math.min(width, height) * 0.16, width * 0.56, height * 0.48, Math.max(width, height) * 0.74);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.76, "rgba(8,5,8,0.16)");
  gradient.addColorStop(1, "rgba(8,5,8,0.58)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
