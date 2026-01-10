"use client";
import React from "react";
import Link from "next/link";
import RadicalBackground from "./RadicalBackground";
import { 
  ArrowLeft, Grip, Divide, 
  ArrowDown, BoxSelect, Sparkles,
  GitBranch, Scaling
} from "lucide-react";

export default function RadicalsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0514] text-white overflow-hidden font-mono selection:bg-fuchsia-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <RadicalBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-fuchsia-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_08
             </Link>
             <div className="flex items-end gap-6 border-b border-fuchsia-500/30 pb-6">
                 <div className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                    <Grip size={40} className="text-fuchsia-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       RADICALS
                    </h1>
                    <p className="text-fuchsia-400/60 max-w-md text-sm leading-relaxed">
                        Square roots, cube roots, and the bridge between roots and fractional exponents.
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
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A radical expression asks a question: <strong>"What number multiplied by itself X times equals Y?"</strong> It reverses exponentiation.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-fuchsia-500/20 bg-black/40 rounded flex items-center gap-4 group hover:border-fuchsia-500/50 transition-colors">
                        <BoxSelect className="text-fuchsia-500" />
                        <div>
                            <div className="text-xs font-bold text-white">INDEX (n)</div>
                            <div className="text-[10px] text-fuchsia-500/50">How many times?</div>
                        </div>
                    </div>
                    <div className="p-4 border border-fuchsia-500/20 bg-black/40 rounded flex items-center gap-4 group hover:border-fuchsia-500/50 transition-colors">
                        <Sparkles className="text-fuchsia-500" />
                        <div>
                            <div className="text-xs font-bold text-white">RADICAND (x)</div>
                            <div className="text-[10px] text-fuchsia-500/50">The value inside.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Anatomy Map */}
            <div className="aspect-square relative border border-fuchsia-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 overflow-hidden group">
                 {/* Background Pulse */}
                 <div className="absolute inset-0 bg-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
                 
                 {/* The Symbol */}
                 <div className="relative text-8xl font-serif text-white flex items-end">
                     {/* Index */}
                     <span className="text-2xl mb-12 mr-[-10px] text-fuchsia-400 font-bold group-hover:-translate-y-2 transition-transform">n</span>
                     
                     {/* Checkmark part */}
                     <span className="text-fuchsia-600">√</span>
                     
                     {/* Roof */}
                     <div className="border-t-4 border-fuchsia-600 absolute left-[0.8em] right-0 top-[0.3em] w-[1.5em]" />
                     
                     {/* Radicand */}
                     <span className="ml-2 relative z-10 group-hover:scale-110 transition-transform">x</span>
                 </div>
                 
                 {/* Labels (Hidden by default, appear on hover) */}
                 <div className="absolute top-1/4 left-1/4 text-xs font-mono text-fuchsia-400 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4">
                     Index
                 </div>
                 <div className="absolute bottom-1/4 right-1/4 text-xs font-mono text-white opacity-0 group-hover:opacity-100 transition-opacity translate-x-4">
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
            
            <div className="bg-fuchsia-950/10 border border-fuchsia-500/30 rounded-xl p-8">
                 <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center text-center font-mono text-xl">
                     
                     {/* Step 1: Prime Factorization */}
                     <div className="col-span-1 flex flex-col items-center gap-4">
                         <div className="text-xs font-sans text-fuchsia-400 font-bold uppercase tracking-widest">1. Factor</div>
                         <div className="flex flex-col items-center bg-black/40 p-4 rounded border border-white/10">
                             <span className="text-2xl mb-2">√12</span>
                             <ArrowDown size={16} className="text-zinc-500" />
                             <span className="text-sm text-fuchsia-300">2 • 2 • 3</span>
                         </div>
                     </div>

                     <div className="hidden md:flex justify-center text-fuchsia-500/50">
                         <ArrowLeft className="rotate-180" />
                     </div>

                     {/* Step 2: Find Pairs */}
                     <div className="col-span-1 flex flex-col items-center gap-4">
                         <div className="text-xs font-sans text-fuchsia-400 font-bold uppercase tracking-widest">2. Group</div>
                         <div className="bg-black/40 p-4 rounded border border-white/10 relative overflow-hidden">
                             {/* Highlight the pair */}
                             <div className="absolute top-1/2 left-2 right-8 h-6 -translate-y-1/2 bg-fuchsia-500/20 border border-fuchsia-500 rounded-full" />
                             <span className="relative z-10 text-sm"><span className="text-white font-bold">2 • 2</span> • 3</span>
                         </div>
                     </div>

                     <div className="hidden md:flex justify-center text-fuchsia-500/50">
                         <ArrowLeft className="rotate-180" />
                     </div>

                     {/* Step 3: Escape */}
                     <div className="col-span-1 flex flex-col items-center gap-4">
                         <div className="text-xs font-sans text-fuchsia-400 font-bold uppercase tracking-widest">3. Escape</div>
                         <div className="bg-black/40 p-4 rounded border border-white/10">
                             <span className="text-2xl text-fuchsia-400 font-bold">2√3</span>
                         </div>
                     </div>

                 </div>
                 
                 <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-sm text-zinc-400">
                        <strong className="text-white">Rule:</strong> For a square root, you need a <strong className="text-fuchsia-400">pair</strong> to escape. One makes it out, the other dies trying.
                    </p>
                 </div>
            </div>
        </section>

        {/* SECTION 3: FRACTIONAL EXPONENTS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-fuchsia-500" />
                <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">03 // The Secret Identity</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 border border-fuchsia-500/20 bg-black/20 rounded-xl backdrop-blur-md flex flex-col justify-center items-center text-center">
                     <GitBranch size={48} className="text-fuchsia-500 mb-6" />
                     <h3 className="text-lg font-bold text-white mb-2">Roots are Powers</h3>
                     <p className="text-xs text-zinc-400 mb-6 max-w-xs">
                        A radical is just a fraction in the exponent. This makes calculus much easier later.
                     </p>
                     
                     <div className="text-3xl font-bold font-serif flex items-center gap-8">
                         <span><sup className="text-sm text-fuchsia-400 mr-1">n</sup>√x</span>
                         <Scaling size={24} className="text-zinc-600" />
                         <span>x<sup className="text-lg text-fuchsia-400">1/n</sup></span>
                     </div>
                </div>

                <div className="p-8 border border-fuchsia-500/20 bg-black/20 rounded-xl backdrop-blur-md flex flex-col justify-center items-center text-center">
                     <Divide size={48} className="text-fuchsia-500 mb-6" />
                     <h3 className="text-lg font-bold text-white mb-2">Flower Power</h3>
                     <p className="text-xs text-zinc-400 mb-6 max-w-xs">
                        <strong>Power</strong> stays up top. <strong>Root</strong> goes down bottom. (Like a tree).
                     </p>
                     
                     <div className="text-3xl font-bold font-serif flex items-center gap-8">
                         <span><sup className="text-sm text-fuchsia-400 mr-1">root</sup>√x<sup className="text-lg text-white">pwr</sup></span>
                         <Scaling size={24} className="text-zinc-600" />
                         <span>x<sup className="text-lg text-white">pwr/<span className="text-fuchsia-400">root</span></sup></span>
                     </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}