"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, BrainCircuit } from 'lucide-react';

import MagicCircleBackground from './_components/MagicCircleBackground';
import StateMachineSandbox from './_components/StateMachineSandbox';
import VocabApplet from '@/app/_components/VocabApplet';

import { ludologyVocab, gameDesignVocab } from '@/app/_data/vocab/_registry'; // Adjust path to your registry

// ============================================================================
// THE SCRIBE HOOK: Machine-readable context for the AI Research Agent
// ============================================================================
export const SCRIBE_METADATA = {
    domain: "Humanities",
    subDomain: "Game Studies",
    topic: "Ludology",
    prerequisites: ["game-design-fundamentals", "psychology-basics"],
    learningObjectives: [
        "Define the Magic Circle and Lusory Attitude.",
        "Differentiate between Narratology and Ludology.",
        "Analyze Ludonarrative Dissonance in interactive media."
    ]
};

export default function LudologyPage() {
  return (
    <main className="relative min-h-screen bg-[#050505] font-sans text-neutral-300 overflow-hidden">
      
      <MagicCircleBackground />
      
      <div className="relative z-10 max-w-[75rem] mx-auto px-6 pt-12 pb-24 h-screen overflow-y-auto hidden-scrollbar">
         
         {/* HEADER & PREREQUISITE TECH TREE */}
         <div className="mb-12">
             <Link href="/" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                 <ArrowLeft size={14} /> Course Directory
             </Link>
             
             <div className="flex items-center gap-3 mb-4">
                 <span className="px-2 py-1 bg-rose-950/50 border border-rose-500/30 text-rose-400 text-[10px] font-black uppercase tracking-widest rounded">
                     {SCRIBE_METADATA.domain}
                 </span>
                 <span className="text-neutral-600 text-[10px]">/</span>
                 <span className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest">
                     {SCRIBE_METADATA.subDomain}
                 </span>
             </div>

             <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                 LUDOLOGY
             </h1>
             <p className="text-lg md:text-xl text-neutral-400 font-light max-w-3xl leading-relaxed">
                 The formal study of games and gameplay. We examine the psychological architecture of play, the boundary between rules and reality, and the mechanical systems that generate emergent experiences.
             </p>
         </div>

         {/* LESSON CONTENT & SANDBOX */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
             <div className="lg:col-span-2 space-y-6 text-neutral-300 leading-relaxed font-light">
                 <h2 className="text-2xl font-bold text-white mb-4 border-b border-neutral-800 pb-2 flex items-center gap-2">
                    <BrainCircuit className="text-rose-500" size={24} /> The Mechanics of Play
                 </h2>
                 <p>
                     Unlike passive media like film or literature, games require a participant. The study of Ludology focuses on this interaction—how rules, systems, and feedback loops create experiences that cannot exist without player agency.
                 </p>
                 <p>
                     To understand a game, you must look past the narrative wrapper and examine the <strong>State Space</strong>. Every game is essentially a complex machine processing inputs and returning new states. 
                 </p>
                 
                 {/* The Interactive Widget inserted right into the reading flow */}
                 <StateMachineSandbox />
                 
                 <p>
                     When the narrative of the game conflicts with this underlying state machine—for instance, a game telling you violence is wrong while rewarding you mechanically for combat—we experience what is known as <strong>Ludonarrative Dissonance</strong>.
                 </p>
             </div>

             {/* SIDEBAR: Scribe Objectives */}
             <div className="lg:col-span-1">
                 <div className="bg-black/50 border border-neutral-800 rounded-xl p-6 sticky top-6">
                     <div className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
                         <BookOpen size={14} className="text-rose-500" /> Lesson Objectives
                     </div>
                     <ul className="space-y-3">
                         {SCRIBE_METADATA.learningObjectives.map((obj, i) => (
                             <li key={i} className="flex items-start gap-3 text-sm text-neutral-400">
                                 <span className="text-rose-500 font-mono text-[10px] mt-0.5">0{i + 1}</span>
                                 {obj}
                             </li>
                         ))}
                     </ul>
                 </div>
             </div>
         </div>

         {/* THE VOCABULARY APPLET */}
         <div className="border-t border-neutral-800 pt-16">
             <div className="mb-6">
                 <h2 className="text-3xl font-black text-white tracking-tight">Domain Lexicon</h2>
                 <p className="text-sm text-neutral-500 font-mono mt-1">Sourced from /l/ludology.ts</p>
             </div>
             
             {/* We pass Game Design in as the parent context! */}
             <VocabApplet 
                 currentDomain="Ludology"
                 localTerms={ludologyVocab}
                 parentTerms={gameDesignVocab}
             />
         </div>

      </div>
    </main>
  );
}