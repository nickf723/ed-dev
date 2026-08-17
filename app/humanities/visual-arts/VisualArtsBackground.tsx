"use client";

import { useEffect, useRef } from "react";

type Point3 = { x: number; y: number; z: number };
type Stroke = {
  y: number;
  amplitude: number;
  width: number;
  rgb: string;
  phase: number;
};

const BRUSH_STROKES: Stroke[] = [
  { y: 0.19, amplitude: 0.075, width: 24, rgb: "244,63,94", phase: 0.2 },
  { y: 0.40, amplitude: 0.105, width: 14, rgb: "250,204,21", phase: 1.7 },
  { y: 0.68, amplitude: 0.085, width: 19, rgb: "20,184,166", phase: 3.2 },
];

const CUBE_VERTICES: Point3[] = [
  { x: -1, y: -1, z: -1 },
  { x: 1, y: -1, z: -1 },
  { x: 1, y: 1, z: -1 },
  { x: -1, y: 1, z: -1 },
  { x: -1, y: -1, z: 1 },
  { x: 1, y: -1, z: 1 },
  { x: 1, y: 1, z: 1 },
  { x: -1, y: 1, z: 1 },
];

const CUBE_EDGES: Array<[number, number]> = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

const OCTAHEDRON_VERTICES: Point3[] = [
  { x: 0, y: -1.35, z: 0 },
  { x: 1.2, y: 0, z: 0 },
  { x: 0, y: 0, z: 1.2 },
  { x: -1.2, y: 0, z: 0 },
  { x: 0, y: 0, z: -1.2 },
  { x: 0, y: 1.35, z: 0 },
];

const OCTAHEDRON_EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [5, 1], [5, 2], [5, 3], [5, 4],
  [1, 2], [2, 3], [3, 4], [4, 1],
];

export default function VisualArtsBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let paused = document.hidden;

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.1 : 1.45);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(32);
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
      drawBrushField(context, width, height, time);
      drawSculpturalForms(context, width, height, time);
      drawViewfinder(context, width, height, time);
      drawPrintMatrix(context, width, height, time);
      drawMediaSignal(context, width, height, time);
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
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,5,6,0.22),transparent_28%,transparent_73%,rgba(5,5,10,0.40))]" />
      <div className="absolute inset-x-0 top-0 h-[19%] bg-gradient-to-b from-[#0b0707]/78 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[18%] bg-gradient-to-t from-[#050405]/76 to-transparent" />
    </div>
  );
}

function drawBase(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#16090c");
  gradient.addColorStop(0.36, "#0a1113");
  gradient.addColorStop(0.69, "#111020");
  gradient.addColorStop(1, "#090609");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.22;
  for (let index = 0; index < 90; index += 1) {
    const x = (((index * 149) % 991) / 991) * width;
    const y = (((index * 241) % 983) / 983) * height;
    const rgb = index % 4 === 0
      ? "244,63,94"
      : index % 4 === 1
        ? "59,130,246"
        : index % 4 === 2
          ? "250,204,21"
          : "20,184,166";
    context.fillStyle = `rgba(${rgb},0.08)`;
    context.fillRect(x, y, 1 + (index % 3) * 0.45, 1 + (index % 3) * 0.45);
  }
  context.restore();
}

function drawBrushField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const endX = width * 0.47;
  context.save();
  context.lineCap = "round";
  context.lineJoin = "round";
  context.globalCompositeOperation = "lighter";

  BRUSH_STROKES.forEach((stroke, strokeIndex) => {
    const phase = time * (0.018 + strokeIndex * 0.003) + stroke.phase;
    const gradient = context.createLinearGradient(0, 0, endX, height);
    gradient.addColorStop(0, `rgba(${stroke.rgb},0.02)`);
    gradient.addColorStop(0.26, `rgba(${stroke.rgb},0.20)`);
    gradient.addColorStop(0.78, `rgba(${stroke.rgb},0.08)`);
    gradient.addColorStop(1, `rgba(${stroke.rgb},0)`);
    context.strokeStyle = gradient;
    context.lineWidth = stroke.width;
    context.beginPath();

    for (let step = 0; step <= 72; step += 1) {
      const t = step / 72;
      const x = -width * 0.04 + t * endX;
      const y = height * stroke.y
        + Math.sin(t * Math.PI * 2.3 + phase) * height * stroke.amplitude
        + Math.sin(t * Math.PI * 7 + phase * 0.7) * 5;
      if (step === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  });
  context.restore();
}

function drawSculpturalForms(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  drawWireForm(
    context,
    CUBE_VERTICES,
    CUBE_EDGES,
    width * 0.58,
    height * 0.38,
    Math.min(width, height) * 0.075,
    time * 0.035,
    time * 0.022,
    "251,146,60",
  );
  drawWireForm(
    context,
    OCTAHEDRON_VERTICES,
    OCTAHEDRON_EDGES,
    width * 0.66,
    height * 0.64,
    Math.min(width, height) * 0.060,
    -time * 0.028,
    time * 0.018 + 0.8,
    "167,139,250",
  );
}

function drawWireForm(
  context: CanvasRenderingContext2D,
  vertices: readonly Point3[],
  edges: readonly [number, number][],
  centerX: number,
  centerY: number,
  scale: number,
  angleY: number,
  angleX: number,
  rgb: string,
) {
  const projected = vertices.map((vertex) =>
    projectPoint(rotatePoint(vertex, angleY, angleX), centerX, centerY, scale),
  );

  context.save();
  context.globalCompositeOperation = "lighter";
  edges.forEach(([from, to], index) => {
    const a = projected[from];
    const b = projected[to];
    const depth = (a.depth + b.depth) / 2;
    context.strokeStyle = `rgba(${rgb},${0.09 + depth * 0.08})`;
    context.lineWidth = index % 4 === 0 ? 1.8 : 1.15;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();
  });
  projected.forEach((point) => {
    context.fillStyle = `rgba(${rgb},${0.16 + point.depth * 0.10})`;
    context.beginPath();
    context.arc(point.x, point.y, 2.2, 0, Math.PI * 2);
    context.fill();
  });
  context.restore();
}

function drawViewfinder(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const centerX = width * 0.84;
  const centerY = height * 0.30;
  const frameWidth = Math.min(width * 0.26, 390);
  const frameHeight = frameWidth * 0.64;
  const driftX = Math.sin(time * 0.025) * 14;
  const driftY = Math.cos(time * 0.021) * 9;

  context.save();
  context.translate(centerX + driftX, centerY + driftY);
  context.strokeStyle = "rgba(34,211,238,0.16)";
  context.lineWidth = 1.2;
  context.strokeRect(-frameWidth / 2, -frameHeight / 2, frameWidth, frameHeight);
  context.strokeStyle = "rgba(244,63,94,0.12)";
  context.strokeRect(-frameWidth * 0.36, -frameHeight * 0.36, frameWidth * 0.72, frameHeight * 0.72);

  for (let division = 1; division < 3; division += 1) {
    const x = -frameWidth / 2 + (frameWidth / 3) * division;
    const y = -frameHeight / 2 + (frameHeight / 3) * division;
    context.strokeStyle = "rgba(226,232,240,0.055)";
    context.beginPath();
    context.moveTo(x, -frameHeight / 2);
    context.lineTo(x, frameHeight / 2);
    context.moveTo(-frameWidth / 2, y);
    context.lineTo(frameWidth / 2, y);
    context.stroke();
  }

  const radius = frameHeight * 0.18;
  context.strokeStyle = "rgba(250,204,21,0.19)";
  for (let blade = 0; blade < 8; blade += 1) {
    const angle = (blade / 8) * Math.PI * 2 + time * 0.008;
    context.beginPath();
    context.moveTo(Math.cos(angle) * radius * 0.42, Math.sin(angle) * radius * 0.42);
    context.lineTo(Math.cos(angle + 0.42) * radius, Math.sin(angle + 0.42) * radius);
    context.stroke();
  }
  context.restore();
}

function drawPrintMatrix(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const startX = width * 0.07;
  const startY = height * 0.78;
  const cell = width < 900 ? 32 : 42;
  const columns = 8;
  const rows = 3;
  const shift = (time * 0.8) % cell;

  context.save();
  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = startX + column * cell + (row % 2 === 0 ? shift * 0.14 : -shift * 0.10);
      const y = startY + row * cell * 0.72;
      const active = (column + row * 2 + Math.floor(time * 0.12)) % 7 === 0;
      context.fillStyle = active
        ? "rgba(250,204,21,0.09)"
        : "rgba(226,232,240,0.018)";
      context.strokeStyle = active
        ? "rgba(250,204,21,0.22)"
        : "rgba(226,232,240,0.07)";
      context.strokeRect(x, y, cell * 0.62, cell * 0.48);
      context.fillRect(x + 3, y + 3, cell * 0.62 - 6, cell * 0.48 - 6);
    }
  }
  context.restore();
}

function drawMediaSignal(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const left = width * 0.72;
  const right = width * 0.96;
  const baseline = height * 0.82;

  context.save();
  context.globalCompositeOperation = "lighter";
  context.strokeStyle = "rgba(167,139,250,0.18)";
  context.lineWidth = 1.4;
  context.beginPath();
  for (let step = 0; step <= 80; step += 1) {
    const t = step / 80;
    const x = left + (right - left) * t;
    const y = baseline
      + Math.sin(t * Math.PI * 4 + time * 0.22) * 13
      + Math.sin(t * Math.PI * 13 - time * 0.13) * 4;
    if (step === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.stroke();

  const scanX = left + ((time * 0.012) % 1) * (right - left);
  context.strokeStyle = "rgba(34,211,238,0.18)";
  context.beginPath();
  context.moveTo(scanX, height * 0.70);
  context.lineTo(scanX, height * 0.92);
  context.stroke();
  context.restore();
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.40,
    Math.min(width, height) * 0.12,
    width * 0.5,
    height * 0.40,
    Math.max(width, height) * 0.80,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.72, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.70)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function rotatePoint(point: Point3, angleY: number, angleX: number): Point3 {
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const xY = point.x * cosY - point.z * sinY;
  const zY = point.x * sinY + point.z * cosY;
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  return {
    x: xY,
    y: point.y * cosX - zY * sinX,
    z: point.y * sinX + zY * cosX,
  };
}

function projectPoint(
  point: Point3,
  centerX: number,
  centerY: number,
  scale: number,
) {
  const perspective = 3.7 / (4.7 + point.z);
  return {
    x: centerX + point.x * scale * perspective,
    y: centerY + point.y * scale * perspective,
    depth: Math.max(0, Math.min(1, (point.z + 1.5) / 3)),
  };
}
