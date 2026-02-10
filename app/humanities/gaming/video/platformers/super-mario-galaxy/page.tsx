"use client";
import React from 'react';
import Link from 'next/link';
import StarbitField from "./StarbitField";
import OrbitalLauncher from "./OrbitalLauncher";
import { GALAXY_MEDIA, GALAXY_VOCAB } from './_assets/galaxyData';
import { 
  ArrowLeft, Star, Music, 
  Globe2, MousePointer2 
} from "lucide-react";

export default function GalaxyPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-yellow-400/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <StarbitField />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/humanities/gaming/video/platformers" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-300 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Platformers
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-yellow-400 shadow-lg backdrop-blur-md">
                <Star size={12} /> Nintendo Wii (2007)
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    SUPER MARIO <br/> GALAXY
                </h1>
                
                <p className="text-xl text-indigo-100/80 font-light leading-relaxed mb-8 border-l-4 border-yellow-400 pl-6">
                    The game that broke the X/Y axis. By wrapping levels around small spheres, Nintendo solved the 3D camera problem and reinvented gravity as a toy.
                </p>

                <div className="flex flex-wrap gap-3">
                    <div className="px-3 py-1 bg-indigo-900/50 border border-indigo-500/30 rounded text-xs font-mono text-indigo-300 uppercase">
                        Dir. Yoshiaki Koizumi
                    </div>
                    <div className="px-3 py-1 bg-indigo-900/50 border border-indigo-500/30 rounded text-xs font-mono text-indigo-300 uppercase">
                        97/100 Metacritic
                    </div>
                </div>
            </div>

            {/* Hero Image Card */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${GALAXY_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white uppercase mb-2">The Observatory</h3>
                    <p className="text-sm text-slate-300">
                        Move your mouse to collect Star Bits. This was the first Mario game to utilize the Wii Remote pointer for passive interaction.
                    </p>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE MECHANIC */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Globe2 size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Spherical Physics</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 bg-slate-900/50 border border-indigo-500/20 p-6 rounded-xl backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-4">Why it worked</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        In previous 3D games, if you ran too far, you fell off the world. In Galaxy, if you run too far, you simply loop back to where you started.
                    </p>
                    <div className="p-4 bg-black/40 rounded border border-white/5">
                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-2">Gravity Formula</div>
                        <div className="font-mono text-green-400 text-xs">
                            F = G * (m1 * m2) / r^2
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <OrbitalLauncher />
                </div>
            </div>
        </section>

        {/* SECTION 2: VOCABULARY & ORCHESTRA */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-12">
            
            {/* Vocab List */}
            <div>
                <div className="flex items-center gap-3 mb-8">
                    <MousePointer2 size={24} className="text-yellow-400" />
                    <h2 className="text-2xl font-black text-white uppercase">Galaxy Lexicon</h2>
                </div>
                
                <div className="space-y-4">
                    {GALAXY_VOCAB.map((v) => (
                        <div key={v.id} className="group p-4 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-yellow-500/50 rounded-lg transition-all">
                            <h3 className="font-bold text-yellow-400 mb-1">{v.term}</h3>
                            <p className="text-sm text-slate-300 mb-2">{v.def}</p>
                            <div className="text-xs text-slate-500 italic border-l-2 border-slate-700 pl-2">
                                "{v.context}"
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Orchestra Section */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 min-h-[400px] group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${GALAXY_MEDIA.orchestra})` }}
                />
                <div className="absolute inset-0 bg-indigo-950/80 group-hover:bg-indigo-950/60 transition-colors" />
                
                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                    <div className="mb-auto">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 mb-4 backdrop-blur-md border border-pink-500/30">
                            <Music size={24} />
                        </div>
                    </div>
                    
                    <h3 className="text-3xl font-black text-white uppercase mb-4">A Space Opera</h3>
                    <p className="text-slate-200 leading-relaxed mb-6">
                        Composer Mahito Yokota wanted a grand orchestral score to match the scale of space. This was a massive departure from the synth-heavy pop of previous Mario titles.
                    </p>
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded text-xs font-bold text-white uppercase border border-white/20">
                        Key Track: Gusty Garden Galaxy
                    </div>
                </div>
            </div>

        </section>

      </div>
    </main>
  );
}