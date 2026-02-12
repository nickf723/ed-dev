"use client";
import React from 'react';
import Link from 'next/link';
import CipherRing from "./CipherRing";
import CountingVault from "./CountingVault";
import { COMBO_MEDIA, COMBO_VOCAB } from './_assets/combinatoricsData';
import { 
  ArrowLeft, Hash, Key, 
  Dices, Calculator 
} from "lucide-react";

export default function CombinatoricsPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-stone-200 font-sans selection:bg-amber-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <CipherRing />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/discrete" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Discrete
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-amber-400 shadow-lg backdrop-blur-md">
                <Hash size={12} /> Unit 2.3
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(217,119,6,0.3)]">
                    ART OF <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-600">COUNTING</span>
                </h1>
                
                <p className="text-xl text-amber-100/80 font-mono leading-relaxed mb-8 border-l-4 border-amber-600 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    Combinatorics is the study of finite discrete structures. It is not just about counting; it is about knowing how many possibilities exist without having to list them all.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${COMBO_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-stone-950/80 group-hover:bg-stone-950/60 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-amber-400 mb-1">PROBABILITY SPACE</div>
                    <div className="text-white font-bold uppercase">To crack the code, you must<br/>know the magnitude.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE VAULT */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Key size={24} className="text-amber-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Possibility Engine</h2>
            </div>
            
            <p className="text-stone-400 mb-8 max-w-2xl">
                Does order matter? This is the fundamental question. A <strong>Permutation</strong> is a lock (1-2-3 is unique). A <strong>Combination</strong> is a handshake (Me shaking your hand is the same as you shaking mine).
            </p>

            <CountingVault />
        </section>


        {/* SECTION 2: VOCABULARY */}
        <section className="bg-black/30 border border-white/5 rounded-2xl p-8 border-t-4 border-t-amber-600">
             <div className="flex items-center gap-3 mb-8">
                 <Dices size={24} className="text-amber-600" />
                 <h2 className="text-2xl font-black text-white uppercase">The Language of Chance</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                 {COMBO_VOCAB.map((v) => (
                     <div key={v.term} className="flex gap-4">
                         <div className="w-12 h-12 rounded bg-stone-800 flex items-center justify-center font-bold font-mono text-amber-500 border border-stone-700 shrink-0">
                             {v.symbol}
                         </div>
                         <div>
                             <div className="font-bold text-white mb-1 uppercase">{v.term}</div>
                             <p className="text-sm text-stone-400 leading-relaxed">
                                 {v.def}
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