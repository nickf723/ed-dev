"use client";

import { useEffect, useRef } from "react";

type BusPath = {
  y: number;
  speed: number;
  phase: number;
  direction: 1 | -1;
  rgb: string;
};

const BUS_PATHS: BusPath[] = [
  { y: 0.22, speed: 0.018, phase: 0.08, direction: 1, rgb: "52,211,153" },
  { y: 0.34, speed: 0.013, phase: 0.46, direction: -1, rgb: "34,211,238" },
  { y: 0.52, speed: 0.016, phase: 0.72, direction: 1, rgb: "167,139,250" },
  { y: 0.70, speed: 0.010, phase: 0.24, direction: -1, rgb: "96,165,250" },
];

export function ComputerScienceBackground() {
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
      draw(20);
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
      drawMemoryBanks(context, width, height, time);
      drawRuntimeBus(context, width, height, time);
      drawExecutionCore(context, width, height, time);
      drawNetworkPorts(context, width, height, time);
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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(1,8,10,0.12),transparent_25%,transparent_80%,rgba(2,5,9,0.24))]" />
      <div className="absolute inset-x-0 top-0 h-[21%] bg-gradient-to-b from-[#010609]/62 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[20%] bg-gradient-to-t from-[#010304]/54 to-transparent" />
    </div>
  );
}

function drawBase(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#021015");
  gradient.addColorStop(0.50, "#05111a");
  gradient.addColorStop(1, "#05060c");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const spacing = width < 900 ? 58 : 74;
  context.save();
  context.lineWidth = 1;
  for (let x = 0; x < width; x += spacing) {
    context.strokeStyle = "rgba(52,211,153,0.046)";
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += spacing) {
    context.strokeStyle = "rgba(34,211,238,0.040)";
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function drawMemoryBanks(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const left = width * 0.055;
  const top = height * 0.18;
  const bankWidth = Math.min(210, width * 0.18);
  const rowHeight = 26;
  const rows = Math.max(8, Math.min(18, Math.floor(height * 0.46 / rowHeight)));
  const active = Math.floor((time * 0.22) % rows);

  context.save();
  for (let row = 0; row < rows; row += 1) {
    const y = top + row * rowHeight;
    const bright = row === active;
    context.fillStyle = bright
      ? "rgba(52,211,153,0.13)"
      : "rgba(15,23,42,0.20)";
    context.strokeStyle = bright
      ? "rgba(52,211,153,0.38)"
      : "rgba(52,211,153,0.11)";
    context.beginPath();
    context.roundRect(left, y, bankWidth, 18, 5);
    context.fill();
    context.stroke();

    for (let cell = 0; cell < 6; cell += 1) {
      const value = (row * 7 + cell * 3) % 5;
      context.fillStyle = value < 2
        ? "rgba(52,211,153,0.24)"
        : "rgba(148,163,184,0.06)";
      context.fillRect(left + 12 + cell * 29, y + 6, 15, 6);
    }
  }
  context.restore();
}

function drawRuntimeBus(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const startX = width * 0.20;
  const endX = width * 0.88;
  context.save();
  context.globalCompositeOperation = "lighter";

  BUS_PATHS.forEach((path, index) => {
    const y = height * path.y;
    context.strokeStyle = `rgba(${path.rgb},0.18)`;
    context.lineWidth = index === 0 ? 1.7 : 1.2;
    context.beginPath();
    context.moveTo(startX, y);
    context.lineTo(endX, y);
    context.stroke();

    const progress = (path.phase + time * path.speed) % 1;
    const normalized = path.direction === 1 ? progress : 1 - progress;
    const x = startX + (endX - startX) * normalized;
    const glow = context.createRadialGradient(x, y, 0, x, y, 20);
    glow.addColorStop(0, `rgba(${path.rgb},0.78)`);
    glow.addColorStop(1, `rgba(${path.rgb},0)`);
    context.fillStyle = glow;
    context.fillRect(x - 22, y - 22, 44, 44);
    context.fillStyle = `rgba(${path.rgb},0.88)`;
    context.fillRect(x - 3, y - 3, 6, 6);
  });
  context.restore();
}

function drawExecutionCore(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const x = width * 0.58;
  const y = height * 0.42;
  const radius = Math.min(width, height) * 0.075;
  const pulse = 1 + Math.sin(time * 0.42) * 0.025;

  context.save();
  context.translate(x, y);
  context.rotate(time * 0.012);
  context.strokeStyle = "rgba(167,139,250,0.28)";
  context.lineWidth = 1.2;
  for (let ring = 1; ring <= 3; ring += 1) {
    context.beginPath();
    context.arc(0, 0, radius * ring * 0.54 * pulse, 0, Math.PI * 2);
    context.stroke();
  }
  context.rotate(-time * 0.012);

  const core = context.createRadialGradient(0, 0, 0, 0, 0, radius * 1.2);
  core.addColorStop(0, "rgba(167,139,250,0.28)");
  core.addColorStop(0.46, "rgba(34,211,238,0.12)");
  core.addColorStop(1, "rgba(0,0,0,0)");
  context.fillStyle = core;
  context.beginPath();
  context.arc(0, 0, radius * 1.2, 0, Math.PI * 2);
  context.fill();

  const stages = 8;
  for (let index = 0; index < stages; index += 1) {
    const angle = (index / stages) * Math.PI * 2 + time * 0.04;
    const px = Math.cos(angle) * radius * 0.78;
    const py = Math.sin(angle) * radius * 0.78;
    context.fillStyle = index % 2 === 0
      ? "rgba(34,211,238,0.56)"
      : "rgba(167,139,250,0.54)";
    context.beginPath();
    context.arc(px, py, 2.4, 0, Math.PI * 2);
    context.fill();
  }
  context.restore();
}

function drawNetworkPorts(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const right = width * 0.92;
  const centerY = height * 0.54;
  const ports = 7;
  context.save();
  for (let index = 0; index < ports; index += 1) {
    const y = centerY + (index - 3) * 42;
    const phase = (time * 0.05 + index * 0.13) % 1;
    const x = right - phase * Math.min(240, width * 0.18);
    context.strokeStyle = "rgba(96,165,250,0.18)";
    context.beginPath();
    context.moveTo(right, y);
    context.lineTo(right - Math.min(260, width * 0.2), y);
    context.stroke();
    context.fillStyle = "rgba(96,165,250,0.58)";
    context.beginPath();
    context.arc(x, y, 2.3, 0, Math.PI * 2);
    context.fill();
    context.strokeStyle = "rgba(96,165,250,0.28)";
    context.strokeRect(right - 12, y - 7, 12, 14);
  }
  context.restore();
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const vignette = context.createRadialGradient(
    width * 0.52,
    height * 0.40,
    Math.min(width, height) * 0.10,
    width * 0.52,
    height * 0.40,
    Math.max(width, height) * 0.78,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.72, "rgba(0,0,0,0.05)");
  vignette.addColorStop(1, "rgba(0,0,0,0.48)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
