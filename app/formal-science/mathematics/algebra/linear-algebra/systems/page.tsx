"use client";
import React from "react";
import Link from "next/link";
import SystemsBackground from "./_components/SystemsBackground";
import GaussianEliminationLab from "./_components/GaussianEliminationLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, ArrowRightLeft, Terminal, 
  ArrowRight, RotateCw, Divide, X, 
  CheckCircle2
} from "lucide-react";

export default function SystemsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-blue-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <SystemsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-blue-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-blue-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_03
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-blue-500/30 pb-8">
                 <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(59,130,246,0.2)] group relative overflow-hidden">
                    <ArrowRightLeft size={48} className="text-blue-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       SYSTEM SOLVERS
                    </h1>
                    <p className="text-blue-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-blue-500/50 pl-6">
                        Solving <M>{`A\\mathbf{{x}} = \\mathbf{{b}}`}</M>. Gaussian Elimination, Row Reduction, and the algorithm of absolute truth.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE MISSION */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-blue-500" />
                    <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">01 // The Setup</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    We don't solve systems of equations by juggling variables anymore. We detach the coefficients and put them into an <strong>Augmented Matrix</strong>, treating the entire system as a singular object.
                </p>
                
                <div className="bg-black/40 border border-blue-500/20 p-6 rounded-2xl shadow-inner mt-8">
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] font-bold mb-6 uppercase tracking-widest border-b border-white/5 pb-2">
                        <span>Equations</span>
                        <ArrowRight size={14} className="text-blue-500/50" />
                        <span>Matrix Form</span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                        <div className="space-y-3 text-lg font-mono bg-white/5 p-4 rounded-xl border border-white/5">
                            <div><span className="text-blue-400">2</span>x + <span className="text-blue-400">3</span>y = 5</div>
                            <div><span className="text-blue-400">1</span>x - <span className="text-blue-400">1</span>y = 0</div>
                        </div>
                        
                        <div className="text-2xl text-white">
                            <M display={true}>{`\\left[ \\begin{array}{cc|c} 2 & 3 & 5 \\\\ 1 & -1 & 0 \\end{array} \\right]`}</M>
                        </div>
                    </div>
                </div>
            </div>

            {/* Gaussian Image for Scale Context */}
            <div className="flex justify-center lg:justify-end">
                <div className="relative border border-blue-500/30 rounded-3xl bg-black/60 backdrop-blur-xl p-4 shadow-2xl">
                                    </div>
            </div>
        </section>

        {/* SECTION 2: THE 3 MOVES */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-blue-500" />
                <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">02 // The Toolset</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* SWAP */}
                <div className="p-8 bg-blue-950/20 border border-blue-500/30 rounded-3xl hover:bg-blue-900/40 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-xl group-hover:rotate-180 transition-transform duration-500 border border-blue-500/30">
                            <RotateCw size={24} className="text-blue-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-blue-500 tracking-widest bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Row Op 1</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Swap</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Exchange any two rows. Changing the order of information does not change the truth.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-blue-300 border border-white/5 shadow-inner mt-auto">
                        <M>R_1 \leftrightarrow R_2</M>
                    </div>
                </div>

                {/* SCALE */}
                <div className="p-8 bg-cyan-950/20 border border-cyan-500/30 rounded-3xl hover:bg-cyan-900/40 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform border border-cyan-500/30">
                            <Divide size={24} className="text-cyan-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-cyan-500 tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">Row Op 2</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Scale</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Multiply a row by a non-zero number. Used to turn the leading pivot number into a <strong className="text-cyan-400">1</strong>.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-cyan-300 border border-white/5 shadow-inner mt-auto">
                        <M>{`R_1 \\leftarrow \\frac{1}{2} R_1`}</M>
                    </div>
                </div>

                {/* ELIMINATE */}
                <div className="p-8 bg-indigo-950/20 border border-indigo-500/30 rounded-3xl hover:bg-indigo-900/40 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:scale-110 transition-transform border border-indigo-500/30">
                            <X size={24} className="text-indigo-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-indigo-500 tracking-widest bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">Row Op 3</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Eliminate</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Add a multiple of one row to another. Used to destroy variables (turning them into a <strong className="text-indigo-400">0</strong>).
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-indigo-300 border border-white/5 shadow-inner mt-auto">
                        <M>R_2 \leftarrow R_2 - 3R_1</M>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE LAB */}
        <section className="space-y-8 mt-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-px w-8 bg-blue-500" />
                        <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">03 // The Execution</h2>
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4 flex items-center gap-3">
                        <Terminal size={28} className="text-blue-500" /> RREF Target
                    </h3>
                    <p className="text-sm text-zinc-300 font-sans max-w-2xl leading-relaxed">
                        The algorithm is complete when you achieve the <strong>Identity Matrix</strong> on the left side of the augment. The numbers remaining on the right side are your final answers. Step through the lab below to watch Gaussian Elimination in real-time.
                    </p>
                </div>
            </div>
            
            <GaussianEliminationLab />
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Systems Solved</h3>
                    <p className="text-blue-100/50 text-sm font-sans font-light">You are ready to command N-dimensional space.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/determinants" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Next: Determinants <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}