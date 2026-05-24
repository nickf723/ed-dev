"use client";
import Link from "next/link";
import EquationsBackground from "./_components/EquationsBackground";
import EquationLogicLab from "./_components/EquationLogicLab";
import { 
  ArrowLeft, Scale, ArrowRight, XSquare, 
  Layers, CheckCircle2, ShieldAlert
} from "lucide-react";

// VERIFICATION PROTOCOL IMPORTS
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";
import { equationsVocab } from "@/app/_data/vocab/e/equations";
import { equationsQuiz } from "./_components/assessment";

export default function EquationsPage() {
  return (
    <main className="relative min-h-screen bg-[#2a0a12] text-slate-200 overflow-hidden font-sans selection:bg-rose-500/30 pb-32">
      <EquationsBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* =========================================
            HEADER
        ========================================= */}
        <header className="mb-16 border-b border-rose-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft size={12} /> Back to Pre-Algebra
            </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl shadow-inner">
              <Scale className="text-rose-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-400 font-bold">
              Module_08 // The Finale
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            SOLVING <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-pink-300">FOR X</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-rose-500/50 pl-6">
            This is it. The culmination of Pre-Algebra. We are taking the grammar of PEMDAS, the physics of number properties, and using them to hunt down the true value of unknown variables.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* LEFT: THEORY */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* The Golden Rule */}
            <div className="p-8 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <ShieldAlert size={20} className="text-rose-400" /> The Golden Rule
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  An equation is a perfectly balanced scale. To solve for X, you have to peel away numbers using Inverse Operations. <strong>But whatever you do to one side, you MUST do to the exact same thing to the other side.</strong>
              </p>
              
              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                      <div className="text-slate-500 mb-2">If you see (+)</div>
                      <div className="text-white font-bold">Subtract (-)</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                      <div className="text-slate-500 mb-2">If you see (-)</div>
                      <div className="text-white font-bold">Add (+)</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                      <div className="text-slate-500 mb-2">If you see (×)</div>
                      <div className="text-white font-bold">Divide (÷)</div>
                  </div>
                  <div className="bg-black/40 p-4 rounded-xl border border-white/5 text-center">
                      <div className="text-slate-500 mb-2">If you see (÷)</div>
                      <div className="text-white font-bold">Multiply (×)</div>
                  </div>
              </div>
            </div>

            {/* SADMEP */}
            <div className="p-6 bg-rose-950/20 border border-rose-500/20 rounded-2xl">
                <h4 className="text-base font-bold text-white uppercase mb-2 flex items-center gap-2">
                    <Layers size={18} className="text-rose-400" /> Working Backwards
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                    When simplifying an expression, we use PEMDAS. But when solving an equation, we are unwrapping a present. We work backwards (SADMEP)! Clear your loose addition and subtraction constants <em>before</em> dividing away the coefficient attached to your variable.
                </p>
            </div>

          </div>

          {/* RIGHT: THE LABORATORY */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(225,29,72,0.5)] z-20">
                    Interactive Lab
                </div>

                <EquationLogicLab />
            </div>

            {/* Substitution Check */}
            <div className="p-6 bg-slate-900/50 border border-white/5 rounded-2xl flex flex-col md:flex-row items-center gap-6">
               <div className="p-4 bg-emerald-900/30 rounded-full border border-emerald-500/30 shrink-0">
                   <XSquare size={32} className="text-emerald-400" />
               </div>
               <div>
                   <h4 className="text-base font-bold text-white uppercase mb-2">The Ultimate Cheat Code</h4>
                   <p className="text-sm text-slate-300 leading-relaxed mb-4">
                       Unlike History or English, in Algebra, you can always know if you got the right answer before you turn the test in. Just take your answer and plug it back into the original equation!
                   </p>
                   <div className="bg-black/40 px-4 py-3 rounded-xl font-mono text-sm border border-white/5 text-center flex items-center justify-center gap-4">
                       <span className="text-slate-400">2(x) = 8</span>
                       <ArrowRight size={14} className="text-slate-600"/>
                       <span className="text-emerald-400">2(4) = 8</span>
                       <span className="text-white font-bold bg-emerald-500/20 px-2 py-1 rounded">TRUE</span>
                   </div>
               </div>
            </div>
            
          </div>
        </div>

        {/* =========================================
            VERIFICATION PROTOCOL
        ========================================= */}
        <section className="mt-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-rose-500 rounded-full" />
                <h2 className="text-sm font-bold text-rose-300 uppercase tracking-widest">Verification Protocol</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet 
                        currentDomain="Equations" 
                        localTerms={equationsVocab || []} 
                        accentColor="rose" 
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment 
                        title="Knowledge Check: Logic & Strategy" 
                        questions={equationsQuiz || []} 
                        accentColor="rose"
                        onComplete={(score, total) => console.log(`Equations Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>
        </section>

        {/* =========================================
            FOOTER / NAVIGATION
        ========================================= */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Pre-Algebra Complete!</h3>
                    <p className="text-zinc-400 text-sm font-light">You are ready to graduate into true algebraic abstraction.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-rose-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Start: Elementary Algebra <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </main>
  );
}