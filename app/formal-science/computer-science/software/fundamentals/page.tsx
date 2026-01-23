"use client";
import React, { useState } from "react";
import Link from "next/link";
import { FUNDAMENTALS_DATA, CodeConcept } from "./fundamentals-data";
import FundamentalsBackground from "./FundamentalsBackground";
import FundamentalsIDE from "./FundamentalsIDE";
import { ArrowLeft, BookOpen, Layers, GitBranch, Box, Code, Hash, List, ShieldAlert } from "lucide-react";

export default function FundamentalsPage() {
  const [activeConcept, setActiveConcept] = useState<CodeConcept>(FUNDAMENTALS_DATA[0]);

  // Categories for Sidebar
  const categories = ["PRIMITIVES", "DATA STRUCTURES", "CONTROL FLOW", "MODULARITY"];

  // Helper to get icon for category title
  const getCatIcon = (cat: string) => {
      switch(cat) {
          case 'PRIMITIVES': return <Hash size={14} />;
          case 'DATA STRUCTURES': return <List size={14} />;
          case 'CONTROL FLOW': return <GitBranch size={14} />;
          default: return <Box size={14} />;
      }
  };

  return (
    <main className="min-h-screen bg-black text-stone-300 font-mono pl-0 md:pl-80 relative overflow-hidden selection:bg-green-500/30">
      
      <FundamentalsBackground />
      <div className="fixed inset-0 bg-gradient-to-r from-black via-black/80 to-transparent pointer-events-none z-0" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        <header className="mb-8">
            <Link href="/formal-science/computer-science/software" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-green-600 hover:text-green-400 transition-colors mb-4">
                <ArrowLeft size={10} /> Software Hub
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
                FUNDAMENTALS
            </h1>
            <p className="text-green-600/60 font-mono text-xs uppercase tracking-widest">
                CS-101 // Syntax, Logic & Structures
            </p>
        </header>

        <div className="flex-1 flex flex-col xl:flex-row gap-8 pb-20">
            
            {/* LEFT: SYLLABUS */}
            <div className="w-full xl:w-1/3 flex flex-col gap-8 h-fit max-h-[80vh] overflow-y-auto custom-scrollbar pr-4">
                {categories.map((cat) => (
                    <div key={cat} className="space-y-4">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-green-800 border-b border-green-900/50 pb-2 flex items-center gap-2">
                            {getCatIcon(cat)} {cat}
                        </h3>
                        
                        <div className="space-y-1">
                            {FUNDAMENTALS_DATA.filter(c => c.category === cat).map((concept) => {
                                const Icon = concept.icon;
                                const isActive = activeConcept.id === concept.id;
                                return (
                                    <button
                                        key={concept.id} 
                                        onClick={() => setActiveConcept(concept)}
                                        className={`
                                            w-full flex items-center gap-3 p-3 rounded border transition-all duration-200 text-left group
                                            ${isActive 
                                                ? "bg-green-900/20 border-green-500/50 text-white" 
                                                : "bg-black/40 border-white/5 text-stone-500 hover:text-green-400 hover:border-green-800"}
                                        `}
                                    >
                                        <div className={`p-1.5 rounded ${isActive ? 'bg-green-500/20' : 'bg-black'}`}>
                                            <Icon size={14} className={isActive ? "text-green-400" : "opacity-50"} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold uppercase tracking-wider">{concept.title}</div>
                                        </div>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: THE LAB */}
            <div className="flex-1 flex flex-col gap-6 sticky top-6">
                
                {/* Concept Header */}
                <div className="bg-[#0f0f0f] border border-green-900/30 p-6 rounded-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Code size={120} />
                    </div>
                    
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">{activeConcept.title}</h2>
                        <div className="inline-block px-2 py-1 bg-green-900/20 text-green-400 text-[9px] font-bold uppercase tracking-widest rounded mb-4">
                            {activeConcept.category}
                        </div>
                        <p className="text-sm text-stone-400 leading-relaxed max-w-xl">
                            {activeConcept.desc}
                        </p>

                        {/* DIAGRAM TRIGGER */}
                        {activeConcept.diagramQuery && (
                            <div className="mt-6 p-4 bg-black/50 border border-white/5 rounded-lg flex flex-col gap-2 w-fit">
                                <div className="text-[9px] font-bold uppercase text-stone-500">Visual Reference</div>
                                <div className="text-xs text-stone-300 italic opacity-80 hover:opacity-100 transition-opacity">
                                    
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* The IDE */}
                <div className="flex-1 min-h-[500px]">
                    <FundamentalsIDE concept={activeConcept} />
                </div>
                
            </div>

        </div>
      </div>
    </main>
  );
}