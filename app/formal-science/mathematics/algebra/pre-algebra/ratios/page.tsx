"use client";
import Link from "next/link";
import ScalingGridBackground from "./_components/ScalingGridBackground";
import ProportionSolverLab from "./_components/ProportionSolverLab";
import {
  Percent, Scale, X,
  ArrowRight, ShoppingCart, Map,
  ArrowLeft
} from "lucide-react";

import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { ratiosVocab } from "@/app/_data/vocab/r/ratios";
import { ratiosQuiz } from "./_components/assessment";

export default function RatiosPage() {
  return (
    <main className="relative min-h-screen bg-[#172554] text-slate-200 overflow-hidden font-sans selection:bg-rose-500/30 pb-32">
      <ScalingGridBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-rose-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft size={12} /> Back to Pre-Algebra
            </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl shadow-inner">
              <Percent className="text-rose-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-400 font-bold">
              Comparison · unit rate · proportional scale
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            RATIOS <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-200">&</span><br/>
            PROPORTIONS
          </h1>
          <p className="mt-6 text-slate-300 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-rose-500/50 pl-6">
            A ratio compares two quantities in a chosen order. A proportion states that two ratios are equal, so the same multiplicative relationship is preserved as the quantities scale.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5 space-y-12">
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Scale size={20} className="text-rose-400" /> Comparing in a Fixed Order
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">
                The same ratio can be written in several forms. In every form, the order of the two quantities matters:
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                 <div className="p-2 bg-black/40 rounded border border-white/10 font-bold text-white">2 to 3</div>
                 <div className="p-2 bg-black/40 rounded border border-white/10 font-bold text-white">2 : 3</div>
                 <div className="p-2 bg-black/40 rounded border border-white/10 font-bold text-white">2 / 3</div>
              </div>
              <p className="text-xs text-slate-400 mt-4 text-center">
                  “For every 2 of the first quantity, there are 3 of the second.”
              </p>
            </div>

            <div className="p-6 bg-blue-900/20 border border-blue-500/20 rounded-xl">
                <h4 className="text-sm font-bold text-white uppercase mb-2 flex items-center gap-2">
                    <ShoppingCart size={16} className="text-blue-400" /> Unit Rate
                </h4>
                <p className="text-xs text-slate-400 mb-3">
                    A unit rate rewrites a ratio so the second quantity is 1. That makes comparisons such as price per item much easier.
                </p>
                <div className="bg-black/40 p-3 rounded font-mono text-xs">
                    <div className="flex justify-between border-b border-white/10 pb-1 mb-1">
                        <span>$12 for 4 apples</span>
                        <span className="text-slate-500">original ratio</span>
                    </div>
                    <div className="flex justify-between font-bold text-blue-300">
                        <span>$3 per apple</span>
                        <span>unit rate</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 p-4 bg-slate-900/50 border border-white/10 rounded-xl">
                <Map className="text-rose-500 shrink-0" />
                <div>
                    <h4 className="text-sm font-bold text-white uppercase">Scale Drawings</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        A map scale such as 1 inch to 100 miles uses a constant ratio so distances can change size while proportional relationships are preserved.
                    </p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.4)] z-20">
                    Proportion Lab
                </div>
                <ProportionSolverLab />
            </div>

            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-sm font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <X size={16} className="text-rose-400" /> Cross Products
               </h4>
               <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  For a proportion with nonzero denominators, multiplying both sides by those denominators clears the fractions. This gives equal cross products. “Butterfly” is sometimes used as a mnemonic for remembering the diagonal pairs, but the equality comes from ordinary multiplication.
               </p>

               <div className="flex items-center justify-center gap-8 font-mono text-sm bg-black/30 p-6 rounded-xl border border-white/5">
                   <div className="flex flex-col items-center">
                        <span className="text-rose-400">3</span>
                        <div className="w-6 h-px bg-white/20 my-1"/>
                        <span className="text-white">4</span>
                   </div>
                   <span className="text-slate-500">=</span>
                   <div className="flex flex-col items-center">
                        <span className="text-white">x</span>
                        <div className="w-6 h-px bg-white/20 my-1"/>
                        <span className="text-rose-400">8</span>
                   </div>
                   <ArrowRight size={16} className="text-slate-600" />
                   <div className="bg-rose-950/30 border border-rose-500/20 p-3 rounded text-rose-300 font-bold">
                       3 · 8 = 4 · x
                   </div>
               </div>
            </div>
          </div>
        </div>

        <section className="mt-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-rose-500 rounded-full" />
                <h2 className="text-sm font-bold text-rose-300 uppercase tracking-widest">Reference & Check</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet
                        currentDomain="Ratios"
                        localTerms={ratiosVocab || []}
                        accentColor="rose"
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment
                        title="Knowledge Check: Scaling"
                        questions={ratiosQuiz || []}
                        accentColor="rose"
                        onComplete={(score, total) => console.log(`Ratios Quiz Scored: ${score}/${total}`)}
                    />
                </div>
            </div>
        </section>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <Scale size={30} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Connect Forward</h3>
                    <p className="text-zinc-400 text-sm font-light">Equivalent ratios and unit rates connect scaling to fraction operations, percentages, and later algebraic proportions.</p>
                </div>
            </div>

            <Link href="/formal-science/mathematics/algebra/pre-algebra/fractions" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-rose-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Next: Advanced Fractions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </main>
  );
}