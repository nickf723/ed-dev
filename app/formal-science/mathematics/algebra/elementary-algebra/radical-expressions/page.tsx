"use client";
import React from "react";
import Link from "next/link";
import RadicalBackground from "./_components/RadicalBackground";
import FractionalExponentLab from "./_components/FractionalExponentLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Grip, Divide, 
  ArrowDown, BoxSelect, Sparkles,
  GitBranch, Scaling, ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function RadicalsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0514] text-white overflow-hidden font-sans selection:bg-fuchsia-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <RadicalBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-fuchsia-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-fuchsia-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_08
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-fuchsia-500/30 pb-8">
                 <div className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(217,70,239,0.2)]">
                    <Grip size={48} className="text-fuchsia-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       RADICALS
                    </h1>
                    <p className="text-fuchsia-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-fuchsia-500/50 pl-6">
                        The mathematical scalpel. Square roots, cube roots, and the true identity of fractional exponents.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: ANATOMY OF A ROOT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-fuchsia-500" />
                    <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">01 // The Container</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    A radical expression asks a fundamental question: <strong>"What number multiplied by itself n times equals x?"</strong> It is the inverse operation of exponentiation.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-fuchsia-500/20 bg-black/40 rounded-xl flex items-center gap-4 group hover:border-fuchsia-500/50 transition-colors shadow-inner">
                        <BoxSelect className="text-fuchsia-500 shrink-0" size={24} />
                        <div>
                            <div className="text-xs font-bold text-white mb-1">INDEX (n)</div>
                            <div className="text-[10px] text-fuchsia-500/60 leading-tight">How many times?<br/>(Default is 2)</div>
                        </div>
                    </div>
                    <div className="p-4 border border-fuchsia-500/20 bg-black/40 rounded-xl flex items-center gap-4 group hover:border-fuchsia-500/50 transition-colors shadow-inner">
                        <Sparkles className="text-fuchsia-500 shrink-0" size={24} />
                        <div>
                            <div className="text-xs font-bold text-white mb-1">RADICAND (x)</div>
                            <div className="text-[10px] text-fuchsia-500/60 leading-tight">The mystery value trapped inside.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Anatomy Map */}
            <div className="aspect-square relative border border-fuchsia-500/30 rounded-3xl bg-black/60 backdrop-blur-xl flex items-center justify-center p-8 overflow-hidden group shadow-2xl">
                 {/* Background Pulse */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
                 
                 {/* The Mathematical Symbol */}
                 <div className="relative text-7xl md:text-8xl text-fuchsia-400 drop-shadow-[0_0_20px_rgba(217,70,239,0.3)] group-hover:scale-110 transition-transform duration-700">
                     <M display={true}>{String.raw`\sqrt[n]{x}`}</M>
                 </div>
                 
                 {/* Labels */}
                 <div className="absolute top-1/4 left-[15%] text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 bg-fuchsia-950/80 px-3 py-1 border border-fuchsia-500/50 rounded-lg">
                     Index
                 </div>
                 <div className="absolute bottom-1/4 right-[15%] text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 bg-fuchsia-950/80 px-3 py-1 border border-fuchsia-500/50 rounded-lg">
                     Radicand
                 </div>
            </div>
        </section>

        {/* SECTION 2: SIMPLIFYING (The Jailbreak) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-fuchsia-500" />
                <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">02 // The Jailbreak Method</h2>
            </div>
            
            <div className="bg-slate-900/40 border border-fuchsia-500/30 rounded-3xl p-8 md:p-12 backdrop-blur-xl shadow-xl">
                 <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center text-center">
                     
                     {/* Step 1: Prime Factorization */}
                     <div className="col-span-1 flex flex-col items-center gap-4 group">
                         <div className="text-xs font-sans text-fuchsia-400 font-bold uppercase tracking-widest">1. Factor</div>
                         <div className="flex flex-col items-center bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner w-full group-hover:border-fuchsia-500/50 transition-colors">
                             <div className="text-3xl text-white mb-2"><M>{String.raw`\sqrt{12}`}</M></div>
                             <ArrowDown size={16} className="text-zinc-500 my-2" />
                             <div className="text-lg text-fuchsia-300"><M>{String.raw`\sqrt{2 \cdot 2 \cdot 3}`}</M></div>
                         </div>
                     </div>

                     <div className="hidden md:flex justify-center text-fuchsia-500/50">
                         <ArrowRight size={32} />
                     </div>

                     {/* Step 2: Find Pairs */}
                     <div className="col-span-1 flex flex-col items-center gap-4 group">
                         <div className="text-xs font-sans text-fuchsia-400 font-bold uppercase tracking-widest">2. Group</div>
                         <div className="flex flex-col items-center bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner w-full group-hover:border-fuchsia-500/50 transition-colors">
                             <div className="text-lg text-fuchsia-300"><M>{String.raw`\sqrt{2^2 \cdot 3}`}</M></div>
                             <ArrowDown size={16} className="text-zinc-500 my-2" />
                             <div className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-500/10 px-2 py-1 rounded">Pair Found</div>
                         </div>
                     </div>

                     <div className="hidden md:flex justify-center text-fuchsia-500/50">
                         <ArrowRight size={32} />
                     </div>

                     {/* Step 3: Escape */}
                     <div className="col-span-1 flex flex-col items-center gap-4 group">
                         <div className="text-xs font-sans text-fuchsia-400 font-bold uppercase tracking-widest">3. Escape</div>
                         <div className="flex items-center justify-center bg-fuchsia-950/40 p-6 rounded-2xl border border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.2)] w-full h-full">
                             <div className="text-4xl text-fuchsia-400 drop-shadow-md"><M>{String.raw`2\sqrt{3}`}</M></div>
                         </div>
                     </div>

                 </div>
                 
                 <div className="mt-12 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm text-zinc-300 max-w-2xl mx-auto leading-relaxed">
                        <strong className="text-white">The Rule of the Index:</strong> The index number dictates how large a group must be to escape. For a square root (index 2), you need a <strong className="text-fuchsia-400">pair</strong> to escape. One makes it out, the other is destroyed in the process.
                    </p>
                 </div>
            </div>
        </section>

        {/* SECTION 3: FRACTIONAL EXPONENTS LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-fuchsia-500" />
                <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">03 // The Secret Identity</h2>
            </div>

            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
                    <div className="flex-1">
                        <h3 className="text-3xl font-black text-white mb-4">Flower Power</h3>
                        <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                            A radical is not a separate mathematical entity—it is literally just a fraction hiding in the exponent! <strong>Power stays up top. Root goes down to the bottom (like a tree).</strong> Use the lab below to prove it!
                        </p>
                    </div>
                </div>

                {/* INJECTED LAB */}
                <FractionalExponentLab />
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Roots Extracted</h3>
                    <p className="text-fuchsia-100/50 text-sm font-sans font-light">You have mastered fractional powers and radical scaling.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/rational-expressions" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-fuchsia-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)]">
                Next: Rational Expressions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}