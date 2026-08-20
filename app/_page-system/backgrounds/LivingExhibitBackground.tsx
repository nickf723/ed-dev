"use client";

import { useEffect, useRef } from "react";

export type ExhibitEnvironment =
  | "canopy"
  | "forest"
  | "open"
  | "arid"
  | "wetland"
  | "marine"
  | "reef"
  | "alpine"
  | "polar"
  | "taxonomy"
  | "network";

type Role = "grazer" | "pollinator" | "predator";
type Agent = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  role: Role;
  size: number;
  phase: number;
};
type Resource = { x: number; y: number; strength: number; phase: number };
type Point = { x: number; y: number };
type Rgb = { r: number; g: number; b: number };

const TAU = Math.PI * 2;

export default function LivingExhibitBackground({
  accentRgb,
  environment,
}: {
  accentRgb: string;
  environment: ExhibitEnvironment;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

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
    const accent = parseRgb(accentRgb);
    const pointer = { x: 0.5, y: 0.5, active: false };
    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();
    let agents: Agent[] = [];
    let resources: Resource[] = [];
    let seeds: Point[] = [];

    function rebuild() {
      const random = mulberry32(
        hash(`${environment}:${accentRgb}:${width < 900 ? 1 : 2}`),
      );
      const count = width < 900 ? 30 : 62;
      const predators = width < 900 ? 1 : 2;
      agents = Array.from({ length: count }, (_, index) => {
        const role: Role =
          index < predators
            ? "predator"
            : index % 5 === 0
              ? "pollinator"
              : "grazer";
        const angle = random() * TAU;
        const speed =
          role === "predator" ? 0.032 : role === "pollinator" ? 0.042 : 0.027;
        return {
          x: random(),
          y: 0.08 + random() * 0.84,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          role,
          size: role === "predator" ? 1.55 : 0.72 + random() * 0.72,
          phase: random() * TAU,
        };
      });
      resources = Array.from(
        { length: width < 900 ? 5 : 8 },
        (_, index) => ({
          x: 0.08 + random() * 0.84,
          y: resourceY(environment, random),
          strength: 0.65 + random() * 0.75,
          phase: index / 8 + random() * 0.16,
        }),
      );
      seeds = Array.from({ length: width < 900 ? 16 : 30 }, () => ({
        x: random(),
        y: random(),
      }));
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      ratio = Math.min(
        window.devicePixelRatio || 1,
        width < 900 ? 1.2 : 1.55,
      );
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      rebuild();
      if (reducedMotion) render(16, 0);
    }

    function onPointer(event: PointerEvent) {
      pointer.x = clamp(event.clientX / width, 0, 1);
      pointer.y = clamp(event.clientY / height, 0, 1);
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      render(now / 1000, delta);
      frame = requestAnimationFrame(loop);
    }

    function render(time: number, delta: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawBase(context, width, height, environment, accent, time);
      drawField(context, width, height, environment, accent, seeds, time);
      drawResources(
        context,
        width,
        height,
        environment,
        accent,
        resources,
        time,
      );
      if (!reducedMotion && delta > 0) {
        updateAgents(
          agents,
          resources,
          environment,
          pointer,
          width,
          height,
          time,
          delta,
        );
      }
      drawRelationships(context, width, height, accent, agents, resources, time);
      drawAgents(context, width, height, environment, accent, agents, time);
      drawHorizon(context, width, height, environment, accent, time);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [accentRgb, environment]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_30%,transparent_18%,rgba(2,6,4,0.18)_58%,rgba(1,3,2,0.70)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-[#020604]/75 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-t from-[#010302]/90 to-transparent" />
    </div>
  );
}

function updateAgents(
  agents: Agent[],
  resources: Resource[],
  environment: ExhibitEnvironment,
  pointer: { x: number; y: number; active: boolean },
  width: number,
  height: number,
  time: number,
  delta: number,
) {
  const aspect = width / Math.max(1, height);
  const forces = agents.map(() => ({ x: 0, y: 0 }));

  for (let index = 0; index < agents.length; index += 1) {
    const agent = agents[index];
    const force = forces[index];
    const current = field(agent.x, agent.y, time, environment);
    force.x += current.x * 0.015;
    force.y += current.y * 0.015;

    let alignX = 0;
    let alignY = 0;
    let centerX = 0;
    let centerY = 0;
    let separateX = 0;
    let separateY = 0;
    let neighbors = 0;

    for (let otherIndex = 0; otherIndex < agents.length; otherIndex += 1) {
      if (index === otherIndex) continue;
      const other = agents[otherIndex];
      const dx = (other.x - agent.x) * aspect;
      const dy = other.y - agent.y;
      const distance = Math.hypot(dx, dy);

      if (
        agent.role !== "predator" &&
        other.role === agent.role &&
        distance < 0.15
      ) {
        alignX += other.vx;
        alignY += other.vy;
        centerX += other.x;
        centerY += other.y;
        neighbors += 1;
        if (distance < 0.045 && distance > 0.001) {
          separateX -= dx / (distance * distance);
          separateY -= dy / (distance * distance);
        }
      }

      if (
        agent.role !== "predator" &&
        other.role === "predator" &&
        distance < 0.24 &&
        distance > 0.001
      ) {
        const fear = (0.24 - distance) / 0.24;
        force.x -= (dx / distance) * fear * 0.17;
        force.y -= (dy / distance) * fear * 0.17;
      }
    }

    if (neighbors) {
      alignX /= neighbors;
      alignY /= neighbors;
      force.x +=
        (alignX - agent.vx) * 0.3 +
        (centerX / neighbors - agent.x) * 0.032 +
        separateX * 0.0005;
      force.y +=
        (alignY - agent.vy) * 0.3 +
        (centerY / neighbors - agent.y) * 0.032 +
        separateY * 0.0005;
    }

    if (agent.role === "predator") {
      const target = nearest(
        agent,
        agents.filter((candidate) => candidate.role !== "predator"),
        aspect,
      );
      if (target) {
        force.x += (target.x - agent.x) * 0.058;
        force.y += (target.y - agent.y) * 0.058;
      }
    } else {
      const resource = nearest(agent, resources, aspect);
      if (resource) {
        force.x += (resource.x - agent.x) * 0.018 * resource.strength;
        force.y += (resource.y - agent.y) * 0.018 * resource.strength;
      }
    }

    if (pointer.active) {
      const dx = (agent.x - pointer.x) * aspect;
      const dy = agent.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.18 && distance > 0.001) {
        const disturbance = (0.18 - distance) / 0.18;
        force.x += (dx / distance) * disturbance * 0.15;
        force.y += (dy / distance) * disturbance * 0.15;
      }
    }
  }

  for (let index = 0; index < agents.length; index += 1) {
    const agent = agents[index];
    const force = forces[index];
    agent.vx += force.x * delta;
    agent.vy += force.y * delta;
    const maximum =
      agent.role === "predator"
        ? 0.075
        : agent.role === "pollinator"
          ? 0.062
          : 0.047;
    const speed = Math.hypot(agent.vx, agent.vy) || 1;
    if (speed > maximum) {
      agent.vx = (agent.vx / speed) * maximum;
      agent.vy = (agent.vy / speed) * maximum;
    }
    agent.x = wrap(agent.x + agent.vx * delta);
    agent.y += agent.vy * delta;
    if (agent.y < 0.045 || agent.y > 0.955) {
      agent.vy *= -0.85;
      agent.y = clamp(agent.y, 0.045, 0.955);
    }
  }
}

function drawBase(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  environment: ExhibitEnvironment,
  accent: Rgb,
  time: number,
) {
  const palette = environmentPalette(environment);
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette.top);
  gradient.addColorStop(0.52, palette.middle);
  gradient.addColorStop(1, palette.bottom);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const glow = context.createRadialGradient(
    width * 0.18,
    height * 0.18,
    0,
    width * 0.18,
    height * 0.18,
    Math.max(width, height) * 0.56,
  );
  glow.addColorStop(0, rgba(accent, 0.15 + Math.sin(time * 0.08) * 0.015));
  glow.addColorStop(1, rgba(accent, 0));
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  environment: ExhibitEnvironment,
  accent: Rgb,
  seeds: Point[],
  time: number,
) {
  context.save();
  context.lineWidth = 1;
  context.globalAlpha =
    environment === "taxonomy" || environment === "network" ? 0.4 : 0.24;

  for (let index = 0; index < seeds.length; index += 1) {
    let x = wrap(seeds[index].x + time * 0.0025 * (1 + (index % 3)));
    let y = wrap(
      seeds[index].y + Math.sin(time * 0.03 + index) * 0.001,
    );
    context.beginPath();
    context.moveTo(x * width, y * height);
    for (let step = 0; step < 22; step += 1) {
      const vector = field(x, y, time + step * 0.06, environment);
      x = wrap(x + vector.x * 0.0065);
      y = wrap(y + vector.y * 0.0065);
      context.lineTo(x * width, y * height);
    }
    context.strokeStyle = rgba(accent, 0.16 + (index % 4) * 0.025);
    context.stroke();
  }
  context.restore();
}

function drawResources(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  environment: ExhibitEnvironment,
  accent: Rgb,
  resources: Resource[],
  time: number,
) {
  context.save();
  for (const resource of resources) {
    const x = resource.x * width;
    const y = resource.y * height;
    const pulse = 0.82 + Math.sin(time * 0.7 + resource.phase * TAU) * 0.18;
    const radius = (13 + resource.strength * 12) * pulse;
    const glow = context.createRadialGradient(
      x,
      y,
      0,
      x,
      y,
      radius * 2.4,
    );
    glow.addColorStop(0, rgba(accent, 0.22));
    glow.addColorStop(1, rgba(accent, 0));
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius * 2.4, 0, TAU);
    context.fill();

    context.strokeStyle = rgba(accent, 0.32);
    context.lineWidth = 1;
    if (environment === "marine" || environment === "reef") {
      for (let branch = 0; branch < 4; branch += 1) {
        context.beginPath();
        context.moveTo(x, y + radius * 0.4);
        context.quadraticCurveTo(
          x + (branch - 1.5) * radius * 0.35,
          y,
          x + (branch - 1.5) * radius * 0.55,
          y - radius,
        );
        context.stroke();
      }
    } else {
      for (let leaf = 0; leaf < 5; leaf += 1) {
        const angle = (leaf / 5) * TAU + resource.phase;
        context.beginPath();
        context.moveTo(x, y);
        context.quadraticCurveTo(
          x + Math.cos(angle + 0.45) * radius * 0.55,
          y + Math.sin(angle + 0.45) * radius * 0.55,
          x + Math.cos(angle) * radius,
          y + Math.sin(angle) * radius,
        );
        context.stroke();
      }
    }
  }
  context.restore();
}

function drawRelationships(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  accent: Rgb,
  agents: Agent[],
  resources: Resource[],
  time: number,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  context.lineWidth = 0.8;
  for (let index = 0; index < agents.length; index += 1) {
    const agent = agents[index];
    if (index % 4 !== 0 || agent.role === "predator") continue;
    const resource = nearest(
      agent,
      resources,
      width / Math.max(1, height),
    );
    if (!resource) continue;
    const distance = Math.hypot(
      (resource.x - agent.x) * width,
      (resource.y - agent.y) * height,
    );
    if (distance > Math.min(width, height) * 0.33) continue;
    context.strokeStyle = rgba(
      accent,
      0.035 + Math.sin(time + agent.phase) * 0.012,
    );
    context.setLineDash([3, 8]);
    context.lineDashOffset = -time * 8;
    context.beginPath();
    context.moveTo(agent.x * width, agent.y * height);
    context.lineTo(resource.x * width, resource.y * height);
    context.stroke();
  }
  context.restore();
}

function drawAgents(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  environment: ExhibitEnvironment,
  accent: Rgb,
  agents: Agent[],
  time: number,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  for (const agent of agents) {
    const x = agent.x * width;
    const y = agent.y * height;
    const angle = Math.atan2(agent.vy, agent.vx);
    const size =
      (agent.role === "predator"
        ? 8
        : agent.role === "pollinator"
          ? 5.5
          : 6.5) * agent.size;
    context.save();
    context.translate(x, y);
    context.rotate(angle);
    const phase =
      time * (agent.role === "pollinator" ? 7 : 3) + agent.phase;

    if (agent.role === "predator") {
      context.fillStyle =
        environment === "marine" || environment === "reef"
          ? "rgba(251,113,133,0.48)"
          : "rgba(251,146,60,0.46)";
      context.beginPath();
      context.moveTo(size * 1.25, 0);
      context.lineTo(-size * 0.68, -size * 0.52);
      context.lineTo(-size * 0.32, 0);
      context.lineTo(-size * 0.68, size * 0.52);
      context.closePath();
      context.fill();
    } else if (agent.role === "pollinator") {
      const flap = 0.55 + Math.sin(phase) * 0.2;
      context.fillStyle = "rgba(254,240,138,0.34)";
      context.beginPath();
      context.ellipse(
        -size * 0.1,
        -size * 0.26,
        size * 0.48,
        size * 0.2 * flap,
        -0.45,
        0,
        TAU,
      );
      context.ellipse(
        -size * 0.1,
        size * 0.26,
        size * 0.48,
        size * 0.2 * flap,
        0.45,
        0,
        TAU,
      );
      context.fill();
      context.fillStyle = rgba(accent, 0.52);
      context.beginPath();
      context.ellipse(size * 0.12, 0, size * 0.58, size * 0.16, 0, 0, TAU);
      context.fill();
    } else if (environment === "marine" || environment === "reef") {
      context.fillStyle = rgba(accent, 0.43);
      context.beginPath();
      context.ellipse(0, 0, size, size * 0.38, 0, 0, TAU);
      context.fill();
      context.beginPath();
      context.moveTo(-size * 0.72, 0);
      context.lineTo(
        -size * 1.35,
        -size * 0.46 + Math.sin(phase) * size * 0.12,
      );
      context.lineTo(
        -size * 1.35,
        size * 0.46 + Math.sin(phase) * size * 0.12,
      );
      context.closePath();
      context.fill();
    } else {
      const wing = Math.sin(phase) * size * 0.24;
      context.strokeStyle = rgba(accent, 0.45);
      context.lineWidth = Math.max(1, size * 0.12);
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(-size, wing);
      context.quadraticCurveTo(-size * 0.25, -size * 0.55, 0, 0);
      context.quadraticCurveTo(size * 0.34, -size * 0.48, size, -wing);
      context.stroke();
    }
    context.restore();
  }
  context.restore();
}

function drawHorizon(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  environment: ExhibitEnvironment,
  accent: Rgb,
  time: number,
) {
  context.save();
  if (environment === "marine" || environment === "reef") {
    context.fillStyle = "rgba(2,20,24,0.58)";
    context.fillRect(0, height * 0.8, width, height * 0.2);
    context.strokeStyle = rgba(accent, 0.14);
    for (let line = 0; line < 4; line += 1) {
      context.beginPath();
      for (let x = -20; x <= width + 20; x += 20) {
        const y =
          height * (0.68 + line * 0.055) +
          Math.sin(x * 0.012 + time * 0.32 + line) * (7 + line * 2);
        if (x === -20) context.moveTo(x, y);
        else context.lineTo(x, y);
      }
      context.stroke();
    }
  } else if (environment === "alpine" || environment === "polar") {
    context.fillStyle = rgba(accent, 0.07);
    context.strokeStyle = rgba(accent, 0.2);
    context.beginPath();
    context.moveTo(-40, height);
    context.lineTo(width * 0.14, height * 0.61);
    context.lineTo(width * 0.31, height * 0.82);
    context.lineTo(width * 0.49, height * 0.48);
    context.lineTo(width * 0.68, height * 0.82);
    context.lineTo(width * 0.84, height * 0.58);
    context.lineTo(width + 40, height);
    context.closePath();
    context.fill();
    context.stroke();
  } else {
    context.fillStyle = "rgba(1,10,4,0.55)";
    context.fillRect(0, height * 0.86, width, height * 0.14);
    context.strokeStyle = rgba(accent, 0.16);
    context.lineWidth = 1;
    const bladeCount = Math.min(90, Math.floor(width / 15));
    for (let blade = 0; blade < bladeCount; blade += 1) {
      const x = (blade / Math.max(1, bladeCount - 1)) * width;
      const sway = Math.sin(time * 0.8 + blade * 0.43) * 7;
      context.beginPath();
      context.moveTo(x, height);
      context.quadraticCurveTo(
        x + sway * 0.4,
        height * 0.89,
        x + sway,
        height * (0.78 + (blade % 7) * 0.012),
      );
      context.stroke();
    }
  }
  context.restore();
}

function field(
  x: number,
  y: number,
  time: number,
  environment: ExhibitEnvironment,
): Point {
  if (environment === "marine" || environment === "reef") {
    return normalize({
      x: 0.78 + Math.sin(y * 11 + time * 0.35) * 0.54,
      y: Math.cos(x * 8 - time * 0.22) * 0.42,
    });
  }
  if (
    environment === "open" ||
    environment === "arid" ||
    environment === "wetland"
  ) {
    return normalize({
      x: 0.84 + Math.sin(y * 9 + time * 0.2) * 0.32,
      y: Math.cos(x * 11 - time * 0.15) * 0.24,
    });
  }
  if (environment === "alpine" || environment === "polar") {
    return normalize({
      x: 0.78 + Math.sin((x + y) * 9 + time * 0.28) * 0.3,
      y: -0.22 + Math.cos(x * 7 - time * 0.17) * 0.34,
    });
  }
  const dx = 0.5 - x;
  const dy = 0.44 - y;
  const network = environment === "taxonomy" || environment === "network";
  return normalize({
    x:
      dx * (network ? 0.52 : 0.38) -
      dy * 0.62 +
      Math.sin(y * 12 + time * 0.18) * 0.14,
    y:
      dy * (network ? 0.52 : 0.38) +
      dx * 0.62 +
      Math.cos(x * 11 - time * 0.15) * 0.14,
  });
}

function nearest<T extends Point>(
  origin: Point,
  candidates: T[],
  aspect: number,
) {
  let closest: T | undefined;
  let distance = Infinity;
  for (const candidate of candidates) {
    const next = Math.hypot(
      (candidate.x - origin.x) * aspect,
      candidate.y - origin.y,
    );
    if (next < distance) {
      distance = next;
      closest = candidate;
    }
  }
  return closest;
}

function resourceY(
  environment: ExhibitEnvironment,
  random: () => number,
) {
  if (environment === "marine" || environment === "reef") {
    return 0.42 + random() * 0.46;
  }
  if (
    environment === "open" ||
    environment === "arid" ||
    environment === "wetland"
  ) {
    return 0.64 + random() * 0.25;
  }
  return 0.16 + random() * 0.7;
}

function environmentPalette(environment: ExhibitEnvironment) {
  switch (environment) {
    case "marine":
      return { top: "#03151c", middle: "#062a32", bottom: "#01080d" };
    case "reef":
      return { top: "#051722", middle: "#073338", bottom: "#02090d" };
    case "arid":
      return { top: "#25170c", middle: "#172014", bottom: "#050703" };
    case "wetland":
      return { top: "#09251f", middle: "#08231b", bottom: "#020907" };
    case "alpine":
    case "polar":
      return { top: "#0a1b25", middle: "#08191d", bottom: "#020508" };
    case "taxonomy":
    case "network":
      return { top: "#101b15", middle: "#0a1710", bottom: "#020604" };
    default:
      return { top: "#122819", middle: "#0a1d12", bottom: "#020604" };
  }
}

function parseRgb(value: string): Rgb {
  const [r = 52, g = 211, b = 153] = value.split(",").map(Number);
  return {
    r: clamp(r, 0, 255),
    g: clamp(g, 0, 255),
    b: clamp(b, 0, 255),
  };
}

function rgba(rgb: Rgb, alpha: number) {
  return `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`;
}

function normalize(point: Point): Point {
  const length = Math.hypot(point.x, point.y) || 1;
  return { x: point.x / length, y: point.y / length };
}

function hash(value: string) {
  let result = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    result = Math.imul(result ^ value.charCodeAt(index), 16777619);
  }
  return result >>> 0;
}

function mulberry32(seed: number) {
  return () => {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function wrap(value: number) {
  return ((value % 1) + 1) % 1;
}

function drawVignette(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
) {
  const vignette = context.createRadialGradient(
    width * 0.48,
    height * 0.34,
    Math.min(width, height) * 0.18,
    width * 0.48,
    height * 0.34,
    Math.max(width, height) * 0.78,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.66, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.62)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}
