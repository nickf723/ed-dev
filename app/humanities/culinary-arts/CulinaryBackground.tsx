"use client";

import { useEffect, useRef } from "react";

type SteamWisp = { phase: number; offset: number; scale: number };

export default function CulinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wisps: SteamWisp[] = [
      { phase: 0.2, offset: -18, scale: 0.92 },
      { phase: 2.2, offset: 8, scale: 1.08 },
      { phase: 4.1, offset: 28, scale: 0.82 },
    ];
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
      draw(31);
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
      drawRoom(context, width, height);
      drawTicketRail(context, width, height);
      drawPrepStation(context, width, height);
      drawHeatStation(context, width, height);
      drawPass(context, width, height);
      drawSteam(context, width, height, reducedMotion ? 31 : time, wisps);
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

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full bg-[#140d08]" aria-hidden="true" />;
}

function drawRoom(context: CanvasRenderingContext2D, width: number, height: number) {
  const wall = context.createLinearGradient(0, 0, 0, height);
  wall.addColorStop(0, "#17100c");
  wall.addColorStop(0.50, "#1a120d");
  wall.addColorStop(1, "#0e0a08");
  context.fillStyle = wall;
  context.fillRect(0, 0, width, height);

  const lamp = context.createRadialGradient(width * 0.62, height * 0.34, 0, width * 0.62, height * 0.34, Math.max(width, height) * 0.46);
  lamp.addColorStop(0, "rgba(255,237,213,0.045)");
  lamp.addColorStop(0.42, "rgba(251,146,60,0.016)");
  lamp.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = lamp;
  context.fillRect(0, 0, width, height);

  const counterY = height * 0.68;
  context.fillStyle = "rgba(120,79,48,0.075)";
  context.fillRect(0, counterY, width, height - counterY);
  context.strokeStyle = "rgba(251,191,36,0.055)";
  context.beginPath();
  context.moveTo(0, counterY);
  context.lineTo(width, counterY);
  context.stroke();

  for (let y = counterY + 20; y < height; y += 13) {
    context.strokeStyle = "rgba(255,255,255,0.010)";
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y + Math.sin(y * 0.04) * 3);
    context.stroke();
  }
}

function drawTicketRail(context: CanvasRenderingContext2D, width: number, height: number) {
  const left = width * (width < 780 ? 0.10 : 0.32);
  const top = height * 0.18;
  const railWidth = width * (width < 780 ? 0.78 : 0.57);

  context.strokeStyle = "rgba(214,211,209,0.08)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(left, top);
  context.lineTo(left + railWidth, top);
  context.stroke();
  label(context, "ORDER RAIL · TIMING / SEQUENCE / HANDOFF", left, top - 14, "rgba(251,191,36,0.17)");

  const tickets = width < 780 ? 3 : 5;
  for (let index = 0; index < tickets; index += 1) {
    const x = left + 18 + index * (railWidth / tickets);
    const y = top + 10 + (index % 2) * 5;
    const w = Math.min(92, railWidth / tickets - 14);
    const h = 74;
    context.fillStyle = index === 1 ? "rgba(251,191,36,0.030)" : "rgba(250,250,249,0.022)";
    context.strokeStyle = index === 1 ? "rgba(251,191,36,0.10)" : "rgba(250,250,249,0.055)";
    context.fillRect(x, y, w, h);
    context.strokeRect(x, y, w, h);
    label(context, `TICKET ${String(index + 1).padStart(2, "0")}`, x + 8, y + 16, index === 1 ? "rgba(253,230,138,0.19)" : "rgba(214,211,209,0.11)");
    for (let row = 0; row < 3; row += 1) {
      context.strokeStyle = "rgba(214,211,209,0.045)";
      context.beginPath();
      context.moveTo(x + 8, y + 31 + row * 12);
      context.lineTo(x + w - 9 - row * 5, y + 31 + row * 12);
      context.stroke();
    }
  }
}

function drawPrepStation(context: CanvasRenderingContext2D, width: number, height: number) {
  const scale = Math.min(width / 1440, height / 900);
  const x = width * (width < 850 ? 0.10 : 0.34);
  const y = height * 0.51;
  const boardW = 330 * scale;
  const boardH = 170 * scale;

  context.save();
  context.translate(x + boardW / 2, y + boardH / 2);
  context.rotate(-0.025);
  context.fillStyle = "rgba(181,113,67,0.065)";
  context.strokeStyle = "rgba(251,191,36,0.10)";
  roundedRect(context, -boardW / 2, -boardH / 2, boardW, boardH, 14 * scale);
  context.fill();
  context.stroke();
  context.restore();

  label(context, "MISE EN PLACE · PREP STATION", x, y - 18, "rgba(251,191,36,0.18)");

  // Knife.
  context.save();
  context.translate(x + boardW * 0.12, y + boardH * 0.62);
  context.rotate(-0.20);
  context.fillStyle = "rgba(226,232,240,0.08)";
  context.strokeStyle = "rgba(226,232,240,0.14)";
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(boardW * 0.39, 0);
  context.lineTo(boardW * 0.32, 13 * scale);
  context.lineTo(14 * scale, 10 * scale);
  context.closePath();
  context.fill();
  context.stroke();
  context.fillStyle = "rgba(87,60,44,0.20)";
  roundedRect(context, -50 * scale, -3 * scale, 58 * scale, 15 * scale, 6 * scale);
  context.fill();
  context.restore();

  // Ingredient piles on board.
  const piles = [
    { px: 0.53, py: 0.35, rgb: "74,222,128", count: 7 },
    { px: 0.68, py: 0.53, rgb: "251,146,60", count: 6 },
    { px: 0.82, py: 0.30, rgb: "244,114,182", count: 5 },
  ] as const;
  piles.forEach((pile, pileIndex) => {
    for (let index = 0; index < pile.count; index += 1) {
      const angle = (index / pile.count) * Math.PI * 2 + pileIndex;
      const radius = (9 + (index % 3) * 6) * scale;
      context.beginPath();
      context.arc(x + boardW * pile.px + Math.cos(angle) * radius, y + boardH * pile.py + Math.sin(angle) * radius * 0.62, 5 * scale, 0, Math.PI * 2);
      context.fillStyle = `rgba(${pile.rgb},0.11)`;
      context.strokeStyle = `rgba(${pile.rgb},0.18)`;
      context.fill();
      context.stroke();
    }
  });

  // Mise bowls.
  const bowlY = y + boardH + 28 * scale;
  const bowlColors = ["190,242,100", "125,211,252", "251,191,36", "244,114,182"] as const;
  bowlColors.forEach((rgb, index) => {
    const bx = x + 35 * scale + index * 72 * scale;
    context.beginPath();
    context.ellipse(bx, bowlY, 26 * scale, 10 * scale, 0, 0, Math.PI * 2);
    context.fillStyle = `rgba(${rgb},0.035)`;
    context.strokeStyle = `rgba(${rgb},0.12)`;
    context.fill();
    context.stroke();
    context.beginPath();
    context.ellipse(bx, bowlY - 2 * scale, 16 * scale, 5 * scale, 0, 0, Math.PI * 2);
    context.fillStyle = `rgba(${rgb},0.08)`;
    context.fill();
  });
}

function drawHeatStation(context: CanvasRenderingContext2D, width: number, height: number) {
  const scale = Math.min(width / 1440, height / 900);
  const cx = width * (width < 850 ? 0.64 : 0.66);
  const cy = height * 0.56;
  const burnerRadius = 86 * scale;

  label(context, "HEAT · CONTACT / AIR / MOISTURE / TIME", cx - 145 * scale, cy - 132 * scale, "rgba(251,113,133,0.17)");

  context.beginPath();
  context.arc(cx, cy, burnerRadius, 0, Math.PI * 2);
  context.strokeStyle = "rgba(248,113,113,0.11)";
  context.lineWidth = 2;
  context.stroke();
  context.beginPath();
  context.arc(cx, cy, burnerRadius * 0.68, 0, Math.PI * 2);
  context.strokeStyle = "rgba(251,146,60,0.095)";
  context.stroke();
  for (let index = 0; index < 12; index += 1) {
    const angle = (index / 12) * Math.PI * 2;
    context.beginPath();
    context.moveTo(cx + Math.cos(angle) * burnerRadius * 0.74, cy + Math.sin(angle) * burnerRadius * 0.74);
    context.lineTo(cx + Math.cos(angle) * burnerRadius * 0.92, cy + Math.sin(angle) * burnerRadius * 0.92);
    context.strokeStyle = "rgba(251,146,60,0.075)";
    context.stroke();
  }

  // Pan.
  context.fillStyle = "rgba(148,163,184,0.045)";
  context.strokeStyle = "rgba(203,213,225,0.12)";
  context.beginPath();
  context.ellipse(cx, cy - 8 * scale, 72 * scale, 48 * scale, -0.08, 0, Math.PI * 2);
  context.fill();
  context.stroke();
  context.beginPath();
  context.ellipse(cx, cy - 8 * scale, 54 * scale, 33 * scale, -0.08, 0, Math.PI * 2);
  context.strokeStyle = "rgba(251,146,60,0.12)";
  context.stroke();
  context.save();
  context.translate(cx + 59 * scale, cy + 10 * scale);
  context.rotate(0.20);
  context.fillStyle = "rgba(71,85,105,0.14)";
  context.strokeStyle = "rgba(203,213,225,0.08)";
  roundedRect(context, 0, -8 * scale, 120 * scale, 17 * scale, 7 * scale);
  context.fill();
  context.stroke();
  context.restore();

  // Oven / holding cabinet edge.
  if (width > 980) {
    const ox = width * 0.86;
    const oy = height * 0.43;
    const ow = width * 0.105;
    const oh = height * 0.26;
    context.fillStyle = "rgba(100,116,139,0.018)";
    context.strokeStyle = "rgba(203,213,225,0.055)";
    context.fillRect(ox, oy, ow, oh);
    context.strokeRect(ox, oy, ow, oh);
    context.strokeRect(ox + 12, oy + 35, ow - 24, oh - 52);
    label(context, "OVEN / HOLD", ox + 10, oy + 22, "rgba(203,213,225,0.11)");
    context.beginPath();
    context.arc(ox + ow - 20, oy + 19, 5, 0, Math.PI * 2);
    context.fillStyle = "rgba(251,146,60,0.18)";
    context.fill();
  }
}

function drawPass(context: CanvasRenderingContext2D, width: number, height: number) {
  const scale = Math.min(width / 1440, height / 900);
  const x = width * (width < 850 ? 0.70 : 0.75);
  const y = height * 0.73;
  const plateR = 74 * scale;

  context.strokeStyle = "rgba(251,191,36,0.075)";
  context.beginPath();
  context.moveTo(x - 145 * scale, y - 102 * scale);
  context.lineTo(x + 145 * scale, y - 102 * scale);
  context.stroke();
  label(context, "PASS · TASTE / FINISH / SERVE", x - 145 * scale, y - 116 * scale, "rgba(251,191,36,0.18)");

  context.beginPath();
  context.arc(x, y, plateR, 0, Math.PI * 2);
  context.fillStyle = "rgba(250,250,249,0.025)";
  context.strokeStyle = "rgba(250,250,249,0.10)";
  context.fill();
  context.stroke();
  context.beginPath();
  context.arc(x, y, plateR * 0.62, 0, Math.PI * 2);
  context.strokeStyle = "rgba(250,250,249,0.05)";
  context.stroke();

  // Plated elements.
  context.beginPath();
  context.ellipse(x - 13 * scale, y + 5 * scale, 34 * scale, 20 * scale, -0.35, 0, Math.PI * 2);
  context.fillStyle = "rgba(251,146,60,0.09)";
  context.fill();
  for (let index = 0; index < 6; index += 1) {
    const angle = index * 1.1;
    context.beginPath();
    context.arc(x + 30 * scale + Math.cos(angle) * 16 * scale, y - 18 * scale + Math.sin(angle) * 13 * scale, 5 * scale, 0, Math.PI * 2);
    context.fillStyle = index % 2 ? "rgba(190,242,100,0.12)" : "rgba(74,222,128,0.10)";
    context.fill();
  }

  // Tasting spoon.
  context.save();
  context.translate(x - 122 * scale, y + 56 * scale);
  context.rotate(-0.18);
  context.beginPath();
  context.ellipse(0, 0, 15 * scale, 9 * scale, 0, 0, Math.PI * 2);
  context.strokeStyle = "rgba(226,232,240,0.12)";
  context.stroke();
  context.beginPath();
  context.moveTo(14 * scale, 0);
  context.lineTo(105 * scale, 0);
  context.stroke();
  context.restore();

  if (width > 980) {
    const noteX = x + 100 * scale;
    label(context, "CHECK", noteX, y - 5 * scale, "rgba(190,242,100,0.14)");
    label(context, "seasoning", noteX, y + 14 * scale, "rgba(214,211,209,0.09)");
    label(context, "temperature", noteX, y + 30 * scale, "rgba(214,211,209,0.09)");
    label(context, "texture", noteX, y + 46 * scale, "rgba(214,211,209,0.09)");
    label(context, "timing", noteX, y + 62 * scale, "rgba(214,211,209,0.09)");
  }
}

function drawSteam(context: CanvasRenderingContext2D, width: number, height: number, time: number, wisps: readonly SteamWisp[]) {
  const scale = Math.min(width / 1440, height / 900);
  const cx = width * (width < 850 ? 0.64 : 0.66);
  const baseY = height * 0.49;

  wisps.forEach((wisp) => {
    context.strokeStyle = "rgba(255,255,255,0.026)";
    context.lineWidth = 2.3 * scale * wisp.scale;
    context.beginPath();
    for (let segment = 0; segment <= 30; segment += 1) {
      const t = segment / 30;
      const y = baseY - t * 125 * scale;
      const drift = Math.sin(time * 0.24 + wisp.phase + t * 4.2) * 11 * scale + Math.sin(time * 0.07 + wisp.phase) * 5 * scale;
      const x = cx + wisp.offset * scale + drift;
      if (segment === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  });

  // A quiet heat halo, not a rapid animation.
  const breathe = 0.026 + (Math.sin(time * 0.16) + 1) * 0.006;
  const heat = context.createRadialGradient(cx, height * 0.56, 0, cx, height * 0.56, 150 * scale);
  heat.addColorStop(0, `rgba(251,113,133,${breathe})`);
  heat.addColorStop(0.65, "rgba(251,146,60,0.010)");
  heat.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = heat;
  context.fillRect(cx - 180 * scale, height * 0.40, 360 * scale, 300 * scale);
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
  const gradient = context.createRadialGradient(width * 0.60, height * 0.54, Math.min(width, height) * 0.14, width * 0.60, height * 0.54, Math.max(width, height) * 0.80);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.72, "rgba(10,6,4,0.12)");
  gradient.addColorStop(1, "rgba(10,6,4,0.72)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
