import React from 'react';
import { ArrowLeft, BoxSelect } from 'lucide-react';
import Link from 'next/link';
import RiemannBackground from './_components/RiemannBackground';
import RiemannLab from './_components/RiemannLab';
import { M } from '@/components/Math';

export default function RiemannPage() {
  return (
    <main className="relative min-h-screen bg-black font-sans text-neutral-300 selection:bg-cyan-900/30">
      <RiemannBackground />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        <Link href="/formal-science/mathematics/calculus/integral" className="inline-flex items-center gap-2 text-xs font-bold text-neutral-500 hover:text-white mb-12 transition-colors group">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> BACK TO CHAPTER
        </Link>

        <header className="mb-16">
            <div className="flex items-center gap-3 text-cyan-500 mb-4 font-mono text-sm tracking-widest uppercase">
                <span className="w-8 h-px bg-cyan-500"></span>
                Lesson 3.1
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">
                RIEMANN SUMS
            </h1>
            <p className="text-xl text-neutral-400 leading-relaxed">
                We know how to find the area of simple geometry: squares, triangles, and circles. 
                But how do you find the area under a wild, fluctuating curve? <br/>
                <strong className="text-white">You fake it with rectangles.</strong>
            </p>
        </header>

        <article className="prose prose-invert prose-lg max-w-none">
            
            <h3>The Anatomy of a Slice</h3>
            <p>
                To estimate the area under a curve <M>f(x)</M> between point <M>a</M> and point <M>b</M>, 
                we chop the region into <M>n</M> vertical rectangles.
            </p>
            <p>
                First, we calculate the width of each rectangle, which we call <M>\Delta x</M> (delta x):
            </p>
            
            <div className="not-prose text-center my-8">
                <M display>{`\\Delta x = \\frac{b - a}{n}`}</M>
            </div>

            <p>
                Next, we need the <strong>height</strong> of the rectangle. But the curve is slanted at the top! 
                Where do we measure the height from? We have three primary choices:
            </p>

            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-12 text-sm">
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-2">1. Left Sum</h4>
                    <p className="text-neutral-400">Measure the height from the left corner of the rectangle. Good for decreasing functions.</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-2">2. Right Sum</h4>
                    <p className="text-neutral-400">Measure from the right corner. Good for increasing functions.</p>
                </div>
                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
                    <h4 className="text-white font-bold mb-2">3. Midpoint Sum</h4>
                    <p className="text-neutral-400">Measure from the exact middle. Usually the most accurate approximation.</p>
                </div>
            </div>

            <div className="not-prose my-16">
                <RiemannLab />
            </div>

            <h3>Sigma Notation</h3>
            <p>
                To get the total area, we sum up the area of every rectangle (Height &times; Width). 
                Mathematicians use the Greek letter Sigma (<M>\Sigma</M>) to represent a large sum.
            </p>

            <div className="my-12 p-8 bg-neutral-900/50 border-l-4 border-cyan-500 rounded-r-xl not-prose">
                <M display>{`\\text{Area} \\approx \\sum_{i=1}^{n} f(x_i) \\Delta x`}</M>
            </div>

            <p>
                Let's break the formula down:
            </p>
            <ul className="space-y-4 text-neutral-400 list-none pl-0">
                <li className="flex gap-4">
                    <span className="text-white font-bold whitespace-nowrap"><M>f(x_i)</M></span>
                    <span>The Height of rectangle <M>i</M>.</span>
                </li>
                <li className="flex gap-4">
                    <span className="text-white font-bold whitespace-nowrap"><M>\Delta x</M></span>
                    <span>The Width of the rectangle.</span>
                </li>
                <li className="flex gap-4">
                    <span className="text-white font-bold whitespace-nowrap"><M>\Sigma</M></span>
                    <span>"Add them all up, starting from rectangle 1 to rectangle <M>n</M>."</span>
                </li>
            </ul>

            <p>
                As you saw in the lab, when <M>n = 5</M>, the estimate is rough. But when <M>n = 50</M>, it gets incredibly close. 
                What happens when <M>n = \infty</M>? That is the gateway to the <strong>Definite Integral</strong>.
            </p>

        </article>

        <div className="mt-20 pt-10 border-t border-neutral-800 flex justify-between">
            <Link href="/formal-science/mathematics/calculus/integral" className="text-sm font-bold text-neutral-500 hover:text-white">
                ← Introduction
            </Link>
            <Link href="/formal-science/mathematics/calculus/integral/definite" className="text-sm font-bold text-cyan-500 hover:text-cyan-400">
                Next: The Definite Integral →
            </Link>
        </div>

      </div>
    </main>
  );
}