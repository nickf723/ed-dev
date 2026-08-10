"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  Atom,
  BarChart3,
  ChevronRight,
  Dna,
  Eye,
  FlaskConical,
  Globe2,
  Lightbulb,
  Microscope,
  RefreshCw,
  Sprout,
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

type FieldPresentation = {
  exponent: number;
  icon: LucideIcon;
  backgroundId: string;
  scaleLabel: string;
  cardLabel: string;
  rgb: string;
  accent: string;
  border: string;
  soft: string;
};

type FieldEntry = NaturalScienceScaleNode & FieldPresentation;

const FIELD_PRESENTATION: Record<string, FieldPresentation> = {
  "natural.astronomy": {
    exponent: 26,
    icon: Telescope,
    backgroundId: "astronomy",
    scaleLabel: "Cosmic",
    cardLabel: "The universe",
    rgb: "168, 85, 247",
    accent: "text-purple-300",
    border: "border-purple-400/65",
    soft: "bg-purple-500/15",
  },
  "natural.earth-science": {
    exponent: 7,
    icon: Globe2,
    backgroundId: "earth-science",
    scaleLabel: "Planetary",
    cardLabel: "Our planet",
    rgb: "59, 130, 246",
    accent: "text-blue-300",
    border: "border-blue-400/65",
    soft: "bg-blue-500/15",
  },
  "natural.biology": {
    exponent: 0,
    icon: Dna,
    backgroundId: "biology",
    scaleLabel: "Living",
    cardLabel: "Life",
    rgb: "34, 197, 94",
    accent: "text-green-300",
    border: "border-green-400/65",
    soft: "bg-green-500/15",
  },
  "natural.chemistry": {
    exponent: -9,
    icon: FlaskConical,
    backgroundId: "chemistry",
    scaleLabel: "Molecular",
    cardLabel: "Matter & reactions",
    rgb: "250, 204, 21",
    accent: "text-yellow-300",
    border: "border-yellow-400/65",
    soft: "bg-yellow-500/15",
  },
  "natural.physics": {
    exponent: -15,
    icon: Atom,
    backgroundId: "physics",
    scaleLabel: "Fundamental",
    cardLabel: "Energy & forces",
    rgb: "239, 68, 68",
    accent: "text-red-300",
    border: "border-red-400/65",
    soft: "bg-red-500/15",
  },
};

const FIELD_ORDER = [
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

function buildFields(nodes: readonly NaturalScienceScaleNode[]): FieldEntry[] {
  const byId = new Map(nodes.map((node) => [node.id, node]));

  return FIELD_ORDER.map((id) => {
    const node = byId.get(id);
    const presentation = FIELD_PRESENTATION[id];
    if (!node || !presentation) {
      throw new Error(`Natural Science field ${id} is incomplete.`);
    }
    return { ...node, ...presentation };
  });
}

const METHOD_STEPS = [
  { label: "Observe", detail: "Notice a pattern", icon: Eye },
  { label: "Hypothesize", detail: "Make a testable idea", icon: Lightbulb },
  { label: "Test", detail: "Gather evidence", icon: FlaskConical },
  { label: "Analyze", detail: "Read the result", icon: BarChart3 },
  { label: "Revise", detail: "Improve the model", icon: RefreshCw },
] as const;

export default function ScaleOfNature({ nodes }: { nodes: readonly NaturalScienceScaleNode[] }) {
  const fields = buildFields(nodes);
  const [activeId, setActiveId] = useState<string>("natural.astronomy");
  const active = fields.find((field) => field.id === activeId) ?? fields[0];
  const ActiveIcon = active.icon;

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#020806] text-slate-100 selection:bg-emerald-400/30 lg:h-screen lg:overflow-hidden">
      <NaturalScienceBackground activeId={active.backgroundId} />

      <div
        className="pointer-events-none fixed inset-0 z-0 transition-all duration-700"
        style={{
          background: `radial-gradient(circle at 58% 42%, rgba(${active.rgb},0.12), transparent 34%), radial-gradient(circle at 15% 12%, rgba(16,185,129,0.20), transparent 28%), linear-gradient(to bottom, rgba(2,10,8,0.05), rgba(2,8,6,0.76))`,
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-15 [background-image:radial-gradient(circle_at_center,rgba(167,243,208,0.20)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 py-4 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-5">
        <header className="shrink-0 border-b border-emerald-200/10 pb-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-200/55">
              <Microscope size={12} /> Natural sciences
            </div>

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-slate-500">
              <Link href="/" className="transition-colors hover:text-emerald-200">Knowledge map</Link>
              <ChevronRight size={11} className="text-slate-700" />
              <span className="text-emerald-300">Natural Sciences</span>
            </nav>
          </div>

          <div className="mt-4 flex items-center gap-5 sm:gap-6">
            <div className="hidden h-16 w-16 shrink-0 items-center justify-center rounded-[22px] border border-emerald-300/25 bg-emerald-400/10 text-emerald-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_0_35px_rgba(16,185,129,0.10)] sm:flex">
              <Sprout size={30} strokeWidth={1.6} />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-[clamp(3.2rem,6vw,6.3rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#f6fff9] drop-shadow-[0_0_28px_rgba(16,185,129,0.10)]">
                Natural <span className="bg-gradient-to-r from-emerald-200 via-green-300 to-cyan-200 bg-clip-text text-transparent">Sciences</span>
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-5 text-slate-400 sm:text-base">
                Explore the physical world through observation, experimentation, and discovery.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4">
          <section className="grid shrink-0 gap-4 lg:grid-cols-[minmax(0,1fr)_210px]">
            <article
              className="relative min-h-[245px] overflow-hidden rounded-[28px] border bg-black/30 p-6 backdrop-blur-xl transition-all duration-700 sm:p-8 lg:min-h-[260px]"
              style={{
                borderColor: `rgba(${active.rgb},0.48)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 70px rgba(0,0,0,0.34), 0 0 55px rgba(${active.rgb},0.08)`,
                background: `linear-gradient(120deg, rgba(${active.rgb},0.16), rgba(0,0,0,0.36) 55%, rgba(${active.rgb},0.05))`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(circle at 78% 38%, rgba(${active.rgb},0.24), transparent 28%)` }} />
              <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -right-5 -top-9 h-48 w-48 rounded-full border border-white/[0.06]" />

              <div className="relative flex h-full flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div className="flex max-w-3xl items-start gap-5 sm:gap-7">
                  <div
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border bg-black/25 transition-all duration-500 sm:h-28 sm:w-28"
                    style={{ borderColor: `rgba(${active.rgb},0.50)`, boxShadow: `0 0 40px rgba(${active.rgb},0.18)` }}
                  >
                    <ActiveIcon size={48} strokeWidth={1.35} className={`drop-shadow-[0_0_20px_currentColor] ${active.accent}`} />
                  </div>

                  <div className="pt-1">
                    <div className={`font-mono text-[9px] uppercase tracking-[0.2em] ${active.accent}`}>Featured field</div>
                    <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">{active.label}</h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-300/80">
                      {active.description ?? "Explore this field of the natural world."}
                    </p>
                    <Link
                      href={active.href}
                      className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-all hover:brightness-125"
                      style={{ borderColor: `rgba(${active.rgb},0.58)`, background: `rgba(${active.rgb},0.14)`, color: `rgb(${active.rgb})` }}
                    >
                      Explore {active.label} <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>

                <div className="hidden min-w-[180px] self-stretch items-end justify-end sm:flex">
                  <div className="rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-right backdrop-blur-xl">
                    <div className="font-mono text-[8px] uppercase tracking-[0.16em] text-slate-600">Scale anchor</div>
                    <div className={`mt-1 font-mono text-sm ${active.accent}`}>10{superscript(active.exponent)} meters</div>
                    <div className="mt-1 text-[10px] text-slate-500">{active.scaleLabel}</div>
                  </div>
                </div>
              </div>
            </article>

            <aside className="hidden rounded-[24px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl lg:block">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">Scale of nature</div>
              <p className="mt-1 text-xs leading-5 text-slate-600">A small map of where each field tends to focus.</p>
              <div className="relative mt-4 pl-5">
                <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-purple-500 via-blue-500 via-green-500 via-yellow-400 to-red-500" />
                <div className="space-y-3">
                  {fields.map((field) => {
                    const selected = field.id === active.id;
                    return (
                      <button
                        key={field.id}
                        type="button"
                        onMouseEnter={() => setActiveId(field.id)}
                        onFocus={() => setActiveId(field.id)}
                        onClick={() => setActiveId(field.id)}
                        className={`relative flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-all ${selected ? "bg-white/[0.06]" : "hover:bg-white/[0.035]"}`}
                      >
                        <span
                          className="absolute -left-[19px] h-3 w-3 rounded-full border-2 bg-[#041009]"
                          style={{ borderColor: `rgb(${field.rgb})`, boxShadow: selected ? `0 0 12px rgba(${field.rgb},0.75)` : undefined }}
                        />
                        <span className={`text-xs ${selected ? "font-semibold text-white" : "text-slate-400"}`}>{field.scaleLabel}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>
          </section>

          <nav aria-label="Natural Science fields" className="grid shrink-0 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {fields.map((field) => {
              const Icon = field.icon;
              const selected = field.id === active.id;
              return (
                <Link
                  key={field.id}
                  href={field.href}
                  onMouseEnter={() => setActiveId(field.id)}
                  onFocus={() => setActiveId(field.id)}
                  className={`group relative min-h-[150px] overflow-hidden rounded-[22px] border p-4 transition-all duration-300 hover:-translate-y-1 ${selected ? field.border : "border-white/10 hover:border-white/20"}`}
                  style={{
                    background: selected
                      ? `linear-gradient(150deg, rgba(${field.rgb},0.21), rgba(0,0,0,0.32))`
                      : `linear-gradient(150deg, rgba(${field.rgb},0.08), rgba(0,0,0,0.24))`,
                    boxShadow: selected ? `0 0 35px rgba(${field.rgb},0.12)` : undefined,
                  }}
                >
                  <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-2xl" style={{ background: `rgba(${field.rgb},0.18)` }} />
                  <div className="relative flex h-full flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${field.border} ${field.soft} ${field.accent}`}>
                        <Icon size={20} />
                      </span>
                      <span className={`font-mono text-[8px] uppercase tracking-[0.13em] ${field.accent}`}>10{superscript(field.exponent)}m</span>
                    </div>
                    <div className="mt-auto pt-5">
                      <h3 className="text-lg font-semibold text-white">{field.label}</h3>
                      <div className={`mt-1 font-mono text-[8px] uppercase tracking-[0.13em] ${field.accent}`}>{field.cardLabel}</div>
                    </div>
                    <ArrowRight size={15} className={`absolute bottom-0 right-0 transition-transform group-hover:translate-x-1 ${field.accent}`} />
                  </div>
                </Link>
              );
            })}
          </nav>

          <section className="mt-auto shrink-0 rounded-[22px] border border-emerald-300/15 bg-black/20 px-5 py-4 backdrop-blur-xl">
            <div className="grid items-center gap-4 lg:grid-cols-[220px_minmax(0,1fr)]">
              <div>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-300/70">
                  <Microscope size={12} /> Scientific method
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">The shared process connecting every natural science.</p>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {METHOD_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="relative flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-300/20 bg-emerald-400/[0.07] text-emerald-200">
                        <Icon size={14} />
                      </span>
                      <span className="min-w-0">
                        <strong className="block truncate text-xs font-semibold text-slate-200">{step.label}</strong>
                        <span className="hidden truncate text-[9px] text-slate-600 xl:block">{step.detail}</span>
                      </span>
                      {index < METHOD_STEPS.length - 1 ? (
                        <ChevronRight size={11} className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 text-emerald-300/25 lg:block" />
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
