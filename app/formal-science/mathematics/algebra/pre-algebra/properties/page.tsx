"use client";
import Link from "next/link";
import PropertiesBackground from "./_components/PropertiesBackground";
import DistributiveLab from "./_components/DistributiveLab";
import {
  ArrowLeft, Brackets, ArrowRightLeft,
  Layers, ArrowRight, Shield
} from "lucide-react";

import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { propertiesVocab } from "@/app/_data/vocab/a/algebra-properties";
import { propertiesQuiz } from "./_components/assessment";

export default function PropertiesPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-emerald-500/30 pb-32">
      <PropertiesBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-emerald-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft size={12} /> Back to Pre-Algebra
            </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl shadow-inner">
              <Brackets className="text-emerald-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400 font-bold">
              Reorder · regroup · distribute · identity
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            NUMBER <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200">PROPERTIES</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-emerald-500/50 pl-6">
            Number properties describe rewrites that preserve value. They tell us when we may reorder, regroup, or distribute parts of an expression without changing what the expression means.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl flex flex-col gap-8">
              <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <ArrowRightLeft size={20} className="text-emerald-400" /> Commutative Property
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Addition and multiplication of ordinary numbers allow us to <strong>swap the order</strong> of addends or factors without changing the result.
                  </p>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-center text-lg">
                      <span className="text-white">a + b</span> <span className="text-emerald-400 mx-2">=</span> <span className="text-white">b + a</span>
                  </div>
                  <div className="text-[10px] text-red-400 uppercase font-bold tracking-widest mt-2 text-center">
                      Subtraction and division are not commutative.
                  </div>
              </div>

              <div className="h-px w-full bg-white/5" />

              <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Layers size={20} className="text-emerald-400" /> Associative Property
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      When we repeatedly add or repeatedly multiply, we may <strong>change the grouping</strong> without changing the result.
                  </p>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-center text-lg">
                      <span className="text-slate-500">(</span><span className="text-white">a + b</span><span className="text-slate-500">)</span> <span className="text-white">+ c</span>
                      <span className="text-emerald-400 mx-2">=</span>
                      <span className="text-white">a + </span><span className="text-slate-500">(</span><span className="text-white">b + c</span><span className="text-slate-500">)</span>
                  </div>
                  <div className="text-[10px] text-red-400 uppercase font-bold tracking-widest mt-2 text-center">
                      Subtraction and division are not associative.
                  </div>
              </div>

              <div className="h-px w-full bg-white/5" />

              <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <Shield size={20} className="text-emerald-400" /> Identity Property
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      An identity element leaves a value unchanged under its operation: zero for addition and one for multiplication.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-center">
                          <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest mb-2">Additive</div>
                          <div className="text-lg"><span className="text-white">a + 0</span> <span className="text-emerald-400 mx-1">=</span> <span className="text-white">a</span></div>
                      </div>
                      <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-center">
                          <div className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest mb-2">Multiplicative</div>
                          <div className="text-lg"><span className="text-white">a × 1</span> <span className="text-emerald-400 mx-1">=</span> <span className="text-white">a</span></div>
                      </div>
                  </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] z-20">
                    Area Model
                </div>

                <div className="mb-8 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        The Distributive Property
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Multiplying a sum by a factor is equivalent to multiplying each term by that factor and then adding the products. The area model below shows the same total area partitioned in two equivalent ways.
                    </p>
                </div>

                <DistributiveLab />
            </div>
          </div>
        </div>

        <section className="mt-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                <h2 className="text-sm font-bold text-emerald-300 uppercase tracking-widest">Reference & Check</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet
                        currentDomain="Properties"
                        localTerms={propertiesVocab || []}
                        accentColor="emerald"
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment
                        title="Knowledge Check: Number Properties"
                        questions={propertiesQuiz || []}
                        accentColor="emerald"
                        onComplete={(score, total) => console.log(`Properties Quiz Scored: ${score}/${total}`)}
                    />
                </div>
            </div>
        </section>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <ArrowRightLeft size={30} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Connect Forward</h3>
                    <p className="text-zinc-400 text-sm font-light">These value-preserving rewrites will reappear whenever algebraic expressions are rearranged, expanded, or simplified.</p>
                </div>
            </div>

            <Link href="/formal-science/mathematics/algebra/pre-algebra/ratios" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-emerald-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Next: Ratios & Proportions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </main>
  );
}