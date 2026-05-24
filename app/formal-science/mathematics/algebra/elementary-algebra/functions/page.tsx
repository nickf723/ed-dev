"use client";
import React from "react";
import Link from "next/link";
import FunctionsBackground from "./_components/FunctionsBackground";
import FunctionMappingLab from "./_components/FunctionMappingLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, FunctionSquare, ArrowRight, 
  Settings, Network, ScanLine, Combine,
  CheckCircle2
} from "lucide-react";

export default function FunctionsPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a0f] text-white overflow-hidden font-sans selection:bg-pink-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <FunctionsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,114,182,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-pink-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-pink-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_09
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-pink-500/30 pb-8">
                 <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(244,114,182,0.2)]">
                    <FunctionSquare size={48} className="text-pink-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       FUNCTIONS
                    </h1>
                    <p className="text-pink-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-pink-500/50 pl-6">
                        Input, Process, Output. Transforming raw algebra into predictable mathematical machines and mapping engines.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: DOMAIN & RANGE */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-pink-500" />
                    <h2 className="text-xl font-bold text-pink-300 uppercase tracking-widest">01 // The Machine</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    A function is a strict relationship rule: <strong>every input is allowed to have exactly one output</strong>. It is a completely predictable machine. If you put in the number 2, you must get the exact same answer every single time.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 border border-pink-500/20 bg-black/40 rounded-2xl flex flex-col gap-3 hover:bg-pink-900/10 transition-colors shadow-inner">
                        <div className="flex items-center gap-2 text-pink-400 font-bold text-sm uppercase tracking-widest border-b border-pink-500/20 pb-2">
                            <ArrowRight size={16} /> Domain
                        </div>
                        <div className="text-zinc-400 text-xs leading-relaxed">The entire set of valid Inputs (<M>x</M>). The fuel for the machine.</div>
                    </div>
                    <div className="p-5 border border-pink-500/20 bg-black/40 rounded-2xl flex flex-col gap-3 hover:bg-pink-900/10 transition-colors shadow-inner">
                        <div className="flex items-center gap-2 text-pink-400 font-bold text-sm uppercase tracking-widest border-b border-pink-500/20 pb-2">
                            <ArrowRight size={16} /> Range
                        </div>
                        <div className="text-zinc-400 text-xs leading-relaxed">The entire set of possible Outputs (<M>y</M> or <M>f(x)</M>). The result.</div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Black Box */}
            <div className="aspect-video relative border border-pink-500/30 rounded-3xl bg-black/60 backdrop-blur-xl flex items-center justify-center p-8 group overflow-hidden shadow-2xl">
                 
                 {/* Input Pipe */}
                 <div className="absolute left-0 top-1/2 w-1/3 h-4 bg-zinc-900 -translate-y-1/2 flex items-center justify-center border-y border-zinc-700">
                    <div className="w-2 h-2 bg-white rounded-full animate-[ping_2s_linear_infinite]" />
                 </div>
                 <div className="absolute left-6 top-[35%] text-[10px] font-bold tracking-widest uppercase font-mono text-zinc-400">Input <M>(x)</M></div>

                 {/* The Box */}
                 <div className="relative z-10 w-28 h-28 bg-pink-950/80 border-2 border-pink-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(244,114,182,0.4)]">
                     <Settings size={48} className="text-pink-400 animate-spin-slow duration-[4000ms]" />
                     <div className="absolute -bottom-8 text-sm font-mono font-bold text-pink-300 bg-pink-500/10 px-3 py-1 rounded border border-pink-500/30"><M>f(x)</M></div>
                 </div>

                 {/* Output Pipe */}
                 <div className="absolute right-0 top-1/2 w-1/3 h-4 bg-zinc-900 -translate-y-1/2 border-y border-zinc-700" />
                 <div className="absolute right-6 top-[35%] text-[10px] font-bold tracking-widest uppercase font-mono text-zinc-400">Output <M>(y)</M></div>

                 {/* Particles Flowing (CSS) */}
                 <div className="absolute w-3 h-3 bg-pink-500 rounded-full top-1/2 left-[30%] -translate-y-1/2 animate-[moveRight_2s_linear_infinite] shadow-[0_0_10px_#ec4899]" />
            </div>
        </section>

        {/* SECTION 2: THE LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-pink-500" />
                <h2 className="text-xl font-bold text-pink-300 uppercase tracking-widest">02 // The Routing Logic</h2>
            </div>
            
            <FunctionMappingLab />
        </section>

        {/* SECTION 3: THE VERTICAL LINE TEST */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-pink-500" />
                <h2 className="text-xl font-bold text-pink-300 uppercase tracking-widest">03 // Validation Protocol</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* VALID */}
                <div className="p-8 border border-pink-500/20 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col items-center gap-6 group hover:border-emerald-500/50 transition-colors shadow-lg">
                     <div className="w-full flex justify-between items-start w-full">
                         <div>
                             <h3 className="text-xl font-bold text-white mb-1">Vertical Line Test</h3>
                             <p className="text-sm text-zinc-400 font-mono">Status: <span className="text-emerald-400 font-bold">PASS</span></p>
                         </div>
                         <ScanLine className="text-emerald-500/50" size={32} />
                     </div>

                     <div className="w-full h-48 border border-white/10 bg-[#0c0a0f] rounded-xl relative overflow-hidden shadow-inner flex items-center justify-center">
                         {/* Standard Parabola */}
                         <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 overflow-visible">
                            <path d="M 10 20 Q 50 120 90 20" fill="none" className="stroke-white" strokeWidth="4" strokeLinecap="round" />
                         </svg>
                         {/* Scanning Line */}
                         <div className="absolute top-0 bottom-0 w-1 bg-emerald-400 shadow-[0_0_15px_#34d399] left-0 animate-[scanRight_3s_linear_infinite]" />
                     </div>

                     <p className="text-sm text-zinc-300 text-center leading-relaxed">
                         The vertical scanner hits the graph exactly <strong>once</strong> at any given time. Every <M>x</M> has a unique <M>y</M>. It is a Function.
                     </p>
                </div>

                {/* INVALID */}
                <div className="p-8 border border-pink-500/20 rounded-3xl bg-black/40 backdrop-blur-md flex flex-col items-center gap-6 group hover:border-red-500/50 transition-colors shadow-lg">
                     <div className="w-full flex justify-between items-start w-full">
                         <div>
                             <h3 className="text-xl font-bold text-white mb-1">Vertical Line Test</h3>
                             <p className="text-sm text-zinc-400 font-mono">Status: <span className="text-red-400 font-bold">FAIL</span></p>
                         </div>
                         <ScanLine className="text-red-500/50" size={32} />
                     </div>

                     <div className="w-full h-48 border border-white/10 bg-[#0c0a0f] rounded-xl relative overflow-hidden shadow-inner flex items-center justify-center">
                         {/* Sideways Parabola / Circle */}
                         <svg viewBox="0 0 100 100" className="w-3/4 h-3/4 overflow-visible">
                            <circle cx="50" cy="50" r="30" fill="none" className="stroke-zinc-500" strokeWidth="4" />
                         </svg>
                         {/* Scanning Line */}
                         <div className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_15px_#ef4444] left-0 animate-[scanRight_3s_linear_infinite]" />
                     </div>

                     <p className="text-sm text-zinc-300 text-center leading-relaxed">
                         The vertical scanner hits the graph at <strong>two points</strong> simultaneously. A single <M>x</M> cannot yield two different <M>y</M> values.
                     </p>
                </div>
            </div>
        </section>

        {/* SECTION 4: COMPOSITE FUNCTIONS */}
        <section className="bg-gradient-to-br from-pink-950/40 to-purple-950/40 border border-pink-500/30 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden backdrop-blur-xl shadow-2xl">
             <div className="absolute top-0 left-0 p-12 opacity-5 pointer-events-none">
                 <Combine size={250} />
             </div>
             
             <h3 className="text-3xl font-black text-white mb-4 relative z-10 uppercase tracking-tight">Function Inception</h3>
             <p className="text-base text-pink-200/80 max-w-2xl mx-auto mb-10 relative z-10 leading-relaxed">
                Functions can be stacked. By feeding the completed output of one machine directly into the input of a second machine, we create a <strong>Composite Function</strong>.
             </p>

             <div className="inline-flex items-center gap-2 md:gap-4 text-2xl md:text-5xl font-mono font-black relative z-10 bg-black/60 p-6 md:p-8 rounded-2xl border border-white/10 shadow-inner">
                 <span className="text-zinc-500">f(</span>
                 <div className="px-4 py-2 border-2 border-pink-500/50 rounded-xl bg-pink-900/30 text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.3)]">
                    g(<span className="text-white">x</span>)
                 </div>
                 <span className="text-zinc-500">)</span>
             </div>
             
             <div className="mt-12 flex flex-wrap justify-center items-center gap-2 md:gap-4 relative z-10">
                 <div className="px-4 py-2 bg-black/60 rounded-lg border border-white/10 text-xs font-bold font-mono text-zinc-300 uppercase tracking-widest">Input <M>x</M></div>
                 <ArrowRight size={18} className="text-pink-500/50" />
                 <div className="px-4 py-2 bg-pink-950/50 rounded-lg border border-pink-500/50 text-xs font-bold font-mono text-pink-400 uppercase tracking-widest shadow-[0_0_10px_rgba(244,114,182,0.2)]">Execute <M>g(x)</M></div>
                 <ArrowRight size={18} className="text-pink-500/50" />
                 <div className="px-4 py-2 bg-black/60 rounded-lg border border-white/10 text-xs font-bold font-mono text-zinc-300 uppercase tracking-widest">Pass Result</div>
                 <ArrowRight size={18} className="text-pink-500/50" />
                 <div className="px-4 py-2 bg-pink-900/80 rounded-lg border border-pink-400 text-xs font-bold font-mono text-pink-200 uppercase tracking-widest shadow-[0_0_15px_rgba(244,114,182,0.4)]">Execute <M>f(x)</M></div>
             </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Machine Logic Mastered</h3>
                    <p className="text-pink-100/50 text-sm font-sans font-light">You are ready to command continuous logic.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/exponents" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-pink-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(244,114,182,0.5)]">
                Next: Exp & Logs <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}