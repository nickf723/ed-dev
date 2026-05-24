"use client";
import Link from "next/link";
import PreAlgebraBackground from "./_components/PreAlgebraBackground";
import BalanceScaleLab from "./_components/BalanceScaleLab";
import { 
  Calculator, Scale, Hash, ArrowRight, 
  Divide, Percent, Superscript, Variable, 
  ArrowLeft, ListOrdered, Brackets
} from "lucide-react";

// NEW IMPORTS FOR VERIFICATION PROTOCOL
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";
import { preAlgebraVocab } from "@/app/_data/vocab/p/pre-algebra";
import { preAlgebraQuiz } from "./_components/assessment";

export default function PreAlgebraPage() {
  const MODULES = [
    { 
      id: "integers", title: "Integers & Negatives", 
      href: "/formal-science/mathematics/algebra/pre-algebra/integers", 
      icon: Hash, color: "text-blue-400", border: "hover:border-blue-500/50", bg: "hover:bg-blue-900/20",
      desc: "The number line extends both ways. Adding, subtracting, and multiplying negative numbers." 
    },
    { 
      id: "pemdas", title: "Order of Operations", 
      href: "/formal-science/mathematics/algebra/pre-algebra/pemdas", 
      icon: ListOrdered, color: "text-yellow-400", border: "hover:border-yellow-500/50", bg: "hover:bg-yellow-900/20",
      desc: "PEMDAS. Why we multiply before we add, and how to unravel complex equations." 
    },
    { 
      id: "properties", title: "Number Properties", 
      href: "/formal-science/mathematics/algebra/pre-algebra/properties", 
      icon: Brackets, color: "text-emerald-400", border: "hover:border-emerald-500/50", bg: "hover:bg-emerald-900/20",
      desc: "Commutative, Associative, and the incredibly important Distributive Property." 
    },
    { 
      id: "ratios", title: "Ratios & Proportions", 
      href: "/formal-science/mathematics/algebra/pre-algebra/ratios", 
      icon: Percent, color: "text-rose-400", border: "hover:border-rose-500/50", bg: "hover:bg-rose-900/20",
      desc: "Scaling up and down. Understanding relationships like speed, percentages, and unit price." 
    },
    { 
      id: "fractions", title: "Advanced Fractions", 
      href: "/formal-science/mathematics/algebra/pre-algebra/fractions", 
      icon: Divide, color: "text-orange-400", border: "hover:border-orange-500/50", bg: "hover:bg-orange-900/20",
      desc: "Multiplying, dividing, and finding common denominators across complex mixed numbers." 
    },
    { 
      id: "exponents", title: "Exponents", 
      href: "/formal-science/mathematics/algebra/pre-algebra/exponents", 
      icon: Superscript, color: "text-purple-400", border: "hover:border-purple-500/50", bg: "hover:bg-purple-900/20",
      desc: "Powers, square roots, and using Scientific Notation to write massive numbers." 
    },
    { 
      id: "expressions", title: "Expressions", 
      href: "/formal-science/mathematics/algebra/pre-algebra/expressions", 
      icon: Variable, color: "text-cyan-400", border: "hover:border-cyan-500/50", bg: "hover:bg-cyan-900/20",
      desc: "Meeting the variable. Translating English sentences into mathematical letters." 
    },
    { 
      id: "equations", title: "Solving for X", 
      href: "/formal-science/mathematics/algebra/pre-algebra/equations", 
      icon: Scale, color: "text-indigo-400", border: "hover:border-indigo-500/50", bg: "hover:bg-indigo-900/20",
      desc: "Isolating the variable. Using inverse operations to solve one and two-step equations." 
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans selection:bg-blue-500/30 pb-32">
      
      {/* VISUAL ENGINE */}
      <PreAlgebraBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 flex flex-col min-h-screen">
        
        {/* =========================================
            HEADER & HUD
        ========================================= */}
        <header className="mb-16 border-b border-blue-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra" className="flex items-center gap-2 text-[10px] text-blue-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group w-max border border-blue-500/30 bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Return to Algebra
            </Link>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 border border-blue-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm relative overflow-hidden group rounded-2xl shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                        <div className="absolute inset-0 bg-blue-500/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        <Calculator size={40} className="text-blue-400 relative z-10" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 text-blue-500 mb-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase">
                            <Hash size={12} /> Mod_01 <span className="w-12 h-px bg-blue-500/50"></span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            PRE-<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">ALGEBRA</span>
                        </h1>
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="bg-black/60 border border-blue-500/30 rounded-xl p-4 backdrop-blur-sm shadow-xl flex flex-col justify-center">
                        <div className="text-[9px] text-blue-400 uppercase tracking-widest mb-1">Modules</div>
                        <div className="text-2xl font-bold text-white leading-none">08</div>
                    </div>
                </div>
            </div>
        </header>

        {/* =========================================
            ZONE 1: THE CURRICULUM INDEX
        ========================================= */}
        <section className="mb-24">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-blue-500 rounded-full" />
                <h2 className="text-sm font-bold text-blue-300 uppercase tracking-widest">Course Directory</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {MODULES.map((m, i) => (
                    <Link 
                        key={m.id} href={m.href}
                        className={`group relative flex flex-col justify-between p-6 border border-white/5 bg-black/40 rounded-2xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] ${m.border} ${m.bg}`}
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-xl bg-black/60 border border-white/5 shadow-inner transition-colors ${m.color}`}>
                                <m.icon size={24} strokeWidth={1.5} />
                            </div>
                            <span className="text-[10px] font-black opacity-20 uppercase tracking-widest group-hover:opacity-60 transition-opacity text-blue-400">{`CH_0${i+1}`}</span>
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-white mb-2 font-sans group-hover:text-blue-100 transition-colors">{m.title}</h2>
                            <p className="text-xs text-slate-400 font-sans leading-relaxed">{m.desc}</p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest group-hover:text-blue-400 transition-colors">Enter Module</span>
                            <ArrowRight size={14} className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </div>
                    </Link>
                ))}
            </div>
        </section>

        {/* =========================================
            ZONE 2: SIMULATION DECK
        ========================================= */}
        <section className="mb-24">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-blue-500 rounded-full" />
                <h2 className="text-sm font-bold text-blue-300 uppercase tracking-widest">Simulation Deck</h2>
            </div>
            
            <div className="bg-black/40 backdrop-blur-xl border border-blue-500/20 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-full md:w-1/3">
                        <h3 className="text-3xl font-black text-white mb-4">Balancing Act</h3>
                        <p className="text-slate-300 text-base leading-relaxed mb-6">
                            An equation is just a scale. To solve for the mystery variable, you have to keep both sides perfectly balanced using Inverse Operations!
                        </p>
                        <div className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-lg inline-block text-blue-300 text-xs font-mono font-bold">
                            TARGET: ISOLATE X
                        </div>
                    </div>
                    <div className="w-full md:w-2/3">
                        <BalanceScaleLab />
                    </div>
                </div>
            </div>
        </section>

        {/* =========================================
            ZONE 3: VERIFICATION PROTOCOL
        ========================================= */}
        <section className="mt-auto pb-16">
          <div className="flex items-center gap-3 mb-8">
              <div className="h-4 w-1 bg-blue-500 rounded-full" />
              <h2 className="text-sm font-bold text-blue-300 uppercase tracking-widest">Verification Protocol</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-1">
                <VocabApplet 
                    currentDomain="Pre-Algebra" 
                    localTerms={preAlgebraVocab || []} 
                    accentColor="blue" 
                />
            </div>
            <div className="col-span-1 lg:col-span-2">
                 <Assessment 
                     title="Domain Check: The Rules of Math" 
                     questions={preAlgebraQuiz || []} 
                     accentColor="blue"
                     onComplete={(score, total) => console.log(`Pre-Algebra Quiz Scored: ${score}/${total}`)} 
                 />
            </div>
          </div>
        </section>

      </div>
    </main>
  );
}