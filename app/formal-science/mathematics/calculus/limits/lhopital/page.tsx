import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import DerivativeBackground from './_components/DerivativeBackground';
import LhopitalLab from './_components/LhopitalLab';
import { M } from '@/components/Math';

export default function LhopitalPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-red-900/30">
      <DerivativeBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/limits" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-red-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-red-500"></span>
                Lesson 1.5
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                L'HÔPITAL'S RULE
            </h1>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>Indeterminate Forms</h3>
            <p>
                Sometimes, you get <M>0/0</M> or <M>\infty/\infty</M>, and factoring is impossible. 
                For example:
            </p>
            <M display>{`\\lim_{x \\to 0} \\frac{\\sin(x)}{x}`}</M>
            <p>There is nothing to factor!</p>

            <h3>The Intuition</h3>
            <p>
                Imagine two cars racing toward a finish line (Zero). They both arrive at the same time. 
                Who was faster? We check their speedometers (Derivatives) at the moment they crossed.
            </p>

            <div className="not-prose">
                <LhopitalLab />
            </div>

            <h3>The Theorem</h3>
            <div className="my-8 p-8 bg-neutral-900/50 border-l-4 border-red-500 rounded-r-xl not-prose">
                <M display>{`\\lim_{x \\to c} \\frac{f(x)}{g(x)} = \\lim_{x \\to c} \\frac{f'(x)}{g'(x)}`}</M>
                <div className="text-center text-xs text-neutral-500 mt-4 font-sans uppercase tracking-widest">
                    Only valid if f(x) and g(x) both approach 0 or <M>\infty</M>
                </div>
            </div>

            <p>
                This is widely considered the most powerful shortcut in limits. Instead of struggling with geometry or algebra, 
                you simply take the derivative of the top and bottom separately, and try again.
            </p>

        </article>
      </div>
    </main>
  );
}