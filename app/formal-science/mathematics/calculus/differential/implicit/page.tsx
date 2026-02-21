import React from 'react';
import { ArrowLeft, Edit3, Merge } from 'lucide-react';
import Link from 'next/link';
import ImplicitBackground from './_components/ImplicitBackground';
import ImplicitLab from './_components/ImplicitLab';
import { M } from '@/components/Math';

export default function ImplicitPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-blue-900/30">
      <ImplicitBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/differential" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-blue-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-blue-500"></span>
                Lesson 2.5
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                IMPLICIT DIFFERENTIATION
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                What do you do when a graph isn't a function? 
                When <M>y</M> refuses to be isolated, we treat it like a hidden function and use the Chain Rule.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>Explicit vs. Implicit</h3>
            <p>
                Until now, every equation has looked like <M>y = 3x^2 + 2x</M>. This is <strong>Explicit</strong>{'. '}
                <M>y</M> is explicitly defined in terms of <M>x</M>.
            </p>
            <p>
                But look at the equation of a circle: <M>x^2 + y^2 = 25</M>{'. '}
                <M>y</M> is tangled up with <M>x</M>. This is <strong>Implicit</strong>.
            </p>

            

            <div className="not-prose my-16">
                <ImplicitLab />
            </div>

            <h3>The Golden Rule</h3>
            <p>
                When taking the derivative of an implicit equation, you differentiate both sides with respect to <M>x</M>. 
            </p>
            <p>
                <strong>The catch:</strong> Because <M>y</M> is really just a hidden function of <M>x</M>, every time you take the derivative of a <M>y</M> term, you <em>must</em> multiply it by <M>dy/dx</M> (This is just the Chain Rule!).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Edit3 size={18} className="text-blue-500"/> Normal (x)
                    </h4>
                    <p className="text-sm text-neutral-400 mb-4">Differentiating <M>x</M> terms is business as usual.</p>
                    <div className="bg-black p-3 rounded text-center">
                        <M display>{`\\frac{d}{dx}(x^2) = 2x`}</M>
                    </div>
                </div>
                
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Merge size={18} className="text-blue-500"/> Implicit (y)
                    </h4>
                    <p className="text-sm text-neutral-400 mb-4">Differentiating <M>y</M> requires the chain rule attachment.</p>
                    <div className="bg-black p-3 rounded text-center">
                        <M display>{`\\frac{d}{dx}(y^2) = 2y \\cdot \\frac{dy}{dx}`}</M>
                    </div>
                </div>
            </div>

            <h3>Solving the Circle</h3>
            <p>Let's solve the math behind the interactive lab above:</p>
            
            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-blue-500 rounded-r-xl not-prose">
                <div className="space-y-6">
                    <div>
                        <div className="text-xs text-neutral-500 mb-2 uppercase font-bold">1. Original Equation</div>
                        <M display>{`x^2 + y^2 = 25`}</M>
                    </div>
                    <div>
                        <div className="text-xs text-neutral-500 mb-2 uppercase font-bold">2. Differentiate Both Sides</div>
                        <M display>{`2x + 2y \\frac{dy}{dx} = 0`}</M>
                    </div>
                    <div>
                        <div className="text-xs text-neutral-500 mb-2 uppercase font-bold">3. Isolate dy/dx</div>
                        <M display>{`2y \\frac{dy}{dx} = -2x`}</M>
                        <M display>{`\\frac{dy}{dx} = -\\frac{x}{y}`}</M>
                    </div>
                </div>
            </div>

            <p>
                Notice that the final answer has both <M>x</M> and <M>y</M> in it. That's totally normal for implicit differentiation! It just means to find the slope, you need to know the specific point <M>(x, y)</M> on the graph.
            </p>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/differential/chain-rule" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: The Chain Rule
            </Link>
            <Link href="/formal-science/mathematics/calculus" className="text-sm font-bold text-blue-500 hover:text-blue-400">
                Finish Chapter →
            </Link>
        </div>

      </div>
    </main>
  );
}