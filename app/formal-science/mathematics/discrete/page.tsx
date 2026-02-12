"use client";
import React from 'react';
import Link from 'next/link';
import NetworkGrid from "./NetworkGrid";
import GraphLab from "./GraphLab";
import { DISCRETE_MEDIA, DISCRETE_TOPICS, DISCRETE_VOCAB } from './_assets/discreteData';
import { 
  ArrowLeft, Binary, Grid, 
  Terminal, Code2, Hash 
} from "lucide-react";

export default function DiscretePage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-emerald-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <NetworkGrid />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-500 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Mathematics
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-emerald-400 shadow-lg backdrop-blur-md">
                <Binary size={12} /> Unit 2.0
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    DISCRETE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">MATHEMATICS</span>
                </h1>
                
                <p className="text-xl text-emerald-100/80 font-mono leading-relaxed mb-8 border-l-4 border-emerald-500 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    {"// The language of computer science."} <br/>
                    Unlike calculus, which is continuous, discrete math deals with distinct, separated values. It is the study of algorithms, logic, and structure.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-emerald-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${DISCRETE_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-slate-950/80 group-hover:bg-slate-950/60 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-emerald-400 mb-1">SYSTEM.INIT()</div>
                    <div className="text-white font-bold uppercase">The Backbone of the<br/>Digital World.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE LABORATORY */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Terminal size={24} className="text-emerald-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Graph Theory Engine</h2>
            </div>
            
            <p className="text-slate-400 mb-8 max-w-2xl">
                A Graph is simply a set of objects (Nodes) where some pairs of objects are connected by links (Edges). This simple structure models the entire internet.
            </p>

            <GraphLab />
        </section>

        {/* SECTION 2: TOPICS */}
        <section className="border-t border-emerald-900/50 pt-12 mb-24">
            <div className="flex items-center gap-4 mb-12">
                <Grid size={24} className="text-teal-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">System Modules</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DISCRETE_TOPICS.map((topic) => (
                    <Link 
                        key={topic.id} 
                        href={topic.link}
                        className="group relative bg-slate-900/50 border border-slate-700 p-8 rounded-xl hover:border-emerald-500 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all duration-300"
                    >
                        <div className="flex gap-6">
                            <div className="w-12 h-12 rounded bg-emerald-900/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                <Code2 size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase">{topic.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                                    {topic.desc}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* SECTION 3: VOCABULARY */}
        <section className="bg-black/30 border border-white/5 rounded-2xl p-8">
             <div className="flex items-center gap-3 mb-8">
                 <Hash size={24} className="text-emerald-600" />
                 <h2 className="text-2xl font-black text-white uppercase">Syntax Library</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {DISCRETE_VOCAB.map((v) => (
                     <div key={v.term} className="border-l-2 border-emerald-500/50 pl-4">
                         <div className="font-bold text-emerald-400 mb-1">{v.term}</div>
                         <p className="text-xs text-slate-400 mb-2 min-h-[3rem]">{v.def}</p>
                         <div className="inline-block px-2 py-1 bg-slate-800 rounded text-[10px] font-mono text-emerald-200">
                             {v.notation}
                         </div>
                     </div>
                 ))}
             </div>
        </section>

      </div>
    </main>
  );
}