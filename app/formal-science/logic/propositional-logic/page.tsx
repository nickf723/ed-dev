"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Split, Combine, ArrowRight, Waypoints, CheckSquare, GitCommit } from 'lucide-react';
import LogicBackground from '../_components/LogicBackground';
import TruthTableLab from './_components/TruthTableLab';
import PropositionalBackground from './_components/PropositionalBackground';
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";

// Data Imports
import { propLogicQuiz } from "./_components/assessment";
import { propLogicVocab } from "@/app/_data/vocab/p/propositional-logic";

export default function PropositionalLogicPage() {
  return (
    <main className="relative min-h-screen bg-[#05030a] overflow-hidden selection:bg-purple-900/30 font-sans pb-32">
      <PropositionalBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1000px] mx-auto pt-24">
         
         {/* THE DEDUCTION THREAD (Vertical Spine) */}
         <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-purple-500/30 to-transparent pointer-events-none" />

         {/* =========================================
             HEADER
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-24">
             {/* Node */}
             <div className="absolute left-[21px] md:left-[45px] top-4 w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] ring-4 ring-black" />
             
             <Link href="/formal-science/logic" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-purple-400 mb-8 transition-colors uppercase border border-neutral-800 hover:border-purple-500/30 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                 <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Logic Hub
             </Link>

             <div className="flex items-center gap-3 text-purple-500 mb-4 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                 <GitCommit size={14} />
                 <span>[ MODULE 01 ]</span>
                 <span className="w-12 h-px bg-purple-500/50"></span>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                 PROPOSITIONAL LOGIC
             </h1>
             <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                 Before we can build complex mathematics or computer programs, we have to define the absolute ground floor of reality. We must define what it means for a statement to be <strong className="text-purple-400">True</strong> or <strong className="text-purple-400">False</strong>.
             </p>
         </div>

         {/* =========================================
             THEORY & PROSE
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-24">
            <div className="absolute left-[21px] md:left-[45px] top-2 w-3 h-3 rounded-full border-2 border-purple-500 bg-black ring-4 ring-black" />
            
            <article className="prose prose-invert prose-lg max-w-none">
                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 mt-0">
                   <Waypoints size={20} className="text-purple-500" /> The Atomic Proposition
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                    A <strong>proposition</strong> is simply a declarative statement that is exactly one of two things: True or False. It cannot be both, and it cannot be neither. 
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-10">
                    <div className="p-6 bg-black/40 border border-neutral-800 rounded-xl hover:border-emerald-500/30 transition-colors">
                        <div className="text-[10px] uppercase font-bold text-emerald-500 tracking-widest mb-3">Valid Propositions</div>
                        <ul className="text-sm font-mono text-neutral-300 space-y-3">
                            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">▶</span> "Paris is the capital of France." (T)</li>
                            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">▶</span> "The earth is flat." (F)</li>
                            <li className="flex items-start gap-2"><span className="text-emerald-500 mt-1">▶</span> "2 + 2 = 5." (F)</li>
                        </ul>
                    </div>
                    <div className="p-6 bg-black/40 border border-neutral-800 rounded-xl hover:border-red-500/30 transition-colors">
                        <div className="text-[10px] uppercase font-bold text-red-500 tracking-widest mb-3">Not Propositions</div>
                        <ul className="text-sm font-mono text-neutral-300 space-y-3">
                            <li className="flex items-start gap-2"><span className="text-red-500 mt-1">▶</span> "What time is it?" (Question)</li>
                            <li className="flex items-start gap-2"><span className="text-red-500 mt-1">▶</span> "Read this book." (Command)</li>
                            <li className="flex items-start gap-2"><span className="text-red-500 mt-1">▶</span> "This sentence is false." (Paradox)</li>
                        </ul>
                    </div>
                </div>

                <p className="text-neutral-400 font-light leading-relaxed">
                    By assigning these statements variable names like <span className="font-serif italic text-white px-1">P</span> and <span className="font-serif italic text-white px-1">Q</span>, we can stop worrying about what the sentences actually mean, and start calculating their structural truth.
                </p>
            </article>
         </div>

         {/* =========================================
             INTERACTIVE LAB
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-24">
             <div className="absolute left-[21px] md:left-[45px] top-6 w-3 h-3 rounded-full border-2 border-purple-500 bg-black ring-4 ring-black" />
             
             <div className="flex items-center gap-3 mb-8 text-purple-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <GitCommit size={16} /> [ INTERACTIVE LAB ]
             </div>

             <div className="bg-black/40 backdrop-blur-md border border-purple-500/20 rounded-3xl p-2 shadow-2xl relative">
               <div className="absolute -left-16 md:-left-28 top-1/2 w-16 md:w-28 h-px bg-purple-500/20" />
               <TruthTableLab />
             </div>
         </div>

         {/* =========================================
             THEORY: DE MORGAN'S LAWS
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-32">
             <div className="absolute left-[21px] md:left-[45px] top-6 w-3 h-3 rounded-full border-2 border-purple-500 bg-black ring-4 ring-black" />
             
             <article className="prose prose-invert prose-lg max-w-none pt-4">
                <h3 className="text-2xl font-black text-white tracking-tight mt-0">Logical Equivalence</h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                    Just like in algebra where <span className="font-mono text-white text-sm bg-white/5 px-1 rounded">x + y</span> is equivalent to <span className="font-mono text-white text-sm bg-white/5 px-1 rounded">y + x</span>, logical statements can be manipulated and simplified without changing their ultimate truth value. When two statements output the exact same Truth Table, they are <strong>logically equivalent</strong> (<span className="font-serif text-white">≡</span>).
                </p>

                <h3 className="text-2xl font-black text-white tracking-tight mt-12">De Morgan's Laws</h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                    Augustus De Morgan formalized two rules that are arguably the most important transformation tools in all of computer science. They describe how to distribute a <strong className="text-white">NOT</strong> (<span className="font-serif text-white">¬</span>) operator inside a parenthesis.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
                    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:text-purple-400 transition-colors"><Split size={64}/></div>
                        <h4 className="text-white font-bold mb-4 z-10 relative tracking-wide uppercase text-xs">Law 1: Negating an AND</h4>
                        <div className="bg-black/60 p-4 rounded-lg text-center border border-neutral-800 mb-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                            <span className="font-serif text-lg text-white tracking-widest">¬(P ∧ Q) ≡ ¬P ∨ ¬Q</span>
                        </div>
                        <p className="text-sm text-neutral-400 z-10 relative font-light leading-relaxed">
                            "If it is NOT true that (I have an Apple AND a Banana), then I must NOT have an Apple, OR I must NOT have a Banana."
                        </p>
                    </div>
                    
                    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-purple-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:text-purple-400 transition-colors"><Combine size={64}/></div>
                        <h4 className="text-white font-bold mb-4 z-10 relative tracking-wide uppercase text-xs">Law 2: Negating an OR</h4>
                        <div className="bg-black/60 p-4 rounded-lg text-center border border-neutral-800 mb-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                            <span className="font-serif text-lg text-white tracking-widest">¬(P ∨ Q) ≡ ¬P ∧ ¬Q</span>
                        </div>
                        <p className="text-sm text-neutral-400 z-10 relative font-light leading-relaxed">
                            "If it is NOT true that (I am walking OR I am running), then I am NOT walking, AND I am NOT running."
                        </p>
                    </div>
                </div>

                <p className="text-neutral-400 font-light leading-relaxed border-l-2 border-purple-500/50 pl-4">
                    Notice the beautiful symmetry: When you distribute a negation, the <span className="font-serif text-white">∧</span> flips to an <span className="font-serif text-white">∨</span>, and vice versa.
                </p>
             </article>
         </div>

         {/* =========================================
             VERIFICATION (Assessment)
         ========================================= */}
         <div className="relative pl-6 md:pl-24 pr-6">
            <div className="absolute left-[21px] md:left-[45px] top-6 w-3 h-3 rounded-full border-2 border-purple-500 bg-black ring-4 ring-black" />
            <div className="absolute left-[21px] md:left-[45px] top-8 bottom-0 w-3 bg-[#05030a]" /> {/* Cuts off the line */}

            <div className="flex items-center gap-3 mb-8 text-purple-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <CheckSquare size={16} /> [ MODULE VERIFICATION ]
            </div>

            <div className="grid grid-cols-1 gap-12">
                <div className="w-full">
                    <VocabApplet 
                      currentDomain="Prop Logic" 
                      localTerms={propLogicVocab} 
                      accentColor="purple" 
                    />
                </div>
                
                <div className="w-full">
                    <Assessment 
                        title="Knowledge Check: Propositional Logic" 
                        questions={propLogicQuiz} 
                        accentColor="purple"
                        onComplete={(score, total) => console.log(`Prop Logic Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>

            {/* FOOTER NAVIGATION */}
            <div className="mt-16 pt-10 border-t border-purple-500/20 flex flex-col sm:flex-row gap-6 justify-between items-center bg-black/20 p-6 rounded-2xl">
                <Link href="/formal-science/logic" className="text-[10px] font-black tracking-widest text-neutral-500 hover:text-white uppercase transition-colors flex items-center gap-2">
                    <ArrowLeft size={14}/> Return to Logic Hub
                </Link>
                <Link href="/formal-science/logic/first-order" className="group px-6 py-3 bg-purple-500/10 border border-purple-500/30 hover:bg-purple-500/20 rounded-xl text-xs font-black tracking-widest text-purple-400 hover:text-white uppercase transition-all flex items-center gap-3">
                    Next: First-Order Logic <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
         </div>

      </div>
    </main>
  );
}