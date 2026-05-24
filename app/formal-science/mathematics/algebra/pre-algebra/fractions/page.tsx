"use client";
import Link from "next/link";
import FractionsAdvBackground from "./_components/FractionsAdvBackground";
import FractionAreaLab from "./_components/FractionAreaLab";
import { 
  Divide, ArrowRight, Layers,
  PlusSquare, ArrowRightLeft, RefreshCw, CheckCircle2, ArrowLeft
} from "lucide-react";

// VERIFICATION PROTOCOL
import Assessment from "@/app/_components/Assessment"; 
import VocabApplet from "@/app/_components/VocabApplet";
import { fractionsVocab } from "@/app/_data/vocab/f/fractions";
import { fractionsQuiz } from "./_components/assessment";

export default function FractionsPage() {
  return (
    <main className="relative min-h-screen bg-[#1e1005] text-slate-200 overflow-hidden font-sans selection:bg-orange-500/30 pb-32">
      <FractionsAdvBackground />
      <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none z-0" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* =========================================
            HEADER
        ========================================= */}
        <header className="mb-16 border-b border-orange-500/20 pb-8 mt-8">
            <Link href="/formal-science/mathematics/algebra/pre-algebra" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <ArrowLeft size={12} /> Back to Pre-Algebra
            </Link>

          <div className="flex items-center gap-3 mb-4">
            <span className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-xl shadow-inner">
              <Divide className="text-orange-400" size={24} />
            </span>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-400 font-bold">
              Module_05 // Operations
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">
            ADVANCED <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">FRACTIONS</span>
          </h1>
          <p className="mt-6 text-slate-400 max-w-2xl text-lg font-light leading-relaxed border-l-2 border-orange-500/50 pl-6">
            In foundational math, fractions are just pieces of pie. In algebra, fractions are operations waiting to happen. It's time to learn how to add, multiply, and divide them together.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
          
          {/* LEFT: THE RULES */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="p-8 bg-slate-900/60 border border-white/5 rounded-2xl backdrop-blur-md shadow-xl flex flex-col gap-8">
              
              {/* Addition/Subtraction */}
              <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <PlusSquare size={20} className="text-orange-400" /> Adding & Subtracting
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      You cannot add slices of pizza if the slices are different sizes. You must find the <strong>Lowest Common Denominator (LCD)</strong> to make the pieces match before combining the tops.
                  </p>
                  <div className="bg-black/50 p-4 rounded-xl border border-white/5 font-mono text-center flex flex-col items-center">
                      <div className="flex items-center gap-4 text-xl">
                          <div className="flex flex-col items-center text-slate-500"><span>1</span><div className="w-6 h-px bg-slate-600 my-1"/><span>2</span></div>
                          <span className="text-slate-600">+</span>
                          <div className="flex flex-col items-center text-slate-500"><span>1</span><div className="w-6 h-px bg-slate-600 my-1"/><span>3</span></div>
                          <ArrowRight className="text-slate-600" />
                          <div className="flex flex-col items-center text-orange-400 font-black"><span>3</span><div className="w-6 h-px bg-orange-500/50 my-1"/><span>6</span></div>
                          <span className="text-orange-400">+</span>
                          <div className="flex flex-col items-center text-orange-400 font-black"><span>2</span><div className="w-6 h-px bg-orange-500/50 my-1"/><span>6</span></div>
                          <span className="text-white">=</span>
                          <div className="flex flex-col items-center text-white font-black"><span>5</span><div className="w-6 h-px bg-white/50 my-1"/><span>6</span></div>
                      </div>
                  </div>
              </div>

              <div className="h-px w-full bg-white/5" />

              {/* Division (Keep Change Flip) */}
              <div>
                  <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <ArrowRightLeft size={20} className="text-orange-400" /> Division (The Trick)
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-4">
                      Dividing by a fraction is the exact same thing as multiplying by its opposite (its <strong>Reciprocal</strong>). We use the phrase: Keep, Change, Flip.
                  </p>
                  
                  <ul className="space-y-2 font-mono text-sm">
                      <li className="flex gap-4"><span className="text-orange-400 font-bold">KEEP</span> <span>the first fraction exactly the same.</span></li>
                      <li className="flex gap-4"><span className="text-orange-400 font-bold">CHANGE</span> <span>the division sign to a multiplication sign.</span></li>
                      <li className="flex gap-4"><span className="text-orange-400 font-bold">FLIP</span> <span>the second fraction upside down.</span></li>
                  </ul>
              </div>

            </div>

          </div>

          {/* RIGHT: THE LABORATORY */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative">
                <div className="absolute -top-3 left-8 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.4)] z-20">
                    Interactive Lab
                </div>
                
                <div className="mb-8 pt-2">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                        Multiplying Fractions
                    </h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        Unlike addition, you <strong>do not</strong> need a common denominator to multiply. You just multiply straight across! The Area Model below proves why overlapping fractions creates a new, smaller grid.
                    </p>
                </div>

                <FractionAreaLab />
            </div>
            
          </div>
        </div>

        {/* =========================================
            VERIFICATION PROTOCOL
        ========================================= */}
        <section className="mt-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-orange-500 rounded-full" />
                <h2 className="text-sm font-bold text-orange-300 uppercase tracking-widest">Verification Protocol</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="col-span-1">
                    <VocabApplet 
                        currentDomain="Fractions" 
                        localTerms={fractionsVocab || []} 
                        accentColor="orange" 
                    />
                </div>
                <div className="col-span-1 lg:col-span-2">
                    <Assessment 
                        title="Knowledge Check: Fraction Operations" 
                        questions={fractionsQuiz || []} 
                        accentColor="orange"
                        onComplete={(score, total) => console.log(`Fractions Quiz Scored: ${score}/${total}`)} 
                    />
                </div>
            </div>
        </section>

        {/* =========================================
            FOOTER / NAVIGATION
        ========================================= */}
        <div className="mt-24 pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Rule Mastery</h3>
                    <p className="text-zinc-400 text-sm font-light">You can manipulate any part of a whole.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/pre-algebra/exponents" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-orange-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                Next: Exponents <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
      </div>
    </main>
  );
}