"use client";
import React from 'react';
import Link from 'next/link';
import BlueprintEngine from "./BlueprintEngine";
import ConstructionLab from "./ConstructionLab";
import { CONST_MEDIA, TOOLS, CONSTRUCTIONS } from './_assets/constructionData';
import { 
  ArrowLeft, PenTool, Ruler, 
  Circle, Compass 
} from "lucide-react";

export default function ConstructionsPage() {
  return (
    <main className="relative min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-red-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <BlueprintEngine />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/geometry/euclidean" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Geometry
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-red-300 shadow-lg backdrop-blur-md">
                <Compass size={12} /> Unit 1.7
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(239,68,68,0.3)]">
                    GEOMETRIC <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-600">CONSTRUCTION</span>
                </h1>
                
                <p className="text-xl text-red-100/80 font-light leading-relaxed mb-8 border-l-4 border-red-600 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
                    Before computers, before calculators, there was the Compass and the Straightedge. This is the ancient game of creating perfect shapes without measuring numbers.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-red-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${CONST_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-neutral-900/60 group-hover:bg-neutral-900/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-red-400 mb-1">THE TOOLKIT</div>
                    <div className="text-white font-bold uppercase">No rulers allowed.<br/>Only straight lines.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE RULES */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8">
             {TOOLS.map((tool) => (
                 <div key={tool.name} className="bg-neutral-900/80 border border-neutral-700 p-8 rounded-xl hover:border-red-500 transition-colors group">
                     <div className="flex items-center justify-between mb-4">
                         <h3 className="text-2xl font-black text-white uppercase">{tool.name}</h3>
                         <div className="w-10 h-10 rounded bg-red-900/20 text-red-500 flex items-center justify-center border border-red-500/20 group-hover:bg-red-600 group-hover:text-white transition-colors">
                             {tool.name.includes('Compass') ? <Circle size={20} /> : <Ruler size={20} />}
                         </div>
                     </div>
                     <div className="text-xs font-bold text-neutral-500 uppercase mb-2 tracking-widest">{tool.role}</div>
                     <p className="text-neutral-400 leading-relaxed">
                         {tool.rule}
                     </p>
                 </div>
             ))}
        </section>

        {/* SECTION 2: THE INTERACTIVE LAB */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <PenTool size={24} className="text-red-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Blueprint Lab</h2>
            </div>
            
            <p className="text-neutral-400 mb-8 max-w-2xl">
                Select a blueprint below to begin construction. Use the tabs to switch between the <strong>Perpendicular Bisector</strong>, the <strong>Angle Bisector</strong>, and the <strong>Equilateral Triangle</strong>.
            </p>

            <ConstructionLab />
        </section>

        {/* SECTION 3: THE LIBRARY */}
        <section className="border-t border-neutral-800 pt-12">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-8">Classic Moves</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CONSTRUCTIONS.map((c) => (
                    <div key={c.id} className="p-6 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 hover:border-red-500/30 transition-all cursor-pointer">
                        <div className="flex justify-between items-start mb-3">
                            <h3 className="font-bold text-red-400 uppercase">{c.title}</h3>
                            <span className="text-[10px] font-mono text-neutral-500 bg-black px-2 py-1 rounded">{c.steps} Steps</span>
                        </div>
                        <p className="text-sm text-neutral-300">
                            {c.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}