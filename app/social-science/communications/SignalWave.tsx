"use client";

import { useEffect, useRef } from "react";

type Channel = {
  y: number;
  amplitude: number;
  frequency: number;
  phase: number;
  rgb: string;
  speed: number;
};

const CHANNELS: Channel[] = [
  { y: 0.31, amplitude: 30, frequency: 0.010, phase: 0.2, rgb: "34,211,238", speed: 0.020 },
  { y: 0.46, amplitude: 22, frequency: 0.013, phase: 1.8, rgb: "167,139,250", speed: 0.015 },
  { y: 0.61, amplitude: 27, frequency: 0.008, phase: 3.1, rgb: "244,114,182", speed: 0.012 },
] as const;

export default function SignalWave() {
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
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.1 : 1.45);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(reducedMotion ? 22 : performance.now() / 1000);
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
      drawTransmitter(context, width, height, time);
      drawChannels(context, width, height, time, reducedMotion);
      drawInterference(context, width, height, time, reducedMotion);
      drawReceivers(context, width, height, time);
      drawFeedback(context, width, height, time, reducedMotion);
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
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#090a2a]/72 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[16%] bg-gradient-to-t from-[#07071d]/76 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#0b1236");
  gradient.addColorStop(0.46, "#11133a");
  gradient.addColorStop(0.72, "#10102f");
  gradient.addColorStop(1, "#08091e");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const spacing = width < 900 ? 76 : 96;
  context.save();
  context.strokeStyle = "rgba(129,140,248,0.045)";
  context.lineWidth = 1;
  for (let x = 0; x < width; x += spacing) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y < height; y += spacing) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function drawTransmitter(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const x = width * 0.105;
  const baseY = height * 0.73;
  const topY = height * 0.23;
  const pulse = 0.88 + Math.sin(time * 0.34) * 0.04;

  context.save();
  context.strokeStyle = "rgba(34,211,238,0.32)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(x, baseY);
  context.lineTo(x, topY);
  context.stroke();
  context.beginPath();
  context.moveTo(x - 32, baseY);
  context.lineTo(x, topY + 56);
  context.lineTo(x + 32, baseY);
  context.stroke();

  context.fillStyle = "rgba(34,211,238,0.70)";
  context.beginPath();
  context.arc(x, topY, 4, 0, Math.PI * 2);
  context.fill();

  for (let ring = 0; ring < 3; ring += 1) {
    context.strokeStyle = `rgba(34,211,238,${0.23 - ring * 0.055})`;
    context.lineWidth = 1.4;
    context.beginPath();
    context.arc(x, topY, (42 + ring * 34) * pulse, -0.72, 0.72);
    context.stroke();
  }

  const glow = context.createRadialGradient(x, topY, 0, x, topY, 140);
  glow.addColorStop(0, "rgba(34,211,238,0.13)");
  glow.addColorStop(1, "rgba(34,211,238,0)");
  context.fillStyle = glow;
  context.fillRect(x - 150, topY - 150, 300, 300);
  context.restore();
}

function drawChannels(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const startX = width * 0.15;
  const endX = width * 0.86;
  const interferenceStart = width * 0.46;
  const interferenceEnd = width * 0.58;

  context.save();
  context.globalCompositeOperation = "lighter";

  CHANNELS.forEach((channel, channelIndex) => {
    context.beginPath();
    const points: { x: number; y: number }[] = [];
    for (let x = startX; x <= endX; x += 8) {
      const local = (x - startX) / Math.max(1, endX - startX);
      let amplitude = channel.amplitude;
      if (x > interferenceStart && x < interferenceEnd) amplitude *= 1.45;
      const y =
        height * channel.y +
        Math.sin(x * channel.frequency + channel.phase + time * 0.16) * amplitude * (0.82 + local * 0.18);
      points.push({ x, y });
      if (points.length === 1) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.strokeStyle = `rgba(${channel.rgb},0.22)`;
    context.lineWidth = channelIndex === 0 ? 2.1 : 1.6;
    context.stroke();

    const progress = reducedMotion ? 0.66 - channelIndex * 0.16 : (time * channel.speed + channel.phase * 0.11) % 1;
    const pulseIndex = Math.max(0, Math.min(points.length - 1, Math.floor(progress * (points.length - 1))));
    const point = points[pulseIndex];
    const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 18);
    glow.addColorStop(0, `rgba(${channel.rgb},0.64)`);
    glow.addColorStop(1, `rgba(${channel.rgb},0)`);
    context.fillStyle = glow;
    context.fillRect(point.x - 20, point.y - 20, 40, 40);
    context.fillStyle = `rgba(${channel.rgb},0.86)`;
    context.beginPath();
    context.arc(point.x, point.y, 3.2, 0, Math.PI * 2);
    context.fill();
  });

  context.restore();
}

function drawInterference(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const left = width * 0.455;
  const bandWidth = width * 0.135;
  const top = height * 0.16;
  const bottom = height * 0.78;
  const drift = reducedMotion ? 0 : Math.sin(time * 0.11) * 8;

  const band = context.createLinearGradient(left, 0, left + bandWidth, 0);
  band.addColorStop(0, "rgba(244,114,182,0)");
  band.addColorStop(0.5, "rgba(244,114,182,0.055)");
  band.addColorStop(1, "rgba(244,114,182,0)");
  context.fillStyle = band;
  context.fillRect(left, top, bandWidth, bottom - top);

  context.save();
  for (let row = 0; row < 11; row += 1) {
    const y = top + ((bottom - top) / 10) * row;
    context.strokeStyle = `rgba(244,114,182,${0.055 + (row % 3) * 0.018})`;
    context.lineWidth = 1;
    context.beginPath();
    for (let step = 0; step <= 12; step += 1) {
      const x = left + (bandWidth / 12) * step;
      const jitter = Math.sin(step * 2.7 + row * 1.9 + time * 0.22) * (5 + (row % 4) * 2) + drift;
      if (step === 0) context.moveTo(x, y + jitter);
      else context.lineTo(x, y + jitter);
    }
    context.stroke();
  }
  context.restore();
}

function drawReceivers(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
) {
  const receivers = [
    { x: 0.89, y: 0.29, rgb: "34,211,238" },
    { x: 0.92, y: 0.48, rgb: "167,139,250" },
    { x: 0.87, y: 0.66, rgb: "244,114,182" },
  ] as const;

  context.save();
  receivers.forEach((receiver, index) => {
    const x = width * receiver.x;
    const y = height * receiver.y;
    const breathing = 1 + Math.sin(time * 0.28 + index * 1.4) * 0.06;
    context.strokeStyle = `rgba(${receiver.rgb},0.34)`;
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(x, y, 18 * breathing, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.arc(x, y, 7, 0, Math.PI * 2);
    context.fillStyle = `rgba(${receiver.rgb},0.22)`;
    context.fill();
    context.stroke();
    context.beginPath();
    context.moveTo(x, y + 18);
    context.lineTo(x, y + 48);
    context.stroke();
    context.beginPath();
    context.moveTo(x - 18, y + 48);
    context.lineTo(x + 18, y + 48);
    context.stroke();
  });
  context.restore();
}

function drawFeedback(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  reducedMotion: boolean,
) {
  const startX = width * 0.88;
  const endX = width * 0.18;
  const y = height * 0.82;
  context.save();
  context.strokeStyle = "rgba(94,234,212,0.13)";
  context.lineWidth = 1.3;
  context.setLineDash([6, 9]);
  context.beginPath();
  context.moveTo(startX, y);
  context.bezierCurveTo(width * 0.70, height * 0.90, width * 0.36, height * 0.91, endX, height * 0.76);
  context.stroke();
  context.setLineDash([]);

  const progress = reducedMotion ? 0.48 : (time * 0.010) % 1;
  const point = cubicPoint(
    startX,
    y,
    width * 0.70,
    height * 0.90,
    width * 0.36,
    height * 0.91,
    endX,
    height * 0.76,
    progress,
  );
  context.fillStyle = "rgba(94,234,212,0.70)";
  context.beginPath();
  context.arc(point.x, point.y, 2.6, 0, Math.PI * 2);
  context.fill();
  context.restore();
}

function cubicPoint(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number,
  t: number,
) {
  const inv = 1 - t;
  return {
    x: inv ** 3 * x0 + 3 * inv ** 2 * t * x1 + 3 * inv * t ** 2 * x2 + t ** 3 * x3,
    y: inv ** 3 * y0 + 3 * inv ** 2 * t * y1 + 3 * inv * t ** 2 * y2 + t ** 3 * y3,
  };
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(
    width * 0.52,
    height * 0.46,
    Math.min(width, height) * 0.12,
    width * 0.52,
    height * 0.46,
    Math.max(width, height) * 0.80,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.72, "rgba(4,5,22,0.06)");
  vignette.addColorStop(1, "rgba(3,4,17,0.64)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
