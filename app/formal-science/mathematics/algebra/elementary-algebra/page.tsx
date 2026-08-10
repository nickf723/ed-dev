"use client";

import React from "react";
import Link from "next/link";
import GraphingBackground from "./_components/GraphingBackground";
import SlopeExplorerLab from "./_components/SlopeExplorerLab";
import {
  ArrowLeft,
  Braces,
  Calculator,
  Divide,
  FunctionSquare,
  Grip,
  Hash,
  Layers,
  MoveHorizontal,
  Rocket,
  Scaling,
  TrendingUp,
  X,
  type LucideIcon,
} from "lucide-react";
import { curriculumRegistry } from "@/lib/curriculum/registry";

type IntegratedPresentation = {
  phase: 1 | 2 | 3;
  subtitle: string;
  icon: LucideIcon;
  problem: string;
  color: string;
  border: string;
  bg: string;
};

const MODULE_PRESENTATION: Record<string, IntegratedPresentation> = {
  "formal.mathematics.algebra.elementary-algebra.fundamentals": {
    phase: 1,
    subtitle: "The Language of Math",
    icon: Hash,
    problem: "3(x - 5) + 2",
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    bg: "hover:bg-emerald-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.linear-equations": {
    phase: 1,
    subtitle: "Lines & Slopes",
    icon: TrendingUp,
    problem: "y = -2x + 4",
    color: "text-teal-400",
    border: "group-hover:border-teal-500/50",
    bg: "hover:bg-teal-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.systems": {
    phase: 1,
    subtitle: "Intersection Points",
    icon: Layers,
    problem: "{ 2x+y=10, x-y=2 }",
    color: "text-cyan-400",
    border: "group-hover:border-cyan-500/50",
    bg: "hover:bg-cyan-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.inequalities": {
    phase: 1,
    subtitle: "Shaded Regions",
    icon: MoveHorizontal,
    problem: "-3x < 12",
    color: "text-sky-400",
    border: "group-hover:border-sky-500/50",
    bg: "hover:bg-sky-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.quadratics": {
    phase: 2,
    subtitle: "Parabolas",
    icon: Scaling,
    problem: "x = (-b±√Δ)/2a",
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    bg: "hover:bg-blue-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.factoring": {
    phase: 2,
    subtitle: "Reverse Multiplication",
    icon: Divide,
    problem: "x² - 9 = (x-3)(x+3)",
    color: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    bg: "hover:bg-indigo-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.exponents": {
    phase: 2,
    subtitle: "Power Rules",
    icon: X,
    problem: "(x²)³ = x⁶",
    color: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    bg: "hover:bg-violet-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.radicals": {
    phase: 2,
    subtitle: "Roots & Exponents",
    icon: Grip,
    problem: "√(16x⁴) = 4x²",
    color: "text-fuchsia-400",
    border: "group-hover:border-fuchsia-500/50",
    bg: "hover:bg-fuchsia-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.functions": {
    phase: 3,
    subtitle: "Input / Output",
    icon: FunctionSquare,
    problem: "f(g(x))",
    color: "text-pink-400",
    border: "group-hover:border-pink-500/50",
    bg: "hover:bg-pink-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.rational": {
    phase: 3,
    subtitle: "Algebraic Fractions",
    icon: Calculator,
    problem: "(x²-1)/(x+1)",
    color: "text-rose-400",
    border: "group-hover:border-rose-500/50",
    bg: "hover:bg-rose-500/10",
  },
  "formal.mathematics.algebra.elementary-algebra.complex": {
    phase: 3,
    subtitle: "The Imaginary Unit",
    icon: Braces,
    problem: "i = √-1",
    color: "text-amber-400",
    border: "group-hover:border-amber-500/50",
    bg: "hover:bg-amber-500/10",
  },
};

function buildModules() {
  const integrated = curriculumRegistry.getNode("formal.mathematics.algebra.elementary-algebra");
  if (!integrated) throw new Error("Integrated Algebra is missing from the curriculum registry.");

  return (integrated.children ?? []).map((module) => {
    const presentation = MODULE_PRESENTATION[module.id];
    if (!presentation) {
      throw new Error(`Integrated Algebra module ${module.id} is missing its local presentation config.`);
    }

    return {
      ...module,
      title: module.label,
      desc: module.description ?? "",
      ...presentation,
    };
  });
}

const MODULES = buildModules();
const PHASE_1 = MODULES.filter((module) => module.phase === 1);
const PHASE_2 = MODULES.filter((module) => module.phase === 2);
const PHASE_3 = MODULES.filter((module) => module.phase === 3);
type IntegratedModule = (typeof MODULES)[number];

export default function ElementaryAlgebraPage() {
  return (
    <main className="relative min-h-screen bg-[#080b14] text-white overflow-hidden font-sans selection:bg-cyan-500/30 pb-32">
      <GraphingBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,23,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 min-h-screen flex flex-col">
        <header className="flex flex-col mb-16 mt-8">
          <Link href="/formal-science/mathematics/algebra" className="flex items-center gap-2 text-[10px] text-cyan-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group w-max border border-cyan-500/30 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full shadow-lg">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Return to Algebra Hub
          </Link>

          <div className="flex items-center gap-6">
            <div className="w-20 h-20 border border-cyan-500/50 flex items-center justify-center bg-black/40 backdrop-blur-xl relative overflow-hidden group rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)]">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-blue-500 italic relative z-10 font-mono">x</span>
            </div>
            <div>
              <div className="flex items-center gap-3 text-cyan-400 mb-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                <Rocket size={12} /> Domain_02.1 <span className="w-12 h-px bg-cyan-500/50" />
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-lg">
                INTEGRATED <span className="font-light text-cyan-100/50">ALGEBRA</span>
              </h1>
            </div>
          </div>
        </header>

        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-cyan-500 rounded-full" />
            <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-widest">Simulation Deck</h2>
          </div>
          <SlopeExplorerLab />
        </section>

        <div className="space-y-20">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              <h2 className="text-sm font-bold text-emerald-300 uppercase tracking-widest bg-emerald-950/40 px-4 py-2 rounded-full border border-emerald-500/20 backdrop-blur-md">
                Phase 1: Linear Realities
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PHASE_1.map((item) => <ModuleCard key={item.id} item={item} />)}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent" />
              <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest bg-indigo-950/40 px-4 py-2 rounded-full border border-indigo-500/20 backdrop-blur-md">
                Phase 2: Curves & Powers
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {PHASE_2.map((item) => <ModuleCard key={item.id} item={item} />)}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px flex-1 bg-gradient-to-r from-rose-500/50 to-transparent" />
              <h2 className="text-sm font-bold text-rose-300 uppercase tracking-widest bg-rose-950/40 px-4 py-2 rounded-full border border-rose-500/20 backdrop-blur-md">
                Phase 3: Abstractions
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PHASE_3.map((item) => <ModuleCard key={item.id} item={item} />)}
            </div>
          </section>
        </div>

        <section className="mt-24 pt-12 border-t border-white/10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-cyan-500 rounded-full" />
            <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-widest">Verification Protocol</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
              <span className="text-zinc-600 text-sm uppercase tracking-widest font-mono">[Vocab Applet Mounting Point]</span>
            </div>
            <div className="col-span-1 lg:col-span-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex items-center justify-center min-h-[300px]">
              <span className="text-zinc-600 text-sm uppercase tracking-widest font-mono">[Assessment Mounting Point]</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ModuleCard({ item }: { item: IntegratedModule }) {
  return (
    <Link
      href={item.href}
      className={`group relative flex flex-col justify-between p-6 rounded-2xl backdrop-blur-2xl bg-slate-900/40 border border-white/10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${item.bg} ${item.border}`}
    >
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-current to-transparent ${item.color}`} />

      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className={`p-3 rounded-xl bg-black/50 border border-white/5 shadow-inner transition-colors ${item.color}`}>
          <item.icon size={24} strokeWidth={1.5} />
        </div>
      </div>

      <div className="relative z-10 mb-6">
        <h2 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">{item.title}</h2>
        <div className={`text-[10px] font-bold uppercase tracking-widest mb-3 opacity-80 ${item.color}`}>{item.subtitle}</div>
        <p className="text-xs text-slate-400 font-sans leading-relaxed h-12 line-clamp-3">{item.desc}</p>
      </div>

      <div className="relative z-10 mt-auto pt-4 border-t border-white/10">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="opacity-40 select-none text-[10px] uppercase tracking-widest">Syntax</span>
          <span className={`bg-black/60 px-2 py-1 rounded font-bold ${item.color} group-hover:bg-black/80 transition-colors border border-white/5`}>
            {item.problem}
          </span>
        </div>
      </div>
    </Link>
  );
}
