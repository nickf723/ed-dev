"use client";
import React from "react";
import Link from "next/link";
import SystemsBackground from "./SystemsBackground";
import { 
  ArrowLeft, ArrowRightLeft, Terminal, 
  ArrowDown, CheckCircle2, RotateCw, 
  X, Divide, ArrowRight
} from "lucide-react";

export default function SystemsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-hidden font-mono selection:bg-blue-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <SystemsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/linear" className="flex items-center gap-2 text-xs text-blue-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_03
             </Link>
             <div className="flex items-end gap-6 border-b border-blue-500/30 pb-6">
                 <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <ArrowRightLeft size={40} className="text-blue-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       SYSTEM SOLVERS
                    </h1>
                    <p className="text-blue-400/60 max-w-md text-sm leading-relaxed">
                        Solving Ax = b. Gaussian Elimination, Row Reduction, and the algorithm of truth.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE MISSION (Ax = b) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-blue-500" />
                    <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">01 // The Setup</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    We don't solve systems of equations by juggling variables anymore. We detach the coefficients and put them into a matrix.
                </p>
                
                <div className="bg-black/40 border border-blue-500/20 p-6 rounded-xl font-mono">
                    <div className="flex items-center justify-between text-zinc-500 text-xs mb-4 uppercase tracking-widest">
                        <span>Equations</span>
                        <ArrowRight size={12} />
                        <span>Matrix Form</span>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <div className="space-y-2 text-sm">
                            <div><span className="text-blue-400">2</span>x + <span className="text-blue-400">3</span>y = 5</div>
                            <div><span className="text-blue-400">4</span>x - <span className="text-blue-400">1</span>y = 3</div>
                        </div>
                        
                        <div className="h-12 w-px bg-white/10" />
                        
                        <div className="flex items-center gap-2">
                            {/* Matrix A */}
                            <div className="relative px-3 py-2 border-l-2 border-r-2 border-white/30 rounded">
                                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-center font-bold text-blue-400">
                                    <span>2</span><span>3</span>
                                    <span>4</span><span>-1</span>
                                </div>
                            </div>
                            {/* Vector x */}
                            <div className="px-2 py-2 border-l-2 border-r-2 border-white/30 rounded text-zinc-500 italic">
                                <div>x</div><div>y</div>
                            </div>
                            <span>=</span>
                            {/* Vector b */}
                            <div className="px-2 py-2 border-l-2 border-r-2 border-white/30 rounded text-white">
                                <div>5</div><div>3</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Augmented Matrix */}
            <div className="aspect-video relative border border-blue-500/30 rounded-xl bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8 group">
                 <div className="absolute top-4 left-4 flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-500/20" />
                     <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                     <div className="w-3 h-3 rounded-full bg-green-500/20" />
                 </div>
                 
                 <div className="text-xs text-blue-500 font-mono mb-2 uppercase tracking-widest">Augmented Matrix</div>
                 <div className="flex gap-4 text-3xl font-mono font-bold text-white relative">
                     {/* Left Bracket */}
                     <div className="w-4 border-l-4 border-t-4 border-b-4 border-zinc-500 rounded-l absolute -left-6 top-0 bottom-0" />
                     
                     <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-center">
                         <span>1</span><span>2</span><span className="text-blue-400">5</span>
                         <span>3</span><span>4</span><span className="text-blue-400">7</span>
                     </div>
                     
                     {/* Divider Line */}
                     <div className="absolute top-0 bottom-0 left-[66%] w-px bg-blue-500/50 border-r border-dashed border-blue-400" />
                     
                     {/* Right Bracket */}
                     <div className="w-4 border-r-4 border-t-4 border-b-4 border-zinc-500 rounded-r absolute -right-6 top-0 bottom-0" />
                 </div>
            </div>
        </section>

        {/* SECTION 2: THE 3 MOVES */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-500" />
                <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">02 // The Toolset</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SWAP */}
                <div className="p-6 bg-blue-950/20 border border-blue-500/30 rounded-xl hover:bg-blue-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <RotateCw size={20} className="text-blue-400 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-[10px] uppercase font-bold text-blue-600">Row Op 1</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Swap</div>
                    <p className="text-xs text-zinc-500 mb-4 h-12">
                        Exchange any two rows. Changing the order of information does not change the truth.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center text-blue-200">
                        R₁ ↔ R₂
                    </div>
                </div>

                {/* SCALE */}
                <div className="p-6 bg-cyan-950/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Divide size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-cyan-600">Row Op 2</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Scale</div>
                    <p className="text-xs text-zinc-500 mb-4 h-12">
                        Multiply a row by a non-zero number. Used to turn the leading number into a <strong>1</strong>.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center text-cyan-200">
                        R₁ ← ½ R₁
                    </div>
                </div>

                {/* ELIMINATE */}
                <div className="p-6 bg-indigo-950/20 border border-indigo-500/30 rounded-xl hover:bg-indigo-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <X size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-indigo-600">Row Op 3</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Eliminate</div>
                    <p className="text-xs text-zinc-500 mb-4 h-12">
                        Add a multiple of one row to another. Used to destroy variables (turn them to <strong>0</strong>).
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center text-indigo-200">
                        R₂ ← R₂ - 3R₁
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE GOAL (RREF) */}
        <section className="bg-black/40 border border-blue-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
             {/* Background Scanline */}
             <div className="absolute top-0 w-full h-1 bg-blue-500/50 shadow-[0_0_20px_#3b82f6] animate-[scanDown_4s_linear_infinite]" />

             <div className="flex-1">
                 <div className="flex items-center gap-2 text-blue-400 mb-2">
                     <Terminal size={20} />
                     <span className="font-bold tracking-widest">RREF TARGET</span>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-4">Reduced Row Echelon Form</h3>
                 <p className="text-sm text-zinc-400 leading-relaxed">
                     The algorithm is complete when you achieve the <strong>Identity Matrix</strong> on the left. The numbers remaining on the right are your answers.
                 </p>
             </div>

             <div className="relative p-6 border-2 border-blue-500 rounded bg-blue-900/10 backdrop-blur-md">
                 <div className="absolute -top-3 -left-3 bg-blue-500 text-black text-[10px] font-bold px-2 py-1 rounded">
                     SOLVED
                 </div>
                 
                 <div className="grid grid-cols-4 gap-x-6 gap-y-4 font-mono text-xl font-bold">
                     <span className="text-blue-400">1</span><span className="opacity-20">0</span><span className="opacity-20">0</span><span className="text-white border-l border-white/20 pl-4">x</span>
                     <span className="opacity-20">0</span><span className="text-blue-400">1</span><span className="opacity-20">0</span><span className="text-white border-l border-white/20 pl-4">y</span>
                     <span className="opacity-20">0</span><span className="opacity-20">0</span><span className="text-blue-400">1</span><span className="text-white border-l border-white/20 pl-4">z</span>
                 </div>
             </div>
        </section>

      </div>
    </main>
  );
}