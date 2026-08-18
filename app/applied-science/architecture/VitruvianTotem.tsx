"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { Columns4, Eye, Palette, Ruler, Settings, ShieldCheck } from "lucide-react";
import { Surface } from "@/app/_page-system/scene";

type PrincipleKey = "firmitas" | "utilitas" | "venustas";

type Principle = {
  key: PrincipleKey;
  latin: string;
  plain: string;
  question: string;
  response: string;
  icon: LucideIcon;
  backIcon: LucideIcon;
  rgb: string;
};

const PRINCIPLES: readonly Principle[] = [
  {
    key: "firmitas",
    latin: "Firmitas",
    plain: "Durability & structural soundness",
    question: "Can the work stand up, weather use, and remain serviceable?",
    response: "Structure, material, envelope, detailing, moisture control, maintenance, and construction quality all contribute. Strength alone is not the whole requirement.",
    icon: Columns4,
    backIcon: ShieldCheck,
    rgb: "125,211,252",
  },
  {
    key: "utilitas",
    latin: "Utilitas",
    plain: "Use & fitness",
    question: "Does the space actually support the people and activities it is meant to serve?",
    response: "Program, circulation, accessibility, dimensions, adjacency, comfort, adaptability, wayfinding, and operations turn an abstract plan into a usable place.",
    icon: Settings,
    backIcon: Ruler,
    rgb: "251,191,36",
  },
  {
    key: "venustas",
    latin: "Venustas",
    plain: "Delight & aesthetic experience",
    question: "What kind of spatial, sensory, symbolic, and cultural experience does the work create?",
    response: "Light, proportion, sequence, material, sound, view, ornament, restraint, memory, context, and expectation can all shape architectural delight. There is no single universal aesthetic formula.",
    icon: Eye,
    backIcon: Palette,
    rgb: "244,114,182",
  },
] as const;

export default function VitruvianTotem() {
  const [flipped, setFlipped] = useState<Record<PrincipleKey, boolean>>({
    firmitas: false,
    utilitas: false,
    venustas: false,
  });

  return (
    <Surface
      variant="glass"
      className="overflow-hidden rounded-[30px] border-sky-100/[0.12]"
      style={{ background: "rgba(5,16,28,0.22)" }}
    >
      <div className="grid border-b border-sky-100/[0.09] lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="p-5 sm:p-6">
          <div className="font-mono text-[11px] font-semibold uppercase tracking-[0.11em] text-sky-200/60">Historical design lens · Vitruvius</div>
          <h3 className="mt-2 text-[clamp(1.8rem,3vw,2.8rem)] font-semibold tracking-[-0.045em] text-white">A durable old triad, useful as a question set rather than a universal scoring rubric.</h3>
          <p className="mt-3 max-w-3xl text-[14px] leading-6 text-slate-300/68">
            Vitruvius described architecture through firmness, commodity, and delight. Modern practice expands those concerns through accessibility, climate, equity, life safety, ecology, economics, culture, technology, and many other obligations.
          </p>
        </div>
        <div className="border-t border-sky-100/[0.08] bg-black/[0.07] p-5 backdrop-blur-[14px] lg:border-l lg:border-t-0">
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-amber-200/55">How to use it</span>
          <p className="mt-3 text-[13px] leading-6 text-slate-400/70">Flip each slab. The front names the principle; the reverse turns it into a contemporary design question. Good buildings usually require negotiating all three at once.</p>
        </div>
      </div>

      <div className="grid gap-3 p-4 md:grid-cols-3 sm:p-5">
        {PRINCIPLES.map((principle) => (
          <PrincipleSlab
            key={principle.key}
            principle={principle}
            flipped={flipped[principle.key]}
            onToggle={() => setFlipped((current) => ({ ...current, [principle.key]: !current[principle.key] }))}
          />
        ))}
      </div>
    </Surface>
  );
}

function PrincipleSlab({ principle, flipped, onToggle }: { principle: Principle; flipped: boolean; onToggle: () => void }) {
  const FrontIcon = principle.icon;
  const BackIcon = principle.backIcon;

  return (
    <button type="button" onClick={onToggle} className="group min-h-[250px] text-left [perspective:1100px]" aria-pressed={flipped}>
      <span
        className="relative block h-full min-h-[250px] transition-transform duration-700 [transform-style:preserve-3d]"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        <span
          className="absolute inset-0 flex flex-col border px-4 py-5 [backface-visibility:hidden]"
          style={{ borderColor: `rgba(${principle.rgb},0.25)`, background: `linear-gradient(155deg,rgba(${principle.rgb},0.09),rgba(3,10,18,0.25) 58%,rgba(3,10,18,0.12))` }}
        >
          <span className="flex items-start justify-between gap-3">
            <span className="flex h-10 w-10 items-center justify-center border" style={{ color: `rgb(${principle.rgb})`, borderColor: `rgba(${principle.rgb},0.28)`, background: `rgba(${principle.rgb},0.05)` }}><FrontIcon size={17} /></span>
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">flip ↻</span>
          </span>
          <span className="mt-auto">
            <strong className="block font-serif text-[28px] font-normal tracking-[-0.035em] text-white">{principle.latin}</strong>
            <span className="mt-2 block text-[13px] font-semibold" style={{ color: `rgba(${principle.rgb},0.78)` }}>{principle.plain}</span>
            <span className="mt-3 block text-[12px] leading-5 text-slate-400/68">Tap to turn the historical term into a design question.</span>
          </span>
        </span>

        <span
          className="absolute inset-0 flex flex-col border px-4 py-5 [backface-visibility:hidden]"
          style={{ transform: "rotateY(180deg)", borderColor: `rgba(${principle.rgb},0.30)`, background: `linear-gradient(145deg,rgba(2,8,15,0.72),rgba(${principle.rgb},0.075))` }}
        >
          <span className="flex h-10 w-10 items-center justify-center border" style={{ color: `rgb(${principle.rgb})`, borderColor: `rgba(${principle.rgb},0.28)` }}><BackIcon size={17} /></span>
          <strong className="mt-4 block text-[15px] leading-5 text-white/90">{principle.question}</strong>
          <span className="mt-3 block text-[12px] leading-5 text-slate-400/72">{principle.response}</span>
          <span className="mt-auto pt-4 font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: `rgba(${principle.rgb},0.58)` }}>return to {principle.latin} ↺</span>
        </span>
      </span>
    </button>
  );
}
