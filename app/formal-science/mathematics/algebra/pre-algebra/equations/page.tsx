"use client";

import Link from "next/link";
import EquationsBackground from "./_components/EquationsBackground";
import EquationLogicLab from "./_components/EquationLogicLab";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Layers,
  Scale,
  ShieldAlert,
  XSquare,
} from "lucide-react";
import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { equationsVocab } from "@/app/_data/vocab/e/equations";
import { equationsQuiz } from "./_components/assessment";

export default function EquationsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#2a0a12] pb-32 font-sans text-slate-200 selection:bg-rose-500/30">
      <EquationsBackground />
      <div className="pointer-events-none absolute inset-0 z-0 bg-radial-vignette opacity-80" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 mt-8 border-b border-rose-500/20 pb-8">
          <Link
            href="/formal-science/mathematics/algebra/pre-algebra"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
          >
            <ArrowLeft size={12} /> Back to Pre-Algebra
          </Link>

          <div className="mb-4 flex items-center gap-3">
            <span className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 shadow-inner">
              <Scale className="text-rose-400" size={24} />
            </span>
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-rose-400">
              Lesson 08 · Preserving Equality
            </span>
          </div>

          <h1 className="text-5xl font-black uppercase leading-none tracking-tighter text-white md:text-7xl">
            SOLVING <span className="bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent">FOR X</span>
          </h1>
          <p className="mt-6 max-w-2xl border-l-2 border-rose-500/50 pl-6 text-lg font-light leading-relaxed text-slate-400">
            Use inverse operations to isolate a variable while preserving equality. The equation may change form from step to step, but the values that make it true must stay the same.
          </p>
        </header>

        <div className="mb-24 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-2xl border border-white/5 bg-slate-900/60 p-8 shadow-xl backdrop-blur-md">
              <h3 className="mb-6 flex items-center gap-2 text-xl font-bold text-white">
                <ShieldAlert size={20} className="text-rose-400" /> Preserve Equality
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-slate-300">
                An equation states that two expressions have the same value. When solving, apply an equivalent operation to both sides so that equality is preserved while the variable becomes easier to see.
              </p>

              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                <div className="rounded-xl border border-white/5 bg-black/40 p-4 text-center">
                  <div className="mb-2 text-slate-500">Undo +a</div>
                  <div className="font-bold text-white">Subtract a</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-4 text-center">
                  <div className="mb-2 text-slate-500">Undo −a</div>
                  <div className="font-bold text-white">Add a</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-4 text-center">
                  <div className="mb-2 text-slate-500">Undo ×a</div>
                  <div className="font-bold text-white">Divide by a</div>
                </div>
                <div className="rounded-xl border border-white/5 bg-black/40 p-4 text-center">
                  <div className="mb-2 text-slate-500">Undo ÷a</div>
                  <div className="font-bold text-white">Multiply by a</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-rose-500/20 bg-rose-950/20 p-6">
              <h4 className="mb-2 flex items-center gap-2 text-base font-bold uppercase text-white">
                <Layers size={18} className="text-rose-400" /> Undo the outer operation first
              </h4>
              <p className="text-sm leading-relaxed text-slate-300">
                In a simple equation such as <span className="font-mono text-rose-200">2x + 6 = 14</span>, addition by 6 is the outer operation acting on <span className="font-mono">2x</span>, so subtract 6 before dividing by 2. This reverse-order idea is useful for one- and two-step equations, but it is a structural strategy, not a universal acronym for every equation you will ever solve.
              </p>
            </div>
          </div>

          <div className="space-y-8 lg:col-span-7">
            <div className="relative">
              <div className="absolute -top-3 left-8 z-20 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]">
                Equation Lab
              </div>
              <EquationLogicLab />
            </div>

            <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/5 bg-slate-900/50 p-6 md:flex-row">
              <div className="shrink-0 rounded-full border border-emerald-500/30 bg-emerald-900/30 p-4">
                <XSquare size={32} className="text-emerald-400" />
              </div>
              <div>
                <h4 className="mb-2 text-base font-bold uppercase text-white">Check by Substitution</h4>
                <p className="mb-4 text-sm leading-relaxed text-slate-300">
                  After solving, substitute the proposed value back into the original equation. If both sides evaluate to the same number, the value satisfies the equation.
                </p>
                <div className="flex items-center justify-center gap-4 rounded-xl border border-white/5 bg-black/40 px-4 py-3 text-center font-mono text-sm">
                  <span className="text-slate-400">2x = 8</span>
                  <ArrowRight size={14} className="text-slate-600" />
                  <span className="text-emerald-400">2(4) = 8</span>
                  <span className="rounded bg-emerald-500/20 px-2 py-1 font-bold text-white">true</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-auto">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-4 w-1 rounded-full bg-rose-500" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest text-rose-300">Reference & Check</h2>
              <p className="mt-1 text-xs text-slate-500">Review the vocabulary, then test whether the solving ideas hold together.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <div className="col-span-1">
              <VocabApplet
                currentDomain="Equations"
                localTerms={equationsVocab || []}
                accentColor="rose"
              />
            </div>
            <div className="col-span-1 lg:col-span-2">
              <Assessment
                title="Solving Equations Checkpoint"
                questions={equationsQuiz || []}
                accentColor="rose"
                onComplete={(score, total) => console.log(`Equations Quiz Scored: ${score}/${total}`)}
              />
            </div>
          </div>
        </section>

        <div className="mt-24 flex flex-col items-center justify-between gap-8 border-t border-white/10 pt-12 md:flex-row">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-400">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white">Continue into Integrated Algebra</h3>
              <p className="text-sm font-light text-zinc-400">Use the same equality-preserving ideas with lines, systems, inequalities, functions, and polynomials.</p>
            </div>
          </div>

          <Link
            href="/formal-science/mathematics/algebra/elementary-algebra"
            className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-black uppercase tracking-widest text-black shadow-xl transition-all hover:scale-105 hover:bg-rose-100 active:scale-95"
          >
            Next: Integrated Algebra <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </main>
  );
}
