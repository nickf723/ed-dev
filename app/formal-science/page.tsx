"use client";
import React from "react";
import Link from "next/link";
import NetworkBackground from "./NetworkBackground";
import GameOfLifeBackground from "./GameOfLifeBackground";
import { 
  ArrowLeft, Terminal, Cpu, Database, 
  BrainCircuit, Scale, Network, Binary,
  Code2, GitGraph
} from "lucide-react";

const SUBDOMAINS = [
  {
    id: "logic",
    title: "Logic",
    subtitle: "Reasoning & Inference",
    desc: "The study of correct reasoning, formal languages, and valid inference.",
    icon: Scale, // Or BrainCircuit
    href: "/formal-science/logic"
  },
  {
    id: "mathematics",
    title: "Mathematics",
    subtitle: "Quantity & Structure",
    desc: "The abstract science of number, quantity, and space.",
    icon: Binary, 
    href: "/formal-science/mathematics"
  },
  {
    id: "computer-science",
    title: "Computer Science",
    subtitle: "Computation & Info",
    desc: "The study of computation, automation, and information.",
    icon: Terminal, 
    href: "/formal-science/computer-science"
  },
  {
    id: "information-science",
    title: "Information Science",
    subtitle: "Analysis & Retrieval",
    desc: "Properties and behavior of information, flow, and processing.",
    icon: Database,
    href: "/formal-science/information-science"
  },
  {
    id: "data-science",
    title: "Data Science",
    subtitle: "Insight Extraction",
    desc: "Unifying statistics, data analysis, and their related methods.",
    icon: GitGraph,
    href: "/formal-science/data-science"
  },
  {
    id: "systems-science",
    title: "Systems Science",
    subtitle: "Complexity & Dynamics",
    desc: "The interdisciplinary study of systems, complex, simple, or cybernetic.",
    icon: Network,
    href: "/formal-science/systems-science"
  }
];

export default function FormalSciencePage() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden font-mono selection:bg-cyan-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <GameOfLifeBackground />
      <NetworkBackground />
      
      {/* VIGNETTE & GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row justify-between items-start mb-16">
             <div>
                 <Link href="/" className="flex items-center gap-2 text-xs text-cyan-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                    <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Knowledge_Root // Branch_00
                 </Link>
                 <div className="flex items-center gap-6">
                     <div className="w-16 h-16 border-2 border-cyan-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm relative shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                        <Cpu size={32} className="text-cyan-400" />
                        {/* Decorative Corners */}
                        <div className="absolute -top-1 -left-1 w-2 h-2 border-l-2 border-t-2 border-cyan-400" />
                        <div className="absolute -bottom-1 -right-1 w-2 h-2 border-r-2 border-b-2 border-cyan-400" />
                     </div>
                     <div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">
                           FORMAL SCIENCE
                        </h1>
                        <div className="flex gap-4 text-xs text-cyan-500/60 uppercase tracking-widest mt-2">
                            <span>System: Logic-Based</span>
                            <span>Method: Deductive</span>
                        </div>
                     </div>
                 </div>
             </div>
        </header>

        {/* CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-auto mb-12">
            
            {SUBDOMAINS.map((item, i) => (
                <Link 
                    key={item.id}
                    href={item.href}
                    className="
                        group relative flex flex-col justify-between
                        p-6 border border-cyan-900/50 bg-black/40 backdrop-blur-md 
                        transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-950/20
                    "
                >
                    {/* Hover Scanline Effect */}
                    <div className="absolute inset-0 bg-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-2 rounded bg-cyan-500/10 text-cyan-400 group-hover:text-white group-hover:bg-cyan-500 transition-all">
                            <item.icon size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] text-cyan-700 group-hover:text-cyan-400 font-bold uppercase tracking-widest">
                            SYS_0{i+1}
                        </span>
                    </div>

                    {/* Body */}
                    <div className="relative z-10">
                        <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                            {item.title}
                        </h2>
                        <div className="text-[10px] font-bold uppercase mb-3 text-cyan-600 group-hover:text-cyan-400 transition-colors">
                            {item.subtitle}
                        </div>
                        <p className="text-sm text-zinc-400 leading-relaxed h-10 line-clamp-2">
                            {item.desc}
                        </p>
                    </div>

                    {/* Decorative Bar */}
                    <div className="mt-6 w-full h-0.5 bg-cyan-900/50 relative overflow-hidden">
                        <div className="absolute inset-0 bg-cyan-400 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                    </div>
                </Link>
            ))}

        </div>

        {/* FOOTER */}
        <div className="border-t border-cyan-900/30 pt-6 flex justify-between items-center text-[10px] text-cyan-700 font-bold uppercase tracking-widest">
            <span>Axiomatic Foundations</span>
            <span>v.2026.1.10</span>
        </div>

      </div>
    </main>
  );
}