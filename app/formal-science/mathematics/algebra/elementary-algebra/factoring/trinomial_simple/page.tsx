"use client";
import React from 'react';
import Link from 'next/link';
import EquilibriumEngine from "./EquilibriumEngine";
import DiamondGame from "./DiamondGame";
import TrinomialDrill from "./TrinomialDrill";
import MathRenderer from '@/components/MathRenderer';
import { 
  ArrowLeft, Grid, 
  Scale, BookOpen, 
  HelpCircle, Divide
} from "lucide-react";

export default function TrinomialsPage() {
  return (
    <main className="relative min-h-screen bg-transparent text-slate-800 font-sans selection:bg-teal-200">
      
      {/* LAYER 0: Background Engine */}
      <EquilibriumEngine />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/factoring" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-teal-600 transition-colors bg-white/50 px-3 py-2 rounded backdrop-blur-sm border border-slate-200/50">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Factoring
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/80 border border-slate-200 px-3 py-1 rounded text-slate-600 shadow-sm backdrop-blur-md">
                <Grid size={12} /> Unit 4.3
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 relative max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 bg-teal-100/90 rounded-full text-teal-700 mb-8 shadow-sm backdrop-blur-sm animate-in zoom-in duration-500">
                <Scale size={40} />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6 drop-shadow-sm">
                SIMPLE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-600">TRINOMIALS</span>
            </h1>
            
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                The classic puzzle. Find two numbers that multiply to the end and add to the middle. It is a game of perfect balance.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/80 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold uppercase tracking-wide shadow-sm font-mono">
                <MathRenderer expression="x^2 + bx + c = (x+m)(x+n)" />
            </div>
        </header>

        

        {/* SECTION 1: THE GAME */}
        <section className="mb-32">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-slate-300 w-24" />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen size={20} className="text-teal-600" /> The Sum-Product Game
                </h2>
                <div className="h-px bg-slate-300 w-24" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-1 space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black uppercase flex items-center gap-2">
                        <HelpCircle size={20} className="text-slate-400" /> The Logic
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        To factor <MathRenderer expression="x^2 + bx + c" />, you are looking for two "Mystery Numbers" (m and n).
                    </p>
                    <div className="space-y-3">
                        <div className="p-3 bg-teal-50 rounded border border-teal-100 shadow-sm">
                            <div className="text-[10px] font-bold text-teal-600 uppercase mb-1">Rule 1: Product</div>
                            <div className="text-xs font-medium text-slate-700">They must multiply to <strong className="text-teal-700">c</strong> (Last term).</div>
                        </div>
                        <div className="p-3 bg-teal-50 rounded border border-teal-100 shadow-sm">
                            <div className="text-[10px] font-bold text-teal-600 uppercase mb-1">Rule 2: Sum</div>
                            <div className="text-xs font-medium text-slate-700">They must add to <strong className="text-teal-700">b</strong> (Middle term).</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <DiamondGame />
                </div>
            </div>
        </section>

        {/* SECTION 2: THE CHEAT SHEET */}
        <section className="mb-32 max-w-5xl mx-auto">
            <h2 className="text-3xl font-black uppercase text-center mb-12">The Sign Rules</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Case 1 */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-teal-500 shadow-lg hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-4">Case A: Last Term Positive (+)</div>
                    <div className="text-xl font-bold mb-4 text-slate-800">
                        <MathRenderer expression="x^2 - 7x + 10" />
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        If <strong>c</strong> is positive, the signs are the <strong>SAME</strong>. Look at the middle term to decide if they are both (+) or both (-).
                    </p>
                    <div className="bg-teal-50 p-3 rounded text-center font-bold text-teal-700 text-sm">
                        Result: (x - 2)(x - 5)
                    </div>
                </div>

                {/* Case 2 */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-yellow-500 shadow-lg hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-4">Case B: Last Term Negative (-)</div>
                    <div className="text-xl font-bold mb-4 text-slate-800">
                        <MathRenderer expression="x^2 + 3x - 10" />
                    </div>
                    <p className="text-sm text-slate-600 mb-4">
                        If <strong>c</strong> is negative, the signs are <strong>DIFFERENT</strong>. The "bigger" number gets the sign of the middle term.
                    </p>
                    <div className="bg-yellow-50 p-3 rounded text-center font-bold text-yellow-800 text-sm">
                        Result: (x + 5)(x - 2)
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: PRACTICE DRILL */}
        <section className="mb-24">
            <div className="flex items-center gap-4 mb-8 justify-center">
                 <Scale size={24} className="text-teal-600" />
                 <h2 className="text-3xl font-black uppercase">Balance The Equation</h2>
            </div>
            <TrinomialDrill />
        </section>

      </div>
    </main>
  );
}