import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Orbit, Zap, Waves, Infinity, Radio, Layers } from 'lucide-react';
import QuantumBackground from './_components/QuantumBackground';
import OrbitalVisualizer from './_components/OrbitalVisualizer';

// IMPORTING YOUR CUSTOM MATH ENGINE
import { M } from '@/app/_components/Math';

// FUTURE INFRASTRUCTURE: Quantum Routing Array
const QUANTUM_MODULES = [
    {
        id: 'wave-particle',
        title: 'Wave-Particle Duality',
        description: 'The double-slit experiment, De Broglie wavelengths, and the collapse of the wave function.',
        icon: Waves,
        color: 'cyan',
        href: '#'
    },
    {
        id: 'molecular-orbitals',
        title: 'Molecular Orbital Theory',
        description: 'Constructive and destructive interference, sigma/pi bonds, and anti-bonding orbitals.',
        icon: Infinity,
        color: 'violet',
        href: '#'
    },
    {
        id: 'spectroscopy',
        title: 'Quantum Spectroscopy',
        description: 'Photonic emission, absorption spectra, and how we measure the invisible.',
        icon: Radio,
        color: 'emerald',
        href: '#'
    },
    {
        id: 'spin',
        title: 'Spin & Pauli Exclusion',
        description: 'Fermions, quantum numbers, and why two electrons cannot share the exact same state.',
        icon: Layers,
        color: 'rose',
        href: '#'
    }
];

export default function QuantumChemistryPage() {
    return (
        <main className="relative min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
            
            <QuantumBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/natural-science/chemistry" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Chemistry Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-cyan-500/30 rounded-lg text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                            <Orbit size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300/50">
                            Physical Chemistry // Mechanics
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        QUANTUM <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">CHEMISTRY</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        At the subatomic scale, classical physics breaks down. Electrons do not orbit the nucleus in neat circles; they exist in clouds of probability. Understanding chemical bonds requires understanding the wave nature of matter.
                    </p>
                </header>

                {/* CORE CONTENT & LAB */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Waves className="text-cyan-400" /> The Schrödinger Equation
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-6">
                                The foundational equation of quantum mechanics. Instead of calculating the exact position of a particle, it calculates a wave function (<M>{String.raw`\Psi`}</M>), which describes the probability of finding an electron in a specific region of space.
                            </p>
                            
                            {/* BLOCK MATH INTEGRATION */}
                            <div className="p-6 bg-zinc-900/50 border border-white/10 rounded-xl flex justify-center overflow-x-auto text-xl text-white mb-6 shadow-inner">
                                <M display>{String.raw`i\hbar\frac{\partial}{\partial t}\Psi(\mathbf{r},t) = \left[ -\frac{\hbar^2}{2\mu}\nabla^2 + V(\mathbf{r},t) \right] \Psi(\mathbf{r},t)`}</M>
                            </div>

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                When we solve this equation for a Hydrogen atom, the mathematical solutions give us 3D geometric shapes. These are the "orbitals" (<M>{String.raw`s, p, d, f`}</M>) where chemistry actually happens.
                            </p>
                            
                            <div className="mt-6 border border-white/10 rounded-xl overflow-hidden shadow-inner">
                                
                            </div>
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Zap className="text-violet-400" /> Heisenberg Uncertainty
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Why can't we just measure exactly where the electron is? The Heisenberg Uncertainty Principle states that there is a fundamental limit to how precisely we can know both the position (<M>{String.raw`x`}</M>) and momentum (<M>{String.raw`p`}</M>) of a quantum particle simultaneously.
                            </p>
                            
                            {/* BLOCK MATH INTEGRATION */}
                            <div className="p-6 bg-zinc-900/50 border border-white/10 rounded-xl flex justify-center text-xl text-white mb-4 shadow-inner">
                                <M display>{String.raw`\Delta x \Delta p \ge \frac{\hbar}{2}`}</M>
                            </div>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-violet-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mb-6">
                                The more accurately you try to pin down an electron's location, the more erratic its speed and direction become. The "probability cloud" is not a failure of our measuring tools; it is a fundamental property of the universe.
                            </div>

                            <div className="border border-white/10 rounded-xl overflow-hidden shadow-inner">
                                
                            </div>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <OrbitalVisualizer />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: FUTURE INFRASTRUCTURE / ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Infinity className="text-cyan-400" /> Theoretical Modules
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Expand your quantum state space by initializing a sub-discipline.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {QUANTUM_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            // Safe tailwind color mapping
                            const borderHover = 
                                topic.color === 'cyan' ? 'hover:border-cyan-500/50' :
                                topic.color === 'violet' ? 'hover:border-violet-500/50' :
                                topic.color === 'emerald' ? 'hover:border-emerald-500/50' :
                                'hover:border-rose-500/50';
                                
                            const iconColor = 
                                topic.color === 'cyan' ? 'text-cyan-400' :
                                topic.color === 'violet' ? 'text-violet-400' :
                                topic.color === 'emerald' ? 'text-emerald-400' :
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