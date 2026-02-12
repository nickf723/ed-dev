"use client";
import React from 'react';
import Link from 'next/link';
import VennGalaxy from "./VennGalaxy";
import SetOperator from "./SetOperator";
import { SETS_MEDIA, SET_VOCAB } from './_assets/setsData';
import { 
  ArrowLeft, Layers, Component, 
  Database, Braces 
} from "lucide-react";

export default function SetsPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <VennGalaxy />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/discrete" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-cyan-500 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Discrete
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-cyan-400 shadow-lg backdrop-blur-md">
                <Layers size={12} /> Unit 2.1
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                    SET <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500">THEORY</span>
                </h1>
                
                <p className="text-xl text-cyan-100/80 font-light leading-relaxed mb-8 border-l-4 border-cyan-500 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    A Set is a collection of distinct objects. It is the most fundamental concept in mathematics. Before we can count, measure, or compute, we must first learn to group.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-cyan-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${SETS_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-cyan-400 mb-1">THE CONTAINER</div>
                    <div className="text-white font-bold uppercase">"A pack of wolves,<br/>a bunch of grapes,<br/>or a flock of pigeons."<br/><span className="text-[10px] opacity-60">- Georg Cantor</span></div>
                </div>
            </div>
        </header>
        
        

[Image of venn diagram set operations]


        {/* SECTION 1: VISUAL OPERATIONS */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Component size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Venn Logic</h2>
            </div>
            
            <p className="text-slate-400 mb-8 max-w-2xl">
                We manipulate sets using <strong>Operations</strong>. Just as arithmetic adds numbers, set theory unions and intersects collections.
            </p>

            <SetOperator />
        </section>

        {/* SECTION 2: NOTATION LIBRARY */}
        <section className="border-t border-slate-800 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <Braces size={24} className="text-fuchsia-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Language</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SET_VOCAB.map((v) => (
                    <div key={v.term} className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl hover:border-cyan-500 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{v.term}</h3>
                            <div className="text-lg font-mono text-fuchsia-400 bg-fuchsia-900/20 px-2 py-1 rounded border border-fuchsia-500/30">
                                {v.notation}
                            </div>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {v.def}
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 p-8 bg-black/30 border border-slate-700 rounded-2xl flex items-center justify-between">
                <div>
                     <h4 className="text-lg font-bold text-white uppercase mb-2 flex items-center gap-2">
                         <Database size={18} className="text-cyan-500" /> Why This Matters?
                     </h4>
                     <p className="text-sm text-slate-400 max-w-xl">
                         Set Theory is the foundation of <strong>Databases (SQL)</strong>. When you query a database, you are essentially performing Unions, Intersections, and Differences on massive sets of data rows.
                     </p>
                </div>
                <div className="hidden md:block font-mono text-xs text-slate-500 text-right">
                    <div>SELECT * FROM Users</div>
                    <div>INNER JOIN Orders</div>
                    <div>ON Users.id = Orders.user_id</div>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}