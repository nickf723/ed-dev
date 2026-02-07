"use client";
import React from 'react';
import Link from 'next/link';
import BlueprintGridEngine from "./BlueprintGridEngine";
import ArchStyleComparator from "./ArchStyleComparator";
import { 
  Ruler, Layout, Landmark, Construction, 
  ArrowLeft, Info 
} from "lucide-react";

export default function ArchitecturePage() {
  return (
    <main className="relative min-h-screen bg-[#172554] text-white overflow-hidden font-sans selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <BlueprintGridEngine />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/humanities/visual-arts" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 hover:text-white transition-colors font-mono">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Arts
            </Link>
            <div className="text-[10px] font-mono font-bold uppercase tracking-widest bg-blue-900 border border-blue-500 text-cyan-400 px-3 py-1 rounded">
                Section: Built Environment
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32">
            <div className="border-l-4 border-white pl-8">
                <div className="text-cyan-400 font-mono text-xs mb-2">FIG 1.0: DEFINITION</div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none mb-6">
                    FROZEN <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-200">MUSIC</span>
                </h1>
                <p className="max-w-xl text-lg text-blue-200 font-light leading-relaxed">
                    Architecture is the masterly, correct, and magnificent play of masses brought together in light. It is where engineering meets emotion.
                </p>
            </div>
        </header>

        {/* SECTION 1: THE FOUNDATIONS (Vitruvian Triad) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Ruler size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black uppercase tracking-tight">The Vitruvian Triad</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-blue-500/30 border border-blue-500/30 rounded-xl overflow-hidden">
                
                <div className="bg-[#172554] p-8 hover:bg-blue-900 transition-colors group">
                    <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform origin-left">
                        <Construction size={32} />
                    </div>
                    <h3 className="text-xl font-bold uppercase mb-2">Firmitas</h3>
                    <div className="text-xs font-mono text-blue-300 mb-4">(Firmness / Strength)</div>
                    <p className="text-sm text-blue-100">
                        The structure must stand up. From the Pyramids to modern skyscrapers, gravity is the ultimate opponent.
                    </p>
                </div>

                <div className="bg-[#172554] p-8 hover:bg-blue-900 transition-colors group">
                    <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform origin-left">
                        <Layout size={32} />
                    </div>
                    <h3 className="text-xl font-bold uppercase mb-2">Utilitas</h3>
                    <div className="text-xs font-mono text-blue-300 mb-4">(Commodity / Utility)</div>
                    <p className="text-sm text-blue-100">
                        The building must serve a purpose. Form follows function. A house must be livable; a museum must guide flow.
                    </p>
                </div>

                <div className="bg-[#172554] p-8 hover:bg-blue-900 transition-colors group">
                    <div className="mb-4 text-cyan-400 group-hover:scale-110 transition-transform origin-left">
                        <Landmark size={32} />
                    </div>
                    <h3 className="text-xl font-bold uppercase mb-2">Venustas</h3>
                    <div className="text-xs font-mono text-blue-300 mb-4">(Delight / Beauty)</div>
                    <p className="text-sm text-blue-100">
                        The structure must be aesthetically pleasing. It creates a sense of awe, harmony, or proportion.
                    </p>
                </div>

            </div>
        </section>

        {/* SECTION 2: INTERACTIVE COMPARATOR */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Landmark size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Evolution of Style</h2>
            </div>
            
            <ArchStyleComparator />
        </section>

        {/* SECTION 3: HALL OF FAME */}
        <section className="border-t border-blue-800 pt-12">
            <h3 className="text-4xl font-black uppercase mb-8">The Masterworks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                <div className="group relative h-80 rounded-xl overflow-hidden border border-blue-800">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Fallingwater_-_Frank_Lloyd_Wright.jpg/800px-Fallingwater_-_Frank_Lloyd_Wright.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172554] via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6">
                        <div className="text-cyan-400 font-mono text-xs mb-1">FRANK LLOYD WRIGHT</div>
                        <h4 className="text-3xl font-bold text-white uppercase">Fallingwater</h4>
                        <p className="text-xs text-blue-200 mt-2 max-w-sm">Organic Architecture. The house doesn't sit *on* the hill, it is *of* the hill.</p>
                    </div>
                </div>

                <div className="group relative h-80 rounded-xl overflow-hidden border border-blue-800">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Pantheon_Rome_exterior_2023.jpg/800px-Pantheon_Rome_exterior_2023.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#172554] via-transparent to-transparent opacity-90" />
                    <div className="absolute bottom-6 left-6">
                        <div className="text-cyan-400 font-mono text-xs mb-1">ANCIENT ROME</div>
                        <h4 className="text-3xl font-bold text-white uppercase">The Pantheon</h4>
                        <p className="text-xs text-blue-200 mt-2 max-w-sm">The unreinforced concrete dome. A perfect sphere fits inside. Dedicated to all gods.</p>
                    </div>
                </div>

            </div>
        </section>

      </div>
    </main>
  );
}