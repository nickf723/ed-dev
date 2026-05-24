"use client";
import React from "react";
import Link from "next/link";
import SystemsBackground from "./_components/SystemsBackground";
import SystemExplorerLab from "./_components/SystemExplorerLab";
import { 
  ArrowLeft, Layers, Crosshair, 
  GitMerge, RefreshCw, Delete, 
  AlertCircle, CheckCircle2, ArrowRight
} from "lucide-react";

export default function SystemsPage() {
  return (
    <main className="relative min-h-screen bg-[#04060f] text-white overflow-hidden font-mono selection:bg-cyan-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <SystemsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-cyan-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-cyan-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_03
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-white/10 pb-8">
                 <div className="p-4 bg-white/5 border border-cyan-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-orange-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Layers size={48} className="text-cyan-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                       SYSTEMS
                    </h1>
                    <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed font-sans font-light border-l-2 border-cyan-500/50 pl-6">
                        Finding the precise coordinates where multiple linear equations equate to the same truth. When geometries collide.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE INTERSECTION & LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">01 // The Objective</h2>
            </div>
            
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
                    <div className="flex-1">
                        <h3 className="text-3xl font-black text-white mb-4">Where Paths Cross</h3>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                            A system of equations asks: <strong>"Is there a pair of (x, y) that works for BOTH lines?"</strong> Graphically, this is the exact coordinate where the two lines cross. Drag the sliders in the lab below to map the intersections!
                        </p>
                    </div>
                </div>

                {/* INJECTED LAB */}
                <SystemExplorerLab />
            </div>
        </section>

        {/* SECTION 2: METHODS OF ATTACK */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">02 // Solving Methods</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Method 1: Graphing */}
                <div className="p-8 bg-cyan-950/20 border border-cyan-500/30 rounded-2xl hover:bg-cyan-900/40 transition-colors shadow-lg backdrop-blur-sm group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-cyan-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Crosshair size={24} className="text-cyan-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">Visual</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Graphing</div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed">
                        Plot both lines. Look for the intersection. It's the most intuitive method, but can be highly inaccurate if the lines cross at a decimal or fraction.
                    </p>
                </div>

                {/* Method 2: Substitution */}
                <div className="p-8 bg-orange-950/20 border border-orange-500/30 rounded-2xl hover:bg-orange-900/40 transition-colors shadow-lg backdrop-blur-sm group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-orange-500/20 rounded-xl group-hover:rotate-180 transition-transform duration-700">
                            <RefreshCw size={24} className="text-orange-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-orange-500/10 text-orange-400 px-2 py-1 rounded">Algebraic</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Substitution</div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed mb-4">
                        Solve one equation for a variable, then plug it into the other to collapse the system into a single equation.
                    </p>
                    <div className="font-mono text-[10px] text-orange-300 bg-black/40 p-2 rounded border border-orange-500/20 break-all">
                        If y=2x, then x+y=3 → x+(2x)=3
                    </div>
                </div>

                {/* Method 3: Elimination */}
                <div className="p-8 bg-purple-950/20 border border-purple-500/30 rounded-2xl hover:bg-purple-900/40 transition-colors shadow-lg backdrop-blur-sm group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-purple-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Delete size={24} className="text-purple-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-purple-500/10 text-purple-400 px-2 py-1 rounded">Tactical</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Elimination</div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed mb-4">
                        Add or subtract entire equations vertically to instantly delete a variable.
                    </p>
                    <div className="font-mono text-[10px] text-purple-300 bg-black/40 p-2 rounded border border-purple-500/20">
                        (2x+y) - (x+y) → x
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: ANOMALIES */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">03 // Anomalies</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-6 p-6 border border-white/5 rounded-2xl bg-slate-900/40 backdrop-blur-md shadow-lg">
                    <div className="bg-red-500/10 p-3 rounded-xl">
                        <GitMerge className="text-red-500 rotate-90" size={28} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Parallel Lines</h3>
                        <p className="text-sm font-sans text-slate-400 leading-relaxed">Same Slope, Different Intercept. They never meet.</p>
                        <div className="mt-3 text-xs font-mono text-red-400 uppercase font-bold flex items-center gap-2 bg-red-500/10 w-max px-3 py-1 rounded-full">
                            <AlertCircle size={14} /> No Solution
                        </div>
                    </div>
                </div>

                <div className="flex items-start gap-6 p-6 border border-white/5 rounded-2xl bg-slate-900/40 backdrop-blur-md shadow-lg">
                    <div className="bg-green-500/10 p-3 rounded-xl">
                        <GitMerge className="text-green-500" size={28} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white mb-1">Coinciding Lines</h3>
                        <p className="text-sm font-sans text-slate-400 leading-relaxed">Same Slope, Same Intercept. They are the exact same line.</p>
                        <div className="mt-3 text-xs font-mono text-green-400 uppercase font-bold flex items-center gap-2 bg-green-500/10 w-max px-3 py-1 rounded-full">
                            <CheckCircle2 size={14} /> Infinite Solutions
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-12 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Systems Mastered</h3>
                    <p className="text-cyan-100/50 text-sm font-sans font-light">You can find the intersection of any paths.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/inequalities" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                Next: Inequalities <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}