"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type Member = {
  a: number;
  b: number;
  kind: "deck" | "web" | "tower";
};

const MEMBERS: Member[] = [
  ...Array.from({ length: 10 }, (_, index) => ({ a: index, b: index + 1, kind: "deck" as const })),
  ...Array.from({ length: 10 }, (_, index) => ({ a: index + 11, b: index + 12, kind: "deck" as const })),
  ...Array.from({ length: 11 }, (_, index) => ({ a: index, b: index + 11, kind: "web" as const })),
  ...Array.from({ length: 10 }, (_, index) => ({ a: index, b: index + 12, kind: "web" as const })),
  ...Array.from({ length: 10 }, (_, index) => ({ a: index + 1, b: index + 11, kind: "web" as const })),
];

export default function BlueprintBackground() {
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
      draw(28);
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
      drawPaper(context, width, height);
      drawDraftGrid(context, width, height);
      drawBridgeTest(context, width, height, reducedMotion ? 28 : time);
      drawGearDetail(context, width, height, reducedMotion ? 28 : time);
      drawCircuitDetail(context, width, height, reducedMotion ? 28 : time);
      drawNotes(context, width, height);
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
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#06101f]/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#040814]/78 to-transparent" />
    </div>
  );
}

function drawPaper(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#08162a");
  gradient.addColorStop(0.46, "#071329");
  gradient.addColorStop(1, "#040915");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.52, height * 0.53, 0, width * 0.52, height * 0.53, Math.max(width, height) * 0.58);
  glow.addColorStop(0, "rgba(56,189,248,0.075)");
  glow.addColorStop(0.45, "rgba(139,92,246,0.035)");
  glow.addColorStop(1, "rgba(2,6,23,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawDraftGrid(context: CanvasRenderingContext2D, width: number, height: number) {
  context.save();
  const minor = width < 800 ? 34 : 44;
  const major = minor * 5;

  for (let x = 0; x <= width; x += minor) {
    const isMajor = Math.round(x / minor) % 5 === 0;
    context.strokeStyle = isMajor ? "rgba(125,211,252,0.070)" : "rgba(125,211,252,0.025)";
    context.lineWidth = isMajor ? 1 : 0.7;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }

  for (let y = 0; y <= height; y += minor) {
    const isMajor = Math.round(y / minor) % 5 === 0;
    context.strokeStyle = isMajor ? "rgba(125,211,252,0.070)" : "rgba(125,211,252,0.025)";
    context.lineWidth = isMajor ? 1 : 0.7;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.fillStyle = "rgba(125,211,252,0.10)";
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText(`GRID ${major}px`, Math.max(20, width * 0.03), Math.max(28, height * 0.08));
  context.restore();
}

function bridgeGeometry(width: number, height: number) {
  const left = width * (width < 900 ? 0.05 : 0.12);
  const right = width * (width < 900 ? 0.95 : 0.88);
  const span = right - left;
  const deckY = height * 0.58;
  const trussHeight = Math.min(150, height * 0.17);
  const bottom: Point[] = [];
  const top: Point[] = [];

  for (let index = 0; index <= 10; index += 1) {
    const x = left + (span / 10) * index;
    bottom.push({ x, y: deckY });
    const arch = Math.sin((index / 10) * Math.PI);
    top.push({ x, y: deckY - 38 - arch * trussHeight * 0.62 });
  }

  return { left, right, span, deckY, trussHeight, points: [...bottom, ...top] };
}

function drawBridgeTest(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const { left, right, span, deckY, points } = bridgeGeometry(width, height);
  const cycle = ((time * 0.026) % 2 + 2) % 2;
  const triangle = cycle < 1 ? cycle : 2 - cycle;
  const loadX = left + span * (0.08 + triangle * 0.84);
  const loadIndex = Math.round(((loadX - left) / span) * 10);

  context.save();
  context.globalCompositeOperation = "lighter";

  MEMBERS.forEach((member) => {
    const a = points[member.a];
    const b = points[member.b];
    const memberCenter = (a.x + b.x) / 2;
    const influence = Math.max(0, 1 - Math.abs(memberCenter - loadX) / (span * 0.24));
    const baseAlpha = member.kind === "deck" ? 0.23 : 0.15;
    const stressAlpha = influence * 0.42;
    context.strokeStyle = stressAlpha > 0.05
      ? `rgba(${influence > 0.62 ? "251,191,36" : "56,189,248"},${baseAlpha + stressAlpha})`
      : `rgba(125,211,252,${baseAlpha})`;
    context.lineWidth = member.kind === "deck" ? 2.1 : 1.15;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();
  });

  points.forEach((point, index) => {
    const near = Math.max(0, 1 - Math.abs(index % 11 - loadIndex) / 3);
    context.fillStyle = near > 0.3 ? `rgba(251,191,36,${0.26 + near * 0.42})` : "rgba(186,230,253,0.30)";
    context.beginPath();
    context.arc(point.x, point.y, index < 11 ? 3.1 : 2.3, 0, Math.PI * 2);
    context.fill();
  });

  // Supports
  context.strokeStyle = "rgba(186,230,253,0.22)";
  context.lineWidth = 1.2;
  [left, right].forEach((x) => {
    context.beginPath();
    context.moveTo(x - 24, deckY + 32);
    context.lineTo(x, deckY);
    context.lineTo(x + 24, deckY + 32);
    context.closePath();
    context.stroke();
  });

  // Load carriage and force arrow
  context.fillStyle = "rgba(251,191,36,0.18)";
  context.strokeStyle = "rgba(251,191,36,0.62)";
  context.lineWidth = 1.3;
  context.beginPath();
  context.roundRect(loadX - 20, deckY - 18, 40, 14, 5);
  context.fill();
  context.stroke();
  context.beginPath();
  context.moveTo(loadX, deckY - 72);
  context.lineTo(loadX, deckY - 28);
  context.stroke();
  context.beginPath();
  context.moveTo(loadX - 6, deckY - 36);
  context.lineTo(loadX, deckY - 27);
  context.lineTo(loadX + 6, deckY - 36);
  context.stroke();

  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(251,191,36,0.62)";
  context.fillText("MOVING LOAD", loadX - 34, deckY - 84);

  drawDimension(context, left, right, deckY + 72, `${Math.round(span / 4)} m TEST SPAN`);
  drawVerticalDimension(context, right + Math.min(46, width * 0.035), deckY - 142, deckY, "TRUSS DEPTH");

  context.restore();
}

function drawDimension(context: CanvasRenderingContext2D, x1: number, x2: number, y: number, label: string) {
  context.save();
  context.strokeStyle = "rgba(167,139,250,0.26)";
  context.fillStyle = "rgba(196,181,253,0.42)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(x1, y);
  context.lineTo(x2, y);
  context.moveTo(x1, y - 7);
  context.lineTo(x1, y + 7);
  context.moveTo(x2, y - 7);
  context.lineTo(x2, y + 7);
  context.stroke();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.textAlign = "center";
  context.fillText(label, (x1 + x2) / 2, y - 7);
  context.restore();
}

function drawVerticalDimension(context: CanvasRenderingContext2D, x: number, y1: number, y2: number, label: string) {
  context.save();
  context.strokeStyle = "rgba(167,139,250,0.22)";
  context.fillStyle = "rgba(196,181,253,0.36)";
  context.beginPath();
  context.moveTo(x, y1);
  context.lineTo(x, y2);
  context.moveTo(x - 6, y1);
  context.lineTo(x + 6, y1);
  context.moveTo(x - 6, y2);
  context.lineTo(x + 6, y2);
  context.stroke();
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.save();
  context.translate(x + 13, (y1 + y2) / 2);
  context.rotate(Math.PI / 2);
  context.textAlign = "center";
  context.fillText(label, 0, 0);
  context.restore();
  context.restore();
}

function drawGearDetail(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  if (width < 760) return;
  const cx = width * 0.18;
  const cy = height * 0.79;
  const rotation = time * 0.035;
  context.save();
  context.globalAlpha = 0.52;
  drawGear(context, cx, cy, 42, 12, rotation, "rgba(167,139,250,0.23)");
  drawGear(context, cx + 69, cy - 31, 29, 10, -rotation * 1.45, "rgba(56,189,248,0.21)");
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(196,181,253,0.32)";
  context.fillText("MECHANISM DETAIL / RATIO 1.45:1", cx - 56, cy + 67);
  context.restore();
}

function drawGear(context: CanvasRenderingContext2D, x: number, y: number, radius: number, teeth: number, rotation: number, stroke: string) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.strokeStyle = stroke;
  context.lineWidth = 1.1;
  context.beginPath();
  for (let index = 0; index < teeth * 2; index += 1) {
    const angle = (index / (teeth * 2)) * Math.PI * 2;
    const r = index % 2 === 0 ? radius : radius * 0.82;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (index === 0) context.moveTo(px, py);
    else context.lineTo(px, py);
  }
  context.closePath();
  context.stroke();
  context.beginPath();
  context.arc(0, 0, radius * 0.27, 0, Math.PI * 2);
  context.stroke();
  context.restore();
}

function drawCircuitDetail(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  if (width < 900) return;
  const x = width * 0.74;
  const y = height * 0.77;
  const w = width * 0.18;
  const h = Math.min(112, height * 0.13);
  context.save();
  context.strokeStyle = "rgba(94,234,212,0.16)";
  context.fillStyle = "rgba(94,234,212,0.24)";
  context.lineWidth = 1;
  context.strokeRect(x, y, w, h);

  const nodes = [
    { x: x + w * 0.14, y: y + h * 0.32 },
    { x: x + w * 0.44, y: y + h * 0.68 },
    { x: x + w * 0.70, y: y + h * 0.28 },
    { x: x + w * 0.87, y: y + h * 0.72 },
  ];
  context.beginPath();
  context.moveTo(nodes[0].x, nodes[0].y);
  nodes.slice(1).forEach((node) => context.lineTo(node.x, node.y));
  context.stroke();
  nodes.forEach((node) => context.fillRect(node.x - 2.5, node.y - 2.5, 5, 5));

  const progress = (time * 0.055) % 1;
  const segment = Math.min(nodes.length - 2, Math.floor(progress * (nodes.length - 1)));
  const local = progress * (nodes.length - 1) - segment;
  const a = nodes[segment];
  const b = nodes[segment + 1];
  const px = a.x + (b.x - a.x) * local;
  const py = a.y + (b.y - a.y) * local;
  context.fillStyle = "rgba(94,234,212,0.66)";
  context.beginPath();
  context.arc(px, py, 3, 0, Math.PI * 2);
  context.fill();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(153,246,228,0.30)";
  context.fillText("SENSOR BUS / LOAD TELEMETRY", x, y - 9);
  context.restore();
}

function drawNotes(context: CanvasRenderingContext2D, width: number, height: number) {
  context.save();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(186,230,253,0.26)";
  const x = width * 0.055;
  const y = height * 0.22;
  ["DESIGN REVIEW 04", "LOAD CASE: MOVING POINT FORCE", "CHECK: DEFORMATION / MEMBER FORCE", "VERIFY BEFORE RELEASE"].forEach((line, index) => {
    context.fillText(line, x, y + index * 18);
  });
  context.strokeStyle = "rgba(186,230,253,0.12)";
  context.strokeRect(x - 10, y - 20, Math.min(250, width * 0.28), 88);
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.52, height * 0.5, Math.min(width, height) * 0.22, width * 0.52, height * 0.5, Math.max(width, height) * 0.72);
  vignette.addColorStop(0, "rgba(2,6,23,0)");
  vignette.addColorStop(1, "rgba(2,6,23,0.62)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
