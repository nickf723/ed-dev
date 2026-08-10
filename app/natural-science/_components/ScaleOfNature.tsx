"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Dna,
  FlaskConical,
  Globe2,
  Microscope,
  Orbit,
  Sparkles,
  Telescope,
  type LucideIcon,
} from "lucide-react";
import { NaturalScienceBackground } from "../NaturalScienceBackground";

export type NaturalScienceScaleNode = {
  id: string;
  label: string;
  href: string;
  description?: string;
};

type ScalePresentation = {
  exponent: number;
  icon: LucideIcon;
  backgroundId: string;
  shortLabel: string;
  rgb: string;
  accent: string;
  border: string;
  soft: string;
};

type ScaleEntry = NaturalScienceScaleNode & ScalePresentation;

const SCALE_PRESENTATION: Record<string, ScalePresentation> = {
  "natural.astronomy": {
    exponent: 26,
    icon: Telescope,
    backgroundId: "astronomy",
    shortLabel: "Cosmic",
    rgb: "167, 139, 250",
    accent: "text-violet-200",
    border: "border-violet-400/45",
    soft: "bg-violet-400/10",
  },
  "natural.earth-science": {
    exponent: 7,
    icon: Globe2,
    backgroundId: "earth-science",
    shortLabel: "Planetary",
    rgb: "251, 191, 36",
    accent: "text-amber-200",
    border: "border-amber-400/45",
    soft: "bg-amber-400/10",
  },
  "natural.biology": {
    exponent: 0,
    icon: Dna,
    backgroundId: "biology",
    shortLabel: "Living",
    rgb: "52, 211, 153",
    accent: "text-emerald-200",
    border: "border-emerald-400/45",
    soft: "bg-emerald-400/10",
  },
  "natural.chemistry": {
    exponent: -9,
    icon: FlaskConical,
    backgroundId: "chemistry",
    shortLabel: "Molecular",
    rgb: "34, 211, 238",
    accent: "text-cyan-200",
    border: "border-cyan-400/45",
    soft: "bg-cyan-400/10",
  },
  "natural.physics": {
    exponent: -15,
    icon: Atom,
    backgroundId: "physics",
    shortLabel: "Fundamental",
    rgb: "56, 189, 248",
    accent: "text-sky-200",
    border: "border-sky-400/45",
    soft: "bg-sky-400/10",
  },
};

const SCALE_ORDER = [
  "natural.astronomy",
  "natural.earth-science",
  "natural.biology",
  "natural.chemistry",
  "natural.physics",
] as const;

const SUPERSCRIPT: Record<string, string> = {
  "-": "⁻",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function superscript(value: number) {
  return String(value)
    .split("")
    .map((character) => SUPERSCRIPT[character] ?? character)
    .join("");
}

function scaleBand(exponent: number) {
  if (exponent >= 18) return { label: "Cosmic structures", detail: "galaxies · clusters · observable universe" };
  if (exponent >= 5) return { label: "Planetary systems", detail: "worlds · geology · atmosphere" };
  if (exponent >= -3) return { label: "Living systems", detail: "organisms · tissues · ecosystems" };
  if (exponent >= -12) return { label: "Molecular systems", detail: "cells · molecules · chemical bonds" };
  return { label: "Fundamental systems", detail: "atoms · nuclei · quantum fields" };
}

function sliderPosition(exponent: number) {
  return ((exponent + 30) / 60) * 100;
}

function scaleEntries(nodes: readonly NaturalScienceScaleNode[]): ScaleEntry[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  return SCALE_ORDER.map((id) => {
    const node = byId.get(id);
    const presentation = SCALE_PRESENTATION[id];
    if (!node || !presentation) {
      throw new Error(`Natural Science scale node ${id} is incomplete.`);
    }
    return { ...node, ...presentation };
  });
}

export default function ScaleOfNature({ nodes }: { nodes: readonly NaturalScienceScaleNode[] }) {
  const entries = scaleEntries(nodes);
  const [exponent, setExponent] = useState(0);

  const active = entries.reduce((closest, entry) =>
    Math.abs(entry.exponent - exponent) < Math.abs(closest.exponent - exponent)
      ? entry
      : closest,
  );
  const activeBand = scaleBand(exponent);
  const ActiveIcon = active.icon;

  const jumpTo = (entry: ScaleEntry) => setExponent(entry.exponent);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#010604] text-slate-100 selection:bg-emerald-400/30">
      <NaturalScienceBackground activeId={active.backgroundId} />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_15%,rgba(16,185,129,0.18),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(34,197,94,0.10),transparent_32%),linear-gradient(to_bottom,rgba(1,8,5,0.06),rgba(1,7,4,0.74))]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-25 [background-image:radial-gradient(circle_at_center,rgba(167,243,208,0.16)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-4 pb-10 pt-5 sm:px-6 lg:px-8 lg:pb-14 lg:pt-7">
        <header className="relative pb-8 pt-2 sm:pb-10 lg:pb-12">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-black/20 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-100/70 backdrop-blur-lg transition-all hover:border-emerald-300/45 hover:bg-emerald-400/10 hover:text-emerald-50"
            >
              <ArrowLeft size={12} /> Knowledge map
            </Link>
            <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-100/55 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.95)]" />
              Empirical sciences
            </div>
          </div>

          <div className="mt-9 grid items-end gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)] lg:gap-12">
            <div>
              <div className="mb-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-emerald-300/70">
                <Microscope size={13} /> Domain 02
              </div>
              <h1 className="text-[clamp(3.7rem,8vw,7.8rem)] font-semibold leading-[0.78] tracking-[-0.065em] text-[#f4fff8] drop-shadow-[0_0_32px_rgba(16,185,129,0.10)]">
                Natural
                <span className="block bg-gradient-to-r from-emerald-200 via-green-300 to-cyan-200 bg-clip-text text-transparent">
                  Sciences
                </span>
              </h1>
            </div>
            <div className="max-w-xl border-l border-emerald-300/25 pl-5 lg:mb-1 lg:pl-7">
              <p className="text-sm leading-6 text-slate-300/80 sm:text-base sm:leading-7">
                Study one physical universe through different lenses. Change the magnitude and the dominant scientific field changes with it.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-100/45">
                <span>observe</span><span className="text-emerald-400/40">•</span>
                <span>measure</span><span className="text-emerald-400/40">•</span>
                <span>model</span><span className="text-emerald-400/40">•</span>
                <span>test</span>
              </div>
            </div>
          </div>
        </header>

        <section className="grid items-center gap-6 xl:grid-cols-[260px_minmax(460px,1fr)_310px] xl:gap-8">
          <aside className="order-2 rounded-[22px] border border-emerald-300/15 bg-black/20 p-5 backdrop-blur-xl xl:order-1 xl:bg-black/15">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-200/55">Current magnitude</div>
            <div className="mt-3 whitespace-nowrap font-mono text-4xl font-light tracking-[-0.05em] text-white xl:text-5xl">
              10{superscript(exponent)} <span className="text-sm text-slate-500">m</span>
            </div>
            <div className="mt-5 h-px bg-gradient-to-r from-emerald-300/35 to-transparent" />
            <div className="mt-5">
              <strong className="text-sm font-semibold text-emerald-100">{activeBand.label}</strong>
              <p className="mt-1 text-xs leading-5 text-slate-500">{activeBand.detail}</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-2 font-mono text-[8px] uppercase tracking-[0.13em] text-slate-600">
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2">min<br/><b className="mt-1 block text-slate-400">10⁻³⁰m</b></div>
              <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2">max<br/><b className="mt-1 block text-slate-400">10³⁰m</b></div>
            </div>
          </aside>

          <div className="order-1 flex min-w-0 items-center justify-center xl:order-2">
            <div className="relative flex aspect-square w-full max-w-[560px] items-center justify-center">
              <div className="absolute inset-[3%] rounded-full border border-emerald-300/15 shadow-[0_0_80px_rgba(16,185,129,0.10)]" />
              <div className="absolute inset-[12%] rounded-full border border-dashed border-emerald-200/15" />
              <div className="absolute inset-[23%] rounded-full border border-white/10" />
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-200/10 to-transparent" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-200/10 to-transparent" />

              <div
                className="absolute inset-[15%] rounded-full blur-3xl transition-all duration-700"
                style={{ background: `radial-gradient(circle, rgba(${active.rgb},0.34), rgba(${active.rgb},0.06) 52%, transparent 72%)` }}
              />

              <div
                className="relative flex h-[54%] w-[54%] flex-col items-center justify-center rounded-full border bg-black/35 text-center shadow-[inset_0_0_55px_rgba(0,0,0,0.72)] backdrop-blur-xl transition-all duration-700"
                style={{
                  borderColor: `rgba(${active.rgb},0.48)`,
                  boxShadow: `inset 0 0 55px rgba(0,0,0,0.72), 0 0 72px rgba(${active.rgb},0.18)`,
                }}
              >
                <div className="font-mono text-[8px] uppercase tracking-[0.22em] text-emerald-100/45">Magnitude viewer</div>
                <div
                  className="mt-5 flex h-20 w-20 items-center justify-center rounded-[26px] border bg-black/25 transition-all duration-500 sm:h-24 sm:w-24"
                  style={{ borderColor: `rgba(${active.rgb},0.42)`, background: `rgba(${active.rgb},0.08)` }}
                >
                  <ActiveIcon size={48} strokeWidth={1.25} className={`drop-shadow-[0_0_22px_currentColor] ${active.accent}`} />
                </div>
                <div className="mt-5 font-mono text-3xl font-light tracking-[-0.05em] text-white sm:text-4xl">
                  10{superscript(exponent)}<span className="ml-1 text-xs text-slate-500">m</span>
                </div>
                <div className={`mt-2 font-mono text-[9px] uppercase tracking-[0.18em] ${active.accent}`}>
                  {active.shortLabel} lens
                </div>
              </div>

              <div className="absolute left-[9%] top-[17%] h-2 w-2 rounded-full bg-emerald-300/70 shadow-[0_0_14px_rgba(110,231,183,0.8)]" />
              <div className="absolute bottom-[16%] right-[11%] h-1.5 w-1.5 rounded-full bg-cyan-200/60 shadow-[0_0_12px_rgba(165,243,252,0.7)]" />
            </div>
          </div>

          <aside
            className="order-3 overflow-hidden rounded-[22px] border bg-black/20 p-5 backdrop-blur-xl transition-all duration-700 xl:bg-black/15"
            style={{
              borderColor: `rgba(${active.rgb},0.30)`,
              boxShadow: `0 18px 60px rgba(0,0,0,0.22), 0 0 45px rgba(${active.rgb},0.07)`,
            }}
          >
            <div className={`flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] ${active.accent}`}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${active.rgb})`, boxShadow: `0 0 10px rgba(${active.rgb},0.8)` }} />
              Closest field
            </div>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-white xl:text-4xl">{active.label}</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              {active.description ?? "Explore this scale of the natural world."}
            </p>
            <div className="mt-5 rounded-xl border border-white/[0.07] bg-white/[0.025] px-4 py-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-slate-600">Anchor scale</div>
              <div className={`mt-1 font-mono text-sm ${active.accent}`}>10{superscript(active.exponent)} meters</div>
            </div>
            <Link
              href={active.href}
              className={`mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${active.border} ${active.soft} ${active.accent}`}
            >
              Explore {active.label} <ArrowRight size={15} />
            </Link>
          </aside>
        </section>

        <section className="mt-8 rounded-[22px] border border-emerald-300/15 bg-black/20 px-4 pb-5 pt-4 backdrop-blur-xl sm:px-6 sm:pb-6">
          <div className="mb-3 flex items-center justify-between gap-4 font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-100/45 sm:text-[9px]">
            <span>micro // 10⁻³⁰m</span>
            <span className="hidden sm:block">drag across sixty orders of magnitude</span>
            <span>10³⁰m // macro</span>
          </div>

          <div className="relative px-1 pb-12 pt-4">
            <div className="absolute left-1 right-1 top-[25px] h-1 rounded-full bg-gradient-to-r from-sky-400/35 via-cyan-300/35 via-emerald-300/55 to-violet-400/35 shadow-[0_0_18px_rgba(52,211,153,0.10)]" />

            {entries.map((entry) => {
              const MarkerIcon = entry.icon;
              const left = sliderPosition(entry.exponent);
              const selected = active.id === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => jumpTo(entry)}
                  className="group absolute top-[10px] z-30 -translate-x-1/2"
                  style={{ left: `${left}%` }}
                  aria-label={`Jump to ${entry.label}, 10 to the ${entry.exponent} meters`}
                >
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-full border bg-[#041009] transition-all ${selected ? `${entry.border} scale-110 ${entry.accent}` : "border-white/15 text-slate-600 group-hover:border-white/35 group-hover:text-slate-300"}`}
                    style={selected ? { boxShadow: `0 0 22px rgba(${entry.rgb},0.40)`, background: `rgba(${entry.rgb},0.12)` } : undefined}
                  >
                    <MarkerIcon size={13} />
                  </span>
                  <span className={`absolute left-1/2 top-10 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.11em] transition-colors ${selected ? entry.accent : "text-slate-700 group-hover:text-slate-500"}`}>
                    {entry.label}
                  </span>
                </button>
              );
            })}

            <input
              aria-label="Scale of nature magnitude"
              type="range"
              min={-30}
              max={30}
              step={1}
              value={exponent}
              onChange={(event) => setExponent(Number(event.target.value))}
              className="relative z-20 h-8 w-full cursor-ew-resize appearance-none bg-transparent accent-emerald-300 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-50 [&::-moz-range-thumb]:bg-emerald-300 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-transparent [&::-webkit-slider-thumb]:mt-[-8px] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-50 [&::-webkit-slider-thumb]:bg-emerald-300 [&::-webkit-slider-thumb]:shadow-[0_0_22px_rgba(110,231,183,0.95)]"
            />
          </div>
        </section>

        <section className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {entries.map((entry) => {
            const Icon = entry.icon;
            const selected = active.id === entry.id;
            return (
              <button
                type="button"
                key={entry.id}
                onClick={() => jumpTo(entry)}
                className={`group relative overflow-hidden rounded-[18px] border p-4 text-left backdrop-blur-lg transition-all ${selected ? entry.border : "border-white/10 hover:border-white/20"}`}
                style={{
                  background: selected
                    ? `linear-gradient(145deg, rgba(${entry.rgb},0.17), rgba(0,0,0,0.28))`
                    : `linear-gradient(145deg, rgba(${entry.rgb},0.055), rgba(0,0,0,0.20))`,
                  boxShadow: selected ? `0 0 34px rgba(${entry.rgb},0.10)` : undefined,
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl border ${entry.border} ${entry.soft} ${entry.accent}`}>
                    <Icon size={18} />
                  </span>
                  <span className={`font-mono text-[8px] uppercase tracking-[0.13em] ${selected ? entry.accent : "text-slate-600"}`}>10{superscript(entry.exponent)}m</span>
                </div>
                <div className="mt-4 text-sm font-semibold text-white">{entry.label}</div>
                <div className={`mt-1 font-mono text-[8px] uppercase tracking-[0.13em] ${entry.accent}`}>{entry.shortLabel}</div>
              </button>
            );
          })}
        </section>

        <section className="mt-8 grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-[20px] border border-emerald-300/12 bg-black/15 p-5 backdrop-blur-lg sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200/60">
              <Sparkles size={12} /> Evidence loop
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-300">
              {["Observe", "Hypothesize", "Test", "Revise"].map((step, index) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="rounded-full border border-emerald-300/15 bg-emerald-300/5 px-3 py-2"><b className="mr-2 font-mono text-[8px] text-emerald-300/50">0{index + 1}</b>{step}</span>
                  {index < 3 ? <ArrowRight size={12} className="hidden text-emerald-300/30 sm:block" /> : null}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[20px] border border-cyan-300/12 bg-black/15 p-5 backdrop-blur-lg sm:p-6">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/60">
              <Orbit size={12} /> One universe
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-400">
              The boundaries are lenses, not walls. Physics shapes chemistry; chemistry enables life; life alters Earth; every scale unfolds inside the same cosmos.
            </p>
          </article>
        </section>
      </div>
    </main>
  );
}
