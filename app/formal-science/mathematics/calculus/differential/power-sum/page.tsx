import React from 'react';
import { ArrowLeft, Zap, Layers } from 'lucide-react';
import Link from 'next/link';
import PowerBackground from './_components/PowerBackground';
import PowerRuleLab from './_components/PowerRuleLab';
import { M } from '@/components/Math';

export default function PowerRulePage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-orange-900/30">
      <PowerBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/differential" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-orange-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-orange-500"></span>
                Lesson 2.2
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                THE POWER RULE
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                Using limits to find derivatives is slow. 
                Luckily, a pattern emerges that lets us differentiate polynomials in seconds.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Shortcut</h3>
            <p>
                If you take the derivative of <M>x^2</M>, you get <M>2x</M>.
                If you take the derivative of <M>x^3</M>, you get <M>3x^2</M>.
                Do you see the pattern?
            </p>
            
            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-orange-500 rounded-r-xl not-prose">
                <M display>{`\\frac{d}{dx}(x^n) = nx^{n-1}`}</M>
            </div>

            <p>
                The rule is simple: <strong>Bring the power down, then subtract one from the exponent.</strong>
            </p>

            <div className="not-prose my-16">
                <PowerRuleLab />
                <div className="text-center text-xs text-neutral-500 mt-2 italic">
                    Toggle the power to see how the derivative function (Red) relates to the original (Blue).
                </div>
            </div>

            <h3>The Sum Rule</h3>
            <p>
                What if you have multiple terms added together? 
                <M>f(x) = x^3 + x^2</M>.
            </p>
            <p>
                Good news: The derivative is a <strong>linear operator</strong>. 
                This means you can differentiate each piece separately and just add them up.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-orange-500"/> Example 1
                    </h4>
                    <M display>{`y = x^5 + x^3`}</M>
                    <div className="h-px bg-neutral-800 my-4"/>
                    <M display>{`y' = 5x^4 + 3x^2`}</M>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-orange-500"/> Example 2
                    </h4>
                    <M display>{`y = 3x^2 + 10x`}</M>
                    <div className="h-px bg-neutral-800 my-4"/>
                    <M display>{`y' = 6x + 10`}</M>
                </div>
            </div>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/differential/definition" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: Tangent Problem
            </Link>
            <Link href="#" className="text-sm font-bold text-orange-500 hover:text-orange-400">
                Next: Product Rule →
            </Link>
        </div>

      </div>
    </main>
  );
}