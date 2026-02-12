"use client";
import React from 'react';
import Link from 'next/link';
import IntersectionEngine from "./IntersectionEngine";
import TransversalLab from "./TransversalLab";
import { ANGLES_MEDIA, ANGLE_VOCAB, THEOREMS } from './_assets/anglesData';
import { 
  ArrowLeft, X, MoveDiagonal, 
  Split, ShieldCheck 
} from "lucide-react";

export default function AnglesPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-pink-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <IntersectionEngine />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/geometry/euclidean" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Geometry
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-pink-300 shadow-lg backdrop-blur-md">
                <X size={12} /> Unit 1.3
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(236,72,153,0.3)]">
                    ANGLES <br/> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">INTERSECTIONS</span>
                </h1>
                
                <p className="text-xl text-pink-100/80 font-light leading-relaxed mb-8 border-l-4 border-pink-500 pl-6">
                    Lines in isolation are boring. It is only when they collide that geometry begins. From the simplicity of a Linear Pair to the complexity of Transversals.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-pink-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${ANGLES_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-pink-400 mb-1">THE CROSSROADS</div>
                    <div className="text-white font-bold uppercase">Intersection is the birth<br/>of angular relationship.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE LABORATORY */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Split size={24} className="text-pink-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Transversal Engine</h2>
            </div>
            
            <p className="text-slate-400 mb-8 max-w-2xl">
                When a line cuts across two others, it creates 8 distinct angles. If the lines are Parallel, magic happens: the chaos organizes into perfect equality.
            </p>

            <TransversalLab />
        </section>

        {/* SECTION 2: THEOREMS & VOCAB */}
        <section className="border-t border-white/10 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <ShieldCheck size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Rules of Engagement</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vocabulary Column */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Vocabulary</h3>
                    {ANGLE_VOCAB.map((v) => (
                        <div key={v.term} className="group p-5 bg-slate-900/50 border border-slate-700 hover:border-pink-500 rounded-xl transition-all">
                            <h4 className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors mb-2">{v.term}</h4>
                            <p className="text-sm text-slate-300 leading-relaxed mb-3">
                                {v.def}
                            </p>
                            <div className="text-xs text-pink-300 font-mono bg-pink-900/20 px-2 py-1 rounded inline-block">
                                Rule: {v.rule}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Theorems Column */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Core Theorems</h3>
                    {THEOREMS.map((t) => (
                        <div key={t.id} className="relative p-6 bg-cyan-900/10 border border-cyan-500/20 rounded-xl">
                            <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-4xl text-cyan-400 select-none">
                                {t.id}
                            </div>
                            <h4 className="text-lg font-bold text-cyan-400 mb-2">{t.name}</h4>
                            <p className="text-sm text-slate-300 font-serif italic">
                                "{t.text}"
                            </p>
                        </div>
                    ))}
                    
                    <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-pink-600 to-purple-600 text-white shadow-xl">
                        <MoveDiagonal size={32} className="mb-4 text-white/80" />
                        <h4 className="text-xl font-black uppercase mb-2">Why this matters?</h4>
                        <p className="text-sm leading-relaxed opacity-90">
                            Without these rules, construction is impossible. Architects rely on the <strong>Parallel Line Theorems</strong> to ensure buildings stand straight and walls meet at perfect corners.
                        </p>
                    </div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}