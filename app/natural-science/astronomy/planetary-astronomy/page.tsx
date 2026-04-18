import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, Orbit, Telescope, Sun, Sparkles } from 'lucide-react';
import AstronomyBackground from './_components/AstronomyBackground';
import OrbitalSandbox from './_components/OrbitalSandbox';

import { M } from '@/app/_components/Math';

const ASTRO_MODULES = [
    {
        id: 'stellar',
        title: 'Stellar Astrophysics',
        description: 'Nuclear fusion, main sequence stars, supernovas, and the birth of black holes.',
        icon: Sun,
        color: 'yellow',
        href: '#' 
    },
    {
        id: 'exoplanets',
        title: 'Exoplanetary Science',
        description: 'The search for habitable worlds. Transit photometry and the Drake Equation.',
        icon: Telescope,
        color: 'emerald',
        href: '#'
    },
    {
        id: 'cosmology',
        title: 'Cosmology',
        description: 'The Big Bang, dark matter, dark energy, and the ultimate fate of the universe.',
        icon: Sparkles,
        color: 'purple',
        href: '#'
    }
];

export default function PlanetaryAstronomyPage() {
    return (
        <main className="relative min-h-screen bg-[#020205] text-zinc-300 font-sans selection:bg-sky-500/30 overflow-x-hidden">
            
            <AstronomyBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* ULTRA-MINIMALIST HEADER */}
                <header className="mb-12 flex flex-col items-center text-center">
                    <Link href="/natural-science" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
                        <ArrowLeft size={14} /> Return to Natural Sciences
                    </Link>
                    
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6">
                        PLANETARY <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-sky-400 to-zinc-600">MECHANICS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                        Space is not empty; it is a fabric woven by gravity. To understand how worlds form, survive, and die, we must first understand the invisible forces that bind them to their stars.
                    </p>
                </header>

                {/* FULL-WIDTH INTERACTIVE HERO */}
                <div className="w-full mb-24">
                    <OrbitalSandbox />
                </div>

                {/* THEORETICAL DEEP DIVE (Now below the lab) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 mb-24">
                    
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Orbit className="text-sky-400" /> Kepler's Laws of Motion
                        </h2>
                        <p className="text-zinc-400 leading-relaxed font-light mb-6">
                            Before Newton discovered gravity, Johannes Kepler observed the night sky and realized a fundamental truth: <strong>planets do not orbit in perfect circles.</strong> They orbit in ellipses, with their host star sitting off-center at one of the focal points.
                        </p>
                        
                        

[Image of Kepler's laws of planetary motion diagram]


                        <p className="text-zinc-400 leading-relaxed font-light mt-6 mb-4">
                            Kepler's Third Law states that the square of a planet's orbital period (<M>{String.raw`P`}</M>) is directly proportional to the cube of the semi-major axis of its orbit (<M>{String.raw`a`}</M>).
                        </p>

                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-center text-2xl text-white shadow-inner">
                            <M display>{String.raw`P^2 \propto a^3`}</M>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <Globe className="text-zinc-400" /> Universal Gravitation
                        </h2>
                        <p className="text-zinc-400 leading-relaxed font-light mb-6">
                            Sir Isaac Newton provided the mathematical "why" to Kepler's observations. He deduced that every particle in the universe attracts every other particle with a force that is directly proportional to the product of their masses, and inversely proportional to the square of the distance between them.
                        </p>
                        
                        <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex justify-center text-2xl text-white shadow-inner mb-6">
                            <M display>{String.raw`F = G \frac{m_1 m_2}{r^2}`}</M>
                        </div>

                        <div className="p-6 bg-sky-950/20 border-l-2 border-sky-500 text-sm text-sky-100/70 font-serif italic rounded-r-2xl">
                            This is the exact mathematical equation running inside the <strong>N-Body Gravity Simulator</strong> above. When you increase the Star Mass, you are increasing <M>{String.raw`m_1`}</M>. When the planet swings closer to the star, <M>{String.raw`r`}</M> decreases, causing the gravitational force (<M>{String.raw`F`}</M>) to spike exponentially, creating that "whip" effect around the star!
                        </div>
                    </section>

                </div>

                {/* BOTTOM: THE COSMIC WEB (Routing) */}
                <div className="pt-16 border-t border-white/5">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-3 tracking-widest uppercase">
                        Expand Telemetry
                    </h2>
                    <p className="text-zinc-500 font-light mb-10">Select a new vector to continue your deep space exploration.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ASTRO_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            // Safe tailwind color mapping
                            const hoverBorder = 
                                topic.color === 'yellow' ? 'hover:border-yellow-500/50' :
                                topic.color === 'emerald' ? 'hover:border-emerald-500/50' :
                                'hover:border-purple-500/50';
                            
                            const iconColor = 
                                topic.color === 'yellow' ? 'text-yellow-400' :
                                topic.color === 'emerald' ? 'text-emerald-400' :
                                'text-purple-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-white/[0.02] border border-white/5 p-8 rounded-3xl transition-all duration-500 group hover:-translate-y-2 ${hoverBorder}`}>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className={`p-4 bg-white/5 rounded-2xl ${iconColor}`}>
                                            <Icon size={28} strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 leading-relaxed font-light">
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