import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Box, Combine, Scissors, Orbit } from 'lucide-react';
import IntegralBackground from './_components/IntegralBackground';
import VolumeVisualizer from './_components/VolumeVisualizer';

// Import your custom Math Renderer
import { M } from '@/app/_components/Math';

const INTEGRATION_TOPICS = [
    {
        id: 'polar-coords',
        title: 'Polar Coordinates & Jacobians',
        description: 'Changing variables to integrate over circular, cylindrical, or spherical domains.',
        icon: Orbit,
        color: 'sky',
        href: '#'
    },
    {
        id: 'triple-integrals',
        title: 'Triple Integrals',
        description: 'Integrating a 3D volume to find hyperspace mass, density, and centers of gravity.',
        icon: Box,
        color: 'fuchsia',
        href: '#'
    }
];

export default function MultipleIntegralsPage() {
    return (
        <main className="relative min-h-screen bg-[#05050a] text-zinc-300 font-sans selection:bg-fuchsia-500/30 overflow-x-hidden">
            
            <IntegralBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/calculus/multivariate" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Multivariate Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-fuchsia-500/30 rounded-lg text-fuchsia-400 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                            <Combine size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-fuchsia-300/50">
                            Multivariate Calculus // Integration
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        MULTIPLE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-rose-400">INTEGRALS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        To calculate the area under a 2D line, you use a standard integral. To calculate the physical volume under a 3D surface, you must integrate twice. It is the mathematical act of sweeping an area through space to construct solid geometry.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Box className="text-rose-400" /> From Area to Volume
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                In single-variable calculus, we approximated area by packing thin 2D rectangles under a curve (a Riemann sum) and taking the limit as the rectangles became infinitely thin.
                            </p>
                            
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                In multivariate calculus, our domain is no longer a simple line segment on the X-axis; it is a flat 2D grid (<M>{String.raw`R`}</M>) on the XY-plane. Instead of drawing 2D rectangles up to the curve, we must pull 3D rectangular columns up to the surface <M>{String.raw`f(x,y)`}</M>.
                            </p>
                            
                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-inner">
                                <M display>{String.raw`V \approx \sum_{i=1}^{n} \sum_{j=1}^{m} f(x_i, y_j) \Delta A`}</M>
                            </div>

                            
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Scissors className="text-fuchsia-400" /> Fubini's Theorem
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                As our columns become infinitely thin, our summation transforms into a <strong>Double Integral</strong>. But how do we actually calculate it? <strong>Fubini's Theorem</strong> provides the elegant solution: we slice the volume.
                            </p>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-fuchsia-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mb-6">
                                If you calculate the 2D cross-sectional area of a single "slice" of the volume by integrating along the X-axis, you can then integrate that resulting area equation along the Y-axis to sweep out the total volume.
                            </div>

                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl flex justify-center text-xl text-white mb-6 shadow-[0_0_15px_rgba(217,70,239,0.1)] overflow-x-auto">
                                <M display>{String.raw`V = \iint_{R} f(x,y) dA = \int_{c}^{d} \left( \int_{a}^{b} f(x,y) dx \right) dy`}</M>
                            </div>

                            
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LABS */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <VolumeVisualizer />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Combine className="text-fuchsia-400" /> Advanced Integration Domains
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">What happens when your domain isn't a perfect square grid?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {INTEGRATION_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-fuchsia-500/50';
                                
                            const iconColor = 
                                topic.color === 'sky' ? 'text-sky-400' :
                                'text-fuchsia-400';

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