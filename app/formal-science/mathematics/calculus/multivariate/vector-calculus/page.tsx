import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Wind, Repeat, Combine, Target, Infinity } from 'lucide-react';
import VectorBackground from './_components/VectorBackground';
import DivCurlVisualizer from './_components/DivCurlVisualizer';

// Import your custom Math Renderer
import { M } from '@/app/_components/Math';

const THEOREMS = [
    {
        id: 'greens',
        title: "Green's Theorem",
        description: 'Relates a macroscopic line integral around a closed curve to a double integral over the plane region it encloses.',
        icon: Combine,
        color: 'emerald',
        href: '#'
    },
    {
        id: 'stokes',
        title: "Stokes' Theorem",
        description: 'The 3D generalization of Green’s Theorem. Relates the surface integral of the curl to the line integral around the boundary.',
        icon: Repeat,
        color: 'sky',
        href: '#'
    },
    {
        id: 'divergence',
        title: 'Divergence Theorem',
        description: 'Also known as Gauss’s Theorem. Relates the flux of a vector field through a closed surface to the divergence within the enclosed volume.',
        icon: Target,
        color: 'rose',
        href: '#'
    }
];

export default function VectorCalculusPage() {
    return (
        <main className="relative min-h-screen bg-[#050a14] text-zinc-300 font-sans selection:bg-sky-500/30 overflow-x-hidden">
            
            <VectorBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/calculus/multivariate" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Multivariate Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-sky-500/30 rounded-lg text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                            <Wind size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-sky-300/50">
                            Multivariate Calculus // Fields
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        VECTOR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-emerald-400">CALCULUS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Moving away from static surfaces, Vector Calculus deals with environments where every point in space has both a magnitude and a direction. It is the absolute mathematical foundation of fluid dynamics and electromagnetism.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Target className="text-sky-400" /> Divergence (Flux Density)
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Imagine a vector field as a flowing body of water. <strong>Divergence</strong> measures how much a fluid is expanding from or compressing into a specific point. It asks the question: <em>"Is this point a source, or a sink?"</em>
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-inner overflow-x-auto">
                                <M display>{String.raw`\text{div } \mathbf{F} = \nabla \cdot \mathbf{F} = \frac{\partial P}{\partial x} + \frac{\partial Q}{\partial y}`}</M>
                            </div>
                            
                            

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                If you drop a mathematical sensor into a field with positive divergence (a Source), the sensor will physically expand outward as the flow pushes away from the center.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Repeat className="text-emerald-400" /> Curl (Circulation Density)
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                While Divergence measures expansion, <strong>Curl</strong> measures macroscopic rotation. It calculates the tendency of the vector field to swirl around a given point.
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-inner overflow-x-auto">
                                <M display>{String.raw`\text{curl } \mathbf{F} = \nabla \times \mathbf{F} = \left( \frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y} \right) \mathbf{k}`}</M>
                            </div>

                            

                            <div className="p-5 bg-black/40 border-l-4 border-emerald-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                If you drop a "paddlewheel" into a field with non-zero curl (a Vortex), the uneven flow of the field will cause the paddlewheel to physically spin on its axis.
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LABS */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <DivCurlVisualizer />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: THE FUNDAMENTAL THEOREMS */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Infinity className="text-sky-400" /> The Fundamental Theorems
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">The crowning achievements of vector calculus. These theorems relate the boundary of an object to its interior.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {THEOREMS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'emerald' ? 'hover:border-emerald-500/50' :
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-rose-500/50';
                                
                            const iconColor = 
                                topic.color === 'emerald' ? 'text-emerald-400' :
                                topic.color === 'sky' ? 'text-sky-400' :
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