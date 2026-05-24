"use client";
import React from "react";
import Link from "next/link";
import RationalBackground from "./_components/RationalBackground";
import AsymptoteExplorerLab from "./_components/AsymptoteExplorerLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Calculator, AlertTriangle, 
  X, Minimize2, ArrowRight, CheckCircle2,
  ArrowDown
} from "lucide-react";

export default function RationalPage() {
  return (
    <main className="relative min-h-screen bg-[#090515] text-white overflow-hidden font-sans selection:bg-violet-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <RationalBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-violet-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-violet-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_07
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-violet-500/30 pb-8">
                 <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(139,92,246,0.2)]">
                    <Calculator size={48} className="text-violet-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       RATIONAL EXP.
                    </h1>
                    <p className="text-violet-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-violet-500/50 pl-6">
                        Algebraic fractions. Polynomials divided by polynomials. The study of infinite asymptotes and mathematical singularities.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE DEFINITION & THE DANGER */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-violet-500" />
                    <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">01 // The Singularity</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    A rational expression is simply a fraction where the numerator and denominator are polynomials. However, because variables live in the denominator, you face a critical danger: <strong>Division by Zero</strong>.
                </p>

                {/* THE WARNING */}
                <div className="flex items-start gap-4 p-5 border border-red-500/30 bg-red-950/20 rounded-2xl shadow-inner mt-8">
                    <AlertTriangle className="text-red-500 shrink-0" size={24} />
                    <div>
                        <h3 className="text-red-400 font-bold text-sm uppercase mb-1 tracking-widest">Domain Restriction</h3>
                        <p className="text-sm text-red-200/70 leading-relaxed">
                            Any x-value that makes the denominator equal to exactly <strong className="text-white">zero</strong> is strictly excluded from the domain. The graph physically cannot exist at that point, creating an invisible wall.
                        </p>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Interactive Lab */}
            <div className="lg:col-span-7">
                <AsymptoteExplorerLab />
            </div>
        </section>

        {/* SECTION 2: SIMPLIFYING (The Hole) */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">02 // Simplifying & Holes</h2>
            </div>
            
            <div className="bg-violet-950/20 border border-violet-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-xl">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
                     
                     {/* Step 1: Factor */}
                     <div className="flex flex-col items-center gap-4 group">
                         <div className="text-xs font-sans text-violet-400 font-bold uppercase tracking-widest">1. Factor</div>
                         <div className="flex flex-col items-center justify-center bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner w-full group-hover:border-violet-500/50 transition-colors h-40">
                             <div className="text-xl text-white"><M>{String.raw`\frac{x^2 - 9}{x + 3}`}</M></div>
                         </div>
                     </div>

                     {/* Step 2: Expand */}
                     <div className="flex flex-col items-center gap-4 group">
                         <div className="text-xs font-sans text-violet-400 font-bold uppercase tracking-widest">2. Expand</div>
                         <div className="flex flex-col items-center justify-center bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner w-full group-hover:border-violet-500/50 transition-colors h-40">
                             <div className="text-xl text-white"><M>{String.raw`\frac{(x-3)(x+3)}{(x+3)}`}</M></div>
                         </div>
                     </div>

                     {/* Step 3: Cancel */}
                     <div className="flex flex-col items-center gap-4 group">
                         <div className="text-xs font-sans text-violet-400 font-bold uppercase tracking-widest">3. Cancel</div>
                         <div className="flex flex-col items-center justify-center bg-violet-950/40 p-6 rounded-2xl border border-violet-500/50 shadow-[0_0_20px_rgba(139,92,246,0.2)] w-full h-40">
                             <div className="text-2xl text-violet-400 font-bold drop-shadow-md mb-3"><M>{String.raw`x - 3`}</M></div>
                             <div className="text-[10px] text-zinc-400 border border-zinc-700 rounded px-2 py-1 uppercase tracking-widest font-mono">Hole at x = -3</div>
                         </div>
                     </div>

                 </div>
                 
                 <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                        <strong className="text-white">The Cancellation Rule:</strong> You can only cancel <strong>factors</strong> (pieces bound by multiplication). If a restriction gets cancelled out of the denominator, it ceases to be an asymptote and becomes a literal "hole" in the graph.
                    </p>
                 </div>
            </div>
        </section>

        {/* SECTION 3: OPERATIONS */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">03 // Arithmetic Operations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Multiplication/Division */}
                <div className="p-8 border border-violet-500/20 bg-black/40 rounded-3xl backdrop-blur-xl shadow-lg hover:border-violet-500/40 transition-colors flex flex-col">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Mult & Divide</h3>
                        <X size={24} className="text-violet-400" />
                     </div>
                     <p className="text-sm text-zinc-300 mb-8 leading-relaxed">
                        Multiply straight across the top and bottom. For division, multiply by the reciprocal (Keep-Change-Flip).
                     </p>
                     
                     <div className="bg-black/60 p-6 rounded-2xl border border-white/5 shadow-inner mt-auto flex flex-col items-center gap-4">
                        <div className="text-lg text-violet-300">
                            <M display={true}>{String.raw`\frac{A}{B} \div \frac{C}{D} = \frac{A}{B} \cdot \frac{D}{C}`}</M>
                        </div>
                     </div>
                </div>

                {/* Addition/Subtraction */}
                <div className="p-8 border border-sky-500/20 bg-black/40 rounded-3xl backdrop-blur-xl shadow-lg hover:border-sky-500/40 transition-colors flex flex-col">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">Add & Subtract</h3>
                        <Minimize2 size={24} className="text-sky-400" />
                     </div>
                     <p className="text-sm text-zinc-300 mb-8 leading-relaxed">
                        Requires a Lowest Common Denominator (LCD). This forces you to multiply the top and bottom of each fraction by the missing factors.
                     </p>
                     
                     <div className="bg-black/60 p-6 rounded-2xl border border-white/5 shadow-inner mt-auto flex flex-col items-center gap-4">
                        <div className="text-lg text-sky-300">
                            <M display={true}>{String.raw`\frac{1}{x} + \frac{1}{y} = \frac{y+x}{xy}`}</M>
                        </div>
                     </div>
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Singularities Mapped</h3>
                    <p className="text-violet-100/50 text-sm font-sans font-light">You have mastered polynomial fractions and exclusions.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/radicals" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-violet-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Next: Radicals <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}