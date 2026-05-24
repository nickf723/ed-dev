"use client";
import React from "react";
import Link from "next/link";
import SVDBackground from "./_components/SVDBackground";
import SVDLab from "./_components/SVDLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Box, RotateCcw, Scaling, RotateCw,
  Database, Zap, Image as ImageIcon, ArrowRight,
  CheckCircle2
} from "lucide-react";

export default function SVDPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0206] text-white overflow-hidden font-sans selection:bg-pink-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <SVDBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,114,182,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,114,182,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-pink-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-pink-500/30 backdrop-blur-md w-max shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_09
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-pink-500/30 pb-8">
                 <div className="p-4 bg-pink-500/10 border border-pink-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(244,114,182,0.2)] group relative overflow-hidden">
                    <Box size={48} className="text-pink-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       S.V.D.
                    </h1>
                    <p className="text-pink-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-pink-500/50 pl-6">
                        Singular Value Decomposition. The ultimate theorem of linear algebra that dismantles any matrix into pure rotations and scalings.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE THEOREM */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-pink-500" />
                    <h2 className="text-xl font-bold text-pink-300 uppercase tracking-widest">01 // The Dissection</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Not every matrix is a clean, square, invertible box. But the SVD theorem guarantees that <strong>absolutely any matrix</strong> (even rectangular ones) can be factored into three fundamental actions. It is the geometric equivalent of separating an object into its raw DNA.
                </p>
                
                <div className="bg-pink-950/20 border border-pink-500/30 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-inner mt-8">
                    <div className="text-4xl md:text-5xl font-mono font-black text-white drop-shadow-[0_0_15px_rgba(244,114,182,0.5)]">
                        <M>A = U \Sigma V^T</M>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
                <div className="relative border border-pink-500/30 rounded-3xl bg-black/60 backdrop-blur-xl p-4 shadow-2xl">
                    
                </div>
            </div>
        </section>

        {/* SECTION 2: THE PIPELINE LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-pink-500" />
                <h2 className="text-xl font-bold text-pink-300 uppercase tracking-widest">02 // The Pipeline</h2>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed mb-6">
                Let's watch exactly how a matrix <M>A</M> transforms a perfect circle of vectors into a slanted ellipse. We apply the SVD right-to-left: first we rotate the grid (<M>V^T</M>), then we stretch it strictly along the X and Y axes (<M>\Sigma</M>), and finally, we rotate it into its new position (<M>U</M>).
            </p>

            <SVDLab />
        </section>

        {/* SECTION 3: THE COMPONENTS */}
        <section>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* V^T */}
                <div className="p-8 bg-black/40 border border-cyan-500/20 rounded-3xl hover:border-cyan-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:-rotate-90 transition-transform duration-500 border border-cyan-500/20">
                            <RotateCcw size={24} className="text-cyan-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-cyan-500 tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full">Step 1</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2"><M>V^T</M></div>
                    <div className="text-xs text-cyan-400 font-bold uppercase tracking-widest mb-4">Input Rotation</div>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        An Orthogonal Matrix. It does not stretch or squash space; it only spins it. It aligns the raw input vectors to prepare them for scaling.
                    </p>
                </div>

                {/* Sigma */}
                <div className="p-8 bg-black/40 border border-pink-500/30 rounded-3xl hover:bg-pink-950/20 hover:border-pink-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-pink-500/10 rounded-xl group-hover:scale-110 transition-transform duration-500 border border-pink-500/20">
                            <Scaling size={24} className="text-pink-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-pink-500 tracking-widest bg-pink-500/10 px-3 py-1 rounded-full">Step 2</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2"><M>\Sigma</M></div>
                    <div className="text-xs text-pink-400 font-bold uppercase tracking-widest mb-4">The Singular Values</div>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        A Diagonal Matrix. This contains the absolute "strength" or scaling factor of the transformation. It is the heart of the matrix where all physical stretching occurs.
                    </p>
                </div>

                {/* U */}
                <div className="p-8 bg-black/40 border border-lime-500/20 rounded-3xl hover:border-lime-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-lime-500/10 rounded-xl group-hover:rotate-90 transition-transform duration-500 border border-lime-500/20">
                            <RotateCw size={24} className="text-lime-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-lime-500 tracking-widest bg-lime-500/10 px-3 py-1 rounded-full">Step 3</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-2"><M>U</M></div>
                    <div className="text-xs text-lime-400 font-bold uppercase tracking-widest mb-4">Output Rotation</div>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        Another Orthogonal Matrix. It takes the newly stretched shape and spins it into its final physical orientation in output space.
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 4: DATA COMPRESSION (Low-Rank Approx) */}
        <section className="bg-gradient-to-br from-pink-950/40 to-black/60 border border-pink-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden backdrop-blur-xl shadow-2xl mt-12">
             
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                 <Database size={250} />
             </div>
             
             <div className="flex-1 relative z-10">
                 <div className="flex items-center gap-2 text-pink-400 mb-4">
                     <Zap size={24} />
                     <span className="font-bold tracking-widest uppercase text-sm">Real-World Application</span>
                 </div>
                 <h3 className="text-3xl font-black text-white mb-4">Low-Rank Compression</h3>
                 <p className="text-sm text-zinc-300 leading-relaxed max-w-lg mb-6">
                     Because the singular values in <M>\Sigma</M> are sorted from largest to smallest, the SVD tells us exactly which pieces of data are important and which are just "noise".
                 </p>
                 <p className="text-sm text-zinc-300 leading-relaxed max-w-lg">
                     If we delete the smallest singular values (Truncated SVD), we can compress megabytes of image data or machine learning matrices into kilobytes, while preserving almost all of the visual or mathematical meaning.
                 </p>
             </div>

             <div className="w-full md:w-auto bg-black/60 p-4 rounded-2xl border border-white/10 text-center shadow-inner relative z-10">
                 <div className="flex items-center justify-center text-zinc-600 mb-4">
                     <ImageIcon size={32} />
                 </div>
                 
                 <div className="mt-4 text-[10px] font-mono font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 px-3 py-1 rounded inline-block">
                     Rank-k Approximation
                 </div>
             </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-pink-500/20 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Linear Algebra Conquered</h3>
                    <p className="text-pink-100/50 text-sm font-sans font-light">You have mastered the grid. You are ready for Calculus.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/calculus" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-pink-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(244,114,182,0.5)]">
                Next: Calculus <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}