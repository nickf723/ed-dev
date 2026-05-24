"use client";
import React from "react";
import Link from "next/link";
import SpacesBackground from "./_components/SpacesBackground";
import LinearCombinationLab from "./_components/LinearCombinationLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Layers, Component, 
  Maximize, Minimize, Box, 
  Grid, MoveUpRight, Hexagon,
  ArrowRight, CheckCircle2
} from "lucide-react";

export default function SpacesPage() {
  return (
    <main className="relative min-h-screen bg-[#05020c] text-white overflow-hidden font-sans selection:bg-violet-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <SpacesBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-violet-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-violet-500/30 backdrop-blur-md w-max shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_06
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-violet-500/30 pb-8">
                 <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(139,92,246,0.2)] group relative overflow-hidden">
                    <Layers size={48} className="text-violet-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       VECTOR SPACES
                    </h1>
                    <p className="text-violet-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-violet-500/50 pl-6">
                        The playground of linear algebra. Understanding dimension, span, and the fundamental blueprint of mathematical reality.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE SPAN & THE LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">01 // The Span</h2>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
                <div className="flex-1">
                    <h3 className="text-3xl font-black text-white mb-4">Linear Combinations</h3>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-6">
                        The <strong>Span</strong> of a set of vectors is every possible coordinate you can reach by stretching and combining them. If you have two vectors pointing in different directions, you can reach the entire infinite 2D plane just by adjusting their scalar multipliers (<M>c_1</M> and <M>c_2</M>).
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-violet-500/20 bg-black/40 rounded-xl flex items-center gap-3 shadow-inner">
                            <Maximize className="text-violet-500" size={16} />
                            <div className="text-xs text-zinc-300">Space extends infinitely.</div>
                        </div>
                        <div className="p-4 border border-violet-500/20 bg-black/40 rounded-xl flex items-center gap-3 shadow-inner">
                            <Minimize className="text-violet-500" size={16} />
                            <div className="text-xs text-zinc-300">Must contain Origin <M>(0,0)</M>.</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* THE INTERACTIVE LAB */}
            <LinearCombinationLab />
        </section>

        {/* SECTION 2: BASIS & DIMENSION */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">02 // The Blueprint</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basis */}
                <div className="p-8 bg-black/40 border border-violet-500/30 rounded-3xl hover:bg-violet-950/20 hover:border-violet-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-violet-500/10 rounded-xl group-hover:scale-110 transition-transform border border-violet-500/20">
                            <Component size={24} className="text-violet-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-violet-500 tracking-widest bg-violet-500/10 px-3 py-1 rounded-full border border-violet-500/20">Minimum Set</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-4">The Basis</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        The most efficient set of vectors needed to build the space. There can be absolutely no redundancies. They must be <strong>Linearly Independent</strong>, meaning no vector in the basis can be built by combining the others.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-violet-300 border border-white/5 shadow-inner mt-auto flex items-center justify-center gap-4 text-lg">
                        <M display={true}>{`c_1\\vec{v}_1 + c_2\\vec{v}_2 = \\vec{0}`}</M>
                        <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">(Only if c=0)</span>
                    </div>
                </div>

                {/* Dimension */}
                <div className="p-8 bg-black/40 border border-fuchsia-500/30 rounded-3xl hover:bg-fuchsia-950/20 hover:border-fuchsia-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-fuchsia-500/10 rounded-xl group-hover:scale-110 transition-transform border border-fuchsia-500/20">
                            <Box size={24} className="text-fuchsia-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-fuchsia-500 tracking-widest bg-fuchsia-500/10 px-3 py-1 rounded-full border border-fuchsia-500/20">The Count</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-4">Dimension</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Simply the number of vectors in the Basis. It tells you exactly how many degrees of freedom you have in your space.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl flex justify-around text-center text-fuchsia-300 border border-white/5 shadow-inner mt-auto font-mono text-sm">
                        <div className="flex flex-col"><span className="text-white font-bold">1 Vector</span><div><M>{'\\mathbb{R}^1'}</M></div> (Line)</div>
                        <div className="flex flex-col border-l border-white/10 pl-4"><span className="text-white font-bold">2 Vectors</span><div><M>{'\\mathbb{R}^2'}</M></div> (Plane)</div>
                        <div className="flex flex-col border-l border-white/10 pl-4"><span className="text-white font-bold">3 Vectors</span><div><M>{'\\mathbb{R}^3'}</M></div> (Space)</div>
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: SUBSPACES */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">03 // The Russian Doll</h2>
            </div>

            <div className="bg-gradient-to-br from-violet-950/40 to-black/60 border border-violet-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                 
                 <div className="flex-1 relative z-10">
                     <div className="flex items-center gap-2 text-violet-400 mb-4">
                         <Grid size={24} />
                         <span className="font-bold tracking-widest uppercase text-sm">Subspaces</span>
                     </div>
                     <h3 className="text-3xl font-black text-white mb-4">Spaces Inside Spaces</h3>
                     <p className="text-sm text-zinc-300 leading-relaxed mb-8 max-w-lg">
                         A line passing perfectly through the origin inside a 3D room is a valid Subspace (<M>{'\\mathbb{R}^1'}</M> existing inside <M>{'\\mathbb{R}^3'}</M>). Every Matrix creates two fundamental, hidden subspaces:
                     </p>
                     
                     <div className="space-y-4">
                         <div className="bg-black/60 border border-white/5 p-4 rounded-xl flex items-center gap-4 shadow-inner">
                             <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400"><MoveUpRight size={18} /></div>
                             <div>
                                 <div className="font-bold text-white font-mono flex items-center gap-2">Col(A) <span className="text-[10px] text-violet-400 uppercase tracking-widest font-sans">Column Space</span></div>
                                 <div className="text-xs text-zinc-400 mt-1">The span of all the columns. The reachable outputs.</div>
                             </div>
                         </div>
                         
                         <div className="bg-black/60 border border-white/5 p-4 rounded-xl flex items-center gap-4 shadow-inner">
                             <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 flex items-center justify-center text-fuchsia-400"><Hexagon size={18} /></div>
                             <div>
                                 <div className="font-bold text-white font-mono flex items-center gap-2">Nul(A) <span className="text-[10px] text-fuchsia-400 uppercase tracking-widest font-sans">Null Space</span></div>
                                 <div className="text-xs text-zinc-400 mt-1">Every input vector that gets crushed to <M>{'\\vec{0}'}</M>.</div>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Visual: Nested Dimensions */}
                 <div className="w-full md:w-auto flex items-center justify-center p-8 bg-black/40 border border-white/10 rounded-2xl shadow-inner relative perspective-[1000px] min-h-[300px] min-w-[300px]">
                     {/* 3D Cube Wireframe (Abstract R3) */}
                     <div className="w-48 h-48 border border-zinc-700/50 absolute rotate-12 transition-transform duration-1000 hover:rotate-[30deg]" />
                     
                     {/* 2D Plane (Abstract R2) */}
                     <div className="w-64 h-32 bg-violet-500/20 border border-violet-500/50 absolute -rotate-6 transform skew-x-12 shadow-[0_0_30px_rgba(139,92,246,0.2)]" />
                     
                     {/* 1D Line (Abstract R1) */}
                     <div className="w-72 h-1 bg-fuchsia-500 absolute rotate-[-20deg] shadow-[0_0_15px_#d946ef]" />
                     
                     <div className="absolute bottom-4 right-4 text-[10px] text-zinc-500 uppercase font-bold tracking-widest font-mono bg-black/80 px-2 py-1 rounded">
                         <M display={true}>{`\\mathbb{R}^3 \\supset \\mathbb{R}^2 \\supset \\mathbb{R}^1`}</M>
                     </div>
                 </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-400 shadow-inner">
                    <Layers size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Dimensions Verified</h3>
                    <p className="text-violet-100/50 text-sm font-sans font-light">You are ready to discover the invariant vectors of Eigen Theory.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/eigen" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-violet-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Next: Eigen Theory <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}