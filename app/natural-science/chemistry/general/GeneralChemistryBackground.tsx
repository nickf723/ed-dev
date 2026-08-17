"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type GeneralScene = "inventory" | "energy" | "rate" | "equilibrium";
type ParticleKind = "reactant-a" | "reactant-b" | "product";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: ParticleKind;
  radius: number;
  phase: number;
};

const TAU = Math.PI * 2;
const STYLE: Record<ParticleKind, { rgb: string; label: string }> = {
  "reactant-a": { rgb: "52,211,153", label: "A" },
  "reactant-b": { rgb: "34,211,238", label: "B" },
  product: { rgb: "250,204,21", label: "AB" },
};

export default function GeneralChemistryBackground() {
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
    const random = mulberry32(72364);

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();
    let scroll = 0;
    let scrollTarget = 0;
    let particles: Particle[] = [];

    function rebuild() {
      const count = width < 900 ? 36 : 66;
      particles = Array.from({ length: count }, (_, index) => {
        const kind: ParticleKind = index % 5 < 2 ? "reactant-a" : index % 5 < 4 ? "reactant-b" : "product";
        const angle = random() * TAU;
        return {
          x: 0.05 + random() * 0.9,
          y: 0.09 + random() * 0.82,
          vx: Math.cos(angle) * (0.018 + random() * 0.026),
          vy: Math.sin(angle) * (0.018 + random() * 0.026),
          kind,
          radius: kind === "product" ? 7.2 : 5.3,
          phase: random() * TAU,
        };
      });
    }

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.15 : 1.5);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      rebuild();
      updateScroll();
      if (reducedMotion) render(20, 0);
    }

    function updateScroll() {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = Math.min(1, Math.max(0, window.scrollY / scrollable));
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      scroll += (scrollTarget - scroll) * (1 - Math.pow(0.001, delta));
      render(now / 1000, delta);
      frame = requestAnimationFrame(loop);
    }

    function render(time: number, delta: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const scene = resolveScene(sceneRef.current, scroll);
      drawBase(context, width, height, scene);
      drawControlGrid(context, width, height, scene, time);
      if (!reducedMotion && delta > 0) updateParticles(particles, scene, time, delta);
      drawScene(context, particles, width, height, scene, time);
      drawParticles(context, particles, width, height, scene, time);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_35%,transparent_16%,rgba(3,6,7,0.15)_58%,rgba(1,3,4,0.70)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#020607]/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#010304]/88 to-transparent" />
    </div>
  );
}

function resolveScene(scene: string | null, scroll: number): GeneralScene {
  if (scene === "inventory" || scene === "energy" || scene === "rate" || scene === "equilibrium") return scene;
  if (scroll < 0.24) return "inventory";
  if (scroll < 0.5) return "energy";
  if (scroll < 0.76) return "rate";
  return "equilibrium";
}

function updateParticles(particles: Particle[], scene: GeneralScene, time: number, delta: number) {
  for (let index = 0; index < particles.length; index += 1) {
    const particle = particles[index];
    const target = targetFor(particle, index, particles.length, scene, time);
    particle.vx += (target.x - particle.x) * delta * (scene === "rate" ? 0.08 : 0.18);
    particle.vy += (target.y - particle.y) * delta * (scene === "rate" ? 0.08 : 0.18);

    if (scene === "rate") {
      particle.vx += Math.sin(time * 4.2 + particle.phase) * delta * 0.13;
      particle.vy += Math.cos(time * 3.7 + particle.phase) * delta * 0.13;
    } else if (scene === "equilibrium") {
      particle.vx += Math.sin(time * 0.8 + particle.phase) * delta * 0.025;
      particle.vy += Math.cos(time * 0.7 + particle.phase) * delta * 0.025;
    }

    const max = scene === "rate" ? 0.12 : 0.065;
    const speed = Math.hypot(particle.vx, particle.vy) || 1;
    if (speed > max) {
      particle.vx = (particle.vx / speed) * max;
      particle.vy = (particle.vy / speed) * max;
    }

    particle.vx *= Math.pow(scene === "rate" ? 0.98 : 0.94, delta * 60);
    particle.vy *= Math.pow(scene === "rate" ? 0.98 : 0.94, delta * 60);
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;

    if (particle.x < 0.03 || particle.x > 0.97) {
      particle.vx *= -0.9;
      particle.x = Math.min(0.97, Math.max(0.03, particle.x));
    }
    if (particle.y < 0.05 || particle.y > 0.95) {
      particle.vy *= -0.9;
      particle.y = Math.min(0.95, Math.max(0.05, particle.y));
    }
  }
}

function targetFor(particle: Particle, index: number, total: number, scene: GeneralScene, time: number) {
  if (scene === "inventory") {
    const lane = particle.kind === "reactant-a" ? 0.25 : particle.kind === "reactant-b" ? 0.5 : 0.75;
    const sameKindIndex = Math.floor(index / 3);
    const rows = Math.ceil(total / 3);
    return {
      x: lane + Math.sin(time * 0.18 + particle.phase) * 0.018,
      y: 0.12 + (sameKindIndex / Math.max(1, rows - 1)) * 0.76,
    };
  }

  if (scene === "energy") {
    const progress = (index % 18) / 17;
    const barrier = Math.exp(-Math.pow((progress - 0.5) / 0.19, 2));
    return {
      x: 0.08 + progress * 0.84 + Math.sin(time * 0.24 + particle.phase) * 0.012,
      y: 0.72 - barrier * 0.34 + (particle.kind === "product" ? 0.08 : 0),
    };
  }

  if (scene === "equilibrium") {
    const left = particle.kind !== "product";
    const column = left ? 0.28 : 0.72;
    const row = (index % 14) / 13;
    return {
      x: column + Math.sin(time * 0.22 + particle.phase) * 0.10,
      y: 0.16 + row * 0.68,
    };
  }

  return {
    x: particle.x,
    y: particle.y,
  };
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number, scene: GeneralScene) {
  const palette =
    scene === "inventory"
      ? ["#04110c", "#061016", "#010405"]
      : scene === "energy"
        ? ["#130b06", "#071018", "#010405"]
        : scene === "rate"
          ? ["#0b0714", "#071013", "#010405"]
          : ["#06101a", "#07100e", "#010405"];
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(0.55, palette[1]);
  gradient.addColorStop(1, palette[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);
}

function drawControlGrid(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: GeneralScene,
  time: number,
) {
  context.save();
  context.lineWidth = 1;
  const rgb = scene === "inventory" ? "52,211,153" : scene === "energy" ? "250,204,21" : scene === "rate" ? "192,132,252" : "34,211,238";
  context.strokeStyle = `rgba(${rgb},0.045)`;

  for (let x = 0; x <= width; x += 72) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = 0; y <= height; y += 72) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }

  context.strokeStyle = `rgba(${rgb},0.075)`;
  context.setLineDash([5, 12]);
  context.lineDashOffset = -time * 5;
  context.beginPath();
  context.rect(width * 0.055, height * 0.08, width * 0.89, height * 0.84);
  context.stroke();
  context.restore();
}

function drawScene(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  scene: GeneralScene,
  time: number,
) {
  context.save();

  if (scene === "inventory") {
    for (const [index, kind] of (["reactant-a", "reactant-b", "product"] as ParticleKind[]).entries()) {
      const x = width * (0.25 + index * 0.25);
      context.strokeStyle = `rgba(${STYLE[kind].rgb},0.16)`;
      context.beginPath();
      context.moveTo(x, height * 0.09);
      context.lineTo(x, height * 0.91);
      context.stroke();
    }
  }

  if (scene === "energy") {
    context.strokeStyle = "rgba(250,204,21,0.20)";
    context.lineWidth = 1.6;
    context.beginPath();
    for (let x = -20; x <= width + 20; x += 12) {
      const progress = x / Math.max(1, width);
      const barrier = Math.exp(-Math.pow((progress - 0.5) / 0.19, 2));
      const y = height * 0.72 - barrier * height * 0.34 + smoothstep(0.58, 0.9, progress) * height * 0.08;
      if (x === -20) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();

    const pulse = wrap(time * 0.08);
    const pulseX = pulse * width;
    const barrier = Math.exp(-Math.pow((pulse - 0.5) / 0.19, 2));
    const pulseY = height * 0.72 - barrier * height * 0.34 + smoothstep(0.58, 0.9, pulse) * height * 0.08;
    drawPulse(context, pulseX, pulseY, "250,204,21", 28);
  }

  if (scene === "rate") {
    context.globalCompositeOperation = "lighter";
    for (let first = 0; first < particles.length; first += 4) {
      const a = particles[first];
      const b = particles[(first + 7) % particles.length];
      const ax = a.x * width;
      const ay = a.y * height;
      const bx = b.x * width;
      const by = b.y * height;
      const distance = Math.hypot(bx - ax, by - ay);
      if (distance > Math.min(width, height) * 0.28) continue;
      context.strokeStyle = "rgba(192,132,252,0.08)";
      context.setLineDash([3, 9]);
      context.lineDashOffset = -time * 12;
      context.beginPath();
      context.moveTo(ax, ay);
      context.lineTo(bx, by);
      context.stroke();
      if ((first + Math.floor(time * 3)) % 12 === 0) drawPulse(context, (ax + bx) / 2, (ay + by) / 2, "244,114,182", 22);
    }
  }

  if (scene === "equilibrium") {
    context.strokeStyle = "rgba(34,211,238,0.16)";
    context.lineWidth = 1.4;
    context.setLineDash([7, 12]);
    context.lineDashOffset = -time * 9;
    context.beginPath();
    context.moveTo(width * 0.34, height * 0.43);
    context.bezierCurveTo(width * 0.45, height * 0.27, width * 0.55, height * 0.27, width * 0.66, height * 0.43);
    context.stroke();
    context.lineDashOffset = time * 9;
    context.beginPath();
    context.moveTo(width * 0.66, height * 0.57);
    context.bezierCurveTo(width * 0.55, height * 0.73, width * 0.45, height * 0.73, width * 0.34, height * 0.57);
    context.stroke();
  }

  context.restore();
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: Particle[],
  width: number,
  height: number,
  scene: GeneralScene,
  time: number,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  for (const particle of particles) {
    const x = particle.x * width;
    const y = particle.y * height;
    const style = STYLE[particle.kind];
    const radius = particle.radius * (0.9 + Math.sin(time * 0.9 + particle.phase) * 0.08) * (scene === "rate" ? 1.08 : 1);
    const glow = context.createRadialGradient(x, y, 0, x, y, radius * 4.2);
    glow.addColorStop(0, `rgba(${style.rgb},0.68)`);
    glow.addColorStop(0.3, `rgba(${style.rgb},0.22)`);
    glow.addColorStop(1, `rgba(${style.rgb},0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius * 4.2, 0, TAU);
    context.fill();

    context.fillStyle = `rgba(${style.rgb},0.68)`;
    context.beginPath();
    context.arc(x, y, radius, 0, TAU);
    context.fill();
  }
  context.restore();
}

function drawPulse(context: CanvasRenderingContext2D, x: number, y: number, rgb: string, radius: number) {
  const glow = context.createRadialGradient(x, y, 0, x, y, radius);
  glow.addColorStop(0, "rgba(255,255,255,0.74)");
  glow.addColorStop(0.24, `rgba(${rgb},0.38)`);
  glow.addColorStop(1, `rgba(${rgb},0)`);
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, radius, 0, TAU);
  context.fill();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.48, height * 0.36, Math.min(width, height) * 0.16, width * 0.48, height * 0.36, Math.max(width, height) * 0.8);
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

function smoothstep(edge0: number, edge1: number, value: number) {
  const progress = Math.min(1, Math.max(0, (value - edge0) / Math.max(0.0001, edge1 - edge0)));
  return progress * progress * (3 - 2 * progress);
}

function wrap(value: number) {
  return ((value % 1) + 1) % 1;
}
