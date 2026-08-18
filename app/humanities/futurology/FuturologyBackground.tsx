"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function FuturologyBackground() {
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
      draw(41);
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
      drawObservatory(context, width, height);
      drawScenarioFan(context, width, height);
      drawSignalCards(context, width, height);
      drawScan(context, width, height, reducedMotion ? 41 : time);
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
  gradient.addColorStop(0, "#071019");
  gradient.addColorStop(0.48, "#0c1020");
  gradient.addColorStop(1, "#130b1a");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const horizonGlow = context.createRadialGradient(width * 0.72, height * 0.48, 0, width * 0.72, height * 0.48, Math.max(width, height) * 0.55);
  horizonGlow.addColorStop(0, "rgba(103,232,249,0.035)");
  horizonGlow.addColorStop(0.45, "rgba(192,132,252,0.018)");
  horizonGlow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = horizonGlow;
  context.fillRect(0, 0, width, height);
}

function drawObservatory(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 760) return;
  const x = width * 0.06;
  const y = height * 0.25;
  const w = Math.min(240, width * 0.19);
  const h = height * 0.50;

  context.fillStyle = "rgba(15,23,42,0.12)";
  context.strokeStyle = "rgba(148,163,184,0.07)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  label(context, "HORIZON SCAN", x + 14, y + 24, "rgba(103,232,249,0.18)");
  label(context, "EVIDENCE BEFORE STORY", x + 14, y + 41, "rgba(148,163,184,0.12)");

  const lanes = [
    ["technology", "rgba(34,211,238,0.12)"],
    ["environment", "rgba(74,222,128,0.10)"],
    ["institutions", "rgba(192,132,252,0.11)"],
    ["demography", "rgba(251,191,36,0.10)"],
    ["culture", "rgba(244,114,182,0.10)"],
  ] as const;
  lanes.forEach(([text, color], index) => {
    const yy = y + 72 + index * 58;
    context.strokeStyle = color;
    context.beginPath(); context.moveTo(x + 14, yy + 21); context.lineTo(x + w - 14, yy + 21); context.stroke();
    label(context, text.toUpperCase(), x + 14, yy, color.replace("0.1", "0.22"));
    const lengths = [0.76, 0.44, 0.61, 0.33, 0.54];
    context.fillStyle = color;
    context.fillRect(x + 14, yy + 8, (w - 28) * lengths[index], 5);
  });

  label(context, "signal ≠ prediction", x + 14, y + h - 28, "rgba(248,113,113,0.13)");
  label(context, "trend ≠ destiny", x + 14, y + h - 13, "rgba(248,113,113,0.13)");
}

function drawScenarioFan(context: CanvasRenderingContext2D, width: number, height: number) {
  const start: Point = { x: width * (width < 760 ? 0.18 : 0.31), y: height * 0.53 };
  const horizonX = width * 0.91;
  const destinations: Point[] = [
    { x: horizonX, y: height * 0.25 },
    { x: horizonX, y: height * 0.42 },
    { x: horizonX, y: height * 0.60 },
    { x: horizonX, y: height * 0.77 },
  ];
  const colors = ["103,232,249", "192,132,252", "251,191,36", "244,114,182"] as const;

  context.save();
  context.globalCompositeOperation = "source-over";

  // Cone of uncertainty.
  const cone = context.createLinearGradient(start.x, 0, horizonX, 0);
  cone.addColorStop(0, "rgba(226,232,240,0.018)");
  cone.addColorStop(1, "rgba(192,132,252,0.034)");
  context.fillStyle = cone;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.lineTo(horizonX, height * 0.17);
  context.lineTo(horizonX, height * 0.84);
  context.closePath();
  context.fill();
  context.strokeStyle = "rgba(226,232,240,0.055)";
  context.stroke();

  destinations.forEach((end, index) => {
    const rgb = colors[index];
    const c1x = start.x + (end.x - start.x) * 0.34;
    const c2x = start.x + (end.x - start.x) * 0.68;
    context.strokeStyle = `rgba(${rgb},0.17)`;
    context.lineWidth = 1.4;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(c1x, start.y + (end.y - start.y) * 0.08, c2x, end.y - (end.y - start.y) * 0.07, end.x, end.y);
    context.stroke();

    context.fillStyle = `rgba(${rgb},0.035)`;
    context.strokeStyle = `rgba(${rgb},0.13)`;
    roundedRect(context, end.x - 142, end.y - 39, 118, 78, 9);
    context.fill(); context.stroke();
    label(context, `SCENARIO ${String.fromCharCode(65 + index)}`, end.x - 128, end.y - 11, `rgba(${rgb},0.24)`);
    label(context, "coherent, not predicted", end.x - 128, end.y + 10, "rgba(148,163,184,0.12)");
  });

  context.beginPath();
  context.arc(start.x, start.y, 8, 0, Math.PI * 2);
  context.fillStyle = "rgba(226,232,240,0.18)";
  context.fill();
  context.beginPath(); context.arc(start.x, start.y, 17, 0, Math.PI * 2); context.strokeStyle = "rgba(226,232,240,0.08)"; context.stroke();
  label(context, "PRESENT", start.x - 26, start.y + 34, "rgba(226,232,240,0.18)");

  const horizons = ["near", "mid", "far"] as const;
  horizons.forEach((name, index) => {
    const x = start.x + (horizonX - start.x) * (0.27 + index * 0.22);
    context.setLineDash([4, 7]);
    context.strokeStyle = "rgba(148,163,184,0.055)";
    context.beginPath(); context.moveTo(x, height * 0.19); context.lineTo(x, height * 0.82); context.stroke();
    context.setLineDash([]);
    label(context, `${name.toUpperCase()} HORIZON`, x - 32, height * 0.86, "rgba(148,163,184,0.10)");
  });

  context.restore();
}

function drawSignalCards(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 980) return;
  const cards = [
    { x: 0.43, y: 0.23, label: "weak signal", color: "103,232,249" },
    { x: 0.52, y: 0.70, label: "assumption", color: "251,191,36" },
    { x: 0.63, y: 0.31, label: "uncertainty", color: "192,132,252" },
    { x: 0.72, y: 0.68, label: "wild card", color: "244,114,182" },
  ] as const;
  cards.forEach((card, index) => {
    const x = width * card.x;
    const y = height * card.y;
    context.fillStyle = `rgba(${card.color},0.026)`;
    context.strokeStyle = `rgba(${card.color},0.09)`;
    context.fillRect(x, y, 86, 42);
    context.strokeRect(x, y, 86, 42);
    label(context, card.label.toUpperCase(), x + 8, y + 17, `rgba(${card.color},0.18)`);
    label(context, `NOTE 0${index + 1}`, x + 8, y + 31, "rgba(148,163,184,0.10)");
  });
}

function drawScan(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const sweep = (Math.sin(time * 0.014) + 1) / 2;
  const x = width * (0.28 + sweep * 0.63);
  const beam = context.createLinearGradient(x - 110, 0, x + 110, 0);
  beam.addColorStop(0, "rgba(103,232,249,0)");
  beam.addColorStop(0.5, "rgba(103,232,249,0.020)");
  beam.addColorStop(1, "rgba(103,232,249,0)");
  context.fillStyle = beam;
  context.fillRect(x - 110, height * 0.12, 220, height * 0.77);
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
  const gradient = context.createRadialGradient(width * 0.62, height * 0.50, Math.min(width, height) * 0.13, width * 0.62, height * 0.50, Math.max(width, height) * 0.78);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.73, "rgba(3,7,15,0.13)");
  gradient.addColorStop(1, "rgba(3,7,15,0.72)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
