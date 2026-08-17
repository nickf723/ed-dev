"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type PsychologyScene = "perception" | "attention" | "memory";
type WorldDetail = {
  scene?: PsychologyScene;
  signal?: number;
  noise?: number;
  expectation?: number;
  distractors?: number;
  similarity?: number;
  cue?: number;
  span?: number;
  rehearsal?: number;
  interference?: number;
  evidence?: number;
  selection?: number;
  retention?: number;
};

const DEFAULT_DETAIL: WorldDetail = {
  signal: 72,
  noise: 34,
  expectation: 42,
  distractors: 15,
  similarity: 45,
  cue: 55,
  span: 4,
  rehearsal: 2,
  interference: 38,
  evidence: 70,
  selection: 55,
  retention: 58,
};

export default function CognitiveFieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const detailRef = useRef<WorldDetail>(DEFAULT_DETAIL);
  const director = useWorldDirector();
  const scene = resolveScene(director.scene);

  useEffect(() => {
    const handler = (event: Event) => {
      detailRef.current = {
        ...detailRef.current,
        ...(event as CustomEvent<WorldDetail>).detail,
      };
    };
    window.addEventListener("psychology-world:update", handler);
    return () => window.removeEventListener("psychology-world:update", handler);
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;
    const canvas = canvasElement;
    const context = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.65, y: 0.34, active: false };
    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.15 : 1.5);
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      if (reducedMotion) draw(19);
    }

    function onPointer(event: PointerEvent) {
      pointer.x = event.clientX / Math.max(1, width);
      pointer.y = event.clientY / Math.max(1, height);
      pointer.active = true;
    }

    function loop(now: number) {
      draw(now / 1000);
      frame = window.requestAnimationFrame(loop);
    }

    function draw(time: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawBase(context, width, height, scene, time);
      if (scene === "perception") drawPerception(context, width, height, time, detailRef.current);
      if (scene === "attention") drawAttention(context, width, height, time, detailRef.current, pointer);
      if (scene === "memory") drawMemory(context, width, height, time, detailRef.current);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    if (!reducedMotion) frame = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, [scene]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,4,16,0.16),transparent_36%,transparent_72%,rgba(4,3,12,0.30))]" />
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#08040f]/76 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number, scene: PsychologyScene, time: number) {
  const palette = scene === "attention"
    ? ["#120617", "#07111a", "#03050b"]
    : scene === "memory"
      ? ["#090817", "#07101b", "#03040b"]
      : ["#100714", "#09101a", "#03050a"];
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(0.56, palette[1]);
  gradient.addColorStop(1, palette[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(width * 0.18, height * 0.20, 0, width * 0.18, height * 0.20, Math.max(width, height) * 0.54);
  glow.addColorStop(0, `rgba(244,114,182,${0.10 + Math.sin(time * 0.15) * 0.01})`);
  glow.addColorStop(1, "rgba(244,114,182,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawPerception(context: CanvasRenderingContext2D, width: number, height: number, time: number, detail: WorldDetail) {
  const signal = (detail.signal ?? 72) / 100;
  const noise = (detail.noise ?? 34) / 100;
  const expectation = (detail.expectation ?? 42) / 100;
  const sourceY = height * 0.36;
  const gateX = width * 0.54;

  context.save();
  context.globalCompositeOperation = "lighter";
  for (let index = 0; index < 12; index += 1) {
    const progress = (time * (0.06 + signal * 0.05) + index / 12) % 1;
    const x = -40 + progress * (gateX + 80);
    const y = sourceY + Math.sin(progress * 10 + index) * (28 + noise * 48);
    context.strokeStyle = `rgba(34,211,238,${0.08 + signal * 0.22})`;
    context.lineWidth = 1 + signal * 1.5;
    context.beginPath();
    context.arc(x, y, 12 + index * 1.2, -0.5, 0.5);
    context.stroke();
  }

  for (let index = 0; index < Math.floor(20 + noise * 70); index += 1) {
    const x = ((index * 83.17 + time * 13) % (gateX + 40));
    const y = ((index * 47.31 + Math.sin(time + index) * 17) % (height * 0.70));
    context.fillStyle = `rgba(244,114,182,${0.05 + noise * 0.16})`;
    context.fillRect(x, y, 1.5, 1.5);
  }

  context.strokeStyle = "rgba(167,139,250,0.28)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(gateX, height * 0.12);
  context.lineTo(gateX, height * 0.68);
  context.stroke();

  const centerX = width * 0.77;
  const centerY = height * 0.35;
  for (let ring = 0; ring < 5; ring += 1) {
    const radius = 38 + ring * 28 + expectation * ring * 10;
    context.strokeStyle = `rgba(${ring % 2 ? "244,114,182" : "167,139,250"},${0.10 + expectation * 0.12})`;
    context.beginPath();
    context.ellipse(centerX, centerY, radius * 1.25, radius * 0.72, ring * 0.13, 0, Math.PI * 2);
    context.stroke();
  }
  context.restore();
}

function drawAttention(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  detail: WorldDetail,
  pointer: { x: number; y: number; active: boolean },
) {
  const count = Math.min(70, 22 + (detail.distractors ?? 15));
  const similarity = (detail.similarity ?? 45) / 100;
  const cue = (detail.cue ?? 55) / 100;
  const spotlightX = (pointer.active ? pointer.x : 0.68 + Math.sin(time * 0.18) * 0.08) * width;
  const spotlightY = (pointer.active ? pointer.y : 0.34 + Math.cos(time * 0.15) * 0.07) * height;
  const radius = 110 + cue * 95;

  context.save();
  for (let index = 0; index < count; index += 1) {
    const x = ((index * 127.1) % 1000) / 1000 * width;
    const y = (0.08 + (((index * 73.7) % 830) / 1000)) * height;
    const distance = Math.hypot(x - spotlightX, y - spotlightY);
    const inside = distance < radius;
    const targetLike = (index * 17) % 100 < similarity * 100;
    context.save();
    context.translate(x, y);
    context.rotate((index % 5) * 0.4 + time * 0.03);
    context.globalAlpha = inside ? 0.42 : 0.08;
    context.strokeStyle = targetLike ? "rgba(244,114,182,0.82)" : index % 2 ? "rgba(34,211,238,0.70)" : "rgba(167,139,250,0.68)";
    context.lineWidth = inside ? 1.8 : 1;
    if (targetLike && index % 3 === 0) {
      context.beginPath();
      context.moveTo(0, -7);
      context.lineTo(7, 7);
      context.lineTo(-7, 7);
      context.closePath();
      context.stroke();
    } else {
      context.beginPath();
      context.arc(0, 0, 5 + (index % 3), 0, Math.PI * 2);
      context.stroke();
    }
    context.restore();
  }

  const spotlight = context.createRadialGradient(spotlightX, spotlightY, 0, spotlightX, spotlightY, radius);
  spotlight.addColorStop(0, "rgba(250,204,21,0.10)");
  spotlight.addColorStop(0.65, "rgba(250,204,21,0.035)");
  spotlight.addColorStop(1, "rgba(250,204,21,0)");
  context.fillStyle = spotlight;
  context.beginPath();
  context.arc(spotlightX, spotlightY, radius, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "rgba(250,204,21,0.20)";
  context.stroke();
  context.restore();
}

function drawMemory(context: CanvasRenderingContext2D, width: number, height: number, time: number, detail: WorldDetail) {
  const span = Math.max(2, Math.min(8, detail.span ?? 4));
  const rehearsal = Math.max(0, Math.min(5, detail.rehearsal ?? 2));
  const interference = (detail.interference ?? 38) / 100;
  const retention = (detail.retention ?? 58) / 100;
  const trackY = height * 0.32;
  const workspaceX = width * 0.58;

  context.save();
  context.globalCompositeOperation = "lighter";
  for (let index = 0; index < span + 5; index += 1) {
    const progress = (time * (0.05 + rehearsal * 0.008) + index / (span + 5)) % 1;
    const x = width * 0.05 + progress * width * 0.53;
    const y = trackY + Math.sin(progress * 8 + index) * (12 + interference * 28);
    context.fillStyle = index < span ? "rgba(34,211,238,0.34)" : "rgba(244,114,182,0.18)";
    context.beginPath();
    context.roundRect(x, y, 18, 18, 5);
    context.fill();
  }

  context.strokeStyle = "rgba(167,139,250,0.22)";
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(width * 0.05, trackY + 9);
  context.bezierCurveTo(width * 0.30, trackY - 80, width * 0.44, trackY + 90, workspaceX, trackY + 8);
  context.stroke();

  for (let slot = 0; slot < 4; slot += 1) {
    const angle = (slot / 4) * Math.PI * 2 + time * (0.05 + rehearsal * 0.01);
    const x = workspaceX + Math.cos(angle) * 92;
    const y = trackY + Math.sin(angle) * 56;
    context.strokeStyle = `rgba(167,139,250,${0.20 + rehearsal * 0.035})`;
    context.fillStyle = `rgba(167,139,250,${0.035 + retention * 0.08})`;
    context.beginPath();
    context.roundRect(x - 18, y - 18, 36, 36, 9);
    context.fill();
    context.stroke();
  }

  const archiveX = width * 0.82;
  const archiveY = height * 0.40;
  for (let ring = 0; ring < 6; ring += 1) {
    const radius = 28 + ring * 24 + Math.sin(time * 0.2 + ring) * 4;
    context.strokeStyle = `rgba(52,211,153,${0.04 + retention * 0.10})`;
    context.beginPath();
    context.ellipse(archiveX, archiveY, radius * 1.35, radius * 0.62, ring * 0.15, 0, Math.PI * 2);
    context.stroke();
  }
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.5, height * 0.34, Math.min(width, height) * 0.12, width * 0.5, height * 0.34, Math.max(width, height) * 0.78);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.68, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.70)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function resolveScene(scene: string | null): PsychologyScene {
  return scene === "attention" || scene === "memory" ? scene : "perception";
}
