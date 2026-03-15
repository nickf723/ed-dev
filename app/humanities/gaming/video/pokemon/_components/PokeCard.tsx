import React from 'react';
import GlobalMediaCard from '@/app/_components/GlobalMediaCard';
import { PokemonData } from './PokeAPI';

const typeColors: Record<string, string> = {
    fire: 'bg-orange-500', water: 'bg-blue-500', grass: 'bg-green-500',
    electric: 'bg-yellow-400 text-black', psychic: 'bg-pink-500', ice: 'bg-cyan-300 text-black',
    dragon: 'bg-indigo-600', dark: 'bg-slate-800', fairy: 'bg-pink-300 text-black',
    normal: 'bg-neutral-400 text-black', poison: 'bg-purple-500', ground: 'bg-yellow-700',
    rock: 'bg-yellow-900', bug: 'bg-lime-500 text-black', ghost: 'bg-indigo-900',
    steel: 'bg-slate-500', flying: 'bg-sky-400 text-black', fighting: 'bg-red-700'
};

export function PokeCard({ pokemon, focusedStat }: { pokemon: PokemonData, focusedStat?: keyof PokemonData['stats'] }) {
    const formatName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <GlobalMediaCard
            title={formatName(pokemon.name)}
            subtitle={`National Dex #${pokemon.id.toString().padStart(3, '0')}`}
            imageUrl={pokemon.spriteUrl}
            altText={`Official artwork of ${pokemon.name}`}
            aspectRatio="aspect-square"
            colorTheme="neutral"
        >
            <div className="flex gap-2 mb-4">
                {pokemon.types.map(type => (
                    <span key={type} className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-sm ${typeColors[type] || 'bg-neutral-500 text-white'}`}>
                        {type}
                    </span>
                ))}
            </div>

            {/* CONDITIONAL RENDERING: Large focused stat OR standard 6-stat grid */}
            {focusedStat ? (
                <div className="pt-4 border-t border-neutral-800/50 flex flex-col items-center justify-center bg-black/20 rounded-lg pb-2 mt-2">
                    <span className="text-amber-500 uppercase text-[10px] font-black tracking-widest mb-1">{focusedStat}</span>
                    <span className="text-4xl font-black text-white">{pokemon.stats[focusedStat]}</span>
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] font-mono pt-3 border-t border-neutral-800/50">
                    <div className="flex justify-between items-center"><span className="text-neutral-500 uppercase">HP</span><span className="text-emerald-400 font-bold">{pokemon.stats.hp}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500 uppercase">SPD</span><span className="text-sky-400 font-bold">{pokemon.stats.speed}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500 uppercase">ATK</span><span className="text-rose-400 font-bold">{pokemon.stats.attack}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500 uppercase">SP.ATK</span><span className="text-purple-400 font-bold">{pokemon.stats.spAtk}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500 uppercase">DEF</span><span className="text-amber-400 font-bold">{pokemon.stats.defense}</span></div>
                    <div className="flex justify-between items-center"><span className="text-neutral-500 uppercase">SP.DEF</span><span className="text-indigo-400 font-bold">{pokemon.stats.spDef}</span></div>
                </div>
            )}
        </GlobalMediaCard>
    );
}