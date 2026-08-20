"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type SlopeScene = "positive" | "negative" | "zero" | "vertical";

type SlopeWorldDetail = {
  scene: SlopeScene;
  rise: number;
  run: number;
  intercept: number;
  verticalX: number;
};

type DisplayModel = {
  slope: number;
  intercept: number;
  verticalX: number;
  verticalMix: number;
  rise: number;
  run: number;
};

const PRESETS: Record<SlopeScene, SlopeWorldDetail> = {
  positive: { scene: "positive", rise: 2, run: 1, intercept: 1, verticalX: 2 },
  negative: { scene: "negative", rise: -3, run: 2, intercept: 2, verticalX: 2 },
  zero: { scene: "zero", rise: 0, run: 3, intercept: 2, verticalX: 2 },
  vertical: { scene: "vertical", rise: 4, run: 0, intercept: 0, verticalX: 2 },
};

const TAU = Math.PI * 2;

export default function SlopeRateBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const director = useWorldDirector();
  const sceneRef = useRef<string | null>(director.scene);
  const renderStaticRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    sceneRef.current = director.scene;
    renderStaticRef.current?.();
  }, [director.scene]);

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
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();
    let model: SlopeWorldDetail = PRESETS.positive;
    const display: DisplayModel = {
      slope: 2,
      intercept: 1,
      verticalX: 2,
      verticalMix: 0,
      rise: 2,
      run: 1,
    };

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.15 : 1.5);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      render(performance.now() / 1000, 0, true);
    }

    function onModelUpdate(event: Event) {
      const detail = (event as CustomEvent<SlopeWorldDetail>).detail;
      if (!detail || !isSlopeScene(detail.scene)) return;
      model = {
        scene: detail.scene,
        rise: Number.isFinite(detail.rise) ? detail.rise : model.rise,
        run: Number.isFinite(detail.run) ? detail.run : model.run,
        intercept: Number.isFinite(detail.intercept)
          ? detail.intercept
          : model.intercept,
        verticalX: Number.isFinite(detail.verticalX)
          ? detail.verticalX
          : model.verticalX,
      };
      if (reducedMotion) render(18, 0, true);
    }

    function onPointerMove(event: PointerEvent) {
      pointer.targetX = clamp(event.clientX / Math.max(1, width), 0, 1);
      pointer.targetY = clamp(event.clientY / Math.max(1, height), 0, 1);
      if (reducedMotion) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        render(18, 0, true);
      }
    }

    function onPointerLeave() {
      pointer.targetX = 0.5;
      pointer.targetY = 0.5;
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      pointer.x = lerp(pointer.x, pointer.targetX, 1 - Math.pow(0.002, delta));
      pointer.y = lerp(pointer.y, pointer.targetY, 1 - Math.pow(0.002, delta));
      render(now / 1000, delta, false);
      frame = requestAnimationFrame(loop);
    }

    function render(time: number, delta: number, snap: boolean) {
      const scene = resolveScene(sceneRef.current);
      const target = scene === model.scene ? model : PRESETS[scene];
      const amount = snap ? 1 : 1 - Math.pow(0.00045, Math.max(0.001, delta));
      const targetSlope = target.run === 0 ? display.slope : target.rise / target.run;

      display.slope = lerp(display.slope, targetSlope, amount);
      display.intercept = lerp(display.intercept, target.intercept, amount);
      display.verticalX = lerp(display.verticalX, target.verticalX, amount);
      display.verticalMix = lerp(
        display.verticalMix,
        target.run === 0 ? 1 : 0,
        amount,
      );
      display.rise = lerp(display.rise, target.rise, amount);
      display.run = lerp(display.run, target.run, amount);

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawBase(context, width, height, scene, time);

      const originX = width * 0.56 + (pointer.x - 0.5) * 34;
      const originY = height * 0.48 + (pointer.y - 0.5) * 24;
      const scale = clamp(Math.min(width / 15, height / 10), 48, 88);

      drawGrid(context, width, height, originX, originY, scale);
      drawDirectionField(
        context,
        width,
        height,
        display.slope,
        display.verticalMix,
        time,
      );
      drawParallelFamily(
        context,
        width,
        height,
        originX,
        originY,
        scale,
        display,
        time,
      );
      drawLegend(context, width, height, scene, display);
      drawVignette(context, width, height);
    }

    renderStaticRef.current = () => render(18, 0, true);
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("slope-world:update", onModelUpdate);

    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      renderStaticRef.current = null;
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("slope-world:update", onModelUpdate);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_44%,transparent_16%,rgba(1,7,12,0.16)_58%,rgba(1,4,8,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#020a10]/76 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[26%] bg-gradient-to-t from-[#010407]/88 to-transparent" />
    </div>
  );
}

function drawBase(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: SlopeScene,
  time: number,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#03131a");
  gradient.addColorStop(0.48, "#061020");
  gradient.addColorStop(1, "#080815");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const sceneRgb =
    scene === "negative"
      ? "244,114,182"
      : scene === "zero"
        ? "96,165,250"
        : scene === "vertical"
          ? "250,204,21"
          : "45,212,191";
  const glow = context.createRadialGradient(
    width * 0.72,
    height * 0.28,
    0,
    width * 0.72,
    height * 0.28,
    Math.max(width, height) * 0.62,
  );
  glow.addColorStop(
    0,
    `rgba(${sceneRgb},${0.12 + Math.sin(time * 0.12) * 0.012})`,
  );
  glow.addColorStop(1, `rgba(${sceneRgb},0)`);
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawGrid(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  originX: number,
  originY: number,
  scale: number,
) {
  context.save();
  context.lineWidth = 1;

  for (let x = originX % scale; x < width; x += scale) {
    const distance = Math.abs(x - originX) / Math.max(scale, width / 7);
    context.strokeStyle = `rgba(94,234,212,${0.045 + Math.max(0, 0.035 - distance * 0.006)})`;
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let x = originX % scale; x > 0; x -= scale) {
    context.strokeStyle = "rgba(94,234,212,0.045)";
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = originY % scale; y < height; y += scale) {
    context.strokeStyle = "rgba(125,211,252,0.042)";
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  for (let y = originY % scale; y > 0; y -= scale) {
    context.strokeStyle = "rgba(125,211,252,0.042)";
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.strokeStyle = "rgba(226,232,240,0.16)";
  context.lineWidth = 1.4;
  context.beginPath();
  context.moveTo(0, originY);
  context.lineTo(width, originY);
  context.moveTo(originX, 0);
  context.lineTo(originX, height);
  context.stroke();
  context.restore();
}

function drawDirectionField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  slope: number,
  verticalMix: number,
  time: number,
) {
  const spacing = width < 900 ? 122 : 106;
  const horizontalX = 1;
  const horizontalY = -slope;
  const length = Math.hypot(horizontalX, horizontalY) || 1;
  const dx = lerp(horizontalX / length, 0, verticalMix);
  const dy = lerp(horizontalY / length, -1, verticalMix);
  const arrowLength = 22;

  context.save();
  context.lineWidth = 1.2;
  for (let y = spacing * 0.55; y < height; y += spacing) {
    for (let x = spacing * 0.5; x < width; x += spacing) {
      const pulse = 0.5 + Math.sin(time * 0.55 + x * 0.012 + y * 0.01) * 0.5;
      const alpha = 0.075 + pulse * 0.055;
      context.strokeStyle = `rgba(125,211,252,${alpha})`;
      context.beginPath();
      context.moveTo(x - dx * arrowLength * 0.5, y - dy * arrowLength * 0.5);
      context.lineTo(x + dx * arrowLength * 0.5, y + dy * arrowLength * 0.5);
      context.stroke();
      const tipX = x + dx * arrowLength * 0.5;
      const tipY = y + dy * arrowLength * 0.5;
      context.beginPath();
      context.moveTo(tipX, tipY);
      context.lineTo(tipX - dx * 5 - dy * 3, tipY - dy * 5 + dx * 3);
      context.moveTo(tipX, tipY);
      context.lineTo(tipX - dx * 5 + dy * 3, tipY - dy * 5 - dx * 3);
      context.stroke();
    }
  }
  context.restore();
}

function drawParallelFamily(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  originX: number,
  originY: number,
  scale: number,
  model: DisplayModel,
  time: number,
) {
  context.save();
  context.globalCompositeOperation = "lighter";

  if (model.verticalMix > 0.52) {
    const mainX = originX + model.verticalX * scale;
    for (let index = -4; index <= 4; index += 1) {
      const x = mainX + index * scale * 1.15;
      const main = index === 0;
      context.strokeStyle = main
        ? "rgba(250,204,21,0.82)"
        : "rgba(250,204,21,0.10)";
      context.lineWidth = main ? 3 : 1;
      context.beginPath();
      context.moveTo(x, -40);
      context.lineTo(x, height + 40);
      context.stroke();
    }

    for (let index = 0; index < 5; index += 1) {
      const progress = wrap(time * 0.08 + index * 0.2);
      const y = height + 40 - progress * (height + 80);
      drawProbe(context, mainX, y, "250,204,21", index === 0 ? 16 : 10);
    }

    context.strokeStyle = "rgba(244,114,182,0.72)";
    context.lineWidth = 2;
    context.setLineDash([5, 7]);
    context.beginPath();
    context.moveTo(mainX - 26, originY);
    context.lineTo(mainX + 26, originY);
    context.stroke();
    context.setLineDash([]);
    context.restore();
    return;
  }

  const xExtent = width / scale + 4;
  for (let index = -5; index <= 5; index += 1) {
    const offset = index * 1.35;
    const intercept = model.intercept + offset;
    const main = index === 0;
    context.strokeStyle = main
      ? model.slope < -0.01
        ? "rgba(244,114,182,0.86)"
        : Math.abs(model.slope) < 0.01
          ? "rgba(96,165,250,0.86)"
          : "rgba(45,212,191,0.86)"
      : "rgba(125,211,252,0.085)";
    context.lineWidth = main ? 3 : 1;
    context.beginPath();
    const x1 = -xExtent;
    const x2 = xExtent;
    context.moveTo(
      originX + x1 * scale,
      originY - (model.slope * x1 + intercept) * scale,
    );
    context.lineTo(
      originX + x2 * scale,
      originY - (model.slope * x2 + intercept) * scale,
    );
    context.stroke();
  }

  const probeRgb =
    model.slope < -0.01
      ? "244,114,182"
      : Math.abs(model.slope) < 0.01
        ? "96,165,250"
        : "45,212,191";
  for (let index = 0; index < 6; index += 1) {
    const progress = wrap(time * 0.055 + index / 6);
    const x = -xExtent + progress * xExtent * 2;
    const y = model.slope * x + model.intercept;
    drawProbe(
      context,
      originX + x * scale,
      originY - y * scale,
      probeRgb,
      index === 0 ? 15 : 9,
    );
  }

  const visualRun = clamp(Math.abs(model.run), 0.8, 3.2);
  const visualRise = model.slope * visualRun;
  for (let index = -3; index <= 2; index += 1) {
    const startX = index * visualRun * 1.45;
    const startY = model.slope * startX + model.intercept;
    const endX = startX + visualRun;
    const endY = startY + visualRise;
    const sx = originX + startX * scale;
    const sy = originY - startY * scale;
    const ex = originX + endX * scale;
    const ey = originY - endY * scale;

    context.lineWidth = 2;
    context.strokeStyle = "rgba(250,204,21,0.32)";
    context.setLineDash([6, 8]);
    context.lineDashOffset = -time * 8;
    context.beginPath();
    context.moveTo(sx, sy);
    context.lineTo(ex, sy);
    context.stroke();

    context.strokeStyle = "rgba(244,114,182,0.32)";
    context.beginPath();
    context.moveTo(ex, sy);
    context.lineTo(ex, ey);
    context.stroke();
  }
  context.setLineDash([]);
  context.restore();
}

function drawProbe(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  rgb: string,
  radius: number,
) {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, `rgba(${rgb},0.72)`);
  glow.addColorStop(0.24, `rgba(${rgb},0.30)`);
  glow.addColorStop(1, `rgba(${rgb},0)`);
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius, 0, TAU);
  context.fill();
}

function drawLegend(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: SlopeScene,
  model: DisplayModel,
) {
  context.save();
  context.font = "600 12px ui-monospace, SFMono-Regular, monospace";
  context.textAlign = "right";
  context.fillStyle = "rgba(226,232,240,0.30)";
  context.fillText("CONSTANT DIRECTION FIELD", width - 28, 38);
  context.fillStyle = "rgba(94,234,212,0.40)";
  const formula =
    scene === "vertical"
      ? "Δx = 0  ·  slope undefined"
      : `Δy / Δx ≈ ${formatNumber(model.slope)}`;
  context.fillText(formula, width - 28, 58);

  context.textAlign = "left";
  context.fillStyle = "rgba(250,204,21,0.30)";
  context.fillText("RUN", 28, height - 46);
  context.fillStyle = "rgba(244,114,182,0.34)";
  context.fillText("RISE", 76, height - 46);
  context.restore();
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const vignette = context.createRadialGradient(
    width * 0.55,
    height * 0.42,
    Math.min(width, height) * 0.18,
    width * 0.55,
    height * 0.42,
    Math.max(width, height) * 0.82,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.68, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.62)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function resolveScene(value: string | null): SlopeScene {
  return isSlopeScene(value) ? value : "positive";
}

function isSlopeScene(value: unknown): value is SlopeScene {
  return (
    value === "positive" ||
    value === "negative" ||
    value === "zero" ||
    value === "vertical"
  );
}

function formatNumber(value: number) {
  if (Math.abs(value) < 0.005) return "0";
  if (Number.isInteger(value)) return String(value);
  return String(Number(value.toFixed(2)));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function wrap(value: number) {
  return ((value % 1) + 1) % 1;
}
