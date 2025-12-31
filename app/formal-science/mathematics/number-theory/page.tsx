"use client";
import Link from "next/link";
import PrimeBackground from "@/app/formal-science/mathematics/number-theory/PrimeBackground";
import ModularLoom from "@/app/formal-science/mathematics/number-theory/ModularLoom";
import { 
  ArrowLeft, Key, Lock, Fingerprint, 
  Hash, Clock, Sigma
} from "lucide-react";

export default function NumberTheoryPage() {
  return (
    <main className="relative min-h-screen bg-[#0f0518] text-fuchsia-100 overflow-hidden font-sans selection:bg-gold-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <PrimeBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-20 flex items-center justify-between px-8 py-6 border-b border-white/10 bg-[#0f0518]/90 backdrop-blur-md sticky top-0">
         <div className="flex items-center gap-6">
             <Link href="/formal-science/mathematics" className="flex items-center gap-2 text-xs font-mono text-fuchsia-500 hover:text-fuchsia-400 transition-colors uppercase tracking-widest">
                <ArrowLeft size={12} /> Mathematics
             </Link>
             <div className="h-4 w-px bg-white/10" />
             <div className="flex items-center gap-3">
                 <div className="p-1.5 bg-indigo-900 border border-fuchsia-500/50 rounded">
                    <Key size={18} className="text-fuchsia-500" />
                 </div>
                 <h1 className="text-xl font-bold text-white tracking-tight">
                    NUMBER_THEORY
                 </h1>
             </div>
         </div>
         <div className="hidden md:block text-[10px] font-mono text-fuchsia-500/50 uppercase tracking-widest">
            The Queen of Mathematics
         </div>
      </header>

      {/* 3. CONTENT GRID */}
      <div className="relative z-10 container mx-auto p-6 md:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* LEFT: THE CONCEPTS */}
                <div className="lg:col-span-7 space-y-6">
                    
                    {/* HERO CARD */}
                    <div className="bg-indigo-950/60 backdrop-blur-md border border-white/10 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-24 bg-fuchsia-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                            <h2 className="text-3xl font-bold text-white mb-4">The Atoms of Math</h2>
                            <p className="text-sm text-indigo-100/80 leading-relaxed mb-6">
                                Number Theory is the study of the integers: $0, 1, 2, 3...$. It asks simple questions with impossibly hard answers. Its core atoms are the **Prime Numbers**, the building blocks of all arithmetic.
                            </p>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Hash size={14} className="text-fuchsia-400" />
                                    <span className="text-xs font-mono">Primes</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-black/30 rounded border border-white/5">
                                    <Lock size={14} className="text-gold-400 text-yellow-500" />
                                    <span className="text-xs font-mono">Crypto</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    

                    {/* DOMAINS GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <div className="bg-indigo-950/40 border border-white/5 p-5 rounded-xl hover:border-fuchsia-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Fingerprint className="text-fuchsia-500" size={20} />
                                <h3 className="font-bold text-white">Primes</h3>
                            </div>
                            <p className="text-xs text-indigo-200/60">
                                The Fundamental Theorem of Arithmetic: Every integer is a unique product of primes.
                            </p>
                        </div>

                        <div className="bg-indigo-950/40 border border-white/5 p-5 rounded-xl hover:border-fuchsia-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Clock className="text-fuchsia-500" size={20} />
                                <h3 className="font-bold text-white">Modular Arithmetic</h3>
                            </div>
                            <p className="text-xs text-indigo-200/60">
                                "Clock math." $7 + 6 = 1$ (mod 12). The basis of modern cryptography.
                            </p>
                        </div>
                        
                        <div className="bg-indigo-950/40 border border-white/5 p-5 rounded-xl hover:border-fuchsia-500/30 transition-colors group">
                            <div className="flex items-center gap-3 mb-2">
                                <Lock className="text-fuchsia-500" size={20} />
                                <h3 className="font-bold text-white">Cryptography</h3>
                            </div>
                            <p className="text-xs text-indigo-200/60">
                                RSA Encryption relies on the fact that multiplying primes is easy, but factoring the result is hard.
                            </p>
                        </div>

                    </div>
                </div>

                {/* RIGHT: INTERACTIVE LAB */}
                <div className="lg:col-span-5 space-y-6 flex flex-col items-center">
                    
                    {/* WIDGET */}
                    <ModularLoom />

                    {/* FERMAT CARD */}
                    <div className="bg-indigo-950/60 border border-white/10 rounded-xl p-6 w-full">
                        <h3 className="font-bold text-white mb-2">Fermat's Last Theorem</h3>
                        <p className="text-xs text-indigo-200/60 leading-relaxed mb-3">
                            For $n &gt; 2$, there are no integer solutions to $a^n + b^n = c^n$. 
                            <br/><br/>
                            Pierre de Fermat scribbled in a margin in 1637: "I have discovered a truly marvelous proof of this, which this margin is too narrow to contain." It took 358 years to actually prove it (Andrew Wiles, 1994).
                        </p>
                    </div>

                </div>

            </div>
      </div>
    </main>
  );
}