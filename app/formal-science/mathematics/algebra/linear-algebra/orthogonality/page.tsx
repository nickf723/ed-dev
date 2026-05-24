"use client";
import React from "react";
import Link from "next/link";
import OrthogonalBackground from "./_components/OrthogonalBackground";
import ProjectionLab from "./_components/ProjectionLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Axis3d, Spline,
  ArrowRight, ShieldCheck, Crosshair,
  Ruler
} from "lucide-react";

export default function OrthogonalityPage() {
  return (
    <main className="relative min-h-screen bg-[#020812] text-white overflow-hidden font-sans selection:bg-cyan-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <OrthogonalBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-cyan-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-cyan-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_08
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-cyan-500/30 pb-8">
                 <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.2)] group relative overflow-hidden">
                    <Axis3d size={48} className="text-cyan-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       ORTHOGONALITY
                    </h1>
                    <p className="text-cyan-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-cyan-500/50 pl-6">
                        The mathematics of perfect independence. Discovering perpendicularity in N-dimensional space through projections and the Gram-Schmidt process.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE ZERO DOT PRODUCT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-cyan-500" />
                    <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">01 // The 90° Rule</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    In basic geometry, two lines are <em>perpendicular</em> if they meet at 90°. In linear algebra, we call vectors <strong>Orthogonal</strong>. Because they share absolutely zero directional overlap, they are perfectly independent of one another.
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    The ultimate test for orthogonality is the <strong>Dot Product</strong>. If the dot product of two vectors is exactly zero, they are completely orthogonal.
                </p>
                
                <div className="bg-cyan-950/20 border border-cyan-500/30 p-8 rounded-2xl flex flex-col items-center justify-center gap-4 shadow-inner mt-8">
                    <div className="text-3xl md:text-4xl font-mono font-black text-white drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                        <M display>{`\\vec{u} \\cdot \\vec{v} = 0`}</M>
                    </div>
                </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
                <div className="relative border border-cyan-500/30 rounded-3xl bg-black/60 backdrop-blur-xl p-4 shadow-2xl">
                    
                </div>
            </div>
        </section>

        {/* SECTION 2: THE PROJECTION LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">02 // The Shadow (Projection)</h2>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed mb-6">
                If vectors aren't orthogonal, you can force them to be! A <strong>Projection</strong> is like shining a flashlight straight down onto a vector to find its "shadow" along another line. The math calculates the exact scalar needed to stretch the base vector so that the error line drops perfectly at a 90° angle.
            </p>

            <ProjectionLab />
        </section>

        {/* SECTION 3: GRAM-SCHMIDT PROCESS */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">03 // The Purifier (Gram-Schmidt)</h2>
            </div>

            <div className="bg-gradient-to-br from-cyan-950/40 to-black/60 border border-cyan-500/30 rounded-3xl p-8 md:p-12 flex flex-col items-center gap-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                 
                 <div className="w-full relative z-10 text-center max-w-3xl">
                     <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-tight">The Gram-Schmidt Process</h3>
                     <p className="text-base text-zinc-300 leading-relaxed mb-10">
                         Standard bases in the real world are often messy and skewed. The Gram-Schmidt process is an algorithm that takes any valid basis and systematically "purifies" it into an <strong>Orthonormal Basis</strong> (where every vector is 90° to all others, and scaled to a length of exactly 1).
                     </p>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full relative z-10">
                     {/* Step 1 */}
                     <div className="bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner flex flex-col relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                             <Crosshair size={64} />
                         </div>
                         <div className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Step 1: The Anchor</div>
                         <p className="text-sm text-zinc-300 mb-6 flex-1">
                             Take the first vector exactly as it is. It becomes the anchor for the entire new coordinate system.
                         </p>
                         <div className="bg-white/5 p-3 rounded font-mono text-center text-white text-sm">
                             <M>{`\\vec{u}_1 = \\vec{v}_1`}</M>
                         </div>
                     </div>

                     {/* Step 2 */}
                     <div className="bg-black/60 p-6 rounded-2xl border border-teal-500/30 shadow-[0_0_20px_rgba(45,212,191,0.1)] flex flex-col relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                             <Spline size={64} />
                         </div>
                         <div className="text-teal-400 font-bold text-xs uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Step 2: Subtraction</div>
                         <p className="text-sm text-zinc-300 mb-6 flex-1">
                             Take the second vector, project it onto the anchor, and <strong>subtract the shadow</strong>. You are left with only the purely perpendicular component.
                         </p>
                         <div className="bg-white/5 p-3 rounded font-mono text-center text-white text-[11px] overflow-x-auto">
                             <M display>{`\\vec{u}_2 = \\vec{v}_2 - \\text{proj}_{\\vec{u}_1}(\\vec{v}_2)`}</M>
                         </div>
                     </div>

                     {/* Step 3 */}
                     <div className="bg-black/60 p-6 rounded-2xl border border-white/10 shadow-inner flex flex-col relative overflow-hidden group">
                         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                             <Ruler size={64} />
                         </div>
                         <div className="text-cyan-400 font-bold text-xs uppercase tracking-widest mb-4 border-b border-white/10 pb-2">Step 3: Normalize</div>
                         <p className="text-sm text-zinc-300 mb-6 flex-1">
                             Once all vectors are perfectly orthogonal, divide each one by its own magnitude to shrink them down to unit length (1).
                         </p>
                         <div className="bg-white/5 p-3 rounded font-mono text-center text-white text-sm">
                             <M display>{`\\hat{e}_i = \\frac{\\vec{u}_i}{||\\vec{u}_i||}`}</M>
                         </div>
                     </div>
                 </div>
                 
                 <div className="w-full mt-8 bg-teal-950/30 border border-teal-500/40 p-4 rounded-xl flex items-center justify-center gap-4 text-teal-300 font-mono text-sm shadow-[0_0_20px_rgba(45,212,191,0.2)]">
                     <ShieldCheck size={20} className="text-teal-400" />
                     Result: A perfect Orthonormal Basis
                 </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
                    <Axis3d size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Independence Proven</h3>
                    <p className="text-cyan-100/50 text-sm font-sans font-light">You are ready to compress matrices using SVD.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/svd" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                Next: SVD <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}