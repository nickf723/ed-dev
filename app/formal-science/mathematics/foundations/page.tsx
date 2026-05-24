"use client";
import React from "react";
import Link from "next/link";
import NumberBackground from "./_components/NumberBackground";
import VisualAdder from "./_components/VisualAdder";
import { 
  ArrowLeft, Blocks, Circle, Hash, 
  Scale, BoxSelect, Columns, Calculator,
  PieChart, Ruler, Variable, BookOpen, 
  CheckSquare, ChevronRight, Activity, Network
} from "lucide-react";
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";

import { foundationsVocab } from "@/app/_data/vocab/m/math-foundations";
import { foundationsQuiz } from "./_components/assessment";

// 1. THE EXPANDED K-8 CURRICULUM (Removed Grid Spans)
const FOUNDATION_TOPICS = [
    {
        id: 'arithmetic', title: 'Arithmetic',
        description: 'The absolute core: Addition, Subtraction, Multiplication, and Division.',
        icon: Columns, color: 'text-rose-400', border: 'border-rose-500/30', bg: 'hover:bg-rose-950/20',
        href: '/formal-science/mathematics/foundations/arithmetic'
    },
    {
        id: 'fractions', title: 'Fractions & Ratios',
        description: 'Parts of a whole. Decimals, percentages, and proportional reasoning.',
        icon: PieChart, color: 'text-orange-400', border: 'border-orange-500/30', bg: 'hover:bg-orange-950/20',
        href: '/formal-science/mathematics/foundations/fractions'
    },
    {
        id: 'inequalities', title: 'Magnitude',
        description: 'Evaluating relative size. Greater than, less than, and the number line.',
        icon: Calculator, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'hover:bg-amber-950/20',
        href: '/formal-science/mathematics/foundations/inequalities'
    },
    {
        id: 'geometry', title: 'Basic Geometry',
        description: 'Recognizing fundamental shapes: Circles, Polygons, angles, and symmetry.',
        icon: Circle, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'hover:bg-cyan-950/20',
        href: '/formal-science/mathematics/foundations/geometry'
    },
    {
        id: 'measurement', title: 'Measurement',
        description: 'Units, telling time, and mapping the Cartesian coordinate plane.',
        icon: Ruler, color: 'text-blue-400', border: 'border-blue-500/30', bg: 'hover:bg-blue-950/20',
        href: '/formal-science/mathematics/foundations/measurement'
    },
    {
        id: 'grouping', title: 'Sets & Grouping',
        description: 'The precursor to Set Theory. Organizing objects by shared properties.',
        icon: BoxSelect, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'hover:bg-emerald-950/20',
        href: '/formal-science/mathematics/foundations/grouping'
    },
    {
        id: 'statistics', title: 'Data Analysis',
        description: 'Collecting and charting data to make informed predictions about the world.',
        icon: Hash, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'hover:bg-indigo-950/20',
        href: '/formal-science/mathematics/foundations/statistics'
    }
];

export default function FoundationsPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans selection:bg-rose-500/30">
      
      {/* VISUAL ENGINE */}
      <NumberBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* FLOATING HEADER */}
      <header className="relative z-20 flex flex-col md:flex-row md:items-center justify-between px-6 py-6 border-b border-white/5 bg-[#09090b]/80 backdrop-blur-xl sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-[10px] font-black text-rose-500 hover:text-white bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 rounded-full transition-all uppercase tracking-widest border border-rose-500/20">
                <ArrowLeft size={12} /> Math Hub
             </Link>
             <div className="hidden md:block h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-2 bg-black border border-rose-500/30 rounded-lg shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                    <Blocks size={18} className="text-rose-500" />
                 </div>
                 <div>
                    <h1 className="text-lg font-black text-white tracking-widest uppercase">Foundations</h1>
                    <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">K-8 Curriculum</div>
                 </div>
             </div>
         </div>
         
         <div className="hidden lg:flex gap-4">
            <div className="px-4 py-1.5 border border-white/5 bg-black/40 rounded flex gap-3 text-[10px] uppercase font-bold tracking-widest text-zinc-400 items-center">
                <Activity size={12} className="text-rose-500"/> Modules: <span className="text-white">08</span>
            </div>
         </div>
      </header>

      <div className="relative z-10 max-w-[1000px] mx-auto px-6 py-12">
        
        {/* =========================================
            ZONE 1: THEORY HERO
        ========================================= */}
        <div className="mb-16">
            <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 relative overflow-hidden group shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full bg-rose-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                
                <div className="relative z-10 max-w-3xl">
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold text-rose-500 tracking-widest mb-6 border-b border-rose-500/20 pb-2 inline-flex">
                        <BookOpen size={14} /> The Axioms of Order
                    </div>
                    
                    <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">The Origin of Mathematics</h2>
                    
                    <p className="text-base text-zinc-300 font-light leading-relaxed mb-6">
                        Before complex equations, there was simple counting. The <strong>Peano Axioms</strong> define the natural numbers recursively: 0 is a number, and every number has a successor (n+1).
                    </p>
                    
                    <blockquote className="text-sm text-zinc-400 font-light leading-relaxed italic border-l-2 border-rose-500/30 pl-4 py-1">
                        "When you put one rock next to another rock, you have two rocks. This truth exists regardless of whether humans are there to count them, suggesting math is the fundamental language of the universe."
                    </blockquote>
                </div>
            </div>
        </div>

        {/* =========================================
            ZONE 2: THE SKILL TREE (Curriculum)
        ========================================= */}
        <div className="flex items-center gap-3 mb-12">
            <div className="h-4 w-1 bg-rose-500 rounded-full" />
            <h2 className="text-sm font-bold text-rose-300 uppercase tracking-widest">The Curriculum Path</h2>
        </div>

        <div className="relative pl-6 md:pl-12 mb-24">
            {/* The Vertical Spine */}
            <div className="absolute left-[11px] md:left-[23px] top-4 bottom-4 w-1 bg-gradient-to-b from-rose-500/50 via-rose-500/10 to-transparent rounded-full" />

            <div className="flex flex-col gap-6">
                {FOUNDATION_TOPICS.map((topic, i) => (
                    <div key={topic.id} className="relative">
                        {/* The Node on the spine */}
                        <div className={`absolute -left-[30px] md:-left-[42px] top-6 w-4 h-4 rounded-full border-4 border-[#09090b] bg-black shadow-[0_0_10px_rgba(244,63,94,0.5)] z-10 flex items-center justify-center`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${topic.color.replace('text-', 'bg-')}`} />
                        </div>

                        {/* The Horizontal Card */}
                        <Link 
                            href={topic.href}
                            className={`
                                group flex flex-col md:flex-row items-start md:items-center justify-between p-6 border border-white/5 bg-black/40 rounded-2xl backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 overflow-hidden
                                ${topic.bg} ${topic.border.replace('border-', 'hover:border-')}
                            `}
                        >
                            <div className="flex items-center gap-6 relative z-10 w-full">
                                <div className={`p-4 rounded-xl bg-black border border-white/10 shadow-inner transition-colors group-hover:bg-white/5 shrink-0 ${topic.color}`}>
                                    <topic.icon size={28} strokeWidth={1.5} />
                                </div>
                                
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-white/5 ${topic.color}`}>MOD_0{i+1}</span>
                                        <h2 className="text-xl font-bold text-white group-hover:text-rose-100 transition-colors">{topic.title}</h2>
                                    </div>
                                    <p className="text-sm text-zinc-400 font-sans leading-relaxed mt-1">
                                        {topic.description}
                                    </p>
                                </div>
                                
                                <div className="hidden md:flex shrink-0 p-3 rounded-full bg-white/5 text-zinc-500 group-hover:text-white group-hover:bg-rose-500/20 transition-all">
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>

        {/* =========================================
            ZONE 3: SIMULATION DECK
        ========================================= */}
        <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-rose-500 rounded-full" />
            <h2 className="text-sm font-bold text-rose-300 uppercase tracking-widest">Interactive Laboratory</h2>
        </div>
        
        <div className="bg-black/60 backdrop-blur-xl border border-rose-500/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden mb-24">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(244,63,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(244,63,94,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
            
            <div className="relative z-10">
                 <VisualAdder />
            </div>
        </div>

        {/* =========================================
            ZONE 4: VERIFICATION PROTOCOL
        ========================================= */}
        <div className="flex items-center gap-3 mb-8">
            <div className="h-4 w-1 bg-rose-500 rounded-full" />
            <h2 className="text-sm font-bold text-rose-300 uppercase tracking-widest">Verification Protocol</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="lg:col-span-1">
                <VocabApplet currentDomain="Math Foundations" localTerms={foundationsVocab || []} accentColor="rose" />
            </div>
            <div className="lg:col-span-2">
                <Assessment title="Knowledge Check: K-8 Arithmetic" questions={foundationsQuiz || []} accentColor="rose" onComplete={(score, total) => console.log(`Foundations Quiz Scored: ${score}/${total}`)} />
            </div>
        </div>

      </div>
    </main>
  );
}