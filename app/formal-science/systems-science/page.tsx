"use client";
import React from "react";
import Link from "next/link";
import SystemsBackground2 from "./SystemsBackground2";
import GameOfLife from "./GameOfLife";
import { SYSTEMS_SECTORS } from "./systems-data";
import { ArrowLeft, Network, GitMerge, Share2 } from "lucide-react";

export default function SystemsPage() {
  return (
    <main className="min-h-screen bg-[#050202] text-red-100 font-sans relative overflow-hidden selection:bg-red-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <SystemsBackground2 />
      <div className="fixed inset-0 bg-gradient-to-b from-[#050202] via-transparent to-[#050202] pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12">
            <Link href="/formal-science" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-red-600 hover:text-white transition-colors mb-6">
                <ArrowLeft size={10} /> Formal Science
            </Link>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 flex items-center gap-4">
                SYSTEMS <GitMerge className="text-red-600 opacity-80" size={48} />
            </h1>
            <p className="text-red-400/60 font-mono text-xs uppercase tracking-widest max-w-xl">
                The Architecture of Order // Complexity, Cybernetics, and Chaos.
            </p>
        </header>

        {/* TOP SECTION: INTERACTIVE MODEL */}
        <section className="mb-16">
            <div className="bg-black/50 border border-red-900/30 rounded-2xl p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-30">
                    <Share2 className="text-red-500" size={100} />
                </div>
                
                <div className="flex flex-col xl:flex-row gap-12 items-start relative z-10">
                    <div className="xl:w-1/3">
                        <h2 className="text-2xl font-bold text-white mb-4">Emergence Simulator</h2>
                        <p className="text-sm text-red-200/60 leading-relaxed mb-6">
                            Complex systems are often defined by <strong>Emergence</strong>: when a system's properties are not inherent to its parts, but arise from their interactions.
                            <br /><br />
                            This model (Conway's Game of Life) demonstrates how simple local rules can generate complex, self-replicating global patterns.
                        </p>
                        
                        <div className="p-4 rounded border border-red-900/30 bg-red-950/10">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-red-500 mb-2">The Rules</h3>
                            <ul className="text-xs text-red-300 space-y-1 font-mono">
                                <li>1. Underpopulation: &lt; 2 neighbors -&gt; Dies</li>
                                <li>2. Survival: 2 or 3 neighbors -&gt; Lives</li>
                                <li>3. Overpopulation: &gt; 3 neighbors -&gt; Dies</li>
                                <li>4. Reproduction: Exactly 3 neighbors -&gt; Born</li>
                            </ul>
                        </div>
                    </div>

                    <div className="xl:w-2/3 w-full flex justify-center">
                        <GameOfLife />
                    </div>
                </div>
            </div>
        </section>

        {/* BOTTOM SECTION: SECTORS GRID */}
        <h2 className="text-xs font-bold uppercase tracking-widest text-red-500 mb-6 flex items-center gap-2">
            <Network size={12} /> Systems Domains
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {SYSTEMS_SECTORS.map((sector) => {
                const Icon = sector.icon;
                return (
                    <div 
                        onClick={() => window.location.href = sector.href}
                        key={sector.id}
                        className={`
                            group relative p-6 rounded-xl bg-black/40 border border-red-900/20 hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1
                            ${sector.bg}
                        `}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-lg bg-black/50 border border-red-900/30 ${sector.color}`}>
                                <Icon size={20} />
                            </div>
                            <div className="text-[10px] font-mono text-red-900 group-hover:text-red-500 transition-colors">
                                SYS_{sector.id.toUpperCase().slice(0,3)}
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                            {sector.label}
                        </h3>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-red-700 mb-3">
                            {sector.sub}
                        </div>
                        <p className="text-xs text-red-200/50 leading-relaxed">
                            {sector.desc}
                        </p>
                    </div>
                )
            })}
        </div>

      </div>
    </main>
  );
}