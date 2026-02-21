"use client";
import React from 'react';
import Link from 'next/link';
import { 
  AlignEndVertical, Type, SplitSquareVertical, 
  RotateCcw, Puzzle, ArrowRight, Lock, 
  BookOpen, PenTool
} from 'lucide-react';
import IntegralBackground from './_components/IntegralBackground';
import RiemannSurfer from './_components/RiemannSurfer';

const LESSONS = [
  {
    id: 'riemann',
    title: 'Riemann Sums',
    subtitle: 'The Approximation',
    description: 'Slicing shapes into rectangles to estimate the impossible area under a curve.',
    icon: <AlignEndVertical size={20} className="text-cyan-500" />,
    href: '/formal-science/mathematics/calculus/integral/riemann',
    status: 'available',
    color: 'cyan'
  },
  {
    id: 'definite',
    title: 'The Definite Integral',
    subtitle: 'Pushing to Infinity',
    description: 'Applying the limit to Riemann sums to find the exact, perfect area.',
    icon: <Type size={20} className="text-blue-500" />,
    href: '/formal-science/mathematics/calculus/integral/definite',
    status: 'available',
    color: 'blue'
  },
  {
    id: 'ftc',
    title: 'Fundamental Theorem',
    subtitle: 'The Great Bridge',
    description: 'The beautiful proof that connects Derivatives and Integrals as exact opposites.',
    icon: <SplitSquareVertical size={20} className="text-indigo-500" />,
    href: '/formal-science/mathematics/calculus/integral/ftc',
    status: 'available',
    color: 'indigo'
  },
  {
    id: 'u-sub',
    title: 'U-Substitution',
    subtitle: 'Reverse Chain Rule',
    description: 'A technique to undo the Chain Rule and integrate nested, complex functions.',
    icon: <RotateCcw size={20} className="text-purple-500" />,
    href: '/formal-science/mathematics/calculus/integral/u-sub',
    status: 'available',
    color: 'purple'
  },
  {
    id: 'parts',
    title: 'Integration by Parts',
    subtitle: 'Reverse Product Rule',
    description: 'When functions are multiplied together, we use this trick to untangle them.',
    icon: <Puzzle size={20} className="text-pink-500" />,
    href: '/formal-science/mathematics/calculus/integral/parts',
    status: 'available',
    color: 'pink'
  }
];

export default function IntegralHubPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-cyan-900/30 font-sans">
      <IntegralBackground />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24">
         
         {/* HERO SECTION */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
             <div>
                 <div className="flex items-center gap-3 text-cyan-500 mb-4 font-mono text-sm tracking-widest uppercase">
                     <span className="w-8 h-px bg-cyan-500"></span>
                     Chapter 03
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                     INTEGRALS
                 </h1>
                 <p className="text-xl text-neutral-400 leading-relaxed">
                     If derivatives break a function down to its instantaneous speed, 
                     Integrals build those moments back up to find the <span className="text-white font-bold">Total Accumulation</span>.
                 </p>
             </div>
             
             {/* STATS */}
             <div className="hidden lg:flex justify-end gap-6">
                 <div className="p-4 bg-neutral-900/50 backdrop-blur rounded-xl border border-neutral-800 text-right">
                     <div className="text-xs font-bold text-neutral-500 uppercase">Current Skill</div>
                     <div className="text-2xl font-black text-cyan-500">Accumulation</div>
                 </div>
                 <div className="p-4 bg-neutral-900/50 backdrop-blur rounded-xl border border-neutral-800 text-right">
                     <div className="text-xs font-bold text-neutral-500 uppercase">Progress</div>
                     <div className="text-2xl font-black text-white">0%</div>
                 </div>
             </div>
         </div>

         {/* CONCEPT ZERO */}
         <div className="mb-24">
            <div className="flex items-center gap-2 mb-4">
                 <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                 <span className="text-xs font-bold text-cyan-500 uppercase tracking-widest">Concept Zero: The Resolution of Infinity</span>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-neutral-950/80 backdrop-blur rounded-3xl p-2 border border-neutral-800">
                <div className="lg:col-span-8">
                    <RiemannSurfer />
                </div>
                <div className="lg:col-span-4 p-6 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold text-white mb-4">Pixels to Smoothness</h3>
                    <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
                        Finding the area of a square is easy. Finding the area under a curve is hard. 
                        Our solution? Chop the curve into rectangles.
                        <br/><br/>
                        As you increase the <strong className="text-cyan-400">Resolution (n)</strong>, the rectangles get thinner. The blocky gaps disappear, and the estimated area becomes the exact area. 
                        <br/><br/>
                        This visual-first method of slicing and summing is the heart of integration.
                    </p>
                </div>
            </div>
         </div>

         {/* LESSON GRID */}
         <div className="mb-24">
             <div className="flex items-center justify-between mb-8">
                 <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <BookOpen size={24} className="text-cyan-500"/> Curriculum
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
                                : 'bg-neutral-900/40 border-neutral-800 hover:bg-neutral-900 hover:border-cyan-500/30 hover:-translate-y-1 hover:shadow-2xl'}
                        `}
                     >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`p-3 rounded-xl bg-black border border-neutral-800 group-hover:border-${lesson.color}-500/50 transition-colors`}>
                                {lesson.icon}
                            </div>
                            <div className="text-xs font-black text-neutral-700">0{idx+1}</div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
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
                                <span className="text-cyan-500 flex items-center gap-2 group-hover:gap-3 transition-all">Start <ArrowRight size={12}/></span>
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
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                 <div className="space-y-2">
                     <div className="text-3xl font-serif text-cyan-400 mb-2">∫</div>
                     <div className="text-xs font-bold text-neutral-500 uppercase">The Integral Sign</div>
                     <p className="text-sm text-neutral-400">An elongated "S" standing for "Sum". It tells you to add up an infinite number of tiny slices.</p>
                 </div>
                 <div className="space-y-2">
                     <code className="bg-black px-2 py-1 rounded text-white font-bold text-lg">f(x)</code>
                     <div className="text-xs font-bold text-neutral-500 uppercase">The Integrand</div>
                     <p className="text-sm text-neutral-400">The function you are integrating. In geometry, this represents the <em>height</em> of the rectangles.</p>
                 </div>
                 <div className="space-y-2">
                     <code className="bg-black px-2 py-1 rounded text-cyan-500 font-bold text-lg">dx</code>
                     <div className="text-xs font-bold text-neutral-500 uppercase">The Differential</div>
                     <p className="text-sm text-neutral-400">The infinitesimally small <em>width</em> of the rectangles. It marks the variable you are integrating with respect to.</p>
                 </div>
             </div>
         </div>

      </div>
    </main>
  );
}