"use client";
import React from "react";
import Link from "next/link";
import ComplexBackground from "./_components/ComplexBackground";
import ComplexPlaneLab from "./_components/ComplexPlaneLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, BrainCircuit, Axis3d, 
  RotateCw, Plus, Minus, CheckCircle2,
  Zap, Compass, ArrowRight
} from "lucide-react";

export default function ComplexPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] text-white overflow-hidden font-sans selection:bg-magenta-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <ComplexBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_4px,3px_100%] pointer-events-none opacity-40" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-magenta-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-magenta-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_11
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-white/10 pb-8">
                 <div className="p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md relative overflow-hidden group shadow-[0_0_30px_rgba(217,70,239,0.15)]">
                    <BrainCircuit size={48} className="text-cyan-400 absolute translate-x-[2px] opacity-70 group-hover:animate-pulse" />
                    <BrainCircuit size={48} className="text-magenta-500 relative mix-blend-screen" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       COMPLEX NUMBERS
                    </h1>
                    <p className="text-zinc-400 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-magenta-500/50 pl-6">
                        Breaking free from the 1D number line. Unlocking the 2D plane through the geometry of rotations and the square root of negative one.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE IMAGINARY UNIT */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-magenta-500" />
                    <h2 className="text-xl font-bold text-magenta-300 uppercase tracking-widest">01 // The Missing Unit</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    For centuries, mathematicians believed <M>{"\\sqrt{-1}"}</M> was an impossible paradox. Then they realized it wasn't a quantity at all—it was an <strong>operation</strong>. Multiplying by <M>{"i"}</M> represents a perfect 90° rotation in 2D space.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center gap-6 text-3xl font-mono font-black mt-8">
                    <div className="p-6 border border-magenta-500/50 bg-black/60 backdrop-blur-md rounded-2xl shadow-[0_0_30px_rgba(217,70,239,0.3)]">
                        <M>{"i = \\sqrt{-1}"}</M>
                    </div>
                    <div className="text-sm text-zinc-400 flex flex-col gap-2 bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex justify-between w-32"><span className="text-magenta-400"><M>i^1</M></span> <span><M>= i</M></span></div>
                        <div className="flex justify-between w-32"><span className="text-magenta-400"><M>i^2</M></span> <span><M>= -1</M></span></div>
                        <div className="flex justify-between w-32"><span className="text-magenta-400"><M>i^3</M></span> <span><M>= -i</M></span></div>
                        <div className="flex justify-between w-32"><span className="text-magenta-400"><M>i^4</M></span> <span><M>= 1</M></span></div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Rotation */}
            <div className="lg:col-span-7">
                <div className="aspect-video relative border border-white/10 rounded-3xl bg-black/60 backdrop-blur-xl flex items-center justify-center p-8 group shadow-2xl overflow-hidden">
                     {/* Unit Circle */}
                     <div className="absolute w-64 h-64 border-2 border-dashed border-white/20 rounded-full" />
                     
                     {/* Real Axis */}
                     <div className="absolute w-full h-px bg-cyan-500/50 shadow-[0_0_10px_cyan]" />
                     <div className="absolute right-4 text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-black/80 px-2 py-1 rounded">Real</div>
                     
                     {/* Imaginary Axis */}
                     <div className="absolute h-full w-px bg-magenta-500/50 shadow-[0_0_10px_magenta]" />
                     <div className="absolute top-4 text-[10px] font-mono font-bold text-magenta-400 uppercase tracking-widest bg-black/80 px-2 py-1 rounded">Imaginary</div>
                     
                     {/* Vector */}
                     <div className="w-32 h-1 bg-white absolute right-1/2 origin-right animate-[spin_4s_steps(4)_infinite] shadow-[0_0_15px_#fff]">
                        <div className="absolute -left-2 -top-1.5 w-4 h-4 bg-white rounded-full" />
                     </div>
                     
                     {/* Floating Labels */}
                     <div className="absolute text-2xl font-mono font-black text-magenta-500 -mt-32 shadow-lg"><M>i</M></div>
                     <div className="absolute text-2xl font-mono font-black text-cyan-500 ml-32 shadow-lg"><M>1</M></div>
                     <div className="absolute text-2xl font-mono font-black text-magenta-500 mt-32 shadow-lg"><M>-i</M></div>
                     <div className="absolute text-2xl font-mono font-black text-cyan-500 -ml-32 shadow-lg"><M>-1</M></div>
                </div>
            </div>
        </section>

        {/* SECTION 2: THE COMPLEX PLANE (Argand Diagram LAB) */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-cyan-500" />
                <h2 className="text-xl font-bold text-cyan-300 uppercase tracking-widest">02 // The Argand Diagram</h2>
            </div>
            
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="mb-8">
                    <h3 className="text-3xl font-black text-white mb-4">2D Coordinates</h3>
                    <p className="text-sm text-zinc-300 font-sans leading-relaxed mb-6 max-w-3xl">
                        A complex number <M>z = a + bi</M> is not a point on a line. It is a coordinate in 2D space. The horizontal axis measures the Real component (<M>a</M>), and the vertical axis measures the Imaginary component (<M>b</M>).
                    </p>
                </div>

                {/* INJECTED LAB */}
                <ComplexPlaneLab />
            </div>
        </section>

        {/* SECTION 3: OPERATIONS & CONJUGATES */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-white" />
                <h2 className="text-xl font-bold text-white uppercase tracking-widest">03 // The Algebra of 2D Space</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Addition */}
                <div className="p-8 bg-black/40 border border-white/10 rounded-3xl hover:border-cyan-500/50 transition-all duration-300 group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-cyan-500/10 rounded-xl group-hover:scale-110 transition-transform border border-cyan-500/20">
                            <Plus size={24} className="text-cyan-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full">Addition</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                        Treat <M>i</M> just like any other variable (<M>x</M>). Combine your Real terms together, and your Imaginary terms together.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-cyan-200 border border-white/5 shadow-inner mt-auto text-lg">
                        <M>(3+2i) + (1+4i) = 4+6i</M>
                    </div>
                </div>

                {/* Multiplication */}
                <div className="p-8 bg-black/40 border border-white/10 rounded-3xl hover:border-magenta-500/50 transition-all duration-300 group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-magenta-500/10 rounded-xl group-hover:rotate-90 transition-transform duration-500 border border-magenta-500/20">
                            <RotateCw size={24} className="text-magenta-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-magenta-400 tracking-widest bg-magenta-500/10 px-3 py-1 rounded-full">Multiply</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                        Expand using FOIL. The only trick is remembering that <M>i^2</M> collapses back into a Real number (<M>-1</M>).
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-magenta-200 border border-white/5 shadow-inner mt-auto text-lg flex flex-col gap-2">
                        <M>(2i)(3i) = 6i^2</M>
                        <M>6(-1) = -6</M>
                    </div>
                </div>

                {/* Conjugates */}
                <div className="p-8 bg-black/40 border border-white/10 rounded-3xl hover:border-white/50 transition-all duration-300 group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-white/10 rounded-xl group-hover:scale-110 transition-transform border border-white/20">
                            <Compass size={24} className="text-white" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-zinc-300 tracking-widest bg-white/10 px-3 py-1 rounded-full">Conjugate</span>
                    </div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                        Flip the sign of the imaginary part. Multiplying a complex number by its conjugate mathematically destroys <M>i</M>, yielding a pure Real number.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-white border border-white/5 shadow-inner mt-auto text-lg">
                        <div className="flex flex-col gap-2">
                            <M display={true}>z = a + bi</M>
                            <div className="border-t border-white/20 my-1 w-1/2 mx-auto" />
                            <M display={true}>{"\\bar{z} = a - bi"}</M>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-magenta-500/20 border border-magenta-500/30 flex items-center justify-center text-magenta-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Elementary Algebra Completed</h3>
                    <p className="text-magenta-100/50 text-sm font-sans font-light">You have mastered the foundational systems of modern mathematics.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-magenta-400 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)]">
                Back to Algebra Hub <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}