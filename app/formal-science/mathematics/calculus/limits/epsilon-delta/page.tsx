import React from 'react';
import { ArrowLeft, Sword, Shield } from 'lucide-react';
import Link from 'next/link';
import EpsilonBackground from './_components/EpsilonBackground'; 
import EpsilonDeltaLab from './_components/EpsilonDeltaLab';
import { M } from '@/components/Math';




export default function EpsilonDeltaPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-amber-900/30">
      <EpsilonBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/limits" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-amber-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-amber-500"></span>
                Lesson 1.1
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                Epsilon-Delta
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                The formal definition of a limit isn't a formula—it's a <span className="text-white font-bold">challenge</span>. 
                Can you trap the function in a box no matter how small the box gets?
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Game of Proofs</h3>
            <p>
                Imagine a game between two players: a <strong>Challenger</strong> and a <strong>Defender</strong>.
                You want to prove that the limit is <M>L</M> at <M>x = c</M>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-12">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4 text-amber-500">
                        <Sword size={20} />
                        <h4 className="font-bold uppercase text-xs tracking-widest">The Challenger (ε)</h4>
                    </div>
                    <p className="text-sm text-neutral-400">
                        "I bet you can't stay within <strong className="text-white">epsilon (<M>\epsilon</M>)</strong> distance of the target height. 
                        I'm going to make this hitbox incredibly small."
                    </p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <div className="flex items-center gap-3 mb-4 text-blue-500">
                        <Shield size={20} />
                        <h4 className="font-bold uppercase text-xs tracking-widest">The Defender (δ)</h4>
                    </div>
                    <p className="text-sm text-neutral-400">
                        "I accept. I will find a <strong className="text-white">delta (<M>\delta</M>)</strong> zone around <M>x</M> that is small enough to guarantee safety."
                    </p>
                </div>
            </div>

            <p>
                If the Defender can <em>always</em> win—no matter how small the Challenger makes the epsilon box—then the limit is officially proven.
            </p>

            <div className="not-prose my-16">
                <EpsilonDeltaLab />
                <div className="text-center text-xs text-neutral-500 mt-2 italic">
                    Find a <M>\delta</M> (Blue) that keeps the line inside the <M>\epsilon</M> (Amber) box.
                </div>
            </div>

            <h3>The Formal Definition</h3>
            <p>
                This game is written mathematically as:
            </p>
            
            <div className="my-8 p-8 bg-neutral-900/50 border-l-4 border-amber-500 rounded-r-xl not-prose">
                <M display>{`\\lim_{x \\to c} f(x) = L`}</M>
                <div className="text-center text-sm font-sans text-neutral-500 my-4 uppercase font-bold tracking-widest">Means</div>
                <M display>{`\\forall \\epsilon > 0, \\exists \\delta > 0 \\text{ such that}`}</M>
                <M display>{`0 < |x - c| < \\delta \\implies |f(x) - L| < \\epsilon`}</M>
            </div>

            <p>
                Read it symbol by symbol: "For any error margin <M>\epsilon</M>, there exists a safety distance <M>\delta</M>, 
                such that if <M>x</M> is within <M>\delta</M> distance of <M>c</M>, then <M>f(x)</M> is within <M>\epsilon</M> distance of the Limit."
            </p>

        </article>
      </div>
    </main>
  );
}