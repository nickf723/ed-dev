"use client";
import Link from "next/link";
import ExponentsBackground from "./_components/ExponentsBackground";
import ExponentialGrowthLab from "./_components/ExponentialGrowthLab";
import {
  Superscript, ArrowRight, Rocket,
  Box, Square, ArrowLeft, Telescope
} from "lucide-react";

import Assessment from "@/app/_components/Assessment";
import VocabApplet from "@/app/_components/VocabApplet";
import { exponentsVocab } from "@/app/_data/vocab/e/exponents";
import { exponentsQuiz } from "./_components/assessment";

export default function ExponentsPage() {
  return (
    <main className="relative min-h-screen bg-[#1e1b4b] text-slate-200 overflow-hidden font-sans selection:bg-fuchsia-500/30 pb-32">
      <ExponentsBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        <header className="mb-16 border-b border-purple-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft size={12} /> Back to Pre-Algebra
            </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-xl shadow-inner">
              <Superscript className="text-purple-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-400 font-bold">
              Base · exponent · repeated multiplication
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            POWERS <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-fuchsia-300">&</span><br/>
            EXPONENTS
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-purple-500/50 pl-6">
            A power records repeated multiplication compactly. For a positive whole-number exponent, the exponent tells how many factors of the same base are multiplied together.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Rocket size={20} className="text-purple-400" /> Anatomy of a Power
              </h3>

              <div className="flex items-start justify-center gap-2 font-mono mb-8 p-6 bg-black/40 rounded-xl border border-white/5">
                  <div className="text-center">
                      <span className="text-6xl font-black text-purple-400 drop-shadow-lg">4</span>
                      <div className="text-[10px] text-purple-300 uppercase tracking-widest mt-2">Base</div>
                  </div>
                  <div className="text-center -mt-2">
                      <span className="text-3xl font-black text-fuchsia-400 drop-shadow-lg">3</span>
                      <div className="text-[10px] text-fuchsia-300 uppercase tracking-widest mt-1">Exponent</div>
                  </div>
              </div>

              <div className="space-y-3 text-sm text-slate-300 leading-relaxed bg-purple-950/20 p-4 rounded-xl border-l-4 border-purple-500">
                  <p><strong>Base:</strong> the repeated factor.</p>
                  <p><strong>Exponent:</strong> for a positive whole-number exponent, the number of times the base appears as a factor.</p>
                  <p><strong>Evaluate:</strong> multiply those factors together.</p>
                  <p className="font-mono text-fuchsia-300 pt-2 border-t border-white/10 mt-2 text-center text-lg">
                      4³ = 4 × 4 × 4 = 64
                  </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-900/30 border border-indigo-500/20 p-5 rounded-xl flex flex-col items-center text-center gap-3">
                    <Square size={24} className="text-indigo-400" />
                    <div>
                        <div className="text-sm font-bold text-white">Squared (x²)</div>
                        <div className="text-xs text-slate-400 mt-1">The name connects to the area of a square with side length x.</div>
                    </div>
                </div>
                <div className="bg-fuchsia-900/30 border border-fuchsia-500/20 p-5 rounded-xl flex flex-col items-center text-center gap-3">
                    <Box size={24} className="text-fuchsia-400" />
                    <div>
                        <div className="text-sm font-bold text-white">Cubed (x³)</div>
                        <div className="text-xs text-slate-400 mt-1">The name connects to the volume of a cube with side length x.</div>
                    </div>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] z-20">
                    Growth Model
                </div>
                <ExponentialGrowthLab />
            </div>

            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl flex flex-col md:flex-row items-center gap-6">
               <div className="p-4 bg-sky-900/30 rounded-full border border-sky-500/30 shrink-0">
                   <Telescope size={32} className="text-sky-400" />
               </div>
               <div>
                   <h4 className="text-base font-bold text-white uppercase mb-2">Scientific Notation</h4>
                   <p className="text-sm text-slate-300 leading-relaxed mb-4">
                       Powers of ten provide a compact way to represent very large or very small values. Scientific notation writes a number as a coefficient times a power of ten.
                   </p>
                   <div className="bg-black/40 p-4 rounded-xl font-mono text-sm border border-white/5">
                       <div className="flex justify-between items-center text-slate-400 mb-2 pb-2 border-b border-white/10">
                           <span>Standard Form</span>
                           <span>Scientific Notation</span>
                       </div>
                       <div className="flex justify-between items-center text-white">
                           <span>3,200,000</span>
                           <span className="text-sky-300">3.2 × 10<sup className="text-[10px] ml-0.5">6</sup></span>
                       </div>
                   </div>
               </div>
            </div>
          </div>
        </div>

        <section className="mt-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-purple-500 rounded-full" />
                <h2 className="text-sm font-bold text-purple-300 uppercase tracking-widest">Reference & Check</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet
                        currentDomain="Exponents"
                        localTerms={exponentsVocab || []}
                        accentColor="purple"
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment
                        title="Knowledge Check: Powers"
                        questions={exponentsQuiz || []}
                        accentColor="purple"
                        onComplete={(score, total) => console.log(`Exponents Quiz Scored: ${score}/${total}`)}
                    />
                </div>
            </div>
        </section>

        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                    <Superscript size={30} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Connect Forward</h3>
                    <p className="text-zinc-400 text-sm font-light">Powers become structural parts of algebraic terms, so recognizing bases and exponents prepares you to read expressions accurately.</p>
                </div>
            </div>

            <Link href="/formal-science/mathematics/algebra/pre-algebra/expressions" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-purple-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Next: Expressions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </main>
  );
}