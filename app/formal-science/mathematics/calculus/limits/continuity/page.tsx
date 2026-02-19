import React from 'react';
import { ArrowLeft, Activity } from 'lucide-react';
import Link from 'next/link';
import ContinuityBackground from './_components/ContinuityBackground';
import ContinuityLab from './_components/ContinuityLab';
import { M } from '@/components/Math';

export default function ContinuityPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-green-900/30">
      <ContinuityBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/limits" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-green-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-green-500"></span>
                Lesson 1.4
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                Continuity
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                In plain English: "Can you draw the graph without lifting your pen?"
                In Calculus: "Does the limit equal the function value?"
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Bridge Analogy</h3>
            <p>
                Imagine you are driving a car along the function graph. 
                For the road to be safe (continuous), three things must be true:
            </p>
            <ol>
                <li>There must be a bridge (The function is defined).</li>
                <li>The roads on both sides must line up (The limit exists).</li>
                <li>The bridge must be at the same height as the road (The value equals the limit).</li>
            </ol>

            <p>
                If any of these fail, you have a <strong>discontinuity</strong>. Use the lab below to repair the broken bridge by aligning the function value with the limit.
            </p>

            <div className="not-prose my-12">
                <ContinuityLab />
            </div>

            <h3>Formal Definition</h3>
            <p>
                A function <M>f(x)</M> is continuous at a point <M>x=c</M> if and only if:
            </p>
            <div className="my-8 p-8 bg-neutral-900/50 border-l-4 border-green-500 rounded-r-xl not-prose text-center">
                <span className="text-3xl font-serif italic text-white">
                    <M display>{`\\lim_{x \\to c} f(x) = f(c)`}</M>
                </span>
            </div>

            <h3>Types of Discontinuities</h3>
            

[Image of types of discontinuity graphs]

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Removable (Hole)</h4>
                    <p className="text-sm text-neutral-400">The limit exists, but there's a hole in the graph. This is what you fixed in the lab above.</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Jump</h4>
                    <p className="text-sm text-neutral-400">The left and right limits don't match. The graph snaps to a new elevation.</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <h4 className="text-white font-bold mb-2">Infinite</h4>
                    <p className="text-sm text-neutral-400">The function explodes to infinity (Vertical Asymptote). The road hits a wall.</p>
                </div>
            </div>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/limits/infinity" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: Infinite Limits
            </Link>
            <Link href="#" className="text-sm font-bold text-green-400 hover:text-green-300">
                Next: Derivatives →
            </Link>
        </div>

      </div>
    </main>
  );
}