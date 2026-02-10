"use client";
import React from 'react';
import Link from 'next/link';
import SignalWave from "./SignalWave";
import CommunicationCycle from "./CommunicationCycle";
import { VOCAB } from './_assets/vocab'; // Import Data
import { HERO_IMAGE, DIAGRAMS } from './_assets/media'; // Import Images
import { 
  Radio, Mic, ArrowLeft, 
  BookOpen, Network 
} from "lucide-react";

export default function CommunicationsPage() {
  return (
    <main className="relative min-h-screen bg-[#1e1b4b] text-indigo-100 font-sans selection:bg-cyan-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <SignalWave />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/social-sciences" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-400 hover:text-white transition-colors bg-black/20 px-3 py-2 rounded backdrop-blur-sm">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Social Sci
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/40 border border-indigo-500/30 px-3 py-1 rounded text-cyan-400 shadow-sm backdrop-blur-md">
                <Radio size={12} /> Unit 1.0
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_25px_rgba(34,211,238,0.3)]">
                    THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">SIGNAL</span>
                </h1>
                <p className="text-xl text-indigo-200 leading-relaxed border-l-4 border-cyan-500 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
                    Communication is the bridge between minds. It is the imperfect process of encoding a thought into a signal, sending it through a noisy channel, and hoping it arrives intact.
                </p>
            </div>
            {/* Using Media Constant */}
            <div className="relative h-80 rounded-2xl overflow-hidden border-2 border-indigo-500/30 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${HERO_IMAGE})` }}
                />
                <div className="absolute inset-0 bg-indigo-900/40 mix-blend-overlay" />
                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-[10px] text-white font-mono">
                    SRC: Alexander Graham Bell
                </div>
            </div>
        </div>

        {/* SECTION 1: THE MODEL */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Network size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Shannon-Weaver Model</h2>
            </div>
            
            <CommunicationCycle />
            
            <div className="mt-8 text-center">
               
            </div>
        </section>

        {/* SECTION 2: VOCABULARY MATRIX */}
        <section className="border-t border-indigo-800/50 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <BookOpen size={24} className="text-pink-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Signal Library</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {VOCAB.map((v) => (
                    <div key={v.id} className="group bg-slate-900/50 border border-indigo-500/20 p-6 rounded-xl hover:bg-slate-800 hover:border-cyan-500/50 transition-all duration-300">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{v.term}</h3>
                            <span className="text-[10px] font-mono uppercase bg-indigo-950 px-2 py-1 rounded text-indigo-300 border border-indigo-500/30">
                                {v.category}
                            </span>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed mb-4">
                            {v.def}
                        </p>
                        <div className="bg-black/30 p-3 rounded border-l-2 border-pink-500 text-xs text-pink-200 font-mono">
                            Example: {v.example}
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}