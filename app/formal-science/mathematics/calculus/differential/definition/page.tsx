import React from 'react';
import { ArrowLeft, Microscope, MousePointer2 } from 'lucide-react';
import Link from 'next/link';
import SecantLab from './_components/SecantLab';
import { M } from '@/components/Math';
import SecantBackground from './_components/SecantBackground';

export default function DerivativeDefinitionPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-red-900/30">
      <SecantBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/differential" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-red-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-red-500"></span>
                Lesson 2.1
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                THE TANGENT PROBLEM
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                How do you measure speed at a single instant? 
                It seems impossible—like measuring the distance between a point and itself.
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Paradox</h3>
            <p>
                To calculate a slope (velocity), you need two points: a start and an end.
            </p>
            <div className="not-prose text-center my-8">
                <M display>{`m = \\frac{\\Delta y}{\\Delta x} = \\frac{y_2 - y_1}{x_2 - x_1}`}</M>
            </div>
            <p>
                But for <strong>Instantaneous Velocity</strong>, we are looking at a single moment in time. 
                The start point <em>is</em> the end point. 
                If we try to plug this into the slope formula, we get disaster:
            </p>
            <div className="not-prose text-center my-8">
                <M display>{`m = \\frac{f(x) - f(x)}{x - x} = \\frac{0}{0}`}</M>
            </div>

            <h3>The Solution: The Secant Line</h3>
            <p>
                We can't use one point. So we use two points... and cheat. 
                We place a second "fake" point at distance <M>h</M> away from our target. 
                Then we shrink <M>h</M> until it disappears.
            </p>

            
            <div className="not-prose my-16">
                <SecantLab />
                <div className="text-center text-xs text-neutral-500 mt-2 italic">
                    Drag <M>h</M> to zero. Watch the blue Secant line become the red Tangent line.
                </div>
            </div>

            <h3>The Formal Definition</h3>
            <p>
                This logic leads us to the most famous equation in Calculus: <strong>The Definition of the Derivative</strong>.
            </p>
            
            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-red-500 rounded-r-xl not-prose">
                <M display>{`f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}`}</M>
            </div>

            <p>
                Let's decode this:
            </p>
            <ul className="space-y-4 text-neutral-400 list-none pl-0">
                <li className="flex gap-4">
                    <span className="text-white font-bold whitespace-nowrap"><M>f(x+h) - f(x)</M></span>
                    <span>The "Rise" (change in y)</span>
                </li>
                <li className="flex gap-4">
                    <span className="text-white font-bold whitespace-nowrap"><M>h</M></span>
                    <span>The "Run" (change in x)</span>
                </li>
                <li className="flex gap-4">
                    <span className="text-white font-bold whitespace-nowrap"><M>{`\\lim_{h \\to 0}`}</M></span>
                    <span>The "Shrink Ray" that pushes the points together.</span>
                </li>
            </ul>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/limits" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Previous: Limits Review
            </Link>
            <Link href="/formal-science/mathematics/calculus/differential/power-rule" className="text-sm font-bold text-red-500 hover:text-red-400">
                Next: The Power Rule →
            </Link>
        </div>

      </div>
    </main>
  );
}