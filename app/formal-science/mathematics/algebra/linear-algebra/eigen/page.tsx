"use client";
import React from "react";
import Link from "next/link";
import EigenBackground from "./EigenBackground";
import { 
  ArrowLeft, Scaling, GitCommit, 
  Activity, Fingerprint, Anchor, 
  ArrowRight
} from "lucide-react";

export default function EigenPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0518] text-white overflow-hidden font-mono selection:bg-fuchsia-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <EigenBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(217,70,239,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(217,70,239,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/linear" className="flex items-center gap-2 text-xs text-fuchsia-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_06
             </Link>
             <div className="flex items-end gap-6 border-b border-fuchsia-500/30 pb-6">
                 <div className="p-4 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                    <Scaling size={40} className="text-fuchsia-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       EIGEN-THEORY
                    </h1>
                    <p className="text-fuchsia-400/60 max-w-md text-sm leading-relaxed">
                        Eigen (German for "Own"). The characteristic vectors that define the axis of rotation and stability of a system.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE CONCEPT (Input = Output) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-fuchsia-500" />
                    <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">01 // The Golden Rule</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    Normally, when you multiply a vector by a matrix, it changes direction. 
                    <br/>
                    An <strong>Eigenvector</strong> is special: it refuses to turn. It only gets longer or shorter.
                </p>
                
                <div className="bg-fuchsia-950/20 border border-fuchsia-500/30 p-8 rounded-xl flex items-center justify-center gap-4">
                    <div className="text-4xl md:text-5xl font-mono font-black flex items-center gap-6">
                        <span>A<span className="text-fuchsia-400">v</span></span>
                        <span>=</span>
                        <span><span className="text-zinc-500">λ</span><span className="text-fuchsia-400">v</span></span>
                    </div>
                </div>
                <div className="flex justify-between text-xs text-zinc-500 px-4">
                    <span>Matrix Transform</span>
                    <span>Scalar Scaling</span>
                </div>
            </div>

            {/* Visualizer: The Stability */}
            <div className="aspect-square relative border border-fuchsia-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group overflow-hidden">
                 {/* Background Spin */}
                 <div className="absolute inset-0 flex items-center justify-center opacity-20 animate-[spin_10s_linear_infinite]">
                     <div className="w-[150%] h-px bg-white/20" />
                     <div className="h-[150%] w-px bg-white/20" />
                 </div>

                 {/* The Eigenvector (Fixed) */}
                 <div className="absolute w-[120%] h-2 bg-fuchsia-500/20 rotate-45" />
                 <div className="absolute w-24 h-1 bg-fuchsia-500 rotate-45 shadow-[0_0_20px_#d946ef] animate-pulse" />
                 
                 <div className="absolute top-1/4 left-1/4 text-fuchsia-400 font-bold bg-black/80 px-2 rounded">
                    Input: v
                 </div>
                 <div className="absolute bottom-1/4 right-1/4 text-white font-bold bg-black/80 px-2 rounded">
                    Output: λv
                 </div>
            </div>
        </section>

        {/* SECTION 2: COMPONENTS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-fuchsia-500" />
                <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">02 // The Parts</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* EIGENVECTOR */}
                <div className="p-6 bg-fuchsia-950/20 border border-fuchsia-500/30 rounded-xl hover:bg-fuchsia-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Anchor size={20} className="text-fuchsia-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-fuchsia-600">The Direction</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Eigenvector (v)</div>
                    <p className="text-xs text-zinc-500 mb-4 h-12">
                        The axis of the transformation. Think of it as the axle of a spinning wheel—it's part of the wheel, but it doesn't move.
                    </p>
                </div>

                {/* EIGENVALUE */}
                <div className="p-6 bg-pink-950/20 border border-pink-500/30 rounded-xl hover:bg-pink-950/40 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Scaling size={20} className="text-pink-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-pink-600">The Magnitude</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Eigenvalue (λ)</div>
                    <p className="text-xs text-zinc-500 mb-4 h-12">
                        The stretching factor. 
                        <br/>If <span className="text-white">λ = 2</span>, the vector doubles. 
                        <br/>If <span className="text-white">λ = -1</span>, it flips.
                    </p>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE CHARACTERISTIC EQUATION */}
        <section className="bg-black/40 border border-fuchsia-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
             
             <div className="flex-1">
                 <div className="flex items-center gap-2 text-fuchsia-400 mb-2">
                     <Fingerprint size={20} />
                     <span className="font-bold tracking-widest">HOW TO FIND THEM</span>
                 </div>
                 <h3 className="text-2xl font-bold text-white mb-4">The Characteristic Equation</h3>
                 <p className="text-sm text-zinc-400 leading-relaxed">
                     To find the eigenvalues, we must solve a special determinant equation. We essentially ask: "When does the matrix minus lambda break (determinant zero)?"
                 </p>
             </div>

             <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                 <div className="text-2xl font-mono text-fuchsia-300 font-bold mb-2">
                    det(A - λI) = 0
                 </div>
                 <div className="h-px w-full bg-white/10 my-4" />
                 
                 <div className="grid grid-cols-3 gap-2 text-sm text-zinc-500 font-mono">
                     <div className="flex flex-col items-center">
                        <span className="text-white">A</span>
                        <span className="text-[10px]">Matrix</span>
                     </div>
                     <span className="mt-1">-</span>
                     <div className="flex flex-col items-center">
                        <span className="text-white">λI</span>
                        <span className="text-[10px]">Shift</span>
                     </div>
                 </div>
             </div>
        </section>
        
        {/* SECTION 4: REAL WORLD APPLICATIONS */}
        <section>
             <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-fuchsia-500" />
                <h2 className="text-xl font-bold text-fuchsia-300 uppercase tracking-widest">04 // Why we care</h2>
            </div>
            
            <div className="flex flex-wrap gap-4">
                 {[
                    { title: "PageRank", desc: "Google's algorithm uses the dominant eigenvector of the web graph." },
                    { title: "Tacoma Narrows", desc: "Resonance disasters happen when wind matches the bridge's eigenvalues." },
                    { title: "Quantum States", desc: "Schrödinger's equation is just an eigenvalue problem." },
                    { title: "Face ID", desc: "Eigenfaces simplify image data for recognition." }
                 ].map((item, i) => (
                    <div key={i} className="flex-1 min-w-[200px] p-4 bg-white/5 border border-white/5 rounded hover:border-fuchsia-500/50 transition-colors">
                        <div className="text-fuchsia-400 font-bold text-sm mb-1 flex items-center gap-2">
                             <Activity size={12} /> {item.title}
                        </div>
                        <div className="text-xs text-zinc-500">{item.desc}</div>
                    </div>
                 ))}
            </div>
        </section>

      </div>
    </main>
  );
}