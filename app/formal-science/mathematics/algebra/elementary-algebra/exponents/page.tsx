"use client";
import React from "react";
import Link from "next/link";
import LogBackground from "./LogBackground";
import { 
  ArrowLeft, Zap, TrendingUp, 
  RotateCcw, Microscope, Activity, 
  Scale, ArrowUpRight
} from "lucide-react";

export default function ExponentsPage() {
  return (
    <main className="relative min-h-screen bg-[#140a05] text-white overflow-hidden font-mono selection:bg-amber-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <LogBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-amber-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_10
             </Link>
             <div className="flex items-end gap-6 border-b border-amber-500/30 pb-6">
                 <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Zap size={40} className="text-amber-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       EXP & LOGS
                    </h1>
                    <p className="text-amber-400/60 max-w-md text-sm leading-relaxed">
                        The mathematics of rapid change. Growth, decay, and the inverse relationship of scale.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE INVERSE RELATIONSHIP */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <div className="h-px w-8 bg-amber-500" />
                    <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">01 // The Inverse</h2>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                    Addition has Subtraction. Multiplication has Division. <strong>Exponentiation</strong> has <strong>Logarithms</strong>. They undo each other.
                </p>
                
                <div className="flex items-center gap-4 text-2xl font-mono">
                    <div className="p-4 border border-amber-500/20 bg-black/40 rounded flex flex-col items-center">
                        <span className="text-amber-500 font-bold">2<sup className="text-white">x</sup> = 8</span>
                        <span className="text-[10px] text-zinc-500 mt-2">Exponential Form</span>
                    </div>
                    <RotateCcw className="text-amber-500/50" />
                    <div className="p-4 border border-amber-500/20 bg-black/40 rounded flex flex-col items-center">
                        <span className="text-amber-500 font-bold">log<sub className="text-xs">2</sub>(8) = <span className="text-white">x</span></span>
                        <span className="text-[10px] text-zinc-500 mt-2">Logarithmic Form</span>
                    </div>
                </div>
            </div>

            {/* Visualizer: The Mirror */}
            <div className="aspect-square relative border border-amber-500/30 rounded-xl bg-black/60 backdrop-blur-md flex items-center justify-center p-8 group">
                 
                 {/* Visual Reflection Line y=x */}
                 <div className="absolute w-[140%] h-px bg-white/20 -rotate-45 border-t border-dashed border-white/50" />
                 
                 {/* Exponential Curve */}
                 <div className="absolute w-full h-full border-r-4 border-amber-500 rounded-tr-full scale-50 translate-x-[-25%] translate-y-[25%]" />
                 <div className="absolute bottom-4 left-4 text-xs font-bold text-amber-500">y = bˣ</div>

                 {/* Log Curve */}
                 <div className="absolute w-full h-full border-t-4 border-amber-300 rounded-tr-full scale-50 translate-x-[-25%] translate-y-[25%]" />
                 <div className="absolute top-4 right-4 text-xs font-bold text-amber-300">y = log(x)</div>
            </div>
        </section>

        {/* SECTION 2: THE NATURAL LOG (e) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">02 // The Natural Number (e)</h2>
            </div>
            
            <div className="bg-amber-950/20 border border-amber-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 opacity-10 rotate-12">
                    <Microscope size={120} />
                 </div>
                 
                 <div className="flex-1">
                     <h3 className="text-2xl font-bold text-white mb-2">Continuous Growth</h3>
                     <p className="text-sm text-zinc-400 mb-4">
                        <strong>e ≈ 2.718...</strong> is the speed limit of the universe. It is used for population growth, radioactive decay, and compound interest.
                     </p>
                     <div className="flex gap-4">
                         <div className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/50 rounded text-xs">ln(x) = logₑ(x)</div>
                         <div className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/50 rounded text-xs">Pert</div>
                     </div>
                 </div>

                 <div className="w-px h-24 bg-amber-500/20 hidden md:block" />

                 <div className="flex-1 flex flex-col gap-2">
                     <div className="flex items-center justify-between text-xs font-mono">
                         <span className="text-zinc-500">Population</span>
                         <span className="text-amber-400 font-bold">Growing</span>
                     </div>
                     <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                         <div className="h-full bg-amber-500 w-3/4 animate-[pulse_2s_infinite]" />
                     </div>
                     <div className="flex items-center justify-between text-xs font-mono mt-2">
                         <span className="text-zinc-500">Radiation</span>
                         <span className="text-amber-400 font-bold">Decaying</span>
                     </div>
                     <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                         <div className="h-full bg-amber-500 w-1/4 animate-[pulse_3s_infinite]" />
                     </div>
                 </div>
            </div>
        </section>

        {/* SECTION 3: RULES OF LOGS */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-amber-500" />
                <h2 className="text-xl font-bold text-amber-300 uppercase tracking-widest">03 // The Expansion Rules</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Product Rule */}
                <div className="p-6 bg-black/40 border border-amber-500/20 rounded-xl hover:border-amber-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Scale size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-amber-600">Product</span>
                    </div>
                    <div className="font-mono text-sm text-amber-200 mb-2">log(ab) = log(a) + log(b)</div>
                    <p className="text-xs text-zinc-500">
                        Multiplication inside becomes Addition outside.
                    </p>
                </div>

                {/* Quotient Rule */}
                <div className="p-6 bg-black/40 border border-amber-500/20 rounded-xl hover:border-amber-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <Activity size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-amber-600">Quotient</span>
                    </div>
                    <div className="font-mono text-sm text-amber-200 mb-2">log(a/b) = log(a) - log(b)</div>
                    <p className="text-xs text-zinc-500">
                        Division inside becomes Subtraction outside.
                    </p>
                </div>

                {/* Power Rule */}
                <div className="p-6 bg-black/40 border border-amber-500/20 rounded-xl hover:border-amber-500/50 transition-colors group">
                    <div className="flex justify-between mb-4">
                        <ArrowUpRight size={20} className="text-amber-400 group-hover:scale-110 transition-transform" />
                        <span className="text-[10px] uppercase font-bold text-amber-600">Power</span>
                    </div>
                    <div className="font-mono text-sm text-amber-200 mb-2">log(xⁿ) = n • log(x)</div>
                    <p className="text-xs text-zinc-500">
                        Exponents jump down to the front. The ultimate simplifier.
                    </p>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}