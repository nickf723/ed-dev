"use client";
import React from "react";
import Link from "next/link";
import SpacesBackground from "./SpacesBackground";
import { 
  ArrowLeft, Layers, Component, 
  Maximize, Minimize, Box, 
  Grid
} from "lucide-react";

export default function SpacesPage() {
  return (
    <main className="relative min-h-screen bg-[#05020c] text-white overflow-hidden font-mono selection:bg-violet-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <SpacesBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/linear" className="flex items-center gap-2 text-xs text-violet-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_05
             </Link>
             <div className="flex items-end gap-6 border-b border-violet-500/30 pb-6">
                 <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <Layers size={40} className="text-violet-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       VECTOR SPACES
                    </h1>
                    <p className="text-violet-400/60 max-w-md text-sm leading-relaxed">
                        The playground of linear algebra. Understanding dimensions, span, and the fabric of mathematical reality.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE SPAN */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-violet-500" />
                    <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">01 // The Span</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    The "Span" of a set of vectors is all the places you can reach by stretching and combining them.
                    <br/><br/>
                    Imagine two arrows on the floor. If you can walk along them as far as you want, the entire floor is their <strong>Span</strong>.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-violet-500/20 bg-black/40 rounded flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-violet-500 font-bold text-xs uppercase">
                            <Maximize size={12} /> Infinite
                        </div>
                        <div className="text-zinc-400 text-xs">A Space usually goes on forever in all directions.</div>
                    </div>
                    <div className="p-4 border border-violet-500/20 bg-black/40 rounded flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-violet-500 font-bold text-xs uppercase">
                            <Minimize size={12} /> Origin
                        </div>
                        <div className="text-zinc-400 text-xs">Every Space must contain the zero vector (0,0).</div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Plane */}
            <div className="aspect-square relative border border-violet-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group overflow-hidden">
                 {/* 3D Grid Plane Effect */}
                 
                 <div className="absolute inset-0 flex items-center justify-center opacity-50">
                    <div className="w-[150%] h-[150%] border-t border-b border-l border-r border-violet-500/30 rotate-45 skew-x-12" />
                    <div className="w-[150%] h-[150%] border-t border-b border-l border-r border-violet-500/30 rotate-[60deg] skew-y-12 absolute" />
                 </div>
                 
                 {/* Origin Point */}
                 <div className="absolute w-2 h-2 bg-white rounded-full z-10" />
                 
                 {/* Vectors */}
                 <div className="absolute w-24 h-1 bg-fuchsia-500 rotate-12 origin-left z-10 shadow-[0_0_10px_#d946ef]" />
                 <div className="absolute w-24 h-1 bg-violet-500 -rotate-45 origin-left z-10 shadow-[0_0_10px_#8b5cf6]" />
            </div>
        </section>

        {/* SECTION 2: BASIS & DIMENSION */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">02 // The Blueprint</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basis */}
                <div className="p-6 bg-violet-950/20 border border-violet-500/30 rounded-xl hover:bg-violet-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Component size={20} className="text-violet-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-violet-600">Minimum Set</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Basis</div>
                    <p className="text-xs text-zinc-500 mb-4 h-12">
                        The most efficient set of vectors needed to build the space. No redundancies. They must be <strong>Linearly Independent</strong>.
                    </p>
                    
                </div>

                {/* Dimension */}
                <div className="p-6 bg-fuchsia-950/20 border border-fuchsia-500/30 rounded-xl hover:bg-fuchsia-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Box size={20} className="text-fuchsia-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-fuchsia-600">The Count</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Dimension</div>
                    <p className="text-xs text-zinc-500 mb-4 h-12">
                        The number of vectors in the Basis. 
                        <br/>
                        <span className="text-white">Line = 1D</span>. 
                        <span className="text-white">Plane = 2D</span>. 
                        <span className="text-white">Space = 3D</span>.
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 3: SUBSPACES (The Russian Doll) */}
        <section className="bg-black/40 border border-violet-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
             
             <div className="flex-1">
                 <div className="flex items-center gap-2 text-violet-400 mb-2">
                     <Grid size={20} />
                     <span className="font-bold tracking-widest">SUBSPACES</span>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-4">Spaces Inside Spaces</h3>
                 <p className="text-sm text-zinc-400 leading-relaxed">
                     A line passing through the origin inside a 3D room is a <strong>Subspace</strong> ($R^1$ inside $R^3$).
                     <br/><br/>
                     Important Subspaces of a Matrix:
                 </p>
                 <ul className="text-xs text-violet-200 mt-4 space-y-2 font-mono">
                     <li className="flex gap-2">
                         <span className="text-fuchsia-400">Col(A):</span> Column Space (Range)
                     </li>
                     <li className="flex gap-2">
                         <span className="text-fuchsia-400">Nul(A):</span> Null Space (Kernel)
                     </li>
                 </ul>
             </div>

             {/* Visual: Nested Dimensions */}
             <div className="w-64 h-48 border border-white/10 bg-black/20 rounded flex items-center justify-center relative perspective-[1000px]">
                 {/* 3D Cube Wireframe (Abstract R3) */}
                 <div className="w-32 h-32 border border-zinc-700/50 absolute rotate-12" />
                 
                 {/* 2D Plane (Abstract R2) */}
                 <div className="w-40 h-24 bg-violet-500/20 border border-violet-500/50 absolute -rotate-6 transform skew-x-12" />
                 
                 {/* 1D Line (Abstract R1) */}
                 <div className="w-56 h-1 bg-fuchsia-500 absolute rotate-[-20deg] shadow-[0_0_15px_#d946ef]" />
                 
                 <div className="absolute bottom-2 right-2 text-[10px] text-zinc-600 uppercase">R3 contains R2 contains R1</div>
             </div>
        </section>

      </div>
    </main>
  );
}