"use client";

import { useEffect, useRef } from "react";

type P = { x: number; y: number };

type City = P & { size: number; phase: number };

type Route = {
  from: P;
  to: P;
  bend: number;
  phase: number;
  rgb: string;
};

const LAND: P[][] = [
  [
    { x: -0.84, y: -0.47 }, { x: -0.70, y: -0.62 }, { x: -0.48, y: -0.63 }, { x: -0.28, y: -0.48 },
    { x: -0.18, y: -0.30 }, { x: -0.28, y: -0.16 }, { x: -0.43, y: -0.12 }, { x: -0.48, y: 0.02 },
    { x: -0.63, y: -0.02 }, { x: -0.72, y: -0.18 }, { x: -0.88, y: -0.25 },
  ],
  [
    { x: -0.42, y: 0.05 }, { x: -0.24, y: 0.10 }, { x: -0.15, y: 0.25 }, { x: -0.20, y: 0.47 },
    { x: -0.31, y: 0.72 }, { x: -0.43, y: 0.55 }, { x: -0.50, y: 0.31 }, { x: -0.52, y: 0.13 },
  ],
  [
    { x: -0.08, y: -0.38 }, { x: 0.10, y: -0.46 }, { x: 0.29, y: -0.39 }, { x: 0.35, y: -0.25 },
    { x: 0.26, y: -0.15 }, { x: 0.11, y: -0.17 }, { x: -0.02, y: -0.25 },
  ],
  [
    { x: 0.03, y: -0.10 }, { x: 0.27, y: -0.13 }, { x: 0.38, y: 0.06 }, { x: 0.31, y: 0.34 },
    { x: 0.18, y: 0.56 }, { x: 0.04, y: 0.38 }, { x: -0.03, y: 0.12 },
  ],
  [
    { x: 0.22, y: -0.48 }, { x: 0.48, y: -0.58 }, { x: 0.76, y: -0.50 }, { x: 0.91, y: -0.31 },
    { x: 0.82, y: -0.12 }, { x: 0.61, y: -0.05 }, { x: 0.54, y: 0.08 }, { x: 0.39, y: 0.02 },
    { x: 0.33, y: -0.18 }, { x: 0.19, y: -0.28 },
  ],
  [
    { x: 0.59, y: 0.35 }, { x: 0.79, y: 0.31 }, { x: 0.88, y: 0.44 }, { x: 0.78, y: 0.58 },
    { x: 0.59, y: 0.55 }, { x: 0.52, y: 0.44 },
  ],
  [
    { x: -0.23, y: -0.73 }, { x: -0.10, y: -0.78 }, { x: -0.02, y: -0.67 }, { x: -0.12, y: -0.58 },
  ],
];

const CITIES: City[] = [
  { x: -0.67, y: -0.22, size: 3.2, phase: 0.4 },
  { x: -0.46, y: -0.18, size: 3.0, phase: 1.2 },
  { x: -0.38, y: 0.41, size: 2.8, phase: 2.4 },
  { x: 0.02, y: -0.31, size: 3.1, phase: 1.8 },
  { x: 0.12, y: -0.24, size: 2.6, phase: 3.2 },
  { x: 0.20, y: 0.02, size: 2.8, phase: 0.8 },
  { x: 0.36, y: -0.23, size: 3.3, phase: 2.0 },
  { x: 0.50, y: -0.20, size: 3.4, phase: 4.1 },
  { x: 0.63, y: -0.30, size: 3.4, phase: 0.2 },
  { x: 0.76, y: -0.22, size: 3.0, phase: 2.8 },
  { x: 0.70, y: 0.43, size: 2.9, phase: 3.7 },
  { x: 0.26, y: 0.30, size: 2.5, phase: 1.1 },
  { x: -0.28, y: 0.18, size: 2.4, phase: 5.0 },
];

const ROUTES: Route[] = [
  { from: { x: -0.67, y: -0.22 }, to: { x: 0.02, y: -0.31 }, bend: -0.24, phase: 0.10, rgb: "56,189,248" },
  { from: { x: 0.02, y: -0.31 }, to: { x: 0.63, y: -0.30 }, bend: -0.20, phase: 0.42, rgb: "167,139,250" },
  { from: { x: 0.36, y: -0.23 }, to: { x: 0.76, y: -0.22 }, bend: -0.15, phase: 0.72, rgb: "94,234,212" },
  { from: { x: -0.38, y: 0.41 }, to: { x: 0.20, y: 0.02 }, bend: -0.10, phase: 0.28, rgb: "244,114,182" },
  { from: { x: 0.50, y: -0.20 }, to: { x: 0.70, y: 0.43 }, bend: 0.18, phase: 0.86, rgb: "251,191,36" },
];

export default function GlobeBackground() {
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
      draw(36);
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
      drawWorld(context, width, height, reducedMotion ? 36 : time);
      drawLocator(context, width, height);
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
      <div className="absolute inset-x-0 top-0 h-[17%] bg-gradient-to-b from-[#020817]/82 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#020817]/78 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#020817");
  gradient.addColorStop(0.48, "#051426");
  gradient.addColorStop(1, "#02050d");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  for (let index = 0; index < 75; index += 1) {
    const x = ((index * 173) % 997) / 997 * width;
    const y = ((index * 271) % 991) / 991 * height;
    const alpha = 0.025 + (index % 4) * 0.012;
    context.fillStyle = `rgba(186,230,253,${alpha})`;
    context.fillRect(x, y, 1, 1);
  }
  context.restore();
}

function drawWorld(context: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const radius = Math.min(width < 900 ? width * 0.44 : width * 0.34, height * 0.43);
  const cx = width < 900 ? width * 0.55 : width * 0.64;
  const cy = height * 0.53;

  const halo = context.createRadialGradient(cx, cy, radius * 0.75, cx, cy, radius * 1.28);
  halo.addColorStop(0, "rgba(14,165,233,0.08)");
  halo.addColorStop(0.72, "rgba(34,211,238,0.025)");
  halo.addColorStop(1, "rgba(2,6,23,0)");
  context.fillStyle = halo;
  context.fillRect(cx - radius * 1.4, cy - radius * 1.4, radius * 2.8, radius * 2.8);

  context.save();
  context.beginPath();
  context.arc(cx, cy, radius, 0, Math.PI * 2);
  context.clip();

  const ocean = context.createRadialGradient(cx - radius * 0.25, cy - radius * 0.30, radius * 0.08, cx, cy, radius * 1.1);
  ocean.addColorStop(0, "#0c3651");
  ocean.addColorStop(0.55, "#06253c");
  ocean.addColorStop(1, "#03111f");
  context.fillStyle = ocean;
  context.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

  drawGraticule(context, cx, cy, radius);
  drawLand(context, cx, cy, radius);
  drawRoutes(context, cx, cy, radius, time);
  drawCities(context, cx, cy, radius, time);
  drawTerminator(context, cx, cy, radius, time);
  context.restore();

  context.strokeStyle = "rgba(125,211,252,0.28)";
  context.lineWidth = 1.2;
  context.beginPath();
  context.arc(cx, cy, radius, 0, Math.PI * 2);
  context.stroke();

  context.strokeStyle = "rgba(186,230,253,0.10)";
  context.beginPath();
  context.arc(cx, cy, radius + 7, 0, Math.PI * 2);
  context.stroke();
}

function drawGraticule(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  context.save();
  context.strokeStyle = "rgba(125,211,252,0.085)";
  context.lineWidth = 1;

  [-0.67, -0.33, 0, 0.33, 0.67].forEach((fraction) => {
    const y = cy + fraction * radius * 0.78;
    const rx = radius * Math.sqrt(Math.max(0.02, 1 - fraction * fraction * 0.72));
    context.beginPath();
    context.ellipse(cx, y, rx, radius * 0.12, 0, 0, Math.PI * 2);
    context.stroke();
  });

  [-0.72, -0.36, 0, 0.36, 0.72].forEach((fraction) => {
    const rx = radius * Math.max(0.12, 1 - Math.abs(fraction) * 0.78);
    context.beginPath();
    context.ellipse(cx, cy, rx, radius, 0, 0, Math.PI * 2);
    context.stroke();
  });
  context.restore();
}

function drawLand(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number) {
  context.save();
  LAND.forEach((polygon, polygonIndex) => {
    context.beginPath();
    polygon.forEach((point, index) => {
      const x = cx + point.x * radius;
      const y = cy + point.y * radius;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.closePath();
    context.fillStyle = polygonIndex % 2 === 0 ? "rgba(30,94,85,0.58)" : "rgba(35,111,91,0.50)";
    context.strokeStyle = "rgba(134,239,172,0.20)";
    context.lineWidth = 1;
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawCities(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  context.save();
  context.globalCompositeOperation = "lighter";
  CITIES.forEach((city) => {
    const x = cx + city.x * radius;
    const y = cy + city.y * radius;
    const pulse = 0.72 + Math.sin(time * 0.65 + city.phase) * 0.18;
    const glow = context.createRadialGradient(x, y, 0, x, y, city.size * 6);
    glow.addColorStop(0, `rgba(254,240,138,${0.44 * pulse})`);
    glow.addColorStop(0.22, `rgba(56,189,248,${0.18 * pulse})`);
    glow.addColorStop(1, "rgba(56,189,248,0)");
    context.fillStyle = glow;
    context.fillRect(x - city.size * 6, y - city.size * 6, city.size * 12, city.size * 12);
    context.fillStyle = `rgba(254,249,195,${0.66 * pulse})`;
    context.beginPath();
    context.arc(x, y, city.size * 0.68, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
}

function drawRoutes(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  context.save();
  context.globalCompositeOperation = "lighter";
  ROUTES.forEach((route, index) => {
    const a = { x: cx + route.from.x * radius, y: cy + route.from.y * radius };
    const b = { x: cx + route.to.x * radius, y: cy + route.to.y * radius };
    const control = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 + route.bend * radius };
    context.strokeStyle = `rgba(${route.rgb},0.15)`;
    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.quadraticCurveTo(control.x, control.y, b.x, b.y);
    context.stroke();

    const progress = (time * 0.018 + route.phase + index * 0.05) % 1;
    const point = quadraticPoint(a, control, b, progress);
    const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 13);
    glow.addColorStop(0, `rgba(${route.rgb},0.64)`);
    glow.addColorStop(1, `rgba(${route.rgb},0)`);
    context.fillStyle = glow;
    context.fillRect(point.x - 15, point.y - 15, 30, 30);
    context.fillStyle = `rgba(${route.rgb},0.76)`;
    context.beginPath();
    context.arc(point.x, point.y, 2.2, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
}

function drawTerminator(context: CanvasRenderingContext2D, cx: number, cy: number, radius: number, time: number) {
  const angle = time * 0.018;
  context.save();
  context.translate(cx, cy);
  context.rotate(angle);
  const gradient = context.createLinearGradient(-radius, 0, radius, 0);
  gradient.addColorStop(0, "rgba(2,6,23,0.62)");
  gradient.addColorStop(0.46, "rgba(2,6,23,0.38)");
  gradient.addColorStop(0.53, "rgba(2,6,23,0.04)");
  gradient.addColorStop(1, "rgba(2,6,23,0)");
  context.fillStyle = gradient;
  context.fillRect(-radius, -radius, radius * 2, radius * 2);
  context.restore();
}

function drawLocator(context: CanvasRenderingContext2D, width: number, height: number) {
  if (width < 840) return;
  context.save();
  const x = width * 0.055;
  const y = height * 0.34;
  context.strokeStyle = "rgba(125,211,252,0.13)";
  context.fillStyle = "rgba(186,230,253,0.26)";
  context.lineWidth = 1;
  context.strokeRect(x, y, 212, 112);
  context.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
  ["HUMAN GEOGRAPHY", "PATTERN / CONNECTION / SCALE", "CITY LIGHTS: ILLUSTRATIVE", "ROUTES: CONCEPTUAL MOBILITY"].forEach((line, index) => context.fillText(line, x + 13, y + 24 + index * 20));
  context.beginPath();
  context.moveTo(x + 212, y + 56);
  context.lineTo(width * 0.30, height * 0.46);
  context.stroke();
  context.restore();
}

function quadraticPoint(a: P, c: P, b: P, t: number): P {
  const mt = 1 - t;
  return {
    x: mt * mt * a.x + 2 * mt * t * c.x + t * t * b.x,
    y: mt * mt * a.y + 2 * mt * t * c.y + t * t * b.y,
  };
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.62, height * 0.52, Math.min(width, height) * 0.22, width * 0.62, height * 0.52, Math.max(width, height) * 0.76);
  vignette.addColorStop(0, "rgba(2,6,23,0)");
  vignette.addColorStop(1, "rgba(2,6,23,0.58)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
