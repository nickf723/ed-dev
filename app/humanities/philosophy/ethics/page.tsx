"use client";
import React from 'react';
import Link from 'next/link';
import PlatonicSolids from "./PlatonicSolids";
import TrolleySimulator from "./TrolleySimulator";
import { SCHOOLS } from './ethicsData';
import { 
  Scale, BookOpen, BrainCircuit, 
  ArrowLeft, Quote, Gavel 
} from "lucide-react";

export default function EthicsPage() {
  return (
    <main className="relative min-h-screen bg-slate-50 text-slate-800 overflow-hidden font-sans selection:bg-amber-200">
      
      {/* 1. VISUAL ENGINE */}
      <PlatonicSolids />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/humanities/philosophy" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Philosophy
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white border border-slate-200 px-3 py-1 rounded text-slate-600 shadow-sm">
                <Scale size={12} /> Moral Philosophy
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32 text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-900 text-white mb-8 shadow-2xl">
                <Gavel size={32} />
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-8">
                THE MORAL <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-400">COMPASS</span>
            </h1>
            <p className="text-xl text-slate-600 font-serif italic leading-relaxed">
                "The unexamined life is not worth living." — Socrates
            </p>
            <p className="mt-4 text-sm text-slate-500 font-bold uppercase tracking-widest">
                How do we decide what is Right and what is Wrong?
            </p>
        </header>

        

        {/* SECTION 1: THE LAB (Trolley) */}
        <section className="mb-32">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-slate-300 w-24" />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <BrainCircuit size={20} className="text-amber-600" /> Thought Experiments
                </h2>
                <div className="h-px bg-slate-300 w-24" />
            </div>
            
            <TrolleySimulator />
            
            <div className="mt-8 text-center max-w-2xl mx-auto text-sm text-slate-600 font-serif">
                These scenarios are designed to break our intuitions. Most people are Utilitarian in the Trolley Problem, but Deontological in the Surgeon Problem. Why the contradiction?
            </div>
        </section>

        {/* SECTION 2: THE SCHOOLS */}
        <section className="border-t border-slate-300 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <BookOpen size={24} className="text-slate-700" />
                <h2 className="text-3xl font-black uppercase tracking-tight">The Big Three Frameworks</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {SCHOOLS.map((s) => (
                    <div key={s.id} className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">{s.name}</h3>
                            <div className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-4">{s.philosopher}</div>
                            <div className="h-1 w-12 bg-slate-900" />
                        </div>
                        
                        <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-1">
                            {s.desc}
                        </p>

                        

                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 relative mt-auto">
                            <Quote size={16} className="absolute top-2 left-2 text-slate-300" />
                            <p className="text-xs text-slate-500 italic text-center px-4 pt-2">
                                "{s.quote}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}