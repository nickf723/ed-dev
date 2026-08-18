"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function MechanicalBackground() {
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
      draw(23);
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
      drawDrawingGrid(context, width, height);
      drawMechanismBench(context, width, height, reducedMotion ? 23 : time);
      drawSpringDamper(context, width, height, reducedMotion ? 23 : time);
      drawPumpLoop(context, width, height, reducedMotion ? 23 : time);
      drawAnnotations(context, width, height);
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
  gradient.addColorStop(0, "#14100d");
  gradient.addColorStop(0.52, "#1a1511");
  gradient.addColorStop(1, "#101318");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.62, height * 0.51, 0, width * 0.62, height * 0.51, Math.max(width, height) * 0.58);
  glow.addColorStop(0, "rgba(245,158,11,0.055)");
  glow.addColorStop(0.50, "rgba(56,189,248,0.012)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawDrawingGrid(context: CanvasRenderingContext2D, width: number, height: number) {
  context.strokeStyle = "rgba(245,158,11,0.026)";
  context.lineWidth = 1;
  const spacing = 42;
  for (let x = 0; x < width; x += spacing) {
    context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
  }
  for (let y = 0; y < height; y += spacing) {
    context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
  }
  context.strokeStyle = "rgba(245,158,11,0.043)";
  for (let x = 0; x < width; x += spacing * 5) {
    context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
  }
  for (let y = 0; y < height; y += spacing * 5) {
    context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
  }
}

function drawMechanismBench(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const scale = Math.min(width / 1440, height / 900);
  const cx = width * (width < 900 ? 0.58 : 0.59);
  const cy = height * 0.51;
  const theta = time * 0.18;

  context.save();
  context.translate(cx, cy);
  context.scale(scale, scale);

  // Base plate and mounting feet.
  context.fillStyle = "rgba(120,83,55,0.055)";
  context.strokeStyle = "rgba(245,158,11,0.10)";
  roundedRect(context, -350, 170, 690, 38, 8);
  context.fill(); context.stroke();
  [-290, -90, 115, 285].forEach((x) => {
    context.strokeRect(x - 17, 207, 34, 26);
    context.beginPath(); context.arc(x, 220, 4, 0, Math.PI * 2); context.stroke();
  });

  label(context, "POWER INPUT", -325, -223, "rgba(253,186,116,0.20)");
  label(context, "ROTATION → TRANSLATION", -35, -223, "rgba(253,186,116,0.20)");
  label(context, "BEARING / SUPPORT", 205, 126, "rgba(203,213,225,0.12)");

  // Gear train.
  drawGear(context, -245, -72, 82, 22, theta, "rgba(217,119,6,0.18)", "rgba(251,191,36,0.20)");
  drawGear(context, -112, -72, 50, 14, -theta * 1.64, "rgba(146,64,14,0.17)", "rgba(251,191,36,0.18)");
  drawGear(context, -23, -72, 36, 10, theta * 2.28, "rgba(120,53,15,0.17)", "rgba(251,191,36,0.17)");
  drawShaft(context, -319, -72, 18, "rgba(203,213,225,0.10)");
  context.strokeStyle = "rgba(251,191,36,0.11)";
  context.beginPath(); context.moveTo(-330, -72); context.lineTo(12, -72); context.stroke();

  // Flywheel and crank.
  const flyX = 85;
  const flyY = -42;
  const flyR = 82;
  context.save(); context.translate(flyX, flyY); context.rotate(theta * 0.78);
  context.strokeStyle = "rgba(245,158,11,0.22)";
  context.lineWidth = 5;
  context.beginPath(); context.arc(0, 0, flyR, 0, Math.PI * 2); context.stroke();
  context.lineWidth = 2;
  for (let spoke = 0; spoke < 6; spoke += 1) {
    const a = (spoke / 6) * Math.PI * 2;
    context.beginPath(); context.moveTo(0, 0); context.lineTo(Math.cos(a) * flyR, Math.sin(a) * flyR); context.strokeStyle = "rgba(245,158,11,0.11)"; context.stroke();
  }
  context.beginPath(); context.arc(0, 0, 14, 0, Math.PI * 2); context.strokeStyle = "rgba(251,191,36,0.22)"; context.stroke();
  context.restore();

  const crankR = 45;
  const crankAngle = theta * 0.78;
  const crankX = flyX + Math.cos(crankAngle) * crankR;
  const crankY = flyY + Math.sin(crankAngle) * crankR;
  const sliderX = 276;
  const rodLength = 210;
  const dx = sliderX - crankX;
  const verticalOffset = Math.sqrt(Math.max(0, rodLength * rodLength - dx * dx));
  const sliderY = crankY + Math.sign(-crankY || 1) * verticalOffset;
  const constrainedSliderY = Math.max(-118, Math.min(112, sliderY));

  // Horizontal slider guide with crank connecting rod.
  context.strokeStyle = "rgba(203,213,225,0.11)";
  context.lineWidth = 2;
  context.strokeRect(215, -128, 126, 256);
  context.fillStyle = "rgba(217,119,6,0.12)";
  context.strokeStyle = "rgba(251,191,36,0.22)";
  roundedRect(context, 226, constrainedSliderY - 28, 104, 56, 5);
  context.fill(); context.stroke();
  context.beginPath();
  context.moveTo(crankX, crankY);
  context.lineTo(226, constrainedSliderY);
  context.strokeStyle = "rgba(203,213,225,0.22)";
  context.lineWidth = 7;
  context.stroke();
  context.beginPath(); context.arc(crankX, crankY, 7, 0, Math.PI * 2); context.fillStyle = "rgba(251,191,36,0.46)"; context.fill();

  // Motion arrows and dimension line.
  context.strokeStyle = "rgba(56,189,248,0.15)";
  context.lineWidth = 1.3;
  context.beginPath(); context.moveTo(350, -95); context.lineTo(350, 95); context.stroke();
  arrowHead(context, 350, -95, -Math.PI / 2, "rgba(56,189,248,0.20)");
  arrowHead(context, 350, 95, Math.PI / 2, "rgba(56,189,248,0.20)");
  label(context, "RECIPROCATING OUTPUT", 365, 4, "rgba(125,211,252,0.16)");

  drawDimension(context, -327, 148, 330, 148, "ASSEMBLY ENVELOPE");
  context.restore();
}

function drawSpringDamper(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  if (width < 880) return;
  const scale = Math.min(width / 1440, height / 900);
  const x = width * 0.79;
  const y = height * 0.31;
  const compression = Math.sin(time * 0.15) * 4 * scale;

  label(context, "SPRING–DAMPER / VIBRATION", x - 120 * scale, y - 66 * scale, "rgba(125,211,252,0.16)");
  context.strokeStyle = "rgba(125,211,252,0.11)";
  context.strokeRect(x - 140 * scale, y - 50 * scale, 280 * scale, 130 * scale);

  const left = x - 115 * scale;
  const right = x + 98 * scale + compression;
  context.strokeStyle = "rgba(203,213,225,0.16)";
  context.lineWidth = 2;
  context.beginPath(); context.moveTo(left, y); context.lineTo(left + 20 * scale, y); context.stroke();
  context.beginPath();
  let px = left + 20 * scale;
  context.moveTo(px, y);
  const coils = 8;
  const usable = right - px - 30 * scale;
  for (let coil = 1; coil <= coils * 2; coil += 1) {
    const nx = px + (usable / (coils * 2)) * coil;
    const ny = y + (coil % 2 === 0 ? -14 : 14) * scale;
    context.lineTo(nx, ny);
  }
  context.lineTo(right, y);
  context.strokeStyle = "rgba(56,189,248,0.20)";
  context.stroke();

  context.strokeStyle = "rgba(192,132,252,0.14)";
  context.strokeRect(left + 25 * scale, y + 34 * scale, 48 * scale, 24 * scale);
  context.beginPath(); context.moveTo(left + 73 * scale, y + 46 * scale); context.lineTo(right, y + 46 * scale); context.stroke();
  context.fillStyle = "rgba(192,132,252,0.06)";
  context.fillRect(right, y - 30 * scale, 31 * scale, 92 * scale);
  context.strokeRect(right, y - 30 * scale, 31 * scale, 92 * scale);
  label(context, "k", x - 4 * scale, y - 25 * scale, "rgba(125,211,252,0.18)");
  label(context, "c", x - 4 * scale, y + 70 * scale, "rgba(216,180,254,0.17)");
}

function drawPumpLoop(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  if (width < 900) return;
  const scale = Math.min(width / 1440, height / 900);
  const left = width * 0.74;
  const top = height * 0.66;
  const w = width * 0.20;
  const h = height * 0.18;

  label(context, "PUMP LOOP / PRESSURE → FLOW", left, top - 18, "rgba(94,234,212,0.16)");
  context.strokeStyle = "rgba(94,234,212,0.10)";
  context.lineWidth = 3;
  roundedRect(context, left, top, w, h, 18 * scale);
  context.stroke();

  const pumpX = left + w * 0.20;
  const pumpY = top + h * 0.50;
  context.beginPath(); context.arc(pumpX, pumpY, 28 * scale, 0, Math.PI * 2); context.fillStyle = "rgba(45,212,191,0.035)"; context.fill(); context.strokeStyle = "rgba(94,234,212,0.18)"; context.stroke();
  context.beginPath(); context.moveTo(pumpX - 8 * scale, pumpY - 14 * scale); context.lineTo(pumpX + 14 * scale, pumpY); context.lineTo(pumpX - 8 * scale, pumpY + 14 * scale); context.closePath(); context.stroke();
  label(context, "PUMP", pumpX - 17 * scale, pumpY + 47 * scale, "rgba(94,234,212,0.14)");

  const path: Point[] = [
    { x: left + 18, y: top + h * 0.50 },
    { x: left + w * 0.20 - 29 * scale, y: pumpY },
    { x: pumpX + 29 * scale, y: pumpY },
    { x: left + w - 18, y: pumpY },
    { x: left + w - 18, y: top + 18 },
    { x: left + 18, y: top + 18 },
    { x: left + 18, y: top + h * 0.50 },
  ];
  const pulse = pointOnPolyline(path, (time * 0.035) % 1);
  context.beginPath(); context.arc(pulse.x, pulse.y, 3.5 * scale, 0, Math.PI * 2); context.fillStyle = "rgba(94,234,212,0.70)"; context.shadowBlur = 10; context.shadowColor = "rgba(45,212,191,0.5)"; context.fill(); context.shadowBlur = 0;
}

function drawAnnotations(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 920) return;
  const x = width * 0.055;
  const y = height * 0.27;
  label(context, "MECHANICAL DESIGN REVIEW", x, y - 22, "rgba(251,191,36,0.20)");
  const notes = [
    ["KINEMATICS", "where can it move?"],
    ["LOAD PATH", "where do forces travel?"],
    ["ENERGY", "where is work stored or lost?"],
    ["INTERFACE", "what touches, slides, seals, spins?"],
    ["SERVICE", "what wears and how is it reached?"],
  ] as const;
  notes.forEach(([term, detail], index) => {
    const yy = y + index * 49;
    context.fillStyle = index === 0 ? "rgba(245,158,11,0.050)" : "rgba(255,255,255,0.014)";
    context.strokeStyle = index === 0 ? "rgba(245,158,11,0.13)" : "rgba(255,255,255,0.040)";
    context.fillRect(x, yy, 190, 35);
    context.strokeRect(x, yy, 190, 35);
    label(context, term, x + 9, yy + 14, index === 0 ? "rgba(253,186,116,0.26)" : "rgba(226,232,240,0.15)");
    label(context, detail, x + 9, yy + 28, "rgba(148,163,184,0.12)");
  });
}

function drawGear(context: CanvasRenderingContext2D, x: number, y: number, radius: number, teeth: number, rotation: number, fill: string, stroke: string) {
  context.save();
  context.translate(x, y);
  context.rotate(rotation);
  context.fillStyle = fill;
  context.strokeStyle = stroke;
  context.lineWidth = 1.5;
  context.beginPath(); context.arc(0, 0, radius - 7, 0, Math.PI * 2); context.fill(); context.stroke();
  for (let tooth = 0; tooth < teeth; tooth += 1) {
    const angle = (tooth / teeth) * Math.PI * 2;
    context.save(); context.rotate(angle); context.fillRect(-4, -radius, 8, 12); context.restore();
  }
  context.beginPath(); context.arc(0, 0, radius * 0.48, 0, Math.PI * 2); context.strokeStyle = "rgba(251,191,36,0.08)"; context.stroke();
  context.beginPath(); context.arc(0, 0, 9, 0, Math.PI * 2); context.fillStyle = "rgba(120,53,15,0.28)"; context.fill();
  context.restore();
}

function drawShaft(context: CanvasRenderingContext2D, x: number, y: number, radius: number, stroke: string) {
  context.beginPath(); context.arc(x, y, radius, 0, Math.PI * 2); context.strokeStyle = stroke; context.stroke();
  context.beginPath(); context.arc(x, y, radius * 0.35, 0, Math.PI * 2); context.stroke();
}

function drawDimension(context: CanvasRenderingContext2D, aX: number, aY: number, bX: number, bY: number, text: string) {
  context.strokeStyle = "rgba(203,213,225,0.09)";
  context.lineWidth = 1;
  context.beginPath(); context.moveTo(aX, aY); context.lineTo(bX, bY); context.moveTo(aX, aY - 5); context.lineTo(aX, aY + 5); context.moveTo(bX, bY - 5); context.lineTo(bX, bY + 5); context.stroke();
  label(context, text, (aX + bX) / 2 - 48, aY - 8, "rgba(203,213,225,0.12)");
}

function arrowHead(context: CanvasRenderingContext2D, x: number, y: number, angle: number, color: string) {
  context.save(); context.translate(x, y); context.rotate(angle); context.fillStyle = color; context.beginPath(); context.moveTo(0, 0); context.lineTo(-6, 10); context.lineTo(6, 10); context.closePath(); context.fill(); context.restore();
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
  context.beginPath(); context.moveTo(x + r, y); context.lineTo(x + width - r, y); context.quadraticCurveTo(x + width, y, x + width, y + r); context.lineTo(x + width, y + height - r); context.quadraticCurveTo(x + width, y + height, x + width - r, y + height); context.lineTo(x + r, y + height); context.quadraticCurveTo(x, y + height, x, y + height - r); context.lineTo(x, y + r); context.quadraticCurveTo(x, y, x + r, y); context.closePath();
}

function label(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.60, height * 0.50, Math.min(width, height) * 0.14, width * 0.60, height * 0.50, Math.max(width, height) * 0.80);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.72, "rgba(8,6,4,0.12)");
  gradient.addColorStop(1, "rgba(8,6,4,0.72)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
