"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Orbit, BrainCircuit } from 'lucide-react';
import { PlanetCard, EntityCard, PlanetData, EntityData } from './_components/media';

export default function SuperMarioGalaxyPage() {
    
    // MOCK DATA (Fetch from your DB later!)
    const goodEgg: PlanetData = {
        name: 'Good Egg Galaxy',
        dome: 'The Terrace',
        gravityType: 'Spherical',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Super_Mario_Galaxy_box_cover.png' // Placeholder!
    };

    const gustyGarden: PlanetData = {
        name: 'Gusty Garden Galaxy',
        dome: 'The Bedroom',
        gravityType: 'Dynamic',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Super_Mario_Galaxy_box_cover.png' // Placeholder!
    };

    const rosalina: EntityData = {
        name: 'Rosalina & Luma',
        classification: 'Companion',
        role: 'Hub world navigator and provider of the spin mechanic ability.',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Super_Mario_Galaxy_box_cover.png' // Placeholder!
    };

    return (
        <main className="relative min-h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
            
            {/* Thematic Space Background */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30" />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-sky-600/20 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 max-w-[75rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-sky-900/50 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <Link href="/humanities/gaming/video" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                            <ArrowLeft size={14} /> Back to Repository
                        </Link>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-2 bg-sky-950/50 border border-sky-500/30 rounded-lg text-sky-400">
                                <Sparkles size={20} />
                            </span>
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-sky-200/50">
                                Nintendo // 2007 // Platformer
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                            SUPER MARIO <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">GALAXY</span>
                        </h1>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* LEFT: ESSAY & ANALYSIS */}
                    <div className="lg:col-span-7 space-y-8 text-slate-300 leading-relaxed font-light">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                            <Orbit className="text-sky-400" /> Spherical Level Design
                        </h2>
                        <p>
                            Super Mario Galaxy completely redefined 3D platforming by detaching the player from a rigid, universal "down" vector. Instead of flat planes, levels are constructed from small, floating planetoids, each with its own gravitational pull.
                        </p>
                        
                        

                        <p>
                            This seemingly simple change solves one of the biggest problems in 3D game design: camera control. Because gravity pulls Mario toward the center of the sphere, the player can run entirely around a planet without ever needing to manually adjust the camera to see where they are going. 
                        </p>

                        <div className="p-6 bg-indigo-950/30 border border-indigo-500/20 rounded-xl mt-8">
                            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <BrainCircuit size={16} /> The Spin Mechanic
                            </h3>
                            <p className="text-sm">
                                To complement the spherical navigation, Nintendo introduced the "Spin." It acts as a forgiving double-jump, an attack that doesn't require precise top-down hitboxes, and a way to activate launch stars, consolidating massive mechanical complexity into a single button.
                            </p>
                        </div>
                    </div>

                    {/* RIGHT: THE MEDIA FACTORY COMPONENTS */}
                    <div className="lg:col-span-5 space-y-10">
                        
                        {/* Key Entities */}
                        <div>
                            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                                <Sparkles size={12} /> Database: Entities
                            </h3>
                            <div className="max-w-xs">
                                <EntityCard entity={rosalina} />
                            </div>
                        </div>

                        {/* Level Cartography */}
                        <div>
                            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4 flex items-center gap-2 border-b border-slate-800 pb-2">
                                <Orbit size={12} /> Database: Cartography
                            </h3>
                            <div className="grid grid-cols-1 gap-4">
                                <PlanetCard planet={goodEgg} />
                                <PlanetCard planet={gustyGarden} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}