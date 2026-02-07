"use client";
import React from 'react';
import Link from 'next/link';
import GallerySpotlight from "./GallerySpotlight";
import GoldenRatioComposer from "./GoldenRatioComposer";
import { 
  Palette, Box, Ruler, Camera, 
  History, PenTool, ArrowRight, Eye 
} from "lucide-react";
import ChromaEngine from './ChromaEngine';
import FluidBackground from './FluidBackground';

const GALLERIES = [
  {
    id: "painting",
    title: "Painting & 2D",
    icon: Palette,
    desc: "Oil, Acrylic, Watercolor. The manipulation of pigment on a flat surface to create illusion.",
    color: "text-rose-400",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
  },
  {
    id: "sculpture",
    title: "Sculpture & 3D",
    icon: Box,
    desc: "Marble, Bronze, Clay. Art that occupies physical space and demands to be seen from all angles.",
    color: "text-stone-400",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Michelangelo%27s_David_2015.jpg/800px-Michelangelo%27s_David_2015.jpg"
  },
  {
    id: "architecture",
    title: "Architecture",
    icon: Ruler,
    desc: "The mother of all arts. The design of the spaces we inhabit, blending engineering with aesthetics.",
    color: "text-amber-400",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Fallingwater_-_Frank_Lloyd_Wright.jpg/800px-Fallingwater_-_Frank_Lloyd_Wright.jpg"
  },
  {
    id: "photography",
    title: "Photography",
    icon: Camera,
    desc: "Writing with light. Capturing the decisive moment and framing reality through a lens.",
    color: "text-cyan-400",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Lange-MigrantMother02.jpg/800px-Lange-MigrantMother02.jpg"
  },
  {
    id: "design",
    title: "Graphic Design",
    icon: PenTool,
    desc: "Visual communication. Typography, branding, and UI. Where form meets function.",
    color: "text-emerald-400",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Bauhaus-Signet.svg/800px-Bauhaus-Signet.svg.png"
  },
  {
    id: "history",
    title: "Art History",
    icon: History,
    desc: "The Timeline. From cave paintings at Lascaux to the digital NFTs of the modern era.",
    color: "text-purple-400",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1200px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
  }
];

export default function VisualArtsPage() {
  return (
    <main className="relative min-h-screen bg-[#09090b] text-zinc-200 overflow-hidden font-sans selection:bg-white/20">
      
      {/* 1. VISUAL ENGINE */}
      
      <GallerySpotlight />
      <FluidBackground />
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* HEADER */}
        <header className="mb-24 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-md mb-6">
                <Eye size={12} className="text-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">Department of Perception</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-8">
                VISUAL <br/><span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-600">ARTS</span>
            </h1>
            <p className="max-w-xl mx-auto text-lg text-zinc-400 font-serif italic">
                "Art is not what you see, but what you make others see." — Degas
            </p>
        </header>

        {/* SECTION 1: THE GALLERY (Masonry Grid) */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {GALLERIES.map((gal) => (
                <Link 
                    key={gal.id} 
                    href={`/humanities/visual-arts/${gal.id}`}
                    className="group relative flex flex-col bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-2"
                >
                    {/* Image Layer */}
                    <div className="relative h-64 overflow-hidden">
                        <div 
                            className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                            style={{ backgroundImage: `url(${gal.img})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent opacity-90" />
                        
                        {/* Icon Badge */}
                        <div className="absolute top-4 left-4 p-3 bg-black/50 backdrop-blur-md rounded-lg border border-white/10 text-white">
                            <gal.icon size={20} />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                        <h3 className="text-2xl font-bold text-white mb-2">{gal.title}</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed mb-6 flex-1">
                            {gal.desc}
                        </p>
                        <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${gal.color}`}>
                            View Collection <ArrowRight size={14} />
                        </div>
                    </div>
                </Link>
            ))}
        </section>

        {/* SECTION 2: THE TOOL (Golden Ratio) */}
        <section className="mb-32">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-white uppercase tracking-widest flex items-center gap-3">
                    <Ruler size={24} className="text-yellow-500" /> The Geometry of Beauty
                </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <p className="text-zinc-400 leading-relaxed">
                        Why are certain images inherently pleasing? The answer often lies in <strong>Composition</strong>. 
                        Artists use mathematical grids to guide the viewer's eye.
                    </p>
                    
                    <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
                        <h4 className="text-white font-bold mb-2">The Fibonacci Sequence</h4>
                        <div className="font-mono text-yellow-500 text-sm">
                            1, 1, 2, 3, 5, 8, 13, 21...
                        </div>
                    </div>
                </div>
                
                <div className="lg:col-span-2">
                    <GoldenRatioComposer />
                </div>
            </div>
        </section>

        {/* SECTION 3: COLOR THEORY (Static Visualizer for now) */}
        <section className="mb-12 border-t border-zinc-800 pt-12">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                 <div>
                     <h2 className="text-2xl font-bold text-white uppercase tracking-widest mb-4">
                         Color Theory
                     </h2>
                     <p className="text-zinc-400 leading-relaxed mb-6">
                         Color is light. By understanding the relationships on the color wheel, we can create harmony or tension.
                     </p>
                     <ChromaEngine />

                 </div>
                 <div className="grid grid-cols-3 gap-2 h-32">
                     <div className="bg-red-500 rounded-lg"></div>
                     <div className="bg-blue-500 rounded-lg"></div>
                     <div className="bg-yellow-500 rounded-lg"></div>
                     <div className="bg-green-500 rounded-lg"></div>
                     <div className="bg-purple-500 rounded-lg"></div>
                     <div className="bg-orange-500 rounded-lg"></div>
                 </div>
             </div>
        </section>

      </div>
    </main>
  );
}