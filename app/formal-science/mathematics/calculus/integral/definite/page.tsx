import React from 'react';
import { ArrowLeft, Sigma, Type, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import DefiniteBackground from './_components/DefiniteBackground';
import DefiniteLab from './_components/DefiniteLab';
import { M } from '@/components/Math';

export default function DefiniteIntegralPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-blue-900/30">
      <DefiniteBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/integral" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-blue-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-blue-500"></span>
                Lesson 3.2
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                THE DEFINITE INTEGRAL
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                We push the Riemann Sum to its absolute limit. 
                The rectangles become infinitely thin, and the jagged approximation melts into exact truth.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Transition to Infinity</h3>
            <p>
                In the last lesson, we saw that as the number of rectangles (<M>n</M>) increases, our area estimate gets better.
                What happens if we take the <strong>limit</strong> as <M>n \to \infty</M>?
            </p>
            
            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-blue-500 rounded-r-xl not-prose flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="text-center">
                    <div className="text-xs text-neutral-500 uppercase font-bold tracking-widest mb-4">Discrete (Riemann)</div>
                    <M display>{`\\sum_{i=1}^{n} f(x_i) \\Delta x`}</M>
                </div>
                <ArrowRight size={24} className="text-blue-500 hidden md:block" />
                <div className="text-center">
                    <div className="text-xs text-blue-500 uppercase font-bold tracking-widest mb-4">Continuous (Integral)</div>
                    <M display>{`\\int_{a}^{b} f(x) \\,dx`}</M>
                </div>
            </div>

            <p>
                The rigid, blocky Greek Sigma (<M>\Sigma</M>) stretches out and becomes the smooth, flowing Integral sign (<M>\int</M>).
                The wide, chunky <M>\Delta x</M> shrinks into the infinitesimally thin <M>dx</M>.
            </p>

            <h3>The Quirk: Signed Area</h3>
            <p>
                There is a massive difference between "Geometric Area" (which you learned in grade school) and "Definite Integral Area."
            </p>
            <p>
                Because the integral multiplies the height of the curve <M>f(x)</M> by the width <M>dx</M>, <strong>if the curve dips below the x-axis, its height is negative</strong>. Therefore, any area below the axis counts as negative area!
            </p>

            

            <div className="not-prose my-16">
                <DefiniteLab />
            </div>

            <h3>Why Negative Area Makes Sense</h3>
            <p>
                If this feels wrong, think about Physics. 
                Imagine <M>f(x)</M> is your velocity. When the graph is above the axis, you are driving <strong>forward</strong> (positive area = positive distance traveled). 
            </p>
            <p>
                When the graph dips below the axis, your velocity is negative. You put the car in <strong>reverse</strong>. 
                The negative area represents the distance you drove backward, subtracting from your total displacement.
            </p>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/integral/riemann" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: Riemann Sums
            </Link>
            <Link href="/formal-science/mathematics/calculus/integral/ftc" className="text-sm font-bold text-blue-500 hover:text-blue-400">
                Next: Fundamental Theorem →
            </Link>
        </div>

      </div>
    </main>
  );
}