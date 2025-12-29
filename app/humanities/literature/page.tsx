"use client";
import Link from "next/link";
import TextBackground from "@/app/humanities/literature/TextBackground";
import HeroJourney from "@/app/humanities/literature/HeroJourney";
import { 
  ArrowLeft, Feather, BookOpen, Scroll, PenTool, 
  Library, Languages, Quote 
} from "lucide-react";

export default function LiteraturePage() {
  return (
    <main className="relative min-h-screen bg-[#1a0f0d] text-stone-200 overflow-hidden selection:bg-amber-500/30 font-serif">
      
      {/* 1. VISUAL ENGINE */}
      <TextBackground />
      
      {/* OVERLAY: Paper Texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.08] pointer-events-none z-0 mix-blend-overlay" />
      <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

      {/* 2. DASHBOARD */}
      <div className="relative z-10 container mx-auto px-6 py-12 min-h-screen flex flex-col pointer-events-none">
        
        {/* HEADER */}
        <header className="mb-16 pointer-events-auto text-center md:text-left">
             <Link href="/humanities/arts" className="inline-flex items-center gap-2 text-xs font-mono text-amber-700 hover:text-amber-600 transition-colors mb-4 uppercase tracking-widest">
                <ArrowLeft size={12} /> Arts // Literature
             </Link>
             <div className="flex flex-col md:flex-row items-center gap-4">
                 <div className="p-4 bg-[#271c19] border border-amber-900/50 rounded-sm shadow-xl">
                    <Feather size={40} className="text-amber-600" />
                 </div>
                 <div>
                    <h1 className="text-5xl md:text-7xl font-black text-[#e7e5e4] tracking-tighter drop-shadow-xl font-serif">
                        LITERATURE
                    </h1>
                    <p className="text-amber-700 text-lg font-light tracking-wide italic">
                        The written record of the human imagination.
                    </p>
                 </div>
             </div>
        </header>

        

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 flex-1 pointer-events-auto">
            
            {/* LEFT: FORMS & GENRES */}
            <div className="lg:col-span-7 space-y-12">
                
                {/* THE CANON */}
                <div className="bg-[#271c19]/80 backdrop-blur-md border border-amber-900/30 p-8 rounded-sm relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-amber-900/10 rotate-12 transition-transform group-hover:rotate-6">
                        <BookOpen size={140} />
                    </div>
                    
                    <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3 relative z-10">
                        <Library size={20} className="text-amber-600" /> Major Forms
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                        <div className="p-4 bg-black/20 border-l-2 border-amber-700">
                            <h3 className="font-bold text-white text-lg mb-1">Prose</h3>
                            <p className="text-xs text-stone-400 leading-relaxed">
                                Ordinary language. Novels, short stories, and essays. Defined by narrative structure and character.
                            </p>
                        </div>
                        <div className="p-4 bg-black/20 border-l-2 border-amber-700">
                            <h3 className="font-bold text-white text-lg mb-1">Poetry</h3>
                            <p className="text-xs text-stone-400 leading-relaxed">
                                Aesthetic and rhythmic qualities of language. Sonnets, haikus, and free verse.
                            </p>
                        </div>
                        <div className="p-4 bg-black/20 border-l-2 border-amber-700">
                            <h3 className="font-bold text-white text-lg mb-1">Drama</h3>
                            <p className="text-xs text-stone-400 leading-relaxed">
                                Written to be performed. Tragedy, comedy, and the interplay of dialogue.
                            </p>
                        </div>
                    </div>
                </div>

                {/* LITERARY DEVICES */}
                <div className="bg-[#271c19]/80 backdrop-blur-md border border-amber-900/30 p-8 rounded-sm">
                    <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3">
                        <PenTool size={20} className="text-amber-600" /> The Writer's Toolkit
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {["Metaphor", "Simile", "Allegory", "Irony", "Foreshadowing", "Alliteration", "Symbolism", "Hyperbole"].map(term => (
                            <span key={term} className="px-3 py-1 bg-[#1a0f0d] border border-stone-800 text-stone-400 text-xs rounded hover:border-amber-700 hover:text-amber-500 transition-colors cursor-help">
                                {term}
                            </span>
                        ))}
                    </div>
                </div>

            </div>


            {/* RIGHT: INTERACTIVE STORYTELLING */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* WIDGET */}
                <HeroJourney />

                {/* QUOTE CARD */}
                <div className="bg-[#271c19]/80 border border-amber-900/30 rounded-xl p-8 text-center relative">
                    <Quote size={32} className="absolute top-4 left-4 text-amber-900 opacity-50" />
                    <p className="text-lg text-amber-100/90 font-serif italic leading-relaxed mb-4">
                        "A reader lives a thousand lives before he dies. The man who never reads lives only one."
                    </p>
                    <div className="text-xs font-mono text-amber-600 uppercase tracking-widest">— George R.R. Martin</div>
                </div>

            </div>

        </div>
      </div>
    </main>
  );
}