"use client";
import React from "react";
import Link from "next/link";
import InequalitiesBackground from "./InequalitiesBackground";
import { 
  ArrowLeft, MoveHorizontal, AlertCircle, 
  Circle, Disc, ArrowRight, ArrowLeft as ArrowIcon,
  ChevronsLeft, ChevronsRight, Minus
} from "lucide-react";

export default function InequalitiesPage() {
  return (
    <main className="relative min-h-screen bg-[#0c1221] text-white overflow-hidden font-mono selection:bg-sky-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <InequalitiesBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.05)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/math/algebra/elementary" className="flex items-center gap-2 text-xs text-sky-500 hover:text-white transition-colors mb-4 uppercase tracking-widest group">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_04
             </Link>
             <div className="flex items-end gap-6 border-b border-sky-500/30 pb-6">
                 <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(14,165,233,0.2)]">
                    <MoveHorizontal size={40} className="text-sky-400" />
                 </div>
                 <div>
                    <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                       INEQUALITIES
                    </h1>
                    <p className="text-sky-400/60 max-w-md text-sm leading-relaxed">
                        Comparing relative values. Greater than, less than, and the boundaries of solution sets.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: THE SYMBOLS (Logic Gates) */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-sky-500" />
                <h2 className="text-xl font-bold text-sky-300 uppercase tracking-widest">01 // The Comparison Logic</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* GREATER THAN */}
                <div className="p-6 bg-black/40 border border-sky-500/20 rounded-xl flex flex-col items-center hover:border-sky-500/50 transition-colors group">
                    <div className="text-4xl font-black text-white mb-2 group-hover:scale-125 transition-transform">&gt;</div>
                    <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">Greater Than</div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <Circle size={8} /> Open Circle
                    </div>
                </div>

                {/* LESS THAN */}
                <div className="p-6 bg-black/40 border border-sky-500/20 rounded-xl flex flex-col items-center hover:border-sky-500/50 transition-colors group">
                    <div className="text-4xl font-black text-white mb-2 group-hover:scale-125 transition-transform">&lt;</div>
                    <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">Less Than</div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <Circle size={8} /> Open Circle
                    </div>
                </div>

                {/* GREATER OR EQUAL */}
                <div className="p-6 bg-black/40 border border-sky-500/20 rounded-xl flex flex-col items-center hover:border-sky-500/50 transition-colors group">
                    <div className="text-4xl font-black text-white mb-2 group-hover:scale-125 transition-transform">≥</div>
                    <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">At Least</div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <Disc size={8} className="text-sky-500" /> Closed Circle
                    </div>
                </div>

                {/* LESS OR EQUAL */}
                <div className="p-6 bg-black/40 border border-sky-500/20 rounded-xl flex flex-col items-center hover:border-sky-500/50 transition-colors group">
                    <div className="text-4xl font-black text-white mb-2 group-hover:scale-125 transition-transform">≤</div>
                    <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-1">At Most</div>
                    <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                        <Disc size={8} className="text-sky-500" /> Closed Circle
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 2: THE GOLDEN RULE */}
        <section className="bg-sky-950/20 border border-sky-500/30 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <AlertCircle size={100} />
             </div>
             
             <div className="flex-1 relative z-10">
                 <h3 className="text-2xl font-bold text-white mb-2">The Golden Rule</h3>
                 <p className="text-sm text-sky-200/80 leading-relaxed max-w-lg">
                    When you <strong className="text-white">multiply or divide</strong> both sides of an inequality by a <strong className="text-red-400">negative number</strong>, you must <strong className="text-sky-400 bg-sky-500/10 px-1 rounded">FLIP</strong> the inequality symbol.
                 </p>
             </div>

             <div className="flex-1 bg-black/40 border border-white/10 rounded-lg p-6 font-mono text-center space-y-4">
                 <div className="text-lg opacity-50">-2x &lt; 10</div>
                 <div className="text-xs text-sky-500 uppercase">Divide by -2</div>
                 <div className="text-2xl font-bold flex items-center justify-center gap-4">
                    <span>x</span>
                    <span className="text-red-400 animate-pulse">&gt;</span>
                    <span>-5</span>
                 </div>
             </div>
        </section>

        {/* SECTION 3: COMPOUND INEQUALITIES */}
        <section>
            <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-8 bg-sky-500" />
                <h2 className="text-xl font-bold text-sky-300 uppercase tracking-widest">03 // Compound Logic</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* AND (Intersection) */}
                <div className="p-6 border border-sky-500/20 rounded-xl bg-black/20 backdrop-blur-md">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">"AND" (Intersection)</h3>
                        <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-1 rounded border border-sky-500/30">CONJUNCTION</span>
                     </div>
                     
                     <div className="h-12 bg-black/40 border border-white/10 rounded mb-4 relative flex items-center px-4">
                         {/* Visual Representation */}
                         <div className="absolute left-1/4 right-1/4 h-2 bg-sky-500/40 rounded-full" />
                         <div className="absolute left-1/4 w-3 h-3 bg-black border-2 border-sky-500 rounded-full z-10" />
                         <div className="absolute right-1/4 w-3 h-3 bg-sky-500 rounded-full z-10" />
                     </div>
                     <p className="text-xs text-zinc-400 font-mono text-center">
                        -2 &lt; x ≤ 5
                     </p>
                     <p className="text-xs text-zinc-500 mt-2 text-center">
                        Solution must satisfy BOTH conditions. The "Sandwich".
                     </p>
                </div>

                {/* OR (Union) */}
                <div className="p-6 border border-sky-500/20 rounded-xl bg-black/20 backdrop-blur-md">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">"OR" (Union)</h3>
                        <span className="text-[10px] bg-sky-500/20 text-sky-400 px-2 py-1 rounded border border-sky-500/30">DISJUNCTION</span>
                     </div>
                     
                     <div className="h-12 bg-black/40 border border-white/10 rounded mb-4 relative flex items-center px-4 overflow-hidden">
                         {/* Visual Representation */}
                         <div className="absolute right-3/4 left-0 h-2 bg-sky-500/40 rounded-full" />
                         <div className="absolute left-3/4 right-0 h-2 bg-sky-500/40 rounded-full" />
                         
                         <div className="absolute left-1/4 w-3 h-3 bg-black border-2 border-sky-500 rounded-full z-10 -translate-x-1/2" />
                         <div className="absolute right-1/4 w-3 h-3 bg-black border-2 border-sky-500 rounded-full z-10 translate-x-1/2" />
                         
                         <ArrowIcon size={12} className="absolute left-2 text-sky-500" />
                         <ArrowRight size={12} className="absolute right-2 text-sky-500" />
                     </div>
                     <p className="text-xs text-zinc-400 font-mono text-center">
                        x &lt; -3  OR  x &gt; 4
                     </p>
                     <p className="text-xs text-zinc-500 mt-2 text-center">
                        Solution satisfies EITHER condition. The "Split".
                     </p>
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}