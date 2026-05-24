"use client";
import React from "react";
import Link from "next/link";
import InequalitiesBackground from "./_components/InequalitiesBackground";
import InequalityExplorerLab from "./_components/InequalityExplorerLab";
import { 
  ArrowLeft, MoveHorizontal, AlertCircle, 
  Circle, Disc, ArrowRight, ArrowLeft as ArrowIcon,
  CheckCircle2, Target
} from "lucide-react";

export default function InequalitiesPage() {
  return (
    <main className="relative min-h-screen bg-[#081326] text-white overflow-hidden font-sans selection:bg-sky-500/30 pb-32">
      
      {/* 1. VISUAL ENGINE */}
      <InequalitiesBackground />
      
      {/* OVERLAY */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none z-0" />

      {/* 2. UI CONTAINER */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12 flex flex-col gap-20">
        
        {/* HEADER */}
        <header>
             <Link href="/formal-science/mathematics/algebra/elementary-algebra" className="flex items-center gap-2 text-xs text-sky-400 hover:text-white transition-colors mb-8 uppercase tracking-widest group bg-black/40 border border-sky-500/30 px-4 py-2 rounded-full w-max backdrop-blur-md">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Integrated_Algebra // Mod_04
             </Link>
             <div className="flex flex-col md:flex-row items-start md:items-end gap-6 border-b border-white/10 pb-8">
                 <div className="p-4 bg-sky-500/10 border border-sky-500/30 rounded-2xl backdrop-blur-xl relative overflow-hidden group shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                    <MoveHorizontal size={48} className="text-sky-400 relative z-10" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4 drop-shadow-lg">
                       INEQUALITIES
                    </h1>
                    <p className="text-sky-100/60 max-w-2xl text-lg leading-relaxed font-light border-l-2 border-sky-500/50 pl-6">
                        Comparing relative values. Moving beyond a single solution to discover the infinite boundaries of truth.
                    </p>
                 </div>
             </div>
        </header>

        {/* SECTION 1: SIMULATION DECK */}
        <section className="space-y-8">
            <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-sky-500" />
                <h2 className="text-xl font-bold text-sky-300 uppercase tracking-widest">01 // The Region Mapper</h2>
            </div>
            
            <div className="bg-slate-900/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-8">
                    <div className="flex-1">
                        <h3 className="text-3xl font-black text-white mb-4">Infinite Solutions</h3>
                        <p className="text-sm text-slate-300 font-sans leading-relaxed mb-6">
                            An equation ($x = 5$) has exactly one answer. An inequality ($x {'>'} 5$) represents an infinite set of numbers. Use the lab below to map out the shaded regions of truth!
                        </p>
                    </div>
                </div>

                {/* INJECTED LAB */}
                <InequalityExplorerLab />
            </div>
        </section>

        {/* SECTION 2: THE SYMBOLS (Logic Gates) */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-sky-500" />
                <h2 className="text-xl font-bold text-sky-300 uppercase tracking-widest">02 // The Logic Gates</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {/* GREATER THAN */}
                <div className="p-8 bg-black/40 backdrop-blur-md border border-sky-500/20 rounded-2xl flex flex-col items-center hover:border-sky-500/50 hover:bg-sky-900/20 transition-all group shadow-lg">
                    <div className="text-5xl font-mono font-black text-white mb-4 group-hover:scale-125 group-hover:text-sky-300 transition-transform drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">&gt;</div>
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2 text-center">Greater Than</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <Circle size={10} className="text-slate-300" /> Open Circle
                    </div>
                </div>

                {/* LESS THAN */}
                <div className="p-8 bg-black/40 backdrop-blur-md border border-sky-500/20 rounded-2xl flex flex-col items-center hover:border-sky-500/50 hover:bg-sky-900/20 transition-all group shadow-lg">
                    <div className="text-5xl font-mono font-black text-white mb-4 group-hover:scale-125 group-hover:text-sky-300 transition-transform drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">&lt;</div>
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2 text-center">Less Than</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <Circle size={10} className="text-slate-300" /> Open Circle
                    </div>
                </div>

                {/* GREATER OR EQUAL */}
                <div className="p-8 bg-black/40 backdrop-blur-md border border-sky-500/20 rounded-2xl flex flex-col items-center hover:border-sky-500/50 hover:bg-sky-900/20 transition-all group shadow-lg">
                    <div className="text-5xl font-mono font-black text-white mb-4 group-hover:scale-125 group-hover:text-sky-300 transition-transform drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">≥</div>
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2 text-center">At Least</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <Disc size={10} className="text-sky-400" /> Closed Circle
                    </div>
                </div>

                {/* LESS OR EQUAL */}
                <div className="p-8 bg-black/40 backdrop-blur-md border border-sky-500/20 rounded-2xl flex flex-col items-center hover:border-sky-500/50 hover:bg-sky-900/20 transition-all group shadow-lg">
                    <div className="text-5xl font-mono font-black text-white mb-4 group-hover:scale-125 group-hover:text-sky-300 transition-transform drop-shadow-[0_0_15px_rgba(14,165,233,0.5)]">≤</div>
                    <div className="text-xs font-bold text-sky-400 uppercase tracking-widest mb-2 text-center">At Most</div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <Disc size={10} className="text-sky-400" /> Closed Circle
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: THE GOLDEN RULE */}
        <section className="bg-gradient-to-br from-sky-950/40 to-indigo-950/40 border border-sky-500/30 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden backdrop-blur-xl shadow-2xl">
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <AlertCircle size={200} />
             </div>
             
             <div className="flex-1 relative z-10">
                 <div className="flex items-center gap-3 mb-4">
                     <AlertCircle className="text-rose-400" size={24} />
                     <h3 className="text-3xl font-black text-white">The Golden Rule</h3>
                 </div>
                 <p className="text-base text-sky-100/80 leading-relaxed max-w-lg">
                    You solve inequalities exactly like regular equations with one major exception: When you <strong className="text-white">multiply or divide</strong> both sides by a <strong className="text-rose-400">negative number</strong>, you must <strong className="text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded uppercase tracking-wider mx-1 border border-sky-500/30 shadow-[0_0_10px_rgba(14,165,233,0.3)]">FLIP</strong> the inequality symbol!
                 </p>
             </div>

             <div className="w-full md:w-auto bg-black/60 border border-white/10 rounded-2xl p-8 font-mono text-center space-y-6 relative z-10 shadow-inner">
                 <div className="text-xl text-slate-400">-2x <span className="mx-2">&lt;</span> 10</div>
                 <div className="text-[10px] text-rose-400 font-sans font-bold uppercase tracking-widest bg-rose-500/10 py-1.5 px-4 rounded-full inline-block border border-rose-500/20">Divide by -2</div>
                 <div className="text-4xl font-black text-white flex items-center justify-center gap-4">
                    <span>x</span>
                    <span className="text-sky-400 drop-shadow-[0_0_15px_rgba(14,165,233,0.8)] scale-125 transition-transform hover:rotate-180 cursor-help" title="Flipped!">&gt;</span>
                    <span>-5</span>
                 </div>
             </div>
        </section>

        {/* SECTION 4: COMPOUND INEQUALITIES */}
        <section>
            <div className="flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-sky-500" />
                <h2 className="text-xl font-bold text-sky-300 uppercase tracking-widest">04 // Compound Logic</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* AND (Intersection) */}
                <div className="p-8 border border-sky-500/20 rounded-2xl bg-black/40 backdrop-blur-xl shadow-lg hover:border-sky-500/40 transition-colors">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">"AND"</h3>
                        <span className="text-[10px] bg-sky-500/10 text-sky-400 px-3 py-1 rounded-full border border-sky-500/30 uppercase tracking-widest font-bold">Intersection</span>
                     </div>
                     
                     <div className="h-16 bg-black/60 border border-white/10 rounded-xl mb-6 relative flex items-center px-6 shadow-inner">
                         {/* Visual Representation */}
                         <div className="absolute left-1/4 right-1/4 h-2 bg-sky-500/60 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.5)]" />
                         <div className="absolute left-1/4 w-4 h-4 bg-black border-[3px] border-sky-400 rounded-full z-10" />
                         <div className="absolute right-1/4 w-4 h-4 bg-sky-400 rounded-full z-10" />
                     </div>
                     <p className="text-lg text-white font-mono font-bold text-center mb-2 bg-white/5 py-2 rounded-lg border border-white/5">
                        -2 &lt; x ≤ 5
                     </p>
                     <p className="text-sm text-sky-200/60 text-center leading-relaxed">
                        The solution must satisfy BOTH conditions. It creates a shaded "sandwich" between two boundaries.
                     </p>
                </div>

                {/* OR (Union) */}
                <div className="p-8 border border-indigo-500/20 rounded-2xl bg-black/40 backdrop-blur-xl shadow-lg hover:border-indigo-500/40 transition-colors">
                     <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold text-white">"OR"</h3>
                        <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full border border-indigo-500/30 uppercase tracking-widest font-bold">Union</span>
                     </div>
                     
                     <div className="h-16 bg-black/60 border border-white/10 rounded-xl mb-6 relative flex items-center px-6 shadow-inner overflow-hidden">
                         {/* Visual Representation */}
                         <div className="absolute right-3/4 left-0 h-2 bg-indigo-500/60 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                         <div className="absolute left-3/4 right-0 h-2 bg-indigo-500/60 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                         
                         <div className="absolute left-1/4 w-4 h-4 bg-black border-[3px] border-indigo-400 rounded-full z-10 -translate-x-1/2" />
                         <div className="absolute right-1/4 w-4 h-4 bg-black border-[3px] border-indigo-400 rounded-full z-10 translate-x-1/2" />
                         
                         <ArrowIcon size={16} className="absolute left-3 text-indigo-400" />
                         <ArrowRight size={16} className="absolute right-3 text-indigo-400" />
                     </div>
                     <p className="text-lg text-white font-mono font-bold text-center mb-2 bg-white/5 py-2 rounded-lg border border-white/5">
                        x &lt; -3  <span className="text-indigo-400 mx-2 text-sm">OR</span>  x &gt; 4
                     </p>
                     <p className="text-sm text-indigo-200/60 text-center leading-relaxed">
                        The solution satisfies EITHER condition. It splits outwards away from the center boundaries.
                     </p>
                </div>
            </div>
        </section>

        {/* =========================================
            PRACTICE ARENA (PLACEHOLDER)
        ========================================= */}
        <section className="mt-12 pt-12 border-t border-white/10">
            <div className="flex items-center gap-3 mb-8">
                <div className="h-4 w-1 bg-amber-500 rounded-full" />
                <h2 className="text-sm font-bold text-amber-300 uppercase tracking-widest font-sans">Practice Arena // Coming Soon</h2>
            </div>
            
            <div className="w-full bg-black/40 border border-dashed border-amber-500/30 rounded-3xl p-12 flex flex-col items-center justify-center text-center backdrop-blur-sm">
                <Target size={48} className="text-amber-500/50 mb-4" />
                <h3 className="text-2xl font-black text-white mb-2 font-sans">Dynamic Problem Sets</h3>
                <p className="text-amber-200/60 max-w-md text-sm font-sans">
                    The question engine is offline while we construct the generation architecture. Check back soon for infinite practice problems!
                </p>
            </div>
        </section>

        {/* FOOTER / NAVIGATION */}
        <div className="mt-4 flex flex-col md:flex-row items-center justify-between gap-8 bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-xl">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-inner">
                    <CheckCircle2 size={32} />
                </div>
                <div>
                    <h3 className="text-xl font-black text-white">Phase 1 Complete</h3>
                    <p className="text-sky-100/50 text-sm font-sans font-light">You have mastered linear realities and boundaries.</p>
                </div>
            </div>
            
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/quadratic-equations" className="group flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-sky-400 hover:text-black transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]">
                Start Phase 2: Quadratics <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

      </div>
    </main>
  );
}