"use client";
import React from "react";
import Link from "next/link";

// Visuals & Labs
import FundamentalsBackground from "./_components/FundamentalsBackground";
import ExpressionSolverLab from "../../pre-algebra/pemdas/_components/ExpressionSolverLab";
import { 
  ArrowLeft, Hash, ListOrdered, 
  ArrowRight, Variable, CheckCircle2, 
  Layers, Package, Zap
} from "lucide-react";

// VERIFICATION PROTOCOL IMPORTS
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";
import { algebraFundamentalsVocab } from "@/app/_data/vocab/a/algebra-fundamentals";
import { fundamentalsQuiz } from "./_components/assessment";

export default function FundamentalsPage() {
  return (
    <main className="relative min-h-screen bg-[#022c22] text-white overflow-hidden font-sans selection:bg-emerald-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <FundamentalsBackground />
      
      {/* OVERLAY: GRID & VIGNETTE */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-24">
        
        {/* =========================================
            HEADER
        ========================================= */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 hover:text-white transition-colors mb-8 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-emerald-500/30 shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_01
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-emerald-500/20 pb-8">
                 <div className="w-20 h-20 border border-emerald-500/50 flex items-center justify-center bg-black/40 backdrop-blur-xl relative overflow-hidden group rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <div className="absolute inset-0 bg-emerald-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <Hash size={40} className="text-emerald-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       FUNDAMENTALS
                    </h1>
                    <p className="text-emerald-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-emerald-500/50 pl-6">
                        The axiomatic structures of algebra: defining the number sets, the strict grammar of operations, and the power of the variable container.
                    </p>
                 </div>
             </div>
        </header>

        {/* =========================================
            SECTION 1: THE REAL NUMBER SYSTEM
        ========================================= */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                <h2 className="text-sm font-bold text-emerald-300 uppercase tracking-widest">01 // The Real Number System</h2>
            </div>
            
            <div className="relative p-8 md:p-12 border border-white/10 rounded-3xl bg-slate-900/40 backdrop-blur-2xl shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute top-6 right-8 text-[10px] text-emerald-500 font-bold tracking-widest uppercase border border-emerald-500/20 px-3 py-1 rounded-full bg-emerald-500/10">Domain: ℝ</div>
                
                <div className="border border-emerald-500/30 rounded-2xl p-8 bg-emerald-900/20 shadow-inner relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                        <Layers className="text-emerald-400" size={24} />
                        <span className="text-2xl text-white font-black tracking-tight">ℝ Real Numbers</span>
                    </div>
                    
                    <div className="flex flex-col lg:flex-row gap-6">
                        
                        {/* LEFT: RATIONALS (Nested Structure) */}
                        <div className="flex-1 border border-emerald-500/40 rounded-xl p-6 bg-black/40 shadow-lg relative overflow-hidden transition-all hover:border-emerald-400/60">
                             <span className="text-emerald-300 font-bold text-xl block mb-2">ℚ Rationals</span>
                             <div className="text-sm text-emerald-100/60 mb-6 font-mono bg-white/5 inline-block px-3 py-1 rounded">Ex: 1/2, 0.75, -5</div>
                             
                             {/* NESTED: INTEGERS */}
                             <div className="border border-teal-500/40 rounded-xl p-6 bg-teal-900/30 relative mt-4 shadow-inner">
                                <span className="text-teal-400 font-bold text-lg block mb-2">ℤ Integers</span>
                                <div className="text-sm text-teal-100/60 mb-6 font-mono bg-black/40 inline-block px-3 py-1 rounded">Ex: ...-2, -1, 0, 1, 2...</div>

                                {/* NESTED: WHOLE / NATURAL */}
                                <div className="border border-green-500/40 rounded-xl p-6 bg-green-900/40 relative mt-4 shadow-inner">
                                    <span className="text-green-400 font-bold text-lg block mb-2">ℕ Natural</span>
                                    <div className="text-sm text-green-100/60 font-mono bg-black/40 inline-block px-3 py-1 rounded">1, 2, 3...</div>
                                </div>
                             </div>
                        </div>

                        {/* RIGHT: IRRATIONALS */}
                        <div className="w-full lg:w-1/3 border-2 border-dashed border-emerald-500/30 rounded-xl p-8 flex flex-col justify-center items-center bg-black/40 hover:bg-emerald-900/20 transition-colors">
                            <span className="text-emerald-400 font-bold text-xl block mb-6">Irrational</span>
                            <div className="text-7xl font-serif text-white drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">π</div>
                            <div className="text-sm text-emerald-100/60 mt-6 font-mono text-center leading-relaxed">
                                Non-terminating,<br/>Non-repeating decimals.
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* =========================================
            SECTION 2: ORDER OF OPERATIONS (LAB INJECTED)
        ========================================= */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                <h2 className="text-sm font-bold text-emerald-300 uppercase tracking-widest">02 // Order of Operations</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* The Concept */}
                <div className="lg:col-span-4 space-y-6 bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                    <div className="flex items-start gap-4">
                        <ListOrdered className="text-emerald-400 mt-1 shrink-0" size={24} />
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Strict Hierarchy</h3>
                            <p className="text-sm text-slate-400 leading-relaxed mb-6">
                                Mathematics is not read strictly left-to-right like text. Expressions are parsed and evaluated by mathematical rank using the PEMDAS architecture.
                            </p>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                        {['Parentheses ( )', 'Exponents x²', 'Mult/Div × ÷', 'Add/Sub + -'].map((step, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 bg-black/40 rounded-xl border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-900/20 transition-all cursor-default">
                                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm font-black">{i+1}</div>
                                <span className="font-mono text-sm font-bold text-white tracking-wide">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* THE LAB */}
                <div className="lg:col-span-8">
                    <div className="relative">
                        <div className="absolute -top-3 left-8 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] z-20">
                            Interactive Lab
                        </div>
                        {/* Ensure your ExpressionSolverLab handles taking an accent color if needed, or just let its native orange colors contrast with the emerald page! */}
                        <ExpressionSolverLab />
                    </div>
                </div>
            </div>
        </section>

        {/* =========================================
            SECTION 3: THE VARIABLE
        ========================================= */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                <h2 className="text-sm font-bold text-emerald-300 uppercase tracking-widest">03 // The Variable</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Visual Explanation */}
                <div className="md:col-span-7 p-8 md:p-12 border border-white/5 rounded-3xl bg-slate-900/40 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-8 shadow-xl">
                    <div className="w-32 h-32 bg-black/80 border-2 border-emerald-500 rounded-2xl flex items-center justify-center relative shadow-[0_0_40px_rgba(16,185,129,0.3)] shrink-0 group hover:scale-105 transition-transform cursor-crosshair">
                        <span className="text-6xl font-serif italic text-white group-hover:text-emerald-400 transition-colors">x</span>
                        <div className="absolute -bottom-4 bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Container</div>
                    </div>
                    <div>
                        <h3 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
                            <Package className="text-emerald-400" /> A Box for Value
                        </h3>
                        <p className="text-base text-slate-300 leading-relaxed">
                            A variable is not a specific, permanent letter; it is a conceptual bucket. It holds a number we don't know yet, or a number that changes depending on the situation. Evaluating an expression simply means "pouring" a known number into the bucket and running the math.
                        </p>
                    </div>
                </div>

                {/* Code-like execution block */}
                <div className="md:col-span-5 p-8 bg-black/60 border border-emerald-500/30 rounded-3xl flex flex-col justify-center relative overflow-hidden shadow-2xl">
                     <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-teal-400 left-0" />
                     <div className="text-[10px] font-black font-mono text-emerald-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                         <Zap size={14} /> Execution Trace
                     </div>
                     
                     <div className="font-mono text-lg mb-4 text-slate-400">
                        Let <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">x = 5</span>
                     </div>
                     <div className="font-mono text-xl text-white mb-6 bg-white/5 p-4 rounded-xl border border-white/10">
                        Evaluate: <span className="font-bold tracking-widest ml-2">2x + 3</span>
                     </div>
                     
                     <div className="font-mono text-2xl border-t border-emerald-500/20 pt-6 flex items-center gap-3">
                        <ArrowRight className="text-emerald-600" />
                        <span>2(<span className="text-emerald-400 font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">5</span>) + 3 = <span className="text-white font-black bg-emerald-600/30 px-3 py-1 rounded-lg border border-emerald-500/50">13</span></span>
                     </div>
                </div>
            </div>
        </section>

        {/* =========================================
            SECTION 4: VERIFICATION PROTOCOL
        ========================================= */}
        <section className="pt-12 border-t border-white/10">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-emerald-500 rounded-full" />
                <h2 className="text-sm font-bold text-emerald-300 uppercase tracking-widest">Verification Protocol</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet 
                        currentDomain="Fundamentals" 
                        localTerms={algebraFundamentalsVocab || []} 
                        accentColor="emerald" 
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment 
                        title="Knowledge Check: Logic & Syntax" 
                        questions={fundamentalsQuiz || []} 
                        accentColor="emerald"
                        onComplete={(score, total) => console.log(`Fundamentals Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>
        </section>

        {/* =========================================
            FOOTER / NAVIGATION
        ========================================= */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Foundations Secured</h3>
                    <p className="text-emerald-100/50 text-sm font-light">You are ready to map variables to visual space.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/linear-equations" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(52,211,153,0.5)]">
                Next: Linear Equations <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}