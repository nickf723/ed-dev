"use client";
import React from "react";
import Link from "next/link";
// UPDATE THIS IMPORT based on your new folder structure
import AestheticsBackground from "./components/AestheticsBackground"; 
import { 
  ArrowLeft, Palette, 
  MountainSnow, Flower, Eye, 
  Scaling, Heart, Sparkles, 
  Library, Grid3x3, ArrowRight
} from "lucide-react";

export default function AestheticsPage() {
  return (
    <main className="relative min-h-screen bg-[#1a0505] text-stone-200 overflow-hidden font-serif selection:bg-rose-500/30 flex flex-col">
      
      {/* 1. VISUAL ENGINE */}
      <AestheticsBackground />
      
      {/* OVERLAY: Canvas Texture */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a0505] via-transparent to-[#1a0505] pointer-events-none z-0" />

      {/* 2. HEADER */}
      <header className="relative z-10 p-8 pb-4 text-center">
         <Link href="/humanities/philosophy" className="inline-flex items-center gap-2 text-xs text-rose-400 hover:text-white transition-colors mb-4 uppercase tracking-widest font-sans group">
            <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform"/> Philosophy // Domain_05
         </Link>
         
         <div className="flex flex-col items-center gap-6">
             <div className="p-4 rounded-full border border-rose-500/20 bg-black/40 backdrop-blur-sm">
                 <Palette size={40} className="text-rose-400" />
             </div>
             <div>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-rose-100 via-amber-100 to-rose-900">
                   AESTHETICS
                </h1>
                <p className="text-rose-300/60 mt-4 font-sans text-xs uppercase tracking-[0.3em]">
                    The Philosophy of Beauty, Art, and Taste
                </p>
             </div>
         </div>
      </header>

      {/* 3. MAIN CONTENT */}
      <div className="relative z-10 flex-1 overflow-y-auto pb-12">
          <div className="max-w-5xl mx-auto px-6 space-y-24 pt-12">

              {/* NEW SECTION: THE LABORATORY (Navigation) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CARD 1: THE LIBRARY */}
                  <Link 
                      href="/humanities/philosophy/aesthetics/library"
                      className="group relative p-8 rounded-xl border border-rose-500/20 bg-gradient-to-br from-[#2a0a0a]/80 to-black/80 backdrop-blur-md overflow-hidden hover:border-rose-400/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                  >
                      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-700">
                          <Library size={120} />
                      </div>
                      
                      <div className="relative z-10">
                          <div className="flex items-center gap-2 text-rose-400 mb-4">
                              <Library size={20} />
                              <span className="font-sans text-[10px] font-bold uppercase tracking-widest">The Archive</span>
                          </div>
                          <h2 className="text-3xl font-bold text-white mb-2">Visual Library</h2>
                          <p className="text-stone-400 text-sm font-sans mb-6 max-w-xs">
                              Browse a curated collection of aesthetic identities. From Cottagecore to Cyberpunk.
                          </p>
                          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                              Enter Archive <ArrowRight size={12} />
                          </div>
                      </div>
                  </Link>

                  {/* CARD 2: THE MATRIX */}
                  <Link 
                      href="/humanities/philosophy/aesthetics/matrix"
                      className="group relative p-8 rounded-xl border border-amber-500/20 bg-gradient-to-br from-[#1a1005]/80 to-black/80 backdrop-blur-md overflow-hidden hover:border-amber-400/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                  >
                      <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-40 transition-opacity group-hover:scale-110 duration-700">
                          <Grid3x3 size={120} />
                      </div>
                      
                      <div className="relative z-10">
                          <div className="flex items-center gap-2 text-amber-400 mb-4">
                              <Grid3x3 size={20} />
                              <span className="font-sans text-[10px] font-bold uppercase tracking-widest">The Engine</span>
                          </div>
                          <h2 className="text-3xl font-bold text-white mb-2">Matrix View</h2>
                          <p className="text-stone-400 text-sm font-sans mb-6 max-w-xs">
                              Cross-reference styles across fashion, architecture, and technology.
                          </p>
                          <div className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-white group-hover:gap-4 transition-all">
                              Initialize Matrix <ArrowRight size={12} />
                          </div>
                      </div>
                  </Link>
              </section>


              {/* SECTION 1: THE CORE QUESTION (Existing Content) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                   <div className="space-y-6">
                       <div className="flex items-center gap-4">
                           <div className="w-12 h-px bg-rose-500" />
                           <h2 className="text-xl font-bold text-rose-100 uppercase tracking-widest font-sans">
                               The Eye of the Beholder?
                           </h2>
                       </div>
                       <p className="text-lg text-stone-300 leading-relaxed italic">
                           "Is beauty a property of the object itself, or does it exist solely in the mind that contemplates it?"
                       </p>
                       <p className="text-sm text-stone-400 font-sans leading-relaxed">
                           <strong>Realism (Plato/Kant):</strong> Beauty is universal. It relies on symmetry, proportion, and truth. 
                           <br/><br/>
                           <strong>Relativism (Hume):</strong> Beauty is a sentiment. It varies by culture, time, and individual taste.
                       </p>
                   </div>

                   {/* Visual: The Golden Ratio Frame */}
                   <div className="relative aspect-square md:aspect-video border-8 border-double border-rose-900/40 bg-black/20 backdrop-blur-sm flex items-center justify-center p-8">
                       <div className="w-full h-full border border-amber-500/30 relative">
                           <div className="absolute top-0 right-0 h-full w-[61.8%] border-l border-amber-500/30">
                               <div className="absolute bottom-0 right-0 h-[61.8%] w-full border-t border-amber-500/30">
                                   <div className="absolute bottom-0 left-0 w-[61.8%] h-full border-r border-amber-500/30 flex items-center justify-center">
                                       <span className="font-serif italic text-amber-500 text-2xl">φ</span>
                                   </div>
                               </div>
                           </div>
                       </div>
                       <div className="absolute -bottom-6 font-sans text-[10px] text-stone-500 uppercase tracking-widest">
                           Divine Proportion (1 : 1.618)
                       </div>
                   </div>
              </section>

              {/* SECTION 2: THE CATEGORIES (Existing Content) */}
              <section>
                  <div className="text-center mb-12">
                      <h2 className="text-3xl font-bold text-white mb-4">Modes of Perception</h2>
                      <div className="w-24 h-px bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* 1. THE BEAUTIFUL */}
                      <div className="group p-8 rounded-sm bg-[#2a0a0a]/60 border border-rose-500/20 backdrop-blur-md hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2">
                          <div className="mb-6 text-amber-400 group-hover:scale-110 transition-transform duration-500">
                              <Flower size={32} />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">The Beautiful</h3>
                          <div className="text-xs font-sans text-rose-300 uppercase tracking-widest mb-4">Harmony & Form</div>
                          <p className="text-sm text-stone-400 font-sans leading-relaxed">
                              That which pleases upon being seen. Defined by smallness, smoothness, and gradual variation.
                          </p>
                      </div>

                      {/* 2. THE SUBLIME */}
                      <div className="group p-8 rounded-sm bg-[#0a0f1a]/60 border border-indigo-500/20 backdrop-blur-md hover:border-indigo-400/50 transition-all duration-500 hover:-translate-y-2">
                          <div className="mb-6 text-indigo-400 group-hover:scale-110 transition-transform duration-500">
                              <MountainSnow size={32} />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">The Sublime</h3>
                          <div className="text-xs font-sans text-indigo-300 uppercase tracking-widest mb-4">Terror & Awe</div>
                          <p className="text-sm text-stone-400 font-sans leading-relaxed">
                              Greatness beyond calculation. Storms, mountains, the infinite void. It pleases through a sense of danger suspended.
                          </p>
                      </div>

                      {/* 3. THE PICTURESQUE */}
                      <div className="group p-8 rounded-sm bg-[#1a150a]/60 border border-emerald-500/20 backdrop-blur-md hover:border-emerald-400/50 transition-all duration-500 hover:-translate-y-2">
                          <div className="mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-500">
                              <Eye size={32} />
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">The Picturesque</h3>
                          <div className="text-xs font-sans text-emerald-300 uppercase tracking-widest mb-4">Variety & Texture</div>
                          <p className="text-sm text-stone-400 font-sans leading-relaxed">
                              The middle ground. Roughness, intricacy, and irregularity. It stimulates the imagination.
                          </p>
                      </div>
                  </div>
              </section>

              {/* SECTION 3: KEY CONCEPTS (Existing Content) */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-6 border-l-2 border-amber-500 bg-amber-900/10">
                       <div className="flex items-center gap-2 mb-2 text-amber-400">
                           <Scaling size={16} />
                           <span className="font-sans text-xs font-bold uppercase">Mimesis</span>
                       </div>
                       <p className="text-sm text-stone-300">
                           Art as imitation. Aristotle argued art mimics life to help us understand universal truths.
                       </p>
                   </div>
                   
                   <div className="p-6 border-l-2 border-rose-500 bg-rose-900/10">
                       <div className="flex items-center gap-2 mb-2 text-rose-400">
                           <Heart size={16} />
                           <span className="font-sans text-xs font-bold uppercase">Disinterested Pleasure</span>
                       </div>
                       <p className="text-sm text-stone-300">
                           Kant's idea that true aesthetic judgment must be free from desire.
                       </p>
                   </div>
              </section>

          </div>
      </div>

      {/* FOOTER */}
      <div className="relative z-10 p-6 text-center">
          <div className="inline-flex items-center gap-2 text-[10px] text-rose-900 uppercase font-sans font-bold tracking-[0.3em]">
              <Sparkles size={10} />
              Kalos Kagathos
          </div>
      </div>

    </main>
  );
}