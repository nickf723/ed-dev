"use client";
import React from "react";
import Link from "next/link";
import VectorsBackground from "./VectorsBackground";
import { 
  ArrowLeft, MoveUpRight, Maximize2, 
  Minimize2, Crosshair, Navigation,
  Rocket, MousePointer2
} from "lucide-react";

export default function VectorsPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0500] text-white overflow-hidden font-mono selection:bg-orange-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <VectorsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/linear" className="flex items-center gap-2 text-xs text-orange-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_01
             </Link>
             <div className="flex items-end gap-6 border-b border-orange-500/30 pb-6">
                 <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                    <MoveUpRight size={40} className="text-orange-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       VECTORS
                    </h1>
                    <p className="text-orange-400/60 max-w-md text-sm leading-relaxed">
                        Quantities with both magnitude and direction. The fundamental building blocks of space.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: DEFINITION (The Physics) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-orange-500" />
                    <h2 className="text-xl font-bold text-orange-300 uppercase tracking-widest">01 // Scalar vs Vector</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A <strong>Scalar</strong> is just a number (Speed: 50mph). <br/>
                    A <strong>Vector</strong> is a number with a plan (Velocity: 50mph <em>North</em>).
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-orange-500/20 bg-black/40 rounded flex flex-col gap-2 group hover:border-orange-500/50 transition-colors">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase">
                            <Maximize2 size={12} /> Magnitude
                        </div>
                        <div className="text-zinc-400 text-xs">The Length. "How much?"</div>
                    </div>
                    <div className="p-4 border border-orange-500/20 bg-black/40 rounded flex flex-col gap-2 group hover:border-orange-500/50 transition-colors">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase">
                            <Navigation size={12} /> Direction
                        </div>
                        <div className="text-zinc-400 text-xs">The Angle. "Which way?"</div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Arrow */}
            <div className="aspect-square relative border border-orange-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group overflow-hidden">
                 {/* Grid lines */}
                 <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
                 
                 {/* The Vector */}
                 <div className="relative w-32 h-1 bg-white rotate-[-30deg] shadow-[0_0_15px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-500">
                     {/* Head */}
                     <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 border-t-2 border-r-2 border-white rotate-45" />
                     
                     {/* Components (Projected shadows) */}
                     <div className="absolute top-8 left-0 w-full h-px bg-orange-500/50 border-b border-dashed border-orange-500 rotate-30 origin-left" /> 
                     <div className="absolute -left-8 top-0 h-full w-px bg-orange-500/50 border-l border-dashed border-orange-500 rotate-30 origin-top" /> 
                 </div>

                 {/* Labels */}
                 <div className="absolute bottom-1/4 right-1/4 text-xs font-mono text-orange-400">v</div>
            </div>
        </section>

        {/* SECTION 2: OPERATIONS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-orange-500" />
                <h2 className="text-xl font-bold text-orange-300 uppercase tracking-widest">02 // Operations</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Addition */}
                <div className="p-6 bg-orange-950/20 border border-orange-500/30 rounded-xl hover:bg-orange-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Rocket size={20} className="text-orange-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-orange-600">Addition</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Tip-to-Tail</div>
                    <p className="text-xs text-zinc-500 mb-4 h-10">
                        To add vectors, walk along the first, then start the second from where you stopped.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center text-orange-200">
                        [1, 2] + [3, 1] = [4, 3]
                    </div>
                </div>

                {/* Scaling */}
                <div className="p-6 bg-red-950/20 border border-red-500/30 rounded-xl hover:bg-red-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Minimize2 size={20} className="text-red-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-red-600">Scaling</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Scalar Mult</div>
                    <p className="text-xs text-zinc-500 mb-4 h-10">
                        Multiply by a normal number to stretch or shrink the arrow. Negative flips it.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center text-red-200">
                        2 • [1, 2] = [2, 4]
                    </div>
                </div>

                {/* Dot Product */}
                <div className="p-6 bg-amber-950/20 border border-amber-500/30 rounded-xl hover:bg-amber-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Crosshair size={20} className="text-amber-400 group-hover:rotate-90 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-amber-600">Dot Product</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Alignment</div>
                    <p className="text-xs text-zinc-500 mb-4 h-10">
                        A number telling you how much two vectors point in the same direction.
                    </p>
                    <div className="bg-black/40 p-2 rounded text-xs font-mono text-center text-amber-200">
                        v • w = |v||w|cos(θ)
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE MEME (Easter Egg) */}
        <section className="flex justify-center mt-8 opacity-40 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 text-[10px] text-orange-500 font-mono uppercase tracking-[0.2em] animate-pulse">
                <MousePointer2 size={12} />
                Direction <span className="text-white">AND</span> Magnitude
            </div>
        </section>

      </div>
    </main>
  );
}