import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookA, Globe2, Network, MessageCircle, SplitSquareHorizontal } from 'lucide-react';
import LanguagesBackground from './_components/LanguagesBackground';
import OmniTranslator from './_components/OmniTranslator';

const LINGUISTIC_MODULES = [
    {
        id: 'morphology',
        title: 'Morphology',
        description: 'How words are built. Explore Isolating languages (Chinese) vs. Agglutinative languages (Turkish).',
        icon: SplitSquareHorizontal,
        color: 'sky',
        href: '#' 
    },
    {
        id: 'phonology',
        title: 'Phonetics & Phonology',
        description: 'The International Phonetic Alphabet (IPA) and the physical production of human speech sounds.',
        icon: MessageCircle,
        color: 'rose',
        href: '/social-science/linguistics/phonology' // Linking to our previous build!
    },
    {
        id: 'etymology',
        title: 'Etymology & Language Trees',
        description: 'Tracing the roots of modern languages back to Proto-Indo-European and beyond.',
        icon: Network,
        color: 'amber',
        href: '#'
    }
];

export default function LanguagesPage() {
    return (
        <main className="relative min-h-screen bg-[#0a0c10] text-zinc-300 font-sans selection:bg-violet-500/30 overflow-x-hidden">
            
            <LanguagesBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/humanities" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Humanities Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-violet-500/30 rounded-lg text-violet-400 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                            <BookA size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-violet-300/50">
                            Humanities // Global Communication
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        LANGUAGES & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-amber-400">LINGUISTICS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        To learn a new language is to learn a new way of thinking. Linguistics is the scientific study of language—how we map abstract thoughts onto physical sounds, and how different cultures structure their view of reality through grammar.
                    </p>
                </header>

                <div className="grid grid-cols-1 gap-12 lg:gap-20 mb-24">
                    
                    {/* TOP: THEORETICAL TEXT */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Globe2 className="text-violet-400" /> Beyond Vocabulary
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Most language apps focus heavily on memorizing vocabulary tables. But vocabulary is just the paint; grammar is the canvas. If you don't understand how a language structures its sentences, knowing the words won't help you communicate.
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                For example, in English, the order of words determines who is doing what: <em>"The dog bites the man"</em> means something very different than <em>"The man bites the dog."</em> But in languages with heavy case systems (like Latin or Russian), the word endings determine the meaning, so you can mix the words in any order!
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Network className="text-amber-400" /> Syntactic Alignment
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                When building a sentence, humans generally need three things: a Subject (actor), a Verb (action), and an Object (receiver). How a culture orders these three elements tells you a lot about their language family.
                            </p>
                            <div className="p-5 bg-black/40 border-l-4 border-violet-500 text-sm text-zinc-300 font-serif italic rounded-r-xl shadow-inner">
                                Roughly 45% of the world's languages are <strong>SOV</strong> (Subject-Object-Verb, like Japanese or Korean). Another 42% are <strong>SVO</strong> (like English or Mandarin). Only a tiny fraction use <strong>VSO</strong> (like Irish or Arabic), placing the action at the very beginning of the thought.
                            </div>
                        </section>
                    </div>

                    {/* BOTTOM: THE MASSIVE INTERACTIVE LAB */}
                    <div className="w-full">
                        <OmniTranslator />
                    </div>

                </div>

                {/* ROUTING: LINGUISTIC BRANCHES */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <BookA className="text-violet-400" /> Linguistic Branches
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Dive deeper into the mechanics of human speech and writing systems.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {LINGUISTIC_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'sky' ? 'hover:border-sky-500/50' :
                                topic.color === 'rose' ? 'hover:border-rose-500/50' :
                                'hover:border-amber-500/50';
                                
                            const iconColor = 
                                topic.color === 'sky' ? 'text-sky-400' :
                                topic.color === 'rose' ? 'text-rose-400' :
                                'text-amber-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-white/5 rounded-xl ${iconColor}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-white mb-2 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-zinc-400 leading-relaxed">
                                        {topic.description}
                                    </p>
                                </Link>
                            );
                        })}
                    </div>
                </div>

            </div>
        </main>
    );
}