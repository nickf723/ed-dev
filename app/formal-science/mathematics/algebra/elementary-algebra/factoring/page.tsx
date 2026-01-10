"use client";
import React from "react";
import Link from "next/link";
import FactoringBackground from "./FactoringBackground";
import { 
  ArrowLeft, Divide, Grid, 
  Scissors, BoxSelect, ZoomIn, 
  Copy, Minus, Plus
} from "lucide-react";

export default function FactoringPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a1f] text-white overflow-hidden font-mono selection:bg-indigo-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <FactoringBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(129,140,248,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(129,140,248,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-indigo-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_06
             </Link>
             <div className="flex items-end gap-6 border-b border-indigo-500/30 pb-6">
                 <div className="p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(129,140,248,0.2)]">
                    <Divide size={40} className="text-indigo-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       FACTORING
                    </h1>
                    <p className="text-indigo-400/60 max-w-md text-sm leading-relaxed">
                        Reverse multiplication. Breaking polynomials down into their fundamental building blocks.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE GEOMETRIC INTUITION (Area Model) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-indigo-500" />
                    <h2 className="text-xl font-bold text-indigo-300 uppercase tracking-widest">01 // The Area Model</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    Multiplication is finding the area of a rectangle. Factoring is starting with the area and finding the <strong>length and width</strong>.
                </p>
                
                <div className="p-6 border border-indigo-500/20 bg-indigo-950/10 rounded-xl space-y-4">
                    <div className="text-xs font-bold text-indigo-400 uppercase">The Challenge</div>
                    <div className="text-2xl font-mono text-white">x² + 5x + 6</div>
                    <div className="flex items-center gap-4 opacity-50">
                        <ArrowLeft className="rotate-90" size={16}/>
                        <span className="text-xs">Find dimensions that create this area</span>
                    </div>
                </div>
            </div>

            {/* Visualizer: Area Model */}
            <div className="aspect-video relative border border-indigo-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group">
                 {/* Trigger Diagram Tag */}
                 
                 
                 {/* CSS Mockup of Algebra Tiles */}
                 <div className="grid grid-cols-5 gap-1 w-full max-w-xs opacity-50 group-hover:opacity-100 transition-opacity">
                     {/* x^2 Block */}
                     <div className="col-span-3 aspect-square bg-blue-600 rounded-sm flex items-center justify-center border border-white/20">x²</div>
                     {/* x Blocks */}
                     <div className="col-span-1 aspect-[1/3] bg-green-500 rounded-sm border border-white/20"></div>
                     <div className="col-span-1 aspect-[1/3] bg-green-500 rounded-sm border border-white/20"></div>
                     
                     {/* x Blocks Row 2 */}
                     <div className="col-span-3 h-8 bg-green-500 rounded-sm border border-white/20"></div>
                     <div className="col-span-1 aspect-square bg-yellow-500 rounded-sm border border-white/20">1</div>
                     <div className="col-span-1 aspect-square bg-yellow-500 rounded-sm border border-white/20">1</div>
                 </div>
                 
                 {/* Factors Labels */}
                 <div className="absolute top-4 font-mono text-indigo-300 font-bold tracking-widest">(x + 3)</div>
                 <div className="absolute left-4 font-mono text-indigo-300 font-bold tracking-widest -rotate-90 origin-center">(x + 2)</div>
            </div>
        </section>

        {/* SECTION 2: THE TECHNIQUES */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-indigo-500" />
                <h2 className="text-xl font-bold text-indigo-300 uppercase tracking-widest">02 // Extraction Protocols</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* GCF */}
                <div className="p-6 bg-indigo-950/20 border border-indigo-500/30 rounded-xl hover:bg-indigo-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <ZoomIn size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-indigo-600">Step 1</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">G.C.F.</div>
                    <p className="text-xs text-zinc-400 mb-4 h-10">
                        Always check this first. Pull out the largest factor common to all terms.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center">
                        2x² + 4x → <span className="text-indigo-300">2x</span>(x + 2)
                    </div>
                </div>

                {/* Diff of Squares */}
                <div className="p-6 bg-violet-950/20 border border-violet-500/30 rounded-xl hover:bg-violet-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Copy size={20} className="text-violet-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-violet-600">Pattern</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Diff. of Squares</div>
                    <p className="text-xs text-zinc-400 mb-4 h-10">
                        Two perfect squares separated by subtraction split perfectly.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center">
                        x² - 9 → (x<span className="text-violet-400">-3</span>)(x<span className="text-violet-400">+3</span>)
                    </div>
                </div>

                {/* Trinomials */}
                <div className="p-6 bg-fuchsia-950/20 border border-fuchsia-500/30 rounded-xl hover:bg-fuchsia-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Grid size={20} className="text-fuchsia-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-fuchsia-600">Puzzle</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Trinomials</div>
                    <p className="text-xs text-zinc-400 mb-4 h-10">
                        Find two numbers that multiply to C and add to B.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center">
                        x² + 5x + 6 → (x+2)(x+3)
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: ZERO PRODUCT PROPERTY */}
        <section className="bg-black/40 border border-indigo-500/30 rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden group">
             {/* Background Pulse */}
             <div className="absolute inset-0 bg-indigo-500/5 opacity-50 group-hover:opacity-100 transition-opacity animate-pulse" />
             
             <div className="relative z-10">
                 <h3 className="text-2xl font-bold text-white mb-2">Why Do We Factor?</h3>
                 <p className="text-sm text-indigo-200/60 max-w-lg mx-auto mb-8">
                    To solve equations. If we multiply two things and the result is zero, one of them <strong>MUST</strong> be zero.
                 </p>
                 
                 <div className="inline-flex items-center gap-4 text-3xl font-mono font-black">
                     <span className="p-4 border border-indigo-500 rounded bg-indigo-900/20">(x - 5)</span>
                     <span>•</span>
                     <span className="p-4 border border-indigo-500 rounded bg-indigo-900/20">(x + 2)</span>
                     <span>=</span>
                     <span className="text-indigo-400">0</span>
                 </div>
                 
                 <div className="mt-8 flex gap-12 text-sm font-bold text-zinc-500">
                     <div className="flex flex-col items-center">
                        <ArrowLeft className="-rotate-90 mb-2" />
                        <span>x = 5</span>
                     </div>
                     <div className="flex flex-col items-center">
                        <ArrowLeft className="-rotate-90 mb-2" />
                        <span>x = -2</span>
                     </div>
                 </div>
             </div>
        </section>

      </div>
    </main>
  );
}