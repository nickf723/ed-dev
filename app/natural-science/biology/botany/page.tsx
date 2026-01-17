"use client";
import React, { useState } from "react";
import Link from "next/link";
import BotanyBackground from "./BotanyBackground";
import BotanyModal from "./BotanyModal";
import { USAGE_CONFIG, PlantUsage } from "./botany-data";
import { useWikiBotany } from "./useWikiBotany";
import { ArrowLeft, Leaf, Droplets, Thermometer, Wind } from "lucide-react";

export default function BotanyPage() {
  const [filter, setFilter] = useState<'ALL' | PlantUsage>('ALL');
  const [selectedPlant, setSelectedPlant] = useState<any>(null);
  const { data, loading } = useWikiBotany(filter);

  return (
    <main className="min-h-screen bg-[#020604] text-stone-200 font-sans pl-0 md:pl-80 relative overflow-hidden selection:bg-emerald-500/30">
      
      {/* 1. VISUAL ENGINE */}
      <BotanyBackground />
      {/* Glass Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-950/20 to-black/80 pointer-events-none" />
      <div className="fixed inset-0 bg-[url('/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay" />

      <div className="relative z-10 p-6 md:p-12 min-h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="mb-12 flex justify-between items-end">
            <div>
                <Link href="/natural-science/biology" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 hover:text-emerald-400 transition-colors mb-6">
                    <ArrowLeft size={10} /> Biology Dept
                </Link>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-2">
                    ARBORETUM
                </h1>
                <p className="text-emerald-500/60 font-mono text-xs uppercase tracking-widest">
                    Living Collection // Ethnobotany Sector
                </p>
            </div>

            {/* Environmental Readout */}
            <div className="hidden md:flex gap-6 text-[10px] font-mono text-stone-500">
                <div>
                    <div className="flex items-center gap-2 mb-1"><Thermometer size={12} className="text-emerald-500"/> TEMP</div>
                    <div className="text-white text-lg">24.5°C</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1"><Droplets size={12} className="text-blue-500"/> HUMIDITY</div>
                    <div className="text-white text-lg">82%</div>
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1"><Wind size={12} className="text-stone-400"/> CO2</div>
                    <div className="text-white text-lg">420 PPM</div>
                </div>
            </div>
        </header>

        {/* FILTER BAR (The "Soil" Tabs) */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-emerald-500/10 pb-6">
            <button 
                onClick={() => setFilter('ALL')}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${filter === 'ALL' ? 'bg-white text-black' : 'bg-black/40 text-stone-500 border border-white/5 hover:border-white/20'}`}
            >
                All Specimens
            </button>
            {Object.entries(USAGE_CONFIG).map(([key, config]) => (
                <button
                    key={key}
                    onClick={() => setFilter(key as PlantUsage)}
                    className={`
                        px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all flex items-center gap-2
                        ${filter === key 
                            ? `bg-emerald-900/50 ${config.color} ${config.border} shadow-[0_0_15px_rgba(16,185,129,0.2)]` 
                            : "bg-black/40 border-white/5 text-stone-500 hover:text-white"}
                    `}
                >
                    {/* Render Icon dynamically if needed, or just label */}
                    {config.label}
                </button>
            ))}
        </div>

        {/* PLANT GRID (The "Plots") */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {data.map((plant) => {
                const config = USAGE_CONFIG[plant.usage];
                const UsageIcon = config.icon;
                
                return (
                    <div 
                        key={plant.id}
                        onClick={() => setSelectedPlant(plant)}
                        className="group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer border border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-500 bg-black/20"
                    >
                         
                        {/* Background Image */}
                        {plant.thumbnail ? (
                            <div className="absolute inset-0">
                                <img src={plant.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#020604] via-transparent to-transparent opacity-90" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/5 text-stone-700 text-xs font-mono">SEEDLING</div>
                        )}

                        {/* Glass Panel Content */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                {/* Usage Badge */}
                                <div className={`inline-flex items-center gap-2 px-2 py-1 rounded-md border ${config.border} bg-black/50 backdrop-blur-md mb-3 opacity-0 group-hover:opacity-100 transition-opacity delay-100`}>
                                    <UsageIcon size={10} className={config.color} />
                                    <span className={`text-[9px] font-bold uppercase ${config.color}`}>{config.label}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-white leading-none mb-2">{plant.title}</h3>
                                <div className="h-0.5 w-8 bg-emerald-500 group-hover:w-full transition-all duration-500" />
                            </div>
                        </div>
                    </div>
                )
            })}
            
            {/* Loading Skeletons */}
            {loading && [1,2,3,4].map(i => (
                <div key={i} className="aspect-[3/4] rounded-2xl bg-emerald-900/10 border border-emerald-500/10 animate-pulse" />
            ))}
        </div>

        {/* MODAL */}
        {selectedPlant && (
            <BotanyModal plant={selectedPlant} onClose={() => setSelectedPlant(null)} />
        )}

      </div>
    </main>
  );
}