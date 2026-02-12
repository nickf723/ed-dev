"use client";
import React from 'react';
import Link from 'next/link';
import BlueprintGrid from './BlueprintGrid';
import AnglePlayground from "./AnglePlayground";
import { GEOMETRY_MEDIA, GEOMETRY_TOPICS, GEOMETRY_VOCAB } from './_assets/geometryData';
import { 
  Triangle, Ruler, Compass, 
  ArrowLeft, BookOpen, PenTool 
} from "lucide-react";

export default function EuclideanPage() {
  return (
    <main className="relative min-h-screen bg-[#172554] text-slate-100 font-sans selection:bg-blue-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <BlueprintGrid />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-300 hover:text-white transition-colors bg-black/20 px-3 py-2 rounded backdrop-blur-sm border border-blue-500/20">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Mathematics
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-black/40 border border-blue-400/30 px-3 py-1 rounded text-blue-200 shadow-sm backdrop-blur-md">
                <Compass size={12} /> Euclid's Elements
            </div>
        </div>

        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_25px_rgba(59,130,246,0.3)]">
                    EUCLIDEAN <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">GEOMETRY</span>
                </h1>
                <p className="text-xl text-blue-100/80 leading-relaxed border-l-4 border-blue-500 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
                    The study of shape, size, relative position, and the properties of space. It is the language of architects, engineers, and the universe itself.
                </p>
            </div>
            {/* Hero Image Card */}
            <div className="relative h-80 rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500 group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${GEOMETRY_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
                
                {/* Overlay UI */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-white border border-white/20">
                    FIG. 1.0: Structure
                </div>
            </div>
        </div>

        

        {/* SECTION 1: INTERACTIVE PROOF */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Triangle size={24} className="text-blue-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Sum Theorem</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-1 bg-slate-900/50 border border-blue-500/20 p-6 rounded-xl backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-4">Axiomatic Truth</h3>
                    <p className="text-sm text-slate-300 leading-relaxed mb-6">
                        In Euclidean space, the interior angles of any triangle will always sum to exactly <strong>180 degrees</strong> (π radians). 
                    </p>
                    <div className="p-4 bg-blue-900/20 rounded border border-blue-500/30">
                        <div className="text-[10px] font-bold text-blue-300 uppercase mb-2">The Proof</div>
                        <div className="font-mono text-white text-xs">
                            If L || base,<br/>
                            Alt. Interior Angles are equal.<br/>
                            ∴ A + B + C = 180°
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <AnglePlayground />
                </div>
            </div>
        </section>

        {/* SECTION 2: TOPIC BLUEPRINTS */}
        <section className="mb-32">
             <div className="flex items-center gap-4 mb-12">
                <Ruler size={24} className="text-cyan-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Blueprint</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {GEOMETRY_TOPICS.map((topic) => (
                    <Link 
                        key={topic.id} 
                        href={topic.link}
                        className="group relative bg-slate-900/80 border border-slate-700 p-8 rounded-xl hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 overflow-hidden"
                    >
                        {/* Grid BG inside card */}
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/1/10/Grid_graph_paper.svg')] opacity-[0.05] invert transition-opacity group-hover:opacity-[0.1]" />
                        
                        <div className="relative z-10 flex gap-6">
                            <div className="w-12 h-12 rounded bg-blue-900/50 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                                <PenTool size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase">{topic.title}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {topic.desc}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* SECTION 3: VOCABULARY */}
        <section className="border-t border-blue-800/50 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <BookOpen size={24} className="text-blue-300" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Elements</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GEOMETRY_VOCAB.map((v) => (
                    <div key={v.term} className="bg-slate-900/50 border border-slate-700 p-6 rounded-xl hover:bg-slate-800 transition-colors">
                        <h3 className="font-bold text-blue-400 mb-2 text-lg">{v.term}</h3>
                        <p className="text-sm text-slate-300 mb-4 h-16">
                            {v.def}
                        </p>
                        <div className="text-xs text-slate-500 font-mono border-t border-slate-800 pt-3">
                            Ex: {v.example}
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}