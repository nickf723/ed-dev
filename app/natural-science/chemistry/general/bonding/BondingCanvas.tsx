"use client";

import { useEffect, useRef } from "react";
import {
  geometryDirections,
  lerp,
  type CanvasDetail,
  type ElementRecord,
} from "./bonding-model";

const TAU = Math.PI * 2;

export default function BondingCanvas({ detail }: { detail: CanvasDetail }) {
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
    let previous = performance.now();

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(300, bounds.width);
      height = Math.max(280, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(18);
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      draw(now / 1000 + delta);
      frame = requestAnimationFrame(loop);
    }

    function draw(time: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawStage(context, width, height, time, detail);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (!reducedMotion) frame = requestAnimationFrame(loop);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [detail]);

  return (
    <canvas
      ref={canvasRef}
      className="h-[300px] w-full border-b border-white/[0.08] 2xl:h-[320px]"
    />
  );
}

function drawStage(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  detail: CanvasDetail,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(2,13,17,0.98)");
  gradient.addColorStop(0.55, "rgba(4,8,21,0.98)");
  gradient.addColorStop(1, "rgba(10,3,16,0.98)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  if (detail.scene === "sharing") {
    drawSharingStage(context, width, height, time, detail);
  }
  if (detail.scene === "transfer") {
    drawTransferStage(context, width, height, time, detail);
  }
  if (detail.scene === "shape") {
    drawShapeStage(context, width, height, time, detail);
  }
  if (detail.scene === "forces") {
    drawForcesStage(context, width, height, time, detail);
  }
}

function drawSharingStage(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  detail: CanvasDetail,
) {
  const centerX = width * 0.5;
  const centerY = height * 0.48;
  const separation = Math.min(width, height) * 0.45;
  const leftX = centerX - separation * 0.5;
  const rightX = centerX + separation * 0.5;
  drawLabeledAtom(context, leftX, centerY, detail.left);
  drawLabeledAtom(context, rightX, centerY, detail.right);

  const skew = Math.min(1, detail.deltaEn / 3.2);
  for (let cloud = 0; cloud < 220; cloud += 1) {
    const phase = cloud * 2.399963 + time * 0.32;
    const radius = Math.sqrt((cloud + 0.5) / 220);
    const x =
      centerX +
      Math.cos(phase) * separation * 0.48 * radius +
      separation * (skew - 0.5) * 0.18;
    const y =
      centerY + Math.sin(phase * 1.7) * separation * 0.2 * radius;
    context.fillStyle = `rgba(${cloud % 4 === 0 ? detail.right.rgb : "125,211,252"},${0.1 + (1 - radius) * 0.32})`;
    context.beginPath();
    context.arc(x, y, 0.8 + (1 - radius) * 1.2, 0, TAU);
    context.fill();
  }

  for (let bond = 0; bond < detail.bondOrder; bond += 1) {
    const offset = (bond - (detail.bondOrder - 1) / 2) * 8;
    context.strokeStyle = "rgba(255,255,255,0.34)";
    context.lineWidth = 2;
    context.beginPath();
    context.moveTo(leftX + 24, centerY + offset);
    context.lineTo(rightX - 24, centerY + offset);
    context.stroke();
  }
}

function drawTransferStage(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  detail: CanvasDetail,
) {
  const leftX = width * 0.28;
  const rightX = width * 0.72;
  const centerY = height * 0.42;
  drawLabeledIon(context, leftX, centerY, detail.left, "+");
  drawLabeledIon(context, rightX, centerY, detail.right, "−");

  const progress = (Math.sin(time * 0.8) + 1) * 0.5;
  const x = lerp(leftX + 32, rightX - 32, progress);
  const y = centerY - 46 - Math.sin(progress * Math.PI) * 45;
  glowDot(context, x, y, "34,211,238", 4);

  context.strokeStyle = "rgba(250,204,21,0.30)";
  for (let line = -3; line <= 3; line += 1) {
    context.beginPath();
    context.moveTo(leftX + 28, centerY + line * 15);
    context.bezierCurveTo(
      width * 0.44,
      centerY + line * 28,
      width * 0.56,
      centerY + line * 28,
      rightX - 28,
      centerY + line * 15,
    );
    context.stroke();
  }

  context.fillStyle = "rgba(250,204,21,0.58)";
  context.font = "600 12px ui-monospace, monospace";
  context.textAlign = "center";
  context.fillText(
    "electron transfer and electrostatic attraction",
    width * 0.5,
    height - 26,
  );
}

function drawShapeStage(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  detail: CanvasDetail,
) {
  const centerX = width * 0.5;
  const centerY = height * 0.5;
  drawLabeledAtom(context, centerX, centerY, detail.left);
  const directions = geometryDirections(detail.domains);
  const radius = Math.min(width, height) * 0.31;

  directions.forEach((angle, index) => {
    const lone = index >= Math.max(0, detail.domains - detail.lonePairs);
    const pulse = 0.96 + Math.sin(time * 1.2 + index) * 0.04;
    const x = centerX + Math.cos(angle) * radius * pulse;
    const y = centerY + Math.sin(angle) * radius * pulse;
    context.strokeStyle = lone
      ? "rgba(244,114,182,0.34)"
      : "rgba(125,211,252,0.34)";
    context.lineWidth = lone ? 1 : 2;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(x, y);
    context.stroke();

    if (lone) {
      context.fillStyle = "rgba(244,114,182,0.13)";
      context.beginPath();
      context.ellipse(x, y, 24, 12, angle, 0, TAU);
      context.fill();
    } else {
      drawLabeledAtom(
        context,
        x,
        y,
        index % 2 === 0 ? detail.right : detail.left,
        false,
      );
    }
  });
}

function drawForcesStage(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  detail: CanvasDetail,
) {
  const columns = 6;
  const rows = 4;
  const alignment = detail.polarity / 100;
  const jitter = detail.temperature / 100;
  const points: Array<{ x: number; y: number; angle: number }> = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const index = row * columns + column;
      const x =
        width * (0.12 + column * 0.15) +
        Math.sin(time * (0.8 + jitter) + index) * 10 * jitter;
      const y =
        height * (0.18 + row * 0.21) +
        Math.cos(time * (0.7 + jitter) + index * 0.7) * 9 * jitter;
      const angle = lerp(
        index % 2 === 0 ? 0.7 : 2.4,
        index % 2 === 0 ? -0.12 : Math.PI - 0.12,
        alignment,
      );
      points.push({ x, y, angle });
    }
  }

  points.forEach((point, index) => {
    if (index < points.length - 1 && index % columns !== columns - 1) {
      const next = points[index + 1];
      context.strokeStyle = `rgba(244,114,182,${0.04 + alignment * 0.18})`;
      context.setLineDash([3, 7]);
      context.beginPath();
      context.moveTo(point.x, point.y);
      context.lineTo(next.x, next.y);
      context.stroke();
    }
    context.setLineDash([]);
    const length = 16;
    const ax = point.x - Math.cos(point.angle) * length;
    const ay = point.y - Math.sin(point.angle) * length;
    const bx = point.x + Math.cos(point.angle) * length;
    const by = point.y + Math.sin(point.angle) * length;
    context.strokeStyle = "rgba(255,255,255,0.16)";
    context.beginPath();
    context.moveTo(ax, ay);
    context.lineTo(bx, by);
    context.stroke();
    glowDot(context, ax, ay, detail.left.rgb, 4);
    glowDot(context, bx, by, detail.right.rgb, 6);
  });
}

function drawLabeledAtom(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  element: ElementRecord,
  showLabel = true,
) {
  glowDot(context, x, y, element.rgb, 14);
  if (!showLabel) return;
  context.fillStyle = "rgba(255,255,255,0.88)";
  context.font = "700 17px ui-sans-serif, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(element.symbol, x, y);
}

function drawLabeledIon(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  element: ElementRecord,
  charge: string,
) {
  glowDot(context, x, y, element.rgb, 20);
  context.strokeStyle = `rgba(${element.rgb},0.46)`;
  context.lineWidth = 1.4;
  context.beginPath();
  context.arc(x, y, 25, 0, TAU);
  context.stroke();
  context.fillStyle = "rgba(255,255,255,0.88)";
  context.font = "700 18px ui-sans-serif, sans-serif";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(`${element.symbol}${charge}`, x, y);
}

function glowDot(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  rgb: string,
  radius: number,
) {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius * 3.2);
  glow.addColorStop(0, `rgba(${rgb},0.92)`);
  glow.addColorStop(0.22, `rgba(${rgb},0.38)`);
  glow.addColorStop(1, `rgba(${rgb},0)`);
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius * 3.2, 0, TAU);
  context.fill();
  context.fillStyle = `rgba(${rgb},0.92)`;
  context.beginPath();
  context.arc(x, y, Math.max(2.2, radius * 0.24), 0, TAU);
  context.fill();
}
