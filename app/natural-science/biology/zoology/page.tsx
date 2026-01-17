"use client";
import React, { useState } from "react";
import Link from "next/link";
import { BIOMES, BiomeType } from "./zoology-data";
import ZoologyBackground from "./ZoologyBackground";
import ZoologyModal from "./ZoologyModal";
import { useWikiZoo, AnimalRecord } from "./useWikiZoo";
import { 
  ArrowLeft, Globe, Satellite, Wifi, 
  Search, AlertTriangle, Database, Scan 
} from "lucide-react";

export default function ZoologyPage() {
  const [activeBiomeId, setActiveBiomeId] = useState<BiomeType>('RAINFOREST');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalRecord | null>(null);
  
  // Connect to Hook
  // We cast activeBiomeId to match the hook's key type
  const { data: animalData, loading, error, searchAnimal } = useWikiZoo(activeBiomeId as any);
  const activeBiome = BIOMES.find(b => b.id === activeBiomeId) || BIOMES[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchAnimal(searchQuery);
      setSelectedAnimal(null);
    }
  };

  const handleRelationJump = (query: string) => {
      setSearchQuery(query);
      searchAnimal(query);
      setSelectedAnimal(null); // Close modal to show results
  };

  return (
    <main className="min-h-screen bg-[#050a07] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden transition-colors duration-1000">
      
      {/* 1. VISUAL ENGINE */}
      <ZoologyBackground weather={activeBiome.weather} />
      
      {/* Gradient Overlay */}
      <div className={`fixed inset-0 bg-gradient-to-br ${
            activeBiome.id === 'OCEAN' ? 'from-blue-900/40' : 
            activeBiome.id === 'RAINFOREST' ? 'from-emerald-900/40' : 
            activeBiome.id === 'SAVANNA' ? 'from-amber-900/40' : 
            activeBiome.id === 'DESERT' ? 'from-orange-900/40' :
            activeBiome.id === 'WETLANDS' ? 'from-teal-900/40' :
            'from-cyan-900/40'
        } to-black opacity-60 pointer-events-none transition-colors duration-1000`} 
      />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-8">
             <Link href="/natural-science/biology" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 hover:text-white transition-colors mb-6">
                 <ArrowLeft size={10} /> Biology Dept
             </Link>
             
             <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
                 <div>
                     <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">
                         THE ARK <Globe className="opacity-50" size={40} />
                     </h1>
                     <p className="text-stone-400 max-w-xl font-light">
                         Global biodiversity monitoring station.
                     </p>
                 </div>
                 
                 {/* SEARCH & STATUS POD */}
                 <div className="flex flex-col md:flex-row gap-4">
                     <form onSubmit={handleSearch} className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-emerald-400 transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="SEARCH SPECIES..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full md:w-64 bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                        />
                     </form>

                     <div className="flex items-center gap-4 p-3 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
                         <div className={`p-2 rounded-full ${loading ? 'bg-amber-500/20 text-amber-500' : error ? 'bg-red-500/20 text-red-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                             {error ? <AlertTriangle size={16} /> : <Satellite size={16} className={loading ? 'animate-spin' : ''} />}
                         </div>
                         <div>
                             <div className="text-[9px] uppercase tracking-widest text-stone-500">Uplink Status</div>
                             <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                                 {error ? 'CONNECTION FAILED' : loading ? 'RECEIVING DATA...' : 'CONNECTED'} <Wifi size={10} />
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
        </header>

        {/* BIOME SELECTOR */}
        <div className="flex flex-wrap gap-4 mb-12">
            {BIOMES.map((biome) => {
                const Icon = biome.icon;
                const isActive = activeBiomeId === biome.id;
                return (
                    <button
                        key={biome.id}
                        onClick={() => { setActiveBiomeId(biome.id as any); setSearchQuery(""); }}
                        className={`
                            flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300
                            ${isActive 
                                ? `bg-white/10 ${biome.color} border-white/20 shadow-lg scale-105` 
                                : "bg-black/20 border-white/5 text-stone-500 hover:bg-white/5 hover:text-stone-300"}
                        `}
                    >
                        <Icon size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest">{biome.label}</span>
                    </button>
                )
            })}
        </div>

        {/* ANIMAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {animalData.map((animal) => (
                <div 
                    key={animal.id}
                    onClick={() => setSelectedAnimal(animal)}
                    className="group relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition-all duration-500 cursor-pointer"
                >
                    <div className="relative h-full bg-[#0a0f0d] rounded-xl overflow-hidden flex flex-col border border-white/5 group-hover:border-white/10 transition-colors">
                        
                        <div className="h-48 w-full bg-black relative overflow-hidden">
                            {animal.thumbnail ? (
                                <img src={animal.thumbnail} alt={animal.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-white/5 text-stone-700 font-mono text-xs">NO VISUAL DATA</div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f0d] to-transparent" />
                        </div>

                        <div className="p-6 pt-0 flex-1 flex flex-col">
                            <h2 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors truncate">
                                {animal.title}
                            </h2>
                            <div className="text-[10px] font-mono text-stone-500 mb-4 uppercase truncate">
                                {animal.description || "Classified Organism"}
                            </div>

                            <p className="text-sm text-stone-400 leading-relaxed mb-6 line-clamp-3">
                                {animal.extract}
                            </p>

                            <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/5">
                                <span className="text-[10px] font-mono text-stone-500 uppercase flex items-center gap-2">
                                    <Database size={10} /> ID: {animal.id}
                                </span>
                                <Scan size={16} className="text-stone-600 group-hover:text-emerald-500 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {loading && animalData.length === 0 && [1,2,3].map(i => (
                <div key={i} className="h-96 rounded-2xl bg-white/5 animate-pulse" />
            ))}
            
            {!loading && animalData.length === 0 && error && (
                <div className="col-span-full py-20 text-center border border-dashed border-red-900/50 rounded-xl bg-red-900/10">
                    <div className="text-red-400 font-bold mb-2">QUERY FAILED</div>
                    <div className="text-xs text-red-300/60 uppercase tracking-widest">{error}</div>
                </div>
            )}
        </div>

        {/* MODAL INJECTION */}
        {selectedAnimal && (
            <ZoologyModal 
                animal={selectedAnimal} 
                onClose={() => setSelectedAnimal(null)}
                onSearchRelation={handleRelationJump}
            />
        )}

      </div>
    </main>
  );
}