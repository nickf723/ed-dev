"use client";
import React from "react";
import Link from "next/link";
import QuadraticBackground from "./QuadraticBackground";
import { 
  ArrowLeft, Scaling, ArrowDownToLine, 
  Maximize, Minimize, Divide,
  ChevronsDown, FunctionSquare
} from "lucide-react";

export default function QuadraticsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-hidden font-mono selection:bg-blue-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <QuadraticBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-blue-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_05
             </Link>
             <div className="flex items-end gap-6 border-b border-blue-500/30 pb-6">
                 <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    <Scaling size={40} className="text-blue-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       QUADRATICS
                    </h1>
                    <p className="text-blue-400/60 max-w-md text-sm leading-relaxed">
                        Polynomials of degree 2. Modeling gravity, area, and parabolic motion.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: ANATOMY OF A PARABOLA */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-blue-500" />
                    <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">01 // The Parabola</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A U-shaped curve that is symmetrical. Unlike a line, it changes direction. It goes down, hits a bottom (Vertex), and goes back up.
                </p>
                
                {/* Interactive Points List */}
                <div className="space-y-2">
                    <div className="p-3 border border-white/10 rounded bg-white/5 flex items-center gap-3">
                        <ArrowDownToLine className="text-blue-400" size={18} />
                        <div>
                            <span className="text-xs font-bold text-white block">VERTEX (h, k)</span>
                            <span className="text-[10px] text-zinc-500">The turning point. Maximum or Minimum.</span>
                        </div>
                    </div>
                    <div className="p-3 border border-white/10 rounded bg-white/5 flex items-center gap-3">
                        <Divide className="text-blue-400 rotate-90" size={18} />
                        <div>
                            <span className="text-xs font-bold text-white block">AXIS OF SYMMETRY</span>
                            <span className="text-[10px] text-zinc-500">The mirror line: x = h</span>
                        </div>
                    </div>
                    <div className="p-3 border border-white/10 rounded bg-white/5 flex items-center gap-3">
                        <ChevronsDown className="text-blue-400" size={18} />
                        <div>
                            <span className="text-xs font-bold text-white block">ROOTS (Zeros)</span>
                            <span className="text-[10px] text-zinc-500">Where the ball hits the ground (x-intercepts).</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The U Shape */}
            <div className="aspect-square relative border border-blue-500/30 rounded-xl bg-slate-900/60 backdrop-blur-md flex items-center justify-center overflow-hidden group">
                 
                 {/* CSS Parabola */}
                 <div className="w-48 h-48 border-b-4 border-l-4 border-r-4 border-blue-500 rounded-b-full transform translate-y-[-25%] group-hover:scale-110 transition-transform duration-700 ease-in-out" />
                 
                 {/* Axis of Symmetry */}
                 <div className="absolute h-full w-0.5 bg-blue-500/20 border-l border-dashed border-blue-400" />
                 
                 {/* Vertex Dot */}
                 <div className="absolute w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_white] z-10 translate-y-[22px] group-hover:translate-y-[32px] transition-transform duration-700" />
                 <span className="absolute translate-y-[45px] text-[10px] font-mono text-blue-300">VERTEX</span>
            </div>
        </section>

        {/* SECTION 2: THE FORMS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-500" />
                <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">02 // The Three Forms</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Standard */}
                <div className="p-6 bg-blue-950/20 border border-blue-500/30 rounded-xl hover:bg-blue-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <FunctionSquare size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-blue-600">Expanded</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Standard Form</div>
                    <div className="font-mono text-sm text-blue-300 mb-2">y = ax² + bx + c</div>
                    <p className="text-xs text-zinc-500">
                        Shows the y-intercept (c) and direction (a). Hard to graph without converting.
                    </p>
                </div>

                {/* Vertex */}
                <div className="p-6 bg-indigo-950/20 border border-indigo-500/30 rounded-xl hover:bg-indigo-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Minimize size={20} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-indigo-600">Graphing</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Vertex Form</div>
                    <div className="font-mono text-sm text-indigo-300 mb-2">y = a(x - h)² + k</div>
                    <p className="text-xs text-zinc-500">
                        Best for graphing. The vertex is visible immediately at <span className="text-white">(h, k)</span>.
                    </p>
                </div>

                {/* Intercept */}
                <div className="p-6 bg-sky-950/20 border border-sky-500/30 rounded-xl hover:bg-sky-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Maximize size={20} className="text-sky-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-sky-600">Solving</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">Intercept Form</div>
                    <div className="font-mono text-sm text-sky-300 mb-2">y = a(x - p)(x - q)</div>
                    <p className="text-xs text-zinc-500">
                        Best for finding roots. Crosses x-axis at <span className="text-white">p</span> and <span className="text-white">q</span>.
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE ULTIMATE WEAPON (Quadratic Formula) */}
        <section className="mt-8">
             <div className="bg-slate-900/50 border border-blue-500/30 rounded-2xl p-8 relative overflow-hidden text-center group">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <h3 className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-4">The Universal Solvent</h3>
                
                <div className="inline-block relative">
                    {/* The Formula */}
                    <div className="text-3xl md:text-5xl font-black font-serif text-white flex items-center gap-4">
                        <span className="text-blue-400">x</span>
                        <span>=</span>
                        <div className="flex flex-col items-center">
                            <span className="border-b-2 border-white px-2 mb-1">
                                -b ± <span className="text-blue-300">√</span><span className="border-t border-blue-300">b² - 4ac</span>
                            </span>
                            <span className="text-2xl">2a</span>
                        </div>
                    </div>
                </div>

                <p className="mt-8 text-sm text-blue-200/60 max-w-2xl mx-auto">
                    When you cannot factor, this formula solves <strong>ANY</strong> quadratic equation. It is derived from completing the square.
                </p>
             </div>
        </section>

      </div>
    </main>
  );
}