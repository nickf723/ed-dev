"use client";
import React from "react";
import Link from "next/link";
import EuclideanBackground from "./EuclideanBackground";
import { 
  ArrowLeft, Ruler, Triangle, Circle, 
  PenTool, Pentagon, Box, DraftingCompass, 
  MoveHorizontal, Scaling
} from "lucide-react";

// --- DATA ---
const AXIOMS = [
  { id: 1, title: "The Line", desc: "A straight line segment can be drawn joining any two points." },
  { id: 2, title: "The Ray", desc: "Any straight line segment can be extended indefinitely in a straight line." },
  { id: 3, title: "The Circle", desc: "Given any straight line segment, a circle can be drawn having the segment as radius and one endpoint as center." },
  { id: 4, title: "Right Angles", desc: "All right angles are congruent (equal to 90°)." },
  { id: 5, title: "Parallel", desc: "If two lines intersect a third such that inner angles < 180°, the lines eventually meet." }
];

const SHAPES = [
  { id: "triangles", title: "Triangles", icon: Triangle, desc: "Congruence & Similarity", href: "euclidean/triangles" },
  { id: "circles", title: "Circles", icon: Circle, desc: "Chords & Tangents", href: "euclidean/circles" },
  { id: "polygons", title: "Polygons", icon: Pentagon, desc: "Regular N-Gons", href: "euclidean/polygons" },
  { id: "solids", title: "Solids", icon: Box, desc: "Platonic Solids", href: "eucidean/solids" },
];

export default function EuclideanPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-white overflow-hidden font-mono selection:bg-sky-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <EuclideanBackground />
      
      {/* OVERLAY: Blueprint Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(56,189,248,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4">
         <div className="max-w-7xl mx-auto flex justify-between items-end border-b border-sky-500/30 pb-6">
             <div>
                 <Link href="./" className="flex items-center gap-2 text-xs text-sky-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Geometry // Domain_01
                 </Link>
                 <div className="flex items-center gap-4">
                    <div className="bg-sky-500/10 p-3 rounded-lg border border-sky-500/30 backdrop-blur-md">
                        <Ruler size={32} className="text-sky-400" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-white">
                           EUCLIDEAN
                        </h1>
                        <p className="text-sky-400/60 text-sm tracking-wide">
                            The Elements. Logic. Construction.
                        </p>
                    </div>
                 </div>
             </div>
         </div>
      </header>

      {/* 3. SCROLLABLE CONTENT AREA */}
      <div className="relative z-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8 space-y-20">
              
              {/* SECTION 1: THE AXIOMS (Horizontal Deck) */}
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-sky-500" />
                      <h2 className="text-xl font-bold text-sky-200 uppercase tracking-widest">
                          The 5 Postulates
                      </h2>
                  </div>
                  
                  {/* The Deck */}
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      {AXIOMS.map((axiom) => (
                          <div 
                             key={axiom.id}
                             className="group relative h-64 p-6 rounded-xl border border-sky-500/20 bg-black/40 backdrop-blur-md flex flex-col justify-between hover:bg-sky-900/20 hover:border-sky-500/50 transition-all duration-300 hover:-translate-y-2"
                          >
                              <div className="text-[10px] text-sky-500/50 font-bold uppercase tracking-widest">
                                  AXIOM_0{axiom.id}
                              </div>
                              
                              <div>
                                  <div className="text-lg font-bold text-white mb-2 group-hover:text-sky-300">
                                      {axiom.title}
                                  </div>
                                  <div className="h-px w-8 bg-sky-500/30 mb-4 group-hover:w-full transition-all" />
                                  <p className="text-xs text-zinc-400 leading-relaxed group-hover:text-white transition-colors">
                                      {axiom.desc}
                                  </p>
                              </div>

                              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <PenTool size={16} className="text-sky-400" />
                              </div>
                          </div>
                      ))}
                  </div>
              </section>

              {/* SECTION 2: THE TOOLS (Split View) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* COMPASS */}
                  <div className="p-8 rounded-2xl border border-sky-500/20 bg-sky-950/10 backdrop-blur-md flex items-center gap-8 group hover:border-sky-500/50 transition-colors">
                      <div className="p-6 rounded-full bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
                          <DraftingCompass size={40} className="text-sky-400" />
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Compass</h3>
                          <div className="text-xs font-mono text-sky-500 mb-4">tool.drawCircle(center, radius)</div>
                          <p className="text-sm text-zinc-400">
                              Creates circles. Transfers distances. The engine of rotation.
                              

[Image of compass drawing circle]

                          </p>
                      </div>
                  </div>

                  {/* STRAIGHTEDGE */}
                  <div className="p-8 rounded-2xl border border-sky-500/20 bg-sky-950/10 backdrop-blur-md flex items-center gap-8 group hover:border-sky-500/50 transition-colors">
                      <div className="p-6 rounded-full bg-black/40 border border-white/10 group-hover:scale-110 transition-transform">
                          <MoveHorizontal size={40} className="text-sky-400" />
                      </div>
                      <div>
                          <h3 className="text-2xl font-bold text-white mb-2">Straightedge</h3>
                          <div className="text-xs font-mono text-sky-500 mb-4">tool.connect(p1, p2)</div>
                          <p className="text-sm text-zinc-400">
                              Creates lines. Connects points. The engine of linearity.
                              
                          </p>
                      </div>
                  </div>
              </section>

              {/* SECTION 3: THE SHAPE LIBRARY (Grid) */}
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-sky-500" />
                      <h2 className="text-xl font-bold text-sky-200 uppercase tracking-widest">
                          Shape Library
                      </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {SHAPES.map((shape) => (
                          <Link
                              key={shape.id}
                              href={shape.href}
                              className="group p-1 rounded-xl bg-gradient-to-br from-sky-500/20 to-transparent hover:from-sky-500/50 transition-all duration-500"
                          >
                              <div className="bg-[#0f172a] h-full rounded-lg p-6 relative overflow-hidden">
                                  {/* Hover Glow */}
                                  <div className="absolute -right-8 -top-8 w-24 h-24 bg-sky-500/20 blur-2xl group-hover:bg-sky-500/40 transition-colors" />
                                  
                                  <shape.icon size={32} className="text-sky-400 mb-4 group-hover:scale-110 transition-transform" />
                                  <h3 className="text-lg font-bold text-white mb-1">{shape.title}</h3>
                                  <div className="text-[10px] text-sky-500 uppercase tracking-wider">{shape.desc}</div>
                              </div>
                          </Link>
                      ))}
                  </div>
              </section>

              {/* SECTION 4: THE GOLDEN RATIO */}
              <section className="relative rounded-2xl overflow-hidden border border-amber-500/30">
                  <div className="absolute inset-0 bg-amber-900/10 z-0" />
                  <div className="relative z-10 p-12 flex flex-col md:flex-row items-center gap-12">
                      <div className="flex-1">
                          <div className="flex items-center gap-2 text-amber-400 mb-2">
                              <Scaling size={20} />
                              <span className="font-bold tracking-widest uppercase text-xs">Divine Proportion</span>
                          </div>
                          <h2 className="text-4xl font-black text-white mb-4">phi (φ) ≈ 1.618</h2>
                          <p className="text-zinc-300 leading-relaxed mb-6">
                              A special number found by dividing a line into two parts so that the longer part divided by the smaller part is also equal to the whole length divided by the longer part. 
                              
                          </p>
                          <div className="inline-block px-4 py-2 border border-amber-500/50 rounded text-amber-300 font-mono text-xs">
                              (a+b)/a = a/b = φ
                          </div>
                      </div>
                      
                      {/* Visual: Golden Rectangle Diagram */}
                      <div className="w-64 h-40 border-2 border-amber-500/50 bg-black/40 relative">
                          {/* Main square */}
                          <div className="absolute top-0 left-0 bottom-0 w-40 border-r border-amber-500/30 bg-amber-500/10" />
                          <div className="absolute top-1/2 left-[62%] -translate-x-1/2 -translate-y-1/2 text-2xl font-serif text-amber-500 italic">φ</div>
                      </div>
                  </div>
              </section>

          </div>
      </div>
    </main>
  );
}