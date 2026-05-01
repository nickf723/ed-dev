"use client";
import React from "react";
import Link from "next/link";
import NetworkBackground from "./_components/NetworkBackground";
import GameOfLifeBackground from "./_components/GameOfLifeBackground";
import { 
  ArrowLeft, Terminal, Cpu, Database, 
  Scale, Network, Binary, GitGraph, 
  Box, Activity, Command
} from "lucide-react";
import Assessment, { AssessmentQuestion } from "@/app/_components/Assessment"; 
import LogicGateSimulator from "@/app/formal-science/_components/LogicGateSimulator";
import VocabApplet from "@/app/_components/VocabApplet";
import { formalScienceVocab } from "@/app/_data/vocab/f/formal-science";
import { formalScienceQuiz } from "./_components/assessment";

// --- CONFIGURATION ---
const SUBDOMAINS = [
  {
    id: "logic", title: "Logic", subtitle: "Reasoning & Inference",
    desc: "The study of correct reasoning, formal languages, and valid inference.",
    icon: Scale, href: "/formal-science/logic",
    span: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    id: "mathematics", title: "Mathematics", subtitle: "Quantity & Structure",
    desc: "The abstract science of number, quantity, and space.",
    icon: Binary, href: "/formal-science/mathematics",
    span: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    id: "computer-science", title: "Computer Science", subtitle: "Computation & Info",
    desc: "The study of computation, automation, and information processing.",
    icon: Terminal, href: "/formal-science/computer-science",
    span: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    id: "information-science", title: "Information Science", subtitle: "Analysis & Retrieval",
    desc: "Properties and behavior of information, flow, storage, and processing.",
    icon: Database, href: "/formal-science/information-science",
    span: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    id: "data-science", title: "Data Science", subtitle: "Insight Extraction",
    desc: "Unifying statistics, data analysis, and their related methods.",
    icon: GitGraph, href: "/formal-science/data-science",
    span: "col-span-12 md:col-span-6 lg:col-span-4"
  },
  {
    id: "systems-science", title: "Systems Science", subtitle: "Complexity & Dynamics",
    desc: "The interdisciplinary study of systems, complex, simple, or cybernetic.",
    icon: Network, href: "/formal-science/systems-science",
    span: "col-span-12 md:col-span-6 lg:col-span-4" 
  }
];

export default function FormalSciencePage() {
  return (
    <main className="relative min-h-screen bg-[#030712] text-white overflow-hidden font-mono selection:bg-rose-500/30 pb-24">
      
      {/* VISUAL ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <GameOfLifeBackground />
          <NetworkBackground />
      </div>
      
      <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-90 pointer-events-none z-0" />

      {/* TERMINAL UI CONTAINER */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 py-12">
        
        {/* --- ZONE 1: COMMAND HEADER --- */}
        <header className="mb-12 border border-rose-500/20 bg-black/60 backdrop-blur-md rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(244,63,94,0.05)]">
            {/* Terminal Bar */}
            <div className="bg-rose-950/40 border-b border-rose-500/20 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-rose-500/50">
                    <Command size={14} />
                    <span className="text-[10px] uppercase tracking-widest">Sys.Init // Formal_Science</span>
                </div>
                <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-rose-500/20" />
                    <div className="w-2 h-2 rounded-full bg-rose-500/40" />
                    <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                </div>
            </div>

            {/* Main Header Content */}
            <div className="p-8 md:p-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative overflow-hidden">
                <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-5 pointer-events-none hidden md:block">
                    <Box size={200} strokeWidth={0.5} />
                </div>
                
                <div className="relative z-10">
                    <Link href="/" className="inline-flex items-center gap-2 text-xs text-rose-500 hover:text-white transition-colors uppercase tracking-widest group mb-6 px-4 py-2 border border-rose-500/30 rounded-lg hover:bg-rose-500/10">
                        <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Root Directory
                    </Link>
                    <div className="flex items-center gap-3 text-rose-400 mb-2">
                        <Cpu size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">Domain_01</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_15px_rgba(244,63,94,0.3)]">
                        FORMAL SCIENCE
                    </h1>
                </div>

                <div className="flex flex-col gap-3 relative z-10 w-full md:w-auto">
                    <div className="bg-black/50 border border-rose-500/30 rounded-lg p-4 flex justify-between md:justify-end items-center gap-8 md:w-48">
                        <span className="text-[10px] text-rose-400 uppercase tracking-widest">Method</span>
                        <span className="text-sm font-bold text-white">Deductive</span>
                    </div>
                    <div className="bg-black/50 border border-rose-500/30 rounded-lg p-4 flex justify-between md:justify-end items-center gap-8 md:w-48">
                        <span className="text-[10px] text-rose-400 uppercase tracking-widest">System</span>
                        <span className="text-sm font-bold text-white">Logic-Based</span>
                    </div>
                </div>
            </div>
        </header>

        {/* --- ZONE 2: THE DIRECTORY (Subdomains) --- */}
        <div className="mb-16">
            <div className="flex items-center gap-4 mb-6 px-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
                <h2 className="text-sm font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                    <Database size={16} /> Operational Nodes
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
            </div>

            <div className="grid grid-cols-12 gap-6">
                {SUBDOMAINS.map((item, i) => (
                    <Link 
                        key={item.id} href={item.href}
                        className={`${item.span} group bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 hover:border-rose-500/50 hover:bg-rose-950/20 transition-all duration-300 relative overflow-hidden flex flex-col`}
                    >
                        {/* ASCII Corner Accents */}
                        <div className="absolute top-0 left-0 p-2 text-[8px] text-white/10 group-hover:text-rose-500/40 font-mono transition-colors">+{'-'.repeat(5)}</div>
                        
                        <div className="absolute inset-0 bg-rose-400/0 group-hover:bg-rose-400/5 transition-colors pointer-events-none" />
                        
                        <div className="flex justify-between items-start mb-6 relative z-10">
                            <div className="p-3 rounded-lg bg-white/5 text-rose-400 border border-white/5 group-hover:text-white group-hover:bg-rose-500 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all">
                               <item.icon size={20} />
                            </div>
                            <span className="text-[10px] font-mono text-slate-600 group-hover:text-rose-400 transition-colors uppercase">
                                NODE.0{i+1}
                            </span>
                        </div>
                        
                        <div className="relative z-10 flex-1 flex flex-col">
                            <h2 className="text-xl font-bold text-white mb-1 group-hover:text-rose-300 transition-colors">{item.title}</h2>
                            <div className="text-[10px] font-bold uppercase mb-4 text-rose-600/70 group-hover:text-rose-400 transition-colors tracking-widest">{item.subtitle}</div>
                            <p className="text-xs text-zinc-400 leading-relaxed mt-auto border-t border-white/5 pt-4 group-hover:border-rose-500/20 transition-colors">
                                {item.desc}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>

        {/* --- ZONE 3: THE LABORATORY (Widgets & Assessments) --- */}
        <div className="mb-16">
            <div className="flex items-center gap-4 mb-6 px-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
                <h2 className="text-sm font-bold text-rose-400 uppercase tracking-widest flex items-center gap-2">
                    <Activity size={16} /> Interactive Systems
                </h2>
                <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* Simulator */}
                <div className="w-full h-full min-h-[450px]">
                    <LogicGateSimulator />
                </div>

                {/* Lexicon */}
                <div className="w-full">
                    <VocabApplet 
                      currentDomain="Formal Science" 
                      localTerms={formalScienceVocab} 
                      accentColor="rose" 
                    />
                </div>

                {/* Assessment */}
                <div className="w-full">
                    <Assessment 
                        title="System Verification Protocol" 
                        questions={formalScienceQuiz} 
                        accentColor="rose"
                        onComplete={(score, total) => console.log(`Formal Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}