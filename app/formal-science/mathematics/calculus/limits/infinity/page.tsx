import React from 'react';
import { ArrowLeft, BookOpen, Quote } from 'lucide-react';
import Link from 'next/link';
import InfinityBackground from './_components/InfinityBackground';
import InfiniteLab from './_components/InfiniteLab';
import { M } from '@/components/Math';

export default function InfiniteLimitsPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-purple-900/30">
      <InfinityBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* NAV */}
        <Link href="/formal-science/mathematics/calculus/limits" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors">
            <ArrowLeft size={14} /> CHAPTER 1: LIMITS
        </Link>

        {/* TITLE */}
        <header className="mb-16">
            <div className="flex items-center gap-3 text-purple-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-purple-500"></span>
                Lesson 1.3
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                Infinite Limits
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                Most limits ask "What value are we approaching?" Infinite limits ask a different question: 
                "How fast are we exploding?"
            </p>
        </header>

        {/* ARTICLE CONTENT */}
        <article className="prose prose-invert prose-lg max-w-none">
            
            {/* SECTION 1 */}
            <h3>The Division Problem</h3>
            <p>
                In arithmetic, you were taught that dividing by zero is illegal. It is "undefined." 
                But in Calculus, we don't care about what happens <em>at</em> zero. We care about what happens 
                when we get <em>close</em> to zero.
            </p>
            <p>
                Let's look at the function $f(x) = 1/x$. Try plugging in smaller and smaller numbers:
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8 not-prose">
                {[0.1, 0.01, 0.001, 0.0001].map(val => (
                    <div key={val} className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl text-center">
                        <div className="text-xs text-neutral-500 mb-1">1 / {val}</div>
                        <div className="text-2xl font-mono font-bold text-purple-400">{1/val}</div>
                    </div>
                ))}
            </div>

            <p>
                As the denominator shrinks, the result grows. If we get infinitely close to zero, 
                the result becomes infinitely large. We call this a <strong>Vertical Asymptote</strong>.
            </p>

            {/* INTERACTIVE LAB EMBED */}
            <div className="not-prose my-12">
                <InfiniteLab />
                <div className="text-center text-xs text-neutral-500 mt-2 italic">
                    Figure 1: Investigating behavior near the asymptote.
                </div>
            </div>

            {/* SECTION 2 */}
            <h3>Formal Notation</h3>
            <p>
                Infinity (<M>\infty</M>) is not a number. You cannot hold it in your hand. 
                It is a way of describing behavior. When we write:
            </p>
            
            <div className="my-8 p-8 bg-neutral-900/50 border-l-4 border-purple-500 rounded-r-xl not-prose text-center">
                <span className="text-3xl font-serif italic text-white">
                    <M display>{`\\lim_{x \\to 0} f(x) = \\infty`}</M>
                </span>
            </div>

            <p>
                We are saying: "As <M>x</M> gets closer to 0, <M>f(x)</M> gets larger than any number you can imagine." 
                The line never hits a ceiling. It goes up forever.
            </p>

            <h3>One-Sided Behavior</h3>
            <p>
                Notice in the lab above (switch to $1/x$) that approaching from the left gives negative infinity ($-\infty$), 
                while the right gives positive infinity <M>\infty</M>.
            </p>
            <ul className="list-disc pl-4 space-y-2 text-neutral-400">
                <li><strong className="text-white">Left Limit:</strong> <M>{`\\lim_{x \\to 0^-} \\frac{1}{x} = -\\infty`}</M></li>
                <li><strong className="text-white">Right Limit:</strong> <M>{`\\lim_{x \\to 0^+} \\frac{1}{x} = +\\infty`}</M></li>
            </ul>
            <p className="mt-4">
                Because the left and right sides don't agree (one goes up, one goes down), 
                the general limit <strong>does not exist (DNE)</strong>.
            </p>

        </article>

        {/* FOOTER NAV */}
        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="#" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: The Limit Laws
            </Link>
            <Link href="/formal-science/mathematics/calculus/limits/continuity" className="text-sm font-bold text-purple-400 hover:text-purple-300">
                Next: Continuity →
            </Link>
        </div>

      </div>
    </main>
  );
}