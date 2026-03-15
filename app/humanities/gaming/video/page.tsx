"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Gamepad2, Database, ArrowRight, Search, CheckCircle2, CircleDashed, 
  PlayCircle, Star, Sword, Skull, Library, MountainSnow } from 'lucide-react';
import { GAMES_DB } from './_data/gamesDB';

// Helper for the status badges
const StatusIcon = ({ status }: { status: string }) => {
    switch(status) {
        case 'Completed': return <CheckCircle2 size={14} className="text-emerald-500" />;
        case 'Playing': return <PlayCircle size={14} className="text-amber-500" />;
        case 'Backlog': return <CircleDashed size={14} className="text-slate-500" />;
        default: return null;
    }
};

export default function VideoGamesHub() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredGames = GAMES_DB.filter(game => 
        game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        game.genre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-[#050505] text-neutral-300 font-sans selection:bg-indigo-500/30">
            <div className="max-w-[75rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HUB HEADER */}
                <header className="mb-16 border-b border-neutral-800 pb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-indigo-950/30 border border-indigo-500/20 rounded-lg text-indigo-400">
                            <Gamepad2 size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-500">
                            Humanities // Gaming // Interactive
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-4">
                        VIDEO GAMES
                    </h1>
                    <p className="text-lg text-neutral-400 font-light max-w-2xl leading-relaxed">
                        The repository for interactive digital media, systemic design analysis, and comprehensive franchise databases.
                    </p>
                </header>

                {/* SECTION 1: MASSIVE REPOSITORIES */}
                <section className="mb-20">
                    <h2 className="text-sm font-black uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                        <Database size={16} /> API-Connected Repositories
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* THE POKEMON PORTAL */}
                        <Link href="/humanities/gaming/video/pokemon/1" className="group block h-full">
                            <div className="h-full bg-neutral-900/40 border border-neutral-800 hover:border-red-500/50 rounded-2xl p-6 transition-all duration-300 relative overflow-hidden flex flex-col">
                                {/* Pokeball Decal */}
                                <div className="absolute -right-8 -bottom-8 w-40 h-40 border-[16px] border-neutral-800/50 rounded-full group-hover:border-red-500/10 transition-colors z-0" />
                                <div className="absolute right-6 bottom-6 w-8 h-8 bg-neutral-800/50 rounded-full group-hover:bg-red-500/10 transition-colors z-0" />
                                <div className="absolute right-0 bottom-12 w-24 h-4 bg-neutral-800/50 group-hover:bg-red-500/10 transition-colors z-0" />

                                <div className="relative z-10 flex-1">
                                    <div className="text-[10px] font-bold text-red-500 uppercase tracking-widest bg-red-950/30 px-2 py-1 rounded border border-red-500/20 w-fit mb-4">
                                        Live Database
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2 group-hover:text-red-400 transition-colors">National Pokédex</h3>
                                    <p className="text-sm text-neutral-400 leading-relaxed font-light mb-6 max-w-sm">
                                        A systemic breakdown of genetics, stats, and lineage, powered by live PokeAPI integration across all 9 generations.
                                    </p>
                                </div>
                                <div className="relative z-10 flex items-center gap-2 text-xs font-bold text-neutral-500 group-hover:text-white transition-colors mt-auto">
                                    Access Terminal <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    </div>
                </section>

                {/* SECTION 1.5: GENRE STUDIES */}
                <section className="mb-20">
                    <h2 className="text-sm font-black uppercase tracking-widest text-neutral-500 mb-6 flex items-center gap-2">
                        <Library size={16} /> Academic Genre Studies
                    </h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {/* Platformers */}
                        <Link href="/humanities/gaming/video/genres/platformers" className="group p-5 bg-neutral-900/30 border border-neutral-800 hover:border-sky-500/50 rounded-xl transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-3">
                                <MountainSnow size={20} className="text-sky-500" />
                                <ArrowRight size={14} className="text-neutral-600 group-hover:text-sky-400 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Platformers</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">Kinesthetics, momentum, and spatial navigation.</p>
                        </Link>

                        {/* Metroidvanias */}
                        <Link href="/humanities/gaming/video/genres/metroidvanias" className="group p-5 bg-neutral-900/30 border border-neutral-800 hover:border-indigo-500/50 rounded-xl transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-3">
                                <Skull size={20} className="text-indigo-500" />
                                <ArrowRight size={14} className="text-neutral-600 group-hover:text-indigo-400 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Metroidvanias</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">Utility-gated exploration and interconnected world design.</p>
                        </Link>

                        {/* RPGs */}
                        <Link href="/humanities/gaming/video/genres/rpgs" className="group p-5 bg-neutral-900/30 border border-neutral-800 hover:border-amber-500/50 rounded-xl transition-all hover:-translate-y-1">
                            <div className="flex justify-between items-start mb-3">
                                <Sword size={20} className="text-amber-500" />
                                <ArrowRight size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">Role-Playing</h3>
                            <p className="text-xs text-neutral-500 leading-relaxed">Action economies, state spaces, and narrative agency.</p>
                        </Link>
                    </div>
                </section>

                {/* SECTION 2: BESPOKE GAME ANALYSES */}
                <section>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-6 gap-4">
                        <h2 className="text-sm font-black uppercase tracking-widest text-neutral-500 flex items-center gap-2">
                            <Gamepad2 size={16} /> Curated Analyses & Reviews
                        </h2>
                        
                        {/* Local Search */}
                        <div className="flex items-center gap-3 bg-black border border-neutral-800 rounded-lg px-4 py-2 focus-within:border-indigo-500/50 transition-colors w-full sm:w-72">
                            <Search size={14} className="text-neutral-500" />
                            <input 
                                type="text"
                                placeholder="Filter archive..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-transparent border-none outline-none text-white text-xs w-full font-mono placeholder:text-neutral-600"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filteredGames.map(game => {
                            const Icon = game.icon;
                            return (
                                <Link key={game.id} href={game.href} className="group block h-full">
                                    <div className={`h-full bg-neutral-900/30 border border-neutral-800 hover:border-${game.color}-500/50 hover:bg-neutral-900/60 rounded-2xl p-6 transition-all duration-300 flex flex-col`}>
                                        
                                        {/* Card Header */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <div className={`text-[9px] font-black uppercase tracking-widest text-${game.color}-500 mb-1`}>
                                                    {game.genre}
                                                </div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-white transition-colors">{game.title}</h3>
                                                <div className="text-xs text-neutral-500 font-mono mt-1">
                                                    {game.developer} • {game.releaseYear}
                                                </div>
                                            </div>
                                            <div className={`p-2 bg-${game.color}-950/30 rounded-lg text-${game.color}-400 group-hover:scale-110 transition-transform shrink-0`}>
                                                <Icon size={20} />
                                            </div>
                                        </div>

                                        <p className="text-sm text-neutral-400 leading-relaxed font-light mb-6 flex-1">
                                            {game.summary}
                                        </p>

                                        {/* Meta Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-neutral-800/50">
                                            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400">
                                                <StatusIcon status={game.status} /> {game.status}
                                            </div>
                                            <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-950/30 px-2 py-1 rounded border border-amber-500/20">
                                                <Star size={12} className="fill-amber-400" />
                                                {game.rating}/10
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>

            </div>
        </main>
    );
}