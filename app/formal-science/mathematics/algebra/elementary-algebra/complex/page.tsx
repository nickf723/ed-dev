"use client";
import React from "react";
import Link from "next/link";
import ComplexBackground from "./ComplexBackground";
import { 
  ArrowLeft, BrainCircuit, Axis3d, 
  RotateCw, Plus, Minus, Move
} from "lucide-react";

export default function ComplexPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-mono selection:bg-magenta-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <ComplexBackground />
      
      {/* OVERLAY */}
      {/* Scanlines for glitch effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-magenta-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_11
             </Link>
             <div className="flex items-end gap-6 border-b border-white/10 pb-6">
                 <div className="p-4 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md relative overflow-hidden">
                    {/* The Glitch Icon */}
                    <BrainCircuit size={40} className="text-cyan-400 absolute translate-x-[2px]" />
                    <BrainCircuit size={40} className="text-magenta-500 relative mix-blend-screen" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       COMPLEX NUMBERS
                    </h1>
                    <p className="text-zinc-400 max-w-md text-sm leading-relaxed">
                        Extending the number line into 2D space. The square root of -1, rotations, and the Complex Plane.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE DEFINITION OF i */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-magenta-500" />
                    <h2 className="text-xl font-bold text-magenta-300 uppercase tracking-widest">01 // The Imaginary Unit</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    For centuries, mathematicians thought $\sqrt{-1}$ was impossible. Then they realized it wasn't a quantity, but an <strong>operation</strong>. It represents a 90° rotation.
                </p>
                
                <div className="flex items-center gap-6 text-3xl font-mono font-black">
                    <div className="p-6 border border-magenta-500/50 bg-black/40 rounded-xl shadow-[0_0_20px_rgba(217,70,239,0.3)]">
                        <span className="text-magenta-500">i</span> = <span className="text-white">√-1</span>
                    </div>
                    <div className="text-sm text-zinc-500 flex flex-col gap-1">
                        <span>i¹ = i</span>
                        <span>i² = -1</span>
                        <span>i³ = -i</span>
                        <span>i⁴ = 1</span>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Rotation */}
            <div className="aspect-square relative border border-white/10 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group">
                 {/* Unit Circle */}
                 <div className="absolute w-48 h-48 border border-white/20 rounded-full" />
                 
                 {/* Real Axis */}
                 <div className="absolute w-full h-px bg-cyan-500/50" />
                 {/* Imaginary Axis */}
                 <div className="absolute h-full w-px bg-magenta-500/50" />
                 
                 {/* Vector */}
                 <div className="w-1/2 h-1 bg-white absolute right-1/2 origin-right animate-[spin_4s_steps(4)_infinite]" />
                 <div className="absolute top-4 text-xs font-mono text-magenta-500">i</div>
                 <div className="absolute right-4 text-xs font-mono text-cyan-500">1</div>
            </div>
        </section>

        {/* SECTION 2: THE COMPLEX PLANE (Argand Diagram) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">02 // The Argand Diagram</h2>
            </div>
            
            <div className="bg-black/40 border border-white/10 rounded-xl p-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Axis3d size={100} />
                 </div>
                 
                 <div className="flex flex-col md:flex-row gap-8 items-center">
                     <div className="flex-1">
                         <h3 className="text-2xl font-bold text-white mb-2">2D Numbers</h3>
                         <p className="text-sm text-zinc-400 mb-6">
                            A complex number <span className="text-white font-bold">z = a + bi</span> has two parts.
                            It is not a point on a line, but a coordinate in space.
                         </p>
                         
                         <div className="flex gap-4">
                             <div className="px-4 py-2 bg-cyan-950/30 border border-cyan-500/30 rounded text-cyan-400 text-sm">
                                 <strong>a</strong> (Real Part)
                             </div>
                             <div className="px-4 py-2 bg-magenta-950/30 border border-magenta-500/30 rounded text-magenta-400 text-sm">
                                 <strong>b</strong> (Imaginary Part)
                             </div>
                         </div>
                     </div>

                     <div className="flex-1 w-full p-6 border border-dashed border-white/20 rounded bg-black/20 font-mono text-center">
                         <div className="text-4xl mb-2 text-white">
                             3 + <span className="text-magenta-500">4i</span>
                         </div>
                         <div className="text-xs text-zinc-500 flex justify-center gap-8 mt-4">
                             <span className="flex items-center gap-2"><Move size={12} className="text-cyan-500"/> Right 3</span>
                             <span className="flex items-center gap-2"><Move size={12} className="text-magenta-500 rotate-90"/> Up 4</span>
                         </div>
                     </div>
                 </div>
            </div>
        </section>

        {/* SECTION 3: CONJUGATES & OPERATIONS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-white" />
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">03 // Operations</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Addition */}
                <div className="p-6 bg-black/40 border border-white/10 rounded-xl hover:border-cyan-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Plus size={20} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-cyan-600">Addition</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4 h-10">
                        Combine like terms. Real with Real. Imaginary with Imaginary.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-cyan-200">
                        (3+2i) + (1+4i) = 4+6i
                    </div>
                </div>

                {/* Multiplication */}
                <div className="p-6 bg-black/40 border border-white/10 rounded-xl hover:border-magenta-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <RotateCw size={20} className="text-magenta-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-magenta-600">Multiplication</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4 h-10">
                        FOIL it out. Remember that <strong className="text-white">i² = -1</strong>.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-magenta-200">
                        (2i)(3i) = 6i² = -6
                    </div>
                </div>

                {/* Conjugates */}
                <div className="p-6 bg-black/40 border border-white/10 rounded-xl hover:border-white/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Minus size={20} className="text-white group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-zinc-400">The Conjugate</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-4 h-10">
                        Flip the sign of the imaginary part to cancel $i$ out. Used for division.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-white">
                        3 + 2i  →  3 - 2i
                    </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}