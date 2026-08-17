"use client";

import { useEffect, useRef, useState } from "react";
import { Orbit, ScanSearch } from "lucide-react";
import { Surface, useWorldDirector } from "@/app/_page-system/scene";

type OrbitalType = "1s" | "2s" | "2px" | "2py";
type Particle = { x: number; y: number; alpha: number; life: number; phase: number };

const ORBITAL_COPY: Record<OrbitalType, { label: string; nodes: string; meaning: string }> = {
  "1s": {
    label: "1s orbital",
    nodes: "No radial or angular nodes",
    meaning: "The lowest-energy hydrogen-like orbital concentrates probability around the nucleus without a preferred direction.",
  },
  "2s": {
    label: "2s orbital",
    nodes: "One radial node",
    meaning: "An inner and outer probability region are separated by a radius where the wavefunction passes through zero.",
  },
  "2px": {
    label: "2pₓ orbital",
    nodes: "One angular node",
    meaning: "Two lobes carry opposite wavefunction phase and are separated by a nodal plane through the nucleus.",
  },
  "2py": {
    label: "2pᵧ orbital",
    nodes: "One angular node",
    meaning: "The same p-orbital shape is oriented along a different spatial axis, showing that orientation is part of the quantum state.",
  },
};

export default function OrbitalVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const director = useWorldDirector();
  const [localOrbital, setLocalOrbital] = useState<OrbitalType>("1s");
  const orbital = isOrbital(director.scene) ? director.scene : localOrbital;
  const copy = ORBITAL_COPY[orbital];

  function chooseOrbital(next: OrbitalType) {
    setLocalOrbital(next);
    director.pinScene(next);
  }

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const particles: Particle[] = [];
    const maximum = 2300;

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(320, bounds.width);
      height = Math.max(380, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.65);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles.length = 0;
      draw(performance.now(), 0);
    }

    function emit(count: number) {
      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.34;
      for (let index = 0; index < count && particles.length < maximum; index += 1) {
        const sample = sampleOrbital(orbital);
        particles.push({
          x: centerX + sample.x * scale,
          y: centerY + sample.y * scale,
          alpha: 0.28 + Math.random() * 0.66,
          life: 70 + Math.random() * 100,
          phase: sample.phase,
        });
      }
    }

    function draw(now: number, delta: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.fillStyle = reducedMotion ? "rgba(2,6,12,1)" : "rgba(2,6,12,0.18)";
      context.fillRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const scale = Math.min(width, height) * 0.34;
      drawAxes(context, centerX, centerY, scale, orbital);
      emit(reducedMotion ? 900 : Math.max(14, Math.round(18 + delta * 500)));

      context.save();
      context.globalCompositeOperation = "lighter";
      for (let index = particles.length - 1; index >= 0; index -= 1) {
        const particle = particles[index];
        const lifeRatio = Math.min(1, particle.life / 80);
        const rgb = particle.phase > 0 ? "34,211,238" : "192,132,252";
        context.fillStyle = `rgba(${rgb},${particle.alpha * lifeRatio})`;
        context.beginPath();
        context.arc(particle.x, particle.y, 1.15 + lifeRatio * 0.85, 0, Math.PI * 2);
        context.fill();
        if (!reducedMotion) particle.life -= 1;
        if (particle.life <= 0) particles.splice(index, 1);
      }
      context.restore();

      const core = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
      core.addColorStop(0, "rgba(255,255,255,0.96)");
      core.addColorStop(0.18, "rgba(250,204,21,0.62)");
      core.addColorStop(1, "rgba(250,204,21,0)");
      context.fillStyle = core;
      context.beginPath();
      context.arc(centerX, centerY, 30, 0, Math.PI * 2);
      context.fill();
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      draw(now, delta);
      frame = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [orbital]);

  return (
    <Surface variant="ghost" className="overflow-hidden rounded-[28px]">
      <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/72">
            <Orbit size={14} /> Probability density
          </div>
          <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">
            {copy.label}
          </h3>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/[0.20] px-3 py-1.5 text-[12px] text-slate-300/68">
          <ScanSearch size={14} /> sampled, not an electron path
        </span>
      </div>

      <canvas ref={canvasRef} className="h-[520px] w-full border-b border-white/[0.08]" />

      <div className="p-5 sm:p-6">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {(["1s", "2s", "2px", "2py"] as OrbitalType[]).map((option) => {
            const selected = orbital === option;
            return (
              <button
                key={option}
                type="button"
                onClick={() => chooseOrbital(option)}
                onMouseEnter={() => director.previewSceneById(option)}
                onMouseLeave={() => director.previewSceneById(null)}
                onFocus={() => director.previewSceneById(option)}
                onBlur={() => director.previewSceneById(null)}
                className={`min-h-[48px] rounded-[13px] border px-3 py-2 text-[13px] font-semibold transition ${
                  selected
                    ? "border-cyan-200/[0.34] bg-cyan-300/[0.09] text-cyan-100"
                    : "border-white/[0.08] bg-white/[0.018] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-[220px_minmax(0,1fr)]">
          <div className="rounded-[15px] border border-white/[0.08] bg-black/[0.18] p-4">
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-cyan-200/62">
              Nodes
            </div>
            <div className="mt-2 text-[14px] font-medium text-white">{copy.nodes}</div>
          </div>
          <p className="rounded-[15px] border border-white/[0.08] bg-black/[0.18] p-4 text-[14px] leading-6 text-slate-300/70">
            {copy.meaning}
          </p>
        </div>
      </div>
    </Surface>
  );
}

function isOrbital(value: string | null): value is OrbitalType {
  return value === "1s" || value === "2s" || value === "2px" || value === "2py";
}

function sampleOrbital(orbital: OrbitalType) {
  const angle = Math.random() * Math.PI * 2;
  if (orbital === "1s") {
    const radius = Math.pow(Math.random(), 1.9) * 0.94;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, phase: 1 };
  }
  if (orbital === "2s") {
    const inner = Math.random() < 0.38;
    const radius = inner
      ? Math.sqrt(Math.random()) * 0.28
      : 0.48 + Math.sqrt(Math.random()) * 0.48;
    return { x: Math.cos(angle) * radius, y: Math.sin(angle) * radius, phase: inner ? 1 : -1 };
  }
  const lobe = Math.random() < 0.5 ? -1 : 1;
  const major = lobe * (0.18 + Math.pow(Math.random(), 0.75) * 0.78);
  const minor = (Math.random() - 0.5) * (0.18 + Math.abs(major) * 0.42);
  return orbital === "2px"
    ? { x: major, y: minor, phase: lobe }
    : { x: minor, y: major, phase: lobe };
}

function drawAxes(
  context: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  scale: number,
  orbital: OrbitalType,
) {
  context.save();
  context.strokeStyle = "rgba(125,211,252,0.12)";
  context.lineWidth = 1;
  context.setLineDash([4, 9]);
  context.beginPath();
  context.moveTo(centerX - scale, centerY);
  context.lineTo(centerX + scale, centerY);
  context.moveTo(centerX, centerY - scale);
  context.lineTo(centerX, centerY + scale);
  context.stroke();
  context.setLineDash([]);

  if (orbital === "2s") {
    context.strokeStyle = "rgba(255,255,255,0.14)";
    context.beginPath();
    context.arc(centerX, centerY, scale * 0.36, 0, Math.PI * 2);
    context.stroke();
  }
  if (orbital === "2px" || orbital === "2py") {
    context.fillStyle = "rgba(255,255,255,0.035)";
    if (orbital === "2px") context.fillRect(centerX - 1.5, centerY - scale, 3, scale * 2);
    else context.fillRect(centerX - scale, centerY - 1.5, scale * 2, 3);
  }
  context.restore();
}
