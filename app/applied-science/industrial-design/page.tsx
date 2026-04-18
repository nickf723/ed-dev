import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Box, PenTool, LayoutTemplate, DraftingCompass, MonitorSmartphone, Layers } from 'lucide-react';
import IndustrialBackground from './_components/IndustrialBackground';
import IsometricLab from './_components/IsometricLab';

const DESIGN_TOPICS = [
    {
        id: 'ergonomics',
        title: 'Ergonomics & Human Factors',
        description: 'Designing interfaces and physical forms that perfectly map to the biomechanics of the human body.',
        icon: MonitorSmartphone,
        color: 'emerald',
        href: '#'
    },
    {
        id: 'cad-cam',
        title: 'CAD / CAM',
        description: 'Computer-Aided Design and Manufacturing. Turning digital 3D models into G-Code for CNC machines.',
        icon: LayoutTemplate,
        color: 'sky',
        href: '#'
    },
    {
        id: 'materials',
        title: 'Materials Science',
        description: 'Selecting polymers, alloys, and composites based on tensile strength, weight, and thermal properties.',
        icon: Box,
        color: 'indigo',
        href: '#'
    }
];

export default function IndustrialDesignPage() {
    return (
        <main className="relative min-h-screen bg-[#0a0a0c] text-zinc-300 font-sans selection:bg-sky-500/30 overflow-x-hidden">
            
            <IndustrialBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/applied-science" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Applied Science Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-sky-500/30 rounded-lg text-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                            <PenTool size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-sky-300/50">
                            Applied Science // Engineering & Art
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        INDUSTRIAL <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">DESIGN</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Where engineering constraints meet human desires. Industrial designers define the form, function, aesthetics, and user experience of manufactured products—from the smartphone in your hand to the chair you are sitting on.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <DraftingCompass className="text-sky-400" /> The Language of Drafting
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                A sketch is an idea; a draft is a set of instructions. Before a product goes to a factory, designers use standardized projection techniques to ensure engineers know exactly what to build.
                            </p>
                            
                            <div className="space-y-4 mb-6">
                                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl text-sm text-zinc-300">
                                    <span className="text-indigo-400 font-bold uppercase tracking-widest text-[10px]">Orthographic Projection</span><br/>
                                    Looking at an object perfectly flat from the Top, Front, and Side. It provides perfectly accurate measurements but looks completely flat (like the 2D blueprint in the lab).
                                </div>
                                <div className="p-4 bg-zinc-900/50 border border-white/5 rounded-xl text-sm text-zinc-300 shadow-[0_0_15px_rgba(56,189,248,0.1)]">
                                    <span className="text-sky-400 font-bold uppercase tracking-widest text-[10px]">Isometric Projection</span><br/>
                                    Rotating an object so the X, Y, and Z axes are exactly 120° apart. This creates a brilliant illusion of 3D depth on a 2D page while maintaining parallel lines (no vanishing points).
                                </div>
                            </div>
                            
                            
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Box className="text-indigo-400" /> Form Follows Function
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                This famous design principle dictates that the shape of an object should primarily relate to its intended purpose or function. A coffee mug has a handle because boiling water burns skin. 
                            </p>

                            

                            <div className="p-5 bg-black/40 border-l-4 border-sky-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                Good industrial design makes a product self-explanatory. When you look at a door with a flat metal plate, you instinctively know to <strong>Push</strong>. If it has a handle, you instinctively <strong>Pull</strong>. If a door requires a sign to tell you how to use it, the industrial design has failed.
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <IsometricLab />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Layers className="text-sky-400" /> Product Development
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Step beyond drafting and explore how products are engineered, tested, and manufactured.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {DESIGN_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'emerald' ? 'hover:border-emerald-500/50' :
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                'hover:border-indigo-500/50';
                                
                            const iconColor = 
                                topic.color === 'emerald' ? 'text-emerald-400' :
                                topic.color === 'sky' ? 'text-sky-400' :
                                'text-indigo-400';

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