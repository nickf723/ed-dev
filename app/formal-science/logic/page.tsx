"use client";
import React from 'react';
import Link from 'next/link';
import { 
  GitCommit, Layers, AlertTriangle, 
  Infinity, ArrowLeft, ArrowRight,
  Calculator, SearchCode
} from 'lucide-react';
import LogicBackground from './_components/LogicBackground';
import TruthEngine from './_components/TruthEngine';
import { M } from '@/components/Math'; 

const CURRICULUM = [
  {
    id: 'propositional',
    title: 'Propositional Logic',
    subtitle: 'Boolean Algebra',
    description: 'The foundation. Analyzing the truth values of statements combined by AND, OR, and NOT. The math that powers every computer processor.',
    icon: <GitCommit size={24} className="text-purple-500" />,
    href: '/formal-science/logic/propositional-logic',
    color: 'purple'
  },
  {
    id: 'first-order',
    title: 'First-Order Logic',
    subtitle: 'Predicates & Quantifiers',
    description: 'Upgrading our rules to include "All" and "Some". Creating mathematical syntax to express complex relationships between objects.',
    icon: <SearchCode size={24} className="text-blue-500" />,
    href: '/formal-science/logic/first-order-logic',
    color: 'blue'
  },
  {
    id: 'set-theory',
    title: 'Set Theory & Paradoxes',
    subtitle: 'The Infinite',
    description: 'Venn diagrams on steroids. Exploring infinite sets, subsets, and the paradoxes that almost broke mathematics in the 20th century.',
    icon: <Infinity size={24} className="text-cyan-500" />,
    href: '/formal-science/logic/set-theory',
    color: 'cyan'
  },
  {
    id: 'fallacies',
    title: 'Informal Logic',
    subtitle: 'Cognitive Biases',
    description: 'When humans try (and fail) to use logic. Identifying Ad Hominem, Straw Man, and other structural errors in everyday argumentation.',
    icon: <AlertTriangle size={24} className="text-rose-500" />,
    href: '/formal-science/logic/fallacies',
    color: 'rose'
  }
];

export default function LogicHubPage() {
  return (
    <main className="relative min-h-screen bg-[#05030a] overflow-hidden selection:bg-purple-900/30 font-sans">
      <LogicBackground />
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         <Link href="/formal-science" className="inline-flex items-center gap-2 text-[10px] font-black tracking-widest text-neutral-500 hover:text-white mb-12 transition-colors uppercase">
             <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Back to Formal Sciences
         </Link>

         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-end">
             <div className="lg:col-span-8">
                 <div className="flex items-center gap-3 text-purple-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-purple-500"></span>
                     Formal Science 02
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
                     LOGIC
                 </h1>
                 <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed font-light">
                     The architecture of truth. Logic strips away context, emotion, and bias, leaving only the immutable framework of <strong className="text-white font-semibold">valid reasoning</strong>. It is the language required to speak to a machine.
                 </p>
             </div>
         </div>

         

         {/* CONCEPT ZERO: THE TRUTH ENGINE */}
         <div className="mb-32">
            <div className="flex items-center gap-3 mb-8">
                 <div className="w-2 h-2 bg-purple-500 animate-[pulse_1.5s_ease-out_infinite] shadow-[0_0_10px_rgba(168,85,247,0.8)]"></div>
                 <span className="text-xs font-black text-white uppercase tracking-widest">Concept Zero: Binary States</span>
            </div>
            
            <TruthEngine />
            
            <div className="text-center mt-6 text-sm text-neutral-500 italic max-w-2xl mx-auto">
                Notice the "IMPLIES" (<M>{`P \\implies Q`}</M>) logic. It is only false when <M>P</M> is True but <M>Q</M> is False. If <M>P</M> is False, the statement is technically considered True (vacuous truth), because a false premise can imply anything!
            </div>
         </div>

         {/* CURRICULUM GRID */}
         <div className="mb-24">
             <div className="flex items-center mb-10 border-b border-neutral-900 pb-4">
                 <h2 className="text-2xl font-black text-white flex items-center gap-3 tracking-tight">
                    <Layers size={24} className="text-purple-500"/> Core Modules
                 </h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {CURRICULUM.map((lesson) => (
                     <Link 
                        key={lesson.id} 
                        href={lesson.href}
                        className={`
                          group relative p-8 bg-black/40 border border-neutral-800 transition-all duration-300 flex flex-col justify-between min-h-[220px] rounded-2xl
                          hover:bg-neutral-900 hover:border-${lesson.color}-500/30
                        `}
                     >
                        <div>
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-black border border-neutral-800 rounded-xl transition-colors">
                                    {lesson.icon}
                                </div>
                                <ArrowRight size={20} className={`text-neutral-700 group-hover:text-${lesson.color}-500 transition-all group-hover:translate-x-1`} />
                            </div>
                            
                            <h3 className={`text-2xl font-bold text-white mb-2 group-hover:text-${lesson.color}-400 transition-colors`}>
                                {lesson.title}
                            </h3>
                            <div className="text-[10px] font-black font-mono text-neutral-500 uppercase tracking-widest mb-4">
                                {lesson.subtitle}
                            </div>
                            <p className="text-sm text-neutral-400 leading-relaxed font-light">
                                {lesson.description}
                            </p>
                        </div>
                     </Link>
                 ))}
             </div>
         </div>

         

         {/* NOTATION DECODER */}
         <div className="bg-[#030106] border-y border-neutral-900 py-12 px-8 lg:px-16 -mx-6 lg:-mx-12 mt-16">
             <div className="flex items-center gap-3 mb-10 max-w-7xl mx-auto">
                 <Calculator size={20} className="text-neutral-500" />
                 <h3 className="text-sm font-black text-white uppercase tracking-widest">Symbolic Decoder</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto items-start">
                 
                 {/* Basic Connectives */}
                 <div className="space-y-6">
                     <h4 className="text-purple-400 border-b border-purple-900/30 pb-2 font-mono text-sm tracking-widest uppercase">Connectives</h4>
                     <div className="space-y-4">
                         <div className="flex items-start gap-4">
                             <div className="w-8 text-xl text-white font-serif text-center mt-1"><M>\land</M></div>
                             <div>
                                 <strong className="text-white block">AND (Conjunction)</strong>
                                 <p className="text-xs text-neutral-400 mt-1">True only if both sides are True.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4">
                             <div className="w-8 text-xl text-white font-serif text-center mt-1"><M>\lor</M></div>
                             <div>
                                 <strong className="text-white block">OR (Disjunction)</strong>
                                 <p className="text-xs text-neutral-400 mt-1">True if at least one side is True.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4">
                             <div className="w-8 text-xl text-white font-serif text-center mt-1"><M>\neg</M></div>
                             <div>
                                 <strong className="text-white block">NOT (Negation)</strong>
                                 <p className="text-xs text-neutral-400 mt-1">Inverts the truth value.</p>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Implications */}
                 <div className="space-y-6">
                     <h4 className="text-blue-400 border-b border-blue-900/30 pb-2 font-mono text-sm tracking-widest uppercase">Relations</h4>
                     <div className="space-y-4">
                         <div className="flex items-start gap-4">
                             <div className="w-8 text-xl text-white font-serif text-center mt-1"><M>\implies</M></div>
                             <div>
                                 <strong className="text-white block">Implies</strong>
                                 <p className="text-xs text-neutral-400 mt-1">If the left is True, the right must be True.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4">
                             <div className="w-8 text-xl text-white font-serif text-center mt-1"><M>\iff</M></div>
                             <div>
                                 <strong className="text-white block">If and Only If (Biconditional)</strong>
                                 <p className="text-xs text-neutral-400 mt-1">Both sides must have the exact same truth value.</p>
                             </div>
                         </div>
                     </div>
                 </div>

                 {/* Quantifiers */}
                 <div className="space-y-6">
                     <h4 className="text-cyan-400 border-b border-cyan-900/30 pb-2 font-mono text-sm tracking-widest uppercase">Quantifiers</h4>
                     <div className="space-y-4">
                         <div className="flex items-start gap-4">
                             <div className="w-8 text-xl text-white font-serif text-center mt-1"><M>\forall</M></div>
                             <div>
                                 <strong className="text-white block">For All (Universal)</strong>
                                 <p className="text-xs text-neutral-400 mt-1">The statement is true for every element in the domain.</p>
                             </div>
                         </div>
                         <div className="flex items-start gap-4">
                             <div className="w-8 text-xl text-white font-serif text-center mt-1"><M>\exists</M></div>
                             <div>
                                 <strong className="text-white block">There Exists (Existential)</strong>
                                 <p className="text-xs text-neutral-400 mt-1">There is at least one element where the statement is true.</p>
                             </div>
                         </div>
                     </div>
                 </div>

             </div>
         </div>

      </div>
    </main>
  );
}