"use client";
import React from "react";
import Link from "next/link";
import LinearBackground from "./LinearBackground";
import { 
  ArrowLeft, TrendingUp, Move, 
  ArrowUpRight, GitCommit, GitMerge,
  Maximize2, Minimize2, Crosshair
} from "lucide-react";

export default function LinearEquationsPage() {
  return (
    <main className="relative min-h-screen bg-[#080b14] text-white overflow-hidden font-mono selection:bg-teal-500/30">
      
      {/* 1. VISUAL ENGINE (The Cartesian Plotter) */}
      <LinearBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-teal-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_02
             </Link>
             <div className="flex items-end gap-6 border-b border-teal-500/30 pb-6">
                 <div className="p-4 bg-teal-500/10 border border-teal-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                    <TrendingUp size={40} className="text-teal-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       LINEAR EQUATIONS
                    </h1>
                    <p className="text-teal-400/60 max-w-md text-sm leading-relaxed">
                        Visualizing relationships between two variables. Slope, intercepts, and the geometry of the line.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: ANATOMY OF THE PLANE */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-teal-500" />
                    <h2 className="text-xl font-bold text-teal-300 uppercase tracking-widest">01 // The Coordinate Plane</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A 2D space defined by two perpendicular number lines: the horizontal <strong>X-Axis</strong> and vertical <strong>Y-Axis</strong>. They intersect at the <strong>Origin (0,0)</strong>.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-teal-500/20 bg-black/40 rounded flex items-center gap-4">
                        <Move className="text-teal-500" />
                        <div>
                            <div className="text-xs font-bold text-white">X-AXIS</div>
                            <div className="text-[10px] text-teal-500/50">Independent Variable</div>
                        </div>
                    </div>
                    <div className="p-4 border border-teal-500/20 bg-black/40 rounded flex items-center gap-4">
                        <Move className="text-teal-500 rotate-90" />
                        <div>
                            <div className="text-xs font-bold text-white">Y-AXIS</div>
                            <div className="text-[10px] text-teal-500/50">Dependent Variable</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual: Interactive-looking Quadrant Map */}
            <div className="aspect-square relative border border-teal-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center group overflow-hidden">
                

[Image of coordinate plane quadrants]

                {/* Axes */}
                <div className="absolute w-full h-px bg-teal-500/50" />
                <div className="absolute h-full w-px bg-teal-500/50" />
                {/* Origin */}
                <div className="absolute w-3 h-3 bg-teal-500 rounded-full shadow-[0_0_10px_#14b8a6] z-10 group-hover:scale-150 transition-transform" />
                
                {/* Quadrant Labels */}
                <div className="absolute top-4 right-4 text-xs font-mono text-teal-500/40 font-bold">Q1 (+,+)</div>
                <div className="absolute top-4 left-4 text-xs font-mono text-teal-500/40 font-bold">Q2 (-,+)</div>
                <div className="absolute bottom-4 left-4 text-xs font-mono text-teal-500/40 font-bold">Q3 (-,-)</div>
                <div className="absolute bottom-4 right-4 text-xs font-mono text-teal-500/40 font-bold">Q4 (+,-)</div>

                {/* Animated Scanner */}
                <div className="absolute inset-0 bg-gradient-to-b from-teal-500/10 to-transparent h-4 w-full animate-[scan_4s_linear_infinite]" />
            </div>
        </section>

        {/* SECTION 2: SLOPE (Rise over Run) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-teal-500" />
                <h2 className="text-xl font-bold text-teal-300 uppercase tracking-widest">02 // Slope (m)</h2>
            </div>
            
            <div className="p-8 border border-dashed border-teal-500/30 rounded-xl bg-teal-900/5">
                <div className="flex flex-col md:flex-row gap-12 items-center">
                    
                    {/* The Formula */}
                    <div className="flex-1">
                        <h3 className="text-3xl font-black text-white mb-2">Rise / Run</h3>
                        <p className="text-sm text-zinc-400 mb-8">
                            Slope measures the steepness and direction of a line. It is the constant rate of change.
                        </p>

                        <div className="flex items-center gap-6 font-mono text-xl">
                            <span className="text-teal-500 font-bold italic">m</span>
                            <span>=</span>
                            <div className="flex flex-col items-center">
                                <span className="border-b border-white/20 px-2 text-teal-200">y₂ - y₁</span>
                                <span className="px-2 text-teal-200">x₂ - x₁</span>
                            </div>
                            <span>=</span>
                            <div className="flex flex-col items-center">
                                <span className="border-b border-white/20 px-2 text-teal-200">Δy</span>
                                <span className="px-2 text-teal-200">Δx</span>
                            </div>
                        </div>
                    </div>

                    {/* The Visualizer */}
                    <div className="w-full md:w-1/2 bg-black/40 border border-teal-500/20 rounded-lg p-6 relative h-48 flex items-center justify-center overflow-hidden">
                        

[Image of slope rise over run triangle]

                        {/* Grid */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
                        
                        {/* The Line */}
                        <div className="absolute w-[120%] h-1 bg-teal-500 -rotate-12 transform origin-center shadow-[0_0_15px_#14b8a6]" />
                        
                        {/* The Triangle Overlay (CSS Only) */}
                        <div className="absolute w-24 h-12 border-b-2 border-r-2 border-dashed border-white/50 translate-y-4 translate-x-12" />
                        <span className="absolute text-[10px] text-white translate-x-24 translate-y-4">Run</span>
                        <span className="absolute text-[10px] text-white translate-x-32 translate-y-0">Rise</span>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE MASTER EQUATION */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-teal-500" />
                <h2 className="text-xl font-bold text-teal-300 uppercase tracking-widest">03 // Slope-Intercept Form</h2>
            </div>

            {/* Interactive Equation Breakdown */}
            <div className="flex justify-center my-12">
                <div className="text-6xl md:text-8xl font-black font-mono flex items-center gap-4 bg-black/40 p-8 rounded-2xl border border-teal-500/20 backdrop-blur-xl relative overflow-hidden group hover:border-teal-500/50 transition-colors cursor-default">
                    
                    <span className="opacity-50">y</span>
                    <span>=</span>
                    
                    {/* Slope m */}
                    <div className="relative group/m cursor-pointer">
                        <span className="text-teal-400 group-hover/m:text-teal-200 transition-colors">m</span>
                        <span className="opacity-50">x</span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-32 bg-teal-900 border border-teal-500 text-xs text-center py-2 rounded opacity-0 group-hover/m:opacity-100 transition-opacity pointer-events-none">
                            <span className="font-bold block text-teal-300">SLOPE</span>
                            Rate of Change
                        </div>
                    </div>

                    <span>+</span>

                    {/* Intercept b */}
                    <div className="relative group/b cursor-pointer">
                        <span className="text-rose-400 group-hover/b:text-rose-200 transition-colors">b</span>
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-32 bg-rose-900 border border-rose-500 text-xs text-center py-2 rounded opacity-0 group-hover/b:opacity-100 transition-opacity pointer-events-none">
                            <span className="font-bold block text-rose-300">Y-INTERCEPT</span>
                            Starting Point (0, b)
                        </div>
                    </div>
                </div>
            </div>

            {/* FORM CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 bg-teal-950/20 border border-teal-500/30 rounded-xl hover:bg-teal-950/40 transition-colors">
                    <div className="flex justify-between mb-4">
                        <TrendingUp size={20} className="text-teal-400" />
                        <span className="text-[10px] uppercase font-bold text-teal-600">Most Common</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Slope-Intercept</div>
                    <div className="font-mono text-sm text-teal-300 mb-2">y = mx + b</div>
                    <p className="text-xs text-zinc-500">Best for graphing directly. Shows start and rate.</p>
                </div>

                <div className="p-6 bg-blue-950/20 border border-blue-500/30 rounded-xl hover:bg-blue-950/40 transition-colors">
                    <div className="flex justify-between mb-4">
                        <Crosshair size={20} className="text-blue-400" />
                        <span className="text-[10px] uppercase font-bold text-blue-600">Calculus Ready</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Point-Slope</div>
                    <div className="font-mono text-sm text-blue-300 mb-2">y - y₁ = m(x - x₁)</div>
                    <p className="text-xs text-zinc-500">Best when you know a point and a slope.</p>
                </div>

                <div className="p-6 bg-violet-950/20 border border-violet-500/30 rounded-xl hover:bg-violet-950/40 transition-colors">
                    <div className="flex justify-between mb-4">
                        <Maximize2 size={20} className="text-violet-400" />
                        <span className="text-[10px] uppercase font-bold text-violet-600">Rigid</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Standard Form</div>
                    <div className="font-mono text-sm text-violet-300 mb-2">Ax + By = C</div>
                    <p className="text-xs text-zinc-500">Best for finding X and Y intercepts.</p>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}