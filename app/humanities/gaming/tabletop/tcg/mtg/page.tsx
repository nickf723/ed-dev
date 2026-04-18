import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Swords, BookOpen, Layers, Library, Sparkles, Cpu } from 'lucide-react';
import MtgBackground from './_components/MtgBackground';
import CommanderScoreboard from './_components/CommanderScoreboard';

const MTG_TOOLS = [
    {
        id: 'simulator',
        title: 'Combat & Interaction Simulator',
        description: 'Test complex board states, the stack, and priority passes in a controlled digital environment.',
        icon: Swords,
        color: 'red',
        href: '/humanities/gaming/tabletop/tcg/mtg/simulator' // Link to your original battle sim!
    },
    {
        id: 'collection',
        title: 'Collection & Deck Manager',
        description: 'Catalog your physical cards, analyze mana curves, and price your growing collection.',
        icon: Library,
        color: 'blue',
        href: '#' 
    },
    {
        id: 'formats',
        title: 'Format Archetypes',
        description: 'Explore the meta-game differences between Standard, Modern, Vintage, and Commander.',
        icon: Layers,
        color: 'purple',
        href: '#'
    }
];

export default function MagicTheGatheringPage() {
    return (
        <main className="relative min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-purple-500/30 overflow-x-hidden">
            
            <MtgBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/humanities/gaming/tabletop/tcg" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> TCG Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-purple-500/30 rounded-lg text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                            <Sparkles size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-purple-300/50">
                            Tabletop Design // The Progenitor
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        MAGIC: THE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-red-500">GATHERING</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Created by Richard Garfield in 1993, Magic is the grandfather of the Trading Card Game genre. It is a masterpiece of game theory, blending deep mathematical resource management with behavioral psychology.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <BookOpen className="text-blue-400" /> The Color Pie
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The brilliance of MTG lies in its core identity system: The Color Pie. The five colors of mana are not just mechanical archetypes; they are distinct philosophical viewpoints.
                            </p>
                            
                            

                            <ul className="space-y-3 mt-6 text-sm text-zinc-400 font-light border-l-2 border-white/10 pl-4">
                                <li><strong className="text-amber-100">White (W):</strong> Values peace, structure, and community.</li>
                                <li><strong className="text-blue-400">Blue (U):</strong> Values knowledge, logic, and perfection.</li>
                                <li><strong className="text-purple-400">Black (B):</strong> Values power, self-interest, and agency.</li>
                                <li><strong className="text-red-500">Red (R):</strong> Values freedom, emotion, and action.</li>
                                <li><strong className="text-green-400">Green (G):</strong> Values nature, acceptance, and destiny.</li>
                            </ul>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Cpu className="text-purple-400" /> The Stack & Priority
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                What makes Magic uniquely complex is the ability to act during your opponent's turn. This is governed by "The Stack"—a LIFO (Last In, First Out) programming concept seamlessly integrated into a tabletop game.
                            </p>

                            <div className="p-5 bg-zinc-950/80 backdrop-blur-md border border-white/10 text-sm text-zinc-300 font-mono rounded-xl shadow-inner mb-6">
                                Player A casts Lightning Bolt. <br/>
                                <span className="text-zinc-500">Wait for response...</span><br/><br/>
                                Player B responds with Counterspell.<br/>
                                <span className="text-zinc-500">Stack resolves top-down.</span><br/><br/>
                                Counterspell resolves first, negating Lightning Bolt!
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE SCOREBOARD */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <CommanderScoreboard />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: THE TOOLKIT & SIMULATORS */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Library className="text-zinc-400" /> The Planeswalker Toolkit
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Access advanced simulation and tracking utilities.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MTG_TOOLS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'red' ? 'hover:border-red-500/50' :
                                topic.color === 'blue' ? 'hover:border-blue-500/50' :
                                'hover:border-purple-500/50';
                                
                            const iconColor = 
                                topic.color === 'red' ? 'text-red-400' :
                                topic.color === 'blue' ? 'text-blue-400' :
                                'text-purple-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-zinc-950/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-black/50 rounded-xl border border-white/5 ${iconColor}`}>
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