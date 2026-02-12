"use client";
import React from 'react';
import Link from 'next/link';
import LogicNetwork from "./LogicNetwork";
import TruthTableLab from "./TruthTableLab";
import { LOGIC_MEDIA, LOGIC_VOCAB, LAWS_OF_LOGIC } from './_assets/logicData';
import { 
  ArrowLeft, Binary, BrainCircuit, 
  Scale, FileCheck 
} from "lucide-react";
import { fromJSON } from 'postcss';

export default function LogicPage() {
  return (
    <main className="relative min-h-screen bg-[#022c22] text-green-50 font-sans selection:bg-green-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <LogicNetwork />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/geometry/euclidean" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-green-400 hover:text-white transition-colors bg-black/20 px-3 py-2 rounded backdrop-blur-sm border border-green-500/20">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Geometry
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/40 border border-green-400/30 px-3 py-1 rounded text-green-300 shadow-lg backdrop-blur-md">
                <Binary size={12} /> Unit 1.5
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(74,222,128,0.3)]">
                    LOGIC <br/> & <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">PROOFS</span>
                </h1>
                
                <p className="text-xl text-green-100/80 leading-relaxed border-l-4 border-green-500 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
                    Geometry is not just about shapes; it is about absolute truth. We use Deductive Reasoning to chain simple facts into undeniable conclusions.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-green-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${LOGIC_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-green-950/60 group-hover:bg-green-950/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-green-400 mb-1">IF P THEN Q</div>
                    <div className="text-white font-bold uppercase">Logic is the operating system<br/>of the universe.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE TRUTH MACHINE */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <BrainCircuit size={24} className="text-green-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Truth Tables</h2>
            </div>
            
            <p className="text-green-200/60 mb-8 max-w-2xl">
                A Conditional Statement (p → q) is only false when a True Hypothesis leads to a False Conclusion. This is the bedrock of valid arguments.
            </p>

            <TruthTableLab />
        </section>

        {/* SECTION 2: LAWS OF LOGIC */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 border-t border-green-800/50 pt-12">
            
            <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <Scale size={24} className="text-emerald-400" />
                    <h2 className="text-2xl font-black text-white uppercase">Laws of Deduction</h2>
                </div>
                
                {LAWS_OF_LOGIC.map((law) => (
                    <div key={law.name} className="bg-black/30 border border-green-500/20 p-6 rounded-xl">
                        <h3 className="text-lg font-bold text-green-400 mb-2">{law.name}</h3>
                        <div className="bg-black/50 p-3 rounded font-mono text-sm text-emerald-200 mb-3 border-l-2 border-emerald-500">
                            {law.symbol}
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {law.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="bg-green-900/10 border border-green-500/20 p-8 rounded-xl backdrop-blur-md">
                <div className="flex items-center gap-3 mb-6">
                    <FileCheck size={24} className="text-emerald-400" />
                    <h2 className="text-2xl font-black text-white uppercase">The Vocabulary</h2>
                </div>
                
                <div className="space-y-4">
                    {LOGIC_VOCAB.map((v) => (
                        <div key={v.term} className="pb-4 border-b border-green-500/10 last:border-0">
                            <div className="flex justify-between items-baseline mb-1">
                                <h4 className="font-bold text-white">{v.term}</h4>
                                <span className="text-[10px] uppercase text-green-500 font-bold bg-green-950 px-2 py-1 rounded">{v.type}</span>
                            </div>
                            <p className="text-sm text-green-100/70 leading-relaxed">
                                {v.def}
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