"use client";

import Link from "next/link";
import {
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
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
    rgb: "168, 85, 247",
    accent: "text-purple-300",
    border: "border-purple-400/65",
    soft: "bg-purple-500/15",
  },
  "natural.earth-science": {
    exponent: 7,
    icon: Globe2,
    backgroundId: "earth-science",
    shortLabel: "Planetary",
    rgb: "59, 130, 246",
    accent: "text-blue-300",
    border: "border-blue-400/65",
    soft: "bg-blue-500/15",
  },
  "natural.biology": {
    exponent: 0,
    icon: Dna,
    backgroundId: "biology",
    shortLabel: "Living",
    rgb: "34, 197, 94",
    accent: "text-green-300",
    border: "border-green-400/65",
    soft: "bg-green-500/15",
  },
  "natural.chemistry": {
    exponent: -9,
    icon: FlaskConical,
    backgroundId: "chemistry",
    shortLabel: "Molecular",
    rgb: "250, 204, 21",
    accent: "text-yellow-300",
    border: "border-yellow-400/65",
    soft: "bg-yellow-500/15",
  },
  "natural.physics": {
    exponent: -15,
    icon: Atom,
    backgroundId: "physics",
    shortLabel: "Fundamental",
    rgb: "239, 68, 68",
    accent: "text-red-300",
    border: "border-red-400/65",
    soft: "bg-red-500/15",
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

function verticalPosition(exponent: number) {
  return ((30 - exponent) / 60) * 100;
}

function clampExponent(value: number) {
  return Math.max(-30, Math.min(30, Math.round(value)));
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
  const railRef = useRef<HTMLDivElement>(null);

  const active = entries.reduce((closest, entry) =>
    Math.abs(entry.exponent - exponent) < Math.abs(closest.exponent - exponent)
      ? entry
      : closest,
  );
  const activeBand = scaleBand(exponent);
  const ActiveIcon = active.icon;

  const jumpTo = (entry: ScaleEntry) => setExponent(entry.exponent);

  const setFromClientY = (clientY: number) => {
    const rail = railRef.current;
    if (!rail) return;
    const rect = rail.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
    setExponent(clampExponent(30 - ratio * 60));
  };

  const handleRailPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientY(event.clientY);
  };

  const handleRailPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      setFromClientY(event.clientY);
    }
  };

  const handleRailKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    const increments: Record<string, number> = {
      ArrowUp: 1,
      ArrowRight: 1,
      ArrowDown: -1,
      ArrowLeft: -1,
      PageUp: 5,
      PageDown: -5,
    };

    if (event.key === "Home") {
      event.preventDefault();
      setExponent(30);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      setExponent(-30);
      return;
    }

    const increment = increments[event.key];
    if (increment !== undefined) {
      event.preventDefault();
      setExponent((current) => clampExponent(current + increment));
    }
  };

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#010604] text-slate-100 selection:bg-emerald-400/30 lg:h-screen lg:overflow-hidden">
      <NaturalScienceBackground activeId={active.backgroundId} />

      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(circle_at_18%_15%,rgba(16,185,129,0.16),transparent_30%),radial-gradient(circle_at_82%_82%,rgba(34,197,94,0.08),transparent_34%),linear-gradient(to_bottom,rgba(1,8,5,0.04),rgba(1,7,4,0.68))]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20 [background-image:radial-gradient(circle_at_center,rgba(167,243,208,0.16)_1px,transparent_1px)] [background-size:42px_42px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1520px] flex-col px-4 py-4 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-5">
        <header className="shrink-0">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-black/20 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-100/70 backdrop-blur-lg transition-all hover:border-emerald-300/45 hover:bg-emerald-400/10 hover:text-emerald-50"
            >
              <ArrowLeft size={12} /> Knowledge map
            </Link>
            <div className="hidden items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-100/55 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_14px_rgba(110,231,183,0.95)]" />
              Empirical sciences
            </div>
          </div>

          <div className="mt-4 grid items-end gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] lg:gap-10">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-emerald-300/70">
                <Microscope size={12} /> Domain 02
              </div>
              <h1 className="text-[clamp(3.2rem,6vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.06em] text-[#f4fff8] drop-shadow-[0_0_32px_rgba(16,185,129,0.12)]">
                Natural <span className="bg-gradient-to-r from-emerald-200 via-green-300 to-cyan-200 bg-clip-text text-transparent">Sciences</span>
              </h1>
            </div>
            <div className="max-w-xl border-l border-emerald-300/25 pl-5 lg:mb-1 lg:pl-6">
              <p className="text-sm leading-6 text-slate-300/80">
                One physical universe, viewed through different scientific lenses. Change the magnitude and the dominant field changes with it.
              </p>
            </div>
          </div>
        </header>

        <section className="mt-4 grid min-h-0 flex-1 gap-4 xl:grid-cols-[290px_minmax(360px,1fr)_320px]">
          <aside className="hidden min-h-0 flex-col rounded-[24px] border border-emerald-300/16 bg-black/18 p-4 backdrop-blur-xl xl:flex">
            <div className="flex items-end justify-between gap-3 border-b border-white/[0.07] pb-3">
              <div>
                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-emerald-200/55">Scale of nature</div>
                <div className="mt-1 text-sm font-semibold text-white">Navigate by magnitude</div>
              </div>
              <div className="text-right font-mono text-[8px] uppercase tracking-[0.12em] text-slate-600">
                +30<br />to<br />−30
              </div>
            </div>

            <div className="relative mt-3 min-h-[430px] flex-1">
              <div className="absolute inset-y-7 left-0 right-0">
                <div
                  ref={railRef}
                  role="slider"
                  tabIndex={0}
                  aria-label="Scale of nature magnitude"
                  aria-valuemin={-30}
                  aria-valuemax={30}
                  aria-valuenow={exponent}
                  onPointerDown={handleRailPointerDown}
                  onPointerMove={handleRailPointerMove}
                  onKeyDown={handleRailKeyDown}
                  className="absolute left-2 top-0 z-20 h-full w-7 cursor-ns-resize touch-none rounded-full outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/70"
                >
                  <div
                    className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 rounded-full shadow-[0_0_16px_rgba(52,211,153,0.15)]"
                    style={{
                      background:
                        "linear-gradient(to bottom, #a855f7 0%, #3b82f6 32%, #22c55e 50%, #facc15 65%, #ef4444 76%, rgba(239,68,68,0.16) 100%)",
                    }}
                  />

                  <span
                    className="absolute left-1/2 z-40 flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-[#07100b] transition-[top,box-shadow,border-color] duration-150"
                    style={{
                      top: `${verticalPosition(exponent)}%`,
                      borderColor: `rgb(${active.rgb})`,
                      boxShadow: `0 0 22px rgba(${active.rgb},0.9)`,
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${active.rgb})` }} />
                  </span>
                </div>

                {entries.map((entry) => {
                  const Icon = entry.icon;
                  const selected = active.id === entry.id;
                  return (
                    <button
                      key={entry.id}
                      type="button"
                      onClick={() => jumpTo(entry)}
                      className="group absolute left-14 right-0 -translate-y-1/2 text-left"
                      style={{ top: `${verticalPosition(entry.exponent)}%` }}
                    >
                      <span
                        className="absolute -left-[42px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 bg-[#041009] transition-all"
                        style={{
                          borderColor: `rgba(${entry.rgb},${selected ? 1 : 0.55})`,
                          background: selected ? `rgb(${entry.rgb})` : "#041009",
                          boxShadow: selected ? `0 0 16px rgba(${entry.rgb},0.75)` : undefined,
                        }}
                      />
                      <span
                        className="absolute -left-[30px] top-1/2 h-px w-7 -translate-y-1/2"
                        style={{ background: `rgba(${entry.rgb},${selected ? 0.65 : 0.22})` }}
                      />

                      <span
                        className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 transition-all ${selected ? entry.border : "border-white/[0.08] hover:border-white/20"}`}
                        style={{
                          background: selected
                            ? `linear-gradient(110deg, rgba(${entry.rgb},0.19), rgba(0,0,0,0.18))`
                            : `rgba(${entry.rgb},0.035)`,
                          boxShadow: selected ? `0 0 28px rgba(${entry.rgb},0.10)` : undefined,
                        }}
                      >
                        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${entry.border} ${entry.soft} ${entry.accent}`}>
                          <Icon size={15} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <strong className="block truncate text-xs font-semibold text-white">{entry.label}</strong>
                          <span className={`mt-0.5 block font-mono text-[7px] uppercase tracking-[0.12em] ${entry.accent}`}>
                            {entry.shortLabel} · 10{superscript(entry.exponent)}m
                          </span>
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <span className="absolute left-0 top-0 font-mono text-[7px] uppercase tracking-[0.16em] text-purple-300/60">macro // 10³⁰m</span>
              <span className="absolute bottom-0 left-0 font-mono text-[7px] uppercase tracking-[0.16em] text-red-300/55">micro // 10⁻³⁰m</span>
            </div>
          </aside>

          <div className="flex min-h-0 items-center justify-center">
            <div className="relative flex w-[min(100%,59vh)] min-w-[290px] max-w-[620px] aspect-square items-center justify-center">
              <div className="absolute inset-[2%] rounded-full border border-emerald-300/18 shadow-[0_0_110px_rgba(16,185,129,0.12)]" />
              <div className="absolute inset-[10%] rounded-full border border-dashed border-emerald-200/16" />
              <div className="absolute inset-[20%] rounded-full border border-white/10" />
              <div className="absolute inset-[30%] rounded-full border border-white/[0.07]" />
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-emerald-200/12 to-transparent" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-emerald-200/12 to-transparent" />

              <div
                className="absolute inset-[10%] rounded-full blur-3xl transition-all duration-700"
                style={{ background: `radial-gradient(circle, rgba(${active.rgb},0.52), rgba(${active.rgb},0.09) 48%, transparent 72%)` }}
              />

              <div
                className="relative flex h-[58%] w-[58%] flex-col items-center justify-center rounded-full border bg-black/38 text-center backdrop-blur-xl transition-all duration-700"
                style={{
                  borderColor: `rgba(${active.rgb},0.72)`,
                  boxShadow: `inset 0 0 68px rgba(0,0,0,0.76), 0 0 100px rgba(${active.rgb},0.28)`,
                }}
              >
                <div className="font-mono text-[8px] uppercase tracking-[0.24em] text-emerald-100/50">Magnitude viewer</div>
                <div
                  className="mt-4 flex h-20 w-20 items-center justify-center rounded-[26px] border sm:h-24 sm:w-24"
                  style={{ borderColor: `rgba(${active.rgb},0.72)`, background: `rgba(${active.rgb},0.18)` }}
                >
                  <ActiveIcon size={52} strokeWidth={1.2} className={`drop-shadow-[0_0_28px_currentColor] ${active.accent}`} />
                </div>
                <div className="mt-4 font-mono text-4xl font-light tracking-[-0.055em] text-white sm:text-5xl">
                  10{superscript(exponent)}<span className="ml-1 text-xs text-slate-500">m</span>
                </div>
                <div className={`mt-2 text-sm font-semibold ${active.accent}`}>{active.label}</div>
                <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.16em] text-slate-500">{activeBand.label}</div>
              </div>

              <div className="absolute left-[8%] top-[16%] h-2.5 w-2.5 rounded-full bg-emerald-300/75 shadow-[0_0_16px_rgba(110,231,183,0.9)]" />
              <div className="absolute bottom-[14%] right-[10%] h-2 w-2 rounded-full" style={{ background: `rgba(${active.rgb},0.85)`, boxShadow: `0 0 16px rgba(${active.rgb},0.7)` }} />
            </div>
          </div>

          <aside className="flex min-h-0 flex-col gap-3">
            <article
              className="relative overflow-hidden rounded-[24px] border bg-black/22 p-5 backdrop-blur-xl"
              style={{
                borderColor: `rgba(${active.rgb},0.48)`,
                boxShadow: `0 18px 60px rgba(0,0,0,0.24), 0 0 54px rgba(${active.rgb},0.10)`,
              }}
            >
              <div className="absolute right-0 top-0 h-36 w-36 rounded-full blur-3xl" style={{ background: `rgba(${active.rgb},0.18)` }} />
              <div className={`relative flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] ${active.accent}`}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: `rgb(${active.rgb})`, boxShadow: `0 0 10px rgba(${active.rgb},0.9)` }} />
                Active scientific lens
              </div>
              <h2 className="relative mt-3 text-3xl font-semibold tracking-[-0.04em] text-white">{active.label}</h2>
              <p className="relative mt-3 text-sm leading-5 text-slate-400">
                {active.description ?? "Explore this scale of the natural world."}
              </p>
              <div className="relative mt-4 flex items-center justify-between rounded-xl border border-white/[0.08] bg-black/25 px-3 py-2.5">
                <span>
                  <span className="block font-mono text-[7px] uppercase tracking-[0.14em] text-slate-600">Anchor</span>
                  <span className={`mt-0.5 block font-mono text-xs ${active.accent}`}>10{superscript(active.exponent)} meters</span>
                </span>
                <span className={`rounded-lg border px-2 py-1 font-mono text-[7px] uppercase tracking-[0.12em] ${active.border} ${active.soft} ${active.accent}`}>
                  {active.shortLabel}
                </span>
              </div>
              <Link
                href={active.href}
                className={`relative mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${active.border} ${active.soft} ${active.accent}`}
              >
                Explore {active.label} <ArrowRight size={14} />
              </Link>
            </article>

            <article className="flex-1 rounded-[24px] border border-emerald-300/14 bg-black/16 p-4 backdrop-blur-xl">
              <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.18em] text-emerald-200/60">
                <Sparkles size={11} /> How to read the instrument
              </div>

              <div className="mt-4 border-t border-white/[0.07] pt-3">
                <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-slate-600">Evidence cycle</div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[10px] text-slate-300">
                  {["Observe", "Measure", "Test", "Revise"].map((step, index) => (
                    <span key={step} className="flex items-center gap-1.5">
                      <span className="rounded-full border border-emerald-300/16 bg-emerald-300/5 px-2 py-1">{step}</span>
                      {index < 3 ? <ArrowRight size={9} className="text-emerald-300/35" /> : null}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10px] leading-4 text-slate-500">The lens changes with scale; the standard of evidence does not.</p>
              </div>

              <div className="mt-4 border-t border-white/[0.07] pt-3">
                <div className="flex items-center gap-2 font-mono text-[7px] uppercase tracking-[0.15em] text-slate-600">
                  <Orbit size={10} /> One connected universe
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  {[...entries].reverse().map((entry, index) => (
                    <span key={entry.id} className="flex items-center gap-1.5">
                      <span className={`font-mono text-[8px] uppercase tracking-[0.1em] ${entry.accent}`}>{entry.label.replace(" Science", "")}</span>
                      {index < entries.length - 1 ? <span className="text-slate-700">↔</span> : null}
                    </span>
                  ))}
                </div>
                <p className="mt-2 text-[10px] leading-4 text-slate-500">The colors mark useful lenses, not hard borders between fields.</p>
              </div>
            </article>
          </aside>
        </section>

        <section className="mt-4 shrink-0 rounded-[20px] border border-emerald-300/14 bg-black/18 p-3 backdrop-blur-xl xl:hidden">
          <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.15em] text-slate-600">
            <span>10⁻³⁰m</span><span className="text-emerald-300/55">Magnitude</span><span>10³⁰m</span>
          </div>
          <input
            type="range"
            min={-30}
            max={30}
            value={exponent}
            onChange={(event) => setExponent(Number(event.target.value))}
            className="mt-2 h-7 w-full accent-emerald-300"
            aria-label="Scale of nature magnitude"
          />
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {entries.map((entry) => {
              const Icon = entry.icon;
              const selected = active.id === entry.id;
              return (
                <button
                  key={entry.id}
                  type="button"
                  onClick={() => jumpTo(entry)}
                  className={`flex items-center gap-2 rounded-xl border px-2.5 py-2 text-left ${selected ? entry.border : "border-white/[0.08]"}`}
                  style={{ background: selected ? `rgba(${entry.rgb},0.14)` : "rgba(0,0,0,0.14)" }}
                >
                  <Icon size={14} className={entry.accent} />
                  <span className="min-w-0">
                    <strong className="block truncate text-[10px] text-white">{entry.label}</strong>
                    <span className={`font-mono text-[7px] uppercase ${entry.accent}`}>10{superscript(entry.exponent)}m</span>
                  </span>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
