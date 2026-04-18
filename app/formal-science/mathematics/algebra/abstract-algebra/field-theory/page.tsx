import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Box, Hexagon, Component, Grid3X3, ShieldCheck, AlertTriangle } from 'lucide-react';
import FieldTheoryBackground from './_components/FieldTheoryBackground';
import FiniteFieldLab from './_components/FiniteFieldLab';

import { M } from '@/app/_components/Math';

const ALGEBRA_MODULES = [
    {
        id: 'group-theory',
        title: 'Group Theory',
        description: 'The mathematical study of symmetry. Rubik’s cubes, crystallography, and particle physics.',
        icon: Hexagon,
        color: 'sky',
        href: '#' 
    },
    {
        id: 'ring-theory',
        title: 'Ring Theory',
        description: 'Structures with addition and multiplication, but where division might not be guaranteed.',
        icon: Grid3X3,
        color: 'purple',
        href: '#'
    },
    {
        id: 'galois-theory',
        title: 'Galois Theory',
        description: 'The beautiful bridge connecting Field Theory to Group Theory. Proving why quintic equations cannot be solved.',
        icon: Component,
        color: 'amber',
        href: '#'
    }
];

export default function FieldTheoryPage() {
    return (
        <main className="relative min-h-screen bg-[#0d0714] text-zinc-300 font-sans selection:bg-purple-500/30 overflow-x-hidden">
            
            <FieldTheoryBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/algebra" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Algebra Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-purple-500/30 rounded-lg text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Box size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-300/50">
                            Abstract Algebra // Structures
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        FIELD <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">THEORY</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        In elementary math, we study specific numbers. In Abstract Algebra, we study the rules themselves. A "Field" is the gold standard of algebra—a structure where addition, subtraction, multiplication, and division work perfectly without breaking the system.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <ShieldCheck className="text-purple-400" /> The Axioms of a Field
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                A Field (denoted as <M>{String.raw`\mathbb{F}`}</M>) requires a set of elements and two operations: <M>{String.raw`+`}</M> and <M>{String.raw`\times`}</M>. It must satisfy rigorous axioms, the most difficult being the existence of a <strong>multiplicative inverse</strong> for every non-zero element.
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-inner">
                                <M display>{String.raw`\forall a \neq 0 \in \mathbb{F}, \exists a^{-1} \text{ such that } a \cdot a^{-1} = 1`}</M>
                            </div>

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                The Rational numbers (<M>{String.raw`\mathbb{Q}`}</M>) are a field. The Integers (<M>{String.raw`\mathbb{Z}`}</M>) are <em>not</em> a field, because the multiplicative inverse of <M>{String.raw`2`}</M> is <M>{String.raw`1/2`}</M>, which is not an integer.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <AlertTriangle className="text-amber-400" /> Finite Fields (Galois Fields)
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Fields do not have to be infinite. We can create finite fields using modular ("clock") arithmetic, denoted as <M>{String.raw`GF(p)`}</M>. But there is a massive catch: <strong>the modulus must be a prime number.</strong>
                            </p>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-amber-500 text-sm text-zinc-300 font-serif italic rounded-r-xl shadow-inner mb-6">
                                If you use a composite number (like modulo 6), the system breaks. You get <strong>Zero Divisors</strong>. For example, <M>{String.raw`2 \times 3 \equiv 0 \pmod{6}`}</M>. If you can multiply two non-zero numbers and get zero, you can no longer divide safely!
                            </div>

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                Use the generator to the right. Set the modulus to <strong>5</strong> (Prime) and notice how every row has a glowing <code>1</code> (an inverse). Then set it to <strong>6</strong> (Composite) and watch the red <code>0</code> anomalies destroy the field!
                            </p>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <FiniteFieldLab />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ALGEBRAIC ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Component className="text-purple-400" /> Abstract Structures
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Ascend the hierarchy of abstract algebraic structures.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ALGEBRA_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                topic.color === 'purple' ? 'hover:border-purple-500/50' :
                                'hover:border-amber-500/50';
                                
                            const iconColor = 
                                topic.color === 'sky' ? 'text-sky-400' :
                                topic.color === 'purple' ? 'text-purple-400' :
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