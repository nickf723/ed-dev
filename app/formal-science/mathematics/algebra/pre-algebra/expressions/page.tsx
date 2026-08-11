"use client";
import Link from "next/link";
import ExpressionsBackground from "./_components/ExpressionsBackground";
import ExpressionEngineLab from "./_components/ExpressionEngineLab";
import {
  Variable, ArrowRight,
  Combine, SplitSquareHorizontal, ArrowLeft, Tag
} from "lucide-react";

import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { expressionsVocab } from "@/app/_data/vocab/a/algebra-expressions";
import { expressionsQuiz } from "./_components/assessment";

export default function ExpressionsPage() {
  return (
    <main className="relative min-h-screen bg-[#082f49] text-slate-200 overflow-hidden font-sans selection:bg-cyan-500/30 pb-32">
      <ExpressionsBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-cyan-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft size={12} /> Back to Pre-Algebra
            </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl shadow-inner">
              <Variable className="text-cyan-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-400 font-bold">
              Terms · coefficients · variables · like terms
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            ALGEBRAIC <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">EXPRESSIONS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-cyan-500/50 pl-6">
            An algebraic expression combines numbers, variables, and operations to represent a value. Unlike an equation, an expression does not claim that two expressions are equal; it can instead be evaluated, simplified, or rewritten.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Tag size={20} className="text-cyan-400" /> Anatomy of an Expression
              </h3>

              <div className="font-mono text-center mb-8 p-6 bg-black/40 rounded-xl border border-white/5 text-4xl font-black">
                  <span className="text-cyan-400 relative group cursor-help">
                      3
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-cyan-300 tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity">Coefficient</span>
                  </span>
                  <span className="text-white relative group cursor-help">
                      x
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] text-slate-300 tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity">Variable</span>
                  </span>
                  <span className="text-slate-500 mx-3">+</span>
                  <span className="text-amber-400 relative group cursor-help">
                      5
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] text-amber-300 tracking-widest font-sans opacity-0 group-hover:opacity-100 transition-opacity">Constant term</span>
                  </span>
              </div>

              <div className="space-y-4">
                  <div className="bg-cyan-950/20 p-4 rounded-xl border-l-4 border-cyan-500">
                      <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider mb-1">Coefficient</h4>
                      <p className="text-xs text-slate-300">The numerical factor multiplying a variable part. In 3x, the coefficient is 3; in −x, the coefficient is −1.</p>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-slate-500">
                      <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Variable</h4>
                      <p className="text-xs text-slate-300">A symbol that can stand for an unknown, changing, or generalized value.</p>
                  </div>
                  <div className="bg-amber-950/20 p-4 rounded-xl border-l-4 border-amber-500">
                      <h4 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-1">Constant Term</h4>
                      <p className="text-xs text-slate-300">A term with no variable factor. Its value does not depend on the variable.</p>
                  </div>
              </div>
            </div>

            <div className="p-6 bg-sky-900/30 border border-sky-500/20 rounded-2xl">
                <h4 className="text-base font-bold text-white uppercase mb-2 flex items-center gap-2">
                    <Combine size={18} className="text-sky-400" /> Like Terms
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                    Like terms have the <strong>same variable part with the same exponents</strong>. Their coefficients may differ, and those coefficients can be combined.
                </p>
                <div className="grid grid-cols-2 gap-4 text-center font-mono text-sm">
                    <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-lg">
                        <div className="text-emerald-400 mb-1 font-bold">LIKE TERMS</div>
                        <span className="text-white">3x + 2x = 5x</span>
                    </div>
                    <div className="bg-red-950/30 border border-red-500/30 p-3 rounded-lg">
                        <div className="text-red-400 mb-1 font-bold">NOT LIKE TERMS</div>
                        <span className="text-white">3x² + 2x</span>
                    </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-cyan-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.4)] z-20">
                    Expression Lab
                </div>

                <ExpressionEngineLab />
            </div>

            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-base font-bold text-white uppercase mb-4 flex items-center gap-2">
                   <SplitSquareHorizontal size={18} className="text-cyan-400" /> Words to Expressions
               </h4>
               <p className="text-sm text-slate-300 leading-relaxed mb-4">
                   Verbal relationships can be represented symbolically. Pay attention to order-sensitive phrases such as “less than.”
               </p>

               <ul className="space-y-2 font-mono text-sm">
                   <li className="flex justify-between items-center bg-black/40 p-3 rounded border border-white/5">
                       <span className="text-slate-400">“5 more than a number”</span>
                       <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-1 rounded">x + 5</span>
                   </li>
                   <li className="flex justify-between items-center bg-black/40 p-3 rounded border border-white/5">
                       <span className="text-slate-400">“Twice a number”</span>
                       <span className="text-cyan-400 font-bold bg-cyan-500/10 px-2 py-1 rounded">2x</span>
                   </li>
                   <li className="flex justify-between items-center bg-black/40 p-3 rounded border border-white/5">
                       <span className="text-slate-400">“4 less than a number”</span>
                       <span className="text-red-400 font-bold bg-red-500/10 px-2 py-1 rounded">x − 4</span>
                   </li>
               </ul>
            </div>
          </div>
        </div>

        <section className="mt-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-cyan-500 rounded-full" />
                <h2 className="text-sm font-bold text-cyan-300 uppercase tracking-widest">Reference & Check</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet
                        currentDomain="Expressions"
                        localTerms={expressionsVocab || []}
                        accentColor="cyan"
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment
                        title="Knowledge Check: Expression Structure"
                        questions={expressionsQuiz || []}
                        accentColor="cyan"
                        onComplete={(score, total) => console.log(`Expressions Quiz Scored: ${score}/${total}`)}
                    />
                </div>
            </div>
        </section>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                    <Variable size={30} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Connect Forward</h3>
                    <p className="text-zinc-400 text-sm font-light">Once two expressions are related by equality, the next question is which values make that equation true.</p>
                </div>
            </div>

            <Link href="/formal-science/mathematics/algebra/pre-algebra/equations" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-cyan-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Next: Solving for X <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </main>
  );
}