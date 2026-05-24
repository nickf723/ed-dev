"use client";
import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, PieChart, Sparkles, Scissors, 
    Pizza, ArrowRight, ArrowLeftRight
} from 'lucide-react';

// Reuse the playful floating symbols background from Arithmetic!
import FractionsBackground from './_components/FractionsBackground';
import FractionVisualizer from './_components/FractionVisualizer';

export default function FractionsContentPage() {
    return (
        <main className="relative min-h-screen bg-[#0f0e17] text-zinc-200 font-sans selection:bg-orange-500/30 overflow-x-hidden pb-32">
            
            <FractionsBackground />

            <div className="relative z-10 max-w-[55rem] mx-auto px-6 py-12 md:py-20">
                
                {/* =========================================
                    HEADER
                ========================================= */}
                <header className="mb-16 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors bg-orange-500/10 px-4 py-2 rounded-full border border-orange-500/20">
                        <ArrowLeft size={14} /> Back to Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.15)]">
                            <PieChart size={32} />
                        </span>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-orange-400">
                            Core Unit 02
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
                        FRACTIONS
                    </h1>
                    <p className="text-xl text-zinc-300 font-medium leading-relaxed">
                        What happens when you don't have a whole number? Welcome to the world of pieces, slices, and sharing things perfectly.
                    </p>
                </header>

                {/* =========================================
                    CHAPTER 1: THE ANATOMY OF A FRACTION
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 border border-orange-500/30">
                            <Scissors size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Top & Bottom</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            A fraction is just a clever way of writing down how much of something you have when it has been chopped up. It is always made of two parts separated by a line.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-2xl">
                                <h3 className="text-2xl font-black text-orange-400 mb-2">Numerator</h3>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-orange-300 mb-4">The Top Number</div>
                                <p className="text-zinc-300 font-medium">This tells you <strong>how many slices you actually have</strong>. (e.g., "I ate 3 slices.")</p>
                            </div>
                            
                            <div className="bg-blue-500/10 border border-blue-500/30 p-6 rounded-2xl">
                                <h3 className="text-2xl font-black text-blue-400 mb-2">Denominator</h3>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-blue-300 mb-4">The Bottom Number</div>
                                <p className="text-zinc-300 font-medium">This tells you <strong>how many equal slices make up the whole thing</strong>. (e.g., "The pizza was cut into 8 pieces.")</p>
                            </div>
                        </div>
                    </div>

                    {/* INTERACTIVE LAB */}
                    <div className="bg-black/40 backdrop-blur-xl border border-orange-500/20 p-4 md:p-8 rounded-[2rem] shadow-2xl relative">
                        <div className="absolute -top-3 left-8 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Interactive Lab
                        </div>
                        <FractionVisualizer />
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 2: EQUIVALENT FRACTIONS
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                            <ArrowLeftRight size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Shape-Shifters</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            Sometimes, fractions look completely different but actually mean the exact same thing. These are called <strong>Equivalent Fractions</strong>.
                        </p>
                        
                        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8 p-8 bg-black/30 rounded-2xl border border-white/5">
                            
                            <div className="flex flex-col items-center">
                                <div className="text-5xl mb-4">🍕</div>
                                <div className="flex flex-col items-center text-2xl font-black text-white">
                                    <span>1</span>
                                    <div className="h-1 w-6 bg-white/20 rounded-full my-1" />
                                    <span>2</span>
                                </div>
                            </div>
                            
                            <div className="text-zinc-500 text-2xl font-black">=</div>
                            
                            <div className="flex flex-col items-center">
                                <div className="text-5xl mb-4">🍕🍕</div>
                                <div className="flex flex-col items-center text-2xl font-black text-white">
                                    <span>2</span>
                                    <div className="h-1 w-6 bg-white/20 rounded-full my-1" />
                                    <span>4</span>
                                </div>
                            </div>

                        </div>
                        
                        <div className="p-4 bg-cyan-500/10 border-l-4 border-cyan-500 text-sm text-cyan-100/90 font-medium rounded-r-xl">
                            💡 Think about it: If you eat 1 out of 2 slices of a pizza, you ate half. If you cut the pizza smaller and eat 2 out of 4 slices... you still ate exactly half the pizza! As long as you multiply the top and bottom by the same number, the fraction stays the same.
                        </div>
                    </div>
                </section>

                {/* =========================================
                    MODULE COMPLETION
                ========================================= */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <Sparkles size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">Unit Complete!</h3>
                            <p className="text-zinc-400">You've successfully sliced up the math universe.</p>
                        </div>
                    </div>
                    
                    <Link href="/formal-science/mathematics/foundations/measurement" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-100 transition-colors">
                        Next: Measurement <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </main>
    );
}