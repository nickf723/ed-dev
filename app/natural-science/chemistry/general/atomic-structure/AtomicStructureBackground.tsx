"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type AtomicScene = "identity" | "shells" | "periodicity";
type Nucleon = {
  angle: number;
  radius: number;
  phase: number;
  proton: boolean;
};
type Star = {
  x: number;
  y: number;
  depth: number;
  phase: number;
};
type ElementModel = {
  z: number;
  mass: number;
  shells: number[];
};

const TAU = Math.PI * 2;

export default function AtomicStructureBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const director = useWorldDirector();
  const sceneRef = useRef<string | null>(director.scene);

  useEffect(() => {
    sceneRef.current = director.scene;
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
    const random = mulberry32(64020);
    const nucleons = buildNucleons(random, 52);
    const stars = buildStars(random, 150);
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let elementModel: ElementModel = { z: 6, mass: 12, shells: [2, 4] };

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();
    let mix = { identity: 1, shells: 0, periodicity: 0 };

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.2 : 1.55);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion) render(18, 0);
    }

    function onElementChange(event: Event) {
      const detail = (event as CustomEvent<ElementModel>).detail;
      if (!detail || !Array.isArray(detail.shells)) return;
      elementModel = {
        z: Math.max(1, detail.z),
        mass: Math.max(detail.z, detail.mass),
        shells: detail.shells.map((value) => Math.max(0, value)),
      };
      if (reducedMotion) render(18, 0);
    }

    function onPointerMove(event: PointerEvent) {
      pointer.targetX = clamp(event.clientX / Math.max(1, width), 0, 1);
      pointer.targetY = clamp(event.clientY / Math.max(1, height), 0, 1);
      if (reducedMotion) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        render(18, 0);
      }
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      pointer.x = lerp(pointer.x, pointer.targetX, 1 - Math.pow(0.002, delta));
      pointer.y = lerp(pointer.y, pointer.targetY, 1 - Math.pow(0.002, delta));
      const scene = resolveScene(sceneRef.current);
      mix.identity = lerp(mix.identity, scene === "identity" ? 1 : 0, 1 - Math.pow(0.0004, delta));
      mix.shells = lerp(mix.shells, scene === "shells" ? 1 : 0, 1 - Math.pow(0.0004, delta));
      mix.periodicity = lerp(mix.periodicity, scene === "periodicity" ? 1 : 0, 1 - Math.pow(0.0004, delta));
      render(now / 1000, delta);
      frame = requestAnimationFrame(loop);
    }

    function render(time: number, _delta: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawBase(context, width, height, mix);
      drawStars(context, stars, width, height, time, pointer);
      drawIdentityField(
        context,
        nucleons,
        elementModel,
        width,
        height,
        time,
        pointer,
        mix.identity,
      );
      drawShellField(
        context,
        width,
        height,
        time,
        pointer,
        mix.shells,
        elementModel.shells,
      );
      drawPeriodicField(context, width, height, time, pointer, mix.periodicity);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("atomic-structure:element", onElementChange);
    if (reducedMotion) render(18, 0);
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("atomic-structure:element", onElementChange);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_34%,transparent_20%,rgba(1,4,7,0.18)_58%,rgba(1,3,5,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#020708]/78 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#010304]/88 to-transparent" />
    </div>
  );
}

function buildNucleons(random: () => number, count: number): Nucleon[] {
  return Array.from({ length: count }, (_, index) => ({
    angle: random() * TAU,
    radius: Math.sqrt(random()),
    phase: random() * TAU,
    proton: index % 2 === 0 || index % 5 === 0,
  }));
}

function buildStars(random: () => number, count: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    depth: 0.25 + random() * 0.75,
    phase: random() * TAU,
  }));
}

function drawBase(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  mix: { identity: number; shells: number; periodicity: number },
) {
  const background = context.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#020b0a");
  background.addColorStop(0.46, "#031019");
  background.addColorStop(1, "#04030d");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const green = context.createRadialGradient(width * 0.17, height * 0.26, 0, width * 0.17, height * 0.26, Math.max(width, height) * 0.52);
  green.addColorStop(0, `rgba(52,211,153,${0.10 + mix.identity * 0.08})`);
  green.addColorStop(1, "rgba(52,211,153,0)");
  context.fillStyle = green;
  context.fillRect(0, 0, width, height);

  const cyan = context.createRadialGradient(width * 0.72, height * 0.28, 0, width * 0.72, height * 0.28, Math.max(width, height) * 0.56);
  cyan.addColorStop(0, `rgba(34,211,238,${0.07 + mix.shells * 0.11})`);
  cyan.addColorStop(1, "rgba(34,211,238,0)");
  context.fillStyle = cyan;
  context.fillRect(0, 0, width, height);

  const violet = context.createRadialGradient(width * 0.66, height * 0.72, 0, width * 0.66, height * 0.72, Math.max(width, height) * 0.55);
  violet.addColorStop(0, `rgba(167,139,250,${0.04 + mix.periodicity * 0.10})`);
  violet.addColorStop(1, "rgba(167,139,250,0)");
  context.fillStyle = violet;
  context.fillRect(0, 0, width, height);
}

function drawStars(
  context: CanvasRenderingContext2D,
  stars: Star[],
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  for (const star of stars) {
    const x = wrap(star.x + (pointer.x - 0.5) * star.depth * 0.012) * width;
    const y = wrap(star.y + (pointer.y - 0.5) * star.depth * 0.009) * height;
    const alpha = 0.08 + star.depth * 0.22 + Math.sin(time * 0.35 + star.phase) * 0.04;
    context.fillStyle = `rgba(186,230,253,${alpha})`;
    context.beginPath();
    context.arc(x, y, 0.5 + star.depth * 0.8, 0, TAU);
    context.fill();
  }
  context.restore();
}

function drawIdentityField(
  context: CanvasRenderingContext2D,
  nucleons: Nucleon[],
  element: ElementModel,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  opacity: number,
) {
  if (opacity < 0.02) return;
  const centerX = width * 0.17 + (pointer.x - 0.5) * 18;
  const centerY = height * 0.31 + (pointer.y - 0.5) * 14;
  const scale = Math.min(width, height) * 0.12;

  context.save();
  context.globalAlpha = opacity;
  context.globalCompositeOperation = "lighter";

  for (let ring = 1; ring <= 4; ring += 1) {
    context.strokeStyle = `rgba(52,211,153,${0.10 - ring * 0.012})`;
    context.lineWidth = 1;
    context.beginPath();
    context.arc(centerX, centerY, scale * (0.35 + ring * 0.34), 0, TAU);
    context.stroke();
  }

  for (const [index, nucleon] of nucleons.slice(0, element.mass).entries()) {
    const jitter = Math.sin(time * 1.8 + nucleon.phase) * 2.5;
    const radius = nucleon.radius * scale * 0.54;
    const x = centerX + Math.cos(nucleon.angle + time * 0.025) * radius + jitter;
    const y = centerY + Math.sin(nucleon.angle + time * 0.025) * radius + Math.cos(time + nucleon.phase) * 2;
    const rgb = index < element.z ? "248,113,113" : "96,165,250";
    const glow = context.createRadialGradient(x, y, 0, x, y, 12);
    glow.addColorStop(0, `rgba(${rgb},0.72)`);
    glow.addColorStop(1, `rgba(${rgb},0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, 12, 0, TAU);
    context.fill();
    context.fillStyle = `rgba(${rgb},0.86)`;
    context.beginPath();
    context.arc(x, y, 2.2, 0, TAU);
    context.fill();
  }

  const labelX = centerX + scale * 1.2;
  const labelY = centerY - scale * 0.7;
  context.strokeStyle = "rgba(52,211,153,0.20)";
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(centerX + scale * 0.42, centerY - scale * 0.25);
  context.lineTo(labelX, labelY);
  context.stroke();
  context.fillStyle = "rgba(167,243,208,0.34)";
  context.font = "600 10px ui-monospace, monospace";
  context.fillText("ATOMIC NUMBER FIXES IDENTITY", labelX + 8, labelY + 3);

  context.restore();
}

function drawShellField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  opacity: number,
  shellOccupancy: number[],
) {
  if (opacity < 0.02) return;
  const centerX = width * 0.73 + (pointer.x - 0.5) * 22;
  const centerY = height * 0.29 + (pointer.y - 0.5) * 16;
  const minimum = Math.min(width, height);
  const shellRadii = [0.085, 0.145, 0.215, 0.285];
  const occupancy = shellOccupancy.length ? shellOccupancy : [2, 4];

  context.save();
  context.globalAlpha = opacity;
  context.globalCompositeOperation = "lighter";

  for (let shellIndex = 0; shellIndex < occupancy.length; shellIndex += 1) {
    const radius = minimum * (shellRadii[shellIndex] ?? 0.285 + shellIndex * 0.06);
    context.strokeStyle = `rgba(34,211,238,${0.18 - shellIndex * 0.022})`;
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(centerX, centerY, radius, radius * 0.56, -0.15, 0, TAU);
    context.stroke();

    for (let electron = 0; electron < occupancy[shellIndex]; electron += 1) {
      const angle =
        time * (0.34 - shellIndex * 0.055) +
        electron * (TAU / occupancy[shellIndex]) +
        shellIndex * 0.82;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.56;
      const glow = context.createRadialGradient(x, y, 0, x, y, 12);
      glow.addColorStop(0, "rgba(255,255,255,0.90)");
      glow.addColorStop(0.22, "rgba(34,211,238,0.56)");
      glow.addColorStop(1, "rgba(34,211,238,0)");
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, 12, 0, TAU);
      context.fill();
    }
  }

  const pulse = (Math.sin(time * 0.7) + 1) * 0.5;
  const inner = minimum * shellRadii[Math.min(1, Math.max(0, occupancy.length - 1))];
  const outer = minimum * shellRadii[Math.min(2, Math.max(0, occupancy.length - 1))];
  const photonY = centerY + Math.sin(time * 0.9) * 28;
  context.strokeStyle = "rgba(250,204,21,0.30)";
  context.lineWidth = 1.4;
  context.setLineDash([5, 8]);
  context.lineDashOffset = -time * 12;
  context.beginPath();
  context.moveTo(centerX + inner * 0.72, photonY);
  context.lineTo(centerX + outer * 0.82, photonY - 28 * pulse);
  context.stroke();
  context.setLineDash([]);

  context.restore();
}

function drawPeriodicField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  opacity: number,
) {
  if (opacity < 0.02) return;
  const columns = 18;
  const rows = 7;
  const cell = Math.min(44, width * 0.031);
  const gridWidth = columns * cell;
  const gridHeight = rows * cell;
  const originX = width * 0.5 - gridWidth * 0.5 + (pointer.x - 0.5) * 20;
  const originY = height * 0.57 - gridHeight * 0.5 + (pointer.y - 0.5) * 12;

  context.save();
  context.globalAlpha = opacity;
  context.translate(originX, originY);
  context.rotate(-0.035);

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const exists = periodicCellExists(row, column);
      if (!exists) continue;
      const x = column * cell;
      const y = row * cell;
      const phase = wrap(time * 0.055 + row * 0.07 + column * 0.035);
      const wave = Math.max(0, 1 - Math.abs(phase - 0.5) * 8);
      const trend = column / (columns - 1);
      context.fillStyle = `rgba(${lerpColor("52,211,153", "167,139,250", trend)},${0.025 + wave * 0.09})`;
      context.strokeStyle = `rgba(${lerpColor("52,211,153", "34,211,238", trend)},${0.10 + wave * 0.17})`;
      context.lineWidth = 1;
      context.fillRect(x + 2, y + 2, cell - 5, cell - 5);
      context.strokeRect(x + 2, y + 2, cell - 5, cell - 5);
    }
  }

  context.strokeStyle = "rgba(52,211,153,0.28)";
  context.lineWidth = 2;
  drawArrow(context, cell * 1.2, gridHeight + 18, gridWidth - cell * 1.2, gridHeight + 18);
  context.fillStyle = "rgba(167,243,208,0.42)";
  context.font = "600 10px ui-monospace, monospace";
  context.fillText("IONIZATION ENERGY / ELECTRONEGATIVITY", cell * 5.2, gridHeight + 38);

  context.strokeStyle = "rgba(250,204,21,0.26)";
  drawArrow(context, -18, cell * 0.4, -18, gridHeight - cell * 0.5);
  context.save();
  context.translate(-38, gridHeight * 0.72);
  context.rotate(-Math.PI / 2);
  context.fillStyle = "rgba(254,240,138,0.38)";
  context.fillText("ATOMIC RADIUS", 0, 0);
  context.restore();

  context.restore();
}

function periodicCellExists(row: number, column: number) {
  if (row === 0) return column === 0 || column === 17;
  if (row === 1 || row === 2) return column < 2 || column > 11;
  return true;
}

function drawArrow(
  context: CanvasRenderingContext2D,
  startX: number,
  startY: number,
  endX: number,
  endY: number,
) {
  const angle = Math.atan2(endY - startY, endX - startX);
  context.beginPath();
  context.moveTo(startX, startY);
  context.lineTo(endX, endY);
  context.stroke();
  context.beginPath();
  context.moveTo(endX, endY);
  context.lineTo(endX - Math.cos(angle - 0.45) * 10, endY - Math.sin(angle - 0.45) * 10);
  context.moveTo(endX, endY);
  context.lineTo(endX - Math.cos(angle + 0.45) * 10, endY - Math.sin(angle + 0.45) * 10);
  context.stroke();
}

function resolveScene(value: string | null): AtomicScene {
  if (value === "shells" || value === "periodicity") return value;
  return "identity";
}

function lerpColor(start: string, end: string, amount: number) {
  const a = start.split(",").map(Number);
  const b = end.split(",").map(Number);
  return `${Math.round(lerp(a[0], b[0], amount))},${Math.round(lerp(a[1], b[1], amount))},${Math.round(lerp(a[2], b[2], amount))}`;
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.38,
    Math.min(width, height) * 0.18,
    width * 0.5,
    height * 0.38,
    Math.max(width, height) * 0.78,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.68, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.64)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
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
