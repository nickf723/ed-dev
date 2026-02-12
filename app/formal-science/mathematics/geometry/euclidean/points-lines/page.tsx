"use client";
import React from 'react';
import Link from 'next/link';
import InfiniteSpace from "./InfiniteSpace";
import DimensionBuilder from "./DimensionBuilder";
import LineSubsets from "./LineSubsets";
import { POINTS_MEDIA, POINTS_VOCAB, AXIOMS } from './_assets/pointsData';
import { 
  ArrowLeft, Circle, Minus, Square, 
  MousePointer2, Ruler 
} from "lucide-react";

export default function PointsLinesPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-cyan-400/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <InfiniteSpace />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/geometry/euclidean" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-600 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Geometry
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-cyan-400 shadow-lg backdrop-blur-md">
                <MousePointer2 size={12} /> Unit 1.1
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    POINTS <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">LINES</span> & <br/> PLANES
                </h1>
                
                <p className="text-xl text-cyan-100/80 font-light leading-relaxed mb-8 border-l-4 border-cyan-500 pl-6">
                    The "Undefined Terms." These are the atoms of geometry. We cannot define them using simpler words; we can only describe them and build the universe upon them.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${POINTS_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-cyan-400 mb-1">AXIOM 1</div>
                    <div className="text-white font-bold uppercase">Through any two points,<br/>there is exactly one line.</div>
                </div>
            </div>
        </header>

        

[Image of points lines and planes diagram]


        {/* SECTION 1: THE INTERACTIVE */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Ruler size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Building Dimensions</h2>
            </div>
            
            <DimensionBuilder />
        </section>

        {/* SECTION 1.5: THE SUBSETS (New) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Minus size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Cuts of Infinity</h2>
            </div>
            <p className="text-slate-400 mb-8 max-w-2xl">
                A line goes on forever, but we can't build shapes with infinity. We must cut the line into pieces. These pieces are how we construct the universe.
            </p>
            <LineSubsets />
        </section>

        {/* SECTION 2: THE DEFINITIONS */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-white/10 pt-12">
            
            {/* Vocab Cards */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {POINTS_VOCAB.map((v) => (
                    <div key={v.term} className="group p-6 bg-slate-900/50 border border-slate-700 hover:border-cyan-500 rounded-xl transition-all hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{v.term}</h3>
                            <div className="text-xs font-bold font-mono text-slate-500 border border-slate-700 px-2 py-1 rounded">
                                {v.dim}
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4 min-h-[3rem]">
                            {v.def}
                        </p>
                        <div className="bg-black/30 p-3 rounded text-xs text-cyan-600 font-mono">
                            Notation: <span className="text-cyan-200">{v.notation}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Axioms List */}
            <div className="bg-cyan-900/10 border border-cyan-500/20 p-8 rounded-xl backdrop-blur-md">
                <h3 className="text-lg font-black text-cyan-400 uppercase mb-6 flex items-center gap-2">
                    <Circle size={12} fill="currentColor" /> Euclidean Axioms
                </h3>
                <div className="space-y-6">
                    {AXIOMS.map((ax) => (
                        <div key={ax.id} className="relative pl-6">
                            <div className="absolute left-0 top-0 text-slate-600 font-black text-4xl leading-none -mt-2 opacity-30 select-none">
                                {ax.id}
                            </div>
                            <p className="text-sm text-slate-300 relative z-10 leading-relaxed">
                                {ax.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </section>

      </div>
    </main>
  );
}