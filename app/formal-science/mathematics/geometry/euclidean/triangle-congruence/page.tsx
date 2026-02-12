"use client";
import React from 'react';
import Link from 'next/link';
import CongruenceScanner from "./CongruenceScanner";
import ProofBuilder from "./ProofBuilder";
import { TRIANGLE_MEDIA, CONGRUENCE_POSTULATES, PROOF_VOCAB } from './_assets/triangleData';
import { 
  ArrowLeft, Triangle, Copy, 
  Scale, FileCheck, Layers 
} from "lucide-react";

export default function CongruencePage() {
  return (
    <main className="relative min-h-screen bg-[#172554] text-slate-200 font-sans selection:bg-yellow-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <CongruenceScanner />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/geometry/euclidean" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Geometry
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-yellow-400 shadow-lg backdrop-blur-md">
                <Copy size={12} /> Unit 1.6
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                    TRIANGLE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">CONGRUENCE</span>
                </h1>
                
                <p className="text-xl text-blue-100/80 leading-relaxed border-l-4 border-yellow-500 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
                    When are two shapes truly identical? In geometry, we don't guess. We prove it using rigorous shortcuts like SSS and SAS. This is the heart of geometric proof.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-yellow-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${TRIANGLE_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-blue-950/60 group-hover:bg-blue-950/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-yellow-400 mb-1">STRUCTURAL INTEGRITY</div>
                    <div className="text-white font-bold uppercase">Triangles are the only rigid<br/>polygon. They cannot flex.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE PROOF LAB */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <FileCheck size={24} className="text-yellow-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Proof Builder</h2>
            </div>
            
            <p className="text-blue-200/60 mb-8 max-w-2xl">
                The most common proof involves <strong>Adjacent Triangles</strong> (sharing a side). We use the <em>Reflexive Property</em> to claim that the shared side is equal to itself, giving us a free "Side" for our SSS or SAS proof.
            </p>

            <ProofBuilder />
        </section>

        {/* SECTION 2: THE SHORTCUTS */}
        <section className="border-t border-white/10 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <Scale size={24} className="text-orange-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The 5 Postulates</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CONGRUENCE_POSTULATES.map((p) => (
                    <div key={p.id} className="group bg-blue-900/40 border border-blue-500/20 p-6 rounded-xl hover:bg-blue-800/60 hover:border-yellow-500/50 transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-black text-white group-hover:text-yellow-400 transition-colors">{p.id}</h3>
                            <div className="text-[10px] uppercase font-bold text-blue-300 bg-blue-950 px-2 py-1 rounded">
                                {p.name}
                            </div>
                        </div>
                        <p className="text-sm text-blue-200 leading-relaxed">
                            {p.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>

        {/* SECTION 3: VOCAB */}
        <section className="mt-16 bg-black/20 rounded-2xl p-8 border border-white/5">
             <div className="flex items-center gap-3 mb-6">
                 <Layers size={20} className="text-slate-400" />
                 <h3 className="text-lg font-bold text-white uppercase">Toolbox</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {PROOF_VOCAB.map((v) => (
                     <div key={v.term} className="flex gap-4 items-start">
                         <div className="w-1 h-1 mt-2 bg-yellow-500 rounded-full shrink-0" />
                         <div>
                             <span className="font-bold text-yellow-200 block text-sm">{v.term}</span>
                             <span className="text-xs text-slate-400">{v.def}</span>
                         </div>
                     </div>
                 ))}
             </div>
        </section>

      </div>
    </main>
  );
}