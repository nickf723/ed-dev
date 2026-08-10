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
import DomainPageHeader from "@/app/_components/DomainPageHeader";
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
    cardLabel: "Life & organisms",
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
  { label: "Observe", detail: "Notice a pattern", icon: Eye, rgb: "52, 211, 153" },
  { label: "Hypothesize", detail: "Propose an explanation", icon: Lightbulb, rgb: "34, 211, 238" },
  { label: "Test", detail: "Gather evidence", icon: FlaskConical, rgb: "59, 130, 246" },
  { label: "Analyze", detail: "Interpret the result", icon: BarChart3, rgb: "168, 85, 247" },
  { label: "Revise", detail: "Improve the model", icon: RefreshCw, rgb: "236, 72, 153" },
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
          background: `radial-gradient(circle at 72% 34%, rgba(${active.rgb},0.10), transparent 30%), radial-gradient(circle at 14% 12%, rgba(16,185,129,0.18), transparent 28%), linear-gradient(to bottom, rgba(1,11,9,0.05), rgba(1,8,6,0.72))`,
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-10 [background-image:radial-gradient(circle_at_center,rgba(167,243,208,0.22)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] flex-col px-4 py-4 sm:px-6 lg:h-screen lg:min-h-0 lg:px-8 lg:py-5">
        <DomainPageHeader
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Natural Sciences" },
          ]}
          eyebrow="Observation & Experiment"
          icon={Sprout}
          accentRgb="52, 211, 153"
          title={
            <>
              Natural <span className="bg-gradient-to-r from-emerald-200 via-green-300 to-cyan-200 bg-clip-text text-transparent">Sciences</span>
            </>
          }
          titleClassName="text-[clamp(3.2rem,5.8vw,6rem)] font-semibold leading-[0.86] tracking-[-0.06em] text-[#f6fff9] drop-shadow-[0_0_28px_rgba(16,185,129,0.10)]"
          subtitle="Explore the physical world through observation, experimentation, and discovery."
        />

        <div className="mt-4 flex min-h-0 flex-1 flex-col gap-4">
          <section className="grid shrink-0 gap-4 lg:grid-cols-[minmax(0,1fr)_190px]">
            <article
              className="relative min-h-[235px] overflow-hidden rounded-[28px] border bg-black/30 p-6 backdrop-blur-xl transition-all duration-700 sm:p-8 lg:min-h-[250px]"
              style={{
                borderColor: `rgba(${active.rgb},0.46)`,
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 70px rgba(0,0,0,0.34), 0 0 55px rgba(${active.rgb},0.08)`,
                background: `linear-gradient(120deg, rgba(${active.rgb},0.18), rgba(0,0,0,0.36) 58%, rgba(${active.rgb},0.05))`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 opacity-70" style={{ background: `radial-gradient(circle at 82% 40%, rgba(${active.rgb},0.24), transparent 27%)` }} />
              <div className="pointer-events-none absolute -right-14 -top-20 h-72 w-72 rounded-full border border-white/[0.08]" />
              <div className="pointer-events-none absolute right-7 top-6 h-36 w-36 rounded-full border border-white/[0.05]" />

              <div className="relative flex h-full items-center">
                <div className="flex max-w-3xl items-start gap-5 sm:gap-7">
                  <div
                    className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border bg-black/25 transition-all duration-500 sm:h-28 sm:w-28"
                    style={{ borderColor: `rgba(${active.rgb},0.52)`, boxShadow: `0 0 44px rgba(${active.rgb},0.18)` }}
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
                      style={{ borderColor: `rgba(${active.rgb},0.60)`, background: `rgba(${active.rgb},0.15)`, color: `rgb(${active.rgb})` }}
                    >
                      Explore {active.label} <ArrowRight size={15} />
                    </Link>
                  </div>
                </div>
              </div>
            </article>

            <aside className="hidden rounded-[24px] border border-white/10 bg-black/25 p-4 backdrop-blur-xl lg:block">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-slate-500">Scale of nature</div>
              <p className="mt-1 text-[10px] leading-4 text-slate-600">A loose map of the scales each field often studies.</p>
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
                        className={`relative flex w-full items-center rounded-lg px-2 py-1.5 text-left text-xs transition-all ${selected ? "bg-white/[0.06] font-semibold text-white" : "text-slate-500 hover:bg-white/[0.035] hover:text-slate-300"}`}
                      >
                        <span
                          className="absolute -left-[19px] h-3 w-3 rounded-full border-2 bg-[#041009]"
                          style={{ borderColor: `rgb(${field.rgb})`, boxShadow: selected ? `0 0 12px rgba(${field.rgb},0.75)` : undefined }}
                        />
                        {field.scaleLabel}
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
                  className={`group relative min-h-[145px] overflow-hidden rounded-[22px] border p-4 transition-all duration-300 hover:-translate-y-1 ${selected ? field.border : "border-white/10 hover:border-white/20"}`}
                  style={{
                    background: selected
                      ? `linear-gradient(150deg, rgba(${field.rgb},0.24), rgba(0,0,0,0.34))`
                      : `linear-gradient(150deg, rgba(${field.rgb},0.09), rgba(0,0,0,0.24))`,
                    boxShadow: selected ? `0 0 36px rgba(${field.rgb},0.13)` : undefined,
                  }}
                >
                  <div className="pointer-events-none absolute -right-10 -top-12 h-32 w-32 rounded-full blur-2xl" style={{ background: `rgba(${field.rgb},0.22)` }} />
                  <div className="relative flex h-full flex-col">
                    <span className={`flex h-11 w-11 items-center justify-center rounded-xl border ${field.border} ${field.soft} ${field.accent}`}>
                      <Icon size={20} />
                    </span>
                    <div className="mt-auto pt-4">
                      <h3 className="text-lg font-semibold text-white">{field.label}</h3>
                      <div className={`mt-1 text-xs ${field.accent}`}>{field.cardLabel}</div>
                    </div>
                    <ArrowRight size={15} className={`absolute bottom-0 right-0 transition-transform group-hover:translate-x-1 ${field.accent}`} />
                  </div>
                </Link>
              );
            })}
          </nav>

          <section className="mt-auto shrink-0 rounded-[22px] border border-emerald-300/15 bg-black/20 px-5 py-4 backdrop-blur-xl">
            <div className="grid items-center gap-4 lg:grid-cols-[210px_minmax(0,1fr)]">
              <div>
                <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-emerald-300/70">
                  <Microscope size={12} /> Scientific method
                </div>
                <p className="mt-1 text-xs leading-5 text-slate-500">One shared process, regardless of scale or subject.</p>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {METHOD_STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={step.label} className="relative flex min-w-0 items-center gap-2 rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
                      <span
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border"
                        style={{ borderColor: `rgba(${step.rgb},0.34)`, background: `rgba(${step.rgb},0.08)`, color: `rgb(${step.rgb})` }}
                      >
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
