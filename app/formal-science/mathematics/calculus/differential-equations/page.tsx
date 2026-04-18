import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Activity, Target, GitMerge, ThermometerSnowflake, Tornado } from 'lucide-react';
import DiffEqBackground from './_components/DiffEqBackground';
import SlopeFieldLab from './_components/SlopeFieldLab';

import { M } from '@/app/_components/Math';

const ADVANCED_MODULES = [
    {
        id: 'systems',
        title: 'Systems of ODEs',
        description: 'Coupled equations. The Lotka-Volterra Predator-Prey model and phase plane analysis.',
        icon: GitMerge,
        color: 'pink',
        href: '#' 
    },
    {
        id: 'pdes',
        title: 'Partial Differential Equations',
        description: 'The Heat Equation, the Wave Equation, and the legendary Navier-Stokes equations for fluid mechanics.',
        icon: ThermometerSnowflake,
        color: 'sky',
        href: '#'
    },
    {
        id: 'chaos',
        title: 'Chaos Theory',
        description: 'Non-linear dynamics, the Lorenz Attractor, and the mathematical definition of the butterfly effect.',
        icon: Tornado,
        color: 'amber',
        href: '#'
    }
];

export default function DifferentialEquationsPage() {
    return (
        <main className="relative min-h-screen bg-[#02080f] text-zinc-300 font-sans selection:bg-teal-500/30 overflow-x-hidden">
            
            <DiffEqBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/calculus" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Calculus Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-teal-500/30 rounded-lg text-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                            <Activity size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-teal-300/50">
                            Calculus // Systems Over Time
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        DIFFERENTIAL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-pink-400">EQUATIONS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        If you know how fast a car is accelerating, you can calculate exactly where it will be in ten minutes. A differential equation defines the <em>rules of change</em> for a system, allowing us to mathematically predict the future.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Target className="text-teal-400" /> The Language of Nature
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                In algebra, you solve an equation to find a specific number, like <M>{String.raw`x = 5`}</M>. In differential equations, you solve an equation to find an <strong>entire function</strong>. 
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                We write these equations by relating a function <M>{String.raw`y`}</M> to its own derivative <M>{String.raw`\frac{dy}{dx}`}</M>. For example, Newton's Law of Cooling states that the rate an object cools down is proportional to the difference between its temperature and the room temperature:
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-inner">
                                <M display>{String.raw`\frac{dT}{dt} = -k(T - T_{room})`}</M>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Activity className="text-pink-400" /> Initial Value Problems
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                A differential equation does not give you a single answer. It gives you a "Slope Field"—a map of how the system <em>would</em> behave if it started at any given point. 
                            </p>

                            
                            
                            <div className="p-5 bg-black/40 border-l-4 border-pink-500 text-sm text-zinc-300 font-serif italic rounded-r-xl shadow-[0_0_15px_rgba(244,114,182,0.1)] mt-6">
                                To find out what actually happens, you must provide an <strong>Initial Condition</strong> <M>{String.raw`(x_0, y_0)`}</M>. Once you drop that mathematical pin, the equation locks into a single, inescapable destiny. 
                            </div>

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                Try selecting the <strong>Logistic</strong> equation in the lab. This models population growth. No matter where you click (even if you start with an overpopulation at the top), the trajectory will always eventually flatline at the carrying capacity <M>{String.raw`y = 4`}</M>.
                            </p>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <SlopeFieldLab />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <GitMerge className="text-teal-400" /> Nonlinear Dynamics
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">What happens when you have multiple equations interacting with each other simultaneously?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ADVANCED_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                topic.color === 'pink' ? 'hover:border-pink-500/50' :
                                'hover:border-amber-500/50';
                                
                            const iconColor = 
                                topic.color === 'sky' ? 'text-sky-400' :
                                topic.color === 'pink' ? 'text-pink-400' :
                                'text-amber-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-white/5 rounded-xl ${iconColor}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-2 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}