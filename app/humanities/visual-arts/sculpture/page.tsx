"use client";
import React from 'react';
import Link from 'next/link';
import WireframeTurntable from "./WireframeTurntable";
import LightingStudio from "./LightingStudio";
import { 
  Box, Hammer, Layers, Move3d, 
  ArrowLeft, Circle
} from "lucide-react";

export default function SculpturePage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-stone-200 overflow-hidden font-sans selection:bg-stone-700/50">
      
      {/* 1. VISUAL ENGINE */}
      <WireframeTurntable />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/humanities/visual-arts" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-white transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Arts
            </Link>
            <div className="text-[10px] font-bold uppercase tracking-widest bg-stone-800 text-stone-400 px-2 py-1 rounded">
                Three Dimensional
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32 pl-4 border-l-4 border-stone-700">
            <h1 className="text-6xl md:text-9xl font-black text-white tracking-tighter uppercase leading-none mb-6">
                THE TANGIBLE <br/><span className="text-stone-600">VOID</span>
            </h1>
            <p className="max-w-xl text-lg text-stone-400 font-light leading-relaxed">
                Painting is an illusion of space. Sculpture is the occupation of it. 
                It forces the viewer to move, to circle, and to engage with the physical presence of the object.
            </p>
        </header>

        {/* SECTION 1: METHODS (Bento) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Hammer size={24} className="text-stone-500" />
                <h2 className="text-3xl font-black uppercase tracking-tight">The Process</h2>
            </div>
            
            

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* SUBTRACTIVE */}
                <div className="p-8 bg-stone-900/80 border border-stone-800 rounded-2xl hover:bg-stone-900 transition-colors">
                    <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-black rounded-lg text-stone-400">
                            <Box size={24} />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-stone-600">Michelangelo</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Subtractive</h3>
                    <p className="text-sm text-stone-400 leading-relaxed mb-4">
                        Taking away material. Carving stone or wood. The figure is already inside the block; the artist merely removes the excess.
                    </p>
                    <div className="text-xs font-mono text-stone-500 border-t border-stone-800 pt-4">
                        Materials: Marble, Granite, Wood
                    </div>
                </div>

                {/* ADDITIVE */}
                <div className="p-8 bg-stone-900/80 border border-stone-800 rounded-2xl hover:bg-stone-900 transition-colors">
                    <div className="flex items-start justify-between mb-6">
                        <div className="p-3 bg-black rounded-lg text-stone-400">
                            <Layers size={24} />
                        </div>
                        <span className="text-[10px] font-bold uppercase text-stone-600">Rodin</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Additive</h3>
                    <p className="text-sm text-stone-400 leading-relaxed mb-4">
                        Adding material. Modeling clay or wax. It allows for spontaneity, correction, and the capture of fleeting motion.
                    </p>
                    <div className="text-xs font-mono text-stone-500 border-t border-stone-800 pt-4">
                        Materials: Clay, Wax, Bronze Casting
                    </div>
                </div>

            </div>
        </section>

        {/* SECTION 2: THE INTERACTIVE LAB */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Move3d size={24} className="text-yellow-600" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Perception of Volume</h2>
            </div>
            
            <LightingStudio />
        </section>

        {/* SECTION 3: EVOLUTION */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-stone-800 pt-12">
            <div>
                <h3 className="text-xl font-bold text-white uppercase mb-4">Static</h3>
                <div className="aspect-square bg-stone-900 rounded-lg mb-4 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Menkaura_Khamerernebty_II_MFA_Boston_11.1738.jpg/800px-Menkaura_Khamerernebty_II_MFA_Boston_11.1738.jpg')] bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity grayscale" />
                    <div className="absolute bottom-2 left-2 text-[10px] bg-black px-1 text-white">EGYPTIAN</div>
                </div>
                <p className="text-xs text-stone-400">Rigid, frontal, eternal. Made to last forever.</p>
            </div>
            
            <div>
                <h3 className="text-xl font-bold text-white uppercase mb-4">Contrapposto</h3>
                <div className="aspect-square bg-stone-900 rounded-lg mb-4 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Michelangelo%27s_David_2015.jpg/800px-Michelangelo%27s_David_2015.jpg')] bg-cover bg-top opacity-60 group-hover:opacity-100 transition-opacity grayscale" />
                     <div className="absolute bottom-2 left-2 text-[10px] bg-black px-1 text-white">RENAISSANCE</div>
                </div>
                <p className="text-xs text-stone-400">"Counter-poise." Shifting weight to one leg creates a natural S-curve.</p>
                
            </div>

            <div>
                <h3 className="text-xl font-bold text-white uppercase mb-4">Kinetic</h3>
                <div className="aspect-square bg-stone-900 rounded-lg mb-4 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Umberto_Boccioni_-_Forme_uniche_della_continuit%C3%A0_nello_spazio_%28MOMA%29.jpg/800px-Umberto_Boccioni_-_Forme_uniche_della_continuit%C3%A0_nello_spazio_%28MOMA%29.jpg')] bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity grayscale" />
                     <div className="absolute bottom-2 left-2 text-[10px] bg-black px-1 text-white">FUTURISM</div>
                </div>
                <p className="text-xs text-stone-400">Motion frozen in time. The figure interacting with wind and speed.</p>
            </div>
        </section>

      </div>
    </main>
  );
}