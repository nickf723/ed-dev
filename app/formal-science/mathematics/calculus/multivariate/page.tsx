import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mountain, Wind, Tangent, Combine, Activity, Target } from 'lucide-react';
import MultivariateBackground from './_components/MultivariateBackground';
import SurfaceVisualizer from './_components/SurfaceVisualizer';
import VectorFieldLab from './_components/VectorFieldLab'; // NEW COMPONENT!

import { M } from '@/app/_components/Math';

const MULTIVARIATE_TOPICS = [
    {
        id: 'vector-calculus',
        title: 'Vector Calculus',
        description: 'Divergence, Curl, and the math that powers electromagnetism and fluid dynamics.',
        icon: Wind,
        color: 'sky',
        href: '/formal-science/mathematics/calculus/multivariate/vector-calculus'
    },
    {
        id: 'optimization',
        title: 'Lagrange Multipliers',
        description: 'Finding the absolute maximum or minimum of a system subject to strict constraints.',
        icon: Target,
        color: 'amber',
        href: '/formal-science/mathematics/calculus/multivariate/optimization'
    },
    {
        id: 'multiple-integrals',
        title: 'Multiple Integration',
        description: 'Calculating absolute volume under 3D surfaces and mass centers of solid objects.',
        icon: Combine,
        color: 'rose',
        href: '/formal-science/mathematics/calculus/multivariate/multiple-integrals'
    }
];

export default function MultivariatePage() {
    return (
        <main className="relative min-h-screen bg-[#05050a] text-zinc-300 font-sans selection:bg-rose-500/30 overflow-x-hidden">
            
            <MultivariateBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/calculus" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Calculus Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-rose-500/30 rounded-lg text-rose-400 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
                            <Mountain size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-rose-300/50">
                            Mathematics // N-Dimensional Space
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        MULTIVARIATE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">CALCULUS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Single-variable calculus assumes the world moves on a straight line. Multivariate calculus embraces the reality of 3D space. It is the language of mountains, valleys, vector fields, and multidimensional optimization.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Tangent className="text-amber-400" /> Partial Derivatives
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                If you are standing on the side of a mountain, your slope depends entirely on which direction you step. A <strong>partial derivative</strong> measures the rate of change in <em>one</em> specific direction, holding all other variables perfectly still.
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-inner">
                                <M display>{String.raw`f(x, y) = \sin(x) \cdot \sin(y)`}</M>
                            </div>
                            
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The notation uses the curly "del" symbol (<M>{String.raw`\partial`}</M>). If we want to find the slope moving strictly along the X-axis, we treat <M>{String.raw`y`}</M> as a constant:
                            </p>

                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-4 shadow-inner">
                                <M display>{String.raw`\frac{\partial f}{\partial x} = \cos(x) \cdot \sin(y)`}</M>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Activity className="text-rose-400" /> The Gradient Field
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                If you calculate the partial derivatives for <em>every</em> dimension, you can bundle them together into a single vector called the <strong>Gradient</strong> (<M>{String.raw`\nabla`}</M>).
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-[0_0_15px_rgba(244,63,94,0.1)] overflow-x-auto">
                                <M display>{String.raw`\nabla f = \left\langle \frac{\partial f}{\partial x}, \frac{\partial f}{\partial y} \right\rangle`}</M>
                            </div>
                            
                            <div className="mb-6 border border-white/10 rounded-xl overflow-hidden shadow-inner">
                                
                            </div>

                            <div className="p-5 bg-black/40 border-l-4 border-rose-500 text-sm text-zinc-300 font-serif italic rounded-r-xl">
                                The Gradient Vector is pure magic. No matter where you are standing on a surface, the gradient vector will <strong>always</strong> point in the direction of the steepest possible ascent. This mathematical property is the entire foundation of how AI neural networks "learn" via Gradient Descent.
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LABS */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24 space-y-8">
                            {/* Original 3D Canvas */}
                            <SurfaceVisualizer />
                            
                            {/* New Vector Field Canvas */}
                            <VectorFieldLab />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Combine className="text-rose-400" /> Advanced Calculus
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Initialize theoretical modules for higher-dimensional topologies.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {MULTIVARIATE_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                topic.color === 'amber' ? 'hover:border-amber-500/50' :
                                'hover:border-rose-500/50';
                                
                            const iconColor = 
                                topic.color === 'sky' ? 'text-sky-400' :
                                topic.color === 'amber' ? 'text-amber-400' :
                                'text-rose-400';

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