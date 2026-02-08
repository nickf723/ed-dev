"use client";
import React from 'react';
import Link from 'next/link';
import PrimeRain from "./PrimeRain"; // NEW Engine
import GCFVisualizer from "./GCFVisualizer";
import GCFPracticeDrill from "./GCFPracticeDrill";
import MathRenderer from '@/components/MathRenderer';
import { 
  ArrowLeft, Grid, Search, 
  Lightbulb, AlertTriangle, BookOpen, 
  Layers, Divide
} from "lucide-react";

export default function GCFPage() {
  return (
    <main className="relative min-h-screen bg-transparent text-slate-800 font-sans selection:bg-green-200">
      
      {/* LAYER 0: Background Engine */}
      <PrimeRain />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/factoring" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-green-700 transition-colors bg-white/50 px-3 py-2 rounded backdrop-blur-sm border border-slate-200/50">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Factoring
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/80 border border-slate-200 px-3 py-1 rounded text-slate-600 shadow-sm backdrop-blur-md">
                <Grid size={12} /> Unit 4.1
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 relative max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 bg-green-100/90 rounded-full text-green-700 mb-8 shadow-sm backdrop-blur-sm animate-in zoom-in duration-500">
                <Divide size={40} />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6 drop-shadow-sm">
                GREATEST <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">COMMON FACTOR</span>
            </h1>
            
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                The "Golden Rule" of factoring. Before applying any complex techniques, you must always check if you can divide out a common term.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-yellow-50/90 border border-yellow-200 rounded-xl text-yellow-800 text-xs font-bold uppercase tracking-wide shadow-sm">
                <AlertTriangle size={16} /> Always Check This First!
            </div>
        </header>

        

        {/* SECTION 1: THE ATOMIC BREAKDOWN */}
        <section className="mb-32">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-slate-300 w-24" />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <Layers size={20} className="text-green-600" /> Atomic Decomposition
                </h2>
                <div className="h-px bg-slate-300 w-24" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-1 space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black uppercase flex items-center gap-2">
                        <BookOpen size={20} className="text-slate-400" /> The Logic
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Polynomials are built from "Atomic" parts: numbers and variables. To find the GCF, we must split them apart.
                    </p>
                    <div className="space-y-3">
                        <div className="p-3 bg-white rounded border border-slate-100 shadow-sm">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Numbers</div>
                            <div className="text-xs font-mono">12 → 2 · 2 · 3</div>
                        </div>
                        <div className="p-3 bg-white rounded border border-slate-100 shadow-sm">
                            <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Variables</div>
                            <div className="text-xs font-mono">x³ → x · x · x</div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <GCFVisualizer />
                </div>
            </div>
        </section>

        {/* SECTION 2: GUIDED EXAMPLES */}
        <section className="mb-32 max-w-5xl mx-auto">
            <h2 className="text-3xl font-black uppercase text-center mb-12">Guided Walkthrough</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Example 1 */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-blue-500 shadow-lg hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-4">Example A: Standard</div>
                    <div className="text-2xl font-bold mb-6 text-slate-800">
                        <MathRenderer expression="4x^2 - 8x" />
                    </div>
                    <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-500 bg-blue-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                            <span>The GCF of 4 and 8 is <strong>4</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-500 bg-blue-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
                            <span>Both have x. Lowest power is <strong>x^1</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-blue-500 bg-blue-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">3</span>
                            <span>Divide both terms by <strong>4x</strong>.</span>
                        </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-slate-100 font-bold text-lg text-center bg-slate-50 rounded-lg py-2">
                        Result: <MathRenderer expression="4x(x - 2)" />
                    </div>
                </div>

                {/* Example 2 */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-purple-500 shadow-lg hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-4">Example B: Prime</div>
                    <div className="text-2xl font-bold mb-6 text-slate-800">
                        <MathRenderer expression="3x^3 + 5x^2 + 7" />
                    </div>
                    <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex gap-3">
                            <span className="font-bold text-purple-500 bg-purple-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                            <span>GCF of 3, 5, 7 is <strong>1</strong>.</span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-purple-500 bg-purple-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
                            <span>The last term (7) has no x. Cannot pull variable.</span>
                        </li>
                    </ul>
                    <div className="mt-auto pt-6 border-t border-slate-100 font-bold text-lg text-center text-slate-400 italic bg-slate-50 rounded-lg py-2">
                        Result: Prime (Cannot be factored)
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: PRACTICE DRILL */}
        <section className="mb-24">
            <div className="flex items-center gap-4 mb-8 justify-center">
                 <Lightbulb size={24} className="text-yellow-500" />
                 <h2 className="text-3xl font-black uppercase">Check Your Understanding</h2>
            </div>
            <GCFPracticeDrill />
        </section>

      </div>
    </main>
  );
}