import React from 'react';
import { ArrowLeft, Divide, Hammer } from 'lucide-react';
import Link from 'next/link';
import AlgebraBackground from './_components/AlgebraBackground';
import LimitLawsLab from './_components/LimitLawsLab';
import { M } from '@/components/Math';

export default function LimitLawsPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-blue-900/30">
      <AlgebraBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/limits" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-blue-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-blue-500"></span>
                Lesson 1.2
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                LIMIT LAWS
            </h1>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The 0/0 Problem</h3>
            <p>
                When you try to solve a limit by Direct Substitution, you often hit a brick wall: <M>0/0</M>.
                This doesn't mean the limit doesn't exist. It means there is a <strong>hidden hole</strong> in the algebra.
            </p>

            <div className="not-prose">
                <LimitLawsLab />
            </div>

            <h3>The Toolbox</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl group hover:border-blue-500/50 transition-colors">
                    <div className="p-3 w-fit bg-blue-900/20 rounded-xl mb-4 text-blue-400">
                        <Divide size={24} />
                    </div>
                    <h4 className="text-white font-bold mb-2">1. Factoring</h4>
                    <p className="text-sm text-neutral-400 mb-4">
                        If you have a polynomial on top and bottom, factor them. 
                        Usually, the term causing the zero (like <M>x-3</M>) will appear in both and cancel out.
                    </p>
                    <div className="text-blue-300">
                        <M display>{`x^2 - a^2 = (x-a)(x+a)`}</M>
                    </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl group hover:border-blue-500/50 transition-colors">
                    <div className="p-3 w-fit bg-blue-900/20 rounded-xl mb-4 text-blue-400">
                        <Hammer size={24} />
                    </div>
                    <h4 className="text-white font-bold mb-2">2. Conjugates</h4>
                    <p className="text-sm text-neutral-400 mb-4">
                        If you see a square root (e.g., <M>{"\\sqrt{x} - 2"}</M>), multiply the top and bottom by the conjugate (<M>{"\\sqrt{x} + 2"}</M>). 
                        This eliminates the root and reveals the hidden cancellation.
                    </p>
                </div>
            </div>

        </article>
      </div>
    </main>
  );
}