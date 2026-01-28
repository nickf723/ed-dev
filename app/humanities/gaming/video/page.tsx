"use client";
import React from "react";
import Link from "next/link";
import SynthwaveBackground from "./SynthwaveBackground";
import PhysicsPlayground from "./PhysicsPlayground";
import GlobalVisualMedia from "@/components/GlobalVisualMedia"; // Use your global visualizer
import VocabModule from "@/components/VocabModule";
import { VIDEO_ERAS, GENRES, videoGamingTerms } from "./video-data";
import { ArrowLeft, Monitor, Cpu, Gamepad, Sparkles } from "lucide-react";

export default function VideoGamingPage() {
  return (
    <main className="min-h-screen bg-[#090014] text-purple-100 font-sans relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <SynthwaveBackground />
      {/* Scanline Overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-16">
            <Link href="/humanities/gaming" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-purple-400 hover:text-cyan-400 transition-colors mb-6">
                <ArrowLeft size={10} /> Gaming Hub
            </Link>
            <div className="flex items-center gap-4">
                <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tighter mb-4 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                    VIDEO LUDOLOGY
                </h1>
                <Gamepad size={48} className="text-cyan-400 opacity-80" />
            </div>
            <p className="text-purple-300/60 font-mono text-xs uppercase tracking-widest max-w-xl">
                The Tenth Art // Interactive Systems & Virtual Worlds
            </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* LEFT COLUMN: HISTORY & GENRES (8 Cols) */}
            <div className="lg:col-span-8 space-y-16">
                
                {/* HERO SECTION: ERAS */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <Monitor className="text-purple-500" /> Hardware Generations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {VIDEO_ERAS.map((era) => {
                            const Icon = era.icon;
                            return (
                                <div key={era.id} className="group relative bg-black/40 border border-purple-500/20 hover:border-cyan-400/50 rounded-xl overflow-hidden transition-all hover:-translate-y-1">
                                    {/* Image Top */}
                                    <div className="h-32 w-full relative opacity-60 group-hover:opacity-100 transition-opacity">
                                        <GlobalVisualMedia 
                                        query={era.imageQuery}
                                        src={era.directUrl}
                                        wikiEndpoint={era.wikiEndpoint} 
                                        alt={era.title}
                                        fit="cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                                    </div>
                                    
                                    <div className="p-6 relative">
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="p-2 rounded bg-purple-900/30 text-purple-300 border border-purple-700/30">
                                                <Icon size={20} />
                                            </div>
                                            <span className="text-[10px] font-mono text-cyan-500 uppercase">{era.year}</span>
                                        </div>
                                        <h3 className="text-lg font-bold text-white mb-2">{era.title}</h3>
                                        <p className="text-xs text-purple-200/60 leading-relaxed mb-4">{era.desc}</p>
                                        <div className="text-[9px] font-bold uppercase tracking-widest text-purple-500 flex items-center gap-1">
                                            <Cpu size={10} /> {era.tech}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </section>

                {/* GENRE GRID */}
                <section>
                    <h2 className="text-xl font-bold text-white mb-8 flex items-center gap-2">
                        <Sparkles className="text-cyan-500" /> Core Genres
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {GENRES.map((g) => (
                            <div key={g.title} className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400 transition-colors">
                                <div className="absolute inset-0 opacity-50 group-hover:opacity-80 transition-opacity">
                                    <GlobalVisualMedia 
                                    query={g.query} 
                                    src={g.directUrl} 
                                    wikiEndpoint={g.wikiEndpoint}
                                    alt={g.title}
                                    fit="contain" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                                <div className="absolute bottom-0 inset-x-0 p-3">
                                    <div className="text-[10px] font-bold uppercase text-white leading-tight mb-1">{g.title}</div>
                                    <div className="text-[8px] text-gray-400 line-clamp-2">{g.desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

            </div>

            {/* RIGHT COLUMN: LAB & VOCAB (4 Cols) */}
            <div className="lg:col-span-4 space-y-8">
                
                {/* 1. PHYSICS LAB */}
                <div className="sticky top-8">
                    <PhysicsPlayground />
                    
                    <div className="mt-8">
                        <VocabModule terms={videoGamingTerms} title="Dev Lexicon" />
                    </div>

                    {/* Fun Extra: Konami Code Hint */}
                    <div className="mt-8 p-4 rounded bg-purple-950/20 border border-purple-500/10 text-center">
                        <div className="text-[10px] font-mono text-purple-500 uppercase tracking-widest mb-1">Cheat Code</div>
                        <div className="text-xs font-bold text-purple-300">↑ ↑ ↓ ↓ ← → ← → B A</div>
                    </div>
                </div>

            </div>

        </div>

      </div>
    </main>
  );
}