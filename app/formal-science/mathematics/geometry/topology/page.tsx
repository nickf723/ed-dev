"use client";
import React from "react";
import Link from "next/link";
import TopologyBackground from "./TopologyBackground";
import { 
  ArrowLeft, Combine, Infinity, 
  Repeat, Minimize, Lasso, 
  Fingerprint, Circle, Box
} from "lucide-react";
import ManifoldBackground from "./ManifoldBackground";

export default function TopologyPage() {
  return (
    <main className="relative min-h-screen bg-[#05020c] text-white overflow-hidden font-mono selection:bg-violet-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <TopologyBackground />
      <ManifoldBackground />
      {/* OVERLAY: Fluid distortion effect (CSS trickery) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0, 0, 0, 0)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4">
         <div className="max-w-7xl mx-auto flex justify-between items-end border-b border-violet-500/30 pb-6">
             <div>
                 <Link href="/math/geometry" className="flex items-center gap-2 text-xs text-violet-500 hover:text-white transition-colors mb-2 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Geometry // Domain_04
                 </Link>
                 <div className="flex items-center gap-4">
                    <div className="bg-violet-500/10 p-3 rounded-2xl border border-violet-500/30 backdrop-blur-md">
                        <Combine size={32} className="text-violet-400" />
                    </div>
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-white">
                           TOPOLOGY
                        </h1>
                        <p className="text-violet-400/60 text-sm tracking-wide">
                            Rubber Sheet Geometry. Deformation & Connectivity.
                        </p>
                    </div>
                 </div>
             </div>
         </div>
      </header>

      {/* 3. SCROLLABLE CONTENT */}
      <div className="relative z-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-8 space-y-20">

              {/* SECTION 1: THE GOLDEN RULE (Homeomorphism) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-px bg-violet-500" />
                          <h2 className="text-xl font-bold text-violet-200 uppercase tracking-widest">
                              Homeomorphism
                          </h2>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                          In Topology, two shapes are the same if you can stretch, squeeze, and bend one into the other without tearing or gluing.
                          <br/><br/>
                          A <strong>Donut</strong> is the same as a <strong>Coffee Cup</strong> because they both have exactly one hole.
                      </p>
                      
                      <div className="flex gap-4">
                          <div className="px-4 py-3 bg-violet-900/20 border border-violet-500/30 rounded-full flex items-center gap-2 text-xs text-violet-300">
                              <Minimize size={14} /> Stretching Allowed
                          </div>
                          <div className="px-4 py-3 bg-red-900/10 border border-red-500/30 rounded-full flex items-center gap-2 text-xs text-red-400">
                              <Lasso size={14} /> No Tearing
                          </div>
                      </div>
                  </div>

                  {/* Visual: Morphing Illustration */}
                  <div className="aspect-video relative rounded-3xl overflow-hidden border border-violet-500/20 bg-black/40 backdrop-blur-md flex items-center justify-center group">
                      
                      <div className="absolute bottom-4 left-0 w-full text-center text-[10px] text-violet-500 font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                          Continuous Deformation
                      </div>
                  </div>
              </section>

              {/* SECTION 2: GENUS (The Holes) */}
              <section>
                  <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-px bg-violet-500" />
                      <h2 className="text-xl font-bold text-violet-200 uppercase tracking-widest">
                          Surface Classification
                      </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      
                      {/* Genus 0 (Sphere) */}
                      <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 hover:border-violet-500/50 transition-all hover:-translate-y-2">
                          <div className="absolute top-4 right-4 text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">0</div>
                          <div className="mb-6 w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                              <Circle size={32} className="text-violet-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">Sphere</h3>
                          <div className="text-xs text-violet-500 font-bold uppercase tracking-wide mb-4">Genus 0</div>
                          <p className="text-xs text-zinc-400">
                              No holes. Includes cubes, tetrahedrons, and plates. If you inflate them, they all become balls.
                          </p>
                      </div>

                      {/* Genus 1 (Torus) */}
                      <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 hover:border-violet-500/50 transition-all hover:-translate-y-2">
                          <div className="absolute top-4 right-4 text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">1</div>
                          <div className="mb-6 w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                              <Repeat size={32} className="text-violet-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">Torus</h3>
                          <div className="text-xs text-violet-500 font-bold uppercase tracking-wide mb-4">Genus 1</div>
                          <p className="text-xs text-zinc-400">
                              One hole. Donuts, coffee cups, and wedding rings. You cannot shrink a loop around the hole to a point.
                          </p>
                      </div>

                      {/* Genus 2 (Double Torus) */}
                      <div className="group relative p-8 rounded-3xl bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20 hover:border-violet-500/50 transition-all hover:-translate-y-2">
                          <div className="absolute top-4 right-4 text-4xl font-black text-white/10 group-hover:text-white/20 transition-colors">2</div>
                          <div className="mb-6 w-16 h-16 rounded-full bg-black/50 border border-white/10 flex items-center justify-center">
                              <Infinity size={32} className="text-violet-400" />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">Double Torus</h3>
                          <div className="text-xs text-violet-500 font-bold uppercase tracking-wide mb-4">Genus 2</div>
                          <p className="text-xs text-zinc-400">
                              Two holes. Like a figure-8 pretzel. The complexity of possible loops increases exponentially.
                          </p>
                      </div>

                  </div>
              </section>

              {/* SECTION 3: THE WEIRD STUFF (Non-Orientable) */}
              <section className="relative rounded-3xl overflow-hidden border border-fuchsia-500/30">
                  <div className="absolute inset-0 bg-fuchsia-900/10 z-0" />
                  
                  <div className="relative z-10 p-12 flex flex-col md:flex-row items-center gap-16">
                      <div className="flex-1">
                          <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
                              <Fingerprint size={20} />
                              <span className="font-bold tracking-widest uppercase text-xs">Non-Orientable</span>
                          </div>
                          <h2 className="text-4xl font-black text-white mb-4">The Möbius Strip</h2>
                          <p className="text-zinc-300 leading-relaxed mb-6">
                              A surface with only <strong>one side</strong> and <strong>one edge</strong>. If you walk along it, you will eventually return to your starting point, but upside down.
                              
                          </p>
                          
                          <div className="inline-block px-6 py-3 border border-fuchsia-500/50 rounded-full text-fuchsia-300 font-bold text-xs uppercase hover:bg-fuchsia-500/20 transition-colors cursor-pointer">
                              Trace the Path
                          </div>
                      </div>

                      {/* Visual: Abstract Representation */}
                      <div className="w-64 h-48 border-2 border-fuchsia-500/30 rounded-2xl bg-black/40 flex items-center justify-center relative perspective-[1000px] group">
                           {/* Using a twisted loop SVG or similar visual metaphor */}
                           <div className="w-40 h-20 border-4 border-fuchsia-500 rounded-full transform rotate-x-60 animate-[spin_10s_linear_infinite]" />
                           <div className="absolute text-xs text-white/50 font-mono top-2 right-2">Klein Bottle →</div>
                      </div>
                  </div>
              </section>

          </div>
      </div>
    </main>
  );
}