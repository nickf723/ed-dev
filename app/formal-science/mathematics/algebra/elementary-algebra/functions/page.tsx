"use client";
import React from "react";
import Link from "next/link";
import FunctionsBackground from "./FunctionsBackground";
import { 
  ArrowLeft, FunctionSquare, ArrowRight, 
  ScanLine, GitCommit, Settings, 
  RefreshCcw, Braces
} from "lucide-react";

export default function FunctionsPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a0f] text-white overflow-hidden font-mono selection:bg-pink-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <FunctionsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,114,182,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-pink-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_09
             </Link>
             <div className="flex items-end gap-6 border-b border-pink-500/30 pb-6">
                 <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(244,114,182,0.2)]">
                    <FunctionSquare size={40} className="text-pink-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       FUNCTIONS
                    </h1>
                    <p className="text-pink-400/60 max-w-md text-sm leading-relaxed">
                        Input, Process, Output. Understanding mathematical machines and mapping rules.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE BLACK BOX */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-pink-500" />
                    <h2 className="text-xl font-bold text-pink-300 uppercase tracking-widest">01 // The Machine</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A function is a relationship where <strong>every input has exactly one output</strong>. It is a predictable machine. If you put in 'Bread', you always get 'Toast'.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-pink-500/20 bg-black/40 rounded flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase">
                            <ArrowRight size={12} /> Domain
                        </div>
                        <div className="text-zinc-400 text-xs">The set of all possible Inputs (x-values).</div>
                    </div>
                    <div className="p-4 border border-pink-500/20 bg-black/40 rounded flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-pink-500 font-bold text-xs uppercase">
                            <ArrowRight size={12} /> Range
                        </div>
                        <div className="text-zinc-400 text-xs">The set of resulting Outputs (y-values).</div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Function Machine */}
            <div className="aspect-video relative border border-pink-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group overflow-hidden">
                 
                 {/* Input Pipe */}
                 <div className="absolute left-0 top-1/2 w-1/3 h-4 bg-zinc-800 -translate-y-1/2 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-[ping_2s_linear_infinite]" />
                 </div>
                 <div className="absolute left-4 top-[40%] text-xs font-mono text-zinc-500">INPUT (x)</div>

                 {/* The Box */}
                 <div className="relative z-10 w-24 h-24 bg-pink-900/40 border-2 border-pink-500 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(244,114,182,0.3)]">
                     <Settings size={40} className="text-pink-400 animate-spin-slow duration-[5000ms]" />
                     <div className="absolute -bottom-6 text-xs font-mono font-bold text-pink-400">f(x) = 2x</div>
                 </div>

                 {/* Output Pipe */}
                 <div className="absolute right-0 top-1/2 w-1/3 h-4 bg-zinc-800 -translate-y-1/2" />
                 <div className="absolute right-4 top-[40%] text-xs font-mono text-zinc-500">OUTPUT (y)</div>

                 {/* Particles Flowing (CSS) */}
                 <div className="absolute w-2 h-2 bg-pink-400 rounded-full top-1/2 left-[30%] -translate-y-1/2 animate-[moveRight_2s_linear_infinite]" />
            </div>
        </section>

        {/* SECTION 2: THE VERTICAL LINE TEST */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-pink-500" />
                <h2 className="text-xl font-bold text-pink-300 uppercase tracking-widest">02 // Validation Protocol</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* VALID */}
                <div className="p-6 border border-pink-500/20 rounded-xl bg-pink-950/10 flex items-center gap-6 group hover:border-pink-500/50 transition-colors">
                     <div className="w-24 h-24 border border-white/10 bg-black/40 rounded relative overflow-hidden">
                        
                         <div className="absolute inset-0 flex items-center justify-center">
                             {/* Parabola */}
                             <div className="w-16 h-16 border-b-2 border-l-2 border-r-2 border-white rounded-b-full" />
                         </div>
                         {/* Scanning Line */}
                         <div className="absolute top-0 bottom-0 w-px bg-green-500 left-0 animate-[scanRight_3s_linear_infinite]" />
                     </div>
                     <div>
                         <h3 className="font-bold text-white mb-1">Pass</h3>
                         <p className="text-xs text-zinc-400">
                             The scanner hits the graph only <strong>once</strong> at any time. It is a Function.
                         </p>
                     </div>
                </div>

                {/* INVALID */}
                <div className="p-6 border border-pink-500/20 rounded-xl bg-pink-950/10 flex items-center gap-6 group hover:border-pink-500/50 transition-colors">
                     <div className="w-24 h-24 border border-white/10 bg-black/40 rounded relative overflow-hidden">
                        
                         <div className="absolute inset-0 flex items-center justify-center">
                             {/* Sideways Parabola (Not a function) */}
                             <div className="w-16 h-16 border-t-2 border-b-2 border-r-2 border-zinc-600 rounded-r-full" />
                         </div>
                         {/* Scanning Line */}
                         <div className="absolute top-0 bottom-0 w-px bg-red-500 left-0 animate-[scanRight_3s_linear_infinite]" />
                     </div>
                     <div>
                         <h3 className="font-bold text-white mb-1">Fail</h3>
                         <p className="text-xs text-zinc-400">
                             The scanner hits <strong>two points</strong> at once. One input has two outputs. Ambiguous.
                         </p>
                     </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: COMPOSITE FUNCTIONS */}
        <section className="bg-black/40 border border-pink-500/30 rounded-xl p-8 text-center relative overflow-hidden">
             <div className="absolute inset-0 bg-pink-500/5 animate-pulse" />
             
             <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Function Inception</h3>
             <p className="text-sm text-pink-200/60 max-w-lg mx-auto mb-8 relative z-10">
                Using the output of one machine as the input for the next.
             </p>

             <div className="inline-flex items-center gap-2 md:gap-6 text-xl md:text-4xl font-mono font-black relative z-10">
                 <span className="text-zinc-500">f(</span>
                 <div className="px-4 py-2 border border-pink-500 rounded bg-pink-900/20 text-pink-300">
                    g(<span className="text-white">x</span>)
                 </div>
                 <span className="text-zinc-500">)</span>
             </div>
             
             <div className="mt-8 flex justify-center gap-2 relative z-10">
                 <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-mono">Input x</div>
                 <ArrowRight size={16} className="text-zinc-600" />
                 <div className="px-3 py-1 bg-pink-500/20 rounded border border-pink-500/50 text-xs font-mono text-pink-300">Run g</div>
                 <ArrowRight size={16} className="text-zinc-600" />
                 <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs font-mono">Result</div>
                 <ArrowRight size={16} className="text-zinc-600" />
                 <div className="px-3 py-1 bg-pink-500/20 rounded border border-pink-500/50 text-xs font-mono text-pink-300">Run f</div>
             </div>
        </section>

      </div>
    </main>
  );
}