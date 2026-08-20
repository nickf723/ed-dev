"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type BondScene = "sharing" | "transfer" | "shape" | "forces";
type WorldDetail = {
  deltaEn?: number;
  bondOrder?: number;
  domains?: number;
  lonePairs?: number;
  polarity?: number;
  temperature?: number;
  leftRgb?: string;
  rightRgb?: string;
};
type Dot = { angle: number; radius: number; speed: number; phase: number };
type Molecule = { x: number; y: number; angle: number; phase: number; scale: number };
type SceneMix = Record<BondScene, number>;

const TAU = Math.PI * 2;
const DEFAULT_DETAIL: Required<WorldDetail> = {
  deltaEn: 0.9,
  bondOrder: 1,
  domains: 4,
  lonePairs: 2,
  polarity: 62,
  temperature: 35,
  leftRgb: "148,163,184",
  rightRgb: "248,113,113",
};

export default function BondingWorldBackground() {
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
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const random = mulberry32(42731);
    const dots: Dot[] = Array.from({ length: 180 }, () => ({
      angle: random() * TAU,
      radius: Math.pow(random(), 0.62),
      speed: 0.08 + random() * 0.34,
      phase: random() * TAU,
    }));
    const molecules: Molecule[] = Array.from({ length: 34 }, () => ({
      x: random(),
      y: 0.08 + random() * 0.84,
      angle: random() * TAU,
      phase: random() * TAU,
      scale: 0.65 + random() * 0.75,
    }));
    const mix: SceneMix = { sharing: 1, transfer: 0, shape: 0, forces: 0 };
    const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let detail = DEFAULT_DETAIL;
    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();

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

    function onPointerMove(event: PointerEvent) {
      pointer.targetX = clamp(event.clientX / Math.max(1, width), 0, 1);
      pointer.targetY = clamp(event.clientY / Math.max(1, height), 0, 1);
      if (reducedMotion) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        render(18, 0);
      }
    }

    function onWorldUpdate(event: Event) {
      const update = (event as CustomEvent<WorldDetail>).detail;
      detail = { ...detail, ...update };
      if (reducedMotion) render(18, 0);
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      pointer.x = lerp(pointer.x, pointer.targetX, 1 - Math.pow(0.002, delta));
      pointer.y = lerp(pointer.y, pointer.targetY, 1 - Math.pow(0.002, delta));
      const scene = resolveScene(sceneRef.current);
      (Object.keys(mix) as BondScene[]).forEach((key) => {
        mix[key] = lerp(mix[key], key === scene ? 1 : 0, 1 - Math.pow(0.0005, delta));
      });
      render(now / 1000, delta);
      frame = requestAnimationFrame(loop);
    }

    function render(time: number, _delta: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawBase(context, width, height, mix);
      drawSharing(context, dots, width, height, time, pointer, detail, mix.sharing);
      drawTransfer(context, width, height, time, pointer, detail, mix.transfer);
      drawShape(context, width, height, time, pointer, detail, mix.shape);
      drawForces(context, molecules, width, height, time, pointer, detail, mix.forces);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("bonding-world:update", onWorldUpdate);
    if (reducedMotion) render(18, 0);
    else frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("bonding-world:update", onWorldUpdate);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_18%,rgba(2,4,10,0.16)_58%,rgba(1,2,6,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#02060a]/78 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#010206]/90 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number, mix: SceneMix) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#020c0d");
  gradient.addColorStop(0.48, "#040817");
  gradient.addColorStop(1, "#0a0310");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glows: Array<[number, number, string, number]> = [
    [0.18, 0.24, "34,211,238", mix.sharing],
    [0.82, 0.22, "250,204,21", mix.transfer],
    [0.74, 0.72, "192,132,252", mix.shape],
    [0.22, 0.76, "244,114,182", mix.forces],
  ];
  glows.forEach(([x, y, rgb, opacity]) => {
    const glow = context.createRadialGradient(width * x, height * y, 0, width * x, height * y, Math.max(width, height) * 0.52);
    glow.addColorStop(0, `rgba(${rgb},${0.035 + opacity * 0.12})`);
    glow.addColorStop(1, `rgba(${rgb},0)`);
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
  });
}

function drawSharing(
  context: CanvasRenderingContext2D,
  dots: Dot[],
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  detail: Required<WorldDetail>,
  opacity: number,
) {
  if (opacity < 0.02) return;
  const centerX = width * 0.5 + (pointer.x - 0.5) * 30;
  const centerY = height * 0.33 + (pointer.y - 0.5) * 18;
  const separation = Math.min(width, height) * 0.24;
  const leftX = centerX - separation * 0.5;
  const rightX = centerX + separation * 0.5;
  const skew = clamp(detail.deltaEn / 3.2, 0, 1);

  context.save();
  context.globalAlpha = opacity;
  context.globalCompositeOperation = "lighter";
  drawAtom(context, leftX, centerY, detail.leftRgb, 15);
  drawAtom(context, rightX, centerY, detail.rightRgb, 17);

  for (let contour = 0; contour < 5; contour += 1) {
    context.strokeStyle = `rgba(125,211,252,${0.11 - contour * 0.014})`;
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(
      centerX + separation * (skew - 0.5) * 0.22,
      centerY,
      separation * (0.28 + contour * 0.07),
      separation * (0.11 + contour * 0.035),
      0,
      0,
      TAU,
    );
    context.stroke();
  }

  dots.forEach((dot, index) => {
    const orbit = dot.angle + time * dot.speed;
    const bridge = Math.sin(orbit + dot.phase);
    const x = centerX + bridge * separation * 0.48 + separation * (skew - 0.5) * 0.18;
    const y = centerY + Math.cos(orbit * 1.7 + dot.phase) * separation * 0.16 * dot.radius;
    const rgb = index % 3 === 0 ? detail.rightRgb : "125,211,252";
    context.fillStyle = `rgba(${rgb},${0.12 + dot.radius * 0.35})`;
    context.beginPath();
    context.arc(x, y, 0.8 + dot.radius * 1.2, 0, TAU);
    context.fill();
  });

  for (let bond = 0; bond < detail.bondOrder; bond += 1) {
    const offset = (bond - (detail.bondOrder - 1) / 2) * 8;
    context.strokeStyle = "rgba(224,242,254,0.28)";
    context.lineWidth = 1.6;
    context.beginPath();
    context.moveTo(leftX + 18, centerY + offset);
    context.lineTo(rightX - 18, centerY + offset);
    context.stroke();
  }
  context.restore();
}

function drawTransfer(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  detail: Required<WorldDetail>,
  opacity: number,
) {
  if (opacity < 0.02) return;
  const centerX = width * 0.74 + (pointer.x - 0.5) * 26;
  const centerY = height * 0.31 + (pointer.y - 0.5) * 16;
  const spacing = Math.min(width, height) * 0.19;
  const leftX = centerX - spacing;
  const rightX = centerX + spacing;

  context.save();
  context.globalAlpha = opacity;
  context.globalCompositeOperation = "lighter";
  drawIon(context, leftX, centerY, detail.leftRgb, "+", 18);
  drawIon(context, rightX, centerY, detail.rightRgb, "−", 22);

  for (let line = -4; line <= 4; line += 1) {
    const bend = line * 18;
    context.strokeStyle = `rgba(250,204,21,${0.05 + (4 - Math.abs(line)) * 0.012})`;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(leftX + 20, centerY + bend * 0.6);
    context.bezierCurveTo(centerX - 36, centerY + bend, centerX + 36, centerY + bend, rightX - 22, centerY + bend * 0.6);
    context.stroke();
  }

  const transfer = (Math.sin(time * 0.72) + 1) * 0.5;
  const electronX = lerp(leftX + 26, rightX - 26, transfer);
  const electronY = centerY - 38 - Math.sin(transfer * Math.PI) * 42;
  const glow = context.createRadialGradient(electronX, electronY, 0, electronX, electronY, 20);
  glow.addColorStop(0, "rgba(255,255,255,0.92)");
  glow.addColorStop(0.22, "rgba(34,211,238,0.54)");
  glow.addColorStop(1, "rgba(34,211,238,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(electronX, electronY, 20, 0, TAU);
  context.fill();

  const cell = 42;
  const originX = centerX - cell * 3;
  const originY = centerY + 105;
  for (let row = 0; row < 3; row += 1) {
    for (let column = 0; column < 6; column += 1) {
      const positive = (row + column) % 2 === 0;
      drawIon(
        context,
        originX + column * cell,
        originY + row * cell * 0.82,
        positive ? detail.leftRgb : detail.rightRgb,
        positive ? "+" : "−",
        9,
      );
    }
  }
  context.restore();
}

function drawShape(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  detail: Required<WorldDetail>,
  opacity: number,
) {
  if (opacity < 0.02) return;
  const centerX = width * 0.72 + (pointer.x - 0.5) * 26;
  const centerY = height * 0.67 + (pointer.y - 0.5) * 18;
  const directions = geometryDirections(detail.domains);
  const radius = Math.min(width, height) * 0.13;

  context.save();
  context.globalAlpha = opacity;
  context.globalCompositeOperation = "lighter";
  drawAtom(context, centerX, centerY, "192,132,252", 16);

  directions.forEach((angle, index) => {
    const lone = index >= Math.max(0, detail.domains - detail.lonePairs);
    const pulse = 0.94 + Math.sin(time * 1.1 + index) * 0.05;
    const x = centerX + Math.cos(angle) * radius * pulse;
    const y = centerY + Math.sin(angle) * radius * pulse;
    context.strokeStyle = lone ? "rgba(244,114,182,0.24)" : "rgba(125,211,252,0.26)";
    context.lineWidth = lone ? 1 : 2;
    context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(x, y);
    context.stroke();

    if (lone) {
      context.fillStyle = "rgba(244,114,182,0.12)";
      context.strokeStyle = "rgba(244,114,182,0.35)";
      context.beginPath();
      context.ellipse(x, y, 22, 11, angle, 0, TAU);
      context.fill();
      context.stroke();
    } else {
      drawAtom(context, x, y, index % 2 === 0 ? "34,211,238" : "52,211,153", 9);
    }
  });

  context.strokeStyle = "rgba(255,255,255,0.08)";
  context.setLineDash([4, 8]);
  context.lineDashOffset = -time * 7;
  context.beginPath();
  context.arc(centerX, centerY, radius * 0.68, 0, TAU);
  context.stroke();
  context.restore();
}

function drawForces(
  context: CanvasRenderingContext2D,
  molecules: Molecule[],
  width: number,
  height: number,
  time: number,
  pointer: { x: number; y: number },
  detail: Required<WorldDetail>,
  opacity: number,
) {
  if (opacity < 0.02) return;
  const thermal = 0.004 + detail.temperature / 12000;
  const alignment = clamp(detail.polarity / 100, 0, 1);
  const positions = molecules.map((molecule, index) => {
    const x = wrap(molecule.x + Math.sin(time * thermal * 18 + molecule.phase) * 0.035 + (pointer.x - 0.5) * 0.008) * width;
    const y = wrap(molecule.y + Math.cos(time * thermal * 15 + molecule.phase) * 0.03 + (pointer.y - 0.5) * 0.006) * height;
    return {
      x,
      y,
      angle: lerp(molecule.angle + Math.sin(time * thermal * 30 + index) * 0.7, index % 2 === 0 ? -0.18 : Math.PI - 0.18, alignment * 0.68),
      scale: molecule.scale,
    };
  });

  context.save();
  context.globalAlpha = opacity;
  context.globalCompositeOperation = "lighter";
  const threshold = Math.min(width, height) * (0.12 + alignment * 0.09);
  for (let first = 0; first < positions.length; first += 1) {
    for (let second = first + 1; second < positions.length; second += 1) {
      if ((first + second) % 4 !== 0) continue;
      const a = positions[first];
      const b = positions[second];
      const distance = Math.hypot(b.x - a.x, b.y - a.y);
      if (distance > threshold) continue;
      context.strokeStyle = `rgba(244,114,182,${0.025 + alignment * 0.11 * (1 - distance / threshold)})`;
      context.setLineDash([3, 7]);
      context.lineDashOffset = -time * 8;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.lineTo(b.x, b.y);
      context.stroke();
    }
  }
  context.setLineDash([]);

  positions.forEach((molecule, index) => {
    const length = 14 * molecule.scale;
    const ax = molecule.x - Math.cos(molecule.angle) * length;
    const ay = molecule.y - Math.sin(molecule.angle) * length;
    const bx = molecule.x + Math.cos(molecule.angle) * length;
    const by = molecule.y + Math.sin(molecule.angle) * length;
    context.strokeStyle = "rgba(255,255,255,0.12)";
    context.lineWidth = 1.5;
    context.beginPath();
    context.moveTo(ax, ay);
    context.lineTo(bx, by);
    context.stroke();
    drawAtom(context, ax, ay, index % 2 === 0 ? detail.leftRgb : detail.rightRgb, 6 * molecule.scale);
    drawAtom(context, bx, by, index % 2 === 0 ? detail.rightRgb : detail.leftRgb, 8 * molecule.scale);
  });
  context.restore();
}

function drawAtom(context: CanvasRenderingContext2D, x: number, y: number, rgb: string, radius: number) {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius * 3.4);
  glow.addColorStop(0, `rgba(${rgb},0.92)`);
  glow.addColorStop(0.22, `rgba(${rgb},0.36)`);
  glow.addColorStop(1, `rgba(${rgb},0)`);
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius * 3.4, 0, TAU);
  context.fill();
  context.fillStyle = `rgba(${rgb},0.92)`;
  context.beginPath();
  context.arc(x, y, Math.max(2.2, radius * 0.28), 0, TAU);
  context.fill();
}

function drawIon(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  rgb: string,
  charge: string,
  radius: number,
) {
  drawAtom(context, x, y, rgb, radius);
  context.strokeStyle = `rgba(${rgb},0.42)`;
  context.lineWidth = 1;
  context.beginPath();
  context.arc(x, y, radius, 0, TAU);
  context.stroke();
  context.fillStyle = "rgba(255,255,255,0.74)";
  context.font = "700 13px ui-monospace, monospace";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(charge, x, y);
}

function geometryDirections(domains: number) {
  if (domains <= 2) return [Math.PI, 0];
  if (domains === 3) return [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6];
  if (domains === 4) return [-Math.PI / 2, Math.PI / 6, (5 * Math.PI) / 6, Math.PI / 2];
  if (domains === 5) return [-Math.PI / 2, Math.PI / 2, 0, (2 * Math.PI) / 3, (4 * Math.PI) / 3];
  return Array.from({ length: 6 }, (_, index) => (index / 6) * TAU - Math.PI / 2);
}

function resolveScene(value: string | null): BondScene {
  if (value === "transfer" || value === "shape" || value === "forces") return value;
  return "sharing";
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(
    width * 0.5,
    height * 0.38,
    Math.min(width, height) * 0.18,
    width * 0.5,
    height * 0.38,
    Math.max(width, height) * 0.8,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.68, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.66)");
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
