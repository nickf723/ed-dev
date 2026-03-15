import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Database, Layers } from 'lucide-react';
import { fetchPokedexByGen } from '../_components/PokeAPI';
import PokedexGrid from '../_components/PokedexGrid';

// Array for building our Region navigation tabs
const REGIONS = [
    { id: '1', name: 'Kanto' }, { id: '2', name: 'Johto' }, 
    { id: '3', name: 'Hoenn' }, { id: '4', name: 'Sinnoh' },
    { id: '5', name: 'Unova' }, { id: '6', name: 'Kalos' }, { id: '7', name: 'Alola' },
    { id: '8', name: 'Galar' }, { id: '9', name: 'Paldea' }
];

// In Next.js App Router, dynamic params are passed as props to the page component
export default async function RegionalDexPage({ params }: { params: { gen: string } }) {
    // Await the params before using them (Next.js 15+ requirement)
    const { gen } = await params;
    
    // Fetch the data on the server for this specific generation!
    const pokedex = await fetchPokedexByGen(gen);
    const activeRegion = REGIONS.find(r => r.id === gen)?.name || "Unknown Region";

    return (
        <main className="min-h-screen bg-[#050505] text-neutral-300 font-sans selection:bg-red-500/30">
            <div className="max-w-[90rem] mx-auto px-6 py-12">
                
                {/* HEADER */}
                <header className="mb-8">
                    <Link href="/humanities/gaming/video" className="inline-flex items-center gap-2 text-neutral-500 hover:text-white text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Back to Games Hub
                    </Link>
                    
                    <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-neutral-800 pb-6 gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="px-2 py-1 bg-red-950/30 text-red-500 border border-red-500/30 text-[10px] font-black uppercase tracking-widest rounded">
                                    Gen 0{gen}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-2">
                                {activeRegion.toUpperCase()} DEX
                            </h1>
                            <p className="text-neutral-400 font-light">
                                Regional subsystem connected to the National Database.
                            </p>
                        </div>
                        
                        <div className="flex flex-col items-start md:items-end">
                            <div className="flex items-center gap-2 text-red-500 mb-1">
                                <Database size={16} />
                                <span className="text-xs font-bold uppercase tracking-widest">Active Connection</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* REGION NAVIGATION TABS */}
                <div className="flex flex-wrap gap-2 mb-8">
                    <div className="flex items-center justify-center p-2 bg-neutral-900 border border-neutral-800 rounded-lg mr-2">
                        <Layers size={16} className="text-neutral-500" />
                    </div>
                    {REGIONS.map((region) => (
                        <Link 
                            key={region.id}
                            href={`/humanities/gaming/video/pokemon/${region.id}`}
                            className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                                gen === region.id 
                                ? 'bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)] border border-red-500' 
                                : 'bg-neutral-900/60 border border-neutral-800 text-neutral-500 hover:bg-neutral-800 hover:text-white'
                            }`}
                        >
                            {region.name}
                        </Link>
                    ))}
                </div>

                {/* THE CLIENT-SIDE GRID & SEARCH */}
                <PokedexGrid initialData={pokedex} currentGen={gen} />

            </div>
        </main>
    );
}