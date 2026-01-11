"use client";
import React from "react";
import Link from "next/link";
import DeterminantBackground from "./DeterminantBackground";
import { 
  ArrowLeft, BoxSelect, Gauge, 
  Expand, Shrink, AlertOctagon, 
  ArrowRight,
  RefreshCw
} from "lucide-react";

export default function DeterminantsPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0602] text-white overflow-hidden font-mono selection:bg-amber-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <DeterminantBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/linear" className="flex items-center gap-2 text-xs text-amber-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_04
             </Link>
             <div className="flex items-end gap-6 border-b border-amber-500/30 pb-6">
                 <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <BoxSelect size={40} className="text-amber-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       DETERMINANTS
                    </h1>
                    <p className="text-amber-400/60 max-w-md text-sm leading-relaxed">
                        The scaling factor of a linear transformation. Measuring how matrix multiplication stretches area and volume.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE MEANING */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-amber-500" />
                    <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">01 // The Scaling Factor</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    Most students just learn the formula. The visual intuition is simpler: <strong>The determinant is the Area of the transformed unit square.</strong>
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 border border-amber-500/20 bg-black/40 rounded flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase">
                            <Expand size={12} /> Det &gt; 1
                        </div>
                        <div className="text-zinc-400 text-xs">Space is expanding.</div>
                    </div>
                    <div className="p-4 border border-amber-500/20 bg-black/40 rounded flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-amber-500 font-bold text-xs uppercase">
                            <Shrink size={12} /> 0 &lt; Det &lt; 1
                        </div>
                        <div className="text-zinc-400 text-xs">Space is shrinking.</div>
                    </div>
                </div>
            </div>

            {/* Visualizer: The 2x2 Formula */}
            <div className="aspect-square relative border border-amber-500/30 rounded-xl bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-8">
                 <div className="text-xs text-amber-500/50 font-bold uppercase tracking-widest mb-4">The Calculation</div>
                 
                 <div className="flex items-center gap-6 text-2xl md:text-4xl font-mono text-white">
                     <span className="text-amber-400">det(A)</span>
                     <span>=</span>
                     
                     <div className="flex flex-col items-center relative">
                         {/* Cross visual */}
                         <div className="absolute inset-0">
                            <svg className="w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <line x1="20" y1="20" x2="80" y2="80" stroke="#f59e0b" strokeWidth="2" />
                                <line x1="80" y1="20" x2="20" y2="80" stroke="#ef4444" strokeWidth="2" strokeDasharray="4 4" />
                            </svg>
                         </div>
                         
                         <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-4 px-6 py-4 border-l-2 border-r-2 border-white/20 rounded">
                             <span>a</span><span>b</span>
                             <span>c</span><span>d</span>
                         </div>
                     </div>
                 </div>
                 
                 <div className="mt-8 text-3xl font-bold font-mono">
                     <span className="text-amber-400">ad</span> - <span className="text-red-400">bc</span>
                 </div>
            </div>
        </section>

        {/* SECTION 2: THE SINGULARITY (Det = 0) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">02 // The Singularity</h2>
            </div>
            
            <div className="bg-amber-950/10 border border-amber-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
                 {/* Hazard Stripes */}
                 <div className="absolute top-0 w-full h-2 bg-[repeating-linear-gradient(45deg,#f59e0b,#f59e0b_10px,transparent_10px,transparent_20px)] opacity-50" />

                 <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-full animate-pulse">
                     <AlertOctagon size={48} className="text-red-500" />
                 </div>

                 <div className="flex-1">
                     <h3 className="text-2xl font-bold text-white mb-2">Determinant = 0</h3>
                     <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                        This is the critical failure point. It means the transformation has <strong>flattened</strong> space. 
                        A 2D square has become a 1D line (Area = 0).
                     </p>
                     
                     <div className="flex gap-4 text-xs font-mono">
                         <div className="px-3 py-1 bg-red-950/30 border border-red-500/30 rounded text-red-300">
                             Not Invertible
                         </div>
                         <div className="px-3 py-1 bg-red-950/30 border border-red-500/30 rounded text-red-300">
                             Destroys Information
                         </div>
                     </div>
                 </div>

                 {/* Visual: Flat Line */}
                 <div className="w-32 h-32 border border-white/10 bg-black/40 rounded flex items-center justify-center relative">
                     <div className="absolute w-24 h-24 border border-dashed border-white/20 opacity-30" />
                     <div className="w-24 h-1 bg-red-500 shadow-[0_0_15px_#ef4444]" />
                     <ArrowRight size={16} className="absolute -bottom-6 text-zinc-500 rotate-90" />
                     <span className="absolute -bottom-6 translate-x-4 text-[10px] text-zinc-500">Squashed</span>
                 </div>
            </div>
        </section>

        {/* SECTION 3: 3D VOLUME */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">03 // Higher Dimensions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-black/40 border border-amber-500/20 rounded-xl hover:border-amber-500/50 transition-colors">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">3D Volume</h3>
                        <Gauge size={20} className="text-amber-400" />
                     </div>
                     <p className="text-xs text-zinc-400 mb-4 h-10">
                        In 3D, the determinant measures the volume of the <strong>Parallelepiped</strong> formed by the columns.
                     </p>
                     
                     <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-amber-200">
                        Volume = |det(A)|
                     </div>
                </div>

                <div className="p-6 bg-black/40 border border-amber-500/20 rounded-xl hover:border-amber-500/50 transition-colors">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-white">Orientation</h3>
                        <RefreshCw size={20} className="text-amber-400" />
                     </div>
                     <p className="text-xs text-zinc-400 mb-4 h-10">
                        If the determinant is <strong>Negative</strong>, space has been flipped inside out (like a mirror reflection).
                     </p>
                     <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-amber-200">
                        Negative = Orientation Reversal
                     </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}