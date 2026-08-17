"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type OrbitalScene = "1s" | "2s" | "2px" | "2py";
type Sample = { u: number; v: number; phase: number; size: number };

const TAU = Math.PI * 2;

export default function QuantumBackground() {
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
    const random = mulberry32(18991);
    const samples: Sample[] = Array.from({ length: 520 }, () => ({
      u: random(),
      v: random(),
      phase: random() * TAU,
      size: 0.5 + random() * 1.6,
    }));

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();
    let scroll = 0;
    let scrollTarget = 0;

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.15 : 1.5);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      updateScroll();
      if (reducedMotion) render(12);
    }

    function updateScroll() {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = Math.min(1, Math.max(0, window.scrollY / scrollable));
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      scroll += (scrollTarget - scroll) * (1 - Math.pow(0.001, delta));
      render(now / 1000);
      frame = requestAnimationFrame(loop);
    }

    function render(time: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const scene = resolveScene(sceneRef.current, scroll);
      drawBase(context, width, height, scene);
      drawWaveField(context, width, height, scene, time);
      drawProbabilityCloud(context, width, height, scene, time, samples);
      drawEnergyTransitions(context, width, height, scene, time);
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_34%,transparent_15%,rgba(2,4,12,0.18)_58%,rgba(1,2,8,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#01030b]/76 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#010208]/90 to-transparent" />
    </div>
  );
}

function resolveScene(scene: string | null, scroll: number): OrbitalScene {
  if (scene === "1s" || scene === "2s" || scene === "2px" || scene === "2py") return scene;
  if (scroll < 0.25) return "1s";
  if (scroll < 0.5) return "2s";
  if (scroll < 0.75) return "2px";
  return "2py";
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number, scene: OrbitalScene) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, scene.startsWith("2p") ? "#071022" : "#03101a");
  gradient.addColorStop(0.5, "#08051d");
  gradient.addColorStop(1, "#010208");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const cyan = context.createRadialGradient(width * 0.22, height * 0.22, 0, width * 0.22, height * 0.22, Math.max(width, height) * 0.56);
  cyan.addColorStop(0, "rgba(34,211,238,0.16)");
  cyan.addColorStop(1, "rgba(34,211,238,0)");
  context.fillStyle = cyan;
  context.fillRect(0, 0, width, height);

  const violet = context.createRadialGradient(width * 0.78, height * 0.28, 0, width * 0.78, height * 0.28, Math.max(width, height) * 0.58);
  violet.addColorStop(0, "rgba(139,92,246,0.15)");
  violet.addColorStop(1, "rgba(139,92,246,0)");
  context.fillStyle = violet;
  context.fillRect(0, 0, width, height);
}

function drawWaveField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: OrbitalScene,
  time: number,
) {
  context.save();
  context.globalAlpha = 0.38;
  context.lineWidth = 1;
  const horizontal = scene === "2py";

  for (let line = 0; line < 18; line += 1) {
    const offset = (line + 1) / 19;
    context.strokeStyle = `rgba(${line % 2 ? "192,132,252" : "34,211,238"},${0.025 + (line % 5) * 0.007})`;
    context.beginPath();
    for (let step = -20; step <= (horizontal ? height : width) + 20; step += 18) {
      const normalized = step / Math.max(1, horizontal ? height : width);
      const nodeSign = scene === "2s" ? Math.sign(normalized - 0.5) : scene.startsWith("2p") ? Math.sign(Math.sin(normalized * Math.PI)) : 1;
      const wave = Math.sin(normalized * 12 + time * 0.34 + line * 0.42) * (8 + line * 0.7) * nodeSign;
      const x = horizontal ? offset * width + wave : step;
      const y = horizontal ? step : offset * height + wave;
      if (step === -20) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();
  }
  context.restore();
}

function drawProbabilityCloud(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: OrbitalScene,
  time: number,
  samples: Sample[],
) {
  const centerX = width * 0.72;
  const centerY = height * 0.36;
  const scale = Math.min(width, height) * 0.34;
  context.save();
  context.globalCompositeOperation = "lighter";

  for (const sample of samples) {
    const point = orbitalPoint(sample.u, sample.v, scene, time + sample.phase);
    const x = centerX + point.x * scale;
    const y = centerY + point.y * scale;
    const phasePositive = point.phase >= 0;
    const rgb = phasePositive ? "34,211,238" : "192,132,252";
    const alpha = 0.08 + point.density * 0.34;
    context.fillStyle = `rgba(${rgb},${alpha})`;
    context.beginPath();
    context.arc(x, y, sample.size * (0.65 + point.density), 0, TAU);
    context.fill();
  }

  const core = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 28);
  core.addColorStop(0, "rgba(255,255,255,0.92)");
  core.addColorStop(0.2, "rgba(250,204,21,0.58)");
  core.addColorStop(1, "rgba(250,204,21,0)");
  context.fillStyle = core;
  context.beginPath();
  context.arc(centerX, centerY, 28, 0, TAU);
  context.fill();

  if (scene === "2s") {
    context.strokeStyle = "rgba(255,255,255,0.11)";
    context.lineWidth = 1.2;
    context.beginPath();
    context.arc(centerX, centerY, scale * 0.34, 0, TAU);
    context.stroke();
  }
  if (scene === "2px" || scene === "2py") {
    context.strokeStyle = "rgba(255,255,255,0.10)";
    context.setLineDash([5, 10]);
    context.beginPath();
    if (scene === "2px") {
      context.moveTo(centerX, centerY - scale * 0.72);
      context.lineTo(centerX, centerY + scale * 0.72);
    } else {
      context.moveTo(centerX - scale * 0.72, centerY);
      context.lineTo(centerX + scale * 0.72, centerY);
    }
    context.stroke();
    context.setLineDash([]);
  }
  context.restore();
}

function orbitalPoint(u: number, v: number, scene: OrbitalScene, time: number) {
  const angle = u * TAU;
  const radialSeed = Math.pow(v, 0.72);
  if (scene === "1s") {
    const radius = radialSeed * (0.72 + Math.sin(time * 0.12) * 0.02);
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, density: 1 - radius * 0.72, phase: 1 };
  }
  if (scene === "2s") {
    const inner = v < 0.42;
    const radius = inner ? Math.sqrt(v / 0.42) * 0.27 : 0.45 + Math.sqrt((v - 0.42) / 0.58) * 0.45;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, density: inner ? 0.82 : 0.58, phase: inner ? 1 : -1 };
  }
  const lobe = u < 0.5 ? -1 : 1;
  const localAngle = (u % 0.5) * Math.PI - Math.PI / 2;
  const radius = 0.18 + radialSeed * 0.65;
  const major = lobe * radius;
  const minor = Math.sin(localAngle) * radius * 0.44;
  const density = 0.34 + (1 - radialSeed) * 0.55;
  return scene === "2px"
    ? { x: major, y: minor, density, phase: lobe }
    : { x: minor, y: major, density, phase: lobe };
}

function drawEnergyTransitions(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: OrbitalScene,
  time: number,
) {
  const left = width * 0.08;
  const right = width * 0.34;
  const levels = [0.72, 0.55, 0.39, 0.25];
  const activeIndex = scene === "1s" ? 0 : scene === "2s" ? 1 : 2;
  context.save();
  context.lineWidth = 1.2;
  levels.forEach((level, index) => {
    const y = height * level;
    context.strokeStyle = index === activeIndex ? "rgba(34,211,238,0.34)" : "rgba(255,255,255,0.08)";
    context.beginPath();
    context.moveTo(left, y);
    context.lineTo(right, y);
    context.stroke();
  });

  const progress = ((time * 0.08) % 1 + 1) % 1;
  const startY = height * levels[0];
  const endY = height * levels[Math.min(activeIndex + 1, levels.length - 1)];
  const y = startY + (endY - startY) * progress;
  const x = (left + right) / 2 + Math.sin(progress * Math.PI * 8) * 14;
  const glow = context.createRadialGradient(x, y, 0, x, y, 22);
  glow.addColorStop(0, "rgba(255,255,255,0.82)");
  glow.addColorStop(0.25, "rgba(34,211,238,0.40)");
  glow.addColorStop(1, "rgba(34,211,238,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, 22, 0, TAU);
  context.fill();
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.5, height * 0.36, Math.min(width, height) * 0.16, width * 0.5, height * 0.36, Math.max(width, height) * 0.82);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.68, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.68)");
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
