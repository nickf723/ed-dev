"use client";
import React from "react";
import Link from "next/link";
import DeterminantBackground from "./_components/DeterminantBackground";
import DeterminantLab from "./_components/DeterminantLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, BoxSelect, Gauge, 
  Expand, Shrink, AlertOctagon, 
  ArrowRight, RefreshCw, CheckCircle2
} from "lucide-react";

export default function DeterminantsPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0602] text-white overflow-hidden font-sans selection:bg-amber-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <DeterminantBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-amber-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-amber-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_04
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-amber-500/30 pb-8">
                 <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(245,158,11,0.2)] group relative overflow-hidden">
                    <BoxSelect size={48} className="text-amber-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       DETERMINANTS
                    </h1>
                    <p className="text-amber-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-amber-500/50 pl-6">
                        The scaling factor of a linear transformation. Measuring how matrix multiplication physically stretches area and volume in space.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE MEANING & LAB */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-amber-500" />
                    <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">01 // Area Scaling</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    Most students just memorize the formula. The visual intuition is much simpler: <strong>The determinant is the Area of the transformed unit square.</strong> If the area doubles, the determinant is <M>2</M>.
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 border border-amber-500/20 bg-black/40 rounded-2xl flex flex-col gap-3 group hover:border-amber-500/50 transition-colors shadow-inner">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest border-b border-amber-500/20 pb-2">
                            <Expand size={16} className="mr-2" />
                            <M>{`\\det > 1`}</M>
                        </div>
                        <div className="text-zinc-400 text-xs leading-relaxed">Space is expanding. Distances grow.</div>
                    </div>
                    <div className="p-5 border border-amber-500/20 bg-black/40 rounded-2xl flex flex-col gap-3 group hover:border-amber-500/50 transition-colors shadow-inner">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase tracking-widest border-b border-amber-500/20 pb-2">
                            <Shrink size={16} className="mr-2" />
                            <span><M>{`0 < \\det < 1`}</M></span>
                        </div>
                        <div className="text-zinc-400 text-xs leading-relaxed">Space is shrinking. Distances contract.</div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Determinant Lab */}
            <div className="lg:col-span-7">
                <DeterminantLab />
            </div>
        </section>

        {/* SECTION 2: THE SINGULARITY (Det = 0) */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">02 // The Singularity</h2>
            </div>
            
            <div className="bg-amber-950/10 border border-amber-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group shadow-2xl backdrop-blur-xl">
                 {/* Hazard Stripes */}
                 <div className="absolute top-0 left-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,transparent_10px,transparent_20px)] opacity-50" />

                 <div className="p-6 bg-red-500/10 border border-red-500/50 rounded-full animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                     <AlertOctagon size={64} className="text-red-500" />
                 </div>

                 <div className="flex-1 relative z-10">
                     <h3 className="text-3xl font-black text-white mb-4">Determinant = 0</h3>
                     <p className="text-base text-zinc-300 leading-relaxed mb-6">
                        This is the critical failure point. It means the transformation has <strong>flattened</strong> space. A 2D area has been squashed down into a 1D line (Area = 0). Once space is flattened, you can never accurately reverse the math.
                     </p>
                     
                     <div className="flex flex-wrap gap-4 text-xs font-mono">
                         <div className="px-4 py-2 bg-red-950/40 border border-red-500/40 rounded-lg text-red-300 font-bold uppercase tracking-widest shadow-inner">
                             Matrix is NOT Invertible
                         </div>
                         <div className="px-4 py-2 bg-red-950/40 border border-red-500/40 rounded-lg text-red-300 font-bold uppercase tracking-widest shadow-inner">
                             Information is Destroyed
                         </div>
                     </div>
                 </div>

                 {/* Visual: Flat Line */}
                 <div className="w-40 h-40 border border-white/10 bg-black/60 rounded-2xl flex items-center justify-center relative shadow-inner">
                     <div className="absolute w-24 h-24 border-2 border-dashed border-white/20 opacity-30" />
                     <div className="w-24 h-1 bg-red-500 shadow-[0_0_20px_#ef4444]" />
                     <ArrowRight size={20} className="absolute bottom-4 text-zinc-500 rotate-90" />
                     <span className="absolute bottom-4 translate-x-6 text-[10px] text-zinc-400 uppercase tracking-widest font-bold font-mono">Squashed</span>
                 </div>
            </div>
        </section>

        {/* SECTION 3: 3D VOLUME */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">03 // Higher Dimensions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="flex flex-col gap-6">
                    <div className="p-8 bg-black/40 border border-amber-500/20 rounded-3xl hover:border-amber-500/50 transition-colors shadow-lg backdrop-blur-md">
                         <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-white">3D Volume</h3>
                            <Gauge size={24} className="text-amber-400" />
                         </div>
                         <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                            In <M>{"\\mathbb{R}^3"}</M>, a 3x3 matrix transforms a 3D unit cube into a slanted 3D box called a <strong>Parallelepiped</strong>. The determinant perfectly measures the volume of this new shape.
                         </p>
                         
                         <div className="bg-white/5 p-4 rounded-xl text-lg font-mono text-center text-amber-200 border border-white/5 shadow-inner">
                            <M>{"\\text{Volume} = |\\text{det}(A)|"}</M>
                         </div>
                    </div>

                    <div className="p-8 bg-black/40 border border-amber-500/20 rounded-3xl hover:border-amber-500/50 transition-colors shadow-lg backdrop-blur-md">
                         <div className="flex justify-between items-center mb-4">
                            <h3 className="text-2xl font-bold text-white">Orientation</h3>
                            <RefreshCw size={24} className="text-amber-400" />
                         </div>
                         <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
                            If the determinant computes to a <strong>Negative</strong> value, the physical space has been flipped inside out, exactly like looking in a mirror.
                         </p>
                         <div className="bg-white/5 p-4 rounded-xl text-xs font-mono font-bold uppercase tracking-widest text-center text-amber-200 border border-white/5 shadow-inner">
                            Negative = Orientation Reversal
                         </div>
                    </div>
                </div>

                <div className="w-full flex items-center justify-center p-8 bg-black/40 border border-white/10 rounded-3xl backdrop-blur-md shadow-2xl">
                                    </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <BoxSelect size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Scaling Quantified</h3>
                    <p className="text-amber-100/50 text-sm font-sans font-light">You are ready to warp the grid.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/transformations" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-amber-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                Next: Transforms <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}