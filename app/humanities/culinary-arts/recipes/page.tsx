"use client";
import React, { useState } from "react";
import Link from "next/link";
import CulinaryBackground from "../CulinaryBackground";
import RecipeModal from "./RecipeModal";
import { KITCHEN_STATIONS, CUISINES } from "../culinary-data";
import { useCulinary } from "./useCulinary";
import { ArrowLeft, Search, UtensilsCrossed, Flame, Globe } from "lucide-react";

export default function RecipesPage() {
  const [selectedMealId, setSelectedMealId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { data, loading, activeFilter, fetchCategory, fetchArea, fetchRandom, searchRecipe, getRecipeDetails } = useCulinary('Beef');

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if(searchQuery.trim()) searchRecipe(searchQuery); };

  return (
    <main className="min-h-screen bg-[#1c1917] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-orange-500/30">
      <CulinaryBackground />
      <div className="fixed inset-0 bg-gradient-to-br from-orange-950/20 to-black/80 pointer-events-none" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        <header className="mb-8 flex flex-col xl:flex-row justify-between items-start xl:items-end gap-8">
            <div>
                <Link href="/humanities/culinary-arts" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-orange-600 hover:text-orange-400 transition-colors mb-4"><ArrowLeft size={10} /> Culinary Hub</Link>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2 flex items-center gap-4">THE KITCHEN <UtensilsCrossed className="opacity-20" size={48} /></h1>
                <button onClick={fetchRandom} className="group flex items-center gap-3 px-5 py-3 mt-4 bg-gradient-to-r from-orange-700 to-red-800 rounded-lg text-white text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] transition-all border border-white/10">
                    <Flame size={14} className="group-hover:animate-bounce" /> Order Chef's Special
                </button>
            </div>
            <form onSubmit={handleSearch} className="relative group w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-orange-400 transition-colors" size={16} />
                <input type="text" placeholder="SEARCH RECIPES..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full md:w-80 bg-black/40 border border-white/10 rounded-lg py-3 pl-12 pr-4 text-xs font-mono text-white focus:outline-none focus:border-orange-500/50 transition-all" />
            </form>
        </header>

        <div className="flex flex-wrap gap-2 mb-6 pb-6 border-b border-white/5">
            {KITCHEN_STATIONS.map((station) => {
                const Icon = station.icon;
                const isActive = activeFilter === station.id;
                return (
                    <button key={station.id} onClick={() => fetchCategory(station.id)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${isActive ? `bg-orange-950/50 ${station.color} ${station.border}` : "bg-black/20 border-white/5 text-stone-500 hover:text-stone-300 hover:bg-white/5"}`}>
                        <Icon size={14} /><span className="text-[10px] font-bold uppercase tracking-widest">{station.label}</span>
                    </button>
                )
            })}
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 mb-8 custom-scrollbar">
            <div className="flex items-center gap-2 px-3 py-1 text-[10px] font-mono text-stone-500 uppercase flex-shrink-0"><Globe size={12} /> Global Cuisines:</div>
            {CUISINES.map(area => (
                <button key={area} onClick={() => fetchArea(area)} className={`px-4 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wide whitespace-nowrap transition-all ${activeFilter === area ? "bg-white text-black border-white" : "border-white/10 text-stone-400 hover:border-white/30 hover:text-white"}`}>{area}</button>
            ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {loading ? ([1,2,3,4].map(i => <div key={i} className="aspect-square rounded-2xl bg-white/5 animate-pulse border border-white/5" />)) : (
                data.map((meal) => (
                    <div key={meal.id} onClick={() => setSelectedMealId(meal.id)} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border border-white/5 hover:border-orange-500/30 transition-all duration-500 bg-[#292524]">
                        <img src={meal.thumbnail} alt={meal.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-xl font-black text-white leading-tight mb-1">{meal.name}</h3>
                                <div className="text-[10px] font-mono text-stone-400 uppercase flex items-center gap-2">{meal.category} // {meal.area}</div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
        {selectedMealId && <RecipeModal mealId={selectedMealId} fetchDetails={getRecipeDetails} onClose={() => setSelectedMealId(null)} />}
      </div>
    </main>
  );
}