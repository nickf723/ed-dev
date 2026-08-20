"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

export default function SystemsBackground() {
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
      draw(47);
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
      drawControlRoom(context, width, height, reducedMotion ? 47 : time);
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
      <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-[#0a080b]/94 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#0a080b]/94 to-transparent" />
    </div>
  );
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0a080b");
  gradient.addColorStop(0.48, "#130b0e");
  gradient.addColorStop(1, "#090a11");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.67, height * 0.48, 0, width * 0.67, height * 0.48, Math.max(width, height) * 0.58);
  glow.addColorStop(0, "rgba(248,113,113,0.045)");
  glow.addColorStop(0.52, "rgba(192,132,252,0.015)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawControlRoom(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const cx = width < 850 ? width * 0.57 : width * 0.68;
  const cy = height * 0.48;
  const scale = Math.min(width < 850 ? width / 760 : width / 1250, height / 850);

  context.save();
  context.translate(cx, cy);
  context.scale(scale, scale);

  // System boundary
  context.strokeStyle = "rgba(248,113,113,0.10)";
  context.setLineDash([5, 9]);
  roundRect(context, -430, -250, 760, 500, 24, false, true);
  context.setLineDash([]);
  label(context, "SYSTEM BOUNDARY", -418, -267, "rgba(252,165,165,0.24)");

  // Stocks
  drawTank(context, -300, -70, 170, 170, 0.62, "STOCK A", "rgba(248,113,113,0.28)");
  drawTank(context, 60, -70, 170, 170, 0.40, "STOCK B", "rgba(192,132,252,0.26)");

  // Inflow / transfer / outflow pipes
  drawFlow(context, { x: -430, y: 15 }, { x: -300, y: 15 }, "INPUT", "rgba(251,146,60,0.22)");
  drawFlow(context, { x: -130, y: 15 }, { x: 60, y: 15 }, "TRANSFER", "rgba(248,113,113,0.22)");
  drawValve(context, -35, 15, "VALVE");
  drawFlow(context, { x: 230, y: 15 }, { x: 330, y: 15 }, "OUTPUT", "rgba(192,132,252,0.20)");

  // Delay block
  drawBlock(context, -70, 120, 130, 58, "DELAY", "τ", "rgba(251,191,36,0.18)");
  context.strokeStyle = "rgba(251,191,36,0.12)";
  context.beginPath();
  context.moveTo(-35, 44);
  context.lineTo(-35, 120);
  context.stroke();

  // Sensor / comparator / setpoint
  drawBlock(context, 90, -225, 140, 58, "SENSOR", "y(t)", "rgba(94,234,212,0.18)");
  drawBlock(context, -105, -225, 145, 58, "COMPARATOR", "error", "rgba(125,211,252,0.18)");
  drawBlock(context, -295, -225, 125, 58, "SETPOINT", "r(t)", "rgba(251,191,36,0.16)");

  lineArrow(context, { x: 145, y: -70 }, { x: 160, y: -167 }, "rgba(94,234,212,0.14)");
  lineArrow(context, { x: 90, y: -196 }, { x: 40, y: -196 }, "rgba(94,234,212,0.14)");
  lineArrow(context, { x: -170, y: -196 }, { x: -105, y: -196 }, "rgba(251,191,36,0.13)");
  lineArrow(context, { x: -32, y: -167 }, { x: -35, y: -20 }, "rgba(125,211,252,0.15)");

  // Balancing feedback loop path
  const balancingPath: Point[] = [
    { x: -35, y: -20 },
    { x: -35, y: -95 },
    { x: 160, y: -95 },
    { x: 160, y: -167 },
    { x: 40, y: -196 },
    { x: -32, y: -196 },
    { x: -35, y: -20 },
  ];
  context.strokeStyle = "rgba(94,234,212,0.09)";
  context.lineWidth = 1;
  context.beginPath();
  balancingPath.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
  context.stroke();
  label(context, "BALANCING FEEDBACK", 245, -132, "rgba(94,234,212,0.23)");
  label(context, "B", 310, -111, "rgba(94,234,212,0.32)");

  // Reinforcing loop, deliberately a different secondary path.
  context.strokeStyle = "rgba(251,146,60,0.09)";
  context.setLineDash([4, 8]);
  context.beginPath();
  context.moveTo(-215, 100);
  context.bezierCurveTo(-260, 210, -420, 200, -405, 45);
  context.stroke();
  context.setLineDash([]);
  label(context, "REINFORCING PATH", -420, 225, "rgba(251,146,60,0.20)");
  label(context, "R", -312, 225, "rgba(251,146,60,0.30)");

  // Disturbance entering across boundary.
  context.strokeStyle = "rgba(244,114,182,0.13)";
  context.setLineDash([3, 7]);
  context.beginPath();
  context.moveTo(330, -190);
  context.lineTo(205, -70);
  context.stroke();
  context.setLineDash([]);
  label(context, "DISTURBANCE", 270, -208, "rgba(244,114,182,0.22)");

  // One slow pulse on the balancing loop.
  const pulseT = (time * 0.035) % 1;
  const pulse = pointOnPolyline(balancingPath, pulseT);
  const halo = context.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 28);
  halo.addColorStop(0, "rgba(94,234,212,0.30)");
  halo.addColorStop(1, "rgba(94,234,212,0)");
  context.fillStyle = halo;
  context.beginPath();
  context.arc(pulse.x, pulse.y, 28, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(153,246,228,0.64)";
  context.beginPath();
  context.arc(pulse.x, pulse.y, 2.7, 0, Math.PI * 2);
  context.fill();

  context.restore();

  if (width >= 760) {
    context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.fillStyle = "rgba(254,202,202,0.20)";
    context.fillText("STOCKS · FLOWS · FEEDBACK · DELAYS · DISTURBANCE", width * 0.055, height * 0.80);
  }
}

function drawTank(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fillFraction: number, title: string, rgb: string) {
  context.fillStyle = "rgba(8,8,12,0.34)";
  context.strokeStyle = rgb;
  context.lineWidth = 1.2;
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  const fillH = h * fillFraction;
  const gradient = context.createLinearGradient(0, y + h - fillH, 0, y + h);
  gradient.addColorStop(0, rgb.replace(/0\.\d+\)/, "0.10)"));
  gradient.addColorStop(1, rgb.replace(/0\.\d+\)/, "0.22)"));
  context.fillStyle = gradient;
  context.fillRect(x + 1, y + h - fillH, w - 2, fillH - 1);
  label(context, title, x + 10, y - 10, rgb.replace(/0\.\d+\)/, "0.70)"));
  label(context, `${Math.round(fillFraction * 100)}%`, x + 10, y + h - 12, "rgba(226,232,240,0.28)");
}

function drawFlow(context: CanvasRenderingContext2D, a: Point, b: Point, title: string, color: string) {
  context.strokeStyle = color;
  context.lineWidth = 5;
  context.beginPath();
  context.moveTo(a.x, a.y);
  context.lineTo(b.x, b.y);
  context.stroke();
  lineArrow(context, { x: b.x - 18, y: b.y }, b, color);
  label(context, title, (a.x + b.x) / 2 - 22, a.y - 13, color.replace(/0\.\d+\)/, "0.78)"));
}

function drawValve(context: CanvasRenderingContext2D, x: number, y: number, title: string) {
  context.strokeStyle = "rgba(254,202,202,0.28)";
  context.fillStyle = "rgba(127,29,29,0.20)";
  context.beginPath();
  context.moveTo(x - 12, y - 11);
  context.lineTo(x, y);
  context.lineTo(x - 12, y + 11);
  context.closePath();
  context.fill();
  context.stroke();
  context.beginPath();
  context.moveTo(x + 12, y - 11);
  context.lineTo(x, y);
  context.lineTo(x + 12, y + 11);
  context.closePath();
  context.fill();
  context.stroke();
  label(context, title, x - 20, y + 31, "rgba(254,202,202,0.26)");
}

function drawBlock(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, title: string, value: string, color: string) {
  context.fillStyle = "rgba(8,8,12,0.38)";
  context.strokeStyle = color;
  context.fillRect(x, y, w, h);
  context.strokeRect(x, y, w, h);
  label(context, title, x + 9, y + 19, color.replace(/0\.\d+\)/, "0.78)"));
  label(context, value, x + 9, y + 40, "rgba(226,232,240,0.24)");
}

function lineArrow(context: CanvasRenderingContext2D, a: Point, b: Point, color: string) {
  context.strokeStyle = color;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(a.x, a.y);
  context.lineTo(b.x, b.y);
  context.stroke();
  const angle = Math.atan2(b.y - a.y, b.x - a.x);
  context.beginPath();
  context.moveTo(b.x, b.y);
  context.lineTo(b.x - Math.cos(angle - 0.55) * 8, b.y - Math.sin(angle - 0.55) * 8);
  context.moveTo(b.x, b.y);
  context.lineTo(b.x - Math.cos(angle + 0.55) * 8, b.y - Math.sin(angle + 0.55) * 8);
  context.stroke();
}

function label(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function roundRect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, fill: boolean, stroke: boolean) {
  context.beginPath();
  context.moveTo(x + r, y);
  context.lineTo(x + w - r, y);
  context.quadraticCurveTo(x + w, y, x + w, y + r);
  context.lineTo(x + w, y + h - r);
  context.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  context.lineTo(x + r, y + h);
  context.quadraticCurveTo(x, y + h, x, y + h - r);
  context.lineTo(x, y + r);
  context.quadraticCurveTo(x, y, x + r, y);
  context.closePath();
  if (fill) context.fill();
  if (stroke) context.stroke();
}

function pointOnPolyline(points: readonly Point[], t: number) {
  const distances: number[] = [];
  let total = 0;
  for (let i = 0; i < points.length - 1; i += 1) {
    const d = Math.hypot(points[i + 1].x - points[i].x, points[i + 1].y - points[i].y);
    distances.push(d);
    total += d;
  }
  let target = total * t;
  for (let i = 0; i < distances.length; i += 1) {
    if (target <= distances[i]) {
      const local = distances[i] === 0 ? 0 : target / distances[i];
      return {
        x: points[i].x + (points[i + 1].x - points[i].x) * local,
        y: points[i].y + (points[i + 1].y - points[i].y) * local,
      };
    }
    target -= distances[i];
  }
  return points[points.length - 1];
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.61, height * 0.49, Math.min(width, height) * 0.18, width * 0.61, height * 0.49, Math.max(width, height) * 0.78);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.73, "rgba(4,4,8,0.16)");
  gradient.addColorStop(1, "rgba(4,4,8,0.66)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
