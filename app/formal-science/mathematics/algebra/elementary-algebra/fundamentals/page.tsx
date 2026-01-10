"use client";
import React from "react";
import Link from "next/link";
import FundamentalsBackground from "./FundamentalsBackground";
import { 
  ArrowLeft, Hash, ListOrdered, 
  ArrowRight, Variable, CheckCircle2, 
  HelpCircle, Divide, Plus, X
} from "lucide-react";

export default function FundamentalsPage() {
  return (
    <main className="relative min-h-screen bg-[#022c22] text-white overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <FundamentalsBackground />
      
      {/* OVERLAY: GRID & VIGNETTE */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-emerald-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_01
             </Link>
             <div className="flex items-end gap-6 border-b border-emerald-500/30 pb-6">
                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg backdrop-blur-md">
                    <Hash size={40} className="text-emerald-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       FUNDAMENTALS
                    </h1>
                    <p className="text-emerald-400/60 max-w-md text-sm leading-relaxed">
                        The axiomatic structures of algebra: Number sets, operations, and the rules of engagement.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE REAL NUMBER SYSTEM (Nested Boxes) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-emerald-500" />
                <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">01 // The Real Number System</h2>
            </div>
            
            <div className="relative p-8 border border-emerald-500/30 rounded-xl bg-black/40 backdrop-blur-md">
                <div className="absolute top-0 right-0 p-2 text-[10px] text-emerald-500/50 uppercase">Domain: ℝ</div>
                
                {/* Visualizing Sets as Nested Containers */}
                

[Image of real number system diagram]

                <div className="border border-emerald-500/20 rounded-lg p-6 bg-emerald-900/10">
                    <span className="text-emerald-200 font-bold block mb-4">ℝ Real Numbers</span>
                    
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* LEFT: RATIONALS */}
                        <div className="flex-1 border border-emerald-500/30 rounded p-4 bg-emerald-900/20 relative">
                             <span className="text-emerald-300 font-bold block mb-4">ℚ Rationals</span>
                             <div className="text-xs text-emerald-500/60 mb-2 font-mono">Ex: 1/2, 0.75, -5</div>
                             
                             {/* NESTED: INTEGERS */}
                             <div className="border border-emerald-500/30 rounded p-4 bg-emerald-900/30 relative mt-4">
                                <span className="text-emerald-400 font-bold block mb-4">ℤ Integers</span>
                                <div className="text-xs text-emerald-500/60 mb-2 font-mono">Ex: ...-2, -1, 0, 1, 2...</div>

                                {/* NESTED: WHOLE */}
                                <div className="border border-emerald-500/30 rounded p-4 bg-emerald-900/40 relative mt-4">
                                    <span className="text-emerald-500 font-bold block mb-2">ℕ Natural</span>
                                    <div className="text-xs text-emerald-500/60 font-mono">1, 2, 3...</div>
                                </div>
                             </div>
                        </div>

                        {/* RIGHT: IRRATIONALS */}
                        <div className="w-1/3 border border-dashed border-emerald-500/30 rounded p-4 flex flex-col justify-center items-center bg-black/20">
                            <span className="text-emerald-600 font-bold block mb-4">Irrational</span>
                            <div className="text-4xl font-serif text-emerald-500/20">π</div>
                            <div className="text-xs text-emerald-500/60 mt-2 font-mono text-center">Non-terminating,<br/>Non-repeating</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 2: ORDER OF OPERATIONS (Interactive Stack) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-emerald-500" />
                <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">02 // Order of Operations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* The Concept */}
                <div className="space-y-4">
                    <div className="p-4 bg-emerald-950/30 border-l-4 border-emerald-500 rounded-r-lg">
                        <h3 className="font-bold text-emerald-200 mb-1">Strict Hierarchy</h3>
                        <p className="text-sm text-zinc-400">Math is not read strictly left-to-right like text. It is parsed by rank.</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-2">
                        {['Parentheses ( )', 'Exponents x²', 'Mult/Div × ÷', 'Add/Sub + -'].map((step, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 bg-white/5 rounded border border-white/5 hover:border-emerald-500/50 transition-colors">
                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">{i+1}</div>
                                <span className="font-mono text-sm">{step}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* The Example */}
                <div className="relative p-6 border border-emerald-500/30 rounded-xl bg-black/60 flex flex-col items-center justify-center font-mono">
                    <div className="text-xs text-emerald-600 absolute top-4 left-4">EVALUATOR_V1</div>
                    
                    <div className="text-2xl mb-8 opacity-50">3 + 4 × 2 - 1</div>
                    <ArrowRight className="rotate-90 text-emerald-500/50 mb-2" size={20}/>
                    
                    <div className="text-2xl mb-8">3 + <span className="text-emerald-400 font-bold border-b-2 border-emerald-500">8</span> - 1</div>
                    <ArrowRight className="rotate-90 text-emerald-500/50 mb-2" size={20}/>
                    
                    <div className="text-2xl mb-8"><span className="text-emerald-400 font-bold border-b-2 border-emerald-500">11</span> - 1</div>
                    <ArrowRight className="rotate-90 text-emerald-500/50 mb-2" size={20}/>
                    
                    <div className="text-4xl font-bold text-emerald-400 bg-emerald-500/20 px-6 py-2 rounded border border-emerald-500">10</div>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE VARIABLE (Black Box Metaphor) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-emerald-500" />
                <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">03 // The Variable</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2 p-8 border border-dashed border-emerald-500/30 rounded-xl bg-emerald-900/5 flex items-center gap-8">
                    <div className="w-24 h-24 bg-black border-2 border-emerald-500 rounded flex items-center justify-center relative shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        <span className="text-5xl font-serif italic text-white">x</span>
                        <div className="absolute -bottom-6 text-[10px] text-emerald-500 font-mono uppercase">Placeholder</div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">A Container for Value</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            A variable is not a letter; it is a bucket. It holds a number we don't know yet, or a number that can change. 
                            Evaluating an expression is just "pouring" a number into the bucket.
                        </p>
                    </div>
                </div>

                <div className="p-6 bg-emerald-950/40 border border-emerald-500/20 rounded-xl flex flex-col justify-between">
                     <div className="text-xs font-mono text-emerald-500 uppercase mb-4">Substitution</div>
                     <div className="font-mono text-lg mb-2">
                        If <span className="text-emerald-400">x = 5</span>
                     </div>
                     <div className="font-mono text-sm opacity-60 mb-4">
                        Then 2x + 3
                     </div>
                     <div className="font-mono text-xl border-t border-emerald-500/30 pt-4">
                        2(<span className="text-emerald-400">5</span>) + 3 = <span className="text-white font-bold">13</span>
                     </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}