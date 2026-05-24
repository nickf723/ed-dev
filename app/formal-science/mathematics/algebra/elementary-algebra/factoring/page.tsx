"use client";
import React from 'react';
import Link from 'next/link';
import DiamondSolver from "./_components/DiamondSolver";
import { M } from "@/app/_components/Math";
import ParabolaGraph from "./_components/ParabolaGraph";
import { STRATEGIES } from "./_components/factoringStrategies";
import { 
  ArrowLeft, Grid, Calculator, 
  Divide, Layers, Box, ChevronRight,
  ArrowRight, CheckCircle2
} from "lucide-react";

export default function FactoringPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a1f] text-slate-200 font-sans selection:bg-indigo-500/30 pb-32 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <ParabolaGraph />
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />
      
      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-indigo-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-indigo-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_06
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-white/10 pb-8">
                 <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                    <Divide size={48} className="text-indigo-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       FACTORING
                    </h1>
                    <p className="text-indigo-100/60 max-w-2xl text-lg leading-relaxed font-sans font-light border-l-2 border-indigo-500/50 pl-6">
                        The art of deconstruction. Factoring is reverse multiplication—breaking a polynomial down into its component parts to reveal its roots.
                    </p>
                 </div>
             </div>
        </header>

        
        {/* SECTION 1: THE CONCEPT (Interactive) */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-indigo-500" />
                <h2 className="text-xl font-bold text-indigo-300 uppercase tracking-widest">01 // The Diamond Method</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <DiamondSolver />
                </div>
                
                <div className="bg-slate-900/60 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-lg flex flex-col justify-center">
                    <h3 className="font-bold uppercase text-[10px] tracking-widest text-indigo-400 mb-4">Why this works</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        When multiplying binomials <span className="font-mono bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/30">(x+m)(x+n)</span>, the result expands to:
                    </p>
                    
                    <div className="text-center text-xl text-white bg-black/50 p-4 rounded-xl mb-6 border border-white/5 shadow-inner">
                        <M>x^2 + (m+n)x + (mn)</M>
                    </div>
                    
                    <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-indigo-500/50 pl-4">
                        Therefore, to go backwards from standard form, we need to find two mystery numbers that <strong>multiply</strong> to the constant term and <strong>add</strong> to the linear coefficient.
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 2: TECHNIQUE LIBRARY */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-indigo-500" />
                <h2 className="text-xl font-bold text-indigo-300 uppercase tracking-widest">02 // The Strategy Toolkit</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {STRATEGIES.map((s) => (
                    <div 
                        key={s.id}
                        className="group bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-lg hover:border-indigo-500/50 transition-all duration-300 flex flex-col relative overflow-hidden"
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                                {s.condition}
                            </div>
                            <div className="flex gap-1 items-center">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < s.difficulty ? 'bg-rose-500 shadow-[0_0_5px_rgba(244,63,94,0.5)]' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-6 relative z-10">
                            {s.name}
                        </h3>

                        {/* MATH RENDERER */}
                        <div className="text-lg text-indigo-100 bg-black/50 p-4 rounded-xl mb-6 text-center border border-white/5 shadow-inner relative z-10 overflow-x-auto overflow-y-hidden">
                            <M>{s.formula}</M>
                        </div>
                        
                        <p className="text-sm text-slate-400 leading-relaxed flex-1 relative z-10">
                            {s.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
        
        {/* SECTION 3: VISUAL PROOFS */}
        <section className="bg-gradient-to-br from-indigo-950/40 to-slate-900/40 backdrop-blur-2xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                 <Box size={300} />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                 <div>
                     <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">Geometric Proofs</h3>
                     <p className="text-slate-300 mb-6 leading-relaxed">
                         Factoring isn't just symbol manipulation; it describes physical space. The "Difference of Squares" can be proven by taking a square of side <M>a</M>, cutting out a square of side <M>b</M>, and rearranging the remaining area into a new rectangle!
                     </p>
                     <div className="inline-flex items-center gap-4 text-indigo-400 font-mono font-bold bg-indigo-500/10 px-4 py-2 rounded-lg border border-indigo-500/20">
                         <M>a^2 - b^2 = (a-b)(a+b)</M>
                     </div>
                 </div>
                 <div className="bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center p-4 shadow-inner overflow-hidden">
                </div>
             </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Deconstruction Mastered</h3>
                    <p className="text-indigo-100/50 text-sm font-sans font-light">You are ready to manipulate functions.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/functions" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-indigo-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]">
                Next: Functions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}