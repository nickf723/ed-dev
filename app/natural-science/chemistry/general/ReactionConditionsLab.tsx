"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  Activity,
  ArrowLeftRight,
  Flame,
  Gauge,
  Sparkles,
  Thermometer,
} from "lucide-react";
import { Surface, useWorldDirector } from "@/app/_page-system/scene";

type LabParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: 0 | 1 | 2;
  radius: number;
  phase: number;
};

const TAU = Math.PI * 2;
const COLORS = ["52,211,153", "34,211,238", "250,204,21"] as const;

export default function ReactionConditionsLab() {
  const [temperature, setTemperature] = useState(45);
  const [concentration, setConcentration] = useState(4);
  const [catalyst, setCatalyst] = useState(false);
  const [reversible, setReversible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const director = useWorldDirector();
  const activeScene =
    director.scene === "inventory" ||
    director.scene === "energy" ||
    director.scene === "rate" ||
    director.scene === "equilibrium"
      ? director.scene
      : "rate";

  const metrics = useMemo(() => {
    const kelvin = temperature + 273.15;
    const barrier = catalyst ? 48 : 82;
    const rawRate = Math.exp(-(barrier * 1000) / (8.314 * kelvin));
    const collisionIndex = concentration * Math.sqrt(kelvin / 298) * 18;
    const rateIndex = Math.min(99, rawRate * 2.4e12 * concentration);
    const equilibriumBias = reversible
      ? 1 / (1 + Math.exp(-((temperature - 46) / 13 + (concentration - 4) * 0.26)))
      : Math.min(0.98, 0.54 + temperature / 220 + concentration / 24);
    return {
      kelvin,
      barrier,
      collisionIndex,
      rateIndex,
      productShare: equilibriumBias,
    };
  }, [catalyst, concentration, reversible, temperature]);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const random = mulberry32(91027);
    const particles: LabParticle[] = Array.from(
      { length: 26 + concentration * 7 },
      (_, index) => {
        const kind: 0 | 1 | 2 = index % 7 === 0 ? 2 : index % 2 === 0 ? 0 : 1;
        const angle = random() * TAU;
        return {
          x: 0.06 + random() * 0.88,
          y: 0.08 + random() * 0.84,
          vx: Math.cos(angle),
          vy: Math.sin(angle),
          kind,
          radius: kind === 2 ? 7 : 5,
          phase: random() * TAU,
        };
      },
    );

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(320, bounds.width);
      height = Math.max(360, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now() / 1000, 0);
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      draw(now / 1000, delta);
      frame = requestAnimationFrame(loop);
    }

    function draw(time: number, delta: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawChamber(context, width, height, activeScene, catalyst);

      if (!reducedMotion && delta > 0) {
        const speed = 0.035 + temperature / 1500;
        for (const particle of particles) {
          const thermal = 0.78 + Math.sin(time * 2.6 + particle.phase) * 0.22;
          particle.x += particle.vx * speed * thermal * delta;
          particle.y += particle.vy * speed * thermal * delta;
          particle.vx += Math.sin(time * 1.8 + particle.phase) * delta * 0.08;
          particle.vy += Math.cos(time * 1.55 + particle.phase) * delta * 0.08;
          const velocity = Math.hypot(particle.vx, particle.vy) || 1;
          particle.vx /= velocity;
          particle.vy /= velocity;
          if (particle.x < 0.035 || particle.x > 0.965) {
            particle.vx *= -1;
            particle.x = Math.min(0.965, Math.max(0.035, particle.x));
          }
          if (particle.y < 0.055 || particle.y > 0.945) {
            particle.vy *= -1;
            particle.y = Math.min(0.945, Math.max(0.055, particle.y));
          }
        }
      }

      drawConnections(context, particles, width, height, time, activeScene, metrics.rateIndex);
      drawParticles(context, particles, width, height, time, metrics.productShare);
      if (activeScene === "energy") {
        drawEnergyInset(context, width, height, metrics.barrier, catalyst, time);
      }
      if (activeScene === "equilibrium") {
        drawEquilibriumGate(context, width, height, metrics.productShare, time);
      }
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [activeScene, catalyst, concentration, metrics.barrier, metrics.productShare, metrics.rateIndex, temperature]);

  return (
    <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_390px]">
      <Surface variant="ghost" className="overflow-hidden rounded-[26px]">
        <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-200/72">
              Reaction chamber
            </div>
            <h3 className="mt-1 text-[22px] font-semibold tracking-[-0.035em] text-white">
              Change conditions and watch the system reorganize.
            </h3>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-black/[0.22] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-300/68">
            {activeScene} view
          </span>
        </div>
        <canvas ref={canvasRef} className="h-[500px] w-full" />
      </Surface>

      <Surface variant="glass" className="rounded-[26px] p-5 sm:p-6">
        <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-200/72">
          <Gauge size={14} /> Condition controls
        </div>
        <p className="mt-3 text-[14px] leading-6 text-slate-300/68">
          Temperature changes the energy distribution. Concentration changes encounter frequency. A catalyst lowers the activation barrier without changing the equilibrium position.
        </p>

        <div className="mt-6 space-y-5">
          <RangeControl
            icon={Thermometer}
            label="Temperature"
            value={temperature}
            minimum={5}
            maximum={110}
            suffix="°C"
            onChange={setTemperature}
          />
          <RangeControl
            icon={Activity}
            label="Relative concentration"
            value={concentration}
            minimum={1}
            maximum={8}
            suffix="×"
            onChange={setConcentration}
          />

          <ToggleControl
            icon={Sparkles}
            label="Catalyst present"
            description="Provides a lower-energy reaction pathway."
            checked={catalyst}
            onChange={setCatalyst}
          />
          <ToggleControl
            icon={ArrowLeftRight}
            label="Reversible system"
            description="Allows forward and reverse processes to continue together."
            checked={reversible}
            onChange={setReversible}
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <Metric
            icon={Activity}
            label="Collision index"
            value={String(Math.round(metrics.collisionIndex))}
            active={activeScene === "rate"}
            rgb="192, 132, 252"
          />
          <Metric
            icon={Flame}
            label="Barrier"
            value={`${metrics.barrier} kJ`}
            active={activeScene === "energy"}
            rgb="250, 204, 21"
          />
          <Metric
            icon={Gauge}
            label="Rate index"
            value={String(Math.max(1, Math.round(metrics.rateIndex)))}
            active={activeScene === "rate"}
            rgb="52, 211, 153"
          />
          <Metric
            icon={ArrowLeftRight}
            label="Product share"
            value={`${Math.round(metrics.productShare * 100)}%`}
            active={activeScene === "equilibrium"}
            rgb="34, 211, 238"
          />
        </div>
      </Surface>
    </div>
  );
}

function RangeControl({
  icon: Icon,
  label,
  value,
  minimum,
  maximum,
  suffix,
  onChange,
}: {
  icon: typeof Thermometer;
  label: string;
  value: number;
  minimum: number;
  maximum: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block rounded-[16px] border border-white/[0.08] bg-black/[0.18] p-4">
      <span className="flex items-center justify-between gap-4">
        <span className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
          <Icon size={15} className="text-emerald-200/66" /> {label}
        </span>
        <strong className="font-mono text-[13px] text-white">
          {value}{suffix}
        </strong>
      </span>
      <input
        type="range"
        min={minimum}
        max={maximum}
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(Number(event.target.value))}
        className="mt-4 w-full accent-emerald-400"
      />
    </label>
  );
}

function ToggleControl({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon: typeof Sparkles;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-[16px] border border-white/[0.08] bg-black/[0.18] p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked)}
        className="mt-1 h-4 w-4 accent-emerald-400"
      />
      <Icon size={16} className="mt-0.5 shrink-0 text-emerald-200/66" />
      <span>
        <strong className="block text-[13px] text-slate-200">{label}</strong>
        <span className="mt-1 block text-[12px] leading-5 text-slate-400/68">{description}</span>
      </span>
    </label>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  active,
  rgb,
}: {
  icon: typeof Activity;
  label: string;
  value: string;
  active: boolean;
  rgb: string;
}) {
  return (
    <div
      className="rounded-[15px] border bg-black/[0.18] p-3"
      style={{
        borderColor: `rgba(${rgb},${active ? 0.34 : 0.11})`,
        boxShadow: active ? `inset 3px 0 0 rgba(${rgb},0.72)` : undefined,
      }}
    >
      <Icon size={14} style={{ color: `rgba(${rgb},0.72)` }} />
      <div className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-[18px] font-semibold text-white">{value}</div>
    </div>
  );
}

function drawChamber(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: string,
  catalyst: boolean,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(3,18,14,0.92)");
  gradient.addColorStop(0.55, scene === "energy" ? "rgba(24,12,6,0.88)" : "rgba(5,12,20,0.88)");
  gradient.addColorStop(1, "rgba(2,5,7,0.96)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.strokeStyle = "rgba(255,255,255,0.08)";
  context.lineWidth = 1;
  context.strokeRect(20, 20, width - 40, height - 40);

  if (catalyst) {
    context.fillStyle = "rgba(192,132,252,0.08)";
    context.fillRect(width * 0.47, 20, width * 0.06, height - 40);
    context.strokeStyle = "rgba(192,132,252,0.24)";
    context.strokeRect(width * 0.47, 20, width * 0.06, height - 40);
  }
}

function drawConnections(
  context: CanvasRenderingContext2D,
  particles: LabParticle[],
  width: number,
  height: number,
  time: number,
  scene: string,
  rateIndex: number,
) {
  if (scene !== "rate" && scene !== "equilibrium") return;
  context.save();
  context.globalCompositeOperation = "lighter";
  for (let first = 0; first < particles.length; first += 3) {
    const a = particles[first];
    const b = particles[(first + 5) % particles.length];
    if (a.kind === b.kind) continue;
    const ax = a.x * width;
    const ay = a.y * height;
    const bx = b.x * width;
    const by = b.y * height;
    const distance = Math.hypot(bx - ax, by - ay);
    const threshold = Math.min(width, height) * (0.12 + rateIndex / 1200);
    if (distance > threshold) continue;
    const strength = 1 - distance / threshold;
    context.strokeStyle = `rgba(244,114,182,${0.04 + strength * 0.18})`;
    context.lineWidth = 0.8 + strength * 1.4;
    context.setLineDash([3, 7]);
    context.lineDashOffset = -time * 10;
    context.beginPath();
    context.moveTo(ax, ay);
    context.lineTo(bx, by);
    context.stroke();
  }
  context.restore();
}

function drawParticles(
  context: CanvasRenderingContext2D,
  particles: LabParticle[],
  width: number,
  height: number,
  time: number,
  productShare: number,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  const productCutoff = Math.round(particles.length * productShare);

  particles.forEach((particle, index) => {
    const kind: 0 | 1 | 2 = index < productCutoff && index % 3 === 0 ? 2 : particle.kind === 2 ? (index % 2) as 0 | 1 : particle.kind;
    const rgb = COLORS[kind];
    const x = particle.x * width;
    const y = particle.y * height;
    const radius = particle.radius * (0.9 + Math.sin(time * 1.2 + particle.phase) * 0.08);
    const glow = context.createRadialGradient(x, y, 0, x, y, radius * 4.3);
    glow.addColorStop(0, `rgba(${rgb},0.78)`);
    glow.addColorStop(0.28, `rgba(${rgb},0.24)`);
    glow.addColorStop(1, `rgba(${rgb},0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius * 4.3, 0, TAU);
    context.fill();

    context.fillStyle = `rgba(${rgb},0.78)`;
    context.beginPath();
    context.arc(x, y, radius, 0, TAU);
    context.fill();
  });
  context.restore();
}

function drawEnergyInset(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  barrier: number,
  catalyst: boolean,
  time: number,
) {
  const left = 38;
  const right = width - 38;
  const baseline = height - 58;
  const amplitude = height * (catalyst ? 0.20 : 0.31);
  context.save();
  context.strokeStyle = "rgba(250,204,21,0.32)";
  context.lineWidth = 2;
  context.beginPath();
  for (let x = left; x <= right; x += 8) {
    const progress = (x - left) / Math.max(1, right - left);
    const curve = Math.exp(-Math.pow((progress - 0.5) / 0.17, 2));
    const y = baseline - curve * amplitude + progress * 26;
    if (x === left) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  context.stroke();
  context.fillStyle = "rgba(250,204,21,0.72)";
  context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText(`${barrier} kJ barrier`, left + 6, baseline - amplitude - 12);

  const progress = ((time * 0.09) % 1 + 1) % 1;
  const x = left + progress * (right - left);
  const y = baseline - Math.exp(-Math.pow((progress - 0.5) / 0.17, 2)) * amplitude + progress * 26;
  const glow = context.createRadialGradient(x, y, 0, x, y, 25);
  glow.addColorStop(0, "rgba(255,255,255,0.82)");
  glow.addColorStop(0.24, "rgba(250,204,21,0.40)");
  glow.addColorStop(1, "rgba(250,204,21,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(x, y, 25, 0, TAU);
  context.fill();
  context.restore();
}

function drawEquilibriumGate(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  productShare: number,
  time: number,
) {
  context.save();
  context.fillStyle = "rgba(2,6,8,0.62)";
  context.fillRect(width * 0.47, 20, width * 0.06, height - 40);
  context.strokeStyle = "rgba(34,211,238,0.30)";
  context.lineWidth = 1.5;
  context.setLineDash([6, 10]);
  context.lineDashOffset = -time * 8;
  context.beginPath();
  context.moveTo(width * 0.49, height * 0.35);
  context.lineTo(width * 0.56, height * 0.35);
  context.stroke();
  context.lineDashOffset = time * 8;
  context.beginPath();
  context.moveTo(width * 0.51, height * 0.65);
  context.lineTo(width * 0.44, height * 0.65);
  context.stroke();
  context.setLineDash([]);
  context.fillStyle = "rgba(226,232,240,0.62)";
  context.font = "12px ui-monospace, SFMono-Regular, Menlo, monospace";
  context.fillText(`${Math.round((1 - productShare) * 100)}% reactants`, 34, height - 34);
  context.textAlign = "right";
  context.fillText(`${Math.round(productShare * 100)}% products`, width - 34, height - 34);
  context.restore();
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}
