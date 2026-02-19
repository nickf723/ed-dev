"use client";
import React from 'react';
import Link from 'next/link';
import { 
  Microscope, Infinity as InfinityIcon, 
  Activity, ArrowRight, Lock, 
  Divide, Zap, ChevronRight 
} from 'lucide-react';
import CalculusBackground from './_components/CalculusBackground';

const LESSONS = [
  {
    id: 'epsilon-delta',
    title: 'The Precise Definition',
    subtitle: 'The Game of Proofs',
    description: 'Master the formal "Hitbox Game" that defines calculus. Prove limits exist by trapping the function.',
    icon: <Microscope size={20} className="text-amber-500" />,
    href: '/formal-science/mathematics/calculus/limits/epsilon-delta',
    status: 'available',
    color: 'amber'
  },
  {
    id: 'laws',
    title: 'Limit Laws',
    subtitle: 'Algebraic Toolbox',
    description: 'Stop guessing numbers. Learn the algebraic shortcuts to solve 0/0 problems analytically.',
    icon: <Divide size={20} className="text-blue-500" />,
    href: '/formal-science/mathematics/calculus/limits/laws',
    status: 'available',
    color: 'blue'
  },
  {
    id: 'infinity',
    title: 'Infinite Limits',
    subtitle: 'Vertical Asymptotes',
    description: 'What happens when x explodes? Explore behavior near asymptotes and the concept of growth.',
    icon: <InfinityIcon size={20} className="text-purple-500" />,
    href: '/formal-science/mathematics/calculus/limits/infinity',
    status: 'available',
    color: 'purple'
  },
  {
    id: 'continuity',
    title: 'Continuity',
    subtitle: 'The Unbroken Path',
    description: 'Define smoothness mathematically. Fixing broken functions and the Intermediate Value Theorem.',
    icon: <Activity size={20} className="text-green-500" />,
    href: '/formal-science/mathematics/calculus/limits/continuity',
    status: 'available',
    color: 'green'
  },
  {
    id: 'lhopital',
    title: "L'Hôpital's Rule",
    subtitle: 'The Derivative Hack',
    description: 'The ultimate shortcut for indeterminate forms. Using derivatives to solve impossible limits.',
    icon: <Zap size={20} className="text-red-500" />,
    href: '/formal-science/mathematics/calculus/limits/lhopital',
    status: 'available',
    color: 'red'
  }
];

export default function LimitsHubPage() {
  return (
    <main className="relative min-h-screen bg-black overflow-hidden selection:bg-blue-900/30 font-sans">
      <CalculusBackground />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24">
         
         {/* HEADER */}
         <div className="mb-20">
             <div className="flex items-center gap-3 text-blue-500 mb-4 font-mono text-sm tracking-widest uppercase">
                 <span className="w-8 h-px bg-blue-500"></span>
                 Chapter 01
             </div>
             <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                 LIMITS
             </h1>
             <p className="text-xl text-neutral-400 max-w-2xl leading-relaxed">
                 The foundation of all Calculus. Before we can measure change or accumulation, 
                 we must understand the behavior of the <span className="text-white font-bold">infinitely close</span>.
             </p>
         </div>

         {/* LESSON LIST */}
         <div className="flex flex-col gap-4">
             {LESSONS.map((lesson, idx) => (
                 <Link 
                    key={lesson.id} 
                    href={lesson.status === 'locked' ? '#' : lesson.href}
                    className={`
                        group relative flex items-center gap-6 p-6 rounded-2xl border transition-all duration-300
                        ${lesson.status === 'locked' 
                            ? 'bg-neutral-900/20 border-neutral-800 opacity-50 cursor-not-allowed' 
                            : 'bg-neutral-900/40 border-neutral-800 hover:bg-neutral-900 hover:border-neutral-700 hover:scale-[1.01] hover:shadow-2xl'}
                    `}
                 >
                    {/* Index */}
                    <div className="text-2xl font-black text-neutral-800 group-hover:text-neutral-700 transition-colors">
                        0{idx + 1}
                    </div>

                    {/* Icon */}
                    <div className={`p-4 rounded-xl bg-neutral-950 border border-neutral-800 group-hover:border-${lesson.color}-500/30 transition-colors`}>
                        {lesson.icon}
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                            {lesson.title}
                        </h3>
                        <div className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
                            {lesson.subtitle}
                        </div>
                    </div>

                    {/* Description (Hidden on mobile, visible on large) */}
                    <div className="hidden lg:block w-1/3 text-sm text-neutral-500 group-hover:text-neutral-400 transition-colors">
                        {lesson.description}
                    </div>

                    {/* Action */}
                    <div className="pl-6 border-l border-neutral-800">
                        {lesson.status === 'locked' ? (
                            <Lock size={20} className="text-neutral-700" />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                                <ChevronRight size={20} />
                            </div>
                        )}
                    </div>
                 </Link>
             ))}
         </div>
         

      </div>
    </main>
  );
}