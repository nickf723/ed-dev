"use client";
import React from "react";
import Link from "next/link";
import PhilosophyBackground from "./PhilosophyBackground";
import { 
  ArrowLeft, Brain, Scale, 
  Sparkles, Eye, Binary, 
  BookOpen, Quote
} from "lucide-react";

// --- THE FIVE PILLARS ---
const PILLARS = [
  {
    id: "logic",
    title: "Logic",
    greek: "Logos",
    desc: "The structure of argument. Distinguishing sound reasoning from fallacy.",
    quote: "We are not afraid to follow truth wherever it may lead.",
    author: "Thomas Jefferson",
    icon: Binary,
    diagram: "Logic Gates",
    color: "text-stone-300"
  },
  {
    id: "epistemology",
    title: "Epistemology",
    greek: "Episteme",
    desc: "The theory of knowledge. How do we know what we know? Truth, belief, and justification.",
    quote: "I know that I know nothing.",
    author: "Socrates",
    icon: Eye,
    diagram: "The Brain",
    color: "text-amber-200"
  },
  {
    id: "metaphysics",
    title: "Metaphysics",
    greek: "Ta Meta Ta Physika",
    desc: "The nature of reality. Being, existence, time, space, and causality.",
    quote: "Why is there something rather than nothing?",
    author: "Leibniz",
    icon: Sparkles,
    diagram: "The Cave",
    color: "text-stone-300"
  },
  {
    id: "ethics",
    title: "Ethics",
    greek: "Ethos",
    desc: "Moral philosophy. Right, wrong, virtue, duty, and the good life.",
    quote: "Act only according to that maxim whereby you can, at the same time, will that it should become a universal law.",
    author: "Kant",
    icon: Scale,
    diagram: "Justice Scale",
    color: "text-amber-200"
  },
  {
    id: "aesthetics",
    title: "Aesthetics",
    greek: "Aisthesis",
    desc: "The philosophy of art and beauty. Taste, sublimity, and sensory perception.",
    quote: "Beauty is truth, truth beauty.",
    author: "Keats",
    icon: BookOpen,
    diagram: "Golden Ratio",
    color: "text-stone-300"
  }
];

export default function PhilosophyPage() {
  return (
    <main className="relative min-h-screen bg-[#0c0a09] text-stone-200 overflow-hidden font-serif selection:bg-amber-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <PhilosophyBackground />
      
      {/* OVERLAY: Marble Texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none z-0 mix-blend-overlay" />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4 text-center">
         <Link href="/humanities" className="inline-flex items-center gap-2 text-xs text-amber-500 hover:text-white transition-colors mb-4 uppercase tracking-widest font-sans group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Humanities // Domain_01
         </Link>
         
         <div className="flex flex-col items-center gap-6">
             <div className="p-4 rounded-full border border-amber-500/20 bg-stone-900/40 backdrop-blur-sm">
                 <Brain size={40} className="text-amber-500" />
             </div>
             <div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-amber-100 via-stone-200 to-stone-600">
                   PHILOSOPHY
                </h1>
                <div className="flex justify-center gap-4 mt-4 text-[10px] uppercase tracking-[0.3em] font-sans text-stone-500">
                    <span>Philo (Love)</span>
                    <span className="text-amber-500">•</span>
                    <span>Sophia (Wisdom)</span>
                </div>
             </div>
         </div>
      </header>

      {/* 3. THE PILLARS (Scrollable Row) */}
      <div className="relative z-10 flex-1 overflow-x-auto overflow-y-hidden pb-12 pt-8">
          <div className="min-w-full w-fit mx-auto px-8 flex gap-6 items-stretch h-[500px]">
              
              {PILLARS.map((item, i) => (
                  <Link 
                      key={item.id}
                      href={`/humanities/philosophy/${item.id}`}
                      className="group relative w-72 flex-shrink-0 flex flex-col justify-between p-8 rounded-sm border-t border-b border-stone-800 bg-[#151210]/60 backdrop-blur-sm transition-all duration-500 hover:border-amber-500/40 hover:bg-[#1c1917]"
                  >
                      {/* Top Light Effect on Hover */}
                      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Header */}
                      <div className="relative z-10">
                          <div className="flex justify-between items-start mb-6">
                              <item.icon size={24} className="text-stone-500 group-hover:text-amber-400 transition-colors" />
                              <span className="font-sans text-[10px] text-stone-600 font-bold uppercase tracking-widest group-hover:text-amber-500/50">
                                  0{i+1}
                              </span>
                          </div>
                          <h2 className="text-3xl font-bold text-stone-200 mb-1 group-hover:text-white transition-colors">
                              {item.title}
                          </h2>
                          <div className="text-xs italic text-stone-500 mb-6 font-serif">
                              "{item.greek}"
                          </div>
                          <p className="text-sm text-stone-400 leading-relaxed font-sans">
                              {item.desc}
                          </p>
                      </div>

                      {/* Visual Anchor (The Quote) */}
                      <div className="relative z-10 mt-8 pt-6 border-t border-stone-800 group-hover:border-amber-900/30 transition-colors">
                          <Quote size={16} className="text-stone-600 mb-2" />
                          <p className="text-xs text-amber-100/80 italic leading-relaxed mb-2">
                              {item.quote}
                          </p>
                          <div className="text-[10px] text-stone-500 font-sans uppercase tracking-wider text-right">
                              — {item.author}
                          </div>
                      </div>

                      {/* Diagram Hint */}
                      <div className="absolute bottom-2 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="text-[9px] font-sans uppercase tracking-widest text-amber-500/40">
                              View {item.diagram}
                          </div>
                      </div>
                  </Link>
              ))}

          </div>
      </div>

      {/* 4. VISUAL INSERTS (Hidden contextually) */}
      <div className="hidden">
           {/* These tags would contextually load if we were inside the specific pages, 
               but here they serve to remind us of the visual richness available. */}
           

[Image of truth table logic gate diagram]

           

[Image of Plato's allegory of the cave]

           

[Image of brain neural network structure]

      </div>

      {/* FOOTER */}
      <div className="relative z-10 p-6 text-center">
          <div className="text-[10px] text-stone-600 uppercase font-sans font-bold tracking-[0.3em]">
              Cogito, Ergo Sum
          </div>
      </div>

    </main>
  );
}