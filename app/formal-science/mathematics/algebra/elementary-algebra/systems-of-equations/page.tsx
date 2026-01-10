"use client";
import React from "react";
import Link from "next/link";
import SystemsBackground from "./SystemsBackground";
import { 
  ArrowLeft, Layers, Crosshair, 
  GitMerge, RefreshCw, Delete, 
  AlertCircle, CheckCircle2
} from "lucide-react";

export default function SystemsPage() {
  return (
    <main className="relative min-h-screen bg-[#04060f] text-white overflow-hidden font-mono selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <SystemsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-cyan-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_03
             </Link>
             <div className="flex items-end gap-6 border-b border-white/10 pb-6">
                 <div className="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Layers size={40} className="text-white relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       SYSTEMS
                    </h1>
                    <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                        Finding the precise coordinates where multiple linear equations equate to the same truth.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE INTERSECTION */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-cyan-500" />
                    <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">01 // The Objective</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A system of equations asks: <strong>"Is there a pair of (x, y) that works for BOTH lines?"</strong> Graphically, this is the point where the lines cross.
                </p>
                
                <div className="p-6 border border-white/10 bg-black/40 rounded-xl font-mono text-sm space-y-2 relative overflow-hidden">
                    <div className="flex justify-between items-center text-cyan-400">
                        <span>y = 2x + 1</span>
                        <span className="text-[10px] opacity-50 uppercase">EQ_ALPHA</span>
                    </div>
                    <div className="flex justify-between items-center text-orange-400">
                        <span>y = -x + 4</span>
                        <span className="text-[10px] opacity-50 uppercase">EQ_BETA</span>
                    </div>
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center gap-3 text-white font-bold animate-pulse">
                        <Crosshair size={16} />
                        <span>Solution: (1, 3)</span>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Cross */}
            <div className="aspect-square relative border border-white/10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center overflow-hidden">
                 
                 {/* Visual Lines CSS */}
                 <div className="absolute w-[140%] h-0.5 bg-cyan-500 rotate-45" />
                 <div className="absolute w-[140%] h-0.5 bg-orange-500 -rotate-12 translate-y-4" />
                 
                 {/* Visual Intersection */}
                 <div className="absolute w-4 h-4 rounded-full border-2 border-white shadow-[0_0_20px_white] z-10 translate-x-4 translate-y-4" />
            </div>
        </section>

        {/* SECTION 2: METHODS OF ATTACK */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">02 // Solving Methods</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Method 1: Graphing */}
                <div className="p-6 bg-cyan-950/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Crosshair size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-cyan-600">Visual</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Graphing</div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        Plot both lines. Look for the intersection. Good for estimation, bad for precision.
                    </p>
                </div>

                {/* Method 2: Substitution */}
                <div className="p-6 bg-orange-950/20 border border-orange-500/30 rounded-xl hover:bg-orange-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <RefreshCw size={20} className="text-orange-400 group-hover:rotate-180 transition-transform duration-700" />
                        <span className="text-[10px] uppercase font-bold text-orange-600">Algebraic</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Substitution</div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        Solve one equation for x, then plug it into the other. 
                        <br/><span className="font-mono text-orange-300">If y=2x, then x+y=3 → x+(2x)=3</span>
                    </p>
                </div>

                {/* Method 3: Elimination */}
                <div className="p-6 bg-purple-950/20 border border-purple-500/30 rounded-xl hover:bg-purple-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Delete size={20} className="text-purple-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-purple-600">Tactical</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Elimination</div>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-4">
                        Add or subtract entire equations to delete a variable.
                        <br/><span className="font-mono text-purple-300">(2x+y) - (x+y) → x</span>
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 3: ANOMALIES */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">03 // Anomalies</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4 p-4 border border-white/5 rounded-lg bg-white/5">
                    <GitMerge className="text-red-500 rotate-90" size={24} />
                    <div>
                        <h3 className="font-bold text-white">Parallel Lines</h3>
                        <p className="text-xs text-zinc-400 mt-1">Same Slope, Different Intercept. They never meet.</p>
                        <div className="mt-2 text-xs font-mono text-red-400 uppercase font-bold flex items-center gap-2">
                            <AlertCircle size={10} /> No Solution
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-4 p-4 border border-white/5 rounded-lg bg-white/5">
                    <GitMerge className="text-green-500" size={24} />
                    <div>
                        <h3 className="font-bold text-white">Coinciding Lines</h3>
                        <p className="text-xs text-zinc-400 mt-1">Same Slope, Same Intercept. They are the same line.</p>
                        <div className="mt-2 text-xs font-mono text-green-400 uppercase font-bold flex items-center gap-2">
                            <CheckCircle2 size={10} /> Infinite Solutions
                        </div>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}