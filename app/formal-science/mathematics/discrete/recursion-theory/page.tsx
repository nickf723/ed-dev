"use client";
import React from 'react';
import Link from 'next/link';
import FractalTree from "./FractalTree";
import HanoiTower from "./HanoiTower";
import { RECURSION_MEDIA, RECURSION_VOCAB, FIBONACCI_SEQ } from './_assets/recursionData';
import { 
  ArrowLeft, RotateCcw, Repeat, 
  Infinity as InfinityIcon, Layers 
} from "lucide-react";

export default function RecursionPage() {
  return (
    <main className="relative min-h-screen bg-[#1e1b4b] text-indigo-100 font-sans selection:bg-violet-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <FractalTree />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/discrete" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Discrete
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-violet-300 shadow-lg backdrop-blur-md">
                <Repeat size={12} /> Unit 2.4
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(139,92,246,0.3)]">
                    RECURSION <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500">THEORY</span>
                </h1>
                
                <p className="text-xl text-indigo-200/80 font-mono leading-relaxed mb-8 border-l-4 border-violet-500 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    To understand recursion, you must first understand recursion. It is the art of solving a large problem by solving smaller instances of the same problem.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-violet-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${RECURSION_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-indigo-950/60 group-hover:bg-indigo-950/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-violet-400 mb-1">F(n) = F(n-1) + F(n-2)</div>
                    <div className="text-white font-bold uppercase">The Infinite Mirror.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE ALGORITHM */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Layers size={24} className="text-violet-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Stack</h2>
            </div>
            
            <p className="text-indigo-200/60 mb-8 max-w-2xl">
                The Tower of Hanoi is the quintessential recursive problem. It cannot be solved easily with loops, but with recursion, the logic is elegant: Move $n-1$ disks out of the way, move the bottom disk, then move $n-1$ disks back on top.
            </p>

            <HanoiTower />
        </section>

        {/* SECTION 2: VOCABULARY */}
        <section className="border-t border-violet-900/50 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <InfinityIcon size={24} className="text-fuchsia-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Base Case</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {RECURSION_VOCAB.map((v) => (
                    <div key={v.term} className="bg-slate-900/50 border border-slate-700 p-8 rounded-xl hover:border-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.1)] transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white mb-2 uppercase">{v.term}</h3>
                            <div className="text-[10px] font-mono bg-black px-2 py-1 rounded text-violet-400 border border-violet-500/30">
                                CODE
                            </div>
                        </div>
                        <p className="text-sm text-indigo-200/70 leading-relaxed mb-4">
                            {v.def}
                        </p>
                        <div className="font-mono text-xs text-fuchsia-300 bg-fuchsia-900/20 p-2 rounded">
                            {v.code}
                        </div>
                    </div>
                ))}
            </div>

            {/* Fibonacci Strip */}
            <div className="mt-12 p-6 bg-black/40 rounded-xl border border-white/5 overflow-hidden">
                 <div className="text-xs font-bold text-slate-500 uppercase mb-2">The Fibonacci Sequence (Recursive Growth)</div>
                 <div className="flex gap-2 font-mono text-xl text-violet-400 overflow-x-auto whitespace-nowrap pb-2">
                     {FIBONACCI_SEQ.map((n, i) => (
                         <span key={i} className="hover:text-white transition-colors cursor-default">{n}{i < FIBONACCI_SEQ.length-1 && <span className="text-slate-700 mx-2">→</span>}</span>
                     ))}
                     <span className="text-slate-600">...</span>
                 </div>
            </div>
        </section>

      </div>
    </main>
  );
}