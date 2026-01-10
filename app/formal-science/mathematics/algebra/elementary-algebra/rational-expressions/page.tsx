"use client";
import React from "react";
import Link from "next/link";
import RationalBackground from "./RationalBackground";
import { 
  ArrowLeft, Calculator, AlertTriangle, 
  Divide, X, Minimize2, ArrowRight
} from "lucide-react";

export default function RationalPage() {
  return (
    <main className="relative min-h-screen bg-[#090515] text-white overflow-hidden font-mono selection:bg-violet-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <RationalBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-violet-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_07
             </Link>
             <div className="flex items-end gap-6 border-b border-violet-500/30 pb-6">
                 <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <Calculator size={40} className="text-violet-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       RATIONAL EXP.
                    </h1>
                    <p className="text-violet-400/60 max-w-md text-sm leading-relaxed">
                        Algebraic fractions. Polynomials divided by polynomials. The study of asymptotes and holes.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE DEFINITION & THE DANGER */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-violet-500" />
                    <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">01 // The Ratio</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A rational expression is simply a fraction where the numerator and denominator are polynomials.
                </p>
                
                <div className="p-6 border border-violet-500/20 bg-black/40 rounded-xl flex items-center gap-8 font-mono text-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-violet-500/5 group-hover:bg-violet-500/10 transition-colors" />
                    
                    <div className="flex flex-col items-center">
                        <span className="border-b-2 border-white px-4 mb-2">x² + 5x + 6</span>
                        <span className="px-4 text-violet-300">x + 2</span>
                    </div>
                    
                    <span className="text-violet-500 text-sm">=</span>
                    
                    <div className="text-violet-200">
                        x + 3
                    </div>
                </div>

                {/* THE WARNING */}
                <div className="flex items-start gap-4 p-4 border border-red-500/30 bg-red-950/10 rounded-lg">
                    <AlertTriangle className="text-red-500 shrink-0" />
                    <div>
                        <h3 className="text-red-400 font-bold text-sm uppercase mb-1">Domain Restriction</h3>
                        <p className="text-xs text-red-200/60">
                            You cannot divide by zero. Any x-value that makes the denominator zero is <strong>excluded</strong> from the domain.
                        </p>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Graph */}
            <div className="aspect-square relative border border-violet-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8">
                 

[Image of rational function graph with asymptotes]

                 
                 {/* Visual Asymptotes */}
                 <div className="absolute h-full w-px bg-violet-500 border-l border-dashed border-white/50 left-1/3" />
                 <div className="absolute w-full h-px bg-violet-500 border-t border-dashed border-white/50 top-1/2" />
                 
                 <div className="absolute bottom-4 right-4 text-xs font-mono text-violet-400">f(x) = 1/x</div>
            </div>
        </section>

        {/* SECTION 2: SIMPLIFYING (The Hole) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">02 // Simplifying</h2>
            </div>
            
            <div className="bg-violet-950/20 border border-violet-500/30 rounded-xl p-8">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center font-mono text-xl">
                     
                     {/* Step 1: Factor */}
                     <div className="flex flex-col items-center gap-4 opacity-50 hover:opacity-100 transition-opacity">
                         <div className="text-xs font-sans text-violet-400 font-bold uppercase tracking-widest">1. Factor</div>
                         <div className="flex flex-col items-center">
                             <span className="border-b border-white/20 px-2 pb-1 mb-1">x² - 9</span>
                             <span>x + 3</span>
                         </div>
                     </div>

                     <ArrowRight className="text-violet-500 hidden md:block" />

                     {/* Step 2: Expand */}
                     <div className="flex flex-col items-center gap-4 hover:scale-105 transition-transform">
                         <div className="text-xs font-sans text-violet-400 font-bold uppercase tracking-widest">2. Expand</div>
                         <div className="flex flex-col items-center">
                             <span className="border-b border-white/20 px-2 pb-1 mb-1">
                                 (x-3)<span className="text-violet-400">(x+3)</span>
                             </span>
                             <span className="text-violet-400">(x+3)</span>
                         </div>
                     </div>

                     <ArrowRight className="text-violet-500 hidden md:block" />

                     {/* Step 3: Cancel */}
                     <div className="flex flex-col items-center gap-4">
                         <div className="text-xs font-sans text-violet-400 font-bold uppercase tracking-widest">3. Cancel</div>
                         <div className="flex items-center gap-2">
                             <span>x - 3</span>
                             <span className="text-xs text-zinc-500 border border-zinc-700 rounded px-1">Hole at x=-3</span>
                         </div>
                     </div>

                 </div>
                 
                 <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-sm text-zinc-400">
                        <strong className="text-white">Rule:</strong> You can only cancel <strong>factors</strong> (things multiplied), never <strong>terms</strong> (things added).
                    </p>
                 </div>
            </div>
        </section>

        {/* SECTION 3: OPERATIONS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">03 // Arithmetic</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Multiplication/Division */}
                <div className="p-6 border border-violet-500/20 bg-black/20 rounded-xl backdrop-blur-md">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">Mult & Divide</h3>
                        <X size={16} className="text-violet-400" />
                     </div>
                     <p className="text-xs text-zinc-400 mb-4 h-10">
                        Multiply straight across. For division, multiply by the reciprocal (Keep-Change-Flip).
                     </p>
                     <div className="bg-black/40 p-3 rounded font-mono text-xs text-center text-violet-200">
                        A/B ÷ C/D = A/B • D/C
                     </div>
                </div>

                {/* Addition/Subtraction */}
                <div className="p-6 border border-violet-500/20 bg-black/20 rounded-xl backdrop-blur-md">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">Add & Subtract</h3>
                        <Minimize2 size={16} className="text-violet-400" />
                     </div>
                     <p className="text-xs text-zinc-400 mb-4 h-10">
                        Requires a Common Denominator (LCD). This is usually the hardest part.
                     </p>
                     <div className="bg-black/40 p-3 rounded font-mono text-xs text-center text-violet-200">
                        1/x + 1/y = (y + x) / xy
                     </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}