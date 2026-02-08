"use client";
import React from 'react';
import Link from 'next/link';
import TopoMapEngine from "./TopoMapEngine";
import GeomorphologyLab from "./GeomorphologyLab";
import { LANDFORMS } from './landforms';
import { 
  Globe, Map as MapIcon, Compass, 
  ArrowLeft, Mountain, Layers 
} from "lucide-react";

export default function GeographyPage() {
  return (
    <main className="relative min-h-screen bg-[#ecfccb] text-stone-800 overflow-hidden font-sans selection:bg-green-200">
      
      {/* 1. VISUAL ENGINE */}
      <TopoMapEngine />
      {/* Paper Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />

      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/natural-science/earth-science" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-600 hover:text-green-800 transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Earth Science
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white border border-stone-300 px-3 py-1 rounded text-green-800 shadow-sm">
                <Compass size={12} /> Geomorphology
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32">
            <h1 className="text-7xl md:text-9xl font-black text-stone-900 tracking-tighter uppercase leading-none mb-8">
                THE SCULPTED <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-stone-500">EARTH</span>
            </h1>
            <p className="max-w-2xl text-xl text-stone-700 font-serif italic border-l-4 border-green-600 pl-6">
                "Geography is the study of the stage on which the human drama is played."
                <span className="block text-sm font-sans font-bold mt-2 not-italic text-stone-500">— Landscape & Force</span>
            </p>
        </header>


        {/* SECTION 1: THE LAB */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Layers size={24} className="text-green-700" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Geomorphology Lab</h2>
            </div>
            
            <GeomorphologyLab />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-stone-600">
                <p>
                    Landforms are not static. They are the result of a constant battle between <strong>Uplift</strong> (Tectonics building mountains) and <strong>Erosion</strong> (Water/Ice wearing them down).
                </p>
                <div className="p-4 bg-white border border-stone-300 rounded shadow-sm">
                    <strong>The V vs U Rule:</strong> Rivers carve sharp "V" shaped valleys. Glaciers carve wide "U" shaped troughs.

                </div>
            </div>
        </section>

        {/* SECTION 2: LANDFORM ATLAS */}
        <section className="border-t border-stone-300 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <Globe size={24} className="text-green-700" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Feature Atlas</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LANDFORMS.map((l) => (
                    <div key={l.id} className="group bg-white border border-stone-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300">
                        <div className="h-48 overflow-hidden relative">
                             <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${l.image})` }}
                             />
                             <div className="absolute top-4 left-4">
                                 <span className="bg-green-100 text-green-800 text-[10px] font-bold px-2 py-1 rounded border border-green-200 uppercase tracking-wide">
                                     {l.force} Process
                                 </span>
                             </div>
                        </div>
                        <div className="p-6">
                            <h3 className="text-2xl font-black text-stone-800 mb-2">{l.name}</h3>
                            <div className="flex items-center gap-2 mb-4 text-xs font-bold text-stone-400 uppercase">
                                <Mountain size={12} /> {l.process}
                            </div>
                            <p className="text-sm text-stone-600 leading-relaxed">
                                {l.desc}
                            </p>
                        </div>
                        {/* Specific diagram trigger based on ID */}
                        {l.id === 'oxbow' && <div className="px-6 pb-6 text-xs text-stone-400">
</div>}
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}