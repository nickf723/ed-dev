import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Brackets, Grid3X3, Shapes } from 'lucide-react';
import DiophantineBackground from './_components/DiophantineBackground'; 
import DiophantineLab from './_components/DiophantineLab';

export default function DiophantinePage() {
    return (
        <main className="relative min-h-screen bg-[#05050a] text-zinc-300 font-sans selection:bg-rose-500/30 overflow-x-hidden">
            
            <DiophantineBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/number-theory" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Number Theory Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-rose-500/30 rounded-lg text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                            <Brackets size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-300/50">
                            Formal Science // Polynomials
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        DIOPHANTINE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">EQUATIONS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Polynomial equations where we demand a strict, uncompromising condition: only integer solutions are allowed. It is the mathematical equivalent of navigating a continuous world using only discrete, snapping grid points.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Grid3X3 className="text-rose-400" /> The Discrete Grid
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Standard algebra allows for continuous solutions. If you graph the line $2x+4y=7$, there are an infinite number of points on that line. However, if we view this as a Linear Diophantine Equation, we are asking a different question: does this line ever cross an intersection of exact, whole numbers?
                            </p>
                            
                            

                            <div className="p-5 bg-black/40 border-l-4 border-rose-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                Bézout's Identity proves that the equation $ax+by=c$ has an integer solution if, and only if, $c$ is a multiple of the Greatest Common Divisor of $a$ and $b$.
                            </div>
                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                Because $\gcd(2,4)=2$, and $7$ is not divisible by $2$, the line $2x+4y=7$ will slip through the integer grid forever, never once touching a perfect coordinate.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Shapes className="text-amber-400" /> Fermat's Last Theorem
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                While linear Diophantine equations are relatively easy to solve using the Extended Euclidean Algorithm, non-linear ones can be historically difficult. 
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                We know there are infinite integer solutions to $x^2+y^2=z^2$ (these are Pythagorean Triples, like $3^2+4^2=5^2$). But in 1637, Pierre de Fermat scribbled in the margin of a book that no three positive integers can satisfy the equation $a^n+b^n=c^n$ for any integer value of $n{'>'}2$.
                            </p>
                            
                            <div className="px-4 py-2 border border-amber-500/20 bg-amber-500/5 text-amber-200/80 font-mono text-sm rounded">
                                "I have a truly marvelous demonstration of this proposition which this margin is too narrow to contain." — Pierre de Fermat
                            </div>
                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                It took mathematicians over 350 years to finally prove he was right.
                            </p>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <DiophantineLab />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}