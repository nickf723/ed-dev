"use client";
import React from "react";
import Link from "next/link";
import EigenBackground from "./_components/EigenBackground";
import EigenLab from "./_components/EigenLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Scaling, 
  Activity, Fingerprint, Anchor, 
  ArrowRight, CheckCircle2
} from "lucide-react";

export default function EigenPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0518] text-white overflow-hidden font-sans selection:bg-fuchsia-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <EigenBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-fuchsia-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-fuchsia-500/30 backdrop-blur-md w-max shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_07
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-fuchsia-500/30 pb-8">
                 <div className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(217,70,239,0.2)] group relative overflow-hidden">
                    <Scaling size={48} className="text-fuchsia-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       EIGEN-THEORY
                    </h1>
                    <p className="text-fuchsia-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-fuchsia-500/50 pl-6">
                        Eigen (German for "Own"). The characteristic vectors that define the hidden axes of rotation and absolute stability of a mathematical system.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE CONCEPT (Input = Output) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-fuchsia-500" />
                    <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">01 // The Golden Rule</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Normally, when you multiply a vector by a matrix, it changes direction entirely. But an <strong>Eigenvector</strong> is special: it refuses to turn. It is the invisible spine of the transformation. It only gets stretched or squashed.
                </p>
                
                <div className="bg-fuchsia-950/20 border border-fuchsia-500/30 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-inner mt-8">
                    <div className="text-4xl md:text-5xl font-mono font-black text-white">
                        <M>{"A\\vec{v} = \\lambda\\vec{v}"}</M>
                    </div>
                    <div className="flex w-full justify-between text-[10px] text-fuchsia-400 font-bold uppercase tracking-widest mt-4">
                        <span>Matrix Transform</span>
                        <span>Scalar Scaling</span>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Scanner Lab */}
            <div className="lg:col-span-7">
                <EigenLab />
            </div>
        </section>

        
        {/* SECTION 2: COMPONENTS */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-fuchsia-500" />
                <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">02 // The Anatomy</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* EIGENVECTOR */}
                <div className="p-8 bg-black/40 border border-fuchsia-500/30 rounded-3xl hover:bg-fuchsia-950/20 hover:border-fuchsia-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-fuchsia-500/10 rounded-xl group-hover:scale-110 transition-transform border border-fuchsia-500/20">
                            <Anchor size={24} className="text-fuchsia-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-fuchsia-500 tracking-widest bg-fuchsia-500/10 px-3 py-1 rounded-full border border-fuchsia-500/20">The Direction</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-4">Eigenvector <M>{"(\\vec{v})"}</M></div>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        The axis of the transformation. Think of it as the axle of a spinning wheel—it is part of the wheel, but it remains perfectly stationary while everything else rotates around it.
                    </p>
                </div>

                {/* EIGENVALUE */}
                <div className="p-8 bg-black/40 border border-pink-500/30 rounded-3xl hover:bg-pink-950/20 hover:border-pink-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-pink-500/10 rounded-xl group-hover:scale-110 transition-transform border border-pink-500/20">
                            <Scaling size={24} className="text-pink-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-pink-500 tracking-widest bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/20">The Magnitude</span>
                    </div>
                    <div className="text-2xl font-bold text-white mb-4">Eigenvalue <M>(\lambda)</M></div>
                    <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                        The stretching factor. If <M>\lambda = 2</M>, the eigenvector doubles in length. If <M>\lambda = -1</M>, the space flips along that axis entirely.
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE CHARACTERISTIC EQUATION */}
        <section className="bg-gradient-to-br from-fuchsia-950/40 to-black/60 border border-fuchsia-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
             
             <div className="flex-1 relative z-10">
                 <div className="flex items-center gap-2 text-fuchsia-400 mb-4">
                     <Fingerprint size={24} />
                     <span className="font-bold tracking-widest uppercase text-sm">Decoding the Matrix</span>
                 </div>
                 <h3 className="text-3xl font-black text-white mb-4">The Characteristic Equation</h3>
                 <p className="text-sm text-zinc-300 leading-relaxed max-w-lg">
                     To hunt down the eigenvalues, we must solve a specialized determinant equation. We rearrange <M>{"A\\vec{v} = \\lambda\\vec{v}"}</M> to mathematically ask: <em>"By how much must we shift the main diagonal so that the matrix flattens space to zero?"</em>
                 </p>
             </div>

             <div className="w-full md:w-auto bg-black/60 p-8 rounded-2xl border border-white/10 text-center shadow-inner relative z-10">
                 <div className="text-3xl font-mono text-white font-black mb-4 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)]">
                    <M display={true}>\det(A - \lambda I) = 0</M>
                 </div>
                 <div className="h-px w-full bg-white/10 my-6" />
                 
                 <div className="flex items-center justify-center gap-6 text-sm text-zinc-400 font-mono font-bold">
                     <div className="flex flex-col items-center">
                        <span className="text-fuchsia-300 text-lg"><M>A</M></span>
                        <span className="text-[10px] uppercase tracking-widest mt-1">Matrix</span>
                     </div>
                     <span className="text-lg">-</span>
                     <div className="flex flex-col items-center">
                        <span className="text-fuchsia-300 text-lg"><M>\lambda I</M></span>
                        <span className="text-[10px] uppercase tracking-widest mt-1">Shift</span>
                     </div>
                 </div>
             </div>
        </section>
        
        {/* SECTION 4: REAL WORLD APPLICATIONS */}
        <section>
             <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-fuchsia-500" />
                <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">04 // Why We Care</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                    { title: "PageRank", desc: "Google's entire original algorithm is based on finding the dominant eigenvector of the web's link graph." },
                    { title: "Resonance", desc: "Bridge collapses (like Tacoma Narrows) happen when external wind frequencies perfectly match the structure's eigenvalues." },
                    { title: "Quantum Mechanics", desc: "The famous Schrödinger equation is fundamentally just an eigenvalue problem determining energy states." },
                    { title: "Facial Recognition", desc: "Algorithms use 'Eigenfaces' to dramatically compress and simplify image data for rapid identification." }
                 ].map((item, i) => (
                    <div key={i} className="p-6 bg-black/40 border border-white/10 rounded-2xl hover:border-fuchsia-500/50 hover:bg-fuchsia-950/20 transition-colors shadow-lg backdrop-blur-md">
                        <div className="text-fuchsia-400 font-bold text-sm mb-3 flex items-center gap-2 uppercase tracking-widest border-b border-white/5 pb-3">
                             <Activity size={16} /> {item.title}
                        </div>
                        <div className="text-xs text-zinc-400 leading-relaxed">{item.desc}</div>
                    </div>
                 ))}
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/30 flex items-center justify-center text-fuchsia-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Invariant Axes Located</h3>
                    <p className="text-fuchsia-100/50 text-sm font-sans font-light">You are ready to compress data streams with SVD.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/svd" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-fuchsia-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)]">
                Next: SVD <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}