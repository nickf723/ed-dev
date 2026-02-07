"use client";
import React from 'react';
import Link from 'next/link';
import BauhausGridEngine from "./BauhausGridEngine";
import TypefaceAnatomy from "./TypefaceAnatomy";
import { 
  PenTool, LayoutGrid, Type, 
  Palette, ArrowLeft, MousePointer 
} from "lucide-react";

export default function DesignPage() {
  return (
    <main className="relative min-h-screen bg-[#f5f5f4] text-stone-900 overflow-hidden font-sans selection:bg-black selection:text-white">
      
      {/* 1. VISUAL ENGINE */}
      <BauhausGridEngine />
      
      <div className="relative z-10 container mx-auto px-6 py-12">
        
        {/* NAV */}
        <div className="flex items-center justify-between mb-24">
            <Link href="/humanities/visual-arts" className="group flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-500 hover:text-black transition-colors">
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                Return to Arts
            </Link>
            <div className="text-[10px] font-bold uppercase tracking-widest bg-black text-white px-2 py-1">
                Visual Communication
            </div>
        </div>

        {/* HERO */}
        <header className="mb-32">
            <div className="border-l-8 border-black pl-8 md:pl-16 py-4">
                <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
                    Form <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">Follows</span> <br/>
                    Function
                </h1>
                <p className="max-w-xl text-lg font-medium text-stone-600">
                    Design is intelligence made visible. It is the discipline of organizing information to create clarity, emotion, and action.
                </p>
            </div>
        </header>

        {/* SECTION 1: THE FOUNDATIONS (Bento Grid) */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <LayoutGrid size={24} />
                <h2 className="text-3xl font-black uppercase tracking-tight">The Pillars</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[200px]">
                
                {/* CARD 1: TYPOGRAPHY */}
                <div className="md:col-span-2 row-span-2 bg-black text-white p-8 flex flex-col justify-between group hover:bg-stone-900 transition-colors">
                    <Type size={32} className="text-stone-500" />
                    <div>
                        <h3 className="text-4xl font-bold mb-2">Typography</h3>
                        <p className="text-stone-400 max-w-sm">The voice of text. Choosing the right typeface evokes authority, playfulness, or elegance before a single word is read.</p>
                    </div>
                </div>

                {/* CARD 2: COLOR */}
                <div className="bg-red-600 text-white p-6 flex flex-col justify-between group">
                    <Palette size={24} className="text-red-200" />
                    <div>
                        <h3 className="text-xl font-bold mb-1">Color Theory</h3>
                        <p className="text-xs text-red-100">Psychology of hue.</p>
                    </div>
                </div>

                {/* CARD 3: SPACE */}
                <div className="bg-white border-2 border-black p-6 flex flex-col justify-between group">
                    <div className="w-8 h-8 border-2 border-black rounded-full" />
                    <div>
                        <h3 className="text-xl font-bold mb-1">White Space</h3>
                        <p className="text-xs text-stone-500">The art of nothing.</p>
                    </div>
                </div>

                {/* CARD 4: GRID */}
                <div className="md:col-span-1 bg-stone-200 p-6 flex flex-col justify-between group relative overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-4 gap-1 opacity-10">
                        {Array.from({length:16}).map((_,i)=><div key={i} className="bg-black/20" />)}
                    </div>
                    <LayoutGrid size={24} className="relative z-10" />
                    <div className="relative z-10">
                        <h3 className="text-xl font-bold mb-1">The Grid</h3>
                        <p className="text-xs text-stone-600">Order from chaos.</p>
                    </div>
                </div>

            </div>
        </section>

        

        {/* SECTION 2: INTERACTIVE LAB */}
        <section className="mb-32">
            <div className="flex items-center gap-4 mb-8">
                <MousePointer size={24} />
                <h2 className="text-3xl font-black uppercase tracking-tight">Anatomy of Type</h2>
            </div>
            
            <TypefaceAnatomy />
            
            <div className="mt-4 flex gap-8 text-xs font-bold uppercase text-stone-400">
                <span>// Cap Height</span>
                <span>// X-Height</span>
                <span>// Baseline</span>
                <span>// Descender</span>
            </div>
        </section>

        {/* SECTION 3: HISTORY */}
        <section className="border-t-4 border-black pt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <h3 className="text-5xl font-black uppercase mb-6 leading-none">
                    From Bauhaus <br/> to Browser
                </h3>
            </div>
            <div className="space-y-6">
                <p className="text-stone-700 leading-relaxed font-medium">
                    Modern design began in 1919 at the <strong className="text-black">Bauhaus School</strong> in Germany. They taught that "Form Follows Function"—stripping away decoration to reveal the essence of the object.
                </p>
                <p className="text-stone-700 leading-relaxed font-medium">
                    Today, these principles govern the digital world. The grid systems of Swiss posters became the CSS Grids of web design. The clarity of Helvetica became the utility of UI fonts like Inter and Roboto.
                </p>
                
            </div>
        </section>

      </div>
    </main>
  );
}