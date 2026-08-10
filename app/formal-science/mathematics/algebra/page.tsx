"use client";

import React from "react";
import Link from "next/link";
import AlgebraBackground2 from "./_components/AlgebraBackground2";
import FunctionMachine from "./_components/FunctionMachine";
import {
  ArrowLeft,
  Braces,
  ChevronRight,
  Divide,
  Equal,
  Grid3X3,
  Infinity,
  Variable,
  type LucideIcon,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { algebraVocab } from "@/app/_data/vocab/a/algebra";
import { curriculumRegistry } from "@/lib/curriculum/registry";
import { algebraQuiz } from "./_components/assessment";

type AlgebraBranchPresentation = {
  subtitle: string;
  icon: LucideIcon;
  equation: string;
  color: string;
  border: string;
  bg: string;
  layout: string;
};

const ALGEBRA_BRANCH_PRESENTATION: Record<string, AlgebraBranchPresentation> = {
  "formal.mathematics.algebra.pre-algebra": {
    subtitle: "Foundations",
    icon: Divide,
    equation: "2(x + 3) = 10",
    color: "text-emerald-400",
    border: "group-hover:border-emerald-500/50",
    bg: "hover:bg-emerald-950/20",
    layout: "col-span-12 lg:col-span-7",
  },
  "formal.mathematics.algebra.elementary-algebra": {
    subtitle: "Solving for X",
    icon: Variable,
    equation: "ax² + bx + c = 0",
    color: "text-blue-400",
    border: "group-hover:border-blue-500/50",
    bg: "hover:bg-blue-950/20",
    layout: "col-span-12 lg:col-span-5",
  },
  "formal.mathematics.algebra.linear-algebra": {
    subtitle: "Vectors & Spaces",
    icon: Grid3X3,
    equation: "Ax = λx",
    color: "text-indigo-400",
    border: "group-hover:border-indigo-500/50",
    bg: "hover:bg-indigo-950/20",
    layout: "col-span-12 lg:col-span-5",
  },
  "formal.mathematics.algebra.abstract-algebra": {
    subtitle: "Structures",
    icon: Infinity,
    equation: "G/Ker(φ) ≅ Im(φ)",
    color: "text-violet-400",
    border: "group-hover:border-violet-500/50",
    bg: "hover:bg-violet-950/20",
    layout: "col-span-12 lg:col-span-7",
  },
};

function buildAlgebraBranches() {
  const algebra = curriculumRegistry.getNode("formal.mathematics.algebra");
  if (!algebra) throw new Error("Algebra is missing from the curriculum registry.");

  return (algebra.children ?? []).map((branch) => {
    const presentation = ALGEBRA_BRANCH_PRESENTATION[branch.id];
    if (!presentation) {
      throw new Error(`Algebra branch ${branch.id} is missing its local presentation config.`);
    }

    return {
      ...branch,
      title: branch.label,
      desc: branch.description ?? "",
      ...presentation,
    };
  });
}

const SUBDOMAINS = buildAlgebraBranches();

export default function AlgebraHubPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a1f] text-white overflow-hidden font-mono selection:bg-indigo-500/50 pb-32">
      <AlgebraBackground2 />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.05)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 min-h-screen flex flex-col">
        <header className="flex flex-col mb-20 mt-8">
          <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-[10px] text-indigo-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group w-max border border-indigo-500/30 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Return to Math Hub
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-indigo-500/20 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 border border-indigo-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm relative overflow-hidden group rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Braces size={40} className="text-indigo-400 relative z-10" />
              </div>
              <div>
                <div className="flex items-center gap-3 text-indigo-500 mb-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                  <Variable size={12} /> Domain_02 <span className="w-12 h-px bg-indigo-500/50" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  ALGEBRA
                </h1>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-black/60 border border-indigo-500/30 rounded-xl p-4 backdrop-blur-sm shadow-xl flex flex-col justify-center">
                <div className="text-[9px] text-indigo-400 uppercase tracking-widest mb-1">Modules</div>
                <div className="text-2xl font-bold text-white leading-none">
                  {String(SUBDOMAINS.length).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">The Curriculum</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="col-span-12">
              <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-2xl mb-4">
                <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                <div className="relative z-10 max-w-3xl">
                  <p className="text-sm text-zinc-300 font-sans font-light leading-relaxed mb-6">
                    Arithmetic teaches us how to calculate real things. Algebra teaches us how to find things that are hidden. By replacing unknown numbers with letters, we stop asking "what does this equal?" and start asking "how is this structured?"
                  </p>
                  <div className="flex items-center gap-4 opacity-70">
                    <span className="text-lg font-mono text-indigo-400">f(x)</span>
                    <Equal size={16} />
                    <span className="text-lg font-mono text-fuchsia-400">y</span>
                  </div>
                </div>
              </div>
            </div>

            {SUBDOMAINS.map((item, i) => (
              <Link
                key={item.id}
                href={item.href}
                className={`${item.layout} group relative flex flex-col md:flex-row items-start md:items-center gap-6 p-8 border border-white/5 bg-black/40 rounded-2xl backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-indigo-500/50 ${item.bg}`}
              >
                <div className="absolute left-0 top-4 bottom-4 w-1 border-l-2 border-t-2 border-b-2 border-white/10 rounded-l transition-colors group-hover:border-indigo-500/50" />
                <div className="absolute right-0 top-4 bottom-4 w-1 border-r-2 border-t-2 border-b-2 border-white/10 rounded-r transition-colors group-hover:border-indigo-500/50" />

                <div className={`p-4 rounded-xl bg-black/60 border border-white/5 shadow-inner transition-colors ${item.border} ${item.color} shrink-0`}>
                  <item.icon size={32} strokeWidth={1.5} />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 ${item.color}`}>
                      MOD_0{i + 1}
                    </span>
                    <h2 className="text-2xl font-bold text-white group-hover:text-indigo-200 transition-colors font-sans">
                      {item.title}
                    </h2>
                  </div>
                  <div className={`text-[9px] font-bold uppercase tracking-widest mb-3 opacity-70 ${item.color}`}>
                    {item.subtitle}
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-4">{item.desc}</p>

                  <div className="inline-block px-3 py-1 bg-black rounded text-xs font-mono text-indigo-300 border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                    {item.equation}
                  </div>
                </div>

                <div className="hidden md:flex shrink-0 p-3 rounded-full bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-indigo-500/20 transition-all">
                  <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Simulation Deck</h2>
          </div>
          <FunctionMachine />
        </section>

        <section className="mt-auto pb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Verification Protocol</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1">
              <VocabApplet currentDomain="Algebra" localTerms={algebraVocab || []} accentColor="indigo" />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <Assessment
                title="Domain Check: The Branches of Algebra"
                questions={algebraQuiz || []}
                accentColor="indigo"
                onComplete={(score, total) => console.log(`Algebra Quiz Scored: ${score}/${total}`)}
              />
            </div>
          </div>
        </section>

        <div className="border-t border-indigo-900/30 pt-6 flex justify-between items-center text-[10px] text-indigo-500/60 font-mono uppercase tracking-widest mt-8">
          <span>Find X.</span>
          <span>Architecture v3.1</span>
        </div>
      </div>
    </main>
  );
}
