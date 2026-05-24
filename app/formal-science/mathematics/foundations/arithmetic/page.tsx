"use client";
import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, Blocks, Sparkles, Plus, Minus, 
    X, Divide, Layers, ListOrdered, CheckCircle2, ArrowRight
} from 'lucide-react';
import ArithmeticBackground from './_components/ArithmeticBackground';
import VisualAdder from './_components/VisualAdder';

export default function ArithmeticContentPage() {
    return (
        <main className="relative min-h-screen bg-[#0f0e17] text-zinc-200 font-sans selection:bg-rose-500/30 overflow-x-hidden pb-32">
            
            <ArithmeticBackground />

            <div className="relative z-10 max-w-[55rem] mx-auto px-6 py-12 md:py-20">
                
                {/* =========================================
                    HEADER
                ========================================= */}
                <header className="mb-16 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-rose-400 hover:text-rose-300 text-[10px] font-black uppercase tracking-widest mb-8 transition-colors bg-rose-500/10 px-4 py-2 rounded-full border border-rose-500/20">
                        <ArrowLeft size={14} /> Back to Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-6">
                        <span className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                            <Blocks size={32} />
                        </span>
                        <span className="text-xs font-black uppercase tracking-[0.2em] text-rose-400">
                            Core Unit 01
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-8 drop-shadow-lg">
                        ARITHMETIC
                    </h1>
                    <p className="text-xl text-zinc-300 font-medium leading-relaxed">
                        Mathematics is like building with magical blocks. Once you learn the four basic ways to put them together and take them apart, you hold the keys to the entire universe.
                    </p>
                </header>

                {/* =========================================
                    CHAPTER 1: ADDITION & SUBTRACTION
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400 border border-rose-500/30">
                            <Plus size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Art of Combining</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl mb-8">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            <strong>Addition (+)</strong> is the act of bringing things together. If you have 3 apples and find 2 more, you simply count them all as one big group to get 5. <strong>Subtraction (-)</strong> is the exact opposite—it is the art of taking things away or finding the difference between two groups.
                        </p>
                        
                        <div className="p-6 bg-black/40 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-around gap-6 text-2xl font-bold">
                            <div className="flex items-center gap-3">
                                🍎🍎🍎 <span className="text-rose-400 mx-2">+</span> 🍏🍏 <span className="text-rose-400 mx-2">=</span> 5
                            </div>
                            <div className="hidden md:block w-px h-12 bg-white/10" />
                            <div className="flex items-center gap-3">
                                🍕🍕🍕🍕 <span className="text-cyan-400 mx-2">-</span> 🍕 <span className="text-cyan-400 mx-2">=</span> 3
                            </div>
                        </div>
                    </div>

                    {/* Integrating the Lab right where the concept is taught! */}
                    <div className="bg-black/40 backdrop-blur-xl border border-rose-500/20 p-4 rounded-[2rem] shadow-2xl relative">
                        <div className="absolute -top-3 left-8 bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                            Interactive Lab
                        </div>
                        <VisualAdder />
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 2: PLACE VALUE
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-400 border border-amber-500/30">
                            <Layers size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Boxes of Ten (Place Value)</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                        <p className="text-lg text-zinc-300 leading-relaxed mb-6">
                            Because humans have ten fingers, we designed our math to roll over every time we hit 10. Imagine you are packing toys into boxes, and <strong>each box can only hold exactly 10 toys</strong>.
                        </p>
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                            If you have 12 toys, you fill up 1 whole box, and you have 2 toys left over sitting outside.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-6 bg-amber-900/10 border border-amber-500/20 rounded-2xl flex flex-col items-center justify-center text-center">
                                <span className="text-5xl font-black text-amber-400 mb-2">1</span>
                                <span className="text-xs font-bold text-amber-400/70 uppercase tracking-widest">Box of Ten</span>
                            </div>
                            <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col items-center justify-center text-center">
                                <span className="text-5xl font-black text-white mb-2">2</span>
                                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Leftover Ones</span>
                            </div>
                        </div>
                        
                        <div className="mt-8 p-4 bg-amber-500/10 border-l-4 border-amber-500 text-sm text-amber-100/90 font-medium rounded-r-xl">
                            💡 This is why the number "12" is written with a 1 and a 2! The position of the number tells you how big it is. This is called <strong>Base-10</strong>.
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 3: MULTIPLICATION & DIVISION
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30">
                            <X size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">Fast-Forward & Sharing</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <X className="text-cyan-400" size={20} />
                                <h3 className="text-xl font-bold text-white">Multiplication</h3>
                            </div>
                            <p className="text-zinc-300 leading-relaxed mb-6">
                                Multiplication is just a shortcut for adding the same number over and over again. Instead of writing <code className="text-cyan-300 bg-cyan-900/30 px-2 py-0.5 rounded">3 + 3 + 3 + 3</code>, we just say <strong>"four groups of three"</strong> (<code className="text-cyan-300 bg-cyan-900/30 px-2 py-0.5 rounded">4 × 3</code>).
                            </p>
                            <div className="text-2xl font-bold text-center tracking-widest">
                                🍪🍪🍪 <span className="text-cyan-500 opacity-50">×4</span>
                            </div>
                        </div>

                        <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl">
                            <div className="flex items-center gap-3 mb-4">
                                <Divide className="text-fuchsia-400" size={20} />
                                <h3 className="text-xl font-bold text-white">Division</h3>
                            </div>
                            <p className="text-zinc-300 leading-relaxed mb-6">
                                Division is the act of fair sharing. If you have 12 cookies and 3 friends, how many cookies does each friend get so that everyone is perfectly equal? (<code className="text-fuchsia-300 bg-fuchsia-900/30 px-2 py-0.5 rounded">12 ÷ 3 = 4</code>).
                            </p>
                            <div className="text-2xl font-bold text-center">
                                🍪🍪🍪🍪 <span className="text-fuchsia-500 opacity-50">/ friend</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* =========================================
                    CHAPTER 4: ORDER OF OPERATIONS
                ========================================= */}
                <section className="mb-20">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                            <ListOrdered size={24} strokeWidth={3} />
                        </div>
                        <h2 className="text-3xl font-black text-white tracking-tight">The Rules of the Game</h2>
                    </div>

                    <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-xl relative overflow-hidden">
                        <div className="absolute right-0 bottom-0 opacity-5 scale-150 -translate-x-10 translate-y-10 pointer-events-none">
                            <ListOrdered size={200} />
                        </div>
                        
                        <p className="text-lg text-zinc-300 leading-relaxed mb-8 relative z-10">
                            When you have a long math problem with lots of different symbols, you can't just read it left-to-right like a book. Mathematicians agreed on a strict order to solve things so that everyone gets the exact same answer.
                        </p>
                        
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center">1</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Parentheses <span className="text-emerald-400">( )</span></h4>
                                    <p className="text-sm text-zinc-400">Always solve whatever is trapped inside the brackets first.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center">2</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Exponents <span className="text-emerald-400">x²</span></h4>
                                    <p className="text-sm text-zinc-400">Handle the tiny floating numbers next.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center">3</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Multiply & Divide <span className="text-cyan-400">× ÷</span></h4>
                                    <p className="text-sm text-zinc-400">Read from left to right and do all multiplication and division.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center">4</div>
                                <div>
                                    <h4 className="font-bold text-white text-lg">Add & Subtract <span className="text-rose-400">+ -</span></h4>
                                    <p className="text-sm text-zinc-400">Finally, clean up the rest by adding and subtracting left to right.</p>
                                </div>
                            </div>
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
                            <p className="text-zinc-400">You've mastered the building blocks of math.</p>
                        </div>
                    </div>
                    
                    <Link href="/formal-science/mathematics/foundations/fractions" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-rose-100 transition-colors">
                        Next: Fractions <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

            </div>
        </main>
    );
}