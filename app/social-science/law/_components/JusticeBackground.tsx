"use client";

import { useEffect, useRef } from "react";

type Tier = {
  y: number;
  width: number;
  label: string;
  rgb: string;
};

const TIERS: readonly Tier[] = [
  { y: 0.27, width: 0.42, label: "HIGHER REVIEW", rgb: "251,191,36" },
  { y: 0.49, width: 0.58, label: "APPELLATE REVIEW", rgb: "125,211,252" },
  { y: 0.73, width: 0.76, label: "TRIAL RECORD", rgb: "94,234,212" },
] as const;

export default function JusticeBackground() {
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
      draw(48);
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
      drawCourt(context, width, height);
      drawAuthorityFlow(context, width, height, reducedMotion ? 48 : time);
      drawScale(context, width, height, reducedMotion ? 48 : time);
      drawMarginNotes(context, width, height);
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
      <div className="absolute inset-x-0 top-0 h-[17%] bg-gradient-to-b from-[#090909]/86 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#090909]/82 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#090909");
  gradient.addColorStop(0.45, "#11110f");
  gradient.addColorStop(1, "#070708");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  for (let index = 0; index < 58; index += 1) {
    const x = ((index * 173) % 997) / 997 * width;
    const y = ((index * 263) % 991) / 991 * height;
    context.fillStyle = index % 4 === 0 ? "rgba(251,191,36,0.035)" : "rgba(226,232,240,0.022)";
    context.fillRect(x, y, 1, 1);
  }
  context.restore();
}

function drawCourt(context: CanvasRenderingContext2D, width: number, height: number) {
  const cx = width * (width < 900 ? 0.52 : 0.62);
  const courtWidth = Math.min(width * (width < 900 ? 0.90 : 0.66), 980);
  const left = cx - courtWidth / 2;
  const right = cx + courtWidth / 2;
  const roofY = height * 0.14;
  const baseY = height * 0.83;

  context.save();
  context.strokeStyle = "rgba(212,212,216,0.16)";
  context.lineWidth = 1.2;

  // Pediment
  context.beginPath();
  context.moveTo(left + courtWidth * 0.14, roofY + 58);
  context.lineTo(cx, roofY);
  context.lineTo(right - courtWidth * 0.14, roofY + 58);
  context.closePath();
  context.stroke();
  context.beginPath();
  context.moveTo(left + courtWidth * 0.09, roofY + 70);
  context.lineTo(right - courtWidth * 0.09, roofY + 70);
  context.stroke();

  // Columns
  const columns = width < 720 ? 5 : 9;
  for (let index = 0; index < columns; index += 1) {
    const t = columns === 1 ? 0.5 : index / (columns - 1);
    const x = left + courtWidth * (0.15 + t * 0.70);
    const top = roofY + 78;
    context.strokeStyle = index % 2 === 0 ? "rgba(212,212,216,0.13)" : "rgba(161,161,170,0.10)";
    context.beginPath();
    context.moveTo(x - 5, top);
    context.lineTo(x - 5, baseY - 26);
    context.moveTo(x + 5, top);
    context.lineTo(x + 5, baseY - 26);
    context.moveTo(x - 12, top);
    context.lineTo(x + 12, top);
    context.moveTo(x - 14, baseY - 26);
    context.lineTo(x + 14, baseY - 26);
    context.stroke();
  }

  // Three legal-authority tiers inside the courthouse
  TIERS.forEach((tier, index) => {
    const y = height * tier.y;
    const tierWidth = courtWidth * tier.width;
    context.fillStyle = `rgba(${tier.rgb},0.025)`;
    context.strokeStyle = `rgba(${tier.rgb},${0.13 + index * 0.015})`;
    context.beginPath();
    context.roundRect(cx - tierWidth / 2, y - 28, tierWidth, 56, 10);
    context.fill();
    context.stroke();
    context.fillStyle = `rgba(${tier.rgb},0.31)`;
    context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.textAlign = "center";
    context.fillText(tier.label, cx, y + 4);
  });

  // Ground / steps
  context.strokeStyle = "rgba(212,212,216,0.13)";
  [0, 1, 2, 3].forEach((step) => {
    const inset = step * courtWidth * 0.035;
    const y = baseY + step * 14;
    context.beginPath();
    context.moveTo(left + inset, y);
    context.lineTo(right - inset, y);
    context.stroke();
  });
  context.restore();
}

function drawAuthorityFlow(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const cx = width * (width < 900 ? 0.52 : 0.62);
  const courtWidth = Math.min(width * (width < 900 ? 0.90 : 0.66), 980);
  const leftX = cx - courtWidth * 0.31;
  const rightX = cx + courtWidth * 0.31;
  const bottom = height * 0.76;
  const top = height * 0.25;

  context.save();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(203,213,225,0.28)";
  context.textAlign = "center";
  context.fillText("APPEAL / REVIEW ↑", leftX, bottom + 40);
  context.fillText("AUTHORITY / PRECEDENT ↓", rightX, bottom + 40);

  context.strokeStyle = "rgba(125,211,252,0.12)";
  context.beginPath();
  context.moveTo(leftX, bottom);
  context.bezierCurveTo(leftX - 34, height * 0.62, leftX + 30, height * 0.43, leftX, top);
  context.stroke();

  context.strokeStyle = "rgba(251,191,36,0.13)";
  context.beginPath();
  context.moveTo(rightX, top);
  context.bezierCurveTo(rightX + 38, height * 0.40, rightX - 26, height * 0.59, rightX, bottom);
  context.stroke();

  const appealProgress = (time * 0.018) % 1;
  const authorityProgress = (time * 0.014 + 0.42) % 1;
  const appeal = cubicPoint(
    { x: leftX, y: bottom },
    { x: leftX - 34, y: height * 0.62 },
    { x: leftX + 30, y: height * 0.43 },
    { x: leftX, y: top },
    appealProgress,
  );
  const authority = cubicPoint(
    { x: rightX, y: top },
    { x: rightX + 38, y: height * 0.40 },
    { x: rightX - 26, y: height * 0.59 },
    { x: rightX, y: bottom },
    authorityProgress,
  );

  drawCaseFile(context, appeal.x, appeal.y, "rgba(125,211,252,0.62)");
  drawAuthorityPulse(context, authority.x, authority.y);
  context.restore();
}

function drawCaseFile(context: CanvasRenderingContext2D, x: number, y: number, stroke: string) {
  context.save();
  context.translate(x, y);
  context.rotate(-0.04);
  context.fillStyle = "rgba(24,24,27,0.78)";
  context.strokeStyle = stroke;
  context.lineWidth = 1;
  context.beginPath();
  context.roundRect(-17, -22, 34, 44, 4);
  context.fill();
  context.stroke();
  context.strokeStyle = "rgba(212,212,216,0.24)";
  for (let row = 0; row < 4; row += 1) {
    context.beginPath();
    context.moveTo(-10, -11 + row * 8);
    context.lineTo(9 - row * 2, -11 + row * 8);
    context.stroke();
  }
  context.restore();
}

function drawAuthorityPulse(context: CanvasRenderingContext2D, x: number, y: number) {
  const glow = context.createRadialGradient(x, y, 0, x, y, 18);
  glow.addColorStop(0, "rgba(251,191,36,0.58)");
  glow.addColorStop(1, "rgba(251,191,36,0)");
  context.fillStyle = glow;
  context.fillRect(x - 20, y - 20, 40, 40);
  context.fillStyle = "rgba(253,230,138,0.70)";
  context.beginPath();
  context.arc(x, y, 3, 0, Math.PI * 2);
  context.fill();
}

function drawScale(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  if (width < 820) return;
  const cx = width * 0.15;
  const cy = height * 0.45;
  const sway = Math.sin(time * 0.06) * 0.025;
  context.save();
  context.translate(cx, cy);
  context.rotate(sway);
  context.strokeStyle = "rgba(251,191,36,0.22)";
  context.lineWidth = 1.4;
  context.beginPath();
  context.moveTo(0, -92);
  context.lineTo(0, 78);
  context.moveTo(-90, -42);
  context.lineTo(90, -42);
  context.stroke();
  drawPan(context, -90, -42, -3);
  drawPan(context, 90, -42, 3);
  context.beginPath();
  context.moveTo(-28, 80);
  context.lineTo(28, 80);
  context.stroke();
  context.restore();
}

function drawPan(context: CanvasRenderingContext2D, x: number, y: number, dy: number) {
  context.strokeStyle = "rgba(212,212,216,0.18)";
  context.beginPath();
  context.moveTo(x, y);
  context.lineTo(x - 36, y + 56 + dy);
  context.moveTo(x, y);
  context.lineTo(x + 36, y + 56 + dy);
  context.stroke();
  context.beginPath();
  context.ellipse(x, y + 59 + dy, 42, 10, 0, 0, Math.PI);
  context.stroke();
}

function drawMarginNotes(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 850) return;
  const x = width * 0.035;
  const y = height * 0.72;
  context.save();
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(161,161,170,0.26)";
  ["LAW / AUTHORITY / PROCEDURE", "SCHEMATIC COURT HIERARCHY", "APPEALS MOVE UP", "BINDING AUTHORITY CAN MOVE DOWN", "JURISDICTION DEFINES REACH"].forEach((line, index) => context.fillText(line, x, y + index * 18));
  context.restore();
}

function cubicPoint(a: { x: number; y: number }, b: { x: number; y: number }, c: { x: number; y: number }, d: { x: number; y: number }, t: number) {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * a.x + 3 * mt * mt * t * b.x + 3 * mt * t * t * c.x + t * t * t * d.x,
    y: mt * mt * mt * a.y + 3 * mt * mt * t * b.y + 3 * mt * t * t * c.y + t * t * t * d.y,
  };
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.61, height * 0.51, Math.min(width, height) * 0.23, width * 0.61, height * 0.51, Math.max(width, height) * 0.78);
  vignette.addColorStop(0, "rgba(9,9,11,0)");
  vignette.addColorStop(1, "rgba(5,5,5,0.66)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
