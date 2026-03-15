"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale, BookOpen, Landmark, Shield } from 'lucide-react';
import VocabApplet from '@/app/_components/VocabApplet'; 
import { lawVocab } from '@/app/_data/vocab/l/law'; 

// Import our new custom components!
import JusticeBackground from './_components/JusticeBackground';
import PrecedenceSandbox from './_components/PrecedenceSandbox';

export const SCRIBE_METADATA = {
    domain: "Social Science",
    subDomain: "Jurisprudence",
    topic: "Law",
    learningObjectives: [
        "Understand the distinction between Civil and Criminal Law.",
        "Analyze the hierarchy of court systems and binding precedent.",
        "Define foundational legal terminology and mechanisms."
    ]
};

export default function LawHubPage() {
    return (
        <main className="relative min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-900/50 overflow-hidden">
            
            <JusticeBackground />

            <div className="relative z-10 max-w-[75rem] mx-auto px-6 py-12 md:py-24 h-screen overflow-y-auto hidden-scrollbar">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-zinc-800/60 pb-8 backdrop-blur-sm">
                    <Link href="/social-science" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Social Science Directory
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.15)]">
                            <Scale size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                            {SCRIBE_METADATA.domain} // {SCRIBE_METADATA.subDomain}
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-lg">
                        JURISPRUDENCE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-zinc-500 font-light">& THE LAW</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        The framework of rules created and enforced by social or governmental institutions to regulate behavior. This repository explores legal theory, constitutional structures, and the mechanics of justice.
                    </p>
                </header>

                {/* THE PILLARS OF LAW */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="p-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl hover:border-amber-500/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-lg">
                        <Landmark className="text-amber-500 mb-4" size={28} />
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">Constitutional</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            The interpretation and application of foundational state documents and the balance of governmental powers.
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl hover:border-sky-500/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-lg">
                        <Shield className="text-sky-500 mb-4" size={28} />
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">Criminal</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            The system regulating social conduct, prosecuting behaviors deemed threatening, harmful, or otherwise endangering.
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-900/60 backdrop-blur-md border border-zinc-800 rounded-2xl hover:border-emerald-500/30 hover:-translate-y-1 transition-all duration-300 group cursor-pointer shadow-lg">
                        <BookOpen className="text-emerald-500 mb-4" size={28} />
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Civil & Contract</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-light">
                            The resolution of non-criminal disputes between individuals, organizations, and the enforcement of agreements.
                        </p>
                    </div>
                </div>

                {/* THE SYSTEM ARCHITECTURE SECTION */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-zinc-800 pb-2">System Architectures & Precedent</h2>
                    <p className="text-zinc-300 font-light leading-relaxed max-w-4xl mb-6">
                        A critical component of legal study is understanding jurisdiction and precedence. Just as a state machine dictates video game logic, the appellate court structure dictates the flow and finalized state of legal interpretation. A ruling at a higher court structurally overwrites the operational logic of lower courts within its jurisdiction.
                    </p>

                    
                    
                    {/* Injecting our Interactive Sandbox */}
                    <PrecedenceSandbox />
                </div>

                {/* LEXICON INJECTION */}
                <div className="border-t border-zinc-800/60 pt-16">
                    <div className="mb-6">
                        <h2 className="text-3xl font-black text-white tracking-tight">Legal Lexicon</h2>
                        <p className="text-sm text-zinc-500 font-mono mt-1">Sourced from /l/law.ts</p>
                    </div>
                    <VocabApplet 
                        currentDomain="Law"
                        localTerms={lawVocab}
                    />
                </div>

            </div>
        </main>
    );
}