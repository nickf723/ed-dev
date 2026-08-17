"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type ChemistryScene = "elements" | "structures" | "reactions";
type AtomKind = "H" | "C" | "N" | "O" | "Na" | "Cl";

type AtomParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: AtomKind;
  radius: number;
  phase: number;
  molecule: number;
  slot: number;
};

type PointerState = {
  x: number;
  y: number;
  active: boolean;
};

const TAU = Math.PI * 2;
const ATOM_KINDS: AtomKind[] = ["H", "C", "H", "O", "N", "H", "Na", "Cl"];
const ATOM_STYLE: Record<AtomKind, { rgb: string; radius: number; valence: number }> = {
  H: { rgb: "241, 245, 249", radius: 4.6, valence: 1 },
  C: { rgb: "148, 163, 184", radius: 7.8, valence: 4 },
  N: { rgb: "96, 165, 250", radius: 7.4, valence: 3 },
  O: { rgb: "248, 113, 113", radius: 7.6, valence: 2 },
  Na: { rgb: "250, 204, 21", radius: 8.8, valence: 1 },
  Cl: { rgb: "52, 211, 153", radius: 8.5, valence: 1 },
};

const MOLECULE_SHAPES = [
  [
    { x: 0, y: -0.78 },
    { x: -0.68, y: 0.42 },
    { x: 0.68, y: 0.42 },
    { x: 0, y: 0.2 },
  ],
  [
    { x: -0.82, y: 0 },
    { x: -0.25, y: -0.58 },
    { x: 0.35, y: 0.08 },
    { x: 0.86, y: -0.38 },
  ],
  [
    { x: 0, y: 0 },
    { x: -0.78, y: -0.45 },
    { x: 0.78, y: -0.45 },
    { x: 0, y: 0.86 },
  ],
] as const;

export default function MolecularReactionBackground() {
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
    const random = mulberry32(64064);
    const pointer: PointerState = { x: 0.5, y: 0.5, active: false };

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let animationId = 0;
    let lastTime = performance.now();
    let scrollTarget = 0;
    let scrollProgress = 0;
    let atoms: AtomParticle[] = [];

    function rebuild() {
      const count = width < 900 ? 34 : 62;
      atoms = Array.from({ length: count }, (_, index) => {
        const kind = ATOM_KINDS[index % ATOM_KINDS.length];
        const style = ATOM_STYLE[kind];
        const angle = random() * TAU;
        const speed = 0.018 + random() * 0.025;
        return {
          x: 0.05 + random() * 0.9,
          y: 0.08 + random() * 0.84,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          kind,
          radius: style.radius * (0.78 + random() * 0.44),
          phase: random() * TAU,
          molecule: Math.floor(index / 4),
          slot: index % 4,
        };
      });
    }

    function resize() {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      pixelRatio = Math.min(window.devicePixelRatio || 1, width < 900 ? 1.2 : 1.55);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      rebuild();
      updateScroll();
      if (reducedMotion) render(18, 0);
    }

    function updateScroll() {
      const scrollable = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      scrollTarget = clamp(window.scrollY / scrollable, 0, 1);
      if (reducedMotion) {
        scrollProgress = scrollTarget;
        render(18, 0);
      }
    }

    function onPointerMove(event: PointerEvent) {
      pointer.x = clamp(event.clientX / Math.max(1, width), 0, 1);
      pointer.y = clamp(event.clientY / Math.max(1, height), 0, 1);
      pointer.active = true;
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - lastTime) / 1000);
      lastTime = now;
      scrollProgress = lerp(scrollProgress, scrollTarget, 1 - Math.pow(0.001, delta));
      render(now / 1000, delta);
      animationId = requestAnimationFrame(loop);
    }

    function render(time: number, delta: number) {
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.clearRect(0, 0, width, height);

      const scene = resolveScene(sceneRef.current, scrollProgress);
      drawBackground(context, width, height, scene, time);
      drawLaboratoryField(context, width, height, scene, time);
      if (!reducedMotion && delta > 0) {
        updateAtoms(atoms, width, height, scene, pointer, time, delta);
      }
      drawSceneScaffold(context, atoms, width, height, scene, time);
      drawAtoms(context, atoms, width, height, scene, time);
      drawVignette(context, width, height);
    }

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerleave", onPointerLeave);

    if (reducedMotion) render(18, 0);
    else animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_32%,transparent_16%,rgba(2,6,5,0.14)_58%,rgba(1,3,3,0.68)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-[23%] bg-gradient-to-b from-[#020705]/72 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-[#010302]/86 to-transparent" />
    </div>
  );
}

function resolveScene(value: string | null, scroll: number): ChemistryScene {
  if (value === "elements" || value === "structures" || value === "reactions") return value;
  if (scroll < 0.31) return "elements";
  if (scroll < 0.68) return "structures";
  return "reactions";
}

function updateAtoms(
  atoms: AtomParticle[],
  width: number,
  height: number,
  scene: ChemistryScene,
  pointer: PointerState,
  time: number,
  delta: number,
) {
  const aspect = width / Math.max(1, height);
  const reactionProgress = (Math.sin(time * 0.42) + 1) * 0.5;
  const transitionHeat = Math.pow(Math.sin(reactionProgress * Math.PI), 5);

  for (let index = 0; index < atoms.length; index += 1) {
    const atom = atoms[index];
    const target = targetFor(atom, index, atoms.length, scene, time, reactionProgress);
    const attraction = scene === "elements" ? 0.22 : scene === "structures" ? 0.34 : 0.25;
    atom.vx += (target.x - atom.x) * attraction * delta;
    atom.vy += (target.y - atom.y) * attraction * delta;

    const flow = chemistryFlow(atom.x, atom.y, time, scene);
    atom.vx += flow.x * delta * (scene === "reactions" ? 0.065 : 0.025);
    atom.vy += flow.y * delta * (scene === "reactions" ? 0.065 : 0.025);

    if (scene === "reactions") {
      atom.vx += Math.sin(time * 5.2 + atom.phase) * transitionHeat * delta * 0.075;
      atom.vy += Math.cos(time * 4.6 + atom.phase) * transitionHeat * delta * 0.075;
    }

    if (pointer.active) {
      const dx = (atom.x - pointer.x) * aspect;
      const dy = atom.y - pointer.y;
      const distance = Math.hypot(dx, dy);
      if (distance < 0.16 && distance > 0.001) {
        const push = (0.16 - distance) / 0.16;
        atom.vx += (dx / distance) * push * delta * 0.22;
        atom.vy += (dy / distance) * push * delta * 0.22;
      }
    }

    const maximum = scene === "reactions" ? 0.11 : scene === "structures" ? 0.064 : 0.052;
    const speed = Math.hypot(atom.vx, atom.vy) || 1;
    if (speed > maximum) {
      atom.vx = (atom.vx / speed) * maximum;
      atom.vy = (atom.vy / speed) * maximum;
    }

    atom.vx *= Math.pow(scene === "reactions" ? 0.965 : 0.93, delta * 60);
    atom.vy *= Math.pow(scene === "reactions" ? 0.965 : 0.93, delta * 60);
    atom.x += atom.vx * delta;
    atom.y += atom.vy * delta;

    if (atom.x < 0.025 || atom.x > 0.975) {
      atom.vx *= -0.82;
      atom.x = clamp(atom.x, 0.025, 0.975);
    }
    if (atom.y < 0.045 || atom.y > 0.955) {
      atom.vy *= -0.82;
      atom.y = clamp(atom.y, 0.045, 0.955);
    }
  }
}

function targetFor(
  atom: AtomParticle,
  index: number,
  total: number,
  scene: ChemistryScene,
  time: number,
  reactionProgress: number,
) {
  if (scene === "elements") {
    const kindIndex = ATOM_KINDS.indexOf(atom.kind);
    const lane = kindIndex / Math.max(1, ATOM_KINDS.length - 1);
    const row = Math.floor(index / ATOM_KINDS.length);
    const rowCount = Math.ceil(total / ATOM_KINDS.length);
    return {
      x: 0.12 + lane * 0.76 + Math.sin(time * 0.18 + atom.phase) * 0.012,
      y: 0.16 + (row / Math.max(1, rowCount - 1)) * 0.68 + Math.cos(time * 0.15 + atom.phase) * 0.012,
    };
  }

  if (scene === "structures") {
    const columns = 5;
    const molecule = atom.molecule;
    const row = Math.floor(molecule / columns);
    const column = molecule % columns;
    const shape = MOLECULE_SHAPES[molecule % MOLECULE_SHAPES.length];
    const offset = shape[atom.slot % shape.length];
    const centerX = 0.12 + (column / Math.max(1, columns - 1)) * 0.76;
    const centerY = 0.18 + (row / Math.max(1, Math.ceil(total / 4 / columns) - 1)) * 0.64;
    const rotation = time * 0.08 * (molecule % 2 ? -1 : 1) + molecule * 0.6;
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    return {
      x: centerX + (offset.x * cos - offset.y * sin) * 0.035,
      y: centerY + (offset.x * sin + offset.y * cos) * 0.052,
    };
  }

  const reactantSide = index % 2 === 0 ? 0.24 : 0.38;
  const productSide = 0.69 + (atom.molecule % 3) * 0.055;
  const eased = smoothstep(0.18, 0.82, reactionProgress);
  const baseX = lerp(reactantSide, productSide, eased);
  const track = (atom.molecule % 8) / 7;
  const arc = Math.sin(eased * Math.PI) * (0.16 + (atom.slot % 2) * 0.035);
  return {
    x: baseX + Math.sin(atom.phase + time * 0.35) * 0.018,
    y: 0.17 + track * 0.66 - arc + Math.cos(time * 0.42 + atom.phase) * 0.014,
  };
}

function chemistryFlow(x: number, y: number, time: number, scene: ChemistryScene) {
  if (scene === "reactions") {
    return normalize({
      x: 0.85 + Math.sin(y * 10 + time * 0.6) * 0.55,
      y: Math.cos(x * 12 - time * 0.42) * 0.48,
    });
  }
  if (scene === "structures") {
    const dx = 0.5 - x;
    const dy = 0.5 - y;
    return normalize({ x: dx * 0.35 - dy * 0.72, y: dy * 0.35 + dx * 0.72 });
  }
  return normalize({ x: Math.sin(y * 9 + time * 0.18) * 0.18, y: 0.62 + Math.cos(x * 8) * 0.12 });
}

function drawBackground(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: ChemistryScene,
  time: number,
) {
  const palette =
    scene === "elements"
      ? ["#03110b", "#041015", "#010403"]
      : scene === "structures"
        ? ["#04120f", "#07101b", "#020405"]
        : ["#130a05", "#07100d", "#020302"];
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(0.52, palette[1]);
  gradient.addColorStop(1, palette[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  const rgb = scene === "elements" ? "52,211,153" : scene === "structures" ? "34,211,238" : "250,204,21";
  const glow = context.createRadialGradient(width * 0.19, height * 0.18, 0, width * 0.19, height * 0.18, Math.max(width, height) * 0.58);
  glow.addColorStop(0, `rgba(${rgb},${0.13 + Math.sin(time * 0.13) * 0.012})`);
  glow.addColorStop(1, `rgba(${rgb},0)`);
  context.fillStyle = glow;
  context.fillRect(0, 0, width, height);
}

function drawLaboratoryField(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  scene: ChemistryScene,
  time: number,
) {
  context.save();
  context.lineWidth = 1;

  if (scene === "elements") {
    context.globalAlpha = 0.28;
    for (let column = 0; column < ATOM_KINDS.length; column += 1) {
      const x = width * (0.12 + (column / (ATOM_KINDS.length - 1)) * 0.76);
      context.strokeStyle = `rgba(${ATOM_STYLE[ATOM_KINDS[column]].rgb},0.12)`;
      context.beginPath();
      context.moveTo(x, height * 0.08);
      context.lineTo(x, height * 0.92);
      context.stroke();
    }
    for (let row = 0; row < 7; row += 1) {
      const y = height * (0.14 + row * 0.115);
      context.strokeStyle = "rgba(255,255,255,0.035)";
      context.beginPath();
      context.moveTo(width * 0.06, y);
      context.lineTo(width * 0.94, y);
      context.stroke();
    }
  } else if (scene === "structures") {
    context.globalAlpha = 0.35;
    for (let index = 0; index < 24; index += 1) {
      const y = height * ((index + 0.5) / 24);
      context.strokeStyle = `rgba(34,211,238,${0.018 + (index % 4) * 0.008})`;
      context.beginPath();
      for (let x = -20; x <= width + 20; x += 24) {
        const wave = Math.sin(x * 0.009 + time * 0.24 + index * 0.5) * 6;
        if (x === -20) context.moveTo(x, y + wave);
        else context.lineTo(x, y + wave);
      }
      context.stroke();
    }
  } else {
    const baseline = height * 0.72;
    const barrierX = width * 0.5;
    context.globalAlpha = 0.52;
    context.strokeStyle = "rgba(250,204,21,0.16)";
    context.lineWidth = 1.4;
    context.beginPath();
    for (let x = -20; x <= width + 20; x += 12) {
      const normalized = x / Math.max(1, width);
      const barrier = Math.exp(-Math.pow((normalized - 0.5) / 0.16, 2)) * height * 0.22;
      const productDrop = smoothstep(0.56, 0.86, normalized) * height * 0.07;
      const y = baseline - barrier + productDrop;
      if (x === -20) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.stroke();

    const pulse = wrap01(time * 0.09);
    const pulseX = pulse * width;
    const normalized = pulseX / Math.max(1, width);
    const pulseY = baseline - Math.exp(-Math.pow((normalized - 0.5) / 0.16, 2)) * height * 0.22 + smoothstep(0.56, 0.86, normalized) * height * 0.07;
    const glow = context.createRadialGradient(pulseX, pulseY, 0, pulseX, pulseY, 26);
    glow.addColorStop(0, "rgba(255,255,255,0.70)");
    glow.addColorStop(0.25, "rgba(250,204,21,0.32)");
    glow.addColorStop(1, "rgba(250,204,21,0)");
    context.fillStyle = glow;
    context.beginPath();
    context.arc(pulseX, pulseY, 26, 0, TAU);
    context.fill();

    context.strokeStyle = "rgba(248,113,113,0.12)";
    context.setLineDash([5, 10]);
    context.beginPath();
    context.moveTo(barrierX, height * 0.17);
    context.lineTo(barrierX, baseline - height * 0.22);
    context.stroke();
    context.setLineDash([]);
  }

  context.restore();
}

function drawSceneScaffold(
  context: CanvasRenderingContext2D,
  atoms: AtomParticle[],
  width: number,
  height: number,
  scene: ChemistryScene,
  time: number,
) {
  if (scene === "elements") {
    context.save();
    context.globalCompositeOperation = "lighter";
    for (let index = 0; index < atoms.length; index += 7) {
      const atom = atoms[index];
      const x = atom.x * width;
      const y = atom.y * height;
      const style = ATOM_STYLE[atom.kind];
      for (let shell = 1; shell <= Math.min(3, style.valence + 1); shell += 1) {
        context.strokeStyle = `rgba(${style.rgb},${0.045 + shell * 0.012})`;
        context.lineWidth = 1;
        context.beginPath();
        context.ellipse(x, y, atom.radius * (1.8 + shell * 0.9), atom.radius * (0.72 + shell * 0.38), time * 0.08 + shell, 0, TAU);
        context.stroke();
      }
    }
    context.restore();
    return;
  }

  context.save();
  context.globalCompositeOperation = "lighter";
  const maximumDistance = scene === "structures" ? Math.min(width, height) * 0.085 : Math.min(width, height) * 0.065;
  for (let first = 0; first < atoms.length; first += 1) {
    for (let second = first + 1; second < atoms.length; second += 1) {
      const a = atoms[first];
      const b = atoms[second];
      if (a.molecule !== b.molecule) continue;
      const ax = a.x * width;
      const ay = a.y * height;
      const bx = b.x * width;
      const by = b.y * height;
      const distance = Math.hypot(bx - ax, by - ay);
      if (distance > maximumDistance) continue;
      const strength = 1 - distance / maximumDistance;
      const rgb = scene === "structures" ? "34,211,238" : "250,204,21";
      context.strokeStyle = `rgba(${rgb},${0.045 + strength * 0.22})`;
      context.lineWidth = 0.8 + strength * 2;
      context.beginPath();
      context.moveTo(ax, ay);
      context.lineTo(bx, by);
      context.stroke();
    }
  }
  context.restore();
}

function drawAtoms(
  context: CanvasRenderingContext2D,
  atoms: AtomParticle[],
  width: number,
  height: number,
  scene: ChemistryScene,
  time: number,
) {
  context.save();
  context.globalCompositeOperation = "lighter";

  for (const atom of atoms) {
    const style = ATOM_STYLE[atom.kind];
    const x = atom.x * width;
    const y = atom.y * height;
    const pulse = 0.9 + Math.sin(time * 0.8 + atom.phase) * 0.1;
    const radius = atom.radius * pulse * (scene === "reactions" ? 1.08 : 1);
    const glow = context.createRadialGradient(x, y, 0, x, y, radius * 4.5);
    glow.addColorStop(0, `rgba(${style.rgb},0.80)`);
    glow.addColorStop(0.24, `rgba(${style.rgb},0.26)`);
    glow.addColorStop(1, `rgba(${style.rgb},0)`);
    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, radius * 4.5, 0, TAU);
    context.fill();

    context.fillStyle = `rgba(${style.rgb},0.72)`;
    context.beginPath();
    context.arc(x, y, radius, 0, TAU);
    context.fill();

    context.fillStyle = "rgba(255,255,255,0.62)";
    context.beginPath();
    context.arc(x - radius * 0.28, y - radius * 0.3, Math.max(0.8, radius * 0.18), 0, TAU);
    context.fill();
  }
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(
    width * 0.48,
    height * 0.36,
    Math.min(width, height) * 0.18,
    width * 0.48,
    height * 0.36,
    Math.max(width, height) * 0.78,
  );
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.68, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.64)");
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

function normalize(point: { x: number; y: number }) {
  const length = Math.hypot(point.x, point.y) || 1;
  return { x: point.x / length, y: point.y / length };
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
