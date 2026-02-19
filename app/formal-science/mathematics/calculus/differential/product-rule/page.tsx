import React from 'react';
import { ArrowLeft, Layers, Divide, Music } from 'lucide-react';
import Link from 'next/link';
import ProductBackground from './_components/ProductBackground';
import ProductLab from './_components/ProductLab';
import { M } from '@/components/Math';

export default function ProductQuotientPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-yellow-900/30">
      <ProductBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/differential" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-yellow-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-yellow-500"></span>
                Lesson 2.3
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                PRODUCT & QUOTIENT
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                What happens when you multiply two functions? <M>x^2 \cdot \sin(x)</M>?
                Intuition says the derivative should be <M>2x \cdot \cos(x)</M>. Intuition is wrong.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Product Rule</h3>
            <p>
                Imagine a rectangle where the width is <M>f(x)</M> and the height is <M>g(x)</M>. 
                As <M>x</M> changes, <strong>both sides grow</strong>.
            </p>
            
            <div className="not-prose my-12">
                <ProductLab />
            </div>

            <p>
                This geometric logic gives us the rule: 
                "Left times derivative of Right, plus Right times derivative of Left."
            </p>

            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-yellow-500 rounded-r-xl not-prose text-center">
                <M display>{`\\frac{d}{dx}[f(x)g(x)] = f(x)g'(x) + g(x)f'(x)`}</M>
            </div>

            <h3>The Quotient Rule</h3>
            <p>
                Division is just messy multiplication. The rule for <M>f(x) / g(x)</M> is infamous for being hard to memorize.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Divide size={18} className="text-blue-500"/> The Formula
                    </h4>
                    <M display>{`\\frac{g(x)f'(x) - f(x)g'(x)}{[g(x)]^2}`}</M>
                </div>
                
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                        <Music size={18} className="text-pink-500"/> The Song (Mnemonic)
                    </h4>
                    <p className="text-sm font-mono text-neutral-300 leading-loose">
                        "Low D-High minus High D-Low,<br/>
                        Draw the line and down below,<br/>
                        Square the bottom and off we go!"
                    </p>
                </div>
            </div>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/differential/power-rule" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: Power Rule
            </Link>
            <Link href="/formal-science/mathematics/calculus/differential/chain-rule" className="text-sm font-bold text-yellow-500 hover:text-yellow-400">
                Next: The Chain Rule →
            </Link>
        </div>

      </div>
    </main>
  );
}