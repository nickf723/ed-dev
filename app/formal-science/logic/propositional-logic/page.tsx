"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, GitCommit, Split, Combine, ArrowRight } from 'lucide-react';
import LogicBackground from '../_components/LogicBackground';
import TruthTableLab from './_components/TruthTableLab';
import { M } from '@/components/Math'; 
import PropositionalBackground from './_components/PropositionalBackground';

export default function PropositionalLogicPage() {
  return (
    <main className="relative min-h-screen bg-[#05030a] overflow-hidden selection:bg-purple-900/30 font-sans">
      <PropositionalBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/formal-science/logic" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Logic Hub
         </Link>

         {/* HERO SECTION */}
         <header className="mb-16">
             <div className="flex items-center gap-3 text-purple-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                 <span className="w-8 h-px bg-purple-500"></span>
                 Module 2.1
             </div>
             <h1 className="text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">
                 PROPOSITIONAL LOGIC
             </h1>
             <p className="text-xl text-neutral-400 leading-relaxed font-light">
                 Before we can build complex mathematics or computer programs, we have to define the absolute ground floor of reality. We must define what it means for a statement to be <strong className="text-purple-400">True</strong> or <strong className="text-purple-400">False</strong>.
             </p>
         </header>

         <article className="prose prose-invert prose-lg max-w-none">
            
            <h3 className="text-2xl font-black text-white tracking-tight">The Atomic Proposition</h3>
            <p className="text-neutral-400 font-light leading-relaxed">
                A <strong>proposition</strong> is simply a declarative statement that is exactly one of two things: True or False. It cannot be both, and it cannot be neither. 
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-10">
                <div className="p-6 bg-black/40 border border-neutral-800 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-green-500 tracking-widest mb-3">Valid Propositions</div>
                    <ul className="text-sm font-mono text-neutral-300 space-y-2">
                        <li>"Paris is the capital of France." (True)</li>
                        <li>"The earth is flat." (False)</li>
                        <li>"2 + 2 = 5." (False)</li>
                    </ul>
                </div>
                <div className="p-6 bg-black/40 border border-neutral-800 rounded-xl">
                    <div className="text-[10px] uppercase font-bold text-red-500 tracking-widest mb-3">Not Propositions</div>
                    <ul className="text-sm font-mono text-neutral-300 space-y-2">
                        <li>"What time is it?" (Question)</li>
                        <li>"Read this book." (Command)</li>
                        <li>"This sentence is false." (Paradox)</li>
                    </ul>
                </div>
            </div>

            <p className="text-neutral-400 font-light leading-relaxed">
                By assigning these statements variable names like <M>P</M> and <M>Q</M>, we can stop worrying about what the sentences actually mean, and start calculating their structural truth.
            </p>

            

            <div className="not-prose my-16">
                <TruthTableLab />
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight">Logical Equivalence</h3>
            <p className="text-neutral-400 font-light leading-relaxed">
                Just like in algebra where <M>x + y</M> is equivalent to <M>y + x</M>, logical statements can be manipulated and simplified without changing their ultimate truth value. When two statements output the exact same Truth Table, they are <strong>logically equivalent</strong> (<M>\equiv</M>).
            </p>

            <h3 className="text-2xl font-black text-white tracking-tight mt-12">De Morgan's Laws</h3>
            <p className="text-neutral-400 font-light leading-relaxed">
                Augustus De Morgan formalized two rules that are arguably the most important transformation tools in all of computer science. They describe how to distribute a <strong className="text-white">NOT</strong> (<M>\neg</M>) operator inside a parenthesis.
            </p>

            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
                <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Split size={64}/></div>
                    <h4 className="text-white font-bold mb-4 z-10 relative tracking-wide uppercase text-xs">Law 1: Negating an AND</h4>
                    <div className="bg-black/60 p-4 rounded-lg text-center border border-neutral-800 mb-4 shadow-inner">
                        <M display>{`\\neg(P \\land Q) \\equiv \\neg P \\lor \\neg Q`}</M>
                    </div>
                    <p className="text-sm text-neutral-400 z-10 relative font-light leading-relaxed">
                        "If it is NOT true that (I have an Apple AND a Banana), then I must NOT have an Apple, OR I must NOT have a Banana."
                    </p>
                </div>
                
                <div className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10"><Combine size={64}/></div>
                    <h4 className="text-white font-bold mb-4 z-10 relative tracking-wide uppercase text-xs">Law 2: Negating an OR</h4>
                    <div className="bg-black/60 p-4 rounded-lg text-center border border-neutral-800 mb-4 shadow-inner">
                        <M display>{`\\neg(P \\lor Q) \\equiv \\neg P \\land \\neg Q`}</M>
                    </div>
                    <p className="text-sm text-neutral-400 z-10 relative font-light leading-relaxed">
                        "If it is NOT true that (I am walking OR I am running), then I am NOT walking, AND I am NOT running."
                    </p>
                </div>
            </div>

            <p className="text-neutral-400 font-light leading-relaxed">
                Notice the beautiful symmetry: When you distribute a negation, the <M>\land</M> flips to an <M>\lor</M>, and vice versa.
            </p>

         </article>

         <div className="mt-24 pt-10 border-t border-neutral-900 flex justify-between items-center">
             <Link href="/formal-science/logic" className="text-[10px] font-black tracking-widest text-neutral-500 hover:text-white uppercase transition-colors">
                 ← Introduction
             </Link>
             <Link href="/formal-science/logic/first-order" className="text-[10px] font-black tracking-widest text-purple-500 hover:text-purple-400 uppercase transition-colors flex items-center gap-2">
                 Next: First-Order Logic <ArrowRight size={14}/>
             </Link>
         </div>

      </div>
    </main>
  );
}