"use client";

import { useEffect, useRef } from "react";

type IsoPoint = { x: number; y: number };
type GridPoint = { x: number; y: number };

export default function AgriBackground() {
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
      draw(41);
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
      drawSky(context, width, height);
      drawFarm(context, width, height, reducedMotion ? 41 : time);
      drawSoilEdge(context, width, height);
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
      <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-[#10170d]/88 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[17%] bg-gradient-to-t from-[#12100a]/88 to-transparent" />
    </div>
  );
}

function drawSky(context: CanvasRenderingContext2D, width: number, height: number) {
  const sky = context.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#111c12");
  sky.addColorStop(0.48, "#1a2515");
  sky.addColorStop(1, "#17140d");
  context.fillStyle = sky;
  context.fillRect(0, 0, width, height);

  const light = context.createRadialGradient(width * 0.72, height * 0.22, 0, width * 0.72, height * 0.22, Math.max(width, height) * 0.62);
  light.addColorStop(0, "rgba(253,230,138,0.070)");
  light.addColorStop(0.42, "rgba(134,239,172,0.020)");
  light.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = light;
  context.fillRect(0, 0, width, height);
}

function drawFarm(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const tileW = width < 760 ? 34 : Math.min(58, width * 0.038);
  const tileH = tileW * 0.48;
  const originX = width < 900 ? width * 0.54 : width * 0.70;
  const originY = height * (width < 760 ? 0.27 : 0.20);
  const iso = (point: GridPoint): IsoPoint => ({
    x: originX + (point.x - point.y) * tileW,
    y: originY + (point.x + point.y) * tileH,
  });

  drawBaseDiamond(context, iso, 0, 0, 12, 10);

  // Fields form a stable patchwork rather than cycling every plant independently.
  drawField(context, iso, 0.3, 0.4, 4.5, 3.1, "#675620", "rgba(250,204,21,0.30)", "grain", tileW);
  drawField(context, iso, 4.9, 0.4, 3.0, 3.1, "#264522", "rgba(74,222,128,0.26)", "cover", tileW);
  drawField(context, iso, 0.3, 3.9, 3.4, 3.0, "#28371d", "rgba(132,204,22,0.24)", "orchard", tileW);
  drawField(context, iso, 4.0, 3.9, 3.8, 3.0, "#314321", "rgba(134,239,172,0.16)", "pasture", tileW);
  drawField(context, iso, 0.3, 7.2, 4.2, 2.2, "#49351e", "rgba(251,146,60,0.14)", "residue", tileW);
  drawField(context, iso, 4.8, 7.2, 3.0, 2.2, "#24371e", "rgba(74,222,128,0.18)", "rows", tileW);

  drawGreenhouse(context, iso, 8.35, 0.8, 2.25, 2.1, tileW, tileH);
  drawFarmBuildings(context, iso, tileW, tileH);
  drawPond(context, iso, 8.2, 5.5, 2.7, 2.25);
  drawLane(context, iso);
  drawHedgerows(context, iso, tileW);
  drawIrrigation(context, iso, time, tileW);
  drawFarmLabels(context, iso, width);
}

function drawBaseDiamond(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint, x: number, y: number, w: number, h: number) {
  const points = [iso({ x, y }), iso({ x: x + w, y }), iso({ x: x + w, y: y + h }), iso({ x, y: y + h })];
  context.fillStyle = "rgba(48,39,20,0.94)";
  context.strokeStyle = "rgba(217,249,157,0.08)";
  polygon(context, points, true, true);
}

function drawField(
  context: CanvasRenderingContext2D,
  iso: (p: GridPoint) => IsoPoint,
  x: number,
  y: number,
  w: number,
  h: number,
  soil: string,
  crop: string,
  pattern: "grain" | "cover" | "orchard" | "pasture" | "residue" | "rows",
  tileW: number,
) {
  const corners = [iso({ x, y }), iso({ x: x + w, y }), iso({ x: x + w, y: y + h }), iso({ x, y: y + h })];
  context.fillStyle = soil;
  context.strokeStyle = "rgba(255,255,255,0.055)";
  polygon(context, corners, true, true);

  context.save();
  context.beginPath();
  corners.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
  context.closePath();
  context.clip();

  if (pattern === "orchard") {
    for (let gx = x + 0.45; gx < x + w; gx += 0.72) {
      for (let gy = y + 0.45; gy < y + h; gy += 0.72) {
        const p = iso({ x: gx, y: gy });
        context.strokeStyle = "rgba(101,67,33,0.44)";
        context.beginPath();
        context.moveTo(p.x, p.y + 6);
        context.lineTo(p.x, p.y - 7);
        context.stroke();
        context.fillStyle = "rgba(74,222,128,0.22)";
        context.beginPath();
        context.arc(p.x, p.y - 10, Math.max(3, tileW * 0.09), 0, Math.PI * 2);
        context.fill();
      }
    }
  } else if (pattern === "pasture") {
    for (let gx = x + 0.3; gx < x + w; gx += 0.55) {
      for (let gy = y + 0.3; gy < y + h; gy += 0.65) {
        const p = iso({ x: gx, y: gy });
        context.fillStyle = crop;
        context.fillRect(p.x - 1, p.y - 3, 2, 5);
      }
    }
    // A few stationary livestock cues, deliberately schematic.
    [
      { x: x + 1.1, y: y + 1.0 },
      { x: x + 2.35, y: y + 1.75 },
      { x: x + 2.9, y: y + 0.8 },
    ].forEach((animal) => {
      const p = iso(animal);
      context.fillStyle = "rgba(245,245,244,0.30)";
      context.fillRect(p.x - 4, p.y - 4, 8, 5);
      context.fillRect(p.x + 3, p.y - 6, 3, 3);
    });
  } else {
    const rowCount = pattern === "cover" ? 12 : pattern === "residue" ? 7 : 9;
    for (let row = 0; row < rowCount; row += 1) {
      const t = (row + 0.65) / rowCount;
      const a = iso({ x: x + t * w, y: y + 0.08 });
      const b = iso({ x: x + t * w, y: y + h - 0.08 });
      context.strokeStyle = crop;
      context.lineWidth = pattern === "cover" ? 2 : 1.15;
      context.setLineDash(pattern === "residue" ? [5, 6] : []);
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
    context.setLineDash([]);
  }
  context.restore();
}

function drawGreenhouse(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint, x: number, y: number, w: number, h: number, tileW: number, tileH: number) {
  const a = iso({ x, y });
  const b = iso({ x: x + w, y });
  const c = iso({ x: x + w, y: y + h });
  const d = iso({ x, y: y + h });
  const lift = tileH * 1.35;
  context.fillStyle = "rgba(186,230,253,0.040)";
  context.strokeStyle = "rgba(186,230,253,0.24)";
  polygon(context, [a, b, c, d], true, true);
  [a, b, c, d].forEach((point) => {
    context.beginPath();
    context.moveTo(point.x, point.y);
    context.lineTo(point.x, point.y - lift);
    context.stroke();
  });
  const topA = { x: a.x, y: a.y - lift };
  const topB = { x: b.x, y: b.y - lift };
  const topC = { x: c.x, y: c.y - lift };
  const topD = { x: d.x, y: d.y - lift };
  context.fillStyle = "rgba(125,211,252,0.055)";
  polygon(context, [topA, topB, topC, topD], true, true);
  const ridge1 = { x: (topA.x + topB.x) / 2, y: (topA.y + topB.y) / 2 - tileW * 0.20 };
  const ridge2 = { x: (topD.x + topC.x) / 2, y: (topD.y + topC.y) / 2 - tileW * 0.20 };
  context.beginPath();
  context.moveTo(topA.x, topA.y);
  context.lineTo(ridge1.x, ridge1.y);
  context.lineTo(topB.x, topB.y);
  context.moveTo(topD.x, topD.y);
  context.lineTo(ridge2.x, ridge2.y);
  context.lineTo(topC.x, topC.y);
  context.moveTo(ridge1.x, ridge1.y);
  context.lineTo(ridge2.x, ridge2.y);
  context.stroke();
}

function drawFarmBuildings(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint, tileW: number, tileH: number) {
  const base = iso({ x: 9.15, y: 3.75 });
  const w = tileW * 0.72;
  const h = tileH * 1.55;
  context.fillStyle = "rgba(120,53,15,0.34)";
  context.fillRect(base.x - w * 0.5, base.y - h, w, h);
  context.fillStyle = "rgba(127,29,29,0.32)";
  context.beginPath();
  context.moveTo(base.x - w * 0.6, base.y - h);
  context.lineTo(base.x, base.y - h - tileH * 0.85);
  context.lineTo(base.x + w * 0.6, base.y - h);
  context.closePath();
  context.fill();
  context.strokeStyle = "rgba(254,215,170,0.16)";
  context.strokeRect(base.x - w * 0.5, base.y - h, w, h);
}

function drawPond(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint, x: number, y: number, w: number, h: number) {
  const corners = [iso({ x, y }), iso({ x: x + w, y }), iso({ x: x + w, y: y + h }), iso({ x, y: y + h })];
  context.fillStyle = "rgba(14,116,144,0.28)";
  context.strokeStyle = "rgba(103,232,249,0.20)";
  polygon(context, corners, true, true);
  const center = iso({ x: x + w * 0.52, y: y + h * 0.52 });
  context.strokeStyle = "rgba(165,243,252,0.14)";
  context.beginPath();
  context.ellipse(center.x, center.y, 34, 10, 0, 0, Math.PI * 2);
  context.stroke();
}

function drawLane(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint) {
  const points = [
    iso({ x: 8.0, y: 0.2 }),
    iso({ x: 8.0, y: 3.6 }),
    iso({ x: 7.95, y: 7.0 }),
    iso({ x: 7.95, y: 9.6 }),
  ];
  context.strokeStyle = "rgba(214,211,209,0.12)";
  context.lineWidth = 9;
  context.beginPath();
  points.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
  context.stroke();
  context.strokeStyle = "rgba(120,113,108,0.30)";
  context.lineWidth = 1;
  context.stroke();
}

function drawHedgerows(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint, tileW: number) {
  const segments = [
    [{ x: 0.1, y: 3.55 }, { x: 7.7, y: 3.55 }],
    [{ x: 3.75, y: 3.75 }, { x: 3.75, y: 9.45 }],
    [{ x: 0.1, y: 7.0 }, { x: 7.7, y: 7.0 }],
  ] as const;
  segments.forEach(([start, end]) => {
    const steps = 16;
    for (let i = 0; i <= steps; i += 1) {
      const t = i / steps;
      const p = iso({ x: start.x + (end.x - start.x) * t, y: start.y + (end.y - start.y) * t });
      context.fillStyle = i % 2 === 0 ? "rgba(74,222,128,0.18)" : "rgba(34,197,94,0.14)";
      context.beginPath();
      context.arc(p.x, p.y - tileW * 0.06, Math.max(2, tileW * 0.055), 0, Math.PI * 2);
      context.fill();
    }
  });
}

function drawIrrigation(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint, time: number, tileW: number) {
  const channel = [
    iso({ x: 10.5, y: 6.2 }),
    iso({ x: 8.1, y: 5.2 }),
    iso({ x: 7.7, y: 3.5 }),
    iso({ x: 6.2, y: 2.3 }),
    iso({ x: 3.0, y: 1.8 }),
  ];
  context.strokeStyle = "rgba(34,211,238,0.12)";
  context.lineWidth = Math.max(2, tileW * 0.055);
  context.beginPath();
  channel.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
  context.stroke();

  const t = (Math.sin(time * 0.11) + 1) / 2;
  const segmentCount = channel.length - 1;
  const scaled = t * segmentCount;
  const index = Math.min(segmentCount - 1, Math.floor(scaled));
  const local = scaled - index;
  const a = channel[index];
  const b = channel[index + 1];
  const x = a.x + (b.x - a.x) * local;
  const y = a.y + (b.y - a.y) * local;
  const glow = context.createRadialGradient(x, y, 0, x, y, tileW * 0.28);
  glow.addColorStop(0, "rgba(103,232,249,0.26)");
  glow.addColorStop(1, "rgba(103,232,249,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, tileW * 0.28, 0, Math.PI * 2);
  context.fill();
}

function drawFarmLabels(context: CanvasRenderingContext2D, iso: (p: GridPoint) => IsoPoint, width: number) {
  if (width < 760) return;
  const labels = [
    { point: { x: 1.25, y: 1.0 }, label: "FIELD A · GRAIN" },
    { point: { x: 5.5, y: 0.8 }, label: "COVER CROP" },
    { point: { x: 0.9, y: 4.5 }, label: "ORCHARD" },
    { point: { x: 5.0, y: 4.7 }, label: "PASTURE" },
    { point: { x: 8.4, y: 5.7 }, label: "WATER" },
    { point: { x: 8.6, y: 0.7 }, label: "PROTECTED CULTURE" },
  ] as const;
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  labels.forEach(({ point, label }) => {
    const p = iso(point);
    context.fillStyle = "rgba(236,252,203,0.25)";
    context.fillText(label, p.x + 5, p.y - 8);
  });
}

function drawSoilEdge(context: CanvasRenderingContext2D, width: number, height: number) {
  const top = height * 0.82;
  const gradient = context.createLinearGradient(0, top, 0, height);
  gradient.addColorStop(0, "rgba(87,61,30,0.45)");
  gradient.addColorStop(0.28, "rgba(72,48,25,0.48)");
  gradient.addColorStop(1, "rgba(36,27,18,0.65)");
  context.fillStyle = gradient;
  context.fillRect(0, top, width, height - top);

  context.strokeStyle = "rgba(217,249,157,0.07)";
  context.beginPath();
  context.moveTo(0, top);
  context.lineTo(width, top);
  context.stroke();

  // Root systems make the below-ground half of agriculture visible.
  const rootCenters = width < 800 ? [0.22, 0.56, 0.82] : [0.12, 0.30, 0.52, 0.73, 0.90];
  rootCenters.forEach((fraction, index) => {
    const rootX = width * fraction;
    const depth = height * (0.08 + (index % 3) * 0.025);
    context.strokeStyle = index % 2 === 0 ? "rgba(190,242,100,0.10)" : "rgba(253,230,138,0.085)";
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(rootX, top);
    context.bezierCurveTo(rootX - 8, top + depth * 0.35, rootX + 11, top + depth * 0.68, rootX - 4, top + depth);
    context.stroke();
    for (let branch = 1; branch <= 3; branch += 1) {
      const by = top + depth * (branch / 4);
      context.beginPath();
      context.moveTo(rootX, by);
      context.lineTo(rootX + (branch % 2 === 0 ? 18 : -18), by + 14);
      context.stroke();
    }
  });

  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = "rgba(236,252,203,0.20)";
  context.fillText("TOPSOIL · ORGANIC MATTER · ROOTS · WATER · NUTRIENT CYCLING", 22, top + 23);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.62, height * 0.48, Math.min(width, height) * 0.18, width * 0.62, height * 0.48, Math.max(width, height) * 0.76);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.74, "rgba(12,13,8,0.12)");
  gradient.addColorStop(1, "rgba(12,10,7,0.58)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function polygon(context: CanvasRenderingContext2D, points: readonly IsoPoint[], fill: boolean, stroke: boolean) {
  context.beginPath();
  points.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
  context.closePath();
  if (fill) context.fill();
  if (stroke) context.stroke();
}
