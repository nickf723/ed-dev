"use client";
import React from "react";
import Link from "next/link";
import LinearBackground from "./_components/LinearBackground";
import LineBuilderLab from "./_components/LineBuilderLab";
import { 
  ArrowLeft, TrendingUp, Move, 
  Crosshair, Maximize2, CheckCircle2, Target
} from "lucide-react";

export default function LinearEquationsPage() {
  return (
    <main className="relative min-h-screen bg-[#080b14] text-white overflow-hidden font-mono selection:bg-teal-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE (The Cartesian Plotter) */}
      <LinearBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 text-[10px] text-teal-400 hover:text-white transition-colors mb-8 bg-black/40 backdrop-blur-md border border-teal-500/30 px-4 py-2 rounded-full uppercase tracking-widest group shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_02
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-teal-500/30 pb-8">
                 <div className="w-20 h-20 bg-teal-500/10 border border-teal-500/30 rounded-2xl backdrop-blur-xl shadow-[0_0_30px_rgba(20,184,166,0.2)] flex items-center justify-center shrink-0">
                    <TrendingUp size={40} className="text-teal-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg">
                       LINEAR EQUATIONS
                    </h1>
                    <p className="text-teal-100/60 max-w-2xl text-lg leading-relaxed font-sans font-light border-l-2 border-teal-500/50 pl-6">
                        Visualizing relationships between two variables. Slope, intercepts, and the geometry of the infinite line.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: ANATOMY OF THE PLANE */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-teal-500" />
                    <h2 className="text-xl font-bold text-teal-300 uppercase tracking-widest">01 // The Coordinate Plane</h2>
                </div>
                <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    A 2D space defined by two perpendicular number lines: the horizontal <strong>X-Axis</strong> and vertical <strong>Y-Axis</strong>. They intersect perfectly in the center at the <strong>Origin (0,0)</strong>. Every point in this space represents an exact mathematical pairing.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-teal-500/20 bg-black/40 backdrop-blur-md rounded-xl flex items-center gap-4 shadow-inner">
                        <Move className="text-teal-500 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-white">X-AXIS</div>
                            <div className="text-[10px] text-teal-500/60 font-sans">Independent Var</div>
                        </div>
                    </div>
                    <div className="p-4 border border-teal-500/20 bg-black/40 backdrop-blur-md rounded-xl flex items-center gap-4 shadow-inner">
                        <Move className="text-teal-500 rotate-90 shrink-0" />
                        <div>
                            <div className="text-xs font-bold text-white">Y-AXIS</div>
                            <div className="text-[10px] text-teal-500/60 font-sans">Dependent Var</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual: CSS Quadrant Map */}
            <div className="aspect-square relative border border-teal-500/30 rounded-2xl bg-slate-900/60 backdrop-blur-xl flex items-center justify-center group overflow-hidden shadow-2xl">
                {/* Axes */}
                <div className="absolute w-full h-px bg-teal-500/60 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                <div className="absolute h-full w-px bg-teal-500/60 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                
                {/* Origin */}
                <div className="absolute w-4 h-4 bg-teal-400 rounded-full shadow-[0_0_20px_#2dd4bf] z-10 group-hover:scale-150 transition-transform duration-500 cursor-crosshair flex items-center justify-center">
                    <div className="w-1 h-1 bg-black rounded-full" />
                </div>
                
                {/* Quadrant Background Tints */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-sky-500/5 transition-colors group-hover:bg-sky-500/10" />
                <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-indigo-500/5 transition-colors group-hover:bg-indigo-500/10" />
                <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-500/5 transition-colors group-hover:bg-purple-500/10" />
                <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-fuchsia-500/5 transition-colors group-hover:bg-fuchsia-500/10" />

                {/* Quadrant Labels */}
                <div className="absolute top-6 right-6 text-sm font-mono text-teal-300 font-bold bg-black/40 px-3 py-1 rounded-lg border border-teal-500/20">Q1 (+,+)</div>
                <div className="absolute top-6 left-6 text-sm font-mono text-teal-300 font-bold bg-black/40 px-3 py-1 rounded-lg border border-teal-500/20">Q2 (-,+)</div>
                <div className="absolute bottom-6 left-6 text-sm font-mono text-teal-300 font-bold bg-black/40 px-3 py-1 rounded-lg border border-teal-500/20">Q3 (-,-)</div>
                <div className="absolute bottom-6 right-6 text-sm font-mono text-teal-300 font-bold bg-black/40 px-3 py-1 rounded-lg border border-teal-500/20">Q4 (+,-)</div>

                {/* Animated Radar Scanner */}
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/20 to-transparent h-8 w-full animate-[scan_3s_linear_infinite]" />
            </div>
        </section>

        {/* SECTION 2: SLOPE & THE LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-teal-500" />
                <h2 className="text-xl font-bold text-teal-300 uppercase tracking-widest">02 // Slope (m) & Rise/Run</h2>
            </div>
            
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
                    
                    {/* The Formula */}
                    <div className="flex-1">
                        <h3 className="text-3xl font-black text-white mb-4">The Rate of Change</h3>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-8">
                            Slope measures the steepness and direction of a line. It is the ratio of the vertical change between two points (the rise) to the horizontal change (the run). Drag the points in the lab below to see it in action!
                        </p>

                        <div className="flex items-center gap-6 font-mono text-xl bg-black/50 p-6 rounded-2xl border border-teal-500/20 w-max shadow-inner">
                            <span className="text-teal-400 font-bold italic text-3xl">m</span>
                            <span className="text-slate-500">=</span>
                            <div className="flex flex-col items-center">
                                <span className="border-b border-white/20 px-4 py-1 text-sky-300">y₂ - y₁</span>
                                <span className="px-4 py-1 text-indigo-300">x₂ - x₁</span>
                            </div>
                            <span className="text-slate-500">=</span>
                            <div className="flex flex-col items-center">
                                <span className="border-b border-white/20 px-4 py-1 text-amber-300">Δ Rise</span>
                                <span className="px-4 py-1 text-amber-300">Δ Run</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* THE INTERACTIVE LAB */}
                <LineBuilderLab />
            </div>
        </section>

        {/* SECTION 3: THE MASTER EQUATION */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-teal-500" />
                <h2 className="text-xl font-bold text-teal-300 uppercase tracking-widest">03 // Equation Forms</h2>
            </div>

            {/* Interactive Equation Breakdown */}
            <div className="flex justify-center my-12">
                <div className="text-5xl md:text-8xl font-black font-mono flex items-center gap-4 md:gap-6 bg-slate-900/60 p-8 md:p-12 rounded-3xl border border-teal-500/30 backdrop-blur-2xl shadow-[0_0_50px_rgba(20,184,166,0.1)] relative overflow-hidden group">
                    
                    {/* Background glow sweep */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-teal-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />

                    <span className="text-slate-300 relative z-10">y</span>
                    <span className="text-slate-600 relative z-10">=</span>
                    
                    {/* Slope m */}
                    <div className="relative group/m cursor-pointer z-10">
                        <span className="text-teal-400 group-hover/m:text-teal-200 transition-colors drop-shadow-[0_0_15px_rgba(20,184,166,0.5)]">m</span>
                        <span className="text-slate-300">x</span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-40 bg-teal-950/90 border border-teal-500/50 text-xs text-center p-3 rounded-xl opacity-0 group-hover/m:opacity-100 transition-opacity pointer-events-none font-sans backdrop-blur-md shadow-xl">
                            <span className="font-black block text-teal-300 text-sm mb-1 uppercase tracking-widest">SLOPE</span>
                            The constant rate of change.
                        </div>
                    </div>

                    <span className="text-slate-600 relative z-10">+</span>

                    {/* Intercept b */}
                    <div className="relative group/b cursor-pointer z-10">
                        <span className="text-rose-400 group-hover/b:text-rose-200 transition-colors drop-shadow-[0_0_15px_rgba(244,63,94,0.5)]">b</span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-6 left-1/2 -translate-x-1/2 w-40 bg-rose-950/90 border border-rose-500/50 text-xs text-center p-3 rounded-xl opacity-0 group-hover/b:opacity-100 transition-opacity pointer-events-none font-sans backdrop-blur-md shadow-xl">
                            <span className="font-black block text-rose-300 text-sm mb-1 uppercase tracking-widest">Y-INTERCEPT</span>
                            Where the line crosses the y-axis (0, b).
                        </div>
                    </div>
                </div>
            </div>

            {/* FORM CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 bg-teal-950/20 border border-teal-500/30 rounded-2xl hover:bg-teal-900/30 transition-colors shadow-lg backdrop-blur-sm group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-teal-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <TrendingUp size={24} className="text-teal-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-teal-500/10 text-teal-400 px-2 py-1 rounded">Default</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Slope-Intercept</div>
                    <div className="font-mono text-base text-teal-300 mb-4 bg-black/40 px-3 py-2 rounded inline-block border border-teal-500/20">y = mx + b</div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed">The gold standard. Best for graphing directly because it explicitly states your starting point and your path.</p>
                </div>

                <div className="p-8 bg-sky-950/20 border border-sky-500/30 rounded-2xl hover:bg-sky-900/30 transition-colors shadow-lg backdrop-blur-sm group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-sky-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Crosshair size={24} className="text-sky-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-sky-500/10 text-sky-400 px-2 py-1 rounded">Builder</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Point-Slope</div>
                    <div className="font-mono text-base text-sky-300 mb-4 bg-black/40 px-3 py-2 rounded inline-block border border-sky-500/20">y - y₁ = m(x - x₁)</div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed">The constructor. Best for building an equation when you only have a single random point and a slope.</p>
                </div>

                <div className="p-8 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl hover:bg-indigo-900/30 transition-colors shadow-lg backdrop-blur-sm group">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Maximize2 size={24} className="text-indigo-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded">Formal</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Standard Form</div>
                    <div className="font-mono text-base text-indigo-300 mb-4 bg-black/40 px-3 py-2 rounded inline-block border border-indigo-500/20">Ax + By = C</div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed">The organizer. Best for finding the exact X and Y intercepts quickly by plugging in zeros.</p>
                </div>
            </div>
        </section>

        {/* =========================================
            PRACTICE ARENA (PLACEHOLDER FOR FUTURE DB HOOKUP)
        ========================================= */}
        <section className="mt-12 pt-12 border-t border-white/10">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-amber-500 rounded-full" />
                <h2 className="text-sm font-bold text-amber-300 uppercase tracking-widest font-sans">Practice Arena // Coming Soon</h2>
            </div>
            
            <div className="w-full bg-black/40 border border-dashed border-amber-500/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                <Target size={48} className="text-amber-500/50 mb-4" />
                <h3 className="text-2xl font-black text-white mb-2 font-sans">Dynamic Problem Sets</h3>
                <p className="text-amber-200/60 max-w-md text-sm font-sans">
                    The question engine is currently offline while we aggregate vocabulary and construct the generation architecture. Check back soon for infinite practice problems!
                </p>
            </div>
        </section>

      </div>
    </main>
  );
}