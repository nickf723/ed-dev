"use client";
import React from 'react';
import Link from 'next/link';
import { 
  GitCommit, AlertTriangle, Infinity, 
  ArrowLeft, Calculator, SearchCode, 
  Waypoints, CheckSquare, BrainCircuit,
  ArrowRight
} from 'lucide-react';
import LogicBackground from './_components/LogicBackground';
import TruthEngine from './_components/TruthEngine';
import QuantifierEngine from './_components/QuantifierEngine';
import { M } from '@/app/_components/Math';
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";
import { logicVocab } from "@/app/_data/vocab/l/logic";
import { logicQuiz } from "./_components/assessment";

export default function LogicHubPage() {
  return (
    <main className="relative min-h-screen bg-[#05030a] overflow-hidden selection:bg-purple-900/30 font-sans pb-32">
      <LogicBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="relative z-10 max-w-[1200px] mx-auto pt-24">
         
         {/* THE CURRICULUM THREAD (Vertical Spine) */}
         <div className="absolute left-6 md:left-24 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent pointer-events-none" />

         {/* =========================================
             INTRODUCTION: THE PREMISE
         ========================================= */}
         <div className="relative pl-16 md:pl-40 pr-6 mb-32">
             <div className="absolute left-[21px] md:left-[93px] top-4 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] ring-4 ring-black" />
             
             <Link href="/formal-science" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-purple-400 mb-8 transition-colors uppercase border border-neutral-800 hover:border-purple-500/30 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                 <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Formal Sciences
             </Link>

             <div className="flex items-center gap-3 text-purple-500 mb-4 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                 <span>[ DOMAIN 02 ]</span>
                 <span className="w-12 h-px bg-purple-500/50"></span>
             </div>
             
             <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                 LOGIC
             </h1>
             <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                 The architecture of truth. Logic strips away context, emotion, and bias, leaving only the immutable framework of <strong className="text-purple-300 font-semibold">valid reasoning</strong>. 
             </p>
         </div>

         {/* =========================================
             LEVEL 1: PROPOSITIONAL (The Basics)
         ========================================= */}
         <div className="relative pl-16 md:pl-40 pr-6 mb-32">
            <div className="absolute left-[21px] md:left-[93px] top-6 w-3 h-3 rounded-full border-2 border-purple-500 bg-black ring-4 ring-black" />
            
            <div className="flex items-center gap-3 mb-8 text-purple-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <Waypoints size={16} /> Level 1: Binary States & Connectives
            </div>

            <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed mb-8">
                Before we can build complex mathematical proofs or computer algorithms, we must define the absolute basics: <strong>True and False</strong>. At this level, we only care about how simple statements combine together.
            </p>

            {/* Level 1 Decoder Subset */}
            <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-3 bg-black/40 border border-neutral-800 px-4 py-2 rounded-lg">
                    <div className="text-white font-serif text-lg">∧</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-widest">AND</div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 border border-neutral-800 px-4 py-2 rounded-lg">
                    <div className="text-white font-serif text-lg">∨</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-widest">OR</div>
                </div>
                <div className="flex items-center gap-3 bg-black/40 border border-neutral-800 px-4 py-2 rounded-lg">
                    <div className="text-white font-serif text-lg">¬</div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-widest">NOT</div>
                </div>
            </div>
            
            {/* Interactive Widget */}
            <div className="bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-3xl p-2 shadow-2xl relative mb-6">
               <div className="absolute -left-16 md:-left-24 top-1/2 w-16 md:w-24 h-px bg-purple-500/20" />
               <TruthEngine />
            </div>

            {/* Level 1 Curriculum Link */}
            <Link href="/formal-science/logic/propositional-logic" className="group flex items-center justify-between p-6 bg-purple-950/10 border border-purple-500/30 rounded-2xl hover:bg-purple-900/20 transition-all max-w-2xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-black border border-purple-500/30 rounded-xl text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                        <GitCommit size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">Module: Propositional Logic</h4>
                        <p className="text-xs text-neutral-500 mt-1">Deep dive into Boolean Algebra and Truth Tables.</p>
                    </div>
                </div>
                <ArrowRight size={16} className="text-purple-500 group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>

         {/* =========================================
             LEVEL 2: RELATIONAL (The Complex)
         ========================================= */}
         <div className="relative pl-16 md:pl-40 pr-6 mb-32">
             <div className="absolute left-[21px] md:left-[93px] top-6 w-3 h-3 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />
             
             <div className="flex items-center gap-3 mb-8 text-blue-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <Calculator size={16} /> Level 2: Quantifiers & Sets
             </div>

             <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed mb-8">
                 Simple true/false statements aren't enough to describe the universe. "All dogs are mammals" requires a new syntax. Here, we introduce <strong>Quantifiers</strong> and begin grouping objects into overlapping <strong>Sets</strong>.
             </p>
             
             {/* Interactive Quantifier Engine */}
             <div className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-3xl p-2 shadow-2xl relative mb-8">
                 <div className="absolute -left-16 md:-left-24 top-1/2 w-16 md:w-24 h-px bg-blue-500/20" />
                 <QuantifierEngine />
             </div>

             <div className="mt-4 p-4 border-l-2 border-blue-500/50 bg-blue-900/10 text-sm text-neutral-400 font-light max-w-3xl rounded-r-lg mb-8">
                 Notice how a single counter-example breaks a Universal (∀) statement. If you say "∀ objects in Set B are Filled", the engine immediately flags the empty circles as the reason the statement is FALSE.
             </div>

             {/* Level 2 Curriculum Links */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                 <Link href="/formal-science/logic/first-order-logic" className="group p-6 bg-blue-950/10 border border-blue-500/30 rounded-2xl hover:bg-blue-900/20 transition-all">
                    <div className="mb-4 text-blue-400 group-hover:text-blue-300 transition-colors"><SearchCode size={24} /></div>
                    <h4 className="text-white font-bold mb-1 group-hover:text-blue-300 transition-colors">First-Order Logic</h4>
                    <p className="text-xs text-neutral-500">Predicates and mathematical syntax.</p>
                 </Link>
                 <Link href="/formal-science/logic/set-theory" className="group p-6 bg-cyan-950/10 border border-cyan-500/30 rounded-2xl hover:bg-cyan-900/20 transition-all">
                    <div className="mb-4 text-cyan-400 group-hover:text-cyan-300 transition-colors"><Infinity size={24} /></div>
                    <h4 className="text-white font-bold mb-1 group-hover:text-cyan-300 transition-colors">Set Theory</h4>
                    <p className="text-xs text-neutral-500">The infinite and mathematical paradoxes.</p>
                 </Link>
             </div>
         </div>

         {/* =========================================
             LEVEL 3: APPLIED (The Human Element)
         ========================================= */}
         <div className="relative pl-16 md:pl-40 pr-6 mb-32">
             <div className="absolute left-[21px] md:left-[93px] top-6 w-3 h-3 rounded-full border-2 border-rose-500 bg-black ring-4 ring-black" />
             <div className="absolute left-[21px] md:left-[93px] top-8 bottom-0 w-3 bg-[#05030a]" /> {/* Cuts off the spine */}
             
             <div className="flex items-center gap-3 mb-8 text-rose-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <BrainCircuit size={16} /> Level 3: Informal Logic
             </div>

             <p className="text-sm text-neutral-400 max-w-3xl leading-relaxed mb-8">
                 Mathematical logic is perfect. Humans are not. When we attempt to apply logical structures to everyday language and debate, we frequently make structural errors known as <strong>Logical Fallacies</strong>.
             </p>

             <Link href="/formal-science/logic/fallacies" className="group flex items-center justify-between p-6 bg-rose-950/10 border border-rose-500/30 rounded-2xl hover:bg-rose-900/20 transition-all max-w-2xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-black border border-rose-500/30 rounded-xl text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-lg group-hover:text-rose-300 transition-colors">Module: Cognitive Biases & Fallacies</h4>
                        <p className="text-xs text-neutral-500 mt-1">Ad Hominem, Straw Man, and broken arguments.</p>
                    </div>
                </div>
                <ArrowRight size={16} className="text-rose-500 group-hover:translate-x-1 transition-transform" />
            </Link>
         </div>

         {/* =========================================
             VERIFICATION: LEXICON & TEST
         ========================================= */}
         <div className="relative pl-6 md:pl-32 pr-6 border-t border-purple-500/20 pt-24 mt-24">
            <div className="flex items-center gap-3 mb-12 text-purple-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <CheckSquare size={16} /> [ Q.E.D. VERIFICATION ]
            </div>

            <div className="grid grid-cols-1 gap-12 max-w-5xl">
                <div className="w-full">
                    <VocabApplet 
                      currentDomain="Logic" 
                      localTerms={logicVocab} 
                      accentColor="purple" 
                    />
                </div>
                
                <div className="w-full">
                    <Assessment 
                        title="Proof of Comprehension" 
                        questions={logicQuiz} 
                        accentColor="purple"
                        onComplete={(score, total) => console.log(`Logic Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>
         </div>

      </div>
    </main>
  );
}