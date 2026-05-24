"use client";
import React from "react";
import Link from "next/link";
import LogBackground from "./_components/LogBackground";
import LogBaseLab from "./_components/LogBaseLab";
import { M } from "@/app/_components/Math";
import { 
  ArrowLeft, Zap, TrendingUp, 
  RotateCcw, Microscope, Activity, 
  Scale, ArrowUpRight, ArrowRight, CheckCircle2
} from "lucide-react";

export default function ExponentsPage() {
  return (
    <main className="relative min-h-screen bg-[#140a05] text-white overflow-hidden font-sans selection:bg-amber-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <LogBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-amber-500 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-amber-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_10
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-amber-500/30 pb-8">
                 <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(245,158,11,0.2)]">
                    <Zap size={48} className="text-amber-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg uppercase">
                       EXP & LOGS
                    </h1>
                    <p className="text-amber-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-amber-500/50 pl-6">
                        The mathematics of rapid change. Growth, decay, and the inverse relationship of infinite scale.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE INVERSE RELATIONSHIP */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-amber-500" />
                    <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">01 // The Inverse</h2>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed">
                    Addition has Subtraction. Multiplication has Division. Exponentiation has <strong>Logarithms</strong>. A logarithm simply asks: <em>"To what power must I raise the base to get this number?"</em>
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 p-6 bg-black/40 border border-white/5 rounded-2xl shadow-inner mt-8">
                    <div className="flex flex-col items-center">
                        <div className="text-2xl text-amber-400 font-bold mb-1"><M>b^y = x</M></div>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Exponential</span>
                    </div>
                    
                    <RotateCcw className="text-amber-500/50 shrink-0" size={24} />
                    
                    <div className="flex flex-col items-center">
                        <div className="text-2xl text-sky-400 font-bold mb-1"><M>\log_b(x) = y</M></div>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500">Logarithmic</span>
                    </div>
                </div>
            </div>

            {/* Dynamic Visualizer */}
            <div className="lg:col-span-7">
                <LogBaseLab />
            </div>
        </section>

        {/* SECTION 2: THE NATURAL LOG (e) */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">02 // Euler's Number (e)</h2>
            </div>
            
            <div className="bg-gradient-to-br from-amber-950/40 to-orange-950/40 border border-amber-500/30 rounded-3xl p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
                 <div className="absolute top-0 right-0 p-8 opacity-5 rotate-12 pointer-events-none">
                    <Microscope size={250} />
                 </div>
                 
                 <div className="flex-1 relative z-10">
                     <h3 className="text-3xl font-black text-white mb-4">Continuous Limits</h3>
                     <p className="text-base text-zinc-300 mb-6 leading-relaxed">
                        If you earn 100% interest compounded continuously (every second of every day), your money doesn't grow to infinity. It hits a mathematical speed limit: Euler's Number (<M>e \approx 2.718</M>). Because nature grows continuously, <M>e</M> is the universal base rate for population growth, bacterial spread, and radioactive decay.
                     </p>
                     <div className="flex flex-wrap gap-4">
                         <div className="px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg flex flex-col shadow-inner">
                             <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest mb-1">Natural Log</span>
                             <span className="text-lg text-white"><M>{`\\ln(x) = \\log_e(x)`}</M></span>
                         </div>
                         <div className="px-4 py-2 bg-black/60 border border-amber-500/30 rounded-lg flex flex-col shadow-inner">
                             <span className="text-[10px] text-amber-500 uppercase font-bold tracking-widest mb-1">Continuous Compounding</span>
                             <span className="text-lg text-white"><M>{`A = Pe^{rt}`}</M></span>
                         </div>
                     </div>
                 </div>

                 {/* Animated Visualizer */}
                 <div className="w-full lg:w-1/3 flex flex-col gap-6 relative z-10 bg-black/40 p-6 rounded-2xl border border-white/5">
                     <div>
                         <div className="flex items-center justify-between text-xs font-mono mb-2">
                             <span className="text-zinc-400">Cell Division</span>
                             <span className="text-emerald-400 font-bold tracking-widest uppercase text-[10px]">Growing</span>
                         </div>
                         <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                             <div className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 w-3/4 animate-[pulse_2s_infinite]" />
                         </div>
                     </div>
                     <div>
                         <div className="flex items-center justify-between text-xs font-mono mb-2">
                             <span className="text-zinc-400">Carbon-14</span>
                             <span className="text-rose-400 font-bold tracking-widest uppercase text-[10px]">Decaying</span>
                         </div>
                         <div className="h-3 bg-zinc-900 rounded-full overflow-hidden border border-white/5">
                             <div className="h-full bg-gradient-to-r from-rose-400 to-rose-600 w-1/4 animate-[pulse_3s_infinite]" />
                         </div>
                     </div>
                 </div>
            </div>
        </section>

        {/* SECTION 3: RULES OF LOGS */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">03 // The Expansion Rules</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Product Rule */}
                <div className="p-8 bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-3xl hover:border-amber-500/50 hover:bg-amber-900/10 transition-all group shadow-lg flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <Scale size={24} className="text-amber-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-amber-500 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Product</span>
                    </div>
                    <div className="bg-black/60 p-4 rounded-xl border border-white/5 shadow-inner mb-6 flex justify-center">
                        <M display={true}>\log_b(xy) = \log_b(x) + \log_b(y)</M>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-auto">
                        Multiplication compressed inside a logarithm expands into Addition outside.
                    </p>
                </div>

                {/* Quotient Rule */}
                <div className="p-8 bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-3xl hover:border-amber-500/50 hover:bg-amber-900/10 transition-all group shadow-lg flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <Activity size={24} className="text-amber-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-amber-500 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Quotient</span>
                    </div>
                    <div className="bg-black/60 p-4 rounded-xl border border-white/5 shadow-inner mb-6 flex justify-center">
                        <M display={true}>log_b(x/y) = log_b(x) - log_b(y)</M>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-auto">
                        Division compressed inside a logarithm expands into Subtraction outside.
                    </p>
                </div>

                {/* Power Rule */}
                <div className="p-8 bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-3xl hover:border-amber-500/50 hover:bg-amber-900/10 transition-all group shadow-lg flex flex-col">
                    <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-amber-500/10 rounded-xl group-hover:scale-110 transition-transform">
                            <ArrowUpRight size={24} className="text-amber-400" />
                        </div>
                        <span className="text-[10px] uppercase font-bold text-amber-500 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full">Power</span>
                    </div>
                    <div className="bg-black/60 p-4 rounded-xl border border-white/5 shadow-inner mb-6 flex justify-center">
                        <M display={true}>\log_b(x^n) = n \cdot \log_b(x)</M>
                    </div>
                    <p className="text-sm text-zinc-400 leading-relaxed mt-auto">
                        Exponents jump down to the front and multiply. The ultimate algebraic simplifier.
                    </p>
                </div>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Scaling Mastered</h3>
                    <p className="text-amber-100/50 text-sm font-sans font-light">You are ready to command complex continuous systems.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-amber-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                Back to Hub <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}