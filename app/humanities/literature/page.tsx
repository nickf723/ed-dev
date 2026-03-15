"use client";
import React from "react";
import Link from "next/link";
import TextBackground from "@/app/humanities/literature/TextBackground";
import HeroJourney from "@/app/humanities/literature/HeroJourney";
import { ArrowLeft, Feather, BookOpen, PenTool, Library, Quote } from "lucide-react";

// Our new components
import { BookCard, BookData } from "./_components/media";
import VocabApplet from "@/app/_components/VocabApplet";
import { literatureVocab } from "@/app/_data/vocab/l/literature";

export const SCRIBE_METADATA = {
    domain: "Humanities",
    subDomain: "Arts",
    topic: "Literature",
    learningObjectives: [
        "Identify major literary forms: Prose, Poetry, and Drama.",
        "Analyze the stages of the Hero's Journey monomyth.",
        "Define and recognize core literary devices."
    ]
};

export default function LiteraturePage() {

    const bookList: BookData[] = [
    // MOCK REPOSITORY DATA (You can move this to a _data file later!)
    {
        id: "great-gatsby",
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        publicationYear: 1925,
        genre: "Tragedy / Modernism",
        description: "A critique of the American Dream set in the Roaring Twenties, exploring themes of decadence, idealism, and social upheaval.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg/960px-The_Great_Gatsby_Cover_1925_Retouched.jpg",
        path: "/humanities/literature/repository/the-great-gatsby"
    },

   {
        id: "divine-comedy",
        title: "The Divine Comedy",
        author: "Dante Alighieri",
        publicationYear: 1320,
        genre: "Epic Poetry",
        description: "An allegorical vision of the afterlife representing the soul's journey towards God, heavily drawing on medieval Christian theology.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Sandro_Botticelli_-_La_Carte_de_l%27Enfer.jpg",
        path: "/humanities/literature/repository/divine-comedy"
    },
    {
        id: "harry-potter",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        publicationYear: 1997,
        genre: "Fantasy",
        description: "The first book in the Harry Potter series, introducing readers to the magical world and the young wizard's journey of self-discovery.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
        path: "/humanities/literature/repository/harry-potter"
    },
    {
        id: "odyssey",
        title: "The Odyssey",
        author: "Homer",
        publicationYear: -800,
        genre: "Epic Poetry",
        description: "An ancient Greek epic poem that follows the hero Odysseus on his long journey home after the Trojan War, facing various trials and adventures.",
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Fragment_Odyssee_2245_2.jpg",
        path: "/humanities/literature/repository/odyssey"
    }
];

    return (
        <main className="relative min-h-screen bg-[#1a0f0d] text-stone-200 overflow-hidden selection:bg-amber-500/30 font-serif">
            
            <TextBackground />
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.08] pointer-events-none z-0 mix-blend-overlay" />
            <div className="absolute inset-0 bg-radial-vignette opacity-60 pointer-events-none z-0" />

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

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pointer-events-auto mb-20">
                    
                    {/* LEFT: FORMS & GENRES */}
                    <div className="lg:col-span-7 space-y-8">
                        
                        <div className="bg-[#271c19]/80 backdrop-blur-md border border-amber-900/30 p-8 rounded-sm relative overflow-hidden group shadow-2xl">
                            <div className="absolute -right-6 -top-6 text-amber-900/10 rotate-12 transition-transform group-hover:rotate-6">
                                <BookOpen size={140} />
                            </div>
                            <h2 className="text-2xl font-bold text-amber-100 mb-6 flex items-center gap-3 relative z-10">
                                <Library size={20} className="text-amber-600" /> Major Forms
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                <div className="p-4 bg-black/20 border-l-2 border-amber-700 hover:bg-black/40 transition-colors">
                                    <h3 className="font-bold text-white text-lg mb-1">Prose</h3>
                                    <p className="text-xs text-stone-400 leading-relaxed">Ordinary language. Novels, short stories, and essays. Defined by narrative structure and character.</p>
                                </div>
                                <div className="p-4 bg-black/20 border-l-2 border-amber-700 hover:bg-black/40 transition-colors">
                                    <h3 className="font-bold text-white text-lg mb-1">Poetry</h3>
                                    <p className="text-xs text-stone-400 leading-relaxed">Aesthetic and rhythmic qualities of language. Sonnets, haikus, and free verse.</p>
                                </div>
                                <div className="p-4 bg-black/20 border-l-2 border-amber-700 hover:bg-black/40 transition-colors md:col-span-2">
                                    <h3 className="font-bold text-white text-lg mb-1">Drama</h3>
                                    <p className="text-xs text-stone-400 leading-relaxed">Written to be performed. Tragedy, comedy, and the interplay of dialogue.</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#271c19]/80 backdrop-blur-md border border-amber-900/30 p-8 rounded-sm shadow-xl">
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
                        <HeroJourney />
                        

                        <div className="bg-[#271c19]/80 border border-amber-900/30 rounded-xl p-8 text-center relative shadow-xl">
                            <Quote size={32} className="absolute top-4 left-4 text-amber-900 opacity-50" />
                            <p className="text-lg text-amber-100/90 font-serif italic leading-relaxed mb-4">
                                "A reader lives a thousand lives before he dies. The man who never reads lives only one."
                            </p>
                            <div className="text-xs font-mono text-amber-600 uppercase tracking-widest">— George R.R. Martin</div>
                        </div>
                    </div>
                </div>

                {/* THE ARCHIVE (Repository Implementation) */}
                <div className="pointer-events-auto border-t border-amber-900/30 pt-16 mb-16">
                    <h2 className="text-3xl font-bold text-amber-100 mb-2 flex items-center gap-3">
                        <Library className="text-amber-600" /> The Great Archive
                    </h2>
                    <p className="text-stone-400 font-light mb-8 italic">A curated repository of foundational texts.</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {bookList.map(book => (
                            <BookCard 
                                key={book.id}
                                book={book}
                            />
                        ))}
                    </div>
                </div>

                {/* LEXICON */}
                <div className="pointer-events-auto border-t border-amber-900/30 pt-16">
                    <VocabApplet 
                        currentDomain="Literature"
                        localTerms={literatureVocab}
                    />
                </div>

            </div>
        </main>
    );
}