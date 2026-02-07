"use client";
import React from 'react';
import Link from 'next/link';
import WatercolorBackground from "./WatercolorBackground";
import PerspectivePlayground from "./PerspectivePlayground";
import { 
  Palette, Brush, Layers, Maximize, 
  ArrowLeft, Droplets 
} from "lucide-react";

export default function PaintingPage() {
  return (
    <main className="relative min-h-screen bg-[#fefce8] text-stone-800 overflow-hidden font-serif selection:bg-rose-200">
      
      {/* 1. VISUAL ENGINE */}
      <WatercolorBackground />
      {/* Texture Overlay for "Canvas" feel */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/humanities/visual-arts" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors font-sans">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Arts
            </Link>
            <div className="text-[10px] font-sans font-bold uppercase tracking-widest bg-stone-900 text-stone-100 px-2 py-1 rounded">
                Two Dimensional
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32">
            <h1 className="text-7xl md:text-9xl font-black text-stone-900 tracking-tighter uppercase leading-none mb-6 font-sans">
                THE PAINTED <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-amber-500">WINDOW</span>
            </h1>
            <p className="max-w-2xl text-xl text-stone-600 italic leading-relaxed border-l-4 border-rose-500 pl-6">
                "Painting is just another way of keeping a diary." — Picasso <br/>
                It is the art of capturing a fleeting moment of light and emotion on a permanent surface.
            </p>
        </header>

        {/* SECTION 1: MEDIUMS (Cards) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8 font-sans">
                <Droplets size={24} className="text-blue-500" />
                <h2 className="text-3xl font-black uppercase tracking-tight">The Mediums</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
                
                {/* OIL */}
                <div className="p-8 bg-white border border-stone-200 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-xs font-bold text-amber-600 uppercase mb-2">The Master's Choice</div>
                    <h3 className="text-3xl font-black mb-4">Oil Paint</h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-4">
                        Slow drying, rich pigments. Allows for intricate blending and "glazing" (layering thin transparent colors) to create luminosity.
                    </p>
                    <div className="h-2 w-full bg-gradient-to-r from-amber-700 to-amber-100 rounded-full" />
                </div>

                {/* ACRYLIC */}
                <div className="p-8 bg-white border border-stone-200 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-xs font-bold text-rose-600 uppercase mb-2">The Modern Standard</div>
                    <h3 className="text-3xl font-black mb-4">Acrylic</h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-4">
                        Fast drying, water-soluble plastic. Versatile and durable. Can mimic both watercolor and oil, but lacks the deep blending time of oil.
                    </p>
                    <div className="h-2 w-full bg-gradient-to-r from-rose-600 to-rose-200 rounded-full" />
                </div>

                {/* WATERCOLOR */}
                <div className="p-8 bg-white border border-stone-200 rounded-xl shadow-lg hover:-translate-y-2 transition-transform duration-300">
                    <div className="text-xs font-bold text-blue-500 uppercase mb-2">The Unforgiving</div>
                    <h3 className="text-3xl font-black mb-4">Watercolor</h3>
                    <p className="text-sm text-stone-500 leading-relaxed mb-4">
                        Pigment suspended in water. Transparent and unpredictable. Once a mark is made, it cannot be covered up—only darkened.
                    </p>
                    <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-blue-100 rounded-full" />
                </div>

            </div>
        </section>

        {/* SECTION 2: INTERACTIVE LAB */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8 font-sans">
                <Maximize size={24} className="text-stone-800" />
                <h2 className="text-3xl font-black uppercase tracking-tight">The Illusion of Depth</h2>
            </div>
            
            
            
            <PerspectivePlayground />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-stone-600">
                <p>
                    Before the Renaissance, art was mostly flat (think Egyptian or Medieval). 
                    <strong>Filippo Brunelleschi</strong> rediscovered linear perspective in the 15th century, allowing artists to create mathematically accurate 3D spaces on 2D walls.
                </p>
                <div className="p-4 bg-white border border-stone-200 rounded italic">
                    "Perspective is the rein and rudder of painting." — Leonardo da Vinci
                </div>
            </div>
        </section>

        {/* SECTION 3: THE STRATA (Layers) */}
        <section className="border-t border-stone-300 pt-12">
            <div className="flex items-center gap-4 mb-8 font-sans">
                <Layers size={24} className="text-stone-800" />
                <h2 className="text-3xl font-black uppercase tracking-tight">Anatomy of a Painting</h2>
            </div>

            <div className="relative border-l-2 border-stone-300 ml-4 space-y-12">
                
                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-stone-300 rounded-full border-4 border-[#fefce8]" />
                    <h3 className="text-xl font-bold font-sans uppercase">1. Imprimatura</h3>
                    <p className="text-stone-500 mt-2">The "First Layer". A stained base coat (usually earth tone) to kill the harsh white of the canvas.</p>
                </div>

                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-stone-400 rounded-full border-4 border-[#fefce8]" />
                    <h3 className="text-xl font-bold font-sans uppercase">2. Underpainting</h3>
                    <p className="text-stone-500 mt-2">Monochromatic sketch defining values (light and dark) without worrying about color yet.</p>
                </div>

                <div className="relative pl-8">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-rose-500 rounded-full border-4 border-[#fefce8]" />
                    <h3 className="text-xl font-bold font-sans uppercase">3. Glazing & Scumbling</h3>
                    <p className="text-stone-500 mt-2">Applying thin layers of transparent color (Glaze) or dry opaque color (Scumble) to build optical richness.</p>
                </div>

            </div>
        </section>

      </div>
    </main>
  );
}