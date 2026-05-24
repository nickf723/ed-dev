"use client";
import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, BarChart3, PieChart, 
    Dices, Target, CheckCircle2, ArrowRight, Activity
} from 'lucide-react';
import DataBackground from './_components/DataBackground';
import ProbabilityLab from './_components/ProbabilityLab';

export default function StatisticsPage() {
    return (
        <main className="relative min-h-screen bg-[#0c0a1a] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden pb-32">
            
            <DataBackground />

            <div className="relative z-10 max-w-[55rem] mx-auto px-6 py-12 md:py-20">
                
                {/* =========================================
                    HEADER
                ========================================= */}
                <header className="mb-16 border-b border-indigo-500/20 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/30">
                        <ArrowLeft size={14} /> Back to Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-3 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                            <BarChart3 size={32} />
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">
                            Core Unit 07
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6 drop-shadow-lg">
                        DATA & <br />
                        <span className="text-indigo-300/50 font-light">PROBABILITY</span>
                    </h1>
                    <p className="text-xl text-zinc-400 font-medium max-w-3xl leading-relaxed">
                        Math isn't just about formulas; it is about predicting the future. By collecting information (Data) and studying how often things happen (Probability), we can make incredibly smart guesses about the world.
                    </p>
                </header>

                {/* =========================================
                    CHAPTER 1: COLLECTING DATA
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 border border-pink-500/30">
                            <PieChart size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Painting with Numbers</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            Imagine asking 20 friends what their favorite food is. You could write down a long, confusing list of words. Or, you could turn that data into a picture! 
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col items-center">
                                <BarChart3 size={40} className="text-indigo-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Bar Charts</h3>
                                <p className="text-sm text-zinc-400 text-center">Great for comparing amounts. The taller the rectangle, the bigger the number!</p>
                            </div>
                            <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col items-center">
                                <PieChart size={40} className="text-pink-400 mb-4" />
                                <h3 className="text-xl font-bold text-white mb-2">Pie Charts</h3>
                                <p className="text-sm text-zinc-400 text-center">Great for showing fractions of a whole. Each piece of data is a slice of the pie.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 2: AVERAGES
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 border border-violet-500/30">
                            <Activity size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Finding the Center</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            If someone asks "How tall is a 3rd grader?", you can't give them 100 different heights. You need one number that represents the <em>average</em> kid. Mathematicians use three special tools to find the center of a data pile:
                        </p>
                        
                        <div className="space-y-4">
                            <div className="bg-violet-900/20 p-5 rounded-2xl border border-violet-500/20">
                                <h3 className="text-xl font-black text-violet-400 mb-1">1. The Mean</h3>
                                <p className="text-zinc-300">This is what most people call the "average." You add up every single number in your pile, and then divide by how many items there are. It perfectly balances the data.</p>
                            </div>
                            
                            <div className="bg-indigo-900/20 p-5 rounded-2xl border border-indigo-500/20">
                                <h3 className="text-xl font-black text-indigo-400 mb-1">2. The Median</h3>
                                <p className="text-zinc-300">Line all your numbers up from smallest to largest. The Median is the number sitting exactly in the middle. (Great for ignoring weirdly huge or tiny outliers!)</p>
                            </div>

                            <div className="bg-pink-900/20 p-5 rounded-2xl border border-pink-500/20">
                                <h3 className="text-xl font-black text-pink-400 mb-1">3. The Mode</h3>
                                <p className="text-zinc-300">The most popular kid in school. The Mode is simply the number that shows up the <em>most often</em> in your list.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 3: PROBABILITY & LAB
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                            <Dices size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Laws of Chance</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            <strong>Probability</strong> is the math of chance. When we roll a die, flip a coin, or spin a wheel, we cannot predict the exact outcome of a single turn. 
                        </p>
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            However, we can perfectly calculate the <strong>Theoretical Expected Probability</strong> by looking at how many possible outcomes exist:
                        </p>
                        
                        <ul className="space-y-4 text-zinc-300 mb-2">
                            <li className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5">
                                <span className="font-bold text-white">A Coin</span>
                                <span className="text-amber-400 font-mono text-sm">2 Sides = 50% Chance</span>
                            </li>
                            <li className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5">
                                <span className="font-bold text-white">A 4-Color Spinner</span>
                                <span className="text-indigo-400 font-mono text-sm">4 Slices = 25% Chance</span>
                            </li>
                            <li className="flex items-center justify-between bg-black/30 p-4 rounded-xl border border-white/5">
                                <span className="font-bold text-white">A Standard Die</span>
                                <span className="text-fuchsia-400 font-mono text-sm">6 Faces = 16.6% Chance</span>
                            </li>
                        </ul>
                    </div>

                    <div className="bg-black/40 backdrop-blur-xl border border-indigo-500/30 p-4 md:p-8 rounded-[2rem] shadow-2xl relative">
                        <div className="absolute -top-3 left-8 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg z-20">
                            Interactive Lab
                        </div>
                        
                        <ProbabilityLab />
                        
                    </div>
                </section>

                {/* =========================================
                    MODULE COMPLETION
                ========================================= */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30">
                            <Target size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-white">Unit Complete!</h3>
                            <p className="text-zinc-400">You can now collect, graph, and predict data.</p>
                        </div>
                    </div>
                    
                    <Link href="/formal-science/mathematics/foundations/pre-algebra" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors">
                        Final Challenge: Pre-Algebra <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </main>
    );
}