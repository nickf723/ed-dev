import React from 'react';
import { ArrowLeft, Spline, ShieldHalf } from 'lucide-react';
import Link from 'next/link';
import FTCBackground from './_components/FtcBackground2';
import FTCLab from './_components/FTCLab';
import { M } from '@/components/Math'; // Replaced with your new standard import!

export default function FTCPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-indigo-900/30">
      <FTCBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/integral" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-indigo-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-indigo-500"></span>
                Lesson 3.3
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                THE FUNDAMENTAL THEOREM
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                For centuries, calculating slopes and calculating areas were thought to be completely unrelated problems. 
                This theorem proves they are two sides of the same coin.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>Part 1: The Accumulator</h3>
            <p>
                Imagine a function <M>F(x)</M> that represents "Area Accumulation." As you plug in a larger <M>x</M>, it sweeps across the graph of <M>f(t)</M> and calculates the area up to that point.
            </p>
            
            <p>
                The first part of the Fundamental Theorem states that <strong>the rate at which area accumulates is exactly equal to the height of the curve.</strong>
            </p>

            <div className="not-prose my-16">
                <FTCLab />
                <div className="text-center text-xs text-neutral-500 mt-2 italic">
                    Notice how the Height on the left is always exactly equal to the Slope on the right.
                </div>
            </div>

            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-indigo-500 rounded-r-xl not-prose text-center">
                <div className="text-xs uppercase font-bold text-indigo-400 mb-4 tracking-widest">FTC: Part 1</div>
                <M display>{`\\frac{d}{dx} \\left[ \\int_{a}^{x} f(t) \\,dt \\right] = f(x)`}</M>
            </div>

            <p>
                In plain English: "The derivative of the integral of a function is just the original function." 
                They cancel each other out, like multiplication and division.
            </p>

            <h3>Part 2: The Shortcut</h3>
            <p>
                This realization completely breaks Calculus wide open. If integration is just "reverse differentiation," we don't need to draw infinite Riemann sums anymore!
            </p>
            <p>
                To find the exact area under a curve between <M>a</M> and <M>b</M>, all you have to do is find the <strong>Antiderivative</strong> (the function whose derivative is the curve), and subtract the start from the end.
            </p>
            

            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-indigo-500 rounded-r-xl not-prose text-center">
                <div className="text-xs uppercase font-bold text-indigo-400 mb-4 tracking-widest">FTC: Part 2</div>
                <M display>{`\\int_{a}^{b} f(x) \\,dx = F(b) - F(a)`}</M>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Spline size={18} className="text-indigo-500"/> Step 1: Antiderivative
                    </h4>
                    <p className="text-sm text-neutral-400 mb-4">Find the function <M>F(x)</M> that would result in your current curve if differentiated.</p>
                    <div className="bg-black p-3 rounded text-center">
                        <M>{`\\int 2x \\,dx \\implies F(x) = x^2`}</M>
                    </div>
                </div>
                
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <ShieldHalf size={18} className="text-indigo-500"/> Step 2: Evaluate
                    </h4>
                    <p className="text-sm text-neutral-400 mb-4">Plug the bounds into the antiderivative and subtract.</p>
                    <div className="bg-black p-3 rounded text-center text-sm">
                        <M>{`F(3) - F(1) = 3^2 - 1^2 = 8`}</M>
                    </div>
                </div>
            </div>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/integral/definite" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: Definite Integrals
            </Link>
            <Link href="/formal-science/mathematics/calculus/integral/u-sub" className="text-sm font-bold text-indigo-500 hover:text-indigo-400">
                Next: U-Substitution →
            </Link>
        </div>

      </div>
    </main>
  );
}