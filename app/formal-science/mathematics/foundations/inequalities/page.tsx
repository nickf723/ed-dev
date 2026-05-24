"use client";
import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, Calculator, Target, Swords, 
    Maximize2, ArrowRightLeft, CheckCircle2,
    ArrowRight
} from 'lucide-react';

import SpeedInequalityLab from './_components/SpeedInequalityLab';
import InequalityBackground from './_components/InequalityBackground';

export default function InequalitiesPage() {
    return (
        <main className="relative min-h-screen bg-[#09090b] text-zinc-300 font-sans selection:bg-amber-500/30 overflow-x-hidden pb-32">
            
            <InequalityBackground />
            
            <div className="relative z-10 max-w-[55rem] mx-auto px-6 py-12 md:py-24">
                
                {/* =========================================
                    HEADER
                ========================================= */}
                <header className="mb-16 border-b border-zinc-800/50 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors bg-amber-500/10 px-4 py-2 rounded-full border border-amber-500/20">
                        <ArrowLeft size={14} /> Back to Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                            <Calculator size={32} />
                        </span>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-500">
                            Core Unit 03
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-lg leading-none">
                        MAGNITUDE & <br />
                        <span className="text-zinc-500 font-light">INEQUALITIES</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-medium max-w-3xl leading-relaxed">
                        An equation tells us that two things are exactly the same. But the real world is rarely perfectly equal. Inequalities let us compare the sizes, weights, and speeds of different things to see which one comes out on top.
                    </p>
                </header>

                {/* =========================================
                    CHAPTER 1: WHAT IS MAGNITUDE?
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
                            <Maximize2 size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Concept of Magnitude</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            <strong>Magnitude</strong> is just a mathematical word for "size" or "amount." When we look at two numbers, we are really looking at their magnitude.
                        </p>
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            If you have 100 gold coins and your friend has 5 gold coins, your pile has a much larger magnitude. Math gives us a special set of symbols to write this comparison down quickly without using words.
                        </p>

                        <div className="flex items-center justify-center gap-8 p-6 bg-black/40 rounded-2xl border border-white/5">
                            <div className="w-24 h-24 rounded-full bg-amber-500/20 border border-amber-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                                <span className="font-black text-3xl text-amber-400">100</span>
                            </div>
                            <span className="text-zinc-600 font-black text-3xl">vs</span>
                            <div className="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                                <span className="font-black text-lg text-sky-400">5</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 2: THE SYMBOLS
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/30">
                            <Target size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Operators</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="p-8 bg-zinc-900/80 border border-white/5 rounded-3xl flex flex-col gap-4">
                            <span className="text-6xl font-black text-amber-500 w-12 text-center drop-shadow-md">&gt;</span>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Greater Than</h3>
                                <p className="text-zinc-400 font-medium mb-4">The open, wider side of the symbol always points to the larger number.</p>
                                <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-center font-mono text-lg">
                                    <span className="text-white">100</span> <span className="text-amber-500 px-2">&gt;</span> <span className="text-white">5</span>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-zinc-900/80 border border-white/5 rounded-3xl flex flex-col gap-4">
                            <span className="text-6xl font-black text-sky-500 w-12 text-center drop-shadow-md">&lt;</span>
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-2">Less Than</h3>
                                <p className="text-zinc-400 font-medium mb-4">The tiny, pointed end of the symbol always points to the smaller number.</p>
                                <div className="bg-black/50 p-3 rounded-xl border border-white/5 text-center font-mono text-lg">
                                    <span className="text-white">5</span> <span className="text-sky-500 px-2">&lt;</span> <span className="text-white">100</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 3: THE NUMBER LINE TRICK
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <ArrowRightLeft size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Negative Illusion</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            Inequalities get tricky when we drop below zero. At first glance, the number <span className="font-bold text-white">100</span> looks much bigger than <span className="font-bold text-white">2</span>. 
                        </p>
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            But what if it is <span className="text-rose-400 font-bold">-100</span>? Imagine temperatures: 2 degrees is cold, but -100 degrees is freezing! On a number line, any number further to the right is <strong>greater</strong>.
                        </p>

                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 text-center">
                            <div className="font-mono text-2xl font-bold mb-2">
                                <span className="text-rose-400">-100</span> <span className="text-emerald-500 px-4">&lt;</span> <span className="text-white">2</span>
                            </div>
                            <p className="text-sm text-zinc-500 uppercase tracking-widest font-bold">Negative 100 is less than 2</p>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 4: APPLICATION LAB
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                            <Swords size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Application: Turn Order</h2>
                    </div>

                    <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                        In turn-based digital combat environments, action economy is completely dictated by evaluating an inequality. The system compares the Speed variable of two actors, and whoever has the <strong>greater</strong> magnitude gets to strike first!
                    </p>

                    <div className="bg-black/40 backdrop-blur-xl border border-indigo-500/20 p-4 md:p-8 rounded-[2rem] shadow-2xl relative">
                        <div className="absolute -top-3 left-8 bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Interactive Lab
                        </div>
                        
                        {/* THE POKEMON LAB COMPONENT */}
                        <div className="mt-4">
                             <SpeedInequalityLab />
                        </div>
                    </div>
                </section>

                {/* =========================================
                    MODULE COMPLETION
                ========================================= */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">Unit Complete!</h3>
                            <p className="text-zinc-400">You've mastered sizes, symbols, and combat logic.</p>
                        </div>
                    </div>
                    
                    <Link href="/formal-science/mathematics/foundations/geometry" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-amber-100 transition-colors">
                        Next: Basic Geometry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </main>
    );
}