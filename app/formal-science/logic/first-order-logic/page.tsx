"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, SearchCode, Database, Settings2, CheckSquare, ArrowRight, Waypoints } from 'lucide-react';
import LogicBackground from './_components/FirstOrderBackground';
import { M } from '@/app/_components/Math'; 
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";
import PredicateMapper from './_components/PredicateMapper';

// Data Imports
import { folQuiz } from "./_components/assessment";
import { firstOrderVocab } from "@/app/_data/vocab/f/first-order-logic";

export default function FirstOrderLogicPage() {
  return (
    <main className="relative min-h-screen bg-[#05030a] overflow-hidden selection:bg-blue-900/30 font-sans pb-32">
      <LogicBackground />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
      
      <div className="relative z-10 max-w-[1000px] mx-auto pt-24">
         
         {/* THE DEDUCTION THREAD (Vertical Spine) - Blue Theme! */}
         <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent pointer-events-none" />

         {/* =========================================
             HEADER
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-24">
             {/* Node */}
             <div className="absolute left-[21px] md:left-[45px] top-4 w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] ring-4 ring-black" />
             
             <Link href="/formal-science/logic" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-blue-400 mb-8 transition-colors uppercase border border-neutral-800 hover:border-blue-500/30 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                 <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Logic Hub
             </Link>

             <div className="flex items-center gap-3 text-blue-500 mb-4 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                 <SearchCode size={14} />
                 <span>[ MODULE 02 ]</span>
                 <span className="w-12 h-px bg-blue-500/50"></span>
             </div>
             
             <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none drop-shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                 FIRST-ORDER LOGIC
             </h1>
             <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                 Propositional logic is rigid. We cannot express "All men are mortal" using just a <span className="font-serif italic px-1">P</span> and a <span className="font-serif italic px-1">Q</span>. We must upgrade our syntax to include <strong className="text-blue-400">Variables</strong>, <strong className="text-blue-400">Predicates</strong>, and <strong className="text-blue-400">Quantifiers</strong>.
             </p>
         </div>

         {/* =========================================
             THEORY: PREDICATES & DOMAINS
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-24">
            <div className="absolute left-[21px] md:left-[45px] top-2 w-3 h-3 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />
            
            <article className="prose prose-invert prose-lg max-w-none">
                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 mt-0">
                   <Settings2 size={20} className="text-blue-500" /> Predicates: Logic as a Function
                </h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                    In basic logic, "5 is prime" is a static proposition. It is simply True. But what about "<span className="font-serif italic">x</span> is prime"? This is not a proposition; it's a <strong>Predicate</strong>. Its truth value depends entirely on what we plug in for <span className="font-serif italic px-1">x</span>. 
                </p>
                <p className="text-neutral-400 font-light leading-relaxed">
                    We write predicates like mathematical functions: <span className="font-serif text-blue-300">P(x)</span>.
                </p>

                <div className="my-10 p-6 bg-black/40 border border-neutral-800 rounded-xl">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-blue-500 tracking-widest mb-4">
                        <Database size={14} /> The Domain of Discourse
                    </div>
                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-0">
                        Before we evaluate <span className="font-serif text-white px-1">P(x)</span>, we must define what <span className="font-serif text-white px-1">x</span> is allowed to be. This is the <strong>Domain of Discourse</strong>. If our domain is "all integers," then <span className="font-serif text-white px-1">P(5)</span> is True, and <span className="font-serif text-white px-1">P(4)</span> is False. If our domain is "cars," the predicate breaks!
                    </p>
                </div>
            </article>
         </div>

         {/* =========================================
             INTERACTIVE LAB: PREDICATE MAPPER
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-24">
             <div className="absolute left-[21px] md:left-[45px] top-6 w-3 h-3 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />
             
             <div className="flex items-center gap-3 mb-8 text-blue-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <Waypoints size={16} /> [ INTERACTIVE LAB ]
             </div>

             <div className="bg-black/40 backdrop-blur-md border border-blue-500/20 rounded-3xl p-2 shadow-[0_0_40px_rgba(59,130,246,0.1)] relative">
               <div className="absolute -left-16 md:-left-28 top-1/2 w-16 md:w-28 h-px bg-blue-500/20" />
               <PredicateMapper />
             </div>
         </div>

         {/* =========================================
             THEORY: QUANTIFIERS
         ========================================= */}
         <div className="relative pl-16 md:pl-28 pr-6 mb-32">
             <div className="absolute left-[21px] md:left-[45px] top-6 w-3 h-3 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />
             
             <article className="prose prose-invert prose-lg max-w-none pt-4">
                <h3 className="text-2xl font-black text-white tracking-tight mt-0">The Quantifiers</h3>
                <p className="text-neutral-400 font-light leading-relaxed">
                    Now that we have variables and predicates, we need a way to make blanket statements about them. We do this by "binding" the variables with <strong>Quantifiers</strong>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
                    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:text-blue-400 transition-colors font-serif text-8xl leading-none">∀</div>
                        <h4 className="text-white font-bold mb-4 z-10 relative tracking-wide uppercase text-xs">The Universal Quantifier</h4>
                        <div className="bg-black/60 p-4 rounded-lg text-center border border-neutral-800 mb-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                            <span className="font-serif text-lg text-white tracking-widest">∀x P(x)</span>
                        </div>
                        <p className="text-sm text-neutral-400 z-10 relative font-light leading-relaxed">
                            "For ALL x, P(x) is true." This is functionally equivalent to a massive chain of <span className="font-serif text-blue-300 px-1">AND</span> gates covering the entire domain.
                        </p>
                    </div>
                    
                    <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group hover:border-blue-500/50 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:text-blue-400 transition-colors font-serif text-8xl leading-none pt-6">∃</div>
                        <h4 className="text-white font-bold mb-4 z-10 relative tracking-wide uppercase text-xs">The Existential Quantifier</h4>
                        <div className="bg-black/60 p-4 rounded-lg text-center border border-neutral-800 mb-4 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                            <span className="font-serif text-lg text-white tracking-widest">∃x P(x)</span>
                        </div>
                        <p className="text-sm text-neutral-400 z-10 relative font-light leading-relaxed">
                            "There EXISTS an x where P(x) is true." This is functionally equivalent to a massive chain of <span className="font-serif text-blue-300 px-1">OR</span> gates covering the domain.
                        </p>
                    </div>
                </div>
             </article>
         </div>

         {/* =========================================
             VERIFICATION (Assessment)
         ========================================= */}
         <div className="relative pl-6 md:pl-24 pr-6">
            <div className="absolute left-[21px] md:left-[45px] top-6 w-3 h-3 rounded-full border-2 border-blue-500 bg-black ring-4 ring-black" />
            <div className="absolute left-[21px] md:left-[45px] top-8 bottom-0 w-3 bg-[#05030a]" /> {/* Cuts off the line */}

            <div className="flex items-center gap-3 mb-8 text-blue-400 font-mono text-xs font-bold tracking-widest uppercase">
                 <CheckSquare size={16} /> [ MODULE VERIFICATION ]
            </div>

            <div className="grid grid-cols-1 gap-12">
                <div className="w-full">
                    <VocabApplet 
                      currentDomain="First-Order Logic" 
                      localTerms={firstOrderVocab} 
                      accentColor="blue" 
                    />
                </div>
                
                <div className="w-full">
                    <Assessment 
                        title="Knowledge Check: First-Order Logic" 
                        questions={folQuiz} 
                        accentColor="blue"
                        onComplete={(score, total) => console.log(`FOL Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>

            {/* FOOTER NAVIGATION */}
            <div className="mt-16 pt-10 border-t border-blue-500/20 flex flex-col sm:flex-row gap-6 justify-between items-center bg-black/20 p-6 rounded-2xl">
                <Link href="/formal-science/logic/propositional-logic" className="text-[10px] font-black tracking-widest text-neutral-500 hover:text-white uppercase transition-colors flex items-center gap-2">
                    <ArrowLeft size={14}/> Previous: Propositional
                </Link>
                <Link href="/formal-science/logic/set-theory" className="group px-6 py-3 bg-blue-500/10 border border-blue-500/30 hover:bg-blue-500/20 rounded-xl text-xs font-black tracking-widest text-blue-400 hover:text-white uppercase transition-all flex items-center gap-3">
                    Next: Set Theory & Paradoxes <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
         </div>

      </div>
    </main>
  );
}