import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Globe, Library, Sparkles, Moon, Sun } from 'lucide-react';
import MythologyBackground from './_components/MythologyBackground';
import PantheonDatabase from './_components/PantheonDatabase';

const ARCHETYPE_MODULES = [
    {
        id: 'creation',
        title: 'Creation Myths',
        description: 'How did the universe begin? From the cosmic egg to the slaying of primordial chaos monsters.',
        icon: Sun,
        color: 'amber',
        href: '#' 
    },
    {
        id: 'underworld',
        title: 'The Underworld Journey',
        description: 'The universal human anxiety of death, represented through the physical journey into the abyss.',
        icon: Moon,
        color: 'indigo',
        href: '#'
    },
    {
        id: 'hero',
        title: 'The Hero\'s Journey',
        description: 'The monomyth. Why the stories of Hercules, Gilgamesh, and modern superheroes share the exact same structure.',
        icon: Sparkles,
        color: 'emerald',
        href: '#'
    }
];

export default function MythologyPage() {
    return (
        <main className="relative min-h-screen bg-[#090a10] text-zinc-300 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
            
            <MythologyBackground />

            <div className="relative z-10 max-w-[85rem] mx-auto px-6 py-12 md:py-24">
                
                {/* HEADER */}
                <header className="mb-16 border-b border-indigo-900/30 pb-8 backdrop-blur-sm">
                    <Link href="/humanities/religion" className="inline-flex items-center gap-2 text-indigo-500 hover:text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft size={14} /> Religion & Theology Hub
                    </Link>
                    
                    <div className="flex items-center gap-3 mb-4">
                        <span className="p-2 bg-black/50 border border-indigo-500/30 rounded-lg text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                            <Library size={24} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-indigo-500/50">
                            Theology // Ancient Traditions
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        ANCIENT <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-amber-400">MYTHOLOGY</span>
                    </h1>
                    <p className="text-lg md:text-xl text-zinc-400 font-light max-w-3xl leading-relaxed">
                        Before the scientific method, humanity used narrative to explain the mechanics of the universe. Mythology is the study of these foundational stories—how ancient people anthropomorphized nature to negotiate with the unknown.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24">
                    
                    {/* LEFT: THEORETICAL TEXT */}
                    <div className="lg:col-span-5 space-y-12">
                        
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Sun className="text-amber-400" /> Proto-Science
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                Imagine living 4,000 years ago. A massive storm destroys your crops, or the Nile River floods, providing life-saving soil. How do you explain this?
                            </p>
                            
                            

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                You create a narrative. The storm isn't random barometric pressure; it is the rage of a Sky God. By turning natural phenomena into characters (gods), the chaotic world becomes a social hierarchy that humans can understand, pray to, and attempt to influence.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-indigo-900/30">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <Globe className="text-indigo-400" /> Geography Shapes God
                            </h2>
                            <p className="text-zinc-400 leading-relaxed font-light mb-4">
                                The environment of a civilization directly shapes the personality of its gods. 
                            </p>
                            
                            <div className="p-5 bg-black/40 border-l-4 border-indigo-500 text-sm text-zinc-300 font-serif italic rounded-r-xl shadow-inner mb-6">
                                In Egypt, the Nile flooded predictably, bringing life. Therefore, Egyptian gods like Ra were seen as agents of order (Ma'at) and stability. <br/><br/>
                                In Mesopotamia, the Tigris and Euphrates rivers flooded violently and unpredictably. Consequently, their gods were viewed as chaotic, capricious, and easily angered.
                            </div>

                            

                            <p className="text-zinc-400 leading-relaxed font-light mt-4">
                                Explore the <strong>Pantheon Archive</strong> to see how different cultures assigned the massive forces of nature to their respective deities.
                            </p>
                        </section>

                    </div>

                    {/* RIGHT: INTERACTIVE LAB */}
                    <div className="lg:col-span-7">
                        <div className="sticky top-24">
                            <PantheonDatabase />
                        </div>
                    </div>

                </div>

                {/* BOTTOM: ADVANCED ROUTING */}
                <div className="pt-16 border-t border-indigo-900/30">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-3">
                        <BookOpen className="text-indigo-400" /> Universal Archetypes
                    </h2>
                    <p className="text-zinc-500 font-light mb-8">Discover the underlying narrative structures that appear across completely unconnected civilizations.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {ARCHETYPE_MODULES.map((topic) => {
                            const Icon = topic.icon;
                            const borderHover = 
                                topic.color === 'amber' ? 'hover:border-amber-500/50' :
                                topic.color === 'indigo' ? 'hover:border-indigo-500/50' :
                                'hover:border-emerald-500/50';
                                
                            const iconColor = 
                                topic.color === 'amber' ? 'text-amber-400' :
                                topic.color === 'indigo' ? 'text-indigo-400' :
                                'text-emerald-400';

                            return (
                                <Link key={topic.id} href={topic.href} className={`bg-black/40 border border-indigo-500/10 p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-1 ${borderHover}`}>
                                    <div className="flex items-start justify-between mb-4">
                                        <div className={`p-3 bg-indigo-900/20 rounded-xl ${iconColor}`}>
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