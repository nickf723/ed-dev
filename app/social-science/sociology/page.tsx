"use client";
import React from "react";
import Link from "next/link";
import SociologyBackground from "./SociologyBackground";
import SchellingModel from "./SchellingModel";
import { SOCIOLOGY_TOPICS } from "./sociology-data";
import { ArrowLeft, Users, BrainCircuit } from "lucide-react";

export default function SociologyPage() {
  return (
    <main className="min-h-screen bg-[#0a0510] text-violet-100 font-sans relative overflow-hidden selection:bg-violet-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <SociologyBackground />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_top_right,transparent_0%,#0a0510_100%)] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12">
            <Link href="/social-science" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-violet-500 hover:text-white transition-colors mb-6">
                <ArrowLeft size={10} /> Social Science
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 flex items-center gap-4">
                SOCIOLOGY <Users className="text-violet-600 opacity-80" size={48} />
            </h1>
            <p className="text-violet-400/60 font-mono text-xs uppercase tracking-widest max-w-xl">
                The Architecture of Us // Structure, Agency, and Interaction.
            </p>
        </header>

        {/* HERO: SCHELLING MODEL */}
        <section className="mb-20">
            <div className="bg-black/40 border border-violet-900/30 rounded-2xl p-8 backdrop-blur-md">
                <SchellingModel />
            </div>
        </section>

        {/* CONCEPTS GRID */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-violet-500 mb-6 flex items-center gap-2">
            <BrainCircuit size={12} /> Theoretical Frameworks
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
            {SOCIOLOGY_TOPICS.map((topic) => {
                const Icon = topic.icon;
                return (
                    <div 
                        key={topic.id}
                        className="group relative bg-black/40 border border-violet-900/20 hover:border-violet-500/50 rounded-xl overflow-hidden transition-all hover:-translate-y-1 hover:shadow-2xl"
                    >
                        {/* Visual Header */}
                        <div className="relative h-48 w-full bg-black/50 border-b border-white/5">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                            
                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <div className={`p-2 rounded bg-black/60 backdrop-blur border border-white/10 ${topic.color}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="text-[9px] font-bold uppercase tracking-widest text-white/50 bg-black/50 px-2 py-1 rounded">
                                    {topic.proponent}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-violet-400 transition-colors">
                                {topic.title}
                            </h3>
                            <p className="text-xs text-violet-200/60 leading-relaxed mb-4">
                                {topic.desc}
                            </p>
                            
                            {/* Diagram Trigger */}
                            {topic.diagramQuery && (
                                <div className="mt-4 pt-4 border-t border-white/5">
                                    <div className="text-[9px] font-bold uppercase text-stone-600 mb-2">Visual Aid</div>
                                    <div className="text-[10px] text-stone-500 italic opacity-0 group-hover:opacity-100 transition-opacity">
                                        
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>

      </div>
    </main>
  );
}