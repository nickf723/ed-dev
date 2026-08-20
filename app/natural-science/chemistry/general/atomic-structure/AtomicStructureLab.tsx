"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import {
  Atom,
  CircleDot,
  Orbit,
  Sparkles,
} from "lucide-react";
import { Surface, useWorldDirector } from "@/app/_page-system/scene";

type AtomicScene = "identity" | "shells" | "periodicity";
type ElementRecord = {
  z: number;
  symbol: string;
  name: string;
  period: number;
  group: number;
  mass: number;
  shells: number[];
  configuration: string;
  family: string;
};

type NucleonPoint = {
  x: number;
  y: number;
  proton: boolean;
  phase: number;
};

const TAU = Math.PI * 2;

const ELEMENTS: ElementRecord[] = [
  { z: 1, symbol: "H", name: "Hydrogen", period: 1, group: 1, mass: 1, shells: [1], configuration: "1s¹", family: "Nonmetal" },
  { z: 2, symbol: "He", name: "Helium", period: 1, group: 18, mass: 4, shells: [2], configuration: "1s²", family: "Noble gas" },
  { z: 3, symbol: "Li", name: "Lithium", period: 2, group: 1, mass: 7, shells: [2, 1], configuration: "[He] 2s¹", family: "Alkali metal" },
  { z: 4, symbol: "Be", name: "Beryllium", period: 2, group: 2, mass: 9, shells: [2, 2], configuration: "[He] 2s²", family: "Alkaline earth metal" },
  { z: 5, symbol: "B", name: "Boron", period: 2, group: 13, mass: 11, shells: [2, 3], configuration: "[He] 2s² 2p¹", family: "Metalloid" },
  { z: 6, symbol: "C", name: "Carbon", period: 2, group: 14, mass: 12, shells: [2, 4], configuration: "[He] 2s² 2p²", family: "Nonmetal" },
  { z: 7, symbol: "N", name: "Nitrogen", period: 2, group: 15, mass: 14, shells: [2, 5], configuration: "[He] 2s² 2p³", family: "Nonmetal" },
  { z: 8, symbol: "O", name: "Oxygen", period: 2, group: 16, mass: 16, shells: [2, 6], configuration: "[He] 2s² 2p⁴", family: "Nonmetal" },
  { z: 9, symbol: "F", name: "Fluorine", period: 2, group: 17, mass: 19, shells: [2, 7], configuration: "[He] 2s² 2p⁵", family: "Halogen" },
  { z: 10, symbol: "Ne", name: "Neon", period: 2, group: 18, mass: 20, shells: [2, 8], configuration: "[He] 2s² 2p⁶", family: "Noble gas" },
  { z: 11, symbol: "Na", name: "Sodium", period: 3, group: 1, mass: 23, shells: [2, 8, 1], configuration: "[Ne] 3s¹", family: "Alkali metal" },
  { z: 12, symbol: "Mg", name: "Magnesium", period: 3, group: 2, mass: 24, shells: [2, 8, 2], configuration: "[Ne] 3s²", family: "Alkaline earth metal" },
  { z: 13, symbol: "Al", name: "Aluminum", period: 3, group: 13, mass: 27, shells: [2, 8, 3], configuration: "[Ne] 3s² 3p¹", family: "Post-transition metal" },
  { z: 14, symbol: "Si", name: "Silicon", period: 3, group: 14, mass: 28, shells: [2, 8, 4], configuration: "[Ne] 3s² 3p²", family: "Metalloid" },
  { z: 15, symbol: "P", name: "Phosphorus", period: 3, group: 15, mass: 31, shells: [2, 8, 5], configuration: "[Ne] 3s² 3p³", family: "Nonmetal" },
  { z: 16, symbol: "S", name: "Sulfur", period: 3, group: 16, mass: 32, shells: [2, 8, 6], configuration: "[Ne] 3s² 3p⁴", family: "Nonmetal" },
  { z: 17, symbol: "Cl", name: "Chlorine", period: 3, group: 17, mass: 35, shells: [2, 8, 7], configuration: "[Ne] 3s² 3p⁵", family: "Halogen" },
  { z: 18, symbol: "Ar", name: "Argon", period: 3, group: 18, mass: 40, shells: [2, 8, 8], configuration: "[Ne] 3s² 3p⁶", family: "Noble gas" },
  { z: 19, symbol: "K", name: "Potassium", period: 4, group: 1, mass: 39, shells: [2, 8, 8, 1], configuration: "[Ar] 4s¹", family: "Alkali metal" },
  { z: 20, symbol: "Ca", name: "Calcium", period: 4, group: 2, mass: 40, shells: [2, 8, 8, 2], configuration: "[Ar] 4s²", family: "Alkaline earth metal" },
];

export default function AtomicStructureLab() {
  const [atomicNumber, setAtomicNumber] = useState(6);
  const selected = ELEMENTS.find((element) => element.z === atomicNumber) ?? ELEMENTS[5];
  const [massNumber, setMassNumber] = useState(selected.mass);
  const [charge, setCharge] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const director = useWorldDirector();
  const scene: AtomicScene =
    director.scene === "shells" || director.scene === "periodicity"
      ? director.scene
      : "identity";

  useEffect(() => {
    setMassNumber(selected.mass);
    setCharge(0);
  }, [selected]);

  const electrons = Math.max(0, selected.z - charge);
  const shells = useMemo(
    () => adjustShells(selected.shells, charge),
    [charge, selected.shells],
  );
  const neutrons = Math.max(0, massNumber - selected.z);
  const trend = useMemo(() => relativeTrends(selected), [selected]);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("atomic-structure:element", {
        detail: {
          z: selected.z,
          mass: massNumber,
          shells,
          symbol: selected.symbol,
        },
      }),
    );
  }, [massNumber, selected.symbol, selected.z, shells]);

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
    const random = mulberry32(selected.z * 991 + massNumber * 37 + charge * 17);
    const nucleons = buildNucleus(random, selected.z, neutrons);

    let width = 1;
    let height = 1;
    let ratio = 1;
    let frame = 0;
    let previous = performance.now();

    function resize() {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(300, bounds.width);
      height = Math.max(300, bounds.height);
      ratio = Math.min(window.devicePixelRatio || 1, 1.6);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(18, 0);
    }

    function loop(now: number) {
      const delta = Math.min(0.042, (now - previous) / 1000);
      previous = now;
      draw(now / 1000, delta);
      frame = requestAnimationFrame(loop);
    }

    function draw(time: number, _delta: number) {
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);
      drawAtomStage(
        context,
        width,
        height,
        time,
        selected,
        massNumber,
        charge,
        shells,
        nucleons,
        scene,
      );
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();
    if (!reducedMotion) frame = requestAnimationFrame(loop);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [charge, massNumber, neutrons, scene, selected, shells]);

  return (
    <div className="grid h-full gap-3 xl:grid-cols-[minmax(0,1fr)_320px]">
      <Surface variant="ghost" className="overflow-hidden rounded-[24px]">
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.08] px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-[13px] border border-emerald-200/[0.22] bg-emerald-300/[0.055] text-emerald-100">
              <Atom size={17} />
            </span>
            <div>
              <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.10em] text-emerald-200/64">
                Atomic model
              </div>
              <h3 className="text-[21px] font-semibold tracking-[-0.035em] text-white">
                {selected.name} · {selected.symbol}
              </h3>
            </div>
          </div>
          <span className="rounded-full border border-white/[0.08] bg-black/[0.18] px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-300/66">
            {scene} view
          </span>
        </div>

        <canvas ref={canvasRef} className="h-[285px] w-full border-b border-white/[0.08] 2xl:h-[305px]" />

        <div className="overflow-x-auto p-3">
          <div className="grid min-w-[650px] grid-cols-[repeat(18,minmax(0,1fr))] gap-1.5">
            {ELEMENTS.map((element) => (
              <button
                key={element.z}
                type="button"
                onClick={() => setAtomicNumber(element.z)}
                className={`relative aspect-square rounded-[9px] border text-left transition hover:-translate-y-0.5 ${
                  element.z === selected.z
                    ? "border-emerald-200/[0.42] bg-emerald-300/[0.10] text-white"
                    : "border-white/[0.08] bg-black/[0.16] text-slate-400 hover:bg-white/[0.04]"
                }`}
                style={{
                  gridColumn: element.group,
                  gridRow: element.period,
                }}
                aria-label={`Select ${element.name}`}
              >
                <span className="absolute left-1.5 top-1 font-mono text-[11px] text-white/38">
                  {element.z}
                </span>
                <span className="absolute inset-x-0 bottom-1.5 text-center text-[14px] font-semibold">
                  {element.symbol}
                </span>
              </button>
            ))}
          </div>
        </div>
      </Surface>

      <Surface variant="glass" className="rounded-[24px] p-4">
        <div className="grid grid-cols-[76px_minmax(0,1fr)] gap-4">
          <div className="flex aspect-square items-center justify-center rounded-[18px] border border-emerald-200/[0.20] bg-black/[0.22] text-[38px] font-semibold tracking-[-0.05em] text-white">
            {selected.symbol}
          </div>
          <div>
            <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-emerald-200/62">
              Z = {selected.z}
            </div>
            <h3 className="mt-1 text-[22px] font-semibold text-white">{selected.name}</h3>
            <p className="mt-1 text-[12px] leading-5 text-slate-400/72">
              {selected.family} · period {selected.period} · group {selected.group}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          <CountCard label="Protons" value={selected.z} rgb="248,113,113" />
          <CountCard label="Neutrons" value={neutrons} rgb="96,165,250" />
          <CountCard label="Electrons" value={electrons} rgb="34,211,238" />
        </div>

        {scene === "identity" ? (
          <div className="mt-3 grid gap-3">
            <label className="block rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
              <span className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
                  <CircleDot size={14} className="text-violet-200/70" /> Isotope mass number
                </span>
                <strong className="font-mono text-[13px] text-white">A = {massNumber}</strong>
              </span>
              <input
                type="range"
                min={Math.max(selected.z, selected.mass - 3)}
                max={selected.mass + 4}
                value={massNumber}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setMassNumber(Number(event.target.value))
                }
                className="mt-3 w-full accent-violet-400"
              />
              <span className="mt-2 block text-[12px] leading-5 text-slate-400/66">
                Isotopes change neutron count while elemental identity stays fixed.
              </span>
            </label>
            <ChargeControl charge={charge} onChange={setCharge} />
          </div>
        ) : null}

        {scene === "shells" ? (
          <div className="mt-3 grid gap-3">
            <div className="rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
              <div className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/62">
                <Orbit size={14} /> Electron structure
              </div>
              <div className="mt-2 text-[14px] font-medium text-white">{selected.configuration}</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {shells.map((count, index) => (
                  <span
                    key={`${index}-${count}`}
                    className="rounded-full border border-cyan-100/[0.10] bg-cyan-300/[0.035] px-2.5 py-1 font-mono text-[11px] text-cyan-100/68"
                  >
                    n={index + 1}: {count}e⁻
                  </span>
                ))}
              </div>
              <p className="mt-3 text-[12px] leading-5 text-slate-400/68">
                The outer occupied shell contains {shells[shells.length - 1] ?? 0} electron{(shells[shells.length - 1] ?? 0) === 1 ? "" : "s"} in this charge state.
              </p>
            </div>
            <ChargeControl charge={charge} onChange={setCharge} />
          </div>
        ) : null}

        {scene === "periodicity" ? (
          <div className="mt-3 grid gap-2">
            <div className="rounded-[14px] border border-white/[0.08] bg-black/[0.17] p-3 text-[12px] leading-5 text-slate-300/68">
              Period {selected.period}, group {selected.group}. The bars are relative trend cues, not tabulated measurements.
            </div>
            <TrendBar label="Atomic radius cue" value={trend.radius} direction="larger down and left" rgb="250,204,21" />
            <TrendBar label="Ionization cue" value={trend.ionization} direction="larger up and right" rgb="52,211,153" />
            <TrendBar label="Electronegativity cue" value={trend.electronegativity} direction="larger toward fluorine" rgb="192,132,252" />
          </div>
        ) : null}
      </Surface>
    </div>
  );
}

function ChargeControl({
  charge,
  onChange,
}: {
  charge: number;
  onChange: (charge: number) => void;
}) {
  return (
    <div className="rounded-[15px] border border-white/[0.08] bg-black/[0.17] p-3">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-[13px] font-medium text-slate-300">
          <Sparkles size={14} className="text-cyan-200/70" /> Net charge
        </span>
        <strong className="font-mono text-[13px] text-white">
          {charge > 0 ? `+${charge}` : charge}
        </strong>
      </div>
      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {[-2, -1, 0, 1, 2].map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`min-h-[38px] rounded-[10px] border text-[13px] font-semibold transition ${
              charge === option
                ? "border-cyan-200/[0.34] bg-cyan-300/[0.08] text-cyan-100"
                : "border-white/[0.07] bg-white/[0.018] text-slate-500 hover:text-white"
            }`}
          >
            {option > 0 ? `+${option}` : option}
          </button>
        ))}
      </div>
    </div>
  );
}

function CountCard({ label, value, rgb }: { label: string; value: number; rgb: string }) {
  return (
    <div className="rounded-[13px] border border-white/[0.08] bg-black/[0.17] p-3 text-center">
      <div className="text-[20px] font-semibold" style={{ color: `rgb(${rgb})` }}>
        {value}
      </div>
      <div className="mt-1 font-mono text-[11px] font-semibold uppercase tracking-[0.07em] text-slate-500">
        {label}
      </div>
    </div>
  );
}

function TrendBar({
  label,
  value,
  direction,
  rgb,
}: {
  label: string;
  value: number;
  direction: string;
  rgb: string;
}) {
  return (
    <div className="rounded-[13px] border border-white/[0.07] bg-black/[0.14] p-3">
      <div className="flex items-center justify-between gap-3 text-[12px]">
        <strong className="text-slate-300">{label}</strong>
        <span className="text-slate-500">{direction}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full"
          style={{ width: `${value}%`, background: `rgb(${rgb})` }}
        />
      </div>
    </div>
  );
}

function buildNucleus(random: () => number, protons: number, neutrons: number): NucleonPoint[] {
  const total = protons + neutrons;
  return Array.from({ length: total }, (_, index) => {
    const angle = index * 2.399963 + random() * 0.22;
    const radius = Math.sqrt((index + 0.5) / Math.max(1, total));
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      proton: index < protons,
      phase: random() * TAU,
    };
  });
}

function drawAtomStage(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  element: ElementRecord,
  massNumber: number,
  charge: number,
  shells: number[],
  nucleons: NucleonPoint[],
  scene: AtomicScene,
) {
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "rgba(2,16,14,0.96)");
  gradient.addColorStop(0.58, "rgba(3,12,20,0.96)");
  gradient.addColorStop(1, "rgba(7,4,18,0.98)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  if (scene === "periodicity") {
    drawPeriodicOverlay(context, width, height, element, time);
  }

  const centerX = width * (scene === "periodicity" ? 0.31 : 0.5);
  const centerY = height * 0.48;
  const minimum = Math.min(width, height);
  const shellStep = minimum * (shells.length > 3 ? 0.105 : 0.125);
  const nucleusRadius = Math.min(50, minimum * 0.13);

  context.save();
  context.globalCompositeOperation = "lighter";
  shells.forEach((count, shellIndex) => {
    const radius = shellStep * (shellIndex + 1);
    const active = scene === "shells" || shellIndex === shells.length - 1;
    context.strokeStyle = `rgba(34,211,238,${active ? 0.24 : 0.11})`;
    context.lineWidth = active ? 1.4 : 1;
    context.beginPath();
    context.ellipse(centerX, centerY, radius, radius * 0.72, -0.12, 0, TAU);
    context.stroke();

    for (let electron = 0; electron < count; electron += 1) {
      const angle =
        electron * (TAU / Math.max(1, count)) +
        time * (0.48 - shellIndex * 0.07) +
        shellIndex * 0.72;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius * 0.72;
      const valence = shellIndex === shells.length - 1;
      const rgb = valence ? "250,204,21" : "34,211,238";
      const glow = context.createRadialGradient(x, y, 0, x, y, valence ? 14 : 11);
      glow.addColorStop(0, `rgba(${rgb},0.90)`);
      glow.addColorStop(1, `rgba(${rgb},0)`);
      context.fillStyle = glow;
      context.beginPath();
      context.arc(x, y, valence ? 14 : 11, 0, TAU);
      context.fill();
      context.fillStyle = `rgba(${rgb},0.94)`;
      context.beginPath();
      context.arc(x, y, valence ? 2.4 : 2, 0, TAU);
      context.fill();
    }
  });

  for (const nucleon of nucleons) {
    const x = centerX + nucleon.x * nucleusRadius + Math.sin(time * 1.5 + nucleon.phase) * 1.8;
    const y = centerY + nucleon.y * nucleusRadius + Math.cos(time * 1.25 + nucleon.phase) * 1.8;
    const rgb = nucleon.proton ? "248,113,113" : "96,165,250";
    context.fillStyle = `rgba(${rgb},0.82)`;
    context.beginPath();
    context.arc(x, y, 2.4, 0, TAU);
    context.fill();
  }
  context.restore();

  context.fillStyle = "rgba(255,255,255,0.88)";
  context.font = "600 13px ui-monospace, monospace";
  context.textAlign = "center";
  context.fillText(`${element.symbol}  Z=${element.z}  A=${massNumber}`, centerX, height - 24);
  context.fillStyle = "rgba(148,163,184,0.62)";
  context.font = "500 11px ui-monospace, monospace";
  context.fillText(
    charge === 0 ? "neutral atom" : `${charge > 0 ? "+" : ""}${charge} ion`,
    centerX,
    height - 8,
  );
}

function drawPeriodicOverlay(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  selected: ElementRecord,
  time: number,
) {
  const cell = Math.min(28, width * 0.03);
  const originX = width * 0.52;
  const originY = height * 0.16;
  context.save();
  for (const element of ELEMENTS) {
    const x = originX + (element.group - 1) * cell;
    const y = originY + (element.period - 1) * cell;
    const active = element.z === selected.z;
    const wave = Math.max(0, 1 - Math.abs(((time * 0.08 + element.group * 0.04) % 1) - 0.5) * 7);
    context.fillStyle = active
      ? "rgba(52,211,153,0.20)"
      : `rgba(167,139,250,${0.025 + wave * 0.045})`;
    context.strokeStyle = active
      ? "rgba(110,231,183,0.75)"
      : "rgba(148,163,184,0.12)";
    context.lineWidth = active ? 2 : 1;
    context.fillRect(x, y, cell - 3, cell - 3);
    context.strokeRect(x, y, cell - 3, cell - 3);
  }
  context.fillStyle = "rgba(196,181,253,0.52)";
  context.font = "600 10px ui-monospace, monospace";
  context.fillText("PERIODIC POSITION", originX, originY - 12);
  context.restore();
}

function adjustShells(neutral: number[], charge: number) {
  const shells = [...neutral];
  if (charge > 0) {
    let remaining = charge;
    for (let index = shells.length - 1; index >= 0 && remaining > 0; index -= 1) {
      const removed = Math.min(shells[index], remaining);
      shells[index] -= removed;
      remaining -= removed;
    }
  } else if (charge < 0) {
    let remaining = -charge;
    const capacities = [2, 8, 8, 18];
    while (remaining > 0) {
      const index = Math.max(0, shells.length - 1);
      const capacity = capacities[index] ?? 18;
      const available = Math.max(0, capacity - shells[index]);
      if (available > 0) {
        const added = Math.min(available, remaining);
        shells[index] += added;
        remaining -= added;
      } else {
        shells.push(0);
      }
    }
  }
  while (shells.length > 1 && shells[shells.length - 1] === 0) shells.pop();
  return shells;
}

function relativeTrends(element: ElementRecord) {
  const horizontal = (element.group - 1) / 17;
  const vertical = (element.period - 1) / 3;
  return {
    radius: Math.round(clamp(72 - horizontal * 52 + vertical * 25, 8, 96)),
    ionization: Math.round(clamp(22 + horizontal * 66 - vertical * 18, 5, 96)),
    electronegativity:
      element.group === 18
        ? 8
        : Math.round(clamp(18 + horizontal * 78 - vertical * 12, 5, 98)),
  };
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
