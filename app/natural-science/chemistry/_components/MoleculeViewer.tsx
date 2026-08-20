"use client";

import { useEffect, useRef, useState } from "react";
import { Atom, Rotate3D } from "lucide-react";

type AtomPoint = {
  element: string;
  x: number;
  y: number;
  z: number;
  radius: number;
  color: string;
};

type Molecule = {
  id: string;
  name: string;
  formula: string;
  geometry: string;
  polarity: string;
  description: string;
  atoms: AtomPoint[];
  bonds: [number, number][];
};

const MOLECULES: Molecule[] = [
  {
    id: "h2o",
    name: "Water",
    formula: "H₂O",
    geometry: "Bent",
    polarity: "Polar",
    description: "Two O–H bonds point in different directions, so their charge imbalance does not cancel.",
    atoms: [
      { element: "O", x: 0, y: -8, z: 0, radius: 22, color: "#ef4444" },
      { element: "H", x: -34, y: 30, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: 34, y: 30, z: 0, radius: 13, color: "#f8fafc" },
    ],
    bonds: [[0, 1], [0, 2]],
  },
  {
    id: "ch4",
    name: "Methane",
    formula: "CH₄",
    geometry: "Tetrahedral",
    polarity: "Nonpolar",
    description: "Four equivalent bonds spread through three dimensions and cancel their bond dipoles.",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, radius: 22, color: "#64748b" },
      { element: "H", x: 0, y: -48, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: -42, y: 19, z: -28, radius: 13, color: "#f8fafc" },
      { element: "H", x: 42, y: 19, z: -28, radius: 13, color: "#f8fafc" },
      { element: "H", x: 0, y: 20, z: 48, radius: 13, color: "#f8fafc" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
  },
  {
    id: "co2",
    name: "Carbon dioxide",
    formula: "CO₂",
    geometry: "Linear",
    polarity: "Nonpolar overall",
    description: "Each C=O bond is polar, but the equal and opposite bond dipoles cancel in a linear molecule.",
    atoms: [
      { element: "C", x: 0, y: 0, z: 0, radius: 21, color: "#64748b" },
      { element: "O", x: -58, y: 0, z: 0, radius: 19, color: "#ef4444" },
      { element: "O", x: 58, y: 0, z: 0, radius: 19, color: "#ef4444" },
    ],
    bonds: [[0, 1], [0, 2]],
  },
  {
    id: "nh3",
    name: "Ammonia",
    formula: "NH₃",
    geometry: "Trigonal pyramidal",
    polarity: "Polar",
    description: "A lone pair changes the geometry and leaves a net molecular dipole.",
    atoms: [
      { element: "N", x: 0, y: -14, z: 0, radius: 22, color: "#3b82f6" },
      { element: "H", x: -38, y: 28, z: -22, radius: 13, color: "#f8fafc" },
      { element: "H", x: 38, y: 28, z: -22, radius: 13, color: "#f8fafc" },
      { element: "H", x: 0, y: 29, z: 42, radius: 13, color: "#f8fafc" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3]],
  },
  {
    id: "c2h4",
    name: "Ethene",
    formula: "C₂H₄",
    geometry: "Planar around each carbon",
    polarity: "Mostly nonpolar",
    description: "The carbon–carbon double bond restricts rotation and creates a planar local structure.",
    atoms: [
      { element: "C", x: -24, y: 0, z: 0, radius: 21, color: "#64748b" },
      { element: "C", x: 24, y: 0, z: 0, radius: 21, color: "#64748b" },
      { element: "H", x: -58, y: -35, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: -58, y: 35, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: 58, y: -35, z: 0, radius: 13, color: "#f8fafc" },
      { element: "H", x: 58, y: 35, z: 0, radius: 13, color: "#f8fafc" },
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [1, 4], [1, 5]],
  },
];

export default function MoleculeViewer() {
  const [activeId, setActiveId] = useState(MOLECULES[0].id);
  const active = MOLECULES.find((molecule) => molecule.id === activeId) ?? MOLECULES[0];
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    const drawingContext = canvasElement.getContext("2d");
    if (!drawingContext) return;
    const canvas: HTMLCanvasElement = canvasElement;
    const context: CanvasRenderingContext2D = drawingContext;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let animationId = 0;
    let width = 1;
    let height = 1;
    let ratio = 1;
    let start = performance.now();

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(280, bounds.width);
      height = Math.max(260, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.7);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(reducedMotion ? 8 : (performance.now() - start) / 1000);
    }

    function project(atom: AtomPoint, angleX: number, angleY: number) {
      const rotatedX = atom.x * Math.cos(angleY) - atom.z * Math.sin(angleY);
      let rotatedZ = atom.z * Math.cos(angleY) + atom.x * Math.sin(angleY);
      const rotatedY = atom.y * Math.cos(angleX) - rotatedZ * Math.sin(angleX);
      rotatedZ = rotatedZ * Math.cos(angleX) + atom.y * Math.sin(angleX);
      const scale = 520 / (520 + rotatedZ);
      const viewScale = Math.min(width, height) / 250;
      return {
        x: width / 2 + rotatedX * scale * viewScale,
        y: height / 2 + rotatedY * scale * viewScale,
        z: rotatedZ,
        radius: atom.radius * scale * viewScale,
        color: atom.color,
        element: atom.element,
      };
    }

    function draw(time: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      const background = context.createRadialGradient(width * 0.5, height * 0.48, 0, width * 0.5, height * 0.48, Math.max(width, height) * 0.62);
      background.addColorStop(0, "rgba(34,211,238,0.075)");
      background.addColorStop(0.45, "rgba(15,23,42,0.18)");
      background.addColorStop(1, "rgba(2,6,8,0.72)");
      context.fillStyle = background;
      context.fillRect(0, 0, width, height);

      const angleY = reducedMotion ? 0.55 : time * 0.36;
      const angleX = reducedMotion ? -0.18 : Math.sin(time * 0.23) * 0.28;
      const projected = active.atoms.map((atom) => project(atom, angleX, angleY));

      context.lineCap = "round";
      for (const [first, second] of active.bonds) {
        const a = projected[first];
        const b = projected[second];
        const gradient = context.createLinearGradient(a.x, a.y, b.x, b.y);
        gradient.addColorStop(0, "rgba(226,232,240,0.28)");
        gradient.addColorStop(0.5, "rgba(125,211,252,0.58)");
        gradient.addColorStop(1, "rgba(226,232,240,0.28)");
        context.strokeStyle = gradient;
        context.lineWidth = Math.max(3, Math.min(width, height) * 0.012);
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }

      projected
        .map((point, index) => ({ ...point, index }))
        .sort((a, b) => a.z - b.z)
        .forEach((point) => {
          const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius * 2.6);
          glow.addColorStop(0, hexToRgba(point.color, 0.52));
          glow.addColorStop(1, hexToRgba(point.color, 0));
          context.fillStyle = glow;
          context.beginPath();
          context.arc(point.x, point.y, point.radius * 2.6, 0, Math.PI * 2);
          context.fill();

          const sphere = context.createRadialGradient(
            point.x - point.radius * 0.35,
            point.y - point.radius * 0.38,
            point.radius * 0.08,
            point.x,
            point.y,
            point.radius,
          );
          sphere.addColorStop(0, "rgba(255,255,255,0.95)");
          sphere.addColorStop(0.24, point.color);
          sphere.addColorStop(1, "rgba(0,0,0,0.82)");
          context.fillStyle = sphere;
          context.beginPath();
          context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
          context.fill();

          context.fillStyle = "rgba(255,255,255,0.72)";
          context.font = `${Math.max(11, point.radius * 0.55)}px ui-monospace, SFMono-Regular, Menlo, monospace`;
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillText(point.element, point.x, point.y + 0.5);
        });
    }

    function loop(now: number) {
      draw((now - start) / 1000);
      animationId = requestAnimationFrame(loop);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (!reducedMotion) animationId = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [active]);

  return (
    <article className="overflow-hidden rounded-[24px] border border-cyan-100/[0.10] bg-black/[0.24] shadow-[0_24px_85px_rgba(0,0,0,0.22)] backdrop-blur-xl">
      <div className="flex flex-col gap-3 border-b border-white/[0.08] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-cyan-200/72">
            <Atom size={14} /> Molecular geometry
          </div>
          <p className="mt-1 text-[13px] text-slate-400/68">Rotate structure into property.</p>
        </div>
        <span className="inline-flex items-center gap-2 text-[12px] text-cyan-100/54">
          <Rotate3D size={15} /> three-dimensional view
        </span>
      </div>

      <canvas ref={canvasRef} className="h-[330px] w-full border-b border-white/[0.08]" />

      <div className="p-5 sm:p-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {MOLECULES.map((molecule) => {
            const selected = active.id === molecule.id;
            return (
              <button
                key={molecule.id}
                type="button"
                onClick={() => setActiveId(molecule.id)}
                className={`min-h-[42px] whitespace-nowrap rounded-[12px] border px-3 py-2 text-[12px] font-semibold transition ${
                  selected
                    ? "border-cyan-200/[0.30] bg-cyan-300/[0.09] text-cyan-100"
                    : "border-white/[0.07] bg-white/[0.018] text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {molecule.formula}
              </button>
            );
          })}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-[minmax(0,1fr)_220px]">
          <div>
            <h3 className="text-[24px] font-semibold tracking-[-0.035em] text-white">
              {active.name} <span className="text-cyan-100/62">{active.formula}</span>
            </h3>
            <p className="mt-2 text-[14px] leading-6 text-slate-300/70">{active.description}</p>
          </div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
            <Readout label="Geometry" value={active.geometry} />
            <Readout label="Polarity" value={active.polarity} />
          </div>
        </div>
      </div>
    </article>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[13px] border border-white/[0.07] bg-white/[0.018] p-3">
      <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-slate-500">
        {label}
      </div>
      <div className="mt-1 text-[13px] font-medium text-slate-200">{value}</div>
    </div>
  );
}

function hexToRgba(hex: string, alpha: number) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized.length === 3 ? normalized.split("").map((character) => character + character).join("") : normalized, 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return `rgba(${red},${green},${blue},${alpha})`;
}
