import React from 'react';
import Link from 'next/link';
import { ArrowLeft, GripHorizontal, Boxes, DivideSquare, Calculator } from 'lucide-react';
import GroupingBackground from './_components/GroupingBackground';
import PokemonGroupingLab from './_components/PokemonGroupingLab';

const MATH_MODULES = [
    {
        id: 'fractions',
        title: 'Fractions',
        description: 'What happens when a group is divided, but it doesn\'t split perfectly evenly?',
        icon: DivideSquare,
        color: 'sky',
        href: '#'
    },
    {
        id: 'algebra',
        title: 'Pre-Algebra',
        description: 'Using letters to represent unknown group sizes and discovering patterns.',
        icon: Calculator,
        color: 'fuchsia',
        href: '#'
    }
];

export default function GroupingPage() {
    return (
        <main className="relative min-h-screen bg-[#0a0f14] text-zinc-300 font-sans selection:bg-rose-500/30 overflow-x-hidden">
            
            <GroupingBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Mathematical Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-rose-500/30 rounded-lg text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                            <Boxes size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-300/50">
                            Foundations // Multiplication & Division
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        GROUPING & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">SETS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Addition is great for counting a few items, but what happens when you have hundreds? Grouping allows us to bundle items into equal sets. It is the core logic that transforms slow addition into lightning-fast multiplication.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <GripHorizontal className="text-amber-400" /> Building Arrays
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                An <strong>Array</strong> is just a set of items arranged in rows and columns. Instead of counting every single item one by one, you just count how many rows there are, and how many items are in each row.
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl mb-6 text-sm text-zinc-300 flex items-center justify-between">
                                <div>
                                    <div className="flex gap-2 mb-2"><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/></div>
                                    <div className="flex gap-2 mb-2"><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/></div>
                                    <div className="flex gap-2"><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/><div className="w-3 h-3 bg-amber-500 rounded-full"/></div>
                                </div>
                                <div className="text-right font-mono text-zinc-500">
                                    3 rows<br/>of 4
                                </div>
                            </div>
                            
                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                This array shows 3 groups of 4. We can write this as repeated addition (<strong>4 + 4 + 4 = 12</strong>) or as multiplication (<strong>3 x 4 = 12</strong>).
                            </p>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <DivideSquare className="text-rose-400" /> The Art of Division
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Division is just multiplication in reverse. If multiplication is taking equal groups and finding the total, division is taking a total and finding out how many fit into equal groups.
                            </p>

                            <div className="p-5 bg-black/40 border-l-4 border-rose-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                If you have a total of <strong>12</strong> items, and you need to put them into <strong>3</strong> equal groups, how many items go into each group? You have to divide the total by the number of groups!
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <PokemonGroupingLab />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Calculator className="text-rose-400" /> Beyond Whole Numbers
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">What happens when the groups don't fit perfectly together?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {MATH_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-fuchsia-500/50';
                                
                            const iconColor = 
                                topic.color === 'sky' ? 'text-sky-400' :
                                'text-fuchsia-400';

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