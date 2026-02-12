"use client";
import React from 'react';
import Link from 'next/link';
import SynthesiaRain from "./SynthesiaRain";
import VirtualSteinway from "./VirtualSteinway";
import { PIANO_MEDIA, PIANO_VOCAB } from './_assets/pianoData';
import { 
  ArrowLeft, Mic2, Music2, 
  HandMetal, Speaker 
} from "lucide-react";
import PianoLab from './PianoLab';
import GrandPianoLab from './GrandPianoLab';

export default function PerformingArtsMusicPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-neutral-200 font-sans selection:bg-amber-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <SynthesiaRain />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/humanities" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Humanities
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-amber-500 shadow-lg backdrop-blur-md">
                <Mic2 size={12} /> Performing Arts
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] font-serif">
                    THE <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-amber-700">VIRTUOSO</span>
                </h1>
                
                <p className="text-xl text-neutral-400 font-light leading-relaxed mb-8 border-l-4 border-amber-600 pl-6 bg-black/40 p-4 rounded-r-xl backdrop-blur-sm">
                    Music theory is the map; Performance is the journey. It is the physical act of translating abstract symbols into vibration, emotion, and time.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 saturate-0 group-hover:saturate-100"
                    style={{ backgroundImage: `url(${PIANO_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-amber-500 mb-1">INSTRUMENT NO. 1</div>
                    <div className="text-white font-bold uppercase font-serif tracking-wide">The Grand Piano</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE INSTRUMENT */}
            <section className="mb-32">
                <div className="flex items-center gap-4 mb-8">
                    <Music2 size={24} className="text-amber-500" />
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight font-serif">Theory Engine</h2>
                </div>
                
                <p className="text-neutral-400 mb-8 max-w-2xl">
                    Select a Root Note and a Mode (Scale or Chord) to see the theory applied to the keys. Toggle "Chord Mode" to see how notes stack to create harmony.
                </p>

                <GrandPianoLab />
            </section>

        {/* SECTION 2: TECHNIQUE */}
        <section className="border-t border-neutral-800 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <HandMetal size={24} className="text-neutral-300" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight font-serif">Technique</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {PIANO_VOCAB.map((v) => (
                    <div key={v.term} className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl hover:border-amber-900 transition-colors group">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white font-serif group-hover:text-amber-500 transition-colors">{v.term}</h3>
                            {v.icon === 'Volume2' ? <Speaker size={16} className="text-neutral-600" /> : <Music2 size={16} className="text-neutral-600" />}
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed">
                            {v.def}
                        </p>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}