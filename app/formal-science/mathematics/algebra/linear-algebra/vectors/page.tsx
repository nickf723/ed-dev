"use client";
import React from "react";
import Link from "next/link";
import VectorsBackground from "./_components/VectorsBackground";
import VectorAdditionLab from "./_components/VectorAdditionLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, MoveUpRight, Maximize2, 
  Minimize2, Crosshair, Navigation,
  Rocket, MousePointer2, ArrowRight
} from "lucide-react";

export default function VectorsPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0300] text-white overflow-hidden font-sans selection:bg-orange-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <VectorsBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(249,115,22,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(249,115,22,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-orange-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-orange-500/30 backdrop-blur-md w-max shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_01
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-orange-500/30 pb-8">
                 <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(249,115,22,0.2)] group relative overflow-hidden">
                    <MoveUpRight size={48} className="text-orange-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       VECTORS
                    </h1>
                    <p className="text-orange-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-orange-500/50 pl-6">
                        The fundamental building blocks of space. Bridging the gap between raw lists of numbers and physical arrows in geometry.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: DEFINITION (The Physics) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-orange-500" />
                    <h2 className="text-xl font-bold text-orange-300 uppercase tracking-widest">01 // The Physics</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    In computer science, a vector is just an array: a list of numbers like <M>[3, 2]</M>. In physics, a vector is an arrow pointing in space. Linear algebra allows us to seamlessly translate between these two realities.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 border border-orange-500/20 bg-black/40 rounded-2xl flex flex-col gap-3 group hover:border-orange-500/50 transition-colors shadow-inner">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest border-b border-orange-500/20 pb-2">
                            <Maximize2 size={16} /> Magnitude
                        </div>
                        <div className="text-zinc-400 text-xs leading-relaxed">The Length. "How much?" Denoted as <M>{"|\\|\\vec{v}\\|\\|"}</M>.</div>
                    </div>
                    <div className="p-5 border border-orange-500/20 bg-black/40 rounded-2xl flex flex-col gap-3 group hover:border-orange-500/50 transition-colors shadow-inner">
                        <div className="flex items-center gap-2 text-orange-500 font-bold text-xs uppercase tracking-widest border-b border-orange-500/20 pb-2">
                            <Navigation size={16} /> Direction
                        </div>
                        <div className="text-zinc-400 text-xs leading-relaxed">The Angle. "Which way?" It establishes trajectory.</div>
                    </div>
                </div>

                {/* THE MEME (Easter Egg) */}
                <div className="mt-8 p-4 bg-orange-950/40 border border-orange-500/30 rounded-xl flex items-center justify-center gap-3 text-sm text-orange-400 font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(249,115,22,0.2)] animate-pulse hover:animate-none hover:scale-105 transition-transform cursor-crosshair">
                    <MousePointer2 size={16} />
                    Direction <span className="text-white">AND</span> Magnitude!
                </div>
            </div>

            {/* Visualizer: The Addition Lab */}
            <div className="lg:col-span-7">
                <VectorAdditionLab />
            </div>
        </section>

        {/* SECTION 2: OPERATIONS */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-orange-500" />
                <h2 className="text-xl font-bold text-orange-300 uppercase tracking-widest">02 // The Algebra of Space</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Addition */}
                <div className="p-8 bg-black/40 border border-orange-500/20 rounded-3xl hover:border-orange-500/50 hover:bg-orange-950/10 transition-all duration-300 group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-orange-500/10 rounded-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 border border-orange-500/20">
                            <Rocket size={24} className="text-orange-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-orange-400 tracking-widest bg-orange-500/10 px-3 py-1 rounded-full">Addition</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Tip-to-Tail</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        To add vectors, simply add their corresponding coordinates. Geometrically, it means walking along the first vector, then starting the second vector from where you stopped.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center border border-white/5 shadow-inner mt-auto text-lg text-orange-200">
                        <M>{'\\vec{v} + \\vec{w} = \\begin{bmatrix} v_1+w_1 \\\\ v_2+w_2 \\end{bmatrix}'}</M>
                    </div>
                </div>

                {/* Scaling */}
                <div className="p-8 bg-black/40 border border-red-500/20 rounded-3xl hover:border-red-500/50 hover:bg-red-950/10 transition-all duration-300 group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-red-500/10 rounded-xl group-hover:scale-110 transition-transform duration-300 border border-red-500/20">
                            <Minimize2 size={24} className="text-red-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-red-400 tracking-widest bg-red-500/10 px-3 py-1 rounded-full">Scaling</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Scalar Mult</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Multiplying a vector by a scalar (a normal number) stretches or shrinks it. Multiplying by a negative number flips it exactly 180°.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center border border-white/5 shadow-inner mt-auto text-lg text-red-200">
                        <M>{'c \\cdot \\vec{v} = \\begin{bmatrix} cv_1 \\\\ cv_2 \\end{bmatrix}'}</M>
                    </div>
                </div>

                {/* Dot Product */}
                <div className="p-8 bg-black/40 border border-amber-500/20 rounded-3xl hover:border-amber-500/50 hover:bg-amber-950/10 transition-all duration-300 group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-xl group-hover:rotate-90 transition-transform duration-500 border border-amber-500/20">
                            <Crosshair size={24} className="text-amber-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Dot Product</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Alignment</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        A single number that tells you how much two vectors point in the same direction. If they are perpendicular, their dot product is exactly zero.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center border border-white/5 shadow-inner mt-auto text-lg text-amber-200">
                        <M>{'\\vec{v} \\cdot \\vec{w} = v_1 w_1 + v_2 w_2'}</M>
                    </div>
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500/30 flex items-center justify-center text-orange-400 shadow-inner">
                    <MoveUpRight size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Vectors Constructed</h3>
                    <p className="text-orange-100/50 text-sm font-sans font-light">You are ready to pack them together into Grids.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/matrices" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)]">
                Next: Matrices <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}