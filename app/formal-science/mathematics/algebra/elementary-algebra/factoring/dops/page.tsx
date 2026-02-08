"use client";
import React from 'react';
import Link from 'next/link';
import GridSymmetry from "./GridSymmetry";
import DOPSVisualizer from "./DOPSVisualizer";
import DOPSPractice from "./DOPSPractice";
import MathRenderer from '@/components/MathRenderer';
import { 
  ArrowLeft, Grid, 
  Lightbulb, AlertTriangle, BookOpen, 
  Split, Divide
} from "lucide-react";

export default function DOPSPage() {
  return (
    <main className="relative min-h-screen bg-transparent text-slate-800 font-sans selection:bg-rose-200">
      
      {/* LAYER 0: Background Engine */}
      <GridSymmetry />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/algebra/elementary-algebra/factoring" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-rose-600 transition-colors bg-white/50 px-3 py-2 rounded backdrop-blur-sm border border-slate-200/50">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Back to Factoring
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/80 border border-slate-200 px-3 py-1 rounded text-slate-600 shadow-sm backdrop-blur-md">
                <Grid size={12} /> Unit 4.2
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 relative max-w-4xl mx-auto text-center">
            <div className="inline-block p-4 bg-rose-100/90 rounded-full text-rose-600 mb-8 shadow-sm backdrop-blur-sm animate-in zoom-in duration-500">
                <Split size={40} />
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-6 drop-shadow-sm">
                DIFFERENCE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">OF SQUARES</span>
            </h1>
            
            <p className="text-xl text-slate-600 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
                A perfect subtraction. When two perfect squares battle, the middle ground disappears, leaving a symmetrical pair of conjugates.
            </p>

            <div className="inline-flex items-center gap-2 px-5 py-3 bg-white/80 border border-slate-200 rounded-xl text-slate-600 text-xs font-bold uppercase tracking-wide shadow-sm font-mono">
                <MathRenderer expression="a^2 - b^2 = (a-b)(a+b)" />
            </div>
        </header>

        

        {/* SECTION 1: THE VISUALIZER */}
        <section className="mb-32">
            <div className="flex items-center justify-center gap-4 mb-12">
                <div className="h-px bg-slate-300 w-24" />
                <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <BookOpen size={20} className="text-rose-500" /> Conjugate Logic
                </h2>
                <div className="h-px bg-slate-300 w-24" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                <div className="lg:col-span-1 space-y-6 bg-white/80 backdrop-blur-md p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black uppercase flex items-center gap-2">
                        <Lightbulb size={20} className="text-slate-400" /> The Secret
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Why is there no middle term (like <MathRenderer expression="6x" />)?
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                        Because the factors are <strong>Conjugates</strong> (twins with opposite signs). When you expand them, the middle terms are exact opposites, so they destroy each other.
                    </p>
                    <div className="p-3 bg-indigo-50 rounded border border-indigo-100 shadow-sm text-center">
                        <div className="text-[10px] font-bold text-indigo-400 uppercase mb-1">Example</div>
                        <div className="text-xs font-mono text-indigo-900 font-bold">
                            +3x and -3x = 0
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <DOPSVisualizer />
                </div>
            </div>
        </section>

        {/* SECTION 2: GUIDED EXAMPLES */}
        <section className="mb-32 max-w-5xl mx-auto">
            <h2 className="text-3xl font-black uppercase text-center mb-12">Pattern Recognition</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Example 1 */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-indigo-500 shadow-lg hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-4">Case A: Basic</div>
                    <div className="text-2xl font-bold mb-6 text-slate-800">
                        <MathRenderer expression="x^2 - 64" />
                    </div>
                    <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex gap-3">
                            <span className="font-bold text-indigo-500 bg-indigo-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                            <span>Is it subtraction? <strong>Yes.</strong></span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-indigo-500 bg-indigo-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
                            <span>Are both terms squares? <strong>Yes (x and 8).</strong></span>
                        </li>
                    </ul>
                    <div className="mt-6 pt-6 border-t border-slate-100 font-bold text-lg text-center bg-slate-50 rounded-lg py-2">
                        Result: <MathRenderer expression="(x - 8)(x + 8)" />
                    </div>
                </div>

                {/* Example 2 */}
                <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border-l-4 border-rose-500 shadow-lg hover:-translate-y-1 transition-transform">
                    <div className="text-xs font-bold text-slate-400 uppercase mb-4">Case B: The Trap</div>
                    <div className="text-2xl font-bold mb-6 text-slate-800">
                        <MathRenderer expression="x^2 + 36" />
                    </div>
                    <ul className="space-y-4 text-sm text-slate-600">
                        <li className="flex gap-3">
                            <span className="font-bold text-rose-500 bg-rose-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">1</span>
                            <span>Is it subtraction? <strong>NO.</strong></span>
                        </li>
                        <li className="flex gap-3">
                            <span className="font-bold text-rose-500 bg-rose-50 w-6 h-6 flex items-center justify-center rounded-full text-xs">2</span>
                            <span>This is a <strong>Sum</strong> of Squares.</span>
                        </li>
                    </ul>
                    <div className="mt-auto pt-6 border-t border-slate-100 font-bold text-lg text-center text-rose-500 italic bg-slate-50 rounded-lg py-2">
                        Result: Prime
                    </div>
                </div>
            </div>
        </section>

        {/* SECTION 3: PRACTICE DRILL */}
        <section className="mb-24">
            <div className="flex items-center gap-4 mb-8 justify-center">
                 <AlertTriangle size={24} className="text-rose-500" />
                 <h2 className="text-3xl font-black uppercase">Test Your Skills</h2>
            </div>
            <DOPSPractice />
        </section>

      </div>
    </main>
  );
}