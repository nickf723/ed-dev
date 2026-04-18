import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Flame, Globe, Library, Sparkles, ScrollText } from 'lucide-react';
import ReligionBackground from './_components/ReligionBackground';
import TheologyVisualizer from './_components/TheologyVisualizer';

const RELIGION_MODULES = [
    {
        id: 'abrahamic',
        title: 'Abrahamic Faiths',
        description: 'Judaism, Christianity, and Islam. Traditions rooted in the prophets of the Levant, defined by sacred texts and strict monotheism.',
        icon: ScrollText,
        color: 'amber',
        href: '#' 
    },
    {
        id: 'dharmic',
        title: 'Dharmic Traditions',
        description: 'Hinduism, Buddhism, Jainism, and Sikhism. Traditions originating in the Indian subcontinent, focused on karma, dharma, and liberation.',
        icon: Flame,
        color: 'rose',
        href: '#'
    },
    {
        id: 'mythology',
        title: 'Ancient Mythos',
        description: 'The pantheons of Greece, Rome, Egypt, and Norse antiquity. How ancient civilizations anthropomorphized the forces of nature.',
        icon: Library,
        color: 'purple',
        href: 'humanities/religion/mythology'
    }
];

export default function ReligionPage() {
    return (
        <main className="relative min-h-screen bg-[#110a05] text-amber-50/80 font-sans selection:bg-amber-500/30 overflow-x-hidden">
            
            <ReligionBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-amber-900/30 pb-8 backdrop-blur-sm">
                    <Link href="/humanities" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-400 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Humanities Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-amber-500/30 rounded-lg text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
                            <Globe size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-amber-500/50">
                            Humanities // Belief Systems
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        RELIGION & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-rose-400">THEOLOGY</span>
                    </h1>
                    <p className="text-lg md:text-xl text-amber-100/60 font-light max-w-3xl leading-relaxed">
                        For millennia, humanity has looked to the stars and asked: <em>Why are we here?</em> The academic study of religion examines the rituals, myths, texts, and moral frameworks that civilizations have constructed to answer the unanswerable.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                                <Sparkles className="text-amber-500" /> The Search for Meaning
                            </h2>
                            <p className="text-amber-100/70 leading-relaxed font-light mb-4">
                                In the formal sciences, we seek empirical truth through measurement. In the humanities, we study how humans <em>experience</em> reality. Religion is the ultimate lens of human experience.
                            </p>
                            <p className="text-amber-100/70 leading-relaxed font-light mb-4">
                                It provides a cosmological map. It tells a society where they came from, what their ethical obligations are to one another, and what happens when they die.
                            </p>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-amber-500 text-sm text-amber-100/80 font-serif italic rounded-r-xl mt-6 shadow-inner">
                                "A religion is a unified system of beliefs and practices relative to sacred things... which unite into one single moral community called a Church, all those who adhere to them." <br/>
                                <span className="text-amber-500/70 text-xs mt-2 block">— Émile Durkheim, Sociologist</span>
                            </div>
                        </section>

                        <section className="pt-8 border-t border-amber-900/30">
                            <h2 className="text-2xl font-bold text-amber-100 mb-4 flex items-center gap-3">
                                <BookOpen className="text-rose-400" /> Mapping the Divine
                            </h2>
                            <p className="text-amber-100/70 leading-relaxed font-light mb-4">
                                While the specific myths and rituals vary wildly across the globe, the underlying <em>structure</em> of how humans conceptualize the divine usually falls into one of a few major theological paradigms.
                            </p>
                            <p className="text-amber-100/70 leading-relaxed font-light">
                                Use the visualizer to explore how different traditions structure the relationship between humanity and the cosmos. Notice how a shift from Polytheism to Monotheism fundamentally changes the "flow" of cosmic authority.
                            </p>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <TheologyVisualizer />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-amber-900/30">
                    <h2 className="text-2xl font-bold text-amber-100 mb-2 flex items-center gap-3">
                        <Library className="text-amber-500" /> Comparative Studies
                    </h2>
                    <p className="text-amber-100/50 font-light mb-8">Delve into the specific texts, histories, and doctrines of global traditions.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {RELIGION_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'amber' ? 'hover:border-amber-500/50' :
                                topic.color === 'rose' ? 'hover:border-rose-500/50' :
                                'hover:border-purple-500/50';
                                
                            const iconColor = 
                                topic.color === 'amber' ? 'text-amber-400' :
                                topic.color === 'rose' ? 'text-rose-400' :
                                'text-purple-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-amber-500/10 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-amber-900/20 rounded-xl ${iconColor}`}>
                                            <Icon size={24} />
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-amber-50 mb-2 group-hover:text-white transition-colors">
                                        {topic.title}
                                    </h3>
                                    <p className="text-xs text-amber-100/60 leading-relaxed">
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