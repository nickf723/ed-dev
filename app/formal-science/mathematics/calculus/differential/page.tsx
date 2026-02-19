"use client";
import React from 'react';
import Link from 'next/link';
import { 
  TrendingUp, Activity, Layers, 
  GitMerge, BoxSelect, ArrowRight, Lock, 
  Zap, Microscope, BookOpen, PenTool
} from 'lucide-react';
import DifferentialBackground from './_components/DifferentialBackground';
import TangentSurfer from './_components/TangentSurfer';

const LESSONS = [
  {
    id: 'definition',
    title: 'The Tangent Problem',
    subtitle: 'Definition of Derivative',
    description: 'Constructing the derivative from the secant line limits.',
    icon: <Microscope size={20} className="text-red-500" />,
    href: '/formal-science/mathematics/calculus/differential/definition',
    status: 'available',
    color: 'red'
  },
  {
    id: 'power-rule',
    title: 'Power & Sum Rules',
    subtitle: 'The Shortcuts',
    description: 'Learn the patterns that let you differentiate polynomials in seconds.',
    icon: <Zap size={20} className="text-orange-500" />,
    href: '/formal-science/mathematics/calculus/differential/power-sum',
    status: 'available',
    color: 'orange'
  },
  {
    id: 'product-rule',
    title: 'Product & Quotient Rules',
    subtitle: 'Composite Functions',
    description: 'Handling functions that are multiplied or divided.',
    icon: <Layers size={20} className="text-yellow-500" />,
    href: '/formal-science/mathematics/calculus/differential/product-rule',
    status: 'available',
    color: 'yellow'
  },
  {
    id: 'chain-rule',
    title: 'The Chain Rule',
    subtitle: 'Nested Functions',
    description: 'The most important rule in Calculus. Peeling the onion of composite functions.',
    icon: <GitMerge size={20} className="text-green-500" />,
    href: '/formal-science/mathematics/calculus/differential/chain-rule',
    status: 'available',
    color: 'green'
  },
  {
    id: 'implicit',
    title: 'Implicit Differentiation',
    subtitle: 'Breaking the y=f(x) Mold',
    description: 'Finding slopes of weird shapes (circles, ellipses) where y cannot be isolated.',
    icon: <BoxSelect size={20} className="text-blue-500" />,
    href: '/formal-science/mathematics/calculus/differential/implicit',
    status: 'available',
    color: 'blue'
  }
];

export default function DifferentialHubPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-red-900/30 font-sans">
      <DifferentialBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
         
         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
             <div>
                 <div className="flex items-center gap-3 text-red-500 mb-4 font-mono text-sm tracking-widest uppercase">
                     <span className="w-8 h-px bg-red-500"></span>
                     Chapter 02
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                     DERIVATIVES
                 </h1>
                 <p className="text-xl text-neutral-400 leading-relaxed">
                     Limits taught us how to zoom in infinitely close. 
                     Now, we use that power to measure <span className="text-white font-bold">Instantaneous Change</span>.
                     <br/><br/>
                     Every point on a curve has a secret direction. The Derivative reveals it.
                 </p>
             </div>
             
             {/* STATS / MINIMAP */}
             <div className="hidden lg:flex justify-end gap-6">
                 <div className="p-4 bg-neutral-900/50 backdrop-blur rounded-xl border border-neutral-800 text-right">
                     <div className="text-xs font-bold text-neutral-500 uppercase">Current Skill</div>
                     <div className="text-2xl font-black text-red-500">Slope Analysis</div>
                 </div>
                 <div className="p-4 bg-neutral-900/50 backdrop-blur rounded-xl border border-neutral-800 text-right">
                     <div className="text-xs font-bold text-neutral-500 uppercase">Progress</div>
                     <div className="text-2xl font-black text-white">0%</div>
                 </div>
             </div>
         </div>

         {/* CONCEPT ZERO: THE SURFER */}
         <div className="mb-24">
            <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Concept Zero: The Instantaneous Slope</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-950/50 rounded-3xl p-2 border border-neutral-800">
                <div className="lg:col-span-8">
                    <TangentSurfer />
                </div>
                <div className="lg:col-span-4 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Don't Memorize. Visualize.</h3>
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                        The red line is the <strong className="text-red-400">Tangent Line</strong>. 
                        Its slope tells you exactly how fast the function is growing or shrinking at that specific moment.
                        <br/><br/>
                        Notice how the slope is 0 at the peaks and valleys? That's not a coincidence. That's optimization.
                    </p>
                    <div className="text-xs font-mono text-neutral-600 border-t border-neutral-800 pt-4">
                        INTERACTIVE PREVIEW
                    </div>
                </div>
            </div>
         </div>

         {/* LESSON GRID */}
         <div className="mb-24">
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen size={24} className="text-red-500"/> Curriculum
                 </h2>
                 <span className="text-xs font-mono text-neutral-600 uppercase">5 Modules</span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {LESSONS.map((lesson, idx) => (
                     <Link 
                        key={lesson.id} 
                        href={lesson.status === 'locked' ? '#' : lesson.href}
                        className={`
                            group relative p-8 rounded-2xl border transition-all duration-300 flex flex-col
                            ${lesson.status === 'locked' 
                                ? 'bg-neutral-900/20 border-neutral-800 cursor-not-allowed opacity-60 grayscale' 
                                : 'bg-neutral-900/40 border-neutral-800 hover:bg-neutral-900 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-2xl'}
                        `}
                     >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-xl bg-black border border-neutral-800 group-hover:border-${lesson.color}-500/50 transition-colors`}>
                                {lesson.icon}
                            </div>
                            <div className="text-xs font-black text-neutral-700">0{idx+1}</div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                            {lesson.title}
                        </h3>
                        <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide mb-4">
                            {lesson.subtitle}
                        </div>
                        <p className="text-sm text-neutral-400 leading-relaxed mb-8 flex-1">
                            {lesson.description}
                        </p>

                        <div className="pt-6 border-t border-neutral-800 flex items-center justify-between text-xs font-bold uppercase tracking-widest">
                            {lesson.status === 'locked' ? (
                                <span className="text-neutral-600 flex items-center gap-2"><Lock size={12}/> Locked</span>
                            ) : (
                                <span className="text-red-500 flex items-center gap-2 group-hover:gap-3 transition-all">Start <ArrowRight size={12}/></span>
                            )}
                        </div>
                     </Link>
                 ))}
             </div>
         </div>

         {/* NOTATION DECODER */}
         <div className="bg-neutral-900/30 border border-neutral-800 rounded-2xl p-8">
             <div className="flex items-center gap-3 mb-6">
                 <PenTool size={20} className="text-neutral-400" />
                 <h3 className="text-lg font-bold text-white">Notation Decoder</h3>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                     <code className="bg-black px-2 py-1 rounded text-red-400 font-bold text-lg">f'(x)</code>
                     <div className="text-xs font-bold text-neutral-500 uppercase">Lagrange's Notation</div>
                     <p className="text-sm text-neutral-400">"F prime of x". Best for general functions. Shows that the derivative is itself a function.</p>
                 </div>
                 <div className="space-y-2">
                     <code className="bg-black px-2 py-1 rounded text-blue-400 font-bold text-lg">dy/dx</code>
                     <div className="text-xs font-bold text-neutral-500 uppercase">Leibniz's Notation</div>
                     <p className="text-sm text-neutral-400">"The change in y divided by the change in x". Best for remembering that slope is a ratio.</p>
                 </div>
                 <div className="space-y-2">
                     <code className="bg-black px-2 py-1 rounded text-yellow-400 font-bold text-lg">D<span className="text-xs">x</span>[y]</code>
                     <div className="text-xs font-bold text-neutral-500 uppercase">Euler's Notation</div>
                     <p className="text-sm text-neutral-400">"The derivative operator". Best for thinking of differentiation as an action you perform.</p>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}