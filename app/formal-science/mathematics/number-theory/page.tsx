import React from 'react';
import Link from 'next/link';
import { 
    ArrowLeft, Fingerprint, Lock, Layers, 
    Asterisk, ShieldAlert, Grid3X3, Brackets 
} from 'lucide-react';
import NumberTheoryBackground from './_components/NumberTheoryBackground';
import PrimeLab from './_components/PrimeLab';

// 1. THE CHILD ROUTES DATA STRUCTURE
const NUMBER_THEORY_TOPICS = [
    {
        id: 'primes',
        title: 'Primes & Divisibility',
        description: 'The Sieve of Eratosthenes, prime counting function, and the Riemann Hypothesis.',
        icon: Asterisk,
        color: 'emerald',
        href: '/formal-science/mathematics/number-theory/primes'
    },
    {
        id: 'modular',
        title: 'Modular Arithmetic',
        description: 'Clock math, congruences, and Fermat\'s Little Theorem.',
        icon: Grid3X3,
        color: 'violet',
        href: '/formal-science/mathematics/number-theory/modular'
    },
    {
        id: 'cryptography',
        title: 'Cryptographic Systems',
        description: 'RSA encryption, public/private keys, and trapdoor functions.',
        icon: ShieldAlert,
        color: 'sky',
        href: '/formal-science/mathematics/number-theory/cryptography'
    },
    {
        id: 'diophantine',
        title: 'Diophantine Equations',
        description: 'Polynomial equations where only integer solutions are accepted.',
        icon: Brackets,
        color: 'rose',
        href: '/formal-science/mathematics/number-theory/diophantine'
    }
];

export default function NumberTheoryPage() {
    return (
        <main className="relative min-h-screen bg-[#05050a] text-zinc-300 font-sans selection:bg-violet-500/30 overflow-x-hidden">
            
            <NumberTheoryBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Mathematics Directory
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-violet-500/30 rounded-lg text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                            <Fingerprint size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-violet-300/50">
                            Formal Science // Pure Mathematics
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        NUMBER <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-emerald-400">THEORY</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        The study of the integers. While it was once considered the purest, most abstract branch of mathematics, it has become the foundational science behind modern cryptography and digital security.
                    </p>
                </header>

                {/* TOP SECTION: THEORY & INTERACTIVE LAB */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Layers className="text-violet-400" /> The Fundamental Theorem
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The Fundamental Theorem of Arithmetic states that every integer greater than 1 is either prime itself or can be uniquely factored into a product of prime numbers. 
                            </p>
                            <div className="p-5 bg-black/40 border-l-4 border-violet-500 text-sm text-zinc-300 font-serif italic rounded-r-xl">
                                Primes are the "atoms" of mathematics. Just as every molecule in the universe is built from a specific combination of elements, every number is built from a specific combination of primes.
                            </div>
                            <p className="text-zinc-400 leading-relaxed font-light mt-4 mb-4">
                                For example, the number 60 can be broken down into $2^2 \times 3 \times 5$. No other combination of primes will ever multiply to exactly 60.
                            </p>
                            
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Lock className="text-emerald-400" /> RSA & Cryptography
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Why do primes matter outside of pure theory? Because factoring large numbers is computationally asymmetric. 
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                If you take two massive prime numbers ($p$ and $q$) and multiply them together to get $N$, a computer can do that math in milliseconds. But if you give a computer $N$ and ask it to find the original $p$ and $q$, it could take a supercomputer millions of years. This "trapdoor function" secures the entire internet.
                            </p>
                        </section>
                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <PrimeLab />
                        </div>
                    </div>
                </div>

                {/* BOTTOM SECTION: CHILD ROUTE NAVIGATION */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Grid3X3 className="text-violet-400" /> Theoretical Branches
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Select a sub-discipline to initialize the interactive laboratory.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {NUMBER_THEORY_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            // Tailwind safe color mapping
                            const borderHover = 
                                topic.color === 'violet' ? 'hover:border-violet-500/50' :
                                topic.color === 'emerald' ? 'hover:border-emerald-500/50' :
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-rose-500/50';
                                
                            const iconColor = 
                                topic.color === 'violet' ? 'text-violet-400' :
                                topic.color === 'emerald' ? 'text-emerald-400' :
                                topic.color === 'sky' ? 'text-sky-400' :
                                'text-rose-400';

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