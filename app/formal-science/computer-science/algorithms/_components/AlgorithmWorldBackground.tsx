"use client";

import { useEffect, useRef } from "react";
import { useWorldDirector } from "@/app/_page-system/scene";

type AlgorithmScene = "traversal" | "sorting" | "growth";
type Point = { x: number; y: number };
type WorldDetail = {
  scene?: AlgorithmScene;
  frontier?: string[];
  visited?: string[];
  current?: string | null;
  values?: number[];
  active?: [number, number] | null;
  pass?: number;
  n?: number;
  selected?: string;
  operations?: number;
};

const DEFAULT_DETAIL: WorldDetail = {
  frontier: ["A"],
  visited: [],
  values: [7, 2, 9, 4, 1, 8, 3, 6],
  n: 24,
  selected: "nlogn",
};

const GRAPH: Point[] = [
  { x: 0.10, y: 0.30 }, { x: 0.23, y: 0.18 }, { x: 0.23, y: 0.43 },
  { x: 0.38, y: 0.10 }, { x: 0.39, y: 0.30 }, { x: 0.39, y: 0.52 }, { x: 0.56, y: 0.36 },
  { x: 0.72, y: 0.18 }, { x: 0.82, y: 0.42 }, { x: 0.68, y: 0.64 },
];
const EDGES: Array<[number, number]> = [
  [0,1],[0,2],[1,3],[1,4],[2,5],[4,6],[5,6],[6,7],[6,8],[6,9],[7,8],[8,9],
];

export default function AlgorithmWorldBackground() {
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
    window.addEventListener("algorithm-world:update", handler);
    return () => window.removeEventListener("algorithm-world:update", handler);
  }, []);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;
    const canvas = canvasElement;
    const context = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.72, y: 0.30, active: false };
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
      if (reducedMotion) draw(17);
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
      if (scene === "traversal") drawTraversal(context, width, height, time, detailRef.current, pointer);
      if (scene === "sorting") drawSorting(context, width, height, time, detailRef.current);
      if (scene === "growth") drawGrowth(context, width, height, time, detailRef.current);
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
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,8,10,0.18),transparent_34%,transparent_72%,rgba(2,5,9,0.34))]" />
      <div className="absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-[#020608]/75 to-transparent" />
    </div>
  );
}

function drawBase(context: CanvasRenderingContext2D, width: number, height: number, scene: AlgorithmScene, time: number) {
  const palette = scene === "sorting"
    ? ["#071109", "#07110f", "#020607"]
    : scene === "growth"
      ? ["#0b0714", "#07101a", "#020409"]
      : ["#031013", "#061018", "#020609"];
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, palette[0]);
  gradient.addColorStop(0.56, palette[1]);
  gradient.addColorStop(1, palette[2]);
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  context.save();
  context.globalAlpha = 0.18;
  context.strokeStyle = scene === "sorting" ? "rgba(52,211,153,0.18)" : scene === "growth" ? "rgba(167,139,250,0.18)" : "rgba(34,211,238,0.18)";
  context.lineWidth = 1;
  const spacing = width < 900 ? 54 : 72;
  const drift = (time * 5) % spacing;
  for (let x = -spacing + drift; x < width + spacing; x += spacing) {
    context.beginPath();
    context.moveTo(x, 0);
    context.lineTo(x, height);
    context.stroke();
  }
  for (let y = -spacing + drift * 0.4; y < height + spacing; y += spacing) {
    context.beginPath();
    context.moveTo(0, y);
    context.lineTo(width, y);
    context.stroke();
  }
  context.restore();
}

function drawTraversal(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  detail: WorldDetail,
  pointer: { x: number; y: number; active: boolean },
) {
  const offsetX = pointer.active ? (pointer.x - 0.5) * 20 : 0;
  const offsetY = pointer.active ? (pointer.y - 0.5) * 12 : 0;
  const nodes = GRAPH.map((point) => ({ x: point.x * width + offsetX, y: point.y * height + offsetY }));
  const visitedCount = detail.visited?.length ?? 0;
  const frontierCount = detail.frontier?.length ?? 1;

  context.save();
  context.globalCompositeOperation = "lighter";
  for (const [from, to] of EDGES) {
    const a = nodes[from];
    const b = nodes[to];
    context.strokeStyle = "rgba(34,211,238,0.12)";
    context.lineWidth = 1.2;
    context.beginPath();
    context.moveTo(a.x, a.y);
    context.lineTo(b.x, b.y);
    context.stroke();

    const progress = (time * 0.12 + (from + to) * 0.071) % 1;
    const x = a.x + (b.x - a.x) * progress;
    const y = a.y + (b.y - a.y) * progress;
    context.fillStyle = "rgba(34,211,238,0.46)";
    context.beginPath();
    context.arc(x, y, 2.2, 0, Math.PI * 2);
    context.fill();
  }

  nodes.forEach((node, index) => {
    const visited = index < visitedCount;
    const frontier = index >= visitedCount && index < visitedCount + frontierCount;
    const pulse = 1 + Math.sin(time * 2 + index) * 0.12;
    context.strokeStyle = visited ? "rgba(52,211,153,0.48)" : frontier ? "rgba(250,204,21,0.46)" : "rgba(148,163,184,0.20)";
    context.fillStyle = visited ? "rgba(52,211,153,0.10)" : frontier ? "rgba(250,204,21,0.08)" : "rgba(15,23,42,0.20)";
    context.lineWidth = frontier ? 2 : 1.2;
    context.beginPath();
    context.arc(node.x, node.y, (8 + (index % 3) * 2) * pulse, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawSorting(context: CanvasRenderingContext2D, width: number, height: number, time: number, detail: WorldDetail) {
  const values = detail.values ?? DEFAULT_DETAIL.values ?? [];
  const active = detail.active ?? null;
  const baseline = height * 0.76;
  const stageWidth = Math.min(width * 0.62, 900);
  const startX = width * 0.18;
  const gap = stageWidth / Math.max(1, values.length);

  context.save();
  for (let lane = 0; lane < values.length; lane += 1) {
    const x = startX + lane * gap;
    context.strokeStyle = "rgba(52,211,153,0.08)";
    context.beginPath();
    context.moveTo(x, height * 0.12);
    context.lineTo(x, baseline + 20);
    context.stroke();
  }

  values.forEach((value, index) => {
    const compare = active?.includes(index) ?? false;
    const barHeight = 26 + value * Math.min(30, height * 0.035);
    const x = startX + index * gap + gap * 0.13;
    const widthBar = gap * 0.68;
    const shimmer = compare ? Math.sin(time * 7) * 0.06 : 0;
    const gradient = context.createLinearGradient(0, baseline - barHeight, 0, baseline);
    gradient.addColorStop(0, compare ? `rgba(250,204,21,${0.42 + shimmer})` : "rgba(52,211,153,0.26)");
    gradient.addColorStop(1, compare ? "rgba(72,48,4,0.42)" : "rgba(3,30,20,0.32)");
    context.fillStyle = gradient;
    context.strokeStyle = compare ? "rgba(250,204,21,0.56)" : "rgba(52,211,153,0.18)";
    context.lineWidth = compare ? 2 : 1;
    context.beginPath();
    context.roundRect(x, baseline - barHeight, widthBar, barHeight, 10);
    context.fill();
    context.stroke();
  });
  context.restore();
}

function drawGrowth(context: CanvasRenderingContext2D, width: number, height: number, time: number, detail: WorldDetail) {
  const families = [
    { power: 0.12, rgb: "52,211,153", bend: 0.10 },
    { power: 0.34, rgb: "34,211,238", bend: 0.24 },
    { power: 0.62, rgb: "96,165,250", bend: 0.44 },
    { power: 0.86, rgb: "167,139,250", bend: 0.72 },
    { power: 1.18, rgb: "244,114,182", bend: 1.12 },
  ];
  const baseY = height * 0.76;
  const left = width * 0.12;
  const right = width * 0.88;
  const selectedIndex = ["constant", "log", "linear", "nlogn", "quadratic"].indexOf(detail.selected ?? "nlogn");

  context.save();
  context.globalCompositeOperation = "lighter";
  families.forEach((family, index) => {
    context.beginPath();
    for (let step = 0; step <= 90; step += 1) {
      const t = step / 90;
      const x = left + (right - left) * t;
      const lift = Math.pow(t, family.bend) * height * family.power;
      const y = baseY - lift + Math.sin(time * 0.35 + t * 7 + index) * 2.5;
      if (step === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    }
    context.strokeStyle = `rgba(${family.rgb},${index === selectedIndex ? 0.62 : 0.16})`;
    context.lineWidth = index === selectedIndex ? 3.2 : 1.3;
    context.stroke();
  });

  const n = Math.max(2, Math.min(64, detail.n ?? 24));
  const markerX = left + ((n - 2) / 62) * (right - left);
  context.strokeStyle = "rgba(250,204,21,0.36)";
  context.setLineDash([5, 7]);
  context.beginPath();
  context.moveTo(markerX, height * 0.12);
  context.lineTo(markerX, baseY + 10);
  context.stroke();
  context.restore();
}

function drawVignette(context: CanvasRenderingContext2D, width: number, height: number) {
  const vignette = context.createRadialGradient(width * 0.5, height * 0.34, Math.min(width, height) * 0.12, width * 0.5, height * 0.34, Math.max(width, height) * 0.76);
  vignette.addColorStop(0, "rgba(0,0,0,0)");
  vignette.addColorStop(0.70, "rgba(0,0,0,0.08)");
  vignette.addColorStop(1, "rgba(0,0,0,0.68)");
  context.fillStyle = vignette;
  context.fillRect(0, 0, width, height);
}

function resolveScene(scene: string | null): AlgorithmScene {
  return scene === "sorting" || scene === "growth" ? scene : "traversal";
}
