"use client";
import React from "react";
import Link from "next/link";
import MatrixBackground from "./_components/MatrixBackground";
import MatrixMultiplierLab from "./_components/MatrixMultiplierLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Grid3X3, Columns, Rows, 
  RefreshCw, Scaling, ArrowRight
} from "lucide-react";

export default function MatricesPage() {
  return (
    <main className="relative min-h-screen bg-[#020a05] text-white overflow-hidden font-sans selection:bg-emerald-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <MatrixBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/linear-algebra" className="flex items-center gap-2 text-xs text-emerald-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 px-4 py-2 rounded-full border border-emerald-500/30 backdrop-blur-md w-max shadow-lg">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_02
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-emerald-500/30 pb-8">
                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(16,185,129,0.2)] group relative overflow-hidden">
                    <Grid3X3 size={48} className="text-emerald-400 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       MATRICES
                    </h1>
                    <p className="text-emerald-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-emerald-500/50 pl-6">
                        Rectangular arrays of numbers. The fundamental data structure for storing linear equations, pixels, and complex transformations.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: ANATOMY (Rows x Cols) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-emerald-500" />
                    <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">01 // Structure</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                    A Matrix is defined by its dimensions: <strong>Rows (m) × Columns (n)</strong>. Each number inside is an element with a specific coordinate address <M>(i, j)</M>, allowing computers to instantly access massive grids of data.
                </p>
                
                <div className="flex gap-4">
                     <div className="px-4 py-3 border border-emerald-500/30 bg-emerald-950/20 rounded-xl flex items-center gap-3 text-emerald-400 text-xs font-bold uppercase shadow-inner hover:bg-emerald-900/30 transition-colors">
                         <Rows size={16} /> m Rows
                     </div>
                     <div className="px-4 py-3 border border-emerald-500/30 bg-emerald-950/20 rounded-xl flex items-center gap-3 text-emerald-400 text-xs font-bold uppercase shadow-inner hover:bg-emerald-900/30 transition-colors">
                         <Columns size={16} className="rotate-90" /> n Columns
                     </div>
                </div>
            </div>

            {/* Visualizer: The Matrix Display */}
            <div className="aspect-video relative border border-emerald-500/30 rounded-3xl bg-black/60 backdrop-blur-xl flex items-center justify-center p-8 text-2xl md:text-5xl text-white group shadow-2xl overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 
                 <div className="relative z-10 flex items-center justify-center">
                     <M display={true}>
                        {`A = \\begin{bmatrix} 1 & 0 & 4 \\\\ 2 & 5 & 9 \\end{bmatrix}`}
                     </M>
                 </div>
                 
                 {/* Address Tag Popup */}
                 <div className="absolute bottom-6 right-1/2 translate-x-1/2 text-xs font-mono text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-4 py-2 border border-emerald-500/30 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                     Dimensions: <M>2 \times 3</M>
                 </div>
            </div>
        </section>

        {/* SECTION 2: OPERATIONS & MULTIPLICATION LAB */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-emerald-500" />
                <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">02 // The Crash (Multiplication)</h2>
            </div>
            
            <p className="text-sm text-zinc-300 font-sans max-w-3xl leading-relaxed mb-8">
                Matrix multiplication isn't just scaling numbers—it is applying a set of spatial transformations. To multiply matrices, you crash the <strong>Row</strong> of the first matrix into the <strong>Column</strong> of the second, calculating the dot product.
            </p>
            
                        
            <div className="mt-8">
                <MatrixMultiplierLab />
            </div>
        </section>

        {/* SECTION 3: SPECIAL TYPES */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-emerald-500" />
                <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">03 // Special Matrices</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Identity */}
                <div className="p-8 bg-black/40 border border-emerald-500/20 rounded-3xl hover:border-emerald-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-emerald-500/10 rounded-xl group-hover:scale-110 transition-transform border border-emerald-500/20">
                            <Scaling size={24} className="text-emerald-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full">The One</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Identity (I)</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        A square matrix with 1s on the diagonal and 0s elsewhere. Multiplying by <M>I</M> does absolutely nothing to the original matrix.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-emerald-300 border border-white/5 shadow-inner mt-auto">
                        <M>A \cdot I = A</M>
                    </div>
                </div>

                {/* Transpose */}
                <div className="p-8 bg-black/40 border border-sky-500/20 rounded-3xl hover:border-sky-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-sky-500/10 rounded-xl group-hover:rotate-180 transition-transform duration-500 border border-sky-500/20">
                            <RefreshCw size={24} className="text-sky-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-sky-400 tracking-widest bg-sky-500/10 px-3 py-1 rounded-full">The Flip</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Transpose (<M>A^T</M>)</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        Swap the rows and columns. Row 1 becomes Column 1. This reflects the entire matrix perfectly over its main diagonal.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-sky-300 border border-white/5 shadow-inner mt-auto">
                        <M display={true}>{`\\begin{bmatrix} 1 & 2 \\end{bmatrix}^T = \\begin{bmatrix} 1 \\\\ 2 \\end{bmatrix}`}</M>
                    </div>
                </div>

                {/* Inverse */}
                <div className="p-8 bg-black/40 border border-rose-500/20 rounded-3xl hover:border-rose-500/50 transition-colors group shadow-lg backdrop-blur-md flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-rose-500/10 rounded-xl group-hover:-translate-x-1 group-hover:translate-x-1 transition-transform border border-rose-500/20 animate-pulse">
                            <ArrowRight size={24} className="text-rose-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-rose-400 tracking-widest bg-rose-500/10 px-3 py-1 rounded-full">The Undo</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2">Inverse (<M>{`A^{-1}`}</M>)</div>
                    <p className="text-sm text-zinc-400 mb-6 leading-relaxed flex-1">
                        The matrix that "undoes" A. Only square matrices with non-zero determinants possess one.
                    </p>
                    <div className="bg-black/60 p-4 rounded-xl text-center text-rose-300 border border-white/5 shadow-inner mt-auto">
                        <M>{`A \\cdot A^{-1} = I`}</M>
                    </div>
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
                    <Grid3X3 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Grid Logic Initialized</h3>
                    <p className="text-emerald-100/50 text-sm font-sans font-light">You are ready to command computational systems.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/linear-algebra/systems" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                Next: Solvers <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}