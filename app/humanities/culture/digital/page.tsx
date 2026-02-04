"use client";
import React from 'react';
import Link from 'next/link';
import CyberspaceGrid from "./CyberspaceGrid";
import MemeArcheology from "./MemeArcheology";
import { 
  Globe, Monitor, Cpu, Wifi, 
  ArrowLeft, Share2, MousePointer 
} from "lucide-react";

export default function DigitalCulturePage() {
  return (
    <main className="relative min-h-screen bg-[#0f0014] text-white overflow-hidden font-sans selection:bg-pink-500/30">
      
      {/* 1. VISUALS */}
      <CyberspaceGrid />
      <div className="absolute inset-0 bg-[url('/scanlines.png')] opacity-20 pointer-events-none" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/humanities/culture" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-pink-400 hover:text-white transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Disconnect
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 animate-pulse">
                <Wifi size={12} /> UPLOAD: 100%
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-900/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6 box-shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <Monitor size={14} /> The New Reality
            </div>
            <h1 className="text-6xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-500 tracking-tighter uppercase leading-none drop-shadow-[0_0_30px_rgba(236,72,153,0.5)] mb-8">
                DIGITAL <br/> CULTURE
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed font-light">
                We have migrated. We no longer just use the internet; we live inside it. 
                It has its own language, its own history, and its own reality.
            </p>
        </header>

        {/* SECTION 1: THE EVOLUTION */}
        <section className="mb-32">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-pink-500/50 w-12" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-2">
                    <Share2 size={20} className="text-cyan-400" /> Memetics & Language
                </h2>
                <div className="h-px bg-pink-500/50 w-12" />
            </div>
            
            <MemeArcheology />
        </section>

        {/* SECTION 2: THE METAVERSE CONCEPTS */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
            <ConceptCard 
                title="The Avatar"
                icon={MousePointer}
                desc="The digital self. Freed from physical constraints, we can curate our identity. But are we projecting who we are, or who we want to be?"
                color="text-cyan-400"
            />
            <ConceptCard 
                title="The Algorithm"
                icon={Cpu}
                desc="The invisible hand. It decides what we see, who we meet, and what we believe. A mathematical god governing human attention."
                color="text-pink-400"
            />
            <ConceptCard 
                title="The Cloud"
                icon={Globe}
                desc="The collective memory. Nothing is ever truly forgotten. Our history is stored in server farms, immortalized as data."
                color="text-yellow-400"
            />
        </section>

        {/* FOOTER */}
        <div className="text-center border-t border-white/10 pt-12">
            <div className="text-[10px] text-slate-500 font-mono">
                SYSTEM.EXIT(0) // END OF LINE
            </div>
        </div>

      </div>
    </main>
  );
}

function ConceptCard({ title, icon: Icon, desc, color }: any) {
    return (
        <div className="p-8 bg-slate-900/50 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group">
            <div className={`p-4 rounded-xl bg-black/40 w-fit mb-6 ${color} border border-white/5 group-hover:scale-110 transition-transform`}>
                <Icon size={32} />
            </div>
            <h3 className="text-xl font-bold text-white uppercase mb-3">{title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">
                {desc}
            </p>
        </div>
    )
}