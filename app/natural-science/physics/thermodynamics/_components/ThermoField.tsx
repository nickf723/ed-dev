"use client";

import { useEffect, useRef } from "react";

export type ThermoFieldMode = "overview" | "equilibrium" | "transfer" | "first-law" | "phase" | "entropy" | "process";

type Props = {
  mode?: ThermoFieldMode;
  intensity?: number;
  energyLevel?: number;
};

type Theme = {
  hot: string;
  cool: string;
  accent: string;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  seed: number;
};

const MODES: Record<ThermoFieldMode, Theme> = {
  overview: { hot: "248, 113, 113", cool: "56, 189, 248", accent: "251, 146, 60" },
  equilibrium: { hot: "251, 146, 60", cool: "56, 189, 248", accent: "250, 204, 21" },
  transfer: { hot: "248, 113, 113", cool: "34, 211, 238", accent: "251, 146, 60" },
  "first-law": { hot: "251, 146, 60", cool: "167, 139, 250", accent: "45, 212, 191" },
  phase: { hot: "244, 114, 182", cool: "34, 211, 238", accent: "167, 139, 250" },
  entropy: { hot: "248, 113, 113", cool: "232, 121, 249", accent: "250, 204, 21" },
  process: { hot: "251, 146, 60", cool: "96, 165, 250", accent: "45, 212, 191" },
};

export default function ThermoField({ mode = "overview", intensity = 1, energyLevel = 0.58 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = MODES[mode];
  const alpha = Math.max(0.55, Math.min(1.55, intensity));
  const energy = Math.max(0.08, Math.min(1, energyLevel));

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    // Pin the checked browser objects to explicitly non-null locals before
    // nested animation callbacks capture them. Strict TypeScript otherwise
    // drops the narrowing inside those closures.
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let animationId = 0;
    let mouse = { x: width * 0.5, y: height * 0.5, active: false };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const particles: Particle[] = Array.from({ length: width < 900 ? 82 : 154 }, (_, index) => ({
      x: (Math.random() * 0.96 + 0.02) * width,
      y: (Math.random() * 0.96 + 0.02) * height,
      vx: (Math.random() - 0.5) * (0.55 + energy * 1.1),
      vy: (Math.random() - 0.5) * (0.55 + energy * 1.1),
      radius: 1.4 + (index % 5) * 0.42 + Math.random() * 0.7,
      seed: Math.random() * Math.PI * 2,
    }));

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function thermalLevel(particle: Particle) {
      const xRatio = particle.x / Math.max(width, 1);
      const yRatio = particle.y / Math.max(height, 1);

      if (mode === "overview" || mode === "equilibrium" || mode === "transfer") {
        return clamp01(0.14 + xRatio * 0.72 + (energy - 0.5) * 0.34);
      }
      if (mode === "phase") {
        return clamp01(0.28 + energy * 0.46 + Math.sin(particle.seed + frame * 0.003) * 0.08);
      }
      if (mode === "entropy") {
        return clamp01(0.42 + energy * 0.36 + Math.sin((xRatio + yRatio) * 7 + frame * 0.004) * 0.12);
      }
      if (mode === "first-law") {
        return clamp01(0.34 + energy * 0.44 + (0.5 - yRatio) * 0.12);
      }
      return clamp01(0.32 + energy * 0.48 + Math.sin(particle.seed + frame * 0.0025) * 0.08);
    }

    function drawParticle(particle: Particle, localThermal: number) {
      const hot = localThermal > 0.56;
      const color = hot ? theme.hot : theme.cool;
      const opacity = 0.23 + localThermal * 0.42;
      const glow = 5 + localThermal * 16;

      context.beginPath();
      context.arc(particle.x, particle.y, particle.radius * (0.92 + localThermal * 0.45), 0, Math.PI * 2);
      context.fillStyle = `rgba(${color},${opacity})`;
      context.shadowColor = `rgba(${color},${0.22 + localThermal * 0.25})`;
      context.shadowBlur = glow;
      context.fill();
      context.shadowBlur = 0;
    }

    function tick() {
      frame += 1;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = "screen";

      for (const particle of particles) {
        const localThermal = thermalLevel(particle);
        const speed = reducedMotion ? 0.12 : 0.3 + localThermal * (1.25 + energy * 1.25);

        if (mode === "transfer") {
          particle.vy += Math.sin(frame * 0.008 + particle.seed) * 0.0016;
          particle.vx += 0.0009 * (0.55 - particle.x / Math.max(width, 1));
        } else if (mode === "entropy") {
          particle.vx += Math.sin(frame * 0.006 + particle.seed) * 0.0018;
          particle.vy += Math.cos(frame * 0.005 + particle.seed) * 0.0018;
        } else if (mode === "process") {
          particle.vy += Math.sin(frame * 0.005 + particle.x * 0.004) * 0.0012;
        }

        if (mouse.active && !reducedMotion) {
          const dx = particle.x - mouse.x;
          const dy = particle.y - mouse.y;
          const distanceSquared = dx * dx + dy * dy;
          if (distanceSquared < 28000 && distanceSquared > 4) {
            const distance = Math.sqrt(distanceSquared);
            const push = (1 - distance / 168) * 0.034;
            particle.vx += (dx / distance) * push;
            particle.vy += (dy / distance) * push;
          }
        }

        const maxVelocity = 2.1 + energy * 2.2;
        particle.vx = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vx));
        particle.vy = Math.max(-maxVelocity, Math.min(maxVelocity, particle.vy));

        particle.x += particle.vx * speed;
        particle.y += particle.vy * speed;

        if (particle.x < -12) particle.x = width + 12;
        if (particle.x > width + 12) particle.x = -12;
        if (particle.y < -12) particle.y = height + 12;
        if (particle.y > height + 12) particle.y = -12;

        drawParticle(particle, localThermal);
      }

      context.globalCompositeOperation = "source-over";
      animationId = requestAnimationFrame(tick);
    }

    function onPointerMove(event: PointerEvent) {
      mouse = { x: event.clientX, y: event.clientY, active: true };
    }

    function onPointerLeave() {
      mouse.active = false;
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove);
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    animationId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [mode, energy, theme.cool, theme.hot]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0 transition-[background] duration-700"
        style={{
          background: `radial-gradient(circle at 15% 22%, rgba(${theme.cool},${0.27 * alpha}), transparent 34%), radial-gradient(circle at 84% 24%, rgba(${theme.hot},${0.34 * alpha}), transparent 36%), radial-gradient(circle at 52% 88%, rgba(${theme.accent},${0.16 * alpha}), transparent 34%), linear-gradient(180deg, #09080e 0%, #08070c 42%, #030507 100%)`,
        }}
      />

      <div className="absolute -left-[16%] top-[4%] h-[66vw] w-[66vw] max-h-[860px] max-w-[860px] animate-[spin_30s_linear_infinite] rounded-[44%] blur-[90px]" style={{ background: `conic-gradient(from 20deg, transparent 0 8%, rgba(${theme.cool},${0.14 * alpha}) 20%, transparent 43%, rgba(${theme.hot},${0.08 * alpha}) 62%, transparent 82%)` }} />
      <div className="absolute -right-[18%] top-[2%] h-[72vw] w-[72vw] max-h-[940px] max-w-[940px] animate-[spin_38s_linear_infinite_reverse] rounded-[42%] blur-[105px]" style={{ background: `conic-gradient(from 210deg, transparent 0 10%, rgba(${theme.hot},${0.17 * alpha}) 26%, transparent 50%, rgba(${theme.accent},${0.09 * alpha}) 68%, transparent 88%)` }} />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-95 mix-blend-screen" />

      {(mode === "equilibrium" || mode === "overview") ? (
        <>
          <div className="absolute inset-y-[12%] left-1/2 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent" />
          <div className="absolute left-[10%] right-[10%] top-[48%] h-px bg-gradient-to-r from-cyan-300/10 via-orange-200/35 to-red-300/12" />
        </>
      ) : null}

      {mode === "transfer" ? (
        <>
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="absolute left-[14%] h-px w-[68%] -rotate-6 animate-pulse" style={{ top: `${22 + index * 12}%`, background: `linear-gradient(90deg, rgba(${theme.hot},0.02), rgba(${theme.hot},0.62), rgba(${theme.accent},0.32), rgba(${theme.cool},0.10), transparent)`, animationDuration: `${2.4 + index * 0.45}s` }} />
          ))}
        </>
      ) : null}

      {mode === "first-law" ? (
        <div className="absolute left-[25%] top-[16%] h-[58%] w-[50%] rounded-[38px] border border-emerald-200/[0.13] bg-emerald-400/[0.018] shadow-[inset_0_0_90px_rgba(45,212,191,0.025),0_0_80px_rgba(251,146,60,0.04)]" />
      ) : null}

      {mode === "phase" ? (
        <>
          <div className="absolute left-[8%] top-[18%] h-[58%] w-[34%] opacity-55" style={{ backgroundImage: `radial-gradient(circle, rgba(${theme.cool},0.38) 0 2px, transparent 2.6px)`, backgroundSize: "24px 24px" }} />
          <div className="absolute right-[7%] top-[13%] h-[64%] w-[38%] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, rgba(${theme.hot},0.14), transparent 68%)` }} />
        </>
      ) : null}

      {mode === "entropy" ? (
        <>
          <div className="absolute inset-0 opacity-58" style={{ backgroundImage: `radial-gradient(circle, rgba(${theme.accent},0.26) 0 1px, transparent 1.5px)`, backgroundSize: "27px 27px", maskImage: "linear-gradient(90deg, rgba(0,0,0,0.12), black 72%)" }} />
          <div className="absolute right-[8%] top-[18%] h-[56vw] max-h-[700px] w-[56vw] max-w-[700px] animate-[spin_42s_linear_infinite] rounded-full border border-fuchsia-200/[0.08]" />
        </>
      ) : null}

      {mode === "process" ? (
        <div className="absolute right-[5%] top-[12%] h-[54vw] max-h-[680px] w-[54vw] max-w-[680px] animate-[spin_36s_linear_infinite] rounded-[50%] border border-emerald-200/[0.12]" style={{ boxShadow: "inset 0 0 0 58px rgba(45,212,191,0.018), inset 0 0 0 118px rgba(96,165,250,0.014), 0 0 90px rgba(167,139,250,0.05)" }} />
      ) : null}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_54%,rgba(0,0,0,0.30)_100%)]" />
    </div>
  );
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}
