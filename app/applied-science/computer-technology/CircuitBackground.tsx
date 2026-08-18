"use client";

import { useEffect, useRef } from "react";

type Point = { x: number; y: number };

type Module = {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  detail: string;
  rgb: string;
};

const MODULES: readonly Module[] = [
  { x: -310, y: -126, w: 138, h: 84, title: "POWER", detail: "battery + regulation", rgb: "251,191,36" },
  { x: -310, y: 20, w: 138, h: 82, title: "SENSOR", detail: "physical input", rgb: "94,234,212" },
  { x: -72, y: -74, w: 168, h: 126, title: "PROCESSOR", detail: "compute + control", rgb: "192,132,252" },
  { x: -64, y: 82, w: 142, h: 68, title: "MEMORY", detail: "state + software", rgb: "125,211,252" },
  { x: 150, y: -124, w: 138, h: 82, title: "RADIO", detail: "network link", rgb: "56,189,248" },
  { x: 150, y: 18, w: 138, h: 82, title: "ACTUATOR", detail: "physical output", rgb: "248,113,113" },
  { x: -52, y: -224, w: 144, h: 64, title: "INTERFACE", detail: "display + controls", rgb: "244,114,182" },
] as const;

export default function CircuitBackground() {
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
      draw(53);
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
      drawDeviceBench(context, width, height, reducedMotion ? 53 : time);
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
      <div className="absolute inset-x-0 top-0 h-[16%] bg-gradient-to-b from-[#060b12]/94 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#060b12]/94 to-transparent" />
    </div>
  );
}

function drawGround(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#060b12");
  gradient.addColorStop(0.50, "#0b101c");
  gradient.addColorStop(1, "#0c0b12");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.68, height * 0.48, 0, width * 0.68, height * 0.48, Math.max(width, height) * 0.58);
  glow.addColorStop(0, "rgba(96,165,250,0.045)");
  glow.addColorStop(0.48, "rgba(192,132,252,0.016)");
  glow.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawDeviceBench(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const cx = width < 900 ? width * 0.60 : width * 0.69;
  const cy = height * 0.50;
  const scale = Math.min(width < 900 ? width / 790 : width / 1300, height / 900);
  context.save();
  context.translate(cx, cy);
  context.scale(scale, scale);

  // Bench datum and enclosure silhouette.
  context.strokeStyle = "rgba(148,163,184,0.06)";
  context.lineWidth = 1;
  for (let x = -430; x <= 390; x += 50) {
    context.beginPath();
    context.moveTo(x, -300);
    context.lineTo(x, 285);
    context.stroke();
  }
  for (let y = -280; y <= 260; y += 50) {
    context.beginPath();
    context.moveTo(-450, y);
    context.lineTo(420, y);
    context.stroke();
  }

  context.fillStyle = "rgba(15,23,42,0.22)";
  context.strokeStyle = "rgba(148,163,184,0.12)";
  roundRect(context, -390, -270, 735, 510, 36, true, true);
  context.setLineDash([6, 10]);
  context.strokeStyle = "rgba(125,211,252,0.12)";
  roundRect(context, -352, -236, 660, 438, 26, false, true);
  context.setLineDash([]);
  label(context, "ENCLOSURE / SERVICE VOLUME", -382, -286, "rgba(148,163,184,0.20)");

  // Internal modules.
  MODULES.forEach((module) => drawModule(context, module));

  // Power rail.
  const powerRail: Point[] = [
    { x: -172, y: -84 },
    { x: -120, y: -84 },
    { x: -120, y: 174 },
    { x: 264, y: 174 },
  ];
  drawPolyline(context, powerRail, "rgba(251,191,36,0.14)", 3);
  label(context, "POWER RAIL", -112, 192, "rgba(251,191,36,0.22)");
  lineArrow(context, { x: -120, y: -35 }, { x: -72, y: -35 }, "rgba(251,191,36,0.16)");
  lineArrow(context, { x: -120, y: 112 }, { x: -64, y: 112 }, "rgba(251,191,36,0.16)");
  lineArrow(context, { x: 220, y: 174 }, { x: 220, y: 100 }, "rgba(251,191,36,0.16)");
  lineArrow(context, { x: 245, y: 174 }, { x: 245, y: -42 }, "rgba(251,191,36,0.12)");

  // Data / control pathways.
  const signalPath: Point[] = [
    { x: -172, y: 61 },
    { x: -122, y: 61 },
    { x: -122, y: -12 },
    { x: -72, y: -12 },
    { x: 96, y: -12 },
    { x: 132, y: -12 },
    { x: 132, y: 59 },
    { x: 150, y: 59 },
  ];
  drawPolyline(context, signalPath, "rgba(94,234,212,0.15)", 2);
  lineArrow(context, signalPath[signalPath.length - 2], signalPath[signalPath.length - 1], "rgba(94,234,212,0.18)");
  label(context, "SENSE → DECIDE → ACT", -148, 88, "rgba(94,234,212,0.23)");

  const networkPath: Point[] = [
    { x: 96, y: -48 },
    { x: 126, y: -48 },
    { x: 126, y: -82 },
    { x: 150, y: -82 },
  ];
  drawPolyline(context, networkPath, "rgba(56,189,248,0.14)", 2);
  lineArrow(context, networkPath[networkPath.length - 2], networkPath[networkPath.length - 1], "rgba(56,189,248,0.18)");

  const interfacePath: Point[] = [
    { x: 12, y: -160 },
    { x: 12, y: -136 },
    { x: 12, y: -74 },
  ];
  drawPolyline(context, interfacePath, "rgba(244,114,182,0.14)", 2);

  // Ports, fasteners, service notes.
  drawPort(context, -354, 154, "USB / SERVICE");
  drawPort(context, 300, 138, "I/O");
  [[-350,-230], [300,-230], [-350,195], [300,195]].forEach(([x, y]) => drawFastener(context, x, y));
  label(context, "FASTENERS", 254, 222, "rgba(148,163,184,0.16)");
  label(context, "THERMAL PATH", 105, 128, "rgba(248,113,113,0.17)");
  context.strokeStyle = "rgba(248,113,113,0.09)";
  for (let i = 0; i < 5; i += 1) {
    context.beginPath();
    context.moveTo(95 + i * 18, 72);
    context.lineTo(112 + i * 18, 116);
    context.stroke();
  }

  // One diagnostic pulse follows the sense → decide → act path.
  const pulse = pointOnPolyline(signalPath, (time * 0.030) % 1);
  const halo = context.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, 30);
  halo.addColorStop(0, "rgba(94,234,212,0.30)");
  halo.addColorStop(1, "rgba(94,234,212,0)");
  context.fillStyle = halo;
  context.beginPath();
  context.arc(pulse.x, pulse.y, 30, 0, Math.PI * 2);
  context.fill();
  context.fillStyle = "rgba(153,246,228,0.68)";
  context.beginPath();
  context.arc(pulse.x, pulse.y, 2.8, 0, Math.PI * 2);
  context.fill();

  context.restore();

  if (width >= 760) {
    context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
    context.fillStyle = "rgba(186,230,253,0.18)";
    context.fillText("EXPLODED DEVICE BENCH · POWER · SIGNAL · COMPUTE · NETWORK · ACTUATION · INTERFACE", width * 0.055, height * 0.82);
  }
}

function drawModule(context: CanvasRenderingContext2D, module: Module) {
  const { x, y, w, h, title, detail, rgb } = module;
  context.fillStyle = `rgba(${rgb},0.035)`;
  context.strokeStyle = `rgba(${rgb},0.19)`;
  context.lineWidth = 1.1;
  roundRect(context, x, y, w, h, 12, true, true);
  context.strokeStyle = `rgba(${rgb},0.09)`;
  context.beginPath();
  context.moveTo(x + 12, y + 30);
  context.lineTo(x + w - 12, y + 30);
  context.stroke();
  label(context, title, x + 12, y + 19, `rgba(${rgb},0.52)`);
  label(context, detail, x + 12, y + h - 12, "rgba(203,213,225,0.18)");

  if (title === "PROCESSOR") {
    context.strokeStyle = `rgba(${rgb},0.12)`;
    for (let row = 0; row < 3; row += 1) {
      for (let col = 0; col < 4; col += 1) {
        context.strokeRect(x + 18 + col * 31, y + 42 + row * 20, 20, 11);
      }
    }
  }
  if (title === "MEMORY") {
    for (let col = 0; col < 6; col += 1) {
      context.fillStyle = `rgba(${rgb},0.085)`;
      context.fillRect(x + 13 + col * 20, y + 34, 12, 19);
    }
  }
  if (title === "RADIO") {
    context.strokeStyle = `rgba(${rgb},0.13)`;
    for (let r = 14; r <= 34; r += 10) {
      context.beginPath();
      context.arc(x + w - 28, y + 44, r, -0.9, 0.9);
      context.stroke();
    }
  }
  if (title === "ACTUATOR") {
    context.strokeStyle = `rgba(${rgb},0.16)`;
    context.beginPath();
    context.arc(x + w / 2, y + 48, 19, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.moveTo(x + w / 2 - 27, y + 48);
    context.lineTo(x + w / 2 + 27, y + 48);
    context.stroke();
  }
}

function drawPort(context: CanvasRenderingContext2D, x: number, y: number, title: string) {
  context.fillStyle = "rgba(148,163,184,0.06)";
  context.strokeStyle = "rgba(148,163,184,0.14)";
  context.fillRect(x, y, 54, 20);
  context.strokeRect(x, y, 54, 20);
  label(context, title, x, y + 35, "rgba(148,163,184,0.18)");
}

function drawFastener(context: CanvasRenderingContext2D, x: number, y: number) {
  context.strokeStyle = "rgba(148,163,184,0.14)";
  context.beginPath();
  context.arc(x, y, 6, 0, Math.PI * 2);
  context.stroke();
  context.beginPath();
  context.moveTo(x - 3, y - 3);
  context.lineTo(x + 3, y + 3);
  context.moveTo(x + 3, y - 3);
  context.lineTo(x - 3, y + 3);
  context.stroke();
}

function drawPolyline(context: CanvasRenderingContext2D, points: readonly Point[], color: string, lineWidth: number) {
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.beginPath();
  points.forEach((point, index) => index === 0 ? context.moveTo(point.x, point.y) : context.lineTo(point.x, point.y));
  context.stroke();
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

function pointOnPolyline(points: readonly Point[], t: number) {
  const distances: number[] = [];
  let total = 0;
  for (let index = 0; index < points.length - 1; index += 1) {
    const distance = Math.hypot(points[index + 1].x - points[index].x, points[index + 1].y - points[index].y);
    distances.push(distance);
    total += distance;
  }
  let target = total * t;
  for (let index = 0; index < distances.length; index += 1) {
    if (target <= distances[index]) {
      const local = distances[index] === 0 ? 0 : target / distances[index];
      return {
        x: points[index].x + (points[index + 1].x - points[index].x) * local,
        y: points[index].y + (points[index + 1].y - points[index].y) * local,
      };
    }
    target -= distances[index];
  }
  return points[points.length - 1];
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

function label(context: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) {
  context.font = "9px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillStyle = color;
  context.fillText(text, x, y);
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createRadialGradient(width * 0.62, height * 0.48, Math.min(width, height) * 0.17, width * 0.62, height * 0.48, Math.max(width, height) * 0.78);
  gradient.addColorStop(0, "rgba(0,0,0,0)");
  gradient.addColorStop(0.74, "rgba(3,7,18,0.14)");
  gradient.addColorStop(1, "rgba(3,7,18,0.66)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}
