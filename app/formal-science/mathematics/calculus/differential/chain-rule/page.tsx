import React from 'react';
import { ArrowLeft, GitMerge, Layers, Combine } from 'lucide-react';
import Link from 'next/link';
import ChainBackground from './_components/ChainBackground';
import ChainRuleLab from './_components/ChainRuleLab';
import { M } from '@/components/Math';

export default function ChainRulePage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-green-900/30">
      <ChainBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/differential/product-quotient" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-green-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-green-500"></span>
                Lesson 2.4
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                THE CHAIN RULE
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                Most functions in the real world aren't simple. They are nested inside each other. 
                The Chain Rule allows us to peel them apart, layer by layer.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>Composite Functions</h3>
            <p>
                Imagine a function inside a function: <M>y = \sin(x^2)</M>.
                You can't just say the derivative is <M>\cos(2x)</M>. You have to account for how fast the <em>inside</em> is changing too.
            </p>

            <div className="not-prose my-12">
                <ChainRuleLab />
            </div>

            <h3>The Formula</h3>
            <p>
                The rule states that the total rate of change is the <strong>product</strong> of the individual rates.
            </p>
            
            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-green-500 rounded-r-xl not-prose text-center">
                <M display>{`\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}`}</M>
                <div className="text-sm font-mono text-neutral-500 mt-4">
                    Outer Derivative &times; Inner Derivative
                </div>
            </div>

            <h3>The "Onion" Strategy</h3>
            <p>
                To solve these problems, work from the outside in.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Combine size={18} className="text-green-500"/> Step 1: Identify Layers
                    </h4>
                    <p className="text-sm text-neutral-400 mb-2">For <M>y = (3x+1)^5</M>:</p>
                    <ul className="text-sm space-y-1">
                        <li><strong className="text-yellow-400">Outer:</strong> <M>(\dots)^5</M></li>
                        <li><strong className="text-blue-400">Inner:</strong> <M>3x+1</M></li>
                    </ul>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Layers size={18} className="text-green-500"/> Step 2: Differentiate Layers
                    </h4>
                    <ul className="text-sm space-y-1">
                        <li><strong className="text-yellow-400">Outer Rate:</strong> <M>5(\dots)^4</M></li>
                        <li><strong className="text-blue-400">Inner Rate:</strong> <M>3</M></li>
                    </ul>
                    <div className="mt-4 pt-4 border-t border-neutral-800 font-bold text-green-400">
                        Total: <M>15(3x+1)^4</M>
                    </div>
                </div>
            </div>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/differential/product-quotient" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: Product Rule
            </Link>
            <Link href="/formal-science/mathematics/calculus/differential/implicit" className="text-sm font-bold text-green-500 hover:text-green-400">
                Next: Implicit Differentiation →
            </Link>
        </div>

      </div>
    </main>
  );
}