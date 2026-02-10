"use client";
import React from 'react';
import Link from 'next/link';
import SynthwaveGrid from "./SynthwaveGrid";
import FrameBudget from "./FrameBudget";
import { GAME_REPO } from './_assets/gamingData';
import { 
  Gamepad2, Cpu, ArrowLeft, 
  ExternalLink, Disc, BookOpen 
} from "lucide-react";

export default function GamingPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0c29] text-white font-sans selection:bg-purple-500/50 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <SynthwaveGrid />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/humanities/gaming" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-300 hover:text-white transition-colors bg-black/40 px-3 py-2 rounded backdrop-blur-sm border border-purple-500/20">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Hub
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/40 border border-cyan-500/30 px-3 py-1 rounded text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] backdrop-blur-md">
                <Gamepad2 size={12} /> System Ready
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32 text-center relative">
            {/* Glitch Title Effect */}
            <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-purple-400 tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                VIDEO <br/> GAMING
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-purple-200/80 font-light leading-relaxed mb-8">
                The defining medium of the 21st century. An interactive canvas where narrative, mechanics, and technology collide.
            </p>

            <div className="inline-flex gap-4">
                <div className="px-4 py-2 rounded border border-purple-500/30 bg-purple-900/20 text-xs font-mono text-purple-300 uppercase">
                    Press Start to Begin
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE ENGINE (Interactive) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Cpu size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Frame Budget</h2>
            </div>
            
            <p className="text-slate-300 mb-8 max-w-2xl">
                Every game is a race against time. The engine has exactly <strong>16.6 milliseconds</strong> to calculate physics, AI, and render millions of pixels to hit 60 frames per second. Can you optimize the settings?
            </p>

            <FrameBudget />
        </section>

        {/* SECTION 2: THE REPOSITORY */}
        <section className="border-t border-purple-500/30 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <Disc size={24} className="text-pink-500" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Knowledge Cartridges</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {GAME_REPO.map((node) => (
                    <Link 
                        key={node.id} 
                        href={node.link}
                        className="group relative h-80 bg-slate-900 border border-slate-700 rounded-xl overflow-hidden hover:border-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 flex flex-col"
                    >
                        {/* Image Header */}
                        <div className="h-1/2 relative overflow-hidden">
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${node.image})` }}
                            />
                            <div className="absolute inset-0 bg-purple-900/20 mix-blend-overlay group-hover:bg-transparent transition-colors" />
                        </div>

                        {/* Content Body */}
                        <div className="flex-1 p-6 flex flex-col">
                            <div className="mb-auto">
                                <span className="text-[10px] font-bold uppercase text-cyan-400 mb-2 block tracking-widest">
                                    {node.category}
                                </span>
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-cyan-200 transition-colors">
                                    {node.title}
                                </h3>
                                <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
                                    {node.desc}
                                </p>
                            </div>
                            
                            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between text-slate-500 group-hover:text-white transition-colors">
                                <span className="text-[9px] font-mono uppercase">Load Module</span>
                                <ExternalLink size={12} />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}