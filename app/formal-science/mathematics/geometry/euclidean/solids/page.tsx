"use client";
import React from 'react';
import Link from 'next/link';
import HoloStructure from "./HoloStructure";
import VolumeExtruder from "./VolumeExtruder";
import { SOLIDS_MEDIA, SOLID_TYPES, SOLIDS_VOCAB } from './_assets/solidsData';
import { 
  ArrowLeft, Box, Circle, 
  Layers, Construction 
} from "lucide-react";

export default function SolidsPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-stone-200 font-sans selection:bg-amber-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <HoloStructure />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/geometry/euclidean" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-600 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Geometry
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-amber-500 shadow-lg backdrop-blur-md">
                <Box size={12} /> Unit 1.4
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                    3D <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">SOLIDS</span>
                </h1>
                
                <p className="text-xl text-amber-100/80 font-light leading-relaxed mb-8 border-l-4 border-amber-600 pl-6 bg-black/20 p-4 rounded-r-xl backdrop-blur-sm">
                    We live in a three-dimensional world. Points become lines, lines become planes, and planes fold up to enclose space. This is the study of Volume and Capacity.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${SOLIDS_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-stone-900/60 group-hover:bg-stone-900/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-amber-500 mb-1">THE PLATONIC SOLIDS</div>
                    <div className="text-white font-bold uppercase">Perfect Symmetry in 3 Dimensions.</div>
                </div>
            </div>
        </header>

        

        {/* SECTION 1: THE CONCEPT */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Layers size={24} className="text-amber-500" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Extrusion Principle</h2>
            </div>
            
            <p className="text-stone-400 mb-8 max-w-2xl">
                Most 3D shapes (Prisms and Cylinders) are simply 2D shapes stretched out into the third dimension. Volume is just the area of the base times the height of the stretch.
            </p>

            <VolumeExtruder />
        </section>

        {/* SECTION 2: CLASSIFICATION */}
        <section className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-6">
            {SOLID_TYPES.map((type) => (
                <div key={type.id} className="bg-stone-900/80 border border-stone-700 p-8 rounded-xl hover:border-amber-500 transition-colors group">
                    <div className="w-12 h-12 rounded bg-amber-900/20 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                        {type.icon === 'Box' ? <Box size={24} /> : <Circle size={24} />}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2 uppercase">{type.title}</h3>
                    <p className="text-stone-400 leading-relaxed text-sm">
                        {type.desc}
                    </p>
                </div>
            ))}
        </section>

        {/* SECTION 3: VOCABULARY & EULER */}
        <section className="border-t border-stone-800 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <Construction size={24} className="text-orange-500" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Structural Anatomy</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {SOLIDS_VOCAB.map((v) => (
                    <div key={v.term} className="bg-stone-900/50 border border-stone-700 p-6 rounded-xl hover:bg-stone-800 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-amber-500">{v.term}</h3>
                            <span className="text-[10px] font-mono text-stone-500 bg-black px-2 py-1 rounded">{v.meta}</span>
                        </div>
                        <p className="text-xs text-stone-300 leading-relaxed">
                            {v.def}
                        </p>
                    </div>
                ))}
            </div>
            
            <div className="mt-12 p-6 bg-amber-900/10 border border-amber-500/20 rounded-xl flex items-center justify-between">
                <div>
                    <h4 className="text-lg font-bold text-white uppercase mb-1">Euler's Formula Check</h4>
                    <p className="text-sm text-stone-400">For a Cube: 6 Faces + 8 Vertices - 12 Edges = 2</p>
                </div>
                
                <div className="text-2xl font-mono text-amber-500 font-bold">
                    F + V - E = 2
                </div>
            </div>
        </section>

      </div>
    </main>
  );
}