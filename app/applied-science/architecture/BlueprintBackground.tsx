"use client";

import { useEffect, useRef } from "react";

type Room = {
  floor: number;
  bay: number;
  label: string;
  open?: boolean;
};

const ROOMS: readonly Room[] = [
  { floor: 0, bay: 0, label: "ENTRY" },
  { floor: 0, bay: 1, label: "COMMON" },
  { floor: 0, bay: 2, label: "COURT", open: true },
  { floor: 0, bay: 3, label: "WORK" },
  { floor: 1, bay: 0, label: "STUDIO" },
  { floor: 1, bay: 1, label: "STUDIO" },
  { floor: 1, bay: 2, label: "VOID", open: true },
  { floor: 1, bay: 3, label: "MEET" },
  { floor: 2, bay: 0, label: "READ" },
  { floor: 2, bay: 1, label: "GALLERY" },
  { floor: 2, bay: 2, label: "VOID", open: true },
  { floor: 2, bay: 3, label: "QUIET" },
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
      draw(58);
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
      drawGrid(context, width, height);
      drawBuildingSection(context, width, height, reducedMotion ? 58 : time);
      drawPlanInset(context, width, height);
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
      <div className="absolute inset-x-0 top-0 h-[17%] bg-gradient-to-b from-[#04111d]/84 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[17%] bg-gradient-to-t from-[#04111d]/80 to-transparent" />
    </div>
  );
}

function drawPaper(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#061725");
  gradient.addColorStop(0.54, "#082238");
  gradient.addColorStop(1, "#04101d");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.62, height * 0.48, 0, width * 0.62, height * 0.48, Math.max(width, height) * 0.58);
  glow.addColorStop(0, "rgba(125,211,252,0.065)");
  glow.addColorStop(0.52, "rgba(56,189,248,0.022)");
  glow.addColorStop(1, "rgba(2,6,23,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawGrid(context: CanvasRenderingContext2D, width: number, height: number) {
  const minor = width < 800 ? 32 : 42;
  context.save();
  for (let x = 0; x <= width; x += minor) {
    const major = Math.round(x / minor) % 5 === 0;
    context.strokeStyle = major ? "rgba(186,230,253,0.052)" : "rgba(186,230,253,0.020)";
    context.lineWidth = major ? 1 : 0.7;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y <= height; y += minor) {
    const major = Math.round(y / minor) % 5 === 0;
    context.strokeStyle = major ? "rgba(186,230,253,0.052)" : "rgba(186,230,253,0.020)";
    context.lineWidth = major ? 1 : 0.7;
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function drawBuildingSection(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const left = width * (width < 900 ? 0.07 : 0.31);
  const right = width * 0.93;
  const baseY = height * 0.80;
  const topY = height * 0.25;
  const buildingW = right - left;
  const buildingH = baseY - topY;
  const floorH = buildingH / 3;
  const bayW = buildingW / 4;

  drawSite(context, left, right, baseY, width, height);
  drawSunlight(context, left, right, topY, baseY, width, height, time);

  context.save();
  context.strokeStyle = "rgba(224,242,254,0.33)";
  context.lineWidth = 1.4;

  for (let floor = 0; floor <= 3; floor += 1) {
    const y = baseY - floor * floorH;
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(right, y);
    context.stroke();
  }

  for (let bay = 0; bay <= 4; bay += 1) {
    const x = left + bay * bayW;
    context.beginPath();
    context.moveTo(x, topY);
    context.lineTo(x, baseY);
    context.stroke();
  }

  // Envelope and roof profile
  context.lineWidth = 2.2;
  context.strokeStyle = "rgba(186,230,253,0.43)";
  context.beginPath();
  context.moveTo(left - 8, baseY);
  context.lineTo(left - 8, topY - 20);
  context.lineTo(left + buildingW * 0.56, topY - 20);
  context.lineTo(left + buildingW * 0.63, topY - 58);
  context.lineTo(right + 8, topY - 58);
  context.lineTo(right + 8, baseY);
  context.stroke();

  ROOMS.forEach((room, index) => {
    const x = left + room.bay * bayW;
    const y = baseY - (room.floor + 1) * floorH;
    if (room.open) {
      context.fillStyle = "rgba(56,189,248,0.020)";
      context.fillRect(x + 4, y + 4, bayW - 8, floorH - 8);
      context.strokeStyle = "rgba(125,211,252,0.10)";
      context.setLineDash([5, 7]);
      context.strokeRect(x + 8, y + 8, bayW - 16, floorH - 16);
      context.setLineDash([]);
    } else {
      context.fillStyle = index % 3 === 0 ? "rgba(251,191,36,0.018)" : "rgba(186,230,253,0.018)";
      context.fillRect(x + 4, y + 4, bayW - 8, floorH - 8);
    }
    context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.fillStyle = "rgba(224,242,254,0.20)";
    context.fillText(room.label, x + 10, y + 18);
  });

  // Stairs across the first two bays
  drawStair(context, left + bayW * 0.14, baseY - floorH * 0.05, bayW * 1.35, floorH * 0.86, 12);
  drawStair(context, left + bayW * 0.14, baseY - floorH * 1.05, bayW * 1.35, floorH * 0.86, 12);

  // Courtyard tree cue
  const courtX = left + bayW * 2.5;
  const courtBase = baseY - floorH * 0.04;
  context.strokeStyle = "rgba(94,234,212,0.24)";
  context.beginPath();
  context.moveTo(courtX, courtBase);
  context.lineTo(courtX, courtBase - floorH * 1.36);
  context.stroke();
  context.fillStyle = "rgba(94,234,212,0.045)";
  context.strokeStyle = "rgba(94,234,212,0.18)";
  context.beginPath();
  context.arc(courtX, courtBase - floorH * 1.48, Math.min(38, bayW * 0.24), 0, Math.PI * 2);
  context.fill();
  context.stroke();

  context.restore();

  drawDimensions(context, left, right, topY, baseY, floorH);
}

function drawSite(context: CanvasRenderingContext2D, left: number, right: number, baseY: number, width: number, height: number) {
  context.save();
  context.strokeStyle = "rgba(94,234,212,0.16)";
  context.lineWidth = 1;
  const siteLeft = Math.max(0, left - width * 0.14);
  const siteRight = Math.min(width, right + width * 0.07);
  for (let contour = 0; contour < 5; contour += 1) {
    const y = baseY + 20 + contour * 15;
    context.beginPath();
    context.moveTo(siteLeft, y);
    const span = siteRight - siteLeft;
    for (let step = 1; step <= 12; step += 1) {
      const t = step / 12;
      context.lineTo(siteLeft + span * t, y + Math.sin(t * Math.PI * 2 + contour * 0.6) * (4 + contour));
    }
    context.stroke();
  }
  context.fillStyle = "rgba(153,246,228,0.22)";
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText("SITE DATUM +0.00", left, baseY + 18);
  context.restore();
}

function drawSunlight(context: CanvasRenderingContext2D, left: number, right: number, topY: number, baseY: number, width: number, height: number, time: number) {
  const cycle = (Math.sin(time * 0.025) + 1) / 2;
  const sunX = left - width * 0.06 + cycle * (right - left + width * 0.12);
  const sunY = topY - height * (0.13 + Math.sin(cycle * Math.PI) * 0.07);
  const courtyardX = left + (right - left) * 0.625;

  const halo = context.createRadialGradient(sunX, sunY, 0, sunX, sunY, 42);
  halo.addColorStop(0, "rgba(253,230,138,0.20)");
  halo.addColorStop(1, "rgba(253,230,138,0)");
  context.fillStyle = halo;
  context.fillRect(sunX - 45, sunY - 45, 90, 90);
  context.strokeStyle = "rgba(253,230,138,0.30)";
  context.beginPath();
  context.arc(sunX, sunY, 7, 0, Math.PI * 2);
  context.stroke();

  context.save();
  context.strokeStyle = "rgba(253,230,138,0.085)";
  context.lineWidth = 1;
  [0.33, 0.52, 0.69].forEach((fraction) => {
    const targetX = courtyardX + (fraction - 0.52) * (right - left) * 0.18;
    context.beginPath();
    context.moveTo(sunX, sunY);
    context.lineTo(targetX, baseY - (baseY - topY) * 0.03);
    context.stroke();
  });
  context.restore();

  // Daylight footprint through the courtyard opening
  const footprintX = courtyardX + (cycle - 0.5) * (right - left) * 0.20;
  const footprint = context.createLinearGradient(footprintX - 55, 0, footprintX + 55, 0);
  footprint.addColorStop(0, "rgba(253,230,138,0)");
  footprint.addColorStop(0.5, "rgba(253,230,138,0.055)");
  footprint.addColorStop(1, "rgba(253,230,138,0)");
  context.fillStyle = footprint;
  context.fillRect(footprintX - 55, topY, 110, baseY - topY);

  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(253,230,138,0.28)";
  context.fillText("DAYLIGHT STUDY", Math.min(width - 110, sunX + 12), Math.max(20, sunY - 10));
}

function drawStair(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, steps: number) {
  context.save();
  context.strokeStyle = "rgba(192,132,252,0.22)";
  context.lineWidth = 1;
  const stepW = width / steps;
  const stepH = height / steps;
  context.beginPath();
  context.moveTo(x, y);
  for (let index = 0; index < steps; index += 1) {
    context.lineTo(x + stepW * (index + 1), y);
    context.lineTo(x + stepW * (index + 1), y - stepH * (index + 1));
  }
  context.stroke();
  context.restore();
}

function drawDimensions(context: CanvasRenderingContext2D, left: number, right: number, topY: number, baseY: number, floorH: number) {
  context.save();
  context.strokeStyle = "rgba(186,230,253,0.17)";
  context.fillStyle = "rgba(186,230,253,0.25)";
  context.lineWidth = 1;
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";

  const dimY = baseY + 78;
  context.beginPath();
  context.moveTo(left, dimY);
  context.lineTo(right, dimY);
  context.moveTo(left, dimY - 7);
  context.lineTo(left, dimY + 7);
  context.moveTo(right, dimY - 7);
  context.lineTo(right, dimY + 7);
  context.stroke();
  context.textAlign = "center";
  context.fillText("BUILDING SECTION / 4 BAYS", (left + right) / 2, dimY - 8);

  const dimX = right + 34;
  context.beginPath();
  context.moveTo(dimX, topY);
  context.lineTo(dimX, baseY);
  for (let floor = 0; floor <= 3; floor += 1) {
    const y = baseY - floor * floorH;
    context.moveTo(dimX - 6, y);
    context.lineTo(dimX + 6, y);
  }
  context.stroke();
  context.save();
  context.translate(dimX + 16, (topY + baseY) / 2);
  context.rotate(Math.PI / 2);
  context.fillText("3 OCCUPIED LEVELS", 0, 0);
  context.restore();
  context.restore();
}

function drawPlanInset(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 950) return;
  const x = width * 0.045;
  const y = height * 0.53;
  const w = width * 0.20;
  const h = height * 0.22;
  context.save();
  context.strokeStyle = "rgba(186,230,253,0.16)";
  context.fillStyle = "rgba(4,17,29,0.22)";
  context.lineWidth = 1;
  context.strokeRect(x, y, w, h);
  context.fillRect(x, y, w, h);
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(186,230,253,0.28)";
  context.fillText("LEVEL 01 / PLAN INSET", x + 10, y + 18);

  const innerX = x + 18;
  const innerY = y + 34;
  const innerW = w - 36;
  const innerH = h - 50;
  context.strokeStyle = "rgba(186,230,253,0.14)";
  context.strokeRect(innerX, innerY, innerW, innerH);
  context.beginPath();
  context.moveTo(innerX + innerW * 0.38, innerY);
  context.lineTo(innerX + innerW * 0.38, innerY + innerH);
  context.moveTo(innerX + innerW * 0.70, innerY);
  context.lineTo(innerX + innerW * 0.70, innerY + innerH);
  context.moveTo(innerX, innerY + innerH * 0.48);
  context.lineTo(innerX + innerW * 0.70, innerY + innerH * 0.48);
  context.stroke();
  context.strokeStyle = "rgba(94,234,212,0.22)";
  context.setLineDash([4, 5]);
  context.strokeRect(innerX + innerW * 0.70, innerY, innerW * 0.30, innerH);
  context.setLineDash([]);
  context.restore();
}

function drawNotes(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 860) return;
  context.save();
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(186,230,253,0.24)";
  const x = width * 0.045;
  const y = height * 0.30;
  ["ARCHITECTURAL SECTION", "SPACE + STRUCTURE + ENVELOPE", "COURTYARD DAYLIGHT VOID", "CIRCULATION: TWO STAIR RUNS", "SITE + PLAN + SECTION COORDINATED"].forEach((line, index) => context.fillText(line, x, y + index * 18));
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.63, height * 0.52, Math.min(width, height) * 0.24, width * 0.63, height * 0.52, Math.max(width, height) * 0.78);
  vignette.addColorStop(0, "rgba(2,6,23,0)");
  vignette.addColorStop(1, "rgba(2,7,14,0.62)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
