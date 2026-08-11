"use client";
import Link from "next/link";
import OperationStackBackground from "./_components/OperationStackBackground";
import ExpressionSolverLab from "./_components/ExpressionSolverLab";
import {
  ListOrdered, ArrowLeft,
  ShieldAlert, BookOpen, Zap,
  ArrowRight
} from "lucide-react";

import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { pemdasVocab } from "@/app/_data/vocab/p/pemdas";
import { pemdasQuiz } from "./_components/assessment";

export default function PemdasPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30 pb-32">
      <OperationStackBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-orange-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft size={12} /> Back to Pre-Algebra
            </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl shadow-inner">
              <ListOrdered className="text-orange-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400 font-bold">
              Grouping · exponents · operation precedence
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            ORDER OF <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">OPERATIONS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-orange-500/50 pl-6">
            An expression can contain several operations at once. The order of operations gives everyone the same interpretation: grouping first, then exponents, then multiplication and division from left to right, then addition and subtraction from left to right.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 font-mono">
                <Zap size={20} className="text-orange-400" /> Operation Priority
              </h3>

              <div className="space-y-2">
                  <Level char="G" name="Grouping" desc="Work inside grouping symbols first: ( ) [ ] { }" color="bg-orange-500" />
                  <Level char="E" name="Exponents" desc="Evaluate powers and roots next." color="bg-amber-500" />
                  <Level char="MD" name="Multiply / Divide" desc="Equal precedence: move left to right." color="bg-sky-500" />
                  <Level char="AS" name="Add / Subtract" desc="Equal precedence: move left to right." color="bg-slate-500" />
              </div>

              <div className="mt-6 p-4 bg-red-950/30 border border-red-500/30 rounded-xl flex gap-3">
                  <ShieldAlert className="text-red-400 shrink-0" />
                  <div>
                      <h4 className="text-xs font-bold text-red-300 uppercase tracking-wider">Equal-Precedence Trap</h4>
                      <p className="text-[11px] text-red-200/70 mt-1 leading-relaxed">
                          Multiplication does <strong>not</strong> automatically come before division, and addition does <strong>not</strong> automatically come before subtraction. Within each pair, work from left to right.
                      </p>
                  </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl">
               <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Same Precedence, Left to Right</h4>
               <div className="font-mono bg-black/40 p-6 rounded-xl text-center border border-white/5">
                  <div className="text-2xl text-white font-black mb-4">10 − 2 + 5</div>
                  <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4">
                      <div className="opacity-40">
                          <div className="text-[10px] text-red-400 uppercase font-black mb-1">Add First · Wrong</div>
                          <div className="text-sm">10 − 7 = <span className="text-red-500">3</span></div>
                      </div>
                      <div>
                          <div className="text-[10px] text-emerald-400 uppercase font-black mb-1">Left to Right · Correct</div>
                          <div className="text-sm font-bold">8 + 5 = <span className="text-emerald-400">13</span></div>
                      </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] z-20">
                    Expression Lab
                </div>
                <ExpressionSolverLab />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500/30 transition-colors">
                   <div className="text-orange-400 font-black text-lg mb-2">Another Mnemonic: GEMA</div>
                   <p className="text-xs text-slate-400 leading-relaxed">
                       <strong>G</strong>rouping, <strong>E</strong>xponents, <strong>M</strong>ultiplication/Division, <strong>A</strong>ddition/Subtraction. The paired operations still have equal precedence and are handled left to right.
                   </p>
               </div>
               <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:border-orange-500/30 transition-colors">
                   <div className="text-orange-400 font-black text-lg mb-2">Implied Multiplication</div>
                   <p className="text-xs text-slate-400 leading-relaxed">
                       A number written directly beside a grouping symbol indicates multiplication. <br/>
                       <code className="text-orange-200 mt-2 inline-block">2(3) = 2 × 3 = 6</code>
                   </p>
               </div>
            </div>
          </div>
        </div>

        <section className="mt-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-orange-500 rounded-full" />
                <h2 className="text-sm font-bold text-orange-300 uppercase tracking-widest">Reference & Check</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet
                        currentDomain="Pre-Algebra"
                        localTerms={pemdasVocab || []}
                        accentColor="orange"
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment
                        title="Knowledge Check: Order of Operations"
                        questions={pemdasQuiz || []}
                        accentColor="orange"
                        onComplete={(score, total) => console.log(`PEMDAS Quiz Scored: ${score}/${total}`)}
                    />
                </div>
            </div>
        </section>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <BookOpen size={30} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Connect Forward</h3>
                    <p className="text-zinc-400 text-sm font-light">Order of operations tells us how to read an expression; properties tell us which rewrites preserve its value.</p>
                </div>
            </div>

            <Link href="/formal-science/mathematics/algebra/pre-algebra/properties" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Next: Properties <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </main>
  );
}

function Level({ char, name, desc, color }: { char: string; name: string; desc: string; color: string }) {
    return (
        <div className="flex items-center gap-4 p-3 bg-black/20 rounded-xl group hover:bg-white/5 transition-all border border-transparent hover:border-white/10">
            <div className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                {char}
            </div>
            <div>
                <div className="text-sm font-bold text-white tracking-tight">{name}</div>
                <div className="text-[10px] text-slate-500 group-hover:text-slate-300 transition-colors uppercase font-mono tracking-tighter">{desc}</div>
            </div>
        </div>
    );
}