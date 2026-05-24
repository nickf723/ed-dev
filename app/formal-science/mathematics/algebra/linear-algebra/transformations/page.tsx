"use client";
import React from "react";
import Link from "next/link";
import TransformationsBackground from "./_components/TransformationsBackground";
import TransformationLab from "./_components/TransformationLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Shapes, MousePointerClick, 
  RotateCw, Maximize2, Spline,
  ArrowRight, CheckCircle2
} from "lucide-react";

export default function TransformationsPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0500] text-white overflow-hidden font-sans selection:bg-orange-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <TransformationsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-orange-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-orange-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_05
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-orange-500/30 pb-8">
                 <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.2)] group relative overflow-hidden">
                    <Shapes size={48} className="text-orange-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       TRANSFORMS
                    </h1>
                    <p className="text-orange-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-orange-500/50 pl-6">
                        Matrices are functions. Discover how multiplying a vector by a matrix physically warps, rotates, and shears the fabric of space itself.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE CONCEPT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-orange-500" />
                    <h2 className="text-xl font-bold text-orange-300 uppercase tracking-widest">01 // The Machine</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Every matrix acts as a mapping engine. If you feed it a coordinate <M>{`\\vec{x}`}</M>, it outputs a brand new coordinate. We define this mapping as <M>{`T(\\vec{x}) = A\\vec{x}`}</M>. 
                </p>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    For a transformation to be strictly <strong>Linear</strong>, it must follow two physical rules:
                </p>
                
                <div className="flex flex-col gap-4 mt-6">
                    <div className="p-4 border border-orange-500/20 bg-black/40 rounded-xl flex items-center gap-4 shadow-inner">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">1</div>
                        <div className="text-sm text-zinc-300">All grid lines must remain <strong>straight</strong> and <strong>parallel</strong>. No curving.</div>
                    </div>
                    <div className="p-4 border border-orange-500/20 bg-black/40 rounded-xl flex items-center gap-4 shadow-inner">
                        <div className="w-8 h-8 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">2</div>
                        <div className="text-sm text-zinc-300">The <strong>Origin (0,0)</strong> must stay permanently locked in place.</div>
                    </div>
                </div>
            </div>

            {/* Visualizer Image */}
            <div className="lg:col-span-7 flex justify-center">
                <div className="relative border border-orange-500/30 rounded-3xl bg-black/60 backdrop-blur-xl p-4 shadow-2xl">
                    
                </div>
            </div>
        </section>

        {/* SECTION 2: THE LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-orange-500" />
                <h2 className="text-xl font-bold text-orange-300 uppercase tracking-widest">02 // The Execution</h2>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed mb-4">
                The columns of a transformation matrix tell you exactly where the fundamental basis vectors <M>{`\\hat{i}`}</M> (x-axis) and <M>{`\\hat{j}`}</M> (y-axis) will land. The entire rest of the grid simply follows them!
            </p>

            <TransformationLab />
        </section>

        {/* SECTION 3: THE DICTIONARY */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-orange-500" />
                <h2 className="text-xl font-bold text-orange-300 uppercase tracking-widest">03 // The Standard Dictionary</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Scaling */}
                <div className="p-8 bg-black/40 border border-sky-500/20 rounded-3xl hover:border-sky-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-sky-500/10 rounded-xl group-hover:scale-110 transition-transform border border-sky-500/20">
                            <Maximize2 size={24} className="text-sky-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-sky-400 tracking-widest bg-sky-500/10 px-3 py-1 rounded-full">Resize</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Scaling</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Modifying the main diagonal stretches or shrinks the space. If both values are the same, it scales uniformly.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-sky-300 border border-white/5 shadow-inner mt-auto text-lg">
                        <M display={true}>{`\\begin{bmatrix} s_x & 0 \\\\ 0 & s_y \\end{bmatrix}`}</M>
                    </div>
                </div>

                {/* Shearing */}
                <div className="p-8 bg-black/40 border border-rose-500/20 rounded-3xl hover:border-rose-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-rose-500/10 rounded-xl group-hover:rotate-12 transition-transform border border-rose-500/20">
                            <Spline size={24} className="text-rose-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-rose-400 tracking-widest bg-rose-500/10 px-3 py-1 rounded-full">Slant</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Shearing</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Pushing the non-diagonal elements tilts the axes. It turns squares into slanted parallelograms without changing their area.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-rose-300 border border-white/5 shadow-inner mt-auto text-lg">
                        <M display={true}>{`\\begin{bmatrix} 1 & k \\\\ 0 & 1 \\end{bmatrix}`}</M>
                    </div>
                </div>

                {/* Rotation */}
                <div className="p-8 bg-black/40 border border-emerald-500/20 rounded-3xl hover:border-emerald-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:rotate-180 transition-transform duration-700 border border-emerald-500/20">
                            <RotateCw size={24} className="text-emerald-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">Spin</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Rotation</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        The ultimate trigonometric preset. It rotates the entire grid by an exact angle <M>\theta</M> counter-clockwise.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-emerald-300 border border-white/5 shadow-inner mt-auto text-lg">
                        <M display={true}>{`\\begin{bmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{bmatrix}`}</M>
                    </div>
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-inner">
                    <Shapes size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Spatial Control Acquired</h3>
                    <p className="text-orange-100/50 text-sm font-sans font-light">You are ready to command n-dimensional Vector Spaces.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/spaces" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                Next: Vector Spaces <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}