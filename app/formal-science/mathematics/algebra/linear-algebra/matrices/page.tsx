"use client";
import React from "react";
import Link from "next/link";
import MatrixBackground from "./MatrixBackground";
import { 
  ArrowLeft, Grid3X3, Columns, Rows, 
  X, RefreshCw, Equal, Scaling, 
  ArrowRight
} from "lucide-react";

export default function MatricesPage() {
  return (
    <main className="relative min-h-screen bg-[#020a05] text-white overflow-hidden font-mono selection:bg-emerald-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <MatrixBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/linear" className="flex items-center gap-2 text-xs text-emerald-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Linear_Algebra // Mod_02
             </Link>
             <div className="flex items-end gap-6 border-b border-emerald-500/30 pb-6">
                 <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Grid3X3 size={40} className="text-emerald-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       MATRICES
                    </h1>
                    <p className="text-emerald-400/60 max-w-md text-sm leading-relaxed">
                        Rectangular arrays of numbers. The fundamental data structure for storing linear equations and transformations.
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
                <p className="text-sm text-zinc-400 leading-relaxed">
                    A Matrix is defined by its dimensions: <strong>Rows (m) × Columns (n)</strong>. Each number inside is an "element" with a specific address $(i, j)$.
                </p>
                
                <div className="flex gap-4">
                     <div className="px-4 py-2 border border-emerald-500/30 bg-emerald-950/20 rounded flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                         <Rows size={14} /> m Rows
                     </div>
                     <div className="px-4 py-2 border border-emerald-500/30 bg-emerald-950/20 rounded flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                         <Columns size={14} className="rotate-90" /> n Columns
                     </div>
                </div>
            </div>

            {/* Visualizer: The Matrix Display */}
            <div className="aspect-video relative border border-emerald-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 font-mono text-2xl md:text-4xl text-white group">
                 {/* Left Bracket */}
                 <div className="w-4 md:w-8 border-l-4 border-t-4 border-b-4 border-white rounded-l-xl absolute left-8 top-8 bottom-8" />
                 
                 <div className="grid grid-cols-3 gap-x-8 gap-y-4 text-center">
                     <span className="opacity-50 group-hover:text-emerald-400 transition-colors">1</span>
                     <span className="opacity-50">0</span>
                     <span className="opacity-50">4</span>
                     
                     <span className="opacity-50">2</span>
                     <span className="text-emerald-400 font-bold scale-110">5</span>
                     <span className="opacity-50">9</span>
                 </div>
                 
                 {/* Right Bracket */}
                 <div className="w-4 md:w-8 border-r-4 border-t-4 border-b-4 border-white rounded-r-xl absolute right-8 top-8 bottom-8" />
                 
                 {/* Address Tag */}
                 <div className="absolute bottom-4 right-1/2 translate-x-1/2 text-[10px] text-emerald-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-2 py-1 rounded">
                     Element a₂₂
                 </div>
            </div>
        </section>

        {/* SECTION 2: OPERATIONS (The Crash) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-emerald-500" />
                <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">02 // Matrix Multiplication</h2>
            </div>
            
            <div className="bg-emerald-950/10 border border-emerald-500/30 rounded-xl p-8">
                 <div className="flex flex-col md:flex-row items-center justify-center gap-8 font-mono">
                     
                     {/* Matrix A (Row Highlight) */}
                     <div className="relative p-4 border border-white/10 bg-black/40 rounded">
                         <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-8 border border-emerald-500 bg-emerald-500/20 rounded animate-pulse" />
                         <div className="grid grid-cols-2 gap-4 text-center relative z-10">
                             <span>1</span><span>2</span>
                             <span className="text-white font-bold">3</span><span className="text-white font-bold">4</span>
                         </div>
                         <div className="text-[10px] text-emerald-500 text-center mt-2 uppercase">Row 2</div>
                     </div>

                     <X size={24} className="text-zinc-500" />

                     {/* Matrix B (Col Highlight) */}
                     <div className="relative p-4 border border-white/10 bg-black/40 rounded">
                         <div className="absolute inset-y-0 right-0 w-8 border border-emerald-500 bg-emerald-500/20 rounded animate-pulse" />
                         <div className="grid grid-cols-2 gap-4 text-center relative z-10">
                             <span>5</span><span className="text-white font-bold">6</span>
                             <span>7</span><span className="text-white font-bold">8</span>
                         </div>
                         <div className="text-[10px] text-emerald-500 text-center mt-2 uppercase">Col 2</div>
                     </div>

                     <Equal size={24} className="text-zinc-500" />

                     {/* Result */}
                     <div className="p-4 border border-emerald-500/50 bg-black/60 rounded flex flex-col items-center">
                         <div className="text-xs text-zinc-500 mb-1">(3•6) + (4•8)</div>
                         <div className="text-3xl font-bold text-white">50</div>
                     </div>

                 </div>
                 
                 <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-sm text-zinc-400">
                        <strong className="text-white">Rule:</strong> You crash the <strong className="text-emerald-400">Row</strong> of the first matrix into the <strong className="text-emerald-400">Column</strong> of the second.
                    </p>
                 </div>
            </div>
        </section>

        {/* SECTION 3: SPECIAL TYPES */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-emerald-500" />
                <h2 className="text-xl font-bold text-emerald-300 uppercase tracking-widest">03 // Special Matrices</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Identity */}
                <div className="p-6 bg-black/40 border border-emerald-500/20 rounded-xl hover:border-emerald-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Scaling size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-emerald-600">The One</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Identity (I)</div>
                    <p className="text-xs text-zinc-500 mb-4 h-10">
                        A square matrix with 1s on the diagonal and 0s elsewhere. Multiplying by I does nothing.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-emerald-200">
                        A • I = A
                    </div>
                </div>

                {/* Transpose */}
                <div className="p-6 bg-black/40 border border-emerald-500/20 rounded-xl hover:border-emerald-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <RefreshCw size={20} className="text-emerald-400 group-hover:rotate-180 transition-transform duration-500" />
                        <span className="text-[10px] uppercase font-bold text-emerald-600">The Flip</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Transpose (Aᵀ)</div>
                    <p className="text-xs text-zinc-500 mb-4 h-10">
                        Swap the rows and columns. Row 1 becomes Column 1.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-emerald-200">
                        [1 2]ᵀ = [1; 2]
                    </div>
                </div>

                {/* Inverse */}
                <div className="p-6 bg-black/40 border border-emerald-500/20 rounded-xl hover:border-emerald-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <ArrowRight size={20} className="text-emerald-400 group-hover:-translate-x-1 group-hover:translate-x-1 animate-pulse" />
                        <span className="text-[10px] uppercase font-bold text-emerald-600">The Undo</span>
                    </div>
                    <div className="text-lg font-bold text-white mb-2">Inverse (A⁻¹)</div>
                    <p className="text-xs text-zinc-500 mb-4 h-10">
                        The matrix that "undoes" A. Only square matrices with non-zero determinants have one.
                    </p>
                    <div className="bg-white/5 p-2 rounded text-xs font-mono text-center text-emerald-200">
                        A • A⁻¹ = I
                    </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}