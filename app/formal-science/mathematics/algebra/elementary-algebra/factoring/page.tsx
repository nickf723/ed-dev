"use client";
import React from 'react';
import Link from 'next/link';
import ParabolaGraph from "./ParabolaGraph";
import DiamondSolver from "./DiamondSolver";
import MathRenderer from '../../../../../../components/MathRenderer';
import { STRATEGIES } from './factoringStrategies';
import { 
  ArrowLeft, Grid, Calculator, 
  Divide, Layers, Box, ChevronRight 
} from "lucide-react";

export default function FactoringPage() {
  return (
    // Main is transparent to let Canvas (z-0) show through.
    <main className="relative min-h-screen bg-transparent text-slate-800 font-sans selection:bg-blue-200">
      
      {/* LAYER 0: Canvas */}
      <ParabolaGraph />
      
      {/* LAYER 1: Content (z-10 sits on top of z-0 canvas) */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/algebra" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-blue-600 transition-colors bg-white/50 px-3 py-2 rounded backdrop-blur-sm border border-slate-200/50">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Algebra
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/80 border border-slate-200 px-3 py-1 rounded text-slate-600 shadow-sm backdrop-blur-md">
                <Grid size={12} /> Unit 4: Polynomials
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 relative">
            <div className="inline-block p-3 bg-blue-100/90 rounded-lg text-blue-600 mb-6 backdrop-blur-sm shadow-sm">
                <Divide size={32} />
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6 drop-shadow-sm mix-blend-multiply">
                THE ART OF <br/><span className="text-blue-600">DECONSTRUCTION</span>
            </h1>
            
            <div className="max-w-2xl bg-white/60 backdrop-blur-md border-l-4 border-blue-600 p-6 rounded-r-lg shadow-sm">
                <p className="text-xl text-slate-700 font-light leading-relaxed">
                    Factoring is the reverse of multiplication. It is the process of breaking a polynomial down into its component parts to reveal its roots, zeros, and x-intercepts.
                </p>
            </div>
        </header>

        

[Image of factoring flowchart diagram]


        {/* SECTION 1: THE CONCEPT (Interactive) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Calculator size={24} className="text-blue-600" />
                <h2 className="text-3xl font-black uppercase tracking-tight bg-white/50 backdrop-blur-sm px-2 rounded">The Diamond Method</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <DiamondSolver />
                </div>
                <div className="bg-white/80 backdrop-blur-md p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h3 className="font-bold uppercase text-sm text-slate-500 mb-4">Why this works</h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                        When multiplying binomials <span className="font-mono bg-slate-100 px-1 rounded text-slate-700">(x+m)(x+n)</span>, the result is:
                    </p>
                    <div className="text-center text-slate-800 bg-slate-50 p-4 rounded mb-4 overflow-x-auto border border-slate-100">
                        <MathRenderer expression="x^2 + (m+n)x + (mn)" />
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Therefore, to go backwards, we need two numbers that <strong>multiply</strong> to the constant term and <strong>add</strong> to the linear coefficient.
                    </p>
                    
                </div>
            </div>
        </section>

        {/* SECTION 2: TECHNIQUE LIBRARY */}
        <section className="border-t border-slate-300/50 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <Layers size={24} className="text-slate-700" />
                <h2 className="text-3xl font-black uppercase tracking-tight bg-white/50 backdrop-blur-sm px-2 rounded">The Strategy Toolkit</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {STRATEGIES.map((s) => (
                    <Link 
                        key={s.id}
                        href={`/formal-science/mathematics/algebra/elementary-algebra/factoring/${s.id}`}
                        className="group bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
                                {s.condition}
                            </div>
                            <div className="flex gap-0.5">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < s.difficulty ? 'bg-orange-500' : 'bg-slate-200'}`} />
                                ))}
                            </div>
                        </div>

                        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                            {s.name}
                        </h3>

                        {/* MATH RENDERER */}
                        <div className="text-sm text-slate-600 bg-slate-50 p-4 rounded mb-4 text-center min-h-[3rem] flex items-center justify-center border border-slate-100">
                            <MathRenderer expression={s.formula} />
                        </div>
                        
                        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                            {s.desc}
                        </p>

                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mt-auto group-hover:text-blue-500">
                            Learn Technique <ChevronRight size={14} />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
        
        {/* SECTION 3: VISUAL PROOFS */}
        <section className="mt-24 bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-slate-200 shadow-sm">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div>
                     <h3 className="text-2xl font-black uppercase mb-4">Geometric Proofs</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">
                         Factoring isn't just symbol manipulation; it's geometry. The "Difference of Squares" can be proven by taking a square of side <MathRenderer expression="a" />, cutting out a square of side <MathRenderer expression="b" />, and rearranging the remaining area.
                     </p>
                     
                 </div>
                 <div className="h-64 bg-slate-50 border border-slate-200 rounded flex items-center justify-center">
                     <Box size={64} className="text-slate-300" />
                 </div>
             </div>
        </section>

      </div>
    </main>
  );
}