"use client";
import React, { useState } from "react";
import Link from "next/link";
import LibraryBackground from "../components/LibraryBackground";
import { useAestheticAPI } from "../components/useAestheticAPI";
import { AESTHETICS_DB, PARENT_CATEGORIES, ParentCategory } from "../data/aesthetics"; 
import { ArrowLeft, X, Layers, Download, Palette, Grid3x3, ExternalLink } from "lucide-react";

export default function AestheticsLibrary() {
  const [activeFilter, setActiveFilter] = useState<ParentCategory | 'All'>('All');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { images, loading } = useAestheticAPI(selectedId || "");
  const selectedItem = AESTHETICS_DB.find(a => a.id === selectedId);

  const filteredData = activeFilter === 'All' 
    ? AESTHETICS_DB 
    : AESTHETICS_DB.filter(item => item.parentCategory === activeFilter);

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-stone-200 overflow-hidden font-sans selection:bg-rose-500/30 flex flex-col">
      <LibraryBackground />
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none z-0" />

      <header className="relative z-10 pt-8 px-8 flex flex-col items-center justify-center">
         <Link href="/humanities/philosophy/aesthetics" className="flex items-center gap-2 text-xs text-stone-500 hover:text-white transition-colors mb-6 uppercase tracking-widest group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Back to Aesthetics
         </Link>
         <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-stone-100 to-stone-500 mb-4 text-center">THE ARCHIVE</h1>
      </header>

      {/* DYNAMIC FILTER BAR */}
      <div className="relative z-10 py-6 px-6 overflow-x-auto">
          <div className="flex justify-center gap-2 min-w-max">
              <button onClick={() => setActiveFilter('All')} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${activeFilter === 'All' ? "bg-white text-black border-white" : "bg-black/30 text-stone-500 border-stone-800 hover:border-stone-500"}`}>All</button>
              {PARENT_CATEGORIES.map(filter => (
                  <button key={filter} onClick={() => setActiveFilter(filter)} className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300 ${activeFilter === filter ? "bg-white text-black border-white" : "bg-black/30 text-stone-500 border-stone-800 hover:border-stone-500"}`}>
                      {filter}
                  </button>
              ))}
          </div>
      </div>

      <div className="relative z-10 flex-1 px-6 pb-12 overflow-y-auto">
          <div className="max-w-7xl mx-auto columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {filteredData.map((item) => (
                  <div key={item.id} onClick={() => setSelectedId(item.id)} className="group relative break-inside-avoid rounded-2xl bg-[#151515]/80 border border-white/5 backdrop-blur-md overflow-hidden hover:-translate-y-2 transition-transform duration-500 hover:shadow-2xl cursor-pointer">
                      <div className="h-48 w-full relative overflow-hidden bg-black/50">
                          <div className="absolute inset-0" style={{background: `linear-gradient(135deg, ${item.palette[0]}, ${item.palette[1]})`, opacity: 0.6}} />
                          <div className="absolute inset-0 flex items-center justify-center"><div className="p-4 bg-black/20 backdrop-blur-sm rounded-full border border-white/20 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500"><Palette size={24} /></div></div>
                      </div>
                      <div className="p-6">
                          <div className="flex justify-between items-start">
                             <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
                             <span className="text-[9px] font-bold uppercase text-stone-500 border border-stone-800 px-2 py-1 rounded">{item.parentCategory}</span>
                          </div>
                          <p className="text-xs text-stone-400 line-clamp-2 mb-4">{item.desc}</p>
                          <div className="flex gap-2 mb-4">{item.palette.map(c => (<div key={c} className="w-4 h-4 rounded-full border border-white/20" style={{background: c}} />))}</div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* DRAWER */}
      <div className={`fixed inset-y-0 right-0 w-full md:w-[600px] bg-[#0c0c0c] border-l border-white/10 z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${selectedId ? "translate-x-0" : "translate-x-full"}`}>
          {selectedItem && (
              <div className="h-full flex flex-col">
                  <div className="p-8 border-b border-white/10 flex justify-between items-start bg-black/20">
                      <div><div className="flex items-center gap-2 text-rose-500 text-xs font-bold uppercase tracking-widest mb-2"><Layers size={12} /> {selectedItem.parentCategory}</div><h2 className="text-4xl font-black text-white">{selectedItem.name}</h2></div>
                      <button onClick={() => setSelectedId(null)} className="p-2 hover:bg-white/10 rounded-full transition-colors text-stone-500 hover:text-white"><X size={24} /></button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-8">
                      <p className="text-stone-300 leading-relaxed mb-8 text-lg border-l-2 pl-4" style={{borderColor: selectedItem.color}}>{selectedItem.desc}</p>
                      
                      <Link href="/humanities/philosophy/aesthetics/matrix" className="flex items-center justify-between p-4 mb-8 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                          <div className="flex items-center gap-4"><div className="p-3 bg-black/40 rounded-lg text-rose-400"><Grid3x3 size={24} /></div><div><div className="text-sm font-bold text-white">Inspect Artifacts</div><div className="text-xs text-stone-400">View Fashion, Tech, and Architecture details</div></div></div>
                          <ExternalLink size={16} className="text-stone-500 group-hover:text-white transition-colors" />
                      </Link>

                      <div className="space-y-4">
                           <div className="flex justify-between items-end"><h3 className="text-sm font-bold text-white uppercase tracking-widest">Mood Board</h3><div className="text-[10px] text-stone-500">Live Feed</div></div>
                           {loading ? (<div className="grid grid-cols-2 gap-2 animate-pulse"><div className="aspect-[3/4] bg-white/5 rounded-lg"></div><div className="aspect-[3/4] bg-white/5 rounded-lg"></div></div>) : (
                               <div className="grid grid-cols-2 gap-2">{images.slice(0, 4).map((img, i) => (<div key={i} className={`relative group overflow-hidden rounded-lg ${i===0 ? 'col-span-2 aspect-video' : 'aspect-square'}`}><img src={img} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" /></div>))}</div>
                           )}
                      </div>
                  </div>
              </div>
          )}
      </div>
    </main>
  );
}