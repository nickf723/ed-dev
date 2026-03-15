import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Target, Swords } from 'lucide-react';
// We are importing the fetcher directly from your gaming repository!
import SpeedInequalityLab from './_components/SpeedInequalityLab';
import InequalityBackground from './_components/InequalityBackground';

export default async function InequalitiesPage() {
    // Fetch the data on the server before the page even loads


    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-amber-500/30">
            <InequalityBackground />
            <div className="relative z-10 max-w-[75rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-zinc-800 pb-8">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Foundations of Mathematics
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-zinc-900 border border-zinc-700 rounded-lg text-amber-500 shadow-md">
                            <Calculator size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500">
                            Formal Science // Algebra
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        INEQUALITIES & <br />
                        <span className="text-zinc-500 font-light">RELATIVE MAGNITUDE</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        An equation states that two values are exactly equal. An inequality tells us about the relative size or order of two values. Understanding inequalities is the foundation of logic, sorting algorithms, and competitive state spaces.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT: THE MATH LECTURE */}
                    <div className="lg:col-span-5 space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <Target className="text-amber-500" /> The Symbols
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-6">
                                The strict inequalities denote that one variable is definitively larger or smaller than another, without the possibility of being identical.
                            </p>

                            

[Image of inequality symbols greater than and less than]


                            <div className="space-y-4 font-mono text-sm">
                                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-4">
                                    <span className="text-2xl font-black text-amber-500 border-r border-zinc-700 pr-4 w-12 text-center">&gt;</span>
                                    <div>
                                        <div className="text-white font-bold">Greater Than</div>
                                        <div className="text-zinc-500 mt-1">$x &gt; y$ (x is strictly larger than y)</div>
                                    </div>
                                </div>
                                <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-4">
                                    <span className="text-2xl font-black text-amber-500 border-r border-zinc-700 pr-4 w-12 text-center">&lt;</span>
                                    <div>
                                        <div className="text-white font-bold">Less Than</div>
                                        <div className="text-zinc-500 mt-1">$a &lt; b$ (a is strictly smaller than b)</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <Swords className="text-sky-500" /> Application: Turn Order
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                In turn-based digital combat environments, action economy is often dictated by a Speed variable. The system evaluates an inequality between two actors to determine execution order. 
                            </p>
                            <div className="p-4 bg-sky-950/20 border-l-4 border-sky-500 text-sm text-zinc-300">
                                If {'$Speed_{Actor1} > Speed_{Actor2}$'}, Actor 1 executes their action first. Multipliers (like items or spells) must be calculated algebraically before evaluating the inequality.
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: THE INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        {/* We pass the server-fetched pokedex directly into the client component */}
                        <SpeedInequalityLab />
                    </div>

                </div>

            </div>
        </main>
    );
}