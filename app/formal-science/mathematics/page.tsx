"use client";

import React from "react";
import Link from "next/link";
import MathBackground from "./_components/MathBackground";
import {
  ArrowLeft,
  BarChart3,
  Binary,
  Box,
  Calculator,
  ChevronRight,
  Network,
  Pi,
  Sigma,
  Triangle,
  Variable,
  type LucideIcon,
} from "lucide-react";
import GalaxyBackground from "./_components/GalaxyBackground";
import Assessment, { AssessmentQuestion } from "@/app/_components/Assessment";
import InteractiveWave from "./_components/InteractiveWave";
import ChaosGame from "./_components/ChaosGame";
import VocabApplet from "@/app/_components/VocabApplet";
import { mathCoreVocab } from "@/app/_data/vocab/m/mathematics";
import { curriculumRegistry } from "@/lib/curriculum/registry";

type MathBranchPresentation = {
  subtitle: string;
  icon: LucideIcon;
  color: string;
  border: string;
  bg: string;
  equation: string;
};

const MATH_BRANCH_PRESENTATION: Record<string, MathBranchPresentation> = {
  "formal.mathematics.foundations": {
    subtitle: "Elementary Base",
    icon: Calculator,
    color: "text-emerald-400",
    border: "border-emerald-500/30",
    bg: "hover:bg-emerald-950/20",
    equation: "1 + 1 = 2",
  },
  "formal.mathematics.algebra": {
    subtitle: "Variables",
    icon: Variable,
    color: "text-blue-400",
    border: "border-blue-500/30",
    bg: "hover:bg-blue-950/20",
    equation: "x = (-b ± √Δ)/2a",
  },
  "formal.mathematics.geometry": {
    subtitle: "Space & Shape",
    icon: Triangle,
    color: "text-amber-400",
    border: "border-amber-500/30",
    bg: "hover:bg-amber-950/20",
    equation: "a² + b² = c²",
  },
  "formal.mathematics.calculus": {
    subtitle: "Continuous Change",
    icon: Sigma,
    color: "text-rose-400",
    border: "border-rose-500/30",
    bg: "hover:bg-rose-950/20",
    equation: "∫ f(x) dx",
  },
  "formal.mathematics.statistics": {
    subtitle: "Probability",
    icon: BarChart3,
    color: "text-purple-400",
    border: "border-purple-500/30",
    bg: "hover:bg-purple-950/20",
    equation: "P(A|B)",
  },
  "formal.mathematics.number-theory": {
    subtitle: "The Queen of Math",
    icon: Binary,
    color: "text-cyan-400",
    border: "border-cyan-500/30",
    bg: "hover:bg-cyan-950/20",
    equation: "e^(iπ) + 1 = 0",
  },
  "formal.mathematics.discrete": {
    subtitle: "Logic & Graphs",
    icon: Network,
    color: "text-lime-400",
    border: "border-lime-500/30",
    bg: "hover:bg-lime-950/20",
    equation: "G = (V, E)",
  },
  "formal.mathematics.applied": {
    subtitle: "Modeling",
    icon: Pi,
    color: "text-indigo-400",
    border: "border-indigo-500/30",
    bg: "hover:bg-indigo-950/20",
    equation: "F = ma",
  },
};

function buildMathBranches() {
  const mathematics = curriculumRegistry.getNode("formal.mathematics");
  if (!mathematics) throw new Error("Mathematics is missing from the curriculum registry.");

  return (mathematics.children ?? []).map((branch) => {
    const presentation = MATH_BRANCH_PRESENTATION[branch.id];
    if (!presentation) {
      throw new Error(`Mathematics branch ${branch.id} is missing its local presentation config.`);
    }
    return { ...branch, ...presentation };
  });
}

const SUBDOMAINS = buildMathBranches();

const mathDomainQuiz: AssessmentQuestion[] = [
  { id: "m1", type: "mcq", prompt: "Which branch of mathematics primarily studies continuous change and motion?", options: ["Geometry", "Algebra", "Calculus", "Discrete Math"], correctAnswer: "Calculus", explanation: "Calculus utilizes derivatives and integrals to study continuous change." },
  { id: "m2", type: "matching", prompt: "Match the mathematical symbol to its domain.", leftItems: ["∑ (Sigma)", "∫ (Integral)", "Δ (Delta)"], rightItems: ["Summation / Statistics", "Continuous Area / Calculus", "Change / Algebra"], correctPairs: { "∑ (Sigma)": "Summation / Statistics", "∫ (Integral)": "Continuous Area / Calculus", "Δ (Delta)": "Change / Algebra" }, explanation: "Sigma sums, Integral finds area, Delta finds change." },
  { id: "m3", type: "tf", prompt: "True or False: Number Theory focuses primarily on predicting the outcomes of random events.", correctAnswer: false, explanation: "False. Statistics and Probability focus on random events. Number Theory is the study of integers." },
];

export default function MathPage() {
  return (
    <main className="relative min-h-screen bg-[#050508] text-white overflow-hidden font-mono selection:bg-indigo-500/50 pb-32">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <GalaxyBackground />
        <MathBackground />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 min-h-screen flex flex-col">
        <header className="flex flex-col mb-20 mt-8">
          <Link href="/" className="flex items-center gap-2 text-[10px] text-indigo-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group w-max border border-indigo-500/30 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Return to Core
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-indigo-500/20 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 border border-indigo-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm relative overflow-hidden group rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <div className="absolute inset-0 bg-indigo-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <Pi size={40} className="text-indigo-400 relative z-10" />
              </div>
              <div>
                <div className="flex items-center gap-3 text-indigo-500 mb-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                  <Box size={12} /> Domain_01 <span className="w-12 h-px bg-indigo-500/50" />
                </div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                  MATHEMATICS
                </h1>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-black/60 border border-indigo-500/30 rounded-xl p-4 backdrop-blur-sm shadow-xl flex flex-col justify-center">
                <div className="text-[9px] text-indigo-400 uppercase tracking-widest mb-1">Curriculum Modules</div>
                <div className="text-2xl font-bold text-white leading-none">{String(SUBDOMAINS.length).padStart(2, "0")}</div>
              </div>
              <div className="bg-black/60 border border-indigo-500/30 rounded-xl p-4 backdrop-blur-sm shadow-xl flex flex-col justify-center">
                <div className="text-[9px] text-indigo-400 uppercase tracking-widest mb-1">Active Simulations</div>
                <div className="text-2xl font-bold text-white leading-none">02</div>
              </div>
            </div>
          </div>
        </header>

        <section className="mb-24">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">The Academic Index</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUBDOMAINS.map((item, i) => (
              <Link
                key={item.id}
                href={item.href}
                className={`group relative flex flex-col justify-between p-6 border border-white/5 bg-black/40 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-indigo-500/50 ${item.bg}`}
              >
                <div className="absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-white/10 rounded-tl-lg transition-colors group-hover:border-indigo-500/50" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-white/10 rounded-br-lg transition-colors group-hover:border-indigo-500/50" />

                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 rounded-xl bg-black/60 border border-white/5 shadow-inner transition-colors ${item.color}`}>
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-black opacity-20 uppercase tracking-widest group-hover:opacity-60 transition-opacity text-indigo-400">{`MOD_0${i + 1}`}</span>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-white mb-1">{item.label}</h2>
                  <div className={`text-[9px] font-bold uppercase tracking-widest mb-4 ${item.color}`}>{item.subtitle}</div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed mb-6 h-10">{item.description}</p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="font-mono text-xs text-zinc-500 group-hover:text-white transition-colors">{item.equation}</div>
                  <ChevronRight size={14} className="text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
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

          <div className="bg-black/40 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-full">
                <InteractiveWave />
              </div>
              <div className="h-full">
                <ChaosGame />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-auto pb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-indigo-500 rounded-full" />
            <h2 className="text-sm font-bold text-indigo-300 uppercase tracking-widest">Verification Protocol</h2>
          </div>

          <div className="grid grid-cols-1 gap-12">
            <div className="w-full">
              <VocabApplet currentDomain="Mathematics" localTerms={mathCoreVocab} accentColor="indigo" />
            </div>

            <div className="w-full">
              <Assessment
                title="Domain Check: The Mathematical Branches"
                questions={mathDomainQuiz}
                accentColor="indigo"
                onComplete={(score, total) => console.log(`Math Domain Quiz Scored: ${score}/${total}`)}
              />
            </div>
          </div>
        </section>

        <div className="border-t border-indigo-500/20 pt-8 flex justify-between items-center text-[10px] text-indigo-500/50 font-mono uppercase tracking-widest">
          <span>Q.E.D. [Quod Erat Demonstrandum]</span>
          <span>Architecture v3.1</span>
        </div>
      </div>
    </main>
  );
}
