import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shapes, Ruler, Grid3X3, ArrowUpRight, Compass } from 'lucide-react';
import GeometryBackground from './_components/GeometryBackground';
import AreaPerimeterLab from './_components/AreaPerimeterLab';

const NEXT_STEPS = [
    {
        id: 'high-school-geometry',
        title: 'High School Geometry',
        description: 'Ready to graduate? Dive into formal proofs, trigonometry, and the Pythagorean theorem.',
        icon: Compass,
        color: 'emerald',
        href: '/formal-science/mathematics/geometry' // Points to your advanced branch!
    },
    {
        id: 'fractions',
        title: 'Fractions & Decimals',
        description: 'What happens when you only have a piece of a shape? Learn to cut numbers into parts.',
        icon: Shapes,
        color: 'cyan',
        href: '#'
    }
];

export default function BasicGeometryPage() {
    return (
        <main className="relative min-h-screen bg-[#050a0a] text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            
            <GeometryBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/formal-science/mathematics/foundations" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Mathematical Foundations
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-emerald-500/30 rounded-lg text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <Shapes size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/50">
                            Foundations // Basic Shapes
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        BASIC <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">GEOMETRY</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Math isn't just numbers on a page; it is the study of physical space! Geometry is how we measure the world around us, from the shape of a slice of pizza to the amount of fence needed for a backyard.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <ArrowUpRight className="text-cyan-400" /> Lines & Angles
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                When two straight lines bump into each other, they create a corner. In geometry, we call that corner an <strong>Angle</strong>. We name them based on how wide they open:
                            </p>
                            
                            <ul className="space-y-2 mb-6 text-sm text-zinc-400 font-light">
                                <li><strong className="text-white">Right Angle:</strong> A perfect square corner (like the edge of a piece of paper).</li>
                                <li><strong className="text-white">Acute Angle:</strong> A small, sharp, pinched corner.</li>
                                <li><strong className="text-white">Obtuse Angle:</strong> A wide, lazy, leaned-back corner.</li>
                            </ul>
                            
                            

[Image of acute, right, and obtuse angles]


                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Grid3X3 className="text-emerald-400" /> Area vs. Perimeter
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Once you draw lines to create a closed shape (like a rectangle), you can measure it in two very different ways.
                            </p>

                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl mb-4 text-sm text-zinc-300">
                                <span className="text-fuchsia-400 font-bold uppercase tracking-widest text-[10px]">The Perimeter</span><br/>
                                The distance around the <strong>outside</strong> edge of the shape. Imagine you are building a wooden fence around a yard.
                            </div>

                            <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl mb-6 text-sm text-zinc-300">
                                <span className="text-cyan-400 font-bold uppercase tracking-widest text-[10px]">The Area</span><br/>
                                The amount of flat space on the <strong>inside</strong> of the shape. Imagine you are planting grass seeds to fill up the yard.
                            </div>

                            

                            <div className="p-5 bg-black/40 border-l-4 border-emerald-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                <strong>Try it in the sandbox!</strong> Can you draw a shape that has a small Area (inside space) but a massively long Perimeter (outside edge)? 
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <AreaPerimeterLab />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Ruler className="text-emerald-400" /> Next Steps
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Mastered the basics? Time to level up your mathematical toolkit.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {NEXT_STEPS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'cyan' ? 'hover:border-cyan-500/50' :
                                'hover:border-emerald-500/50';
                                
                            const iconColor = 
                                topic.color === 'cyan' ? 'text-cyan-400' :
                                'text-emerald-400';

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