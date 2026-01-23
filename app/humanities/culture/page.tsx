"use client";
import React from "react";
import Link from "next/link";
import CultureStream from "./CultureStream";
import { CULTURE_SECTORS } from "./culture-data";
import { ArrowLeft, Radio, Tv } from "lucide-react";

export default function CulturePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-pink-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <CultureStream />
      {/* Vignette & Gradient */}
      <div className="fixed inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-16 relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <Link href="/humanities" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-white transition-colors mb-6">
                <ArrowLeft size={10} /> Humanities Dept
            </Link>
            
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 flex flex-col md:block">
                <span>MODERN</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500"> CULTURE</span>
            </h1>
            
            <div className="flex items-center gap-6 text-xs font-mono text-stone-500 uppercase tracking-widest">
                <div className="flex items-center gap-2 text-red-500 animate-pulse">
                    <Radio size={12} /> Live Feed
                </div>
                <div className="flex items-center gap-2">
                    <Tv size={12} /> Broadcast
                </div>
            </div>
        </header>

        {/* MASONRY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {CULTURE_SECTORS.map((sector) => {
                const Icon = sector.icon;
                return (
                    <Link 
                        key={sector.id} 
                        href={sector.link}
                        className={`
                            group relative aspect-[4/3] rounded-2xl border border-white/10 overflow-hidden hover:-translate-y-1 transition-all duration-300
                            ${sector.border}
                        `}
                    >
                        {/* Background Image Placeholder / Effect */}
                        <div className={`absolute inset-0 transition-colors duration-500 ${sector.bg}`} />
                        
                        {/* Static Image Trigger for AI Context */}
                        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity grayscale group-hover:grayscale-0">
                             {/* In a real app, this would be an <img src="..." /> */}
                             <div className="w-full h-full bg-black flex items-center justify-center text-[10px] text-stone-700">
                                
                             </div>
                        </div>

                        {/* Content Layer */}
                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                            <div className="flex justify-between items-start">
                                <div className={`p-3 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 ${sector.color}`}>
                                    <Icon size={24} />
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-widest bg-black/50 px-3 py-1 rounded-full border border-white/5 text-stone-400">
                                    CH-0{CULTURE_SECTORS.indexOf(sector) + 1}
                                </div>
                            </div>

                            <div>
                                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${sector.color}`}>
                                    {sector.sub}
                                </div>
                                <h2 className="text-3xl font-black text-white mb-2 leading-none">
                                    {sector.label}
                                </h2>
                                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-2 group-hover:translate-y-0">
                                    {sector.desc}
                                </p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>

      </div>
    </main>
  );
}