import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Variable, Shapes, Network, Layers } from 'lucide-react';
import ArithmeticBackground from './_components/ArithmeticBackground';
import VisualAdder from './_components/VisualAdder';

// Import your custom Math Renderer
import { M } from '@/app/_components/Math';

const MATH_MODULES = [
    {
        id: 'algebra-1',
        title: 'Algebra 1',
        description: 'Introduce variables to generalize arithmetic. Solve for unknowns using balancing algorithms.',
        icon: Variable,
        color: 'fuchsia',
        href: '#' // E.g., /formal-science/mathematics/algebra-1
    },
    {
        id: 'geometry',
        title: 'Euclidean Geometry',
        description: 'Shapes, angles, proofs, and navigating the 2D coordinate plane.',
        icon: Shapes,
        color: 'cyan',
        href: '#'
    },
    {
        id: 'logic',
        title: 'Formal Logic',
        description: 'Boolean algebra, truth tables, and the absolute laws of deductive reasoning.',
        icon: Network,
        color: 'amber',
        href: '#'
    }
];

export default function ArithmeticPage() {
    return (
        <main className="relative min-h-screen bg-[#05000a] text-zinc-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            
            <ArithmeticBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Mathematics Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                            <Calculator size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/50">
                            Foundations // Number Theory
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        ARITHMETIC & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-400">BASE-10</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        The art of counting. Before we can solve for X, map the stars, or build artificial neural networks, we have to agree on exactly what a number is, and how to combine them.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Calculator className="text-cyan-400" /> The Peano Axioms
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                How do you prove that 1 + 1 = 2? In 1889, mathematician Giuseppe Peano defined all of natural arithmetic using just a starting number (0) and a "Successor Function" <M>{String.raw`S(n)`}</M> which simply means "the next number."
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex flex-col items-center gap-2 text-white mb-6 shadow-inner font-mono text-sm">
                                <div><M>{String.raw`1 = S(0)`}</M></div>
                                <div><M>{String.raw`2 = S(1) = S(S(0))`}</M></div>
                            </div>
                            
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Addition is just rapidly applying the successor function. <M>{String.raw`5 + 3`}</M> is just asking the universe for the successor of 5, three times in a row.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Layers className="text-fuchsia-400" /> The Base-10 Trap
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Because humans have ten fingers, we decided to group our numbers into buckets of ten. We only have symbols for 0 through 9. What happens when we have ten items? 
                            </p>
                            
                            

                            <div className="p-5 bg-black/40 border-l-4 border-fuchsia-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                We ran out of symbols, so we had to invent "Place Value." We bundle those ten single units together, move them one space to the left, and call it a "Ten." This algorithm is known as <strong>carrying</strong>.
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <VisualAdder />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ROAD TO ALGEBRA */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Variable className="text-cyan-400" /> The Bridge to Algebra
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Once you master constants, you are ready to manipulate unknowns.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MATH_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'cyan' ? 'hover:border-cyan-500/50' :
                                topic.color === 'fuchsia' ? 'hover:border-fuchsia-500/50' :
                                'hover:border-amber-500/50';
                                
                            const iconColor = 
                                topic.color === 'cyan' ? 'text-cyan-400' :
                                topic.color === 'fuchsia' ? 'text-fuchsia-400' :
                                'text-amber-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-white/5 rounded-xl ${iconColor}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-2 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}