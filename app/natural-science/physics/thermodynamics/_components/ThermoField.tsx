"use client";

import { useEffect, useRef } from "react";

export type ThermoFieldMode =
  | "overview"
  | "equilibrium"
  | "transfer"
  | "first-law"
  | "phase"
  | "entropy"
  | "process";

type Props = {
  mode?: ThermoFieldMode;
  intensity?: number;
  energyLevel?: number;
};

type ParticleKind = "hot" | "cold";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  kind: ParticleKind;
  heat: number;
  flash: number;
};

type Flash = {
  x: number;
  y: number;
  r: number;
  life: number;
  hue: string;
};

const HOT = { rgb: "248, 113, 113", accent: "251, 146, 60" };
const COLD = { rgb: "56, 189, 248", accent: "34, 211, 238" };
const NEUTRAL = { rgb: "245, 158, 11" };

export default function ThermoField({
  mode = "overview",
  intensity = 1,
  energyLevel = 0.6,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fieldAlpha = clamp(0.8 + intensity * 0.25, 0.65, 1.25);
  const energy = clamp(energyLevel, 0.08, 1);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = drawingContext;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let animationId = 0;
    let frame = 0;
    let mouse = { x: width * 0.5, y: height * 0.5, active: false };

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const baseCount = width < 900 ? 96 : 180;
    const particles: Particle[] = [];
    const flashes: Flash[] = [];

    const boundaryState = {
      openness:
        mode === "equilibrium" || mode === "transfer" || mode === "entropy"
          ? 0.95
          : 0.18,
    };

    function speedForHeat(heatValue: number) {
      const h = clamp01(heatValue);
      return 0.25 + h * (2.0 + energy * 1.7);
    }

    function createParticle(kind: ParticleKind): Particle {
      const hot = kind === "hot";
      const x = hot
        ? Math.random() * width * 0.45 + width * 0.03
        : Math.random() * width * 0.45 + width * 0.52;
      const y = Math.random() * height * 0.88 + height * 0.06;
      const heatValue = hot
        ? clamp(0.72 + Math.random() * 0.22, 0, 1)
        : clamp(0.1 + Math.random() * 0.18, 0, 1);
      const speed = speedForHeat(heatValue);
      const angle = Math.random() * Math.PI * 2;

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 1.6 + Math.random() * 2.1,
        kind,
        heat: heatValue,
        flash: 0,
      };
    }

    for (let i = 0; i < baseCount / 2; i += 1) {
      particles.push(createParticle("hot"));
    }
    for (let i = 0; i < baseCount / 2; i += 1) {
      particles.push(createParticle("cold"));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function heatColor(heatValue: number) {
      if (heatValue >= 0.56) {
        return { rgb: HOT.rgb, trail: HOT.accent };
      }
      return { rgb: COLD.rgb, trail: COLD.accent };
    }

    function updateBoundary() {
      const target =
        mode === "equilibrium" || mode === "transfer" || mode === "entropy"
          ? 1
          : mode === "phase"
            ? 0.55
            : 0.2;
      boundaryState.openness += (target - boundaryState.openness) * 0.03;
    }

    function applyModePhysics(p: Particle) {
      if (mode === "transfer") {
        const centerY = height * 0.5;
        const buoyancy = (p.heat - 0.5) * 0.018;
        p.vy -= buoyancy * (p.y > centerY ? 0.8 : 1.2);
        p.vx += Math.sin(frame * 0.01 + p.y * 0.01) * 0.0035;
      }

      if (mode === "first-law") {
        const insideBox =
          p.x > width * 0.26 &&
          p.x < width * 0.74 &&
          p.y > height * 0.18 &&
          p.y < height * 0.76;

        if (insideBox) {
          p.heat = clamp01(p.heat + 0.0009 * (energy - 0.45));
        } else {
          p.heat = clamp01(p.heat - 0.00035);
        }
      }

      if (mode === "phase") {
        if (p.x < width * 0.33) {
          p.vx *= 0.92;
          p.vy *= 0.92;
          p.x += Math.sin(frame * 0.05 + p.y * 0.02) * 0.15;
          p.y += Math.cos(frame * 0.05 + p.x * 0.02) * 0.15;
        } else if (p.x < width * 0.66) {
          p.vx += Math.sin(frame * 0.01 + p.y * 0.02) * 0.0025;
          p.vy += Math.cos(frame * 0.01 + p.x * 0.02) * 0.0025;
        } else {
          p.vx *= 1.002;
          p.vy *= 1.002;
        }
      }

      if (mode === "entropy") {
        const dx = width * 0.5 - p.x;
        p.vx += Math.sign(dx) * -0.0008;
      }

      if (mode === "process") {
        const cycle = (Math.sin(frame * 0.012) + 1) * 0.5;
        const compression = 0.96 + cycle * 0.06;
        p.vx *= compression;
        p.vy *= compression;
        p.heat = clamp01(p.heat + (cycle - 0.5) * 0.0028);
      }
    }

    function handleBoundary(p: Particle) {
      const dividerX = width * 0.5;
      const gapHalfHeight = height * 0.18 * boundaryState.openness;
      const topGap = height * 0.5 - gapHalfHeight;
      const bottomGap = height * 0.5 + gapHalfHeight;
      const crossingBarrier =
        p.x > dividerX - 3 &&
        p.x < dividerX + 3 &&
        !(p.y > topGap && p.y < bottomGap);

      if (crossingBarrier) {
        p.vx *= -1;
        p.x += p.vx * 1.5;
      }
    }

    function handleWallBounce(p: Particle) {
      if (p.x < 0) {
        p.x = 0;
        p.vx *= -1;
      } else if (p.x > width) {
        p.x = width;
        p.vx *= -1;
      }

      if (p.y < 0) {
        p.y = 0;
        p.vy *= -1;
      } else if (p.y > height) {
        p.y = height;
        p.vy *= -1;
      }
    }

    function maybeTransferAtCollision(a: Particle, b: Particle) {
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      const distanceSq = dx * dx + dy * dy;
      const minDist = a.radius + b.radius + 1.5;

      if (distanceSq > minDist * minDist || distanceSq === 0) return;

      const distance = Math.sqrt(distanceSq);
      const nx = dx / distance;
      const ny = dy / distance;
      const overlap = (minDist - distance) * 0.5;
      a.x -= nx * overlap;
      a.y -= ny * overlap;
      b.x += nx * overlap;
      b.y += ny * overlap;

      const dvx = a.vx - b.vx;
      const dvy = a.vy - b.vy;
      const relVel = dvx * nx + dvy * ny;
      if (relVel > 0) return;

      const impulse = -relVel * 0.9;
      a.vx += -impulse * nx;
      a.vy += -impulse * ny;
      b.vx += impulse * nx;
      b.vy += impulse * ny;

      const heatGap = a.heat - b.heat;
      const exchange = heatGap * 0.08;
      a.heat = clamp01(a.heat - exchange);
      b.heat = clamp01(b.heat + exchange);
      a.kind = a.heat >= 0.5 ? "hot" : "cold";
      b.kind = b.heat >= 0.5 ? "hot" : "cold";
      a.flash = clamp01(a.flash + 0.75);
      b.flash = clamp01(b.flash + 0.75);

      flashes.push({
        x: (a.x + b.x) * 0.5,
        y: (a.y + b.y) * 0.5,
        r: 6 + Math.abs(heatGap) * 22,
        life: 1,
        hue: heatGap >= 0 ? HOT.accent : COLD.accent,
      });
    }

    function drawParticle(p: Particle) {
      const { rgb, trail } = heatColor(p.heat);
      const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const normSpeed = clamp01(speed / 4.5);
      const trailLength = 5 + normSpeed * 16;
      const tailX = p.x - p.vx * trailLength;
      const tailY = p.y - p.vy * trailLength;

      const gradient = ctx.createLinearGradient(p.x, p.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(${trail}, ${0.34 + normSpeed * 0.34})`);
      gradient.addColorStop(1, `rgba(${trail}, 0)`);

      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = Math.max(1, p.radius * 0.8);
      ctx.stroke();

      const glow = 8 + normSpeed * 18 + p.flash * 14;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius + normSpeed * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${rgb}, ${0.38 + normSpeed * 0.42})`;
      ctx.shadowColor = `rgba(${rgb}, ${0.28 + normSpeed * 0.3})`;
      ctx.shadowBlur = glow;
      ctx.fill();
      ctx.shadowBlur = 0;

      if (p.flash > 0.02) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius + 2.5 + p.flash * 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${p.flash * 0.45})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }

    function drawFlashes() {
      for (let i = flashes.length - 1; i >= 0; i -= 1) {
        const flash = flashes[i];
        flash.life -= 0.045;
        flash.r += 0.45;

        if (flash.life <= 0) {
          flashes.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(flash.x, flash.y, flash.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${flash.hue}, ${flash.life * 0.45})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    function drawBoundary() {
      const dividerX = width * 0.5;
      const gapHalfHeight = height * 0.18 * boundaryState.openness;
      const topGap = height * 0.5 - gapHalfHeight;
      const bottomGap = height * 0.5 + gapHalfHeight;

      ctx.strokeStyle = "rgba(255,255,255,0.11)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(dividerX, 0);
      ctx.lineTo(dividerX, topGap);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(dividerX, bottomGap);
      ctx.lineTo(dividerX, height);
      ctx.stroke();
    }

    function drawFieldOverlays() {
      ctx.fillStyle = `rgba(${COLD.rgb}, ${0.055 * fieldAlpha})`;
      ctx.fillRect(0, 0, width * 0.5, height);
      ctx.fillStyle = `rgba(${HOT.rgb}, ${0.06 * fieldAlpha})`;
      ctx.fillRect(width * 0.5, 0, width * 0.5, height);

      if (mode === "overview" || mode === "equilibrium" || mode === "transfer") {
        drawBoundary();
      }

      if (mode === "first-law") {
        ctx.strokeStyle = "rgba(45,212,191,0.22)";
        ctx.lineWidth = 1.5;
        roundRect(ctx, width * 0.26, height * 0.18, width * 0.48, height * 0.58, 28);
        ctx.stroke();
      }

      if (mode === "phase") {
        ctx.strokeStyle = "rgba(255,255,255,0.08)";
        ctx.beginPath();
        ctx.moveTo(width * 0.33, height * 0.12);
        ctx.lineTo(width * 0.33, height * 0.88);
        ctx.moveTo(width * 0.66, height * 0.12);
        ctx.lineTo(width * 0.66, height * 0.88);
        ctx.stroke();
      }

      if (mode === "process") {
        ctx.strokeStyle = "rgba(45,212,191,0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(width * 0.76, height * 0.3, width * 0.1, height * 0.08, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    function tick() {
      frame += 1;
      updateBoundary();
      ctx.clearRect(0, 0, width, height);
      drawFieldOverlays();

      for (const p of particles) {
        if (!reducedMotion) applyModePhysics(p);

        const targetSpeed = speedForHeat(p.heat);
        const currentSpeed = Math.sqrt(p.vx * p.vx + p.vy * p.vy) || 0.001;
        const rescale = 1 + (targetSpeed / currentSpeed - 1) * 0.015;
        p.vx *= rescale;
        p.vy *= rescale;

        if (mouse.active && !reducedMotion) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const distanceSq = dx * dx + dy * dy;
          if (distanceSq < 18000 && distanceSq > 4) {
            const distance = Math.sqrt(distanceSq);
            const push = (1 - distance / 134) * 0.04;
            p.vx += (dx / distance) * push;
            p.vy += (dy / distance) * push;
          }
        }

        const drag = mode === "phase" && p.x < width * 0.33 ? 0.9 : 0.995;
        p.vx *= drag;
        p.vy *= drag;
        p.x += p.vx;
        p.y += p.vy;
        handleBoundary(p);
        handleWallBounce(p);
        p.flash *= 0.92;
      }

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          maybeTransferAtCollision(particles[i], particles[j]);
        }
      }

      ctx.globalCompositeOperation = "screen";
      for (const p of particles) drawParticle(p);
      drawFlashes();
      ctx.globalCompositeOperation = "source-over";
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
  }, [mode, energy, fieldAlpha]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 18% 28%, rgba(${COLD.rgb}, ${0.10 * fieldAlpha}), transparent 32%), radial-gradient(circle at 82% 24%, rgba(${HOT.rgb}, ${0.14 * fieldAlpha}), transparent 34%), radial-gradient(circle at 52% 84%, rgba(${NEUTRAL.rgb}, ${0.07 * fieldAlpha}), transparent 28%), linear-gradient(180deg, #08090f 0%, #06070d 42%, #030406 100%)`,
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 opacity-100" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_52%,rgba(0,0,0,0.24)_100%)]" />
    </div>
  );
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function clamp01(value: number) {
  return clamp(value, 0, 1);
}
