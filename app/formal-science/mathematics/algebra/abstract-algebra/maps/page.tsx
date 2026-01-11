"use client";
import React from "react";
import Link from "next/link";
import HomomorphismBackground from "./HomomorphismBackground";
import { 
  ArrowLeft, Network, GitMerge, 
  GitPullRequest, Link as LinkIcon, 
  Scan, ArrowRight, Equal
} from "lucide-react";

export default function HomomorphismsPage() {
  return (
    <main className="relative min-h-screen bg-[#05020c] text-white overflow-hidden font-mono selection:bg-violet-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <HomomorphismBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/abstract" className="flex items-center gap-2 text-xs text-violet-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Abstract_Algebra // Struct_02
             </Link>
             <div className="flex items-end gap-6 border-b border-violet-500/30 pb-6">
                 <div className="p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                    <Network size={40} className="text-violet-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       HOMOMORPHISMS
                    </h1>
                    <p className="text-violet-400/60 max-w-md text-sm leading-relaxed">
                        Functions that preserve structure. Mapping the rules of one universe onto another without breaking them.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE CORE CONCEPT */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-violet-500" />
                    <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">01 // Structure Preservation</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A map $\phi$ is a homomorphism if it respects the group operation.
                    <br/><br/>
                    It means: <strong>"Do the math, then map"</strong> is the same as <strong>"Map, then do the math"</strong>.
                </p>
                
                <div className="bg-black/40 border border-violet-500/20 p-8 rounded-xl flex flex-col gap-4">
                    <div className="flex items-center justify-between text-lg font-mono font-bold">
                        <span className="text-violet-300">φ(a • b)</span>
                        <span className="text-zinc-500">=</span>
                        <span className="text-cyan-300">φ(a) * φ(b)</span>
                    </div>
                    
                    <div className="h-px w-full bg-white/10" />
                    
                    <div className="grid grid-cols-2 gap-4 text-[10px] text-zinc-500 uppercase tracking-widest">
                        <div className="text-center">Operation in G</div>
                        <div className="text-center">Operation in H</div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Map */}
            <div className="aspect-video relative border border-violet-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group">
                 {/* Background Pulse */}
                 <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-cyan-500/10 opacity-20" />
                 
                 <div className="flex items-center gap-8 relative z-10">
                     {/* Source Object */}
                     <div className="w-24 h-24 border-2 border-dashed border-violet-500 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                         <div className="w-16 h-16 bg-violet-500/20 rounded-full" />
                         <span className="absolute text-violet-300 font-bold">G</span>
                     </div>
                     
                     {/* The Arrow */}
                     <div className="flex flex-col items-center gap-2 text-white/50">
                         <span className="text-xs font-serif italic">phi (φ)</span>
                         <ArrowRight size={32} className="animate-pulse" />
                     </div>

                     {/* Target Object */}
                     <div className="w-16 h-16 border-2 border-cyan-500 rounded-lg flex items-center justify-center rotate-45">
                         <div className="w-10 h-10 bg-cyan-500/20 rounded" />
                         <span className="absolute text-cyan-300 font-bold -rotate-45">H</span>
                     </div>
                 </div>
                 
            </div>
        </section>

        {/* SECTION 2: KERNEL & IMAGE */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-violet-500" />
                <h2 className="text-xl font-bold text-violet-300 uppercase tracking-widest">02 // The Anatomy of the Map</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* KERNEL */}
                <div className="p-6 bg-violet-950/20 border border-violet-500/30 rounded-xl hover:bg-violet-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Scan size={20} className="text-violet-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-violet-600">The Dead Zone</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Kernel (Ker φ)</div>
                    <p className="text-xs text-zinc-500 mb-4 h-16">
                        Everything in G that gets crushed to 0 (the identity) in H. 
                        It measures "how much information is lost" during the transfer.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-violet-200">
                        {`{ g ∈ G | φ(g) = e_H }`}
                    </div>
                </div>

                {/* IMAGE */}
                <div className="p-6 bg-cyan-950/20 border border-cyan-500/30 rounded-xl hover:bg-cyan-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <GitMerge size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-cyan-600">The Reach</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Image (Im φ)</div>
                    <p className="text-xs text-zinc-500 mb-4 h-16">
                        The actual part of H that gets hit by the map. It might not cover the whole target group.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-cyan-200">
                        {`{ φ(g) | g ∈ G }`}
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: ISOMORPHISMS (The Holy Grail) */}
        <section className="bg-black/40 border border-white/10 rounded-xl p-8 flex flex-col items-center text-center relative overflow-hidden">
             
             <div className="relative z-10 max-w-2xl">
                 <div className="flex items-center justify-center gap-2 text-white mb-4">
                     <LinkIcon size={24} className="text-green-400" />
                     <h3 className="text-2xl font-bold">Isomorphism</h3>
                 </div>
                 
                 <p className="text-sm text-zinc-400 mb-8">
                     If a homomorphism is a <strong>Bijective</strong> (one-to-one and onto) map, it is an Isomorphism.
                     <br/>
                     This means the two groups are <strong>Identical</strong> in every way that matters. They are just labeled differently.
                 </p>
                 
                 <div className="inline-flex items-center gap-8 p-4 border border-green-500/30 bg-green-900/10 rounded-full">
                     <span className="text-xl font-mono font-bold text-violet-300">G</span>
                     <Equal size={24} className="text-green-500" />
                     <span className="text-xl font-mono font-bold text-cyan-300">H</span>
                 </div>
             </div>
        </section>

      </div>
    </main>
  );
}