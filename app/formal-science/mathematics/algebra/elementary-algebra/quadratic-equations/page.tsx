"use client";
import React from "react";
import Link from "next/link";
import QuadraticBackground from "./_components/QuadraticBackground";
import ParabolaLab from "./_components/ParabolaLab";
import { 
  ArrowLeft, Scaling, ArrowDownToLine, 
  Maximize, Minimize, Divide, CheckCircle2,
  ChevronsDown, FunctionSquare, ArrowRight
} from "lucide-react";

// CUSTOM KATEX COMPONENT
import { M } from "@/app/_components/Math";

// VERIFICATION PROTOCOL IMPORTS
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";
import { quadraticsVocab } from "@/app/_data/vocab/q/quadratics";
import { quadraticsQuiz } from "./_components/assessment";

export default function QuadraticsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-white overflow-hidden font-sans selection:bg-blue-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <QuadraticBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="inline-flex items-center gap-2 text-xs text-blue-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-blue-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_05
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-blue-500/30 pb-8">
                 <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                    <Scaling size={48} className="text-blue-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       QUADRATICS
                    </h1>
                    <p className="text-blue-100/60 max-w-2xl text-lg leading-relaxed font-sans font-light border-l-2 border-blue-500/50 pl-6">
                        Polynomials of degree 2. Escaping the straight line to model gravity, area, and parabolic curves.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: ANATOMY OF A PARABOLA */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-blue-500" />
                    <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">01 // The Parabola</h2>
                </div>
                <p className="text-sm font-sans text-slate-300 leading-relaxed">
                    Unlike a line which travels in one direction forever, a parabola is a U-shaped curve. The introduction of the <M>x^2</M> term forces the line to turn around, creating perfect symmetry.
                </p>
                
                {/* Points List */}
                <div className="space-y-4">
                    <div className="p-4 border border-white/10 rounded-xl bg-black/40 flex items-center gap-4 hover:border-blue-500/30 transition-colors">
                        <ArrowDownToLine className="text-blue-400 shrink-0" size={24} />
                        <div>
                            <span className="text-sm font-bold text-white block mb-1">VERTEX <M>(h, k)</M></span>
                            <span className="text-xs text-slate-400">The turning point. The absolute Maximum or Minimum.</span>
                        </div>
                    </div>
                    <div className="p-4 border border-white/10 rounded-xl bg-black/40 flex items-center gap-4 hover:border-indigo-500/30 transition-colors">
                        <Divide className="text-indigo-400 rotate-90 shrink-0" size={24} />
                        <div>
                            <span className="text-sm font-bold text-white block mb-1">AXIS OF SYMMETRY</span>
                            <span className="text-xs text-slate-400">The invisible mirror line down the center: <M>x = h</M>.</span>
                        </div>
                    </div>
                    <div className="p-4 border border-white/10 rounded-xl bg-black/40 flex items-center gap-4 hover:border-sky-500/30 transition-colors">
                        <ChevronsDown className="text-sky-400 shrink-0" size={24} />
                        <div>
                            <span className="text-sm font-bold text-white block mb-1">ROOTS (Zeros)</span>
                            <span className="text-xs text-slate-400">Where the parabola crosses the x-axis (<M>y = 0</M>).</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The mathematically perfect SVG U Shape */}
            <div className="aspect-square relative border border-blue-500/30 rounded-2xl bg-slate-900/60 backdrop-blur-xl flex items-center justify-center overflow-hidden group shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent pointer-events-none" />
                 
                 <svg viewBox="0 0 100 100" className="absolute w-3/4 h-3/4 overflow-visible">
                     {/* Axis of Symmetry */}
                     <line x1="50" y1="-10" x2="50" y2="110" className="stroke-indigo-400/50" strokeWidth="1.5" strokeDasharray="4 4" />
                     
                     {/* The Parabola Curve (M = Start, Q = Control Point & End) */}
                     <path 
                        d="M 10 0 Q 50 160 90 0" 
                        fill="none" 
                        className="stroke-blue-500 group-hover:stroke-blue-400 transition-colors duration-700 ease-in-out" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                     />
                     
                     {/* Vertex Dot */}
                     <circle 
                        cx="50" cy="80" r="4" 
                        className="fill-pink-500 group-hover:-translate-y-2 transition-transform duration-700 shadow-[0_0_20px_#f472b6]" 
                     />
                 </svg>

                 <span className="absolute translate-y-[60px] group-hover:translate-y-[45px] text-[10px] font-mono font-bold text-pink-300 transition-all duration-700">VERTEX</span>
            </div>
        </section>

        {/* SECTION 2: SIMULATION DECK */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-blue-500" />
                <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">02 // The Lab</h2>
            </div>
            
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="mb-8">
                    <h3 className="text-3xl font-black text-white mb-4">Warping the Curve</h3>
                    <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6 max-w-3xl">
                        A parabola's shape and position are entirely controlled by three variables. Use the Vertex Form constructor below to dynamically build and shift parabolas across the coordinate plane.
                    </p>
                </div>

                {/* INJECTED LAB */}
                <ParabolaLab />
            </div>
        </section>

        {/* SECTION 3: THE FORMS (Now upgraded with KaTeX) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-blue-500" />
                <h2 className="text-xl font-bold text-blue-300 uppercase tracking-widest">03 // The Three Forms</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Standard */}
                <div className="p-8 bg-blue-950/20 border border-blue-500/30 rounded-2xl hover:bg-blue-900/40 transition-colors shadow-lg backdrop-blur-sm group flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-blue-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <FunctionSquare size={24} className="text-blue-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-blue-500/10 text-blue-400 px-2 py-1 rounded">Default</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-4">Standard Form</div>
                    <div className="text-lg text-blue-300 mb-6 bg-black/40 px-4 py-3 rounded-lg border border-blue-500/20 shadow-inner flex items-center justify-center">
                        <M>y = ax^2 + bx + c</M>
                    </div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed mt-auto">
                        Best for determining the y-intercept (<M>c</M>) and the direction of opening (<M>a</M>). Hard to graph directly.
                    </p>
                </div>

                {/* Vertex */}
                <div className="p-8 bg-indigo-950/20 border border-indigo-500/30 rounded-2xl hover:bg-indigo-900/40 transition-colors shadow-lg backdrop-blur-sm group flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-indigo-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Minimize size={24} className="text-indigo-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded">Graphing</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-4">Vertex Form</div>
                    <div className="text-lg text-indigo-300 mb-6 bg-black/40 px-4 py-3 rounded-lg border border-indigo-500/20 shadow-inner flex items-center justify-center">
                        <M>y = a(x - h)^2 + k</M>
                    </div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed mt-auto">
                        The ultimate visualizer. The peak (or valley) of the curve is visible immediately at coordinate <strong className="text-white"><M>(h, k)</M></strong>.
                    </p>
                </div>

                {/* Intercept */}
                <div className="p-8 bg-sky-950/20 border border-sky-500/30 rounded-2xl hover:bg-sky-900/40 transition-colors shadow-lg backdrop-blur-sm group flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-sky-500/20 rounded-xl group-hover:scale-110 transition-transform">
                            <Maximize size={24} className="text-sky-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold tracking-widest bg-sky-500/10 text-sky-400 px-2 py-1 rounded">Solving</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-4">Intercept Form</div>
                    <div className="text-lg text-sky-300 mb-6 bg-black/40 px-4 py-3 rounded-lg border border-sky-500/20 shadow-inner flex items-center justify-center">
                        <M>y = a(x - p)(x - q)</M>
                    </div>
                    <p className="text-sm font-sans text-slate-400 leading-relaxed mt-auto">
                        The factored state. Best for finding roots. The curve crosses the x-axis exactly at <strong className="text-white"><M>p</M></strong> and <strong className="text-white"><M>q</M></strong>.
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 4: THE ULTIMATE WEAPON (Now using KaTeX!) */}
        <section className="mt-12">
             <div className="bg-slate-900/60 border border-blue-500/30 rounded-3xl p-12 relative overflow-hidden text-center group backdrop-blur-xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                <h3 className="text-blue-400 text-sm font-bold uppercase tracking-widest mb-6">The Universal Solvent</h3>
                
                <div className="inline-block relative bg-black/40 px-12 py-2 rounded-2xl border border-white/5 shadow-inner">
                    {/* The KaTeX Formula */}
                    <div className="text-4xl md:text-5xl font-black text-blue-400 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                        <M display={true}>{`x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`}</M>
                    </div>
                </div>

                <p className="mt-8 text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed relative z-10">
                    When standard factoring fails, the <strong className="text-white">Quadratic Formula</strong> is guaranteed to solve ANY quadratic equation. It calculates the exact roots by finding the axis of symmetry and adding/subtracting the discriminant spread.
                </p>
             </div>
        </section>

        {/* =========================================
            VERIFICATION PROTOCOL
        ========================================= */}
        <section className="mt-12 pt-12 border-t border-white/10">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-blue-500 rounded-full" />
                <h2 className="text-sm font-bold text-blue-300 uppercase tracking-widest">Verification Protocol</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet 
                        currentDomain="Quadratics" 
                        localTerms={quadraticsVocab || []} 
                        accentColor="blue" 
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment 
                        title="Knowledge Check: Parabolas" 
                        questions={quadraticsQuiz || []} 
                        accentColor="blue"
                        onComplete={(score, total) => console.log(`Quadratics Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Curve Dynamics Mastered</h3>
                    <p className="text-blue-100/50 text-sm font-sans font-light">You are ready to break down complex polynomials.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/factoring" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-blue-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Next: Factoring <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}