"use client";
import React from "react";
import Link from "next/link";
import TriangleBackground from "./TriangleBackground";
import { 
  ArrowLeft, Triangle, Ruler, 
  Scale, Calculator, Maximize, 
  CheckCircle2, BoxSelect
} from "lucide-react";

export default function TrianglesPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-white overflow-hidden font-mono selection:bg-sky-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <TriangleBackground />
      
      {/* OVERLAY: Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4">
         <div className="max-w-7xl mx-auto flex justify-between items-end border-b border-sky-500/30 pb-6">
             <div>
                 <Link href="/formal-science/mathematics/geometry/euclidean" className="flex items-center gap-2 text-xs text-sky-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Euclidean // Fig_02
                 </Link>
                 <div className="flex items-center gap-4">
                    <div className="bg-sky-500/10 p-3 rounded-lg border border-sky-500/30 backdrop-blur-md">
                        <Triangle size={32} className="text-sky-400" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-white">
                           TRIANGLES
                        </h1>
                        <p className="text-sky-400/60 text-sm tracking-wide">
                            The Polygon of Rigidity. Sum of Angles = 180°.
                        </p>
                    </div>
                 </div>
             </div>
         </div>
      </header>

      {/* 3. CONTENT */}
      <div className="relative z-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8 space-y-20">

              {/* SECTION 1: CLASSIFICATION DECK */}
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-sky-500" />
                      <h2 className="text-xl font-bold text-sky-200 uppercase tracking-widest">
                          Classification Matrix
                      </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Equilateral */}
                      <div className="group p-6 rounded-xl border border-sky-500/20 bg-black/40 backdrop-blur-md hover:border-sky-500/50 transition-all">
                          <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-bold text-white">Equilateral</h3>
                              <Scale size={16} className="text-sky-400" />
                          </div>
                          
                          <p className="text-xs text-zinc-400 mb-4 h-10">
                              The perfect triangle. All 3 sides equal. All 3 angles are 60°.
                          </p>
                          <div className="bg-sky-900/20 p-2 rounded text-center text-[10px] text-sky-300 font-bold uppercase">
                              3 Lines of Symmetry
                          </div>
                      </div>

                      {/* Isosceles */}
                      <div className="group p-6 rounded-xl border border-sky-500/20 bg-black/40 backdrop-blur-md hover:border-sky-500/50 transition-all">
                          <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-bold text-white">Isosceles</h3>
                              <BoxSelect size={16} className="text-sky-400" />
                          </div>
                          

[Image of isosceles triangle with two equal sides]

                          <p className="text-xs text-zinc-400 mb-4 h-10">
                              Two sides are equal. The angles opposite those sides are also equal.
                          </p>
                          <div className="bg-sky-900/20 p-2 rounded text-center text-[10px] text-sky-300 font-bold uppercase">
                              1 Line of Symmetry
                          </div>
                      </div>

                      {/* Scalene */}
                      <div className="group p-6 rounded-xl border border-sky-500/20 bg-black/40 backdrop-blur-md hover:border-sky-500/50 transition-all">
                          <div className="flex justify-between items-start mb-4">
                              <h3 className="text-lg font-bold text-white">Scalene</h3>
                              <Maximize size={16} className="text-sky-400" />
                          </div>
                          

[Image of scalene triangle with no equal sides]

                          <p className="text-xs text-zinc-400 mb-4 h-10">
                              Chaos. No sides are equal. No angles are equal.
                          </p>
                          <div className="bg-sky-900/20 p-2 rounded text-center text-[10px] text-sky-300 font-bold uppercase">
                              0 Lines of Symmetry
                          </div>
                      </div>
                  </div>
              </section>

              {/* SECTION 2: THE PYTHAGOREAN THEOREM */}
              <section className="relative rounded-2xl overflow-hidden border border-blue-500/30">
                  <div className="absolute inset-0 bg-blue-900/10 z-0" />
                  
                  <div className="relative z-10 p-12 flex flex-col md:flex-row items-center gap-16">
                      <div className="flex-1">
                          <div className="flex items-center gap-2 text-blue-400 mb-2">
                              <Calculator size={20} />
                              <span className="font-bold tracking-widest uppercase text-xs">Right Angle Logic</span>
                          </div>
                          <h2 className="text-4xl font-black text-white mb-4">Pythagoras</h2>
                          <p className="text-zinc-300 leading-relaxed mb-6">
                              For any right-angled triangle, the square of the hypotenuse (the long side) is equal to the sum of the squares of the other two sides.
                          </p>
                          
                          <div className="flex items-center gap-4 text-3xl font-mono font-bold">
                              <span className="text-sky-400">a²</span>
                              <span>+</span>
                              <span className="text-sky-400">b²</span>
                              <span>=</span>
                              <span className="text-white border-b-2 border-white">c²</span>
                          </div>
                      </div>

                      {/* Visual: The 3-4-5 Triangle */}
                      <div className="relative w-64 h-64 border border-dashed border-white/20 rounded-full flex items-center justify-center bg-black/40">
                          {/* Triangle */}
                          
                          <div className="relative">
                              {/* Leg A */}
                              <div className="absolute top-0 right-full h-24 w-1 bg-sky-500" />
                              <div className="absolute top-0 right-full h-24 w-24 bg-sky-500/20 border border-sky-500/50 flex items-center justify-center text-xs">a²</div>
                              
                              {/* Leg B */}
                              <div className="absolute bottom-full left-0 w-32 h-1 bg-sky-500" />
                              <div className="absolute bottom-full left-0 w-32 h-32 bg-sky-500/20 border border-sky-500/50 flex items-center justify-center text-xs">b²</div>
                              
                              {/* Hypotenuse C */}
                              <div className="w-40 h-1 bg-white rotate-[37deg] origin-bottom-left absolute top-0 left-0" />
                          </div>
                      </div>
                  </div>
              </section>

              {/* SECTION 3: THE INEQUALITY */}
              <section className="flex flex-col md:flex-row gap-6 p-6 rounded-xl bg-black/20 border border-white/5 items-center">
                  <div className="p-4 bg-sky-500/10 rounded-full text-sky-400">
                      <Ruler size={24} />
                  </div>
                  <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">Triangle Inequality Theorem</h3>
                      <p className="text-sm text-zinc-400">
                          The sum of any two side lengths must be <strong>greater</strong> than the third side. If it's equal, you have a flat line. If it's less, the sides don't touch.
                      </p>
                  </div>
                  <div className="px-6 py-3 rounded border border-white/10 bg-white/5 font-mono text-sm text-sky-200">
                      a + b &gt; c
                  </div>
              </section>

          </div>
      </div>
    </main>
  );
}