"use client";
import React from "react";
import Link from "next/link";
import NumberBackground from "@/app/formal-science/mathematics/foundations/NumberBackground";
import VisualAdder from "@/app/formal-science/mathematics/foundations/VisualAdder";
import { 
  ArrowLeft, Blocks, Circle, Hash, 
  Scale, BoxSelect, Columns, Calculator
} from "lucide-react";

// 1. THE DATA STRUCTURE
// By keeping this array outside the UI, you can add new topics just by adding a new block here!
const FOUNDATION_TOPICS = [
    {
        id: 'arithmetic',
        title: 'Arithmetic',
        description: 'The four basic operations: Addition, Subtraction, Multiplication, and Division.',
        icon: Columns,
        color: 'rose',
        href: '#' // Update these as you build the pages!
    },
    {
        id: 'inequalities',
        title: 'Inequalities & Magnitude',
        description: 'Evaluating relative size. Features the Pokémon Initiative interactive lab.',
        icon: Calculator,
        color: 'amber',
        href: '/formal-science/mathematics/foundations/inequalities' // Connected to our new lab!
    },
    {
        id: 'geometry',
        title: 'Basic Shapes',
        description: 'Recognizing fundamental geometry: Circles, Polygons, and symmetry.',
        icon: Circle,
        color: 'cyan',
        href: '#'
    },
    {
        id: 'grouping',
        title: 'Grouping',
        description: 'The precursor to Set Theory. Organizing objects by shared properties.',
        icon: BoxSelect,
        color: 'yellow',
        href: '#'
    }
];

export default function FoundationsPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans selection:bg-rose-500/30">
      
      {/* VISUAL ENGINE */}
      <NumberBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#09090b]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs font-mono text-rose-500 hover:text-rose-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Mathematics
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-zinc-900 border border-rose-500/50 rounded">
                    <Blocks size={18} className="text-rose-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    FOUNDATIONS
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-rose-500/50 uppercase tracking-widest">
            Axioms & Arithmetic
         </div>
      </header>

      {/* CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE CONCEPTS */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-rose-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Axioms of Order</h2>
                            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                                Before complex equations, there was simple counting. The Peano Axioms define the natural numbers ($0, 1, 2...$) recursively: $0$ is a number, and every number has a successor ($n+1$).
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Hash size={14} className="text-rose-400" />
                                    <span className="text-xs font-mono">Integers</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Scale size={14} className="text-cyan-400" />
                                    <span className="text-xs font-mono">Equality</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DYNAMIC DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {FOUNDATION_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            // Using standard safe tailwind colors to avoid the dynamic class bug!
                            const borderHover = 
                                topic.color === 'rose' ? 'hover:border-rose-500/50' :
                                topic.color === 'amber' ? 'hover:border-amber-500/50' :
                                topic.color === 'cyan' ? 'hover:border-cyan-500/50' :
                                'hover:border-yellow-500/50';
                                
                            const iconColor = 
                                topic.color === 'rose' ? 'text-rose-500' :
                                topic.color === 'amber' ? 'text-amber-500' :
                                topic.color === 'cyan' ? 'text-cyan-500' :
                                'text-yellow-500';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-zinc-900/40 border border-white/5 p-5 rounded-xl transition-all duration-300 group ${borderHover}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        <Icon className={iconColor} size={20} />
                                        <h3 className="font-bold text-white group-hover:text-white transition-colors">{topic.title}</h3>
                                    </div>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB & PHILOSOPHY */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <VisualAdder />

                    {/* PHILOSOPHY CARD */}
                    <div className="bg-zinc-900/60 border border-white/10 rounded-xl p-6 w-full shadow-lg">
                        <h3 className="font-bold text-white mb-2">Is Math Invented or Discovered?</h3>
                        <p className="text-xs text-zinc-400 leading-relaxed">
                            When you put one rock next to another rock, you have two rocks. This truth exists regardless of whether humans are there to count them. This suggests math is the fundamental language of the universe.
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}