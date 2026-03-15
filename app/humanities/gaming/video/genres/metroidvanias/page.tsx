"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Map, Unlock, Route, Database } from 'lucide-react';
import MetroidvaniaBackground from './_components/MetroidvaniaBackground';
import AbilityGatingLab from './_components/AbilityGatingLab';
import { GameCard, GameData } from '@/app/_components/GameMedia';
import VocabApplet from '@/app/_components/VocabApplet';
import { metroidvaniaVocab } from '@/app/_data/vocab/m/metroidvania';

export default function MetroidvaniaPage() {

    // MOCK DATABASE REPOSITORY
    const hallOfFame: GameData[] = [
        {
            id: "sm-1994",
            title: "Super Metroid",
            studio: "Nintendo",
            year: 1994,
            description: "The gold standard. Stranded on planet Zebes, Samus Aran must hunt for weapons and upgrades to defeat the Space Pirates. It pioneered the concept of a map that unfolds as you power up.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/e/e4/Smetroidbox.jpg"
        },
        {
            id: "sotn-1997",
            title: "Castlevania: Symphony of the Night",
            studio: "Konami",
            year: 1997,
            description: "The game that added the 'Vania' to the genre name. It merged Metroid's exploration mechanics with RPG leveling, equipment systems, and dark gothic architecture.",
            imageUrl: "https://upload.wikimedia.org/wikipedia/en/2/22/Castlevania_Symphony_of_the_Night_Cover_Artwork.jpg"
        },
        {
            id: "hk-2017",
            title: "Hollow Knight",
            studio: "Team Cherry",
            year: 2017,
            description: "A modern masterpiece of atmospheric storytelling and brutal combat, set in the decaying subterranean insect kingdom of Hallownest.",
            imageUrl: "https://cdn.sanity.io/images/fuvbjjlp/production/32b4ab24925ebb390d8f735a1ab837e94ec31853-1200x712.png"
        }
    ];

    return (
        <main className="relative min-h-screen bg-[#0a0a0f] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            
            <MetroidvaniaBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-zinc-800/60 pb-8 backdrop-blur-sm">
                    <Link href="/humanities/gaming/video/genres" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Video Game Genres
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-zinc-900 border border-indigo-500/30 rounded-lg text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            <Map size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-300/50">
                            Gaming // System Design
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        METROIDVANIA & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">UTILITY GATING</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        A portmanteau of <em>Metroid</em> and <em>Castlevania</em>. This genre is defined by a large, interconnected world map where access to new areas is restricted not by literal keys, but by the player's acquired traversal abilities.
                    </p>
                </header>

                {/* THE LAB & THEORY */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    <div className="lg:col-span-5 space-y-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Unlock className="text-indigo-400" /> The Lock and Key Mechanism
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                In a standard adventure game, you find a Red Key to open a Red Door. Once the door is open, the key is useless. Metroidvanias replace the key with a permanent character upgrade—like a double jump or a wall dash.
                            </p>
                            
                            

                            <div className="p-5 bg-zinc-900/60 border-l-4 border-indigo-500 text-sm text-zinc-300 font-serif italic rounded-r-xl mt-6">
                                The "Double Jump" acts as the key to a high ledge, but it also fundamentally changes how you interact with every other room in the game. The lock dictates progression; the key dictates gameplay.
                            </div>
                        </section>

                        <section className="pt-8 border-t border-zinc-800/60">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Route className="text-emerald-400" /> The Art of Backtracking
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                A successful Metroidvania constantly teases the player. You will walk past a seemingly impossible gap in the first hour of the game, cementing it in your mental map. Ten hours later, when you finally find the grappling hook, the psychological realization hits: <em>I can finally cross that gap in the starting zone.</em>
                            </p>
                        </section>
                    </div>

                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <AbilityGatingLab />
                        </div>
                    </div>
                </div>

                {/* THE DATABASE */}
                <div className="border-t border-zinc-800/60 pt-16 mb-24">
                    <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        <Database className="text-indigo-400" /> The Hall of Fame
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Foundational texts and modern masterworks of the genre.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {hallOfFame.map(game => (
                            <GameCard key={game.id} game={game} />
                        ))}
                    </div>
                </div>

                {/* GAMER LEXICON */}
                <div className="border-t border-zinc-800/60 pt-16">
                    <div className="mb-6">
                        <h2 className="text-3xl font-black text-white tracking-tight">Gamer Lexicon</h2>
                        <p className="text-sm text-zinc-500 font-mono mt-1">Sourced from /m/metroidvania.ts</p>
                    </div>
                    <VocabApplet 
                        currentDomain="Gaming"
                        localTerms={metroidvaniaVocab}
                    />
                </div>

            </div>
        </main>
    );
}