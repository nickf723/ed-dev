"use client";
import React from "react";
import Link from "next/link";
import NonEuclideanBackground from "./NonEuclideanBackground";
import { 
  ArrowLeft, Globe, Infinity, 
  MoveDiagonal, Maximize2, Minimize2, 
  HelpCircle, AlertTriangle
} from "lucide-react";

export default function NonEuclideanPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0518] text-white overflow-hidden font-mono selection:bg-indigo-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <NonEuclideanBackground />
      
      {/* OVERLAY: Warped Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0a0518_100%)] z-0 pointer-events-none" />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4">
         <div className="max-w-7xl mx-auto flex justify-between items-end border-b border-indigo-500/30 pb-6">
             <div>
                 <Link href="/math/geometry" className="flex items-center gap-2 text-xs text-indigo-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Geometry // Domain_02
                 </Link>
                 <div className="flex items-center gap-4">
                    <div className="bg-indigo-500/10 p-3 rounded-lg border border-indigo-500/30 backdrop-blur-md">
                        <Globe size={32} className="text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-white">
                           NON-EUCLIDEAN
                        </h1>
                        <p className="text-indigo-400/60 text-sm tracking-wide">
                            Curved Space. Breaking the Fifth Postulate.
                        </p>
                    </div>
                 </div>
             </div>
         </div>
      </header>

      {/* 3. CONTENT CONTAINER */}
      <div className="relative z-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8 space-y-20">

              {/* SECTION 1: THE REBEL POSTULATE */}
              <section className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-12 opacity-10">
                      <HelpCircle size={100} />
                  </div>
                  
                  <h2 className="text-2xl font-bold text-white mb-4">The Fifth Postulate Problem</h2>
                  <p className="text-zinc-300 leading-relaxed max-w-2xl mb-6">
                      Euclid said: "If two lines are drawn which intersect a third in such a way that the sum of the inner angles on one side is less than two right angles, then the two lines inevitably must intersect each other on that side if extended far enough."
                      <br/><br/>
                      <strong className="text-indigo-400">Translation:</strong> Parallel lines never meet.
                      <br/>
                      <strong className="text-white">Non-Euclidean Geometry asks:</strong> "What if they do?"
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-mono text-indigo-300 bg-black/40 w-fit px-4 py-2 rounded">
                      <AlertTriangle size={12} /> Violation Detected: Axiom 5
                  </div>
              </section>

              {/* SECTION 2: THE SPLIT REALITY */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
                  {/* ELLIPTIC (SPHERE) */}
                  <section className="group p-8 rounded-2xl border border-blue-500/30 bg-blue-900/10 backdrop-blur-md hover:bg-blue-900/20 transition-all">
                      <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-blue-500/20 rounded-full text-blue-400 group-hover:scale-110 transition-transform">
                              <Maximize2 size={24} />
                          </div>
                          <h3 className="text-2xl font-bold text-white">Elliptic</h3>
                      </div>
                      
                      <div className="space-y-6">
                          <div>
                              <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Curvature</div>
                              <div className="text-xl text-white font-mono">Positive (K &gt; 0)</div>
                          </div>

                          <div>
                              <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Parallel Lines</div>
                              <p className="text-sm text-zinc-400">
                                  There are <strong>NO</strong> parallel lines. All lines eventually meet (like lines of longitude meeting at the poles).
                              </p>
                              

[Image of spherical geometry parallel lines]

                          </div>

                          <div>
                              <div className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">Triangles</div>
                              <p className="text-sm text-zinc-400">
                                  Angles sum to <strong>&gt; 180°</strong>. Triangles look "fat" or bloated.
                              </p>
                          </div>
                      </div>
                  </section>

                  {/* HYPERBOLIC (SADDLE) */}
                  <section className="group p-8 rounded-2xl border border-rose-500/30 bg-rose-900/10 backdrop-blur-md hover:bg-rose-900/20 transition-all">
                      <div className="flex items-center gap-4 mb-6">
                          <div className="p-3 bg-rose-500/20 rounded-full text-rose-400 group-hover:scale-110 transition-transform">
                              <Minimize2 size={24} />
                          </div>
                          <h3 className="text-2xl font-bold text-white">Hyperbolic</h3>
                      </div>
                      
                      <div className="space-y-6">
                          <div>
                              <div className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-1">Curvature</div>
                              <div className="text-xl text-white font-mono">Negative (K &lt; 0)</div>
                          </div>

                          <div>
                              <div className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-1">Parallel Lines</div>
                              <p className="text-sm text-zinc-400">
                                  There are <strong>INFINITE</strong> parallel lines through a single point. Space expands too fast for them to touch.
                              </p>
                              
                          </div>

                          <div>
                              <div className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-1">Triangles</div>
                              <p className="text-sm text-zinc-400">
                                  Angles sum to <strong>&lt; 180°</strong>. Triangles look "thin" or pinched.
                              </p>
                              
                          </div>
                      </div>
                  </section>

              </div>

              {/* SECTION 3: THE VISUALIZER LINK */}
              <section className="text-center p-12 border-t border-white/5">
                  <div className="inline-flex items-center gap-4 text-zinc-500 uppercase tracking-[0.2em] text-xs font-bold">
                      <MoveDiagonal size={16} />
                      Escher's Infinite Limit
                  </div>
              </section>

          </div>
      </div>
    </main>
  );
}