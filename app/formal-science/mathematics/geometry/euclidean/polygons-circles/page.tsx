"use client";
import React from 'react';
import Link from 'next/link';
import PolygonField from "./PolygonField";
import PolygonLab from "./PolygonLab";
import { POLY_MEDIA, POLY_VOCAB } from './_assets/polygonsData';
import { 
  ArrowLeft, Hexagon, Circle, 
  Box, Maximize2 
} from "lucide-react";

export default function PolygonsPage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-purple-500/30 overflow-hidden">
      
      {/* 1. VISUAL ENGINE */}
      <PolygonField />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-16">
            <Link href="/formal-science/mathematics/geometry/euclidean" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 hover:text-white transition-colors bg-white/5 px-3 py-2 rounded backdrop-blur-sm border border-white/10">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Geometry
            </Link>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded text-purple-300 shadow-lg backdrop-blur-md">
                <Hexagon size={12} /> Unit 1.2
            </div>
        </div>

        {/* HERO */}
        <header className="mb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none mb-6 drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                    POLYGONS <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">& CIRCLES</span>
                </h1>
                
                <p className="text-xl text-purple-100/80 font-light leading-relaxed mb-8 border-l-4 border-purple-500 pl-6">
                    From the stability of the Triangle to the perfection of the Circle. Understanding the properties of closed shapes is the key to measuring the world.
                </p>
            </div>

            {/* Hero Card */}
            <div className="relative h-[300px] rounded-2xl overflow-hidden border border-purple-500/30 shadow-2xl group">
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${POLY_MEDIA.hero})` }}
                />
                <div className="absolute inset-0 bg-slate-900/60 group-hover:bg-slate-900/40 transition-colors" />
                <div className="absolute bottom-6 left-6">
                    <div className="text-xs font-mono text-purple-400 mb-1">NATURE'S GEOMETRY</div>
                    <div className="text-white font-bold uppercase">The Hexagon is the most<br/>efficient shape in nature.</div>
                </div>
            </div>
        </header>

        

[Image of parts of a circle diagram]


        {/* SECTION 1: THE LABORATORY */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <Maximize2 size={24} className="text-purple-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">The Infinite Limit</h2>
            </div>
            
            <p className="text-slate-400 mb-8 max-w-2xl">
                What happens when you add more sides to a polygon? The edges smooth out. The vertices blend together. Eventually, a Polygon becomes a Circle.
            </p>

            <PolygonLab />
        </section>

        {/* SECTION 2: VOCABULARY */}
        <section className="border-t border-white/10 pt-12">
            <div className="flex items-center gap-4 mb-12">
                <Box size={24} className="text-green-400" />
                <h2 className="text-3xl font-black text-white uppercase tracking-tight">Shape Classification</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {POLY_VOCAB.map((v) => (
                    <div key={v.term} className="group p-6 bg-slate-900/50 border border-slate-700 hover:border-purple-500 rounded-xl transition-all hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{v.term}</h3>
                            <div className="text-[10px] font-bold uppercase bg-slate-800 px-2 py-1 rounded text-slate-400">
                                {v.cat}
                            </div>
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {v.def}
                        </p>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </main>
  );
}