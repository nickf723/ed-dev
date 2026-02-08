"use client";
import React from 'react';
import Link from 'next/link';
import QuantumNebula from "./QuantumNebula";
import ShipOfTheseus from "./ShipOfTheseus";
import { CONCEPTS } from './metaData';
import { 
  Sparkles, Box, GitBranch, Cpu, Split,
  ArrowLeft, Atom, Infinity
} from "lucide-react";

// Icon Map
const iconMap: any = { Box, GitBranch, Cpu, Split };

export default function MetaphysicsPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-indigo-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <QuantumNebula />
      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-radial-vignette opacity-50" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/humanities/philosophy" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-indigo-400 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Philosophy
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-indigo-950/50 border border-indigo-500/30 px-3 py-1 rounded text-indigo-300">
                <Sparkles size={12} /> First Principles
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-indigo-400 mb-8 border border-indigo-500/30 shadow-[0_0_30px_rgba(99,102,241,0.2)]">
                <Infinity size={32} />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-8">
                META <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">PHYSICS</span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 font-serif italic leading-relaxed border-t border-slate-800 pt-8">
                "Physics explains how the world works. Metaphysics asks why there is a world at all."
            </p>
        </header>

        

        {/* SECTION 1: THE PARADOX LAB */}
        <section className="mb-32">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-slate-800 w-24" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Atom size={20} className="text-indigo-500" /> Identity Theory
                </h2>
                <div className="h-px bg-slate-800 w-24" />
            </div>
            
            <ShipOfTheseus />
            
            <div className="mt-8 text-center text-sm text-slate-500 font-mono">
                EXPERIMENT: CONTINUITY OF SELF
            </div>
        </section>

        {/* SECTION 2: THE SHARDS (Concepts Grid) */}
        <section className="border-t border-slate-800 pt-12">
            <h3 className="text-4xl font-black text-white uppercase mb-12 text-center">The Big Questions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CONCEPTS.map((c) => {
                    const Icon = iconMap[c.icon];
                    return (
                        <div key={c.id} className="group p-8 bg-slate-900/40 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-900/80 transition-all rounded-2xl backdrop-blur-sm">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-slate-950 rounded-lg text-indigo-400 group-hover:text-white group-hover:scale-110 transition-transform">
                                    <Icon size={24} />
                                </div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-slate-700 px-2 py-1 rounded">
                                    {c.id}
                                </div>
                            </div>
                            
                            <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                {c.question}
                            </h4>
                            <div className="text-xs font-bold text-indigo-500 uppercase mb-4 tracking-wide">
                                {c.name}
                            </div>
                            
                            <p className="text-sm text-slate-400 leading-relaxed font-serif">
                                {c.desc}
                            </p>
                            
                            {/* Diagram Triggers based on ID */}
                            {c.id === 'simulism' && <div className="mt-4 text-xs text-slate-500"></div>}
                            {c.id === 'dualism' && <div className="mt-4 text-xs text-slate-500"></div>}
                        </div>
                    )
                })}
            </div>
        </section>

      </div>
    </main>
  );
}