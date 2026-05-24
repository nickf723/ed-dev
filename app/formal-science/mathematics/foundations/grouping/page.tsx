"use client";
import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, Boxes, GripHorizontal, 
    DivideSquare, CheckCircle2, ArrowRight
} from 'lucide-react';
import GroupingBackground from './_components/GroupingBackground';
import PokemonGroupingLab from './_components/PokemonGroupingLab';

export default function GroupingPage() {
    return (
        <main className="relative min-h-screen bg-[#0a0f14] text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden pb-32">
            
            <GroupingBackground />

            <div className="relative z-10 max-w-[55rem] mx-auto px-6 py-12 md:py-20">
                
                {/* =========================================
                    HEADER
                ========================================= */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-emerald-500 hover:text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                        <ArrowLeft size={14} /> Back to Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                            <Boxes size={32} />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                            Core Unit 06
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-lg">
                        SETS & <br />
                        <span className="text-zinc-500 font-light">GROUPING</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-medium max-w-3xl leading-relaxed">
                        Addition is great for counting a few items, but what happens when you have hundreds? Grouping allows us to bundle items into neat sets, transforming slow counting into lightning-fast math.
                    </p>
                </header>

                {/* =========================================
                    CHAPTER 1: THE FAST WAY TO ADD
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
                            <GripHorizontal size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Shortcut</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            Imagine you want to count the wheels on 5 cars. You could count them one by one: 1, 2, 3, 4, 5... all the way to 20. But that takes forever!
                        </p>
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            Instead, you notice a pattern. Every car has exactly 4 wheels. You have 5 cars. This means you have <strong>5 groups of 4</strong>. Instead of counting individually, you can use <strong>Multiplication (×)</strong>, which is just a super-fast shortcut for adding the same number over and over again.
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 bg-black/40 p-6 rounded-2xl border border-white/5">
                            <div className="text-center">
                                <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-2">Repeated Addition</div>
                                <div className="text-2xl font-mono text-white">4 + 4 + 4 + 4 + 4 <span className="text-amber-400">= 20</span></div>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/10" />
                            <div className="text-center">
                                <div className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-2">Multiplication</div>
                                <div className="text-2xl font-mono text-white">5 × 4 <span className="text-amber-400">= 20</span></div>
                            </div>
                        </div>
                    </div>
                    
                    
                </section>

                {/* =========================================
                    CHAPTER 2: INTERACTIVE LAB
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <Boxes size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Building Arrays</h2>
                    </div>
                    
                    <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                        An <strong>Array</strong> is a set of items arranged in rows and columns. It is the best way to visualize multiplication! Let's build some arrays using the Pokémon Daycare system below.
                    </p>

                    <div className="relative">
                        <div className="absolute -top-4 left-8 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg z-20">
                            Interactive Lab
                        </div>
                        <PokemonGroupingLab />
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 3: FAIR SHARING
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/30">
                            <DivideSquare size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Art of Division</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            If Multiplication is bundling things together, <strong>Division (÷)</strong> is breaking them apart. But there is a catch: you have to break them apart <em>fairly</em>.
                        </p>
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            Imagine you have 15 pieces of candy and 3 friends. You want to give each friend the exact same amount. You are taking a big group and splitting it into 3 smaller, equal groups.
                        </p>

                        <div className="p-6 bg-black/40 rounded-2xl border border-rose-500/20 flex flex-col items-center justify-center text-center">
                            <div className="text-2xl font-mono text-white mb-2">15 ÷ 3 <span className="text-rose-400">= 5</span></div>
                            <p className="text-sm text-zinc-400">Total Candy ÷ Number of Friends = Candy per Friend</p>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    MODULE COMPLETION
                ========================================= */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <CheckCircle2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">Unit Complete!</h3>
                            <p className="text-zinc-400">You are ready to group and share anything in the world.</p>
                        </div>
                    </div>
                    
                    <Link href="/formal-science/mathematics/foundations/statistics" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-emerald-100 transition-colors">
                        Next: Data Analysis <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </main>
    );
}