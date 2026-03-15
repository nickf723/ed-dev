import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic2, Ear, MessageSquareQuote, Languages } from 'lucide-react';
import PhonologyBackground from './_components/PhonologyBackground';
import PhonemeLab from './_components/PhonemeLab';
import PhonemeSoundboard from './_components/PhonemeSoundboard';

// Advanced Domain Routing Array
const LINGUISTICS_TOPICS = [
    {
        id: 'syntax',
        title: 'Syntax & Grammar',
        description: 'The structural rules governing sentence construction and word order.',
        icon: Languages,
        color: 'sky',
        href: '#'
    },
    {
        id: 'semantics',
        title: 'Semantics & Pragmatics',
        description: 'How meaning is derived from words, and how context alters that meaning.',
        icon: MessageSquareQuote,
        color: 'emerald',
        href: '#'
    }
];

export default function PhonologyPage() {
    return (
        <main className="relative min-h-screen bg-[#0f0a0a] text-zinc-300 font-sans selection:bg-orange-500/30 overflow-x-hidden">
            
            <PhonologyBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-white/10 pb-8 backdrop-blur-sm">
                    <Link href="/social-science" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Social Science Directory
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-orange-500/30 rounded-lg text-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                            <Mic2 size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-orange-300/50">
                            Linguistics // Speech Sounds
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        PHONOLOGY & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-fuchsia-400">PHONETICS</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        The study of the cognitive organization of sounds (phonology) and their physical production and perception (phonetics). It is the bridge between human thought and the acoustic waves we push through the air.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Ear className="text-orange-400" /> Phonemes vs. Graphemes
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                A grapheme is a written letter (like "c"). A phoneme is an atomic unit of sound. English is notoriously terrible at mapping graphemes to phonemes.
                            </p>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-orange-500 text-sm text-zinc-300 font-serif italic rounded-r-xl">
                                The letter "c" sounds completely different in the words "cat", "cell", and "choir". Conversely, the exact same sound can be spelled differently, as in "to", "too", and "two".
                            </div>

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                To study linguistics scientifically, we must abandon spelling entirely and look only at the underlying acoustic data.
                            </p>
                            
                            
                        </section>

                        <section className="pt-8 border-t border-white/5">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Mic2 className="text-fuchsia-400" /> IPA and ARPAbet
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The International Phonetic Alphabet (IPA) was created to give every single distinct sound humans can make its own unique symbol.
                            </p>
                            <p className="text-zinc-400 leading-relaxed font-light">
                                However, because standard computer keyboards lack characters like /ʃ/ or /ð/, computer scientists developed the <strong>ARPAbet</strong> in the 1970s. It represents phonemes using standard ASCII characters, making it the backbone of text-to-speech engines and pronunciation APIs.
                            </p>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <PhonemeLab />
                            <PhonemeSoundboard />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: FUTURE INFRASTRUCTURE / ROUTING */}
                <div className="pt-16 border-t border-white/10">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <Languages className="text-orange-400" /> Linguistic Branches
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Navigate the structural architecture of human language.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {LINGUISTICS_TOPICS.map((topic) => {
                            const Icon = topic.icon;
                            return (
                                <Link key={topic.id} href={topic.href} className="bg-black/40 border border-white/5 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 hover:border-orange-500/50">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="p-3 bg-white/5 rounded-xl text-orange-400">
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