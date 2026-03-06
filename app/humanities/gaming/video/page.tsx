"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // <-- Imported Next.js Image
import { 
  Gamepad2, Search, Filter, 
  ArrowRight, Star, Clock, 
  CheckCircle2, CircleDashed 
} from 'lucide-react';
import { GAMES_DB } from './_data/gamesDB';

export default function GameVaultPage() {
  const [activeGenre, setActiveGenre] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'title' | 'year' | 'rating'>('rating');
  
  const genres = ['All', ...Array.from(new Set(GAMES_DB.map(game => game.genre)))];

  const featuredGame = GAMES_DB.find(g => g.id === 'super-mario-galaxy') || GAMES_DB[0];
  const FeaturedIcon = featuredGame.icon;

  let processedGames = activeGenre === 'All' 
    ? [...GAMES_DB] 
    : GAMES_DB.filter(game => game.genre === activeGenre);

  processedGames.sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'year') return b.releaseYear - a.releaseYear;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
  });

  const getStatusIcon = (status: string) => {
      if (status === 'Completed') return <CheckCircle2 size={14} className="text-emerald-500" />;
      if (status === 'Playing') return <Clock size={14} className="text-amber-500" />;
      return <CircleDashed size={14} className="text-neutral-500" />;
  };

  return (
    <main className="relative min-h-screen bg-[#050505] font-sans text-neutral-300">
      
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 py-12 lg:py-24">
         
         {/* HEADER */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
             <div>
                 <div className="flex items-center gap-3 text-purple-500 mb-6 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                     <span className="w-8 h-px bg-purple-500"></span>
                     Interactive Media
                 </div>
                 <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
                     THE VAULT
                 </h1>
             </div>
         </div>

         {/* FEATURED HERO SECTION */}
         <Link 
            href={featuredGame.href}
            className={`group relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-${featuredGame.color}-900/40 to-black border border-neutral-800 hover:border-${featuredGame.color}-500/50 transition-all duration-500 mb-16 flex flex-col md:flex-row min-h-[400px] shadow-2xl block`}
         >
             {/* Left Content */}
             <div className="p-8 md:p-16 flex flex-col justify-center flex-1 relative z-20">
                 <div className="flex items-center gap-3 mb-4">
                     <span className={`px-3 py-1 rounded bg-${featuredGame.color}-950/80 border border-${featuredGame.color}-500/50 text-${featuredGame.color}-400 text-[10px] font-black uppercase tracking-widest backdrop-blur-md`}>
                         Featured Title
                     </span>
                     <span className="flex items-center gap-1 text-yellow-500 font-bold text-sm bg-black/50 px-2 py-1 rounded backdrop-blur-md">
                         <Star size={14} fill="currentColor"/> {featuredGame.rating}/10
                     </span>
                 </div>
                 
                 <h2 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight drop-shadow-lg">
                     {featuredGame.title}
                 </h2>
                 <p className="text-lg text-neutral-300 max-w-xl leading-relaxed font-light mb-8 drop-shadow-md">
                     {featuredGame.summary}
                 </p>
                 
                 <div className={`flex items-center gap-2 text-sm font-bold text-${featuredGame.color}-400 uppercase tracking-widest group-hover:gap-4 transition-all drop-shadow-md`}>
                     Access Records <ArrowRight size={16} />
                 </div>
             </div>

             {/* Right Graphic / Image Area */}
             <div className="flex-1 relative flex items-center justify-center p-12 overflow-hidden min-h-[300px] md:min-h-full">
                 <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent via-black/50 to-[#050505] z-10"></div>
                 
                 {featuredGame.imageUrl ? (
                     <Image 
                         src={featuredGame.imageUrl} 
                         alt={featuredGame.title} 
                         fill 
                         className="object-cover object-center opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700 z-0"
                     />
                 ) : (
                     <FeaturedIcon size={300} className={`text-${featuredGame.color}-500 opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 relative z-0`} />
                 )}
             </div>
         </Link>

         {/* CONTROLS BAR */}
         <div className="flex flex-col lg:flex-row justify-between items-center mb-12 gap-6 bg-neutral-900/30 p-3 rounded-2xl border border-neutral-800 backdrop-blur-md">
             
             {/* Genre Filters */}
             <div className="flex flex-wrap gap-2 w-full lg:w-auto">
                 {genres.map(genre => (
                     <button
                        key={genre}
                        onClick={() => setActiveGenre(genre)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                            activeGenre === genre 
                                ? 'bg-white text-black shadow-lg scale-105' 
                                : 'bg-black/50 text-neutral-500 hover:text-white hover:bg-neutral-800'
                        }`}
                     >
                         {genre}
                     </button>
                 ))}
             </div>

             {/* Sorting */}
             <div className="flex items-center gap-4 w-full lg:w-auto pr-2">
                 <div className="flex items-center gap-2 bg-black/50 rounded-lg p-1 border border-neutral-800">
                     <button onClick={() => setSortBy('rating')} className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${sortBy === 'rating' ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`}>Rating</button>
                     <button onClick={() => setSortBy('year')} className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${sortBy === 'year' ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`}>Year</button>
                     <button onClick={() => setSortBy('title')} className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${sortBy === 'title' ? 'bg-neutral-800 text-white' : 'text-neutral-500'}`}>A-Z</button>
                 </div>
             </div>
         </div>

         {/* THE GRID */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
             {processedGames.map((game) => {
                 const Icon = game.icon;
                 
                 return (
                     <Link 
                        key={game.id} 
                        href={game.href}
                        className="group relative flex flex-col bg-[#0a0a0a] border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-500 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)]"
                     >
                        {/* COVER ART AREA */}
                        <div className={`aspect-[3/4] w-full relative overflow-hidden bg-gradient-to-br from-black to-${game.color}-950/30 p-6 flex flex-col justify-between`}>
                            
                            {/* The Optional Image */}
                            {game.imageUrl && (
                                <>
                                    <Image 
                                        src={game.imageUrl} 
                                        alt={game.title} 
                                        fill 
                                        className="object-cover opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 z-0"
                                    />
                                    {/* Vignette/Gradient overlay so text is always readable over bright images */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80 z-10 transition-opacity duration-500 group-hover:opacity-80"></div>
                                </>
                            )}

                            {/* Top Badges */}
                            <div className="flex justify-between items-start z-20">
                                <span className="bg-black/80 backdrop-blur text-white text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded border border-neutral-700">
                                    {game.releaseYear}
                                </span>
                                <div className="flex items-center gap-1 bg-black/80 backdrop-blur px-2 py-1 rounded border border-neutral-700 text-[10px] font-bold text-yellow-500">
                                    <Star size={10} fill="currentColor"/> {game.rating}
                                </div>
                            </div>

                            {/* Abstract Graphic Fallback (Only shows if no image) */}
                            {!game.imageUrl && (
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-500 group-hover:scale-125 transform z-0">
                                    <Icon size={140} />
                                </div>
                            )}

                            {/* Title Area */}
                            <div className="relative z-20 mt-auto">
                                <div className={`text-[10px] font-black text-${game.color}-400 uppercase tracking-widest mb-2 flex items-center gap-2 drop-shadow-md`}>
                                    {game.developer}
                                </div>
                                <h3 className="text-2xl font-black text-white leading-tight drop-shadow-lg">
                                    {game.title}
                                </h3>
                            </div>
                        </div>

                        {/* DATA BAR */}
                        <div className="p-4 bg-black border-t border-neutral-900 flex justify-between items-center relative z-20">
                            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                                {game.genre}
                            </span>
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                                {getStatusIcon(game.status)} {game.status}
                            </div>
                        </div>
                     </Link>
                 );
             })}
         </div>

      </div>
    </main>
  );
}