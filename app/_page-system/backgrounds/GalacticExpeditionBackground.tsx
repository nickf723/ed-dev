"use client";

import { useEffect, useRef } from "react";

type DeepStar = {
  x: number;
  y: number;
  depth: number;
  radius: number;
  phase: number;
  temperature: 0 | 1 | 2;
};

type GalaxyParticle = {
  radius: number;
  angle: number;
  arm: number;
  jitter: number;
  size: number;
  brightness: number;
  phase: number;
  temperature: 0 | 1 | 2;
};

type WebNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
  phase: number;
};

type PointerState = {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
};

const TAU = Math.PI * 2;
const STAR_COLORS = ["186, 230, 253", "255, 255, 255", "244, 196, 255"] as const;
const GALAXY_COLORS = ["125, 211, 252", "248, 250, 252", "216, 180, 254"] as const;
const ORBITERS = [
  { radius: 0.075, squash: 0.34, period: 6.5, size: 2.4, rgb: "125, 211, 252", phase: 0.9 },
  { radius: 0.125, squash: 0.43, period: 10.5, size: 3.4, rgb: "250, 204, 21", phase: 2.2 },
  { radius: 0.18, squash: 0.50, period: 17.5, size: 4.1, rgb: "192, 132, 252", phase: 4.4 },
  { radius: 0.235, squash: 0.57, period: 28, size: 3, rgb: "244, 114, 182", phase: 1.6 },
] as const;

export default function GalacticExpeditionBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const random = mulberry32(64064);
    const deepStars = buildDeepStars(random, 260);
    const galaxyParticles = buildGalaxy(random, 760);
    const webNodes = buildWeb(random, 34);
    const pointer: PointerState = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let animationId = 0;
    let lastTime = performance.now();
    let scrollProgress = 0;
    let scrollTarget = 0;
    let visible = true;

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      pixelRatio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.25 : 1.7);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      updateScrollTarget();
      if (reducedMotion) render(performance.now(), 0);
    }

    function updateScrollTarget() {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = clamp(window.scrollY / scrollable, 0, 1);
      if (reducedMotion) {
        scrollProgress = scrollTarget;
        render(performance.now(), 0);
      }
    }

    function handlePointer(event: PointerEvent) {
      pointer.targetX = clamp(event.clientX / Math.max(1, width), 0, 1);
      pointer.targetY = clamp(event.clientY / Math.max(1, height), 0, 1);
      if (reducedMotion) {
        pointer.x = pointer.targetX;
        pointer.y = pointer.targetY;
        render(performance.now(), 0);
      }
    }

    function handleVisibility() {
      visible = !document.hidden;
      if (visible && !reducedMotion) {
        lastTime = performance.now();
        cancelAnimationFrame(animationId);
        animationId = requestAnimationFrame(loop);
      }
    }

    function loop(now: number) {
      if (!visible) return;
      const delta = Math.min(40, now - lastTime) / 1000;
      lastTime = now;
      scrollProgress = lerp(scrollProgress, scrollTarget, 1 - Math.pow(0.0008, delta));
      pointer.x = lerp(pointer.x, pointer.targetX, 1 - Math.pow(0.002, delta));
      pointer.y = lerp(pointer.y, pointer.targetY, 1 - Math.pow(0.002, delta));
      render(now, delta);
      animationId = requestAnimationFrame(loop);
    }

    function render(now: number, delta: number) {
      const time = reducedMotion ? 18 : now / 1000;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      drawSpace(context, width, height, scrollProgress);
      drawDeepStars(context, deepStars, width, height, time, scrollProgress, pointer);

      const localOpacity = 0.18 + 0.82 * (1 - smoothstep(0.18, 0.48, scrollProgress));
      const galaxyOpacity = 0.24 + 0.76 * smoothstep(0.03, 0.34, scrollProgress) * (1 - 0.38 * smoothstep(0.76, 1, scrollProgress));
      const webOpacity = 0.08 + 0.92 * smoothstep(0.42, 0.82, scrollProgress);

      drawGravityField(context, width, height, time, pointer, localOpacity);
      drawLocalSystem(context, width, height, time, scrollProgress, pointer, localOpacity);
      drawGalaxy(context, galaxyParticles, width, height, time, scrollProgress, pointer, galaxyOpacity);
      drawCosmicWeb(context, webNodes, width, height, time, delta, scrollProgress, pointer, webOpacity, reducedMotion);
      drawExpeditionPath(context, width, height, time, scrollProgress, localOpacity, galaxyOpacity, webOpacity);
      drawVignette(context, width, height);
    }

    resize();
    updateScrollTarget();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScrollTarget, { passive: true });
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);

    if (reducedMotion) render(performance.now(), 0);
    else animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScrollTarget);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_46%_34%,transparent_18%,rgba(1,2,8,0.18)_58%,rgba(1,2,8,0.72)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-[#010208]/78 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-[#010208]/88 to-transparent" />
    </div>
  );
}

function buildDeepStars(random: () => number, count: number): DeepStar[] {
  return Array.from({ length: count }, () => ({
    x: random(),
    y: random(),
    depth: 0.18 + random() * 0.82,
    radius: 0.45 + random() * 1.45,
    phase: random() * TAU,
    temperature: Math.floor(random() * 3) as 0 | 1 | 2,
  }));
}

function buildGalaxy(random: () => number, count: number): GalaxyParticle[] {
  return Array.from({ length: count }, (_, index) => {
    const radius = Math.pow(random(), 0.72);
    return {
      radius,
      angle: random() * TAU,
      arm: index % 4,
      jitter: (random() - 0.5) * (0.18 + radius * 0.28),
      size: 0.45 + random() * 1.7,
      brightness: 0.18 + random() * 0.72,
      phase: random() * TAU,
      temperature: Math.floor(random() * 3) as 0 | 1 | 2,
    };
  });
}

function buildWeb(random: () => number, count: number): WebNode[] {
  return Array.from({ length: count }, (_, index) => ({
    x: 0.08 + random() * 0.84,
    y: 0.08 + random() * 0.84,
    vx: (random() - 0.5) * 0.005,
    vy: (random() - 0.5) * 0.005,
    mass: 0.45 + random() * 1.45,
    phase: index / Math.max(1, count - 1) + random() * 0.25,
  }));
}

function drawSpace(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scroll: number,
) {
  const background = context.createLinearGradient(0, 0, width, height);
  background.addColorStop(0, "#02070d");
  background.addColorStop(0.42, "#04051a");
  background.addColorStop(0.72, "#090421");
  background.addColorStop(1, "#010208");
  context.fillStyle = background;
  context.fillRect(0, 0, width, height);

  const cyanGlow = context.createRadialGradient(width * 0.15, height * 0.22, 0, width * 0.15, height * 0.22, Math.max(width, height) * 0.52);
  cyanGlow.addColorStop(0, `rgba(8,145,178,${0.16 - scroll * 0.06})`);
  cyanGlow.addColorStop(1, "rgba(8,145,178,0)");
  context.fillStyle = cyanGlow;
  context.fillRect(0, 0, width, height);

  const violetGlow = context.createRadialGradient(width * 0.78, height * 0.24, 0, width * 0.78, height * 0.24, Math.max(width, height) * 0.58);
  violetGlow.addColorStop(0, `rgba(109,40,217,${0.14 + scroll * 0.08})`);
  violetGlow.addColorStop(1, "rgba(109,40,217,0)");
  context.fillStyle = violetGlow;
  context.fillRect(0, 0, width, height);
}

function drawDeepStars(
  context: CanvasRenderingContext2D,
  stars: DeepStar[],
  width: number,
  height: number,
  time: number,
  scroll: number,
  pointer: PointerState,
) {
  context.save();
  context.globalCompositeOperation = "lighter";
  const px = (pointer.x - 0.5) * 28;
  const py = (pointer.y - 0.5) * 20;

  for (const star of stars) {
    const drift = scroll * star.depth * 0.065;
    const x = wrap01(star.x + drift + px * star.depth / Math.max(1, width)) * width;
    const y = wrap01(star.y - drift * 0.35 + py * star.depth / Math.max(1, height)) * height;
    const twinkle = 0.58 + Math.sin(time * (0.45 + star.depth) + star.phase) * 0.28;
    const alpha = clamp((0.1 + star.depth * 0.48) * twinkle, 0.05, 0.72);
    const radius = star.radius * (0.55 + star.depth * 0.65);
    context.fillStyle = `rgba(${STAR_COLORS[star.temperature]},${alpha})`;
    context.beginPath();
    context.arc(x, y, radius, 0, TAU);
    context.fill();
  }
  context.restore();
}

function drawGravityField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  pointer: PointerState,
  opacity: number,
) {
  if (opacity < 0.04) return;
  const centerX = width * 0.18 + (pointer.x - 0.5) * 20;
  const centerY = height * 0.29 + (pointer.y - 0.5) * 14;
  const spacing = width < 900 ? 58 : 68;

  context.save();
  context.lineWidth = 1;
  context.globalAlpha = opacity * 0.28;
  context.strokeStyle = "rgba(103,232,249,0.30)";

  for (let y = -spacing; y < height + spacing; y += spacing) {
    for (let x = -spacing; x < width * 0.48; x += spacing) {
      const dx = centerX - x;
      const dy = centerY - y;
      const distance = Math.max(44, Math.hypot(dx, dy));
      const strength = clamp(9000 / (distance * distance), 0.08, 1.2);
      const tangentX = -dy / distance;
      const tangentY = dx / distance;
      const inwardX = dx / distance;
      const inwardY = dy / distance;
      const pulse = 0.72 + Math.sin(time * 0.55 + x * 0.01 + y * 0.008) * 0.22;
      const vectorX = (inwardX * 0.58 + tangentX * 0.42) * strength * pulse * 15;
      const vectorY = (inwardY * 0.58 + tangentY * 0.42) * strength * pulse * 15;

      context.beginPath();
      context.moveTo(x - vectorX * 0.35, y - vectorY * 0.35);
      context.lineTo(x + vectorX, y + vectorY);
      context.stroke();
    }
  }
  context.restore();
}

function drawLocalSystem(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  scroll: number,
  pointer: PointerState,
  opacity: number,
) {
  if (opacity < 0.025) return;
  const minimum = Math.min(width, height);
  const centerX = width * (0.18 - scroll * 0.035) + (pointer.x - 0.5) * 17;
  const centerY = height * 0.29 + (pointer.y - 0.5) * 11;
  const tilt = -0.24 + (pointer.x - 0.5) * 0.08;

  context.save();
  context.translate(centerX, centerY);
  context.rotate(tilt);
  context.globalAlpha = opacity;

  for (const orbiter of ORBITERS) {
    const radius = minimum * orbiter.radius;
    context.strokeStyle = `rgba(${orbiter.rgb},0.12)`;
    context.lineWidth = 1;
    context.beginPath();
    context.ellipse(0, 0, radius, radius * orbiter.squash, 0, 0, TAU);
    context.stroke();

    const angle = orbiter.phase + time * TAU / orbiter.period;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius * orbiter.squash;

    context.strokeStyle = `rgba(${orbiter.rgb},0.22)`;
    context.lineWidth = 1.2;
    context.beginPath();
    for (let sample = 0; sample <= 16; sample += 1) {
      const sampleAngle = angle - sample * 0.035;
      const sampleX = Math.cos(sampleAngle) * radius;
      const sampleY = Math.sin(sampleAngle) * radius * orbiter.squash;
      if (sample === 0) context.moveTo(sampleX, sampleY);
      else context.lineTo(sampleX, sampleY);
    }
    context.stroke();

    const glow = context.createRadialGradient(x, y, 0, x, y, orbiter.size * 5.5);
    glow.addColorStop(0, `rgba(${orbiter.rgb},0.95)`);
    glow.addColorStop(0.32, `rgba(${orbiter.rgb},0.36)`);
    glow.addColorStop(1, `rgba(${orbiter.rgb},0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, orbiter.size * 5.5, 0, TAU);
    context.fill();

    context.fillStyle = `rgb(${orbiter.rgb})`;
    context.beginPath();
    context.arc(x, y, orbiter.size, 0, TAU);
    context.fill();
  }

  const coreRadius = minimum * 0.018;
  const core = context.createRadialGradient(0, 0, 0, 0, 0, coreRadius * 6.5);
  core.addColorStop(0, "rgba(255,255,255,1)");
  core.addColorStop(0.12, "rgba(253,224,71,0.95)");
  core.addColorStop(0.38, "rgba(34,211,238,0.30)");
  core.addColorStop(1, "rgba(34,211,238,0)");
  context.fillStyle = core;
  context.beginPath();
  context.arc(0, 0, coreRadius * 6.5, 0, TAU);
  context.fill();

  context.restore();
}

function drawGalaxy(
  context: CanvasRenderingContext2D,
  particles: GalaxyParticle[],
  width: number,
  height: number,
  time: number,
  scroll: number,
  pointer: PointerState,
  opacity: number,
) {
  if (opacity < 0.025) return;
  const minimum = Math.min(width, height);
  const centerX = width * (0.76 - scroll * 0.055) + (pointer.x - 0.5) * 30;
  const centerY = height * (0.30 + scroll * 0.04) + (pointer.y - 0.5) * 18;
  const scale = minimum * (0.29 + scroll * 0.075);
  const rotation = 0.24 + (pointer.x - 0.5) * 0.12;
  const particleLimit = width < 900 ? 430 : particles.length;

  context.save();
  context.translate(centerX, centerY);
  context.rotate(rotation);
  context.globalCompositeOperation = "lighter";
  context.globalAlpha = opacity;

  const core = context.createRadialGradient(0, 0, 0, 0, 0, scale * 0.32);
  core.addColorStop(0, "rgba(255,255,255,0.62)");
  core.addColorStop(0.08, "rgba(216,180,254,0.44)");
  core.addColorStop(0.34, "rgba(139,92,246,0.13)");
  core.addColorStop(1, "rgba(76,29,149,0)");
  context.fillStyle = core;
  context.beginPath();
  context.ellipse(0, 0, scale * 0.34, scale * 0.15, 0, 0, TAU);
  context.fill();

  for (let index = 0; index < particleLimit; index += 1) {
    const particle = particles[index];
    const differentialRotation = time * (0.018 + (1 - particle.radius) * 0.075);
    const theta =
      particle.angle +
      particle.arm * (TAU / 4) +
      particle.radius * 5.9 +
      differentialRotation +
      scroll * 0.72;
    const radial = particle.radius * scale;
    const scatter = particle.jitter * scale * (0.14 + particle.radius * 0.18);
    const x = Math.cos(theta) * radial + Math.cos(theta * 2.3 + particle.phase) * scatter;
    const verticalWarp = Math.sin(theta * 2 + time * 0.12) * radial * 0.028;
    const y = Math.sin(theta) * radial * 0.34 + verticalWarp + Math.sin(theta * 1.7) * scatter * 0.28;
    const alpha = particle.brightness * (0.36 + (1 - particle.radius) * 0.42);

    context.fillStyle = `rgba(${GALAXY_COLORS[particle.temperature]},${alpha})`;
    context.beginPath();
    context.arc(x, y, particle.size * (0.7 + (1 - particle.radius) * 0.45), 0, TAU);
    context.fill();
  }

  context.globalCompositeOperation = "source-over";
  context.strokeStyle = "rgba(15,23,42,0.34)";
  context.lineWidth = Math.max(5, scale * 0.024);
  context.beginPath();
  context.ellipse(0, 0, scale * 0.74, scale * 0.17, -0.07, 0.16, Math.PI * 1.17);
  context.stroke();

  drawLensingArcs(context, scale, time, opacity);
  context.restore();
}

function drawLensingArcs(
  context: CanvasRenderingContext2D,
  scale: number,
  time: number,
  opacity: number,
) {
  context.save();
  context.globalAlpha = opacity * 0.55;
  context.lineWidth = 1.2;
  for (let index = 0; index < 3; index += 1) {
    const radius = scale * (0.43 + index * 0.09);
    const start = time * 0.022 + index * 1.8;
    context.strokeStyle = `rgba(${index === 1 ? "244,114,182" : "125,211,252"},${0.12 - index * 0.018})`;
    context.beginPath();
    context.ellipse(0, 0, radius, radius * 0.34, 0.08, start, start + 0.72);
    context.stroke();
  }
  context.restore();
}

function drawCosmicWeb(
  context: CanvasRenderingContext2D,
  nodes: WebNode[],
  width: number,
  height: number,
  time: number,
  delta: number,
  scroll: number,
  pointer: PointerState,
  opacity: number,
  reducedMotion: boolean,
) {
  if (opacity < 0.025) return;

  if (!reducedMotion) {
    for (const node of nodes) {
      node.x += node.vx * delta;
      node.y += node.vy * delta;
      node.vx += Math.sin(time * 0.07 + node.phase * TAU) * delta * 0.00007;
      node.vy += Math.cos(time * 0.06 + node.phase * TAU) * delta * 0.00007;
      if (node.x < 0.035 || node.x > 0.965) node.vx *= -1;
      if (node.y < 0.035 || node.y > 0.965) node.vy *= -1;
      node.x = clamp(node.x, 0.03, 0.97);
      node.y = clamp(node.y, 0.03, 0.97);
    }
  }

  const expansion = 0.83 + scroll * 0.48;
  const centerX = width * 0.58 + (pointer.x - 0.5) * 22;
  const centerY = height * 0.58 + (pointer.y - 0.5) * 18;
  const positions = nodes.map((node) => ({
    x: centerX + (node.x - 0.5) * width * expansion,
    y: centerY + (node.y - 0.5) * height * expansion,
  }));
  const threshold = Math.min(width, height) * 0.29;

  context.save();
  context.globalCompositeOperation = "lighter";
  context.globalAlpha = opacity;

  for (let first = 0; first < nodes.length; first += 1) {
    for (let second = first + 1; second < nodes.length; second += 1) {
      const a = positions[first];
      const b = positions[second];
      const distance = Math.hypot(b.x - a.x, b.y - a.y);
      if (distance > threshold) continue;
      const connection = 1 - distance / threshold;
      if (connection < 0.22) continue;

      const normalX = -(b.y - a.y) / Math.max(1, distance);
      const normalY = (b.x - a.x) / Math.max(1, distance);
      const bend = Math.sin((nodes[first].phase + nodes[second].phase) * TAU) * 18;
      const midX = (a.x + b.x) * 0.5 + normalX * bend;
      const midY = (a.y + b.y) * 0.5 + normalY * bend;

      context.strokeStyle = `rgba(167,139,250,${0.018 + connection * 0.10})`;
      context.lineWidth = 0.5 + connection * 1.45;
      context.beginPath();
      context.moveTo(a.x, a.y);
      context.quadraticCurveTo(midX, midY, b.x, b.y);
      context.stroke();

      if ((first + second) % 4 === 0) {
        const pulseProgress = wrap01(time * 0.028 + nodes[first].phase + nodes[second].phase * 0.33);
        const pulse = quadraticPoint(a.x, a.y, midX, midY, b.x, b.y, pulseProgress);
        const pulseRadius = 1.2 + connection * 1.8;
        const glow = context.createRadialGradient(pulse.x, pulse.y, 0, pulse.x, pulse.y, pulseRadius * 5);
        glow.addColorStop(0, `rgba(196,181,253,${0.38 + connection * 0.28})`);
        glow.addColorStop(1, "rgba(196,181,253,0)");
        context.fillStyle = glow;
        context.beginPath();
        context.arc(pulse.x, pulse.y, pulseRadius * 5, 0, TAU);
        context.fill();
      }
    }
  }

  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index];
    const position = positions[index];
    const pulse = 0.82 + Math.sin(time * 0.7 + node.phase * TAU) * 0.18;
    const radius = node.mass * (1.3 + scroll * 0.8) * pulse;
    const glow = context.createRadialGradient(position.x, position.y, 0, position.x, position.y, radius * 8);
    glow.addColorStop(0, "rgba(255,255,255,0.62)");
    glow.addColorStop(0.2, "rgba(196,181,253,0.30)");
    glow.addColorStop(1, "rgba(139,92,246,0)");
    context.fillStyle = glow;
    context.beginPath();
    context.arc(position.x, position.y, radius * 8, 0, TAU);
    context.fill();
  }

  context.restore();
}

function drawExpeditionPath(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  scroll: number,
  localOpacity: number,
  galaxyOpacity: number,
  webOpacity: number,
) {
  const start = { x: width * 0.18, y: height * 0.29 };
  const controlA = { x: width * 0.34, y: height * 0.74 };
  const controlB = { x: width * 0.62, y: height * 0.12 };
  const end = { x: width * 0.88, y: height * 0.60 };
  const pathOpacity = clamp((localOpacity + galaxyOpacity + webOpacity) / 3, 0.16, 0.48);

  context.save();
  context.globalAlpha = pathOpacity;
  context.strokeStyle = "rgba(125,211,252,0.14)";
  context.lineWidth = 1;
  context.setLineDash([7, 15]);
  context.lineDashOffset = -time * 12;
  context.beginPath();
  context.moveTo(start.x, start.y);
  context.bezierCurveTo(controlA.x, controlA.y, controlB.x, controlB.y, end.x, end.y);
  context.stroke();
  context.setLineDash([]);

  const probeProgress = wrap01(time * 0.018 + scroll * 0.76);
  const probe = cubicPoint(start, controlA, controlB, end, probeProgress);
  const tangent = cubicPoint(start, controlA, controlB, end, Math.min(1, probeProgress + 0.004));
  const angle = Math.atan2(tangent.y - probe.y, tangent.x - probe.x);

  const glow = context.createRadialGradient(probe.x, probe.y, 0, probe.x, probe.y, 24);
  glow.addColorStop(0, "rgba(255,255,255,0.72)");
  glow.addColorStop(0.24, "rgba(103,232,249,0.34)");
  glow.addColorStop(1, "rgba(103,232,249,0)");
  context.fillStyle = glow;
  context.beginPath();
  context.arc(probe.x, probe.y, 24, 0, TAU);
  context.fill();

  context.translate(probe.x, probe.y);
  context.rotate(angle);
  context.fillStyle = "rgba(224,242,254,0.82)";
  context.beginPath();
  context.moveTo(8, 0);
  context.lineTo(-5, -3.5);
  context.lineTo(-2, 0);
  context.lineTo(-5, 3.5);
  context.closePath();
  context.fill();
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.5, height * 0.42, Math.min(width, height) * 0.16, width * 0.5, height * 0.42, Math.max(width, height) * 0.76);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.68, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.64)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function quadraticPoint(
  x0: number,
  y0: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  progress: number,
) {
  const inverse = 1 - progress;
  return {
    x: inverse * inverse * x0 + 2 * inverse * progress * x1 + progress * progress * x2,
    y: inverse * inverse * y0 + 2 * inverse * progress * y1 + progress * progress * y2,
  };
}

function cubicPoint(
  start: { x: number; y: number },
  controlA: { x: number; y: number },
  controlB: { x: number; y: number },
  end: { x: number; y: number },
  progress: number,
) {
  const inverse = 1 - progress;
  return {
    x:
      inverse * inverse * inverse * start.x +
      3 * inverse * inverse * progress * controlA.x +
      3 * inverse * progress * progress * controlB.x +
      progress * progress * progress * end.x,
    y:
      inverse * inverse * inverse * start.y +
      3 * inverse * inverse * progress * controlA.y +
      3 * inverse * progress * progress * controlB.y +
      progress * progress * progress * end.y,
  };
}

function mulberry32(seed: number) {
  return function random() {
    let value = (seed += 0x6d2b79f5);
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const progress = clamp((value - edge0) / Math.max(0.0001, edge1 - edge0), 0, 1);
  return progress * progress * (3 - 2 * progress);
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function wrap01(value: number) {
  return ((value % 1) + 1) % 1;
}
