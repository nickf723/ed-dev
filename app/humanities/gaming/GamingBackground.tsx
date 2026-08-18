"use client";

import { useEffect, useRef } from "react";

export default function GamingBackground() {
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
      draw(29);
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
      drawTable(context, width, height);
      drawGameBoard(context, width, height);
      drawCardsAndDice(context, width, height);
      drawCharacterSheet(context, width, height);
      drawController(context, width, height);
      drawRulebook(context, width, height);
      drawTurnRail(context, width, height, reducedMotion ? 29 : time);
      drawLamp(context, width, height, reducedMotion ? 29 : time);
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

function drawTable(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#090815");
  gradient.addColorStop(0.48, "#0d0b1a");
  gradient.addColorStop(1, "#071116");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255,255,255,0.018)";
  for (let y = 12; y < height; y += 15) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y + Math.sin(y * 0.03) * 4);
    context.stroke();
  }
}

function drawGameBoard(context: CanvasRenderingContext2D, width: number, height: number) {
  const scale = Math.min(width / 1440, height / 900);
  const cx = width * (width < 900 ? 0.58 : 0.62);
  const cy = height * 0.51;
  const cell = 50 * scale;
  const board = cell * 7;
  const left = cx - board * 0.47;
  const top = cy - board * 0.52;

  context.save();
  context.translate(cx, cy);
  context.rotate(-0.035);
  context.translate(-cx, -cy);

  context.fillStyle = "rgba(217,70,239,0.022)";
  context.strokeStyle = "rgba(217,70,239,0.12)";
  context.lineWidth = 1;
  context.fillRect(left, top, board, board);
  context.strokeRect(left, top, board, board);

  for (let row = 0; row < 7; row += 1) {
    for (let col = 0; col < 7; col += 1) {
      const x = left + col * cell;
      const y = top + row * cell;
      context.fillStyle = (row + col) % 2 === 0 ? "rgba(34,211,238,0.018)" : "rgba(192,132,252,0.015)";
      context.fillRect(x, y, cell, cell);
      context.strokeStyle = "rgba(226,232,240,0.045)";
      context.strokeRect(x, y, cell, cell);
    }
  }

  const blocked = [[1,1],[2,4],[3,2],[4,4],[5,3]] as const;
  blocked.forEach(([row, col]) => {
    context.fillStyle = "rgba(248,113,113,0.045)";
    context.strokeStyle = "rgba(248,113,113,0.13)";
    context.fillRect(left + col * cell + 5, top + row * cell + 5, cell - 10, cell - 10);
    context.strokeRect(left + col * cell + 5, top + row * cell + 5, cell - 10, cell - 10);
  });

  pawn(context, left + cell * 0.5, top + cell * 5.5, "rgba(34,211,238,0.55)");
  pawn(context, left + cell * 5.5, top + cell * 1.5, "rgba(244,114,182,0.50)");
  pawn(context, left + cell * 4.5, top + cell * 5.5, "rgba(251,191,36,0.42)");
  context.strokeStyle = "rgba(52,211,153,0.22)";
  context.lineWidth = 2;
  context.strokeRect(left + cell * 5 + 7, top + cell * 0 + 7, cell - 14, cell - 14);
  label(context, "GOAL", left + cell * 5 + 12, top + cell * 0 + 27, "rgba(134,239,172,0.24)");
  label(context, "RULES DEFINE LEGAL MOVES", left, top - 16, "rgba(34,211,238,0.20)");
  context.restore();
}

function drawCardsAndDice(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 780) return;
  const x = width * 0.08;
  const y = height * 0.29;

  card(context, x, y, 88, 124, -0.12, "DRAW 2", "rgba(251,191,36,0.08)");
  card(context, x + 48, y + 25, 88, 124, 0.03, "SWAP", "rgba(244,114,182,0.07)");
  card(context, x + 96, y + 8, 88, 124, 0.13, "BLOCK", "rgba(96,165,250,0.07)");

  const dx = x + 45;
  const dy = y + 182;
  context.fillStyle = "rgba(250,250,249,0.04)";
  context.strokeStyle = "rgba(250,250,249,0.11)";
  roundedRect(context, dx, dy, 48, 48, 8);
  context.fill();
  context.stroke();
  [[13,13],[35,13],[24,24],[13,35],[35,35]].forEach(([px,py]) => { context.beginPath(); context.arc(dx + px, dy + py, 2.5, 0, Math.PI*2); context.fillStyle = "rgba(250,250,249,0.20)"; context.fill(); });
  label(context, "CHANCE / HIDDEN INFORMATION", x, dy + 72, "rgba(251,191,36,0.16)");
}

function drawCharacterSheet(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 900) return;
  const x = width * 0.075;
  const y = height * 0.63;
  const w = 220;
  const h = 142;
  context.fillStyle = "rgba(52,211,153,0.018)";
  context.strokeStyle = "rgba(52,211,153,0.075)";
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  label(context, "CHARACTER / ROLE / FICTION", x + 12, y + 22, "rgba(134,239,172,0.17)");
  context.strokeStyle = "rgba(134,239,172,0.075)";
  context.beginPath(); context.arc(x + 44, y + 64, 24, 0, Math.PI * 2); context.stroke();
  for (let row = 0; row < 4; row += 1) { context.beginPath(); context.moveTo(x + 86, y + 50 + row * 18); context.lineTo(x + w - 16 - row * 13, y + 50 + row * 18); context.stroke(); }
  context.strokeRect(x + 15, y + 108, 45, 18);
  context.strokeRect(x + 70, y + 108, 45, 18);
  context.strokeRect(x + 125, y + 108, 45, 18);
}

function drawController(context: CanvasRenderingContext2D, width: number, height: number) {
  const x = width * 0.78;
  const y = height * 0.64;
  const scale = Math.min(width / 1440, height / 900);
  context.save();
  context.translate(x, y);
  context.scale(scale, scale);
  context.fillStyle = "rgba(34,211,238,0.018)";
  context.strokeStyle = "rgba(34,211,238,0.095)";
  context.lineWidth = 1.3;
  context.beginPath();
  context.moveTo(-95, -22); context.quadraticCurveTo(-78, -66, -35, -57); context.lineTo(35, -57); context.quadraticCurveTo(78, -66, 95, -22); context.lineTo(76, 35); context.quadraticCurveTo(61, 61, 34, 30); context.lineTo(-34, 30); context.quadraticCurveTo(-61, 61, -76, 35); context.closePath();
  context.fill(); context.stroke();
  context.beginPath(); context.moveTo(-57,-17); context.lineTo(-57,11); context.moveTo(-71,-3); context.lineTo(-43,-3); context.stroke();
  [[50,-12],[64,2],[36,2],[50,16]].forEach(([px,py]) => { context.beginPath(); context.arc(px, py, 5, 0, Math.PI*2); context.stroke(); });
  label(context, "INPUT / FEEDBACK / SOFTWARE AFFORDANCE", -106, 78, "rgba(103,232,249,0.16)");
  context.restore();
}

function drawRulebook(context: CanvasRenderingContext2D, width: number, height: number) {
  const x = width * 0.72;
  const y = height * 0.23;
  const w = Math.min(260, width * 0.19);
  const h = 160;
  context.save();
  context.translate(x + w / 2, y + h / 2);
  context.rotate(0.055);
  context.fillStyle = "rgba(192,132,252,0.018)";
  context.strokeStyle = "rgba(192,132,252,0.08)";
  context.fillRect(-w / 2, -h / 2, w, h);
  context.strokeRect(-w / 2, -h / 2, w, h);
  label(context, "RULEBOOK", -w / 2 + 14, -h / 2 + 24, "rgba(216,180,254,0.20)");
  const rules = ["1. SETUP CREATES STATE", "2. TURN DEFINES ACTION", "3. COST LIMITS CHOICE", "4. FEEDBACK UPDATES STATE", "5. END CONDITION CLOSES PLAY"];
  rules.forEach((rule, index) => label(context, rule, -w / 2 + 14, -h / 2 + 52 + index * 19, "rgba(203,213,225,0.12)"));
  context.restore();
}

function drawTurnRail(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const railX = width * 0.72;
  const railY = height * 0.84;
  const railW = Math.min(width * 0.23, 330);
  label(context, "TURN ORDER / STATE ADVANCE", railX, railY - 16, "rgba(244,114,182,0.17)");
  context.strokeStyle = "rgba(244,114,182,0.09)";
  context.beginPath(); context.moveTo(railX, railY); context.lineTo(railX + railW, railY); context.stroke();
  const slots = 5;
  for (let i = 0; i < slots; i += 1) {
    const x = railX + (railW / (slots - 1)) * i;
    context.beginPath(); context.arc(x, railY, 6, 0, Math.PI * 2); context.strokeStyle = "rgba(244,114,182,0.13)"; context.stroke();
  }
  const progress = (Math.sin(time * 0.045) + 1) / 2;
  const active = Math.round(progress * (slots - 1));
  const ax = railX + (railW / (slots - 1)) * active;
  context.beginPath(); context.arc(ax, railY, 4, 0, Math.PI * 2); context.fillStyle = "rgba(244,114,182,0.62)"; context.shadowBlur = 10; context.shadowColor = "rgba(244,114,182,0.45)"; context.fill(); context.shadowBlur = 0;
}

function drawLamp(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const drift = Math.sin(time * 0.012) * width * 0.025;
  const x = width * 0.58 + drift;
  const y = height * 0.47;
  const glow = context.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.44);
  glow.addColorStop(0, "rgba(255,244,214,0.055)");
  glow.addColorStop(0.42, "rgba(255,244,214,0.020)");
  glow.addColorStop(1, "rgba(255,244,214,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function card(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, rotation: number, text: string, tint: string) {
  context.save();
  context.translate(x + w / 2, y + h / 2);
  context.rotate(rotation);
  context.fillStyle = "rgba(250,250,249,0.024)";
  context.strokeStyle = "rgba(250,250,249,0.08)";
  roundedRect(context, -w/2, -h/2, w, h, 8); context.fill(); context.stroke();
  context.fillStyle = tint; roundedRect(context, -w/2, -h/2, w, h, 8); context.fill();
  label(context, text, -w/2 + 12, -h/2 + 24, "rgba(250,250,249,0.19)");
  context.beginPath(); context.arc(0, 14, 20, 0, Math.PI*2); context.strokeStyle = "rgba(250,250,249,0.07)"; context.stroke();
  context.restore();
}

function pawn(context: CanvasRenderingContext2D, x: number, y: number, color: string) {
  context.fillStyle = color;
  context.beginPath(); context.arc(x, y - 8, 6, 0, Math.PI*2); context.fill();
  context.beginPath(); context.moveTo(x - 7, y + 10); context.lineTo(x - 4, y - 1); context.lineTo(x + 4, y - 1); context.lineTo(x + 7, y + 10); context.closePath(); context.fill();
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
  const gradient = context.createRadialGradient(width * 0.59, height * 0.48, Math.min(width, height) * 0.14, width * 0.59, height * 0.48, Math.max(width, height) * 0.79);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.73, "rgba(3,4,12,0.14)");
  gradient.addColorStop(1, "rgba(3,4,12,0.73)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
