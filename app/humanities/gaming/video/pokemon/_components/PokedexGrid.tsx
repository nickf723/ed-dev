"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Search, X, Database, Zap } from 'lucide-react';
import { PokeCard } from './PokeCard';
import { PokemonData, fetchPokemonDetails } from './PokeAPI';
import StatVisualizer from './StatVisualizer';

export default function PokedexGrid({ initialData, currentGen }: { initialData: PokemonData[], currentGen: string }) {
    const [searchTerm, setSearchTerm] = useState('');
    
    // Core states
    const [activePokemon, setActivePokemon] = useState<PokemonData | null>(null);
    const [displayForm, setDisplayForm] = useState<PokemonData | null>(null);
    
    // Fetched details states
    const [activeLore, setActiveLore] = useState<string>("Decrypting database entry...");
    const [altForms, setAltForms] = useState<PokemonData[]>([]);
    const [evoLine, setEvoLine] = useState<string[]>([]);

    const filteredPokemon = initialData.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.id.toString().includes(searchTerm)
    );

    // Fetch details when a Pokémon is clicked
    useEffect(() => {
        if (activePokemon) {
            setActiveLore("Decrypting database entry...");
            setAltForms([]); 
            setEvoLine([]); // Reset
            
            fetchPokemonDetails(activePokemon.id).then(details => {
                setActiveLore(details.lore);
                setAltForms(details.alternateForms.filter(form => form.spriteUrl !== '')); 
                setEvoLine(details.evolutionChain.map(p => p.name));
            });
        }
    }, [activePokemon]);

    // Helper to format names like "charizard-mega-x" into "Mega X"
    const formatFormLabel = (rawName: string) => {
        const parts = rawName.split('-');
        if (parts.length === 1) return "Base Form";
        return parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    };

    return (
        <div className="space-y-6">
            {/* SEARCH BAR (Remains unchanged) */}
            <div className="bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl backdrop-blur-md flex flex-col sm:flex-row gap-4 justify-between items-center sticky top-4 z-20 shadow-2xl">
                <div className="flex items-center gap-3 w-full sm:w-96 bg-black border border-neutral-800 rounded-lg px-4 py-2 focus-within:border-red-500/50 transition-colors">
                    <Search size={16} className="text-neutral-500 shrink-0" />
                    <input 
                        type="text"
                        placeholder={`Search Gen 0${currentGen}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-transparent border-none outline-none text-white text-sm w-full font-mono placeholder:text-neutral-600"
                    />
                </div>
                <div className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                    Showing {filteredPokemon.length} Entries
                </div>
            </div>

            {/* MASONRY GRID (Remains unchanged) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                {filteredPokemon.map((pokemon) => (
                    <div 
                        key={pokemon.id} 
                        onClick={() => {
                            setActivePokemon(pokemon);
                            setDisplayForm(pokemon); // Default to the base form
                        }}
                        className="cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                    >
                        <PokeCard pokemon={pokemon} />
                    </div>
                ))}
            </div>

            {/* THE DOSSIER MODAL OVERLAY */}
            {activePokemon && displayForm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer" onClick={() => setActivePokemon(null)} />
                    
                    <div className="relative w-full max-w-4xl bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-200">
                        
                        {/* Left Side: The Hero Image */}
                        <div className="w-full md:w-2/5 bg-neutral-900 relative p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-neutral-800 shrink-0">
                            <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent z-0" />
                            <div className="relative z-10 w-full aspect-square max-w-[250px] md:max-w-none">
                                <Image 
                                    src={displayForm.spriteUrl}
                                    alt={displayForm.name}
                                    fill
                                    className="object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] transition-all duration-500"
                                />
                            </div>
                        </div>

                        {/* Right Side: The Data */}
                        <div className="flex-1 p-6 md:p-8 flex flex-col max-h-[80vh] overflow-y-auto hidden-scrollbar">
                            
                            {/* Header & Close */}
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <div className="text-[10px] font-mono text-red-500 uppercase tracking-widest mb-1 flex items-center gap-2">
                                        <Database size={12} /> Record #{activePokemon.id.toString().padStart(3, '0')}
                                    </div>
                                    <h2 className="text-4xl font-black text-white capitalize tracking-tight">
                                        {/* Display the active form's name formatted correctly */}
                                        {displayForm.name.includes('-') 
                                            ? `${activePokemon.name} (${formatFormLabel(displayForm.name)})` 
                                            : activePokemon.name}
                                    </h2>
                                </div>
                                <button 
                                    onClick={() => setActivePokemon(null)}
                                    className="p-2 bg-neutral-900 hover:bg-red-950 hover:text-red-500 text-neutral-400 rounded-lg transition-colors border border-neutral-800 hover:border-red-500/50"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* DYNAMIC FORMS TOGGLE RIBBON */}
                            {altForms.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-6 p-2 bg-black/50 border border-neutral-800 rounded-lg">
                                    <button 
                                        onClick={() => setDisplayForm(activePokemon)}
                                        className={`px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${displayForm.name === activePokemon.name ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}`}
                                    >
                                        Base
                                    </button>
                                    {altForms.map(form => (
                                        <button 
                                            key={form.name}
                                            onClick={() => setDisplayForm(form)}
                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-widest transition-colors ${displayForm.name === form.name ? 'bg-red-600 text-white' : 'bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800'}`}
                                        >
                                            <Zap size={10} className={displayForm.name === form.name ? 'text-white' : 'text-amber-500'} />
                                            {formatFormLabel(form.name)}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {/* Active Types */}
                            <div className="flex gap-2 mb-6">
                                {displayForm.types.map(type => (
                                    <span key={type} className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded bg-neutral-800 text-white border border-neutral-700">
                                        {type}
                                    </span>
                                ))}
                            </div>

                            {/* Lore Terminal */}
                            <div className="bg-black/50 p-6 rounded-xl border border-neutral-800 mb-8 relative overflow-hidden group shrink-0">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500 opacity-50" />
                                <p className="text-sm text-neutral-300 leading-relaxed font-light italic">
                                    "{activeLore}"
                                </p>
                            </div>

                            {/* ABILITIES & EVOLUTIONS GRID */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 border-t border-neutral-800 pt-6">
                                
                                {/* Abilities */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-3">Identified Abilities</h4>
                                    <div className="space-y-2">
                                        {/* Added the ? right after abilities to prevent crashes! */}
                                        {displayForm.abilities?.map(ability => (
                                            <div key={ability.name} className="flex items-center justify-between p-2 bg-neutral-900/50 border border-neutral-800 rounded-lg">
                                                <span className="text-xs font-bold text-white capitalize">{ability.name.replace('-', ' ')}</span>
                                                {ability.isHidden && (
                                                    <span className="text-[8px] uppercase tracking-widest text-amber-500 bg-amber-950/30 px-1.5 py-0.5 rounded border border-amber-500/20">Hidden</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Evolution Chain */}
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-3">Genetic Lineage</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {/* Reverted back to string mapping so it matches the API output */}
                                        {evoLine.length > 0 ? evoLine.map((evoName, index) => (
                                            <React.Fragment key={evoName}>
                                                <div className={`px-2 py-1 text-xs font-bold capitalize rounded border ${evoName === activePokemon.name ? 'bg-red-600/20 text-red-400 border-red-500/30' : 'bg-neutral-900 text-neutral-400 border-neutral-800'}`}>
                                                    {evoName.replace('-', ' ')}
                                                </div>
                                                {index < evoLine.length - 1 && <span className="text-neutral-600 text-xs self-center">→</span>}
                                            </React.Fragment>
                                        )) : (
                                            <span className="text-xs text-neutral-600 italic">Scanning lineage...</span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Stat Visualizer (Now tied to displayForm!) */}
                            <div className="mt-auto">
                                <StatVisualizer stats={displayForm.stats} />
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}