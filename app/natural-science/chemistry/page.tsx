"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FlaskConical, Atom, TestTube2, Waypoints } from 'lucide-react';
import ChemistryBackground from './_components/ChemistryBackground';
import ReactionBalancer from './_components/ReactionBalancer';
import PeriodicTable from './_components/PeriodicTable';
import ElementInspector from './_components/ElementInspector';
import MoleculeViewer from './_components/MoleculeViewer';
import { Hexagon, Flame, Orbit, Activity } from 'lucide-react';

const CHEMISTRY_TOPICS = [
    {
        id: 'organic',
        title: 'Organic Chemistry',
        description: 'The complex study of carbon-based life, functional groups, and macromolecular structures.',
        icon: Hexagon,
        color: 'emerald',
        href: '/natural-science/chemistry/organic'
    },
    {
        id: 'thermodynamics',
        title: 'Chemical Thermodynamics',
        description: 'Enthalpy, entropy, Gibbs free energy, and the physical driving forces of reactions.',
        icon: Flame,
        color: 'rose',
        href: '/natural-science/chemistry/thermodynamics'
    },
    {
        id: 'quantum',
        title: 'Quantum Chemistry',
        description: 'Electron orbitals, the Schrödinger equation, and subatomic probability clouds.',
        icon: Orbit,
        color: 'cyan',
        href: '/natural-science/chemistry/quantum'
    },
    {
        id: 'kinetics',
        title: 'Kinetics & Equilibrium',
        description: 'Reaction rates, catalysts, and the delicate balancing act of Le Chatelier\'s principle.',
        icon: Activity,
        color: 'amber',
        href: '/natural-science/chemistry/kinetics'
    }
];






export default function ChemistryPage() {
    // State to connect the Periodic Table to the Inspector
    const [selectedElement, setSelectedElement] = useState<any>(null);

    return (
        <main className="relative min-h-screen bg-zinc-950 text-zinc-300 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            
            <ChemistryBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-zinc-800/60 pb-8 backdrop-blur-sm">
                    <Link href="/natural-science" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Natural Science Directory
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-zinc-900 border border-emerald-500/30 rounded-lg text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                            <FlaskConical size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-300/50">
                            Natural Science // Matter
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        CHEMISTRY & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">ATOMIC STRUCTURE</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        The study of matter, its properties, how and why substances combine or separate to form other substances, and how substances interact with energy.
                    </p>
                </header>

                {/* SECTION 1: THE PERIODIC TABLE & INSPECTOR */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-8">
                        <Atom className="text-emerald-400" />
                        <h2 className="text-3xl font-bold text-white tracking-tight">The Elements</h2>
                    </div>
                    
                    <div className="flex flex-col xl:flex-row gap-8 items-start">
                        {/* The Table */}
                        <div className="flex-1 w-full overflow-x-auto bg-black/20 border border-white/5 rounded-2xl p-6 shadow-inner">
                            <PeriodicTable 
                                onSelect={setSelectedElement} 
                                activeZ={selectedElement?.z || 0} 
                            />
                        </div>
                        {/* The Inspector */}
                        <div className="w-full xl:w-[350px] shrink-0 sticky top-24">
                            <ElementInspector element={selectedElement} />
                        </div>
                    </div>
                </div>

                {/* SECTION 2: MOLECULAR VIEWER */}
                <div className="mb-24">
                    <div className="flex items-center gap-3 mb-8">
                        <Waypoints className="text-cyan-400" />
                        <h2 className="text-3xl font-bold text-white tracking-tight">Molecular Structures</h2>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <div className="lg:col-span-5 space-y-6">
                            <p className="text-zinc-400 leading-relaxed font-light">
                                Atoms rarely exist in isolation. They bond together by sharing or transferring electrons to achieve a stable energy state, forming molecules. The 3D geometry of these molecules dictates how they interact with the world.
                            </p>
                            <div className="p-5 bg-cyan-950/20 border-l-4 border-cyan-500 text-sm text-zinc-300 font-serif italic rounded-r-xl">
                                For example, the "bent" V-shape geometry of water (H₂O) makes it a polar molecule, allowing it to dissolve more substances than any other liquid on Earth.
                            </div>
                        </div>
                        <div className="lg:col-span-7 flex justify-center lg:justify-end">
                            <div className="w-full max-w-md">
                                <MoleculeViewer />
                            </div>
                        </div>
                    </div>
                </div>

                {/* SECTION 3: REACTION BALANCER */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 border-t border-zinc-800/60 pt-16">
                    <div className="lg:col-span-5 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <TestTube2 className="text-emerald-400" /> The Physics of Change
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Chemistry is not static. When elements and molecules interact, bonds are broken and reformed, releasing or absorbing energy. However, the universe operates under strict bookkeeping.
                            </p>
                            
                            <div className="p-5 bg-zinc-900/60 border-l-4 border-emerald-500 text-sm text-zinc-300 font-serif italic rounded-r-xl my-6">
                                The Law of Conservation of Mass states that matter cannot be created or destroyed in an isolated system. The mass of the reactants must equal the mass of the products.
                            </div>
                            
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Because of this law, every chemical equation must be perfectly balanced. If you begin a reaction with 4 Hydrogen atoms, you must end the reaction with exactly 4 Hydrogen atoms, even if they have rearranged themselves into a completely new substance.
                            </p>
                        </section>
                    </div>

                    <div className="lg:col-span-7">
                        <ReactionBalancer />
                    </div>
                </div>

                {/* SECTION 4: ADVANCED DOMAINS NAVIGATION */}
                <div className="pt-16 mt-24 border-t border-zinc-800/60">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Orbit className="text-emerald-400" /> Advanced Domains
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Initialize specialized laboratories and theoretical modules.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {CHEMISTRY_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'emerald' ? 'hover:border-emerald-500/50' :
                                topic.color === 'rose' ? 'hover:border-rose-500/50' :
                                topic.color === 'cyan' ? 'hover:border-cyan-500/50' :
                                'hover:border-amber-500/50';
                                
                            const iconColor = 
                                topic.color === 'emerald' ? 'text-emerald-400' :
                                topic.color === 'rose' ? 'text-rose-400' :
                                topic.color === 'cyan' ? 'text-cyan-400' :
                                'text-amber-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/20 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
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