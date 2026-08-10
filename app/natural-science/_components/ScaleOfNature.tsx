"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
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
import { curriculumRegistry } from "@/lib/curriculum/registry";
import type { CurriculumNode } from "@/lib/curriculum/types";
import { NaturalScienceBackground } from "../NaturalScienceBackground";

type ScalePresentation = {
  exponent: number;
  icon: LucideIcon;
  backgroundId: string;
  shortLabel: string;
  accent: string;
  border: string;
  glow: string;
};

type ScaleEntry = CurriculumNode & ScalePresentation;

const SCALE_PRESENTATION: Record<string, ScalePresentation> = {
  "natural.astronomy": {
    exponent: 26,
    icon: Telescope,
    backgroundId: "astronomy",
    shortLabel: "Cosmic",
    accent: "text-violet-200",
    border: "border-violet-400/35",
    glow: "rgba(167,139,250,0.28)",
  },
  "natural.earth-science": {
    exponent: 7,
    icon: Globe2,
    backgroundId: "earth-science",
    shortLabel: "Planetary",
    accent: "text-amber-200",
    border: "border-amber-400/35",
    glow: "rgba(251,191,36,0.24)",
  },
  "natural.biology": {
    exponent: 0,
    icon: Dna,
    backgroundId: "biology",
    shortLabel: "Living",
    accent: "text-emerald-200",
    border: "border-emerald-400/35",
    glow: "rgba(52,211,153,0.28)",
  },
  "natural.chemistry": {
    exponent: -9,
    icon: FlaskConical,
    backgroundId: "chemistry",
    shortLabel: "Molecular",
    accent: "text-cyan-200",
    border: "border-cyan-400/35",
    glow: "rgba(34,211,238,0.26)",
  },
  "natural.physics": {
    exponent: -15,
    icon: Atom,
    backgroundId: "physics",
    shortLabel: "Subatomic",
    accent: "text-sky-200",
    border: "border-sky-400/35",
    glow: "rgba(56,189,248,0.26)",
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
  if (exponent >= -3) return { label: "Living scale", detail: "organisms · tissues · ecosystems" };
  if (exponent >= -12) return { label: "Molecular scale", detail: "cells · molecules · chemical bonds" };
  return { label: "Fundamental scale", detail: "atoms · nuclei · quantum fields" };
}

function sliderPosition(exponent: number) {
  return ((exponent + 30) / 60) * 100;
}

function naturalScienceEntries(): ScaleEntry[] {
  const naturalDomain = curriculumRegistry
    .allDomains()
    .find((domain) => domain.domainId === "natural");

  if (!naturalDomain) {
    throw new Error("Natural Science is missing from the curriculum registry.");
  }

  const byId = new Map(naturalDomain.children.map((node) => [node.id, node]));

  return SCALE_ORDER.map((id) => {
    const node = byId.get(id);
    const presentation = SCALE_PRESENTATION[id];
    if (!node || !presentation) {
      throw new Error(`Natural Science scale node ${id} is incomplete.`);
    }
    return { ...node, ...presentation };
  });
}

export default function ScaleOfNature() {
  const entries = useMemo(naturalScienceEntries, []);
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
    <main className="relative min-h-screen overflow-hidden bg-[#020704] text-slate-100 selection:bg-emerald-500/30">
      <NaturalScienceBackground activeId={active.backgroundId} />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_50%_38%,rgba(16,185,129,0.07),transparent_32%),linear-gradient(to_bottom,rgba(2,7,4,0.08),rgba(2,7,4,0.90))]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30 [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:34px_34px] [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <header className="mb-5 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-black/25 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-100/60 backdrop-blur-xl transition-colors hover:border-emerald-300/35 hover:text-emerald-100"
          >
            <ArrowLeft size={12} /> Knowledge map
          </Link>
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-100/45 sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_10px_rgba(110,231,183,0.8)]" />
            Empirical field station
          </div>
        </header>

        <section className="relative overflow-hidden rounded-[30px] border border-emerald-200/15 bg-[linear-gradient(145deg,rgba(8,28,20,0.70),rgba(2,8,6,0.80))] shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_30px_100px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(52,211,153,0.10),transparent_28%),radial-gradient(circle_at_80%_100%,rgba(34,211,238,0.08),transparent_28%)]" />

          <div className="relative grid min-h-[720px] lg:grid-cols-[0.92fr_1.45fr]">
            <div className="flex flex-col justify-between border-b border-white/[0.08] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
              <div>
                <div className="mb-5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/55">
                  <Microscope size={13} /> Domain // Natural Sciences
                </div>
                <h1 className="max-w-xl text-5xl font-medium leading-[0.92] tracking-[-0.045em] text-[#f4fbf6] sm:text-6xl lg:text-7xl">
                  The scale<br />of nature.
                </h1>
                <p className="mt-6 max-w-lg text-sm leading-6 text-slate-400 sm:text-base sm:leading-7">
                  One universe, studied at radically different magnitudes. Move through sixty orders of magnitude and watch the scientific lens change with the scale.
                </p>
              </div>

              <div className="mt-10 rounded-2xl border border-white/10 bg-black/25 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">Current magnitude</div>
                    <div className="mt-2 font-mono text-4xl font-light tracking-[-0.04em] text-white">
                      10{superscript(exponent)} <span className="text-base text-slate-500">m</span>
                    </div>
                  </div>
                  <div className="rounded-xl border border-emerald-300/15 bg-emerald-300/5 p-3 text-emerald-200">
                    <Orbit size={22} />
                  </div>
                </div>
                <div className="mt-5 border-t border-white/[0.08] pt-4">
                  <strong className="text-sm font-semibold text-emerald-100">{activeBand.label}</strong>
                  <p className="mt-1 text-xs leading-5 text-slate-500">{activeBand.detail}</p>
                </div>
              </div>
            </div>

            <div className="flex min-w-0 flex-col p-5 sm:p-7 lg:p-9">
              <div className="flex flex-1 flex-col rounded-[24px] border border-white/10 bg-black/20 p-5 sm:p-7">
                <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
                  <div className="relative flex min-h-[260px] items-center justify-center overflow-hidden rounded-[22px] border border-white/10 bg-black/25">
                    <div
                      className="absolute h-56 w-56 rounded-full blur-3xl transition-all duration-700"
                      style={{ background: active.glow }}
                    />
                    <div className="absolute h-52 w-52 rounded-full border border-white/10" />
                    <div className="absolute h-40 w-40 rounded-full border border-white/[0.08]" />
                    <div className="absolute h-28 w-28 rounded-full border border-white/10 bg-black/35 shadow-[inset_0_0_35px_rgba(0,0,0,0.6)]" />
                    <ActiveIcon size={56} strokeWidth={1.25} className={`relative z-10 drop-shadow-[0_0_20px_currentColor] ${active.accent}`} />
                    <div className="absolute bottom-4 left-4 rounded-lg border border-white/10 bg-black/35 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-slate-500 backdrop-blur-lg">
                      observing // {active.shortLabel.toLowerCase()}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-200/55">Nearest scientific lens</div>
                    <h2 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">{active.label}</h2>
                    <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                      {active.description ?? "Explore this scale of the natural world."}
                    </p>
                    <Link
                      href={active.href}
                      className="mt-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/25 bg-emerald-300/10 px-4 py-2.5 text-sm font-semibold text-emerald-100 transition-all hover:border-emerald-200/50 hover:bg-emerald-300/15"
                    >
                      Enter {active.label} <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/[0.08] pt-7">
                  <div className="mb-4 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-slate-600">
                    <span>10⁻³⁰ m // micro</span>
                    <span>drag magnitude</span>
                    <span>macro // 10³⁰ m</span>
                  </div>

                  <div className="relative px-1 pb-11 pt-4">
                    <div className="absolute left-1 right-1 top-[25px] h-px bg-gradient-to-r from-sky-400/20 via-emerald-300/50 to-violet-400/25" />

                    {entries.map((entry) => {
                      const MarkerIcon = entry.icon;
                      const left = sliderPosition(entry.exponent);
                      const selected = active.id === entry.id;
                      return (
                        <button
                          key={entry.id}
                          type="button"
                          onClick={() => jumpTo(entry)}
                          className="group absolute top-[13px] -translate-x-1/2"
                          style={{ left: `${left}%` }}
                          aria-label={`Jump to ${entry.label}, 10 to the ${entry.exponent} meters`}
                        >
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-full border bg-[#06110c] transition-all ${selected ? `${entry.border} scale-110 text-white shadow-[0_0_16px_rgba(110,231,183,0.35)]` : "border-white/15 text-slate-600 group-hover:border-white/30 group-hover:text-slate-300"}`}
                          >
                            <MarkerIcon size={11} />
                          </span>
                          <span className={`absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.12em] transition-colors ${selected ? entry.accent : "text-slate-700 group-hover:text-slate-500"}`}>
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
                      className="relative z-20 h-8 w-full cursor-ew-resize appearance-none bg-transparent accent-emerald-300 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-emerald-100 [&::-moz-range-thumb]:bg-emerald-300 [&::-webkit-slider-runnable-track]:h-1 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-white/10 [&::-webkit-slider-thumb]:mt-[-6px] [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-emerald-100 [&::-webkit-slider-thumb]:bg-emerald-300 [&::-webkit-slider-thumb]:shadow-[0_0_18px_rgba(110,231,183,0.8)]"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 hidden grid-cols-5 gap-2 lg:grid">
                {entries.map((entry) => {
                  const Icon = entry.icon;
                  const selected = active.id === entry.id;
                  return (
                    <button
                      type="button"
                      key={entry.id}
                      onClick={() => jumpTo(entry)}
                      className={`rounded-xl border p-3 text-left transition-all ${selected ? `${entry.border} bg-white/[0.08]` : "border-white/[0.08] bg-black/15 hover:border-white/15 hover:bg-white/5"}`}
                    >
                      <Icon size={15} className={selected ? entry.accent : "text-slate-600"} />
                      <div className="mt-3 text-xs font-semibold text-slate-200">{entry.label}</div>
                      <div className="mt-1 font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">10{superscript(entry.exponent)} m</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-5 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-[24px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl sm:p-7">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200/55">
              <Sparkles size={12} /> How natural science knows
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-4">
              {["Observe", "Hypothesize", "Test", "Revise"].map((step, index) => (
                <div key={step} className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">
                  <span className="font-mono text-[9px] text-emerald-300/50">0{index + 1}</span>
                  <div className="mt-2 text-sm font-semibold text-slate-200">{step}</div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-[24px] border border-white/10 bg-black/25 p-6 backdrop-blur-xl sm:p-7">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-cyan-200/55">
              <Atom size={12} /> One reality, many lenses
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              These fields overlap rather than stack into isolated boxes. Physics constrains chemistry; chemistry enables life; life reshapes Earth; every one of them unfolds inside the same astronomical universe.
            </p>
          </article>
        </section>

        <div className="mt-5 grid gap-3 lg:hidden">
          {entries.map((entry) => {
            const Icon = entry.icon;
            return (
              <Link
                key={entry.id}
                href={entry.href}
                className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 p-4 backdrop-blur-xl transition-colors hover:border-emerald-300/25"
              >
                <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border bg-black/30 ${entry.border} ${entry.accent}`}>
                  <Icon size={20} />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm text-white">{entry.label}</strong>
                  <span className="mt-1 block truncate text-xs text-slate-500">{entry.description}</span>
                </span>
                <span className="font-mono text-[9px] text-slate-600">10{superscript(entry.exponent)}m</span>
                <ArrowRight size={14} className="text-emerald-300/50" />
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
